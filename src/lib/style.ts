/**
 * style.ts — design tokens, calibrated from reference/STYLE.md (Phase 0).
 * Single source of truth for palette, stroke weights, radii, and fonts.
 * Canvas is 1920x1080; all stroke values are in that pixel space.
 */

export const COLORS = {
  // Backgrounds
  bgCream: '#F2ECDF',
  wallNight: '#6F5FB0',
  purpleDeep: '#4A3F7A',
  skyEnd: '#A9DBF7',

  // Accents / fills
  yellow: '#F6C344',
  yellowSoft: '#FBE08A',
  sky: '#BFE3F0',
  pink: '#F6A8C0',
  lavender: '#C8B2E5',
  blueDiagram: '#7FA0E6',
  greenLeaf: '#7FBF6B',
  greenTeal: '#7FBFB0',
  wood: '#C98A4B',
  woodDark: '#A4713C',
  skin: '#EBC9A0',
  skinShade: '#D9B184',

  // Neutrals
  white: '#FFFFFF',
  whiteShade: '#EDEBE0',
  outline: '#1A1A1A',

  // Costume-specific
  navy: '#2C3A63',
  red: '#D7513E',
  hoodie: '#E08A4B',
  shirtDark: '#333333',
  ledGreen: '#5FC66B',
  ledGrey: '#9AA0A6',
} as const;

export type ColorToken = keyof typeof COLORS;

/** Stroke weights at 1920x1080 (see STYLE.md §2). */
export const STROKE = {
  sil: 12, // character silhouette
  std: 8, // standard shapes
  fine: 6, // fine detail
} as const;

/** Minimum rounded-rect corner radius. */
export const RADIUS_MIN = 12;

export const SHADOW_OPACITY = 0.15;

/** Handwritten rounded font family (Baloo 2). Loaded via @remotion/google-fonts. */
export const FONT_FAMILY = 'Baloo 2';

/** Convenience default stroke props for a flat-vector shape. */
export const strokeProps = (w: number = STROKE.std) => ({
  stroke: COLORS.outline,
  strokeWidth: w,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
});

export const CANVAS = { width: 1920, height: 1080, fps: 30 } as const;
