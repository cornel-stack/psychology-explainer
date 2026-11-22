/**
 * objects.tsx — physical object props (kitchen + misc). Local origin (0,0).
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const sil = strokeProps(STROKE.xl);
const std = strokeProps(STROKE.lg);
const fine = strokeProps(STROKE.sm);

export const Fridge: React.FC = () => (
  <g>
    <rect x={-110} y={-220} width={220} height={440} rx={28} fill={COLORS.sky} {...sil} />
    <line x1={-110} y1={-30} x2={110} y2={-30} {...std} />
    <rect x={70} y={-180} width={16} height={100} rx={8} fill={COLORS.white} {...fine} />
    <rect x={70} y={20} width={16} height={120} rx={8} fill={COLORS.white} {...fine} />
    {/* magnets + note */}
    <circle cx={-60} cy={60} r={12} fill={COLORS.yellow} {...strokeProps(STROKE.sm)} />
    <circle cx={-30} cy={100} r={12} fill={COLORS.greenLeaf} {...strokeProps(STROKE.sm)} />
    <rect x={20} y={40} width={64} height={84} rx={6} fill={COLORS.white} {...fine} />
  </g>
);

export const Kettle: React.FC = () => (
  <g>
    <path d="M -70 60 Q -84 -40 0 -50 Q 84 -40 70 60 Z" fill={COLORS.red} {...sil} />
    <path d="M 70 -10 Q 110 -6 100 40" fill="none" {...std} />
    <path d="M -70 -10 Q -108 -20 -118 10" fill="none" {...std} />
    <rect x={-24} y={-78} width={48} height={22} rx={10} fill={COLORS.red} {...std} />
    <ellipse cx={-26} cy={10} rx={14} ry={30} fill={COLORS.white} opacity={0.35} />
  </g>
);

export const Toothbrush: React.FC = () => (
  <g transform="rotate(-20)">
    <rect x={-14} y={-120} width={28} height={200} rx={14} fill={COLORS.sky} {...std} />
    <rect x={-18} y={-150} width={36} height={44} rx={10} fill={COLORS.white} {...std} />
    {Array.from({ length: 5 }).map((_, i) => (
      <line key={i} x1={-14 + i * 7} y1={-150} x2={-14 + i * 7} y2={-166} {...strokeProps(STROKE.sm)} />
    ))}
  </g>
);

export const Bagel: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={66} fill={COLORS.wood} {...sil} />
    <circle cx={0} cy={0} r={22} fill={COLORS.bgCream} {...std} />
    <circle cx={0} cy={0} r={66} fill="none" stroke={COLORS.woodDark} strokeWidth={10} opacity={0.4} />
    {[-30, 10, 40].map((x, i) => (
      <ellipse key={i} cx={x} cy={-30 + i * 6} rx={4} ry={6} fill={COLORS.outline} opacity={0.5} />
    ))}
  </g>
);

export const Envelope: React.FC = () => (
  <g>
    <rect x={-90} y={-60} width={180} height={120} rx={12} fill={COLORS.white} {...sil} />
    <path d="M -90 -54 L 0 14 L 90 -54" fill="none" {...std} />
    <path d="M -90 60 L -10 2 M 90 60 L 10 2" fill="none" {...fine} />
  </g>
);

export const TeddyBear: React.FC = () => (
  <g>
    <circle cx={-52} cy={-70} r={26} fill={COLORS.wood} {...std} />
    <circle cx={52} cy={-70} r={26} fill={COLORS.wood} {...std} />
    <circle cx={0} cy={-40} r={60} fill={COLORS.wood} {...sil} />
    <ellipse cx={0} cy={60} rx={70} ry={64} fill={COLORS.wood} {...sil} />
    <ellipse cx={0} cy={64} rx={40} ry={38} fill={COLORS.woodDark} opacity={0.3} />
    <circle cx={-20} cy={-48} r={6} fill={COLORS.outline} />
    <circle cx={20} cy={-48} r={6} fill={COLORS.outline} />
    <ellipse cx={0} cy={-26} rx={18} ry={14} fill={COLORS.bgCream} {...fine} />
    <circle cx={0} cy={-30} r={6} fill={COLORS.outline} />
  </g>
);

/** A side-profile high heel: rounded toe box (left), arch, thin heel spike (right),
 *  flat sole with a darker-pink crescent, and a bow on the instep. */
const Stiletto: React.FC<{ tone?: string }> = ({ tone = COLORS.pink }) => (
  <g>
    {/* thin heel spike at the back */}
    <path d="M 46 -8 L 58 62 L 66 62 L 52 -10 Z" fill={tone} {...std} />
    {/* upper / vamp: toe box left, rising to the heel at right */}
    <path
      d="M -122 -8
         C -134 -40 -98 -60 -58 -60
         C -22 -60 -2 -50 10 -32
         C 20 -18 40 -16 58 -18
         L 58 -8
         C 20 -2 -70 -2 -122 -8 Z"
      fill={tone}
      {...std}
    />
    {/* darker-pink crescent along the SOLE only */}
    <path d="M -118 -10 C -50 -2 16 -4 54 -14 L 54 -6 C 16 4 -60 4 -118 -4 Z" fill={shade(tone, 0.22)} />
    {/* ankle opening */}
    <ellipse cx={40} cy={-34} rx={18} ry={11} fill={shade(tone, 0.3)} />
    {/* bow on the instep */}
    <g transform="translate(-34 -58)">
      <path d="M 0 0 L -20 -11 L -20 11 Z" fill={tone} {...strokeProps(STROKE.sm)} />
      <path d="M 0 0 L 20 -11 L 20 11 Z" fill={tone} {...strokeProps(STROKE.sm)} />
      <circle r={7} fill={shade(tone, 0.15)} {...strokeProps(STROKE.sm)} />
    </g>
  </g>
);

export const PinkHeels: React.FC = () => (
  <g>
    {/* second shoe behind, offset + slightly smaller */}
    <g transform="translate(-36 54) scale(0.78)">
      <Stiletto tone={shade(COLORS.pink, 0.1)} />
    </g>
    {/* front shoe, large in profile */}
    <g transform="translate(30 -8)">
      <Stiletto />
    </g>
  </g>
);

export const SteeringWheel: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={130} fill="none" stroke={COLORS.outline} strokeWidth={26} />
    <circle cx={0} cy={0} r={130} fill="none" stroke={COLORS.shirtDark} strokeWidth={16} />
    <circle cx={0} cy={0} r={44} fill={COLORS.shirtDark} {...std} />
    <path d="M 0 0 L 0 -118 M 0 0 L -100 60 M 0 0 L 100 60" stroke={COLORS.shirtDark} strokeWidth={22} strokeLinecap="round" />
    <circle cx={0} cy={0} r={22} fill={COLORS.yellow} {...fine} />
  </g>
);

/** Spider dangling on a thread, pendulum sway (spec). */
export const SpiderOnThread: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 18) * 10;
  return (
    <g transform={`rotate(${sway})`} style={{ transformOrigin: '0px -220px' }}>
      <line x1={0} y1={-220} x2={0} y2={-40} {...strokeProps(STROKE.sm)} />
      <circle cx={0} cy={0} r={34} fill={COLORS.purpleDeep} {...sil} />
      <circle cx={0} cy={-26} r={20} fill={COLORS.purpleDeep} {...std} />
      <circle cx={-7} cy={-28} r={5} fill={COLORS.white} />
      <circle cx={7} cy={-28} r={5} fill={COLORS.white} />
      <g {...strokeProps(STROKE.sm)}>
        {[-1, 1].map((s) =>
          [0, 1, 2, 3].map((i) => (
            <path key={`${s}-${i}`} d={`M ${s * 20} ${-6 + i * 10} q ${s * 34} ${-6} ${s * 44} ${14}`} fill="none" />
          ))
        )}
      </g>
    </g>
  );
};
