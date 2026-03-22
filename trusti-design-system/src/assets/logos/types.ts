/* Figma: ❖ Logos — node 4449:14615 */

export type LogoCategory = 'company' | 'delivery' | 'payment' | 'car' | 'partnership';
export type LogoVariant = 'color' | 'grayscale';

export interface LogoEntry {
  /** Display name for the logo */
  name: string;
  /** Category grouping */
  category: LogoCategory;
  /** SVG markup for color variant */
  colorSvg: string;
  /** SVG markup for grayscale variant */
  grayscaleSvg: string;
  /** Default aspect ratio (width / height) */
  aspectRatio?: number;
}
