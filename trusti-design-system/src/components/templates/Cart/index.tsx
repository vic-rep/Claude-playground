import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Cart — page 2313:29, section 2313:503 */

export interface CartItem { id: string; label: string; price: number; description?: string; }

export interface CartProps {
  items: CartItem[];
  currency?: string;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  checkoutLabel?: string;
  className?: string;
}

export const Cart: React.FC<CartProps> = ({
  items, currency = 'лв.', onRemove, onCheckout, checkoutLabel = 'Continue to checkout', className = '',
}) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`${styles.cart} ${className}`}>
      <h3 className={styles.title}>Your selection</h3>
      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemLabel}>{item.label}</span>
              {item.description && <span className={styles.itemDesc}>{item.description}</span>}
            </div>
            <div className={styles.itemRight}>
              <span className={styles.itemPrice}>{currency}{item.price.toFixed(2)}</span>
              {onRemove && <button className={styles.removeBtn} onClick={() => onRemove(item.id)} aria-label={`Remove ${item.label}`}>✕</button>}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>{currency}{total.toFixed(2)}</span>
      </div>
      {onCheckout && <button className={styles.checkoutBtn} onClick={onCheckout}>{checkoutLabel}</button>}
    </div>
  );
};
