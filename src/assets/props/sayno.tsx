/**
 * sayno.tsx — ALL-NEW art for "Why You Can't Say No". What it is (silent-no,
 * juggle-everyone), the roots (fawn-appease, earn-love), why it's hard (no-threat-alarm),
 * the costs (resentment-pot, pour-empty-cup, guilt-after-no), and the freedom
 * (boundary-gate, kind-firm-no). Token strokes, centered on origin, ~300px tall.
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
const Head: React.FC<{ r?: number; c?: string; worried?: boolean }> = ({ r = 40, c = COLORS.white, worried = false }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={c} {...xl} />
    <circle cx={-r * 0.3} cy={-r * 0.06} r={r * 0.1} fill={COLORS.outline} /><circle cx={r * 0.3} cy={-r * 0.06} r={r * 0.1} fill={COLORS.outline} />
    {worried
      ? <path d={`M ${-r * 0.24} ${r * 0.42} Q 0 ${r * 0.26} ${r * 0.24} ${r * 0.42}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : <path d={`M ${-r * 0.26} ${r * 0.3} Q 0 ${r * 0.48} ${r * 0.26} ${r * 0.3}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);

/** Silent-no — mouth says "yes!" out loud, a thought bubble screams "no". */
export const SilentNo: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <Head r={48} />
      {/* talking mouth saying yes */}
      <g transform="translate(60 40)"><rect x={-30} y={-20} width={68} height={40} rx={12} fill={COLORS.greenLeaf} {...lg} /><path d="M -22 20 l -14 16 l 24 -6 Z" fill={COLORS.greenLeaf} {...sm} /><text x={4} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>yes!</text></g>
      {/* inner thought screaming no */}
      <g transform="translate(-50 -60)" opacity={0.7 + g * 0.3}><ellipse cx={0} cy={0} rx={42} ry={30} fill={COLORS.red} {...lg} /><circle cx={28} cy={26} r={8} fill={COLORS.red} {...sm} /><text x={0} y={7} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.white}>NO</text></g>
      <Label t="'yes' outside, 'no' inside" />
    </g>
  );
};

/** Juggle-everyone — a frazzled figure juggling others' needs, dropping its own. */
export const JuggleEveryone: React.FC = () => {
  const f = useCurrentFrame();
  const a = f / 6;
  return (
    <g>
      <g transform="translate(0 30)"><Head r={34} worried /></g>
      {/* juggled balls = others' demands */}
      {[0, 1, 2, 3].map((i) => { const ang = a + (i / 4) * Math.PI * 2; return <circle key={i} cx={Math.cos(ang) * 60} cy={-30 + Math.sin(ang) * 30} r={16} fill={[COLORS.red, COLORS.sky, COLORS.yellow, COLORS.pink][i]} {...lg} />; })}
      {/* a dropped ball (your own needs) */}
      <circle cx={-70} cy={74} r={16} fill={COLORS.greenLeaf} {...lg} opacity={0.6} />
      <text x={-70} y={100} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>you</text>
      <Label t="everyone's needs but yours" />
    </g>
  );
};

/** Fawn-appease — a small figure appeasing a looming shadow, palms up. */
export const FawnAppease: React.FC = () => {
  const f = useCurrentFrame();
  const loom = 2 * Math.sin(f / 5);
  return (
    <g>
      {/* looming shape */}
      <path d={`M 40 -80 Q ${100 + loom} -20 ${80 + loom} 80 L 20 80 Q 10 -10 40 -80 Z`} fill={shade(COLORS.outline, 0.3)} opacity={0.7} {...lg} />
      {/* small appeasing figure, palms raised */}
      <g transform="translate(-30 10)"><Head r={30} worried /><path d="M -34 70 Q -38 18 0 14 Q 38 18 34 70 Z" fill={COLORS.hoodie} {...xl} /><path d="M -24 36 l -18 -10 M 24 36 l 20 -8" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" /><circle cx={-44} cy={-14} r={9} fill={COLORS.skin} {...sm} /><circle cx={44} cy={-12} r={9} fill={COLORS.skin} {...sm} /></g>
      <Label t="appease to feel safe" />
    </g>
  );
};

/** Earn-love — a child performing/offering a star to a parent for approval. */
export const EarnLove: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* parent */}
      <g transform="translate(50 -10)"><circle cx={0} cy={-10} r={34} fill={COLORS.yellowSoft} {...xl} /><circle cx={-12} cy={-14} r={5} fill={COLORS.outline} /><circle cx={12} cy={-14} r={5} fill={COLORS.outline} /></g>
      {/* child offering up a gold star */}
      <g transform="translate(-50 20)"><Head r={26} /><path d="M -26 60 Q -30 16 0 12 Q 30 16 26 60 Z" fill={COLORS.hoodie} {...lg} /><path d="M 18 24 l 26 -20" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      <g transform="translate(-2 -12)" opacity={0.6 + g * 0.4}><path d="M 0 -16 l 5 11 l 12 1 l -9 8 l 3 12 l -11 -6 l -11 6 l 3 -12 l -9 -8 l 12 -1 Z" fill={COLORS.yellow} {...sm} /></g>
      <Label t="love felt earned, not given" />
    </g>
  );
};

/** No-threat-alarm — the word "NO" wired to a blaring alarm bell. */
export const NoThreatAlarm: React.FC = () => {
  const f = useCurrentFrame();
  const ring = Math.sin(f / 2);
  return (
    <g>
      {/* the word NO */}
      <g transform="translate(-54 0)"><circle cx={0} cy={0} r={44} fill={COLORS.white} {...xl} /><text x={0} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.outline}>NO</text></g>
      {/* wire to alarm */}
      <path d="M -8 0 l 20 0" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="4 6" />
      {/* alarm bell */}
      <g transform={`translate(60 0) rotate(${6 * ring})`}><path d="M -34 30 Q -34 -32 0 -36 Q 34 -32 34 30 Z" fill={COLORS.red} {...xl} /><rect x={-44} y={30} width={88} height={14} rx={6} fill={shade(COLORS.red, 0.14)} {...lg} /><circle cx={0} cy={52} r={9} fill={COLORS.redDark} /></g>
      {[96, 100].map((x, i) => <path key={i} d={`M ${x} -16 q 14 16 0 32`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.4 + 0.4 * Math.abs(ring)} />)}
      <Label t="'no' trips a danger alarm" />
    </g>
  );
};

/** Resentment-pot — a sealed pot of unspoken 'no's boiling over. */
export const ResentmentPot: React.FC = () => {
  const f = useCurrentFrame();
  const bub = (i: number) => -40 - ((f * 2 + i * 20) % 60);
  return (
    <g>
      <path d="M -60 -10 L -56 60 Q 0 76 56 60 L 60 -10 Z" fill={shade(COLORS.outline, 0.3)} {...xl} />
      <ellipse cx={0} cy={-10} rx={60} ry={16} fill={COLORS.red} />
      {/* clamped lid */}
      <ellipse cx={0} cy={-22} rx={54} ry={12} fill={shade(COLORS.ledGrey, 0.1)} {...lg} />
      {/* boiling 'no's escaping */}
      {[0, 1, 2].map((i) => <text key={i} x={-30 + i * 30} y={bub(i)} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red} opacity={0.7}>no</text>)}
      <Label t="swallowed 'no's become resentment" />
    </g>
  );
};

/** Pour-empty-cup — pouring for others from an empty, drained cup. */
export const PourEmptyCup: React.FC = () => (
  <g>
    {/* the giver's empty cup, tipped */}
    <g transform="rotate(-30 -30 0)"><rect x={-54} y={-30} width={54} height={56} rx={8} fill={COLORS.white} {...xl} /><path d="M 0 -18 q 24 6 0 30" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} /></g>
    {/* just a dry drip */}
    <path d="M 6 -6 q -5 7 0 14 q 5 -7 0 -14 Z" fill={COLORS.ledGrey} opacity={0.5} />
    {/* receiving cups waiting, empty */}
    {[40, 80].map((x, i) => <g key={i} transform={`translate(${x} 36)`}><rect x={-20} y={-24} width={40} height={44} rx={6} fill={shade(COLORS.sky, 0.06)} {...lg} /></g>)}
    <Label t="you can't pour from empty" />
  </g>
);

/** Guilt-after-no — a figure having said 'no', trailed by a guilt cloud. */
export const GuiltAfterNo: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <g transform="translate(-10 10)"><Head r={38} worried /><path d="M -42 76 Q -46 22 0 18 Q 46 22 42 76 Z" fill={COLORS.hoodie} {...xl} /></g>
      {/* a 'no' bubble just said */}
      <g transform="translate(50 -44)"><circle cx={0} cy={0} r={22} fill={COLORS.white} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>no</text></g>
      {/* a guilt rain-cloud over them */}
      <g transform="translate(-20 -60)" opacity={0.6 + g * 0.3}><ellipse cx={0} cy={0} rx={48} ry={24} fill={COLORS.lavender} {...lg} />{[-20, 0, 20].map((x, i) => <line key={i} x1={x} y1={20} x2={x - 4} y2={38} stroke={COLORS.lavenderDark} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>
      <Label t="the guilt is just an echo" />
    </g>
  );
};

/** Boundary-gate — a tidy garden gate: a boundary that still welcomes. */
export const BoundaryGate: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* a low fence with a gate */}
      {[-90, -60, 60, 90].map((x, i) => <g key={i}><rect x={x - 6} y={-20} width={12} height={80} rx={3} fill={COLORS.wood} {...sm} /><path d={`M ${x} -20 l 0 -10`} stroke={COLORS.wood} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>)}
      <line x1={-96} y1={6} x2={-54} y2={6} stroke={COLORS.wood} strokeWidth={STROKE.lg} /><line x1={54} y1={6} x2={96} y2={6} stroke={COLORS.wood} strokeWidth={STROKE.lg} />
      {/* the gate, ajar + a welcoming heart */}
      <g transform="translate(-30 20)"><rect x={-20} y={-44} width={40} height={84} rx={6} fill={shade(COLORS.greenLeaf, 0.08)} {...lg} /></g>
      <path d="M 0 -30 q -9 -10 -15 -1 q -4 7 15 17 q 19 -10 15 -17 q -6 -9 -15 1 Z" fill={COLORS.pink} opacity={0.7 + g * 0.3} transform="translate(30 10)" />
      <Label t="a boundary, not a wall" />
    </g>
  );
};

/** Kind-firm-no — a warm but firm raised hand with a gentle smile. */
export const KindFirmNo: React.FC = () => (
  <g>
    <g transform="translate(-30 0)"><Head r={38} /><path d="M -40 74 Q -44 22 0 18 Q 44 22 40 74 Z" fill={COLORS.hoodie} {...xl} /></g>
    {/* a calm, open 'stop' palm */}
    <g transform="translate(46 6)"><path d="M -26 40 Q -30 2 -6 -2 L -6 -14 Q 2 -24 10 -14 L 10 -4 Q 18 -26 26 -4 L 26 6 Q 40 4 44 26 Q 48 52 18 60 Q -14 62 -26 40 Z" fill={COLORS.skin} {...lg} strokeLinejoin="round" /></g>
    {/* a small heart = kind */}
    <path d="M 46 -30 q -6 -7 -10 -1 q -3 5 10 11 q 13 -6 10 -11 q -4 -6 -10 1 Z" fill={COLORS.pink} />
    <Label t="kind, and firm" />
  </g>
);
