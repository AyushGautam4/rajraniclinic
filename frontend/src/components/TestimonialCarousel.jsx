import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { AppContext } from '../App';

const TestimonialCarousel = ({ reviews }) => {
  const { darkMode, language } = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);
  const indicatorCount = Math.min(6, Math.max(1, reviews.length));
  const activeIndicator = maxIndex === 0 ? 0 : Math.round((current / maxIndex) * (indicatorCount - 1));

  const next = useCallback(() => {
    setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4200);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const cardWidth = 100 / cardsPerView;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-testid="testimonial-carousel"
    >
      <div
        className="overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${current * cardWidth}%)` }}
        >
          {reviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${cardWidth}%` }}
            >
              <Card className={`h-full ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-gray-200'} shadow-md`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="mb-2 flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className={`mb-4 line-clamp-3 text-xs leading-relaxed md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{language === 'hi' ? review.reviewHindi : review.review}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'hi' ? review.nameHindi : review.name}
                      </p>
                      <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {language === 'hi' ? review.locationHindi : review.location}
                      </p>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                      {review.service}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform duration-200 hover:scale-105 ${
          darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        data-testid="carousel-prev"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform duration-200 hover:scale-105 ${
          darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        data-testid="carousel-next"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Running dots */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {Array.from({ length: indicatorCount }).map((_, idx) => {
          const isActive = idx === activeIndicator;
          const targetIndex = indicatorCount === 1 ? 0 : Math.round((idx / (indicatorCount - 1)) * maxIndex);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(targetIndex)}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? `${darkMode ? 'bg-blue-400' : 'bg-blue-600'} h-2 w-5`
                  : `${darkMode ? 'bg-slate-600' : 'bg-gray-300'} h-2 w-2`
              }`}
              aria-label={`Go to testimonial position ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
