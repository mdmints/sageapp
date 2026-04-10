import { Card } from '../ui/Card';
import type { BeforeYouBuy } from '../../types';

export function BeforeYouBuySection({
  content,
}: {
  content: BeforeYouBuy | null | undefined;
}) {
  if (!content) {
    return null;
  }

  const rows = [
    { label: 'Best form', value: content.bestForm },
    { label: 'Suggested dose', value: content.suggestedDose },
    { label: 'Red flags', value: content.redFlags },
  ].filter((row) => Boolean(row.value));

  if (!rows.length) {
    return null;
  }

  return (
    <Card>
      <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">Before you buy</div>
      <div className="result-detail-rows">
        {rows.map((row) => (
          <div className="result-detail-row" key={row.label}>
            <div className="before-buy-label">{row.label}</div>
            <div className="result-detail-copy">{row.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
