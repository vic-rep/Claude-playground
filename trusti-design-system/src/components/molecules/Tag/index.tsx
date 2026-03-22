import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Tag — page 3101:360, section 3101:453 */

export interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'accent';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, onRemove, variant = 'default', className = '' }) => (
  <span className={`${styles.tag} ${styles[variant]} ${className}`}>
    <span className={styles.text}>{children}</span>
    {onRemove && (
      <button className={styles.remove} onClick={onRemove} aria-label="Remove tag" type="button">✕</button>
    )}
  </span>
);
