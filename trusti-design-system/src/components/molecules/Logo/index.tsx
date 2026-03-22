import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Logos — page 2165:2 — Company, Delivery, Payment, Car, Partnership logos */

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  src: string;
  alt: string;
  size?: LogoSize;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ src, alt, size = 'md', className = '' }) => (
  <img src={src} alt={alt} className={`${styles.logo} ${styles[size]} ${className}`} loading="lazy" />
);
