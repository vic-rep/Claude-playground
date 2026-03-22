/**
 * Typography Tokens — Trusti Design System
 * Source: Figma node 78:9146 (Typography section)
 * Font: Source Sans 3
 * Breakpoint: 768px (below = mobile, above = desktop)
 *
 * ⚠️ Mobile/H6: Implement as weight 500 (Medium).
 *    Figma currently shows 600 (SemiBold) — pending correction.
 * ⚠️ OpenType features cv12–cv16: Excluded pending design team verification.
 */

export const fontFamily = {
  primary: "'Source Sans 3', system-ui, sans-serif",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

export interface TypeStyle {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}

export const desktop: Record<string, TypeStyle> = {
  h1: { fontSize: 48, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h2: { fontSize: 40, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h3: { fontSize: 36, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h4: { fontSize: 32, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h5: { fontSize: 24, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 },
  h6: { fontSize: 20, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 },
  textLarge: { fontSize: 18, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 },
  textDefault: { fontSize: 16, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 },
  textDefaultM: { fontSize: 16, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 },
  textSmall: { fontSize: 14, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 },
} as const;

export const mobile: Record<string, TypeStyle> = {
  h1: { fontSize: 32, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h2: { fontSize: 28, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 },
  h5: { fontSize: 18, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 },
  h6: { fontSize: 16, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }, // ⚠️ Design intent: 500
  textLarge: { fontSize: 16, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 },
  textDefault: { fontSize: 14, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 },
  textDefaultM: { fontSize: 14, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 },
  textSmall: { fontSize: 12, fontWeight: 400, lineHeight: 1.3, letterSpacing: 0 },
  caption: { fontSize: 10, fontWeight: 400, lineHeight: 1.3, letterSpacing: 0 },
} as const;

export const BREAKPOINT_DESKTOP = 768;

export const typography = {
  fontFamily,
  fontWeight,
  desktop,
  mobile,
  breakpoint: BREAKPOINT_DESKTOP,
} as const;
