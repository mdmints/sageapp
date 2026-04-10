import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CompareOption } from '../../types';
import { Pill } from '../ui/Pill';

export function CompareRow({ items }: { items: CompareOption[] }) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    function updateScrollState() {
      const activeContainer = scrollRef.current;

      if (!activeContainer) {
        return;
      }

      const firstCard = activeContainer.querySelector<HTMLElement>('.compare-card');
      const scrollStep = firstCard ? firstCard.offsetWidth + 12 : activeContainer.clientWidth;
      const nextIndex = Math.round(activeContainer.scrollLeft / scrollStep);

      setActiveIndex(Math.max(0, Math.min(items.length - 1, nextIndex)));
    }

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [items]);

  return (
    <div className="mb-4">
      <div className="result-meta-label">Compare</div>
      <div className="compare-carousel">
        <div className="compare-scroll-row" ref={scrollRef}>
          {items.map((item, index) => (
            <button
              className={`compare-card ${index === items.length - 1 ? 'compare-card-last' : ''}`}
              key={`${item.query}-${item.title}`}
              onClick={() => navigate('/search/loading', { state: { query: item.query } })}
              type="button"
            >
              <div className="mb-[6px] flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 text-left">
                  <div className="compare-card-title">{item.title}</div>
                  <div className="compare-card-category">{item.category}</div>
                </div>
                <Pill label={item.score.toFixed(1)} tone={item.verdictColor} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="compare-dots" aria-label="Compare scroll position">
        {items.map((item, index) => (
          <div
            aria-hidden="true"
            className={`compare-dot ${index === activeIndex ? 'is-active' : ''}`}
            key={`${item.query}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
