/**
 * habits.tsx — ALL-NEW art for "The Psychology of Habits". One emblem per idea:
 * autopilot-brain, the habit loop, the craving magnet, swapping the routine, an
 * obvious cue, an easy ramp, a satisfying check, stacking habits, identity, and
 * the 1% compound seed. Token strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; eyes?: 'open' | 'half' }> = ({ r = 36, c = COLORS.white, eyes = 'open' }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    {eyes === 'open' ? <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /></>
      : <><rect x={-r * 0.5} y={-r * 1.1} width={r * 0.3} height={r * 0.1} rx={2} fill={COLORS.outline} /><rect x={r * 0.2} y={-r * 1.1} width={r * 0.3} height={r * 0.1} rx={2} fill={COLORS.outline} /></>}
    <path d={`M ${-r * 1.1} ${r * 1.5} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.5} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 132 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Autopilot brain — a head with a little wind-up key, running on habit. */
export const AutopilotBrain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <g transform="translate(0 16)"><Fig r={46} c={shade(COLORS.sky, 0.08)} eyes="half" /></g>
      <g transform={`translate(0 -34) rotate(${(f * 3) % 360})`}><circle r={20} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} /><rect x={-5} y={-36} width={10} height={18} rx={4} fill={COLORS.ledGrey} {...sm} /><rect x={-5} y={18} width={10} height={18} rx={4} fill={COLORS.ledGrey} {...sm} /></g>
      <Label t="on autopilot" />
    </g>
  );
};

/** The habit loop — three gears: cue, routine, reward. */
export const HabitLoop: React.FC = () => {
  const f = useCurrentFrame();
  const Gear = ({ x, y, c, rot, lab }: { x: number; y: number; c: string; rot: number; lab: string }) => (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`rotate(${rot})`}>{Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-5} y={-40} width={10} height={14} fill={c} transform={`rotate(${i * 45})`} />)}<circle r={32} fill={c} {...lg} /><circle r={12} fill={shade(c, 0.2)} /></g>
      <text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.white}>{lab}</text>
    </g>
  );
  return (
    <g>
      <Gear x={-56} y={-30} c={COLORS.sky} rot={f * 2} lab="CUE" />
      <Gear x={54} y={-30} c={COLORS.yellowDark} rot={-f * 2} lab="DO" />
      <Gear x={0} y={46} c={COLORS.greenLeaf} rot={f * 2} lab="REWARD" />
      <Label t="the habit loop" />
    </g>
  );
};

/** The craving magnet — anticipation pulling you toward the reward. */
export const CravingMagnet: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 5);
  return (
    <g>
      <path d="M -50 -60 L -50 20 A 50 50 0 0 0 50 20 L 50 -60 L 20 -60 L 20 20 A 20 20 0 0 1 -20 20 L -20 -60 Z" fill={COLORS.red} {...xl} />
      <rect x={-50} y={-60} width={30} height={26} fill={COLORS.ledGrey} /><rect x={20} y={-60} width={30} height={26} fill={COLORS.ledGrey} />
      {[30, 50, 70].map((r, i) => <path key={i} d={`M 0 60 q ${r} -10 ${r} -${r}`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} strokeLinecap="round" transform={`scale(${i % 2 ? -1 : 1} 1)`} />)}
      <Label t="craving" />
    </g>
  );
};

/** Swap the routine — keep cue & reward, change the middle block. */
export const SwapRoutine: React.FC = () => (
  <g>
    <rect x={-120} y={-30} width={64} height={60} rx={10} fill={COLORS.sky} {...lg} /><text x={-88} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>cue</text>
    <rect x={56} y={-30} width={64} height={60} rx={10} fill={COLORS.greenLeaf} {...lg} /><text x={88} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>reward</text>
    {/* old routine swapped for new */}
    <g transform="translate(-8 -56) rotate(-10)" opacity={0.4}><rect x={-30} y={-24} width={60} height={48} rx={8} fill={COLORS.red} {...sm} /></g>
    <g transform="translate(0 0)"><rect x={-32} y={-30} width={64} height={60} rx={10} fill={COLORS.yellow} {...xl} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>new</text></g>
    <path d="M -24 50 q 24 20 48 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeDasharray="3 6" />
    <Label t="swap the routine" />
  </g>
);

/** Obvious cue — a bright sticky note / trigger you can't miss. */
export const ObviousCue: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={-70} x2={0} y2={-104} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 45})`} strokeLinecap="round" />)}
      <rect x={-64} y={-56} width={128} height={116} rx={8} fill={COLORS.yellow} {...xl} />
      <path d="M 40 -56 l 24 0 l -24 24 Z" fill={shade(COLORS.yellow, -0.1)} {...sm} />
      <text x={0} y={14} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={54} fill={COLORS.outline}>!</text>
      <Label t="make it obvious" />
    </g>
  );
};

/** Easy ramp — a lowered ramp making the action nearly effortless. */
export const EasyRamp: React.FC = () => {
  const f = useCurrentFrame();
  const x = -70 + ((f * 2) % 150);
  return (
    <g>
      <path d="M -90 60 L 90 -40 L 90 60 Z" fill={shade(COLORS.greenLeaf, 0.14)} {...xl} />
      <circle cx={x} cy={48 - (x + 90) * 0.55} r={20} fill={COLORS.greenLeaf} {...lg} /><circle cx={x} cy={48 - (x + 90) * 0.55} r={7} fill={shade(COLORS.greenLeaf, 0.2)} />
      <Label t="make it easy" />
    </g>
  );
};

/** Satisfying check — an instant reward tick with a little ding. */
export const SatisfyingCheck: React.FC = () => {
  const f = useCurrentFrame();
  const p = 0.9 + 0.1 * Math.sin(f / 4);
  return (
    <g transform={`scale(${p})`}>
      <circle cx={0} cy={0} r={76} fill={COLORS.greenLeaf} {...xl} />
      <path d="M -34 2 l 20 22 l 38 -46" fill="none" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {[[-66, -52], [68, -48]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 6 -10 l 6 10 Z`} fill={COLORS.yellow} {...sm} />)}
      <Label t="make it satisfying" y={120} />
    </g>
  );
};

/** Stack blocks — a new habit stacked on an existing one. */
export const StackBlocks: React.FC = () => {
  const f = useCurrentFrame();
  const drop = Math.max(0, 20 - (f % 50));
  return (
    <g>
      <rect x={-70} y={40} width={140} height={44} rx={8} fill={COLORS.sky} {...xl} /><text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>old habit</text>
      <rect x={-56} y={0} width={112} height={44} rx={8} fill={COLORS.greenLeaf} {...xl} /><text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>then</text>
      <g transform={`translate(0 ${-44 - drop})`}><rect x={-44} y={0} width={88} height={44} rx={8} fill={COLORS.yellow} {...xl} /><text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>new</text></g>
      <Label t="habit stacking" />
    </g>
  );
};

/** Identity badge — "I'm the kind of person who..." */
export const IdentityBadge: React.FC = () => (
  <g>
    <circle cx={0} cy={-6} r={80} fill={COLORS.blueDiagram} {...xl} />
    <circle cx={0} cy={-6} r={64} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
    <g transform="translate(0 6)"><Fig r={30} c={COLORS.white} /></g>
    <path d="M -36 56 l 0 40 l 18 -14 l 18 14 l 0 -40 Z" fill={COLORS.yellow} {...lg} transform="translate(0 -4)" />
    <Label t="become the person" y={150} />
  </g>
);

/** Compound seed — tiny 1% growth sprouting into something big. */
export const CompoundSeed: React.FC = () => {
  const f = useCurrentFrame();
  const g = (f % 90) / 90;
  return (
    <g>
      <path d="M -90 70 L 90 70" stroke={shade(COLORS.wood, 0.1)} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) => { const h = 20 + i * 36; return <g key={i} transform={`translate(${-60 + i * 40} 70)`}><rect x={-5} y={-h} width={10} height={h} fill={COLORS.greenDark} /><circle cx={0} cy={-h} r={14 + i * 4} fill={COLORS.greenLeaf} {...sm} /></g>; })}
      <text x={66} y={-96} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.greenDark} opacity={g}>1%</text>
      <Label t="tiny gains compound" />
    </g>
  );
};
