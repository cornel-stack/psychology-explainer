/**
 * bedroom.tsx — bedroom props. Each draws around its own local origin (0,0).
 * Flat fill + uniform outline, round joins, one darker second-tone for shading.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const sil = strokeProps(STROKE.xl);
const std = strokeProps(STROKE.lg);
const fine = strokeProps(STROKE.sm);

export const Pillow: React.FC = () => (
  <g>
    <rect x={-110} y={-56} width={220} height={112} rx={44} fill={COLORS.white} {...std} />
    {/* crease second-tone */}
    <path d="M -70 -10 Q 0 24 70 -10" fill="none" {...fine} stroke={COLORS.whiteShade} />
  </g>
);

export const Bed: React.FC = () => (
  <g>
    {/* headboard — taller than the pillows */}
    <rect x={-360} y={-260} width={120} height={380} rx={24} fill={COLORS.wood} {...sil} />
    <rect x={-336} y={-230} width={72} height={210} rx={16} fill={COLORS.woodDark} opacity={0.35} />
    {/* mattress base */}
    <rect x={-360} y={40} width={720} height={120} rx={28} fill={COLORS.white} {...sil} />
    {/* blue mattress band (second tone) */}
    <rect x={-352} y={96} width={704} height={60} rx={24} fill={COLORS.sky} {...std} />
    {/* blanket */}
    <path d="M -300 60 Q 0 20 300 60 L 300 150 Q 0 170 -300 150 Z" fill={COLORS.sky} {...std} />
    <path d="M -40 70 Q 0 100 40 70" fill="none" {...fine} />
    {/* pillows */}
    <g transform="translate(-230 20)"><Pillow /></g>
    <g transform="translate(-30 20)"><Pillow /></g>
  </g>
);

/** Bed blanket/duvet — sits on the bed behind/around the sitting mascot.
 *  Visible fold lines + a darker-blue band along the lower edge. */
export const Blanket: React.FC = () => (
  <g>
    <path d="M -440 -70 Q 0 -130 440 -70 L 440 200 L -440 200 Z" fill={COLORS.sky} {...sil} />
    {/* top roll highlight */}
    <path d="M -440 -36 Q 0 -96 440 -36" fill="none" {...std} stroke={COLORS.white} />
    {/* 3 fold lines */}
    <path d="M -250 -60 Q -256 60 -240 180 M 0 -84 Q 0 60 0 196 M 250 -60 Q 256 60 240 180" fill="none" {...std} stroke={COLORS.skyDark} />
    {/* darker band along the lower edge */}
    <rect x={-440} y={150} width={880} height={50} fill={shade(COLORS.sky, 0.2)} />
    <path d="M -440 150 L 440 150" {...std} stroke={shade(COLORS.sky, 0.25)} />
  </g>
);

export const Nightstand: React.FC = () => (
  <g>
    <rect x={-100} y={-120} width={200} height={240} rx={20} fill={COLORS.wood} {...sil} />
    <rect x={-80} y={-96} width={160} height={90} rx={12} fill={COLORS.woodDark} opacity={0.3} {...fine} />
    <rect x={-80} y={10} width={160} height={90} rx={12} fill={COLORS.woodDark} opacity={0.3} {...fine} />
    <circle cx={0} cy={-50} r={9} fill={COLORS.yellow} {...strokeProps(STROKE.sm)} />
    <circle cx={0} cy={56} r={9} fill={COLORS.yellow} {...strokeProps(STROKE.sm)} />
  </g>
);

export const Lamp: React.FC = () => (
  <g>
    <ellipse cx={0} cy={120} rx={70} ry={20} fill={COLORS.wood} {...std} />
    <rect x={-8} y={-40} width={16} height={160} rx={8} fill={COLORS.woodDark} {...std} />
    <path d="M -74 -40 L 74 -40 L 48 -130 L -48 -130 Z" fill={COLORS.yellow} {...sil} />
    <path d="M -74 -40 L 74 -40" {...std} />
  </g>
);

export const Slippers: React.FC = () => (
  <g>
    <path d="M -110 10 Q -110 -24 -70 -24 L -20 -24 Q -4 -24 -4 -6 Q -4 20 -36 20 L -90 20 Q -110 20 -110 10 Z" fill={COLORS.pink} {...std} />
    <path d="M -108 -8 Q -70 -22 -30 -12" fill="none" {...fine} />
    <path d="M 10 10 Q 10 -24 50 -24 L 100 -24 Q 116 -24 116 -6 Q 116 20 84 20 L 30 20 Q 10 20 10 10 Z" fill={COLORS.pink} {...std} />
    <path d="M 12 -8 Q 50 -22 90 -12" fill="none" {...fine} />
  </g>
);

export const FramedPicture: React.FC = () => (
  <g>
    <rect x={-80} y={-64} width={160} height={128} rx={12} fill={COLORS.wood} {...std} />
    <rect x={-62} y={-46} width={124} height={92} rx={6} fill={COLORS.sky} {...fine} />
    {/* tiny landscape */}
    <path d="M -62 30 L -24 -6 L 6 22 L 34 -12 L 62 30 Z" fill={COLORS.greenLeaf} />
    <circle cx={40} cy={-24} r={12} fill={COLORS.yellow} {...strokeProps(STROKE.sm)} />
  </g>
);

export const WallClock: React.FC = () => {
  const f = useCurrentFrame();
  const hand = (f / 30) * 6; // slow sweep
  return (
    <g>
      <circle cx={0} cy={0} r={70} fill={COLORS.sky} {...sil} />
      <circle cx={0} cy={0} r={54} fill={COLORS.white} {...fine} />
      <line x1={0} y1={0} x2={0} y2={-36} transform={`rotate(${hand})`} {...strokeProps(STROKE.sm)} />
      <line x1={0} y1={0} x2={26} y2={0} transform={`rotate(${hand * 12})`} {...strokeProps(STROKE.sm)} />
      <circle cx={0} cy={0} r={6} fill={COLORS.outline} />
    </g>
  );
};

/** Alarm clock — shakes (spec). */
export const AlarmClock: React.FC<{ shaking?: boolean }> = ({ shaking = true }) => {
  const f = useCurrentFrame();
  const dx = shaking ? Math.sin(f * 1.6) * 5 : 0;
  const rot = shaking ? Math.sin(f * 1.6) * 3 : 0;
  return (
    <g transform={`translate(${dx} 0) rotate(${rot})`}>
      <circle cx={-44} cy={-70} r={22} fill={COLORS.red} {...std} />
      <circle cx={44} cy={-70} r={22} fill={COLORS.red} {...std} />
      <circle cx={0} cy={0} r={76} fill={COLORS.yellow} {...sil} />
      <circle cx={0} cy={0} r={58} fill={COLORS.white} {...fine} />
      <line x1={0} y1={0} x2={0} y2={-36} {...strokeProps(STROKE.sm)} />
      <line x1={0} y1={0} x2={28} y2={6} {...strokeProps(STROKE.sm)} />
      <rect x={-20} y={72} width={40} height={20} rx={8} fill={COLORS.red} {...std} />
    </g>
  );
};

export const WindowNight: React.FC = () => (
  <g>
    <rect x={-130} y={-160} width={260} height={320} rx={18} fill={COLORS.purpleDeep} {...sil} />
    <rect x={-110} y={-140} width={220} height={280} rx={10} fill={COLORS.purpleDeep} />
    {/* crescent moon */}
    <path d="M 40 -70 a 40 40 0 1 0 22 64 a 32 32 0 1 1 -22 -64 z" fill={COLORS.yellowSoft} />
    {/* stars */}
    {[[-60, -90], [-30, -30], [-70, 20], [10, 40]].map(([x, y], i) => (
      <path key={i} d={`M ${x} ${y - 7} l 2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z`} fill={COLORS.white} />
    ))}
    {/* muntins */}
    <line x1={0} y1={-160} x2={0} y2={160} {...std} />
    <line x1={-130} y1={0} x2={130} y2={0} {...std} />
  </g>
);

export const WindowDay: React.FC = () => (
  <g>
    <rect x={-130} y={-160} width={260} height={320} rx={18} fill={COLORS.sky} {...sil} />
    <rect x={-110} y={-140} width={220} height={280} rx={10} fill={COLORS.sky} />
    <circle cx={46} cy={-74} r={34} fill={COLORS.yellow} {...std} />
    <g {...strokeProps(STROKE.sm)} stroke={COLORS.yellow}>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1={46 + Math.cos(a) * 42} y1={-74 + Math.sin(a) * 42} x2={46 + Math.cos(a) * 56} y2={-74 + Math.sin(a) * 56} />;
      })}
    </g>
    <ellipse cx={-50} cy={20} rx={56} ry={26} fill={COLORS.white} {...std} />
    <ellipse cx={-10} cy={40} rx={48} ry={22} fill={COLORS.white} {...std} />
    <line x1={0} y1={-160} x2={0} y2={160} {...std} />
    <line x1={-130} y1={0} x2={130} y2={0} {...std} />
  </g>
);
