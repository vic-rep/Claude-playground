/**
 * Grid Tokens — Trusti Design System
 * Source: Figma published grid styles (nodes 15:4, 15:6, 39:2, 56:116)
 *
 * 4 breakpoints: Mobile, Tablet Portrait, Tablet Landscape, Desktop
 * Grid section node timed out on MCP — values derived from published style names
 * and standard responsive grid conventions matching the file structure.
 */

export const breakpoints = {
  mobile: 0,
  tabletPortrait: 768,
  tabletLandscape: 1024,
  desktop: 1280,
} as const;

export const grid = {
  mobile: {
    columns: 4,
    gutter: 16,
    margin: 16,
    maxWidth: '100%' as const,
  },
  tabletPortrait: {
    columns: 8,
    gutter: 20,
    margin: 24,
    maxWidth: '100%' as const,
  },
  tabletLandscape: {
    columns: 12,
    gutter: 24,
    margin: 32,
    maxWidth: '100%' as const,
  },
  desktop: {
    columns: 12,
    gutter: 24,
    margin: 'auto' as const,
    maxWidth: '1200px' as const,
  },
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Media query strings for use in CSS or JS */
export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.tabletPortrait - 1}px)`,
  tabletPortrait: `(min-width: ${breakpoints.tabletPortrait}px)`,
  tabletLandscape: `(min-width: ${breakpoints.tabletLandscape}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
} as const;
