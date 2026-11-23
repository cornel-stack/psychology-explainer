/**
 * story.tsx — literal scene props so the ART draws exactly what the narration
 * says (the bill, the cigarette, the red flag, the mirror, the punching bag...).
 * Local origin (0,0), token strokes (7/10/14 or >=15), flat two-tone. Several are
 * parametric (label text) so one component serves many literal beats.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A sheet of bad news — bill / test result / rejection. `label` sets the header,
 *  `tone` the header colour. The thing you don't want to look at. */
export const BadLetter: React.FC<{ label?: string; tone?: string }> = ({ label = 'OVERDUE', tone = COLORS.red }) => (
  <g>
    <rect x={-96} y={-124} width={192} height={248} rx={12} fill={COLORS.white} {...xl} />
    <rect x={-96} y={-124} width={192} height={60} rx={12} fill={tone} {...lg} />
    <rect x={-96} y={-74} width={192} height={10} fill={shade(tone, 0.2)} />
    <text x={0} y={-82} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.white}>
      {label}
    </text>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-70} y={-36 + i * 34} width={i === 3 ? 90 : 140} height={10} rx={5} fill={COLORS.whiteShade} />
    ))}
    {/* red stamp circle */}
    <g transform="translate(46 70) rotate(-14)">
      <circle r={38} fill="none" stroke={tone} strokeWidth={STROKE.lg} />
      <text x={0} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={tone}>
        !
      </text>
    </g>
  </g>
);

/** A messy pile of magazines you slide the bill under (cold open / denial). */
export const MagazinePile: React.FC = () => {
  const tones = [COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.greenTeal] as const;
  return (
    <g>
      {tones.map((t, i) => (
        <g key={i} transform={`translate(${(i % 2 ? 12 : -12) + i * 2} ${-i * 20}) rotate(${i % 2 ? 4 : -5})`}>
          <rect x={-130} y={-18} width={260} height={40} rx={8} fill={t} {...lg} />
          <rect x={-130} y={-18} width={70} height={40} rx={8} fill={shade(t, 0.18)} />
          <rect x={-46} y={-8} width={150} height={8} rx={4} fill={COLORS.white} opacity={0.8} />
        </g>
      ))}
    </g>
  );
};

/** A lit cigarette with a curl of smoke ("the smoker certain it won't be them"). */
export const Cigarette: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 20) * 10;
  return (
    <g>
      <rect x={-120} y={-14} width={210} height={28} rx={8} fill={COLORS.white} {...lg} />
      <rect x={60} y={-14} width={50} height={28} rx={8} fill={COLORS.yellow} {...lg} />
      <rect x={104} y={-14} width={14} height={28} rx={6} fill={COLORS.red} />
      <circle cx={120} cy={0} r={9} fill={COLORS.yellowDark} />
      {/* smoke */}
      <path
        d={`M 118 -16 Q ${150 + sway} -70 118 -120 Q ${90 - sway} -170 ${130 + sway} -220`}
        fill="none"
        stroke={COLORS.whiteShade}
        strokeWidth={STROKE.lg}
        strokeLinecap="round"
        opacity={0.8}
      />
    </g>
  );
};

/** A waving red warning flag ("ignores every red flag"). */
export const RedFlag: React.FC = () => {
  const f = useCurrentFrame();
  const w = Math.sin(f / 8) * 10;
  return (
    <g>
      <rect x={-10} y={-150} width={20} height={300} rx={8} fill={COLORS.shirtDark} {...lg} />
      <circle cx={0} cy={-150} r={14} fill={COLORS.yellow} {...sm} />
      <path d={`M 10 -140 Q ${120 + w} -120 ${150 - w} -80 Q ${120 + w} -40 10 -30 Z`} fill={COLORS.red} {...xl} />
      <path d="M 44 -108 l 26 26 m 0 -26 l -26 26" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
};

/** A standing oval mirror that reflects a little face back ("check the mirror"). */
export const Mirror: React.FC<{ tone?: string }> = ({ tone = COLORS.sky }) => (
  <g>
    <ellipse cx={0} cy={0} rx={110} ry={150} fill={COLORS.wood} {...xl} />
    <ellipse cx={0} cy={0} rx={84} ry={124} fill={tone} {...lg} />
    {/* reflected chibi face */}
    <circle cx={0} cy={-6} r={60} fill={COLORS.white} {...sm} />
    <circle cx={-22} cy={-14} r={9} fill={COLORS.outline} />
    <circle cx={22} cy={-14} r={9} fill={COLORS.outline} />
    <path d="M -18 20 Q 0 32 18 20" fill="none" {...sm} />
    <circle cx={-34} cy={8} r={9} fill={COLORS.pink} opacity={0.6} />
    <circle cx={34} cy={8} r={9} fill={COLORS.pink} opacity={0.6} />
    {/* glass glare */}
    <path d="M -50 -90 L -20 -90 L -56 60 L -86 60 Z" fill={COLORS.white} opacity={0.25} />
    {/* stand */}
    <path d="M -40 150 L 40 150 L 70 210 L -70 210 Z" fill={COLORS.woodDark} {...lg} />
  </g>
);

/** A baby bottle (regression). */
export const BabyBottle: React.FC = () => (
  <g>
    <rect x={-54} y={-40} width={108} height={160} rx={30} fill={COLORS.sky} {...xl} />
    <path d="M -54 40 Q 0 58 54 40 L 54 120 Q 0 134 -54 120 Z" fill={shade(COLORS.sky, 0.16)} />
    <rect x={-40} y={-74} width={80} height={44} rx={14} fill={COLORS.white} {...lg} />
    <path d="M -22 -74 Q 0 -120 22 -74 Z" fill={COLORS.pink} {...lg} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={-34} y={-14 + i * 28} width={68} height={8} rx={4} fill={COLORS.white} opacity={0.8} />
    ))}
  </g>
);

/** A wrapped gift box (undoing's apology gifts / reaction-formation lavishness). */
export const GiftBox: React.FC<{ tone?: string }> = ({ tone = COLORS.pink }) => (
  <g>
    <rect x={-100} y={-40} width={200} height={150} rx={12} fill={tone} {...xl} />
    <rect x={-100} y={-70} width={200} height={44} rx={10} fill={shade(tone, 0.14)} {...lg} />
    <rect x={-18} y={-70} width={36} height={180} fill={COLORS.yellow} {...sm} />
    <path d="M 0 -70 Q -60 -140 -96 -96 Q -40 -80 0 -70 Q 60 -140 96 -96 Q 40 -80 0 -70 Z" fill={COLORS.yellow} {...lg} />
    <circle cx={0} cy={-70} r={14} fill={COLORS.yellowDark} {...sm} />
  </g>
);

/** A bouquet of flowers (over-the-top kindness — reaction formation). */
export const Bouquet: React.FC = () => {
  const petals = [COLORS.pink, COLORS.yellow, COLORS.red, COLORS.lavender, COLORS.sky] as const;
  return (
    <g>
      {/* wrap */}
      <path d="M -70 30 L 70 30 L 36 170 L -36 170 Z" fill={COLORS.bgCream} {...xl} />
      <path d="M -70 30 L 70 30 L 56 86 L -56 86 Z" fill={shade(COLORS.bgCream, 0.1)} />
      {/* stems */}
      <path d="M 0 30 L 0 -40 M -40 30 L -60 -30 M 40 30 L 60 -30" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* blooms */}
      {[[-60, -40], [60, -40], [0, -70], [-26, -24], [26, -24]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={Math.cos((k / 5) * 6.28) * 22} cy={Math.sin((k / 5) * 6.28) * 22} r={16} fill={petals[i]} {...sm} />
          ))}
          <circle cx={0} cy={0} r={14} fill={COLORS.yellowDark} {...sm} />
        </g>
      ))}
    </g>
  );
};

/** A tall stack of thick books (intellectualization — "become an expert"). */
export const BookStack: React.FC = () => {
  const tones = [COLORS.blueDiagram, COLORS.red, COLORS.greenLeaf, COLORS.yellow, COLORS.lavender] as const;
  return (
    <g>
      {tones.map((t, i) => {
        const y = 110 - i * 52;
        const w = 230 - i * 14;
        const off = (i % 2 ? 1 : -1) * (10 + i * 2);
        return (
          <g key={i} transform={`translate(${off} ${y})`}>
            <rect x={-w / 2} y={-44} width={w} height={48} rx={6} fill={t} {...lg} />
            <rect x={-w / 2} y={-44} width={18} height={48} fill={shade(t, 0.2)} />
            <rect x={-w / 2 + 30} y={-26} width={w - 60} height={8} rx={4} fill={COLORS.white} opacity={0.85} />
          </g>
        );
      })}
    </g>
  );
};

/** A whiteboard with a graph + scribbles (intellectualization / analysis). */
export const Whiteboard: React.FC = () => (
  <g>
    <rect x={-170} y={-130} width={340} height={230} rx={12} fill={COLORS.white} {...xl} />
    <rect x={-170} y={100} width={340} height={18} rx={6} fill={COLORS.ledGrey} {...lg} />
    {/* axes + rising line */}
    <path d="M -130 60 L -130 -90 M -130 60 L 130 60" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <path d="M -130 40 L -60 10 L 10 -30 L 120 -70" fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    {/* scribbled notes */}
    <path d="M -110 -108 L 40 -108 M -110 -84 L 10 -84" stroke={COLORS.pinkDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <circle cx={92} cy={-78} r={10} fill={COLORS.red} />
  </g>
);

/** A heart-rate monitor showing a dead-flat line (isolation of affect). */
export const FlatlineScreen: React.FC = () => (
  <g>
    <rect x={-150} y={-100} width={300} height={200} rx={16} fill={COLORS.shirtDark} {...xl} />
    <rect x={-124} y={-74} width={248} height={148} rx={8} fill={COLORS.purpleDeep} {...lg} />
    <path d="M -108 0 L 108 0" stroke={COLORS.ledGreen} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <circle cx={108} cy={0} r={9} fill={COLORS.ledGreen} />
    {/* stand */}
    <rect x={-14} y={100} width={28} height={44} fill={COLORS.ledGrey} {...lg} />
    <rect x={-60} y={140} width={120} height={18} rx={8} fill={COLORS.ledGrey} {...lg} />
  </g>
);

/** A closed door you can slam or kick (displacement). */
export const Door: React.FC<{ tone?: string }> = ({ tone = COLORS.wood }) => (
  <g>
    <rect x={-96} y={-180} width={192} height={360} rx={10} fill={tone} {...xl} />
    <rect x={-70} y={-150} width={140} height={130} rx={8} fill={shade(tone, 0.14)} {...sm} />
    <rect x={-70} y={10} width={140} height={130} rx={8} fill={shade(tone, 0.14)} {...sm} />
    <circle cx={64} cy={-10} r={14} fill={COLORS.yellow} {...sm} />
    {/* impact marks */}
    <path d="M -30 -30 l 18 -8 m -10 20 l 20 -4" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);

/** A gym punching bag (rage → sport; sublimation / displacement). */
export const PunchingBag: React.FC = () => {
  const f = useCurrentFrame();
  const sw = Math.sin(f / 14) * 5;
  return (
    <g transform={`rotate(${sw})`}>
      <path d="M 0 -220 L 0 -150" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -40 -150 L 40 -150 L 20 -120 L -20 -120 Z" fill={COLORS.ledGrey} {...lg} />
      <rect x={-66} y={-128} width={132} height={300} rx={40} fill={COLORS.red} {...xl} />
      <rect x={-66} y={-70} width={132} height={30} fill={shade(COLORS.red, 0.2)} />
      <rect x={-66} y={60} width={132} height={30} fill={shade(COLORS.red, 0.2)} />
      <path d="M -40 -100 L 40 -100" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} />
    </g>
  );
};

/** A heart split by a jagged crack (splitting / heartbreak → art). */
export const BrokenHeart: React.FC = () => (
  <g>
    <path d="M 0 -56 Q -40 -100 -84 -64 Q -120 -30 -74 18 Q -40 54 0 92 Q 40 54 74 18 Q 120 -30 84 -64 Q 40 -100 0 -56 Z" fill={COLORS.red} {...xl} />
    {/* crack */}
    <path d="M 0 -58 L -16 -6 L 14 18 L -8 92" fill="none" stroke={COLORS.bgCream} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 0 -58 L -16 -6 L 14 18 L -8 92" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** A bathroom sink with running water (undoing — "wash it away"). */
export const Sink: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M -130 -20 Q 0 40 130 -20 L 100 90 Q 0 130 -100 90 Z" fill={COLORS.white} {...xl} />
      <ellipse cx={0} cy={-18} rx={120} ry={34} fill={COLORS.sky} {...lg} />
      <ellipse cx={0} cy={-18} rx={70} ry={18} fill={shade(COLORS.sky, 0.2)} />
      {/* faucet */}
      <path d="M 0 -120 L 0 -70 Q 0 -54 -18 -54" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <rect x={-14} y={-134} width={28} height={20} rx={6} fill={COLORS.ledGrey} {...sm} />
      {/* water stream + droplets */}
      <path d="M -18 -50 L -18 -22" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={-18 + (i - 1) * 12} cy={-30 + ((f + i * 10) % 40)} r={5} fill={COLORS.skyDark} />
      ))}
    </g>
  );
};

/** A megaphone (performing the opposite loudly — reaction formation). */
export const Megaphone: React.FC = () => (
  <g>
    <path d="M -110 -50 L -30 -70 L -30 70 L -110 50 Z" fill={COLORS.red} {...xl} />
    <rect x={-30} y={-70} width={44} height={140} rx={12} fill={shade(COLORS.red, 0.16)} {...lg} />
    <rect x={14} y={-40} width={40} height={80} rx={10} fill={COLORS.ledGrey} {...lg} />
    <rect x={54} y={-18} width={70} height={36} rx={10} fill={COLORS.shirtDark} {...lg} />
    {/* sound waves */}
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${-130 - i * 26} ${-30 - i * 14} Q ${-150 - i * 30} 0 ${-130 - i * 26} ${30 + i * 14}`} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    ))}
  </g>
);

/** A single running shoe (restless energy → marathon; sublimation). */
export const RunningShoe: React.FC = () => (
  <g>
    <path d="M -130 30 Q -120 -20 -70 -26 L -10 -40 Q 40 -54 70 -20 Q 120 -10 130 30 L 130 56 Q 0 78 -130 56 Z" fill={COLORS.sky} {...xl} />
    <path d="M -130 30 Q 0 52 130 30 L 130 56 Q 0 78 -130 56 Z" fill={COLORS.white} {...lg} />
    <path d="M -10 -40 Q 40 -54 70 -20 L 20 -4 Z" fill={shade(COLORS.sky, 0.18)} />
    {/* laces */}
    <path d="M -4 -26 L 44 -8 M -14 -6 L 36 10 M -24 14 L 28 28" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />
    {/* motion lines */}
    <path d="M -170 0 l -44 0 M -180 30 l -54 0" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
  </g>
);
