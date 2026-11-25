/**
 * forgiveness.tsx — ALL-NEW art for "The Psychology of Forgiveness". The cost
 * (carrying-coal, grudge-weight, replay-wound), the myths (forgive-myths,
 * no-apology-needed), the release (let-it-go, empathy-lens, unclench-heart,
 * forgive-boundary), and self (self-forgive). Token strokes, centered on origin,
 * ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** carrying-coal — a hand clutching a glowing hot coal, burning itself. */
export const CarryingCoal: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {/* clenched hand */}
      <path d="M -50 40 Q -60 -10 -20 -16 L 40 -16 Q 60 -10 54 20 Q 50 44 20 44 Z" fill={COLORS.skin} {...xl} />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={-14 + i * 20} y1={-16} x2={-14 + i * 20} y2={10} stroke={shade(COLORS.skin, -0.08)} strokeWidth={STROKE.sm} />)}
      {/* the hot coal */}
      <circle cx={6} cy={-2} r={24 + glow * 4} fill={COLORS.red} opacity={0.4 + glow * 0.4} />
      <circle cx={6} cy={-2} r={18} fill={shade(COLORS.red, -0.04)} {...sm} />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-6 + i * 12} -20 q 2 -10 -2 -18`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(f / 4 + i)} />)}
      <Label t="the grudge burns you" />
    </g>
  );
};

/** grudge-weight — a figure hunched under a huge backpack of heavy grey rocks. */
export const GrudgeWeight: React.FC = () => {
  const f = useCurrentFrame();
  const strain = 2 * Math.sin(f / 8);
  return (
    <g transform={`translate(0 ${strain})`}>
      {/* bent figure */}
      <circle cx={-10} cy={-10} r={26} fill={COLORS.skin} {...lg} transform="rotate(14 -10 -10)" />
      <circle cx={-20} cy={-12} r={4} fill={COLORS.outline} /><circle cx={-4} cy={-14} r={4} fill={COLORS.outline} />
      <path d="M -20 0 Q -12 4 -4 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -36 60 Q -40 8 2 4 Q 36 2 30 60 Z" fill={COLORS.sky} {...xl} transform="rotate(10 0 30)" />
      {/* heavy pack of rocks */}
      <g transform="translate(34 -24)">
        <rect x={-30} y={-36} width={70} height={80} rx={10} fill={shade(COLORS.navy, 0.1)} {...xl} />
        {[[-10, -18], [16, -8], [-6, 16]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={13} fill={shade(COLORS.ledGrey, 0.1)} {...sm} />)}
      </g>
      <Label t="resentment is heavy to carry" />
    </g>
  );
};

/** forgive-myths — three myth words with red strike-throughs. */
export const ForgiveMyths: React.FC = () => {
  const f = useCurrentFrame();
  const cross = Math.floor((f / 20) % 4);
  const myths = ['forgetting', 'excusing', 'reconciling'];
  return (
    <g>
      {myths.map((m, i) => (
        <g key={i} transform={`translate(0 ${-50 + i * 50})`}>
          <rect x={-100} y={-20} width={200} height={40} rx={10} fill={COLORS.white} {...lg} />
          <text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={i < cross ? COLORS.ledGrey : COLORS.outline}>{m}</text>
          {i < cross && <line x1={-96} y1={0} x2={96} y2={0} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />}
        </g>
      ))}
      <Label t="forgiving isn't any of these" />
    </g>
  );
};

/** replay-wound — a little film reel looping a jagged hurt frame, keeping it open. */
export const ReplayWound: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 2;
  return (
    <g>
      <circle cx={0} cy={0} r={56} fill={COLORS.white} {...xl} />
      <g transform={`rotate(${spin})`}>{Array.from({ length: 6 }).map((_, i) => { const a = (i / 6) * Math.PI * 2; return <rect key={i} x={-9} y={-52} width={18} height={16} rx={3} fill={shade(COLORS.navy, 0.1)} transform={`rotate(${(i / 6) * 360}) translate(0 0)`} />; })}</g>
      <circle cx={0} cy={0} r={30} fill={shade(COLORS.red, 0.04)} {...lg} />
      {/* jagged wound mark */}
      <path d="M -10 -14 l 6 10 l -8 6 l 10 12" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      {/* loop arrow */}
      <path d="M 54 -20 a 60 60 0 1 1 -16 -34" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeDasharray="5 7" />
      <path d="M 44 -58 l -6 14 l 16 -2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <Label t="replaying keeps it open" />
    </g>
  );
};

/** let-it-go — an open palm releasing a little bird / paper into the air. */
export const LetItGo: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (f % 60) / 60;
  return (
    <g>
      {/* open, relaxed hand */}
      <path d="M -50 60 Q -56 10 -16 6 L 30 6 Q 52 8 48 34 Q 44 58 16 58 Z" fill={COLORS.skin} {...xl} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-10 + i * 18} 6 q -2 -16 2 -26`} fill="none" stroke={shade(COLORS.skin, -0.08)} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
      {/* bird rising */}
      <g transform={`translate(${6 + rise * 20} ${-20 - rise * 70})`} opacity={1 - rise * 0.5}>
        <path d="M -20 0 Q -8 -14 0 0 Q 8 -14 20 0" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" />
      </g>
      {[0, 1].map((i) => <circle key={i} cx={-6 + i * 24} cy={-30 - i * 20} r={4} fill={COLORS.sky} opacity={0.5} />)}
      <Label t="let it go — for you" />
    </g>
  );
};

/** empathy-lens — a lens over a prickly figure revealing a hurt one inside. */
export const EmpathyLens: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 4 * Math.sin(f / 10);
  return (
    <g>
      {/* the angry/prickly outer face */}
      <circle cx={-10} cy={-6} r={48} fill={shade(COLORS.red, 0.06)} {...xl} />
      {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={-10 + Math.cos(a) * 48} y1={-6 + Math.sin(a) * 48} x2={-10 + Math.cos(a) * 60} y2={-6 + Math.sin(a) * 60} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />; })}
      <path d="M -28 -16 L -16 -10 M 8 -16 L -4 -10" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* lens revealing the hurt child inside */}
      <g transform={`translate(${34 + drift} 20)`}>
        <circle cx={0} cy={0} r={34} fill={COLORS.white} opacity={0.3} />
        <circle cx={0} cy={0} r={34} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} />
        <circle cx={0} cy={-2} r={9} fill={COLORS.outline} opacity={0} />
        <circle cx={-7} cy={-3} r={3} fill={COLORS.outline} /><circle cx={7} cy={-3} r={3} fill={COLORS.outline} />
        <path d="M -8 10 Q 0 4 8 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M 14 -12 q 4 8 0 14" fill={COLORS.sky} opacity={0.7} />
        <line x1={24} y1={24} x2={50} y2={50} stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      </g>
      <Label t="hurt people hurt people" />
    </g>
  );
};

/** forgive-boundary — a released heart beside a firm fence/gate: forgive AND protect. */
export const ForgiveBoundary: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      {/* released heart */}
      <g transform="translate(-54 0)">
        <path d="M 0 30 q -34 -24 -34 -46 q 0 -16 16 -16 q 10 0 18 12 q 8 -12 18 -12 q 16 0 16 16 q 0 22 -34 46 Z" fill={COLORS.pink} opacity={0.5 + glow * 0.3} {...lg} transform="translate(0 -6)" />
        <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.pinkDark}>let go</text>
      </g>
      {/* fence with a closed gate */}
      <g transform="translate(56 0)">
        {[-30, 0, 30].map((x, i) => <g key={i}><rect x={x - 7} y={-40} width={14} height={80} rx={4} fill={COLORS.woodDark} {...lg} /><path d={`M ${x} -40 l 0 -10`} stroke={COLORS.woodDark} strokeWidth={STROKE.sm} /></g>)}
        <rect x={-38} y={-18} width={76} height={12} rx={4} fill={COLORS.woodDark} />
        <rect x={-38} y={14} width={76} height={12} rx={4} fill={COLORS.woodDark} />
        <circle cx={14} cy={4} r={6} fill={COLORS.yellow} {...sm} />
        <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>but protect</text>
      </g>
      <Label t="forgive — and keep the boundary" />
    </g>
  );
};

/** unclench-heart — a clenched fist opening into a soft, relaxed heart. */
export const UnclenchHeart: React.FC = () => {
  const f = useCurrentFrame();
  const open = 0.5 + 0.5 * Math.sin(f / 16);
  return (
    <g>
      {/* glow of release */}
      <circle cx={0} cy={0} r={56} fill={COLORS.pink} opacity={0.1 + open * 0.2} />
      {/* heart that softens as it opens */}
      <path d="M 0 36 q -46 -34 -46 -58 q 0 -20 22 -20 q 14 0 24 16 q 10 -16 24 -16 q 22 0 22 20 q 0 24 -46 58 Z" fill={shade(COLORS.red, 0.04 - open * 0.04)} {...xl} transform={`translate(0 -6) scale(${0.86 + open * 0.14})`} />
      {/* cracks relaxing open */}
      <path d={`M 0 ${-40 + open * 4} l ${-6 - open * 4} 20 l ${8} 8 l ${-6} 14`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-30 + i * 30} -64 q 4 -8 0 -16`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={open * 0.7} />)}
      <Label t="the heart unclenches" />
    </g>
  );
};

/** self-forgive — a figure gently placing a hand on their own shoulder, head bowed. */
export const SelfForgive: React.FC = () => {
  const f = useCurrentFrame();
  const breathe = 1 * Math.sin(f / 12);
  return (
    <g transform={`translate(0 ${breathe})`}>
      <circle cx={0} cy={-46} r={34} fill={COLORS.skin} {...xl} />
      {/* gentle closed eyes + soft mouth */}
      <path d="M -18 -50 Q -10 -44 -2 -50 M 2 -50 Q 10 -44 18 -50" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -10 -32 Q 0 -27 10 -32" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -40 50 Q -44 -6 0 -6 Q 44 -6 40 50 Z" fill={COLORS.greenTeal} {...xl} />
      {/* own arm hugging across to the shoulder */}
      <path d="M 34 44 Q 2 30 -26 2" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -26 2 q -10 -6 -6 -14 q 10 -2 14 10 Z" fill={COLORS.skin} {...sm} />
      <Label t="forgive yourself too" />
    </g>
  );
};

/** no-apology-needed — a 'sorry' bubble crossed out, with forgiveness granted anyway. */
export const NoApologyNeeded: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {/* the absent apology */}
      <g transform="translate(-50 -6)">
        <rect x={-50} y={-26} width={100} height={48} rx={12} fill={COLORS.white} {...lg} />
        <path d="M -20 22 l 8 16 l 10 -16 Z" fill={COLORS.white} {...lg} />
        <text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.ledGrey}>"sorry"</text>
        <line x1={-46} y1={-22} x2={46} y2={26} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* forgiveness granted anyway */}
      <g transform="translate(56 2)">
        <circle cx={0} cy={0} r={34} fill={COLORS.greenTeal} opacity={0.3 + glow * 0.3} />
        <path d="M -16 0 l 8 10 l 18 -22" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Label t="you don't need their sorry" />
    </g>
  );
};
