/**
 * Accessory.tsx — 3 ORIGINAL head accessories (brand options).
 * Deliberately NOT a headband + brain-coin (that's the reference brand).
 * Drawn in head-centered coords (head r = 135, top at y = -135).
 *   nightcap  — cozy folded sleeping cap + pom-pom   (cozy)
 *   halo      — floating mindful halo ring            (calm/zen)
 *   antenna   — twin bulb antennae                    (curious/sci-fi)
 */
import React from 'react';
import { COLORS, STROKE, strokeProps } from '../../../lib/style';

export type AccessoryVariant = 'nightcap' | 'halo' | 'antenna' | 'none';

const sil = strokeProps(STROKE.std);

export const Accessory: React.FC<{ variant: AccessoryVariant; frame?: number }> = ({ variant, frame = 0 }) => {
  switch (variant) {
    case 'nightcap':
      return (
        <g>
          {/* cap body: a soft folded cone drooping to the right */}
          <path
            d="M -92 -96
               C -70 -168 70 -176 104 -120
               C 150 -150 182 -120 150 -84
               C 132 -64 108 -74 100 -92
               C 60 -70 -40 -72 -92 -96 Z"
            fill={COLORS.lavender}
            {...sil}
          />
          {/* band */}
          <path d="M -96 -92 C -40 -66 70 -66 104 -92 L 100 -118 C 60 -92 -44 -92 -92 -118 Z" fill={COLORS.white} {...sil} />
          {/* pom-pom */}
          <circle cx={150} cy={-84} r={20} fill={COLORS.white} {...sil} />
          {/* second-tone fold shadow */}
          <path d="M 20 -120 C 55 -150 95 -140 100 -108 C 70 -118 45 -116 20 -120 Z" fill={COLORS.purpleDeep} opacity={0.18} />
        </g>
      );
    case 'halo': {
      const bob = Math.sin(frame / 18) * 4;
      return (
        <g transform={`translate(0 ${bob})`}>
          {/* glow */}
          <ellipse cx={0} cy={-168} rx={96} ry={30} fill={COLORS.yellow} opacity={0.25} />
          {/* ring */}
          <ellipse cx={0} cy={-168} rx={78} ry={22} fill="none" stroke={COLORS.yellow} strokeWidth={16} />
          <ellipse cx={0} cy={-168} rx={78} ry={22} fill="none" {...strokeProps(STROKE.fine)} />
          <ellipse cx={0} cy={-168} rx={62} ry={12} fill="none" {...strokeProps(4)} opacity={0.5} />
        </g>
      );
    }
    case 'antenna': {
      const sway = Math.sin(frame / 12) * 3;
      const Bulb: React.FC<{ x: number; tilt: number }> = ({ x, tilt }) => (
        <g>
          <path d={`M ${x} -120 Q ${x + tilt} -165 ${x + tilt * 1.4} -188`} fill="none" {...strokeProps(STROKE.std)} />
          <circle cx={x + tilt * 1.4} cy={-190} r={16} fill={COLORS.sky} {...strokeProps(STROKE.fine)} />
          <circle cx={x + tilt * 1.4 - 5} cy={-195} r={5} fill={COLORS.white} />
        </g>
      );
      return (
        <g>
          <Bulb x={-46} tilt={-14 + sway} />
          <Bulb x={46} tilt={14 - sway} />
        </g>
      );
    }
    default:
      return null;
  }
};
