import { useRef, useState } from 'react';
import { BestEvidenceRow } from '../components/features/BestEvidenceRow';
import { BeforeYouBuySection } from '../components/features/BeforeYouBuySection';
import { BottomLine } from '../components/features/BottomLine';
import { CommunitySignalRow } from '../components/features/CommunitySignalRow';
import { CompareRow } from '../components/features/CompareRow';
import { HowToUseSection } from '../components/features/HowToUseSection';
import { PersonalizedTakeSection } from '../components/features/PersonalizedTakeSection';
import { WhatToExpectSection } from '../components/features/WhatToExpectSection';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { OnboardingModal } from '../components/features/OnboardingModal';
import { TopBar } from '../components/shell/TopBar';
import { BulletList } from '../components/ui/BulletList';
import { Card } from '../components/ui/Card';
import { Pill } from '../components/ui/Pill';
import { ScoreBars } from '../components/ui/ScoreBars';
import { ScoreRing } from '../components/ui/ScoreRing';
import { getCommunityTrackingCount } from '../content/communityTracking';
import { useProfile } from '../hooks/useProfile';
import { useSaved } from '../hooks/useSaved';
import { useToast } from '../hooks/useToast';
import { ScreenLayout } from '../layouts/ScreenLayout';
import type { SearchResult } from '../types';

type ResultState =
  | {
      query?: string;
      result?: SearchResult;
      meta?:
        | {
            source: 'api';
          }
        | {
            source: 'fallback';
            error?: string;
          };
    }
  | null;

const confidenceColors = {
  green: { dot: '#4caf50', text: '#1b5e20' },
  amber: { dot: '#ff9800', text: '#7f4400' },
  rose: { dot: '#C85B6E', text: '#7a1a2e' },
};

const sourcePillTones = {
  Supports: 'green',
  Mixed: 'amber',
  Limited: 'rose',
} as const;

export function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { saveItem, isSaved } = useSaved();
  const { showToast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [highlightedSourceIndex, setHighlightedSourceIndex] = useState<number | null>(null);
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = location.state as ResultState;
  const result = state?.result;
  const resultMeta = state?.meta;

  if (!result) {
    return <Navigate replace to="/" />;
  }

  const resolvedResult = result;

  const saved = isSaved(resolvedResult.title);
  const verdictTone = resolvedResult.verdictColor;
  const confidenceTone = confidenceColors[resolvedResult.verdictColor];
  const hasPersonalizationProfile =
    profile.hasAccount &&
    (profile.focuses.length > 0 || profile.age !== null || Boolean(profile.gender));
  const updatedAt = `Updated ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date())}`;
  const trackingCount = getCommunityTrackingCount({
    apiCount: resolvedResult.communitySignal?.trackingCount ?? null,
    query: resolvedResult.query,
    title: resolvedResult.title,
  });

  function handleSave() {
    if (!profile.hasAccount) {
      setShowOnboarding(true);
      return;
    }

    const added = saveItem(resolvedResult);

    showToast(added ? 'Saved to your hub' : 'Already in your hub');
  }

  function handleCitationClick(sourceIndex: number) {
    const target = sourceRefs.current[sourceIndex];

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setHighlightedSourceIndex(sourceIndex);
    window.setTimeout(() => {
      setHighlightedSourceIndex((current) => (current === sourceIndex ? null : current));
    }, 1600);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar
        rightSlot={
          <button
            aria-label="Save to hub"
            className="icon-action-button"
            onClick={handleSave}
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2l1.8 3.6L14 6.3l-3 2.9.7 4.1L8 11.1l-3.7 2.2.7-4.1-3-2.9 4.2-.7L8 2z"
                fill={saved ? '#C85B6E' : 'none'}
                stroke="#a08880"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        }
      />
      <ScreenLayout>
       <div className="flex items-center">
  <button className="back-link" onClick={() => navigate('/')} type="button">
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 12L6 8l4-4"
        stroke="#C85B6E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Back
  </button>

  {hasPersonalizationProfile ? (
    <div className="personalized-badge ml-auto">Personalized for your profile</div>
  ) : null}
</div>

        <div className="eyebrow">{resolvedResult.category}</div>
        <div className="result-title">{resolvedResult.title}</div>
        <div className="mb-[14px] flex items-center gap-2">
          <Pill label={resolvedResult.verdict} tone={verdictTone} />
          <div className="result-ambient-meta">
            <span className="micro">{updatedAt}</span>
            {trackingCount ? (
              <>
                <span className="result-ambient-divider" aria-hidden="true">
                  ·
                </span>
                <span className="micro">
                  {trackingCount.toLocaleString()} Sage users tracking this
                </span>
              </>
            ) : null}
          </div>
        </div>

        {resultMeta?.source === 'fallback' ? (
          <div className="result-fallback-note">
            Live analysis is unavailable right now, so this result is showing fallback research data.
          </div>
        ) : null}

        {resolvedResult.bottomLine ? <BottomLine text={resolvedResult.bottomLine} /> : null}

        <Card>
          <div className="score-wrap">
            <ScoreRing score={resolvedResult.score} tone={resolvedResult.verdictColor} />
            <div>
              <div className="verdict-name">{resolvedResult.verdict}</div>
              <div className="confidence-row">
                <span
                  className="confidence-dot"
                  style={{ background: confidenceTone.dot }}
                />
                <span className="text-[11px] font-medium" style={{ color: confidenceTone.text }}>
                  {resolvedResult.confidence} confidence
                </span>
              </div>
              <div className="micro">{resolvedResult.studies}</div>
            </div>
          </div>
          <ScoreBars bars={resolvedResult.bars} />
        </Card>

        <BestEvidenceRow items={resolvedResult.bestEvidenceFor ?? []} />

        <Card variant="rose">
          <div className="eyebrow mb-2">Why this verdict</div>
          <BulletList
            citations={resolvedResult.whyCitations}
            items={resolvedResult.why}
            onCitationClick={handleCitationClick}
          />
        </Card>

        <WhatToExpectSection content={resolvedResult.whatToExpect} />

        <PersonalizedTakeSection
          hasProfile={hasPersonalizationProfile}
          profileName={profile.name}
          text={resolvedResult.personalizedTake}
        />

        <HowToUseSection guidance={resolvedResult.howToUse} />

        <BeforeYouBuySection content={resolvedResult.beforeYouBuy} />

        <CommunitySignalRow signal={resolvedResult.communitySignal} />

        <Card>
          <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">Tradeoffs</div>
          <div className="tradeoff-box">
            <div className="tradeoff-label">Side effects</div>
            <div className="tradeoff-copy">{resolvedResult.sideEffects}</div>
          </div>
          <div className="mb-1 text-[10px] font-semibold text-[var(--text2)]">Caution for</div>
          <div className="tradeoff-copy">{resolvedResult.caution}</div>
        </Card>

        <Card>
          <div className="eyebrow mb-2">Sources</div>
          <div>
            {resolvedResult.sources.map((source, index) => (
              <div
                className={`source-row ${highlightedSourceIndex === index ? 'source-row-highlighted' : ''} ${index === resolvedResult.sources.length - 1 ? 'last:border-b-0' : ''}`}
                key={`${source.name}-${source.year}`}
                ref={(element) => {
                  sourceRefs.current[index] = element;
                }}
              >
                <div>
                  <div className="text-[12px] font-medium text-[var(--text)]">{source.name}</div>
                  <div className="micro">{source.year}</div>
                </div>
                <Pill label={source.badge} tone={sourcePillTones[source.badge]} />
              </div>
            ))}
          </div>
        </Card>

        <CompareRow items={resolvedResult.compareOptions ?? []} />

        <button
          className="btn-primary"
          disabled={saved}
          onClick={handleSave}
          style={{ opacity: saved ? 0.6 : 1 }}
          type="button"
        >
          {saved ? '✓ Saved to hub' : '+ Save to my hub'}
        </button>
      </ScreenLayout>

      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  );
}
