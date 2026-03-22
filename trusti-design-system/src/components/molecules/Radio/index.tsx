import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Radio — page 102:1630, section 105:1244 */

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const inputId = id || `radio-${React.useId()}`;
    return (
      <label className={`${styles.label} ${className}`} htmlFor={inputId}>
        <input ref={ref} type="radio" id={inputId} className={styles.input} {...props} />
        <span className={styles.indicator} aria-hidden="true" />
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Radio.displayName = 'Radio';

/* Figma: ❖ RadioThumb — node 2418:32 */

export interface RadioThumbProps {
  /** Display name below the icon/logo */
  label: string;
  /** Unique value for this option */
  value: string;
  /** Radio group name */
  name: string;
  /** Whether this thumb is selected */
  checked?: boolean;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Icon element — use Font Awesome <i> tag or any ReactNode */
  icon?: React.ReactNode;
  /** Logo element — image, SVG, or any ReactNode (takes priority over icon) */
  logo?: React.ReactNode;
  /** Optional disclaimer text below the card (e.g. price) */
  disclaimer?: string;
  disabled?: boolean;
  className?: string;
}

export const RadioThumb: React.FC<RadioThumbProps> = ({
  label,
  value,
  name,
  checked = false,
  onChange,
  icon,
  logo,
  disclaimer,
  disabled = false,
  className = '',
}) => {
  const inputId = `radio-thumb-${React.useId()}`;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <div
      className={[
        styles.thumb,
        checked ? styles.thumb_active : '',
        disabled ? styles.thumb_disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.thumbInput}
      />
      <label htmlFor={inputId} className={styles.thumbCard}>
        <span className={styles.thumbMedia}>
          {logo || icon || <i className="fa-regular fa-image" aria-hidden="true" />}
        </span>
        <span className={styles.thumbLabel}>{label}</span>
      </label>
      {disclaimer && (
        <span className={styles.thumbDisclaimer}>{disclaimer}</span>
      )}
    </div>
  );
};

RadioThumb.displayName = 'RadioThumb';
