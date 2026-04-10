import type { ConnectSource } from '../types';

export const connectSources: ConnectSource[] = [
  {
    name: 'Apple Health',
    description: 'Cycle, sleep, HRV, activity',
    icon: '⌚',
    iconBackground: '#f5f5f5',
    ctaLabel: 'Connect',
  },
  {
    name: 'Oura Ring',
    description: 'Sleep, readiness, temperature',
    icon: '💍',
    iconBackground: '#fff0f5',
    ctaLabel: 'Connect',
  },
  {
    name: 'MyFitnessPal',
    description: 'Nutrition, macros, supplements',
    icon: '📊',
    iconBackground: '#fff8e1',
    ctaLabel: 'Connect',
  },
  {
    name: 'Health records',
    description: 'Lab results, diagnoses, Rx',
    icon: '🏥',
    iconBackground: '#f0f4ff',
    ctaLabel: 'Connect',
  },
  {
    name: 'Add biometrics',
    description: 'Enter labs, cycle data manually',
    icon: '🩺',
    iconBackground: '#e8f5e9',
    ctaLabel: 'Add',
  },
];
