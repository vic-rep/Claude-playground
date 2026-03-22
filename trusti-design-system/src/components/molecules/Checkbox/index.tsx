import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Checkbox — page 45:6, section 98:1621 */

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `checkbox-${React.useId()}`;
    return (
      <div className={`${styles.wrapper} ${error ? styles.error : ''} ${className}`}>
        <label className={styles.label} htmlFor={inputId}>
          <input ref={ref} type="checkbox" id={inputId} className={styles.input} {...props} />
          <span className={styles.checkmark} aria-hidden="true" />
          {label && <span className={styles.text}>{label}</span>}
        </label>
        {helperText && <p className={styles.helper}>{helperText}</p>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
