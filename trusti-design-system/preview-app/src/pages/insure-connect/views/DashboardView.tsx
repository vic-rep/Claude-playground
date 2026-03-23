import { AGENT_STATS, FUNNEL_DATA, LEAD_ACTIVITIES } from '../data';
import type { Activity } from '../data';
import { Button, ProgressBar, Pill } from '@trusti/design-system';

/* ─── Activity icon map ──────────────────────────────────── */
const ACTIVITY_ICONS: Record<Activity['type'], string> = {
  CALL: 'fa-solid fa-phone',
  EMAIL: 'fa-solid fa-envelope',
  SMS: 'fa-solid fa-message',
  NOTE: 'fa-solid fa-sticky-note',
  STATUS_CHANGE: 'fa-solid fa-arrows-rotate',
};

const ACTIVITY_COLORS: Record<Activity['type'], string> = {
  CALL: 'var(--color-success-700)',
  EMAIL: 'var(--color-accent-600)',
  SMS: 'var(--color-warning-600)',
  NOTE: 'var(--color-primary-700)',
  STATUS_CHANGE: 'var(--text-tertiary)',
};

/* ─── Helpers ────────────────────────────────────────────── */
function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.round(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/* ─── Shared styles ──────────────────────────────────────── */
const card: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 'var(--radius-l)',
  border: '1px solid var(--border-default)',
  boxShadow: 'var(--elevation-level1)',
  padding: 'var(--space-xxl)',
  transition: 'var(--transition-fast)',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-family-primary)',
  fontSize: 'var(--font-size-h5)',
  fontWeight: 600,
  color: 'var(--text-primary)',
  margin: 0,
  marginBottom: 'var(--space-l)',
};

/* ─── Stat Card ──────────────────────────────────────────── */
function StatCard({
  label,
  value,
  subtitle,
  icon,
  accent = 'var(--color-accent-600)',
  children,
}: {
  label: string;
  value: string;
  subtitle?: string;
  icon: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        ...card,
        padding: 'var(--space-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-m)',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      {/* Decorative accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accent,
          borderRadius: 'var(--radius-l) var(--radius-l) 0 0',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--font-size-text-small)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase' as const,
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-m)',
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accent,
            fontSize: 16,
          }}
        >
          <i className={icon} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-s)' }}>
        <span
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--font-size-h4)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--text-tertiary)',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

/* ─── Progress Ring (SVG) ────────────────────────────────── */
function ProgressRing({ value, max, size = 48 }: { value: number; max: number; size?: number }) {
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--bg-card-nested)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-accent-600)"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

/* ─── Funnel Bar ─────────────────────────────────────────── */
function FunnelBar({ stage, count, pct, maxCount }: { stage: string; count: number; pct: number; maxCount: number }) {
  const widthPct = (count / maxCount) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-l)' }}>
      <span
        style={{
          fontFamily: 'var(--font-family-primary)',
          fontSize: 'var(--font-size-text-small)',
          color: 'var(--text-secondary)',
          fontWeight: 500,
          width: 80,
          flexShrink: 0,
          textAlign: 'right',
        }}
      >
        {stage}
      </span>
      <div
        style={{
          flex: 1,
          height: 28,
          background: 'var(--bg-card-nested)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${widthPct}%`,
            height: '100%',
            background: `linear-gradient(90deg, var(--color-accent-600), var(--color-accent-600))`,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.6s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 'var(--space-m)',
            minWidth: 60,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-caption)',
              fontWeight: 600,
              color: 'white',
              whiteSpace: 'nowrap',
            }}
          >
            {count}
          </span>
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-family-primary)',
          fontSize: 'var(--font-size-caption)',
          color: 'var(--text-tertiary)',
          width: 40,
          flexShrink: 0,
        }}
      >
        {pct}%
      </span>
    </div>
  );
}

/* ─── Mock Line Chart ────────────────────────────────────── */
function MockLineChart() {
  const points = [2200, 3100, 2800, 4200, 3600, 5100, 4800, 6400, 5900, 7200, 6800, 8450];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const max = Math.max(...points);
  const chartH = 160;
  const chartW = 100; // percentage width

  return (
    <div style={{ position: 'relative' }}>
      {/* Y-axis labels */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 28,
          width: 50,
        }}
      >
        {[max, max * 0.5, 0].map((v, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--text-tertiary)',
            }}
          >
            €{Math.round(v / 1000)}k
          </span>
        ))}
      </div>

      {/* Chart area */}
      <div style={{ marginLeft: 56 }}>
        {/* Grid lines */}
        <div style={{ position: 'relative', height: chartH }}>
          {[0, 0.5, 1].map((frac, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${frac * 100}%`,
                left: 0,
                right: 0,
                height: 1,
                background: 'var(--border-default)',
                opacity: 0.5,
              }}
            />
          ))}

          {/* Bars + line dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '100%',
              gap: 'var(--space-xs)',
              position: 'relative',
            }}
          >
            {points.map((val, i) => {
              const h = (val / max) * chartH;
              const isLast = i === points.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 'var(--radius-full)',
                      background: isLast ? 'var(--color-accent-600)' : 'var(--color-accent-600)',
                      border: isLast ? '2px solid var(--color-accent-600)' : '2px solid var(--bg-card)',
                      boxShadow: isLast ? '0 0 0 3px color-mix(in srgb, var(--color-accent-600) 25%, transparent)' : 'none',
                      marginBottom: -4,
                      zIndex: 1,
                    }}
                  />
                  {/* Bar */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 32,
                      height: h,
                      background: isLast
                        ? 'linear-gradient(180deg, var(--color-accent-600), color-mix(in srgb, var(--color-accent-600) 60%, transparent))'
                        : 'linear-gradient(180deg, color-mix(in srgb, var(--color-accent-600) 30%, transparent), color-mix(in srgb, var(--color-accent-600) 10%, transparent))',
                      borderRadius: 'var(--radius-m) var(--radius-m) 0 0',
                      transition: 'height 0.4s ease',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'var(--space-s)',
          }}
        >
          {months.map((m, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-caption)',
                color: i === months.length - 1 ? 'var(--color-accent-600)' : 'var(--text-tertiary)',
                fontWeight: i === months.length - 1 ? 600 : 400,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Activity Item ──────────────────────────────────────── */
function ActivityItem({ activity }: { activity: Activity }) {
  const iconColor = ACTIVITY_COLORS[activity.type];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-m)',
        padding: 'var(--space-m) 0',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 'var(--radius-full)',
          background: `color-mix(in srgb, ${iconColor} 12%, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: iconColor,
          fontSize: 13,
        }}
      >
        <i className={ACTIVITY_ICONS[activity.type]} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--font-size-text-small)',
            color: 'var(--text-primary)',
            lineHeight: 1.5,
          }}
        >
          {activity.description}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-s)',
            marginTop: 'var(--space-xs)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--text-tertiary)',
            }}
          >
            {activity.agentName}
          </span>
          <span style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>•</span>
          <span
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--text-tertiary)',
            }}
          >
            {formatTime(activity.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DashboardView — Main Export
   ═══════════════════════════════════════════════════════════ */
export function DashboardView() {
  const s = AGENT_STATS;
  const callsPct = Math.round((s.callsMade / s.callsTarget) * 100);
  const ahtDelta = s.avgHandleTime - s.teamAvgHandleTime;
  const ahtBetter = ahtDelta < 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xxl)',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      {/* ─── Header ──────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-h5)',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            Good morning, Maria
          </h2>
          <p
            style={{
              margin: 0,
              marginTop: 'var(--space-xs)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-text-default)',
              color: 'var(--text-secondary)',
            }}
          >
            Here's your performance snapshot for today.
          </p>
        </div>
        <Button>
          <i className="fa-solid fa-phone" style={{ marginRight: 'var(--space-s)' }} />
          Start Dialling
        </Button>
      </div>

      {/* ─── Stat Cards Grid ─────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--space-l)',
        }}
      >
        {/* Calls Made with Progress Ring */}
        <StatCard
          label="Calls Made"
          value={`${s.callsMade}`}
          subtitle={`/ ${s.callsTarget} target`}
          icon="fa-solid fa-phone-volume"
          accent="var(--color-accent-600)"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-m)' }}>
            <ProgressRing value={s.callsMade} max={s.callsTarget} size={40} />
            <span
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--text-tertiary)',
              }}
            >
              {callsPct}% of daily goal
            </span>
          </div>
        </StatCard>

        {/* Quotes Generated */}
        <StatCard
          label="Quotes Generated"
          value={`${s.quotesGenerated}`}
          icon="fa-solid fa-file-invoice"
          accent="var(--color-primary-700)"
        >
          <ProgressBar value={s.quotesGenerated} max={s.callsMade} />
        </StatCard>

        {/* Policies Bound */}
        <StatCard
          label="Policies Bound"
          value={`${s.policiesBound}`}
          icon="fa-solid fa-file-signature"
          accent="var(--color-success-700)"
        >
          <Pill variant="success">
            {Math.round((s.policiesBound / s.quotesGenerated) * 100)}% close rate
          </Pill>
        </StatCard>

        {/* Revenue Closed */}
        <StatCard
          label="Revenue Closed"
          value={`€${s.revenueClosed.toLocaleString()}`}
          icon="fa-solid fa-euro-sign"
          accent="var(--color-success-700)"
        />

        {/* Cross-sell Conversions */}
        <StatCard
          label="Cross-sell"
          value={`${s.crossSellConversions}`}
          subtitle="conversions"
          icon="fa-solid fa-arrow-right-arrow-left"
          accent="var(--color-warning-600)"
        />

        {/* AHT */}
        <StatCard
          label="Avg Handle Time"
          value={`${s.avgHandleTime}m`}
          icon="fa-solid fa-clock"
          accent={ahtBetter ? 'var(--color-success-700)' : 'var(--color-accent-600)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
            <i
              className={ahtBetter ? 'fa-solid fa-arrow-trend-down' : 'fa-solid fa-arrow-trend-up'}
              style={{
                fontSize: 12,
                color: ahtBetter ? 'var(--color-success-700)' : 'var(--color-warning-600)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--text-tertiary)',
              }}
            >
              Team avg {s.teamAvgHandleTime}m
            </span>
          </div>
        </StatCard>
      </div>

      {/* ─── Middle Row: Funnel + Revenue ────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-l)',
        }}
      >
        {/* Conversion Funnel */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
            <h3 style={sectionTitle}>Conversion Funnel</h3>
            <Pill variant="default">This month</Pill>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}>
            {FUNNEL_DATA.map((d) => (
              <FunnelBar
                key={d.stage}
                stage={d.stage}
                count={d.count}
                pct={d.pct}
                maxCount={FUNNEL_DATA[0].count}
              />
            ))}
          </div>
          {/* Funnel summary */}
          <div
            style={{
              marginTop: 'var(--space-xl)',
              padding: 'var(--space-m) var(--space-l)',
              background: 'var(--bg-card-nested)',
              borderRadius: 'var(--radius-m)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-s)',
            }}
          >
            <i className="fa-solid fa-chart-line" style={{ color: 'var(--color-accent-600)', fontSize: 14 }} />
            <span
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-text-small)',
                color: 'var(--text-secondary)',
              }}
            >
              Overall conversion:{' '}
              <strong style={{ color: 'var(--color-accent-600)' }}>
                {Math.round((FUNNEL_DATA[FUNNEL_DATA.length - 1].count / FUNNEL_DATA[0].count) * 100)}%
              </strong>{' '}
              lead-to-win
            </span>
          </div>
        </div>

        {/* Revenue Chart */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
            <h3 style={sectionTitle}>Revenue Trend</h3>
            <Pill variant="default">12 months</Pill>
          </div>
          <MockLineChart />
          {/* Summary row */}
          <div
            style={{
              marginTop: 'var(--space-xl)',
              display: 'flex',
              gap: 'var(--space-xxl)',
            }}
          >
            {[
              { label: 'This month', val: '€8,450', delta: '+18%', positive: true },
              { label: 'Last month', val: '€6,800', delta: '', positive: false },
              { label: 'Best month', val: '€7,200', delta: 'Jan', positive: false },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-text-default)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item.val}
                  </span>
                  {item.delta && (
                    <span
                      style={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-caption)',
                        color: item.positive ? 'var(--color-success-700)' : 'var(--text-tertiary)',
                        fontWeight: 500,
                      }}
                    >
                      {item.delta}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Activity Feed ───────────────────────────────── */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-l)' }}>
          <h3 style={sectionTitle}>Recent Activity</h3>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {LEAD_ACTIVITIES.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
