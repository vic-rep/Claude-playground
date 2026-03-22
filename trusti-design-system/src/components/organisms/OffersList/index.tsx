import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Offers list — page 147:1690, section 173:800
   Variants: MTPL, Casco, Travel, QuickLoans × Desktop/Mobile × Default/Hover/Pressed/Skeleton */

export type OfferProduct = 'mtpl' | 'casco' | 'travel' | 'quickLoans';

export interface OfferItem {
  id: string;
  companyName: string;
  companyLogo: string;
  price: number;
  currency?: string;
  period?: string;
  features?: string[];
  recommended?: boolean;
  product: OfferProduct;
}

export interface OffersListProps {
  offers: OfferItem[];
  loading?: boolean;
  skeletonCount?: number;
  onSelect: (offerId: string) => void;
  className?: string;
}

export const OffersList: React.FC<OffersListProps> = ({
  offers, loading = false, skeletonCount = 3, onSelect, className = '',
}) => (
  <div className={`${styles.list} ${className}`} role="list">
    {loading
      ? Array.from({ length: skeletonCount }, (_, i) => <OfferSkeleton key={`skeleton-${i}`} />)
      : offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onSelect={() => onSelect(offer.id)} />
        ))
    }
  </div>
);

const OfferCard: React.FC<{ offer: OfferItem; onSelect: () => void }> = ({ offer, onSelect }) => (
  <div className={`${styles.card} ${offer.recommended ? styles.recommended : ''}`} role="listitem" onClick={onSelect} onKeyDown={(e) => { if (e.key === 'Enter') onSelect(); }} tabIndex={0}>
    {offer.recommended && <span className={styles.badge}>Recommended</span>}
    <div className={styles.cardHeader}>
      <img src={offer.companyLogo} alt={offer.companyName} className={styles.logo} loading="lazy" />
      <span className={styles.companyName}>{offer.companyName}</span>
    </div>
    <div className={styles.cardBody}>
      {offer.features && (
        <ul className={styles.features}>
          {offer.features.map((f, i) => <li key={i} className={styles.feature}>{f}</li>)}
        </ul>
      )}
    </div>
    <div className={styles.cardFooter}>
      <div className={styles.price}>
        <span className={styles.amount}>{offer.currency ?? 'лв.'}{offer.price.toFixed(2)}</span>
        {offer.period && <span className={styles.period}>/{offer.period}</span>}
      </div>
      <span className={styles.selectCta}>Select →</span>
    </div>
  </div>
);

const OfferSkeleton: React.FC = () => (
  <div className={`${styles.card} ${styles.skeleton}`} role="listitem" aria-hidden="true">
    <div className={styles.cardHeader}><div className={styles.skelBlock} style={{ width: 48, height: 48, borderRadius: 8 }} /><div className={styles.skelBlock} style={{ width: 120, height: 16 }} /></div>
    <div className={styles.cardBody}><div className={styles.skelBlock} style={{ width: '80%', height: 12 }} /><div className={styles.skelBlock} style={{ width: '60%', height: 12 }} /></div>
    <div className={styles.cardFooter}><div className={styles.skelBlock} style={{ width: 80, height: 24 }} /></div>
  </div>
);
