/**
 * crying.tsx — ALL-NEW art for "The Psychology of People Who Cry Easily".
 * The mechanics (welling-eye, overflow-cup, sensitive-antenna, empathy-mirror),
 * the purpose (tear-signal, vagal-calm), the range (happy-tears), the cost
 * (held-back) and the permission (cry-permission, kind-tissue). Token strokes,
 * centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Tear: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = COLORS.sky }) => (
  <path d={`M ${x} ${y} q ${-9 * s} ${12 * s} 0 ${22 * s} q ${9 * s} ${-10 * s} 0 ${-22 * s} Z`} fill={c} {...sm} />
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Welling-eye — a single eye brimming, a tear about to fall. */
export const WellingEye: React.FC = () => {
  const f = useCurrentFrame();
  const drop = (f % 60) / 60;
  return (
    <g>
      <path d="M -94 0 Q 0 -64 94 0 Q 0 64 -94 0 Z" fill={COLORS.white} {...xl} />
      <circle cx={0} cy={2} r={36} fill={COLORS.sky} {...lg} /><circle cx={0} cy={2} r={16} fill={COLORS.outline} />
      <circle cx={12} cy={-10} r={7} fill={COLORS.white} />
      {/* brim of water on the lower lid */}
      <path d="M -80 18 Q 0 44 80 18" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} />
      <Tear x={-30} y={30 + drop * 40} s={1} />
      <Label t="brimming over" />
    </g>
  );
};

/** Overflow-cup — a cup filled past the brim, emotion spilling out. */
export const OverflowCup: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      <path d="M -60 -40 L -52 70 Q 0 86 52 70 L 60 -40 Z" fill={shade(COLORS.white, 0.1)} {...xl} />
      {/* water, heaped above the rim */}
      <path d="M -58 -34 Q 0 -58 58 -34 L 52 60 Q 0 74 -52 60 Z" fill={COLORS.sky} opacity={0.85} />
      <path d="M -58 -34 Q 0 -58 58 -34" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={g} />
      {/* spill-over tears down the sides */}
      <Tear x={-54} y={-20} s={0.8} /><Tear x={54} y={-24} s={0.8} />
      <Tear x={-46} y={30} s={0.7} /><Tear x={48} y={26} s={0.7} />
      <Label t="filled past the brim" />
    </g>
  );
};

/** Sensitive-antenna — a head with fine antennae picking up faint signals. */
export const SensitiveAntenna: React.FC = () => {
  const f = useCurrentFrame();
  const q = 4 * Math.sin(f / 5);
  return (
    <g>
      <circle cx={0} cy={10} r={56} fill={COLORS.white} {...xl} />
      <circle cx={-18} cy={6} r={7} fill={COLORS.outline} /><circle cx={18} cy={6} r={7} fill={COLORS.outline} />
      <path d="M -16 30 Q 0 40 16 30" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* antennae with sensing orbs + ripples */}
      {[-30, 30].map((x, i) => <g key={i}><path d={`M ${x * 0.7} -40 Q ${x} -74 ${x + (i ? q : -q)} -96`} fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.lg} strokeLinecap="round" /><circle cx={x + (i ? q : -q)} cy={-98} r={9} fill={COLORS.lavender} {...sm} /><circle cx={x + (i ? q : -q)} cy={-98} r={16} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.5 + 0.3 * Math.sin(f / 4)} /></g>)}
      <Label t="turned up high" />
    </g>
  );
};

/** Empathy-mirror — one figure's feeling reflected into another. */
export const EmpathyMirror: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {[-62, 62].map((x, i) => (
        <g key={i} transform={`translate(${x} 0)`}>
          <circle cx={0} cy={0} r={46} fill={i ? COLORS.white : COLORS.pink} {...xl} />
          <circle cx={-15} cy={-6} r={6} fill={COLORS.outline} /><circle cx={15} cy={-6} r={6} fill={COLORS.outline} />
          <path d="M -15 18 Q 0 8 15 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
          <Tear x={-14} y={12} s={0.7} c={COLORS.sky} /><Tear x={10} y={14} s={0.7} c={COLORS.sky} />
        </g>
      ))}
      {/* feeling arcing across */}
      {[0, 1, 2].map((i) => <path key={i} d={`M -20 ${-10 + i * 6} Q 0 ${-28 - i * 4} 20 ${-10 + i * 6}`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={pulse * (1 - i * 0.2)} />)}
      <Label t="you catch their feeling" />
    </g>
  );
};

/** Tear-signal — a tear rising like a flare, calling for care. */
export const TearSignal: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* beams radiating from a big tear */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M 0 0 L ${Math.cos((i / 8) * Math.PI * 2 - Math.PI / 2) * 100} ${Math.sin((i / 8) * Math.PI * 2 - Math.PI / 2) * 100}`} stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={g} strokeLinecap="round" />)}
      <path d="M 0 -56 q -26 34 0 64 q 26 -28 0 -64 Z" fill={COLORS.sky} {...lg} />
      <ellipse cx={-8} cy={-6} rx={7} ry={12} fill={COLORS.white} opacity={0.6} />
      {/* small hearts of care drawn toward it */}
      {[-90, 90].map((x, i) => <path key={i} d={`M ${x} 70 q -7 -8 -12 -1 q -3 6 12 13 q 15 -7 12 -13 q -5 -7 -12 1 Z`} fill={COLORS.pink} {...sm} opacity={0.8} />)}
      <Label t="tears call for care" />
    </g>
  );
};

/** Vagal-calm — a tear, then a calming wave settling the body. */
export const VagalCalm: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 90) / 90;
  return (
    <g>
      <circle cx={0} cy={-6} r={54} fill={COLORS.white} {...xl} />
      <path d="M -22 -14 Q -14 -6 -6 -14 M 6 -14 Q 14 -6 22 -14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -14 16 Q 0 24 14 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Tear x={-26} y={2} s={0.8} /><Tear x={22} y={4} s={0.8} />
      {/* a calming wave expanding outward */}
      <circle cx={0} cy={-6} r={60 + t * 40} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} opacity={1 - t} />
      <path d="M -70 76 q 18 -16 35 0 q 17 16 35 0" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="the body settles after" />
    </g>
  );
};

/** Happy-tears — a beaming face crying with joy, sparkles around. */
export const HappyTears: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <circle cx={0} cy={0} r={60} fill={COLORS.white} {...xl} />
      {/* happy closed-arc eyes */}
      <path d="M -30 -8 Q -20 -22 -10 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 10 -8 Q 20 -22 30 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* big grin */}
      <path d="M -26 18 Q 0 46 26 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Tear x={-34} y={2} s={1} c={COLORS.sky} /><Tear x={30} y={2} s={1} c={COLORS.sky} />
      {[[-78, -40], [80, -36], [-70, 46], [74, 48]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${f * 2 + i * 40})`}><path d="M 0 -12 l 3 9 l 9 3 l -9 3 l -3 9 l -3 -9 l -9 -3 l 9 -3 Z" fill={COLORS.yellow} /></g>)}
      <Label t="happy tears are real too" />
    </g>
  );
};

/** Held-back — a face straining to hold tears in, under pressure. */
export const HeldBack: React.FC = () => {
  const f = useCurrentFrame();
  const strain = 2 * Math.sin(f / 2);
  return (
    <g>
      <g transform={`translate(${strain} 0)`}>
        <circle cx={0} cy={0} r={58} fill={shade(COLORS.skin, 0.02)} {...xl} />
        {/* tight, pressed-shut eyes */}
        <path d="M -34 -8 L -8 -8 M 8 -8 L 34 -8" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        {/* wobbling, bitten lip */}
        <path d="M -20 24 q 8 -8 20 0 q 8 6 0 10 q -12 6 -20 -2 Z" fill={COLORS.pinkDark} {...sm} />
        {/* a stray tear escaping despite it */}
        <Tear x={28} y={6} s={0.7} />
      </g>
      {/* pressure arrows pushing in */}
      {[[-96, 0, 0], [96, 0, 180]].map(([x, y, r], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M 0 0 l -18 -10 l 0 20 Z" fill={COLORS.red} /></g>)}
      <Label t="holding it back is work" />
    </g>
  );
};

/** Kind-tissue — a soft tissue box offering comfort. */
export const KindTissue: React.FC = () => {
  const f = useCurrentFrame();
  const pop = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <g>
      <rect x={-70} y={-20} width={140} height={90} rx={14} fill={COLORS.pink} {...xl} />
      <rect x={-70} y={-20} width={140} height={28} rx={14} fill={shade(COLORS.pink, 0.12)} />
      <ellipse cx={0} cy={-18} rx={28} ry={9} fill={COLORS.outline} />
      {/* a tissue being offered up */}
      <path d={`M -18 ${-26 - pop * 14} Q 0 ${-56 - pop * 14} 18 ${-26 - pop * 14} Q 10 -14 0 -18 Q -10 -14 -18 ${-26 - pop * 14} Z`} fill={COLORS.white} {...sm} />
      {/* a little heart on the box */}
      <path d="M 0 36 q -9 -10 -15 -1 q -4 7 15 17 q 19 -10 15 -17 q -6 -9 -15 1 Z" fill={COLORS.white} opacity={0.9} />
      <Label t="here, take one" />
    </g>
  );
};

/** Cry-permission — a green permission slip / open valve: it's okay to cry. */
export const CryPermission: React.FC = () => (
  <g>
    <rect x={-84} y={-56} width={168} height={112} rx={12} fill={COLORS.white} {...xl} transform="rotate(-4)" />
    <g transform="rotate(-4)">
      <circle cx={-54} cy={-26} r={18} fill={COLORS.greenLeaf} {...sm} /><path d="M -62 -26 l 6 8 l 12 -16" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={-26} y={-36} width={96} height={12} rx={6} fill={shade(COLORS.white, 0.16)} />
      <rect x={-26} y={-14} width={74} height={12} rx={6} fill={shade(COLORS.white, 0.16)} />
      <text x={0} y={36} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.greenDark}>it's okay</text>
    </g>
    <Label t="permission to cry" />
  </g>
);
