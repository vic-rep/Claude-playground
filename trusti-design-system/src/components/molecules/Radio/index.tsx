import React from 'react';
import styles from './styles.module.css';
/* Figma: ❖ Radio — page 102:1630, section 105:1244 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> { label?: string; }
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ label, className = '', id, ...props }, ref) => {
  const inputId = id || `radio-${React.useId()}`;
  return (
    <label className={`${styles.label} ${className}`} htmlFor={inputId}>
      <input ref={ref} type="radio" id={inputId} className={styles.input} {...props} />
      <span className={styles.indicator} aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
});
Radio.displayName = 'Radio';
