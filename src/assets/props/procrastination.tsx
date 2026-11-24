/**
 * procrastination.tsx — ALL-NEW art for "Why Your Brain Procrastinates".
 * Signature props for the story: the dreaded task, the impulse creature that
 * drags you to fun, the faded future-self who pays, the bubble of instant relief,
 * the deadline beast, the phone lure, the fog of guilt, the two-minute timer and
 * the kind note. Original characters (not derived from any existing meme art).
 * Flat two-tone, token strokes. Each centered on the origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; eyes?: 'open' | 'closed' | 'wide' }> = ({ r = 40, c = COLORS.white, eyes = 'open' }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    {eyes === 'open' && <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.15} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.15} fill={COLORS.outline} /></>}
    {eyes === 'wide' && <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.24} fill={COLORS.white} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.24} fill={COLORS.white} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.1} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.1} fill={COLORS.outline} /></>}
    {eyes === 'closed' && <path d={`M ${-r * 0.55} ${-r * 1.05} q ${r * 0.2} ${r * 0.18} ${r * 0.4} 0 M ${r * 0.15} ${-r * 1.05} q ${r * 0.2} ${r * 0.18} ${r * 0.4} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);

/** The dreaded task — a laptop with a looming, spiky document glowing on it. */
export const DreadDoc: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.25 * Math.sin(f / 6);
  return (
    <g>
      <rect x={-96} y={-70} width={192} height={128} rx={12} fill={shade(COLORS.outline, 0.35)} {...xl} />
      <rect x={-82} y={-56} width={164} height={100} rx={6} fill={COLORS.white} {...sm} />
      <rect x={-120} y={58} width={240} height={22} rx={8} fill={shade(COLORS.outline, 0.3)} {...lg} />
      {/* spiky dread glow behind the doc */}
      <path d="M -60 -30 l 8 -22 l 10 18 l 12 -26 l 10 22 l 12 -18 l 8 24 l -70 2 Z" fill={COLORS.red} opacity={g} />
      <rect x={-54} y={-34} width={108} height={70} rx={6} fill={shade(COLORS.red, 0.3)} {...sm} />
      {[-40, -20, 0].map((y) => <line key={y} x1={-40} y1={y} x2={40} y2={y} stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={0.7} />)}
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>the task</text>
    </g>
  );
};

/** The impulse creature — a little gremlin yanking you toward fun, right now. */
export const NowGremlin: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 4 * Math.sin(f / 5);
  return (
    <g transform={`translate(0 ${bob})`}>
      <ellipse cx={0} cy={6} rx={60} ry={58} fill={COLORS.yellow} {...xl} />
      {/* ears */}
      <path d="M -44 -36 l -18 -34 l 34 16 Z" fill={COLORS.yellow} {...sm} />
      <path d="M 44 -36 l 18 -34 l -34 16 Z" fill={COLORS.yellow} {...sm} />
      {/* goofy grin */}
      <circle cx={-20} cy={-6} r={12} fill={COLORS.white} {...sm} /><circle cx={20} cy={-6} r={12} fill={COLORS.white} {...sm} />
      <circle cx={-17} cy={-4} r={5} fill={COLORS.outline} /><circle cx={23} cy={-4} r={5} fill={COLORS.outline} />
      <path d="M -24 24 Q 0 48 24 24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* a little arm tugging a string */}
      <path d="M 54 18 q 40 6 60 40" fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>fun! now!</text>
    </g>
  );
};

/** The future self — a faded figure holding the bill the present self dodged. */
export const FutureSelfGhost: React.FC = () => (
  <g opacity={0.9}>
    <g opacity={0.5}><Fig r={44} c={COLORS.lavender} eyes="closed" /></g>
    {/* the bill it's left holding */}
    <g transform="translate(60 40) rotate(10)">
      <rect x={-34} y={-44} width={68} height={88} rx={6} fill={COLORS.white} {...lg} />
      {[-28, -14, 0, 14].map((y) => <line key={y} x1={-22} y1={y} x2={22} y2={y} stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={0.6} />)}
      <text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.red}>DUE</text>
    </g>
    <text x={0} y={122} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>future you</text>
  </g>
);

/** Instant relief — a soft comfy bubble you sink into by avoiding. */
export const ReliefBubble: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + 0.05 * Math.sin(f / 8);
  return (
    <g transform={`scale(${s})`}>
      <circle cx={0} cy={0} r={92} fill={COLORS.sky} opacity={0.4} {...lg} />
      <circle cx={0} cy={0} r={92} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.7} />
      <circle cx={-34} cy={-34} r={16} fill={COLORS.white} opacity={0.8} />
      <g transform="translate(0 24)"><Fig r={38} c={COLORS.white} eyes="closed" /></g>
      <path d="M -66 -44 q 6 -16 20 -10 M 60 -50 q 8 -14 20 -6" fill="none" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>ahh, later</text>
    </g>
  );
};

/** The deadline beast — an alarm-clock-headed monster that finally scares you into action. */
export const DeadlineBeast: React.FC = () => {
  const f = useCurrentFrame();
  const shake = 3 * Math.sin(f / 2);
  return (
    <g transform={`translate(${shake} 0)`}>
      <ellipse cx={0} cy={30} rx={70} ry={52} fill={COLORS.red} {...xl} />
      {/* clock face head */}
      <circle cx={0} cy={-40} r={52} fill={COLORS.white} {...xl} />
      <circle cx={-44} cy={-82} r={14} fill={COLORS.redDark} {...sm} /><circle cx={44} cy={-82} r={14} fill={COLORS.redDark} {...sm} />
      <line x1={0} y1={-40} x2={0} y2={-74} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={0} y1={-40} x2={26} y2={-30} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* angry eyes + teeth */}
      <path d="M -30 -44 l 20 8 M 30 -44 l -20 8" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -24 50 l 8 -14 l 8 14 l 8 -14 l 8 14 l 8 -14 l 8 14" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
      <text x={0} y={118} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>NOW or ELSE</text>
    </g>
  );
};

/** The phone lure — a glowing phone fanning out an endless pull of little hooks. */
export const ScrollTrap: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={0} y1={-10} x2={0} y2={-110} stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${(i - 2.5) * 16} 0 -10)`} strokeLinecap="round" />)}
      <rect x={-50} y={-70} width={100} height={168} rx={18} fill={shade(COLORS.outline, 0.3)} {...xl} />
      <rect x={-40} y={-58} width={80} height={140} rx={8} fill={COLORS.sky} {...sm} />
      {[-40, -10, 20].map((y) => <rect key={y} x={-30} y={y} width={60} height={18} rx={4} fill={COLORS.white} opacity={0.8} />)}
      <circle cx={0} cy={66} r={8} fill={COLORS.white} />
      <text x={0} y={128} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>just 5 min</text>
    </g>
  );
};

/** The fog of guilt — a grey cloud raining little heavy drops on a slumped figure. */
export const ShameFog: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <g transform="translate(0 40)"><Fig r={38} c={shade(COLORS.white, 0.06)} eyes="closed" /></g>
      <g transform="translate(0 -56)">
        <ellipse cx={-34} cy={0} rx={40} ry={30} fill={COLORS.ledGrey} {...lg} />
        <ellipse cx={30} cy={-6} rx={46} ry={34} fill={COLORS.ledGrey} {...lg} />
        <ellipse cx={0} cy={14} rx={56} ry={30} fill={shade(COLORS.ledGrey, -0.06)} {...sm} />
      </g>
      {[-30, 0, 30].map((x, i) => <line key={x} x1={x} y1={-24 + (f % 24)} x2={x - 4} y2={-6 + (f % 24)} stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>why am I like this</text>
    </g>
  );
};

/** The two-minute timer — a tiny, totally-doable first step. */
export const TwoMinTimer: React.FC = () => {
  const f = useCurrentFrame();
  const sweep = (f * 6) % 360;
  return (
    <g>
      <circle cx={0} cy={0} r={82} fill={COLORS.greenLeaf} {...xl} />
      <circle cx={0} cy={0} r={82} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />
      <path d={`M 0 0 L 0 -82 A 82 82 0 0 1 ${82 * Math.sin((sweep * Math.PI) / 180)} ${-82 * Math.cos((sweep * Math.PI) / 180)} Z`} fill={shade(COLORS.greenLeaf, 0.16)} />
      <rect x={-18} y={-104} width={36} height={16} rx={6} fill={COLORS.greenDark} {...sm} />
      <text x={0} y={12} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.white}>2:00</text>
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>just two minutes</text>
    </g>
  );
};

/** The kind note — self-compassion instead of self-flagellation. */
export const KindNote: React.FC = () => (
  <g>
    <rect x={-80} y={-70} width={160} height={150} rx={12} fill={COLORS.yellowSoft} {...xl} />
    <path d="M 40 -70 l 40 0 l -40 40 Z" fill={shade(COLORS.yellowSoft, -0.08)} {...sm} />
    {/* a little heart */}
    <path d="M 0 -6 C -18 -28 -48 -12 -24 14 L 0 38 L 24 14 C 48 -12 18 -28 0 -6 Z" fill={COLORS.pink} {...sm} />
    <path d="M -54 -40 l 70 0 M -54 56 l 90 0" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />
    <text x={0} y={122} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>be kind, start small</text>
  </g>
);
