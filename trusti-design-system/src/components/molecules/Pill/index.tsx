import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Pill — page 74:11, section 135:913 */

export type PillVariant = 'default' | 'accent' | 'success' | 'warning' | 'destructive';

export interface PillProps {
  children: React.ReactNode;
  variant?: PillVariant;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, variant = 'default', selected = false, onClick, className = '' }) => (
  <span
    className={`${styles.pill} ${styles[variant]} ${selected ? styles.selected : ''} ${onClick ? styles.interactive : ''} ${className}`}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
  >
    {children}
  </span>
);
