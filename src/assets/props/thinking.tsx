/**
 * thinking.tsx — ALL-NEW art for "Why You Can't Stop Thinking About Someone".
 * The loop (thought-loop, phone-haunt, open-loop-knot), why it hooks (slot-hearts
 * intermittent reward, pedestal-idol idealization, scarcity-locked, highlight-reel),
 * and the letting-go (rumination-wheel, red-string, open-hand-release). Token
 * strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A small idealized silhouette head — the "someone" who keeps appearing. */
const Someone: React.FC<{ r?: number; c?: string; glow?: boolean }> = ({ r = 26, c = COLORS.pink, glow = false }) => (
  <g>
    {glow && <circle cx={0} cy={-r * 0.2} r={r * 1.9} fill={COLORS.yellowSoft} opacity={0.5} />}
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <path d={`M ${-r * 1.15} ${r * 1.3} Q 0 ${-r * 0.2} ${r * 1.15} ${r * 1.3} Z`} fill={shade(c, 0.1)} {...lg} />
    <circle cx={-r * 0.34} cy={-r * 1.05} r={r * 0.13} fill={COLORS.outline} /><circle cx={r * 0.34} cy={-r * 1.05} r={r * 0.13} fill={COLORS.outline} />
    <path d={`M ${-r * 0.3} ${-r * 0.72} Q 0 ${-r * 0.5} ${r * 0.3} ${-r * 0.72}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Thought-loop — a looping arrow orbiting a tiny face that keeps returning. */
export const ThoughtLoop: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f / 26) % (Math.PI * 2);
  const rx = 78, ry = 56;
  const dotx = rx * Math.cos(a), doty = -14 + ry * Math.sin(a);
  return (
    <g>
      <ellipse cx={0} cy={-14} rx={rx} ry={ry} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="4 22" />
      <path d="M 70 -46 l 14 10 l -16 8" fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(0 2)"><Someone r={24} c={COLORS.pink} /></g>
      <circle cx={dotx} cy={doty} r={9} fill={COLORS.red} {...sm} />
      <Label t="the thought loop" />
    </g>
  );
};

/** Phone-haunt — a phone glowing with a single unanswered message. */
export const PhoneHaunt: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.45 + 0.35 * Math.sin(f / 7);
  return (
    <g>
      <ellipse cx={0} cy={6} rx={92} ry={92} fill={COLORS.skyEnd} opacity={g * 0.5} />
      <rect x={-52} y={-86} width={104} height={176} rx={20} fill={COLORS.wallNightDark} {...xl} />
      <rect x={-42} y={-70} width={84} height={132} rx={8} fill={COLORS.sky} />
      <rect x={-32} y={-54} width={54} height={20} rx={10} fill={COLORS.white} {...sm} />
      <rect x={-32} y={-26} width={64} height={20} rx={10} fill={COLORS.white} {...sm} />
      {/* an unanswered heart bubble, pulsing */}
      <g transform="translate(16 30)" opacity={0.6 + 0.4 * Math.sin(f / 6)}><rect x={-20} y={-14} width={40} height={28} rx={12} fill={COLORS.pink} {...sm} /><path d="M 0 -4 q -7 -8 -11 -1 q -3 6 11 12 q 14 -6 11 -12 q -4 -7 -11 1 Z" fill={COLORS.white} /></g>
      <text x={-14} y={44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.white}>seen</text>
      <Label t="waiting on a reply" />
    </g>
  );
};

/** Open-loop-knot — a thread that trails off, unfinished (the Zeigarnik open loop). */
export const OpenLoopKnot: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 6 * Math.sin(f / 12);
  return (
    <g>
      <path d="M -80 -50 C -30 -70 -30 10 -70 20 C -110 30 -40 70 10 40 C 50 18 10 -30 40 -40" fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* the frayed, dangling loose end */}
      <path d={`M 40 -40 C 70 -46 ${86 + sway} -18 ${78 + sway} 18`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray="2 16" />
      <circle cx={78 + sway} cy={22} r={7} fill={COLORS.redDark} />
      <text x={0} y={-66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>unfinished</text>
      <Label t="the open loop" />
    </g>
  );
};

/** Slot-hearts — a slot machine with heart reels: intermittent reinforcement. */
export const SlotHearts: React.FC = () => {
  const f = useCurrentFrame();
  const spin = (i: number) => ((f * (2 + i)) % 90) < 60; // sometimes spinning, sometimes locked
  const faces = ['♥', '✕', '♥'];
  return (
    <g>
      <rect x={-78} y={-70} width={156} height={150} rx={16} fill={COLORS.red} {...xl} />
      <rect x={-78} y={-70} width={156} height={34} rx={16} fill={COLORS.redDark} />
      {[-48, 0, 48].map((x, i) => (
        <g key={i} transform={`translate(${x} 10)`}>
          <rect x={-22} y={-26} width={44} height={60} rx={8} fill={COLORS.white} {...sm} />
          <text x={0} y={16} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={spin(i) ? COLORS.ledGrey : COLORS.pink} opacity={spin(i) ? 0.5 : 1}>{spin(i) ? '?' : faces[i]}</text>
        </g>
      ))}
      {/* lever */}
      <g transform={`translate(${86} ${-20 + (((f) % 60) < 20 ? 14 : 0)})`}><rect x={-5} y={0} width={10} height={54} rx={5} fill={COLORS.outline} /><circle cx={0} cy={-6} r={12} fill={COLORS.yellow} {...sm} /></g>
      <Label t="hot &amp; cold = the hook" />
    </g>
  );
};

/** Pedestal-idol — a glowing figure raised on a pedestal (idealization). */
export const PedestalIdol: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M 0 -70 L ${Math.cos((i / 6) * Math.PI * 2 - Math.PI / 2) * 120} ${-70 + Math.sin((i / 6) * Math.PI * 2 - Math.PI / 2) * 120}`} stroke={COLORS.yellowSoft} strokeWidth={STROKE.sm} opacity={g} strokeLinecap="round" />)}
      <g transform="translate(0 -48)"><Someone r={30} c={COLORS.pink} glow /></g>
      {/* pedestal */}
      <rect x={-34} y={2} width={68} height={28} rx={4} fill={COLORS.white} {...lg} />
      <rect x={-46} y={30} width={92} height={22} rx={4} fill={shade(COLORS.white, 0.12)} {...lg} />
      <rect x={-58} y={52} width={116} height={22} rx={4} fill={shade(COLORS.white, 0.2)} {...lg} />
      <Label t="the pedestal" />
    </g>
  );
};

/** Highlight-reel — a film strip of golden best-moments only. */
export const HighlightReel: React.FC = () => (
  <g>
    <rect x={-96} y={-40} width={192} height={88} rx={6} fill={COLORS.outline} {...lg} />
    {[-10, 42].map((y) => [-96, -72, -48, -24, 0, 24, 48, 72].map((x) => <rect key={`${x}-${y}`} x={x + 4} y={y} width={12} height={10} rx={2} fill={COLORS.white} />))}
    {[-62, -16, 30].map((x, i) => (
      <g key={i} transform={`translate(${x} 4)`}>
        <rect x={-20} y={-24} width={40} height={48} rx={4} fill={[COLORS.pink, COLORS.yellow, COLORS.lavender][i]} {...sm} />
        <circle cx={0} cy={-2} r={10} fill={COLORS.white} />
        <path d="M -6 2 Q 0 8 6 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
    ))}
    <text x={0} y={-52} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>best bits only</text>
    <Label t="the highlight reel" />
  </g>
);

/** Rumination-wheel — a head running on a hamster wheel, going nowhere. */
export const RuminationWheel: React.FC = () => {
  const f = useCurrentFrame();
  const rot = f * 4;
  return (
    <g>
      <circle cx={0} cy={0} r={80} fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.xl} />
      <g transform={`rotate(${rot})`}>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M 0 0 L ${Math.cos((i / 8) * Math.PI * 2) * 76} ${Math.sin((i / 8) * Math.PI * 2) * 76}`} stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.6} />)}</g>
      <circle cx={0} cy={0} r={12} fill={COLORS.lavenderDark} />
      <g transform={`translate(0 -2) rotate(${8 * Math.sin(f / 4)})`}><Someone r={22} c={COLORS.white} /></g>
      <Label t="rumination" />
    </g>
  );
};

/** Red-string — a red thread tied around a finger: you can't forget. */
export const RedString: React.FC = () => {
  const f = useCurrentFrame();
  const pull = 4 * Math.sin(f / 9);
  return (
    <g>
      {/* a hand/finger */}
      <path d="M -70 60 Q -60 -20 -24 -34 Q 0 -44 10 -20" fill={COLORS.skin} {...xl} strokeLinecap="round" />
      <rect x={-78} y={54} width={60} height={30} rx={12} fill={COLORS.skinShade} {...lg} />
      {/* string wound round the fingertip, trailing to a far heart */}
      {[0, 1, 2].map((i) => <ellipse key={i} cx={-6} cy={-26 + i * 9} rx={20} ry={7} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} transform="rotate(-24 -6 -22)" />)}
      <path d={`M 12 -24 Q ${60 + pull} -50 ${86 + pull} 6`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d={`M ${86 + pull} 10 q -8 -10 -13 -1 q -4 7 13 15 q 17 -8 13 -15 q -5 -9 -13 1 Z`} fill={COLORS.red} {...sm} />
      <Label t="tied to the memory" />
    </g>
  );
};

/** Scarcity-locked — a heart locked away; out of reach feels more wanted. */
export const ScarcityLocked: React.FC = () => {
  const f = useCurrentFrame();
  const shine = 0.3 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {/* glass dome / case */}
      <path d="M -78 60 L -78 -6 A 78 78 0 0 1 78 -6 L 78 60 Z" fill={COLORS.sky} opacity={0.3} {...sm} />
      <path d="M -78 -6 A 78 78 0 0 1 78 -6" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} opacity={shine} />
      <rect x={-84} y={56} width={168} height={22} rx={6} fill={COLORS.wood} {...lg} />
      {/* the heart on a pedestal */}
      <path d="M 0 36 q -30 -32 -42 -6 q -10 24 42 52 q 52 -28 42 -52 q -12 -26 -42 6 Z" fill={COLORS.pink} {...lg} transform="scale(0.8) translate(0 -12)" />
      {/* padlock */}
      <g transform="translate(0 -2)"><path d="M -10 2 v -10 a 10 10 0 0 1 20 0 v 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} /><rect x={-14} y={2} width={28} height={22} rx={4} fill={COLORS.yellow} {...sm} /></g>
      <Label t="out of reach = wanted" />
    </g>
  );
};

/** Open-hand-release — an open palm letting petals drift away: letting go. */
export const OpenHandRelease: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* open palm */}
      <path d="M -54 70 Q -60 10 -34 4 L -34 -6 Q -26 -16 -18 -6 L -18 2 Q -10 -22 -2 -6 L -2 4 Q 6 -18 14 0 L 14 10 Q 30 8 34 30 Q 40 60 10 72 Z" fill={COLORS.skin} {...lg} strokeLinejoin="round" />
      {/* petals/hearts drifting up and away */}
      {[0, 1, 2, 3, 4].map((i) => {
        const p = ((f + i * 20) % 120) / 120;
        const y = 10 - p * 110;
        const x = -4 + Math.sin((f + i * 30) / 16) * (14 + i * 6) + i * 6;
        return <g key={i} transform={`translate(${x} ${y})`} opacity={1 - p}><path d="M 0 2 q -6 -7 -10 -1 q -3 6 10 11 q 13 -5 10 -11 q -4 -6 -10 1 Z" fill={[COLORS.pink, COLORS.lavender, COLORS.yellow, COLORS.pink, COLORS.sky][i]} /></g>;
      })}
      <Label t="letting it go" />
    </g>
  );
};
