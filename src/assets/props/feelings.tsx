/**
 * feelings.tsx — new props for the "unnamed feelings" video. Local origin (0,0),
 * token strokes, flat two-tone shading, chapter-neutral palette.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);

/** A phone showing a group chat (speech bubbles stacking in). */
export const GroupChatPhone: React.FC = () => {
  const f = useCurrentFrame();
  const n = 1 + (Math.floor(f / 18) % 3);
  const bubbles = [
    { x: -40, y: -70, w: 110, c: COLORS.sky, side: -1 },
    { x: 30, y: -14, w: 96, c: COLORS.greenLeaf, side: 1 },
    { x: -46, y: 44, w: 120, c: COLORS.sky, side: -1 },
  ];
  return (
    <g>
      <rect x={-90} y={-170} width={180} height={340} rx={30} fill={COLORS.shirtDark} {...xl} />
      <rect x={-72} y={-150} width={144} height={300} rx={14} fill={COLORS.bgCream} />
      {bubbles.slice(0, n).map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={40} rx={18} fill={b.c} {...sm} />
          <circle cx={b.x + 22} cy={b.y + 20} r={5} fill={COLORS.outline} />
          <circle cx={b.x + 44} cy={b.y + 20} r={5} fill={COLORS.outline} />
          <circle cx={b.x + 66} cy={b.y + 20} r={5} fill={COLORS.outline} />
        </g>
      ))}
      <rect x={-20} y={150} width={40} height={10} rx={5} fill={COLORS.shirtDarker} />
    </g>
  );
};

/** Two beamed eighth notes + a single note, with a little sparkle. */
export const MusicNotes: React.FC = () => (
  <g>
    <g fill={COLORS.purpleDeep}>
      <rect x={-96} y={-110} width={16} height={150} rx={8} />
      <rect x={-8} y={-124} width={16} height={164} rx={8} />
      <rect x={-96} y={-124} width={112} height={26} rx={10} transform="rotate(-6 -40 -111)" />
      <ellipse cx={-96} cy={44} rx={30} ry={22} transform="rotate(-18 -96 44)" />
      <ellipse cx={-8} cy={30} rx={30} ry={22} transform="rotate(-18 -8 30)" />
    </g>
    <g {...sm}>
      <rect x={-96} y={-110} width={16} height={150} rx={8} fill={COLORS.purpleDeep} />
      <rect x={-8} y={-124} width={16} height={164} rx={8} fill={COLORS.purpleDeep} />
    </g>
    <g fill={COLORS.yellow} {...sm}>
      <path d="M 92 -40 L 100 -22 L 120 -14 L 100 -6 L 92 12 L 84 -6 L 64 -14 L 84 -22 Z" />
    </g>
  </g>
);

/** A stack of old photographs, top one holding a tiny sunset landscape. */
export const PhotoStack: React.FC = () => (
  <g>
    <g transform="rotate(-10)"><rect x={-96} y={-70} width={192} height={160} rx={10} fill={COLORS.white} {...xl} /></g>
    <g transform="rotate(6)"><rect x={-96} y={-70} width={192} height={160} rx={10} fill={COLORS.white} {...xl} /></g>
    <rect x={-96} y={-74} width={192} height={168} rx={10} fill={COLORS.white} {...xl} />
    <rect x={-80} y={-58} width={160} height={120} rx={6} fill={COLORS.yellowSoft} {...sm} />
    <path d="M -80 62 L -36 6 L 0 40 L 40 -6 L 80 50 L 80 62 Z" fill={COLORS.wood} />
    <circle cx={44} cy={-20} r={16} fill={COLORS.yellow} {...sm} />
    <rect x={-96} y={70} width={192} height={24} rx={6} fill={COLORS.whiteShade} />
  </g>
);

/** Rain cloud with falling streaks. */
export const RainCloud: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M -110 10 Q -132 -34 -86 -46 Q -74 -88 -14 -72 Q 34 -104 80 -62 Q 134 -64 122 -14 Q 138 24 92 28 L -84 28 Q -122 28 -110 10 Z" fill={COLORS.lavender} {...xl} />
      <path d="M -84 14 Q -30 36 92 26 Q 124 24 116 4 Q 64 22 -66 18 Q -92 16 -84 14 Z" fill={shade(COLORS.lavender, 0.18)} />
      {[-70, -30, 10, 50, 86].map((x, i) => {
        const y = 48 + ((f * 3 + i * 22) % 70);
        return <rect key={i} x={x} y={y} width={9} height={34} rx={5} fill={COLORS.sky} {...sm} />;
      })}
    </g>
  );
};

/** A cute puppy, sitting, big eyes (gigil). */
export const Puppy: React.FC = () => {
  const f = useCurrentFrame();
  const tail = Math.sin(f / 5) * 10;
  return (
    <g>
      {/* tail */}
      <path d={`M 70 20 Q ${120 + tail} ${-10 - tail} ${110 + tail} ${-50 - tail}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl + 8} strokeLinecap="round" />
      <path d={`M 70 20 Q ${120 + tail} ${-10 - tail} ${110 + tail} ${-50 - tail}`} fill="none" stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* body */}
      <ellipse cx={30} cy={40} rx={86} ry={78} fill={COLORS.wood} {...xl} />
      <ellipse cx={30} cy={66} rx={54} ry={40} fill={COLORS.yellowSoft} />
      {/* head */}
      <circle cx={-30} cy={-40} r={78} fill={COLORS.wood} {...xl} />
      {/* ears */}
      <path d="M -92 -92 Q -124 -40 -96 -2 Q -72 -34 -76 -86 Z" fill={shade(COLORS.wood, 0.18)} {...lg} />
      <path d="M 32 -92 Q 60 -40 34 -2 Q 12 -34 16 -86 Z" fill={shade(COLORS.wood, 0.18)} {...lg} />
      {/* muzzle */}
      <ellipse cx={-30} cy={-14} rx={40} ry={30} fill={COLORS.yellowSoft} {...sm} />
      <circle cx={-52} cy={-50} r={14} fill={COLORS.outline} />
      <circle cx={-8} cy={-50} r={14} fill={COLORS.outline} />
      <circle cx={-56} cy={-55} r={4} fill={COLORS.white} />
      <circle cx={-12} cy={-55} r={4} fill={COLORS.white} />
      <ellipse cx={-30} cy={-22} rx={11} ry={8} fill={COLORS.outline} />
      <path d="M -30 -14 Q -30 0 -42 4 M -30 -14 Q -30 0 -18 4" fill="none" {...sm} />
      {/* paws */}
      <ellipse cx={-28} cy={112} rx={22} ry={14} fill={COLORS.yellowSoft} {...sm} />
      <ellipse cx={40} cy={112} rx={22} ry={14} fill={COLORS.yellowSoft} {...sm} />
    </g>
  );
};

/** A medieval city gate / stone arch with two wooden doors (torschlusspanik). */
export const CityGate: React.FC = () => (
  <g>
    <path d="M -120 160 L -120 -30 Q -120 -140 0 -140 Q 120 -140 120 -30 L 120 160 Z" fill={COLORS.woodDark} {...xl} />
    <rect x={-150} y={-60} width={60} height={220} rx={10} fill={COLORS.woodDark} {...lg} />
    <rect x={90} y={-60} width={60} height={220} rx={10} fill={COLORS.woodDark} {...lg} />
    {/* opening with two doors ajar */}
    <path d="M -86 160 L -86 -20 Q -86 -104 0 -104 Q 86 -104 86 -20 L 86 160 Z" fill={COLORS.shirtDark} />
    <path d="M -86 160 L -86 -20 Q -86 -96 -8 -100 L -8 160 Z" fill={COLORS.wood} {...lg} />
    <path d="M 86 160 L 86 -20 Q 86 -96 8 -100 L 8 160 Z" fill={COLORS.wood} {...lg} />
    <circle cx={-26} cy={60} r={8} fill={COLORS.yellow} {...sm} />
    <circle cx={26} cy={60} r={8} fill={COLORS.yellow} {...sm} />
    {/* battlements */}
    {[-110, -66, -22, 22, 66].map((x, i) => (
      <rect key={i} x={x} y={-156} width={30} height={30} fill={COLORS.woodDark} {...lg} />
    ))}
  </g>
);

/** A bowl of water left out overnight (awumbuk). */
export const WaterBowl: React.FC = () => {
  const f = useCurrentFrame();
  const ripple = Math.sin(f / 14) * 4;
  return (
    <g>
      <path d="M -96 -6 Q 0 30 96 -6 L 70 76 Q 0 108 -70 76 Z" fill={COLORS.white} {...xl} />
      <ellipse cx={0} cy={-6} rx={96} ry={30} fill={COLORS.sky} {...lg} />
      <ellipse cx={0} cy={-6} rx={70} ry={20} fill={shade(COLORS.sky, 0.14)} />
      <ellipse cx={-18} cy={-8 + ripple} rx={22} ry={6} fill={COLORS.white} opacity={0.6} />
      <path d="M -96 -6 Q 0 26 96 -6" fill="none" {...sm} />
    </g>
  );
};

/** A travel suitcase with a handle and a sticker (fernweh). */
export const Suitcase: React.FC = () => (
  <g>
    <rect x={-20} y={-120} width={40} height={40} rx={18} fill="none" {...xl} />
    <rect x={-110} y={-80} width={220} height={180} rx={24} fill={COLORS.greenTeal} {...xl} />
    <rect x={-110} y={-12} width={220} height={28} fill={shade(COLORS.greenTeal, 0.18)} />
    <rect x={-70} y={-80} width={18} height={180} fill={shade(COLORS.greenTeal, 0.12)} />
    <rect x={52} y={-80} width={18} height={180} fill={shade(COLORS.greenTeal, 0.12)} />
    {/* latches */}
    <rect x={-80} y={-26} width={26} height={20} rx={5} fill={COLORS.yellow} {...sm} />
    <rect x={54} y={-26} width={26} height={20} rx={5} fill={COLORS.yellow} {...sm} />
    {/* round travel sticker */}
    <circle cx={30} cy={46} r={30} fill={COLORS.pink} {...sm} />
    <path d="M 12 46 L 48 46 M 30 28 L 30 64" {...sm} stroke={COLORS.white} />
  </g>
);
