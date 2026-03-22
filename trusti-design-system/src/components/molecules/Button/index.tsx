import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Buttons — page 45:5, node 108:2107 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Icon rendered before the label */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label */
  trailingIcon?: React.ReactNode;
  /** Render as icon-only circular button (pass icon as children) */
  iconOnly?: boolean;
  fullWidth?: boolean;
  /** @deprecated Use leadingIcon or trailingIcon instead */
  icon?: React.ReactNode;
  /** @deprecated Use leadingIcon or trailingIcon instead */
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      fullWidth = false,
      disabled,
      children,
      className = '',
      // Legacy props
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Support legacy icon/iconPosition API
    const resolvedLeadingIcon = leadingIcon ?? (icon && iconPosition === 'left' ? icon : undefined);
    const resolvedTrailingIcon = trailingIcon ?? (icon && iconPosition === 'right' ? icon : undefined);

    if (iconOnly) {
      return (
        <button
          ref={ref}
          className={[
            styles.iconButton,
            styles[`iconButton_${size}`],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={isDisabled}
          aria-busy={loading}
          {...props}
        >
          {loading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            <span className={styles.iconSlot}>{children}</span>
          )}
        </button>
      );
    }

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
        {resolvedLeadingIcon && !loading && (
          <span className={styles.icon}>{resolvedLeadingIcon}</span>
        )}
        {children && <span className={styles.label}>{children}</span>}
        {resolvedTrailingIcon && !loading && (
          <span className={styles.icon}>{resolvedTrailingIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
