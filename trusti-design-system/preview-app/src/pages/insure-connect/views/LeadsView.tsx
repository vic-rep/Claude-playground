import React, { useState, useMemo } from 'react';
import { Button, Input, Pill } from '@trusti/design-system';
import { LEADS, LEAD_STATUS_COLORS, INSURANCE_TYPE_ICONS, SOURCE_LABELS } from '../data';
import type { Lead, LeadStatus, InsuranceType } from '../data';

/* ═══════════════════════════════════════════════════════════
   LeadsView — Agent's primary workspace: filterable leads table
   ═══════════════════════════════════════════════════════════ */

interface LeadsViewProps {
  onSelectLead: (leadId: string) => void;
}

const NOW = new Date('2026-03-22T13:00:00');

const ALL_STATUSES: LeadStatus[] = ['NEW', 'ASSIGNED', 'CONTACTED', 'QUALIFIED', 'QUOTED', 'WON', 'LOST', 'DISQUALIFIED'];
const ALL_INSURANCE_TYPES: InsuranceType[] = ['CAR', 'HOME', 'TRAVEL'];
const PRIORITY_RANGES = [
  { label: 'All', min: 0, max: 100 },
  { label: 'High (80+)', min: 80, max: 100 },
  { label: 'Medium (50-79)', min: 50, max: 79 },
  { label: 'Low (<50)', min: 0, max: 49 },
];
const SLA_FILTERS = [
  { label: 'All', value: 'ALL' },
  { label: 'Urgent (<30m)', value: 'URGENT' },
  { label: 'Overdue', value: 'OVERDUE' },
  { label: 'On Track', value: 'OK' },
] as const;

type SlaFilter = (typeof SLA_FILTERS)[number]['value'];

/* ─── Helpers ──────────────────────────────────────────────── */

function getSlaInfo(deadline: string): { text: string; isUrgent: boolean; isOverdue: boolean } {
  const dl = new Date(deadline);
  const diffMs = dl.getTime() - NOW.getTime();

  if (diffMs <= 0) {
    return { text: 'Overdue', isUrgent: true, isOverdue: true };
  }

  const totalMin = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const isUrgent = totalMin < 30;

  if (hours > 0) {
    return { text: `${hours}h ${mins}m`, isUrgent, isOverdue: false };
  }
  return { text: `${mins}m`, isUrgent, isOverdue: false };
}

function getRelativeTime(timestamp: string): string {
  const diffMs = NOW.getTime() - new Date(timestamp).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getPriorityColor(score: number): { bg: string; text: string } {
  if (score >= 80) return { bg: 'var(--color-success-100)', text: 'var(--color-success-700)' };
  if (score >= 50) return { bg: 'var(--color-warning-100)', text: 'var(--color-warning-600)' };
  return { bg: 'var(--color-destructive-100)', text: 'var(--color-destructive-600)' };
}

function getCrossSellColor(potential: string): { bg: string; text: string } | null {
  switch (potential) {
    case 'HIGH': return { bg: 'var(--color-success-100)', text: 'var(--color-success-700)' };
    case 'MED': return { bg: 'var(--color-warning-100)', text: 'var(--color-warning-600)' };
    case 'LOW': return { bg: 'var(--bg-card-nested)', text: 'var(--text-tertiary)' };
    default: return null;
  }
}

const INSURANCE_EMOJI: Record<InsuranceType, string> = {
  CAR: '\u{1F697}',
  HOME: '\u{1F3E0}',
  TRAVEL: '\u{2708}\uFE0F',
};

/* ─── Component ───────────────────────────────────────────── */

export function LeadsView({ onSelectLead }: LeadsViewProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<InsuranceType | 'ALL'>('ALL');
  const [priorityRange, setPriorityRange] = useState(PRIORITY_RANGES[0]);
  const [slaFilter, setSlaFilter] = useState<SlaFilter>('ALL');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    return LEADS.filter((lead) => {
      if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
      if (typeFilter !== 'ALL' && lead.insuranceType !== typeFilter) return false;
      if (lead.priorityScore < priorityRange.min || lead.priorityScore > priorityRange.max) return false;

      if (slaFilter !== 'ALL') {
        const sla = getSlaInfo(lead.slaDeadline);
        if (slaFilter === 'URGENT' && !sla.isUrgent) return false;
        if (slaFilter === 'OVERDUE' && !sla.isOverdue) return false;
        if (slaFilter === 'OK' && (sla.isUrgent || sla.isOverdue)) return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !lead.customerName.toLowerCase().includes(q) &&
          !lead.email.toLowerCase().includes(q) &&
          !lead.phone.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [search, statusFilter, typeFilter, priorityRange, slaFilter]);

  /* ─── Styles ─────────────────────────────────────────────── */

  const filterBarStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-s)',
    alignItems: 'center',
    padding: 'var(--space-l)',
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-m)',
    border: '1px solid var(--border-default)',
    marginBottom: 'var(--space-l)',
  };

  const selectStyle: React.CSSProperties = {
    padding: 'var(--space-xs) var(--space-s)',
    borderRadius: 'var(--radius-s)',
    border: '1px solid var(--border-default)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-text-small)',
    cursor: 'pointer',
    outline: 'none',
  };

  const tableWrapperStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-m)',
    border: '1px solid var(--border-default)',
    overflow: 'auto',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 'var(--font-size-text-small)',
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: 'var(--space-m) var(--space-l)',
    borderBottom: '2px solid var(--border-default)',
    color: 'var(--text-secondary)',
    fontSize: 'var(--font-size-caption)',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
  };

  const tdStyle: React.CSSProperties = {
    padding: 'var(--space-m) var(--space-l)',
    borderBottom: '1px solid var(--border-default)',
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
  };

  const badgeStyle = (bg: string, text: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: 'var(--space-xs) var(--space-s)',
    borderRadius: 'var(--radius-full)',
    background: bg,
    color: text,
    fontSize: 'var(--font-size-caption)',
    fontWeight: 600,
    lineHeight: 1,
  });

  return (
    <div>
      {/* ── Filter Bar ─────────────────────────────────────── */}
      <div style={filterBarStyle}>
        <div style={{ flex: '1 1 200px', minWidth: 180 }}>
          <Input
            inputSize="sm"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<span style={{ fontSize: 'var(--font-size-text-small)', color: 'var(--text-tertiary)' }}>&#128269;</span>}
          />
        </div>

        <select
          style={selectStyle}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'ALL')}
          aria-label="Filter by status"
        >
          <option value="ALL">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          style={selectStyle}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as InsuranceType | 'ALL')}
          aria-label="Filter by insurance type"
        >
          <option value="ALL">All Types</option>
          {ALL_INSURANCE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          style={selectStyle}
          value={priorityRange.label}
          onChange={(e) => {
            const found = PRIORITY_RANGES.find((p) => p.label === e.target.value);
            if (found) setPriorityRange(found);
          }}
          aria-label="Filter by priority"
        >
          {PRIORITY_RANGES.map((p) => (
            <option key={p.label} value={p.label}>{p.label}</option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          {SLA_FILTERS.map((f) => (
            <Pill
              key={f.value}
              variant={slaFilter === f.value ? 'accent' : 'default'}
              selected={slaFilter === f.value}
              onClick={() => setSlaFilter(f.value)}
            >
              {f.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────── */}
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Priority</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Source</th>
              <th style={thStyle}>SLA</th>
              <th style={thStyle}>Last Contact</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Cross-sell</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
              const sla = getSlaInfo(lead.slaDeadline);
              const priorityColor = getPriorityColor(lead.priorityScore);
              const statusColor = LEAD_STATUS_COLORS[lead.status];
              const crossSellColor = getCrossSellColor(lead.crossSellPotential);
              const isHovered = hoveredRow === lead.id;

              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead.id)}
                  onMouseEnter={() => setHoveredRow(lead.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    cursor: 'pointer',
                    background: isHovered ? 'var(--bg-card-nested)' : 'transparent',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  {/* Priority */}
                  <td style={tdStyle}>
                    <span style={badgeStyle(priorityColor.bg, priorityColor.text)}>
                      {lead.priorityScore}
                    </span>
                  </td>

                  {/* Customer */}
                  <td style={tdStyle}>
                    <span style={{ marginRight: 'var(--space-xs)' }}>{lead.countryFlag}</span>
                    <span style={{ fontWeight: 500 }}>{lead.customerName}</span>
                  </td>

                  {/* Insurance Type */}
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        padding: 'var(--space-xs) var(--space-s)',
                        borderRadius: 'var(--radius-s)',
                        background: 'var(--bg-card-nested)',
                        fontSize: 'var(--font-size-caption)',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span>{INSURANCE_EMOJI[lead.insuranceType]}</span>
                      {lead.insuranceType}
                    </span>
                  </td>

                  {/* Source */}
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>
                    {SOURCE_LABELS[lead.source]}
                  </td>

                  {/* SLA Timer */}
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        color: sla.isUrgent ? 'var(--color-destructive-600)' : 'var(--text-primary)',
                      }}
                    >
                      {sla.text}
                    </span>
                  </td>

                  {/* Last Contact */}
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>
                    {getRelativeTime(lead.lastContactAt)}
                  </td>

                  {/* Status */}
                  <td style={tdStyle}>
                    <span style={badgeStyle(statusColor.bg, statusColor.text)}>
                      {lead.status}
                    </span>
                  </td>

                  {/* Cross-sell */}
                  <td style={tdStyle}>
                    {crossSellColor ? (
                      <span style={badgeStyle(crossSellColor.bg, crossSellColor.text)}>
                        {lead.crossSellPotential}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-tertiary)' }}>--</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div
                      style={{ display: 'inline-flex', gap: 'var(--space-xs)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Call"
                        onClick={() => {/* noop for prototype */}}
                      >
                        &#9742;
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Email"
                        onClick={() => {/* noop for prototype */}}
                      >
                        &#9993;
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Snooze"
                        onClick={() => {/* noop for prototype */}}
                      >
                        &#9203;
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredLeads.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    ...tdStyle,
                    textAlign: 'center',
                    padding: 'var(--space-xxl)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  No leads match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Summary ────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 'var(--space-s)',
          fontSize: 'var(--font-size-caption)',
          color: 'var(--text-tertiary)',
          textAlign: 'right',
        }}
      >
        Showing {filteredLeads.length} of {LEADS.length} leads
      </div>
    </div>
  );
}
