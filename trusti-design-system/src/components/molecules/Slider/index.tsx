import React, { useCallback } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Slider — page 493:5220, COMPONENT_SET 594:468 */

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  showValue?: boolean;
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = false, min = 0, max = 100, value, onChange, className = '', id, ...props }, ref) => {
    const inputId = id || `slider-${React.useId()}`;
    const pct = ((Number(value ?? 50) - Number(min)) / (Number(max) - Number(min))) * 100;

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(Number(e.target.value));
    }, [onChange]);

    return (
      <div className={`${styles.wrapper} ${className}`}>
        {(label || showValue) && (
          <div className={styles.header}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            {showValue && <span className={styles.value}>{value}</span>}
          </div>
        )}
        <input
          ref={ref} type="range" id={inputId} min={min} max={max} value={value}
          className={styles.slider} onChange={handleChange}
          style={{ '--pct': `${pct}%` } as React.CSSProperties}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';
