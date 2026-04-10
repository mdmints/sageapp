import type { FocusOption, GenderOption } from '../types';

export const onboardingFocuses: FocusOption[] = [
  {
    value: 'PCOS',
    title: 'PCOS',
    subtitle: 'Polycystic ovary syndrome',
    emoji: '🌸',
  },
  {
    value: 'Hormone health',
    title: 'Hormone health',
    subtitle: 'Cycle irregularities, PMS',
    emoji: '🔄',
  },
  {
    value: 'Fertility',
    title: 'Fertility & pregnancy',
    subtitle: 'TTC, prenatal, postpartum',
    emoji: '🤰',
  },
  {
    value: 'Perimenopause',
    title: 'Perimenopause',
    subtitle: 'Hormonal transitions',
    emoji: '🌊',
  },
  {
    value: 'Skincare',
    title: 'Skincare & beauty',
    subtitle: 'Ingredients, safety, efficacy',
    emoji: '🧴',
  },
  {
    value: 'Energy & mood',
    title: 'Energy & mood',
    subtitle: 'Sleep, anxiety, supplements',
    emoji: '⚡',
  },
];

export const onboardingGenderOptions: GenderOption[] = [
  { value: 'Woman', label: 'Woman' },
  { value: 'Man', label: 'Man' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];
