
import { useState, useEffect, RefObject } from 'react';

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // If the element is already close to the viewport on mount (e.g. the
    // page was opened via a direct link, or a crawler never scrolls),
    // reveal it immediately instead of leaving it stuck at opacity-0.
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 2) {
      setIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      threshold: 0,
      rootMargin: '0px 0px 200px 0px'
    });

    observer.observe(ref.current);

    // Guaranteed fallback: no matter what (no scroll, an environment where
    // IntersectionObserver never fires, etc.), content must not stay
    // invisible forever.
    const fallback = window.setTimeout(() => setIntersecting(true), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [ref]);

  return isIntersecting;
}
