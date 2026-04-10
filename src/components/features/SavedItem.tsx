import type { KeyboardEvent, MouseEvent } from 'react';
import type { SearchResult } from '../../types';
import { getBackgroundForVerdict, getEmojiForCategory } from '../../services/fallback';

interface SavedItemProps {
  item: SearchResult;
  onOpen: () => void;
  onRemove: () => void;
}

export function SavedItem({ item, onOpen, onRemove }: SavedItemProps) {
  function handleRemove(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onRemove();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  }

  return (
    <div className="saved-item" onClick={onOpen} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      <div
        className="saved-item-icon"
        style={{ background: getBackgroundForVerdict(item.verdictColor) }}
      >
        {getEmojiForCategory(item.category)}
      </div>
      <div className="saved-item-info">
        <div className="saved-item-name">{item.title}</div>
        <div className="saved-item-meta">
          {item.category} · {item.verdict}
        </div>
      </div>
      <button
        aria-label={`Remove ${item.title}`}
        className="remove-button"
        onClick={handleRemove}
        type="button"
      >
        ×
      </button>
    </div>
  );
}
