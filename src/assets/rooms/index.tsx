/**
 * rooms — full-bleed flat frontal sets (1920x1080). Composed from props +
 * WallFloor. Physical logic (A7): furniture grounded, lamp casts a flat light
 * pool, rug under the bed, window scene lives only inside the window.
 */
import React from 'react';
import { COLORS, CANVAS, STROKE, strokeProps, shade } from '../../lib/style';
import { WallFloor } from '../../scenes/common';
import { Bed, Nightstand, Lamp, WallClock, FramedPicture, WindowNight, WindowDay, Slippers } from '../props/bedroom';
import { Fridge, Kettle } from '../props/objects';

const std = strokeProps(STROKE.lg);
const xl = strokeProps(STROKE.xl);

export type RoomName = 'bedroom-night' | 'kitchen' | 'car-interior' | 'floor-plan';

export const BedroomNight: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.wallNight} floor={COLORS.purpleDeep} floorY={820} />
    {/* rug directly under the bed only (no stray blob to the right) */}
    <ellipse cx={660} cy={900} rx={360} ry={64} fill={shade(COLORS.wallNight, 0.1)} />
    {/* window on the wall (moon/stars live inside it) */}
    <g transform="translate(320 300)"><WindowNight /></g>
    {/* picture hangs on the wall */}
    <g transform="translate(1150 280)"><FramedPicture /></g>
    {/* bed grounded on the floor */}
    <g transform="translate(660 660)"><Bed /></g>
    {/* nightstand with a lamp BESIDE the alarm-clock spot; both grounded */}
    <g transform="translate(1560 760)"><Nightstand /></g>
    {/* lamp light pool + contact shadows on the surface */}
    <ellipse cx={1560} cy={640} rx={130} ry={26} fill={COLORS.yellowSoft} opacity={0.3} />
    <ellipse cx={1512} cy={648} rx={48} ry={13} fill={COLORS.outline} opacity={0.14} />
    <ellipse cx={1626} cy={648} rx={44} ry={12} fill={COLORS.outline} opacity={0.14} />
    <g transform="translate(1508 548)"><Lamp /></g>
    <g transform="translate(360 900)"><Slippers /></g>
  </g>
);

export const Kitchen: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={COLORS.wood} floorY={820} />
    {/* tiled backsplash band — texture via flat fills, no strokes */}
    <rect x={0} y={560} width={CANVAS.width} height={120} fill={COLORS.white} opacity={0.5} />
    {Array.from({ length: 19 }).map((_, i) => (
      <rect key={i} x={i * 100 + 98} y={560} width={4} height={120} fill={shade(COLORS.lavender, 0.12)} opacity={0.5} />
    ))}
    {/* counter */}
    <rect x={0} y={660} width={1150} height={180} rx={10} fill={COLORS.greenTeal} {...std} />
    <rect x={0} y={660} width={1150} height={36} rx={8} fill={COLORS.white} {...std} />
    <rect x={0} y={700} width={1150} height={60} fill={shade(COLORS.greenTeal, 0.14)} opacity={0.5} />
    {/* sink */}
    <rect x={120} y={700} width={160} height={90} rx={16} fill={COLORS.sky} {...std} />
    <path d="M 360 700 q 0 -50 40 -50" fill="none" {...std} />
    <g transform="translate(320 300)"><WindowDay /></g>
    <g transform="translate(1680 500)"><Fridge /></g>
    {/* kettle sits on the counter */}
    <g transform="translate(900 598)"><Kettle /></g>
    <g transform="translate(560 220)"><WallClock /></g>
  </g>
);

export const CarInterior: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
    {/* windshield */}
    <path d="M 120 120 Q 960 60 1800 120 L 1720 640 Q 960 600 200 640 Z" fill={COLORS.wallNight} {...xl} />
    {/* road */}
    <path d="M 760 640 L 880 300 L 1040 300 L 1160 640 Z" fill={shade(COLORS.purpleDeep, 0.2)} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={948} y={330 + i * 90} width={24} height={50} rx={8} fill={COLORS.yellowSoft} opacity={0.85} />
    ))}
    {[[300, 200], [1500, 180], [1650, 320], [250, 360]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={5} fill={COLORS.white} />
    ))}
    {/* dashboard */}
    <path d="M 0 660 Q 960 600 1920 660 L 1920 1080 L 0 1080 Z" fill={COLORS.shirtDark} {...xl} />
    <rect x={120} y={720} width={260} height={110} rx={18} fill={COLORS.shirtDarker} />
    <circle cx={250} cy={775} r={34} fill={COLORS.sky} opacity={0.6} />
  </g>
);

/** Top-down floor plan (the only allowed non-frontal view). */
export const FloorPlan: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.bgCream} />
    <rect x={360} y={160} width={1200} height={760} rx={16} fill={COLORS.white} {...xl} />
    <line x1={960} y1={160} x2={960} y2={560} {...std} />
    <line x1={360} y1={560} x2={1560} y2={560} {...std} />
    <rect x={430} y={230} width={200} height={260} rx={14} fill={COLORS.sky} {...std} />
    <rect x={440} y={240} width={180} height={70} rx={10} fill={COLORS.white} {...std} />
    <ellipse cx={1250} cy={360} rx={180} ry={110} fill={COLORS.pink} opacity={0.5} {...std} />
    <circle cx={700} cy={740} r={90} fill={COLORS.wood} {...std} />
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
