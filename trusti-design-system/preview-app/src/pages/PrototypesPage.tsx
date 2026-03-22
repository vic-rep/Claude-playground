import { prototypes } from '../data/prototypes';

const statusColors: Record<string, { bg: string; text: string }> = {
  live: { bg: 'var(--color-success-100)', text: 'var(--color-success-700)' },
  wip: { bg: 'var(--color-warning-100)', text: 'var(--color-warning-600)' },
  planned: { bg: 'var(--color-primary-100)', text: 'var(--color-primary-600)' },
};

export function PrototypesPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 8px 0' }}>Prototypes</h1>
      <p style={{ fontSize: 16, color: 'var(--color-primary-600)', margin: '0 0 12px 0' }}>
        Example apps and experiments built with the Trusti Design System. Add new prototypes by
        editing <code style={{ background: 'var(--color-primary-100)', padding: '2px 6px', borderRadius: 4, fontSize: 14 }}>preview-app/src/data/prototypes.ts</code>.
      </p>
      <p style={{ fontSize: 14, color: 'var(--color-primary-500)', margin: '0 0 32px 0' }}>
        Each prototype showcases real-world usage patterns and can be prompted via Claude or built manually.
      </p>

      {prototypes.length === 0 ? (
        <div className="component-card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ fontSize: 16, color: 'var(--color-primary-500)' }}>
            No prototypes yet. Add one to <code>prototypes.ts</code> to get started.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {prototypes.map((proto) => {
            const colors = statusColors[proto.status];
            return (
              <div key={proto.id} className="proto-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: 'var(--color-primary-900)' }}>
                    {proto.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: colors.bg,
                      color: colors.text,
                      flexShrink: 0,
                    }}
                  >
                    {proto.status}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-primary-600)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  {proto.description}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {proto.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        padding: '3px 10px',
                        background: 'var(--color-accent-100)',
                        color: 'var(--color-accent-800)',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {(proto.route || proto.externalUrl) && (
                  <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--color-primary-100)' }}>
                    {proto.route && (
                      <a href={proto.route} style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-accent-600)' }}>
                        Open prototype &rarr;
                      </a>
                    )}
                    {proto.externalUrl && (
                      <a href={proto.externalUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-accent-600)' }}>
                        Open external &rarr;
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .proto-card {
          background: var(--color-surface-adjacent);
          border: 1px solid var(--color-primary-200);
          border-radius: var(--radius-m);
          padding: 24px;
          transition: box-shadow 150ms ease, border-color 150ms ease;
        }
        .proto-card:hover {
          border-color: var(--color-accent-300);
          box-shadow: var(--elevation-level2);
        }
      `}</style>
    </div>
  );
}
