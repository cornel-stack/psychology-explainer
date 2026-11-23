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
import { Diploma } from '../props/defenses';

const std = strokeProps(STROKE.lg);
const xl = strokeProps(STROKE.xl);
const sm = strokeProps(STROKE.sm);
const lg = strokeProps(STROKE.lg);

export type RoomName =
  | 'bedroom-night'
  | 'kitchen'
  | 'car-interior'
  | 'floor-plan'
  | 'balcony-night'
  | 'train-interior'
  | 'living-room'
  | 'stadium-crowd'
  | 'empty-hall'
  | 'store-aisle'
  | 'casino'
  | 'office'
  | 'therapist-office'
  | 'basement'
  | 'gym'
  | 'art-studio'
  | 'theater-stage'
  | 'nursery'
  | 'date-restaurant'
  | 'park-bench'
  | 'classroom'
  | 'science-lab'
  | 'digital-wilderness'
  | 'reading-nook';

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

/** Supermarket aisle: shelving with products + price tags (anchoring, framing). */
export const StoreAisle: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.sky} floor={COLORS.whiteShade} floorY={860} stripe={false} />
    <rect x={0} y={0} width={CANVAS.width} height={120} fill={shade(COLORS.sky, 0.12)} />
    {/* floor tiles */}
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={i * 200} y={862} width={2} height={CANVAS.height - 862} fill={shade(COLORS.whiteShade, 0.18)} />
    ))}
    {/* two shelf units */}
    {[120, 1360].map((sx, s) => (
      <g key={s} transform={`translate(${sx} 0)`}>
        <rect x={0} y={220} width={440} height={640} rx={10} fill={COLORS.woodDark} {...xl} />
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect x={14} y={260 + row * 190} width={412} height={170} rx={8} fill={shade(COLORS.wood, 0.1)} />
            {Array.from({ length: 5 }).map((_, c) => {
              const colors = [COLORS.red, COLORS.yellow, COLORS.greenLeaf, COLORS.pink, COLORS.lavender];
              return <rect key={c} x={28 + c * 80} y={300 + row * 190} width={60} height={120} rx={8} fill={colors[(row + c + s) % 5]} {...sm} />;
            })}
            {/* price label strip */}
            <rect x={14} y={408 + row * 190} width={412} height={22} fill={COLORS.white} {...strokeProps(STROKE.sm)} />
          </g>
        ))}
      </g>
    ))}
  </g>
);

/** Casino: dark room, neon arch, slot machines in the back, patterned carpet. */
export const Casino: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
    <rect x={0} y={0} width={CANVAS.width} height={720} fill={COLORS.wallNight} />
    {/* neon arch */}
    <path d="M 360 300 Q 960 60 1560 300" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.xl} />
    <path d="M 360 340 Q 960 110 1560 340" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} />
    {[[500, 220], [960, 110], [1420, 220]].map(([x, y], i) => (
      <text key={i} x={x} y={y} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={60} fill={COLORS.yellow} stroke={COLORS.outline} strokeWidth={STROKE.sm}>
        {['7', '$', '7'][i]}
      </text>
    ))}
    {/* slot machines silhouettes in the back */}
    {[180, 440, 1480, 1740].map((x, i) => (
      <g key={i} transform={`translate(${x} 520)`}>
        <rect x={-70} y={-120} width={140} height={240} rx={18} fill={shade(COLORS.red, 0.2)} {...lg} />
        <rect x={-50} y={-90} width={100} height={60} rx={8} fill={COLORS.yellowDark} />
      </g>
    ))}
    {/* carpet */}
    <rect x={0} y={720} width={CANVAS.width} height={CANVAS.height - 720} fill={COLORS.redDark} />
    {Array.from({ length: 16 }).map((_, i) => (
      <path key={i} d={`M ${i * 130} 760 l 40 40 -40 40 -40 -40 z`} fill={shade(COLORS.redDark, 0.18)} opacity={0.6} />
    ))}
    {/* felt table */}
    <ellipse cx={960} cy={940} rx={560} ry={120} fill={COLORS.greenDark} {...xl} />
    <ellipse cx={960} cy={928} rx={520} ry={100} fill={COLORS.greenLeaf} />
  </g>
);

/** Office: desk, chair, monitor, window, plant (interview, work, survivorship). */
export const Office: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={820} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={shade(COLORS.greenTeal, 0.08)} />
    {/* window */}
    <g transform="translate(330 300)"><WindowDay /></g>
    {/* wall clock */}
    <g transform="translate(1150 260)"><WallClock /></g>
    {/* desk */}
    <rect x={560} y={660} width={800} height={60} rx={10} fill={COLORS.wood} {...xl} />
    <rect x={590} y={720} width={40} height={160} fill={COLORS.woodDark} {...lg} />
    <rect x={1290} y={720} width={40} height={160} fill={COLORS.woodDark} {...lg} />
    {/* monitor */}
    <rect x={820} y={500} width={280} height={180} rx={14} fill={COLORS.shirtDark} {...xl} />
    <rect x={838} y={518} width={244} height={132} rx={6} fill={COLORS.sky} />
    <rect x={940} y={680} width={40} height={30} fill={COLORS.shirtDark} />
    <rect x={900} y={706} width={120} height={16} rx={6} fill={COLORS.shirtDarker} />
    {/* coffee + papers */}
    <rect x={1160} y={636} width={60} height={26} rx={6} fill={COLORS.white} {...sm} />
    <rect x={1160} y={610} width={54} height={50} rx={10} fill={COLORS.red} {...lg} />
    {/* plant */}
    <g transform="translate(1660 640)">
      <path d="M 0 -20 Q -60 -120 -20 -180 Q 10 -120 0 -20 Z" fill={COLORS.greenLeaf} {...lg} />
      <path d="M 0 -20 Q 60 -140 24 -200 Q -6 -120 0 -20 Z" fill={COLORS.greenLeaf} {...lg} />
      <path d="M -60 0 L 60 0 L 44 110 L -44 110 Z" fill={COLORS.wood} {...xl} />
    </g>
  </g>
);

/** Therapist's office: chaise couch, armchair, rug, diploma, bookshelf, plant. */
export const TherapistOffice: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={820} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={shade(COLORS.greenTeal, 0.08)} />
    {/* rug */}
    <ellipse cx={820} cy={940} rx={640} ry={120} fill={shade(COLORS.wood, 0.14)} />
    <ellipse cx={820} cy={940} rx={540} ry={92} fill={COLORS.pink} opacity={0.3} />
    {/* diploma + framed picture on wall */}
    <g transform="translate(300 280)"><Diploma /></g>
    <g transform="translate(560 300)"><FramedPicture /></g>
    {/* bookshelf */}
    <g transform="translate(1680 560)">
      <rect x={-120} y={-260} width={240} height={420} rx={10} fill={COLORS.woodDark} {...xl} />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x={-104} y={-230 + r * 140} width={208} height={120} fill={shade(COLORS.wood, 0.1)} />
          {Array.from({ length: 6 }).map((_, c) => {
            const cols = [COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.lavender, COLORS.pink];
            return <rect key={c} x={-96 + c * 34} y={-224 + r * 140} width={26} height={108} rx={4} fill={cols[(r + c) % 6]} {...sm} />;
          })}
        </g>
      ))}
    </g>
    {/* chaise couch */}
    <g>
      <rect x={560} y={660} width={620} height={150} rx={30} fill={COLORS.lavender} {...xl} />
      <path d="M 560 660 Q 540 560 600 560 L 720 560 Q 760 560 760 660 Z" fill={COLORS.lavender} {...xl} />
      <rect x={560} y={760} width={620} height={46} rx={16} fill={shade(COLORS.lavender, 0.14)} />
      <rect x={610} y={600} width={120} height={70} rx={20} fill={COLORS.yellowSoft} {...std} />
    </g>
    {/* small plant */}
    <g transform="translate(220 700)">
      <path d="M 0 -10 Q -40 -80 -12 -120 Q 6 -80 0 -10 Z" fill={COLORS.greenLeaf} {...lg} />
      <path d="M 0 -10 Q 40 -90 16 -130 Q -4 -80 0 -10 Z" fill={COLORS.greenLeaf} {...lg} />
      <path d="M -44 0 L 44 0 L 32 90 L -32 90 Z" fill={COLORS.red} {...xl} />
    </g>
  </g>
);

/** Dark basement: concrete, shelves of boxes, bare bulb, a locked steel door. */
export const Basement: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.5 + 0.1 * Math.sin(f / 4);
  return (
    <g>
      <WallFloor wall={shade(COLORS.purpleDeep, 0.1)} floor={shade(COLORS.purpleDeep, 0.25)} floorY={840} stripe={false} />
      {/* concrete block lines */}
      {Array.from({ length: 8 }).map((_, r) => (
        <rect key={r} x={0} y={100 + r * 90} width={CANVAS.width} height={2} fill={COLORS.wallNight} opacity={0.3} />
      ))}
      {/* bare bulb */}
      <line x1={760} y1={0} x2={760} y2={120} {...sm} />
      <circle cx={760} cy={140} r={34} fill={COLORS.yellowSoft} opacity={flick + 0.3} />
      <ellipse cx={760} cy={420} rx={360} ry={300} fill={COLORS.yellowSoft} opacity={flick * 0.14} />
      {/* steel vault door */}
      <g transform="translate(1560 540)">
        <rect x={-150} y={-280} width={300} height={580} rx={16} fill={COLORS.greenTeal} {...xl} />
        <circle cx={0} cy={0} r={90} fill={shade(COLORS.greenTeal, 0.16)} {...lg} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-12} y={-80} width={24} height={60} rx={8} fill={COLORS.shirtDark} transform={`rotate(${i * 45})`} />
        ))}
        <circle cx={0} cy={0} r={22} fill={COLORS.shirtDark} />
      </g>
      {/* shelf of boxes */}
      <g transform="translate(300 640)">
        <rect x={-180} y={-40} width={360} height={24} fill={COLORS.woodDark} {...lg} />
        <rect x={-180} y={160} width={360} height={24} fill={COLORS.woodDark} {...lg} />
        {[[-130, -10], [-40, -20], [70, -14]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={90} height={70} rx={8} fill={COLORS.wood} {...lg} />
        ))}
      </g>
    </g>
  );
};

/** Gym: mirror wall, weight rack, bench, rubber floor. */
export const Gym: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.sky} floor={COLORS.shirtDark} floorY={820} stripe={false} />
    {/* mirror panels */}
    {[180, 560].map((x, i) => (
      <rect key={i} x={x} y={120} width={340} height={520} rx={10} fill={shade(COLORS.sky, 0.12)} {...lg} />
    ))}
    {/* weight rack */}
    <g transform="translate(1560 460)">
      <rect x={-180} y={-60} width={360} height={30} rx={8} fill={COLORS.shirtDarker} {...lg} />
      <rect x={-180} y={320} width={360} height={30} rx={8} fill={COLORS.shirtDarker} {...lg} />
      <rect x={-180} y={-60} width={24} height={410} fill={COLORS.shirtDark} />
      <rect x={156} y={-60} width={24} height={410} fill={COLORS.shirtDark} />
      {[0, 1, 2].map((r) => (
        <g key={r} transform={`translate(0 ${20 + r * 110})`}>
          <rect x={-120} y={-14} width={240} height={28} rx={10} fill={COLORS.shirtDark} />
          <circle cx={-120} cy={0} r={34} fill={COLORS.red} {...lg} />
          <circle cx={120} cy={0} r={34} fill={COLORS.red} {...lg} />
        </g>
      ))}
    </g>
    {/* bench */}
    <rect x={620} y={740} width={420} height={40} rx={12} fill={COLORS.red} {...xl} />
    <rect x={650} y={780} width={40} height={90} fill={COLORS.shirtDark} {...lg} />
    <rect x={970} y={780} width={40} height={90} fill={COLORS.shirtDark} {...lg} />
    {/* floor mat lines */}
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 170} y={820} width={3} height={CANVAS.height - 820} fill={COLORS.shirtDarker} />
    ))}
  </g>
);

/** Art studio: big window light, canvases, paint splatters. */
export const ArtStudio: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCream} floor={COLORS.wood} floorY={820} stripe={false} />
    {/* wainscot band + a shelf of paint jars break up the plain wall */}
    <rect x={0} y={600} width={CANVAS.width} height={220} fill={shade(COLORS.bgCream, 0.08)} />
    <rect x={0} y={600} width={CANVAS.width} height={14} fill={shade(COLORS.wood, 0.1)} />
    <rect x={0} y={420} width={CANVAS.width} height={16} rx={6} fill={COLORS.woodDark} />
    {([[80, COLORS.red], [180, COLORS.sky], [280, COLORS.yellow], [1500, COLORS.greenLeaf], [1600, COLORS.pink], [1700, COLORS.lavender], [1800, COLORS.red]] as [number, string][]).map(([x, c], i) => (
      <rect key={i} x={x} y={360} width={56} height={60} rx={8} fill={c} {...sm} />
    ))}
    {/* big window with light */}
    <rect x={120} y={120} width={520} height={520} rx={18} fill={COLORS.sky} {...xl} />
    <line x1={380} y1={120} x2={380} y2={640} {...std} />
    <line x1={120} y1={380} x2={640} y2={380} {...std} />
    <circle cx={500} cy={260} r={44} fill={COLORS.yellow} {...std} />
    {/* paint splatters on wall */}
    {([[1000, 240, COLORS.red], [1120, 360, COLORS.greenLeaf], [1300, 220, COLORS.sky], [1420, 380, COLORS.yellow], [1200, 480, COLORS.pink]] as [number, number, string][]).map(([x, y, c], i) => (
      <circle key={i} cx={x} cy={y} r={26 + (i % 3) * 8} fill={c} opacity={0.8} />
    ))}
    {/* canvases leaning */}
    <g transform="translate(1660 640)">
      <rect x={-90} y={-220} width={180} height={240} rx={8} fill={COLORS.white} {...xl} transform="rotate(6)" />
      <rect x={-110} y={-200} width={180} height={240} rx={8} fill={COLORS.white} {...xl} transform="rotate(-4)" />
      <path d="M -96 -60 L -40 -140 L 10 -90 L 70 -170" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
    {/* paint tubes on floor */}
    {([[760, 880, COLORS.red], [860, 900, COLORS.sky], [960, 885, COLORS.yellow]] as [number, number, string][]).map(([x, y, c], i) => (
      <rect key={i} x={x} y={y} width={90} height={34} rx={16} fill={c} {...sm} transform={`rotate(${i * 10 - 10} ${x} ${y})`} />
    ))}
  </g>
);

/** Theater stage: red curtains, spotlight, wooden boards (humor, masks). */
export const TheaterStage: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
    {/* back curtain */}
    <rect x={0} y={0} width={CANVAS.width} height={760} fill={COLORS.redDark} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={760} fill={COLORS.red} opacity={0.5} />
    ))}
    {/* top valance */}
    <path d="M 0 0 L 1920 0 L 1920 120 Q 1820 190 1720 120 Q 1620 190 1520 120 Q 1420 190 1320 120 Q 1220 190 1120 120 Q 1020 190 920 120 Q 820 190 720 120 Q 620 190 520 120 Q 420 190 320 120 Q 220 190 120 120 Q 40 160 0 120 Z" fill={COLORS.redDark} {...xl} />
    {/* side curtains */}
    <path d="M 0 0 L 320 0 Q 260 400 300 760 Q 160 700 0 760 Z" fill={COLORS.red} {...xl} />
    <path d="M 1920 0 L 1600 0 Q 1660 400 1620 760 Q 1760 700 1920 760 Z" fill={COLORS.red} {...xl} />
    {/* spotlight */}
    <path d="M 760 0 L 520 760 L 1400 760 L 1160 0 Z" fill={COLORS.yellowSoft} opacity={0.14} />
    {/* stage floor boards */}
    <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={COLORS.wood} />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 170} y={760} width={3} height={CANVAS.height - 760} fill={shade(COLORS.wood, 0.18)} />
    ))}
    <rect x={0} y={760} width={CANVAS.width} height={14} fill={COLORS.yellow} />
  </g>
);

/** Nursery: pastel wall, alphabet frieze, crib with a mobile, toy cubbies, rug.
 *  The set for the Strange Situation (where attachment first forms). */
export const Nursery: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 18) * 4;
  return (
    <g>
      <WallFloor wall={COLORS.lavender} floor={COLORS.wood} floorY={820} stripe={false} />
      {/* polka-dot upper wall */}
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 13 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={80 + c * 150 + (r % 2) * 75} cy={80 + r * 78} r={12} fill={shade(COLORS.lavender, 0.12)} />
        )),
      )}
      {/* alphabet frieze band */}
      <rect x={0} y={470} width={CANVAS.width} height={80} fill={COLORS.bgCream} />
      <rect x={0} y={470} width={CANVAS.width} height={12} fill={shade(COLORS.wood, 0.1)} />
      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].map((ch, i) => (
        <text key={i} x={70 + i * 135} y={532} fontFamily="Baloo 2" fontWeight={800} fontSize={44} fill={[COLORS.red, COLORS.sky, COLORS.greenLeaf, COLORS.yellowDark][i % 4]}>
          {ch}
        </text>
      ))}
      {/* window with day sky */}
      <g transform="translate(300 200)"><WindowDay /></g>
      {/* rug */}
      <ellipse cx={820} cy={960} rx={620} ry={110} fill={COLORS.pink} opacity={0.35} />
      {/* crib with bars + mobile */}
      <g transform="translate(1480 600)">
        {/* mobile */}
        <g transform={`rotate(${sway})`} style={{ transformOrigin: '0px -200px' }}>
          <line x1={0} y1={-260} x2={0} y2={-200} {...sm} />
          <path d="M -90 -200 Q 0 -230 90 -200" fill="none" {...std} />
          {[-90, 0, 90].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={-200} x2={x} y2={-160} {...sm} />
              <circle cx={x} cy={-146} r={22} fill={[COLORS.yellow, COLORS.pink, COLORS.sky][i]} {...sm} />
            </g>
          ))}
        </g>
        <rect x={-180} y={-60} width={360} height={240} rx={18} fill={COLORS.sky} {...xl} />
        <rect x={-180} y={-60} width={360} height={40} rx={14} fill={shade(COLORS.sky, 0.14)} />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={-150 + i * 38} y1={-20} x2={-150 + i * 38} y2={150} {...sm} />
        ))}
        <rect x={-180} y={150} width={360} height={30} rx={10} fill={COLORS.woodDark} {...lg} />
      </g>
      {/* toy cubby shelf */}
      <g transform="translate(300 700)">
        <rect x={-150} y={-120} width={300} height={220} rx={12} fill={COLORS.woodDark} {...xl} />
        {[[-74, -58, COLORS.red], [74, -58, COLORS.greenLeaf], [-74, 44, COLORS.yellow], [74, 44, COLORS.pink]].map(([x, y, c], i) => (
          <g key={i}>
            <rect x={(x as number) - 60} y={(y as number) - 44} width={120} height={92} rx={8} fill={shade(COLORS.wood, 0.1)} />
            <circle cx={x as number} cy={y as number} r={30} fill={c as string} {...sm} />
          </g>
        ))}
      </g>
    </g>
  );
};

/** A warm candle-lit restaurant: pendant lamps, booth, a set table, night window.
 *  Where adult attachment plays out — the date. */
export const DateRestaurant: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.8 + 0.2 * Math.sin(f / 5);
  return (
    <g>
      <WallFloor wall={COLORS.wallNight} floor={COLORS.woodDark} floorY={860} stripe={false} />
      {/* wood-panel wainscot */}
      <rect x={0} y={560} width={CANVAS.width} height={300} fill={shade(COLORS.wallNight, 0.18)} />
      <rect x={0} y={560} width={CANVAS.width} height={16} fill={COLORS.woodDark} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={40 + i * 160} y={596} width={120} height={230} rx={8} fill="none" stroke={shade(COLORS.wallNight, 0.28)} strokeWidth={STROKE.sm} />
      ))}
      {/* night-city window on the left */}
      <g transform="translate(300 260)"><WindowNight /></g>
      {/* framed picture on the right */}
      <g transform="translate(1500 300)"><FramedPicture /></g>
      {/* two pendant lamps with warm glow pools */}
      {[680, 1240].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={0} x2={x} y2={150} {...sm} />
          <path d={`M ${x - 54} 220 Q ${x} 130 ${x + 54} 220 Z`} fill={COLORS.shirtDark} {...lg} />
          <ellipse cx={x} cy={226} rx={48} ry={14} fill={COLORS.yellow} opacity={flick} />
          <ellipse cx={x} cy={560} rx={190} ry={260} fill={COLORS.yellowSoft} opacity={0.12 * flick} />
        </g>
      ))}
      {/* set table in the center */}
      <g transform="translate(960 760)">
        <ellipse cx={0} cy={150} rx={360} ry={70} fill={shade(COLORS.woodDark, 0.2)} opacity={0.5} />
        <rect x={-300} y={40} width={600} height={120} rx={12} fill={COLORS.white} {...xl} />
        <path d="M -300 90 Q 0 130 300 90 L 300 160 Q 0 200 -300 160 Z" fill={shade(COLORS.white, 0.08)} />
        {/* candle */}
        <rect x={-14} y={-30} width={28} height={70} rx={8} fill={COLORS.pink} {...lg} />
        <path d="M 0 -30 q -16 -26 0 -46 q 16 20 0 46 Z" fill={COLORS.yellow} {...sm} />
        <ellipse cx={0} cy={-28} rx={46} ry={14} fill={COLORS.yellowSoft} opacity={0.5} />
        {/* two plates */}
        <ellipse cx={-180} cy={74} rx={56} ry={20} fill={COLORS.whiteShade} {...sm} />
        <ellipse cx={180} cy={74} rx={56} ry={20} fill={COLORS.whiteShade} {...sm} />
        {/* small vase */}
        <path d="M 150 36 q 16 -40 44 0 Z" fill={COLORS.sky} {...sm} />
      </g>
    </g>
  );
};

/** A sunny park: sky, distant hills, a tree, a path and an empty bench, a lamppost.
 *  A calm outdoor set for the secure / earned-secure beats. */
export const ParkBench: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.sky} />
    {/* sun + clouds */}
    <circle cx={1560} cy={220} r={90} fill={COLORS.yellow} {...lg} />
    {[[320, 200], [760, 150], [1180, 260]].map(([x, y], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={120} ry={46} fill={COLORS.white} opacity={0.9} />
        <ellipse cx={x - 60} cy={y + 14} rx={70} ry={38} fill={COLORS.white} opacity={0.9} />
        <ellipse cx={x + 70} cy={y + 16} rx={74} ry={36} fill={COLORS.white} opacity={0.9} />
      </g>
    ))}
    {/* distant hills */}
    <path d="M 0 760 Q 480 620 960 740 Q 1440 640 1920 760 L 1920 1080 L 0 1080 Z" fill={COLORS.greenDark} />
    <rect x={0} y={800} width={CANVAS.width} height={CANVAS.height - 800} fill={COLORS.greenLeaf} />
    {/* winding path */}
    <path d="M 760 1080 Q 900 900 960 840 Q 1020 900 1160 1080 Z" fill={COLORS.wood} />
    {/* tree on the left */}
    <g transform="translate(300 640)">
      <rect x={-34} y={0} width={68} height={300} rx={18} fill={COLORS.woodDark} {...xl} />
      <circle cx={-20} cy={-70} r={150} fill={COLORS.greenLeaf} {...xl} />
      <circle cx={120} cy={-20} r={110} fill={COLORS.greenLeaf} {...xl} />
      <circle cx={30} cy={-170} r={120} fill={COLORS.greenLeaf} {...xl} />
      <circle cx={0} cy={-80} r={120} fill={shade(COLORS.greenLeaf, 0.12)} />
    </g>
    {/* lamppost on the right */}
    <g transform="translate(1600 480)">
      <rect x={-12} y={0} width={24} height={420} rx={10} fill={COLORS.shirtDark} {...lg} />
      <rect x={-50} y={-60} width={100} height={70} rx={16} fill={COLORS.yellowSoft} {...lg} />
      <rect x={-50} y={-60} width={100} height={20} rx={10} fill={COLORS.shirtDark} />
    </g>
    {/* park bench in the center */}
    <g transform="translate(960 820)">
      <rect x={-260} y={-70} width={520} height={30} rx={14} fill={COLORS.greenTeal} {...xl} />
      {[-240, -120, 0, 120, 240].map((x, i) => (
        <rect key={i} x={x - 16} y={-120} width={32} height={60} rx={8} fill={COLORS.greenTeal} {...sm} />
      ))}
      <rect x={-260} y={40} width={520} height={26} rx={12} fill={COLORS.greenTeal} {...xl} />
      <rect x={-230} y={0} width={30} height={120} rx={10} fill={COLORS.woodDark} {...lg} />
      <rect x={200} y={0} width={30} height={120} rx={10} fill={COLORS.woodDark} {...lg} />
    </g>
  </g>
);

/** Classroom: green chalkboard with a bell curve, desks, clock, window, charts. */
export const Classroom: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={840} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.greenTeal, 0.08)} />
    {/* big chalkboard */}
    <g transform="translate(700 300)">
      <rect x={-520} y={-180} width={1040} height={360} rx={16} fill={COLORS.woodDark} {...xl} />
      <rect x={-496} y={-156} width={992} height={312} rx={8} fill={COLORS.greenDark} />
      {/* chalk bell curve */}
      <path d="M -420 120 Q -250 120 -120 -60 Q 0 -160 120 -60 Q 250 120 420 120" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.85} />
      <line x1={-440} y1={120} x2={440} y2={120} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.7} />
      {/* chalk sums */}
      <path d="M -430 -110 l 90 0 M -385 -140 l 0 60" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      <text x={300} y={-90} fontFamily="Baloo 2" fontWeight={800} fontSize={54} fill={COLORS.white} opacity={0.7}>100</text>
    </g>
    {/* window + clock */}
    <g transform="translate(1600 260)"><WindowDay /></g>
    <g transform="translate(1600 560)"><WallClock /></g>
    {/* two school desks */}
    {[520, 1040].map((x, i) => (
      <g key={i} transform={`translate(${x} 720)`}>
        <rect x={-110} y={0} width={220} height={40} rx={10} fill={COLORS.wood} {...xl} />
        <rect x={-110} y={0} width={220} height={16} rx={8} fill={shade(COLORS.wood, 0.12)} />
        <rect x={-96} y={40} width={26} height={150} fill={COLORS.ledGrey} {...lg} />
        <rect x={70} y={40} width={26} height={150} fill={COLORS.ledGrey} {...lg} />
        <rect x={-70} y={14} width={90} height={56} rx={6} fill={COLORS.white} {...sm} />
      </g>
    ))}
  </g>
);

/** Science lab: periodic-table poster, shelves of flasks, a bench with bubbling beaker. */
export const ScienceLab: React.FC = () => {
  const f = useCurrentFrame();
  const bub = (f % 40) / 40;
  return (
    <g>
      <WallFloor wall={COLORS.sky} floor={COLORS.whiteShade} floorY={840} stripe={false} />
      <rect x={0} y={0} width={CANVAS.width} height={120} fill={shade(COLORS.sky, 0.12)} />
      {/* periodic-table poster */}
      <g transform="translate(360 300)">
        <rect x={-220} y={-170} width={440} height={300} rx={14} fill={COLORS.white} {...xl} />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => (
            <rect key={`${r}-${c}`} x={-200 + c * 46} y={-150 + r * 56} width={40} height={48} rx={5} fill={[COLORS.yellowSoft, COLORS.pink, COLORS.sky, COLORS.greenLeaf, COLORS.lavender][(r + c) % 5]} {...strokeProps(STROKE.sm)} />
          )),
        )}
      </g>
      {/* shelf of flasks */}
      <rect x={1120} y={420} width={700} height={18} rx={6} fill={COLORS.woodDark} {...lg} />
      {[1200, 1340, 1480, 1620, 1740].map((x, i) => (
        <g key={i} transform={`translate(${x} 360)`}>
          <path d="M -22 -40 L -22 0 L -40 56 L 40 56 L 22 0 L 22 -40 Z" fill={[COLORS.greenLeaf, COLORS.pink, COLORS.yellow, COLORS.sky, COLORS.red][i]} opacity={0.8} {...lg} />
          <rect x={-22} y={-52} width={44} height={16} rx={6} fill={COLORS.ledGrey} {...sm} />
        </g>
      ))}
      {/* lab bench with a bubbling beaker */}
      <rect x={1040} y={700} width={880} height={60} rx={10} fill={COLORS.greenTeal} {...xl} />
      <rect x={1040} y={700} width={880} height={22} rx={8} fill={shade(COLORS.greenTeal, 0.14)} />
      <g transform="translate(1320 700)">
        <path d="M -54 -120 L -54 -40 L -78 10 L 78 10 L 54 -40 L 54 -120 Z" fill={COLORS.greenLeaf} opacity={0.5} {...lg} />
        <path d="M -70 -14 L 70 -14 L 78 10 L -78 10 Z" fill={COLORS.greenLeaf} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={-20 + i * 24} cy={-30 - bub * 70 - i * 10} r={8 - i * 1.5} fill={COLORS.white} opacity={0.8 * (1 - bub)} />
        ))}
      </g>
    </g>
  );
};

/** A hunched silhouette glued to a glowing phone — the "glow-dweller" that fills
 *  the digital wilderness (drawn into the room so the specimen stands out). */
const GlowDweller: React.FC<{ x: number; y: number; s: number; tone: string }> = ({ x, y, s, tone }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* light cone from the phone up onto the face */}
    <path d="M -30 -70 L -70 -200 L 70 -200 L 30 -70 Z" fill={COLORS.sky} opacity={0.3} />
    {/* hunched body */}
    <path d="M -70 120 Q -80 -10 0 -30 Q 80 -10 70 120 Z" fill={tone} {...strokeProps(STROKE.xl)} />
    {/* head tilted down to the phone */}
    <circle cx={0} cy={-80} r={52} fill={tone} {...strokeProps(STROKE.xl)} />
    <path d="M -22 -70 q 22 16 44 0" fill="none" stroke={shade(tone, -0.4)} strokeWidth={STROKE.sm} opacity={0.5} />
    {/* the phone, screen glowing blue */}
    <rect x={-34} y={-78} width={68} height={30} rx={8} fill={COLORS.shirtDark} {...strokeProps(STROKE.lg)} />
    <rect x={-26} y={-72} width={52} height={18} rx={4} fill={COLORS.sky} />
  </g>
);

/** Digital wilderness: a dusk plaza where everyone is a hunched, blue-glowing
 *  glow-dweller — the "habitat" the specimen lives among. Leaves a gap centre-left
 *  for the full-colour protagonist. */
export const DigitalWilderness: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
    {/* dusk sky band + a low sunset glow */}
    <rect x={0} y={0} width={CANVAS.width} height={560} fill={COLORS.wallNight} />
    <ellipse cx={960} cy={620} rx={900} ry={160} fill={COLORS.hoodie} opacity={0.18} />
    {[[180, 120], [1240, 90], [1680, 150], [520, 90]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={5} fill={COLORS.white} opacity={0.8} />
    ))}
    {/* skyline silhouettes with a few lit windows */}
    {[[40, 360, 200, 260], [260, 300, 170, 320], [1180, 320, 190, 300], [1400, 260, 210, 360], [1640, 340, 200, 280]].map(([x, y, w, h], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} fill={shade(COLORS.purpleDeep, 0.2)} />
        {Array.from({ length: 4 }).map((_, k) => (
          <rect key={k} x={x + 24 + (k % 2) * 70} y={y + 30 + Math.floor(k / 2) * 70} width={30} height={38} rx={4} fill={(i + k) % 3 === 0 ? COLORS.sky : shade(COLORS.purpleDeep, 0.05)} opacity={0.8} />
        ))}
      </g>
    ))}
    {/* ground */}
    <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={shade(COLORS.purpleDeep, 0.22)} />
    <rect x={0} y={760} width={CANVAS.width} height={10} fill={COLORS.wallNight} />
    {/* the herd of glow-dwellers (gap left around x 520-820 for the protagonist) */}
    <GlowDweller x={200} y={790} s={0.72} tone={shade(COLORS.purpleDeep, -0.1)} />
    <GlowDweller x={1020} y={810} s={0.8} tone={shade(COLORS.wallNight, 0.18)} />
    <GlowDweller x={1270} y={792} s={0.74} tone={shade(COLORS.purpleDeep, -0.05)} />
    <GlowDweller x={1520} y={812} s={0.82} tone={shade(COLORS.wallNight, 0.1)} />
    <GlowDweller x={1740} y={790} s={0.7} tone={shade(COLORS.purpleDeep, -0.08)} />
  </g>
);

/** Reading nook: the specimen's natural habitat — warm lamp, armchair, a wall of
 *  books, a plant, an evening window, a steaming mug. Not a screen in sight. */
export const ReadingNook: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.wood} floor={COLORS.woodDark} floorY={820} stripe={false} />
    {/* warm wall panelling */}
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.wood, 0.06)} />
    ))}
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={COLORS.bgCream} />
    <rect x={0} y={560} width={CANVAS.width} height={14} fill={shade(COLORS.woodDark, 0.1)} />
    {/* evening window */}
    <g transform="translate(300 260)"><WindowNight /></g>
    {/* a tall wall of books */}
    <g transform="translate(1540 430)">
      <rect x={-150} y={-280} width={300} height={520} rx={10} fill={COLORS.woodDark} {...xl} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={-132} y={-250 + r * 130} width={264} height={112} fill={shade(COLORS.wood, 0.14)} />
          {Array.from({ length: 8 }).map((_, c) => {
            const cols = [COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.lavender, COLORS.pink, COLORS.greenTeal, COLORS.hoodie];
            return <rect key={c} x={-124 + c * 32} y={-244 + r * 130 + ((c * 7) % 10)} width={24} height={106 - ((c * 7) % 10)} rx={3} fill={cols[(r + c) % 8]} {...sm} />;
          })}
        </g>
      ))}
    </g>
    {/* floor lamp casting a warm pool */}
    <ellipse cx={1180} cy={760} rx={220} ry={90} fill={COLORS.yellowSoft} opacity={0.25} />
    <g transform="translate(1180 420)">
      <path d="M -70 0 L 70 0 L 44 -90 L -44 -90 Z" fill={COLORS.yellow} {...xl} />
      <rect x={-8} y={0} width={16} height={330} fill={COLORS.woodDark} {...lg} />
      <ellipse cx={0} cy={338} rx={70} ry={20} fill={COLORS.woodDark} {...lg} />
    </g>
    {/* cosy armchair */}
    <g transform="translate(680 620)">
      <rect x={-170} y={0} width={340} height={210} rx={40} fill={COLORS.greenTeal} {...xl} />
      <rect x={-170} y={-120} width={340} height={160} rx={40} fill={COLORS.greenTeal} {...xl} />
      <rect x={-170} y={-120} width={340} height={54} rx={28} fill={shade(COLORS.greenTeal, 0.14)} />
      <rect x={-210} y={-40} width={70} height={230} rx={28} fill={shade(COLORS.greenTeal, 0.1)} {...std} />
      <rect x={140} y={-40} width={70} height={230} rx={28} fill={shade(COLORS.greenTeal, 0.1)} {...std} />
      <rect x={-120} y={-96} width={130} height={110} rx={24} fill={COLORS.yellowSoft} {...std} />
    </g>
    {/* a steaming mug on a side table */}
    <g transform="translate(1000 720)">
      <rect x={-70} y={0} width={140} height={100} rx={12} fill={COLORS.woodDark} {...lg} />
      <rect x={-44} y={-54} width={70} height={58} rx={12} fill={COLORS.red} {...lg} />
      <path d="M 26 -44 q 30 0 30 24 q 0 20 -30 20" fill="none" {...std} />
      <path d="M -24 -70 q -8 -16 6 -26 M 4 -70 q -8 -16 6 -26" fill="none" stroke={COLORS.whiteShade} strokeWidth={STROKE.sm} strokeLinecap="round" />
    </g>
  </g>
);

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
  'store-aisle': StoreAisle,
  casino: Casino,
  office: Office,
  'therapist-office': TherapistOffice,
  basement: Basement,
  gym: Gym,
  'art-studio': ArtStudio,
  'theater-stage': TheaterStage,
  nursery: Nursery,
  'date-restaurant': DateRestaurant,
  'park-bench': ParkBench,
  classroom: Classroom,
  'science-lab': ScienceLab,
  'digital-wilderness': DigitalWilderness,
  'reading-nook': ReadingNook,
};

export const ROOM_NAMES = Object.keys(ROOMS) as RoomName[];
