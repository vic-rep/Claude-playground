import { useState } from 'react';
import { Button, Pill, Tag } from '@trusti/design-system';
import { SCRIPTS, INSURANCE_TYPE_ICONS } from '../data';
import type { Script, ScriptNode, ScriptNodeType } from '../data';

/* ─── Node type styling config ──────────────────────────── */
const NODE_TYPE_CONFIG: Record<ScriptNodeType, { border: string; icon: string }> = {
  Opening: { border: 'var(--color-accent-100)', icon: 'fa-solid fa-hand-wave' },
  Validation: { border: 'var(--color-primary-100)', icon: 'fa-solid fa-clipboard-check' },
  Discovery: { border: 'var(--color-accent-100)', icon: 'fa-solid fa-magnifying-glass' },
  Presentation: { border: 'var(--color-warning-100)', icon: 'fa-solid fa-display' },
  Objection: { border: 'var(--color-destructive-100)', icon: 'fa-solid fa-shield-halved' },
  CrossSell: { border: 'var(--color-success-100)', icon: 'fa-solid fa-arrow-right-arrow-left' },
  Closing: { border: 'var(--color-warning-100)', icon: 'fa-solid fa-handshake' },
  WrapUp: { border: 'var(--color-primary-100)', icon: 'fa-solid fa-flag-checkered' },
};

/* ─── Script Card ───────────────────────────────────────── */
function ScriptCard({
  script,
  onSelect,
}: {
  script: Script;
  onSelect: (s: Script) => void;
}) {
  const icon = INSURANCE_TYPE_ICONS[script.productType];

  return (
    <div
      onClick={() => onSelect(script)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-l)',
        padding: 'var(--space-xl)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-m)',
        transition: 'box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 4px 16px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {script.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
          {script.isActive ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-success-600)', fontSize: '0.85rem', fontWeight: 500 }}>
              <i className="fa-solid fa-circle-check" />
              Active
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 500 }}>
              <i className="fa-solid fa-circle-xmark" />
              Inactive
            </span>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-m)' }}>
        <Pill>
          <i className={`fa-solid ${icon}`} style={{ marginRight: 'var(--space-xs)' }} />
          {script.productType}
        </Pill>
        <Tag>v{script.version}</Tag>
        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
          {script.nodes.length} steps
        </span>
      </div>

      {/* Node preview chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
        {script.nodes.map((node) => (
          <span
            key={node.id}
            style={{
              fontSize: '0.75rem',
              padding: '2px var(--space-s)',
              borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${NODE_TYPE_CONFIG[node.type].border}`,
              color: 'var(--text-secondary)',
              background: 'var(--bg-card-nested)',
            }}
          >
            {node.type}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Flow Node ─────────────────────────────────────────── */
function FlowNode({
  node,
  isExpanded,
  onToggle,
  isLast,
}: {
  node: ScriptNode;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const config = NODE_TYPE_CONFIG[node.type];
  const truncatedBody =
    !isExpanded && node.body.length > 120
      ? node.body.slice(0, 120) + '...'
      : node.body;

  return (
    <>
      {/* Node card */}
      <div
        onClick={onToggle}
        style={{
          background: 'var(--bg-card)',
          border: `2px solid ${config.border}`,
          borderRadius: 'var(--radius-l)',
          padding: 'var(--space-l)',
          cursor: 'pointer',
          maxWidth: 560,
          width: '100%',
          transition: 'box-shadow 0.15s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            '0 4px 16px rgba(0,0,0,0.06)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Type label + icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-s)',
            marginBottom: 'var(--space-s)',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-m)',
              background: config.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              flexShrink: 0,
            }}
          >
            <i className={config.icon} />
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--text-tertiary)',
            }}
          >
            {node.type}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-s)',
          }}
        >
          {node.title}
        </div>

        {/* Body */}
        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: isExpanded ? 'var(--space-m)' : 0,
          }}
        >
          {truncatedBody}
        </div>

        {/* Prompts (shown truncated or full) */}
        {isExpanded ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {node.prompts.map((prompt, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-s)',
                  padding: 'var(--space-s) var(--space-m)',
                  background: 'var(--bg-card-nested)',
                  borderRadius: 'var(--radius-s)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
                  <i className="fa-solid fa-circle-dot" style={{ fontSize: '0.6rem' }} />
                </span>
                {prompt}
              </div>
            ))}
          </div>
        ) : (
          node.prompts.length > 0 && (
            <div
              style={{
                marginTop: 'var(--space-s)',
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
              }}
            >
              {node.prompts.length} prompt{node.prompts.length !== 1 ? 's' : ''}
              {' \u2014 click to expand'}
            </div>
          )
        )}
      </div>

      {/* Connector line between nodes */}
      {!isLast && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: 40,
          }}
        >
          <div
            style={{
              borderLeft: '2px dashed var(--border-default)',
              height: 28,
            }}
          />
          <i
            className="fa-solid fa-chevron-down"
            style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}
          />
        </div>
      )}
    </>
  );
}

/* ─── Flow Viewer ───────────────────────────────────────── */
function FlowViewer({
  script,
  onBack,
}: {
  script: Script;
  onBack: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const icon = INSURANCE_TYPE_ICONS[script.productType];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-l)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-m)' }}>
        <Button variant="secondary" onClick={onBack}>
          <i className="fa-solid fa-arrow-left" style={{ marginRight: 'var(--space-xs)' }} />
          Back
        </Button>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            {script.name}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-m)',
              marginTop: 'var(--space-xs)',
            }}
          >
            <Pill>
              <i className={`fa-solid ${icon}`} style={{ marginRight: 'var(--space-xs)' }} />
              {script.productType}
            </Pill>
            <Tag>v{script.version}</Tag>
            {script.isActive ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-success-600)', fontSize: '0.85rem', fontWeight: 500 }}>
                <i className="fa-solid fa-circle-check" />
                Active
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 500 }}>
                <i className="fa-solid fa-circle-xmark" />
                Inactive
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Flow graph */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'var(--space-xl) 0',
        }}
      >
        {/* Start indicator */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-success-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-xs)',
          }}
        >
          <i className="fa-solid fa-play" style={{ fontSize: '0.85rem', color: 'var(--color-success-700)' }} />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-xs)' }}>
          Start
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 28 }}>
          <div style={{ borderLeft: '2px dashed var(--border-default)', height: 18 }} />
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }} />
        </div>

        {/* Nodes */}
        {script.nodes.map((node, idx) => (
          <FlowNode
            key={node.id}
            node={node}
            isExpanded={expandedId === node.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === node.id ? null : node.id))
            }
            isLast={idx === script.nodes.length - 1}
          />
        ))}

        {/* End indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 28, marginTop: 0 }}>
          <div style={{ borderLeft: '2px dashed var(--border-default)', height: 18 }} />
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }} />
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'var(--space-xs)',
          }}
        >
          <i className="fa-solid fa-flag-checkered" style={{ fontSize: '0.85rem', color: 'var(--color-primary-700)' }} />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginTop: 'var(--space-xs)' }}>
          End
        </span>
      </div>
    </div>
  );
}

/* ─── Main ScriptsView ──────────────────────────────────── */
export function ScriptsView() {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  if (selectedScript) {
    return (
      <FlowViewer
        script={selectedScript}
        onBack={() => setSelectedScript(null)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* Page header */}
      <div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          Call Scripts
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            margin: 'var(--space-xs) 0 0',
          }}
        >
          Manage script templates and view call flows
        </p>
      </div>

      {/* Script cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-l)',
        }}
      >
        {SCRIPTS.map((script) => (
          <ScriptCard
            key={script.id}
            script={script}
            onSelect={setSelectedScript}
          />
        ))}
      </div>
    </div>
  );
}
