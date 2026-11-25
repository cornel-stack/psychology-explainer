/**
 * self-awareness.tsx — ALL-NEW art for "Every Level of Self-Awareness Explained". The
 * climb: blind-spot, mount-confidence, hindsight-mirror, catch-moment, inner-map,
 * others-view, thought-watching, witness-self, self-accept, clear-self. Token strokes,
 * centered on origin, ~300px tall.
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

/** blind-spot — a blindfolded face, oblivious, with a hidden patch behind. */
export const BlindSpot: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 2 * Math.sin(f / 10);
  return (
    <g transform={`translate(0 ${bob})`}>
      <circle cx={0} cy={0} r={54} fill={COLORS.skin} {...xl} />
      {/* blindfold */}
      <rect x={-56} y={-16} width={112} height={26} rx={6} fill={shade(COLORS.navy, 0.1)} {...lg} />
      <path d="M -16 24 Q 0 30 16 24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* a hidden '?' patch floating behind, unseen */}
      <g transform="translate(60 -40)"><circle cx={0} cy={0} r={20} fill={COLORS.red} opacity={0.3} strokeDasharray="4 5" stroke={COLORS.red} strokeWidth={STROKE.sm} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.red}>?</text></g>
      <Label t="you can't see it" />
    </g>
  );
};

/** mount-confidence — a tiny figure standing proudly atop a small 'mount stupid' peak. */
export const MountConfidence: React.FC = () => {
  const f = useCurrentFrame();
  const puff = 0.9 + 0.1 * Math.sin(f / 8);
  return (
    <g>
      {/* the Dunning-Kruger curve */}
      <path d="M -100 40 Q -70 -60 -40 40 Q 0 68 60 10 Q 90 -14 100 40" fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* overconfident figure on the early peak */}
      <g transform={`translate(-70 -50) scale(${puff})`}><circle cx={0} cy={-10} r={16} fill={COLORS.yellow} {...lg} /><path d="M -8 -14 l 4 4 M 8 -14 l -4 4" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -8 -4 Q 0 2 8 -4" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -14 24 Q -16 2 0 2 Q 16 2 14 24 Z" fill={COLORS.yellow} {...sm} /></g>
      <text x={-70} y={-78} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.red}>"I know it all!"</text>
      <text x={-92} y={62} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>little skill</text>
      <Label t="too unaware to know it" />
    </g>
  );
};

/** hindsight-mirror — a figure looking back at a past reaction in a rear-view mirror. */
export const HindsightMirror: React.FC = () => {
  const f = useCurrentFrame();
  const glance = 2 * Math.sin(f / 9);
  return (
    <g>
      {/* present figure */}
      <circle cx={-30} cy={0} r={38} fill={COLORS.skin} {...xl} />
      <circle cx={-42} cy={-4} r={4} fill={COLORS.outline} /><circle cx={-20} cy={-4} r={4} fill={COLORS.outline} />
      <path d="M -40 14 Q -30 20 -20 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* rear-view mirror with a stormy past self */}
      <g transform={`translate(44 ${-10 + glance})`}>
        <rect x={-34} y={-24} width={68} height={48} rx={22} fill={COLORS.white} {...xl} />
        <circle cx={0} cy={0} r={16} fill={shade(COLORS.red, 0.04)} {...sm} /><path d="M -8 -4 l 6 4 M 8 -4 l -6 4" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -7 8 Q 0 4 7 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      <text x={44} y={-38} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>"why did I...?"</text>
      <Label t="aware, but too late" />
    </g>
  );
};

/** catch-moment — a hand catching a spark/thought mid-air, pausing it. */
export const CatchMoment: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      {/* an open, catching hand */}
      <path d="M -40 60 Q -46 6 -6 2 L 40 2 Q 60 4 56 30 Q 52 54 24 54 Z" fill={COLORS.skin} {...xl} transform="translate(0 -10)" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-10 + i * 18} -8 q -2 -18 2 -30`} fill="none" stroke={shade(COLORS.skin, -0.08)} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
      {/* a spark being caught */}
      <g transform="translate(8 -30)"><circle cx={0} cy={0} r={14 + glow * 4} fill={COLORS.yellow} opacity={0.4 + glow * 0.4} /><path d="M 0 -10 l 3 7 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 Z" fill={COLORS.yellow} {...sm} /></g>
      <text x={0} y={-58} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.greenDark}>pause</text>
      <Label t="catching it in the moment" />
    </g>
  );
};

/** inner-map — a head with a little labelled map of values/emotions inside. */
export const InnerMap: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={0} cy={0} r={60} fill={shade(COLORS.sky, 0.06)} {...xl} />
      {/* inner compass/map */}
      <circle cx={0} cy={0} r={42} fill={COLORS.white} {...lg} />
      {['values', 'fears', 'needs', 'triggers'].map((t, i) => { const a = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = Math.cos(a) * 26; const y = Math.sin(a) * 26; return <g key={i}><circle cx={x} cy={y} r={11} fill={[COLORS.yellow, COLORS.pink, COLORS.greenTeal, COLORS.red][i]} opacity={0.6 + pulse * 0.3} {...sm} /></g>; })}
      <circle cx={0} cy={0} r={6} fill={COLORS.outline} />
      <text x={0} y={-72} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>why I do what I do</text>
      <Label t="knowing your inner world" />
    </g>
  );
};

/** others-view — a figure seen through other people's eye-shaped lenses. */
export const OthersView: React.FC = () => {
  const f = useCurrentFrame();
  const blink = (f % 60) < 6;
  return (
    <g>
      {/* you in the middle */}
      <circle cx={0} cy={0} r={34} fill={COLORS.skin} {...xl} />
      <circle cx={-10} cy={-4} r={4} fill={COLORS.outline} /><circle cx={10} cy={-4} r={4} fill={COLORS.outline} />
      <path d="M -10 12 Q 0 18 10 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* surrounding eyes looking in */}
      {[-80, 0, 80].map((x, i) => { const y = i === 1 ? -72 : 0; return <g key={i} transform={`translate(${x} ${y})`}><ellipse cx={0} cy={0} rx={26} ry={16} fill={COLORS.white} {...lg} /><circle cx={0} cy={0} r={blink ? 2 : 7} fill={COLORS.outline} /><path d={`M 0 0 l ${-x * 0.2} ${-y * 0.2 + (y ? 20 : 0)}`} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeDasharray="3 6" opacity={0.4} /></g>; })}
      <Label t="how others see you" />
    </g>
  );
};

/** thought-watching — a small figure calmly observing a thought-bubble from outside it. */
export const ThoughtWatching: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 4 * Math.sin(f / 10);
  return (
    <g>
      {/* the thought cloud */}
      <g transform={`translate(${30 + drift} -20)`}><path d="M -40 10 Q -46 -26 0 -26 Q 46 -26 40 10 Q 40 30 0 28 Q -40 30 -40 10 Z" fill={shade(COLORS.lavender, 0.08)} {...lg} /><text x={0} y={-2} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>a thought</text></g>
      {/* the observing figure, separate, looking at it */}
      <g transform="translate(-54 10)">
        <circle cx={0} cy={-26} r={24} fill={COLORS.greenTeal} {...xl} />
        <circle cx={6} cy={-28} r={4} fill={COLORS.outline} /><circle cx={-10} cy={-28} r={4} fill={COLORS.outline} />
        <path d="M -8 -14 Q 0 -10 8 -14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -24 40 Q -28 -2 0 -2 Q 28 -2 24 40 Z" fill={shade(COLORS.greenTeal, 0.06)} {...xl} />
      </g>
      <Label t="watching your own mind" />
    </g>
  );
};

/** witness-self — a calm witness glowing at the eye of a swirling thought-storm. */
export const WitnessSelf: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 1.5;
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {/* swirling storm of thoughts */}
      <g transform={`rotate(${spin})`}>{Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; const r = 60 + (i % 3) * 16; return <ellipse key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} rx={20} ry={10} fill={shade(COLORS.ledGrey, 0.1)} opacity={0.3} transform={`rotate(${(i / 10) * 360})`} />; })}</g>
      {/* calm witness in the centre */}
      <circle cx={0} cy={0} r={40 + glow * 4} fill={COLORS.yellow} opacity={0.2 + glow * 0.2} />
      <circle cx={0} cy={0} r={32} fill={COLORS.skin} {...xl} />
      <path d="M -14 -6 Q -6 -12 2 -6 M 2 -6 Q 10 -12 18 -6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" transform="translate(-6 0)" />
      <path d="M -10 8 Q 0 14 10 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="you are not your thoughts" />
    </g>
  );
};

/** self-accept — two hands gently holding a whole heart, light and dark parts and all. */
export const SelfAccept: React.FC = () => {
  const f = useCurrentFrame();
  const beat = 0.95 + 0.05 * Math.sin(f / 8);
  return (
    <g transform={`scale(${beat})`}>
      {/* cupped hands */}
      <path d="M -60 40 Q -70 -10 -30 0 Q -10 6 0 24" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M 60 40 Q 70 -10 30 0 Q 10 6 0 24" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* a whole heart, half bright half shadowed */}
      <path d="M 0 30 q -46 -34 -46 -56 q 0 -20 22 -20 q 14 0 24 16 q 10 -16 24 -16 q 22 0 22 20 q 0 22 -46 56 Z" fill={COLORS.pink} {...xl} transform="translate(0 -14)" />
      <path d="M 0 16 q -46 -34 -46 -56 q 0 -20 22 -20 q 14 0 24 16 L 0 -44 Z" fill={shade(COLORS.pink, -0.08)} opacity={0.5} transform="translate(0 0)" />
      <Label t="knowing AND accepting it" />
    </g>
  );
};

/** clear-self — a crisp, honest self-portrait in a clear mirror, seen plainly. */
export const ClearSelf: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 9);
  return (
    <g>
      {/* clear mirror */}
      <rect x={-56} y={-70} width={112} height={150} rx={56} fill={shade(COLORS.sky, 0.1)} opacity={0.3 + glow * 0.15} {...xl} />
      {/* a clear, calm self */}
      <circle cx={0} cy={-18} r={40} fill={COLORS.skin} {...xl} />
      <path d="M -18 -26 Q -10 -32 -2 -26 M 2 -26 Q 10 -32 18 -26" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-12} cy={-20} r={4} fill={COLORS.outline} /><circle cx={12} cy={-20} r={4} fill={COLORS.outline} />
      <path d="M -16 0 Q 0 16 16 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* a soft clarity sparkle */}
      <path d="M 40 -56 l -6 12 l 6 2 l -6 12 l 14 -18 l -6 0 Z" fill={COLORS.yellow} opacity={0.7} {...sm} />
      <Label t="seeing yourself clearly" />
    </g>
  );
};
