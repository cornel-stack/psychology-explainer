/**
 * watched.tsx — ALL-NEW art for "Why You Can Feel Someone Watching You".
 * The detector (neck-prickle, eye-radar, sclera-eyes, peripheral-catch, stare-alarm),
 * the myth (sixth-sense-myth, turn-and-look, hit-miss-tally), the social effect
 * (spotlight-self) and the settle (all-clear). Token strokes, centered on origin,
 * ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A simple head seen from the front, reused across the set. */
const Head: React.FC<{ r?: number; c?: string; look?: number; worried?: boolean }> = ({ r = 40, c = COLORS.white, look = 0, worried = false }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={c} {...xl} />
    <circle cx={-r * 0.32 + look} cy={-r * 0.08} r={r * 0.17} fill={COLORS.white} {...sm} /><circle cx={-r * 0.32 + look * 1.6} cy={-r * 0.08} r={r * 0.08} fill={COLORS.outline} />
    <circle cx={r * 0.32 + look} cy={-r * 0.08} r={r * 0.17} fill={COLORS.white} {...sm} /><circle cx={r * 0.32 + look * 1.6} cy={-r * 0.08} r={r * 0.08} fill={COLORS.outline} />
    {worried
      ? <path d={`M ${-r * 0.26} ${r * 0.42} Q 0 ${r * 0.24} ${r * 0.26} ${r * 0.42}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : <path d={`M ${-r * 0.26} ${r * 0.34} Q 0 ${r * 0.52} ${r * 0.26} ${r * 0.34}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Neck-prickle — a figure from behind, hairs standing up, a tingle on the nape. */
export const NeckPrickle: React.FC = () => {
  const f = useCurrentFrame();
  const buzz = 0.5 + 0.5 * Math.sin(f / 4);
  return (
    <g>
      {/* back of head + shoulders */}
      <path d="M -70 90 Q -74 8 0 2 Q 74 8 70 90 Z" fill={COLORS.hoodie} {...xl} />
      <circle cx={0} cy={-30} r={46} fill={shade(COLORS.skin, 0.04)} {...xl} />
      {/* raised hairs / tingle arcs on the nape */}
      {[-30, -12, 6, 24].map((x, i) => <path key={i} d={`M ${x} 16 q 4 -16 0 -30`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6 + 0.4 * buzz} />)}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${28 + i * 10} ${-4 - i * 8} q 14 ${-4} 20 ${-16}`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={buzz} />)}
      <Label t="that prickle on your neck" />
    </g>
  );
};

/** Eye-radar — an eye with a targeting sweep locking onto a gaze line. */
export const EyeRadar: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f / 20) % (Math.PI * 2);
  return (
    <g>
      <circle cx={0} cy={0} r={92} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={0.4} />
      <circle cx={0} cy={0} r={60} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={0.4} />
      <line x1={0} y1={0} x2={Math.cos(a) * 92} y2={Math.sin(a) * 92} stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />
      {/* the eye */}
      <path d="M -70 0 Q 0 -52 70 0 Q 0 52 -70 0 Z" fill={COLORS.white} {...xl} />
      <circle cx={0} cy={0} r={24} fill={COLORS.sky} {...lg} /><circle cx={0} cy={0} r={11} fill={COLORS.outline} />
      <circle cx={8} cy={-8} r={4} fill={COLORS.white} />
      <Label t="your built-in eye detector" />
    </g>
  );
};

/** Sclera-eyes — the human eye's visible white, which broadcasts our gaze. */
export const ScleraEyes: React.FC = () => (
  <g>
    {[-60, 60].map((x, i) => (
      <g key={i} transform={`translate(${x} -10)`}>
        <path d="M -52 0 Q 0 -40 52 0 Q 0 40 -52 0 Z" fill={COLORS.white} {...xl} />
        <circle cx={14} cy={0} r={18} fill={COLORS.wood} {...lg} /><circle cx={14} cy={0} r={8} fill={COLORS.outline} />
      </g>
    ))}
    <path d="M -120 60 Q 0 50 120 60" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} strokeDasharray="4 14" />
    <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>whites make gaze readable</text>
    <Label t="we broadcast where we look" />
  </g>
);

/** Peripheral-catch — a wide view with a watcher caught at the very edge. */
export const PeripheralCatch: React.FC = () => {
  const f = useCurrentFrame();
  const peek = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <g>
      {/* the clear centre (a focused little scene) fading to blurry edges */}
      <ellipse cx={0} cy={0} rx={120} ry={80} fill={shade(COLORS.sky, 0.08)} opacity={0.3} />
      <Head r={30} c={COLORS.white} />
      {/* the edge watcher, half-hidden */}
      <g transform={`translate(${104} 0)`} opacity={0.5 + 0.5 * peek}>
        <rect x={0} y={-80} width={40} height={160} fill={shade(COLORS.wood, -0.04)} {...lg} />
        <circle cx={-6} cy={-30} r={22} fill={COLORS.skin} {...lg} />
        <circle cx={-14} cy={-32} r={5} fill={COLORS.outline} />
      </g>
      {/* motion ticks at the edge */}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${70 + i * 10} ${-40} q 8 4 0 10`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={peek} />)}
      <Label t="movement at the edge" />
    </g>
  );
};

/** Stare-alarm — a bell ringing the instant a pair of eyes points at you. */
export const StareAlarm: React.FC = () => {
  const f = useCurrentFrame();
  const ring = Math.sin(f / 2);
  return (
    <g>
      <g transform={`rotate(${8 * ring})`}>
        <path d="M -44 40 Q -44 -40 0 -46 Q 44 -40 44 40 Z" fill={COLORS.red} {...xl} />
        <rect x={-56} y={40} width={112} height={16} rx={8} fill={shade(COLORS.red, 0.14)} {...lg} />
        <circle cx={0} cy={66} r={11} fill={COLORS.redDark} />
        <circle cx={0} cy={-50} r={7} fill={COLORS.redDark} />
      </g>
      {[-70, 70].map((x, i) => <g key={i} transform={`translate(${x} -2)`} opacity={0.4 + 0.4 * Math.abs(ring)}>{[0, 1].map((j) => <path key={j} d={`M ${(i ? 1 : -1) * (10 + j * 12)} -18 q ${(i ? 1 : -1) * 8} 18 0 36`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>)}
      {/* a pair of eyes aiming in */}
      <g transform="translate(0 2)">{[-16, 16].map((x, i) => <g key={i}><circle cx={x} cy={0} r={7} fill={COLORS.white} {...sm} /><circle cx={x} cy={0} r={3} fill={COLORS.outline} /></g>)}</g>
      <Label t="a direct stare = alarm" />
    </g>
  );
};

/** Sixth-sense-myth — a crystal ball of "psychic staring sense", crossed out. */
export const SixthSenseMyth: React.FC = () => (
  <g>
    <ellipse cx={0} cy={66} rx={56} ry={14} fill={COLORS.wood} {...lg} />
    <circle cx={0} cy={0} r={62} fill={COLORS.lavender} opacity={0.5} {...xl} />
    <circle cx={0} cy={0} r={62} fill="none" {...xl} />
    {/* a little eye glowing inside */}
    <path d="M -30 0 Q 0 -22 30 0 Q 0 22 -30 0 Z" fill={COLORS.white} {...sm} /><circle cx={0} cy={0} r={10} fill={COLORS.lavenderDark} />
    <circle cx={-18} cy={-18} r={14} fill={COLORS.white} opacity={0.4} />
    {/* the big NO cross */}
    <circle cx={0} cy={0} r={80} fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} />
    <line x1={-56} y1={56} x2={56} y2={-56} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <Label t="not a psychic sense" />
  </g>
);

/** Turn-and-look — you turn, and your movement pulls their gaze onto you. */
export const TurnAndLook: React.FC = () => {
  const f = useCurrentFrame();
  const turn = (f % 90) < 45 ? 0 : 1; // you've just turned
  return (
    <g>
      {/* you, turning */}
      <g transform={`translate(-56 0)`}><Head r={34} c={COLORS.hoodie} look={turn ? 10 : 0} worried /><path d="M -46 86 Q -40 30 0 26 Q 40 30 46 86 Z" fill={COLORS.hoodie} {...xl} /></g>
      {/* them — gaze snapping toward you once you move */}
      <g transform={`translate(70 4)`}><Head r={30} c={COLORS.white} look={turn ? -8 : 2} /></g>
      <path d={`M -10 -6 Q 24 ${turn ? -24 : -2} 44 -6`} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={turn ? 0.8 : 0.2} />
      <Label t="your turn draws their eyes" />
    </g>
  );
};

/** Hit-miss-tally — we count the hits, forget the misses. */
export const HitMissTally: React.FC = () => (
  <g>
    <line x1={0} y1={-70} x2={0} y2={70} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
    {/* hits — bright, remembered */}
    <text x={-78} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>remembered</text>
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-130 + i * 20} y1={-20} x2={-130 + i * 20} y2={40} stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
    <line x1={-134} y1={10} x2={-46} y2={10} stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <text x={-90} y={64} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>felt it &amp; right</text>
    {/* misses — faint, forgotten */}
    <text x={84} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline} opacity={0.4}>forgotten</text>
    {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={44 + i * 18} y1={-20} x2={44 + i * 18} y2={40} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.35} />)}
    <text x={90} y={64} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline} opacity={0.4}>felt it &amp; wrong</text>
    <Label t="we only count the hits" />
  </g>
);

/** Spotlight-self — a lone figure under a stage spotlight, feeling watched. */
export const SpotlightSelf: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.3 + 0.2 * Math.sin(f / 8);
  return (
    <g>
      <path d="M -10 -96 L -90 80 L 90 80 Z" fill={COLORS.yellowSoft} opacity={0.4 + g} />
      <circle cx={-10} cy={-96} r={14} fill={COLORS.yellow} {...sm} />
      <ellipse cx={0} cy={82} rx={90} ry={16} fill={COLORS.yellowSoft} opacity={0.6} />
      {/* the self, small and self-conscious */}
      <g transform="translate(0 6)"><Head r={30} c={COLORS.white} worried /><path d="M -40 80 Q -34 24 0 20 Q 34 24 40 80 Z" fill={COLORS.hoodie} {...xl} /></g>
      {/* phantom eyes in the dark around */}
      {[[-120, -30], [120, -40], [-120, 60], [120, 50]].map(([x, y], i) => <g key={i} opacity={0.5}>{[-10, 10].map((dx) => <g key={dx}><circle cx={x + dx} cy={y} r={6} fill={COLORS.white} {...sm} /><circle cx={x + dx} cy={y} r={2.5} fill={COLORS.outline} /></g>)}</g>)}
      <Label t="the spotlight effect" />
    </g>
  );
};

/** All-clear — scanning the room, breathing out: nobody there. */
export const AllClear: React.FC = () => {
  const f = useCurrentFrame();
  const breathe = 0.5 + 0.5 * Math.sin(f / 18);
  return (
    <g>
      <Head r={40} c={COLORS.white} />
      {/* calm scan line sweeping, finding nothing */}
      <path d="M -110 -40 Q 0 -70 110 -40" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.sm} strokeDasharray="4 12" opacity={0.6} />
      {/* relaxed breath out */}
      <g transform="translate(60 -58)" opacity={0.4 + 0.5 * breathe}><circle cx={0} cy={0} r={10 + breathe * 6} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} /></g>
      {/* a little green check: all safe */}
      <g transform="translate(0 70)"><circle cx={0} cy={0} r={22} fill={COLORS.greenLeaf} {...lg} /><path d="M -10 0 l 6 8 l 14 -16" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
      <Label t="look, and settle" />
    </g>
  );
};
