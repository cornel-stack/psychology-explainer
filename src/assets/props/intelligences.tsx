/**
 * intelligences.tsx — ALL-NEW art for "Every Type of Intelligence Explained"
 * (Gardner's multiple intelligences). One emblem per kind of smart:
 *   word-quill (linguistic), logic-numbers (logical-mathematical),
 *   spatial-cube (spatial), music-emblem (musical), body-motion (bodily),
 *   people-link (interpersonal), inner-lantern (intrapersonal),
 *   nature-leaf (naturalistic), big-question (existential).
 * Flat two-tone, token strokes. Each centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Disc: React.FC<{ c: string; r?: number }> = ({ c, r = 118 }) => (
  <>
    <circle cx={0} cy={0} r={r} fill={shade(c, 0.22)} {...lg} />
    <circle cx={0} cy={0} r={r} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />
  </>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 150 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>{t}</text>
);

/** Linguistic — an open book with letters flowing up out of it. */
export const WordQuill: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <Disc c={COLORS.sky} />
      <path d="M -84 30 Q 0 6 0 24 Q 0 6 84 30 L 84 64 Q 0 40 -84 64 Z" fill={COLORS.white} {...lg} />
      <line x1={0} y1={18} x2={0} y2={56} stroke={COLORS.skyDark} strokeWidth={STROKE.sm} />
      {['A', 'b', 'c'].map((ch, i) => <text key={ch} x={-30 + i * 30} y={-24 - (i % 2) * 20 - ((f / 6) % 10)} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={shade(COLORS.sky, -0.15)}>{ch}</text>)}
      <Label t="WORD SMART" />
    </g>
  );
};

/** Logical-mathematical — numbers, an equals and a little gear. */
export const LogicNumbers: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <Disc c={COLORS.blueDiagram} />
      <text x={-40} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={66} fill={COLORS.white}>7</text>
      <g transform="translate(26 -4)">
        {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-5} y={-44} width={10} height={14} fill={COLORS.white} transform={`rotate(${i * 45 + f * 2})`} />)}
        <circle r={30} fill={shade(COLORS.blueDiagram, 0.16)} {...sm} /><circle r={12} fill={COLORS.blueDiagram} />
      </g>
      <path d="M -70 46 l 44 0 M -70 62 l 44 0" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="LOGIC SMART" />
    </g>
  );
};

/** Spatial — a 3D cube with a little rotation and a corner map pin. */
export const SpatialCube: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + 0.04 * Math.sin(f / 10);
  return (
    <g>
      <Disc c={COLORS.lavender} />
      <g transform={`scale(${s})`}>
        <path d="M -40 -20 L 0 -44 L 40 -20 L 0 4 Z" fill={COLORS.white} {...lg} />
        <path d="M -40 -20 L -40 40 L 0 64 L 0 4 Z" fill={shade(COLORS.lavender, 0.1)} {...lg} />
        <path d="M 40 -20 L 40 40 L 0 64 L 0 4 Z" fill={shade(COLORS.lavender, -0.08)} {...lg} />
      </g>
      <path d="M 60 -46 a 16 16 0 1 0 0.1 0 M 60 -14 l -10 -16 l 20 0 Z" fill={COLORS.red} {...sm} />
      <Label t="PICTURE SMART" />
    </g>
  );
};

/** Musical — a bold note with little sound waves. */
export const MusicEmblem: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 5);
  return (
    <g>
      <Disc c={COLORS.pink} />
      <ellipse cx={-14} cy={30} rx={26} ry={18} fill={COLORS.white} {...lg} transform="rotate(-20 -14 30)" />
      <rect x={8} y={-54} width={12} height={82} rx={4} fill={COLORS.white} />
      <path d="M 20 -54 q 40 6 34 40" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[40, 64].map((r, i) => <path key={i} d={`M 56 -10 q ${r * 0.5} ${r * 0.4} 0 ${r * 0.8}`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={g} strokeLinecap="round" />)}
      <Label t="MUSIC SMART" />
    </g>
  );
};

/** Bodily-kinesthetic — a figure leaping mid-motion. */
export const BodyMotion: React.FC = () => {
  const f = useCurrentFrame();
  const jump = 6 * Math.sin(f / 6);
  return (
    <g transform={`translate(0 ${-jump})`}>
      <Disc c={COLORS.red} />
      <circle cx={0} cy={-44} r={26} fill={COLORS.white} {...lg} />
      <path d="M 0 -18 L -6 30" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -6 0 L -44 -16 M -6 2 L 36 -10" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -6 30 L -40 56 M -6 30 L 34 50" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {[-64, 64].map((x, i) => <path key={i} d={`M ${x} -6 l ${x < 0 ? -14 : 14} -8 m ${x < 0 ? -14 : 14} 8 l ${x < 0 ? -14 : 14} 8`} stroke={shade(COLORS.red, -0.1)} strokeWidth={STROKE.sm} fill="none" strokeLinecap="round" />)}
      <Label t="BODY SMART" />
    </g>
  );
};

/** Interpersonal — two figures linked by a warm connection. */
export const PeopleLink: React.FC = () => (
  <g>
    <Disc c={COLORS.yellowDark} />
    {[-44, 44].map((x, i) => <g key={i} transform={`translate(${x} 10) scale(0.8)`}><circle cx={0} cy={-30} r={24} fill={COLORS.white} {...lg} /><path d="M -30 40 Q 0 -16 30 40 Z" fill={COLORS.white} {...xl} /></g>)}
    <path d="M -20 -16 C -8 -40 8 -40 20 -16 C 8 4 -8 4 -20 -16 Z" fill={COLORS.red} {...sm} />
    <Label t="PEOPLE SMART" />
  </g>
);

/** Intrapersonal — a figure holding a small inner lantern of self-knowledge. */
export const InnerLantern: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      <Disc c={COLORS.greenTeal} />
      <circle cx={0} cy={-8} r={54} fill={COLORS.yellowSoft} opacity={g} />
      <circle cx={0} cy={-40} r={24} fill={COLORS.white} {...lg} />
      <path d="M -34 44 Q 0 -14 34 44 Z" fill={COLORS.white} {...xl} />
      {/* the lantern of self */}
      <g transform="translate(0 2)"><rect x={-16} y={-16} width={32} height={34} rx={6} fill={COLORS.yellow} {...sm} /><path d="M -10 -4 L 10 -4 L 6 10 L -6 10 Z" fill={COLORS.yellowDark} /></g>
      <Label t="SELF SMART" />
    </g>
  );
};

/** Naturalistic — a leaf with a little creature, the pattern-sense of nature. */
export const NatureLeaf: React.FC = () => (
  <g>
    <Disc c={COLORS.greenLeaf} />
    <path d="M 0 60 Q -70 10 0 -64 Q 70 10 0 60 Z" fill={COLORS.white} {...lg} />
    <path d="M 0 56 L 0 -56 M 0 20 L -36 0 M 0 20 L 36 0 M 0 -8 L -28 -28 M 0 -8 L 28 -28" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <g transform="translate(26 24)"><ellipse rx={16} ry={10} fill={COLORS.red} {...sm} /><circle cx={6} cy={-4} r={3} fill={COLORS.outline} /></g>
    <Label t="NATURE SMART" />
  </g>
);

/** Existential — a figure gazing up at a starry question. */
export const BigQuestion: React.FC = () => {
  const f = useCurrentFrame();
  const tw = 0.5 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <Disc c={COLORS.purpleDeep} />
      {[[-54, -40], [48, -50], [60, 10]].map(([x, y], i) => <path key={i} d={`M ${x} ${y - 10} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z`} fill={COLORS.yellow} opacity={tw} />)}
      <circle cx={-10} cy={30} r={22} fill={COLORS.white} {...lg} />
      <path d="M 24 -34 q 0 -22 22 -22 q 22 0 22 20 q 0 16 -22 20 l 0 14" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={46} cy={28} r={6} fill={COLORS.white} />
      <Label t="MEANING SMART" />
    </g>
  );
};
