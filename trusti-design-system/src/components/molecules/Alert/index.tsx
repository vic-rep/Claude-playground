import React, { useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Alerts — page 45:13, node 269:4635 */
/* Icons: Font Awesome 7 Pro (fa-solid) */

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  children?: React.ReactNode;
  /** Override the default variant icon */
  icon?: React.ReactNode;
  /** Primary action rendered as secondary button */
  action?: AlertAction;
  /** Link-style action rendered as ghost button */
  linkAction?: AlertAction;
  /** Controlled expanded state — if omitted, component manages its own state */
  expanded?: boolean;
  /** Called when chevron is clicked */
  onToggle?: () => void;
  /** Start expanded (only used in uncontrolled mode) */
  defaultExpanded?: boolean;
  className?: string;
}

/** Default Font Awesome icon class per variant (fa-solid) */
const variantIconClasses: Record<AlertVariant, string> = {
  warning: 'fa-solid fa-triangle-exclamation',
  destructive: 'fa-solid fa-circle-exclamation',
  info: 'fa-solid fa-circle-info',
  success: 'fa-solid fa-circle-check',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  icon,
  action,
  linkAction,
  expanded: controlledExpanded,
  onToggle,
  defaultExpanded = false,
  className = '',
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;
  const hasContent = Boolean(children || action || linkAction);

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalExpanded(prev => !prev);
    }
  };

  const renderedIcon = icon ?? (
    <i className={variantIconClasses[variant]} aria-hidden="true" />
  );

  return (
    <div
      className={`${styles.alert} ${styles[variant]} ${className}`}
      role="alert"
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.icon} ${styles[`icon_${variant}`]}`}>
            {renderedIcon}
          </span>
          <span className={styles.title}>{title}</span>
        </div>
        {hasContent && (
          <button
            className={styles.toggle}
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse alert' : 'Expand alert'}
            type="button"
          >
            <i
              className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {isExpanded && hasContent && (
        <div className={styles.expandedContent}>
          {children && <div className={styles.message}>{children}</div>}
          {(action || linkAction) && (
            <div className={styles.actions}>
              {action && (
                <button
                  className={styles.actionButton}
                  onClick={action.onClick}
                  type="button"
                >
                  {action.label}
                </button>
              )}
              {linkAction && (
                <button
                  className={styles.linkButton}
                  onClick={linkAction.onClick}
                  type="button"
                >
                  {linkAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
