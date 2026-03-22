import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Toast — page 2434:9541 */

export type ToastVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: () => void;
  action?: { label: string; onClick: () => void };
}

export const Toast: React.FC<ToastProps> = ({ message, variant = 'info', duration = 5000, onClose, action }) => {
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => { setExiting(true); setTimeout(onClose, 200); }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[variant]} ${exiting ? styles.exit : ''}`} role="status" aria-live="polite">
      <span className={styles.message}>{message}</span>
      {action && <button className={styles.action} onClick={action.onClick}>{action.label}</button>}
      <button className={styles.close} onClick={onClose} aria-label="Dismiss">✕</button>
    </div>
  );
};
