/**
 * rooms — full-bleed flat frontal sets (1920x1080). Composed from props +
 * WallFloor. Each room draws furniture; scenes place the mascot on top.
 */
import React from 'react';
import { COLORS, CANVAS, STROKE, strokeProps } from '../../lib/style';
import { WallFloor } from '../../scenes/common';
import { Bed, Nightstand, Lamp, WallClock, FramedPicture, WindowNight, WindowDay, Slippers } from '../props/bedroom';
import { Fridge, Kettle } from '../props/objects';

const std = strokeProps(STROKE.std);

export type RoomName = 'bedroom-night' | 'kitchen' | 'car-interior' | 'floor-plan';

export const BedroomNight: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.wallNight} floor={COLORS.purpleDeep} floorY={820} />
    <g transform="translate(300 100)"><WindowNight /></g>
    <g transform="translate(1560 520)"><FramedPicture /></g>
    <g transform="translate(640 640)"><Bed /></g>
    <g transform="translate(1540 700)"><Nightstand /></g>
    <g transform="translate(1540 470)"><Lamp /></g>
    <g transform="translate(300 880)"><Slippers /></g>
  </g>
);

export const Kitchen: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={COLORS.wood} floorY={820} />
    {/* tiled backsplash band */}
    <rect x={0} y={560} width={CANVAS.width} height={120} fill={COLORS.white} opacity={0.5} />
    {Array.from({ length: 20 }).map((_, i) => (
      <line key={i} x1={i * 100} y1={560} x2={i * 100} y2={680} stroke={COLORS.outline} strokeWidth={2} opacity={0.12} />
    ))}
    {/* counter */}
    <rect x={0} y={660} width={1150} height={180} rx={10} fill={COLORS.greenTeal} {...std} />
    <rect x={0} y={660} width={1150} height={36} rx={8} fill={COLORS.white} {...std} />
    {/* sink */}
    <rect x={120} y={700} width={160} height={90} rx={16} fill={COLORS.sky} {...std} />
    <path d="M 360 700 q 0 -50 40 -50" fill="none" {...strokeProps(STROKE.std)} />
    <g transform="translate(300 180)"><WindowDay /></g>
    <g transform="translate(1680 480)"><Fridge /></g>
    <g transform="translate(900 600)"><Kettle /></g>
    <g transform="translate(560 200)"><WallClock /></g>
  </g>
);

export const CarInterior: React.FC = () => (
  <g>
    {/* night road through windshield */}
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
    {/* windshield */}
    <path d="M 120 120 Q 960 60 1800 120 L 1720 640 Q 960 600 200 640 Z" fill={COLORS.wallNight} {...strokeProps(STROKE.sil)} />
    {/* road */}
    <path d="M 760 640 L 880 300 L 1040 300 L 1160 640 Z" fill={COLORS.purpleDeep} opacity={0.6} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={948} y={330 + i * 90} width={24} height={50} rx={8} fill={COLORS.yellowSoft} opacity={0.8} />
    ))}
    {/* stars */}
    {[[300, 200], [1500, 180], [1650, 320], [250, 360]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={4} fill={COLORS.white} />
    ))}
    {/* dashboard */}
    <path d="M 0 660 Q 960 600 1920 660 L 1920 1080 L 0 1080 Z" fill={COLORS.shirtDark} {...strokeProps(STROKE.sil)} />
    <rect x={120} y={720} width={260} height={110} rx={18} fill={COLORS.outline} opacity={0.5} />
    <circle cx={250} cy={775} r={34} fill={COLORS.sky} opacity={0.6} />
  </g>
);

/** Top-down floor plan (the only allowed "3D"/non-frontal view). */
export const FloorPlan: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.bgCream} />
    {/* outer walls */}
    <rect x={360} y={160} width={1200} height={760} rx={16} fill={COLORS.white} {...strokeProps(STROKE.sil)} />
    {/* room divisions */}
    <line x1={960} y1={160} x2={960} y2={560} {...strokeProps(STROKE.std)} />
    <line x1={360} y1={560} x2={1560} y2={560} {...strokeProps(STROKE.std)} />
    {/* bed (top-down) */}
    <rect x={430} y={230} width={200} height={260} rx={14} fill={COLORS.sky} {...std} />
    <rect x={440} y={240} width={180} height={70} rx={10} fill={COLORS.white} {...std} />
    {/* rug */}
    <ellipse cx={1250} cy={360} rx={180} ry={110} fill={COLORS.pink} opacity={0.5} {...std} />
    {/* table */}
    <circle cx={700} cy={740} r={90} fill={COLORS.wood} {...std} />
    {/* door gaps */}
    <rect x={940} y={430} width={40} height={60} fill={COLORS.bgCream} />
  </g>
);

export const ROOMS: Record<RoomName, React.FC> = {
  'bedroom-night': BedroomNight,
  kitchen: Kitchen,
  'car-interior': CarInterior,
  'floor-plan': FloorPlan,
};

export const ROOM_NAMES = Object.keys(ROOMS) as RoomName[];
