/**
 * solitude.tsx — ALL-NEW art for "The Psychology of People Who Prefer Being Alone".
 * One signature prop per trait: recharging in solitude, a few deep roots, the
 * inner compass of independence, a rich inner garden, the energy gate of
 * boundaries, comfort in silence, the quiet observer, a steady sense of self, and
 * the recharged glow. Flat two-tone, token strokes. Centered on origin, ~300px.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; eyes?: 'open' | 'closed' }> = ({ r = 40, c = COLORS.white, eyes = 'open' }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    {eyes === 'open' && <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /></>}
    {eyes === 'closed' && <path d={`M ${-r * 0.55} ${-r * 1.05} q ${r * 0.2} ${r * 0.18} ${r * 0.4} 0 M ${r * 0.15} ${-r * 1.05} q ${r * 0.2} ${r * 0.18} ${r * 0.4} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 128 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Recharge in solitude — a battery filling up with a calm figure inside. */
export const SoloBattery: React.FC = () => {
  const f = useCurrentFrame();
  const fill = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(f / 20));
  return (
    <g>
      <rect x={-70} y={-96} width={140} height={200} rx={18} fill={COLORS.white} {...xl} />
      <rect x={-26} y={-116} width={52} height={24} rx={8} fill={COLORS.outline} />
      <rect x={-56} y={96 - fill * 180} width={112} height={fill * 180} rx={10} fill={COLORS.greenLeaf} />
      <g transform="translate(0 40) scale(0.62)"><Fig r={40} c={COLORS.white} eyes="closed" /></g>
      <path d="M 6 -30 l -20 26 l 16 0 l -6 24 l 22 -28 l -16 0 Z" fill={COLORS.yellow} {...sm} />
      <Label t="charges alone" />
    </g>
  );
};

/** A few deep roots — two figures joined by one deep root, not many shallow. */
export const DeepRootsPair: React.FC = () => (
  <g>
    <rect x={-150} y={28} width={300} height={16} rx={4} fill={shade(COLORS.wood, 0.1)} />
    {[-70, 70].map((x, i) => <g key={i} transform={`translate(${x} 0) scale(0.7)`}><Fig r={40} c={[COLORS.white, COLORS.yellowSoft][i]} /></g>)}
    {/* one deep shared root */}
    <path d="M -70 44 Q 0 150 70 44" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <path d="M 0 96 l 0 40 M -20 120 l 40 0" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <Label t="few, but deep" />
  </g>
);

/** The inner compass — a compass whose needle points inward, to the self. */
export const SelfCompass: React.FC = () => {
  const f = useCurrentFrame();
  const wob = 6 * Math.sin(f / 18);
  return (
    <g>
      <circle cx={0} cy={0} r={90} fill={COLORS.sky} {...xl} />
      <circle cx={0} cy={0} r={74} fill={shade(COLORS.sky, 0.12)} {...sm} />
      {['N', 'E', 'S', 'W'].map((d, i) => <text key={d} x={Math.sin((i * 90 * Math.PI) / 180) * 58} y={-Math.cos((i * 90 * Math.PI) / 180) * 58 + 8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>{d}</text>)}
      <g transform={`rotate(${wob})`}><path d="M 0 -44 L 12 0 L 0 44 L -12 0 Z" fill={COLORS.red} {...sm} /></g>
      <circle cx={0} cy={0} r={8} fill={COLORS.outline} />
      <Label t="own compass" />
    </g>
  );
};

/** A rich inner garden — a head in profile with a little garden blooming inside. */
export const InnerGarden: React.FC = () => (
  <g>
    <circle cx={0} cy={-6} r={94} fill={COLORS.lavender} {...xl} />
    <path d="M -94 40 L 94 40 L 94 86 L -94 86 Z" fill={shade(COLORS.greenLeaf, 0.1)} {...sm} />
    {[-54, -18, 18, 54].map((x, i) => <g key={x}><rect x={x - 3} y={0} width={6} height={44} fill={COLORS.greenDark} />{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={x} cy={-6} rx={7} ry={13} fill={[COLORS.pink, COLORS.yellow, COLORS.red, COLORS.sky][i]} transform={`rotate(${a} ${x} -6)`} {...sm} />)}<circle cx={x} cy={-6} r={6} fill={COLORS.yellowDark} /></g>)}
    <circle cx={44} cy={-56} r={22} fill={COLORS.yellow} {...sm} />
    <Label t="rich inner world" />
  </g>
);

/** The energy gate — a gate that lets a little in, keeps the drain out. */
export const EnergyGate: React.FC = () => (
  <g>
    <rect x={-96} y={-70} width={30} height={150} rx={8} fill={shade(COLORS.outline, 0.3)} {...lg} />
    <rect x={66} y={-70} width={30} height={150} rx={8} fill={shade(COLORS.outline, 0.3)} {...lg} />
    {/* half-open gate */}
    <g transform="translate(-66 0) rotate(-26)"><rect x={0} y={-60} width={110} height={120} rx={6} fill={COLORS.wood} {...xl} />{[22, 55, 88].map((x) => <line key={x} x1={x} y1={-60} x2={x} y2={60} stroke={shade(COLORS.wood, -0.1)} strokeWidth={STROKE.sm} />)}</g>
    {/* one welcome arrow in, a crowd blocked */}
    <path d="M 4 0 l 40 0 m -12 -10 l 12 10 l -12 10" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    {[[-150, -30], [-160, 20], [-130, 50]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill={COLORS.red} opacity={0.5} {...sm} />)}
    <Label t="protects energy" />
  </g>
);

/** Comfortable in silence — a figure serene inside a soft quiet bubble. */
export const QuietBubble: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + 0.04 * Math.sin(f / 10);
  return (
    <g transform={`scale(${s})`}>
      <circle cx={0} cy={0} r={94} fill={COLORS.greenTeal} opacity={0.35} {...lg} />
      <circle cx={0} cy={0} r={94} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.6} />
      <circle cx={-34} cy={-36} r={14} fill={COLORS.white} opacity={0.7} />
      <g transform="translate(0 28)"><Fig r={40} c={COLORS.white} eyes="closed" /></g>
      {/* a crossed-out speech bubble = no need to fill silence */}
      <g transform="translate(58 -58)"><rect x={-22} y={-16} width={44} height={30} rx={8} fill={COLORS.white} {...sm} /><line x1={-20} y1={-16} x2={20} y2={14} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="at ease in silence" />
    </g>
  );
};

/** The quiet observer — a wise owl that watches instead of performing. */
export const OwlWatch: React.FC = () => {
  const f = useCurrentFrame();
  const blink = Math.sin(f / 12) > 0.9;
  return (
    <g>
      <ellipse cx={0} cy={10} rx={74} ry={84} fill={COLORS.wood} {...xl} />
      <path d="M -62 -50 l 10 -40 l 30 26 Z" fill={COLORS.wood} {...sm} />
      <path d="M 62 -50 l -10 -40 l -30 26 Z" fill={COLORS.wood} {...sm} />
      {[-30, 30].map((x, i) => <g key={i}><circle cx={x} cy={-14} r={30} fill={COLORS.white} {...lg} />{blink ? <line x1={x - 18} y1={-14} x2={x + 18} y2={-14} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /> : <circle cx={x} cy={-14} r={12} fill={COLORS.outline} />}</g>)}
      <path d="M 0 2 l -14 20 l 28 0 Z" fill={COLORS.yellowDark} {...sm} />
      <path d="M -40 70 l 16 20 m 20 -20 l 0 24 m 20 -24 l -16 20" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="watches, quietly" y={140} />
    </g>
  );
};

/** A steady sense of self — a firmly planted anchor that doesn't drift. */
export const SelfAnchor: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 3 * Math.sin(f / 16);
  return (
    <g transform={`rotate(${sway})`}>
      <circle cx={0} cy={-70} r={24} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} />
      <rect x={-8} y={-50} width={16} height={130} rx={6} fill={shade(COLORS.outline, 0.25)} {...lg} />
      <line x1={-40} y1={-26} x2={40} y2={-26} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -80 50 Q -80 90 0 90 Q 80 90 80 50" fill="none" stroke={shade(COLORS.outline, 0.25)} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -80 50 l -14 -10 m 14 10 l 14 -10 M 80 50 l -14 -10 m 14 10 l 14 -10" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="knows who they are" />
    </g>
  );
};

/** Recharged glow — a figure stepping out calm, full and lit up after alone time. */
export const RechargeGlow: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={-10} x2={0} y2={-120} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 36} 0 -10)`} strokeLinecap="round" />)}
      <circle cx={0} cy={-10} r={70} fill={COLORS.yellowSoft} opacity={0.4} />
      <g transform="translate(0 30)"><Fig r={42} c={COLORS.white} /></g>
      <path d="M -16 6 q 4 10 -2 18 M 18 2 q 6 10 0 18" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="comes back full" />
    </g>
  );
};
