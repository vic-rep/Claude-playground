import { useState, useMemo } from 'react';
import './sms-campaign.css';
import {
  Button,
  Input,
  Tabs,
  Tag,
  Pill,
  ProgressBar,
  Modal,
  Alert,
  Toggle,
} from '@trusti/design-system';

/* ─── Bulgarian SMS constraints ──────────────────────────────
   - Latin-only (GSM 7-bit): 160 chars per segment, 153 per concat segment
   - Cyrillic (UCS-2): 70 chars per segment, 67 per concat segment
   - Max 6 concatenated segments (918 Latin / 402 Cyrillic)
   ──────────────────────────────────────────────────────────── */
const GSM_SINGLE = 160;
const GSM_CONCAT = 153;
const UCS2_SINGLE = 70;
const UCS2_CONCAT = 67;
const MAX_SEGMENTS = 6;

function isCyrillic(text: string) {
  return /[\u0400-\u04FF]/.test(text);
}

function smsInfo(text: string) {
  const len = text.length;
  const cyrillic = isCyrillic(text);
  const singleLimit = cyrillic ? UCS2_SINGLE : GSM_SINGLE;
  const concatLimit = cyrillic ? UCS2_CONCAT : GSM_CONCAT;
  const maxChars = cyrillic ? UCS2_SINGLE + UCS2_CONCAT * (MAX_SEGMENTS - 1) : GSM_SINGLE + GSM_CONCAT * (MAX_SEGMENTS - 1);
  const segments = len === 0 ? 0 : len <= singleLimit ? 1 : Math.ceil(len / concatLimit);
  return { len, segments, maxChars, singleLimit, concatLimit, cyrillic, encoding: cyrillic ? 'UCS-2 (Cyrillic)' : 'GSM 7-bit (Latin)' };
}

/* ─── Mock data ──────────────────────────────────────────────── */
interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  segmentId: string;
  message: string;
  scheduledAt?: string;
  stats: { sent: number; delivered: number; clicked: number; failed: number };
}

interface Segment {
  id: string;
  name: string;
  numbers: string[];
  createdAt: string;
}

const INITIAL_SEGMENTS: Segment[] = [
  { id: 'seg-1', name: 'VIP Customers', numbers: ['+359888111222', '+359877333444', '+359899555666', '+359888777888', '+359877999000'], createdAt: '2026-03-01' },
  { id: 'seg-2', name: 'New Signups (Mar 2026)', numbers: ['+359888222333', '+359877444555', '+359899666777'], createdAt: '2026-03-15' },
  { id: 'seg-3', name: 'Inactive Users', numbers: ['+359888333444', '+359877555666', '+359899777888', '+359888999000', '+359877111222', '+359899222333', '+359888444555'], createdAt: '2026-02-20' },
];

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1', name: 'March Promo', status: 'sent', segmentId: 'seg-1',
    message: 'Trusti: Exclusive 20% off your next insurance renewal! Use code MARCH20 at checkout. Valid until 31.03. Reply STOP to opt out.',
    stats: { sent: 5, delivered: 4, clicked: 2, failed: 1 },
  },
  {
    id: 'camp-2', name: 'Welcome Series', status: 'scheduled', segmentId: 'seg-2',
    message: 'Welcome to Trusti! Your account is ready. Download our app to manage your policies on the go: https://trusti.bg/app',
    scheduledAt: '2026-03-25T10:00',
    stats: { sent: 0, delivered: 0, clicked: 0, failed: 0 },
  },
  {
    id: 'camp-3', name: 'Reactivation', status: 'draft', segmentId: 'seg-3',
    message: 'We miss you! Come back to Trusti and get a free consultation. Visit trusti.bg/comeback',
    stats: { sent: 0, delivered: 0, clicked: 0, failed: 0 },
  },
];

const STATUS_VARIANT: Record<Campaign['status'], { bg: string; text: string }> = {
  draft: { bg: 'var(--color-primary-100)', text: 'var(--color-primary-600)' },
  scheduled: { bg: 'var(--color-warning-100)', text: 'var(--color-warning-600)' },
  sending: { bg: 'var(--color-accent-100)', text: 'var(--color-accent-700)' },
  sent: { bg: 'var(--color-success-100)', text: 'var(--color-success-700)' },
  failed: { bg: 'var(--color-destructive-100)', text: 'var(--color-destructive-600)' },
};

/* ─── Phone Preview Component ────────────────────────────────── */
function SmsPreview({ message, sender }: { message: string; sender: string }) {
  return (
    <div className="sms-phone-frame">
      <div className="sms-phone-notch" />
      <div className="sms-phone-header">
        <span className="sms-phone-sender">{sender || 'Trusti'}</span>
        <span className="sms-phone-time">10:24</span>
      </div>
      <div className="sms-phone-body">
        {message ? (
          <div className="sms-bubble">{message}</div>
        ) : (
          <p className="sms-phone-empty">Type a message to preview...</p>
        )}
      </div>
      <div className="sms-phone-bottom-bar" />
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({ label, value, subtext, color }: { label: string; value: number | string; subtext?: string; color?: string }) {
  return (
    <div className="sms-stat-card">
      <span className="sms-stat-label">{label}</span>
      <span className="sms-stat-value" style={color ? { color } : undefined}>{value}</span>
      {subtext && <span className="sms-stat-subtext">{subtext}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main SMS Campaign App
   ═══════════════════════════════════════════════════════════════ */
export function SmsCampaignApp() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [segments, setSegments] = useState<Segment[]>(INITIAL_SEGMENTS);

  // Campaign editor
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editorName, setEditorName] = useState('');
  const [editorMessage, setEditorMessage] = useState('');
  const [editorSegment, setEditorSegment] = useState('');
  const [editorSender, setEditorSender] = useState('Trusti');
  const [editorSchedule, setEditorSchedule] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  // Segment editor
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [segmentNumbers, setSegmentNumbers] = useState('');
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);

  // Stats detail
  const [statsCampaign, setStatsCampaign] = useState<Campaign | null>(null);

  // Send confirmation
  const [confirmSend, setConfirmSend] = useState<Campaign | null>(null);

  const msgInfo = useMemo(() => smsInfo(editorMessage), [editorMessage]);
  const isOverLimit = msgInfo.len > msgInfo.maxChars;
  const segmentForEditor = segments.find(s => s.id === editorSegment);

  /* ─── Aggregate stats ────────────────────────────────────── */
  const totalStats = useMemo(() => {
    return campaigns.reduce((acc, c) => ({
      sent: acc.sent + c.stats.sent,
      delivered: acc.delivered + c.stats.delivered,
      clicked: acc.clicked + c.stats.clicked,
      failed: acc.failed + c.stats.failed,
    }), { sent: 0, delivered: 0, clicked: 0, failed: 0 });
  }, [campaigns]);

  /* ─── Campaign actions ───────────────────────────────────── */
  function openEditor(campaign?: Campaign) {
    if (campaign) {
      setEditingCampaign(campaign);
      setEditorName(campaign.name);
      setEditorMessage(campaign.message);
      setEditorSegment(campaign.segmentId);
      setEditorSchedule(campaign.scheduledAt || '');
    } else {
      setEditingCampaign(null);
      setEditorName('');
      setEditorMessage('');
      setEditorSegment(segments[0]?.id || '');
      setEditorSchedule('');
    }
    setEditorSender('Trusti');
    setShowPreview(true);
    setActiveTab('editor');
  }

  function saveCampaign() {
    if (!editorName.trim() || !editorMessage.trim() || !editorSegment) return;
    const updated: Campaign = {
      id: editingCampaign?.id || `camp-${Date.now()}`,
      name: editorName.trim(),
      message: editorMessage,
      segmentId: editorSegment,
      status: editorSchedule ? 'scheduled' : 'draft',
      scheduledAt: editorSchedule || undefined,
      stats: editingCampaign?.stats || { sent: 0, delivered: 0, clicked: 0, failed: 0 },
    };
    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => c.id === updated.id ? updated : c));
    } else {
      setCampaigns(prev => [...prev, updated]);
    }
    setActiveTab('campaigns');
  }

  function handleSendNow(campaign: Campaign) {
    const seg = segments.find(s => s.id === campaign.segmentId);
    const count = seg?.numbers.length || 0;
    setCampaigns(prev => prev.map(c =>
      c.id === campaign.id
        ? { ...c, status: 'sent' as const, stats: { sent: count, delivered: Math.round(count * 0.92), clicked: Math.round(count * 0.35), failed: Math.round(count * 0.08) } }
        : c
    ));
    setConfirmSend(null);
  }

  function deleteCampaign(id: string) {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  }

  /* ─── Segment actions ────────────────────────────────────── */
  function openSegmentEditor(segment?: Segment) {
    if (segment) {
      setEditingSegment(segment);
      setSegmentName(segment.name);
      setSegmentNumbers(segment.numbers.join('\n'));
    } else {
      setEditingSegment(null);
      setSegmentName('');
      setSegmentNumbers('');
    }
    setShowSegmentModal(true);
  }

  function saveSegment() {
    if (!segmentName.trim() || !segmentNumbers.trim()) return;
    const numbers = segmentNumbers.split(/[\n,;]+/).map(n => n.trim()).filter(Boolean);
    if (editingSegment) {
      setSegments(prev => prev.map(s => s.id === editingSegment.id ? { ...s, name: segmentName.trim(), numbers } : s));
    } else {
      setSegments(prev => [...prev, { id: `seg-${Date.now()}`, name: segmentName.trim(), numbers, createdAt: new Date().toISOString().slice(0, 10) }]);
    }
    setShowSegmentModal(false);
  }

  function deleteSegment(id: string) {
    setSegments(prev => prev.filter(s => s.id !== id));
  }

  /* ═══════════════════════════════════════════════════════════ */
  return (
    <div className="sms-app">
      <div className="sms-app-header">
        <div>
          <h1 className="sms-app-title">SMS Campaigns</h1>
          <p className="sms-app-subtitle">Create and manage SMS marketing campaigns for Trusti clients</p>
        </div>
        <Button variant="primary" onClick={() => openEditor()}>
          <i className="fa-solid fa-plus" style={{ marginRight: 6 }} />
          New Campaign
        </Button>
      </div>

      {/* ── Overview stats ──────────────────────────────────── */}
      <div className="sms-stats-row">
        <StatCard label="Total Sent" value={totalStats.sent} color="var(--color-accent-600)" />
        <StatCard label="Delivered" value={totalStats.delivered} subtext={totalStats.sent ? `${Math.round((totalStats.delivered / totalStats.sent) * 100)}%` : '—'} color="var(--color-success-700)" />
        <StatCard label="Clicked" value={totalStats.clicked} subtext={totalStats.delivered ? `${Math.round((totalStats.clicked / totalStats.delivered) * 100)}%` : '—'} color="var(--color-accent-700)" />
        <StatCard label="Failed" value={totalStats.failed} subtext={totalStats.sent ? `${Math.round((totalStats.failed / totalStats.sent) * 100)}%` : '—'} color="var(--color-destructive-600)" />
      </div>

      {/* ── Tabs ────────────────────────────────────────────── */}
      <Tabs
        tabs={[
          { id: 'campaigns', label: 'Campaigns' },
          { id: 'segments', label: 'Segments' },
          { id: 'editor', label: editingCampaign ? 'Edit Campaign' : 'New Campaign', disabled: activeTab !== 'editor' && !editingCampaign },
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      <div className="sms-tab-content">
        {/* ════════ CAMPAIGNS TAB ════════════════════════════ */}
        {activeTab === 'campaigns' && (
          <div className="sms-campaigns-list">
            {campaigns.length === 0 && (
              <div className="sms-empty">
                <p>No campaigns yet. Create your first SMS campaign to get started.</p>
              </div>
            )}
            {campaigns.map(camp => {
              const seg = segments.find(s => s.id === camp.segmentId);
              const colors = STATUS_VARIANT[camp.status];
              return (
                <div key={camp.id} className="sms-campaign-row">
                  <div className="sms-campaign-info">
                    <div className="sms-campaign-name-row">
                      <span className="sms-campaign-name">{camp.name}</span>
                      <span className="sms-status-badge" style={{ background: colors.bg, color: colors.text }}>{camp.status}</span>
                    </div>
                    <p className="sms-campaign-message-preview">{camp.message.length > 80 ? camp.message.slice(0, 80) + '...' : camp.message}</p>
                    <div className="sms-campaign-meta">
                      {seg && <Tag>{seg.name}</Tag>}
                      <span className="sms-campaign-meta-text">{seg ? `${seg.numbers.length} recipients` : 'No segment'}</span>
                      {camp.scheduledAt && <span className="sms-campaign-meta-text">Scheduled: {new Date(camp.scheduledAt).toLocaleString('bg-BG')}</span>}
                    </div>
                  </div>
                  <div className="sms-campaign-stats-mini">
                    {camp.status === 'sent' && (
                      <>
                        <Pill variant="success">{camp.stats.delivered} delivered</Pill>
                        <Pill variant="default">{camp.stats.clicked} clicked</Pill>
                      </>
                    )}
                  </div>
                  <div className="sms-campaign-actions">
                    {camp.status === 'sent' && (
                      <Button variant="ghost" size="sm" onClick={() => setStatsCampaign(camp)}>
                        <i className="fa-solid fa-chart-bar" style={{ marginRight: 4 }} />Stats
                      </Button>
                    )}
                    {(camp.status === 'draft' || camp.status === 'scheduled') && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => openEditor(camp)}>
                          <i className="fa-solid fa-pen" style={{ marginRight: 4 }} />Edit
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setConfirmSend(camp)}>
                          <i className="fa-solid fa-paper-plane" style={{ marginRight: 4 }} />Send
                        </Button>
                      </>
                    )}
                    {camp.status !== 'sending' && (
                      <Button variant="ghost" size="sm" onClick={() => deleteCampaign(camp.id)}>
                        <i className="fa-solid fa-trash" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════ SEGMENTS TAB ═════════════════════════════ */}
        {activeTab === 'segments' && (
          <div>
            <div className="sms-segments-header">
              <h3 className="sms-section-title">Audience Segments</h3>
              <Button variant="secondary" size="sm" onClick={() => openSegmentEditor()}>
                <i className="fa-solid fa-plus" style={{ marginRight: 4 }} />New Segment
              </Button>
            </div>
            <div className="sms-segments-grid">
              {segments.map(seg => (
                <div key={seg.id} className="sms-segment-card">
                  <div className="sms-segment-card-header">
                    <span className="sms-segment-name">{seg.name}</span>
                    <Pill variant="default">{seg.numbers.length} numbers</Pill>
                  </div>
                  <p className="sms-segment-date">Created {seg.createdAt}</p>
                  <div className="sms-segment-numbers">
                    {seg.numbers.slice(0, 3).map(n => (
                      <code key={n} className="sms-number-chip">{n}</code>
                    ))}
                    {seg.numbers.length > 3 && (
                      <span className="sms-number-more">+{seg.numbers.length - 3} more</span>
                    )}
                  </div>
                  <div className="sms-segment-actions">
                    <Button variant="ghost" size="sm" onClick={() => openSegmentEditor(seg)}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteSegment(seg.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ EDITOR TAB ═══════════════════════════════ */}
        {activeTab === 'editor' && (
          <div className="sms-editor-layout">
            <div className="sms-editor-form">
              <h3 className="sms-section-title">{editingCampaign ? 'Edit Campaign' : 'Create Campaign'}</h3>

              <Input
                label="Campaign Name"
                value={editorName}
                onChange={e => setEditorName(e.target.value)}
                placeholder="e.g. Spring Promo 2026"
              />

              <Input
                label="Sender Name"
                value={editorSender}
                onChange={e => setEditorSender(e.target.value.slice(0, 11))}
                helperText="Max 11 characters (alphanumeric). Displayed as sender on recipient devices."
              />

              <div className="sms-field">
                <label className="sms-label">Target Segment</label>
                <select
                  className="sms-select"
                  value={editorSegment}
                  onChange={e => setEditorSegment(e.target.value)}
                >
                  <option value="">Select a segment...</option>
                  {segments.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.numbers.length} numbers)</option>
                  ))}
                </select>
                {segmentForEditor && (
                  <p className="sms-helper">Sending to {segmentForEditor.numbers.length} recipients in "{segmentForEditor.name}"</p>
                )}
              </div>

              <div className="sms-field">
                <label className="sms-label">Message</label>
                <textarea
                  className={`sms-textarea ${isOverLimit ? 'sms-textarea--error' : ''}`}
                  value={editorMessage}
                  onChange={e => setEditorMessage(e.target.value)}
                  rows={5}
                  placeholder="Type your SMS message here... Use Latin characters to maximize character count."
                />
                <div className="sms-char-info">
                  <span className={`sms-char-count ${isOverLimit ? 'sms-char-count--error' : ''}`}>
                    {msgInfo.len} / {msgInfo.maxChars} characters
                  </span>
                  <span className="sms-encoding">{msgInfo.encoding}</span>
                  <span className="sms-segments-count">
                    {msgInfo.segments} segment{msgInfo.segments !== 1 ? 's' : ''}
                    {msgInfo.segments > 1 && ` (${msgInfo.concatLimit} chars/segment)`}
                  </span>
                </div>
                {isOverLimit && (
                  <div className="sms-alert-spacing">
                    <Alert variant="destructive" title={`Message exceeds maximum length of ${MAX_SEGMENTS} SMS segments (${msgInfo.maxChars} characters for ${msgInfo.encoding}).`} />
                  </div>
                )}
                {msgInfo.cyrillic && msgInfo.len > 0 && (
                  <div className="sms-alert-spacing">
                    <Alert variant="warning" title={`Cyrillic detected — UCS-2 encoding limits to ${UCS2_SINGLE} chars/segment (vs ${GSM_SINGLE} Latin). Consider Latin transliteration for longer messages.`} />
                  </div>
                )}
                {msgInfo.segments > 1 && !isOverLimit && (
                  <div className="sms-alert-spacing">
                    <Alert variant="info" title={`This message will be sent as ${msgInfo.segments} concatenated SMS segments. Each additional segment increases cost.`} />
                  </div>
                )}
              </div>

              <div className="sms-field">
                <label className="sms-label">Schedule (optional)</label>
                <input
                  type="datetime-local"
                  className="sms-datetime"
                  value={editorSchedule}
                  onChange={e => setEditorSchedule(e.target.value)}
                />
                <p className="sms-helper">Leave empty to save as draft. Set a date/time to schedule automatic sending.</p>
              </div>

              <div className="sms-editor-toggle-row">
                <Toggle
                  checked={showPreview}
                  onChange={(e) => setShowPreview(e.target.checked)}
                  label="Show SMS Preview"
                />
              </div>

              <div className="sms-editor-actions">
                <Button variant="secondary" onClick={() => setActiveTab('campaigns')}>Cancel</Button>
                <Button variant="primary" onClick={saveCampaign} disabled={!editorName.trim() || !editorMessage.trim() || !editorSegment || isOverLimit}>
                  {editorSchedule ? 'Schedule Campaign' : 'Save as Draft'}
                </Button>
              </div>
            </div>

            {showPreview && (
              <div className="sms-editor-preview">
                <h4 className="sms-preview-title">SMS Preview</h4>
                <SmsPreview message={editorMessage} sender={editorSender} />
                <div className="sms-preview-meta">
                  <div className="sms-preview-meta-row">
                    <span>Encoding</span>
                    <strong>{msgInfo.encoding}</strong>
                  </div>
                  <div className="sms-preview-meta-row">
                    <span>Characters</span>
                    <strong>{msgInfo.len}</strong>
                  </div>
                  <div className="sms-preview-meta-row">
                    <span>Segments</span>
                    <strong>{msgInfo.segments}</strong>
                  </div>
                  <div className="sms-preview-meta-row">
                    <span>Max per segment</span>
                    <strong>{msgInfo.len <= msgInfo.singleLimit ? msgInfo.singleLimit : msgInfo.concatLimit}</strong>
                  </div>
                  {segmentForEditor && (
                    <div className="sms-preview-meta-row">
                      <span>Total SMS</span>
                      <strong>{msgInfo.segments * segmentForEditor.numbers.length}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ════════ STATS MODAL ═══════════════════════════════ */}
      <Modal open={!!statsCampaign} onClose={() => setStatsCampaign(null)} title={`Campaign Stats: ${statsCampaign?.name}`} size="lg">
        {statsCampaign && (() => {
          const s = statsCampaign.stats;
          const deliveryRate = s.sent ? Math.round((s.delivered / s.sent) * 100) : 0;
          const clickRate = s.delivered ? Math.round((s.clicked / s.delivered) * 100) : 0;
          const failRate = s.sent ? Math.round((s.failed / s.sent) * 100) : 0;
          const seg = segments.find(x => x.id === statsCampaign.segmentId);
          return (
            <div className="sms-stats-detail">
              <div className="sms-stats-row">
                <StatCard label="Sent" value={s.sent} color="var(--color-accent-600)" />
                <StatCard label="Delivered" value={s.delivered} subtext={`${deliveryRate}%`} color="var(--color-success-700)" />
                <StatCard label="Clicked" value={s.clicked} subtext={`${clickRate}%`} color="var(--color-accent-700)" />
                <StatCard label="Failed" value={s.failed} subtext={`${failRate}%`} color="var(--color-destructive-600)" />
              </div>

              <div className="sms-stats-bars">
                <ProgressBar label="Delivery Rate" value={deliveryRate} showValue variant="success" />
                <ProgressBar label="Click-through Rate" value={clickRate} showValue variant="default" />
                <ProgressBar label="Failure Rate" value={failRate} showValue variant="destructive" />
              </div>

              <div className="sms-stats-info">
                <div className="sms-stats-info-row">
                  <span>Segment</span>
                  <strong>{seg?.name || 'Unknown'}</strong>
                </div>
                <div className="sms-stats-info-row">
                  <span>Message</span>
                  <p className="sms-stats-message">{statsCampaign.message}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ════════ SEND CONFIRMATION MODAL ════════════════════ */}
      <Modal open={!!confirmSend} onClose={() => setConfirmSend(null)} title="Confirm Send" size="sm"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-s)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setConfirmSend(null)}>Cancel</Button>
            <Button variant="primary" onClick={() => confirmSend && handleSendNow(confirmSend)}>Send Now</Button>
          </div>
        }
      >
        {confirmSend && (() => {
          const seg = segments.find(s => s.id === confirmSend.segmentId);
          const info = smsInfo(confirmSend.message);
          return (
            <div>
              <p style={{ fontSize: 'var(--font-size-text-default)', color: 'var(--text-primary)', marginBottom: 'var(--space-l)' }}>
                Are you sure you want to send <strong>"{confirmSend.name}"</strong>?
              </p>
              <div className="sms-confirm-details">
                <div className="sms-confirm-row"><span>Recipients</span><strong>{seg?.numbers.length || 0}</strong></div>
                <div className="sms-confirm-row"><span>Segments per message</span><strong>{info.segments}</strong></div>
                <div className="sms-confirm-row"><span>Total SMS to send</span><strong>{info.segments * (seg?.numbers.length || 0)}</strong></div>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ════════ SEGMENT EDITOR MODAL ═══════════════════════ */}
      <Modal open={showSegmentModal} onClose={() => setShowSegmentModal(false)} title={editingSegment ? 'Edit Segment' : 'New Segment'} size="md"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-s)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setShowSegmentModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={saveSegment} disabled={!segmentName.trim() || !segmentNumbers.trim()}>
              {editingSegment ? 'Update Segment' : 'Create Segment'}
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-l)' }}>
          <Input
            label="Segment Name"
            value={segmentName}
            onChange={e => setSegmentName(e.target.value)}
            placeholder="e.g. VIP Customers"
          />
          <div className="sms-field">
            <label className="sms-label">Phone Numbers</label>
            <textarea
              className="sms-textarea"
              value={segmentNumbers}
              onChange={e => setSegmentNumbers(e.target.value)}
              rows={8}
              placeholder={"+359888111222\n+359877333444\n+359899555666\n\nOne number per line, or separate with commas/semicolons."}
            />
            <p className="sms-helper">
              {segmentNumbers.split(/[\n,;]+/).filter(n => n.trim()).length} numbers entered.
              Bulgarian mobile numbers should start with +359 followed by 87, 88, or 89.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
