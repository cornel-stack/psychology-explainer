/**
 * icons.tsx — symbolic icon props. Local origin (0,0). Token strokes only.
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';
import { pulse } from '../../lib/anim';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);

export const RedArrow: React.FC<{ dir?: 'up' | 'down' | 'left' | 'right' }> = ({ dir = 'up' }) => {
  const rot = { up: 0, right: 90, down: 180, left: 270 }[dir];
  return (
    <g transform={`rotate(${rot})`}>
      <path d="M -28 64 L -28 -10 L -58 -10 L 0 -74 L 58 -10 L 28 -10 L 28 64 Z" fill={COLORS.red} {...xl} />
      <path d="M -14 60 L -14 -10 L -30 -10 L 0 -46 Z" fill={COLORS.redDark} opacity={0.4} />
    </g>
  );
};

export const StopHand: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={90} fill={COLORS.red} {...xl} />
    <circle cx={0} cy={0} r={90} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
    <rect x={-36} y={-28} width={72} height={78} rx={22} fill={COLORS.white} {...sm} />
    {[-26, -9, 9, 26].map((x, i) => (
      <rect key={i} x={x - 8} y={-58} width={16} height={38} rx={8} fill={COLORS.white} {...sm} />
    ))}
  </g>
);

export const Heart: React.FC<{ beat?: boolean }> = ({ beat = true }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = beat ? pulse(f, fps, 1, 1.14, 0.7) : 1;
  return (
    <g transform={`scale(${s})`}>
      <path d="M 0 58 C -74 4 -64 -62 -22 -62 C -4 -62 0 -46 0 -38 C 0 -46 4 -62 22 -62 C 64 -62 74 4 0 58 Z" fill={COLORS.pink} {...xl} />
      <path d="M -36 -40 C -36 -20 -20 -4 -2 16 C -24 4 -52 -14 -52 -40 C -52 -52 -44 -56 -36 -56 Z" fill={COLORS.white} opacity={0.35} />
    </g>
  );
};

export const MoonStars: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M 24 -42 a 54 54 0 1 0 32 86 a 44 44 0 1 1 -32 -86 z" fill={COLORS.yellowSoft} {...lg} />
      <ellipse cx={8} cy={-8} rx={16} ry={20} fill={COLORS.yellowDark} opacity={0.3} />
      {[[-62, -52, 0], [-82, 32, 1.5], [62, 62, 3]].map(([x, y, p], i) => (
        <path key={i} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 10 + p))} d={`M ${x} ${y - 13} l 3 9 9 1 -7 6 2 9 -7 -5 -7 5 2 -9 -7 -6 9 -1 z`} fill={COLORS.white} {...sm} />
      ))}
    </g>
  );
};

/** Lightning cloud — soft thunder (spec SFX); bolt flashes with a white burst. */
export const LightningCloud: React.FC = () => {
  const f = useCurrentFrame();
  const strike = Math.sin(f / 6) > 0.6;
  return (
    <g>
      {strike && (
        <g opacity={0.7}>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <path key={i} d={`M ${Math.cos(a) * 40} ${30 + Math.sin(a) * 40} L ${Math.cos(a) * 150} ${30 + Math.sin(a) * 150}`} stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />;
          })}
        </g>
      )}
      <path d="M -96 12 Q -116 -32 -74 -42 Q -64 -82 -10 -68 Q 32 -98 74 -60 Q 124 -62 114 -14 Q 128 22 84 26 L -74 26 Q -110 26 -96 12 Z" fill={COLORS.lavender} {...xl} />
      {/* crisp darker crescent along the bottom edge only */}
      <path d="M -92 14 Q -40 36 84 24 Q 118 22 110 2 Q 60 22 -72 18 Q -96 16 -92 14 Z" fill={shade(COLORS.lavender, 0.2)} />
      <path d="M 12 22 L -18 74 L 10 74 L -14 126 L 44 60 L 16 60 L 38 22 Z" fill={COLORS.yellow} {...lg} opacity={strike ? 1 : 0.9} />
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

/**
 * 4-point sparkles — ALWAYS full-opacity gold fill + black outline token.
 * Twinkle is a SCALE pulse (0.85–1.15), never an opacity fade (S1).
 */
export const Sparkles: React.FC<{ n?: number }> = ({ n = 4 }) => {
  const f = useCurrentFrame();
  const pts = [
    [-90, -64, 24],
    [92, -44, 18],
    [64, 70, 22],
    [-62, 56, 16],
    [0, -92, 14],
    [20, 96, 12],
  ].slice(0, n);
  return (
    <g fill={COLORS.yellow} {...sm}>
      {pts.map(([x, y, r], i) => {
        const s = 1 + 0.15 * Math.sin(f / 7 + i * 1.7);
        const rr = r * s;
        return (
          <path key={i} d={`M ${x} ${y - rr} L ${x + rr * 0.3} ${y - rr * 0.3} L ${x + rr} ${y} L ${x + rr * 0.3} ${y + rr * 0.3} L ${x} ${y + rr} L ${x - rr * 0.3} ${y + rr * 0.3} L ${x - rr} ${y} L ${x - rr * 0.3} ${y - rr * 0.3} Z`} />
        );
      })}
    </g>
  );
};
