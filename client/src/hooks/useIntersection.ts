import { useCallback, useLayoutEffect, useRef } from 'react';

export function useIntersection(onIntersect: () => void) {
  const onIntersectRef = useRef(onIntersect);
  const unsubscribe = useRef(() => {});

  useLayoutEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  return useCallback((el: HTMLElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersectRef.current();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, [onIntersectRef]);
}
