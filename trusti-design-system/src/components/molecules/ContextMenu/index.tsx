import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Contextual menus — page 45:10, section 133:134 */

export interface ContextMenuItem { id: string; label: string; icon?: React.ReactNode; disabled?: boolean; destructive?: boolean; divider?: boolean; }

export interface ContextMenuProps {
  items: ContextMenuItem[];
  onSelect: (id: string) => void;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, onSelect, className = '' }) => (
  <div className={`${styles.menu} ${className}`} role="menu">
    {items.map((item) =>
      item.divider ? <div key={item.id} className={styles.divider} role="separator" /> : (
        <button
          key={item.id} role="menuitem" disabled={item.disabled}
          className={`${styles.item} ${item.destructive ? styles.destructive : ''}`}
          onClick={() => onSelect(item.id)}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span>{item.label}</span>
        </button>
      )
    )}
  </div>
);
