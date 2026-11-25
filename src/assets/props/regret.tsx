/**
 * regret.tsx — ALL-NEW art for "The Psychology of Regret". What it is (if-only-fork,
 * road-not-taken, regret-weight), the patterns (did-vs-didnt, silver-medal), its
 * purpose (regret-compass, lesson-gem), the shadow (regret-spiral), and the healing
 * (self-forgive-hand, take-the-leap). Token strokes, centered on origin, ~300px tall.
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
const Head: React.FC<{ r?: number; c?: string; sad?: boolean }> = ({ r = 40, c = COLORS.white, sad = true }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={c} {...xl} />
    <circle cx={-r * 0.3} cy={-r * 0.04} r={r * 0.1} fill={COLORS.outline} /><circle cx={r * 0.3} cy={-r * 0.04} r={r * 0.1} fill={COLORS.outline} />
    {sad
      ? <path d={`M ${-r * 0.24} ${r * 0.42} Q 0 ${r * 0.24} ${r * 0.24} ${r * 0.42}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : <path d={`M ${-r * 0.24} ${r * 0.32} Q 0 ${r * 0.5} ${r * 0.24} ${r * 0.32}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);

/** If-only-fork — a path taken (solid), and a glowing "what if" path not taken. */
export const IfOnlyFork: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* the shared start */}
      <path d="M 0 80 L 0 20" fill="none" stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* taken path (dull) */}
      <path d="M 0 20 L -60 -50" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <g transform="translate(-60 -56)"><Head r={20} sad /></g>
      {/* 'what if' path (glowing) */}
      <path d="M 0 20 L 60 -50" fill="none" stroke={COLORS.yellowSoft} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="6 8" opacity={0.6 + g} />
      <g transform="translate(60 -56)" opacity={0.5 + g * 0.5}><circle cx={0} cy={0} r={20} fill={COLORS.yellowSoft} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>?</text></g>
      <Label t="'if only I'd...'" />
    </g>
  );
};

/** Road-not-taken — two diverging roads into the distance. */
export const RoadNotTaken: React.FC = () => (
  <g>
    {/* a Y of two roads receding */}
    <path d="M -14 80 L -50 -50 L -30 -50 L 2 60 Z" fill={shade(COLORS.wood, 0.1)} {...lg} />
    <path d="M 14 80 L 50 -50 L 30 -50 L -2 60 Z" fill={shade(COLORS.ledGrey, 0.1)} {...lg} opacity={0.6} />
    {[0, 1, 2].map((i) => <rect key={i} x={-40 + i * 6} y={-40 + i * 36} width={8} height={18} rx={3} fill={COLORS.yellowSoft} />)}
    {/* a signpost */}
    <g transform="translate(0 -40)"><rect x={-4} y={0} width={8} height={70} fill={COLORS.woodDark} /><path d="M -4 6 l -46 0 l 10 -8 m -10 8 l 10 8" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /><path d="M 4 20 l 46 0 l -10 -8 m 10 8 l -10 8" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
    <Label t="the road not taken" />
  </g>
);

/** Regret-weight — a figure carrying a heavy backpack of stones. */
export const RegretWeight: React.FC = () => {
  const f = useCurrentFrame();
  const sag = 2 + Math.sin(f / 5);
  return (
    <g transform={`translate(0 ${sag})`}>
      <g transform="translate(-10 -20)"><Head r={34} sad /></g>
      <path d="M -44 70 Q -48 16 0 12 Q 48 16 44 70 Z" fill={COLORS.hoodie} {...xl} />
      {/* heavy backpack of stones */}
      <g transform="translate(40 20)"><rect x={-26} y={-30} width={56} height={70} rx={10} fill={shade(COLORS.outline, 0.3)} {...xl} />{[-10, 10, 0].map((x, i) => <circle key={i} cx={x} cy={-6 + (i % 2) * 18} r={10} fill={shade(COLORS.ledGrey, -0.05)} {...sm} />)}</g>
      {/* strain line */}
      <path d="M -40 -40 q 8 -8 16 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="the weight we carry" />
    </g>
  );
};

/** Did-vs-didnt — a scale weighing a done action vs an untaken one. */
export const DidVsDidnt: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = 6 * Math.sin(f / 10) - 4; // leans toward 'didn't'
  return (
    <g>
      <line x1={0} y1={-70} x2={0} y2={60} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <g transform={`rotate(${tilt})`}>
        <line x1={-90} y1={-60} x2={90} y2={-60} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        {/* did */}
        <g transform="translate(-90 -30)"><rect x={-40} y={-8} width={80} height={44} rx={8} fill={COLORS.sky} {...lg} /><text x={0} y={20} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.outline}>did</text></g>
        {/* didn't (heavier) */}
        <g transform="translate(90 -14)"><rect x={-48} y={-10} width={96} height={56} rx={8} fill={COLORS.red} {...lg} /><text x={0} y={24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.white}>didn't</text></g>
      </g>
      <Label t="we regret what we didn't do" />
    </g>
  );
};

/** Silver-medal — a silver medalist looking up, wistful (the near miss). */
export const SilverMedal: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* medal */}
      <path d="M -10 -70 l 20 0 l 10 30 l -40 0 Z" fill={COLORS.sky} opacity={0.5} {...sm} />
      <circle cx={0} cy={-6} r={44} fill={COLORS.ledGrey} {...xl} />
      <circle cx={0} cy={-6} r={30} fill={shade(COLORS.ledGrey, 0.12)} {...sm} />
      <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.white}>2</text>
      {/* a wistful upward glance '...gold' */}
      <text x={56} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.yellowDark}>so close...</text>
      <Label t="silver stings more than bronze" />
    </g>
  );
};

/** Regret-compass — regret's needle pointing toward your values. */
export const RegretCompass: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 8) * 0.3 - 0.5;
  return (
    <g>
      <circle cx={0} cy={0} r={72} fill={COLORS.greenLeaf} opacity={0.25} {...xl} />
      <circle cx={0} cy={0} r={72} fill="none" {...xl} />
      <text x={0} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>what you value</text>
      <g transform={`rotate(${(a * 180) / Math.PI})`}><path d="M 0 -44 l 10 44 l -10 -10 l -10 10 Z" fill={COLORS.greenDark} {...sm} /></g>
      <circle cx={0} cy={0} r={8} fill={COLORS.outline} />
      <Label t="regret points to your values" />
    </g>
  );
};

/** Lesson-gem — a gem mined out of a cracked stone of regret. */
export const LessonGem: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {/* the rough stone (the regret) */}
      <path d="M -70 20 L -40 -30 L 20 -40 L 60 0 L 40 50 L -30 56 Z" fill={shade(COLORS.outline, 0.3)} {...xl} />
      {/* the gem inside, glowing */}
      <g transform="translate(6 4)"><path d="M -22 -6 L 0 -26 L 22 -6 L 0 30 Z" fill={COLORS.greenLeaf} {...lg} /><path d="M -22 -6 L 22 -6 M 0 -26 L 0 30" stroke={shade(COLORS.greenLeaf, -0.1)} strokeWidth={STROKE.sm} /><g opacity={g}>{[0, 1, 2].map((i) => <line key={i} x1={28 + i * 6} y1={-16 + i * 4} x2={40 + i * 6} y2={-20 + i * 4} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g></g>
      <Label t="mine the lesson from it" />
    </g>
  );
};

/** Regret-spiral — a figure sinking into a toxic downward spiral. */
export const RegretSpiral: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 3;
  return (
    <g>
      <g transform={`rotate(${spin})`}>
        <path d="M 0 -76 A 76 76 0 0 1 60 48 A 50 50 0 0 1 -40 32 A 28 28 0 0 1 8 10" fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.7} />
      </g>
      <g transform="translate(0 8)"><Head r={28} sad /></g>
      {/* repeating 'if only' bubbles */}
      {[0, 1, 2].map((i) => <text key={i} x={Math.cos(i * 2.1) * 70} y={Math.sin(i * 2.1) * 56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.red} opacity={0.6}>if only</text>)}
      <Label t="when it becomes a spiral" />
    </g>
  );
};

/** Self-forgive-hand — a kind hand resting on a shoulder: self-compassion. */
export const SelfForgiveHand: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* figure */}
      <g transform="translate(-14 0)"><Head r={40} sad={false} /><path d="M -44 80 Q -48 24 0 20 Q 48 24 44 80 Z" fill={COLORS.hoodie} {...xl} /></g>
      {/* a warm hand on the shoulder */}
      <g transform="translate(34 30)" opacity={0.8}><path d="M -30 20 Q -34 -14 -10 -18 L -10 -28 Q -2 -38 6 -28 L 6 -20 Q 14 -40 22 -20 L 22 -10 Q 36 -12 40 10 Q 44 36 14 44 Z" fill={COLORS.skin} {...lg} strokeLinejoin="round" /></g>
      {/* warmth glow */}
      {[0, 1, 2].map((i) => <circle key={i} cx={34} cy={24} r={30 + i * 10} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} opacity={(g - i * 0.2) * 0.4} />)}
      <Label t="be kind to past you" />
    </g>
  );
};

/** Take-the-leap — a figure leaping toward a bright future (acting on regret). */
export const TakeTheLeap: React.FC = () => {
  const f = useCurrentFrame();
  const hop = Math.abs(Math.sin(f / 6)) * 16;
  return (
    <g>
      {/* ledge behind */}
      <rect x={-96} y={50} width={60} height={30} rx={6} fill={shade(COLORS.wood, 0.1)} {...lg} />
      {/* bright ledge ahead */}
      <rect x={44} y={30} width={60} height={30} rx={6} fill={COLORS.greenLeaf} {...lg} />
      {/* the leaper */}
      <g transform={`translate(-6 ${30 - hop})`}><Head r={30} sad={false} /><path d="M -34 60 Q -38 12 0 8 Q 38 12 34 60 Z" fill={COLORS.hoodie} {...xl} /><path d="M -30 30 l -26 -16 M 30 30 l 28 -18" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      {/* spark of courage */}
      <path d="M 78 8 l 3 9 l 9 3 l -9 3 l -3 9 l -3 -9 l -9 -3 l 9 -3 Z" fill={COLORS.yellow} />
      <Label t="then act on it" />
    </g>
  );
};
