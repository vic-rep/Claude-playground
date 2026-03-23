export interface Prototype {
  id: string;
  title: string;
  description: string;
  tags: string[];
  route?: string;
  externalUrl?: string;
  status: 'live' | 'wip' | 'planned';
}

/**
 * Prototype registry.
 * Add new prototype apps here. Each entry appears as a card on the Prototypes page.
 *
 * To add a new prototype:
 * 1. Add an entry to this array
 * 2. Optionally create a route in App.tsx if it's an in-app prototype
 * 3. Or link to an external URL
 */
export const prototypes: Prototype[] = [
  {
    id: 'sms-campaigns',
    title: 'SMS Campaign Manager',
    description:
      'Marketing tool for creating and sending SMS campaigns. Includes campaign editor with Bulgarian telecom-compliant character limits (GSM 7-bit / UCS-2), live phone preview, audience segment management, scheduling, and delivery statistics.',
    tags: ['Marketing', 'SMS', 'Dashboard', 'Forms'],
    route: '/prototypes/sms-campaigns',
    status: 'live',
  },
  {
    id: 'insure-connect',
    title: 'InsureConnect Call Center',
    description:
      'AI-powered call center platform for insurance sales agents. Features lead management with SLA timers, dynamic pricing engine, AI sales hints, call workspace with real-time controls, team dashboards with leaderboards, and script management. RBAC with 4 roles across pan-European markets.',
    tags: ['Call Center', 'AI', 'Dashboard', 'CRM', 'Insurance'],
    route: '/prototypes/insure-connect',
    status: 'live',
  },
  {
    id: 'property-insurance',
    title: 'Property Insurance Landing',
    description:
      'Marketing landing page for property insurance products. Features hero with address search, coverage breakdown, 3-step onboarding flow, phone app preview mockups, FAQ accordion, and CTA sections. Fully responsive with Bulgarian copy.',
    tags: ['Landing Page', 'Insurance', 'Marketing', 'Property'],
    route: '/prototypes/property-insurance',
    status: 'live',
  },
];
