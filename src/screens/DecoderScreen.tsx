import { useRef, useState } from 'react';
import { decoderExampleClaims } from '../content/decoder';
import { useProfile } from '../hooks/useProfile';
import { useToast } from '../hooks/useToast';
import { ScreenLayout } from '../layouts/ScreenLayout';
import { decodeClaim } from '../services/anthropic';
import { getDecoderFallback } from '../services/fallback';
import { TopBar } from '../components/shell/TopBar';
import { Card } from '../components/ui/Card';
import { Pill } from '../components/ui/Pill';
import type { DecoderResult } from '../types';

const videoPlatformPatterns = [
  'tiktok.com',
  'instagram.com/reel',
  'youtube.com/shorts',
];

function isVideoPlatformLink(value: string) {
  const normalizedValue = value.toLowerCase();
  return videoPlatformPatterns.some((pattern) => normalizedValue.includes(pattern));
}

export function DecoderScreen() {
  const { profile } = useProfile();
  const { showToast } = useToast();
  const claimInputRef = useRef<HTMLInputElement | null>(null);
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<DecoderResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoFallbackInput, setVideoFallbackInput] = useState('');
  const [hasDismissedExamples, setHasDismissedExamples] = useState(false);

  async function submitClaim(nextClaim = claim) {
    const trimmedClaim = nextClaim.trim();

    if (!trimmedClaim) {
      showToast('Paste a claim to fact-check');
      return;
    }

    if (isVideoPlatformLink(trimmedClaim)) {
      setClaim(trimmedClaim);
      setResult(null);
      setVideoFallbackInput('');
      setIsLoading(false);
      return;
    }

    setClaim(trimmedClaim);
    setResult(null);
    setVideoFallbackInput('');
    setIsLoading(true);

    try {
      setResult(await decodeClaim(trimmedClaim, profile.focuses));
    } catch {
      setResult(getDecoderFallback(trimmedClaim));
    } finally {
      setIsLoading(false);
    }
  }

  const showVideoFallback = isVideoPlatformLink(claim);
  const showNeedsMoreDetail = Boolean(result?.needsMoreDetail && result.confidence === 'Low');

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar />
      <ScreenLayout>
        <div className="eyebrow">Verdict</div>
        <div className="display text-[26px]">
          Fact-check <em>any claim</em>
        </div>
        <p className="subtitle mb-4">
          Paste a link, video, or claim and we'll check it against the research.
        </p>

        <div className="claim-wrap">
          <input
            ref={claimInputRef}
            className="claim-input"
            onChange={(event) => {
              setClaim(event.target.value);
              setResult(null);
              if (event.target.value) {
                setHasDismissedExamples(true);
              }
            }}
            placeholder={`"Spearmint tea cures hormonal acne in 2 weeks"`}
            type="text"
            value={claim}
          />
          {claim ? (
            <button
              aria-label="Clear claim"
              className="claim-clear-button"
              onClick={() => {
                setClaim('');
                setResult(null);
                claimInputRef.current?.focus();
              }}
              type="button"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 3L9 9M9 3L3 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : null}
          <button className="searchbar-submit mt-[2px]" onClick={() => void submitClaim()} type="button">
            {isLoading ? (
              <div className="submit-spinner" />
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M2 10L10 6 2 2v3l5 1-5 1v3z" fill="#fff" />
              </svg>
            )}
          </button>
        </div>

        {showVideoFallback ? (
          <Card>
            <div className="mb-[8px] text-[14px] font-semibold text-[var(--text)]">
              We can&apos;t watch the video (yet)
            </div>
            <div className="mb-4 text-[12px] leading-[1.6] text-[var(--text2)]">
              TikToks and reels live in the audio, not the caption. Paste what you heard or saw
              claimed in the video and we&apos;ll fact-check it properly.
            </div>
            <div className="claim-wrap mb-3">
              <textarea
                className="claim-textarea"
                onChange={(event) => setVideoFallbackInput(event.target.value)}
                placeholder="e.g. vibration plates boost lymphatic drainage and help with digestion..."
                rows={2}
                value={videoFallbackInput}
              />
            </div>
            <button
              className="btn-primary"
              onClick={() => void submitClaim(videoFallbackInput)}
              type="button"
            >
              Check this claim
            </button>
            <div className="micro mt-[10px]">
              You can also paste a caption, a comment, or type a claim from memory. It all works.
            </div>
          </Card>
        ) : null}

        {showNeedsMoreDetail ? (
          <Card>
            <div className="mb-[8px] text-[14px] font-semibold text-[var(--text)]">
              This claim is a bit vague. Can you add more detail about what was said?
            </div>
            <div className="claim-wrap mb-3">
              <textarea
                className="claim-textarea"
                onChange={(event) => setClaim(event.target.value)}
                rows={2}
                value={claim}
              />
            </div>
            <button className="btn-primary" onClick={() => void submitClaim()} type="button">
              Check this claim
            </button>
          </Card>
        ) : null}

        {result && !showNeedsMoreDetail ? (
          <div>
            <Card variant={result.verdictType === 'accurate' ? 'green' : 'amber'}>
              <div
                className="mb-[5px] text-[10px] font-bold uppercase tracking-[0.08em]"
                style={{ color: result.verdictType === 'accurate' ? '#1b5e20' : '#7f4400' }}
              >
                {result.verdictLabel}
              </div>
              <div className="mb-[6px] text-[14px] font-semibold text-[var(--text)]">
                {result.headline}
              </div>
              <div className="text-[12px] leading-[1.55] text-[var(--text2)]">
                {result.misleadBody}
              </div>
            </Card>

            <Card variant="green">
              <div className="mb-[5px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#1b5e20]">
                What&apos;s actually true
              </div>
              <div className="text-[12px] leading-[1.55] text-[var(--text2)]">
                {result.truthBody}
              </div>
            </Card>

            <div className="mb-[14px] flex flex-wrap gap-[6px]">
              {result.pills.map((pill) => (
                <Pill key={pill.label} className="text-[10px]" label={pill.label} tone={pill.type} />
              ))}
            </div>
          </div>
        ) : null}

        {!hasDismissedExamples && !result ? (
          <>
            <hr className="section-divider" />
            <div className="micro mb-[10px]">Try an example:</div>
            <div className="flex flex-col gap-[7px]">
              {decoderExampleClaims.map((example) => (
                <button
                  className="hint-pill !rounded-[10px] !px-3 !py-[10px] !text-[12px] text-left"
                  key={example}
                  onClick={() => void submitClaim(example)}
                  type="button"
                >
                  {example}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </ScreenLayout>
    </div>
  );
}
