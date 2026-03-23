import { useState } from 'react';
import { Button, Tabs, Pill } from '@trusti/design-system';
import { CURRENT_USER } from './data';
import { DashboardView } from './views/DashboardView';
import { LeadsView } from './views/LeadsView';
import { LeadDetailView } from './views/LeadDetailView';
import { TeamDashboardView, ManagementView } from './views/TeamView';
import { ScriptsView } from './views/ScriptsView';

type View = 'dashboard' | 'leads' | 'lead-detail' | 'team' | 'management' | 'scripts';

const ROLE_TABS = {
  AGENT: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leads', label: 'My Leads' },
    { id: 'scripts', label: 'Scripts' },
  ],
  TEAM_LEAD: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leads', label: 'My Leads' },
    { id: 'team', label: 'Team' },
    { id: 'scripts', label: 'Scripts' },
  ],
  MANAGER: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leads', label: 'Leads' },
    { id: 'team', label: 'Team' },
    { id: 'management', label: 'Management' },
    { id: 'scripts', label: 'Scripts' },
  ],
  ADMIN: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leads', label: 'Leads' },
    { id: 'team', label: 'Team' },
    { id: 'management', label: 'Management' },
    { id: 'scripts', label: 'Scripts' },
  ],
};

const ROLE_LABELS = {
  AGENT: { label: 'Agent', variant: 'default' as const },
  TEAM_LEAD: { label: 'Team Lead', variant: 'accent' as const },
  MANAGER: { label: 'Manager', variant: 'warning' as const },
  ADMIN: { label: 'Admin', variant: 'destructive' as const },
};

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'var(--color-success-600)',
  ON_CALL: 'var(--color-accent-600)',
  BREAK: 'var(--color-warning-500)',
  WRAP_UP: 'var(--color-primary-500)',
};

export function InsureConnectApp() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [role, setRole] = useState(CURRENT_USER.role);
  const [agentStatus, setAgentStatus] = useState(CURRENT_USER.status);

  const tabs = ROLE_TABS[role] || ROLE_TABS.AGENT;
  const roleInfo = ROLE_LABELS[role];

  function handleSelectLead(leadId: string) {
    setSelectedLeadId(leadId);
    setCurrentView('lead-detail');
  }

  function handleBackFromLead() {
    setSelectedLeadId(null);
    setCurrentView('leads');
  }

  // Determine active tab id (lead-detail maps back to leads)
  const activeTabId = currentView === 'lead-detail' ? 'leads' : currentView;

  return (
    <div style={{ maxWidth: 'var(--grid-max-width)' }}>
      {/* ── Top header bar ──────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-xl)',
        gap: 'var(--space-l)',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-m)' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-m)',
            background: 'var(--color-accent-600)',
            color: 'var(--color-constant-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 'var(--font-size-text-small)',
          }}>
            IC
          </div>
          <div>
            <h1 style={{
              fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-h5)',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 'var(--line-height-default)',
            }}>
              InsureConnect
            </h1>
            <p style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--text-tertiary)',
              margin: 0,
            }}>
              AI-Powered Call Center Platform
            </p>
          </div>
        </div>

        {/* ── Agent info + role switcher ────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-l)' }}>
          {/* Role switcher (demo only) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--text-tertiary)' }}>View as:</span>
            {(Object.keys(ROLE_LABELS) as Array<keyof typeof ROLE_LABELS>).map(r => (
              <Pill
                key={r}
                variant={ROLE_LABELS[r].variant}
                selected={role === r}
                onClick={() => {
                  setRole(r);
                  setCurrentView('dashboard');
                }}
              >
                {ROLE_LABELS[r].label}
              </Pill>
            ))}
          </div>

          {/* Agent status + info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-s)',
            paddingLeft: 'var(--space-l)',
            borderLeft: '1px solid var(--border-default)',
          }}>
            {/* Status indicator */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card-nested)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 'var(--font-size-caption)',
                color: 'var(--text-primary)',
              }}>
                {CURRENT_USER.avatar}
              </div>
              <div style={{
                position: 'absolute',
                bottom: -1,
                right: -1,
                width: 10,
                height: 10,
                borderRadius: 'var(--radius-full)',
                background: STATUS_COLORS[agentStatus],
                border: '2px solid var(--bg-card)',
              }} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-text-small)', fontWeight: 500, color: 'var(--text-primary)' }}>
                {CURRENT_USER.name}
              </div>
              <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--text-tertiary)' }}>
                {agentStatus.replace('_', ' ')}
              </div>
            </div>
            {/* Status toggle button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const states = ['AVAILABLE', 'ON_CALL', 'BREAK', 'WRAP_UP'] as const;
                const idx = states.indexOf(agentStatus);
                setAgentStatus(states[(idx + 1) % states.length]);
              }}
            >
              <i className="fa-solid fa-circle-dot" style={{ color: STATUS_COLORS[agentStatus] }} />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Navigation tabs ──────────────────────────────────── */}
      {currentView !== 'lead-detail' && (
        <div style={{ marginBottom: 'var(--space-xxl)' }}>
          <Tabs
            tabs={tabs.map(t => ({ id: t.id, label: t.label }))}
            activeId={activeTabId}
            onChange={(id) => setCurrentView(id as View)}
          />
        </div>
      )}

      {/* ── View content ──────────────────────────────────────── */}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'leads' && <LeadsView onSelectLead={handleSelectLead} />}
      {currentView === 'lead-detail' && selectedLeadId && (
        <LeadDetailView leadId={selectedLeadId} onBack={handleBackFromLead} />
      )}
      {currentView === 'team' && <TeamDashboardView />}
      {currentView === 'management' && <ManagementView />}
      {currentView === 'scripts' && <ScriptsView />}
    </div>
  );
}
