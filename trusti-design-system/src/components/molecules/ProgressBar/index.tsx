import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Progress bar / Stepper — page 45:11, section 161:2317 */

export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value, max = 100, label, showValue = false, variant = 'default', size = 'md', className = '',
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`${styles.track} ${styles[size]}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <div className={`${styles.fill} ${styles[variant]}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};
