import { Link } from 'react-router-dom';

const stats = [
  { label: 'Components', value: '26', desc: '16 molecules, 4 organisms, 6 templates' },
  { label: 'Design Tokens', value: '125+', desc: 'Colors, typography, spacing, elevation' },
  { label: 'Hooks', value: '2', desc: 'useBreakpoint, useIsMobile' },
  { label: 'Breakpoints', value: '4', desc: 'Mobile, tablet portrait/landscape, desktop' },
];

const principles = [
  {
    title: 'Token-First',
    desc: 'Never hardcode colors, spacing, shadows, or fonts. Always reference design tokens via CSS variables or TypeScript constants.',
  },
  {
    title: 'Responsive by Default',
    desc: 'All components adapt to mobile (< 768px) and desktop viewports. Typography scales automatically across breakpoints.',
  },
  {
    title: 'Accessible',
    desc: 'WCAG AA compliant. Proper ARIA attributes, keyboard navigation, and 4.5:1 contrast ratios on all interactive elements.',
  },
  {
    title: 'Figma-Aligned',
    desc: 'Every component maps directly to a Figma page with node IDs documented for traceability and design-code sync.',
  },
];

export function HomePage() {
  return (
    <div>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, margin: '0 0 8px 0' }}>
          Trusti Design System
        </h1>
        <p style={{ fontSize: 18, color: 'var(--color-primary-600)', margin: '0 0 32px 0' }}>
          The complete component library and design token system for Trusti products.
          Built with React 18, TypeScript, and CSS Modules.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/atoms" className="home-cta home-cta--primary">
            Explore Atoms
          </Link>
          <Link to="/components" className="home-cta home-cta--secondary">
            View Components
          </Link>
          <Link to="/prototypes" className="home-cta home-cta--ghost">
            Prototypes
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="section">
        <h2 className="section-title">At a Glance</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="section">
        <h2 className="section-title">Design Principles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {principles.map((p) => (
            <div key={p.title} className="principle-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="section">
        <h2 className="section-title">Tech Stack</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['React 18', 'TypeScript 5', 'Vite', 'CSS Modules', 'CSS Custom Properties', 'Source Sans 3'].map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .home-cta {
          display: inline-block;
          padding: 12px 24px;
          border-radius: var(--radius-m);
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 150ms ease;
        }
        .home-cta--primary {
          background: var(--color-accent-600);
          color: white;
        }
        .home-cta--primary:hover { background: var(--color-accent-700); }
        .home-cta--secondary {
          background: var(--color-surface-adjacent);
          color: var(--color-primary-900);
          border: 1px solid var(--color-primary-300);
        }
        .home-cta--secondary:hover { border-color: var(--color-accent-600); color: var(--color-accent-600); }
        .home-cta--ghost {
          background: transparent;
          color: var(--color-accent-600);
          border: 1px solid transparent;
        }
        .home-cta--ghost:hover { border-color: var(--color-accent-600); }

        .stat-card {
          background: var(--color-surface-adjacent);
          border: 1px solid var(--color-primary-200);
          border-radius: var(--radius-m);
          padding: 24px;
        }
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: var(--color-accent-600);
          line-height: 1;
        }
        .stat-label {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-primary-900);
          margin-top: 8px;
        }
        .stat-desc {
          font-size: 13px;
          color: var(--color-primary-500);
          margin-top: 4px;
        }

        .principle-card {
          background: var(--color-surface-adjacent);
          border: 1px solid var(--color-primary-200);
          border-radius: var(--radius-m);
          padding: 24px;
        }
        .principle-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: var(--color-accent-700);
        }
        .principle-card p {
          font-size: 14px;
          color: var(--color-primary-600);
          margin: 0;
          line-height: 1.5;
        }

        .tech-badge {
          display: inline-block;
          padding: 8px 16px;
          background: var(--color-accent-100);
          color: var(--color-accent-800);
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
