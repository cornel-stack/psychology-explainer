/**
 * loneliness.tsx — ALL-NEW art for "The Psychology of Loneliness". What it is
 * (lonely-in-crowd, connection-gap, alone-not-lonely), the signal (social-hunger),
 * the harm (loneliness-body), the trap (loneliness-trap-spiral, threat-goggles), and
 * the way out (first-hello-hand, give-connect, open-up-bridge). Token strokes,
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
const Fig: React.FC<{ r?: number; c?: string; happy?: boolean }> = ({ r = 30, c = COLORS.white, happy = false }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <path d={`M ${-r * 1.1} ${r * 1.1} Q 0 ${-r * 0.2} ${r * 1.1} ${r * 1.1} Z`} fill={shade(c, 0.1)} {...lg} />
    <circle cx={-r * 0.3} cy={-r * 1.08} r={r * 0.11} fill={COLORS.outline} /><circle cx={r * 0.3} cy={-r * 1.08} r={r * 0.11} fill={COLORS.outline} />
    {happy && <path d={`M ${-r * 0.3} ${-r * 0.74} Q 0 ${-r * 0.44} ${r * 0.3} ${-r * 0.74}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);

/** Lonely-in-crowd — one colour figure among faceless grey ones. */
export const LonelyInCrowd: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {/* grey faceless crowd */}
      {[-100, -56, 56, 100].map((x, i) => <g key={i} transform={`translate(${x} ${6 + (i % 2) * 8}) scale(0.9)`} opacity={0.5}><circle cx={0} cy={-28} r={26} fill={shade(COLORS.ledGrey, 0.1)} {...lg} /><path d="M -30 30 Q 0 -6 30 30 Z" fill={shade(COLORS.ledGrey, 0.1)} {...lg} /></g>)}
      {/* the lonely one, in colour, dimmed by a ring of isolation */}
      <circle cx={0} cy={-4} r={52} fill={COLORS.sky} opacity={0.15 + g * 0.1} />
      <g transform="translate(0 4)"><Fig r={32} c={COLORS.white} /><path d="M -14 -30 Q 0 -22 14 -30" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="alone in a crowd" />
    </g>
  );
};

/** Connection-gap — two figures with a broken bridge / gap between them. */
export const ConnectionGap: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <g transform="translate(-80 10)"><Fig r={30} c={COLORS.white} /></g>
      <g transform="translate(80 10)" opacity={0.5}><Fig r={28} c={COLORS.ledGrey} /></g>
      {/* a desired bridge, dashed and incomplete */}
      <path d="M -46 -10 L -10 -10" stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M 10 -10 L 46 -10" stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -10 -10 L 10 -10" stroke={COLORS.lavender} strokeWidth={STROKE.lg} strokeDasharray="4 8" opacity={0.5 + g * 0.5} />
      {/* an aching heart in the gap */}
      <path d="M 0 -26 q -7 -8 -11 -1 q -3 6 11 13 q 14 -7 11 -13 q -4 -7 -11 1 Z" fill={COLORS.pink} opacity={0.6} transform="translate(0 -4)" />
      <Label t="the gap we feel" />
    </g>
  );
};

/** Social-hunger — a heart with a hunger pang, like an empty stomach growl. */
export const SocialHunger: React.FC = () => {
  const f = useCurrentFrame();
  const pang = Math.abs(Math.sin(f / 4));
  return (
    <g>
      <path d="M 0 60 Q -70 -4 -70 -40 Q -70 -88 -24 -88 Q 0 -88 0 -58 Q 0 -88 24 -88 Q 70 -88 70 -40 Q 70 -4 0 60 Z" fill={COLORS.pink} {...xl} />
      {/* a hunger-pang / signal lines */}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-30 + i * 30} -46 q 6 ${10 + pang * 8} 0 ${24 + pang * 8}`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5 + pang * 0.4} />)}
      <text x={0} y={-28} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.white}>!</text>
      <Label t="a hunger for connection" />
    </g>
  );
};

/** Alone-not-lonely — a content figure happily solo. */
export const AloneNotLonely: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      {/* a warm glow of contentment */}
      <circle cx={0} cy={-4} r={70} fill={COLORS.yellowSoft} opacity={0.3 + g * 0.2} />
      <g transform="translate(0 6)"><Fig r={40} c={COLORS.white} happy /></g>
      {/* a book / cup = happy solitude */}
      <g transform="translate(54 44)"><rect x={-20} y={-14} width={40} height={30} rx={6} fill={COLORS.greenLeaf} {...sm} /><path d="M 20 -6 q 16 6 0 20" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} /></g>
      <Label t="alone, and content" />
    </g>
  );
};

/** Loneliness-body — a figure with the strain of loneliness marked on the body. */
export const LonelinessBody: React.FC = () => {
  const f = useCurrentFrame();
  const beat = 1 + 0.08 * Math.sin(f / 3);
  return (
    <g>
      {/* body outline */}
      <g transform="translate(0 -20)"><circle cx={0} cy={-30} r={34} fill={COLORS.white} {...xl} /><path d="M -44 90 Q -48 8 0 4 Q 48 8 44 90 Z" fill={COLORS.hoodie} {...xl} /></g>
      {/* a strained heart */}
      <g transform={`translate(0 20) scale(${beat})`}><path d="M 0 16 q -22 -16 -22 -30 q 0 -18 14 -18 q 8 0 8 10 q 0 -10 8 -10 q 14 0 14 18 q 0 14 -22 30 Z" fill={COLORS.red} {...sm} /></g>
      {/* stress sparks */}
      {[-50, 50].map((x, i) => <path key={i} d={`M ${x} -40 l ${i ? 8 : -8} -10 l ${i ? -4 : 4} 12 l ${i ? 10 : -10} -4`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      <Label t="it strains the whole body" />
    </g>
  );
};

/** Loneliness-trap-spiral — a self-reinforcing downward spiral. */
export const LonelinessTrapSpiral: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 2.5;
  return (
    <g>
      <g transform={`rotate(${spin})`}><path d="M 0 -76 A 76 76 0 0 1 58 50 A 48 48 0 0 1 -40 32 A 26 26 0 0 1 6 12" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      <g transform="translate(0 6)"><Fig r={24} c={COLORS.white} /></g>
      {/* loop labels */}
      {['lonely', 'on guard', 'withdraw'].map((t, i) => <text key={i} x={Math.cos(i * 2.1 - 1) * 72} y={Math.sin(i * 2.1 - 1) * 58} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.yellowDark}>{t}</text>)}
      <Label t="the self-feeding trap" />
    </g>
  );
};

/** Threat-goggles — goggles that read neutral faces as cold/rejecting. */
export const ThreatGoggles: React.FC = () => (
  <g>
    {/* a neutral face */}
    <circle cx={0} cy={-6} r={56} fill={COLORS.white} {...xl} />
    <line x1={-22} y1={-10} x2={-10} y2={-10} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><line x1={10} y1={-10} x2={22} y2={-10} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <line x1={-14} y1={16} x2={14} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    {/* red goggles over it, reading 'rejection' */}
    {[-26, 26].map((x, i) => <circle key={i} cx={x} cy={-10} r={24} fill={COLORS.red} opacity={0.3} {...lg} />)}
    <line x1={-2} y1={-10} x2={2} y2={-10} stroke={COLORS.red} strokeWidth={STROKE.lg} />
    <text x={0} y={-72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>"they don't like me"</text>
    <Label t="loneliness tints the lens" />
  </g>
);

/** First-hello-hand — a tentative waving hand reaching out. */
export const FirstHelloHand: React.FC = () => {
  const f = useCurrentFrame();
  const wave = 10 * Math.sin(f / 5);
  return (
    <g>
      <g transform="translate(-40 14)"><Fig r={30} c={COLORS.white} happy /></g>
      {/* reaching, waving hand */}
      <path d={`M -14 0 q 40 -10 64 ${-4 + wave * 0.2}`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <g transform={`translate(54 ${-6 + wave * 0.2}) rotate(${wave})`}><circle cx={0} cy={0} r={14} fill={COLORS.skin} {...lg} />{[0, 1, 2].map((i) => <path key={i} d={`M ${-6 + i * 5} -10 q 2 -8 0 -16`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
      <g transform="translate(70 -54)"><rect x={-26} y={-18} width={52} height={32} rx={12} fill={COLORS.greenLeaf} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>hi!</text></g>
      <Label t="one small hello" />
    </g>
  );
};

/** Give-connect — offering help, which builds a bridge of connection. */
export const GiveConnect: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <g transform="translate(-56 10)"><Fig r={30} c={COLORS.white} happy /></g>
      <g transform="translate(56 10)"><Fig r={30} c={COLORS.sky} happy /></g>
      {/* a gift / helping hand passing between */}
      <g transform="translate(0 -6)"><rect x={-20} y={-14} width={40} height={30} rx={6} fill={COLORS.pink} {...lg} /><path d="M 0 -14 l 0 30 M -20 -2 l 40 0" stroke={shade(COLORS.pink, -0.1)} strokeWidth={STROKE.sm} /><path d="M -8 -14 q -6 -12 6 -10 q 10 2 2 10 M 8 -14 q 6 -12 -6 -10 q -10 2 -2 10" fill="none" stroke={COLORS.pinkDark} strokeWidth={STROKE.sm} /></g>
      {/* warmth hearts */}
      {[0, 1].map((i) => <path key={i} d={`M ${-24 + i * 48} -42 q -5 -6 -9 -1 q -2 4 9 10 q 11 -6 9 -10 q -4 -5 -9 1 Z`} fill={COLORS.pink} opacity={g} />)}
      <Label t="giving builds connection" />
    </g>
  );
};

/** Open-up-bridge — opening up (a peeled-open heart) completes a bridge. */
export const OpenUpBridge: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      {/* two figures with a now-complete warm bridge */}
      <g transform="translate(-80 14)"><Fig r={28} c={COLORS.white} happy /></g>
      <g transform="translate(80 14)"><Fig r={28} c={COLORS.yellowSoft} happy /></g>
      <path d="M -50 -6 Q 0 -40 50 -6" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.7 + g * 0.3} />
      {/* an opened heart in the middle */}
      <g transform="translate(0 -24)"><path d="M 0 16 q -22 -16 -22 -30 q 0 -18 14 -18 q 8 0 8 10 q 0 -10 8 -10 q 14 0 14 18 q 0 14 -22 30 Z" fill={COLORS.pink} {...sm} /><path d="M 0 -20 l 0 36" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={g} /></g>
      <Label t="being seen bridges the gap" />
    </g>
  );
};
