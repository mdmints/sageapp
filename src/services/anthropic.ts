import type { DecoderResult, ProfileState, SearchResult } from '../types';

async function postJson<T>(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data as T;
}

type SearchProfilePayload = Pick<ProfileState, 'age' | 'gender' | 'focuses'>;

export async function analyzeQuery(
  query: string,
  profile: SearchProfilePayload = {
    age: null,
    gender: null,
    focuses: [],
  },
) {
  return postJson<SearchResult>('/api/search', { query, profile });
}

export async function decodeClaim(claim: string, profileFocuses: string[] = []) {
  return postJson<DecoderResult>('/api/decode', { claim, profileFocuses });
}
