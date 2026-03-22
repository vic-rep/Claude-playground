import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Carousel — page 3206:390, sections 3206:392, 3210:1199 */

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children, autoPlay = false, interval = 5000, showDots = true, showArrows = true, className = '',
}) => {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = children.length;

  const goTo = useCallback((index: number) => {
    setCurrent(((index % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const t = setInterval(() => goTo(current + 1), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, current, goTo, total]);

  return (
    <div className={`${styles.carousel} ${className}`} role="region" aria-label="Carousel" aria-roledescription="carousel">
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
          {children.map((child, i) => (
            <div key={i} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`Slide ${i + 1} of ${total}`}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && total > 1 && (
        <>
          <button className={`${styles.arrow} ${styles.prev}`} onClick={() => goTo(current - 1)} aria-label="Previous slide">‹</button>
          <button className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(current + 1)} aria-label="Next slide">›</button>
        </>
      )}

      {showDots && total > 1 && (
        <div className={styles.dots} role="tablist">
          {children.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
