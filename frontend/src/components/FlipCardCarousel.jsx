import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FlipCardCarousel = ({
  items,
  renderItem,
  getKey,
  className = '',
  darkMode = false,
  autoPlay = false
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const safeItems = useMemo(() => items || [], [items]);
  const maxIndex = Math.max(0, safeItems.length - 1);
  const indicatorCount = safeItems.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay || isPaused || safeItems.length <= 1) return undefined;
    const timer = setInterval(next, 4300);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, next, safeItems.length]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) <= 40) return;
    if (diff > 0) next();
    else prev();
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      <div
        className="overflow-hidden rounded-[1.7rem]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {safeItems.map((item, index) => (
            <div
              key={getKey ? getKey(item, index) : index}
              className="w-full flex-shrink-0 px-1"
              style={{ width: '100%' }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {safeItems.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            className={`absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1.5 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-transform duration-200 hover:scale-105 ${
              darkMode
                ? 'border-slate-700 bg-slate-900/95 text-slate-100'
                : 'border-slate-200 bg-white/95 text-slate-700'
            }`}
            aria-label="Previous card"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className={`absolute right-0 top-1/2 z-10 flex h-9 w-9 translate-x-1.5 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-transform duration-200 hover:scale-105 ${
              darkMode
                ? 'border-slate-700 bg-slate-900/95 text-slate-100'
                : 'border-slate-200 bg-white/95 text-slate-700'
            }`}
            aria-label="Next card"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2.5">
            {Array.from({ length: indicatorCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === current
                    ? 'h-2 w-5 bg-blue-600'
                    : darkMode
                      ? 'h-2 w-2 bg-slate-600'
                      : 'h-2 w-2 bg-gray-300'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FlipCardCarousel;
