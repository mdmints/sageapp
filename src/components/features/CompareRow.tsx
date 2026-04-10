import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CompareOption } from '../../types';
import { Pill } from '../ui/Pill';

export function CompareRow({ items }: { items: CompareOption[] }) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

      const remainingScroll =
        activeContainer.scrollWidth - activeContainer.clientWidth - activeContainer.scrollLeft;
      setCanScrollRight(remainingScroll > 8);
    }

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [items]);

  function handleAdvance() {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const firstCard = container.querySelector<HTMLElement>('.compare-card');
    const scrollAmount = firstCard ? firstCard.offsetWidth + 12 : 200;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  return (
    <div className="mb-4">
      <div className="result-meta-label">Compare</div>
      <div className="compare-carousel">
        <div className="compare-scroll-row" ref={scrollRef}>
        {items.map((item) => (
          <button
            className="compare-card"
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
        {canScrollRight ? (
          <button
            aria-label="Show more comparisons"
            className="compare-carousel-next"
            onClick={handleAdvance}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3.5L10 8l-4 4.5"
                stroke="#C0857A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
