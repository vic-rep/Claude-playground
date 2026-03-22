import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Pagination — page 70:40, section 167:7840 */

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="Pagination">
      <button className={styles.arrow} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">‹</button>
      {getPages().map((p, i) =>
        p === '...' ? <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span> : (
          <button key={p} className={`${styles.page} ${p === currentPage ? styles.active : ''}`} onClick={() => onPageChange(p)} aria-current={p === currentPage ? 'page' : undefined}>
            {p}
          </button>
        )
      )}
      <button className={styles.arrow} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page">›</button>
    </nav>
  );
};
