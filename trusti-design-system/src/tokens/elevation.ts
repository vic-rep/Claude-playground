/**
 * Elevation Tokens — Trusti Design System
 * Source: Figma nodes 60:339–60:348 (Elevation section)
 *
 * 5 levels of elevation, each using 5 layered drop-shadows for subtle depth.
 * Pattern: heavier y-offset and blur at higher levels.
 * All shadows use rgba(0,0,0) with very low opacity (0.01–0.05).
 */

export const elevation = {
  level1: [
    '0px 1px 1px 0px rgba(0,0,0,0.05)',
    '0px 3px 3px 0px rgba(0,0,0,0.04)',
    '0px 6px 4px 0px rgba(0,0,0,0.03)',
    '0px 11px 4px 0px rgba(0,0,0,0.01)',
    '0px 17px 5px 0px rgba(0,0,0,0)',
  ].join(', '),

  level2: [
    '0px 2px 4px 0px rgba(0,0,0,0.05)',
    '0px 7px 7px 0px rgba(0,0,0,0.04)',
    '0px 15px 9px 0px rgba(0,0,0,0.03)',
    '0px 27px 11px 0px rgba(0,0,0,0.01)',
    '0px 42px 12px 0px rgba(0,0,0,0)',
  ].join(', '),

  level3: [
    '0px 3px 7px 0px rgba(0,0,0,0.05)',
    '0px 13px 13px 0px rgba(0,0,0,0.04)',
    '0px 30px 18px 0px rgba(0,0,0,0.03)',
    '0px 53px 21px 0px rgba(0,0,0,0.01)',
    '0px 83px 23px 0px rgba(0,0,0,0)',
  ].join(', '),

  level4: [
    '0px 5px 11px 0px rgba(0,0,0,0.05)',
    '0px 20px 20px 0px rgba(0,0,0,0.04)',
    '0px 45px 27px 0px rgba(0,0,0,0.03)',
    '0px 80px 32px 0px rgba(0,0,0,0.01)',
    '0px 125px 35px 0px rgba(0,0,0,0)',
  ].join(', '),

  level5: [
    '0px 7px 15px 0px rgba(0,0,0,0.05)',
    '0px 27px 27px 0px rgba(0,0,0,0.04)',
    '0px 60px 36px 0px rgba(0,0,0,0.03)',
    '0px 107px 43px 0px rgba(0,0,0,0.01)',
    '0px 167px 47px 0px rgba(0,0,0,0)',
  ].join(', '),

  none: 'none',
} as const;

export type ElevationLevel = keyof typeof elevation;
