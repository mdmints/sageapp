import type { HintItem, TrendItem } from '../types';

export const homeSearchHints: HintItem[] = [
  { emoji: '💊', label: 'Inositol', query: 'Inositol for PCOS' },
  { emoji: '🌿', label: 'Seed cycling', query: 'Seed cycling' },
  { emoji: '🫖', label: 'Spearmint tea', query: 'Spearmint tea for hormones' },
  { emoji: '🌙', label: 'Magnesium', query: 'Magnesium glycinate for sleep' },
  { emoji: '🌱', label: 'Ashwagandha', query: 'Ashwagandha for women' },
  { emoji: '🌸', label: 'Vitex', query: 'Vitex for cycle regulation' },
];

const trendingPool: TrendItem[] = [
  {
    emoji: '💊',
    title: 'Inositol for PCOS',
    category: 'Supplement · Hormone health',
    score: 4.8,
    tone: 'green',
    query: 'Inositol for PCOS',
    iconBackground: 'var(--rose-bg)',
    imageSrc: '/trending/inositol-pouch.svg',
    imageAlt: 'Inositol supplement pouch',
  },
  {
    emoji: '🌿',
    title: 'Seed cycling',
    category: 'Wellness trend · Hormones',
    score: 2.8,
    tone: 'amber',
    query: 'Seed cycling',
    iconBackground: 'var(--sage-bg)',
  },
  {
    emoji: '🌙',
    title: 'Magnesium glycinate',
    category: 'Supplement · Sleep & PMS',
    score: 4.5,
    tone: 'green',
    query: 'Magnesium glycinate for sleep',
    iconBackground: '#f3e8ff',
    imageSrc: '/trending/magnesium-bottle.svg',
    imageAlt: 'Magnesium supplement bottle',
  },
  {
    emoji: '🫖',
    title: 'Spearmint tea',
    category: 'Herbal · Androgen reduction',
    score: 3.7,
    tone: 'green',
    query: 'Spearmint tea for hormones',
    iconBackground: 'var(--green-bg)',
  },
  {
    emoji: '🧴',
    title: 'Collagen peptides',
    category: 'Product · Skin & joints',
    score: 3.4,
    tone: 'amber',
    query: 'Collagen peptides for skin elasticity',
    iconBackground: '#f7efe8',
    imageSrc: '/trending/collagen-tub.svg',
    imageAlt: 'Collagen powder tub',
  },
  {
    emoji: '⚡',
    title: 'Electrolyte packets',
    category: 'Product · Hydration',
    score: 3.8,
    tone: 'green',
    query: 'Electrolyte packets for hydration',
    iconBackground: '#edf4ff',
    imageSrc: '/trending/electrolyte-packets.svg',
    imageAlt: 'Electrolyte packets',
  },
  {
    emoji: '🦠',
    title: 'Probiotic blends',
    category: 'Product · Gut health',
    score: 3.1,
    tone: 'amber',
    query: 'Probiotic supplements for women',
    iconBackground: '#f5efe9',
    imageSrc: '/trending/probiotic-jar.svg',
    imageAlt: 'Probiotic supplement jar',
  },
  {
    emoji: '🌸',
    title: 'Vitex',
    category: 'Herbal · Cycle regulation',
    score: 3.2,
    tone: 'amber',
    query: 'Vitex for cycle regulation',
    iconBackground: '#fdecef',
  },
  {
    emoji: '🌱',
    title: 'Ashwagandha',
    category: 'Herbal · Stress support',
    score: 2.9,
    tone: 'amber',
    query: 'Ashwagandha for women',
    iconBackground: '#eef5e8',
  },
  {
    emoji: '☀️',
    title: 'Vitamin D',
    category: 'Supplement · Mood & bone health',
    score: 4.1,
    tone: 'green',
    query: 'Vitamin D for women',
    iconBackground: '#fff4df',
  },
  {
    emoji: '🧠',
    title: 'Lion’s mane',
    category: 'Mushroom · Focus & mood',
    score: 2.7,
    tone: 'amber',
    query: "Lion's mane for focus",
    iconBackground: '#f3ede8',
  },
  {
    emoji: '💧',
    title: 'Hyaluronic acid',
    category: 'Skincare · Hydration',
    score: 3.6,
    tone: 'green',
    query: 'Hyaluronic acid supplements for skin',
    iconBackground: '#edf7fb',
  },
];

function getIsoWeek(date: Date) {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNumber = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNumber + 3);
  const weekNumber =
    1 + Math.round((target.getTime() - firstThursday.getTime()) / 604800000);

  return weekNumber;
}

export function getWeeklyTrendingItems(date = new Date()) {
  const rotationSeed = date.getFullYear() * 53 + getIsoWeek(date);
  const startIndex = rotationSeed % trendingPool.length;
  const selected: TrendItem[] = [];

  for (let offset = 0; selected.length < 4; offset += 1) {
    const item = trendingPool[(startIndex + offset) % trendingPool.length];

    if (!selected.some((entry) => entry.title === item.title)) {
      selected.push(item);
    }
  }

  return selected;
}
