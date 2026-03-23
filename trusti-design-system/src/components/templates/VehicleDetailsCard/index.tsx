import React, { useState } from 'react';
import styles from './styles.module.css';

/* Figma: ❖ Vehicle details card — page 3016:4264
   Variants: VehicleCardV × Desktop/Mobile × talon/no-talon × skeleton/loaded
   Mobile Pre-Talon:  node 3016:4257  (skeleton), node 3016:4263 (loaded — no talon, no skeleton)
   Mobile Post-Talon: node 3016:4260  (skeleton), node 3016:4261 (loaded)
   Desktop Pre-Talon: node 3016:4258  (skeleton), node 3016:4259 (loaded)
   Desktop Post-Talon: node 3016:4262 (skeleton), node 3016:4256 (loaded)
*/

export type CheckStatus = 'active' | 'inactive' | 'warning' | 'no-info';

export interface ValidityCheck {
  /** Unique identifier for the check */
  id: string;
  /** Display label (e.g. "Гражданска отговорност", "Каско", "Винетка", "Глоби") */
  label: string;
  /** Current status */
  status: CheckStatus;
  /** Optional status text shown for warning state (e.g. "Имете 2 глоби неплатени глоби") */
  statusText?: string;
  /** Called when info (i) button is clicked */
  onInfo?: () => void;
  /** Called when row is clicked / chevron tapped — navigates to detail */
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
  /**
   * Vehicle data. When provided → post-talon state (dark bg, full details).
   * When absent → pre-talon state (light bg, talon CTA).
   */
  vehicle?: VehicleDetails;
  /** Validity checks to display (MTPL, Casco, Vignette, Fines, etc.) */
  checks?: ValidityCheck[];
  /** Show skeleton loading placeholders */
  loading?: boolean;
  /** Plate number shown in pre-talon header */
  plate?: string;
  /** Called when cogwheel (edit) button is clicked (post-talon state) */
  onEdit?: () => void;
  /** Called when talon number is submitted (pre-talon state) */
  onTalonSubmit?: (talonNumber: string) => void;
  className?: string;
}

/* ── Status icon mapping ────────────────────────────────── */
const STATUS_ICON: Record<CheckStatus, string> = {
  active: 'fa-solid fa-circle-check',
  inactive: 'fa-solid fa-circle-xmark',
  warning: 'fa-solid fa-triangle-exclamation',
  'no-info': 'fa-solid fa-circle-question',
};

const STATUS_COLOR: Record<CheckStatus, string> = {
  active: 'var(--color-success-600)',
  inactive: '#D94040',
  warning: 'var(--color-warning-600)',
  'no-info': 'var(--text-tertiary)',
};

/* ── Vehicle detail pill helper ──────────────────────────── */
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
    <div className={`${styles.card} ${hasTalon ? styles.postTalon : styles.preTalon}`}>
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
          <SkeletonBar width={55} height={24} />
          <SkeletonBar width={140} height={24} />
        </div>
      )}
      <div className={styles.checks}>
        <SkeletonBar height={28} />
        <SkeletonBar height={28} />
        <SkeletonBar height={28} />
        <SkeletonBar height={28} />
      </div>
      {!hasTalon && (
        <div className={styles.talonCta}>
          <SkeletonBar height={40} />
        </div>
      )}
    </div>
  );
}

/* ── Check row subcomponent ──────────────────────────────── */
function CheckRow({ check, dark }: { check: ValidityCheck; dark: boolean }) {
  const hasWarningText = check.status === 'warning' && check.statusText;

  return (
    <div
      className={`${styles.checkRow} ${dark ? styles.checkRowDark : ''} ${hasWarningText ? styles.checkRowWarning : ''}`}
      role={check.onNavigate ? 'button' : undefined}
      tabIndex={check.onNavigate ? 0 : undefined}
      onClick={check.onNavigate}
      onKeyDown={check.onNavigate ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); check.onNavigate!(); } } : undefined}
    >
      <div className={styles.checkLeft}>
        <i
          className={`${STATUS_ICON[check.status]} ${styles.checkIcon}`}
          style={{ color: STATUS_COLOR[check.status] }}
          aria-hidden="true"
        />
        <span className={`${styles.checkLabel} ${dark ? styles.checkLabelDark : ''}`}>
          {hasWarningText ? check.statusText : check.label}
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
        <i className={`fa-regular fa-chevron-right ${styles.checkChevron} ${dark ? styles.checkChevronDark : ''}`} aria-hidden="true" />
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

  /* ── Post-Talon state ──────────────────────────────────── */
  if (hasTalon) {
    const pills = getVehiclePills(vehicle);
    return (
      <div className={`${styles.card} ${styles.postTalon} ${className}`}>
        {/* Header: logo + name + cogwheel */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {vehicle.logoUrl && (
              <img
                src={vehicle.logoUrl}
                alt={`${vehicle.make} logo`}
                className={styles.logo}
              />
            )}
            <h3 className={styles.vehicleName}>
              {vehicle.make} {vehicle.model} {vehicle.year}
            </h3>
          </div>
          {onEdit && (
            <button
              className={styles.cogBtn}
              onClick={onEdit}
              aria-label="Edit vehicle details"
              type="button"
            >
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

        {/* Divider (vertical on desktop, horizontal on mobile — handled in CSS) */}

        {/* Validity checks */}
        {checks.length > 0 && (
          <div className={styles.checks}>
            {checks.map((check) => (
              <CheckRow key={check.id} check={check} dark />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Pre-Talon state ───────────────────────────────────── */
  return (
    <div className={`${styles.card} ${styles.preTalon} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.preTalonTitle}>Резултати от проверката</h3>
        {plate && (
          <div className={styles.platePill}>
            <span className={styles.plateText}>{plate}</span>
          </div>
        )}
      </div>

      {/* Validity checks */}
      {checks.length > 0 && (
        <div className={styles.checks}>
          {checks.map((check) => (
            <CheckRow key={check.id} check={check} dark={false} />
          ))}
        </div>
      )}

      {/* Talon CTA */}
      {onTalonSubmit && (
        <div className={styles.talonCta}>
          <div className={styles.talonInfo}>
            <i className={`fa-solid fa-circle-check ${styles.talonInfoIcon}`} aria-hidden="true" />
            <p className={styles.talonInfoText}>
              Проверете всички задължения свързани с автомобила си с Trusti AI Брокер.
            </p>
          </div>
          <div className={styles.talonForm}>
            <input
              type="text"
              className={styles.talonInput}
              placeholder="Въведете номер на талона"
              value={talonInput}
              onChange={(e) => setTalonInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleTalonSubmit(); }}
              aria-label="Talon number"
            />
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
