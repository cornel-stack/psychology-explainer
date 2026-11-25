/**
 * comparing.tsx — ALL-NEW art for "Why You Compare Yourself to Others". The instinct
 * (measuring-self, two-directions), the rigged game (reel-vs-reality, rigged-compare,
 * joy-thief, envy-flare), the trap (endless-ladder), the way out (past-self, own-lane,
 * envy-compass). Token strokes, centered on origin, ~300px tall.
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

/** measuring-self — a short figure measuring itself against a taller one with a ruler. */
export const MeasuringSelf: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 2 * Math.sin(f / 10);
  return (
    <g>
      {/* tall other */}
      <g transform="translate(50 -10)"><circle cx={0} cy={-56} r={24} fill={COLORS.sky} {...lg} /><path d="M -26 60 Q -30 -34 0 -34 Q 30 -34 26 60 Z" fill={shade(COLORS.sky, 0.06)} {...xl} /></g>
      {/* short self */}
      <g transform={`translate(-50 ${18 + bob})`}><circle cx={0} cy={-36} r={22} fill={COLORS.pink} {...lg} /><circle cx={-8} cy={-38} r={4} fill={COLORS.outline} /><circle cx={8} cy={-38} r={4} fill={COLORS.outline} /><path d="M -10 -24 L 10 -24" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -24 40 Q -28 -16 0 -16 Q 28 -16 24 40 Z" fill={shade(COLORS.pink, 0.06)} {...xl} /></g>
      {/* ruler between them */}
      <g transform="translate(0 0)"><line x1={0} y1={-80} x2={0} y2={60} stroke={COLORS.outline} strokeWidth={STROKE.sm} />{[-80, -40, 0, 40].map((y, i) => <line key={i} x1={-6} y1={y} x2={6} y2={y} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}</g>
      <Label t="how do I measure up?" />
    </g>
  );
};

/** two-directions — a figure looking up (envy) and down (relief) a ladder. */
export const TwoDirections: React.FC = () => {
  const f = useCurrentFrame();
  const look = Math.sin(f / 12);
  return (
    <g>
      {/* ladder */}
      <g transform="translate(0 0)">{[-60, 0, 60].map((y, i) => <line key={i} x1={-30} y1={y} x2={30} y2={y} stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" />)}<line x1={-30} y1={-80} x2={-30} y2={80} stroke={COLORS.woodDark} strokeWidth={STROKE.lg} /><line x1={30} y1={-80} x2={30} y2={80} stroke={COLORS.woodDark} strokeWidth={STROKE.lg} /></g>
      {/* up arrow + envy */}
      <g transform="translate(70 -54)" opacity={0.5 + 0.5 * Math.max(0, look)}><path d="M 0 20 L 0 -16 M -10 -6 l 10 -14 l 10 14" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /><text x={0} y={42} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.red}>envy</text></g>
      {/* down arrow + relief */}
      <g transform="translate(70 54)" opacity={0.5 + 0.5 * Math.max(0, -look)}><path d="M 0 -20 L 0 16 M -10 6 l 10 14 l 10 -14" fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /><text x={0} y={-26} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.greenDark}>relief</text></g>
      <circle cx={0} cy={0} r={18} fill={COLORS.pink} {...lg} />
      <Label t="we look up and down" />
    </g>
  );
};

/** reel-vs-reality — a shiny highlight photo beside a messy real-life scene. */
export const ReelVsReality: React.FC = () => {
  const f = useCurrentFrame();
  const sparkle = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {/* their highlight */}
      <g transform="translate(-58 0)">
        <rect x={-50} y={-56} width={100} height={112} rx={10} fill={COLORS.yellowSoft} {...xl} />
        <circle cx={0} cy={-16} r={22} fill={COLORS.skin} {...sm} /><path d="M -10 -10 Q 0 -2 10 -10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M 0 30 l 4 9 l 10 1 l -7 7 l 2 10 l -9 -5 l -9 5 l 2 -10 l -7 -7 l 10 -1 Z" fill={COLORS.yellow} opacity={sparkle} />
        <text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>their reel</text>
      </g>
      {/* your reality */}
      <g transform="translate(58 0)">
        <rect x={-50} y={-56} width={100} height={112} rx={10} fill={COLORS.white} {...xl} />
        <circle cx={0} cy={-16} r={22} fill={COLORS.skin} {...sm} /><path d="M -10 -6 Q 0 -14 10 -6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        {[[-30, 24], [30, 30], [-20, 40]].map(([x, y], i) => <rect key={i} x={x - 8} y={y - 4} width={16} height={8} rx={2} fill={COLORS.ledGrey} opacity={0.5} transform={`rotate(${i * 20 - 20} ${x} ${y})`} />)}
        <text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>your reality</text>
      </g>
      <Label t="reel vs real life" />
    </g>
  );
};

/** rigged-compare — an unbalanced scale: their best heavy, your worst light. */
export const RiggedCompare: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = -12 + 2 * Math.sin(f / 10);
  return (
    <g>
      <line x1={0} y1={-70} x2={0} y2={-20} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <g transform={`rotate(${tilt})`}>
        <line x1={-90} y1={-20} x2={90} y2={-20} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        {/* their best — heavy */}
        <g transform={`translate(90 -20) rotate(${-tilt})`}><line x1={0} y1={0} x2={0} y2={26} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><circle cx={0} cy={44} r={28} fill={COLORS.yellow} {...lg} /><text x={0} y={49} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>their</text></g>
        {/* your worst — light */}
        <g transform={`translate(-90 -20) rotate(${-tilt})`}><line x1={0} y1={0} x2={0} y2={40} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><ellipse cx={0} cy={52} rx={28} ry={14} fill={shade(COLORS.pink, 0.04)} {...lg} /><text x={0} y={57} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>your</text></g>
      </g>
      <Label t="their best vs your worst" />
    </g>
  );
};

/** joy-thief — a sneaky hand lifting a glowing heart of joy away. */
export const JoyThief: React.FC = () => {
  const f = useCurrentFrame();
  const lift = (f % 60) / 60;
  return (
    <g>
      {/* the person, now joyless */}
      <circle cx={-20} cy={10} r={40} fill={COLORS.skin} {...xl} />
      <circle cx={-32} cy={4} r={5} fill={COLORS.outline} /><circle cx={-10} cy={4} r={5} fill={COLORS.outline} />
      <path d="M -32 26 Q -20 18 -8 26" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* the joy heart being stolen upward */}
      <g transform={`translate(${30 + lift * 10} ${-20 - lift * 50})`} opacity={1 - lift * 0.6}>
        <path d="M 0 16 q -16 -12 -16 -24 q 0 -8 8 -8 q 5 0 8 5 q 3 -5 8 -5 q 8 0 8 8 q 0 12 -16 24 Z" fill={COLORS.yellow} {...sm} />
      </g>
      {/* the thieving hand */}
      <path d="M 50 -70 q -16 10 -20 26" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={28} cy={-42} r={12} fill={COLORS.ledGrey} {...sm} />
      <Label t="comparison steals your joy" />
    </g>
  );
};

/** envy-flare — a green-tinged face with a jealous flare, eyeing something off-side. */
export const EnvyFlare: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      <circle cx={0} cy={0} r={54} fill={shade(COLORS.greenTeal, 0.04)} {...xl} />
      {/* eyes glancing to the side */}
      <circle cx={-14} cy={-6} r={12} fill={COLORS.white} {...sm} /><circle cx={-8} cy={-6} r={5} fill={COLORS.outline} />
      <circle cx={18} cy={-6} r={12} fill={COLORS.white} {...sm} /><circle cx={24} cy={-6} r={5} fill={COLORS.outline} />
      {/* downturned, tight mouth */}
      <path d="M -16 26 Q 0 18 16 26" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* green flare */}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${30 + i * 8} ${-30 - i * 6} q 6 -8 0 -16`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.4 + glow * 0.4} />)}
      <Label t="the sting of envy" />
    </g>
  );
};

/** endless-ladder — an infinite ladder vanishing upward, a tiny climber never arriving. */
export const EndlessLadder: React.FC = () => {
  const f = useCurrentFrame();
  const climb = (f % 60) / 60;
  return (
    <g>
      {/* ladder narrowing to a vanishing point */}
      {Array.from({ length: 8 }).map((_, i) => { const t = i / 8; const y = 70 - t * 150; const w = 40 * (1 - t * 0.7); return <line key={i} x1={-w} y1={y} x2={w} y2={y} stroke={COLORS.woodDark} strokeWidth={STROKE.sm + (1 - t) * 4} strokeLinecap="round" opacity={1 - t * 0.5} />; })}
      <path d="M -36 72 L -8 -84 M 36 72 L 8 -84" stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* tiny climber */}
      <g transform={`translate(0 ${50 - climb * 40})`}><circle cx={0} cy={-10} r={12} fill={COLORS.pink} {...sm} /><path d="M -10 14 Q -12 -4 0 -4 Q 12 -4 10 14 Z" fill={COLORS.pink} {...sm} /></g>
      {/* question at the top */}
      <text x={0} y={-96} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>...?</text>
      <Label t="no top, no finish line" />
    </g>
  );
};

/** past-self — comparing to a faded past version of yourself, showing real growth. */
export const PastSelf: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      {/* faded past self, smaller */}
      <g transform="translate(-62 14)" opacity={0.45}><circle cx={0} cy={-22} r={20} fill={COLORS.ledGrey} {...sm} /><path d="M -20 30 Q -24 -16 0 -16 Q 24 -16 20 30 Z" fill={COLORS.ledGrey} {...sm} /><text x={0} y={52} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>past you</text></g>
      {/* growth arrow */}
      <path d="M -30 0 q 30 -20 56 -2" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 18 -10 l 10 8 l -12 6" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      {/* present self, bigger, brighter */}
      <g transform="translate(58 0)"><circle cx={0} cy={-30} r={28} fill={COLORS.greenTeal} {...xl} opacity={0.7 + glow * 0.2} /><path d="M -12 -12 Q 0 -4 12 -12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><circle cx={-9} cy={-34} r={4} fill={COLORS.outline} /><circle cx={9} cy={-34} r={4} fill={COLORS.outline} /><path d="M -28 44 Q -32 -4 0 -4 Q 32 -4 28 44 Z" fill={shade(COLORS.greenTeal, 0.06)} {...xl} /><text x={0} y={66} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.greenDark}>now you</text></g>
      <Label t="compare to your past self" />
    </g>
  );
};

/** own-lane — a single runner in their own marked lane, eyes forward. */
export const OwnLane: React.FC = () => {
  const f = useCurrentFrame();
  const stride = Math.sin(f / 5) * 12;
  return (
    <g>
      {/* lane lines */}
      {[-50, 50].map((x, i) => <line key={i} x1={x} y1={-70} x2={x} y2={80} stroke={COLORS.white} strokeWidth={STROKE.lg} />)}
      <rect x={-50} y={-70} width={100} height={150} fill={shade(COLORS.red, 0.04)} opacity={0.3} />
      {/* the runner */}
      <g transform="translate(0 -6)">
        <circle cx={0} cy={-46} r={24} fill={COLORS.pink} {...xl} />
        <path d="M -10 -50 Q 0 -42 10 -50" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <circle cx={6} cy={-48} r={4} fill={COLORS.outline} />
        <path d="M 0 -22 L 0 24" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <path d={`M 0 -14 l 20 -6 M 0 -14 l -18 8`} stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <path d={`M 0 24 l ${stride} 30 M 0 24 l ${-stride} 30`} stroke={COLORS.navy} strokeWidth={STROKE.xl} strokeLinecap="round" />
      </g>
      <Label t="run your own lane" />
    </g>
  );
};

/** envy-compass — envy turning into a compass pointing to what you value. */
export const EnvyCompass: React.FC = () => {
  const f = useCurrentFrame();
  const needle = 30 * Math.sin(f / 14);
  return (
    <g>
      <circle cx={0} cy={0} r={60} fill={COLORS.white} {...xl} />
      <circle cx={0} cy={0} r={48} fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      {/* needle, green tip now 'pointing to what you want' */}
      <g transform={`rotate(${needle})`}>
        <path d="M 0 -42 L 9 0 L 0 6 L -9 0 Z" fill={COLORS.greenTeal} {...sm} />
        <path d="M 0 42 L 9 0 L 0 -6 L -9 0 Z" fill={shade(COLORS.greenTeal, -0.06)} {...sm} />
      </g>
      <circle cx={0} cy={0} r={6} fill={COLORS.outline} />
      <text x={0} y={-74} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.greenDark}>what I want</text>
      <Label t="turn envy into a compass" />
    </g>
  );
};
