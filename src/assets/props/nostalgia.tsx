/**
 * nostalgia.tsx — ALL-NEW art for "The Psychology of Nostalgia". What it is & its
 * history (bittersweet-heart, sepia-photo, memory-lane), the triggers (scent-trigger,
 * music-box, old-cassette), and the functions (childhood-home-mem, rose-tint-glasses,
 * connection-thread, present-anchor). Token strokes, centered on origin, ~300px tall.
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

/** Bittersweet-heart — a heart, half warm-gold, half wistful-blue. */
export const BittersweetHeart: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      <defs>
        <clipPath id="bs-heart"><path d="M 0 60 Q -66 -4 -66 -40 Q -66 -84 -22 -84 Q 0 -84 0 -56 Q 0 -84 22 -84 Q 66 -84 66 -40 Q 66 -4 0 60 Z" /></clipPath>
      </defs>
      <g clipPath="url(#bs-heart)">
        <rect x={-70} y={-90} width={70} height={160} fill={COLORS.yellow} />
        <rect x={0} y={-90} width={70} height={160} fill={COLORS.sky} />
      </g>
      <path d="M 0 60 Q -66 -4 -66 -40 Q -66 -84 -22 -84 Q 0 -84 0 -56 Q 0 -84 22 -84 Q 66 -84 66 -40 Q 66 -4 0 60 Z" fill="none" {...xl} />
      {/* a sparkle on the warm side, a drop on the wistful side */}
      <path d="M -36 -36 l 2 7 l 7 2 l -7 2 l -2 7 l -2 -7 l -7 -2 l 7 -2 Z" fill={COLORS.white} opacity={g} />
      <path d="M 34 -30 q -5 7 0 14 q 5 -7 0 -14 Z" fill={COLORS.white} opacity={0.8} />
      <Label t="sweet and a little sad" />
    </g>
  );
};

/** Sepia-photo — a faded, curling old photograph. */
export const SepiaPhoto: React.FC = () => (
  <g transform="rotate(-5)">
    <rect x={-66} y={-80} width={132} height={160} rx={6} fill={shade(COLORS.yellowSoft, 0.06)} {...xl} />
    <rect x={-52} y={-66} width={104} height={104} rx={4} fill={shade(COLORS.wood, 0.1)} />
    {/* a faded little scene: sun + two figures */}
    <circle cx={-20} cy={-44} r={16} fill={COLORS.yellow} opacity={0.6} />
    {[-16, 20].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><circle cx={0} cy={-6} r={14} fill={shade(COLORS.wood, -0.04)} opacity={0.6} /><path d="M -14 34 Q 0 -4 14 34 Z" fill={shade(COLORS.wood, -0.04)} opacity={0.5} /></g>)}
    {/* curled corner */}
    <path d="M 40 54 Q 66 60 66 80 L 40 80 Z" fill={shade(COLORS.yellowSoft, -0.08)} {...sm} />
    <text x={0} y={66} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={shade(COLORS.wood, -0.1)}>summer '09</text>
    <Label t="a faded photograph" />
  </g>
);

/** Memory-lane — a little signpost down a golden winding lane. */
export const MemoryLane: React.FC = () => (
  <g>
    {/* winding lane into warm distance */}
    <path d="M -40 80 L -14 -40 L 14 -40 L 40 80 Z" fill={shade(COLORS.yellowSoft, 0.04)} {...lg} />
    {[0, 1, 2].map((i) => <rect key={i} x={-5} y={-30 + i * 34} width={10} height={16} rx={3} fill={COLORS.white} opacity={0.6} />)}
    <ellipse cx={0} cy={-46} rx={40} ry={16} fill={COLORS.yellow} opacity={0.4} />
    {/* the signpost */}
    <rect x={-6} y={-70} width={12} height={90} fill={COLORS.woodDark} {...sm} />
    <g transform="rotate(-6)"><rect x={-74} y={-80} width={148} height={34} rx={6} fill={COLORS.wood} {...lg} /><text x={0} y={-57} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>MEMORY LANE</text><path d="M 74 -63 l 18 0 l -8 -10 m 8 10 l -8 10" fill="none" stroke={COLORS.wood} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
    <Label t="down memory lane" />
  </g>
);

/** Scent-trigger — a cooling pie, its scent lines curling up into a memory bubble. */
export const ScentTrigger: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* pie */}
      <path d="M -60 40 Q 0 20 60 40 L 54 64 Q 0 80 -54 64 Z" fill={shade(COLORS.yellowDark, 0.1)} {...xl} />
      <ellipse cx={0} cy={38} rx={60} ry={18} fill={COLORS.yellow} {...lg} />
      <path d="M -30 32 l 60 12 M 0 26 l 0 24 M 30 32 l -60 12" stroke={shade(COLORS.yellowDark, 0.12)} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* scent curling up */}
      {[-20, 0, 20].map((x, i) => <path key={i} d={`M ${x} 14 q ${12 * Math.sin(f / 7 + i)} -24 0 -44 q ${-12 * Math.sin(f / 7 + i)} -20 0 -40`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      {/* memory bubble at top */}
      <g transform="translate(0 -92)"><circle cx={0} cy={0} r={28} fill={COLORS.white} {...lg} /><path d="M -16 6 Q 0 -8 16 6" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} /><circle cx={-8} cy={-6} r={4} fill={COLORS.yellow} /></g>
      <Label t="a smell throws you back" />
    </g>
  );
};

/** Music-box — an open music box with a note drifting out. */
export const MusicBox: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 3;
  return (
    <g>
      <rect x={-60} y={-10} width={120} height={70} rx={10} fill={COLORS.pink} {...xl} />
      <rect x={-60} y={-10} width={120} height={18} rx={8} fill={shade(COLORS.pink, 0.12)} />
      {/* open lid */}
      <g transform="rotate(-28 -60 -10)"><rect x={-60} y={-24} width={120} height={16} rx={6} fill={shade(COLORS.pink, 0.1)} {...lg} /></g>
      {/* little spinning ballerina */}
      <g transform={`translate(0 -2) rotate(${spin})`}><circle cx={0} cy={-18} r={8} fill={COLORS.white} {...sm} /><path d="M -10 2 L 0 -14 L 10 2 Z" fill={COLORS.lavender} {...sm} /></g>
      {/* notes drifting */}
      {[0, 1, 2].map((i) => { const p = ((f + i * 25) % 70) / 70; return <g key={i} transform={`translate(${30 + p * 40} ${-30 - p * 50})`} opacity={1 - p}><circle cx={0} cy={6} r={6} fill={COLORS.sky} /><rect x={5} y={-14} width={4} height={20} fill={COLORS.sky} /></g>; })}
      <Label t="the old music box" />
    </g>
  );
};

/** Old-cassette — a retro cassette tape, reels mid-spin. */
export const OldCassette: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-84} y={-54} width={168} height={108} rx={12} fill={COLORS.sky} {...xl} />
      <rect x={-64} y={-44} width={128} height={48} rx={8} fill={COLORS.white} {...lg} />
      <line x1={-56} y1={-30} x2={56} y2={-30} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} /><line x1={-56} y1={-16} x2={30} y2={-16} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />
      {[-34, 34].map((x, i) => <g key={i} transform={`translate(${x} 22) rotate(${f * (i ? -4 : 4)})`}><circle cx={0} cy={0} r={20} fill={shade(COLORS.sky, -0.06)} {...lg} />{[0, 1, 2, 3, 4, 5].map((j) => <line key={j} x1={0} y1={0} x2={Math.cos((j / 6) * Math.PI * 2) * 16} y2={Math.sin((j / 6) * Math.PI * 2) * 16} stroke={COLORS.white} strokeWidth={STROKE.sm} />)}</g>)}
      <text x={0} y={-24} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>MIXTAPE '98</text>
      <Label t="the songs of your youth" />
    </g>
  );
};

/** Childhood-home-mem — a small warm house glowing inside a memory bubble. */
export const ChildhoodHomeMem: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={0} cy={0} r={86} fill={COLORS.yellowSoft} opacity={0.4 + g * 0.2} />
      <circle cx={0} cy={0} r={86} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeDasharray="4 10" opacity={0.7} />
      {/* little house */}
      <rect x={-44} y={-8} width={88} height={56} rx={6} fill={COLORS.bgCreamDark} {...lg} />
      <path d="M -54 -8 L 0 -50 L 54 -8 Z" fill={COLORS.red} {...lg} />
      <rect x={-12} y={14} width={24} height={34} rx={4} fill={COLORS.wood} {...sm} />
      <rect x={18} y={2} width={18} height={16} rx={3} fill={COLORS.yellow} {...sm} />
      <rect x={-34} y={2} width={18} height={16} rx={3} fill={COLORS.yellow} {...sm} />
      <Label t="the house you grew up in" />
    </g>
  );
};

/** Rose-tint-glasses — glasses tinting the view a warm, golden pink. */
export const RoseTintGlasses: React.FC = () => (
  <g>
    {[-44, 44].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><circle cx={0} cy={0} r={40} fill={COLORS.pink} opacity={0.4} {...xl} /><path d="M -22 -10 l 10 -8 l 10 10" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} /></g>)}
    <path d="M -4 0 L 4 0" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
    <line x1={-84} y1={-6} x2={-108} y2={-16} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <line x1={84} y1={-6} x2={108} y2={-16} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>the past looks golden</text>
    <Label t="rose-tinted memory" />
  </g>
);

/** Connection-thread — two figures linked across time by a warm thread. */
export const ConnectionThread: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {[-66, 66].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><circle cx={0} cy={-20} r={32} fill={i ? COLORS.sky : shade(COLORS.yellowSoft, 0.06)} {...xl} /><path d={`M -38 54 Q 0 -4 38 54 Z`} fill={shade(i ? COLORS.sky : COLORS.yellowSoft, 0.08)} {...lg} /><circle cx={-11} cy={-24} r={5} fill={COLORS.outline} /><circle cx={11} cy={-24} r={5} fill={COLORS.outline} /><path d="M -11 -8 Q 0 0 11 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>)}
      {/* warm thread + hearts between */}
      <path d="M -40 -10 Q 0 -44 40 -10" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 0 -36 q -7 -8 -12 -1 q -3 6 12 13 q 15 -7 12 -13 q -5 -7 -12 1 Z" fill={COLORS.pink} opacity={g} />
      <Label t="it connects us to others" />
    </g>
  );
};

/** Present-anchor — a hand holding a golden memory balloon while feet stay grounded. */
export const PresentAnchor: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 6 * Math.sin(f / 8);
  return (
    <g>
      {/* the ground / now */}
      <rect x={-70} y={64} width={140} height={14} rx={6} fill={COLORS.greenLeaf} {...lg} />
      {/* string up to a glowing memory balloon */}
      <path d={`M 0 60 Q ${10} 0 0 ${-30 + bob}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <g transform={`translate(0 ${-70 + bob})`}><circle cx={0} cy={0} r={40} fill={COLORS.yellowSoft} {...xl} /><path d="M -16 6 Q 0 -8 16 6" fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -10 -8 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 Z" fill={COLORS.white} transform="translate(0 -2)" /></g>
      {/* a little grounded figure holding on */}
      <g transform="translate(0 40)"><circle cx={0} cy={0} r={22} fill={COLORS.white} {...lg} /><circle cx={-8} cy={-2} r={4} fill={COLORS.outline} /><circle cx={8} cy={-2} r={4} fill={COLORS.outline} /><path d="M -8 10 Q 0 16 8 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="visit, don't move in" />
    </g>
  );
};
