/**
 * happiness.tsx — ALL-NEW art for "The Psychology of Happiness". The traps
 * (arrival mirage, hedonic treadmill, the money plateau) and what actually works
 * (warm relationships, experiences over things, flow, gratitude, giving, presence,
 * and joy vs meaning). Token strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; happy?: boolean }> = ({ r = 38, c = COLORS.white, happy = true }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} />
    {happy && <path d={`M ${-r * 0.34} ${-r * 0.74} Q 0 ${-r * 0.4} ${r * 0.34} ${-r * 0.74}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    <path d={`M ${-r * 1.1} ${r * 1.5} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.5} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 132 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Arrival mirage — reaching for a "HAPPY" sign that keeps receding. */
export const ArrivalMirage: React.FC = () => {
  const f = useCurrentFrame();
  const dx = 10 * Math.sin(f / 10);
  return (
    <g>
      <g transform="translate(-50 20)"><Fig r={38} c={COLORS.white} /><path d="M 20 -40 l 46 -6" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      <g transform={`translate(${70 + dx} -30)`} opacity={0.6}><rect x={-50} y={-26} width={100} height={52} rx={10} fill={COLORS.yellow} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>HAPPY</text></g>
      <Label t="'I'll be happy when...'" />
    </g>
  );
};

/** Hedonic treadmill — running hard, the happiness meter staying put. */
export const HedonicTreadmill: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-90} y={50} width={180} height={30} rx={14} fill={shade(COLORS.outline, 0.3)} {...xl} />
      <circle cx={-56} cy={65} r={14} fill={COLORS.ledGrey} {...sm} /><circle cx={56} cy={65} r={14} fill={COLORS.ledGrey} {...sm} />
      <g transform={`translate(${6 * Math.sin(f / 3)} 10)`}><Fig r={34} c={COLORS.white} happy={false} /><path d="M 0 -20 l -30 20 M 0 -16 l 30 24" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      {/* happiness meter stuck in the middle */}
      <g transform="translate(66 -50)"><rect x={-16} y={-44} width={32} height={88} rx={8} fill={COLORS.white} {...lg} /><rect x={-10} y={0} width={20} height={38} rx={6} fill={COLORS.greenLeaf} /></g>
      <Label t="the hedonic treadmill" />
    </g>
  );
};

/** Money plateau — stacks of coins, but the happiness line flattens. */
export const MoneyPlateau: React.FC = () => (
  <g>
    <path d="M -90 60 L -90 -30 L 90 60" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={0.4} />
    <path d="M -90 50 Q -40 -30 10 -46 Q 50 -52 90 -50" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {[-70, -40, -10].map((x, i) => <g key={i} transform={`translate(${x} ${60})`}>{Array.from({ length: 2 + i }).map((_, j) => <ellipse key={j} cx={0} cy={-j * 14} rx={18} ry={8} fill={COLORS.yellow} {...sm} />)}</g>)}
    <text x={54} y={-58} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>plateau</text>
    <Label t="money plateaus" />
  </g>
);

/** Relationship warmth — two figures joined by a glowing heart (the #1). */
export const RelationshipWarmth: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      <circle cx={0} cy={-10} r={76} fill={COLORS.yellowSoft} opacity={g} />
      {[-48, 48].map((x, i) => <g key={i} transform={`translate(${x} 24) scale(0.82)`}><Fig r={36} c={[COLORS.white, COLORS.yellowSoft][i]} /></g>)}
      <g transform="translate(0 -20)"><path d="M 0 24 C -26 0 -42 -14 -26 -32 C -14 -44 0 -28 0 -18 C 0 -28 14 -44 26 -32 C 42 -14 26 0 0 24 Z" fill={COLORS.red} {...lg} /></g>
      <Label t="RELATIONSHIPS" />
    </g>
  );
};

/** Experiences over things — a glowing memory vs a dull sealed box. */
export const ExperiencesThings: React.FC = () => (
  <g>
    <g transform="translate(-58 0)"><rect x={-40} y={-34} width={80} height={76} rx={8} fill={COLORS.ledGrey} {...xl} /><path d="M -40 -10 l 80 0" stroke={shade(COLORS.ledGrey, -0.1)} strokeWidth={STROKE.sm} /></g>
    <text x={-58} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>things</text>
    <g transform="translate(60 -4)"><circle r={50} fill={COLORS.yellowSoft} opacity={0.5} /><path d="M -30 20 L -4 -24 L 14 2 L 30 -20 L 30 20 Z" fill={COLORS.greenLeaf} {...lg} /><circle cx={-18} cy={-18} r={12} fill={COLORS.yellow} {...sm} />{[[-40, -36], [40, -34]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z`} fill={COLORS.yellow} />)}</g>
    <text x={60} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>experiences</text>
    <Label t="EXPERIENCES WIN" />
  </g>
);

/** Flow — a figure fully absorbed, glowing, time gone. */
export const FlowAbsorbed: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={-20} x2={0} y2={-116} stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 36} 0 -20)`} strokeLinecap="round" />)}
      <circle cx={0} cy={-20} r={66} fill={COLORS.sky} opacity={0.3} />
      <g transform="translate(0 24)"><Fig r={40} c={COLORS.white} /></g>
      <rect x={-50} y={30} width={100} height={16} rx={6} fill={COLORS.wood} {...sm} />
      <Label t="FLOW" />
    </g>
  );
};

/** Gratitude — a little list of blessings with hearts. */
export const GratitudeList: React.FC = () => (
  <g>
    <rect x={-70} y={-80} width={140} height={160} rx={10} fill={COLORS.white} {...xl} />
    {[-44, -16, 12, 40].map((y, i) => <g key={i}><path d={`M -48 ${y} C -54 ${y - 8} -64 ${y + 2} -48 ${y + 10} C -32 ${y + 2} -42 ${y - 8} -48 ${y}`} fill={COLORS.red} {...sm} /><line x1={-30} y1={y + 4} x2={50} y2={y + 4} stroke={shade(COLORS.outline, 0.3)} strokeWidth={STROKE.sm} opacity={0.4} /></g>)}
    <Label t="GRATITUDE" />
  </g>
);

/** Giving — a hand offering a heart, ripples spreading back. */
export const GivingRipple: React.FC = () => {
  const f = useCurrentFrame();
  const r = 30 + ((f * 2) % 70);
  return (
    <g>
      {[r, r - 35].map((rr, i) => rr > 0 && <circle key={i} cx={40} cy={0} r={rr} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.sm} opacity={0.5} />)}
      <g transform="translate(-54 10)"><circle cx={0} cy={0} r={24} fill={COLORS.skin} {...lg} /><rect x={14} y={-10} width={44} height={20} rx={10} fill={COLORS.skin} {...sm} /></g>
      <g transform="translate(40 -6)"><path d="M 0 22 C -24 -2 -38 -16 -22 -32 C -10 -42 0 -28 0 -18 C 0 -28 10 -42 22 -32 C 38 -16 24 -2 0 22 Z" fill={COLORS.red} {...lg} /></g>
      <Label t="GIVING" />
    </g>
  );
};

/** Presence — a figure anchored in a bright "now". */
export const PresentNow: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + 0.05 * Math.sin(f / 8);
  return (
    <g transform={`scale(${s})`}>
      <circle cx={0} cy={0} r={90} fill={COLORS.greenTeal} opacity={0.35} {...lg} />
      <circle cx={0} cy={0} r={90} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.6} />
      <g transform="translate(0 26)"><Fig r={40} c={COLORS.white} /></g>
      <text x={0} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>now</text>
      <Label t="BE PRESENT" />
    </g>
  );
};

/** Joy vs meaning — a bright balloon of joy beside a deep-rooted tree of meaning. */
export const JoyVsMeaning: React.FC = () => (
  <g>
    <g transform="translate(-62 0)"><circle cx={0} cy={-20} r={40} fill={COLORS.yellow} {...xl} /><path d="M 0 20 l 0 40" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} /><text x={0} y={-12} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>joy</text></g>
    <g transform="translate(62 0)"><rect x={-10} y={-10} width={20} height={70} rx={6} fill={COLORS.woodDark} {...sm} /><circle cx={0} cy={-30} r={40} fill={COLORS.greenLeaf} {...xl} /><path d="M -14 60 q -14 20 -34 24 M 14 60 q 14 20 34 24" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" /><text x={0} y={-26} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>meaning</text></g>
    <Label t="joy vs meaning" />
  </g>
);
