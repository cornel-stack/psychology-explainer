/**
 * complexes.tsx — ALL-NEW art for "Every Mental Complex Explained". One bespoke
 * signature prop per complex: the shrinking figure (inferiority), the pedestal
 * (superiority), the throne (god), the rescue ring (savior), the spotlight (hero),
 * the carried cross (martyr), the guilt weight, the target (persecution), the
 * rain-cloud (victim), the big hat (Napoleon), the glass slipper (Cinderella),
 * the never-grow-up balloon (Peter Pan), the parent photo (Oedipus), the unheard
 * warning (Cassandra), the dodged summit (Jonah). Token strokes, flat two-tone.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; eyes?: boolean }> = ({ r = 40, c = COLORS.white, eyes = true }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    {eyes && <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /></>}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);

/** A tiny figure dwarfed by a huge looming shadow (inferiority). */
export const ShrinkingFigure: React.FC = () => (
  <g>
    <path d="M 40 150 L 150 -140 L 210 -140 L 150 150 Z" fill={COLORS.purpleDeep} opacity={0.3} />
    <g transform="translate(120 10) scale(1.6)"><Fig r={30} c={shade(COLORS.purpleDeep, -0.1)} eyes={false} /></g>
    <g transform="translate(-80 90) scale(0.7)"><Fig r={40} c={COLORS.white} /></g>
    <text x={-80} y={130} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>not enough</text>
  </g>
);

/** A figure strutting on a tall pedestal, looking down (superiority). */
export const PedestalStrut: React.FC = () => (
  <g>
    <rect x={-80} y={40} width={160} height={120} rx={8} fill={COLORS.wood} {...xl} />
    <rect x={-100} y={20} width={200} height={30} rx={8} fill={shade(COLORS.wood, 0.14)} {...lg} />
    <g transform="translate(0 -20)"><Fig r={44} c={COLORS.yellow} /></g>
    {/* crown of self-importance */}
    <path d="M -36 -96 L -24 -72 L 0 -90 L 24 -72 L 36 -96 L 28 -58 L -28 -58 Z" fill={COLORS.yellowDark} {...sm} />
    {/* looking-down lines */}
    <path d="M -120 -40 l -30 20 M -120 0 l -34 14" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);

/** A throne with a glowing halo and a lightning sceptre (god complex). */
export const GodThrone: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.6 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={0} cy={-70} r={70} fill={COLORS.yellow} opacity={0.3 * glow} />
      {/* throne */}
      <rect x={-90} y={-30} width={180} height={150} rx={12} fill={COLORS.red} {...xl} />
      <rect x={-110} y={-120} width={220} height={110} rx={16} fill={COLORS.redDark} {...xl} />
      <g transform="translate(0 -70)"><Fig r={40} c={COLORS.white} /></g>
      {/* halo */}
      <ellipse cx={0} cy={-128} rx={54} ry={16} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} opacity={glow} />
      {/* lightning sceptre */}
      <path d="M 100 -40 l -14 40 l 18 0 l -16 44" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** A life-ring being thrown to save everyone (savior / messiah complex). */
export const SaviorRing: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={100} fill={COLORS.red} {...xl} />
    <circle cx={0} cy={0} r={56} fill={COLORS.bgCream} {...lg} />
    {[0, 90, 180, 270].map((a, i) => <rect key={i} x={-16} y={-100} width={32} height={44} fill={COLORS.white} transform={`rotate(${a})`} {...sm} />)}
    {/* rope */}
    <path d="M 70 -70 Q 160 -120 180 -40" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* little grateful hands reaching */}
    <path d="M -40 120 q 10 -20 30 -10 M 20 120 q 10 -20 30 -10" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
  </g>
);

/** A spotlight on a figure striking a hero pose (hero complex). */
export const HeroSpotlight: React.FC = () => (
  <g>
    <path d="M -40 -150 L -150 150 L 150 150 L 40 -150 Z" fill={COLORS.yellowSoft} opacity={0.3} />
    <g transform="translate(0 20)">
      <Fig r={40} c={COLORS.white} />
      {/* cape + fists on hips */}
      <path d="M -40 -20 Q -90 80 -40 130 L 40 130 Q 90 80 40 -20 Z" fill={COLORS.sky} {...xl} />
      <path d="M 0 -40 l 16 -28 l -32 0 Z" fill={COLORS.yellow} {...sm} />
    </g>
    <path d="M -120 -140 l 6 14 l 14 6 l -14 6 l -6 14 l -6 -14 l -14 -6 l 14 -6 Z" fill={COLORS.yellow} />
  </g>
);

/** A figure stooped under a heavy cross, sighing (martyr complex). */
export const MartyrCross: React.FC = () => (
  <g>
    <g transform="translate(-10 0)"><Fig r={34} c={COLORS.white} /></g>
    {/* the cross/burden on their back */}
    <g transform="translate(40 -40) rotate(20)">
      <rect x={-16} y={-90} width={32} height={200} rx={6} fill={COLORS.woodDark} {...xl} />
      <rect x={-70} y={-40} width={140} height={30} rx={6} fill={COLORS.woodDark} {...lg} />
    </g>
    {/* sigh */}
    <path d="M -50 -70 q -20 -10 -10 -28" fill="none" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <text x={-20} y={150} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={22} fill={COLORS.outline}>after all I do…</text>
  </g>
);

/** A figure flattened under a giant GUILT weight (guilt complex). */
export const GuiltWeight: React.FC = () => (
  <g>
    <g transform="translate(0 40) scale(1 0.8)"><Fig r={38} c={COLORS.white} /></g>
    <rect x={-120} y={-90} width={240} height={90} rx={14} fill={COLORS.shirtDark} {...xl} />
    <rect x={-96} y={-120} width={192} height={40} rx={10} fill={COLORS.shirtDarker} {...lg} />
    <text x={0} y={-30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={44} fill={COLORS.white}>GUILT</text>
    {/* strain lines */}
    <path d="M -130 20 l -20 -10 M 130 20 l 20 -10" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);

/** A cowering figure with arrows/eyes all aimed at it (persecution complex). */
export const TargetedFigure: React.FC = () => (
  <g>
    <g transform="translate(0 30)"><Fig r={38} c={COLORS.white} /></g>
    {/* arrows pointing in from all sides */}
    {[-150, -90, 0, 90, 150].map((a, i) => (
      <g key={i} transform={`rotate(${a})`}><path d="M 0 -160 l 0 70 l -16 -16 m 16 16 l 16 -16" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
    ))}
    {/* watching eyes */}
    {[[-150, -40], [150, -30]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><ellipse rx={26} ry={16} fill={COLORS.white} {...sm} /><circle r={8} fill={COLORS.outline} /></g>)}
  </g>
);

/** A personal rain-cloud over a figure holding a "poor me" sign (victim complex). */
export const VictimCloud: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <g transform="translate(0 40)"><Fig r={36} c={COLORS.white} /></g>
      {/* rain cloud */}
      <g transform="translate(0 -100)">
        {[[-54, 0, 40], [0, -16, 50], [54, 0, 40]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={COLORS.ledGrey} {...lg} />)}
        {[-40, 0, 40].map((x, i) => <line key={i} x1={x} y1={30} x2={x - 6} y2={60 + ((f * 2 + i * 10) % 20)} stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
      </g>
      <rect x={-70} y={70} width={140} height={46} rx={8} fill={COLORS.white} {...lg} />
      <text x={0} y={100} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>poor me</text>
    </g>
  );
};

/** A small figure on tiptoes under an enormous hat (Napoleon complex). */
export const NapoleonHat: React.FC = () => (
  <g>
    <g transform="translate(0 40) scale(0.8)"><Fig r={40} c={COLORS.white} /></g>
    {/* the big bicorne hat */}
    <path d="M -120 -40 Q 0 -140 120 -40 Q 0 -70 -120 -40 Z" fill={COLORS.navy} {...xl} />
    <path d="M -100 -44 Q 0 -96 100 -44" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} />
    {/* tiptoe marks */}
    <path d="M -40 150 l 0 -14 M 40 150 l 0 -14" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <text x={0} y={150} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={22} fill={COLORS.outline}>stand tall!</text>
  </g>
);

/** A single glass slipper on a cushion (Cinderella complex). */
export const GlassSlipper: React.FC = () => (
  <g>
    <ellipse cx={0} cy={90} rx={120} ry={34} fill={COLORS.pink} opacity={0.4} />
    <path d="M -110 40 Q -90 -10 -20 -16 L 60 -24 Q 110 -14 110 40 Q 60 60 -10 60 Q -80 60 -110 40 Z" fill={COLORS.sky} opacity={0.5} {...xl} />
    <path d="M 60 -24 Q 110 -60 70 -90" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.7} />
    <path d="M -80 20 L -40 -8 L -30 20 Z" fill={COLORS.white} opacity={0.5} />
    {/* sparkle */}
    <path d="M 90 -80 l 5 11 l 11 5 l -11 5 l -5 11 l -5 -11 l -11 -5 l 11 -5 Z" fill={COLORS.yellow} />
  </g>
);

/** A party hat + toy on an "adult" figure refusing to grow up (Peter Pan). */
export const NeverGrowUp: React.FC = () => (
  <g>
    <g transform="translate(0 20)"><Fig r={40} c={COLORS.white} /></g>
    {/* party hat */}
    <path d="M -34 -46 L 0 -130 L 34 -46 Z" fill={COLORS.greenLeaf} {...lg} />
    {[-20, 0, 20].map((x, i) => <circle key={i} cx={x} cy={-70 - i * 8} r={5} fill={[COLORS.red, COLORS.yellow, COLORS.sky][i]} />)}
    <circle cx={0} cy={-130} r={10} fill={COLORS.yellow} {...sm} />
    {/* toy in hand */}
    <g transform="translate(70 40)"><rect x={-24} y={-24} width={48} height={48} rx={8} fill={COLORS.red} {...lg} /><text x={0} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.white}>A</text></g>
    <text x={0} y={150} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={22} fill={COLORS.outline}>won't grow up</text>
  </g>
);

/** A framed parent photo a figure can't look away from (Oedipus/Electra — paraphrased). */
export const ParentPhoto: React.FC = () => (
  <g>
    <rect x={-110} y={-120} width={220} height={190} rx={12} fill={COLORS.wood} {...xl} />
    <rect x={-86} y={-96} width={172} height={142} rx={6} fill={COLORS.sky} />
    {/* two silhouettes: parent (big) + child (small) */}
    <g transform="translate(-20 10)"><circle cx={0} cy={-30} r={30} fill={COLORS.purpleDeep} /><path d="M -40 40 Q 0 -16 40 40 Z" fill={COLORS.purpleDeep} /></g>
    <g transform="translate(46 24) scale(0.6)"><circle cx={0} cy={-30} r={30} fill={shade(COLORS.purpleDeep, -0.1)} /><path d="M -40 40 Q 0 -16 40 40 Z" fill={shade(COLORS.purpleDeep, -0.1)} /></g>
    {/* heart tether */}
    <path d="M 20 -50 Q 60 -70 90 -40" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeDasharray="4 8" />
    <path d="M 0 90 Q -16 70 0 60 Q 16 70 0 90 Z" fill={COLORS.red} />
  </g>
);

/** A figure shouting a warning that bounces off deaf ears (Cassandra complex). */
export const UnheardWarning: React.FC = () => (
  <g>
    <g transform="translate(-90 20)"><Fig r={36} c={COLORS.white} /></g>
    {/* speech bubble warning */}
    <g transform="translate(40 -60)">
      <path d="M -70 -40 Q -90 -40 -90 -4 Q -90 32 -40 32 L 60 32 Q 90 32 90 -4 Q 90 -40 60 -40 Z" fill={COLORS.yellow} {...lg} />
      <path d="M -70 30 l -26 30 l 44 -18 Z" fill={COLORS.yellow} {...lg} />
      <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.outline}>!</text>
    </g>
    {/* ears turned away / blocked */}
    <g transform="translate(150 40)"><path d="M 0 -30 Q 30 -30 30 0 Q 30 30 0 30" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" /><path d="M -20 -20 l 40 40 m 0 -40 l -40 40" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
  </g>
);

/** A figure turning away from a sunlit summit / spotlight (Jonah complex — fear of success). */
export const DodgedSummit: React.FC = () => (
  <g>
    {/* a bright summit with a flag */}
    <path d="M 40 150 L 150 -120 L 240 150 Z" fill={COLORS.greenDark} {...xl} />
    <path d="M 40 150 L 150 -120 L 150 150 Z" fill={COLORS.greenLeaf} />
    <rect x={146} y={-120} width={8} height={40} fill={COLORS.woodDark} />
    <path d="M 154 -120 l 36 10 l -36 10 Z" fill={COLORS.red} {...sm} />
    <circle cx={150} cy={-150} r={30} fill={COLORS.yellow} opacity={0.6} />
    {/* figure turning away, shielding eyes */}
    <g transform="translate(-100 30)"><Fig r={40} c={COLORS.white} /><path d="M -30 -50 l 30 10" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
    <path d="M -60 -20 l -30 -10 m 30 10 l -10 -28" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
