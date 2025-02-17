import { useState, useLayoutEffect, RefObject } from 'react';
import { debounce } from '@/utils';

export function useAvailableHeight(elementRef: RefObject<HTMLElement>) {
  const DEBOUNCE_DELAY = 100;
  const [availableHeight, setAvailableHeight] = useState(0);

  useLayoutEffect(() => {
    const calculateAvailableHeight = () => {
      const elementHeight= elementRef?.current?.clientHeight || 0;
      const rootElement = document.getElementById('root')!;
      setAvailableHeight(window.innerHeight - (rootElement.clientHeight - elementHeight));
    };
    const debouncedWindowResizeHandler = debounce(calculateAvailableHeight, DEBOUNCE_DELAY);

    calculateAvailableHeight();

    window.addEventListener('resize', debouncedWindowResizeHandler);
    return () => {
      window.removeEventListener('resize', debouncedWindowResizeHandler);
      debouncedWindowResizeHandler.cancel();
    };
  }, [elementRef]);

  return availableHeight;
}
