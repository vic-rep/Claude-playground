import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Input — page 45:8, section 158:247 */

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, errorMessage, inputSize = 'md', leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`;
    const helperId = `${inputId}-helper`;
    return (
      <div className={`${styles.field} ${error ? styles.error : ''} ${className}`}>
        {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
        <div className={`${styles.inputWrapper} ${styles[inputSize]}`}>
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
          <input ref={ref} id={inputId} className={styles.input} aria-invalid={error} aria-describedby={helperText || errorMessage ? helperId : undefined} {...props} />
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </div>
        {(helperText || errorMessage) && (
          <p id={helperId} className={styles.helper}>{error ? errorMessage : helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
