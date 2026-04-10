import { useEffect, useState } from 'react';
import type { ScoreBar, VerdictColor } from '../../types';

const toneMap: Record<VerdictColor, string> = {
  green: '#4caf50',
  amber: '#D4854A',
  rose: '#C85B6E',
};

export function ScoreBars({ bars }: { bars: ScoreBar[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div>
      {bars.map((bar) => {
        const width = `${Math.round((bar.value / 5) * 100)}%`;
        const color = toneMap[bar.color];

        return (
          <div className="bar-row" key={bar.label}>
            <div className="bar-label">{bar.label}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  background: color,
                  width: mounted ? width : '0%',
                }}
              />
            </div>
            <div className="bar-value" style={{ color }}>
              {bar.value.toFixed(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
