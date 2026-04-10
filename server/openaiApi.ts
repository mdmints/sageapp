import OpenAI from 'openai'

export const DEFAULT_MODEL_NAME = 'gpt-4o-mini'

const searchResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'title',
    'category',
    'verdict',
    'confidence',
    'score',
    'studies',
    'verdictColor',
    'bottomLine',
    'bestEvidenceFor',
    'bars',
    'why',
    'whyCitations',
    'whatToExpect',
    'personalizedTake',
    'howToUse',
    'beforeYouBuy',
    'communitySignal',
    'sideEffects',
    'caution',
    'sources',
    'compareOptions',
  ],
  properties: {
    title: { type: 'string' },
    category: { type: 'string' },
    verdict: { type: 'string' },
    confidence: { type: 'string', enum: ['High', 'Medium', 'Low'] },
    score: { type: 'number' },
    studies: { type: 'string' },
    verdictColor: { type: 'string', enum: ['green', 'amber', 'rose'] },
    bottomLine: { type: 'string' },
    bestEvidenceFor: {
      type: 'array',
      items: { type: 'string' },
    },
    bars: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'value', 'color'],
        properties: {
          label: { type: 'string' },
          value: { type: 'number' },
          color: { type: 'string', enum: ['green', 'amber', 'rose'] },
        },
      },
    },
    why: {
      type: 'array',
      items: { type: 'string' },
    },
    whyCitations: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['label', 'sourceIndex'],
          properties: {
            label: { type: 'string' },
            sourceIndex: { type: 'integer' },
          },
        },
      },
    },
    whatToExpect: {
      type: 'object',
      additionalProperties: false,
      required: ['timeline', 'improvement', 'watchFor'],
      properties: {
        timeline: { type: 'string' },
        improvement: { type: 'string' },
        watchFor: { type: 'string' },
      },
    },
    personalizedTake: { type: 'string' },
    howToUse: {
      type: 'object',
      additionalProperties: false,
      required: ['dosage', 'frequency', 'form'],
      properties: {
        dosage: { type: 'string' },
        frequency: { type: 'string' },
        form: { type: 'string' },
      },
    },
    beforeYouBuy: {
      type: 'object',
      additionalProperties: false,
      required: ['bestForm', 'suggestedDose', 'redFlags'],
      properties: {
        bestForm: { type: 'string' },
        suggestedDose: { type: 'string' },
        redFlags: { type: 'string' },
      },
    },
    communitySignal: {
      type: 'object',
      additionalProperties: false,
      required: ['trackingCount', 'commonStack'],
      properties: {
        trackingCount: { type: 'integer' },
        commonStack: { type: 'string' },
      },
    },
    sideEffects: { type: 'string' },
    caution: { type: 'string' },
    sources: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'year', 'badge'],
        properties: {
          name: { type: 'string' },
          year: { type: 'string' },
          badge: { type: 'string', enum: ['Supports', 'Mixed', 'Limited'] },
        },
      },
    },
    compareOptions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['query', 'title', 'category', 'score', 'verdictColor'],
        properties: {
          query: { type: 'string' },
          title: { type: 'string' },
          category: { type: 'string' },
          score: { type: 'number' },
          verdictColor: { type: 'string', enum: ['green', 'amber', 'rose'] },
        },
      },
    },
  },
} as const

const decoderResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'verdictLabel',
    'verdictType',
    'confidence',
    'needsMoreDetail',
    'headline',
    'misleadBody',
    'truthBody',
    'pills',
  ],
  properties: {
    verdictLabel: { type: 'string' },
    verdictType: { type: 'string', enum: ['mislead', 'partial', 'accurate'] },
    confidence: { type: 'string', enum: ['High', 'Medium', 'Low'] },
    needsMoreDetail: { type: 'boolean' },
    headline: { type: 'string' },
    misleadBody: { type: 'string' },
    truthBody: { type: 'string' },
    pills: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'type'],
        properties: {
          label: { type: 'string' },
          type: { type: 'string', enum: ['green', 'amber', 'rose'] },
        },
      },
    },
  },
} as const

export interface SearchProfileContext {
  age?: number | null
  gender?: string | null
  focuses?: string[]
  lifeStage?: string | null
  conditions?: string[]
}

export interface SearchRequestBody {
  query?: string
  profile?: SearchProfileContext
}

export interface DecodeRequestBody {
  claim?: string
  profileFocuses?: string[]
}

interface SearchApiResult {
  title: string
  category: string
  verdict: string
  confidence: 'High' | 'Medium' | 'Low'
  score: number
  studies: string
  verdictColor: 'green' | 'amber' | 'rose'
  bottomLine: string
  bestEvidenceFor: string[]
  bars: Array<{
    label: string
    value: number
    color: 'green' | 'amber' | 'rose'
  }>
  why: string[]
  whyCitations: Array<Array<{ label: string; sourceIndex: number }>>
  whatToExpect: {
    timeline: string
    improvement: string
    watchFor: string
  }
  personalizedTake: string
  howToUse: {
    dosage: string
    frequency: string
    form: string
  }
  beforeYouBuy: {
    bestForm: string
    suggestedDose: string
    redFlags: string
  }
  communitySignal: {
    trackingCount: number
    commonStack: string
  }
  sideEffects: string
  caution: string
  sources: Array<{
    name: string
    year: string
    badge: 'Supports' | 'Mixed' | 'Limited'
  }>
  compareOptions: Array<{
    query: string
    title: string
    category: string
    score: number
    verdictColor: 'green' | 'amber' | 'rose'
  }>
}

export class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export async function readRequestBody<T>(request: {
  body?: unknown
  [Symbol.asyncIterator]?: () => AsyncIterator<Uint8Array | string>
}) {
  if (request.body !== undefined && request.body !== null) {
    if (typeof request.body === 'string') {
      return JSON.parse(request.body) as T
    }

    return request.body as T
  }

  if (!request[Symbol.asyncIterator]) {
    return {} as T
  }

  const chunks: Uint8Array[] = []
  const iterableRequest = request as AsyncIterable<Uint8Array | string>

  for await (const chunk of iterableRequest) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  return JSON.parse(raw) as T
}

function getResponseText(response: { output_text?: string }) {
  if (!response.output_text) {
    throw new ApiError(502, 'OpenAI response did not include text output')
  }

  return response.output_text.replace(/```json|```/g, '').trim()
}

function normalizeScore(value: number) {
  if (!Number.isFinite(value)) {
    return 0
  }

  const scaled = value > 5 ? value / 20 : value
  return Math.max(0, Math.min(5, Number(scaled.toFixed(1))))
}

function normalizeSearchResult(raw: SearchApiResult): SearchApiResult {
  const sourceCount = raw.sources.length || 1

  return {
    ...raw,
    score: normalizeScore(raw.score),
    studies: raw.studies,
    bars: raw.bars.slice(0, 4).map((bar) => ({
      ...bar,
      value: normalizeScore(bar.value),
    })),
    why: raw.why.slice(0, 4),
    whyCitations: raw.whyCitations.slice(0, 4).map((citationGroup, index) =>
      citationGroup.map((citation, citationIndex) => ({
        label: /^\[\d+\]$/.test(citation.label) ? citation.label : `[${citationIndex + 1}]`,
        sourceIndex: Math.max(0, Math.min(sourceCount - 1, citation.sourceIndex || index)),
      })),
    ),
    whatToExpect: {
      timeline: raw.whatToExpect?.timeline || '',
      improvement: raw.whatToExpect?.improvement || '',
      watchFor: raw.whatToExpect?.watchFor || '',
    },
    personalizedTake: raw.personalizedTake || '',
    howToUse: {
      dosage: raw.howToUse?.dosage || '',
      frequency: raw.howToUse?.frequency || '',
      form: raw.howToUse?.form || '',
    },
    beforeYouBuy: {
      bestForm: raw.beforeYouBuy?.bestForm || '',
      suggestedDose: raw.beforeYouBuy?.suggestedDose || '',
      redFlags: raw.beforeYouBuy?.redFlags || '',
    },
    communitySignal: {
      trackingCount:
        typeof raw.communitySignal?.trackingCount === 'number'
          ? raw.communitySignal.trackingCount
          : 0,
      commonStack: raw.communitySignal?.commonStack || '',
    },
    compareOptions: raw.compareOptions.slice(0, 3).map((option) => ({
      ...option,
      score: normalizeScore(option.score),
    })),
  }
}

function buildSearchProfileContext(profile?: SearchProfileContext) {
  if (!profile) {
    return ''
  }

  const lines: string[] = []

  if (typeof profile.age === 'number' && Number.isFinite(profile.age)) {
    lines.push(`- Age: ${profile.age}`)
  }

  if (profile.gender?.trim()) {
    lines.push(`- Gender: ${profile.gender.trim()}`)
  }

  if (profile.focuses?.length) {
    lines.push(`- Goals: ${profile.focuses.join(', ')}`)
  }

  if (profile.lifeStage?.trim()) {
    lines.push(`- Life stage: ${profile.lifeStage.trim()}`)
  }

  if (profile.conditions?.length) {
    lines.push(`- Conditions: ${profile.conditions.join(', ')}`)
  }

  if (lines.length === 0) {
    return ''
  }

  return `User profile:
${lines.join('\n')}`
}

function getRuntimeConfig(options?: { apiKey?: string; model?: string }) {
  const apiKey = options?.apiKey || process.env.OPENAI_API_KEY
  const model = options?.model || process.env.OPENAI_MODEL || DEFAULT_MODEL_NAME

  if (!apiKey) {
    throw new ApiError(500, 'Missing OPENAI_API_KEY in server environment')
  }

  return { apiKey, model }
}

export async function handleSearchRequest(
  body: SearchRequestBody,
  options?: { apiKey?: string; model?: string },
) {
  const { query, profile } = body

  if (!query?.trim()) {
    throw new ApiError(400, 'Query is required')
  }

  const { apiKey, model } = getRuntimeConfig(options)
  const client = new OpenAI({ apiKey })
  const profileContext = buildSearchProfileContext(profile)

  const prompt = `You are Sage, an evidence-based health research tool with a focus on women-specific evidence when relevant.

${profileContext ? `${profileContext}\n` : ''}Analyze: "${query}"

Return structured JSON for this research result.
Keep "why" to exactly 4 bullets.
Keep "bars" to exactly 4 items in this order: Clinical studies, Safety profile, Expert consensus, Women-specific data.
Write "bottomLine" in a warm, direct, first-person-adjacent tone, like a knowledgeable friend who read all the research and is giving an honest take.
Write "bottomLine" in 1 to 2 sentences maximum.
Use this loose structure for "bottomLine":
1. First say who it is most worth trying for, or what situation makes it relevant.
2. Then set honest expectations: what they should and should not expect, and include a concrete timeframe whenever the studies give one.
Never start "bottomLine" with "Research suggests", "Studies indicate", or "Evidence shows".
Never use the words "modest" or "potential" or the phrase "may potentially" in "bottomLine".
If the evidence is weak, say that plainly and do not oversell it.
If there is no clear population signal, return an empty array for "bestEvidenceFor".
If age or gender changes the relevance, outcomes, timing, or best-supported population, reflect that in "bottomLine", "bestEvidenceFor", "whatToExpect", and "personalizedTake".
If the same ingredient has different evidence for men, women, or different age groups, tailor the framing to the user profile provided instead of giving generic copy.
If gender is "Prefer not to say" or missing, use inclusive framing and do not assume sex-specific biology unless the research only exists for a specific population and that limitation is essential to mention.
If age is missing, do not guess or invent age-specific framing.
When personalizing, do not write stiff copy like "As a 34 year old woman". Weave age, gender, and life stage in naturally only when it genuinely changes the take.
For "whatToExpect", return empty strings for any sub-field you cannot support directly from study context.
For "personalizedTake", if the user profile is missing or not relevant, return an empty string.
For "howToUse", explicitly return the actual dose range or format used in the most cited studies whenever available. Only return empty strings if no dosage, frequency, or form information was available after checking.
For "beforeYouBuy", return empty strings for any sub-field you cannot support.
For "communitySignal", return "trackingCount" as 0 if no real Sage product-tracking count is available, and return "commonStack" as an empty string if no strong pairing is known.
Write "suggestedDose" as the specific dose or range used in the most relevant studies, not a generic recommendation.
Write "bestForm" as the product form with the strongest evidence in studies, if any.
Write "redFlags" as label ingredients, unsupported claims, or quality signals to avoid.
Write "whatToExpect.timeline" as when effects might show up based on study durations.
Let "whatToExpect.timeline" reflect the user's age, gender, or life stage when the timeline or expected outcomes differ meaningfully across populations.
Write "whatToExpect.improvement" as a realistic description of what improvement actually looked like in studies.
Write "whatToExpect.watchFor" as early signs it may not be working or may not suit the user.
Write "personalizedTake" as 2-3 direct sentences on whether this is worth trying given the user's health profile, age, gender, life stage, goals, or conditions when provided.
Make "personalizedTake" feel natural and contextual, not mechanical. Good example: "At this stage, the evidence here is actually pretty relevant to you." Avoid copy like "As a 34 year old woman..."
Keep "sources" concise and "compareOptions" to 2-3 relevant alternatives.`

  const response = await client.responses.create({
    model,
    input: prompt,
    max_output_tokens: 1000,
    text: {
      format: {
        type: 'json_schema',
        name: 'sage_search_result',
        strict: true,
        schema: searchResponseSchema,
      },
    },
  })

  return normalizeSearchResult(JSON.parse(getResponseText(response)) as SearchApiResult)
}

export async function handleDecodeRequest(
  body: DecodeRequestBody,
  options?: { apiKey?: string; model?: string },
) {
  const { claim, profileFocuses = [] } = body

  if (!claim?.trim()) {
    throw new ApiError(400, 'Claim is required')
  }

  const { apiKey, model } = getRuntimeConfig(options)
  const client = new OpenAI({ apiKey })
  const profileContext =
    profileFocuses.length > 0
      ? `User health context: ${profileFocuses.join(', ')}. `
      : ''

  const prompt = `${profileContext}Fact-check this women's health claim: ${claim}

Return structured JSON.
Keep the headline under 8 words.
Keep each body to 2-3 short sentences.
Return 2-4 pills.
First identify the explicit claims in the text.
Then identify any implicit claims suggested by the context, even if they are not directly stated.
Also identify claims made by omission, including when the text frames something like a medical alternative without stating that directly.
Fact-check each claim independently against clinical evidence before deciding the overall verdict.
If there are multiple claims, prioritize the 2 or 3 most significant ones instead of every minor point.
Make it clear which phrase, wording, or part of the original text each important claim came from.
Use "misleadBody" to explain what is misleading, overstated, unsupported, or missing.
Use "truthBody" to explain what is actually supported by evidence.
Set "confidence" to "Low" and "needsMoreDetail" to true if the input is too vague to fact-check responsibly.
When "needsMoreDetail" is true, make the headline briefly say the claim needs more detail, and keep both body fields focused on what extra context would help.
If the input is specific enough to assess, set "needsMoreDetail" to false.`

  const response = await client.responses.create({
    model,
    input: prompt,
    max_output_tokens: 700,
    text: {
      format: {
        type: 'json_schema',
        name: 'sage_decoder_result',
        strict: true,
        schema: decoderResponseSchema,
      },
    },
  })

  return JSON.parse(getResponseText(response)) as Record<string, unknown>
}
