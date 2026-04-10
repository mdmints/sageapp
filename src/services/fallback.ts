import type { DecoderResult, SearchResult, VerdictColor } from '../types';

function buildSearchResult(
  query: string,
  partial: Omit<SearchResult, 'query'>,
): SearchResult {
  return {
    query,
    ...partial,
  };
}

export function getEmojiForCategory(category: string) {
  const key = category.toLowerCase();

  return (
    {
      supplement: '💊',
      herbal: '🌿',
      'wellness trend': '✨',
      skincare: '🧴',
      diet: '🥗',
    }[key] || '💊'
  );
}

export function getBackgroundForVerdict(verdictColor: VerdictColor) {
  return {
    green: 'var(--green-bg)',
    amber: 'var(--amber-bg)',
    rose: 'var(--rose-bg)',
  }[verdictColor];
}

export function getFallbackAnalysis(query: string): SearchResult {
  const normalizedQuery = query.toLowerCase();

  if (normalizedQuery.includes('inositol')) {
    return buildSearchResult(query, {
      title: 'Inositol for PCOS',
      category: 'Supplement',
      verdict: 'Likely beneficial',
      confidence: 'High',
      score: 4.8,
      studies: '12 RCTs reviewed',
      verdictColor: 'green',
      bottomLine:
        'Worth trying if PCOS is the reason you are here. This is one of the better-studied options for cycle support, but give it a solid 8 to 12 weeks before deciding whether it is really helping.',
      bestEvidenceFor: ['PCOS', 'Fertility', 'General wellness'],
      bars: [
        { label: 'Clinical studies', value: 4.8, color: 'green' },
        { label: 'Safety profile', value: 4.5, color: 'green' },
        { label: 'Expert consensus', value: 3.8, color: 'green' },
        { label: 'Women-specific data', value: 4.8, color: 'green' },
      ],
      why: [
        '12 randomized controlled trials, mostly in women with PCOS',
        'Consistent results on ovulation rate, cycle length, and insulin markers',
        'Studies are recent (2018–2024) and women-specific by design',
        'No serious adverse events across all reviewed trials',
      ],
      whyCitations: [
        [{ label: '[1]', sourceIndex: 0 }],
        [{ label: '[1]', sourceIndex: 0 }, { label: '[2]', sourceIndex: 1 }],
        [{ label: '[1]', sourceIndex: 0 }],
        [{ label: '[1]', sourceIndex: 0 }, { label: '[2]', sourceIndex: 1 }],
      ],
      howToUse: {
        dosage: '2 to 4 g daily',
        frequency: 'Split into 1 to 2 doses with meals',
        form: 'Myo-inositol powder or capsules',
      },
      sideEffects: 'Mild GI discomfort above 4g. Take with food.',
      caution: 'Caution if on metformin — overlapping mechanisms.',
      sources: [
        { name: 'PubMed', year: '2023', badge: 'Supports' },
        { name: 'Cochrane Review', year: '2022', badge: 'Supports' },
      ],
      compareOptions: [
        {
          query: 'Magnesium glycinate for sleep',
          title: 'Magnesium glycinate',
          category: 'Supplement',
          score: 4.5,
          verdictColor: 'green',
        },
        {
          query: 'Spearmint tea for hormones',
          title: 'Spearmint tea',
          category: 'Herbal',
          score: 3.7,
          verdictColor: 'green',
        },
        {
          query: 'Vitex for cycle regulation',
          title: 'Vitex',
          category: 'Herbal',
          score: 3.2,
          verdictColor: 'amber',
        },
      ],
    });
  }

  if (normalizedQuery.includes('seed')) {
    return buildSearchResult(query, {
      title: 'Seed cycling',
      category: 'Wellness Trend',
      verdict: 'Mixed evidence',
      confidence: 'Low',
      score: 2.8,
      studies: '4 studies reviewed',
      verdictColor: 'amber',
      bottomLine:
        'Fine to try if you like the ritual, but this is not one of the stronger evidence-backed approaches. Don’t expect a big shift from the cycling protocol itself, even after a few cycles.',
      bars: [
        { label: 'Clinical studies', value: 2, color: 'amber' },
        { label: 'Safety profile', value: 4.5, color: 'green' },
        { label: 'Expert consensus', value: 2, color: 'amber' },
        { label: 'Women-specific data', value: 2.5, color: 'amber' },
      ],
      why: [
        'No RCTs specifically on seed cycling protocols',
        'Evidence draws from individual seed nutrients — not the cycling pattern',
        'Safe to try — seeds are nutritious regardless',
        'Anecdotal support is widespread but not clinical evidence',
      ],
      whyCitations: [
        [{ label: '[1]', sourceIndex: 0 }],
        [{ label: '[1]', sourceIndex: 0 }, { label: '[2]', sourceIndex: 1 }],
        [{ label: '[2]', sourceIndex: 1 }],
        [{ label: '[2]', sourceIndex: 1 }],
      ],
      howToUse: {},
      sideEffects: 'None — seeds are food-safe.',
      caution: 'No safety concerns. Limited evidence for the specific cycling protocol.',
      sources: [
        { name: 'PubMed', year: '2021', badge: 'Limited' },
        { name: 'Nutrition Journal', year: '2020', badge: 'Mixed' },
      ],
      compareOptions: [
        {
          query: 'Spearmint tea for hormones',
          title: 'Spearmint tea',
          category: 'Herbal',
          score: 3.7,
          verdictColor: 'green',
        },
        {
          query: 'Magnesium glycinate for sleep',
          title: 'Magnesium glycinate',
          category: 'Supplement',
          score: 4.5,
          verdictColor: 'green',
        },
      ],
    });
  }

  if (normalizedQuery.includes('magnesium')) {
    return buildSearchResult(query, {
      title: 'Magnesium glycinate',
      category: 'Supplement',
      verdict: 'Supported',
      confidence: 'High',
      score: 4.5,
      studies: '18 studies reviewed',
      verdictColor: 'green',
      bottomLine:
        'Genuinely worth trying if sleep or PMS is the problem you want to move first. It tends to be a steady rather than dramatic change, and most people need a few weeks of nightly use before they can really judge it.',
      bestEvidenceFor: ['Sleep support', 'PMS', 'General wellness'],
      bars: [
        { label: 'Clinical studies', value: 4.4, color: 'green' },
        { label: 'Safety profile', value: 5, color: 'green' },
        { label: 'Expert consensus', value: 4.2, color: 'green' },
        { label: 'Women-specific data', value: 4, color: 'green' },
      ],
      why: [
        'Strong evidence for sleep quality improvement',
        'Consistent reduction in PMS symptoms across multiple trials',
        'Excellent safety profile at standard doses (200-400mg)',
        'Glycinate form has superior absorption and fewer GI side effects',
      ],
      whyCitations: [
        [{ label: '[1]', sourceIndex: 0 }, { label: '[3]', sourceIndex: 2 }],
        [{ label: '[1]', sourceIndex: 0 }],
        [{ label: '[2]', sourceIndex: 1 }],
        [{ label: '[1]', sourceIndex: 0 }],
      ],
      howToUse: {
        dosage: '200 to 400 mg elemental magnesium daily',
        frequency: 'Once daily, often in the evening',
        form: 'Magnesium glycinate capsules or powder',
      },
      sideEffects: 'Mild laxative effect at doses above 400mg.',
      caution:
        'May interact with certain antibiotics. Take 2 hours apart from medications.',
      sources: [
        { name: 'PubMed', year: '2023', badge: 'Supports' },
        { name: 'NIH ODS', year: '2022', badge: 'Supports' },
        { name: 'Cochrane', year: '2021', badge: 'Supports' },
      ],
      compareOptions: [
        {
          query: 'Inositol for PCOS',
          title: 'Inositol',
          category: 'Supplement',
          score: 4.8,
          verdictColor: 'green',
        },
        {
          query: 'Spearmint tea for hormones',
          title: 'Spearmint tea',
          category: 'Herbal',
          score: 3.7,
          verdictColor: 'green',
        },
      ],
    });
  }

  return buildSearchResult(query, {
    title: query,
    category: 'Supplement',
    verdict: 'Mixed evidence',
    confidence: 'Medium',
    score: 3.2,
    studies: '6 studies reviewed',
    verdictColor: 'amber',
    bottomLine:
      'Might be worth trying if it lines up closely with what you’re dealing with, but the research is still pretty patchy. There may be something here, just don’t go in expecting a transformation without giving it a few weeks and keeping your expectations realistic.',
    bars: [
      { label: 'Clinical studies', value: 3, color: 'amber' },
      { label: 'Safety profile', value: 3.8, color: 'green' },
      { label: 'Expert consensus', value: 3, color: 'amber' },
      { label: 'Women-specific data', value: 2.8, color: 'amber' },
    ],
    why: [
      'Some supporting clinical evidence exists',
      'Results are inconsistent across studies',
      'More women-specific research is needed',
      'Generally considered safe at standard doses',
    ],
    whyCitations: [
      [{ label: '[1]', sourceIndex: 0 }],
      [{ label: '[1]', sourceIndex: 0 }, { label: '[2]', sourceIndex: 1 }],
      [{ label: '[2]', sourceIndex: 1 }],
      [{ label: '[1]', sourceIndex: 0 }],
    ],
    sideEffects: 'Varies — check standard dosing guidelines.',
    caution: 'Consult a provider if pregnant, breastfeeding, or on medication.',
    sources: [
      { name: 'PubMed', year: '2022', badge: 'Mixed' },
      { name: 'NIH', year: '2021', badge: 'Mixed' },
    ],
    compareOptions: [
      {
        query: 'Inositol for PCOS',
        title: 'Inositol',
        category: 'Supplement',
        score: 4.8,
        verdictColor: 'green',
      },
      {
        query: 'Magnesium glycinate for sleep',
        title: 'Magnesium glycinate',
        category: 'Supplement',
        score: 4.5,
        verdictColor: 'green',
      },
    ],
  });
}

export function getDecoderFallback(claim: string): DecoderResult {
  const normalizedClaim = claim.toLowerCase();

  if (normalizedClaim.includes('castor')) {
    return {
      verdictLabel: 'Misleading',
      verdictType: 'mislead',
      confidence: 'High',
      needsMoreDetail: false,
      headline: '"Detox" and hormone claims unsupported',
      misleadBody:
        'There is no clinical evidence that castor oil packs detox the liver or balance hormones. The liver detoxifies itself — no topical treatment changes this.',
      truthBody:
        'Castor oil has limited anti-inflammatory properties topically. There are no RCTs supporting hormone-balancing effects from packs.',
      pills: [
        { label: 'Detox claim: not supported', type: 'rose' },
        { label: 'Hormone balance: no evidence', type: 'rose' },
        { label: 'Safe to use topically', type: 'green' },
      ],
    };
  }

  if (normalizedClaim.includes('inositol')) {
    return {
      verdictLabel: 'Partially true',
      verdictType: 'partial',
      confidence: 'High',
      needsMoreDetail: false,
      headline: '"Reverses" overstates what evidence shows',
      misleadBody:
        '"Reverses PCOS completely" is inaccurate — PCOS is chronic. Inositol improves markers but does not eliminate the diagnosis. "3 months" for complete reversal has no clinical basis.',
      truthBody:
        'Myo-inositol has strong evidence for improving ovulation, insulin sensitivity, and androgen levels in PCOS. It manages symptoms effectively — but does not reverse the condition.',
      pills: [
        { label: 'Inositol for PCOS: strongly supported', type: 'green' },
        { label: '"Reverses completely": not accurate', type: 'rose' },
        { label: 'Symptom improvement: yes', type: 'green' },
      ],
    };
  }

  return {
    verdictLabel: 'Misleading',
    verdictType: 'mislead',
    confidence: 'Medium',
    needsMoreDetail: false,
    headline: '"Cures in 2 weeks" unsupported',
    misleadBody:
      '"Cure" overstates the evidence significantly. "2 weeks" has no clinical basis — studies show effects emerge over 30+ days.',
    truthBody:
      'Spearmint reduces free testosterone and may improve hormonal acne over 4–8 weeks. Moderate evidence. A supportive intervention, not a cure.',
    pills: [
      { label: 'Anti-androgen effect: supported', type: 'green' },
      { label: '"Cure" claim: not supported', type: 'rose' },
      { label: 'Timeline "2 weeks": no evidence', type: 'rose' },
    ],
  };
}
