import React, { useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Vehicle details card — page 3016:4264
   Pre-talon loaded (mobile): node 3016:4263
   Post-talon loaded (mobile): node 3016:4261
   Desktop post-talon loaded: node 3016:4256
   Pre-talon skeleton (mobile): node 3016:4257
   Post-talon skeleton (mobile): node 3016:4260
*/

export type CheckStatus = 'active' | 'inactive' | 'warning' | 'no-info';

export interface ValidityCheck {
  id: string;
  label: string;
  status: CheckStatus;
  /** Custom text for warning status (e.g. "Имете 2 глоби неплатени глоби") */
  statusText?: string;
  onInfo?: () => void;
  onNavigate?: () => void;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  plate: string;
  logoUrl?: string;
  fuelType?: string;
  engineSize?: string;
  horsepower?: string;
  steeringWheel?: string;
  usageType?: string;
}

export interface VehicleDetailsCardProps {
  /** When provided → post-talon state (full dark card). When absent → pre-talon. */
  vehicle?: VehicleDetails;
  /** Validity checks (MTPL, Casco, Vignette, Fines, etc.) */
  checks?: ValidityCheck[];
  /** Show skeleton loading placeholders */
  loading?: boolean;
  /** Plate number shown in pre-talon header */
  plate?: string;
  /** Called when cogwheel button is clicked (post-talon) */
  onEdit?: () => void;
  /** Called when talon is submitted (pre-talon) */
  onTalonSubmit?: (talonNumber: string) => void;
  /** Trusti logo URL for the CTA section */
  trustiLogoUrl?: string;
  className?: string;
}

/* ── Status icon map (FA icon classes) ───────────────────── */
const STATUS_ICON: Record<CheckStatus, string> = {
  active: 'fa-solid fa-circle-check',
  inactive: 'fa-solid fa-circle-xmark',
  warning: 'fa-solid fa-triangle-exclamation',
  'no-info': 'fa-solid fa-circle-question',
};

/* Figma exact colors:
   active:   --success/green-600 = #80c8a3
   inactive: --destructive/red-500 = #ff8091
   warning:  --warning/300 = #ff9d1f
   no-info:  --primary/500 = #808080
*/
const STATUS_COLOR: Record<CheckStatus, string> = {
  active: '#80c8a3',
  inactive: '#ff8091',
  warning: '#ff9d1f',
  'no-info': '#808080',
};

/* ── Vehicle detail pill data ────────────────────────────── */
interface DetailPill {
  icon: string;
  label: string;
}

function getVehiclePills(v: VehicleDetails): DetailPill[] {
  const pills: DetailPill[] = [];
  if (v.plate) pills.push({ icon: 'fa-solid fa-car', label: v.plate });
  if (v.fuelType) pills.push({ icon: 'fa-solid fa-gas-pump', label: v.fuelType });
  if (v.engineSize) pills.push({ icon: 'fa-solid fa-engine', label: v.engineSize });
  if (v.horsepower) pills.push({ icon: 'fa-solid fa-horse', label: v.horsepower });
  if (v.steeringWheel) pills.push({ icon: 'fa-solid fa-steering-wheel', label: v.steeringWheel });
  if (v.usageType) pills.push({ icon: 'fa-solid fa-taxi', label: v.usageType });
  return pills;
}

/* ── Skeleton placeholder ────────────────────────────────── */
function SkeletonBar({ width = '100%', height = 24 }: { width?: string | number; height?: number }) {
  return <div className={styles.skeleton} style={{ width, height }} />;
}

function SkeletonCard({ hasTalon }: { hasTalon: boolean }) {
  return (
    <div className={styles.cardDark}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {hasTalon && <SkeletonBar width={24} height={24} />}
          <SkeletonBar width={160} height={20} />
        </div>
        {hasTalon && <SkeletonBar width={24} height={24} />}
      </div>
      {hasTalon && (
        <div className={styles.pills}>
          <SkeletonBar width={90} height={24} />
          <SkeletonBar width={60} height={24} />
          <SkeletonBar width={60} height={24} />
          <SkeletonBar width={70} height={24} />
        </div>
      )}
      <div className={styles.checks}>
        <SkeletonBar height={28} />
        <SkeletonBar height={28} />
        <SkeletonBar height={28} />
        <SkeletonBar height={28} />
      </div>
    </div>
  );
}

/* ── Single check row ────────────────────────────────────── */
function CheckRow({ check }: { check: ValidityCheck }) {
  const isWarningWithText = check.status === 'warning' && check.statusText;

  return (
    <div
      className={`${styles.checkRow} ${check.onNavigate ? styles.checkRowClickable : ''}`}
      role={check.onNavigate ? 'button' : undefined}
      tabIndex={check.onNavigate ? 0 : undefined}
      onClick={check.onNavigate}
      onKeyDown={check.onNavigate ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); check.onNavigate!(); } } : undefined}
    >
      <div className={styles.checkLeft}>
        <i
          className={`${STATUS_ICON[check.status]} ${styles.checkStatusIcon}`}
          style={{ color: STATUS_COLOR[check.status] }}
          aria-hidden="true"
        />
        <span className={styles.checkLabel}>
          {isWarningWithText ? check.statusText : check.label}
        </span>
        {check.onInfo && (
          <button
            className={styles.infoBtn}
            onClick={(e) => { e.stopPropagation(); check.onInfo!(); }}
            aria-label={`Info about ${check.label}`}
            type="button"
          >
            <i className="fa-regular fa-circle-info" aria-hidden="true" />
          </button>
        )}
      </div>
      {check.onNavigate && (
        <i className={`fa-regular fa-chevron-right ${styles.checkChevron}`} aria-hidden="true" />
      )}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({
  vehicle,
  checks = [],
  loading = false,
  plate,
  onEdit,
  onTalonSubmit,
  trustiLogoUrl,
  className = '',
}) => {
  const [talonInput, setTalonInput] = useState('');
  const hasTalon = !!vehicle;

  if (loading) {
    return (
      <div className={className}>
        <SkeletonCard hasTalon={hasTalon} />
      </div>
    );
  }

  const handleTalonSubmit = () => {
    if (onTalonSubmit && talonInput.trim()) {
      onTalonSubmit(talonInput.trim());
    }
  };

  /* ── Post-Talon: single dark card ──────────────────────── */
  if (hasTalon) {
    const pills = getVehiclePills(vehicle);
    return (
      <div className={`${styles.cardDark} ${className}`}>
        {/* Left column (on desktop) */}
        <div className={styles.postTalonLeft}>
          {/* Header: logo + name + cogwheel */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              {vehicle.logoUrl && (
                <img src={vehicle.logoUrl} alt={`${vehicle.make} logo`} className={styles.logo} />
              )}
              <h3 className={styles.vehicleName}>
                {vehicle.make} {vehicle.model} {vehicle.year}
              </h3>
            </div>
            {onEdit && (
              <button className={styles.cogBtn} onClick={onEdit} aria-label="Edit vehicle details" type="button">
                <i className="fa-regular fa-gear" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Vehicle detail pills */}
          {pills.length > 0 && (
            <div className={styles.pills}>
              {pills.map((pill, i) => (
                <div key={i} className={styles.pill}>
                  <i className={`${pill.icon} ${styles.pillIcon}`} aria-hidden="true" />
                  <span className={styles.pillLabel}>{pill.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider (desktop only, rendered via CSS) */}
        <div className={styles.divider} />

        {/* Validity checks */}
        {checks.length > 0 && (
          <div className={styles.checks}>
            {checks.map((check) => (
              <CheckRow key={check.id} check={check} />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Pre-Talon: dark top + light bottom ────────────────── */
  return (
    <div className={`${styles.preTalonWrapper} ${className}`}>
      {/* ── Dark top section (header + checks) ───────────── */}
      <div className={`${styles.cardDark} ${styles.preTalonTop}`}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.preTalonTitle}>Резултати от проверката</h3>
          {plate && (
            <div className={styles.platePill}>
              <i className="fa-solid fa-car" style={{ fontSize: 12, color: 'white' }} aria-hidden="true" />
              <span className={styles.plateText}>{plate}</span>
            </div>
          )}
        </div>

        {/* Validity checks */}
        {checks.length > 0 && (
          <div className={styles.checks}>
            {checks.map((check) => (
              <CheckRow key={check.id} check={check} />
            ))}
          </div>
        )}
      </div>

      {/* ── Light bottom section (CTA) ───────────────────── */}
      {onTalonSubmit && (
        <div className={styles.talonCta}>
          <div className={styles.talonInfo}>
            {trustiLogoUrl ? (
              <div className={styles.talonLogoBadge}>
                <img src={trustiLogoUrl} alt="Trusti" className={styles.talonLogoImg} />
              </div>
            ) : (
              <div className={styles.talonLogoBadge}>
                <i className="fa-solid fa-shield-check" style={{ fontSize: 16, color: 'var(--interactive-primary)' }} aria-hidden="true" />
              </div>
            )}
            <p className={styles.talonInfoText}>
              Проверете всички задължения свързани с автомобила си с Trusti AI Брокер.
            </p>
          </div>
          <div className={styles.talonForm}>
            <div className={styles.talonInputWrap}>
              <input
                type="text"
                className={styles.talonInput}
                placeholder="Номер на талон"
                value={talonInput}
                onChange={(e) => setTalonInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTalonSubmit(); }}
                aria-label="Talon number"
              />
            </div>
            <button
              className={styles.talonSubmit}
              onClick={handleTalonSubmit}
              disabled={!talonInput.trim()}
              type="button"
            >
              Въведи
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
