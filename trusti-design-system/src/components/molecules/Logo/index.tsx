import React, { useMemo } from 'react';
import styles from './styles.module.css';
import { logoRegistry } from '../../../assets/logos';
import type { LogoVariant } from '../../../assets/logos';

/* Figma: ❖ Logos — page 2165:2, node 4449:14615 */

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  /** Logo name from the registry (e.g. 'Speedy', 'BMW', 'Mastercard') */
  name?: string;
  /** Color or grayscale variant */
  variant?: LogoVariant;
  /** Fallback: direct image src (used if name is not provided) */
  src?: string;
  /** Alt text — auto-generated from name if omitted */
  alt?: string;
  /** Render size */
  size?: LogoSize;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  name,
  variant = 'color',
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const svgDataUrl = useMemo(() => {
    if (src || !name) return null;
    const entry = logoRegistry[name];
    if (!entry) return null;
    const svg = variant === 'grayscale' ? entry.grayscaleSvg : entry.colorSvg;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [name, variant, src]);

  const imgSrc = src || svgDataUrl;
  const imgAlt = alt || name || '';

  if (!imgSrc) {
    return (
      <span
        className={`${styles.logo} ${styles[size]} ${styles.placeholder} ${className}`}
        role="img"
        aria-label={imgAlt}
      >
        {name || '?'}
      </span>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={imgAlt}
      className={`${styles.logo} ${styles[size]} ${className}`}
      loading="lazy"
    />
  );
};
