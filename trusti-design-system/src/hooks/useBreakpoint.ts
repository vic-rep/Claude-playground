import { useState, useEffect } from 'react';
import { breakpoints, type Breakpoint } from '../tokens';

/**
 * Returns the current breakpoint name based on window width.
 * Updates on resize. SSR-safe (defaults to 'desktop').
 */
export function useBreakpoint(): Breakpoint {
  const [current, setCurrent] = useState<Breakpoint>('desktop');

  useEffect(() => {
    function getBreakpoint(): Breakpoint {
      const w = window.innerWidth;
      if (w >= breakpoints.desktop) return 'desktop';
      if (w >= breakpoints.tabletLandscape) return 'tabletLandscape';
      if (w >= breakpoints.tabletPortrait) return 'tabletPortrait';
      return 'mobile';
    }

    setCurrent(getBreakpoint());
    const onResize = () => setCurrent(getBreakpoint());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return current;
}

/** Returns true when viewport is below 768px */
export function useIsMobile(): boolean {
  return useBreakpoint() === 'mobile';
}
