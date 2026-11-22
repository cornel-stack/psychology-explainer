/**
 * objects.tsx — physical object props (kitchen + misc). Local origin (0,0).
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps } from '../../lib/style';

const sil = strokeProps(STROKE.sil);
const std = strokeProps(STROKE.std);
const fine = strokeProps(STROKE.fine);

export const Fridge: React.FC = () => (
  <g>
    <rect x={-110} y={-220} width={220} height={440} rx={28} fill={COLORS.sky} {...sil} />
    <line x1={-110} y1={-30} x2={110} y2={-30} {...std} />
    <rect x={70} y={-180} width={16} height={100} rx={8} fill={COLORS.white} {...fine} />
    <rect x={70} y={20} width={16} height={120} rx={8} fill={COLORS.white} {...fine} />
    {/* magnets + note */}
    <circle cx={-60} cy={60} r={12} fill={COLORS.yellow} {...strokeProps(3)} />
    <circle cx={-30} cy={100} r={12} fill={COLORS.greenLeaf} {...strokeProps(3)} />
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
      <line key={i} x1={-14 + i * 7} y1={-150} x2={-14 + i * 7} y2={-166} {...strokeProps(4)} />
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

export const PinkHeels: React.FC = () => (
  <g>
    <path d="M -120 0 Q -120 -40 -70 -40 L 10 -40 Q 40 -40 20 10 L -90 10 Q -120 10 -120 0 Z" fill={COLORS.pink} {...std} />
    <path d="M -90 10 L -80 50 L -66 50 L -74 10 Z" fill={COLORS.pink} {...fine} />
    <path d="M 40 -6 Q 40 -46 90 -46 L 130 -46 Q 150 -46 134 4 L 30 4 Q 40 4 40 -6 Z" fill={COLORS.pink} {...std} transform="translate(0 6)" />
    <path d="M 110 0 L 120 40 L 134 40 L 126 0 Z" fill={COLORS.pink} {...fine} />
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
      <line x1={0} y1={-220} x2={0} y2={-40} {...strokeProps(3)} />
      <circle cx={0} cy={0} r={34} fill={COLORS.purpleDeep} {...sil} />
      <circle cx={0} cy={-26} r={20} fill={COLORS.purpleDeep} {...std} />
      <circle cx={-7} cy={-28} r={5} fill={COLORS.white} />
      <circle cx={7} cy={-28} r={5} fill={COLORS.white} />
      <g {...strokeProps(5)}>
        {[-1, 1].map((s) =>
          [0, 1, 2, 3].map((i) => (
            <path key={`${s}-${i}`} d={`M ${s * 20} ${-6 + i * 10} q ${s * 34} ${-6} ${s * 44} ${14}`} fill="none" />
          ))
        )}
      </g>
    </g>
  );
};
