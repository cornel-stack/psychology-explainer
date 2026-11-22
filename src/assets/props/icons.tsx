/**
 * icons.tsx — symbolic icon props. Local origin (0,0).
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, STROKE, strokeProps } from '../../lib/style';
import { pulse } from '../../lib/anim';

const sil = strokeProps(STROKE.sil);
const std = strokeProps(STROKE.std);
const fine = strokeProps(STROKE.fine);

export const RedArrow: React.FC<{ dir?: 'up' | 'down' | 'left' | 'right' }> = ({ dir = 'up' }) => {
  const rot = { up: 0, right: 90, down: 180, left: 270 }[dir];
  return (
    <g transform={`rotate(${rot})`}>
      <path d="M -26 60 L -26 -10 L -54 -10 L 0 -70 L 54 -10 L 26 -10 L 26 60 Z" fill={COLORS.red} {...sil} />
    </g>
  );
};

export const StopHand: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={86} fill={COLORS.red} {...sil} />
    <circle cx={0} cy={0} r={86} fill="none" stroke={COLORS.white} strokeWidth={8} />
    {/* palm */}
    <rect x={-34} y={-28} width={68} height={74} rx={20} fill={COLORS.white} {...fine} />
    {[-24, -8, 8, 24].map((x, i) => (
      <rect key={i} x={x - 7} y={-54} width={14} height={34} rx={7} fill={COLORS.white} {...fine} />
    ))}
  </g>
);

export const Heart: React.FC<{ beat?: boolean }> = ({ beat = true }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = beat ? pulse(f, fps, 1, 1.14, 0.7) : 1;
  return (
    <g transform={`scale(${s})`}>
      <path d="M 0 54 C -70 2 -60 -58 -20 -58 C -4 -58 0 -44 0 -36 C 0 -44 4 -58 20 -58 C 60 -58 70 2 0 54 Z" fill={COLORS.pink} {...sil} />
    </g>
  );
};

export const MoonStars: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M 24 -40 a 52 52 0 1 0 30 84 a 42 42 0 1 1 -30 -84 z" fill={COLORS.yellowSoft} {...std} />
      {[[-60, -50, 0], [-80, 30, 1.5], [60, 60, 3]].map(([x, y, p], i) => (
        <path key={i} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 10 + p))} d={`M ${x} ${y - 12} l 3 9 9 1 -7 6 2 9 -7 -5 -7 5 2 -9 -7 -6 9 -1 z`} fill={COLORS.white} {...strokeProps(2.5)} />
      ))}
    </g>
  );
};

/** Lightning cloud — soft thunder (spec SFX); the bolt flickers. */
export const LightningCloud: React.FC = () => {
  const f = useCurrentFrame();
  const flash = Math.sin(f / 6) > 0.6 ? 1 : 0.55;
  return (
    <g>
      <path d="M -90 10 Q -110 -30 -70 -40 Q -60 -78 -10 -64 Q 30 -92 70 -56 Q 118 -58 108 -14 Q 120 20 80 24 L -70 24 Q -104 24 -90 10 Z" fill={COLORS.lavender} {...sil} />
      <path d="M 10 20 L -16 70 L 8 70 L -12 118 L 40 56 L 14 56 L 34 20 Z" fill={COLORS.yellow} opacity={flash} {...std} />
    </g>
  );
};

export const Footprints: React.FC = () => (
  <g fill={COLORS.purpleDeep} opacity={0.6}>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${i * 80 - 80} ${i % 2 ? 20 : -20})`}>
        <ellipse cx={0} cy={0} rx={18} ry={26} />
        <circle cx={-10} cy={-28} r={6} />
        <circle cx={2} cy={-32} r={6} />
        <circle cx={12} cy={-28} r={6} />
      </g>
    ))}
  </g>
);

export const Sparkles: React.FC<{ n?: number }> = ({ n = 4 }) => {
  const f = useCurrentFrame();
  const pts = [[-80, -60], [80, -40], [60, 60], [-60, 50]].slice(0, n);
  return (
    <g fill={COLORS.yellow} {...strokeProps(3)}>
      {pts.map(([x, y], i) => (
        <path key={i} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 7 + i))} d={`M ${x} ${y - 20} L ${x + 6} ${y - 6} L ${x + 20} ${y} L ${x + 6} ${y + 6} L ${x} ${y + 20} L ${x - 6} ${y + 6} L ${x - 20} ${y} L ${x - 6} ${y - 6} Z`} />
      ))}
    </g>
  );
};
