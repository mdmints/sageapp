import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CompareOption } from '../../types';
import { Pill } from '../ui/Pill';

const CARD_WIDTH = 160;
const CARD_GAP = 12;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;
const SCROLL_SETTLE_MS = 90;

export function CompareRow({ items }: { items: CompareOption[] }) {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentIndex((current) => Math.max(0, Math.min(items.length - 1, current)));
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  function getNearestIndex(offset: number) {
    const nextIndex = Math.round(offset / SNAP_INTERVAL);
    return Math.max(0, Math.min(items.length - 1, nextIndex));
  }

  function snapToNearest() {
    const container = listRef.current;

    if (!container) {
      return;
    }

    const nearestIndex = getNearestIndex(container.scrollLeft);
    const targetOffset = nearestIndex * SNAP_INTERVAL;
    const distance = Math.abs(container.scrollLeft - targetOffset);

    setCurrentIndex(nearestIndex);

    if (distance < 2) {
      isSnappingRef.current = false;
      return;
    }

    isSnappingRef.current = true;
    container.scrollTo({
      left: targetOffset,
      behavior: 'smooth',
    });

    window.setTimeout(() => {
      isSnappingRef.current = false;
    }, 180);
  }

  function handleScroll() {
    if (isSnappingRef.current) {
      return;
    }

    const container = listRef.current;

    if (!container) {
      return;
    }

    setCurrentIndex(getNearestIndex(container.scrollLeft));

    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      snapToNearest();
    }, SCROLL_SETTLE_MS);
  }

  function scrollToIndex(nextIndex: number) {
    const container = listRef.current;

    if (!container) {
      return;
    }

    const boundedIndex = Math.max(0, Math.min(items.length - 1, nextIndex));

    isSnappingRef.current = true;
    container.scrollTo({
      left: boundedIndex * SNAP_INTERVAL,
      behavior: 'smooth',
    });

    setCurrentIndex(boundedIndex);

    window.setTimeout(() => {
      isSnappingRef.current = false;
    }, 180);
  }

  return (
    <div className="mb-4">
      <div className="result-meta-label">Compare</div>
      <div className="compare-carousel">
        {currentIndex > 0 ? (
          <button
            aria-label="Show previous comparisons"
            className="compare-carousel-button compare-carousel-button-back"
            onClick={() => scrollToIndex(currentIndex - 1)}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3.5L6 8l4 4.5"
                stroke="#C0857A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}

        <div className="compare-scroll-row" onScroll={handleScroll} ref={listRef}>
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

        {currentIndex < items.length - 1 ? (
          <button
            aria-label="Show more comparisons"
            className="compare-carousel-button compare-carousel-button-next"
            onClick={() => scrollToIndex(currentIndex + 1)}
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

      <div className="compare-dots" aria-label="Compare scroll position">
        {items.map((item, index) => (
          <div
            aria-hidden="true"
            className={`compare-dot ${index === currentIndex ? 'is-active' : ''}`}
            key={`${item.query}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
