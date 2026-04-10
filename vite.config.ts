import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import {
  ApiError,
  DEFAULT_MODEL_NAME,
  handleDecodeRequest,
  handleSearchRequest,
  readRequestBody,
} from './server/openaiApi'

function createJsonResponse(
  res: ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function createSageApiPlugin(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.OPENAI_API_KEY
  const model = env.OPENAI_MODEL || DEFAULT_MODEL_NAME

  async function handleSearch(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = await readRequestBody<import('./server/openaiApi').SearchRequestBody>(req)
      const result = await handleSearchRequest(body, { apiKey, model })

      createJsonResponse(res, 200, result as unknown as Record<string, unknown>)
    } catch (error) {
      console.error('OpenAI search request failed:', error)

      createJsonResponse(res, error instanceof ApiError ? error.statusCode : 502, {
        error: error instanceof Error ? error.message : 'Unknown search error',
      })
    }
  }

  async function handleDecode(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = await readRequestBody<import('./server/openaiApi').DecodeRequestBody>(req)
      const result = await handleDecodeRequest(body, { apiKey, model })

      createJsonResponse(res, 200, result)
    } catch (error) {
      console.error('OpenAI decode request failed:', error)

      createJsonResponse(res, error instanceof ApiError ? error.statusCode : 502, {
        error: error instanceof Error ? error.message : 'Unknown decode error',
      })
    }
  }

  function registerMiddleware(
    middlewares: {
      use: (
        path: string,
        handler: (req: IncomingMessage, res: ServerResponse) => void,
      ) => void
    },
  ) {
    middlewares.use('/api/search', (req, res) => {
      if (req.method !== 'POST') {
        createJsonResponse(res, 405, { error: 'Method not allowed' })
        return
      }

      void handleSearch(req, res)
    })

    middlewares.use('/api/decode', (req, res) => {
      if (req.method !== 'POST') {
        createJsonResponse(res, 405, { error: 'Method not allowed' })
        return
      }

      void handleDecode(req, res)
    })
  }

  return {
    name: 'sage-openai-api',
    configureServer(server) {
      registerMiddleware(server.middlewares)
    },
    configurePreviewServer(server) {
      registerMiddleware(server.middlewares)
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), createSageApiPlugin(mode)],
}))
