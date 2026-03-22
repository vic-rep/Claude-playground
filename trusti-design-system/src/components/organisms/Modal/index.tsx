import React, { useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Modal — page 448:2624, section 2451:1439 */

export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open, onClose, title, size = 'md', children, footer, closeOnOverlay = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      previousFocus.current?.focus();
    }
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (closeOnOverlay && e.target === dialogRef.current) onClose();
  }, [closeOnOverlay, onClose]);

  if (!open) return null;

  return (
    <dialog ref={dialogRef} className={`${styles.dialog} ${styles[size]}`} onKeyDown={handleKeyDown} onClick={handleBackdropClick}>
      <div className={styles.content}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.close} onClick={onClose} aria-label="Close modal">✕</button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </dialog>
  );
};
