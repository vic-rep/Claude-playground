/**
 * Spacing & Sizing Tokens — Trusti Design System
 * Source: Figma node 56:164 (Spacings & Sizing section)
 *
 * 2-point base scale with T-shirt size naming.
 * Every value is a multiple of 2px for clean rhythm and pixel-perfect alignment.
 */

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
  '7xl': 64,
  '8xl': 80,
  max: 128,
} as const;

export type SpacingToken = keyof typeof spacing;

/** Pixel value lookup — returns `Npx` string for CSS */
export function spacingPx(token: SpacingToken): string {
  return `${spacing[token]}px`;
}

/** Raw number lookup */
export function spacingValue(token: SpacingToken): number {
  return spacing[token];
}
