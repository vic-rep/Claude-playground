import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Drawer — page 448:5219 */

export type DrawerPosition = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, position = 'right', title, children, width = '380px' }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;

  const sizeStyle = position === 'bottom' ? { height: width } : { width };

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={drawerRef} className={`${styles.drawer} ${styles[position]}`} style={sizeStyle} role="dialog" aria-modal="true">
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.close} onClick={onClose} aria-label="Close drawer">✕</button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
