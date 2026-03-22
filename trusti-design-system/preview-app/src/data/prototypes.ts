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
    id: 'insurance-quote',
    title: 'Insurance Quote Flow',
    description:
      'A multi-step insurance quote wizard demonstrating form inputs, validation, navigation, and the cart template.',
    tags: ['Form', 'Wizard', 'Cart'],
    status: 'planned',
  },
  {
    id: 'vehicle-dashboard',
    title: 'Vehicle Dashboard',
    description:
      'Dashboard showing vehicle details cards, offer lists, and data visualizations using the design system.',
    tags: ['Dashboard', 'Cards', 'Data'],
    status: 'planned',
  },
];
