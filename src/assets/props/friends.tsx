/**
 * friends.tsx — ALL-NEW art for "The Psychology of People Who Struggle to Make
 * Friends". Why it's hard (lonely-bench, friend-factory-closed, hours-jar,
 * repeat-bump), the hidden traps (liking-gap-scale, approach-standoff,
 * rejection-armor), and what works (open-up-ladder, one-good-friend, first-move).
 * Token strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A little person — head + shoulders — in a chosen colour. */
const Person: React.FC<{ r?: number; c?: string; happy?: boolean; flip?: boolean }> = ({ r = 34, c = COLORS.white, happy = true, flip = false }) => (
  <g transform={flip ? 'scale(-1 1)' : undefined}>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <path d={`M ${-r * 1.15} ${r * 1.1} Q 0 ${-r * 0.2} ${r * 1.15} ${r * 1.1} Z`} fill={shade(c, 0.1)} {...lg} />
    <circle cx={-r * 0.32} cy={-r * 1.08} r={r * 0.12} fill={COLORS.outline} /><circle cx={r * 0.32} cy={-r * 1.08} r={r * 0.12} fill={COLORS.outline} />
    {happy
      ? <path d={`M ${-r * 0.3} ${-r * 0.74} Q 0 ${-r * 0.44} ${r * 0.3} ${-r * 0.74}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : <path d={`M ${-r * 0.26} ${-r * 0.6} Q 0 ${-r * 0.78} ${r * 0.26} ${-r * 0.6}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Lonely-bench — one figure on a bench while a cluster chats far away. */
export const LonelyBench: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* distant chatting cluster */}
      <g transform="translate(70 -30) scale(0.7)" opacity={0.6}>
        {[-28, 0, 28].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><Person r={22} c={[COLORS.pink, COLORS.sky, COLORS.yellow][i]} /></g>)}
        <path d="M -30 -46 q 10 -8 20 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(f / 6)} />
      </g>
      {/* the bench + lone figure */}
      <g transform="translate(-60 20)"><Person r={30} c={COLORS.white} happy={false} /><rect x={-56} y={30} width={112} height={14} rx={4} fill={COLORS.wood} {...sm} /><rect x={-50} y={44} width={10} height={26} fill={COLORS.woodDark} /><rect x={40} y={44} width={10} height={26} fill={COLORS.woodDark} /></g>
      <Label t="watching from the edge" />
    </g>
  );
};

/** Friend-factory-closed — the school/uni "friend factory" with a CLOSED sign. */
export const FriendFactoryClosed: React.FC = () => (
  <g>
    <rect x={-80} y={-40} width={160} height={110} rx={8} fill={shade(COLORS.red, 0.06)} {...xl} />
    <path d="M -92 -40 L 0 -96 L 92 -40 Z" fill={COLORS.redDark} {...lg} />
    {/* shuttered door + windows */}
    <rect x={-24} y={6} width={48} height={64} rx={6} fill={COLORS.woodDark} {...lg} />
    {[-54, 34].map((x, i) => <rect key={i} x={x} y={-16} width={40} height={34} rx={4} fill={shade(COLORS.outline, 0.3)} {...sm} />)}
    {/* CLOSED banner */}
    <g transform="rotate(-8)"><rect x={-74} y={16} width={148} height={30} rx={6} fill={COLORS.outline} /><text x={0} y={38} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.white}>CLOSED</text></g>
    <Label t="the friend factory shut" />
  </g>
);

/** Hours-jar — a jar slowly filling with hours, friendship forming at the top. */
export const HoursJar: React.FC = () => {
  const f = useCurrentFrame();
  const fill = 0.55 + 0.1 * Math.sin(f / 16);
  return (
    <g>
      <path d="M -54 -56 L -54 60 Q 0 78 54 60 L 54 -56" fill="none" {...xl} />
      <rect x={-60} y={-66} width={120} height={16} rx={6} fill={COLORS.wood} {...lg} />
      {/* liquid hours */}
      <path d={`M -52 ${60 - fill * 110} Q 0 ${50 - fill * 110} 52 ${60 - fill * 110} L 52 56 Q 0 72 -52 56 Z`} fill={COLORS.sky} opacity={0.8} />
      {/* clock icons bobbing inside */}
      {[[-20, 20], [18, 36], [0, 4]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={0} r={11} fill={COLORS.white} {...sm} /><path d="M 0 0 l 0 -6 M 0 0 l 5 2" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>)}
      <text x={0} y={-74} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>hours together</text>
      <Label t="friendship takes time" />
    </g>
  );
};

/** Repeat-bump — two figures bumping into each other again and again. */
export const RepeatBump: React.FC = () => {
  const f = useCurrentFrame();
  const d = 18 * Math.abs(Math.sin(f / 10));
  return (
    <g>
      <g transform={`translate(${-40 - d} 0)`}><Person r={30} c={COLORS.pink} /></g>
      <g transform={`translate(${40 + d} 0)`}><Person r={30} c={COLORS.sky} flip /></g>
      {/* familiarity sparks where they meet */}
      {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={-30 + (i - 1) * 16} r={5} fill={COLORS.yellow} opacity={1 - d / 20} />)}
      <text x={0} y={-66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>again... and again</text>
      <Label t="repeated run-ins" />
    </g>
  );
};

/** Liking-gap-scale — a gauge: how much they like you vs how much you think. */
export const LikingGapScale: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {/* your guess (low) */}
      <g transform="translate(-60 0)"><rect x={-24} y={-70} width={48} height={120} rx={8} fill={shade(COLORS.white, 0.1)} {...lg} /><rect x={-18} y={10} width={36} height={38} rx={5} fill={COLORS.ledGrey} /><text x={0} y={72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>you think</text></g>
      {/* reality (high) */}
      <g transform="translate(60 0)"><rect x={-24} y={-70} width={48} height={120} rx={8} fill={shade(COLORS.white, 0.1)} {...lg} /><rect x={-18} y={-58} width={36} height={106} rx={5} fill={COLORS.pink} opacity={0.9} /><path d="M 0 -34 q -6 -7 -10 -1 q -3 5 10 11 q 13 -6 10 -11 q -4 -6 -10 1 Z" fill={COLORS.white} opacity={g} /><text x={0} y={72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>they do</text></g>
      <path d="M -36 -40 Q 0 -64 36 -72" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeDasharray="4 8" />
      <Label t="they like you more" />
    </g>
  );
};

/** Approach-standoff — two figures each waiting for the other to come over. */
export const ApproachStandoff: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 6 * Math.sin(f / 12);
  return (
    <g>
      <g transform={`translate(${-78 + sway * 0.2} 0)`}><Person r={30} c={COLORS.lavender} happy={false} /></g>
      <g transform={`translate(${78 - sway * 0.2} 0)`}><Person r={30} c={COLORS.greenTeal} happy={false} flip /></g>
      {/* two thought bubbles: 'they're not interested' */}
      {[-78, 78].map((x, i) => <g key={i} transform={`translate(${x} -78)`}><ellipse cx={0} cy={0} rx={30} ry={20} fill={COLORS.white} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>...?</text><circle cx={0} cy={20} r={5} fill={COLORS.white} {...sm} /></g>)}
      {/* arrows that stop short of each other */}
      <path d="M -40 10 l 24 0 M -18 4 l 6 6 l -6 6" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      <path d="M 40 10 l -24 0 M 18 4 l -6 6 l 6 6" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      <Label t="both waiting to be asked" />
    </g>
  );
};

/** Rejection-armor — a figure shut inside heavy armour, braced for a 'no'. */
export const RejectionArmor: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* bulky armour plates around a small worried figure */}
      <rect x={-64} y={-20} width={128} height={110} rx={20} fill={shade(COLORS.ledGrey, -0.05)} {...xl} />
      <line x1={-64} y1={20} x2={64} y2={20} stroke={shade(COLORS.ledGrey, -0.2)} strokeWidth={STROKE.lg} />
      <line x1={0} y1={-20} x2={0} y2={90} stroke={shade(COLORS.ledGrey, -0.2)} strokeWidth={STROKE.lg} />
      {/* visor with wary eyes */}
      <rect x={-40} y={-66} width={80} height={54} rx={14} fill={shade(COLORS.ledGrey, 0.04)} {...xl} />
      <rect x={-30} y={-48} width={60} height={14} rx={7} fill={COLORS.outline} />
      <circle cx={-14} cy={-41} r={4} fill={COLORS.sky} /><circle cx={14} cy={-41} r={4} fill={COLORS.sky} />
      {/* bouncing-off hearts (warmth deflected) */}
      {[-86, 86].map((x, i) => <path key={i} d={`M ${x} ${-10 + 8 * Math.sin(f / 5 + i)} q -6 -7 -10 -1 q -3 5 10 11 q 13 -6 10 -11 q -4 -6 -10 1 Z`} fill={COLORS.pink} opacity={0.5} />)}
      <Label t="braced for a 'no'" />
    </g>
  );
};

/** Open-up-ladder — peeling back layers toward something real (self-disclosure). */
export const OpenUpLadder: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* nested rings from small-talk (outer) to real (inner, glowing) */}
      {[[86, COLORS.ledGrey, 'small talk'], [60, COLORS.sky, 'opinions'], [34, COLORS.pink, 'feelings']].map(([r, c, lab], i) => (
        <g key={i}><circle cx={0} cy={0} r={r as number} fill="none" stroke={c as string} strokeWidth={STROKE.lg} opacity={0.8} /><text x={0} y={(-(r as number)) + 2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={12} fill={COLORS.outline}>{lab as string}</text></g>
      ))}
      <circle cx={0} cy={0} r={14} fill={COLORS.yellow} opacity={glow} />
      <circle cx={0} cy={0} r={14} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} />
      <Label t="open up, a little at a time" />
    </g>
  );
};

/** One-good-friend — two close figures, outshining a faint crowd of acquaintances. */
export const OneGoodFriend: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      {/* faint crowd behind */}
      {[-110, -78, 84, 112].map((x, i) => <g key={i} transform={`translate(${x} 10) scale(0.6)`} opacity={0.35}><Person r={26} c={COLORS.ledGrey} /></g>)}
      {/* the two close friends, glowing heart between */}
      <g transform="translate(-34 6)"><Person r={32} c={COLORS.pink} /></g>
      <g transform="translate(34 6)"><Person r={32} c={COLORS.sky} flip /></g>
      <path d="M 0 -30 q -9 -10 -15 -1 q -4 7 15 17 q 19 -10 15 -17 q -6 -9 -15 1 Z" fill={COLORS.red} {...sm} opacity={0.7 + g * 0.3} />
      <Label t="one real friend is plenty" />
    </g>
  );
};

/** First-move — a friendly hand extended / a wave: taking the initiative. */
export const FirstMove: React.FC = () => {
  const f = useCurrentFrame();
  const wave = 10 * Math.sin(f / 5);
  return (
    <g>
      <g transform="translate(-50 10)"><Person r={30} c={COLORS.greenLeaf} /></g>
      {/* an extended hand reaching out with a little speech 'hi' */}
      <path d={`M -20 10 q 40 -10 68 ${-4 + wave * 0.2}`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={54} cy={4 + wave * 0.2} r={14} fill={COLORS.skin} {...lg} />
      <g transform={`translate(70 -54) rotate(${wave})`}><rect x={-26} y={-20} width={52} height={36} rx={12} fill={COLORS.greenLeaf} {...sm} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>hi!</text></g>
      <Label t="make the first move" />
    </g>
  );
};
