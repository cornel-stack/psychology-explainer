/**
 * style.ts — design tokens, calibrated from reference/STYLE.md + Phase 2.5 pass.
 * Single source of truth for palette, stroke tokens, radii, and fonts.
 * Canvas is 1920x1080; all stroke values are in that pixel space.
 */

export const COLORS = {
  // Backgrounds (A6: +~10% saturation on purple/yellow)
  bgCream: '#F3ECDC',
  bgCreamDark: '#E9E0CA', // low-contrast burst tone on cream
  wallNight: '#6B52C2',
  wallNightDark: '#5A43A8',
  purpleDeep: '#44357A',
  skyEnd: '#A7D8F7',

  // Accents / fills
  yellow: '#F9C32E',
  yellowDark: '#E0A91A',
  yellowSoft: '#FBE08A',
  sky: '#AEDCEF',
  skyDark: '#8FC7E2',
  pink: '#F79BBA',
  pinkDark: '#E97EA3',
  lavender: '#C6A8EC',
  lavenderDark: '#A985D8',
  blueDiagram: '#6E92EA',
  blueDiagramDark: '#5577D6',
  greenLeaf: '#74C25E',
  greenDark: '#5BA847',
  greenTeal: '#74BFB0',
  wood: '#C98A4B',
  woodDark: '#A4713C',
  skin: '#EDC79C',
  skinShade: '#DCB184',

  // Neutrals
  white: '#FFFFFF',
  whiteShade: '#E7E4D7',
  outline: '#1A1A1A',

  // Costume-specific
  navy: '#2C3A63',
  navyDark: '#223052',
  red: '#DD4E3A',
  redDark: '#C33D2B',
  hoodie: '#E58A42',
  hoodieDark: '#C9732F',
  shirtDark: '#333333',
  shirtDarker: '#262626',
  ledGreen: '#52C45E',
  ledGrey: '#9AA0A6',
} as const;

export type ColorToken = keyof typeof COLORS;

/**
 * A3 — ONE stroke system. Exactly three widths, all #1A1A1A, round caps/joins.
 * outlineXL: mascot silhouette. outline: props/furniture. outlineSm: tiny detail.
 * The stroke lint (scripts/lint-strokes.mjs) forbids any other width/color.
 */
export const STROKE = {
  xl: 14,
  lg: 10,
  sm: 7,
} as const;
/** Allowed token widths, consumed by the lint script. */
export const STROKE_ALLOWED = [STROKE.xl, STROKE.lg, STROKE.sm] as const;

/** Minimum rounded-rect corner radius. */
export const RADIUS_MIN = 12;

export const SHADOW_OPACITY = 0.15;

/** Handwritten rounded font family (Baloo 2). */
export const FONT_FAMILY = 'Baloo 2';

/** Convenience default stroke props for a flat-vector shape (always token width). */
export const strokeProps = (w: number = STROKE.lg) => ({
  stroke: COLORS.outline,
  strokeWidth: w,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
});

export const CANVAS = { width: 1920, height: 1080, fps: 30 } as const;

/** A6 — per-chapter accent color, rotated so chapters feel distinct. */
export const CHAPTER_ACCENTS = [
  COLORS.yellow,
  COLORS.pink,
  COLORS.sky,
  COLORS.greenLeaf,
  COLORS.lavender,
] as const;
export const chapterAccent = (i: number) => CHAPTER_ACCENTS[i % CHAPTER_ACCENTS.length];

/** Darker flat second-tone for a fill (A6 two-tone shading). f in 0..1. */
export const shade = (hex: string, f = 0.16): string => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const d = (c: number) => Math.max(0, Math.round(c * (1 - f)));
  return `#${[d(r), d(g), d(b)].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};
