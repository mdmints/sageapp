const explicitTrackingCounts: Array<[string, number]> = [
  ['magnesium glycinate', 3248],
  ['inositol', 2864],
  ['sea moss', 2146],
  ['seed cycling', 1187],
  ['spearmint tea', 964],
  ['vitex', 742],
  ['probiotic', 1679],
  ['collagen', 1523],
]

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getHashedTrackingCount(seed: string) {
  let hash = 0

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 100000
  }

  return 420 + (hash % 2400)
}

export function getCommunityTrackingCount({
  apiCount,
  query,
  title,
}: {
  apiCount?: number | null
  query?: string
  title?: string
}) {
  if (typeof apiCount === 'number' && apiCount > 0) {
    return apiCount
  }

  const normalizedCandidates = [title, query]
    .filter((value): value is string => Boolean(value?.trim()))
    .map(normalize)

  for (const candidate of normalizedCandidates) {
    const explicitMatch = explicitTrackingCounts.find(([key]) => candidate.includes(key))

    if (explicitMatch) {
      return explicitMatch[1]
    }
  }

  const fallbackSeed = normalizedCandidates[0]

  if (!fallbackSeed) {
    return null
  }

  return getHashedTrackingCount(fallbackSeed)
}
