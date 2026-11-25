/**
 * anger.tsx — ALL-NEW art for "The Psychology of Anger". What it is (anger-flash,
 * anger-messenger), what's underneath (anger-iceberg), the hijack (amygdala-hijack,
 * ninety-sec-wave), the myths (vent-backfire, bottled-anger), and the skill
 * (pause-breath, assertive-vs-aggressive, fuel-to-fix). Token strokes, centered on
 * origin, ~300px tall.
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

/** Anger-flash — a flushed, furrowed face venting steam. */
export const AngerFlash: React.FC = () => {
  const f = useCurrentFrame();
  const shake = 2 * Math.sin(f);
  return (
    <g transform={`translate(${shake} 0)`}>
      <circle cx={0} cy={0} r={58} fill={shade(COLORS.red, 0.08)} {...xl} />
      {/* furrowed angry brows */}
      <path d="M -34 -16 L -10 -8 M 34 -16 L 10 -8" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={-16} cy={2} r={6} fill={COLORS.outline} /><circle cx={16} cy={2} r={6} fill={COLORS.outline} />
      {/* gritted frown */}
      <path d="M -20 28 Q 0 18 20 28" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* steam from the ears */}
      {[-58, 58].map((x, i) => <g key={i}>{[0, 1].map((j) => <path key={j} d={`M ${x} ${-20 + j * 4} q ${(i ? 1 : -1) * (14 + j * 6)} -16 0 -34`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(f / 4 + j)} />)}</g>)}
      <Label t="the flash of rage" />
    </g>
  );
};

/** Anger-messenger — anger holding up a sign: 'something's wrong'. */
export const AngerMessenger: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* a little red flame-messenger */}
      <path d="M 0 60 Q -40 20 -34 -20 Q -28 -54 0 -70 Q 8 -40 24 -40 Q 48 -40 40 2 Q 36 40 0 60 Z" fill={COLORS.red} {...xl} />
      <circle cx={-10} cy={-6} r={4} fill={COLORS.white} /><circle cx={12} cy={-6} r={4} fill={COLORS.white} />
      {/* an envelope / message it carries */}
      <g transform="translate(46 -40)" opacity={0.7 + g * 0.3}><rect x={-24} y={-16} width={48} height={32} rx={4} fill={COLORS.white} {...sm} /><path d="M -24 -16 L 0 2 L 24 -16" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} /></g>
      <text x={46} y={-70} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>"this matters!"</text>
      <Label t="anger is a messenger" />
    </g>
  );
};

/** Anger-iceberg — anger above water, the soft feelings hidden below. */
export const AngerIceberg: React.FC = () => (
  <g>
    {/* waterline */}
    <line x1={-110} y1={-8} x2={110} y2={-8} stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeDasharray="6 6" opacity={0.6} />
    {/* the angry tip above */}
    <path d="M -30 -8 L 0 -60 L 30 -8 Z" fill={COLORS.red} {...lg} />
    <text x={0} y={-24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>ANGER</text>
    {/* the big hidden base below */}
    <path d="M -30 -8 L 30 -8 L 70 70 L -70 70 Z" fill={COLORS.sky} opacity={0.4} {...lg} />
    {['hurt', 'fear', 'shame'].map((t, i) => <text key={i} x={-44 + i * 44} y={26 + (i % 2) * 20} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>{t}</text>)}
    <Label t="what's under the anger" />
  </g>
);

/** Amygdala-hijack — the amygdala grabbing the controls from the thinking brain. */
export const AmygdalaHijack: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 4);
  return (
    <g>
      {/* brain */}
      <path d="M -64 12 Q -80 -42 -36 -54 Q -22 -80 14 -66 Q 52 -78 60 -44 Q 86 -30 66 6 Q 72 40 28 46 Q 0 66 -30 46 Q -70 44 -64 12 Z" fill={COLORS.pink} {...xl} />
      {/* a dimmed 'thinking' front */}
      <text x={-30} y={-16} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline} opacity={0.4}>logic</text>
      {/* the amygdala flaring red, in control */}
      <circle cx={18} cy={24} r={20} fill={COLORS.red} opacity={0.6 + g * 0.4} />
      {[0, 1, 2].map((i) => <circle key={i} cx={18} cy={24} r={24 + i * 10} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={(g - i * 0.2) * 0.5} />)}
      <text x={18} y={28} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={11} fill={COLORS.white}>!</text>
      <Label t="the amygdala hijack" />
    </g>
  );
};

/** Ninety-sec-wave — a wave cresting at 90s then subsiding. */
export const NinetySecWave: React.FC = () => {
  const f = useCurrentFrame();
  const dot = (f % 90) / 90;
  const y = (t: number) => 40 - 90 * Math.sin(Math.min(t, 1) * Math.PI) * Math.exp(-t * 0.2);
  return (
    <g>
      <line x1={-100} y1={40} x2={100} y2={40} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <path d={Array.from({ length: 60 }).map((_, i) => { const t = i / 40; return `${i === 0 ? 'M' : 'L'} ${-100 + t * 200} ${y(t)}`; }).join(' ')} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={-100 + dot * 200} cy={y(dot)} r={9} fill={COLORS.red} />
      <text x={-20} y={-68} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>~90 seconds</text>
      <text x={-96} y={60} textAnchor="start" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>trigger</text>
      <text x={96} y={60} textAnchor="end" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>it passes</text>
      <Label t="the surge passes if you let it" />
    </g>
  );
};

/** Vent-backfire — punching a pillow, the anger-fire growing bigger. */
export const VentBackfire: React.FC = () => {
  const f = useCurrentFrame();
  const punch = Math.abs(Math.sin(f / 4));
  return (
    <g>
      {/* a fist */}
      <g transform={`translate(${-30 - punch * 10} 0)`}><circle cx={0} cy={0} r={28} fill={COLORS.skin} {...xl} />{[0, 1, 2].map((i) => <line key={i} x1={14} y1={-14 + i * 12} x2={26} y2={-14 + i * 12} stroke={shade(COLORS.skin, -0.12)} strokeWidth={STROKE.sm} />)}</g>
      {/* the 'vent' target, and the fire growing BIGGER not smaller */}
      <g transform="translate(40 0)"><path d="M 0 50 Q -30 10 -24 -20 Q -18 -46 0 -60 Q 6 -30 20 -34 Q 42 -38 36 0 Q 30 36 0 50 Z" fill={COLORS.red} {...xl} transform={`scale(${1 + punch * 0.2})`} /></g>
      <text x={44} y={-70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>bigger!</text>
      <Label t="venting feeds the fire" />
    </g>
  );
};

/** Bottled-anger — anger sealed in a pressurised, shaking bottle. */
export const BottledAnger: React.FC = () => {
  const f = useCurrentFrame();
  const shake = 2 * Math.sin(f * 1.5);
  return (
    <g transform={`translate(${shake} 0)`}>
      <path d="M -40 -40 L -40 56 Q 0 72 40 56 L 40 -40" fill={COLORS.red} opacity={0.25} {...xl} />
      <rect x={-18} y={-70} width={36} height={30} rx={6} fill={shade(COLORS.red, 0.1)} {...lg} />
      {/* bubbling pressure inside */}
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={-20 + i * 14} cy={30 - ((f * 2 + i * 12) % 60)} r={5} fill={COLORS.red} opacity={0.6} />)}
      {/* straining cap */}
      {[-24, 24].map((x, i) => <path key={i} d={`M ${x} -64 q ${(i ? 1 : -1) * 8} -8 0 -16`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      <Label t="bottling it isn't the answer" />
    </g>
  );
};

/** Pause-breath — a calm breath circle expanding, the 90s pause. */
export const PauseBreath: React.FC = () => {
  const f = useCurrentFrame();
  const b = 0.6 + 0.4 * Math.sin(f / 20);
  return (
    <g>
      <circle cx={0} cy={0} r={40 + b * 30} fill={COLORS.greenLeaf} opacity={0.2} />
      <circle cx={0} cy={0} r={40 + b * 30} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} />
      {/* a calming face */}
      <circle cx={0} cy={0} r={36} fill={COLORS.white} {...xl} />
      <path d="M -20 -6 Q -12 -14 -4 -6 M 4 -6 Q 12 -14 20 -6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <ellipse cx={0} cy={14} rx={7} ry={9} fill={COLORS.outline} opacity={0.8} />
      <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.greenDark}>{b > 0.5 ? 'breathe in' : 'breathe out'}</text>
      <Label t="pause, and breathe" />
    </g>
  );
};

/** Assertive-vs-aggressive — two doors: attack the person vs state the need. */
export const AssertiveVsAggressive: React.FC = () => (
  <g>
    {/* aggressive (red, crossed) */}
    <g transform="translate(-60 0)">
      <rect x={-44} y={-54} width={88} height={108} rx={8} fill={shade(COLORS.red, 0.1)} {...lg} />
      <path d="M -20 -10 L 20 30 M 20 -10 L -20 30" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={0} y={-24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.white}>"YOU idiot!"</text>
      <text x={0} y={74} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>attack</text>
    </g>
    {/* assertive (green, tick) */}
    <g transform="translate(60 0)">
      <rect x={-44} y={-54} width={88} height={108} rx={8} fill={shade(COLORS.greenLeaf, 0.1)} {...lg} />
      <path d="M -16 6 l 10 12 l 22 -26" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={0} y={-24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={12} fill={COLORS.white}>"I need..."</text>
      <text x={0} y={74} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>assert</text>
    </g>
    <Label t="assertive, not aggressive" />
  </g>
);

/** Fuel-to-fix — anger-fire channelled into a tool that fixes the problem. */
export const FuelToFix: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* a flame */}
      <path d="M -70 40 Q -90 0 -80 -30 Q -72 -54 -54 -64 Q -60 -36 -46 -40 Q -28 -44 -34 -8 Q -40 24 -70 40 Z" fill={COLORS.red} {...lg} />
      {/* channelled through an arrow */}
      <path d="M -24 -8 l 40 0 l -10 -10 m 10 10 l -10 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      {/* into a wrench fixing a bolt (change/action) */}
      <g transform="translate(56 -6)" opacity={0.8 + g * 0.2}><path d="M -20 20 L 6 -6 M -26 26 a 14 14 0 0 1 0 -20 l 8 8 l 6 -6 l -8 -8 a 14 14 0 0 1 20 0 a 14 14 0 0 1 -20 20 Z" fill={COLORS.greenLeaf} {...sm} /><circle cx={30} cy={-30} r={10} fill={COLORS.yellow} {...sm} /></g>
      <Label t="channel it into change" />
    </g>
  );
};
