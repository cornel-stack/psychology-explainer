/**
 * rooms — full-bleed flat frontal sets (1920x1080). Composed from props +
 * WallFloor. Physical logic (A7): furniture grounded, lamp casts a flat light
 * pool, rug under the bed, window scene lives only inside the window.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps, shade } from '../../lib/style';
import { WallFloor } from '../../scenes/common';
import { Bed, Nightstand, Lamp, WallClock, FramedPicture, WindowNight, WindowDay, Slippers } from '../props/bedroom';
import { Fridge, Kettle } from '../props/objects';

const std = strokeProps(STROKE.lg);
const xl = strokeProps(STROKE.xl);
const sm = strokeProps(STROKE.sm);

export type RoomName =
  | 'bedroom-night'
  | 'kitchen'
  | 'car-interior'
  | 'floor-plan'
  | 'balcony-night'
  | 'train-interior'
  | 'living-room'
  | 'stadium-crowd'
  | 'empty-hall';

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

/** Night balcony: city skyline + stars behind, a railing across the foreground. */
export const BalconyNight: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
    <rect x={0} y={0} width={CANVAS.width} height={620} fill={COLORS.wallNight} />
    {[[180, 120], [520, 90], [860, 160], [1240, 110], [1620, 150], [1780, 90], [360, 260]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={5} fill={COLORS.white} />
    ))}
    {/* city skyline with lit windows */}
    {[[80, 420, 180, 240], [280, 360, 150, 300], [450, 300, 200, 360], [680, 400, 160, 260], [860, 340, 220, 320], [1100, 300, 170, 360], [1300, 380, 190, 280], [1520, 320, 200, 340], [1740, 400, 160, 260]].map(([x, y, w, h], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} fill={shade(COLORS.purpleDeep, 0.15)} />
        {Array.from({ length: 6 }).map((_, k) => (
          <rect key={k} x={x + 20 + (k % 2) * 60} y={y + 24 + Math.floor(k / 2) * 60} width={28} height={34} rx={4} fill={(i + k) % 3 === 0 ? COLORS.yellow : shade(COLORS.yellowSoft, 0.1)} opacity={0.85} />
        ))}
      </g>
    ))}
    {/* balcony floor */}
    <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={shade(COLORS.wallNight, 0.3)} />
    {/* railing across the foreground */}
    <rect x={0} y={744} width={CANVAS.width} height={20} rx={10} fill={COLORS.woodDark} {...std} />
    <rect x={0} y={880} width={CANVAS.width} height={18} rx={9} fill={COLORS.woodDark} {...std} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={40 + i * 80} y={760} width={16} height={120} rx={6} fill={COLORS.wood} {...sm} />
    ))}
  </g>
);

/** Train car: night windows along the back, a bench, overhead handles. */
export const TrainInterior: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={840} stripe={false} />
    {/* window band */}
    <rect x={0} y={150} width={CANVAS.width} height={360} fill={shade(COLORS.greenTeal, 0.18)} />
    {[120, 560, 1000, 1440].map((x, i) => (
      <g key={i}>
        <rect x={x} y={180} width={360} height={300} rx={24} fill={COLORS.purpleDeep} {...xl} />
        <rect x={x + 20} y={200} width={320} height={260} rx={12} fill={COLORS.wallNight} />
        {[40, 140, 240].map((sx, k) => (
          <circle key={k} cx={x + 40 + sx} cy={240 + (k % 2) * 120} r={4} fill={COLORS.white} opacity={0.8} />
        ))}
        <rect x={x + 120} y={200} width={60} height={260} fill={COLORS.white} opacity={0.08} />
      </g>
    ))}
    {/* overhead rail + handles */}
    <rect x={0} y={120} width={CANVAS.width} height={14} rx={7} fill={COLORS.woodDark} {...std} />
    {[260, 620, 980, 1340, 1700].map((x, i) => (
      <g key={i}>
        <line x1={x} y1={128} x2={x} y2={210} {...sm} />
        <circle cx={x} cy={228} r={22} fill="none" {...std} />
      </g>
    ))}
    {/* bench seat */}
    <rect x={0} y={700} width={CANVAS.width} height={150} rx={20} fill={COLORS.sky} {...xl} />
    <rect x={0} y={700} width={CANVAS.width} height={44} rx={16} fill={shade(COLORS.sky, 0.16)} />
  </g>
);

/** Cozy living room: wallpaper + wainscot, couch, rug, picture, plant. */
export const LivingRoom: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.pink} floor={COLORS.wood} floorY={800} stripe={false} />
    {/* wallpaper stripes on the upper wall (breaks up the flat pink) */}
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.pink, 0.08)} />
    ))}
    {/* wainscot panel along the lower wall */}
    <rect x={0} y={560} width={CANVAS.width} height={240} fill={COLORS.bgCream} />
    <rect x={0} y={560} width={CANVAS.width} height={16} fill={shade(COLORS.wood, 0.1)} />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={70 + i * 190} y={596} width={150} height={168} rx={10} fill="none" stroke={shade(COLORS.bgCream, 0.14)} strokeWidth={STROKE.sm} />
    ))}
    {/* rug */}
    <ellipse cx={760} cy={960} rx={620} ry={110} fill={shade(COLORS.wood, 0.14)} />
    {/* window with day sky */}
    <g transform="translate(330 300)"><WindowDay /></g>
    {/* framed picture */}
    <g transform="translate(1150 300)"><FramedPicture /></g>
    {/* couch */}
    <g>
      <rect x={300} y={620} width={920} height={240} rx={40} fill={COLORS.lavender} {...xl} />
      <rect x={300} y={560} width={920} height={160} rx={40} fill={COLORS.lavender} {...xl} />
      <rect x={300} y={560} width={920} height={60} rx={30} fill={shade(COLORS.lavender, 0.14)} />
      <rect x={300} y={600} width={120} height={260} rx={36} fill={shade(COLORS.lavender, 0.1)} {...std} />
      <rect x={1100} y={600} width={120} height={260} rx={36} fill={shade(COLORS.lavender, 0.1)} {...std} />
      {/* cushions */}
      <rect x={470} y={590} width={150} height={130} rx={24} fill={COLORS.yellowSoft} {...std} />
      <rect x={900} y={590} width={150} height={130} rx={24} fill={COLORS.sky} {...std} />
    </g>
    {/* potted plant */}
    <g transform="translate(1640 640)">
      <path d="M 0 -20 Q -60 -120 -20 -180 Q 10 -120 0 -20 Z" fill={COLORS.greenLeaf} {...std} />
      <path d="M 0 -20 Q 60 -140 24 -200 Q -6 -120 0 -20 Z" fill={COLORS.greenLeaf} {...std} />
      <path d="M -70 0 L 70 0 L 50 120 L -50 120 Z" fill={COLORS.wood} {...xl} />
    </g>
  </g>
);

/** Stadium: tiered crowd of heads + field glow + stadium-light sunburst. */
export const StadiumCrowd: React.FC = () => {
  const crowdColors = [COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.greenLeaf, COLORS.lavender, COLORS.red];
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      {/* stadium-light sunburst */}
      <g transform="translate(960 180)" opacity={0.18}>
        {Array.from({ length: 16 }).map((_, i) => {
          const a0 = (i / 16) * Math.PI * 2;
          const a1 = ((i + 0.5) / 16) * Math.PI * 2;
          return <path key={i} d={`M 0 0 L ${Math.cos(a0) * 1400} ${Math.sin(a0) * 1400} L ${Math.cos(a1) * 1400} ${Math.sin(a1) * 1400} Z`} fill={COLORS.white} />;
        })}
      </g>
      {/* tiered crowd */}
      {Array.from({ length: 6 }).map((_, row) => (
        <g key={row}>
          {Array.from({ length: 26 }).map((_, c) => {
            const x = 40 + c * 74 + (row % 2) * 36;
            const y = 180 + row * 86;
            return <circle key={c} cx={x} cy={y} r={26} fill={crowdColors[(row * 3 + c) % crowdColors.length]} {...sm} />;
          })}
        </g>
      ))}
      {/* field */}
      <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={COLORS.greenLeaf} />
      <rect x={0} y={760} width={CANVAS.width} height={36} fill={shade(COLORS.greenLeaf, 0.18)} />
      {[300, 960, 1620].map((x, i) => (
        <rect key={i} x={x - 4} y={796} width={8} height={240} fill={COLORS.white} opacity={0.4} />
      ))}
    </g>
  );
};

/** Empty school hallway at night: lockers, a flickering light, emptiness. */
export const EmptyHall: React.FC = () => {
  const f = useCurrentFrame();
  const flick = Math.sin(f / 3) > 0.7 ? 0.5 : 0.22;
  return (
    <g>
      <WallFloor wall={shade(COLORS.wallNight, 0.2)} floor={shade(COLORS.purpleDeep, 0.1)} floorY={820} stripe={false} />
      {/* ceiling light pool */}
      <ellipse cx={960} cy={120} rx={420} ry={90} fill={COLORS.yellowSoft} opacity={flick} />
      <rect x={820} y={70} width={280} height={26} rx={10} fill={COLORS.whiteShade} opacity={0.5} />
      {/* lockers along the wall */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 60 + i * 116;
        return (
          <g key={i}>
            <rect x={x} y={360} width={100} height={420} rx={10} fill={shade(COLORS.sky, 0.2)} {...std} />
            <rect x={x} y={360} width={100} height={40} rx={8} fill={shade(COLORS.sky, 0.3)} />
            <circle cx={x + 50} cy={560} r={8} fill={COLORS.outline} />
            <rect x={x + 30} y={420} width={40} height={10} rx={4} fill={COLORS.outline} opacity={0.3} />
          </g>
        );
      })}
      {/* floor reflection line */}
      <rect x={0} y={880} width={CANVAS.width} height={6} fill={COLORS.white} opacity={0.06} />
    </g>
  );
};

export const ROOMS: Record<RoomName, React.FC> = {
  'bedroom-night': BedroomNight,
  kitchen: Kitchen,
  'car-interior': CarInterior,
  'floor-plan': FloorPlan,
  'balcony-night': BalconyNight,
  'train-interior': TrainInterior,
  'living-room': LivingRoom,
  'stadium-crowd': StadiumCrowd,
  'empty-hall': EmptyHall,
};

export const ROOM_NAMES = Object.keys(ROOMS) as RoomName[];
