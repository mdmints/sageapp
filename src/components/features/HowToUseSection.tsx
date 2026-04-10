import { Card } from '../ui/Card';
import type { UsageGuidance } from '../../types';

export function HowToUseSection({ guidance }: { guidance: UsageGuidance | null | undefined }) {
  if (!guidance) {
    return null;
  }

  const entries = [
    { label: 'Dosage', value: guidance.dosage },
    { label: 'Frequency', value: guidance.frequency },
    { label: 'Form', value: guidance.form },
  ].filter((entry) => Boolean(entry.value));

  if (!entries.length && !guidance.dosage && !guidance.frequency && !guidance.form) {
    return (
      <Card>
        <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">How to use it</div>
        <div className="how-to-use-empty">
          No standard dose established in current research.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">How to use it</div>
      <div className="how-to-use-grid">
        {entries.map((entry) => (
          <div className="how-to-use-item" key={entry.label}>
            <div className="how-to-use-label">{entry.label}</div>
            <div className="how-to-use-value">{entry.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
