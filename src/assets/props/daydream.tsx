/**
 * daydream.tsx — ALL-NEW art for "The Psychology of People Who Imagine Fake
 * Scenarios All Day" (immersive / maladaptive daydreaming). Bespoke metaphors
 * for the vivid inner world: the inner cinema, the ongoing story strip, the
 * music trigger, the imaginary companion, the pacing loop, the warped clock, the
 * escape portal, the daydream cloud-scene, the reality-check top, the idealised
 * alter-ego, the window gaze, the web of plots, the popcorn mind. Token strokes.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A glowing movie screen playing a tiny scene (the inner cinema). */
export const InnerCinema: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.8 + 0.15 * Math.sin(f / 6);
  return (
    <g>
      <rect x={-170} y={-120} width={340} height={230} rx={14} fill={COLORS.shirtDark} {...xl} />
      <rect x={-146} y={-96} width={292} height={182} rx={8} fill={COLORS.sky} opacity={glow} />
      {/* a little scene: sun + hero on a hill */}
      <circle cx={70} cy={-40} r={26} fill={COLORS.yellow} {...sm} />
      <path d="M -146 60 Q 0 0 146 60 L 146 86 L -146 86 Z" fill={COLORS.greenLeaf} />
      <g transform="translate(-40 30)"><circle r={14} fill={COLORS.white} {...sm} /><path d="M 0 14 L 0 44 M 0 22 L -16 36 M 0 22 L 16 36" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      {/* projector beam */}
      <path d="M -170 -60 L -260 -110 L -260 10 L -170 -20 Z" fill={COLORS.yellowSoft} opacity={0.4} />
      <rect x={-150} y={110} width={300} height={16} rx={6} fill={COLORS.shirtDarker} />
    </g>
  );
};

/** A three-panel comic strip of an ongoing storyline. */
export const StoryStrip: React.FC = () => {
  const panels: [string, React.ReactNode][] = [
    [COLORS.sky, <circle key="a" cx={0} cy={-6} r={20} fill={COLORS.yellow} />],
    [COLORS.pink, <path key="b" d="M 0 14 Q -22 -14 -10 -24 Q 0 -28 0 -16 Q 0 -28 10 -24 Q 22 -14 0 14 Z" fill={COLORS.red} />],
    [COLORS.yellowSoft, <path key="c" d="M -24 14 l 14 -34 l 10 20 l 14 -24 l 10 24" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />],
  ];
  return (
    <g>
      <rect x={-200} y={-80} width={400} height={160} rx={12} fill={COLORS.white} {...xl} />
      {panels.map(([c, node], i) => (
        <g key={i} transform={`translate(${-128 + i * 128} 0)`}>
          <rect x={-56} y={-56} width={112} height={112} rx={8} fill={c} {...lg} />
          {node}
        </g>
      ))}
      {/* "to be continued" arrows between panels */}
      <path d="M -72 0 l 16 0 m -6 -6 l 6 6 l -6 6 M 56 0 l 16 0 m -6 -6 l 6 6 l -6 6" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** Headphones with music notes — the classic daydream trigger. */
export const TriggerHeadphones: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M -110 30 Q -110 -120 0 -120 Q 110 -120 110 30" fill="none" stroke={COLORS.outline} strokeWidth={28} strokeLinecap="round" />
      <path d="M -110 30 Q -110 -120 0 -120 Q 110 -120 110 30" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <rect x={-130} y={10} width={56} height={90} rx={20} fill={COLORS.red} {...xl} />
      <rect x={74} y={10} width={56} height={90} rx={20} fill={COLORS.red} {...xl} />
      {/* notes */}
      {[[-180, -40], [170, -70], [200, 20]].map(([x, y], i) => {
        const dy = Math.sin(f / 8 + i) * 8;
        return <g key={i} transform={`translate(${x} ${y + dy})`}><circle cx={0} cy={14} r={12} fill={[COLORS.sky, COLORS.yellow, COLORS.pink][i]} {...sm} /><rect x={10} y={-26} width={6} height={40} fill={COLORS.outline} /></g>;
      })}
    </g>
  );
};

/** A translucent floating companion character (the imaginary friend). */
export const ImaginaryCompanion: React.FC = () => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 14) * 8;
  return (
    <g transform={`translate(0 ${bob})`} opacity={0.75}>
      <path d="M -70 90 Q -84 -40 0 -60 Q 84 -40 70 90 Q 0 120 -70 90 Z" fill={COLORS.lavender} {...xl} />
      <circle cx={-24} cy={-10} r={9} fill={COLORS.outline} />
      <circle cx={24} cy={-10} r={9} fill={COLORS.outline} />
      <path d="M -22 24 q 22 16 44 0" fill="none" {...sm} />
      <ellipse cx={-38} cy={10} rx={12} ry={8} fill={COLORS.pink} opacity={0.6} />
      <ellipse cx={38} cy={10} rx={12} ry={8} fill={COLORS.pink} opacity={0.6} />
      {/* sparkle halo (imagined) */}
      {[[-80, -60], [80, -50], [0, -90]].map(([x, y], i) => <path key={i} d={`M ${x} ${y - 8} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z`} fill={COLORS.yellow} opacity={0.8} />)}
    </g>
  );
};

/** Footprints looping in a circle — pacing while daydreaming. */
export const PacingLoop: React.FC = () => {
  const f = useCurrentFrame();
  const prints = Array.from({ length: 10 }).map((_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return [Math.cos(a) * 130, Math.sin(a) * 80, a];
  });
  const lit = Math.floor((f / 6) % 10);
  return (
    <g>
      <ellipse cx={0} cy={0} rx={150} ry={100} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} strokeDasharray="4 16" opacity={0.6} />
      {prints.map(([x, y, a], i) => (
        <ellipse key={i} cx={x} cy={y} rx={22} ry={13} fill={COLORS.sky} opacity={i === lit ? 1 : 0.4} {...sm} transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} />
      ))}
      {/* a loop arrow */}
      <path d="M 150 -10 q 10 40 -30 60 l 20 2 m -20 -2 l 6 -18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
    </g>
  );
};

/** A clock with hands whirling fast — hours lost to the daydream. */
export const TimeWarpClock: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <circle cx={0} cy={0} r={120} fill={COLORS.white} {...xl} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <circle key={i} cx={Math.sin(a) * 96} cy={-Math.cos(a) * 96} r={5} fill={COLORS.outline} />; })}
      {/* spinning hands + blur arcs */}
      <g transform={`rotate(${f * 24})`}><line x1={0} y1={0} x2={0} y2={-80} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      <g transform={`rotate(${f * 8})`}><line x1={0} y1={0} x2={0} y2={-56} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      <path d="M 0 -96 A 96 96 0 0 1 84 -46" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={0.7} />
      <circle cx={0} cy={0} r={10} fill={COLORS.outline} />
      <text x={0} y={150} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.outline}>…hours gone</text>
    </g>
  );
};

/** A glowing portal / escape hatch to somewhere better. */
export const EscapeHatch: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.6 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      <ellipse cx={0} cy={0} rx={150} ry={70} fill={COLORS.yellow} opacity={0.2 * glow} />
      <rect x={-96} y={-170} width={192} height={340} rx={96} fill={COLORS.purpleDeep} {...xl} />
      <rect x={-70} y={-146} width={140} height={292} rx={70} fill={COLORS.sky} opacity={glow} />
      {/* a hint of a sunny world through it */}
      <circle cx={30} cy={-50} r={24} fill={COLORS.yellow} {...sm} />
      <path d="M -70 90 Q 0 50 70 90 L 70 146 L -70 146 Z" fill={COLORS.greenLeaf} />
      {/* sparkles around the rim */}
      {[[-110, -60], [110, -40], [0, -180], [-100, 90]].map(([x, y], i) => <path key={i} d={`M ${x} ${y - 8} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z`} fill={COLORS.yellow} opacity={0.8} />)}
    </g>
  );
};

/** A fluffy cloud containing a tiny epic adventure (the daydream scene). */
export const DaydreamCloud: React.FC = () => (
  <g>
    {[[-120, 10, 72], [-30, -34, 90], [70, -24, 76], [140, 20, 62], [-50, 54, 62], [80, 56, 66]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={COLORS.white} {...lg} />)}
    <ellipse cx={0} cy={20} rx={160} ry={66} fill={COLORS.white} />
    {/* scene inside: a castle on a hill + a dragon */}
    <path d="M -80 50 Q -10 0 60 50 Z" fill={COLORS.greenLeaf} />
    <g transform="translate(10 18)"><rect x={-30} y={-10} width={60} height={40} fill={COLORS.ledGrey} {...sm} /><rect x={-30} y={-30} width={14} height={24} fill={COLORS.ledGrey} {...sm} /><rect x={16} y={-30} width={14} height={24} fill={COLORS.ledGrey} {...sm} /><path d="M -10 -30 l 6 -12 l 6 12 Z" fill={COLORS.red} /></g>
    <path d="M -70 -10 q -20 -20 -6 -34 q 10 10 20 6 q -8 16 -14 28 Z" fill={COLORS.red} {...sm} />
  </g>
);

/** A spinning top — the "is this real?" reality-check token. */
export const SpinningTop: React.FC = () => {
  const f = useCurrentFrame();
  const wob = Math.sin(f / 5) * 6;
  return (
    <g transform={`rotate(${wob})`}>
      <path d="M -70 -40 L 70 -40 L 0 90 Z" fill={COLORS.yellowDark} {...xl} />
      <ellipse cx={0} cy={-40} rx={70} ry={22} fill={COLORS.yellow} {...lg} />
      <rect x={-8} y={-80} width={16} height={46} rx={6} fill={COLORS.woodDark} {...lg} />
      <ellipse cx={0} cy={100} rx={50} ry={12} fill={COLORS.outline} opacity={0.14} />
      {/* spin lines */}
      <path d="M -100 -20 q -20 10 0 20 M 100 -20 q 20 10 0 20" fill="none" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
    </g>
  );
};

/** An idealised alter-ego — cape + mask, the "better me" of the fantasy. */
export const AlterEgo: React.FC = () => (
  <g>
    {/* cape */}
    <path d="M -70 -40 Q -120 80 -60 150 L 60 150 Q 120 80 70 -40 Z" fill={COLORS.red} {...xl} />
    <path d="M -70 -40 Q -40 40 0 150 Q 40 40 70 -40 Z" fill={shade(COLORS.red, 0.16)} />
    {/* head + mask */}
    <circle cx={0} cy={-80} r={58} fill={COLORS.white} {...xl} />
    <path d="M -50 -96 Q 0 -120 50 -96 L 40 -70 Q 0 -84 -40 -70 Z" fill={COLORS.lavender} {...lg} />
    <path d="M -40 -70 Q 0 -84 40 -70 L 36 -56 Q 0 -66 -36 -56 Z" fill={COLORS.lavender} opacity={0.6} />
    <circle cx={-18} cy={-84} r={7} fill={COLORS.outline} />
    <circle cx={18} cy={-84} r={7} fill={COLORS.outline} />
    <path d="M -14 -56 q 14 10 28 0" fill="none" {...sm} />
    {/* chest emblem */}
    <path d="M 0 30 l 18 -30 l -36 0 Z" fill={COLORS.yellow} {...sm} />
  </g>
);

/** A window with a dreamy gaze out of it (zoning out / staring into space). */
export const WindowGaze: React.FC = () => (
  <g>
    <rect x={-130} y={-150} width={260} height={320} rx={16} fill={COLORS.wood} {...xl} />
    <rect x={-106} y={-126} width={212} height={272} rx={8} fill={COLORS.sky} />
    {/* dreamy clouds + a far castle */}
    <ellipse cx={-40} cy={-70} rx={54} ry={26} fill={COLORS.white} opacity={0.9} />
    <ellipse cx={50} cy={-20} rx={44} ry={22} fill={COLORS.white} opacity={0.9} />
    <path d="M -106 90 Q 0 50 106 90 L 106 146 L -106 146 Z" fill={COLORS.greenLeaf} />
    <rect x={30} y={40} width={30} height={40} fill={COLORS.ledGrey} opacity={0.7} />
    <line x1={0} y1={-150} x2={0} y2={170} {...lg} />
    <line x1={-130} y1={10} x2={130} y2={10} {...lg} />
    {/* dreamy zzz/sparkle */}
    <path d="M 150 -120 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 Z" fill={COLORS.yellow} opacity={0.8} />
  </g>
);

/** A web of connected plot threads (elaborate, sprawling storylines). */
export const PlotWeb: React.FC = () => {
  const f = useCurrentFrame();
  const nodes: [number, number][] = [[-120, -70], [40, -110], [130, -10], [80, 90], [-60, 100], [-140, 20], [0, 0]];
  const edges = [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [0, 1], [2, 3], [4, 5]];
  return (
    <g>
      {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={COLORS.pinkDark} strokeWidth={STROKE.sm} opacity={0.6} />)}
      {nodes.map(([x, y], i) => { const g = 0.6 + 0.4 * Math.sin(f / 9 + i); return <circle key={i} cx={x} cy={y} r={i === 6 ? 26 : 18} fill={i === 6 ? COLORS.red : COLORS.pink} opacity={g} {...sm} />; })}
    </g>
  );
};

/** A bucket of popcorn — watching your own mind like a movie. */
export const PopcornMind: React.FC = () => (
  <g>
    <path d="M -80 -30 L 80 -30 L 60 130 L -60 130 Z" fill={COLORS.red} {...xl} />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-80 + i * 27} y={-30} width={14} height={160} fill={COLORS.white} opacity={0.5} />)}
    {/* popcorn mound */}
    {[[-50, -40], [-20, -56], [12, -50], [44, -40], [-36, -66], [28, -70], [-4, -80]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>{[[-10, 0], [10, 0], [0, -10], [0, 10]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={12} fill={COLORS.yellowSoft} {...sm} />)}</g>
    ))}
  </g>
);
