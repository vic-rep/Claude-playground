/**
 * Color Tokens — Trusti Design System
 * Source: Figma node 78:9147 (Colors section)
 *
 * Semantic color roles:
 * - Brand: Signature identity color
 * - Accent (Orange): CTAs, active states, highlights
 * - Primary (Neutral): Text, content, readability
 * - Surface: Background layers and depth
 * - Success (Green): Positive states, confirmations
 * - Warning (Amber): Cautionary messages
 * - Destructive (Red): Errors, failures, destructive actions
 */

// ── Brand ──────────────────────────────────────────────
export const brand = '#FFA500' as const;

// ── Accent (Orange) ────────────────────────────────────
export const accent = {
  900: '#602901',
  800: '#923E02',
  700: '#C55302',
  600: '#F76803', // Primary accent
  500: '#FC7D21',
  400: '#FD9A54',
  300: '#FEB886',
  200: '#FED5B8',
  100: '#FFF3EB',
} as const;

// ── Primary (Neutral) ─────────────────────────────────
export const primary = {
  900: '#191919', // Primary text
  800: '#333333',
  700: '#4D4D4D',
  600: '#666666',
  500: '#808080',
  400: '#999999',
  300: '#CCCCCC',
  200: '#E6E6E6',
  100: '#F0F0F0',
} as const;

// ── Surface ────────────────────────────────────────────
export const surface = {
  base: '#F3F2F0',
  adjacent: '#FFFFFF',
  adjacent2: '#E1E5EB',
} as const;

// ── Constants ──────────────────────────────────────────
export const constant = {
  white: '#FFFFFF',
  black: '#191919',
} as const;

// ── Success (Green) ────────────────────────────────────
export const success = {
  800: '#006632',
  700: '#009147', // Primary success
  600: '#4DB27E',
  400: '#80C8A3',
  200: '#B3DEC8',
  100: '#E6F4ED', // Primary success background
} as const;

// ── Warning (Amber) ───────────────────────────────────
export const warning = {
  600: '#B86700',
  500: '#E98300', // Primary warning
  400: '#FF9D1F',
  300: '#FFB352',
  200: '#FFC985',
  100: '#FFE0B8',
} as const;

// ── Destructive (Red) ─────────────────────────────────
export const destructive = {
  600: '#CC001B',
  550: '#FF0022', // Primary destructive
  500: '#FF0022',
  400: '#FF4D64',
  300: '#FF8091',
  200: '#FFCCD3',
  100: '#FFE6E9',
} as const;

// ── Semantic aliases ──────────────────────────────────
export const semantic = {
  textPrimary: primary[900],
  textSecondary: primary[600],
  textTertiary: primary[500],
  textDisabled: primary[400],
  textInverse: constant.white,

  bgPage: surface.base,
  bgCard: surface.adjacent,
  bgCardNested: surface.adjacent2,

  borderDefault: primary[200],
  borderStrong: primary[300],

  accentPrimary: accent[600],
  accentHover: accent[700],
  accentActive: accent[800],
  accentSubtle: accent[100],

  successPrimary: success[700],
  successSubtle: success[100],
  warningPrimary: warning[500],
  warningSubtle: warning[100],
  destructivePrimary: destructive[550],
  destructiveSubtle: destructive[100],
} as const;

export const colors = {
  brand,
  accent,
  primary,
  surface,
  constant,
  success,
  warning,
  destructive,
  semantic,
} as const;
