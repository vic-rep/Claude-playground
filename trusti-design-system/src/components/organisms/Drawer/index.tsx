import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Drawer — page 4032:12225
   Mobile Info:    node 4032:12221
   Mobile Action:  node 4032:12222
   Mobile Fixed:   node 4032:12220
   Desktop Action: node 4032:12223
   Desktop Info:   node 4032:12224
   Desktop Fixed:  node 4032:12219
*/

export type DrawerVariant = 'info' | 'action';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Called when the drawer should close (overlay click, X button, Escape key) */
  onClose: () => void;
  /**
   * Drawer variant:
   * - 'info': Display-only, no actions. Mobile: slides from right (max 300px). Desktop: slides from right (480px).
   * - 'action': Interactive with forms/CTAs. Mobile: slides from bottom (max 600px). Desktop: slides from right (480px).
   */
  variant?: DrawerVariant;
  /** Header title */
  title?: string;
  /** Main content */
  children: React.ReactNode;
  /** Optional footer content (rendered below a divider) */
  footer?: React.ReactNode;
  /**
   * Show drag notch on mobile actionable drawers.
   * When true, bottom padding is reduced to 4px per spec.
   */
  notch?: boolean;
  className?: string;
}

/** Media query breakpoint matching the design system (768px) */
function useIsMobileDrawer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  variant = 'info',
  title,
  children,
  footer,
  notch = false,
  className = '',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const isMobile = useIsMobileDrawer();

  // Determine position based on variant + viewport
  const isMobileAction = isMobile && variant === 'action';
  const position = isMobileAction ? 'bottom' : 'right';

  // Close with exit animation
  const handleClose = useCallback(() => {
    setClosing(true);
  }, []);

  // After exit animation completes, call onClose
  const handleAnimationEnd = useCallback(() => {
    if (closing) {
      setClosing(false);
      onClose();
    }
  }, [closing, onClose]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, handleClose]);

  if (!open && !closing) return null;

  // Build animation class
  const animClass = closing
    ? (position === 'bottom' ? styles.slideOutDown : styles.slideOutRight)
    : (position === 'bottom' ? styles.slideInUp : styles.slideInRight);

  // Speed class: mobile info = 480ms, mobile action = 480ms open / 240ms close, desktop = 600ms
  let speedClass = styles.speedDesktop; // 600ms
  if (isMobile && variant === 'info') speedClass = styles.speedMobileInfo; // 480ms
  else if (isMobile && variant === 'action' && closing) speedClass = styles.speedMobileActionClose; // 240ms
  else if (isMobile && variant === 'action') speedClass = styles.speedMobileAction; // 480ms

  // Variant-specific classes
  const variantClass = isMobileAction ? styles.bottom : styles.right;
  const sizeClass = isMobile
    ? (variant === 'info' ? styles.mobileInfo : styles.mobileAction)
    : styles.desktop;

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${variantClass} ${sizeClass} ${animClass} ${speedClass} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Drawer'}
        onAnimationEnd={(e) => e.stopPropagation()}
      >
        {/* ── Notch (mobile action only) ──────────────────── */}
        {isMobileAction && notch && (
          <div className={styles.notchContainer}>
            <div className={styles.notch} />
          </div>
        )}

        {/* ── Header with title + close button ────────────── */}
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.close}
              onClick={handleClose}
              aria-label="Close drawer"
              type="button"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* ── Body ────────────────────────────────────────── */}
        <div className={`${styles.body} ${isMobileAction && notch ? styles.bodyWithNotch : ''}`}>
          {children}
        </div>

        {/* ── Footer ──────────────────────────────────────── */}
        {footer && (
          <div className={styles.footer}>
            <div className={styles.footerDivider} />
            <div className={styles.footerContent}>{footer}</div>
          </div>
        )}
      </div>
    </div>
  );
};
