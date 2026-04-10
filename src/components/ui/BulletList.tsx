import { Pill } from './Pill';
import type { CitationTag } from '../../types';

interface BulletListProps {
  items: string[];
  citations?: CitationTag[][];
  onCitationClick?: (sourceIndex: number) => void;
}

export function BulletList({
  items,
  citations = [],
  onCitationClick,
}: BulletListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <div className="bullet-row" key={item}>
          <div className="bullet-dot" />
          <div className="bullet-text">
            <span>{item}</span>
            {citations[index]?.length ? (
              <span className="citation-tag-row">
                {citations[index].map((citation) => (
                  <button
                    className="citation-tag-button"
                    key={`${item}-${citation.label}-${citation.sourceIndex}`}
                    onClick={() => onCitationClick?.(citation.sourceIndex)}
                    type="button"
                  >
                    <Pill label={citation.label} tone="rose" className="citation-pill" />
                  </button>
                ))}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
