import {
  colors,
  typography,
  spacing,
  elevation,
} from '@trusti/design-system';

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-s)',
          background: hex,
          border: '1px solid var(--color-primary-200)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary-900)' }}>{name}</div>
        <div style={{ fontSize: 12, color: 'var(--color-primary-500)', fontFamily: 'monospace' }}>{hex}</div>
      </div>
    </div>
  );
}

function ColorGroup({ title, shades }: { title: string; shades: Record<string | number, string> }) {
  return (
    <div className="component-card" style={{ minWidth: 220 }}>
      <h3>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        {Object.entries(shades).map(([key, value]) => (
          <ColorSwatch key={key} name={`${title.toLowerCase()}.${key}`} hex={value} />
        ))}
      </div>
    </div>
  );
}

function TypographyRow({ name, style }: { name: string; style: { fontSize: number; fontWeight: number; lineHeight: number } }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--color-primary-100)' }}>
      <span style={{ width: 120, flexShrink: 0, fontSize: 13, fontWeight: 500, color: 'var(--color-primary-500)', fontFamily: 'monospace' }}>
        {name}
      </span>
      <span
        style={{
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          color: 'var(--color-primary-900)',
        }}
      >
        The quick brown fox
      </span>
      <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-primary-400)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
        {style.fontSize}px / {style.fontWeight}
      </span>
    </div>
  );
}

export function AtomsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 8px 0' }}>Atoms</h1>
      <p style={{ fontSize: 16, color: 'var(--color-primary-600)', margin: '0 0 40px 0' }}>
        Foundational values that drive every component — colors, typography, spacing, and elevation.
      </p>

      {/* ── Colors ─────────────────────────── */}
      <div className="section">
        <h2 className="section-title">Colors</h2>
        <p className="section-desc">Token-first palette with semantic aliases for consistent usage.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          <ColorGroup title="Accent" shades={colors.accent} />
          <ColorGroup title="Primary" shades={colors.primary} />
          <ColorGroup title="Surface" shades={colors.surface} />
          <ColorGroup title="Success" shades={colors.success} />
          <ColorGroup title="Warning" shades={colors.warning} />
          <ColorGroup title="Destructive" shades={colors.destructive} />
        </div>

        <div className="component-card" style={{ marginTop: 16 }}>
          <h3>Semantic Aliases</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10, marginTop: 12 }}>
            {Object.entries(colors.semantic).map(([key, value]) => (
              <ColorSwatch key={key} name={`semantic.${key}`} hex={value} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Typography ─────────────────────── */}
      <div className="section">
        <h2 className="section-title">Typography</h2>
        <p className="section-desc">
          Source Sans 3 with responsive scaling. Desktop (≥768px) and mobile (&lt;768px) scales.
        </p>

        <div className="component-card">
          <h3>Desktop Scale</h3>
          <div style={{ marginTop: 8 }}>
            {Object.entries(typography.desktop).map(([name, style]) => (
              <TypographyRow key={name} name={name} style={style} />
            ))}
          </div>
        </div>

        <div className="component-card" style={{ marginTop: 16 }}>
          <h3>Mobile Scale</h3>
          <div style={{ marginTop: 8 }}>
            {Object.entries(typography.mobile).map(([name, style]) => (
              <TypographyRow key={name} name={name} style={style} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Spacing ─────────────────────────── */}
      <div className="section">
        <h2 className="section-title">Spacing</h2>
        <p className="section-desc">2px base scale with T-shirt naming for consistent rhythm.</p>

        <div className="component-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(spacing).map(([name, value]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ width: 50, fontSize: 13, fontWeight: 500, color: 'var(--color-primary-500)', fontFamily: 'monospace' }}>
                  {name}
                </span>
                <div
                  style={{
                    height: 20,
                    width: value,
                    background: 'var(--color-accent-400)',
                    borderRadius: 'var(--radius-xs)',
                    minWidth: value === 0 ? 2 : undefined,
                    opacity: value === 0 ? 0.3 : 1,
                  }}
                />
                <span style={{ fontSize: 12, color: 'var(--color-primary-400)', fontFamily: 'monospace' }}>
                  {value}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Elevation ──────────────────────── */}
      <div className="section">
        <h2 className="section-title">Elevation</h2>
        <p className="section-desc">5-level shadow system with layered drop-shadows for subtle depth.</p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {Object.entries(elevation).map(([level, shadow]) => (
            <div
              key={level}
              style={{
                width: 160,
                height: 120,
                background: 'var(--color-surface-adjacent)',
                borderRadius: 'var(--radius-m)',
                boxShadow: shadow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--color-primary-700)',
              }}
            >
              {level}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
