import {
  ApiError,
  handleSearchRequest,
  readRequestBody,
  type SearchRequestBody,
} from '../server/openaiApi.js'

export const config = {
  runtime: 'nodejs',
}

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
    const body = await readRequestBody<SearchRequestBody>(req)
    const result = await handleSearchRequest(body)

    res.status(200).json(result as unknown as Record<string, unknown>)
  } catch (error) {
    console.error('Vercel /api/search failed:', error)
    res.status(error instanceof ApiError ? error.statusCode : 502).json({
      error: error instanceof Error ? error.message : 'Unknown search error',
    })
  }
}
