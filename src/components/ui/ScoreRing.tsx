import { useEffect, useState } from 'react';
import type { VerdictColor } from '../../types';

const toneMap: Record<VerdictColor, string> = {
  green: '#4caf50',
  amber: '#D4854A',
  rose: '#C85B6E',
};

interface ScoreRingProps {
  score: number;
  tone: VerdictColor;
}

export function ScoreRing({ score, tone }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAnimatedScore(score);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [score]);

  const circleLength = 176;
  const fill = Math.min(animatedScore / 5, 1) * circleLength;
  const stroke = toneMap[tone];

  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="shrink-0">
      <circle cx="34" cy="34" r="28" fill="none" stroke="#f0e6e4" strokeWidth="6" />
      <circle
        cx="34"
        cy="34"
        r="28"
        fill="none"
        stroke={stroke}
        strokeWidth="6"
        strokeDasharray={`${fill.toFixed(1)} ${(circleLength - fill + 35).toFixed(1)}`}
        strokeLinecap="round"
        transform="rotate(-90 34 34)"
        className="transition-all duration-700 ease-out"
      />
      <text x="34" y="31" textAnchor="middle" fontSize="12" fontWeight="700" fill={stroke}>
        {score.toFixed(1)}
      </text>
      <text x="34" y="42" textAnchor="middle" fontSize="8" fill="#a08880">
        /5.0
      </text>
    </svg>
  );
}
