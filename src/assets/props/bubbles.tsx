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

/** Centered, multi-line (\n) handwritten text inside a bubble. */
const BubbleText: React.FC<{ text?: string; size?: number; cy?: number }> = ({ text, size = 46, cy = 0 }) => {
  if (!text) return null;
  const lines = text.split('\n');
  const lh = size * 1.05;
  const y0 = cy - ((lines.length - 1) * lh) / 2 + size * 0.34;
  return (
    <g fill={COLORS.outline} fontFamily="Baloo 2" fontWeight={700} textAnchor="middle">
      {lines.map((ln, i) => (
        <text key={i} x={0} y={y0 + i * lh} fontSize={size}>
          {ln}
        </text>
      ))}
    </g>
  );
};

/** Speech bubble with a tail. Pass `text` (\n for line breaks) or children. */
export const SpeechBubble: React.FC<{ w?: number; h?: number; tail?: 'left' | 'right'; text?: string; children?: React.ReactNode }> = ({ w, h, tail = 'left', text, children }) => {
  const lines = text ? text.split('\n') : [];
  const bw = w ?? Math.max(300, Math.max(0, ...lines.map((l) => l.length)) * 28 + 90);
  const bh = h ?? Math.max(170, lines.length * 60 + 80);
  const tx = tail === 'left' ? -bw / 2 + 40 : bw / 2 - 40;
  const tdir = tail === 'left' ? -1 : 1;
  return (
    <g>
      <rect x={-bw / 2} y={-bh / 2} width={bw} height={bh} rx={34} fill={COLORS.white} {...sil} />
      <path d={`M ${tx} ${bh / 2 - 10} L ${tx + tdir * 36} ${bh / 2 + 54} L ${tx + tdir * 4} ${bh / 2 - 2} Z`} fill={COLORS.white} {...std} />
      <BubbleText text={text} size={46} />
      {children}
    </g>
  );
};

/** Thought bubble: cloud + trailing dots. Pass `text` or children. */
export const ThoughtBubble: React.FC<{ text?: string; children?: React.ReactNode }> = ({ text, children }) => (
  <g>
    <circle cx={-30} cy={110} r={10} fill={COLORS.white} {...fine} />
    <circle cx={-6} cy={78} r={16} fill={COLORS.white} {...std} />
    <path d="M -150 0 Q -172 -70 -100 -82 Q -88 -140 0 -122 Q 88 -140 124 -82 Q 196 -70 162 0 Q 186 64 100 66 L -86 66 Q -172 64 -150 0 Z" fill={COLORS.white} {...sil} />
    <BubbleText text={text} size={40} cy={-24} />
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
