/* ═══════════════════════════════════════════════════════════
   InsureConnect — Mock Data & Types
   ═══════════════════════════════════════════════════════════ */

export type Role = 'AGENT' | 'TEAM_LEAD' | 'MANAGER' | 'ADMIN';
export type LeadStatus = 'NEW' | 'ASSIGNED' | 'CONTACTED' | 'QUALIFIED' | 'QUOTED' | 'WON' | 'LOST' | 'DISQUALIFIED';
export type InsuranceType = 'CAR' | 'HOME' | 'TRAVEL';
export type CrossSellPotential = 'HIGH' | 'MED' | 'LOW' | 'NONE';
export type LeadSource = 'WEBSITE_FORM' | 'QUOTE_WIDGET' | 'CALLBACK' | 'REFERRAL';
export type CallDisposition = 'QUOTED' | 'CALLBACK_SCHEDULED' | 'OBJECTION_UNRESOLVED' | 'POLICY_BOUND' | 'LOST' | 'NO_ANSWER';
export type AgentStatus = 'AVAILABLE' | 'ON_CALL' | 'BREAK' | 'WRAP_UP';
export type HintType = 'OBJECTION' | 'CROSS_SELL' | 'UPSELL' | 'CLOSING' | 'COMPLIANCE_WARNING' | 'RAPPORT';
export type ScriptNodeType = 'Opening' | 'Validation' | 'Discovery' | 'Presentation' | 'Objection' | 'CrossSell' | 'Closing' | 'WrapUp';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  teamId: string;
  languages: string[];
  avatar: string;
  status: AgentStatus;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  country: string;
  countryFlag: string;
  language: string;
  status: LeadStatus;
  priorityScore: number;
  source: LeadSource;
  insuranceType: InsuranceType;
  crossSellPotential: CrossSellPotential;
  assignedToId: string;
  slaDeadline: string;
  lastContactAt: string;
  createdAt: string;
  vehicleData?: { make: string; model: string; year: number; value: number; mileage: number };
  propertyData?: { type: string; value: number; sqm: number; yearBuilt: number };
  travelData?: { destination: string; duration: number; travelers: number };
  lostReason?: string;
}

export interface Call {
  id: string;
  leadId: string;
  agentId: string;
  direction: 'INBOUND' | 'OUTBOUND';
  startedAt: string;
  endedAt?: string;
  duration: number;
  disposition?: CallDisposition;
  aiSummary?: string;
  aiQualityScore?: number;
  sentimentAvg?: number;
  crossSellAttempted: boolean;
  crossSellConverted: boolean;
}

export interface AiHint {
  id: string;
  type: HintType;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  reasoning: string;
  dismissed: boolean;
  pinned: boolean;
}

export interface ScriptNode {
  id: string;
  type: ScriptNodeType;
  title: string;
  body: string;
  prompts: string[];
}

export interface Script {
  id: string;
  name: string;
  productType: InsuranceType;
  version: number;
  isActive: boolean;
  nodes: ScriptNode[];
}

export interface PricingTier {
  name: string;
  monthlyPremium: number;
  annualPremium: number;
  coverage: string[];
  extras: string[];
}

export interface Activity {
  id: string;
  type: 'CALL' | 'EMAIL' | 'SMS' | 'NOTE' | 'STATUS_CHANGE';
  description: string;
  timestamp: string;
  agentName: string;
}

export interface Condition {
  id: string;
  category: 'DISCLOSURE' | 'EXCLUSION' | 'REGULATION' | 'CONDITION';
  title: string;
  plainText: string;
  isMandatory: boolean;
  checked: boolean;
}

/* ─── Status color mappings ──────────────────────────────── */
export const LEAD_STATUS_COLORS: Record<LeadStatus, { bg: string; text: string }> = {
  NEW: { bg: 'var(--color-accent-100)', text: 'var(--color-accent-700)' },
  ASSIGNED: { bg: 'var(--color-warning-100)', text: 'var(--color-warning-600)' },
  CONTACTED: { bg: 'var(--color-primary-100)', text: 'var(--color-primary-700)' },
  QUALIFIED: { bg: 'var(--color-accent-100)', text: 'var(--color-accent-800)' },
  QUOTED: { bg: 'var(--color-warning-100)', text: 'var(--color-warning-600)' },
  WON: { bg: 'var(--color-success-100)', text: 'var(--color-success-700)' },
  LOST: { bg: 'var(--color-destructive-100)', text: 'var(--color-destructive-600)' },
  DISQUALIFIED: { bg: 'var(--color-primary-100)', text: 'var(--color-primary-500)' },
};

export const HINT_COLORS: Record<HintType, { bg: string; border: string; icon: string }> = {
  OBJECTION: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)', icon: 'fa-shield-halved' },
  CROSS_SELL: { bg: 'var(--color-success-100)', border: 'rgba(0,150,71,0.3)', icon: 'fa-arrow-right-arrow-left' },
  UPSELL: { bg: 'rgba(147,51,234,0.08)', border: 'rgba(147,51,234,0.3)', icon: 'fa-arrow-trend-up' },
  CLOSING: { bg: 'var(--color-warning-100)', border: 'rgba(233,131,0,0.3)', icon: 'fa-handshake' },
  COMPLIANCE_WARNING: { bg: 'var(--color-destructive-100)', border: 'rgba(255,0,34,0.3)', icon: 'fa-triangle-exclamation' },
  RAPPORT: { bg: 'var(--color-primary-100)', border: 'var(--border-default)', icon: 'fa-comments' },
};

export const INSURANCE_TYPE_ICONS: Record<InsuranceType, string> = {
  CAR: 'fa-car',
  HOME: 'fa-house',
  TRAVEL: 'fa-plane',
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  WEBSITE_FORM: 'Website',
  QUOTE_WIDGET: 'Quote Widget',
  CALLBACK: 'Callback',
  REFERRAL: 'Referral',
};

/* ─── Current user (Agent view) ──────────────────────────── */
export const CURRENT_USER: User = {
  id: 'u-1',
  name: 'Maria Ivanova',
  email: 'maria@insureconnect.eu',
  role: 'AGENT',
  teamId: 't-1',
  languages: ['BG', 'EN', 'DE'],
  avatar: 'MI',
  status: 'AVAILABLE',
};

/* ─── Team agents ────────────────────────────────────────── */
export const AGENTS: User[] = [
  CURRENT_USER,
  { id: 'u-2', name: 'Stefan Petrov', email: 'stefan@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['BG', 'EN'], avatar: 'SP', status: 'ON_CALL' },
  { id: 'u-3', name: 'Anna Schmidt', email: 'anna@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['DE', 'EN'], avatar: 'AS', status: 'AVAILABLE' },
  { id: 'u-4', name: 'Pierre Dupont', email: 'pierre@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['FR', 'EN'], avatar: 'PD', status: 'BREAK' },
  { id: 'u-5', name: 'Jan Kowalski', email: 'jan@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['PL', 'EN'], avatar: 'JK', status: 'WRAP_UP' },
  { id: 'u-6', name: 'Elena Marinova', email: 'elena@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['BG', 'EN', 'FR'], avatar: 'EM', status: 'ON_CALL' },
  { id: 'u-7', name: 'Thomas Weber', email: 'thomas@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['DE', 'EN'], avatar: 'TW', status: 'AVAILABLE' },
  { id: 'u-8', name: 'Sophie Martin', email: 'sophie@insureconnect.eu', role: 'AGENT', teamId: 't-1', languages: ['FR', 'EN', 'DE'], avatar: 'SM', status: 'AVAILABLE' },
];

export const TEAM_LEAD: User = {
  id: 'u-tl-1', name: 'Dimitar Georgiev', email: 'dimitar@insureconnect.eu',
  role: 'TEAM_LEAD', teamId: 't-1', languages: ['BG', 'EN', 'DE'], avatar: 'DG', status: 'AVAILABLE',
};

/* ─── Leads ──────────────────────────────────────────────── */
export const LEADS: Lead[] = [
  {
    id: 'l-1', customerName: 'Hans Müller', email: 'hans@example.de', phone: '+49 171 555 1234',
    country: 'DE', countryFlag: '🇩🇪', language: 'DE', status: 'QUALIFIED', priorityScore: 88,
    source: 'WEBSITE_FORM', insuranceType: 'CAR', crossSellPotential: 'HIGH',
    assignedToId: 'u-1', slaDeadline: '2026-03-22T16:30:00', lastContactAt: '2026-03-22T09:15:00',
    createdAt: '2026-03-20T14:22:00',
    vehicleData: { make: 'BMW', model: '320d', year: 2024, value: 42000, mileage: 15000 },
  },
  {
    id: 'l-2', customerName: 'Marie Dubois', email: 'marie@example.fr', phone: '+33 6 12 34 56 78',
    country: 'FR', countryFlag: '🇫🇷', language: 'FR', status: 'CONTACTED', priorityScore: 72,
    source: 'QUOTE_WIDGET', insuranceType: 'HOME', crossSellPotential: 'MED',
    assignedToId: 'u-1', slaDeadline: '2026-03-22T18:00:00', lastContactAt: '2026-03-21T16:45:00',
    createdAt: '2026-03-19T10:30:00',
    propertyData: { type: 'Apartment', value: 280000, sqm: 85, yearBuilt: 2018 },
  },
  {
    id: 'l-3', customerName: 'Piotr Nowak', email: 'piotr@example.pl', phone: '+48 501 234 567',
    country: 'PL', countryFlag: '🇵🇱', language: 'PL', status: 'NEW', priorityScore: 95,
    source: 'CALLBACK', insuranceType: 'CAR', crossSellPotential: 'HIGH',
    assignedToId: 'u-1', slaDeadline: '2026-03-22T14:00:00', lastContactAt: '2026-03-22T11:30:00',
    createdAt: '2026-03-22T11:00:00',
    vehicleData: { make: 'Audi', model: 'A4 Avant', year: 2023, value: 38000, mileage: 22000 },
  },
  {
    id: 'l-4', customerName: 'Georgi Todorov', email: 'georgi@example.bg', phone: '+359 888 123 456',
    country: 'BG', countryFlag: '🇧🇬', language: 'BG', status: 'QUOTED', priorityScore: 65,
    source: 'WEBSITE_FORM', insuranceType: 'CAR', crossSellPotential: 'LOW',
    assignedToId: 'u-1', slaDeadline: '2026-03-23T12:00:00', lastContactAt: '2026-03-21T14:20:00',
    createdAt: '2026-03-18T09:15:00',
    vehicleData: { make: 'VW', model: 'Golf 8', year: 2022, value: 28000, mileage: 35000 },
  },
  {
    id: 'l-5', customerName: 'James Wilson', email: 'james@example.co.uk', phone: '+44 7700 900 123',
    country: 'UK', countryFlag: '🇬🇧', language: 'EN', status: 'WON', priorityScore: 45,
    source: 'REFERRAL', insuranceType: 'TRAVEL', crossSellPotential: 'NONE',
    assignedToId: 'u-1', slaDeadline: '2026-03-25T10:00:00', lastContactAt: '2026-03-20T11:00:00',
    createdAt: '2026-03-15T08:00:00',
    travelData: { destination: 'Thailand', duration: 14, travelers: 2 },
  },
  {
    id: 'l-6', customerName: 'Katarina Horváthová', email: 'katarina@example.sk', phone: '+421 905 123 456',
    country: 'DE', countryFlag: '🇩🇪', language: 'DE', status: 'ASSIGNED', priorityScore: 82,
    source: 'WEBSITE_FORM', insuranceType: 'CAR', crossSellPotential: 'MED',
    assignedToId: 'u-1', slaDeadline: '2026-03-22T15:00:00', lastContactAt: '2026-03-22T08:00:00',
    createdAt: '2026-03-22T07:45:00',
    vehicleData: { make: 'Škoda', model: 'Octavia', year: 2025, value: 32000, mileage: 5000 },
  },
  {
    id: 'l-7', customerName: 'Luc Bernard', email: 'luc@example.fr', phone: '+33 6 98 76 54 32',
    country: 'FR', countryFlag: '🇫🇷', language: 'FR', status: 'LOST', priorityScore: 30,
    source: 'QUOTE_WIDGET', insuranceType: 'HOME', crossSellPotential: 'NONE',
    assignedToId: 'u-1', slaDeadline: '2026-03-20T10:00:00', lastContactAt: '2026-03-19T15:30:00',
    createdAt: '2026-03-17T11:20:00',
    propertyData: { type: 'House', value: 450000, sqm: 160, yearBuilt: 2005 },
    lostReason: 'Found cheaper quote with competitor',
  },
  {
    id: 'l-8', customerName: 'Ivana Dimitrova', email: 'ivana@example.bg', phone: '+359 877 654 321',
    country: 'BG', countryFlag: '🇧🇬', language: 'BG', status: 'CONTACTED', priorityScore: 78,
    source: 'CALLBACK', insuranceType: 'CAR', crossSellPotential: 'HIGH',
    assignedToId: 'u-1', slaDeadline: '2026-03-22T17:00:00', lastContactAt: '2026-03-22T10:00:00',
    createdAt: '2026-03-21T16:00:00',
    vehicleData: { make: 'Mercedes', model: 'C200', year: 2023, value: 48000, mileage: 18000 },
  },
];

/* ─── Activities for lead l-1 ────────────────────────────── */
export const LEAD_ACTIVITIES: Activity[] = [
  { id: 'a-1', type: 'STATUS_CHANGE', description: 'Status changed to Qualified', timestamp: '2026-03-22T09:15:00', agentName: 'Maria Ivanova' },
  { id: 'a-2', type: 'CALL', description: 'Outbound call — discussed coverage options, customer interested in Premium tier', timestamp: '2026-03-22T09:10:00', agentName: 'Maria Ivanova' },
  { id: 'a-3', type: 'NOTE', description: 'Customer prefers annual payment. Has no-claims bonus (5 years). Lives in Munich suburbs.', timestamp: '2026-03-21T16:30:00', agentName: 'Maria Ivanova' },
  { id: 'a-4', type: 'EMAIL', description: 'Sent initial quote comparison document', timestamp: '2026-03-21T14:00:00', agentName: 'Maria Ivanova' },
  { id: 'a-5', type: 'STATUS_CHANGE', description: 'Status changed to Contacted', timestamp: '2026-03-21T11:30:00', agentName: 'Maria Ivanova' },
  { id: 'a-6', type: 'CALL', description: 'First contact — introduced services, gathered vehicle details', timestamp: '2026-03-21T11:25:00', agentName: 'Maria Ivanova' },
  { id: 'a-7', type: 'STATUS_CHANGE', description: 'Lead assigned to Maria Ivanova', timestamp: '2026-03-20T14:30:00', agentName: 'System' },
  { id: 'a-8', type: 'STATUS_CHANGE', description: 'New lead created from website form', timestamp: '2026-03-20T14:22:00', agentName: 'System' },
];

/* ─── AI Hints ───────────────────────────────────────────── */
export const AI_HINTS: AiHint[] = [
  { id: 'h-1', type: 'CLOSING', priority: 'HIGH', message: 'Customer mentioned "annual payment" — this is a buying signal. Offer the annual discount (save 8%) to close.', reasoning: 'Detected purchase intent from preference for annual billing', dismissed: false, pinned: true },
  { id: 'h-2', type: 'CROSS_SELL', priority: 'HIGH', message: 'Customer owns property in Munich. Offer home insurance bundle for 12% multi-policy discount.', reasoning: 'Property ownership detected + HIGH cross-sell potential flag', dismissed: false, pinned: false },
  { id: 'h-3', type: 'UPSELL', priority: 'MEDIUM', message: 'BMW 320d has high theft rate in urban areas. Suggest Premium tier with comprehensive theft protection.', reasoning: 'Vehicle model risk profile suggests comprehensive coverage value', dismissed: false, pinned: false },
  { id: 'h-4', type: 'COMPLIANCE_WARNING', priority: 'HIGH', message: 'Germany requires 14-day cooling-off disclosure before binding. Ensure customer acknowledges.', reasoning: 'DE regulation: §8 VVG withdrawal right', dismissed: false, pinned: false },
  { id: 'h-5', type: 'RAPPORT', priority: 'LOW', message: 'Customer mentioned family — acknowledge and relate coverage to family protection.', reasoning: 'Building rapport increases conversion probability by 15%', dismissed: false, pinned: false },
  { id: 'h-6', type: 'OBJECTION', priority: 'MEDIUM', message: 'If price objection: "I understand budget is important. With your 5-year no-claims bonus, you\'re already getting our best rate. Let me show you how the excess options work."', reasoning: 'Pre-emptive objection handling based on pricing discussion phase', dismissed: false, pinned: false },
];

/* ─── Conditions for CAR + DE ────────────────────────────── */
export const CONDITIONS: Condition[] = [
  { id: 'c-1', category: 'DISCLOSURE', title: '14-Day Cooling-Off Period', plainText: 'Customer has 14 days from policy start to cancel without penalty (§8 VVG).', isMandatory: true, checked: false },
  { id: 'c-2', category: 'DISCLOSURE', title: 'Data Processing Consent', plainText: 'Personal data will be processed for underwriting purposes per GDPR Art. 6(1)(b).', isMandatory: true, checked: false },
  { id: 'c-3', category: 'DISCLOSURE', title: 'Call Recording Notice', plainText: 'This call is recorded for quality assurance and regulatory compliance.', isMandatory: true, checked: false },
  { id: 'c-4', category: 'EXCLUSION', title: 'Racing & Competition', plainText: 'Cover excludes use in racing, rallying, or speed testing events.', isMandatory: false, checked: false },
  { id: 'c-5', category: 'EXCLUSION', title: 'Commercial Use', plainText: 'Standard policy excludes use for ride-sharing, taxi, or courier services.', isMandatory: false, checked: false },
  { id: 'c-6', category: 'REGULATION', title: 'Minimum Third-Party Liability', plainText: 'German law requires minimum €7.5M third-party liability cover (PflVG).', isMandatory: false, checked: false },
  { id: 'c-7', category: 'CONDITION', title: 'Claims Reporting', plainText: 'Claims must be reported within 7 days of the incident.', isMandatory: false, checked: false },
  { id: 'c-8', category: 'CONDITION', title: 'Vehicle Modifications', plainText: 'Any modifications must be declared. Undeclared modifications may void cover.', isMandatory: false, checked: false },
];

/* ─── Scripts ────────────────────────────────────────────── */
export const SCRIPTS: Script[] = [
  {
    id: 's-1', name: 'Car Insurance — Inbound Quote', productType: 'CAR', version: 3, isActive: true,
    nodes: [
      { id: 'n-1', type: 'Opening', title: 'Greeting & Consent', body: 'Hi {name}, thanks for requesting a quote on our website. Before we start, I need to let you know this call may be recorded for quality purposes — is that okay?', prompts: ['Confirm caller identity', 'Get recording consent'] },
      { id: 'n-2', type: 'Validation', title: 'Data Verification', body: 'I can see you drive a {vehicle}. Can you confirm that\'s correct? And you\'re based in {city}?', prompts: ['Verify vehicle details', 'Confirm address', 'Check driving license status'] },
      { id: 'n-3', type: 'Discovery', title: 'Needs Assessment', body: 'A few quick questions to get you the best rate:', prompts: ['Annual mileage?', 'Overnight parking?', 'Any modifications?', 'Claims in last 5 years?', 'Current insurer?'] },
      { id: 'n-4', type: 'Presentation', title: 'Quote Presentation', body: 'Based on what you\'ve told me, here are your options. I\'ll walk you through each tier so you can see what\'s included.', prompts: ['Present 3 tiers', 'Highlight value of Standard', 'Mention no-claims discount'] },
      { id: 'n-5', type: 'Objection', title: 'Handle Objections', body: 'Common responses to price concerns:', prompts: ['"That\'s more than expected" → Show excess options', '"Need to think about it" → Offer callback slot', '"Competitor is cheaper" → Compare coverage, not just price'] },
      { id: 'n-6', type: 'CrossSell', title: 'Cross-Sell Opportunity', body: 'One more thing — since you mentioned {trigger}, I can also get you a quote for {product} and save you {discount}% with a bundle.', prompts: ['Home insurance if owns property', 'Travel if mentioned holidays', 'Bundle discount: 12%'] },
      { id: 'n-7', type: 'Closing', title: 'Close & Confirm', body: 'Great, let me confirm the details. Your cover starts {date}, and you\'ll receive all documents by email within the hour.', prompts: ['Read back key terms', 'Confirm payment method', 'State cooling-off period'] },
      { id: 'n-8', type: 'WrapUp', title: 'Wrap Up', body: 'You\'re all set. Any questions? I\'ll follow up in a week to make sure everything is working for you.', prompts: ['Offer contact details', 'Set follow-up reminder', 'Thank customer'] },
    ],
  },
  {
    id: 's-2', name: 'Home Insurance — Cross-sell', productType: 'HOME', version: 2, isActive: true,
    nodes: [
      { id: 'n-h1', type: 'Opening', title: 'Warm Introduction', body: 'Hi {name}, I\'m following up on your car insurance. I noticed you own a property — have you had a chance to review your home cover recently?', prompts: ['Reference existing relationship', 'Mention property data'] },
      { id: 'n-h2', type: 'Discovery', title: 'Property Assessment', body: 'Tell me a bit about your home so I can see what we can do:', prompts: ['Property type & size', 'Year built', 'Security features', 'Previous claims'] },
      { id: 'n-h3', type: 'Presentation', title: 'Bundle Offer', body: 'Here\'s the great news — as an existing car insurance customer, you qualify for our multi-policy discount.', prompts: ['Show bundle savings', 'Highlight convenience'] },
      { id: 'n-h4', type: 'Closing', title: 'Close', body: 'Shall I add this to your existing policy? It takes effect immediately.', prompts: ['Confirm coverage start', 'Payment setup'] },
    ],
  },
  {
    id: 's-3', name: 'Travel Insurance — Seasonal', productType: 'TRAVEL', version: 1, isActive: false,
    nodes: [
      { id: 'n-t1', type: 'Opening', title: 'Seasonal Hook', body: 'Hi {name}, with summer holidays coming up, I wanted to check if you\'ve got travel insurance sorted for your trip.', prompts: ['Reference upcoming trip if known', 'Seasonal urgency'] },
      { id: 'n-t2', type: 'Discovery', title: 'Trip Details', body: 'Where are you headed and when?', prompts: ['Destination', 'Duration', 'Number of travelers', 'Pre-existing conditions'] },
      { id: 'n-t3', type: 'Presentation', title: 'Coverage Options', body: 'We have single-trip and annual multi-trip options. Given you travel {frequency}, here\'s what I\'d recommend:', prompts: ['Compare single vs annual', 'Highlight medical cover', 'Cancellation protection'] },
      { id: 'n-t4', type: 'Closing', title: 'Quick Close', body: 'Travel insurance is instant — you\'re covered from the moment we confirm. Shall I set this up now?', prompts: ['Immediate activation', 'Certificate by email'] },
    ],
  },
];

/* ─── Agent dashboard stats ──────────────────────────────── */
export const AGENT_STATS = {
  callsMade: 12,
  callsTarget: 25,
  quotesGenerated: 6,
  policiesBound: 3,
  revenueClosed: 8450,
  crossSellConversions: 2,
  avgHandleTime: 8.5,
  teamAvgHandleTime: 9.2,
};

/* ─── Team stats for leaderboard ─────────────────────────── */
export const TEAM_STATS = [
  { agentId: 'u-1', name: 'Maria Ivanova', calls: 12, quotes: 6, policies: 3, revenue: 8450, conversion: 25, quality: 92, status: 'AVAILABLE' as AgentStatus },
  { agentId: 'u-2', name: 'Stefan Petrov', calls: 18, quotes: 8, policies: 5, revenue: 12300, conversion: 28, quality: 88, status: 'ON_CALL' as AgentStatus },
  { agentId: 'u-3', name: 'Anna Schmidt', calls: 10, quotes: 4, policies: 2, revenue: 5600, conversion: 20, quality: 95, status: 'AVAILABLE' as AgentStatus },
  { agentId: 'u-4', name: 'Pierre Dupont', calls: 15, quotes: 7, policies: 4, revenue: 9800, conversion: 27, quality: 85, status: 'BREAK' as AgentStatus },
  { agentId: 'u-5', name: 'Jan Kowalski', calls: 8, quotes: 3, policies: 1, revenue: 3200, conversion: 13, quality: 78, status: 'WRAP_UP' as AgentStatus },
  { agentId: 'u-6', name: 'Elena Marinova', calls: 20, quotes: 9, policies: 6, revenue: 15200, conversion: 30, quality: 91, status: 'ON_CALL' as AgentStatus },
  { agentId: 'u-7', name: 'Thomas Weber', calls: 14, quotes: 5, policies: 3, revenue: 7100, conversion: 21, quality: 89, status: 'AVAILABLE' as AgentStatus },
  { agentId: 'u-8', name: 'Sophie Martin', calls: 16, quotes: 7, policies: 4, revenue: 10500, conversion: 25, quality: 93, status: 'AVAILABLE' as AgentStatus },
];

/* ─── Management KPIs ────────────────────────────────────── */
export const MGMT_KPIS = {
  revenueMTD: 72150,
  revenueQTD: 198400,
  revenueYTD: 645200,
  conversionRate: 24.5,
  costPerAcquisition: 42,
  utilization: 78,
  totalLeads: 342,
  activeAgents: 38,
  avgQualityScore: 89,
};

/* ─── Funnel data ────────────────────────────────────────── */
export const FUNNEL_DATA = [
  { stage: 'Leads', count: 48, pct: 100 },
  { stage: 'Contacted', count: 38, pct: 79 },
  { stage: 'Qualified', count: 28, pct: 58 },
  { stage: 'Quoted', count: 18, pct: 38 },
  { stage: 'Won', count: 8, pct: 17 },
];

/* ─── Pricing calculator ─────────────────────────────────── */
export function calculatePricing(
  vehicleValue: number,
  driverAge: number,
  claimsCount: number,
  bundleProducts: number
): PricingTier[] {
  const basePremium = vehicleValue * 0.04;
  const ageFactor = driverAge < 25 ? 1.5 : driverAge > 65 ? 1.3 : 1.0;
  const claimsFactor = 1 + claimsCount * 0.15;
  const bundleDiscount = bundleProducts >= 2 ? 0.88 : 1.0;
  const base = basePremium * ageFactor * claimsFactor * bundleDiscount;

  return [
    {
      name: 'Basic',
      monthlyPremium: Math.round(base * 0.8 / 12),
      annualPremium: Math.round(base * 0.8),
      coverage: ['Third-party liability (€7.5M)', 'Legal expenses', 'Roadside assistance'],
      extras: [],
    },
    {
      name: 'Standard',
      monthlyPremium: Math.round(base / 12),
      annualPremium: Math.round(base),
      coverage: ['Third-party liability (€7.5M)', 'Legal expenses', 'Roadside assistance', 'Fire & theft', 'Windscreen cover', 'Personal belongings (€1,000)'],
      extras: ['Courtesy car (7 days)', 'No-claims protection'],
    },
    {
      name: 'Premium',
      monthlyPremium: Math.round(base * 1.3 / 12),
      annualPremium: Math.round(base * 1.3),
      coverage: ['Third-party liability (€10M)', 'Legal expenses', 'Roadside assistance', 'Fire & theft', 'Windscreen cover', 'Personal belongings (€2,500)', 'Comprehensive collision', 'New-for-old replacement (3 years)', 'Key cover'],
      extras: ['Courtesy car (21 days)', 'No-claims protection', 'Protected excess', 'European breakdown cover'],
    },
  ];
}
