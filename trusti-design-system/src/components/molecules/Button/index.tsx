import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Buttons — page 45:5, sections 81:880, 108:2693 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={[
          styles.button,
          styles[variant],
          styles[size],
          fullWidth ? styles.fullWidth : '',
          loading ? styles.loading : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {icon && iconPosition === 'left' && !loading && (
          <span className={styles.icon}>{icon}</span>
        )}
        {children && <span className={styles.label}>{children}</span>}
        {icon && iconPosition === 'right' && !loading && (
          <span className={styles.icon}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
