import React from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Vehicle details card — page 2275:74, section 2277:271
   Variants: Vehicle card v2 × Desktop/Mobile × talon/no-talon × True/False */

export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  plate?: string;
  talonNumber?: string;
  imageUrl?: string;
}

export interface VehicleDetailsCardProps {
  vehicle: VehicleDetails;
  onEdit?: () => void;
  showTalon?: boolean;
  verified?: boolean;
  className?: string;
}

export const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({
  vehicle, onEdit, showTalon = false, verified = false, className = '',
}) => (
  <div className={`${styles.card} ${className}`}>
    <div className={styles.header}>
      <div className={styles.info}>
        <h3 className={styles.title}>{vehicle.make} {vehicle.model}</h3>
        <span className={styles.year}>{vehicle.year}</span>
        {verified && <span className={styles.verified}>✓ Verified</span>}
      </div>
      {onEdit && <button className={styles.editBtn} onClick={onEdit}>Edit</button>}
    </div>
    {vehicle.plate && <div className={styles.detail}><span className={styles.label}>Plate</span><span className={styles.value}>{vehicle.plate}</span></div>}
    {showTalon && vehicle.talonNumber && <div className={styles.detail}><span className={styles.label}>Talon №</span><span className={styles.value}>{vehicle.talonNumber}</span></div>}
  </div>
);
