/**
 * grief.tsx — ALL-NEW art for "Every Stage of Grief Explained". One gentle emblem
 * per stage: denial, anger, bargaining, depression, acceptance, and the sixth
 * stage, meaning — plus the waves of grief, the non-linear path, and the
 * ball-in-a-box metaphor. Soft, compassionate, token strokes, centered, ~300px.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; mood?: 'blank' | 'sad' | 'calm' | 'angry' }> = ({ r = 40, c = COLORS.white, mood = 'blank' }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    {mood === 'angry'
      ? <><path d={`M ${-r * 0.5} ${-r * 1.2} l ${r * 0.3} ${r * 0.12} M ${r * 0.5} ${-r * 1.2} l ${-r * 0.3} ${r * 0.12}`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><circle cx={-r * 0.32} cy={-r * 1.0} r={r * 0.12} fill={COLORS.outline} /><circle cx={r * 0.32} cy={-r * 1.0} r={r * 0.12} fill={COLORS.outline} /></>
      : <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.13} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.13} fill={COLORS.outline} /></>}
    {mood === 'sad' && <path d={`M ${-r * 0.3} ${-r * 0.68} q ${r * 0.3} ${-r * 0.22} ${r * 0.6} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    {mood === 'calm' && <path d={`M ${-r * 0.3} ${-r * 0.78} q ${r * 0.3} ${r * 0.16} ${r * 0.6} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 132 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** DENIAL — a blank figure behind a foggy pane: "this isn't happening". */
export const GriefDenial: React.FC = () => (
  <g>
    <g transform="translate(0 20)"><Fig r={42} c={COLORS.white} mood="blank" /></g>
    <rect x={-96} y={-90} width={192} height={180} rx={10} fill={COLORS.sky} opacity={0.35} {...lg} />
    <path d="M -70 -60 l 40 -10 M -40 20 l 50 -14 M 20 -40 l 40 -8" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
    <Label t="DENIAL" />
  </g>
);

/** ANGER — a figure with clenched fists and a flare of heat. */
export const GriefAnger: React.FC = () => {
  const f = useCurrentFrame();
  const sh = 3 * Math.sin(f / 2.5);
  return (
    <g transform={`translate(${sh} 0)`}>
      {[-60, 60].map((x, i) => <path key={i} d={`M ${x} -96 q ${i ? 10 : -10} -18 0 -32`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />)}
      <g transform="translate(0 20)"><Fig r={42} c={shade(COLORS.red, 0.14)} mood="angry" /></g>
      <circle cx={-70} cy={30} r={18} fill={COLORS.skin} {...lg} /><circle cx={70} cy={30} r={18} fill={COLORS.skin} {...lg} />
      <Label t="ANGER" />
    </g>
  );
};

/** BARGAINING — pleading, clasped hands and a whispered "if only". */
export const GriefBargaining: React.FC = () => (
  <g>
    <g transform="translate(0 20)"><Fig r={40} c={COLORS.white} mood="sad" /></g>
    <path d="M -34 44 q 34 -30 68 0 q -34 24 -68 0 Z" fill={COLORS.skin} {...xl} />
    <g transform="translate(58 -54)"><rect x={-40} y={-20} width={80} height={36} rx={10} fill={COLORS.white} {...sm} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>if only</text></g>
    <Label t="BARGAINING" />
  </g>
);

/** DEPRESSION — a slumped figure under a heavy grey weight. */
export const GriefDepression: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <g transform="translate(0 30) scale(0.95)"><Fig r={40} c={shade(COLORS.white, 0.05)} mood="sad" /></g>
      <g transform="translate(0 -62)"><ellipse cx={-30} cy={0} rx={44} ry={32} fill={COLORS.ledGrey} {...lg} /><ellipse cx={32} cy={-6} rx={50} ry={36} fill={COLORS.ledGrey} {...lg} /><ellipse cx={0} cy={14} rx={60} ry={32} fill={shade(COLORS.ledGrey, -0.06)} {...sm} /></g>
      {[-30, 0, 30].map((x, i) => <line key={x} x1={x} y1={-24 + (f % 24)} x2={x - 4} y2={-6 + (f % 24)} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />)}
      <Label t="DEPRESSION" />
    </g>
  );
};

/** ACCEPTANCE — a calm figure at a quiet shore, a gentle sun. */
export const GriefAcceptance: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.2 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={30} cy={-56} r={34} fill={COLORS.yellow} opacity={g} {...sm} />
      <g transform="translate(0 20)"><Fig r={42} c={COLORS.white} mood="calm" /></g>
      <path d="M -100 64 q 40 -14 80 0 q 40 14 80 0 q 40 -14 40 0" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />
      <Label t="ACCEPTANCE" />
    </g>
  );
};

/** MEANING — a candle of remembrance, the sixth stage. */
export const GriefMeaning: React.FC = () => {
  const f = useCurrentFrame();
  const fl = 1 + 0.2 * Math.sin(f / 4);
  return (
    <g>
      <circle cx={0} cy={-40} r={60} fill={COLORS.yellowSoft} opacity={0.4} />
      <rect x={-20} y={-20} width={40} height={90} rx={8} fill={COLORS.white} {...lg} />
      <line x1={0} y1={-20} x2={0} y2={-38} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <g transform={`translate(0 -58) scale(${fl})`}><path d="M 0 -28 Q 16 -6 0 16 Q -16 -6 0 -28 Z" fill={COLORS.yellow} {...sm} /></g>
      <path d="M -64 70 q 24 -14 50 0 M 64 70 q -24 -14 -50 0" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="MEANING" />
    </g>
  );
};

/** The waves of grief — it comes in waves, not neat stages. */
export const GriefWaves: React.FC = () => {
  const f = useCurrentFrame();
  const pts = Array.from({ length: 60 }).map((_, i) => { const x = -140 + i * 4.7; const y = -Math.sin(i / 4 + f / 14) * (50 - i * 0.5) ; return `${x},${y}`; });
  return (
    <g>
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -150 60 L 150 60" stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={0.4} />
      <Label t="it comes in waves" />
    </g>
  );
};

/** The non-linear path — the messy real route, not a straight line. */
export const MessyPath: React.FC = () => (
  <g>
    <path d="M -120 60 q 40 -140 70 -40 q 20 90 50 -20 q 20 -70 60 20 q 10 60 40 -40" fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <circle cx={-120} cy={60} r={12} fill={COLORS.red} {...sm} />
    <circle cx={140} cy={-40} r={12} fill={COLORS.greenLeaf} {...sm} />
    <Label t="never a straight line" />
  </g>
);

/** Ball in a box — grief is the ball, the pain the button; the box stays the
 *  same size while the ball (over time) shrinks. */
export const BallInBox: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 90) / 90;
  const r = 60 - t * 20;
  const bx = -40 + Math.sin(f / 10) * 40;
  return (
    <g>
      <rect x={-96} y={-80} width={192} height={160} rx={10} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} />
      {/* the pain button */}
      <circle cx={60} cy={60} r={18} fill={COLORS.red} {...lg} />
      {/* the grief ball */}
      <g transform={`translate(${bx} ${0})`}><circle r={r} fill={COLORS.sky} {...lg} />{Math.abs(bx - 60) < r + 18 && <path d="M -10 -4 l 8 8 l 12 -14" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" transform="translate(50 50)" />}</g>
      <Label t="the ball in the box" />
    </g>
  );
};

/** Carry it forward — grief is love with nowhere to go; carried, not erased. */
export const CarryGrief: React.FC = () => (
  <g>
    <g transform="translate(-10 20)"><Fig r={40} c={COLORS.white} mood="calm" /></g>
    {/* a small glowing heart held close */}
    <g transform="translate(44 36)"><circle r={34} fill={COLORS.yellowSoft} opacity={0.5} /><path d="M 0 18 C -22 -4 -36 -18 -20 -34 C -8 -46 0 -30 0 -20 C 0 -30 8 -46 20 -34 C 36 -18 22 -4 0 18 Z" fill={COLORS.red} {...lg} /></g>
    <Label t="carried, not erased" />
  </g>
);
