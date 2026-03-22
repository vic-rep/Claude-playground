import React, { useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Alerts — page 45:13, node 269:4635 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  children?: React.ReactNode;
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

const WarningIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.09 1.658a1.053 1.053 0 0 1 1.82 0l6.374 11.03A1.053 1.053 0 0 1 14.374 14H1.626a1.053 1.053 0 0 1-.912-1.312L7.09 1.658ZM8 5.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5Zm0 5.5a.625.625 0 1 0 0 1.25.625.625 0 0 0 0-1.25Z" fill="currentColor"/>
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.5 4a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0V5Zm.5 5.5a.625.625 0 1 1 0 1.25.625.625 0 0 1 0-1.25Z" fill="currentColor"/>
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM7.5 7a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0V7Z" fill="currentColor"/>
  </svg>
);

const SuccessIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm3.354 5.354-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7 9.293l3.646-3.647a.5.5 0 0 1 .708.708Z" fill="currentColor"/>
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUpIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const variantIcons: Record<AlertVariant, React.FC> = {
  warning: WarningIcon,
  destructive: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
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

  const Icon = variantIcons[variant];

  return (
    <div
      className={`${styles.alert} ${styles[variant]} ${className}`}
      role="alert"
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.icon} ${styles[`icon_${variant}`]}`}>
            <Icon />
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
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
