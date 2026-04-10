import { useState } from 'react';
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

export function DecoderScreen() {
  const { profile } = useProfile();
  const { showToast } = useToast();
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<DecoderResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitClaim(nextClaim = claim) {
    const trimmedClaim = nextClaim.trim();

    if (!trimmedClaim) {
      showToast('Paste a claim to fact-check');
      return;
    }

    setClaim(trimmedClaim);
    setResult(null);
    setIsLoading(true);

    try {
      setResult(await decodeClaim(trimmedClaim, profile.focuses));
    } catch {
      setResult(getDecoderFallback(trimmedClaim));
    } finally {
      setIsLoading(false);
    }
  }

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
          <textarea
            className="claim-textarea"
            onChange={(event) => setClaim(event.target.value)}
            placeholder={`"Spearmint tea cures hormonal acne in 2 weeks"`}
            rows={1}
            value={claim}
          />
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

        {result ? (
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
      </ScreenLayout>
    </div>
  );
}
