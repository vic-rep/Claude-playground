import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Toggle — page 74:39, section 176:1866 */

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const inputId = id || `toggle-${React.useId()}`;
    return (
      <label className={`${styles.wrapper} ${className}`} htmlFor={inputId}>
        <input ref={ref} type="checkbox" role="switch" id={inputId} className={styles.input} {...props} />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);
Toggle.displayName = 'Toggle';
