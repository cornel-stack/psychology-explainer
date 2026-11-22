/**
 * bubbles.tsx — speech/thought bubbles, gibberish, and small FX props.
 * Local origin (0,0). Bubbles pop elastically (handled by Place appearAt).
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, STROKE, strokeProps } from '../../lib/style';
import { pulse } from '../../lib/anim';

const sil = strokeProps(STROKE.xl);
const std = strokeProps(STROKE.lg);
const fine = strokeProps(STROKE.sm);

/** Speech bubble with a tail pointing to the speaker (tail dir: left|right). */
export const SpeechBubble: React.FC<{ w?: number; h?: number; tail?: 'left' | 'right'; children?: React.ReactNode }> = ({ w = 320, h = 180, tail = 'left', children }) => {
  const tx = tail === 'left' ? -w / 2 + 40 : w / 2 - 40;
  const tdir = tail === 'left' ? -1 : 1;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill={COLORS.white} {...sil} />
      <path d={`M ${tx} ${h / 2 - 10} L ${tx + tdir * 36} ${h / 2 + 54} L ${tx + tdir * 4} ${h / 2 - 2} Z`} fill={COLORS.white} {...std} />
      {children}
    </g>
  );
};

/** Thought bubble: cloud + three trailing dots. Contents swappable via children. */
export const ThoughtBubble: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g>
    <circle cx={-30} cy={110} r={10} fill={COLORS.white} {...fine} />
    <circle cx={-6} cy={78} r={16} fill={COLORS.white} {...std} />
    <path d="M -120 0 Q -140 -60 -80 -70 Q -70 -120 0 -104 Q 70 -120 100 -70 Q 160 -60 130 0 Q 150 54 80 56 L -70 56 Q -140 54 -120 0 Z" fill={COLORS.white} {...sil} />
    <g transform="translate(0 -20)">{children}</g>
  </g>
);

/** Gibberish sleep-talk glyphs (for sleep-talk bubbles). */
export const GibberishGlyphs: React.FC = () => (
  <g {...strokeProps(STROKE.sm)} fill="none" stroke={COLORS.outline}>
    <path d="M -90 0 q 14 -22 28 0 t 28 0" />
    <path d="M -20 10 l 18 -20 l 10 20" />
    <circle cx={40} cy={-2} r={10} fill={COLORS.outline} />
    <path d="M 66 -12 q 18 10 0 20" />
  </g>
);

export const SweatDrop: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pulse(f, fps, 1, 1.15, 0.5);
  return (
    <g transform={`scale(${s})`}>
      <path d="M 0 -30 C 24 2 24 26 0 34 C -24 26 -24 2 0 -30 Z" fill={COLORS.sky} {...std} />
      <ellipse cx={-7} cy={8} rx={5} ry={9} fill={COLORS.white} opacity={0.85} />
    </g>
  );
};

export const ZzzTrail: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g fill={COLORS.purpleDeep} fontFamily="Baloo 2" fontWeight={800}>
      {[0, 1, 2].map((i) => (
        <text key={i} x={i * 40} y={-i * 44} fontSize={40 + i * 16} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 14 - i))}>
          z
        </text>
      ))}
    </g>
  );
};
