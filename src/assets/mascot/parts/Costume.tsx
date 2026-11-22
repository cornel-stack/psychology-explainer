/**
 * Costume.tsx — torso + legs + feet + costume decoration (costume-dependent).
 * Original brand badge (placeholder monogram "MM") — NOT the reference APEX badge.
 * Head-centered coords; torso top ~y120 (behind head), feet ~y330.
 * Arms are drawn separately (pose-dependent) in Arms.tsx.
 */
import React from 'react';
import { COLORS, STROKE, strokeProps } from '../../../lib/style';

export type Costume = 'pajamas' | 'labcoat' | 'suit' | 'hoodie';

const sil = strokeProps(STROKE.sil);
const std = strokeProps(STROKE.std);
const fine = strokeProps(STROKE.fine);

const TORSO =
  'M -95 136 Q -101 122 -86 118 L 86 118 Q 101 122 95 136 L 80 270 Q 78 288 54 288 L -54 288 Q -78 288 -80 270 Z';

/** Original channel badge — rounded hexagon, gold, monogram. */
export const BrandBadge: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M 0 -22 L 19 -11 L 19 11 L 0 22 L -19 11 L -19 -11 Z"
      fill={COLORS.yellow}
      {...fine}
    />
    <path d="M 0 -14 L 12 -7 L 12 7 L 0 14 L -12 7 L -12 -7 Z" fill="none" {...strokeProps(2.5)} opacity={0.5} />
    <text x={0} y={7} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={18} fill={COLORS.outline}>
      MM
    </text>
  </g>
);

const Legs: React.FC<{ kind: 'socks' | 'shoes' | 'sneakers'; fill: string }> = ({ kind, fill }) => (
  <g>
    {/* leg stubs */}
    <rect x={-46} y={276} width={28} height={46} rx={14} fill={fill} {...std} />
    <rect x={18} y={276} width={28} height={46} rx={14} fill={fill} {...std} />
    {/* feet */}
    {kind === 'socks' && (
      <>
        <ellipse cx={-32} cy={328} rx={30} ry={17} fill={COLORS.white} {...std} />
        <ellipse cx={32} cy={328} rx={30} ry={17} fill={COLORS.white} {...std} />
      </>
    )}
    {kind === 'shoes' && (
      <>
        <path d="M -62 322 Q -62 308 -40 308 L -14 308 Q -6 308 -6 320 Q -6 334 -20 334 L -52 334 Q -62 334 -62 322 Z" fill={COLORS.shirtDark} {...std} />
        <path d="M 6 322 Q 6 308 28 308 L 54 308 Q 62 308 62 320 Q 62 334 48 334 L 16 334 Q 6 334 6 322 Z" fill={COLORS.shirtDark} {...std} />
      </>
    )}
    {kind === 'sneakers' && (
      <>
        <path d="M -62 322 Q -62 308 -40 308 L -14 308 Q -6 308 -6 320 Q -6 334 -20 334 L -52 334 Q -62 334 -62 322 Z" fill={COLORS.white} {...std} />
        <path d="M 6 322 Q 6 308 28 308 L 54 308 Q 62 308 62 320 Q 62 334 48 334 L 16 334 Q 6 334 6 322 Z" fill={COLORS.white} {...std} />
        <path d="M -60 326 L -8 326 M 8 326 L 60 326" {...strokeProps(4)} />
      </>
    )}
  </g>
);

const starMoon = (
  <g fill={COLORS.purpleDeep} opacity={0.75}>
    <path d="M -50 170 l 4 10 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 z" transform="scale(0.8)" />
    <path d="M 40 150 a 11 11 0 1 0 6 18 a 9 9 0 1 1 -6 -18 z" />
    <path d="M 10 230 l 3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" />
    <path d="M -30 240 a 8 8 0 1 0 5 13 a 7 7 0 1 1 -5 -13 z" />
    <path d="M 55 210 l 3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" />
  </g>
);

export const Costume: React.FC<{ costume: Costume; showLegs?: boolean }> = ({ costume, showLegs = true }) => {
  const legs = (kind: 'socks' | 'shoes' | 'sneakers', fill: string) => (showLegs ? <Legs kind={kind} fill={fill} /> : null);
  switch (costume) {
    case 'pajamas':
      return (
        <g>
          {legs('socks', COLORS.yellow)}
          <path d={TORSO} fill={COLORS.yellow} {...sil} />
          {starMoon}
          {/* placket + buttons + collar */}
          <path d="M 0 120 L 0 285" {...fine} />
          <circle cx={0} cy={170} r={6} fill={COLORS.purpleDeep} />
          <circle cx={0} cy={210} r={6} fill={COLORS.purpleDeep} />
          <path d="M -26 120 L 0 146 L 26 120" fill="none" {...std} />
        </g>
      );
    case 'labcoat':
      return (
        <g>
          {legs('shoes', COLORS.shirtDark)}
          {/* dark shirt behind coat */}
          <path d="M -34 120 L 34 120 L 24 285 L -24 285 Z" fill={COLORS.shirtDark} {...std} />
          {/* coat */}
          <path d={TORSO} fill={COLORS.white} {...sil} />
          {/* coat opening V (reveals shirt) */}
          <path d="M -30 118 L 0 210 L 30 118" fill={COLORS.shirtDark} {...std} />
          {/* lapels */}
          <path d="M -30 118 L -14 175 M 30 118 L 14 175" fill="none" {...fine} />
          {/* pockets */}
          <rect x={-70} y={210} width={40} height={34} rx={8} fill="none" {...fine} />
          <rect x={30} y={210} width={40} height={34} rx={8} fill="none" {...fine} />
          <BrandBadge x={40} y={168} />
        </g>
      );
    case 'suit':
      return (
        <g>
          {legs('shoes', COLORS.shirtDark)}
          <path d={TORSO} fill={COLORS.navy} {...sil} />
          {/* white collar */}
          <path d="M -34 118 L 0 150 L 34 118 L 20 112 L 0 128 L -20 112 Z" fill={COLORS.white} {...std} />
          {/* tie */}
          <path d="M 0 132 L -12 150 L -6 240 L 0 252 L 6 240 L 12 150 Z" fill={COLORS.red} {...fine} />
          {/* lapels */}
          <path d="M -30 120 L -8 200 M 30 120 L 8 200" fill="none" {...fine} />
          <BrandBadge x={-44} y={176} scale={0.8} />
        </g>
      );
    case 'hoodie':
      return (
        <g>
          {legs('sneakers', COLORS.navy)}
          {/* hood behind head */}
          <path d="M -120 40 Q 0 -70 120 40 Q 70 90 0 90 Q -70 90 -120 40 Z" fill={COLORS.hoodie} {...sil} />
          <path d={TORSO} fill={COLORS.hoodie} {...sil} />
          {/* hood opening collar */}
          <path d="M -70 120 Q 0 150 70 120 Q 40 96 0 96 Q -40 96 -70 120 Z" fill={COLORS.woodDark} opacity={0.3} />
          {/* drawstrings */}
          <path d="M -14 128 L -16 190 M 14 128 L 16 190" fill="none" {...fine} />
          <circle cx={-16} cy={194} r={6} fill={COLORS.white} {...strokeProps(3)} />
          <circle cx={16} cy={194} r={6} fill={COLORS.white} {...strokeProps(3)} />
          {/* kangaroo pocket */}
          <path d="M -54 226 Q 0 246 54 226 L 48 270 L -48 270 Z" fill="none" {...fine} />
        </g>
      );
    default:
      return null;
  }
};
