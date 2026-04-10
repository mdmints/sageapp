import { Pill } from '../ui/Pill';
import type { TrendItem } from '../../types';

interface TrendCardProps {
  item: TrendItem;
  onSelect: (query: string) => void;
}

export function TrendCard({ item, onSelect }: TrendCardProps) {
  return (
    <button className="trend-card" onClick={() => onSelect(item.query)} type="button">
      <div className="trend-icon" style={{ background: item.iconBackground }}>
        {item.imageSrc ? (
          <img
            alt={item.imageAlt || item.title}
            className="trend-image"
            src={item.imageSrc}
          />
        ) : (
          item.emoji
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="saved-item-name">{item.title}</div>
        <div className="saved-item-meta">{item.category}</div>
      </div>
      <Pill label={item.score.toFixed(1)} tone={item.tone} />
    </button>
  );
}
