import React from 'react';
import { TEAM_STATS, MGMT_KPIS, FUNNEL_DATA, AGENTS } from '../data';
import type { AgentStatus } from '../data';
import { ProgressBar, Pill } from '@trusti/design-system';

/* ═══════════════════════════════════════════════════════════
   Agent status color map
   ═══════════════════════════════════════════════════════════ */
const STATUS_COLORS: Record<AgentStatus, { fg: string; bg: string; label: string }> = {
  AVAILABLE: { fg: 'var(--color-success-600)', bg: 'var(--color-success-100)', label: 'Available' },
  ON_CALL: { fg: 'var(--color-accent-600)', bg: 'var(--color-accent-100)', label: 'On Call' },
  BREAK: { fg: 'var(--color-warning-500)', bg: 'var(--color-warning-100)', label: 'Break' },
  WRAP_UP: { fg: 'var(--color-primary-500)', bg: 'var(--color-primary-100)', label: 'Wrap-Up' },
};

/* ─── Shared styles ─────────────────────────────────────── */
const card: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 'var(--radius-l)',
  border: '1px solid var(--border-default)',
  padding: 'var(--space-3xl)',
};

const sectionTitle: React.CSSProperties = {
  fontSize: 'var(--font-size-h5)',
  fontWeight: 600,
  color: 'var(--text-primary)',
  margin: 0,
  marginBottom: 'var(--space-2xl)',
};

const gridRow = (cols: string): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: cols,
  gap: 'var(--space-2xl)',
});

/* ═══════════════════════════════════════════════════════════
   TeamDashboardView
   ═══════════════════════════════════════════════════════════ */
export function TeamDashboardView() {
  const sorted = [...TEAM_STATS].sort((a, b) => b.revenue - a.revenue);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* ── Agent Leaderboard ──────────────────────────────── */}
      <div style={card}>
        <h3 style={sectionTitle}>Agent Leaderboard</h3>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--text-primary)',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid var(--border-default)',
                  textAlign: 'left',
                }}
              >
                {['#', 'Agent', 'Status', 'Calls', 'Quotes', 'Policies', 'Revenue', 'Conv %', 'Quality'].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: 'var(--space-m) var(--space-l)',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--font-size-caption)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {sorted.map((agent, i) => {
                const sc = STATUS_COLORS[agent.status];
                return (
                  <tr
                    key={agent.agentId}
                    style={{
                      borderBottom: '1px solid var(--border-default)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--bg-card-nested)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <td
                      style={{
                        padding: 'var(--space-m) var(--space-l)',
                        fontWeight: 700,
                        color: i < 3 ? 'var(--color-accent-600)' : 'var(--text-tertiary)',
                      }}
                    >
                      {i + 1}
                    </td>
                    <td style={{ padding: 'var(--space-m) var(--space-l)', fontWeight: 500 }}>
                      {agent.name}
                    </td>
                    <td style={{ padding: 'var(--space-m) var(--space-l)' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: 'var(--space-xs) var(--space-m)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--font-size-caption)',
                          fontWeight: 600,
                          background: sc.bg,
                          color: sc.fg,
                        }}
                      >
                        {sc.label}
                      </span>
                    </td>
                    <td style={{ padding: 'var(--space-m) var(--space-l)' }}>{agent.calls}</td>
                    <td style={{ padding: 'var(--space-m) var(--space-l)' }}>{agent.quotes}</td>
                    <td style={{ padding: 'var(--space-m) var(--space-l)' }}>{agent.policies}</td>
                    <td
                      style={{
                        padding: 'var(--space-m) var(--space-l)',
                        fontWeight: 600,
                      }}
                    >
                      {'\u20AC'}{agent.revenue.toLocaleString()}
                    </td>
                    <td style={{ padding: 'var(--space-m) var(--space-l)' }}>{agent.conversion}%</td>
                    <td
                      style={{
                        padding: 'var(--space-m) var(--space-l)',
                        minWidth: 120,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
                        <div style={{ flex: 1 }}>
                          <ProgressBar
                            value={agent.quality}
                            variant={agent.quality >= 90 ? 'success' : agent.quality >= 80 ? 'default' : 'warning'}
                            size="sm"
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 'var(--font-size-caption)',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            minWidth: 28,
                            textAlign: 'right',
                          }}
                        >
                          {agent.quality}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Live Agent Status Cards ────────────────────────── */}
      <div style={card}>
        <h3 style={sectionTitle}>Live Agent Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 'var(--space-l)',
          }}
        >
          {AGENTS.map((agent) => {
            const sc = STATUS_COLORS[agent.status];
            return (
              <div
                key={agent.id}
                style={{
                  background: 'var(--bg-card-nested)',
                  borderRadius: 'var(--radius-m)',
                  border: '1px solid var(--border-default)',
                  borderLeft: `4px solid ${sc.fg}`,
                  padding: 'var(--space-l)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-m)',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-full)',
                    background: sc.bg,
                    color: sc.fg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-caption)',
                    flexShrink: 0,
                  }}
                >
                  {agent.avatar}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {agent.name}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      color: sc.fg,
                      fontWeight: 500,
                    }}
                  >
                    {sc.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom row: Funnel + SLA ───────────────────────── */}
      <div style={gridRow('2fr 1fr')}>
        {/* Pipeline Funnel */}
        <div style={card}>
          <h3 style={sectionTitle}>Pipeline Funnel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}>
            {FUNNEL_DATA.map((stage, i) => {
              const widthPct = stage.pct;
              const colors = [
                'var(--color-accent-500)',
                'var(--color-accent-400)',
                'var(--color-warning-400)',
                'var(--color-warning-500)',
                'var(--color-success-500)',
              ];
              return (
                <div key={stage.stage} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-l)' }}>
                  <span
                    style={{
                      width: 80,
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    {stage.stage}
                  </span>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <div
                      style={{
                        width: `${widthPct}%`,
                        height: 32,
                        background: colors[i],
                        borderRadius: 'var(--radius-s)',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 'var(--space-m)',
                        transition: 'width 0.4s ease',
                        minWidth: 60,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--font-size-caption)',
                          fontWeight: 700,
                          color: '#fff',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {stage.count} ({stage.pct}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SLA Compliance */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ ...sectionTitle, marginBottom: 'var(--space-xl)' }}>SLA Compliance</h3>
          <div
            style={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 700,
              color: 'var(--color-success-600)',
              marginBottom: 'var(--space-s)',
            }}
          >
            92%
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            on time
          </div>
          <div style={{ width: '100%', maxWidth: 200 }}>
            <ProgressBar value={92} variant="success" size="md" />
          </div>
          <div
            style={{
              marginTop: 'var(--space-xl)',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--text-tertiary)',
            }}
          >
            8% breached (4 of 48 leads)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ManagementView
   ═══════════════════════════════════════════════════════════ */
const MEDAL_COLORS = ['#D4AF37', '#A8A8A8', '#CD7F32'] as const;

export function ManagementView() {
  const kpiTiles: { label: string; value: string; accent?: boolean }[] = [
    { label: 'Revenue MTD', value: `\u20AC${MGMT_KPIS.revenueMTD.toLocaleString()}`, accent: true },
    { label: 'Revenue QTD', value: `\u20AC${MGMT_KPIS.revenueQTD.toLocaleString()}` },
    { label: 'Revenue YTD', value: `\u20AC${MGMT_KPIS.revenueYTD.toLocaleString()}` },
    { label: 'Conversion Rate', value: `${MGMT_KPIS.conversionRate}%` },
    { label: 'CPA', value: `\u20AC${MGMT_KPIS.costPerAcquisition}` },
    { label: 'Utilization', value: `${MGMT_KPIS.utilization}%` },
    { label: 'Total Leads', value: `${MGMT_KPIS.totalLeads}` },
    { label: 'Active Agents', value: `${MGMT_KPIS.activeAgents}` },
    { label: 'Avg Quality', value: `${MGMT_KPIS.avgQualityScore}` },
  ];

  const leadSources = [
    { name: 'Website', pct: 45 },
    { name: 'Quote Widget', pct: 28 },
    { name: 'Callback', pct: 18 },
    { name: 'Referral', pct: 9 },
  ];

  const topPerformers = [...TEAM_STATS].sort((a, b) => b.revenue - a.revenue).slice(0, 3);

  // Mock revenue trend data (12 months)
  const trendBars = [42, 48, 55, 51, 60, 58, 64, 72, 68, 75, 80, 72];
  const trendMax = Math.max(...trendBars);
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* ── KPI Tiles ──────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 'var(--space-l)',
        }}
      >
        {kpiTiles.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              ...card,
              padding: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xs)',
              borderTop: kpi.accent ? '3px solid var(--color-accent-600)' : undefined,
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-size-caption)',
                fontWeight: 500,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {kpi.label}
            </span>
            <span
              style={{
                fontSize: 'var(--font-size-h5)',
                fontWeight: 700,
                color: kpi.accent ? 'var(--color-accent-600)' : 'var(--text-primary)',
              }}
            >
              {kpi.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Revenue Trend + Lead Source Breakdown ───────────── */}
      <div style={gridRow('2fr 1fr')}>
        {/* Revenue Trend */}
        <div style={card}>
          <h3 style={sectionTitle}>Revenue Trend (12 months)</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 'var(--space-xs)',
              height: 180,
              padding: 'var(--space-m) 0',
              borderBottom: '1px solid var(--border-default)',
            }}
          >
            {trendBars.map((val, i) => {
              const heightPct = (val / trendMax) * 100;
              const isLast = i === trendBars.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: isLast ? 'var(--color-accent-600)' : 'var(--text-tertiary)',
                    }}
                  >
                    {val}k
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 32,
                      height: `${heightPct}%`,
                      borderRadius: 'var(--radius-s) var(--radius-s) 0 0',
                      background: isLast
                        ? 'var(--color-accent-500)'
                        : 'var(--color-accent-200)',
                      transition: 'height 0.3s ease',
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-xs)',
              paddingTop: 'var(--space-s)',
            }}
          >
            {months.map((m, i) => (
              <div
                key={m}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 10,
                  color: i === months.length - 1 ? 'var(--color-accent-600)' : 'var(--text-tertiary)',
                  fontWeight: i === months.length - 1 ? 600 : 400,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div style={card}>
          <h3 style={sectionTitle}>Lead Sources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {leadSources.map((source) => (
              <div key={source.name}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {source.name}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 700,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {source.pct}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 8,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-card-nested)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${source.pct}%`,
                      height: '100%',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-accent-500)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top Performers ─────────────────────────────────── */}
      <div style={card}>
        <h3 style={sectionTitle}>Top Performers</h3>
        <div style={gridRow('repeat(3, 1fr)')}>
          {topPerformers.map((agent, i) => {
            const agentData = AGENTS.find((a) => a.id === agent.agentId);
            const avatar = agentData?.avatar ?? agent.name.split(' ').map((w) => w[0]).join('');
            const medalLabels = ['Gold', 'Silver', 'Bronze'];
            return (
              <div
                key={agent.agentId}
                style={{
                  background: 'var(--bg-card-nested)',
                  borderRadius: 'var(--radius-m)',
                  border: '1px solid var(--border-default)',
                  borderTop: `4px solid ${MEDAL_COLORS[i]}`,
                  padding: 'var(--space-2xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 'var(--space-m)',
                }}
              >
                {/* Medal badge */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 'var(--radius-full)',
                    background: MEDAL_COLORS[i],
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    boxShadow: `0 2px 6px ${MEDAL_COLORS[i]}66`,
                  }}
                >
                  {i + 1}
                </div>

                {/* Avatar */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-accent-100)',
                    color: 'var(--color-accent-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-body)',
                  }}
                >
                  {avatar}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {agent.name}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--text-tertiary)',
                      marginTop: 'var(--space-xxs)',
                    }}
                  >
                    {medalLabels[i]}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 'var(--font-size-h5)',
                    fontWeight: 700,
                    color: 'var(--color-accent-600)',
                  }}
                >
                  {'\u20AC'}{agent.revenue.toLocaleString()}
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-m)', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Pill variant="default">{agent.calls} calls</Pill>
                  <Pill variant="success">{agent.policies} policies</Pill>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
