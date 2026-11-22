/**
 * Costume.tsx — torso + connected legs + costume decoration. Legs use the same
 * silhouette+inset-fill technique as arms so they are continuous with the body
 * (no floating capsules). Every costume carries ONE darker flat inner-shade
 * (A6 two-tone). Original brand badge (placeholder "MM").
 */
import React from 'react';
import { COLORS, STROKE, strokeProps, shade } from '../../../lib/style';

export type Costume = 'pajamas' | 'labcoat' | 'suit' | 'hoodie';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const PEEK = STROKE.xl / 2;
const LEG_W = 36;

const TORSO =
  'M -98 138 Q -104 120 -88 116 L 88 116 Q 104 120 98 138 L 82 272 Q 80 292 54 292 L -54 292 Q -80 292 -82 272 Z';

/** Original channel badge — rounded hexagon, gold, monogram. */
export const BrandBadge: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M 0 -24 L 21 -12 L 21 12 L 0 24 L -21 12 L -21 -12 Z" fill={COLORS.yellow} {...sm} />
    <path d="M 0 -15 L 13 -7 L 13 7 L 0 15 L -13 7 L -13 -7 Z" fill={COLORS.yellowDark} opacity={0.55} />
    <text x={0} y={7} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={19} fill={COLORS.outline}>
      MM
    </text>
  </g>
);

/** One continuous leg + foot (silhouette+inset). */
const Leg: React.FC<{ x: number; legFill: string; shoe: string; dir: 1 | -1 }> = ({ x, legFill, shoe, dir }) => {
  const d = `M ${x} 246 L ${x} 316`;
  const fx = x + dir * 14;
  return (
    <g>
      {/* silhouette */}
      <path d={d} fill="none" stroke={COLORS.outline} strokeWidth={LEG_W + 2 * PEEK} strokeLinecap="round" />
      <ellipse cx={fx} cy={330} rx={36} ry={22} fill={COLORS.outline} />
      {/* fill */}
      <path d={d} fill="none" stroke={legFill} strokeWidth={LEG_W} strokeLinecap="round" />
      <ellipse cx={fx} cy={330} rx={36 - PEEK} ry={22 - PEEK} fill={shoe} />
      {shoe !== legFill && <path d={`M ${fx - 28} 332 L ${fx + 28} 332`} stroke={shade(shoe, 0.25)} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    </g>
  );
};

const Legs: React.FC<{ legFill: string; shoe: string }> = ({ legFill, shoe }) => (
  <g>
    <Leg x={-34} legFill={legFill} shoe={shoe} dir={-1} />
    <Leg x={34} legFill={legFill} shoe={shoe} dir={1} />
  </g>
);

const starMoon = (
  <g fill={COLORS.yellowDark} opacity={0.85}>
    <path d="M -52 168 l 4 10 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 z" transform="scale(0.85)" />
    <path d="M 44 150 a 11 11 0 1 0 6 18 a 9 9 0 1 1 -6 -18 z" />
    <path d="M 12 236 l 3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" />
    <path d="M -30 246 a 8 8 0 1 0 5 13 a 7 7 0 1 1 -5 -13 z" />
  </g>
);

export const Costume: React.FC<{ costume: Costume; showLegs?: boolean }> = ({ costume, showLegs = true }) => {
  switch (costume) {
    case 'pajamas':
      return (
        <g>
          {showLegs && <Legs legFill={COLORS.yellow} shoe={COLORS.white} />}
          <path d={TORSO} fill={COLORS.yellow} {...xl} />
          {/* inner-shade (two-tone) */}
          <path d="M -70 250 Q 0 276 70 250 L 66 288 Q 0 300 -66 288 Z" fill={COLORS.yellowDark} opacity={0.35} />
          {starMoon}
          {/* placket + buttons (persist across poses) */}
          <path d="M 0 118 L 0 288" {...sm} />
          <circle cx={0} cy={170} r={7} fill={COLORS.yellowDark} {...strokeProps(STROKE.sm)} />
          <circle cx={0} cy={214} r={7} fill={COLORS.yellowDark} {...strokeProps(STROKE.sm)} />
          <path d="M -28 118 L 0 148 L 28 118" fill="none" {...lg} />
        </g>
      );
    case 'labcoat':
      return (
        <g>
          {showLegs && <Legs legFill={COLORS.shirtDark} shoe={COLORS.shirtDarker} />}
          {/* dark shirt behind coat */}
          <path d="M -36 118 L 36 118 L 26 288 L -26 288 Z" fill={COLORS.shirtDark} {...lg} />
          {/* coat */}
          <path d={TORSO} fill={COLORS.white} {...xl} />
          {/* coat opening V reveals shirt */}
          <path d="M -32 116 L 0 214 L 32 116" fill={COLORS.shirtDark} {...lg} />
          {/* inner-shade down coat left */}
          <path d="M -82 200 Q -74 260 -52 288 L -30 288 Q -56 250 -60 200 Z" fill={COLORS.whiteShade} opacity={0.7} />
          {/* lapels */}
          <path d="M -32 116 L -14 178 M 32 116 L 14 178" fill="none" {...sm} />
          {/* pockets with shadow */}
          <rect x={-74} y={212} width={44} height={38} rx={10} fill={COLORS.whiteShade} {...sm} />
          <rect x={30} y={212} width={44} height={38} rx={10} fill={COLORS.whiteShade} {...sm} />
          <BrandBadge x={44} y={170} />
        </g>
      );
    case 'suit':
      return (
        <g>
          {showLegs && <Legs legFill={COLORS.shirtDark} shoe={COLORS.shirtDarker} />}
          <path d={TORSO} fill={COLORS.navy} {...xl} />
          <path d="M -70 250 Q 0 276 70 250 L 66 288 Q 0 300 -66 288 Z" fill={COLORS.navyDark} opacity={0.5} />
          {/* white collar */}
          <path d="M -36 116 L 0 152 L 36 116 L 20 110 L 0 128 L -20 110 Z" fill={COLORS.white} {...lg} />
          {/* tie */}
          <path d="M 0 132 L -13 152 L -6 244 L 0 256 L 6 244 L 13 152 Z" fill={COLORS.red} {...sm} />
          <path d="M -30 120 L -8 202 M 30 120 L 8 202" fill="none" {...sm} />
          <BrandBadge x={-46} y={178} scale={0.8} />
        </g>
      );
    case 'hoodie':
      return (
        <g>
          {showLegs && <Legs legFill={COLORS.navy} shoe={COLORS.white} />}
          {/* hood behind head */}
          <path d="M -122 44 Q 0 -72 122 44 Q 70 92 0 92 Q -70 92 -122 44 Z" fill={COLORS.hoodie} {...xl} />
          <path d={TORSO} fill={COLORS.hoodie} {...xl} />
          {/* inner-shade */}
          <path d="M -70 250 Q 0 276 70 250 L 66 288 Q 0 300 -66 288 Z" fill={COLORS.hoodieDark} opacity={0.45} />
          {/* hood opening */}
          <path d="M -72 118 Q 0 150 72 118 Q 40 94 0 94 Q -40 94 -72 118 Z" fill={COLORS.hoodieDark} opacity={0.4} />
          {/* drawstrings */}
          <path d="M -14 128 L -16 192 M 14 128 L 16 192" fill="none" {...sm} />
          <circle cx={-16} cy={196} r={7} fill={COLORS.white} {...strokeProps(STROKE.sm)} />
          <circle cx={16} cy={196} r={7} fill={COLORS.white} {...strokeProps(STROKE.sm)} />
          {/* kangaroo pocket */}
          <path d="M -56 228 Q 0 248 56 228 L 50 272 L -50 272 Z" fill="none" {...sm} />
        </g>
      );
    default:
      return null;
  }
};
