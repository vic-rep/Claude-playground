import React, { useState, useRef, useCallback } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Tooltip — page 97:1419, section 176:1927 */

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  children: React.ReactElement;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, position = 'top', children, delay = 200 }) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => { timeout.current = setTimeout(() => setVisible(true), delay); }, [delay]);
  const hide = useCallback(() => { clearTimeout(timeout.current); setVisible(false); }, []);

  return (
    <div className={styles.wrapper} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div className={`${styles.tooltip} ${styles[position]}`} role="tooltip">
          {content}
          <span className={styles.arrow} />
        </div>
      )}
    </div>
  );
};
