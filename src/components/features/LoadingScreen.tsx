import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { analyzeQuery } from '../../services/anthropic';
import { getFallbackAnalysis } from '../../services/fallback';
import type { SearchResult } from '../../types';

const loadingSteps = [
  'Searching clinical databases',
  'Reviewing study quality',
  'Evaluating women-specific data',
  'Generating evidence score',
];

const STEP_DELAY_MS = 500;
const MIN_LOADING_DURATION_MS = loadingSteps.length * STEP_DELAY_MS;
const EXIT_DELAY_MS = 350;

export function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();
  const [stepIndex, setStepIndex] = useState(0);
  const query = (location.state as { query?: string } | null)?.query ?? '';

  useEffect(() => {
    if (!query) {
      navigate('/', { replace: true });
      return;
    }

    let cancelled = false;
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setStepIndex((current) => Math.min(current + 1, loadingSteps.length - 1));
    }, STEP_DELAY_MS);

    async function runSearch() {
      let result: SearchResult;
      let resultMeta:
        | {
            source: 'api';
          }
        | {
            source: 'fallback';
            error: string;
          } = { source: 'api' };

      try {
        result = await analyzeQuery(query, {
          age: profile.age,
          gender: profile.gender,
          focuses: profile.focuses,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown live analysis error';
        console.error('Live search failed, showing fallback data:', message);
        result = getFallbackAnalysis(query);
        resultMeta = {
          source: 'fallback',
          error: message,
        };
      }

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(MIN_LOADING_DURATION_MS - elapsed, 0);

      if (remaining > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remaining));
      }

      if (cancelled) {
        return;
      }

      window.clearInterval(interval);
      setStepIndex(loadingSteps.length - 1);

      window.setTimeout(() => {
        navigate('/result', {
          replace: true,
          state: {
            query,
            result,
            meta: resultMeta,
          },
        });
      }, EXIT_DELAY_MS);
    }

    void runSearch();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [navigate, profile.age, profile.focuses, profile.gender, query]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-[30px] py-10 text-center">
      
      <div className="loading-spinner" />
      <div className="title mb-[5px]">Analyzing research</div>
      <div className="subtitle mb-[22px] w-full max-w-[260px] truncate text-[12px]">
        Looking up evidence for <strong className="text-[var(--rose)]">&quot;{query}&quot;</strong>
      </div>
      <div className="w-full max-w-[260px]">
        {loadingSteps.map((step, index) => {
          const className =
            index < stepIndex
              ? 'loading-step is-done'
              : index === stepIndex
                ? 'loading-step is-active'
                : 'loading-step';

          return (
            <div className={className} key={step}>
              <div className="loading-step-dot" />
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
