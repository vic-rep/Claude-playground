import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Footer — page 2025:563, frame 2036:821 */

export interface FooterColumn { title: string; links: { label: string; href: string }[]; }

export interface FooterProps {
  logo: React.ReactNode;
  columns: FooterColumn[];
  bottomText?: string;
  socialLinks?: { icon: React.ReactNode; href: string; label: string }[];
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ logo, columns, bottomText, socialLinks, className = '' }) => (
  <footer className={`${styles.footer} ${className}`}>
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.brand}>{logo}</div>
        <div className={styles.columns}>
          {columns.map((col, i) => (
            <div key={i} className={styles.column}>
              <h3 className={styles.columnTitle}>{col.title}</h3>
              <ul className={styles.linkList}>
                {col.links.map((link, j) => (
                  <li key={j}><a href={link.href} className={styles.link}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        {bottomText && <p className={styles.legal}>{bottomText}</p>}
        {socialLinks && (
          <div className={styles.social}>
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} className={styles.socialLink} aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  </footer>
);
