export type Verdict = 'Supported' | 'Mixed' | 'Low Evidence';

export interface DimensionScore {
  label: string;
  score: number;
  maxScore: number;
}

export interface Source {
  name: string;
  year: number;
  url?: string;
  type: 'PubMed' | 'NIH' | 'Cochrane' | 'Meta-Analysis' | 'RCT' | 'Observational' | 'Review';
  title: string;
  badge: 'Supports' | 'Mixed' | 'Against';
  summary: string;
}

export interface EvidenceResult {
  id: string;
  query: string;
  category: string;
  verdict: Verdict;
  overallScore: number;
  summary: string;
  dimensions: {
    clinicalStudies: DimensionScore;
    safetyProfile: DimensionScore;
    expertConsensus: DimensionScore;
    womenSpecificData: DimensionScore;
  };
  sources: Source[];
  relatedTags: string[];
  lastUpdated: string;
}
export type VerdictColor = 'green' | 'amber' | 'rose';
export type PillTone = VerdictColor | 'sage' | 'outline';
export type DecoderVerdictType = 'mislead' | 'partial' | 'accurate';

export interface ScoreBar {
  label: string;
  value: number;
  color: VerdictColor;
}

export interface SourceItem {
  name: string;
  year: string;
  badge: 'Supports' | 'Mixed' | 'Limited';
}

export interface CitationTag {
  label: string;
  sourceIndex: number;
}

export interface UsageGuidance {
  dosage?: string;
  frequency?: string;
  form?: string;
}

export interface WhatToExpect {
  timeline?: string;
  improvement?: string;
  watchFor?: string;
}

export interface BeforeYouBuy {
  bestForm?: string;
  suggestedDose?: string;
  redFlags?: string;
}

export interface CommunitySignal {
  trackingCount?: number | null;
  commonStack?: string;
}

export interface CompareOption {
  query: string;
  title: string;
  category: string;
  score: number;
  verdictColor: VerdictColor;
}

export interface SearchResult {
  query: string;
  title: string;
  category: string;
  verdict: string;
  confidence: 'High' | 'Medium' | 'Low';
  score: number;
  studies: string;
  verdictColor: VerdictColor;
  bars: ScoreBar[];
  why: string[];
  whyCitations?: CitationTag[][];
  bottomLine?: string;
  bestEvidenceFor?: string[];
  whatToExpect?: WhatToExpect | null;
  personalizedTake?: string;
  howToUse?: UsageGuidance | null;
  beforeYouBuy?: BeforeYouBuy | null;
  communitySignal?: CommunitySignal | null;
  sideEffects: string;
  caution: string;
  sources: SourceItem[];
  compareOptions?: CompareOption[];
}

export interface DecoderPill {
  label: string;
  type: VerdictColor;
}

export interface DecoderResult {
  verdictLabel: string;
  verdictType: DecoderVerdictType;
  confidence?: 'High' | 'Medium' | 'Low';
  needsMoreDetail?: boolean;
  headline: string;
  misleadBody: string;
  truthBody: string;
  pills: DecoderPill[];
}

export interface ProfileState {
  name: string;
  age: number | null;
  gender: string | null;
  focuses: string[];
  hasAccount: boolean;
  joinedAt: string;
}

export interface GenderOption {
  value: string;
  label: string;
}

export interface TrendItem {
  emoji: string;
  title: string;
  category: string;
  score: number;
  tone: PillTone;
  query: string;
  iconBackground: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface HintItem {
  emoji: string;
  label: string;
  query: string;
}

export interface FocusOption {
  value: string;
  title: string;
  subtitle: string;
  emoji: string;
}

export interface ConnectSource {
  name: string;
  description: string;
  icon: string;
  iconBackground: string;
  ctaLabel: string;
}
