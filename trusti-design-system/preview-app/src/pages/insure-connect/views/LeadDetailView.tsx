import React, { useState, useMemo, useCallback } from 'react';
import { Button, Pill, Toggle, Checkbox, Alert } from '@trusti/design-system';
import {
  LEADS, LEAD_ACTIVITIES, AI_HINTS, CONDITIONS, SCRIPTS,
  LEAD_STATUS_COLORS, HINT_COLORS, INSURANCE_TYPE_ICONS,
  calculatePricing,
} from '../data';
import type { Lead, AiHint, Condition, PricingTier, ScriptNode } from '../data';

/* ═══════════════════════════════════════════════════════════
   LeadDetailView — Lead Detail + Call Workspace
   Split-panel: customer profile (left) + call tools (right)
   ═══════════════════════════════════════════════════════════ */

interface LeadDetailViewProps {
  leadId: string;
  onBack: () => void;
}

/* ─── Activity type icons ──────────────────────────────── */
const ACTIVITY_ICONS: Record<string, string> = {
  CALL: 'fa-phone',
  EMAIL: 'fa-envelope',
  SMS: 'fa-comment-sms',
  NOTE: 'fa-sticky-note',
  STATUS_CHANGE: 'fa-arrow-right-arrow-left',
};

const ACTIVITY_COLORS: Record<string, string> = {
  CALL: 'var(--color-success-600)',
  EMAIL: 'var(--color-accent-600)',
  SMS: 'var(--color-warning-600)',
  NOTE: 'var(--text-secondary)',
  STATUS_CHANGE: 'var(--color-primary-600)',
};

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: 'var(--color-destructive-600)',
  MEDIUM: 'var(--color-warning-600)',
  LOW: 'var(--text-tertiary)',
};

/* ─── Helpers ──────────────────────────────────────────── */

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  const day = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${day}, ${time}`;
}

/* ═══════════════════════════════════════════════════════════ */

export function LeadDetailView({ leadId, onBack }: LeadDetailViewProps) {
  const lead = LEADS.find((l) => l.id === leadId);

  /* ── State ──────────────────────────────────────────────── */
  const [selectedTier, setSelectedTier] = useState<number>(1); // default Standard
  const [bundleDiscount, setBundleDiscount] = useState(false);
  const [conditions, setConditions] = useState<Condition[]>(CONDITIONS.map((c) => ({ ...c })));
  const [hints, setHints] = useState<AiHint[]>(AI_HINTS.map((h) => ({ ...h })));
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());
  const [scriptNodeIdx, setScriptNodeIdx] = useState(0);
  const [scriptPromptChecked, setScriptPromptChecked] = useState<Set<string>>(new Set());
  const [callActive, setCallActive] = useState(true);
  const [onHold, setOnHold] = useState(false);
  const [muted, setMuted] = useState(false);
  const [recording, setRecording] = useState(true);

  /* ── Derived ────────────────────────────────────────────── */
  const pricing = useMemo(() => {
    if (!lead) return [];
    const vehicleValue = lead.vehicleData?.value ?? lead.propertyData?.value ?? 20000;
    return calculatePricing(vehicleValue, 35, 0, bundleDiscount ? 2 : 1);
  }, [lead, bundleDiscount]);

  const script = useMemo(() => {
    if (!lead) return null;
    return SCRIPTS.find((s) => s.productType === lead.insuranceType && s.isActive) ?? SCRIPTS[0];
  }, [lead]);

  const currentNode: ScriptNode | null = script?.nodes[scriptNodeIdx] ?? null;

  const allMandatoryChecked = useMemo(
    () => conditions.filter((c) => c.isMandatory).every((c) => c.checked),
    [conditions],
  );

  const visibleHints = useMemo(
    () => hints.filter((h) => !h.dismissed).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)),
    [hints],
  );

  /* ── Handlers ───────────────────────────────────────────── */
  const toggleCondition = useCallback((id: string) => {
    setConditions((prev) => prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  }, []);

  const dismissHint = useCallback((id: string) => {
    setHints((prev) => prev.map((h) => (h.id === id ? { ...h, dismissed: true } : h)));
  }, []);

  const pinHint = useCallback((id: string) => {
    setHints((prev) => prev.map((h) => (h.id === id ? { ...h, pinned: !h.pinned } : h)));
  }, []);

  const toggleHintReasoning = useCallback((id: string) => {
    setExpandedHints((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleScriptPrompt = useCallback((prompt: string) => {
    setScriptPromptChecked((prev) => {
      const next = new Set(prev);
      if (next.has(prompt)) next.delete(prompt);
      else next.add(prompt);
      return next;
    });
  }, []);

  /* ── Early return ──────────────────────────────────────── */
  if (!lead) {
    return (
      <div style={{ padding: 'var(--space-xl)' }}>
        <Alert title="Lead not found" variant="destructive" />
        <Button onClick={onBack} style={{ marginTop: 'var(--space-m)' }}>
          <i className="fa-solid fa-arrow-left" /> Back
        </Button>
      </div>
    );
  }

  const statusColor = LEAD_STATUS_COLORS[lead.status];

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-l)', height: '100%', overflow: 'hidden' }}>

      {/* ════════════════════════ LEFT PANEL ════════════════════════ */}
      <div style={{ overflowY: 'auto', padding: 'var(--space-l)', display: 'flex', flexDirection: 'column', gap: 'var(--space-l)' }}>

        {/* ── Header: Back + Name + Status ────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-m)' }}>
          <Button onClick={onBack} variant="ghost" size="sm">
            <i className="fa-solid fa-arrow-left" />
          </Button>
          <h2 style={{ flex: 1, margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600 }}>
            {lead.countryFlag} {lead.customerName}
          </h2>
          <span
            style={{
              display: 'inline-block',
              padding: 'var(--space-xs) var(--space-s)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: statusColor.bg,
              color: statusColor.text,
            }}
          >
            {lead.status}
          </span>
        </div>

        {/* ── Contact Info Card ────────────────────────────────────── */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-m)', padding: 'var(--space-m)' }}>
          <h3 style={{ margin: '0 0 var(--space-s)', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-s)' }}>
            {[
              { icon: 'fa-envelope', label: 'Email', value: lead.email },
              { icon: 'fa-phone', label: 'Phone', value: lead.phone },
              { icon: 'fa-globe', label: 'Country', value: `${lead.countryFlag} ${lead.country}` },
              { icon: 'fa-language', label: 'Language', value: lead.language },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <i className={`fa-solid ${icon}`} style={{ color: 'var(--text-tertiary)', width: 16, textAlign: 'center' }} />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Insurance Data Card ──────────────────────────────────── */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-m)', padding: 'var(--space-m)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-s)' }}>
            <i className={`fa-solid ${INSURANCE_TYPE_ICONS[lead.insuranceType]}`} style={{ color: 'var(--color-accent-600)' }} />
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
              {lead.insuranceType === 'CAR' ? 'Vehicle Details' : lead.insuranceType === 'HOME' ? 'Property Details' : 'Travel Details'}
            </h3>
          </div>

          {lead.vehicleData && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-s)' }}>
              {[
                { label: 'Vehicle', value: `${lead.vehicleData.make} ${lead.vehicleData.model}` },
                { label: 'Year', value: String(lead.vehicleData.year) },
                { label: 'Value', value: formatCurrency(lead.vehicleData.value) },
                { label: 'Mileage', value: `${lead.vehicleData.mileage.toLocaleString()} km` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {lead.propertyData && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-s)' }}>
              {[
                { label: 'Type', value: lead.propertyData.type },
                { label: 'Value', value: formatCurrency(lead.propertyData.value) },
                { label: 'Size', value: `${lead.propertyData.sqm} m²` },
                { label: 'Year Built', value: String(lead.propertyData.yearBuilt) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {lead.travelData && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-s)' }}>
              {[
                { label: 'Destination', value: lead.travelData.destination },
                { label: 'Duration', value: `${lead.travelData.duration} days` },
                { label: 'Travelers', value: String(lead.travelData.travelers) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Dynamic Pricing Panel ────────────────────────────────── */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-m)', padding: 'var(--space-m)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-m)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Pricing Tiers</h3>
            <Toggle
              label="Add Home Insurance (-12%)"
              checked={bundleDiscount}
              onChange={(e) => setBundleDiscount((e.target as HTMLInputElement).checked)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-s)' }}>
            {pricing.map((tier, idx) => {
              const isSelected = idx === selectedTier;
              return (
                <div
                  key={tier.name}
                  onClick={() => setSelectedTier(idx)}
                  style={{
                    border: isSelected ? '2px solid var(--color-accent-600)' : '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-m)',
                    padding: 'var(--space-m)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-card-nested)' : 'transparent',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 'var(--space-xs)' }}>
                    {tier.name}
                    {idx === 1 && (
                      <span style={{
                        marginLeft: 'var(--space-xs)',
                        fontSize: '0.65rem',
                        background: 'var(--color-accent-600)',
                        color: '#fff',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        Popular
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-accent-600)' }}>
                    {formatCurrency(tier.monthlyPremium)}
                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/mo</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-s)' }}>
                    {formatCurrency(tier.annualPremium)}/yr
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)', fontWeight: 600 }}>Coverage</div>
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-m)', fontSize: '0.75rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                    {tier.coverage.map((item) => (
                      <li key={item} style={{ marginBottom: 2 }}>
                        <i className="fa-solid fa-check" style={{ color: 'var(--color-success-600)', marginRight: 'var(--space-xs)', fontSize: '0.65rem' }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {tier.extras.length > 0 && (
                    <>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 'var(--space-s)', marginBottom: 'var(--space-xs)', fontWeight: 600 }}>Extras</div>
                      <ul style={{ margin: 0, paddingLeft: 'var(--space-m)', fontSize: '0.75rem', color: 'var(--color-accent-600)', listStyle: 'none' }}>
                        {tier.extras.map((item) => (
                          <li key={item} style={{ marginBottom: 2 }}>
                            <i className="fa-solid fa-check" style={{ marginRight: 'var(--space-xs)', fontSize: '0.65rem' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {isSelected && (
                    <Button
                      size="sm"
                      disabled={!allMandatoryChecked}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Quote sent for ${tier.name} tier: ${formatCurrency(tier.annualPremium)}/yr`);
                      }}
                      style={{ marginTop: 'var(--space-s)', width: '100%' }}
                    >
                      Send Quote
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {!allMandatoryChecked && (
            <div style={{ marginTop: 'var(--space-s)', fontSize: '0.75rem', color: 'var(--color-warning-600)' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 'var(--space-xs)' }} />
              All mandatory conditions must be checked before sending a quote.
            </div>
          )}
        </div>

        {/* ── Interaction Timeline ─────────────────────────────────── */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-m)', padding: 'var(--space-m)' }}>
          <h3 style={{ margin: '0 0 var(--space-m)', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Interaction Timeline</h3>
          <div style={{ position: 'relative' }}>
            {LEAD_ACTIVITIES.map((activity, idx) => (
              <div key={activity.id} style={{ display: 'flex', gap: 'var(--space-m)', position: 'relative', paddingBottom: idx < LEAD_ACTIVITIES.length - 1 ? 'var(--space-m)' : 0 }}>
                {/* Timeline connector line */}
                {idx < LEAD_ACTIVITIES.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 11,
                    top: 24,
                    bottom: 0,
                    width: 2,
                    background: 'var(--border-default)',
                  }} />
                )}
                {/* Icon dot */}
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-card-nested)',
                  border: '2px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  <i
                    className={`fa-solid ${ACTIVITY_ICONS[activity.type] ?? 'fa-circle'}`}
                    style={{ fontSize: '0.55rem', color: ACTIVITY_COLORS[activity.type] ?? 'var(--text-tertiary)' }}
                  />
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{activity.description}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                    {activity.agentName} &middot; {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════ RIGHT PANEL ═══════════════════════ */}
      <div style={{
        overflowY: 'auto',
        borderLeft: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-m)',
        padding: 'var(--space-m)',
        background: 'var(--bg-card-nested)',
      }}>

        {/* ── Call Control Bar ──────────────────────────────────────── */}
        <div style={{
          background: callActive ? 'var(--color-success-100)' : 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-m)',
          padding: 'var(--space-s) var(--space-m)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: callActive ? 'var(--color-success-700)' : 'var(--text-tertiary)' }}>
              {callActive ? 'Active Call' : 'No Active Call'}
            </span>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: callActive ? 'var(--color-success-700)' : 'var(--text-tertiary)',
            }}>
              04:32
            </span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
            {callActive ? (
              <Button size="sm" variant="destructive" onClick={() => setCallActive(false)}>
                <i className="fa-solid fa-phone-slash" /> End
              </Button>
            ) : (
              <Button size="sm" onClick={() => setCallActive(true)}>
                <i className="fa-solid fa-phone" /> Dial
              </Button>
            )}
            <Button
              size="sm"
              variant={onHold ? 'primary' : 'secondary'}
              onClick={() => setOnHold(!onHold)}
              disabled={!callActive}
            >
              <i className="fa-solid fa-pause" /> {onHold ? 'Resume' : 'Hold'}
            </Button>
            <Button
              size="sm"
              variant={muted ? 'primary' : 'secondary'}
              onClick={() => setMuted(!muted)}
              disabled={!callActive}
            >
              <i className="fa-solid fa-microphone-slash" /> {muted ? 'Unmute' : 'Mute'}
            </Button>
            <Button size="sm" variant="secondary" disabled={!callActive}>
              <i className="fa-solid fa-arrow-right-from-bracket" /> Transfer
            </Button>
            <Button
              size="sm"
              variant={recording ? 'primary' : 'secondary'}
              onClick={() => setRecording(!recording)}
              disabled={!callActive}
            >
              <i className="fa-solid fa-circle" style={{ color: recording && callActive ? 'var(--color-destructive-600)' : undefined }} /> Rec
            </Button>
          </div>
        </div>

        {/* ── Conditions & Compliance Checklist ─────────────────────── */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-m)',
          padding: 'var(--space-m)',
          maxHeight: 260,
          overflowY: 'auto',
        }}>
          <h4 style={{ margin: '0 0 var(--space-s)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Conditions & Compliance
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {conditions.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-xs)',
                  padding: 'var(--space-xs)',
                  borderRadius: 'var(--radius-s)',
                  background: c.isMandatory && !c.checked ? 'var(--color-warning-100)' : 'transparent',
                  border: c.isMandatory && !c.checked ? '1px solid var(--color-warning-300)' : '1px solid transparent',
                }}
              >
                <Checkbox
                  checked={c.checked}
                  onChange={() => toggleCondition(c.id)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                    {c.title}
                    {c.isMandatory && (
                      <span style={{
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--color-warning-700)',
                        background: 'var(--color-warning-200)',
                        padding: '0 4px',
                        borderRadius: 'var(--radius-s)',
                      }}>
                        Required
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>{c.plainText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI Sales Assistant ────────────────────────────────────── */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-m)',
          padding: 'var(--space-m)',
          maxHeight: 340,
          overflowY: 'auto',
        }}>
          <h4 style={{ margin: '0 0 var(--space-s)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            <i className="fa-solid fa-wand-magic-sparkles" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-accent-600)' }} />
            AI Sales Assistant
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-s)' }}>
            {visibleHints.map((hint) => {
              const hintColor = HINT_COLORS[hint.type];
              const isExpanded = expandedHints.has(hint.id);
              return (
                <div
                  key={hint.id}
                  style={{
                    background: hintColor.bg,
                    border: `1px solid ${hintColor.border}`,
                    borderRadius: 'var(--radius-m)',
                    padding: 'var(--space-s)',
                  }}
                >
                  {/* Type & priority badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)' }}>
                    <i className={`fa-solid ${hintColor.icon}`} style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      {hint.type.replace('_', ' ')}
                    </span>
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      padding: '0 5px',
                      borderRadius: 'var(--radius-full)',
                      background: PRIORITY_COLORS[hint.priority] ?? 'var(--text-tertiary)',
                      color: '#fff',
                    }}>
                      {hint.priority}
                    </span>
                    {hint.pinned && (
                      <i className="fa-solid fa-thumbtack" style={{ fontSize: '0.6rem', color: 'var(--color-accent-600)' }} />
                    )}
                  </div>

                  {/* Message */}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    {hint.message}
                  </div>

                  {/* Reasoning (collapsible) */}
                  <button
                    onClick={() => toggleHintReasoning(hint.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.68rem',
                      color: 'var(--text-tertiary)',
                      marginTop: 'var(--space-xs)',
                      textDecoration: 'underline',
                    }}
                  >
                    {isExpanded ? 'Hide reasoning' : 'Show reasoning'}
                  </button>
                  {isExpanded && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 'var(--space-xs)', fontStyle: 'italic' }}>
                      {hint.reasoning}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)' }}>
                    <button
                      onClick={() => dismissHint(hint.id)}
                      title="Dismiss"
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '2px 6px', borderRadius: 'var(--radius-s)',
                        color: 'var(--text-tertiary)', fontSize: '0.72rem',
                      }}
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                    <button
                      onClick={() => pinHint(hint.id)}
                      title={hint.pinned ? 'Unpin' : 'Pin'}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '2px 6px', borderRadius: 'var(--radius-s)',
                        color: hint.pinned ? 'var(--color-accent-600)' : 'var(--text-tertiary)', fontSize: '0.72rem',
                      }}
                    >
                      <i className="fa-solid fa-thumbtack" />
                    </button>
                    <button
                      title="Helpful"
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '2px 6px', borderRadius: 'var(--radius-s)',
                        color: 'var(--text-tertiary)', fontSize: '0.72rem',
                      }}
                    >
                      <i className="fa-solid fa-thumbs-up" />
                    </button>
                    <button
                      title="Not helpful"
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '2px 6px', borderRadius: 'var(--radius-s)',
                        color: 'var(--text-tertiary)', fontSize: '0.72rem',
                      }}
                    >
                      <i className="fa-solid fa-thumbs-down" />
                    </button>
                  </div>
                </div>
              );
            })}
            {visibleHints.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.78rem', padding: 'var(--space-m)' }}>
                All hints dismissed.
              </div>
            )}
          </div>
        </div>

        {/* ── Script Viewer ────────────────────────────────────────── */}
        {script && currentNode && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-m)',
            padding: 'var(--space-m)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-s)' }}>
              <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Script: {script.name}
              </h4>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                {scriptNodeIdx + 1} / {script.nodes.length}
              </span>
            </div>

            {/* Node type badge */}
            <div style={{ marginBottom: 'var(--space-xs)' }}>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-accent-100)',
                color: 'var(--color-accent-700)',
              }}>
                {currentNode.type}
              </span>
            </div>

            {/* Title */}
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-xs)' }}>
              {currentNode.title}
            </div>

            {/* Body */}
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: 'var(--space-s)',
              padding: 'var(--space-s)',
              background: 'var(--bg-card-nested)',
              borderRadius: 'var(--radius-s)',
              borderLeft: '3px solid var(--color-accent-600)',
            }}>
              {currentNode.body}
            </div>

            {/* Prompts checklist */}
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}>
              Prompts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              {currentNode.prompts.map((prompt) => (
                <Checkbox
                  key={prompt}
                  label={prompt}
                  checked={scriptPromptChecked.has(prompt)}
                  onChange={() => toggleScriptPrompt(prompt)}
                />
              ))}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-m)' }}>
              <Button
                size="sm"
                variant="secondary"
                disabled={scriptNodeIdx === 0}
                onClick={() => {
                  setScriptNodeIdx((i) => i - 1);
                  setScriptPromptChecked(new Set());
                }}
              >
                <i className="fa-solid fa-chevron-left" /> Prev
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={scriptNodeIdx >= script.nodes.length - 1}
                onClick={() => {
                  setScriptNodeIdx((i) => i + 1);
                  setScriptPromptChecked(new Set());
                }}
              >
                Next <i className="fa-solid fa-chevron-right" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
