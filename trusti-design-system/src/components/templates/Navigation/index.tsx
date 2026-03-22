import React, { useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Navigation — page 448:5218, sections 2014:340, 3429:12607 */

export interface NavItem { id: string; label: string; href: string; active?: boolean; }

export interface NavigationProps {
  logo: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  onNavigate?: (href: string) => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ logo, items, actions, onNavigate, className = '' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Main navigation">
      <div className={styles.container}>
        <div className={styles.logo}>{logo}</div>
        <button className={styles.burger} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
          <span className={`${styles.burgerLine} ${mobileOpen ? styles.open : ''}`} />
        </button>
        <div className={`${styles.links} ${mobileOpen ? styles.mobileOpen : ''}`}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.link} ${item.active ? styles.active : ''}`}
              onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(item.href); setMobileOpen(false); } }}
            >
              {item.label}
            </a>
          ))}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </nav>
  );
};
