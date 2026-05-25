import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component - Automatically scrolls to top on route change
 * This ensures better UX when navigating between pages
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const frame = window.requestAnimationFrame(() => {
      resetScroll();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
