import type { HintItem } from '../../types';

interface HintPillsProps {
  items: HintItem[];
  onSelect: (query: string) => void;
}

export function HintPills({ items, onSelect }: HintPillsProps) {
  return (
    <div className="hint-row">
      {items.map((item) => (
        <button
          key={item.label}
          className="hint-pill"
          onClick={() => onSelect(item.query)}
          type="button"
        >
          {item.emoji} {item.label}
        </button>
      ))}
    </div>
  );
}
