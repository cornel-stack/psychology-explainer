/**
 * jealousy.tsx — ALL-NEW art for "Signs Someone Is Secretly Jealous of You".
 * Bespoke metaphors for covert envy: the green-eyed monster, the barbed
 * compliment, the deflated win, the copycat, the scoreboard, the fake smile,
 * the gossip cloud, the hidden grin, the cold shoulder, the red pen, the
 * warm/cold envy meter, the side-eye. Token strokes, flat two-tone.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** The green-eyed monster of envy. */
export const GreenMonster: React.FC = () => {
  const f = useCurrentFrame();
  const wob = Math.sin(f / 6) * 5;
  return (
    <g>
      <path d={`M -100 ${60 + wob} Q -130 -60 -40 -84 Q 0 -120 50 -84 Q 140 -70 110 10 Q 134 70 50 ${80 - wob} Q 0 110 -46 80 Q -128 72 -100 ${60 + wob} Z`} fill={COLORS.greenLeaf} {...xl} />
      {/* spikes */}
      <path d="M -40 -84 l -8 -34 l 22 22 M 10 -104 l 4 -36 l 14 32 M 60 -84 l 18 -30 l -24 22" fill={COLORS.greenLeaf} {...sm} />
      {/* big envious eyes */}
      <circle cx={-30} cy={-6} r={26} fill={COLORS.white} {...sm} /><circle cx={30} cy={-6} r={26} fill={COLORS.white} {...sm} />
      <circle cx={-26} cy={-2} r={12} fill={COLORS.greenDark} /><circle cx={34} cy={-2} r={12} fill={COLORS.greenDark} />
      <circle cx={-26} cy={-2} r={5} fill={COLORS.outline} /><circle cx={34} cy={-2} r={5} fill={COLORS.outline} />
      {/* angry brows + grimace */}
      <path d="M -54 -34 l 34 12 M 54 -34 l -34 12" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -36 44 l 14 -10 l 14 10 l 14 -10 l 14 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** A wrapped compliment with a thorny barb sticking out (backhanded compliment). */
export const BackhandedGift: React.FC = () => (
  <g>
    <rect x={-90} y={-30} width={180} height={140} rx={12} fill={COLORS.pink} {...xl} />
    <rect x={-90} y={-60} width={180} height={40} rx={10} fill={shade(COLORS.pink, 0.16)} {...lg} />
    <rect x={-16} y={-60} width={32} height={170} fill={COLORS.yellow} {...sm} />
    <path d="M 0 -60 Q -56 -126 -90 -86 Q -36 -72 0 -60 Q 56 -126 90 -86 Q 36 -72 0 -60 Z" fill={COLORS.yellow} {...lg} />
    {/* the barb / thorn hidden in it */}
    <path d="M 60 40 L 150 10 L 120 60 L 170 80 L 90 90 Z" fill={COLORS.ledGrey} {...lg} />
    <path d="M 150 10 l 24 -8 l -10 22" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** A bright achievement balloon with a pin deflating it (downplaying your win). */
export const DeflateBalloon: React.FC = () => {
  const f = useCurrentFrame();
  const squeeze = 1 - 0.1 * (Math.sin(f / 8) * 0.5 + 0.5);
  return (
    <g>
      <g transform={`scale(${squeeze} ${2 - squeeze})`} style={{ transformOrigin: 'center' }}>
        <path d="M 0 90 Q -100 70 -100 -20 Q -100 -120 0 -120 Q 100 -120 100 -20 Q 100 70 0 90 Z" fill={COLORS.yellow} {...xl} />
        <path d="M -40 -80 Q -66 -50 -58 -14" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />
        <path d="M -20 -30 L -6 -6 L 18 -40" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M 0 90 L -10 120 L 10 120 Z" fill={COLORS.yellowDark} {...sm} />
      {/* the pin */}
      <g transform="translate(130 -30) rotate(40)"><rect x={-6} y={-10} width={12} height={90} rx={4} fill={COLORS.ledGrey} {...sm} /><circle cx={0} cy={-18} r={16} fill={COLORS.red} {...lg} /></g>
      <path d="M 120 -40 l 18 -8 m -10 16 l 16 2" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" />
    </g>
  );
};

/** Two identical figures — one copying the other (imitation / mirroring). */
export const CopycatTwins: React.FC = () => {
  const Fig: React.FC<{ x: number; flip?: boolean; faded?: boolean }> = ({ x, flip, faded }) => (
    <g transform={`translate(${x} 0) ${flip ? 'scale(-1,1)' : ''}`} opacity={faded ? 0.6 : 1}>
      <circle cx={0} cy={-50} r={40} fill={COLORS.white} {...lg} />
      <circle cx={-14} cy={-54} r={6} fill={COLORS.outline} /><circle cx={14} cy={-54} r={6} fill={COLORS.outline} />
      <path d="M -12 -36 q 12 8 24 0" fill="none" {...sm} />
      <path d="M -44 70 Q 0 -4 44 70 Z" fill={faded ? COLORS.lavender : COLORS.hoodie} {...xl} />
    </g>
  );
  return (
    <g>
      <Fig x={-70} />
      <Fig x={70} flip faded />
      {/* copy arrows */}
      <path d="M -16 -30 q 16 -16 32 0 l 0 -14 m 0 14 l -14 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>copy &amp; paste</text>
    </g>
  );
};

/** A scoreboard where "THEM" keeps nudging ahead of "YOU" (one-upping). */
export const Scoreboard: React.FC = () => {
  const f = useCurrentFrame();
  const them = 2 + Math.floor((f / 20) % 3);
  return (
    <g>
      <rect x={-150} y={-90} width={300} height={180} rx={16} fill={COLORS.shirtDark} {...xl} />
      <rect x={-130} y={-70} width={130} height={140} rx={8} fill={COLORS.outline} {...sm} />
      <rect x={0} y={-70} width={130} height={140} rx={8} fill={COLORS.outline} {...sm} />
      <text x={-65} y={-40} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.sky}>YOU</text>
      <text x={65} y={-40} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.red}>THEM</text>
      <text x={-65} y={40} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={60} fill={COLORS.sky}>1</text>
      <text x={65} y={40} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={60} fill={COLORS.red}>{them}</text>
    </g>
  );
};

/** A smile mask held up over a frowning face (fake enthusiasm). */
export const FakeSmileMask: React.FC = () => (
  <g>
    {/* the real frowning face behind */}
    <circle cx={-10} cy={0} r={90} fill={COLORS.bgCreamDark} {...xl} />
    <path d="M -46 -16 l 24 6 M 6 -10 l 24 -6" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -34 44 q 24 -18 48 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* the smiling mask slipping aside */}
    <g transform="translate(60 -10) rotate(12)">
      <ellipse cx={0} cy={0} rx={78} ry={92} fill={COLORS.yellow} {...xl} />
      <circle cx={-26} cy={-14} r={8} fill={COLORS.outline} /><circle cx={26} cy={-14} r={8} fill={COLORS.outline} />
      <path d="M -34 20 q 34 34 68 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <rect x={70} y={-10} width={60} height={14} rx={6} fill={COLORS.woodDark} {...sm} />
    </g>
  </g>
);

/** A whisper/gossip speech cloud behind a hand. */
export const GossipCloud: React.FC = () => (
  <g>
    {/* hand cupped */}
    <path d="M -150 40 Q -170 -20 -130 -30 Q -90 -36 -80 10 L -80 60 Q -120 70 -150 40 Z" fill={COLORS.skin} {...xl} />
    {/* whisper cloud */}
    {[[20, 0, 50], [80, -24, 60], [140, 0, 48], [60, 40, 44]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={COLORS.white} {...lg} />)}
    <text x={78} y={14} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>psst…</text>
    {/* little tail dots */}
    <circle cx={-40} cy={70} r={14} fill={COLORS.white} {...sm} />
    <circle cx={-70} cy={100} r={9} fill={COLORS.white} {...sm} />
  </g>
);

/** A sly grin hidden behind a hand (secret delight at your failure). */
export const HiddenGrin: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={96} fill={COLORS.white} {...xl} />
    {/* narrowed smug eyes */}
    <path d="M -50 -24 q 20 -12 40 0 M 10 -24 q 20 -12 40 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -50 -8 l 24 0 M 26 -8 l 24 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    {/* a sly smirk peeking past a covering hand */}
    <path d="M -30 46 q 30 18 60 -4" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -110 30 Q -40 20 60 34 Q 100 40 96 80 L -110 90 Z" fill={COLORS.skin} {...xl} />
    <path d="M -80 44 Q -10 36 70 50" fill="none" stroke={COLORS.skinShade} strokeWidth={STROKE.sm} />
  </g>
);

/** A shoulder turned away, radiating frost (the cold shoulder). */
export const FrostShoulder: React.FC = () => (
  <g>
    {/* a turned back/shoulder */}
    <path d="M -100 150 Q -110 0 0 -20 Q 110 0 100 150 Z" fill={COLORS.blueDiagram} {...xl} />
    <circle cx={0} cy={-70} r={56} fill={COLORS.blueDiagram} {...xl} />
    <path d="M 0 -120 Q -40 -110 -40 -70" fill="none" stroke={shade(COLORS.blueDiagram, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* frost / snowflakes */}
    {[[-120, -40], [120, -20], [-100, 80], [130, 90]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`} stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round">
        {[0, 60, 120].map((a, k) => <line key={k} x1={-16} y1={0} x2={16} y2={0} transform={`rotate(${a})`} />)}
      </g>
    ))}
  </g>
);

/** A red pen aggressively marking everything wrong (excessive criticism). */
export const RedPen: React.FC = () => (
  <g>
    <rect x={-150} y={-100} width={240} height={200} rx={10} fill={COLORS.white} {...xl} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-120} y={-66 + i * 40} width={i === 3 ? 90 : 180} height={10} rx={5} fill={COLORS.whiteShade} />)}
    {/* red circles + crosses + "NO" */}
    <circle cx={-60} cy={-50} r={28} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} />
    <path d="M 20 -14 l 40 40 m 0 -40 l -40 40" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -110 60 l 160 0" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* the pen */}
    <g transform="translate(120 70) rotate(40)"><rect x={-12} y={-80} width={24} height={130} rx={8} fill={COLORS.red} {...lg} /><path d="M -12 50 L 12 50 L 0 82 Z" fill={COLORS.ledGrey} {...sm} /><rect x={-12} y={-80} width={24} height={20} rx={8} fill={COLORS.redDark} /></g>
  </g>
);

/** A warm/cold meter: warm toward your failures, cold toward your wins. */
export const EnvyThermometer: React.FC = () => {
  const f = useCurrentFrame();
  const cold = Math.sin(f / 10) > 0;
  return (
    <g>
      <rect x={-30} y={-170} width={60} height={250} rx={30} fill={COLORS.white} {...xl} />
      <rect x={-16} y={cold ? -40 : -150} width={32} height={cold ? 90 : 200} rx={16} fill={cold ? COLORS.sky : COLORS.red} />
      <g transform="translate(0 110)"><circle r={54} fill={COLORS.white} {...xl} /><circle r={36} fill={cold ? COLORS.sky : COLORS.red} /></g>
      {/* two labels */}
      <text x={120} y={-110} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.redDark}>you fail →</text>
      <text x={130} y={-70} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={22} fill={COLORS.outline}>warm</text>
      <text x={120} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.blueDiagramDark}>you win →</text>
      <text x={130} y={70} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={22} fill={COLORS.outline}>cold</text>
    </g>
  );
};

/** A face giving a sidelong, sizing-you-up glance (the jealous side-eye). */
export const SideEye: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={100} fill={COLORS.white} {...xl} />
    {/* eyes both cut hard to the side */}
    <ellipse cx={-34} cy={-10} rx={34} ry={26} fill={COLORS.white} {...sm} />
    <ellipse cx={34} cy={-10} rx={34} ry={26} fill={COLORS.white} {...sm} />
    <circle cx={-16} cy={-10} r={13} fill={COLORS.outline} />
    <circle cx={52} cy={-10} r={13} fill={COLORS.outline} />
    {/* flat, unimpressed mouth */}
    <path d="M -24 44 l 48 0" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* one raised brow */}
    <path d="M -54 -44 q 20 -14 40 -4" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M 14 -48 l 40 6" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
  </g>
);
