import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Alerts — page 45:13, section 161:786 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  icon,
  className = '',
}) => (
  <div className={`${styles.alert} ${styles[variant]} ${className}`} role="alert">
    {icon && <span className={styles.icon}>{icon}</span>}
    <div className={styles.content}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.body}>{children}</div>
    </div>
    {onClose && (
      <button className={styles.close} onClick={onClose} aria-label="Close alert">
        ✕
      </button>
    )}
  </div>
);
