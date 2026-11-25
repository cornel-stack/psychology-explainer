/**
 * friends-types.tsx — ALL-NEW art for "Every Type of Friend Explained". One emblem
 * per kind of friend: ride-or-die, cheerleader, mentor-guide, old-friend, work-friend,
 * fair-weather, mirror-friend, acquaintance-wave, adventure-buddy, drainer-friend.
 * Token strokes, centered on origin, ~300px tall.
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

/** ride-or-die — two figures locked arm-in-arm with a strong anchor-link between them. */
export const RideOrDie: React.FC = () => {
  const f = useCurrentFrame();
  const lean = 2 * Math.sin(f / 10);
  return (
    <g>
      {[-44, 44].map((x, i) => <g key={i} transform={`translate(${x} ${i ? lean : -lean})`}><circle cx={0} cy={-34} r={28} fill={i ? COLORS.pink : COLORS.sky} {...xl} /><circle cx={-9} cy={-36} r={4} fill={COLORS.outline} /><circle cx={9} cy={-36} r={4} fill={COLORS.outline} /><path d="M -10 -22 Q 0 -14 10 -22" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -28 44 Q -32 -4 0 -4 Q 32 -4 28 44 Z" fill={i ? shade(COLORS.pink, 0.06) : shade(COLORS.sky, 0.06)} {...xl} /></g>)}
      {/* linked arms */}
      <path d="M -24 6 Q 0 18 24 6" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* a small heart-link above */}
      <path d="M 0 -72 q -8 -8 -8 -14 q 0 -6 6 -6 q 4 0 2 4 q -2 -4 2 -4 q 6 0 6 6 q 0 6 -8 14 Z" fill={COLORS.red} />
      <Label t="the ride-or-die" />
    </g>
  );
};

/** cheerleader — a beaming friend waving pom-poms, cheering you on. */
export const Cheerleader: React.FC = () => {
  const f = useCurrentFrame();
  const shake = 10 * Math.sin(f / 3);
  return (
    <g>
      <circle cx={0} cy={0} r={44} fill={COLORS.skin} {...xl} />
      <path d="M -22 -8 Q -14 -16 -6 -8 M 6 -8 Q 14 -16 22 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -18 10 Q 0 28 18 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* pom-poms */}
      {[-1, 1].map((s, i) => <g key={i} transform={`translate(${s * 66} ${-40 + (i ? shake : -shake) * 0.4}) rotate(${s * shake})`}>{Array.from({ length: 8 }).map((_, j) => { const a = (j / 8) * Math.PI * 2; return <line key={j} x1={0} y1={0} x2={Math.cos(a) * 24} y2={Math.sin(a) * 24} stroke={[COLORS.pink, COLORS.yellow][i]} strokeWidth={STROKE.lg} strokeLinecap="round" />; })}<circle cx={0} cy={0} r={8} fill={[COLORS.pink, COLORS.yellow][i]} /></g>)}
      <text x={0} y={-60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.pinkDark}>"you got this!"</text>
      <Label t="the cheerleader" />
    </g>
  );
};

/** mentor-guide — an older figure handing a lantern/torch of guidance to a younger one. */
export const MentorGuide: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {/* mentor (taller, with a little grey) */}
      <g transform="translate(-50 -4)">
        <circle cx={0} cy={-40} r={26} fill={COLORS.skin} {...xl} />
        <path d="M -26 -46 q 26 -16 52 0" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <circle cx={-8} cy={-42} r={4} fill={COLORS.outline} /><circle cx={8} cy={-42} r={4} fill={COLORS.outline} />
        <path d="M -28 50 Q -32 -14 0 -14 Q 32 -14 28 50 Z" fill={COLORS.greenTeal} {...xl} />
      </g>
      {/* the lantern of guidance passing between */}
      <g transform="translate(6 -6)"><circle cx={0} cy={0} r={18 + glow * 4} fill={COLORS.yellow} opacity={0.4 + glow * 0.4} /><rect x={-10} y={-12} width={20} height={24} rx={4} fill={COLORS.yellow} {...sm} /><rect x={-12} y={-18} width={24} height={8} rx={3} fill={COLORS.woodDark} /></g>
      {/* younger figure receiving */}
      <g transform="translate(54 8)">
        <circle cx={0} cy={-30} r={22} fill={COLORS.skin} {...lg} />
        <circle cx={-7} cy={-32} r={3} fill={COLORS.outline} /><circle cx={7} cy={-32} r={3} fill={COLORS.outline} />
        <path d="M -7 -20 Q 0 -14 7 -20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -24 44 Q -28 -4 0 -4 Q 28 -4 24 44 Z" fill={COLORS.sky} {...xl} />
      </g>
      <Label t="the mentor" />
    </g>
  );
};

/** old-friend — two figures on a long shared timeline strip of photos. */
export const OldFriend: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 1.5 * Math.sin(f / 10);
  return (
    <g>
      {/* timeline strip */}
      <rect x={-110} y={-18} width={220} height={40} rx={6} fill={COLORS.white} {...lg} />
      {[-80, -40, 0, 40, 80].map((x, i) => <g key={i} transform={`translate(${x} 2)`}><rect x={-14} y={-12} width={28} height={24} rx={3} fill={[COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.greenTeal, COLORS.lavender][i]} opacity={0.5} /></g>)}
      <line x1={-110} y1={-18} x2={110} y2={-18} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="4 6" opacity={0.4} transform="translate(0 44)" />
      {/* two long-time friends above it */}
      {[-50, 50].map((x, i) => <g key={i} transform={`translate(${x} ${-62 + bob * (i ? 1 : -1)})`}><circle cx={0} cy={0} r={24} fill={i ? COLORS.pink : COLORS.sky} {...lg} /><circle cx={-7} cy={-2} r={3} fill={COLORS.outline} /><circle cx={7} cy={-2} r={3} fill={COLORS.outline} /><path d="M -8 8 Q 0 14 8 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>)}
      <text x={0} y={-30} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>years &amp; years</text>
      <Label t="the old friend" />
    </g>
  );
};

/** work-friend — two figures with lanyard badges at adjoining desks. */
export const WorkFriend: React.FC = () => {
  const f = useCurrentFrame();
  const sip = 1.5 * Math.sin(f / 8);
  return (
    <g>
      {[-52, 52].map((x, i) => <g key={i} transform={`translate(${x} ${i ? sip : -sip})`}><circle cx={0} cy={-34} r={24} fill={COLORS.skin} {...lg} /><circle cx={-8} cy={-36} r={3} fill={COLORS.outline} /><circle cx={8} cy={-36} r={3} fill={COLORS.outline} /><path d="M -8 -24 Q 0 -18 8 -24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -26 30 Q -30 -10 0 -10 Q 30 -10 26 30 Z" fill={i ? COLORS.navy : COLORS.sky} {...xl} />{/* badge */}<rect x={-10} y={-4} width={20} height={14} rx={2} fill={COLORS.white} {...sm} /><line x1={0} y1={-10} x2={0} y2={-4} stroke={COLORS.outline} strokeWidth={STROKE.sm} /></g>)}
      {/* a shared desk divider + two mugs */}
      <rect x={-6} y={-6} width={12} height={50} rx={2} fill={shade(COLORS.ledGrey, 0.1)} />
      <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>9-to-5 allies</text>
      <Label t="the work friend" />
    </g>
  );
};

/** fair-weather — a friend under a sun who melts away when a rain cloud appears. */
export const FairWeather: React.FC = () => {
  const f = useCurrentFrame();
  const rain = (f % 80) > 40;
  return (
    <g>
      {rain ? (
        <>
          {/* rain cloud, friend gone / faded */}
          <ellipse cx={0} cy={-40} rx={56} ry={26} fill={COLORS.ledGrey} opacity={0.6} {...lg} />
          {[-20, 0, 20].map((x, i) => <line key={i} x1={x} y1={-14} x2={x - 6} y2={16} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
          <circle cx={0} cy={44} r={30} fill={COLORS.white} opacity={0.3} strokeDasharray="4 6" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />
          <text x={0} y={50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.ledGrey}>gone</text>
        </>
      ) : (
        <>
          {/* sunshine + happy friend present */}
          <circle cx={-40} cy={-40} r={20} fill={COLORS.yellow} {...sm} />
          {Array.from({ length: 6 }).map((_, i) => { const a = (i / 6) * Math.PI * 2; return <line key={i} x1={-40 + Math.cos(a) * 26} y1={-40 + Math.sin(a) * 26} x2={-40 + Math.cos(a) * 34} y2={-40 + Math.sin(a) * 34} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />; })}
          <circle cx={10} cy={30} r={30} fill={COLORS.pink} {...xl} /><path d="M -2 24 Q 10 38 22 24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /><circle cx={0} cy={22} r={4} fill={COLORS.outline} /><circle cx={20} cy={22} r={4} fill={COLORS.outline} />
        </>
      )}
      <Label t="the fair-weather friend" />
    </g>
  );
};

/** mirror-friend — a friend holding up an honest mirror that reflects the real you. */
export const MirrorFriend: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 9);
  return (
    <g>
      {/* friend */}
      <g transform="translate(-54 0)">
        <circle cx={0} cy={-30} r={26} fill={COLORS.greenTeal} {...xl} />
        <circle cx={-8} cy={-32} r={4} fill={COLORS.outline} /><circle cx={8} cy={-32} r={4} fill={COLORS.outline} />
        <path d="M -10 -18 L 10 -18" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -28 44 Q -32 -4 0 -4 Q 32 -4 28 44 Z" fill={shade(COLORS.greenTeal, 0.06)} {...xl} />
      </g>
      {/* the honest mirror held up */}
      <g transform="translate(52 -6)">
        <rect x={-40} y={-50} width={80} height={100} rx={38} fill={shade(COLORS.sky, 0.1)} opacity={0.4 + glow * 0.2} {...xl} />
        <circle cx={0} cy={-4} r={26} fill={COLORS.skin} opacity={0.9} {...sm} />
        <circle cx={-8} cy={-8} r={3} fill={COLORS.outline} /><circle cx={8} cy={-8} r={3} fill={COLORS.outline} />
        <path d="M -8 6 Q 0 12 8 6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>"the honest truth"</text>
      <Label t="the mirror friend" />
    </g>
  );
};

/** acquaintance-wave — a light, friendly wave across a thin dotted thread. */
export const AcquaintanceWave: React.FC = () => {
  const f = useCurrentFrame();
  const wave = 10 * Math.sin(f / 5);
  return (
    <g>
      {[-66, 66].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><circle cx={0} cy={-20} r={24} fill={i ? COLORS.yellowSoft : COLORS.sky} {...lg} /><circle cx={-7} cy={-22} r={3} fill={COLORS.outline} /><circle cx={7} cy={-22} r={3} fill={COLORS.outline} /><path d="M -8 -10 Q 0 -4 8 -10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -22 36 Q -26 -2 0 -2 Q 26 -2 22 36 Z" fill={i ? shade(COLORS.yellowSoft, 0.04) : shade(COLORS.sky, 0.04)} {...lg} />{/* waving hand */}<path d={`M ${i ? -20 : 20} 0 l ${i ? -14 : 14} -18`} stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" transform={`rotate(${i ? wave : -wave} ${i ? -20 : 20} 0)`} /></g>)}
      {/* a thin dotted connection */}
      <line x1={-40} y1={-20} x2={40} y2={-20} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeDasharray="3 10" opacity={0.6} />
      <Label t="the acquaintance" />
    </g>
  );
};

/** adventure-buddy — two friends with a backpack and a map, off on an escapade. */
export const AdventureBuddy: React.FC = () => {
  const f = useCurrentFrame();
  const step = 4 * Math.sin(f / 5);
  return (
    <g>
      {/* little hill path */}
      <path d="M -100 50 Q 0 10 100 50" fill="none" stroke={shade(COLORS.greenTeal, -0.04)} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[-40, 40].map((x, i) => <g key={i} transform={`translate(${x} ${-10 + (i ? step : -step)})`}><circle cx={0} cy={-26} r={22} fill={i ? COLORS.yellow : COLORS.pink} {...xl} /><circle cx={-6} cy={-28} r={3} fill={COLORS.outline} /><circle cx={8} cy={-28} r={3} fill={COLORS.outline} /><path d="M -8 -16 Q 0 -10 8 -16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />{i === 0 && <path d="M -20 -36 l 10 -16 l 12 10 Z" fill={COLORS.woodDark} {...sm} />}<path d="M -22 30 Q -26 -6 0 -6 Q 26 -6 22 30 Z" fill={i ? shade(COLORS.yellow, 0.04) : shade(COLORS.pink, 0.04)} {...lg} />{i === 1 && <rect x={14} y={-10} width={22} height={28} rx={5} fill={COLORS.red} {...sm} />}</g>)}
      {/* a little flag at the top */}
      <g transform="translate(0 -6)"><line x1={0} y1={0} x2={0} y2={-18} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><path d="M 0 -18 l 14 5 l -14 6 Z" fill={COLORS.greenTeal} {...sm} /></g>
      <Label t="the adventure buddy" />
    </g>
  );
};

/** drainer-friend — a one-way straw siphoning energy from you into them. */
export const DrainerFriend: React.FC = () => {
  const f = useCurrentFrame();
  const flow = (f % 40) / 40;
  return (
    <g>
      {/* drained you */}
      <g transform="translate(-54 0)">
        <circle cx={0} cy={-26} r={26} fill={shade(COLORS.sky, -0.02)} {...xl} />
        <path d="M -10 -30 q 8 6 16 0 M 2 -30 q 8 6 16 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" transform="translate(-14 0)" />
        <circle cx={-8} cy={-26} r={4} fill={COLORS.outline} /><circle cx={8} cy={-26} r={4} fill={COLORS.outline} />
        <path d="M -10 -8 Q 0 -14 10 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <path d="M -28 44 Q -32 -2 0 -2 Q 32 -2 28 44 Z" fill={shade(COLORS.sky, -0.04)} {...xl} />
      </g>
      {/* full them */}
      <g transform="translate(54 0)">
        <circle cx={0} cy={-26} r={26} fill={COLORS.pink} {...xl} />
        <path d="M -10 -30 Q -2 -36 6 -30 M -2 -30 Q 6 -36 14 -30" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" transform="translate(-6 0)" />
        <circle cx={-8} cy={-26} r={4} fill={COLORS.outline} /><circle cx={8} cy={-26} r={4} fill={COLORS.outline} />
        <path d="M -12 -6 Q 0 10 12 -6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <path d="M -28 44 Q -32 -2 0 -2 Q 32 -2 28 44 Z" fill={shade(COLORS.pink, 0.06)} {...xl} />
      </g>
      {/* the one-way siphon */}
      <path d="M -28 -20 Q 0 -40 28 -20" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[0, 1, 2].map((i) => { const t = (flow + i / 3) % 1; return <circle key={i} cx={-28 + t * 56} cy={-20 - Math.sin(t * Math.PI) * 20} r={5} fill={COLORS.yellow} />; })}
      <Label t="the drainer" />
    </g>
  );
};
