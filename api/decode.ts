import {
  ApiError,
  handleDecodeRequest,
  readRequestBody,
  type DecodeRequestBody,
} from '../server/openaiApi.js'

export default async function handler(
  req: {
    method?: string
    body?: unknown
    [Symbol.asyncIterator]?: () => AsyncIterator<Uint8Array | string>
  },
  res: {
    status: (statusCode: number) => {
      json: (body: Record<string, unknown>) => void
    }
  },
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = await readRequestBody<DecodeRequestBody>(req)
    const result = await handleDecodeRequest(body)

    res.status(200).json(result)
  } catch (error) {
    res.status(error instanceof ApiError ? error.statusCode : 502).json({
      error: error instanceof Error ? error.message : 'Unknown decode error',
    })
  }
}
