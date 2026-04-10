import { Pill } from '../ui/Pill';

export function BestEvidenceRow({ items }: { items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="result-meta-label">Best evidence for</div>
      <div className="result-pill-row">
        {items.map((item) => (
          <Pill key={item} label={item} tone="rose" className="result-meta-pill" />
        ))}
      </div>
    </div>
  );
}
