import { Card } from '../ui/Card';
import type { WhatToExpect } from '../../types';

export function WhatToExpectSection({
  content,
}: {
  content: WhatToExpect | null | undefined;
}) {
  if (!content) {
    return null;
  }

  const rows = [
    { label: 'Timeline', value: content.timeline },
    { label: 'What improvement looks like', value: content.improvement },
    { label: 'What to watch for', value: content.watchFor },
  ].filter((row) => Boolean(row.value));

  if (!rows.length) {
    return null;
  }

  return (
    <Card className="result-accent-card">
      <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">What to expect</div>
      <div className="result-detail-rows">
        {rows.map((row) => (
          <div className="result-detail-row" key={row.label}>
            <div className="result-detail-label">{row.label}</div>
            <div className="result-detail-copy">{row.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
