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
  | 'reading-nook'
  | 'insomnia-bedroom'
  | 'mind-control-room'
  | 'thought-void'
  | 'calm-shore'
  | 'dream-bedroom'
  | 'sleep-lab'
  | 'dreamscape'
  | 'liminal-hallway'
  | 'study-den'
  | 'tinker-workshop'
  | 'late-night-desk'
  | 'mind-cosmos'
  | 'inner-theater'
  | 'daydream-realm'
  | 'pacing-room'
  | 'bus-window'
  | 'witching-bedroom'
  | 'night-street'
  | 'brain-nightshift'
  | 'dawn-window'
  | 'thinker-nook'
  | 'signpost-crossroads'
  | 'overthink-stairwell'
  | 'misty-clearing'
  | 'break-room'
  | 'celebration'
  | 'coffee-catchup'
  | 'masquerade-hall'
  | 'pedestal-gallery'
  | 'analysis-room'
  | 'personality-atrium'
  | 'analyst-lab'
  | 'diplomat-garden'
  | 'sentinel-hall'
  | 'explorer-workshop'
  | 'awareness-shaft'
  | 'the-deep'
  | 'flow-river'
  | 'clarity-summit'
  | 'procrastination-desk'
  | 'deadline-cliff'
  | 'fresh-start-desk'
  | 'debate-stage'
  | 'courtroom-mind'
  | 'clarity-studio'
  | 'cozy-den'
  | 'forest-path-solo'
  | 'draining-party'
  | 'mind-gallery'
  | 'creative-studio'
  | 'open-nature'
  | 'thought-funhouse'
  | 'foggy-mind'
  | 'reframe-room'
  | 'emotion-atrium'
  | 'mood-weather'
  | 'heart-lab'
  | 'love-gallery'
  | 'cozy-hearth'
  | 'blossom-garden'
  | 'connection-lounge'
  | 'spotlight-stage'
  | 'fireside-circle'
  | 'habit-brain-paths'
  | 'routine-kitchen'
  | 'habit-studio'
  | 'impostor-office'
  | 'exposure-spotlight'
  | 'reframe-desk'
  | 'grief-shore'
  | 'memory-room'
  | 'dawn-meadow';

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

/** Insomnia bedroom: pitch-dark room, a big glowing alarm clock reading 2:00, a
 *  moonlit window, and faint thought-scribbles drifting over the bed. */
export const InsomniaBedroom: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.7 + 0.2 * Math.sin(f / 6);
  return (
    <g>
      <WallFloor wall={COLORS.wallNightDark} floor={shade(COLORS.purpleDeep, 0.2)} floorY={840} stripe={false} />
      {/* wallpaper stripes break up the flat dark wall */}
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={i * 84} y={0} width={42} height={600} fill={shade(COLORS.wallNightDark, -0.14)} opacity={0.7} />
      ))}
      {/* wainscot panelling along the lower wall */}
      <rect x={0} y={600} width={CANVAS.width} height={240} fill={shade(COLORS.purpleDeep, 0.06)} />
      <rect x={0} y={600} width={CANVAS.width} height={14} fill={shade(COLORS.purpleDeep, 0.3)} />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={`p${i}`} x={70 + i * 190} y={636} width={150} height={150} rx={10} fill="none" stroke={shade(COLORS.purpleDeep, 0.14)} strokeWidth={STROKE.sm} opacity={0.6} />
      ))}
      {/* rug under the bed */}
      <ellipse cx={720} cy={930} rx={460} ry={80} fill={shade(COLORS.purpleDeep, -0.08)} opacity={0.6} />
      {/* moonlit window + a framed picture */}
      <g transform="translate(330 300)"><WindowNight /></g>
      <g transform="translate(1040 290)"><FramedPicture /></g>
      {/* faint restless thought-scribbles near the ceiling */}
      {[[720, 150], [980, 110], [1200, 180]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} q 30 -30 60 0 t 60 0 t 60 0`} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.35} />
      ))}
      {/* a tall wardrobe on the far right */}
      <g transform="translate(1820 560)">
        <rect x={-130} y={-300} width={260} height={560} rx={14} fill={COLORS.woodDark} {...xl} />
        <line x1={0} y1={-290} x2={0} y2={250} stroke={shade(COLORS.woodDark, 0.22)} strokeWidth={STROKE.sm} />
        <rect x={-114} y={-280} width={100} height={240} rx={8} fill={shade(COLORS.woodDark, 0.1)} />
        <rect x={16} y={-280} width={100} height={240} rx={8} fill={shade(COLORS.woodDark, 0.1)} />
        <circle cx={-18} cy={-10} r={9} fill={COLORS.yellow} {...sm} />
        <circle cx={18} cy={-10} r={9} fill={COLORS.yellow} {...sm} />
      </g>
      {/* bed */}
      <g transform="translate(720 720)">
        <rect x={-320} y={-30} width={640} height={190} rx={28} fill={shade(COLORS.lavender, 0.3)} {...xl} />
        <rect x={-320} y={-110} width={200} height={120} rx={28} fill={shade(COLORS.lavender, 0.24)} {...xl} />
        <rect x={-300} y={-70} width={140} height={60} rx={20} fill={COLORS.whiteShade} opacity={0.5} {...std} />
        <rect x={-150} y={-10} width={460} height={140} rx={22} fill={shade(COLORS.sky, 0.3)} {...std} />
      </g>
      {/* nightstand + a big glowing digital clock reading 2:00 */}
      <g transform="translate(1480 700)">
        <rect x={-110} y={60} width={220} height={180} rx={14} fill={COLORS.woodDark} {...xl} />
        <ellipse cx={0} cy={0} rx={150} ry={70} fill={COLORS.red} opacity={0.14 * glow} />
        <rect x={-96} y={-44} width={192} height={92} rx={14} fill={COLORS.shirtDarker} {...lg} />
        <text x={0} y={30} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={72} fill={COLORS.red} opacity={glow}>2:00</text>
      </g>
    </g>
  );
};

/** Mind control room: the inside of the head as an engine room — a console of
 *  gauges, a brain-wave monitor, levers and blinking lights, pipes overhead. */
export const MindControlRoom: React.FC = () => {
  const f = useCurrentFrame();
  const blink = Math.sin(f / 5) > 0 ? 1 : 0.4;
  const wave = Array.from({ length: 40 }).map((_, i) => `${i ? 'L' : 'M'} ${-180 + i * 9} ${-Math.sin(i / 2 + f / 6) * 26}`).join(' ');
  return (
    <g>
      <WallFloor wall={shade(COLORS.greenTeal, 0.3)} floor={COLORS.shirtDark} floorY={820} stripe={false} />
      {/* overhead pipes */}
      {[90, 150].map((y, i) => <rect key={i} x={0} y={y} width={CANVAS.width} height={20} rx={8} fill={COLORS.ledGrey} opacity={0.6} />)}
      {[300, 760, 1600].map((x, i) => <rect key={i} x={x} y={90} width={24} height={120} fill={COLORS.ledGrey} opacity={0.5} />)}
      {/* "MIND HQ" sign */}
      <g transform="translate(300 320)">
        <rect x={-130} y={-50} width={260} height={100} rx={16} fill={COLORS.yellow} {...xl} />
        <text x={0} y={16} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={48} fill={COLORS.outline}>MIND HQ</text>
      </g>
      {/* brain-wave monitor */}
      <g transform="translate(1480 360)">
        <rect x={-210} y={-150} width={420} height={300} rx={20} fill={COLORS.shirtDarker} {...xl} />
        <rect x={-182} y={-122} width={364} height={244} rx={10} fill={COLORS.purpleDeep} {...lg} />
        <path d={wave} fill="none" stroke={COLORS.ledGreen} strokeWidth={STROKE.lg} strokeLinecap="round" transform="translate(0 0)" />
        <text x={0} y={100} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.ledGreen} opacity={0.8}>STILL ON</text>
      </g>
      {/* the console across the floor */}
      <rect x={0} y={700} width={CANVAS.width} height={160} fill={COLORS.ledGrey} {...xl} />
      <rect x={0} y={700} width={CANVAS.width} height={40} fill={shade(COLORS.ledGrey, 0.18)} />
      {/* gauges */}
      {[140, 320, 1700].map((x, i) => (
        <g key={i} transform={`translate(${x} 770)`}>
          <circle r={48} fill={COLORS.white} {...lg} />
          <line x1={0} y1={0} x2={Math.sin(f / 20 + i) * 30} y2={-Math.cos(f / 20 + i) * 30} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
          <circle r={8} fill={COLORS.outline} />
        </g>
      ))}
      {/* blinking warning lights */}
      {[900, 1020, 1140].map((x, i) => (
        <circle key={i} cx={x} cy={740} r={16} fill={i % 2 ? COLORS.red : COLORS.yellow} opacity={i % 2 ? blink : 1 - blink + 0.4} {...sm} />
      ))}
      {/* levers */}
      {[1000, 1120].map((x, i) => (
        <g key={i} transform={`translate(${x} 800)`}>
          <rect x={-8} y={0} width={16} height={60} fill={COLORS.shirtDark} />
          <line x1={0} y1={0} x2={i ? 24 : -24} y2={-50} stroke={COLORS.woodDark} strokeWidth={STROKE.xl} strokeLinecap="round" />
          <circle cx={i ? 24 : -24} cy={-50} r={16} fill={COLORS.red} {...lg} />
        </g>
      ))}
    </g>
  );
};

/** Thought void: a surreal, dark headspace — a soft glowing horizon, a receding
 *  grid floor, and pale thought-shapes drifting among stars. */
export const ThoughtVoid: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      {/* soft glow horizon */}
      <ellipse cx={960} cy={700} rx={1100} ry={300} fill={COLORS.wallNight} opacity={0.6} />
      <ellipse cx={960} cy={720} rx={700} ry={160} fill={COLORS.lavender} opacity={0.18} />
      {/* receding grid floor */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={960 + (i - 4) * 70} y1={760} x2={960 + (i - 4) * 420} y2={1080} stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.22} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={0} y1={790 + i * i * 22} x2={CANVAS.width} y2={790 + i * i * 22} stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.22} />
      ))}
      {/* stars */}
      {[[160, 140], [480, 90], [820, 200], [1200, 120], [1560, 180], [1760, 90], [300, 260], [1400, 300]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y - 10} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z`} fill={COLORS.white} opacity={0.7} />
      ))}
      {/* drifting pale thought-shapes */}
      {([[300, 360, COLORS.sky, '?'], [1500, 420, COLORS.pink, '!'], [1180, 300, COLORS.yellowSoft, '…']] as [number, number, string, string][]).map(([x, y, c, t], i) => {
        const dy = Math.sin(f / 20 + i * 2) * 14;
        return (
          <g key={i} transform={`translate(${x} ${y + dy})`} opacity={0.55}>
            <path d="M -70 0 Q -84 -54 -30 -54 Q -10 -84 30 -60 Q 84 -64 70 0 Q 80 46 20 46 Q 0 70 -36 48 Q -84 46 -70 0 Z" fill={c} {...lg} />
            <text x={-6} y={18} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={44} fill={COLORS.outline}>{t}</text>
          </g>
        );
      })}
    </g>
  );
};

/** Calm shore: a still dawn lake with a soft rising sun, distant hills, gentle
 *  reeds and a quiet reflection — the place the mind finally settles. */
export const CalmShore: React.FC = () => {
  const f = useCurrentFrame();
  const shimmer = Math.sin(f / 18) * 6;
  return (
    <g>
      {/* dawn sky gradient (banded flats) */}
      <rect x={0} y={0} width={CANVAS.width} height={760} fill={COLORS.sky} />
      <rect x={0} y={360} width={CANVAS.width} height={400} fill={COLORS.yellowSoft} opacity={0.45} />
      {/* soft rising sun */}
      <circle cx={960} cy={560} r={120} fill={COLORS.yellow} opacity={0.9} />
      <circle cx={960} cy={560} r={180} fill={COLORS.yellowSoft} opacity={0.3} />
      {/* distant hills */}
      <path d="M 0 640 Q 500 560 960 620 Q 1500 560 1920 640 L 1920 760 L 0 760 Z" fill={COLORS.greenTeal} opacity={0.6} />
      {/* still water */}
      <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={COLORS.skyDark} />
      <rect x={0} y={760} width={CANVAS.width} height={120} fill={COLORS.sky} opacity={0.5} />
      {/* sun reflection + shimmer lines */}
      <ellipse cx={960} cy={820} rx={90} ry={40} fill={COLORS.yellow} opacity={0.4} />
      {[820, 900, 980, 1040].map((y, i) => (
        <path key={i} d={`M ${400 + shimmer} ${y} q 120 10 240 0 t 240 0 t 240 0`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.3} />
      ))}
      {/* reeds on the near shore */}
      {[120, 180, 230, 1760, 1820].map((x, i) => (
        <path key={i} d={`M ${x} 1080 Q ${x + (i % 2 ? 16 : -16)} 900 ${x + (i % 2 ? 8 : -8)} 840`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      ))}
    </g>
  );
};

/** Dream bedroom: a warped, floating version of a bedroom — tilted bed, drifting
 *  furniture, a melting clock, a window onto a two-moon dream sky. */
export const DreamBedroom: React.FC = () => {
  const f = useCurrentFrame();
  const floatY = Math.sin(f / 22) * 10;
  const floatY2 = Math.sin(f / 18 + 1) * 12;
  return (
    <g>
      <WallFloor wall={COLORS.lavender} floor={COLORS.lavenderDark} floorY={840} stripe={false} />
      {/* dreamy wallpaper: soft stripes + swirls break up the flat lavender */}
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={i * 84} y={0} width={42} height={600} fill={shade(COLORS.lavender, 0.09)} opacity={0.7} />
      ))}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <path key={`${r}-${c}`} d={`M ${60 + c * 200 + (r % 2) * 100} ${70 + r * 110} q 36 -36 72 0 q -36 36 -72 0 Z`} fill={shade(COLORS.lavender, 0.16)} stroke={shade(COLORS.lavender, 0.22)} strokeWidth={STROKE.sm} opacity={0.6} />
        )),
      )}
      {/* wainscot band on the lower wall */}
      <rect x={0} y={600} width={CANVAS.width} height={240} fill={shade(COLORS.lavender, 0.16)} />
      <rect x={0} y={600} width={CANVAS.width} height={14} fill={COLORS.lavenderDark} />
      {/* window onto a two-moon dream sky */}
      <g transform="translate(330 290)">
        <rect x={-150} y={-150} width={300} height={320} rx={16} fill={COLORS.purpleDeep} {...xl} />
        <circle cx={-60} cy={-70} r={46} fill={COLORS.yellowSoft} {...lg} />
        <circle cx={70} cy={30} r={28} fill={COLORS.pink} {...lg} />
        {[[-100, 60], [40, -110], [110, 100], [-30, 20]].map(([x, y], i) => (
          <path key={i} d={`M ${x} ${y - 8} l 3 6 l 6 3 l -6 3 l -3 6 l -3 -6 l -6 -3 l 6 -3 Z`} fill={COLORS.white} />
        ))}
        <line x1={0} y1={-150} x2={0} y2={170} {...std} />
        <line x1={-150} y1={10} x2={150} y2={10} {...std} />
      </g>
      {/* floating melting clock */}
      <g transform={`translate(1480 ${300 + floatY})`}>
        <path d="M -90 -80 Q 90 -90 90 10 Q 90 90 40 140 Q 20 100 0 140 Q -10 90 -90 70 Z" fill={COLORS.white} {...xl} />
        <circle cx={0} cy={-6} r={10} fill={COLORS.red} />
        <line x1={0} y1={-6} x2={30} y2={-40} {...std} />
        <line x1={0} y1={-6} x2={-6} y2={70} {...std} />
      </g>
      {/* floating books + stars */}
      <g transform={`translate(1050 ${360 + floatY2}) rotate(-12)`}>
        <rect x={-50} y={-34} width={100} height={68} rx={8} fill={COLORS.sky} {...lg} />
        <rect x={-50} y={-34} width={20} height={68} fill={shade(COLORS.sky, 0.2)} />
      </g>
      {[[760, 200], [1700, 230], [900, 150]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y - 14} l 5 11 l 11 5 l -11 5 l -5 11 l -5 -11 l -11 -5 l 11 -5 Z`} fill={COLORS.yellow} opacity={0.8} />
      ))}
      {/* a tilted, floating bed */}
      <g transform={`translate(720 ${720 + floatY}) rotate(-5)`}>
        <ellipse cx={0} cy={150} rx={360} ry={50} fill={COLORS.lavenderDark} opacity={0.5} />
        <rect x={-320} y={-30} width={640} height={190} rx={28} fill={COLORS.pink} {...xl} />
        <rect x={-320} y={-110} width={200} height={120} rx={28} fill={COLORS.pink} {...xl} />
        <rect x={-300} y={-70} width={140} height={60} rx={20} fill={COLORS.white} opacity={0.7} {...std} />
        <rect x={-150} y={-10} width={460} height={140} rx={22} fill={COLORS.lavender} {...std} />
      </g>
    </g>
  );
};

/** Sleep lab: a clinical room with a sensor bed, an EEG cart + wires, a wall
 *  monitor of brain waves, an observation window and tiled floor. */
export const SleepLab: React.FC = () => {
  const f = useCurrentFrame();
  const wave = Array.from({ length: 44 }).map((_, i) => `${i ? 'L' : 'M'} ${-160 + i * 8} ${-Math.sin(i / 2 + f / 7) * 22}`).join(' ');
  return (
    <g>
      <WallFloor wall={COLORS.greenTeal} floor={COLORS.whiteShade} floorY={840} stripe={false} />
      <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.greenTeal, 0.08)} />
      {/* floor tiles */}
      {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={i * 200} y={842} width={2} height={CANVAS.height - 842} fill={shade(COLORS.whiteShade, 0.2)} />)}
      {/* observation window */}
      <g transform="translate(300 300)">
        <rect x={-150} y={-120} width={300} height={240} rx={12} fill={COLORS.purpleDeep} {...xl} />
        <rect x={-150} y={-120} width={300} height={240} rx={12} fill={COLORS.sky} opacity={0.2} />
        <line x1={-150} y1={0} x2={150} y2={0} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.4} />
      </g>
      {/* wall monitor with a hypnogram */}
      <g transform="translate(980 300)">
        <rect x={-180} y={-130} width={360} height={260} rx={16} fill={COLORS.shirtDarker} {...xl} />
        <rect x={-156} y={-104} width={312} height={208} rx={8} fill={COLORS.purpleDeep} {...lg} />
        <path d="M -140 -60 L -70 -60 L -70 -10 L 0 -10 L 0 40 L 70 40 L 70 -30 L 140 -30" fill="none" stroke={COLORS.ledGreen} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* EEG cart + live wave + wires */}
      <g transform="translate(1600 440)">
        <rect x={-150} y={-150} width={300} height={220} rx={16} fill={COLORS.shirtDark} {...xl} />
        <rect x={-126} y={-126} width={252} height={150} rx={8} fill={COLORS.purpleDeep} {...lg} />
        <path d={wave} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <rect x={-150} y={70} width={300} height={40} rx={10} fill={shade(COLORS.shirtDark, 0.2)} />
        <circle cx={-110} cy={150} r={20} fill={COLORS.ledGrey} {...lg} />
        <circle cx={110} cy={150} r={20} fill={COLORS.ledGrey} {...lg} />
        {/* wires trailing to the bed */}
        <path d="M -150 -40 Q -400 100 -560 240" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <path d="M -150 0 Q -420 140 -540 270" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* sensor bed */}
      <g transform="translate(760 740)">
        <rect x={-300} y={0} width={600} height={120} rx={20} fill={COLORS.sky} {...xl} />
        <rect x={-300} y={-70} width={170} height={90} rx={20} fill={COLORS.white} {...lg} />
        <rect x={-300} y={0} width={600} height={30} rx={14} fill={shade(COLORS.sky, 0.16)} />
        <rect x={-290} y={120} width={30} height={70} fill={COLORS.ledGrey} {...lg} />
        <rect x={260} y={120} width={30} height={70} fill={COLORS.ledGrey} {...lg} />
      </g>
    </g>
  );
};

/** Dreamscape: a surreal floating world — gradient sky, two moons, floating
 *  islands, an impossible staircase, drifting clouds, stars and a lone door. */
export const Dreamscape: React.FC = () => {
  const f = useCurrentFrame();
  const d1 = Math.sin(f / 20) * 10;
  const d2 = Math.sin(f / 26 + 2) * 12;
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      <rect x={0} y={0} width={CANVAS.width} height={620} fill={COLORS.wallNight} />
      <rect x={0} y={420} width={CANVAS.width} height={260} fill={COLORS.pink} opacity={0.2} />
      {/* two moons */}
      <circle cx={1500} cy={210} r={120} fill={COLORS.yellowSoft} {...lg} />
      {[[1460, 180], [1540, 240], [1510, 170]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14 + i * 4} fill={shade(COLORS.yellowSoft, 0.12)} />)}
      <circle cx={360} cy={150} r={56} fill={COLORS.pink} {...lg} />
      {/* stars + sparkles */}
      {[[180, 260], [620, 120], [900, 220], [1180, 120], [1720, 360], [1780, 120], [240, 420], [1040, 340], [1360, 420]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y - 10} l 4 8 l 8 4 l -8 4 l -4 8 l -4 -8 l -8 -4 l 8 -4 Z`} fill={COLORS.white} opacity={0.8} />
      ))}
      {/* drifting clouds */}
      {([[620, 520, d1], [1240, 620, d2]] as [number, number, number][]).map(([x, y, dd], i) => (
        <g key={i} transform={`translate(${x + dd} ${y})`} opacity={0.5}>
          {[[-70, 0, 50], [0, -18, 60], [66, 0, 48]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill={COLORS.lavender} />)}
        </g>
      ))}
      {/* a lone floating door */}
      <g transform={`translate(1680 640 ) translate(0 ${d2})`}>
        <rect x={-70} y={-150} width={140} height={300} rx={10} fill={COLORS.wood} {...xl} />
        <rect x={-50} y={-130} width={100} height={120} rx={8} fill={shade(COLORS.wood, 0.14)} />
        <circle cx={44} cy={30} r={10} fill={COLORS.yellow} {...sm} />
      </g>
      {/* an impossible staircase */}
      <g transform={`translate(240 ${560 + d1})`}>
        {Array.from({ length: 6 }).map((_, i) => {
          const x = i * 48; const y = -i * 30;
          return (
            <g key={i}>
              <path d={`M ${x} ${y} l 48 0 l 0 34 l -48 0 Z`} fill={COLORS.sky} {...lg} />
              <path d={`M ${x} ${y} l 20 -16 l 48 0 l -20 16 Z`} fill={shade(COLORS.sky, 0.16)} {...sm} />
            </g>
          );
        })}
      </g>
      {/* floating grassy islands (the ground the mascot stands on) */}
      {([[700, 900, 1.0], [1300, 940, 0.8]] as [number, number, number][]).map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M -280 0 Q 0 -70 280 0 Q 220 80 0 86 Q -220 80 -280 0 Z" fill={COLORS.woodDark} {...xl} />
          <path d="M -280 0 Q 0 -70 280 0 Q 160 10 0 14 Q -160 10 -280 0 Z" fill={COLORS.greenLeaf} {...lg} />
        </g>
      ))}
    </g>
  );
};

/** Liminal hallway: an uncanny, endlessly repeating corridor of doors with a
 *  patterned carpet and a flickering light — the deja-vu dream space. */
export const LiminalHallway: React.FC = () => {
  const f = useCurrentFrame();
  const flick = Math.sin(f / 3) > 0.6 ? 0.4 : 0.9;
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.bgCreamDark} />
      {/* receding vanishing-point walls */}
      <path d="M 0 0 L 760 300 L 760 780 L 0 1080 Z" fill={shade(COLORS.wood, 0.1)} />
      <path d="M 1920 0 L 1160 300 L 1160 780 L 1920 1080 Z" fill={shade(COLORS.wood, 0.1)} />
      <rect x={760} y={300} width={400} height={480} fill={shade(COLORS.wood, 0.2)} />
      {/* ceiling + patterned carpet */}
      <path d="M 0 0 L 1920 0 L 1160 300 L 760 300 Z" fill={shade(COLORS.bgCreamDark, 0.08)} />
      <path d="M 0 1080 L 1920 1080 L 1160 780 L 760 780 Z" fill={COLORS.wood} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={i} d={`M ${200 + i * 230} 1080 L ${780 + i * 55} 790 L ${835 + i * 55} 790 L ${300 + i * 230} 1080 Z`} fill={shade(COLORS.wood, 0.16)} opacity={0.6} />
      ))}
      {/* repeating doors down each wall */}
      {[0, 1, 2, 3].map((i) => {
        const s = 1 - i * 0.22;
        const lx = 120 + i * 180; const rx = 1800 - i * 180; const y = 440 - i * 40;
        const h = 300 * s; const w = 120 * s;
        return (
          <g key={i}>
            {[lx, rx].map((x, k) => (
              <g key={k}>
                <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8} fill={COLORS.wood} {...lg} />
                <rect x={x - w / 2 + 8} y={y - h / 2 + 8} width={w - 16} height={h / 2 - 12} rx={6} fill={shade(COLORS.wood, 0.14)} />
                <circle cx={x + (k ? -w / 2 + 16 : w / 2 - 16)} cy={y} r={6 * s} fill={COLORS.yellow} />
              </g>
            ))}
          </g>
        );
      })}
      {/* flickering ceiling lights */}
      {[500, 960, 1420].map((x, i) => (
        <g key={i}>
          <rect x={x - 50} y={70 + i * 10} width={100} height={18} rx={8} fill={COLORS.white} opacity={0.6} />
          <ellipse cx={x} cy={140 + i * 10} rx={130} ry={60} fill={COLORS.yellowSoft} opacity={0.12 * (i === 1 ? flick : 0.8)} />
        </g>
      ))}
      {/* EXIT sign that never gets closer */}
      <g transform="translate(960 360)">
        <rect x={-54} y={-24} width={108} height={48} rx={8} fill={COLORS.greenDark} {...sm} />
        <text x={0} y={12} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.white}>EXIT</text>
      </g>
    </g>
  );
};

/** Study den: a cluttered intellectual's room — a whiteboard of equations, an
 *  overflowing bookshelf, a globe, a chess set, papers and a desk lamp. */
export const StudyDen: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={820} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.greenTeal, 0.07)} opacity={0.7} />
    ))}
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={shade(COLORS.greenTeal, 0.12)} />
    {/* whiteboard with scribbled equations + a rising graph */}
    <g transform="translate(360 300)">
      <rect x={-230} y={-150} width={460} height={300} rx={12} fill={COLORS.white} {...xl} />
      <path d="M -190 90 L -190 -90 M -190 90 L 190 90" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -190 60 L -90 10 L 10 -30 L 180 -80" fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -150 -120 l 140 0 M -150 -96 l 90 0" stroke={COLORS.pinkDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <text x={70} y={-104} fontFamily="Baloo 2" fontWeight={800} fontSize={40} fill={COLORS.red}>E=mc²</text>
    </g>
    {/* overflowing bookshelf */}
    <g transform="translate(1560 420)">
      <rect x={-160} y={-280} width={320} height={520} rx={10} fill={COLORS.woodDark} {...xl} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={-142} y={-250 + r * 130} width={284} height={112} fill={shade(COLORS.wood, 0.12)} />
          {Array.from({ length: 9 }).map((_, c) => {
            const cols = [COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.lavender, COLORS.pink, COLORS.greenTeal];
            return <rect key={c} x={-134 + c * 31} y={-244 + r * 130 + ((c * 5) % 12)} width={24} height={106 - ((c * 5) % 12)} rx={3} fill={cols[(r + c) % 7]} {...sm} />;
          })}
        </g>
      ))}
    </g>
    {/* rug */}
    <ellipse cx={820} cy={940} rx={560} ry={90} fill={shade(COLORS.wood, 0.14)} />
    {/* desk with globe, chess, papers, lamp */}
    <g transform="translate(820 740)">
      <rect x={-320} y={0} width={640} height={60} rx={10} fill={COLORS.wood} {...xl} />
      <rect x={-290} y={60} width={40} height={160} fill={COLORS.woodDark} {...lg} />
      <rect x={250} y={60} width={40} height={160} fill={COLORS.woodDark} {...lg} />
      {/* globe */}
      <g transform="translate(-230 -56)"><circle r={54} fill={COLORS.sky} {...lg} /><path d="M -30 -20 q 20 10 50 -4 M -40 14 q 30 16 70 2 M -10 -40 l 6 80" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} /><rect x={-6} y={54} width={12} height={20} fill={COLORS.woodDark} /></g>
      {/* chess */}
      <g transform="translate(0 -30)">{Array.from({ length: 4 }).map((_, i) => <rect key={i} x={-60 + i * 30} y={-6} width={30} height={18} fill={i % 2 ? COLORS.shirtDark : COLORS.whiteShade} />)}<path d="M -46 -6 l 0 -34 l 16 0 l 0 34 Z" fill={COLORS.shirtDark} /><path d="M 20 -6 l 0 -40 q 10 -8 0 -16 q -10 8 0 16 Z" fill={COLORS.white} {...sm} /></g>
      {/* papers */}
      <rect x={120} y={-24} width={90} height={24} rx={4} fill={COLORS.white} {...sm} transform="rotate(-8 160 -12)" />
      {/* lamp */}
      <g transform="translate(260 -40)"><path d="M -30 0 L 30 0 L 18 -40 L -18 -40 Z" fill={COLORS.yellow} {...lg} /><rect x={-4} y={0} width={8} height={56} fill={COLORS.woodDark} /></g>
    </g>
  </g>
);

/** Tinker workshop: a maker's bench — pegboard of tools, a half-built gadget with
 *  gears, blueprints, shelves of parts, a hanging work lamp. */
export const TinkerWorkshop: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <WallFloor wall={COLORS.wood} floor={COLORS.woodDark} floorY={820} stripe={false} />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.wood, 0.08)} opacity={0.7} />
      ))}
      {/* a parts shelf with jars of bits */}
      <rect x={760} y={420} width={420} height={18} rx={6} fill={COLORS.shirtDark} {...lg} />
      {[820, 920, 1020, 1120].map((x, i) => (
        <g key={i} transform={`translate(${x} 388)`}>
          <rect x={-26} y={-30} width={52} height={60} rx={8} fill={[COLORS.sky, COLORS.yellow, COLORS.red, COLORS.greenLeaf][i]} opacity={0.5} {...sm} />
          {Array.from({ length: 4 }).map((_, k) => <circle key={k} cx={-14 + (k % 2) * 28} cy={-6 + Math.floor(k / 2) * 20} r={6} fill={COLORS.outline} opacity={0.5} />)}
        </g>
      ))}
      {/* pegboard */}
      <g transform="translate(360 300)">
        <rect x={-240} y={-160} width={480} height={320} rx={10} fill={shade(COLORS.wood, 0.14)} {...xl} />
        {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 9 }).map((_, c) => <circle key={`${r}-${c}`} cx={-200 + c * 50} cy={-120 + r * 52} r={4} fill={COLORS.outline} opacity={0.3} />))}
        {/* hanging tools */}
        <rect x={-180} y={-120} width={16} height={100} rx={6} fill={COLORS.red} {...sm} />
        <rect x={-180} y={-120} width={40} height={20} rx={6} fill={COLORS.red} {...sm} />
        <path d="M -60 -120 l 60 60 l -20 20 l -60 -60 Z" fill={COLORS.ledGrey} {...sm} />
        <circle cx={90} cy={-80} r={34} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} />
        <rect x={120} y={-120} width={14} height={110} rx={6} fill={COLORS.yellow} {...sm} />
      </g>
      {/* blueprint on wall */}
      <g transform="translate(1560 300)">
        <rect x={-180} y={-140} width={360} height={280} rx={10} fill={COLORS.blueDiagram} {...xl} />
        <circle cx={-40} cy={-20} r={70} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
        <rect x={40} y={-80} width={110} height={160} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
        <path d="M -150 100 l 300 0 M -40 -90 l 0 140" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.7} />
      </g>
      {/* hanging work lamp */}
      <line x1={960} y1={0} x2={960} y2={120} {...sm} />
      <path d="M 912 190 Q 960 110 1008 190 Z" fill={COLORS.shirtDark} {...lg} />
      <ellipse cx={960} cy={600} rx={260} ry={300} fill={COLORS.yellowSoft} opacity={0.12} />
      {/* workbench with a half-built gadget + spinning gears */}
      <g transform="translate(900 740)">
        <rect x={-360} y={0} width={720} height={70} rx={10} fill={COLORS.shirtDark} {...xl} />
        <rect x={-340} y={70} width={44} height={150} fill={COLORS.shirtDarker} />
        <rect x={296} y={70} width={44} height={150} fill={COLORS.shirtDarker} />
        {/* gadget */}
        <rect x={-120} y={-80} width={180} height={90} rx={10} fill={COLORS.greenTeal} {...lg} />
        <g transform={`translate(-60 -40) rotate(${f * 3})`}>{Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-6} y={-40} width={12} height={16} rx={3} fill={COLORS.yellow} transform={`rotate(${i * 45})`} />)}<circle r={26} fill={COLORS.yellow} {...sm} /><circle r={10} fill={COLORS.white} /></g>
        <g transform={`translate(10 -20) rotate(${-f * 4})`}>{Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-5} y={-30} width={10} height={14} rx={3} fill={COLORS.red} transform={`rotate(${i * 60})`} />)}<circle r={20} fill={COLORS.red} {...sm} /></g>
        {/* bolts + screwdriver */}
        <circle cx={160} cy={-30} r={10} fill={COLORS.ledGrey} {...sm} />
        <rect x={120} y={-14} width={120} height={12} rx={6} fill={COLORS.ledGrey} transform="rotate(-20 180 -8)" />
      </g>
    </g>
  );
};

/** Late-night desk: a dark room lit only by a desk lamp and a laptop glow — coffee
 *  cups, book stacks, a corkboard, a 1 a.m. clock. */
export const LateNightDesk: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.8 + 0.1 * Math.sin(f / 7);
  return (
    <g>
      <WallFloor wall={shade(COLORS.purpleDeep, 0.1)} floor={shade(COLORS.purpleDeep, 0.26)} floorY={830} stripe={false} />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.purpleDeep, -0.08)} opacity={0.5} />
      ))}
      {/* corkboard with pinned notes */}
      <g transform="translate(360 290)">
        <rect x={-170} y={-130} width={340} height={260} rx={10} fill={COLORS.wood} {...xl} />
        {([[-90, -70, COLORS.yellowSoft], [40, -80, COLORS.sky], [-40, 20, COLORS.pink], [90, 30, COLORS.greenLeaf]] as [number, number, string][]).map(([x, y, c], i) => (
          <g key={i} transform={`rotate(${i % 2 ? 5 : -6} ${x} ${y})`}><rect x={x - 50} y={y - 44} width={100} height={88} fill={c} {...sm} /><circle cx={x} cy={y - 36} r={6} fill={COLORS.red} /></g>
        ))}
        <path d="M -70 -40 L 60 -30 M -30 20 L 80 -40" stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={0.6} />
      </g>
      {/* 1 a.m. clock */}
      <g transform="translate(1600 250)"><circle r={70} fill={COLORS.white} {...xl} /><line x1={0} y1={0} x2={0} y2={-44} {...std} /><line x1={0} y1={0} x2={30} y2={10} {...std} /><circle r={7} fill={COLORS.red} /></g>
      {/* window night */}
      <g transform="translate(1600 520)"><rect x={-110} y={-90} width={220} height={200} rx={12} fill={COLORS.wallNight} {...xl} /><circle cx={50} cy={-30} r={28} fill={COLORS.yellowSoft} /><circle cx={-40} cy={30} r={4} fill={COLORS.white} /><circle cx={0} cy={-50} r={4} fill={COLORS.white} /></g>
      {/* desk + lamp pool + laptop glow + coffee + books */}
      <ellipse cx={900} cy={760} rx={360} ry={150} fill={COLORS.yellowSoft} opacity={0.18 * glow} />
      <g transform="translate(900 760)">
        <rect x={-360} y={0} width={720} height={64} rx={10} fill={COLORS.woodDark} {...xl} />
        {/* laptop */}
        <g transform="translate(-40 -70)"><path d="M -110 60 L -130 0 L 130 0 L 110 60 Z" fill={COLORS.shirtDark} {...lg} /><rect x={-120} y={-110} width={240} height={120} rx={10} fill={COLORS.shirtDark} {...xl} /><rect x={-104} y={-96} width={208} height={92} rx={6} fill={COLORS.sky} opacity={glow} /><rect x={-88} y={-80} width={120} height={10} rx={4} fill={COLORS.white} opacity={0.7} /><rect x={-88} y={-60} width={160} height={10} rx={4} fill={COLORS.white} opacity={0.5} /></g>
        {/* coffee */}
        <g transform="translate(180 -36)"><path d="M -30 -20 L 30 -20 L 24 30 L -24 30 Z" fill={COLORS.red} {...lg} /><path d="M 30 -10 q 24 0 24 22 q 0 16 -22 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} /><path d="M -6 -34 q -8 -14 4 -24" fill="none" stroke={COLORS.whiteShade} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
        {/* book stack */}
        <g transform="translate(300 -20)">{[COLORS.greenLeaf, COLORS.yellow, COLORS.lavender].map((c, i) => <rect key={i} x={-50} y={-i * 20 - 18} width={100} height={18} rx={4} fill={c} {...sm} />)}</g>
      </g>
    </g>
  );
};

/** Mind cosmos: an abstract starfield of connected idea-constellations and nebula
 *  clouds — the mind that links everything to everything. */
export const MindCosmos: React.FC = () => {
  const f = useCurrentFrame();
  const nodes: [number, number][] = [[180, 180], [460, 120], [760, 240], [1180, 140], [1500, 300], [1760, 180], [320, 420], [980, 420], [1360, 460], [640, 560]];
  const edges = [[0, 1], [1, 2], [2, 6], [2, 7], [7, 3], [3, 4], [4, 5], [7, 8], [8, 4], [6, 9], [9, 7]];
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      {/* banded deep-space gradient breaks up the flat purple */}
      <rect x={0} y={0} width={CANVAS.width} height={360} fill={COLORS.wallNight} opacity={0.8} />
      <rect x={0} y={360} width={CANVAS.width} height={360} fill={COLORS.wallNight} opacity={0.4} />
      <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={shade(COLORS.purpleDeep, -0.1)} />
      {/* big soft nebula clouds (brighter, so they read as their own colour) */}
      {([[460, 560, COLORS.pink], [1440, 640, COLORS.sky], [980, 260, COLORS.lavender], [200, 300, COLORS.lavender], [1700, 260, COLORS.pink]] as [number, number, string][]).map(([x, y, c], i) => (
        <g key={i} opacity={0.32}>{[[-120, 0, 130], [0, -60, 160], [120, 20, 120], [40, 80, 90]].map(([cx, cy, r], k) => <circle key={k} cx={x + cx} cy={y + cy} r={r} fill={c} />)}</g>
      ))}
      {/* tiny scattered stars */}
      {Array.from({ length: 70 }).map((_, i) => <circle key={i} cx={(i * 137) % 1920} cy={(i * 219) % 900 + 20} r={(i % 3) + 1} fill={COLORS.white} opacity={0.7} />)}
      {/* constellation edges + nodes */}
      {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.5} />)}
      {nodes.map(([x, y], i) => {
        const g = 0.6 + 0.4 * Math.sin(f / 9 + i);
        return <g key={i}><circle cx={x} cy={y} r={22} fill={COLORS.yellow} opacity={0.25 * g} /><path d={`M ${x} ${y - 16} l 5 11 l 11 5 l -11 5 l -5 11 l -5 -11 l -11 -5 l 11 -5 Z`} fill={COLORS.yellow} {...sm} /></g>;
      })}
      {/* ground mist so the mascot has somewhere to stand */}
      <ellipse cx={960} cy={1080} rx={1200} ry={200} fill={COLORS.wallNight} opacity={0.5} />
    </g>
  );
};

/** Inner theater: a grand cinema of the mind — a glowing screen, rows of red
 *  velvet seats, aisle lights. Where the daydreamer watches their own stories. */
export const InnerTheater: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.85 + 0.12 * Math.sin(f / 7);
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      {/* stage + glowing screen */}
      <rect x={0} y={0} width={CANVAS.width} height={120} fill={COLORS.redDark} />
      <rect x={360} y={120} width={1200} height={420} rx={20} fill={COLORS.shirtDark} {...xl} />
      <rect x={392} y={152} width={1136} height={356} rx={12} fill={COLORS.sky} opacity={glow} />
      {/* a dreamy scene on screen */}
      <circle cx={1120} cy={280} r={66} fill={COLORS.yellow} {...lg} />
      <path d="M 392 440 Q 960 320 1528 440 L 1528 508 L 392 508 Z" fill={COLORS.greenLeaf} />
      <g transform="translate(760 430)"><circle r={28} fill={COLORS.white} {...lg} /><path d="M 0 28 L 0 72 M 0 40 L -28 60 M 0 40 L 28 60" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      {/* side curtains */}
      <path d="M 0 0 L 320 0 Q 260 300 300 760 Q 160 700 0 760 Z" fill={COLORS.red} {...xl} />
      <path d="M 1920 0 L 1600 0 Q 1660 300 1620 760 Q 1760 700 1920 760 Z" fill={COLORS.red} {...xl} />
      {/* rows of seats */}
      {[0, 1, 2].map((r) => (
        <g key={r} transform={`translate(0 ${640 + r * 150}) scale(${1 + r * 0.14})`} style={{ transformOrigin: '960px 0px' }}>
          {Array.from({ length: 11 }).map((_, c) => (
            <g key={c} transform={`translate(${160 + c * 160} 0)`}>
              <rect x={-54} y={-30} width={108} height={90} rx={16} fill={COLORS.redDark} {...lg} />
              <rect x={-54} y={-80} width={108} height={70} rx={20} fill={shade(COLORS.redDark, 0.12)} {...lg} />
            </g>
          ))}
        </g>
      ))}
      {/* aisle floor lights */}
      {[300, 1620].map((x, i) => <ellipse key={i} cx={x} cy={900} rx={30} ry={10} fill={COLORS.yellow} opacity={0.5} />)}
    </g>
  );
};

/** Daydream realm: a vivid fantasy landscape — rolling hills, a far castle,
 *  floating islands, a rainbow, a bright sun. The "better" imagined world. */
export const DaydreamRealm: React.FC = () => {
  const f = useCurrentFrame();
  const floatY = Math.sin(f / 22) * 10;
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.sky} />
      <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.sky, -0.06)} />
      {/* sun + rays */}
      <circle cx={1560} cy={220} r={110} fill={COLORS.yellow} {...lg} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={1560 + Math.cos(a) * 130} y1={220 + Math.sin(a) * 130} x2={1560 + Math.cos(a) * 170} y2={220 + Math.sin(a) * 170} stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" />; })}
      {/* rainbow */}
      {[COLORS.red, COLORS.yellow, COLORS.greenLeaf, COLORS.sky, COLORS.lavender].map((c, i) => (
        <path key={i} d={`M ${200 + i * 20} 760 A ${520 - i * 20} ${520 - i * 20} 0 0 1 ${1240 - i * 20} 760`} fill="none" stroke={c} strokeWidth={26} />
      ))}
      {/* clouds */}
      {([[320, 200], [900, 150], [1180, 260]] as [number, number][]).map(([x, y], i) => (
        <g key={i}>{[[-60, 0, 44], [0, -16, 56], [60, 0, 44]].map(([cx, cy, r], k) => <circle key={k} cx={x + cx} cy={y + cy} r={r} fill={COLORS.white} opacity={0.95} />)}</g>
      ))}
      {/* floating islands */}
      {([[1400, 520, 0.8], [520, 480, 0.6]] as [number, number, number][]).map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y + floatY}) scale(${s})`}>
          <path d="M -120 0 Q 0 -40 120 0 Q 70 70 0 76 Q -70 70 -120 0 Z" fill={COLORS.woodDark} {...xl} />
          <path d="M -120 0 Q 0 -40 120 0 Q 50 6 0 10 Q -50 6 -120 0 Z" fill={COLORS.greenLeaf} {...lg} />
          <path d="M 0 10 Q -10 -20 0 -34" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
        </g>
      ))}
      {/* hills */}
      <path d="M 0 700 Q 480 600 960 680 Q 1440 600 1920 700 L 1920 1080 L 0 1080 Z" fill={COLORS.greenDark} />
      <rect x={0} y={820} width={CANVAS.width} height={CANVAS.height - 820} fill={COLORS.greenLeaf} />
      {/* a far castle on a hill */}
      <g transform="translate(960 690)">
        <rect x={-90} y={-30} width={180} height={120} fill={COLORS.ledGrey} {...lg} />
        <rect x={-90} y={-70} width={40} height={60} fill={COLORS.ledGrey} {...lg} />
        <rect x={50} y={-70} width={40} height={60} fill={COLORS.ledGrey} {...lg} />
        {[-70, 70].map((x, i) => <path key={i} d={`M ${x - 20} -70 l 20 -30 l 20 30 Z`} fill={COLORS.red} {...sm} />)}
        <rect x={-18} y={30} width={36} height={60} fill={COLORS.woodDark} />
      </g>
    </g>
  );
};

/** Pacing room: an ordinary room with a daydreamer's tell — a worn oval path
 *  paced into the rug, looping footprints, a bed and a window. */
export const PacingRoom: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={COLORS.wood} floorY={820} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.lavender, 0.08)} opacity={0.7} />
    ))}
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={shade(COLORS.lavender, 0.14)} />
    {/* window + framed picture */}
    <g transform="translate(330 290)"><WindowDay /></g>
    <g transform="translate(1120 300)"><FramedPicture /></g>
    {/* worn oval pacing path on the floor */}
    <ellipse cx={900} cy={950} rx={520} ry={120} fill={shade(COLORS.wood, 0.1)} />
    <ellipse cx={900} cy={950} rx={520} ry={120} fill="none" stroke={shade(COLORS.wood, 0.2)} strokeWidth={STROKE.lg} strokeDasharray="30 30" opacity={0.6} />
    {/* looping footprints */}
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const x = 900 + Math.cos(a) * 500; const y = 950 + Math.sin(a) * 110; return <ellipse key={i} cx={x} cy={y} rx={20} ry={11} fill={shade(COLORS.wood, 0.26)} opacity={0.5} transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} />; })}
    {/* bed */}
    <g transform="translate(1540 720)">
      <rect x={-200} y={-30} width={360} height={170} rx={24} fill={COLORS.pink} {...xl} />
      <rect x={-200} y={-100} width={130} height={90} rx={24} fill={COLORS.pink} {...xl} />
      <rect x={-184} y={-70} width={90} height={44} rx={16} fill={COLORS.white} opacity={0.7} {...std} />
      <rect x={-60} y={-10} width={220} height={120} rx={18} fill={COLORS.sky} {...std} />
    </g>
  </g>
);

/** Bus window: the interior of a bus — a big window with scenery sliding by,
 *  seat backs, overhead rail and handles. The classic commute daydream spot. */
export const BusWindow: React.FC = () => {
  const f = useCurrentFrame();
  const slide = (f * 3) % 400;
  return (
    <g>
      <WallFloor wall={COLORS.greenTeal} floor={COLORS.shirtDark} floorY={860} stripe={false} />
      {/* big window band */}
      <rect x={0} y={120} width={CANVAS.width} height={460} fill={COLORS.sky} />
      <rect x={0} y={120} width={CANVAS.width} height={200} fill={shade(COLORS.sky, -0.06)} />
      {/* scenery sliding past */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = ((i * 400 - slide) % 2200) - 140;
        return <g key={i}><rect x={x} y={360} width={120} height={200} fill={shade(COLORS.greenTeal, 0.2)} opacity={0.7} /><circle cx={x + 200} cy={300} r={44} fill={COLORS.greenDark} opacity={0.5} /><rect x={x + 180} y={340} width={16} height={60} fill={COLORS.woodDark} opacity={0.5} /></g>;
      })}
      <circle cx={1600} cy={230} r={70} fill={COLORS.yellow} opacity={0.8} />
      {/* window frame mullions */}
      <rect x={0} y={120} width={CANVAS.width} height={24} fill={COLORS.ledGrey} />
      <rect x={0} y={556} width={CANVAS.width} height={24} fill={COLORS.ledGrey} />
      {[480, 960, 1440].map((x, i) => <rect key={i} x={x - 12} y={120} width={24} height={460} fill={COLORS.ledGrey} />)}
      {/* overhead rail + handles */}
      <rect x={0} y={80} width={CANVAS.width} height={14} rx={7} fill={COLORS.ledGrey} {...std} />
      {[220, 620, 1020, 1420, 1760].map((x, i) => <g key={i}><line x1={x} y1={90} x2={x} y2={160} {...sm} /><circle cx={x} cy={180} r={22} fill="none" {...std} /></g>)}
      {/* seat back in the foreground */}
      <rect x={-40} y={660} width={520} height={260} rx={24} fill={COLORS.blueDiagram} {...xl} />
      <rect x={-40} y={660} width={520} height={70} rx={24} fill={shade(COLORS.blueDiagram, 0.14)} />
      <rect x={1480} y={700} width={480} height={240} rx={24} fill={COLORS.blueDiagram} {...xl} />
    </g>
  );
};

/** Witching bedroom: the specific dread of 3 a.m. — a huge low moon, a glowing
 *  3:00 clock, long shadows creeping up the wall. */
export const WitchingBedroom: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.7 + 0.2 * Math.sin(f / 6);
  return (
    <g>
      <WallFloor wall={shade(COLORS.purpleDeep, 0.08)} floor={shade(COLORS.purpleDeep, 0.28)} floorY={840} stripe={false} />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={i * 84} y={0} width={42} height={600} fill={shade(COLORS.purpleDeep, -0.06)} opacity={0.5} />
      ))}
      <rect x={0} y={600} width={CANVAS.width} height={240} fill={shade(COLORS.purpleDeep, 0.14)} />
      {/* window with a huge low moon */}
      <g transform="translate(360 320)">
        <rect x={-170} y={-170} width={340} height={360} rx={14} fill={COLORS.wallNight} {...xl} />
        <circle cx={40} cy={40} r={96} fill={COLORS.yellowSoft} opacity={0.9} />
        {[[-70, -70], [90, -110], [-110, 80], [60, 140]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill={COLORS.white} opacity={0.8} />)}
        <line x1={0} y1={-170} x2={0} y2={190} {...std} />
        <line x1={-170} y1={10} x2={170} y2={10} {...std} />
      </g>
      {/* long creeping shadow on the wall */}
      <path d="M 900 1080 L 1020 300 L 1120 300 L 1160 1080 Z" fill={shade(COLORS.purpleDeep, -0.2)} opacity={0.4} />
      {/* framed picture (slightly crooked, uneasy) */}
      <g transform="translate(1180 300) rotate(-4)"><FramedPicture /></g>
      {/* nightstand + glowing 3:00 clock */}
      <g transform="translate(1540 700)">
        <rect x={-110} y={60} width={220} height={180} rx={14} fill={COLORS.woodDark} {...xl} />
        <ellipse cx={0} cy={0} rx={150} ry={70} fill={COLORS.red} opacity={0.16 * glow} />
        <rect x={-96} y={-44} width={192} height={92} rx={14} fill={COLORS.shirtDarker} {...lg} />
        <text x={0} y={30} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={72} fill={COLORS.red} opacity={glow}>3:00</text>
      </g>
      {/* bed */}
      <g transform="translate(760 740)">
        <rect x={-320} y={-30} width={640} height={190} rx={28} fill={shade(COLORS.lavender, 0.34)} {...xl} />
        <rect x={-320} y={-110} width={200} height={120} rx={28} fill={shade(COLORS.lavender, 0.28)} {...xl} />
        <rect x={-300} y={-70} width={140} height={60} rx={20} fill={COLORS.whiteShade} opacity={0.4} {...std} />
        <rect x={-150} y={-10} width={460} height={140} rx={22} fill={shade(COLORS.sky, 0.34)} {...std} />
      </g>
    </g>
  );
};

/** Night street: a deserted small-hours street — dark buildings, one streetlight,
 *  an empty road, a parked car, a low moon and a little ground fog. */
export const NightStreet: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.8 + 0.1 * Math.sin(f / 8);
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      <rect x={0} y={0} width={CANVAS.width} height={560} fill={COLORS.wallNight} />
      <circle cx={960} cy={200} r={80} fill={COLORS.yellowSoft} opacity={0.85} />
      {[[200, 120], [560, 90], [1360, 150], [1700, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill={COLORS.white} opacity={0.8} />)}
      {/* building silhouettes with mostly-dark windows */}
      {[[20, 360, 260, 300], [300, 300, 220, 360], [1380, 320, 240, 340], [1640, 280, 260, 380]].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill={shade(COLORS.purpleDeep, 0.22)} />
          {Array.from({ length: 6 }).map((_, k) => <rect key={k} x={x + 24 + (k % 2) * 90} y={y + 30 + Math.floor(k / 2) * 80} width={44} height={50} rx={5} fill={(i + k) === 3 ? COLORS.yellow : shade(COLORS.purpleDeep, 0.05)} opacity={0.85} />)}
        </g>
      ))}
      {/* road */}
      <rect x={0} y={760} width={CANVAS.width} height={CANVAS.height - 760} fill={shade(COLORS.purpleDeep, 0.3)} />
      {[300, 700, 1100, 1500].map((x, i) => <rect key={i} x={x} y={900} width={100} height={18} rx={8} fill={COLORS.yellow} opacity={0.4} />)}
      {/* lone streetlight */}
      <g transform="translate(560 540)">
        <rect x={-12} y={0} width={24} height={260} rx={10} fill={COLORS.shirtDark} {...lg} />
        <rect x={-50} y={-30} width={100} height={44} rx={14} fill={COLORS.shirtDark} {...xl} />
        <rect x={-38} y={-20} width={76} height={26} rx={10} fill={COLORS.yellow} opacity={flick} />
        <path d="M -38 6 L -130 280 L 130 280 L 38 6 Z" fill={COLORS.yellowSoft} opacity={0.12 * flick} />
      </g>
      {/* a parked car */}
      <g transform="translate(1300 820)">
        <path d="M -160 20 L -120 -50 L 120 -50 L 160 20 Z" fill={COLORS.red} {...xl} />
        <rect x={-170} y={20} width={340} height={70} rx={20} fill={COLORS.redDark} {...xl} />
        <rect x={-96} y={-40} width={90} height={54} rx={8} fill={COLORS.wallNight} />
        <rect x={10} y={-40} width={90} height={54} rx={8} fill={COLORS.wallNight} />
        <circle cx={-100} cy={92} r={34} fill={COLORS.shirtDark} {...lg} />
        <circle cx={100} cy={92} r={34} fill={COLORS.shirtDark} {...lg} />
      </g>
      {/* ground fog */}
      <ellipse cx={960} cy={1060} rx={1100} ry={120} fill={COLORS.wallNight} opacity={0.4} />
    </g>
  );
};

/** Brain night-shift: the brain as an office building at night — nearly every
 *  department dark and asleep, except one red "FEAR" floor, wide awake. */
export const BrainNightshift: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.6 + 0.3 * Math.abs(Math.sin(f / 7));
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.purpleDeep} />
      <rect x={0} y={0} width={CANVAS.width} height={420} fill={COLORS.wallNight} opacity={0.7} />
      {[[200, 120], [900, 90], [1500, 160], [1760, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill={COLORS.white} opacity={0.7} />)}
      {/* the brain-building, shaped like a brain outline filled with window-rooms */}
      <g transform="translate(960 560)">
        <path d="M -380 160 Q -440 -120 -200 -200 Q -120 -320 40 -270 Q 200 -330 300 -200 Q 460 -130 380 60 Q 420 240 220 290 Q 60 380 -90 300 Q -360 300 -380 160 Z" fill={shade(COLORS.pink, 0.1)} {...xl} />
        {/* grid of office windows, mostly dark */}
        {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 9 }).map((_, c) => {
          const x = -320 + c * 78; const y = -170 + r * 90;
          const fear = r === 2 && (c === 6 || c === 7);
          return <rect key={`${r}-${c}`} x={x} y={y} width={58} height={66} rx={6} fill={fear ? COLORS.red : shade(COLORS.purpleDeep, -0.02)} opacity={fear ? glow : 0.55} {...sm} />;
        }))}
      </g>
      {/* "FEAR" dept label */}
      <g transform="translate(1340 580)">
        <rect x={-70} y={-24} width={140} height={48} rx={10} fill={COLORS.red} {...lg} opacity={glow} />
        <text x={0} y={12} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.white}>FEAR</text>
      </g>
      {/* dark ground */}
      <rect x={0} y={880} width={CANVAS.width} height={CANVAS.height - 880} fill={shade(COLORS.purpleDeep, 0.2)} />
    </g>
  );
};

/** Dawn window: warm sunrise pouring into a bedroom — the relief of morning. */
export const DawnWindow: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.pink} floor={COLORS.wood} floorY={820} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.pink, 0.07)} opacity={0.7} />
    ))}
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={COLORS.bgCream} />
    {/* big window with sunrise */}
    <g transform="translate(1480 330)">
      <rect x={-200} y={-200} width={400} height={400} rx={16} fill={COLORS.sky} {...xl} />
      <rect x={-200} y={-200} width={400} height={180} fill={shade(COLORS.sky, -0.06)} />
      <rect x={-200} y={80} width={400} height={120} fill={COLORS.yellowSoft} opacity={0.6} />
      <circle cx={0} cy={80} r={80} fill={COLORS.yellow} {...lg} />
      {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 96} y1={80 + Math.sin(a) * 96} x2={Math.cos(a) * 130} y2={80 + Math.sin(a) * 130} stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" />; })}
      <path d="M -200 120 Q 0 90 200 120 L 200 200 L -200 200 Z" fill={COLORS.greenLeaf} />
      <line x1={0} y1={-200} x2={0} y2={200} {...std} />
      <line x1={-200} y1={0} x2={200} y2={0} {...std} />
      {/* two little birds */}
      <path d="M -120 -120 q 14 -12 28 0 q 14 -12 28 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    </g>
    {/* warm light pool on the floor */}
    <ellipse cx={1100} cy={900} rx={520} ry={120} fill={COLORS.yellowSoft} opacity={0.3} />
    {/* bed with a relieved sleeper spot */}
    <g transform="translate(640 740)">
      <rect x={-320} y={-30} width={640} height={180} rx={28} fill={COLORS.lavender} {...xl} />
      <rect x={-320} y={-110} width={200} height={120} rx={28} fill={COLORS.lavender} {...xl} />
      <rect x={-300} y={-70} width={140} height={60} rx={20} fill={COLORS.white} {...std} />
      <rect x={-150} y={-10} width={460} height={130} rx={22} fill={COLORS.sky} {...std} />
    </g>
    {/* potted plant */}
    <g transform="translate(120 660)"><path d="M 0 -20 Q -50 -110 -16 -160 Q 6 -110 0 -20 Z" fill={COLORS.greenLeaf} {...lg} /><path d="M 0 -20 Q 50 -120 20 -172 Q -4 -110 0 -20 Z" fill={COLORS.greenLeaf} {...lg} /><path d="M -56 0 L 56 0 L 40 110 L -40 110 Z" fill={COLORS.wood} {...xl} /></g>
  </g>
);

/** Thinker nook: a warm bay-window seat for pondering — cushions, a mug, a small
 *  stack of books, a plant, soft lamplight. Where healthy reflection happens. */
export const ThinkerNook: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.yellowSoft} floor={COLORS.wood} floorY={820} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.yellowSoft, 0.08)} opacity={0.6} />
    ))}
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={COLORS.bgCream} />
    {/* big bay window with a calm sky */}
    <g transform="translate(720 350)">
      <rect x={-320} y={-260} width={640} height={420} rx={20} fill={COLORS.sky} {...xl} />
      <rect x={-320} y={-260} width={640} height={160} fill={shade(COLORS.sky, -0.05)} />
      <circle cx={180} cy={-150} r={50} fill={COLORS.yellow} {...lg} />
      {[[-200, -180], [-60, -210], [60, -140]].map(([x, y], i) => <g key={i}>{[[-40, 0, 30], [0, -12, 38], [40, 0, 30]].map(([cx, cy, r], k) => <circle key={k} cx={x + cx} cy={y + cy} r={r} fill={COLORS.white} opacity={0.9} />)}</g>)}
      <path d="M -320 60 Q 0 20 320 60 L 320 160 L -320 160 Z" fill={COLORS.greenLeaf} />
      {[-320, -107, 107, 320].map((x, i) => <line key={i} x1={x} y1={-260} x2={x} y2={160} {...std} />)}
      <line x1={-320} y1={-50} x2={320} y2={-50} {...std} />
      {/* window seat with cushions */}
      <rect x={-320} y={150} width={640} height={70} rx={16} fill={COLORS.lavender} {...xl} />
      <rect x={-280} y={110} width={120} height={70} rx={20} fill={COLORS.pink} {...std} />
      <rect x={-120} y={110} width={120} height={70} rx={20} fill={COLORS.greenTeal} {...std} />
    </g>
    {/* floor lamp */}
    <g transform="translate(1560 420)"><path d="M -70 0 L 70 0 L 44 -90 L -44 -90 Z" fill={COLORS.yellow} {...xl} /><rect x={-8} y={0} width={16} height={330} fill={COLORS.woodDark} {...lg} /><ellipse cx={0} cy={338} rx={70} ry={20} fill={COLORS.woodDark} {...lg} /></g>
    <ellipse cx={1480} cy={760} rx={200} ry={80} fill={COLORS.yellowSoft} opacity={0.25} />
    {/* side table with mug + books */}
    <g transform="translate(1320 760)">
      <rect x={-90} y={0} width={180} height={30} rx={8} fill={COLORS.woodDark} {...lg} />
      <rect x={-80} y={30} width={20} height={70} fill={COLORS.woodDark} /><rect x={60} y={30} width={20} height={70} fill={COLORS.woodDark} />
      {[COLORS.red, COLORS.sky].map((c, i) => <rect key={i} x={-70} y={-16 - i * 18} width={90} height={18} rx={4} fill={c} {...sm} />)}
      <g transform="translate(50 -20)"><path d="M -26 -18 L 26 -18 L 20 24 L -20 24 Z" fill={COLORS.white} {...lg} /><path d="M 26 -8 q 22 0 22 20 q 0 14 -20 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} /></g>
    </g>
    {/* potted plant */}
    <g transform="translate(130 650)"><path d="M 0 -20 Q -50 -110 -16 -160 Q 6 -110 0 -20 Z" fill={COLORS.greenLeaf} {...lg} /><path d="M 0 -20 Q 50 -120 20 -172 Q -4 -110 0 -20 Z" fill={COLORS.greenLeaf} {...lg} /><path d="M -56 0 L 56 0 L 40 110 L -40 110 Z" fill={COLORS.red} {...xl} /></g>
  </g>
);

/** Signpost crossroads: a surreal junction where many paths diverge under a big
 *  sky, each with a signpost — the overwhelm of endless options. */
export const SignpostCrossroads: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.sky} />
    <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.sky, -0.05)} />
    <circle cx={1600} cy={200} r={80} fill={COLORS.yellow} {...lg} />
    {[[300, 160], [700, 120], [1100, 200]].map(([x, y], i) => <g key={i}>{[[-50, 0, 36], [0, -14, 46], [50, 0, 36]].map(([cx, cy, r], k) => <circle key={k} cx={x + cx} cy={y + cy} r={r} fill={COLORS.white} opacity={0.9} />)}</g>)}
    {/* hills */}
    <path d="M 0 620 Q 480 540 960 600 Q 1440 540 1920 620 L 1920 760 L 0 760 Z" fill={COLORS.greenTeal} opacity={0.7} />
    <rect x={0} y={700} width={CANVAS.width} height={CANVAS.height - 700} fill={COLORS.greenLeaf} />
    {/* diverging paths from a central point */}
    {([[-700, 1.0], [-250, 1.0], [250, 1.0], [760, 1.0]] as [number, number][]).map(([dx], i) => (
      <path key={i} d={`M ${960 + dx} 1080 Q ${960 + dx / 2} 820 960 720 L 1000 720 Q ${1000 + dx / 2} 820 ${1000 + dx} 1080 Z`} fill={COLORS.wood} opacity={0.8} />
    ))}
    {/* central signpost cluster */}
    <g transform="translate(1500 560)">
      <rect x={-12} y={-30} width={24} height={280} rx={10} fill={COLORS.woodDark} {...xl} />
      {[[-1, -10], [1, 30], [-1, 70]].map(([d, y], i) => (
        <g key={i} transform={`translate(0 ${y})`}><path d={d > 0 ? `M -8 -20 L 110 -20 L 134 0 L 110 20 L -8 20 Z` : `M 8 -20 L -110 -20 L -134 0 L -110 20 L 8 20 Z`} fill={[COLORS.red, COLORS.yellow, COLORS.sky][i]} {...lg} /></g>
      ))}
    </g>
  </g>
);

/** Overthink stairwell: a zig-zag staircase descending into ever-darker levels. */
export const OverthinkStairwell: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.wallNight} />
    {/* walls getting darker as we go down */}
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={0} y={i * 216} width={CANVAS.width} height={216} fill={shade(COLORS.purpleDeep, i * 0.08)} opacity={0.6} />)}
    {/* descending zig-zag staircase on the right */}
    {Array.from({ length: 8 }).map((_, i) => {
      const x = 1720 - i * 150; const y = 180 + i * 110;
      return (
        <g key={i}>
          <path d={`M ${x} ${y} l 150 0 l 0 60 l -150 0 Z`} fill={shade(COLORS.lavender, i * 0.08)} {...lg} />
          <path d={`M ${x} ${y} l 40 -30 l 150 0 l -40 30 Z`} fill={shade(COLORS.lavender, i * 0.08 + 0.1)} {...sm} />
          <path d={`M ${x + 150} ${y} l 40 -30 l 0 60 l -40 30 Z`} fill={shade(COLORS.lavender, i * 0.08 + 0.18)} {...sm} />
        </g>
      );
    })}
    {/* a dim hanging bulb + rail */}
    <line x1={400} y1={0} x2={400} y2={120} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
    <circle cx={400} cy={140} r={26} fill={COLORS.yellowSoft} opacity={0.5} />
    <ellipse cx={400} cy={440} rx={260} ry={340} fill={COLORS.yellowSoft} opacity={0.06} />
    {/* railing */}
    <path d="M 60 300 L 700 900" stroke={COLORS.woodDark} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.5} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={120 + i * 150} y1={300 + i * 140} x2={120 + i * 150} y2={420 + i * 140} stroke={COLORS.woodDark} strokeWidth={STROKE.lg} opacity={0.4} />)}
    {/* "DEEPER" arrow */}
    <g transform="translate(300 760)"><path d="M 0 -40 L 0 40 M -24 16 L 0 40 L 24 16" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} /></g>
  </g>
);

/** Misty clearing: a calm, open grassy clearing in soft morning light — the way
 *  back out of the spiral. */
export const MistyClearing: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 24) * 14;
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.sky} />
      <rect x={0} y={280} width={CANVAS.width} height={360} fill={COLORS.yellowSoft} opacity={0.4} />
      <circle cx={960} cy={420} r={100} fill={COLORS.yellow} opacity={0.85} />
      <circle cx={960} cy={420} r={150} fill={COLORS.yellowSoft} opacity={0.3} />
      {/* soft distant trees */}
      {[220, 520, 1400, 1720].map((x, i) => <g key={i} opacity={0.5}><rect x={x - 12} y={560} width={24} height={120} fill={COLORS.woodDark} /><circle cx={x} cy={540} r={70} fill={COLORS.greenDark} /></g>)}
      {/* ground */}
      <path d="M 0 660 Q 480 600 960 650 Q 1440 600 1920 660 L 1920 1080 L 0 1080 Z" fill={COLORS.greenDark} opacity={0.7} />
      <rect x={0} y={780} width={CANVAS.width} height={CANVAS.height - 780} fill={COLORS.greenLeaf} />
      {/* drifting mist bands */}
      {[620, 740, 860].map((y, i) => (
        <g key={i} transform={`translate(${drift * (i % 2 ? 1 : -1)} 0)`} opacity={0.4}>
          {[200, 700, 1200, 1700].map((x, k) => <ellipse key={k} cx={x} cy={y} rx={200} ry={30} fill={COLORS.white} />)}
        </g>
      ))}
      {/* a few gentle flowers */}
      {[[300, 920, COLORS.pink], [1600, 940, COLORS.red], [760, 980, COLORS.yellow]].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}><line x1={0} y1={0} x2={0} y2={40} stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={Math.cos(k * 1.26) * 16} cy={Math.sin(k * 1.26) * 16} r={11} fill={c as string} {...sm} />)}<circle r={9} fill={COLORS.yellowDark} /></g>
      ))}
    </g>
  );
};

/** Office break room: a counter with a coffee machine, a water cooler, a notice
 *  board and a small table — where workplace envy quietly simmers. */
export const BreakRoom: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.whiteShade} floorY={840} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => (
      <rect key={`st${i}`} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.greenTeal, 0.08)} opacity={0.7} />
    ))}
    {/* a wall clock + a framed motivational poster to break the wall */}
    <g transform="translate(1400 220)"><circle r={60} fill={COLORS.white} {...xl} /><line x1={0} y1={0} x2={0} y2={-40} {...std} /><line x1={0} y1={0} x2={28} y2={10} {...std} /><circle r={6} fill={COLORS.red} /></g>
    <g transform="translate(700 240)"><rect x={-120} y={-90} width={240} height={180} rx={10} fill={COLORS.white} {...xl} /><rect x={-120} y={-90} width={240} height={40} rx={10} fill={COLORS.yellow} {...lg} /><circle cx={0} cy={20} r={34} fill={COLORS.sky} {...sm} /><path d="M -80 70 l 160 0" stroke={COLORS.whiteShade} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
    <rect x={0} y={520} width={CANVAS.width} height={60} fill={COLORS.white} opacity={0.5} />
    {Array.from({ length: 19 }).map((_, i) => <rect key={i} x={i * 100 + 98} y={520} width={4} height={60} fill={shade(COLORS.greenTeal, 0.12)} opacity={0.5} />)}
    {/* floor tiles */}
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={i * 200} y={842} width={2} height={CANVAS.height - 842} fill={shade(COLORS.whiteShade, 0.18)} />)}
    {/* counter */}
    <rect x={0} y={660} width={900} height={180} rx={10} fill={COLORS.wood} {...xl} />
    <rect x={0} y={660} width={900} height={34} rx={8} fill={COLORS.white} {...std} />
    {/* coffee machine */}
    <g transform="translate(220 560)"><rect x={-70} y={-110} width={140} height={210} rx={14} fill={COLORS.shirtDark} {...xl} /><rect x={-50} y={-86} width={100} height={60} rx={8} fill={COLORS.sky} opacity={0.5} /><rect x={-30} y={30} width={60} height={30} rx={6} fill={COLORS.ledGrey} /><circle cx={-40} cy={-56} r={8} fill={COLORS.red} /></g>
    {/* a couple of mugs */}
    {[520, 600].map((x, i) => <g key={i} transform={`translate(${x} 630)`}><rect x={-22} y={-26} width={44} height={44} rx={8} fill={[COLORS.red, COLORS.yellow][i]} {...lg} /><path d="M 22 -16 q 18 0 18 16 q 0 12 -16 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} /></g>)}
    {/* notice board */}
    <g transform="translate(1180 300)"><rect x={-150} y={-120} width={300} height={240} rx={10} fill={COLORS.wood} {...xl} />{([[-80, -60, COLORS.yellowSoft], [40, -70, COLORS.sky], [-30, 30, COLORS.pink]] as [number, number, string][]).map(([x, y, c], i) => <g key={i} transform={`rotate(${i % 2 ? 5 : -5} ${x} ${y})`}><rect x={x - 46} y={y - 40} width={92} height={80} fill={c} {...sm} /><circle cx={x} cy={y - 32} r={6} fill={COLORS.red} /></g>)}</g>
    {/* water cooler */}
    <g transform="translate(1620 560)"><rect x={-60} y={-40} width={120} height={200} rx={12} fill={COLORS.white} {...xl} /><path d="M -50 -40 Q -50 -140 0 -140 Q 50 -140 50 -40 Z" fill={COLORS.sky} opacity={0.6} {...lg} /><rect x={-30} y={40} width={60} height={30} rx={6} fill={COLORS.blueDiagram} /></g>
    {/* small round table */}
    <g transform="translate(760 840)"><ellipse cx={0} cy={0} rx={150} ry={40} fill={COLORS.lavender} {...xl} /><rect x={-14} y={30} width={28} height={120} fill={COLORS.woodDark} {...lg} /></g>
  </g>
);

/** Celebration: a party scene — a CONGRATS banner, balloons, streamers, confetti
 *  and a little cake. Someone's good news; not everyone is thrilled. */
export const Celebration: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <WallFloor wall={COLORS.wallNight} floor={COLORS.purpleDeep} floorY={840} stripe={false} />
      {/* diagonal party streamers fill the upper wall */}
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={`str${i}`} d={`M ${i * 220 - 100} 0 Q ${i * 220} 160 ${i * 220 + 100} 0`} fill="none" stroke={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.pink][i % 5]} strokeWidth={STROKE.lg} opacity={0.5} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={`st${i}`} x={i * 170} y={0} width={30} height={560} fill={shade(COLORS.wallNight, 0.1)} opacity={0.5} transform={`rotate(8 ${i * 170} 280)`} />
      ))}
      {/* banner */}
      <path d="M 100 120 Q 960 60 1820 120" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.sm} />
      {'CONGRATS'.split('').map((ch, i) => (
        <g key={i} transform={`translate(${320 + i * 160} ${150 + Math.sin(i) * 10}) rotate(${(i - 4) * 3})`}>
          <path d="M -54 -40 L 54 -40 L 54 30 L 0 64 L -54 30 Z" fill={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.pink, COLORS.lavender, COLORS.greenTeal, COLORS.hoodie][i]} {...lg} />
          <text x={0} y={6} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={48} fill={COLORS.white}>{ch}</text>
        </g>
      ))}
      {/* balloons */}
      {([[200, 400, COLORS.red], [1720, 380, COLORS.sky], [360, 520, COLORS.yellow], [1560, 540, COLORS.pink]] as [number, number, string][]).map(([x, y, c], i) => {
        const bob = Math.sin(f / 16 + i) * 12;
        return <g key={i} transform={`translate(${x} ${y + bob})`}><path d="M 0 60 Q -70 44 -70 -16 Q -70 -90 0 -90 Q 70 -90 70 -16 Q 70 44 0 60 Z" fill={c} {...xl} /><path d="M 0 60 L 0 200" stroke={COLORS.outline} strokeWidth={STROKE.sm} /></g>;
      })}
      {/* confetti */}
      {Array.from({ length: 30 }).map((_, i) => <rect key={i} x={(i * 127) % 1920} y={((i * 83) % 500) + 200} width={16} height={16} rx={3} fill={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.pink][i % 5]} transform={`rotate(${i * 30} ${(i * 127) % 1920} ${((i * 83) % 500) + 200})`} opacity={0.8} />)}
      {/* a cake on a table */}
      <g transform="translate(960 800)">
        <ellipse cx={0} cy={60} rx={180} ry={40} fill={COLORS.wood} {...xl} />
        <rect x={-110} y={-40} width={220} height={100} rx={14} fill={COLORS.pink} {...xl} />
        <rect x={-110} y={-40} width={220} height={30} rx={14} fill={COLORS.white} {...lg} />
        {[-70, -24, 24, 70].map((x, i) => <g key={i}><rect x={x - 4} y={-90} width={8} height={50} fill={COLORS.yellow} /><path d="M 0 0 q -6 -12 0 -20 q 6 8 0 20 Z" transform={`translate(${x} -92)`} fill={COLORS.red} {...sm} /></g>)}
      </g>
    </g>
  );
};

/** Coffee catch-up: a bright daytime cafe — two chairs at a round table, a counter
 *  with pastries, a chalk menu and a window. Where a friend reveals their colours. */
export const CoffeeCatchup: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCreamDark} floor={COLORS.wood} floorY={840} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.bgCreamDark, 0.06)} opacity={0.7} />)}
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.bgCreamDark, 0.04)} />
    {/* window with day */}
    <g transform="translate(330 300)"><WindowDay /></g>
    {/* chalk menu */}
    <g transform="translate(1180 290)"><rect x={-150} y={-130} width={300} height={260} rx={12} fill={COLORS.shirtDark} {...xl} /><rect x={-150} y={-130} width={300} height={44} rx={12} fill={shade(COLORS.shirtDark, 0.2)} /><text x={0} y={-100} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.white}>MENU</text>{[0, 1, 2, 3].map((i) => <rect key={i} x={-120} y={-56 + i * 44} width={i % 2 ? 180 : 220} height={10} rx={5} fill={COLORS.white} opacity={0.5} />)}</g>
    {/* counter with pastries */}
    <g transform="translate(1640 620)"><rect x={-160} y={0} width={320} height={160} rx={10} fill={COLORS.woodDark} {...xl} /><rect x={-160} y={-40} width={320} height={44} rx={8} fill={COLORS.wood} {...lg} />{[-90, -20, 50].map((x, i) => <circle key={i} cx={x} cy={-18} r={22} fill={[COLORS.yellow, COLORS.red, COLORS.hoodie][i]} {...sm} />)}</g>
    {/* round cafe table with two coffees */}
    <g transform="translate(900 820)">
      <ellipse cx={0} cy={0} rx={200} ry={54} fill={COLORS.white} {...xl} />
      <rect x={-16} y={40} width={32} height={150} fill={COLORS.woodDark} {...lg} />
      <ellipse cx={0} cy={190} rx={90} ry={24} fill={COLORS.woodDark} {...lg} />
      {[-90, 90].map((x, i) => <g key={i} transform={`translate(${x} -10)`}><path d="M -30 -14 L 30 -14 L 24 26 L -24 26 Z" fill={[COLORS.red, COLORS.sky][i]} {...lg} /><path d="M 30 -4 q 20 0 20 18 q 0 12 -18 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} /></g>)}
    </g>
  </g>
);

/** Masquerade hall: an ornate ballroom hung with masks and drapes — complexes as
 *  the masks we wear without knowing it. */
export const MasqueradeHall: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.purpleDeep} floor={COLORS.woodDark} floorY={840} stripe={false} />
    {/* damask pattern */}
    {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
      <path key={`${r}-${c}`} d={`M ${80 + c * 170 + (r % 2) * 85} ${70 + r * 90} q 30 -30 60 0 q -30 30 -60 0 Z`} fill="none" stroke={shade(COLORS.purpleDeep, -0.1)} strokeWidth={STROKE.sm} opacity={0.6} />
    )))}
    {/* side drapes */}
    <path d="M 0 0 L 240 0 Q 180 400 220 760 Q 100 700 0 760 Z" fill={COLORS.redDark} {...xl} />
    <path d="M 1920 0 L 1680 0 Q 1740 400 1700 760 Q 1820 700 1920 760 Z" fill={COLORS.redDark} {...xl} />
    {/* chandelier */}
    <line x1={960} y1={0} x2={960} y2={110} {...sm} />
    <g transform="translate(960 160)"><ellipse rx={120} ry={30} fill={COLORS.yellow} {...lg} />{[-80, -40, 0, 40, 80].map((x, i) => <circle key={i} cx={x} cy={20} r={12} fill={COLORS.yellowSoft} />)}</g>
    <ellipse cx={960} cy={420} rx={300} ry={360} fill={COLORS.yellowSoft} opacity={0.07} />
    {/* masks on the wall */}
    {([[360, 300, COLORS.yellow], [1560, 300, COLORS.sky], [620, 230, COLORS.pink], [1320, 230, COLORS.greenLeaf]] as [number, number, string][]).map(([x, y, c], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${i % 2 ? 6 : -6})`}>
        <path d="M -70 -40 Q -80 50 0 70 Q 80 50 70 -40 Q 0 -70 -70 -40 Z" fill={c} {...xl} />
        <ellipse cx={-30} cy={-6} rx={18} ry={12} fill={COLORS.outline} /><ellipse cx={30} cy={-6} rx={18} ry={12} fill={COLORS.outline} />
        <path d="M 0 -40 l 12 -30 l -24 0 Z" fill={shade(c, 0.2)} {...sm} />
      </g>
    ))}
  </g>
);

/** Pedestal gallery: a museum of plinths and busts — the ego on display. */
export const PedestalGallery: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCreamDark} floor={COLORS.whiteShade} floorY={840} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.bgCreamDark, 0.05)} opacity={0.7} />)}
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.bgCreamDark, 0.03)} />
    {/* arched alcoves */}
    {[300, 1620].map((x, i) => <g key={i} transform={`translate(${x} 320)`}><path d="M -120 160 L -120 -40 Q -120 -160 0 -160 Q 120 -160 120 -40 L 120 160 Z" fill={shade(COLORS.bgCreamDark, 0.08)} {...lg} /></g>)}
    {/* row of pedestals with busts */}
    {[520, 960, 1400].map((x, i) => (
      <g key={i} transform={`translate(${x} 700)`}>
        <rect x={-70} y={0} width={140} height={150} rx={6} fill={COLORS.ledGrey} {...xl} />
        <rect x={-86} y={-16} width={172} height={28} rx={6} fill={shade(COLORS.ledGrey, 0.14)} {...lg} />
        {/* bust */}
        <circle cx={0} cy={-70} r={46} fill={COLORS.white} {...lg} />
        <path d="M -56 -10 Q 0 -70 56 -10 Z" fill={COLORS.white} {...lg} />
        <circle cx={-16} cy={-74} r={6} fill={COLORS.outline} /><circle cx={16} cy={-74} r={6} fill={COLORS.outline} />
      </g>
    ))}
    {/* a red velvet rope */}
    <path d="M 160 760 Q 300 800 440 760" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <rect x={150} y={740} width={16} height={80} rx={6} fill={COLORS.yellowDark} />
    <rect x={434} y={740} width={16} height={80} rx={6} fill={COLORS.yellowDark} />
  </g>
);

/** Analysis room: a classic psychoanalysis study — a chaise couch, an analyst's
 *  chair + notebook, a bookshelf, a diploma and a dim lamp. */
export const AnalysisRoom: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenDark} floor={COLORS.woodDark} floorY={820} stripe={false} />
    {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={i * 84} y={0} width={42} height={560} fill={shade(COLORS.greenDark, 0.08)} opacity={0.6} />)}
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={shade(COLORS.greenDark, 0.12)} />
    {/* rug */}
    <ellipse cx={820} cy={940} rx={640} ry={120} fill={shade(COLORS.woodDark, 0.1)} />
    <ellipse cx={820} cy={940} rx={520} ry={92} fill={COLORS.red} opacity={0.25} />
    {/* diploma + framed inkblot */}
    <g transform="translate(300 290)"><rect x={-100} y={-70} width={200} height={140} rx={8} fill={COLORS.bgCream} {...xl} /><rect x={-76} y={-46} width={152} height={12} rx={6} fill={COLORS.whiteShade} /><rect x={-76} y={-20} width={120} height={12} rx={6} fill={COLORS.whiteShade} /><circle cx={60} cy={34} r={16} fill={COLORS.red} /></g>
    <g transform="translate(560 300)"><rect x={-70} y={-80} width={140} height={160} rx={8} fill={COLORS.white} {...xl} />{/* rorschach */}<path d="M 0 -40 Q -46 -20 -30 20 Q -10 40 0 20 Q 10 40 30 20 Q 46 -20 0 -40 Z" fill={COLORS.outline} /></g>
    {/* bookshelf */}
    <g transform="translate(1680 460)"><rect x={-120} y={-240} width={240} height={420} rx={10} fill={COLORS.woodDark} {...xl} />{[0, 1, 2].map((r) => <g key={r}><rect x={-104} y={-210 + r * 140} width={208} height={120} fill={shade(COLORS.wood, 0.1)} />{Array.from({ length: 7 }).map((_, c) => <rect key={c} x={-96 + c * 29} y={-204 + r * 140} width={22} height={108} rx={3} fill={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.lavender, COLORS.pink, COLORS.greenTeal][(r + c) % 7]} {...sm} />)}</g>)}</g>
    {/* the chaise couch */}
    <g transform="translate(820 720)">
      <rect x={-300} y={0} width={600} height={120} rx={28} fill={COLORS.red} {...xl} />
      <path d="M -300 0 Q -320 -110 -250 -110 L -140 -110 Q -90 -110 -90 0 Z" fill={COLORS.red} {...xl} />
      <rect x={-300} y={78} width={600} height={42} rx={16} fill={shade(COLORS.red, 0.16)} />
      <rect x={-250} y={-70} width={120} height={60} rx={16} fill={COLORS.yellowSoft} {...std} />
    </g>
    {/* analyst chair + notebook */}
    <g transform="translate(300 760)"><rect x={-60} y={-10} width={120} height={110} rx={16} fill={COLORS.wood} {...xl} /><rect x={-60} y={-100} width={120} height={100} rx={16} fill={COLORS.wood} {...xl} /><rect x={-40} y={10} width={80} height={56} rx={8} fill={COLORS.white} {...sm} /></g>
  </g>
);

/** Personality atrium: a grand hall of four colour-coded family doors with a
 *  compass medallion on the floor — the entrance to the sixteen types. */
export const PersonalityAtrium: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={COLORS.whiteShade} floorY={840} stripe={false} />
    <rect x={0} y={760} width={CANVAS.width} height={80} fill={shade(COLORS.lavender, 0.08)} />
    {/* bunting across the top */}
    {Array.from({ length: 13 }).map((_, i) => (
      <path key={i} d={`M ${i * 160} 0 L ${i * 160 + 80} 70 L ${i * 160 + 160} 0 Z`} fill={[COLORS.purpleDeep, COLORS.greenLeaf, COLORS.blueDiagram, COLORS.yellow][i % 4]} {...sm} />
    ))}
    {/* four family doors */}
    {([[300, COLORS.purpleDeep], [740, COLORS.greenLeaf], [1180, COLORS.blueDiagram], [1620, COLORS.yellowDark]] as [number, string][]).map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 470)`}>
        <path d="M -110 290 L -110 -60 Q -110 -200 0 -200 Q 110 -200 110 -60 L 110 290 Z" fill={shade(c, 0.18)} {...xl} />
        <path d="M -82 290 L -82 -50 Q -82 -168 0 -168 Q 82 -168 82 -50 L 82 290 Z" fill={c} {...lg} />
        <circle cx={60} cy={70} r={12} fill={COLORS.yellowSoft} {...sm} />
      </g>
    ))}
    {/* compass medallion on the floor */}
    <g transform="translate(960 930)">
      <ellipse rx={220} ry={56} fill={shade(COLORS.whiteShade, -0.06)} {...lg} />
      <ellipse rx={150} ry={38} fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.sm} />
      <path d="M 0 -30 L 14 0 L 0 30 L -14 0 Z" fill={COLORS.purpleDeep} {...sm} />
      <path d="M -150 0 L 150 0" stroke={COLORS.lavenderDark} strokeWidth={STROKE.sm} />
    </g>
  </g>
);

/** Analyst lab: a strategist's den — a node strategy board, a telescope, a
 *  chessboard and a bookshelf in deep violet. */
export const AnalystLab: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.purpleDeep, 0.04)} floor={shade(COLORS.purpleDeep, 0.22)} floorY={840} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.purpleDeep, -0.06)} opacity={0.5} />)}
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.purpleDeep, 0.12)} />
    {/* strategy node-board */}
    <g transform="translate(330 300)">
      <rect x={-180} y={-150} width={360} height={300} rx={12} fill={COLORS.blueDiagram} {...xl} />
      {([[-110, -80], [40, -100], [120, 30], [-60, 70], [-140, 40]] as [number, number][]).map(([x, y], i, a) => (
        <g key={i}>{i < a.length - 1 && <line x1={x} y1={y} x2={a[i + 1][0]} y2={a[i + 1][1]} stroke={COLORS.yellow} strokeWidth={STROKE.sm} />}<circle cx={x} cy={y} r={16} fill={COLORS.white} {...sm} /></g>
      ))}
    </g>
    {/* telescope */}
    <g transform="translate(960 640) rotate(-30)">
      <rect x={-30} y={-18} width={220} height={60} rx={20} fill={COLORS.navy} {...xl} />
      <rect x={180} y={-26} width={44} height={76} rx={10} fill={shade(COLORS.navy, 0.2)} {...lg} />
      <rect x={-20} y={40} width={16} height={180} fill={COLORS.woodDark} {...sm} transform="rotate(14)" />
    </g>
    <path d="M 900 820 L 1020 820 L 1000 700 L 920 700 Z" fill={COLORS.woodDark} {...lg} />
    {/* bookshelf */}
    <g transform="translate(1680 460)"><rect x={-130} y={-250} width={260} height={440} rx={10} fill={COLORS.navyDark} {...xl} />{[0, 1, 2].map((r) => <g key={r}><rect x={-112} y={-220 + r * 148} width={224} height={126} fill={shade(COLORS.navy, 0.14)} />{Array.from({ length: 7 }).map((_, c) => <rect key={c} x={-104 + c * 31} y={-214 + r * 148} width={24} height={114} rx={3} fill={[COLORS.lavender, COLORS.yellow, COLORS.sky, COLORS.pink, COLORS.greenLeaf][(r + c) % 5]} {...sm} />)}</g>)}</g>
  </g>
);

/** Diplomat garden: a warm conservatory — a sunny window, hanging plants, a
 *  round table and string lights, all in gentle green. */
export const DiplomatGarden: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={840} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.greenTeal, 0.1)} opacity={0.4} />
    {/* sunny arched window */}
    <g transform="translate(360 320)">
      <path d="M -150 190 L -150 -40 Q -150 -190 0 -190 Q 150 -190 150 -40 L 150 190 Z" fill={COLORS.sky} {...xl} />
      <circle cx={70} cy={-40} r={46} fill={COLORS.yellow} {...sm} />
      <line x1={-150} y1={30} x2={150} y2={30} stroke={COLORS.greenDark} strokeWidth={STROKE.sm} /><line x1={0} y1={-190} x2={0} y2={190} stroke={COLORS.greenDark} strokeWidth={STROKE.sm} />
    </g>
    {/* string lights */}
    <path d="M 0 40 Q 480 140 960 60 Q 1440 -20 1920 80" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.sm} />
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={100 + i * 190} cy={90 + 30 * Math.sin(i)} r={10} fill={COLORS.yellowSoft} {...sm} />)}
    {/* hanging plants */}
    {[760, 1120].map((x, i) => (
      <g key={i} transform={`translate(${x} 150)`}>
        <path d="M -40 0 L 40 0 L 30 50 L -30 50 Z" fill={COLORS.wood} {...lg} />
        {[-26, 0, 26].map((lx) => <path key={lx} d={`M ${lx} 50 q ${lx} 70 ${lx * 0.4} 150`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
      </g>
    ))}
    {/* round table */}
    <g transform="translate(1480 760)"><ellipse cx={0} cy={0} rx={160} ry={46} fill={shade(COLORS.wood, 0.14)} {...xl} /><rect x={-16} y={30} width={32} height={120} fill={COLORS.woodDark} {...lg} /><circle cx={0} cy={-6} r={30} fill={COLORS.greenLeaf} {...sm} /></g>
    {/* potted fern */}
    <g transform="translate(940 780)"><path d="M -44 0 L 44 0 L 34 70 L -34 70 Z" fill={COLORS.red} {...lg} />{[-30, -10, 10, 30].map((lx) => <path key={lx} d={`M ${lx} 0 q ${lx * 1.2} -80 ${lx * 0.5} -140`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
  </g>
);

/** Sentinel hall: an orderly archive — a wall of filing drawers, framed
 *  certificates, a big clock and a ledger desk, all neat blues. */
export const SentinelHall: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.sky} floor={COLORS.whiteShade} floorY={840} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.sky, 0.08)} />
    {/* wall of filing drawers */}
    <g transform="translate(300 420)">
      <rect x={-180} y={-280} width={360} height={560} rx={10} fill={COLORS.blueDiagram} {...xl} />
      {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 2 }).map((_, c) => (
        <g key={`${r}-${c}`} transform={`translate(${-88 + c * 176} ${-216 + r * 140})`}><rect x={-80} y={-50} width={160} height={100} rx={8} fill={shade(COLORS.blueDiagram, 0.14)} {...lg} /><rect x={-26} y={-14} width={52} height={20} rx={8} fill={COLORS.white} {...sm} /></g>
      )))}
    </g>
    {/* framed certificates */}
    {[860, 1080].map((x, i) => <g key={i} transform={`translate(${x} 240)`}><rect x={-80} y={-60} width={160} height={120} rx={8} fill={COLORS.bgCream} {...xl} /><path d="M -40 36 l 14 14 l 30 -40" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /><rect x={-54} y={-40} width={108} height={10} rx={5} fill={COLORS.whiteShade} /></g>)}
    {/* big clock */}
    <g transform="translate(1400 250)"><circle r={80} fill={COLORS.white} {...xl} /><line x1={0} y1={0} x2={0} y2={-52} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={0} y1={0} x2={38} y2={10} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><circle r={8} fill={COLORS.outline} /></g>
    {/* ledger desk */}
    <g transform="translate(1540 760)"><rect x={-200} y={0} width={400} height={120} rx={12} fill={COLORS.woodDark} {...xl} /><rect x={-180} y={110} width={40} height={90} fill={shade(COLORS.woodDark, -0.1)} /><rect x={140} y={110} width={40} height={90} fill={shade(COLORS.woodDark, -0.1)} /><rect x={-120} y={-44} width={110} height={54} rx={6} fill={COLORS.white} {...lg} /><rect x={20} y={-30} width={80} height={40} rx={6} fill={COLORS.red} {...sm} /></g>
  </g>
);

/** Explorer workshop: a maker's garage — a pegboard of tools, a workbench, a
 *  skateboard and a guitar, in warm amber. */
export const ExplorerWorkshop: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.yellowSoft} floor={COLORS.woodDark} floorY={840} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.yellowSoft, -0.06)} />
    {/* pegboard with tools */}
    <g transform="translate(360 300)">
      <rect x={-190} y={-170} width={380} height={340} rx={10} fill={shade(COLORS.wood, 0.1)} {...xl} />
      {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => <circle key={`${r}-${c}`} cx={-150 + c * 60} cy={-130 + r * 70} r={5} fill={COLORS.woodDark} />))}
      {/* a hammer + wrench outline */}
      <rect x={-150} y={-120} width={18} height={100} rx={6} fill={COLORS.red} {...lg} /><rect x={-170} y={-130} width={58} height={26} rx={6} fill={shade(COLORS.outline, 0.3)} {...sm} />
      <rect x={30} y={-120} width={16} height={110} rx={6} fill={COLORS.sky} {...lg} /><circle cx={38} cy={-120} r={22} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} />
      <path d="M 120 -110 l 10 50 l -40 0 Z" fill={COLORS.greenLeaf} {...sm} />
    </g>
    {/* string of bulbs */}
    <path d="M 560 60 Q 1200 160 1860 60" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.sm} />
    {Array.from({ length: 7 }).map((_, i) => <circle key={i} cx={640 + i * 180} cy={100 + 20 * Math.sin(i)} r={9} fill={COLORS.yellow} {...sm} />)}
    {/* workbench */}
    <g transform="translate(1180 760)"><rect x={-260} y={0} width={520} height={90} rx={10} fill={COLORS.wood} {...xl} /><rect x={-240} y={80} width={40} height={120} fill={COLORS.woodDark} /><rect x={200} y={80} width={40} height={120} fill={COLORS.woodDark} /><rect x={-180} y={-44} width={70} height={50} rx={6} fill={COLORS.red} {...sm} /><circle cx={60} cy={-16} r={24} fill={COLORS.sky} {...lg} /></g>
    {/* skateboard leaning */}
    <g transform="translate(1720 720) rotate(70)"><rect x={-110} y={-22} width={220} height={44} rx={22} fill={COLORS.purpleDeep} {...xl} /><circle cx={-60} cy={34} r={16} fill={COLORS.outline} {...sm} /><circle cx={60} cy={34} r={16} fill={COLORS.outline} {...sm} /></g>
    {/* guitar */}
    <g transform="translate(900 740) rotate(-18)"><ellipse cx={0} cy={0} rx={70} ry={90} fill={COLORS.yellowDark} {...xl} /><circle cx={0} cy={-10} r={22} fill={COLORS.woodDark} /><rect x={-10} y={-230} width={20} height={150} rx={6} fill={COLORS.woodDark} {...lg} /></g>
  </g>
);

/** Awareness shaft: a cross-section tower of stacked floors — the ladder of
 *  consciousness, dark at the base and bright at the top. */
export const AwarenessShaft: React.FC = () => {
  const bands = [
    shade(COLORS.purpleDeep, -0.16), shade(COLORS.purpleDeep, 0.02), COLORS.lavender,
    COLORS.sky, COLORS.greenTeal, COLORS.yellowSoft, COLORS.yellow,
  ];
  return (
    <g>
      <WallFloor wall={COLORS.wallNight} floor={COLORS.woodDark} floorY={1020} stripe={false} />
      {/* stacked floors */}
      {bands.map((c, i) => (
        <g key={i}>
          <rect x={440} y={60 + i * 136} width={1040} height={132} fill={c} {...lg} />
          <rect x={440} y={60 + i * 136} width={1040} height={20} fill={shade(c, -0.08)} />
          <text x={470} y={150 + i * 136} fontFamily="Baloo 2" fontWeight={800} fontSize={40} fill={COLORS.outline} opacity={0.5}>{bands.length - i}</text>
        </g>
      ))}
      {/* side scaffolding / shaft rails */}
      <rect x={400} y={40} width={40} height={972} fill={COLORS.ledGrey} {...xl} />
      <rect x={1480} y={40} width={40} height={972} fill={COLORS.ledGrey} {...xl} />
      {Array.from({ length: 7 }).map((_, i) => <line key={i} x1={420} y1={120 + i * 136} x2={1500} y2={120 + i * 136} stroke={shade(COLORS.ledGrey, -0.1)} strokeWidth={STROKE.sm} opacity={0.4} />)}
      {/* a little up-arrow glow at the top */}
      <path d="M 960 20 l 40 48 l -24 0 l 0 40 l -32 0 l 0 -40 l -24 0 Z" fill={COLORS.yellow} {...sm} />
    </g>
  );
};

/** The deep: dark water, drifting bubbles and faint light shafts — the
 *  unconscious floor, below all awareness. */
export const TheDeep: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={shade(COLORS.purpleDeep, -0.2)} />
    <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.purpleDeep, -0.08)} opacity={0.6} />
    {/* light shafts from the surface */}
    {[300, 820, 1360].map((x, i) => <path key={i} d={`M ${x} 0 L ${x + 90} 0 L ${x + 220} 1080 L ${x - 10} 1080 Z`} fill={COLORS.sky} opacity={0.07} />)}
    {/* drifting bubbles */}
    {Array.from({ length: 22 }).map((_, i) => <circle key={i} cx={120 + (i * 83) % 1760} cy={120 + (i * 137) % 820} r={6 + (i % 4) * 5} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={0.35} />)}
    {/* sea floor + weeds */}
    <path d="M 0 980 Q 480 920 960 980 Q 1440 1030 1920 960 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.purpleDeep, -0.28)} {...xl} />
    {[260, 720, 1180, 1620].map((x, i) => <path key={i} d={`M ${x} 1000 q -24 -80 6 -150 q 24 70 -6 150`} fill={shade(COLORS.greenDark, -0.1)} {...sm} />)}
  </g>
);

/** Flow river: a bright channel sweeping between green banks — being carried,
 *  effortless, by the current of absorbed action. */
export const FlowRiver: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.sky} floor={COLORS.greenLeaf} floorY={760} stripe={false} />
    {/* lighter upper-sky band to split the flat blue */}
    <rect x={0} y={0} width={CANVAS.width} height={260} fill={shade(COLORS.sky, 0.12)} />
    <circle cx={1540} cy={200} r={94} fill={COLORS.yellow} {...sm} />
    {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={1540} y1={200} x2={1540} y2={60} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={0.25} transform={`rotate(${i * 36} 1540 200)`} strokeLinecap="round" />)}
    {/* far mountain range across the width (fills the lower sky) */}
    <path d="M 0 760 L 0 560 L 240 440 L 460 600 L 700 420 L 960 580 L 1240 430 L 1520 600 L 1760 470 L 1920 580 L 1920 760 Z" fill={shade(COLORS.lavender, -0.04)} {...lg} />
    <path d="M 700 420 L 760 470 L 720 510 L 660 470 Z" fill={COLORS.white} opacity={0.7} />
    <path d="M 1240 430 L 1300 480 L 1260 520 L 1200 480 Z" fill={COLORS.white} opacity={0.7} />
    {/* rolling near hills */}
    <path d="M 0 760 Q 300 650 620 760 Z" fill={shade(COLORS.greenLeaf, 0.12)} />
    <path d="M 1200 760 Q 1560 640 1920 760 Z" fill={shade(COLORS.greenLeaf, 0.12)} />
    {/* the river channel */}
    <path d="M 760 760 Q 900 920 820 1080 L 1120 1080 Q 1040 920 1160 760 Z" fill={COLORS.skyDark} {...xl} />
    <path d="M 820 820 Q 940 940 880 1060 M 1020 820 Q 940 940 1020 1060" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />
    {/* reeds on the banks */}
    {[200, 360, 1560, 1720].map((x, i) => <path key={i} d={`M ${x} 900 q -16 -90 4 -170 q 16 80 -4 170`} fill={COLORS.greenDark} {...sm} />)}
    {/* clouds + birds */}
    {[[280, 150], [860, 100], [1180, 180]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><ellipse rx={84} ry={38} fill={COLORS.white} {...sm} /><ellipse cx={64} cy={10} rx={54} ry={30} fill={COLORS.white} {...sm} /></g>)}
    {[[520, 300], [1000, 340]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} q 20 -18 40 0 q 20 -18 40 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
  </g>
);

/** Clarity summit: a mountaintop at dawn, clear sky and distant peaks — the
 *  highest, most lucid rung of awareness. */
export const ClaritySummit: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.yellowSoft} />
    <rect x={0} y={0} width={CANVAS.width} height={420} fill={shade(COLORS.sky, 0.1)} opacity={0.5} />
    {/* rising sun + rays */}
    <circle cx={960} cy={420} r={130} fill={COLORS.yellow} {...sm} />
    {Array.from({ length: 16 }).map((_, i) => <line key={i} x1={960} y1={420} x2={960} y2={180} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={0.3} transform={`rotate(${i * 22.5} 960 420)`} strokeLinecap="round" />)}
    {/* distant peaks in cloud */}
    <path d="M 0 700 L 260 480 L 460 700 Z" fill={shade(COLORS.lavender, -0.06)} {...lg} />
    <path d="M 1420 700 L 1660 470 L 1920 700 Z" fill={shade(COLORS.lavender, -0.06)} {...lg} />
    <path d="M 0 720 Q 480 660 960 720 Q 1440 780 1920 700" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} opacity={0.5} />
    {/* foreground summit */}
    <path d="M 0 1080 L 0 820 L 700 560 L 960 700 L 1260 540 L 1920 840 L 1920 1080 Z" fill={shade(COLORS.purpleDeep, 0.14)} {...xl} />
    <path d="M 700 560 L 820 640 L 760 700 L 640 650 Z" fill={COLORS.white} opacity={0.7} />
    <path d="M 1260 540 L 1360 620 L 1300 680 L 1200 630 Z" fill={COLORS.white} opacity={0.7} />
  </g>
);

/** Procrastination desk: the guilty workstation — laptop with the dreaded task,
 *  snacks, phone, a ticking clock and a deadline circled in red. */
export const ProcrastinationDesk: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={COLORS.wood} floorY={720} stripe={false} />
    {/* wallpaper stripes break up the flat wall */}
    {Array.from({ length: 16 }).map((_, i) => <rect key={i} x={i * 120} y={0} width={60} height={560} fill={shade(COLORS.lavender, -0.05)} opacity={0.6} />)}
    <rect x={0} y={560} width={CANVAS.width} height={160} fill={shade(COLORS.lavender, 0.06)} />
    {/* an ignored "DO IT" poster + sticky notes */}
    <g transform="translate(980 230) rotate(-4)"><rect x={-110} y={-80} width={220} height={160} rx={10} fill={COLORS.yellowSoft} {...xl} /><text x={0} y={16} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={54} fill={COLORS.outline} opacity={0.5}>DO IT</text></g>
    {[[1240, 180], [1320, 250], [1180, 300]].map(([x, y], i) => <rect key={i} x={x} y={y} width={70} height={64} rx={4} fill={[COLORS.pink, COLORS.sky, COLORS.greenLeaf][i]} transform={`rotate(${i * 8 - 8} ${x + 35} ${y + 32})`} {...sm} />)}
    {/* a small shelf */}
    <rect x={520} y={420} width={260} height={16} rx={4} fill={shade(COLORS.wood, 0.1)} {...lg} />
    {[560, 640, 720].map((x, i) => <rect key={i} x={x} y={360} width={30} height={60} rx={4} fill={[COLORS.red, COLORS.sky, COLORS.greenLeaf][i]} {...sm} />)}
    {/* wall clock */}
    <g transform="translate(300 240)"><circle r={80} fill={COLORS.white} {...xl} /><line x1={0} y1={0} x2={0} y2={-54} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={0} y1={0} x2={40} y2={14} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><circle r={7} fill={COLORS.outline} /></g>
    {/* deadline calendar, circled in red */}
    <g transform="translate(1600 250)"><rect x={-90} y={-100} width={180} height={190} rx={10} fill={COLORS.white} {...xl} /><rect x={-90} y={-100} width={180} height={44} rx={10} fill={COLORS.red} {...sm} />{Array.from({ length: 3 }).map((_, r) => Array.from({ length: 4 }).map((_, c) => <rect key={`${r}-${c}`} x={-74 + c * 40} y={-40 + r * 42} width={28} height={28} rx={4} fill={shade(COLORS.white, 0.05)} stroke={shade(COLORS.lavender, -0.1)} strokeWidth={STROKE.sm} />))}<circle cx={46} cy={44} r={22} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} /></g>
    {/* long desk */}
    <rect x={0} y={700} width={CANVAS.width} height={60} fill={shade(COLORS.wood, 0.12)} {...xl} />
    <rect x={0} y={760} width={CANVAS.width} height={320} fill={COLORS.wood} />
    {/* laptop with the dread glow */}
    <g transform="translate(760 640)"><rect x={-110} y={-80} width={220} height={150} rx={12} fill={shade(COLORS.outline, 0.3)} {...xl} /><rect x={-94} y={-64} width={188} height={118} rx={6} fill={COLORS.red} opacity={0.6} /><rect x={-140} y={70} width={280} height={22} rx={8} fill={shade(COLORS.outline, 0.25)} {...lg} /></g>
    {/* mug */}
    <g transform="translate(1080 680)"><rect x={-30} y={-34} width={60} height={60} rx={8} fill={COLORS.sky} {...lg} /><path d="M 30 -22 q 24 2 18 24 q -6 12 -18 8" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} /></g>
    {/* phone */}
    <g transform="translate(1240 690)"><rect x={-26} y={-44} width={52} height={88} rx={10} fill={shade(COLORS.outline, 0.3)} {...lg} /><rect x={-20} y={-36} width={40} height={64} rx={4} fill={COLORS.sky} /></g>
    {/* snack bowl + crumpled paper */}
    <g transform="translate(470 700)"><path d="M -44 0 a 44 20 0 0 0 88 0 Z" fill={COLORS.yellowDark} {...lg} /><ellipse cx={0} cy={0} rx={44} ry={12} fill={COLORS.yellow} {...sm} /></g>
    {[1420, 1500].map((x, i) => <circle key={i} cx={x} cy={740} r={20} fill={COLORS.whiteShade} {...sm} />)}
  </g>
);

/** Deadline cliff: a dark storm wall of countdown advancing on a tiny edge — the
 *  looming pressure that finally spurs panic-action. */
export const DeadlineCliff: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.purpleDeep, 0.04)} floor={shade(COLORS.purpleDeep, 0.2)} floorY={840} stripe={false} />
    {/* advancing storm wall from the right */}
    <path d="M 1920 0 L 1100 0 Q 1240 300 1080 560 Q 1260 820 1120 1080 L 1920 1080 Z" fill={shade(COLORS.purpleDeep, -0.16)} {...xl} />
    {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${1300 + i * 120} ${120 + (i % 3) * 170})`}><ellipse rx={90} ry={48} fill={shade(COLORS.purpleDeep, -0.22)} {...lg} /><ellipse cx={70} cy={10} rx={60} ry={36} fill={shade(COLORS.purpleDeep, -0.22)} {...sm} /></g>)}
    {/* lightning */}
    <path d="M 1500 260 l -40 150 l 34 0 l -30 150 l 90 -210 l -36 0 l 40 -90 Z" fill={COLORS.yellow} {...sm} />
    {/* rain streaks */}
    {Array.from({ length: 16 }).map((_, i) => <line key={i} x1={1120 + i * 48} y1={200 + (i % 5) * 90} x2={1100 + i * 48} y2={260 + (i % 5) * 90} stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={0.4} />)}
    {/* the cliff edge + countdown banner */}
    <path d="M 0 1080 L 0 720 L 560 720 Q 640 720 640 820 L 640 1080 Z" fill={shade(COLORS.purpleDeep, 0.1)} {...xl} />
    <g transform="translate(300 420)"><rect x={-180} y={-60} width={360} height={120} rx={16} fill={COLORS.red} {...xl} /><text x={0} y={18} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={60} fill={COLORS.white}>00:10</text></g>
    {/* a few flying calendar pages */}
    {[[520, 520], [760, 360], [880, 600]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${i * 24 - 20})`}><rect x={-26} y={-32} width={52} height={64} rx={6} fill={COLORS.white} {...sm} /></g>)}
  </g>
);

/** Fresh-start desk: a calm, tidy, dawn-lit workstation — the way out, where one
 *  small step feels doable. */
export const FreshStartDesk: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCream} floor={COLORS.wood} floorY={720} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={160} fill={shade(COLORS.bgCream, -0.04)} />
    {/* window with dawn */}
    <g transform="translate(360 300)"><rect x={-150} y={-180} width={300} height={320} rx={16} fill={COLORS.sky} {...xl} /><circle cx={0} cy={40} r={70} fill={COLORS.yellow} {...sm} /><line x1={-150} y1={-20} x2={150} y2={-20} stroke={COLORS.bgCream} strokeWidth={STROKE.lg} /><line x1={0} y1={-180} x2={0} y2={140} stroke={COLORS.bgCream} strokeWidth={STROKE.lg} /></g>
    {/* tidy desk */}
    <rect x={0} y={700} width={CANVAS.width} height={60} fill={shade(COLORS.wood, 0.12)} {...xl} />
    <rect x={0} y={760} width={CANVAS.width} height={320} fill={COLORS.wood} />
    {/* neat laptop (calm) */}
    <g transform="translate(900 650)"><rect x={-100} y={-72} width={200} height={138} rx={12} fill={shade(COLORS.outline, 0.3)} {...xl} /><rect x={-86} y={-58} width={172} height={106} rx={6} fill={COLORS.greenTeal} /><rect x={-128} y={66} width={256} height={20} rx={8} fill={shade(COLORS.outline, 0.25)} {...lg} /></g>
    {/* potted plant */}
    <g transform="translate(1500 650)"><path d="M -40 10 L 40 10 L 30 70 L -30 70 Z" fill={COLORS.red} {...lg} />{[-24, 0, 24].map((lx) => <path key={lx} d={`M ${lx} 10 q ${lx * 1.2} -70 ${lx * 0.4} -130`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
    {/* a checklist with one checked box + warm tea */}
    <g transform="translate(1180 680)"><rect x={-50} y={-56} width={100} height={110} rx={8} fill={COLORS.white} {...lg} /><rect x={-38} y={-40} width={20} height={20} rx={4} fill={COLORS.greenLeaf} {...sm} /><path d="M -34 -30 l 6 6 l 10 -12" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />{[0, 28].map((y) => <line key={y} x1={-10} y1={-30 + y} x2={34} y2={-30 + y} stroke={shade(COLORS.bgCream, -0.1)} strokeWidth={STROKE.sm} />)}</g>
    <g transform="translate(680 700)"><rect x={-28} y={-30} width={56} height={54} rx={8} fill={COLORS.yellowSoft} {...lg} /><path d="M 28 -18 q 22 2 16 22 q -6 10 -16 6" fill="none" stroke={COLORS.yellowSoft} strokeWidth={STROKE.lg} /></g>
  </g>
);

/** Debate stage: two podiums facing off under lights, a scoreboard and a dim
 *  audience — where arguments (and fallacies) are thrown. */
export const DebateStage: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.purpleDeep} floor={COLORS.woodDark} floorY={820} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.purpleDeep, -0.05)} opacity={0.5} />)}
    {/* stage lights */}
    {[360, 960, 1560].map((x, i) => <g key={i}><line x1={x} y1={0} x2={x} y2={60} {...sm} /><path d={`M ${x - 40} 60 L ${x + 40} 60 L ${x + 24} 100 L ${x - 24} 100 Z`} fill={COLORS.yellowDark} {...lg} /><path d={`M ${x} 100 L ${x - 160} 560 L ${x + 160} 560 Z`} fill={COLORS.yellowSoft} opacity={0.12} /></g>)}
    {/* scoreboard */}
    <g transform="translate(960 230)"><rect x={-150} y={-70} width={300} height={130} rx={14} fill={shade(COLORS.outline, 0.3)} {...xl} /><text x={0} y={18} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={60} fill={COLORS.ledGreen}>VS</text></g>
    {/* two podiums */}
    {[560, 1360].map((x, i) => (
      <g key={i} transform={`translate(${x} 700)`}>
        <rect x={-90} y={0} width={180} height={150} rx={10} fill={[COLORS.red, COLORS.blueDiagram][i]} {...xl} />
        <rect x={-104} y={-18} width={208} height={30} rx={8} fill={shade([COLORS.red, COLORS.blueDiagram][i], 0.14)} {...lg} />
        <rect x={-30} y={-80} width={60} height={70} rx={8} fill={COLORS.white} {...sm} />
      </g>
    ))}
    {/* audience silhouettes */}
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={120 + i * 150} cy={1010} r={54} fill={shade(COLORS.woodDark, -0.12)} {...lg} />)}
  </g>
);

/** Courtroom of the mind: judge's bench, scales of justice and wood panelling —
 *  where a claim stands trial. */
export const CourtroomMind: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.wood} floor={COLORS.woodDark} floorY={840} stripe={false} />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={80 + i * 230} y={60} width={180} height={420} rx={10} fill={shade(COLORS.wood, -0.06)} {...sm} />)}
    {/* scales of justice */}
    <g transform="translate(960 250)">
      <line x1={0} y1={-60} x2={0} y2={60} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={-120} y1={-50} x2={120} y2={-50} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[-120, 120].map((x, i) => <g key={i}><line x1={x} y1={-50} x2={x} y2={-4} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><path d={`M ${x - 36} -4 a 36 20 0 0 0 72 0 Z`} fill={COLORS.yellow} {...lg} /></g>)}
      <circle cx={0} cy={-64} r={10} fill={COLORS.yellowDark} {...sm} />
    </g>
    {/* judge's bench */}
    <g transform="translate(960 760)">
      <rect x={-260} y={-60} width={520} height={200} rx={12} fill={shade(COLORS.woodDark, 0.08)} {...xl} />
      <rect x={-200} y={-30} width={400} height={60} rx={8} fill={shade(COLORS.wood, 0.1)} {...sm} />
      {/* gavel */}
      <g transform="translate(150 -74) rotate(-20)"><rect x={-10} y={-10} width={20} height={70} rx={6} fill={COLORS.woodDark} {...sm} /><rect x={-30} y={-34} width={60} height={34} rx={8} fill={shade(COLORS.wood, 0.12)} {...lg} /></g>
    </g>
    {/* witness box */}
    <g transform="translate(300 780)"><rect x={-80} y={-40} width={160} height={160} rx={10} fill={COLORS.wood} {...xl} /><rect x={-60} y={-24} width={120} height={40} rx={6} fill={shade(COLORS.wood, 0.12)} /></g>
  </g>
);

/** Clarity studio: a clean thinking space with a tidy argument on the whiteboard —
 *  where good reasoning gets built. */
export const ClarityStudio: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCream} floor={COLORS.wood} floorY={800} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={240} fill={shade(COLORS.bgCream, -0.04)} />
    {/* whiteboard with a clean argument */}
    <g transform="translate(560 300)">
      <rect x={-300} y={-180} width={600} height={360} rx={14} fill={COLORS.white} {...xl} />
      <rect x={-200} y={-130} width={400} height={50} rx={10} fill={COLORS.sky} {...sm} />
      <text x={0} y={-96} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.outline}>CLAIM</text>
      {[-150, 0, 150].map((x, i) => <g key={i}><line x1={0} y1={-80} x2={x} y2={0} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><rect x={x - 70} y={0} width={140} height={44} rx={8} fill={[COLORS.greenLeaf, COLORS.yellow, COLORS.lavender][i]} {...sm} /></g>)}
      <text x={0} y={120} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={22} fill={COLORS.outline}>reasons &amp; evidence</text>
    </g>
    {/* desk + plant + lamp */}
    <rect x={0} y={760} width={CANVAS.width} height={40} fill={shade(COLORS.wood, 0.12)} {...lg} />
    <g transform="translate(1500 680)"><path d="M -40 10 L 40 10 L 30 70 L -30 70 Z" fill={COLORS.red} {...lg} />{[-24, 0, 24].map((lx) => <path key={lx} d={`M ${lx} 10 q ${lx} -70 ${lx * 0.4} -130`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
    <g transform="translate(1180 700)"><rect x={-12} y={-80} width={24} height={100} rx={6} fill={COLORS.ledGrey} {...lg} /><path d="M -50 -80 L 50 -80 L 30 -120 L -30 -120 Z" fill={COLORS.yellowDark} {...lg} /></g>
  </g>
);

/** Cozy den: a warm solo haven — armchair, reading lamp, full bookshelf, tea and
 *  a sleeping cat. The restorative home of someone who loves their own company. */
export const CozyDen: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.wood, 0.14)} floor={COLORS.woodDark} floorY={760} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={200} fill={shade(COLORS.wood, 0.08)} />
    {/* window with warm evening */}
    <g transform="translate(330 300)"><rect x={-140} y={-170} width={280} height={300} rx={14} fill={shade(COLORS.yellowDark, 0.1)} {...xl} /><circle cx={0} cy={30} r={56} fill={COLORS.yellow} {...sm} /><line x1={-140} y1={-20} x2={140} y2={-20} stroke={shade(COLORS.wood, 0.14)} strokeWidth={STROKE.lg} /><line x1={0} y1={-170} x2={0} y2={130} stroke={shade(COLORS.wood, 0.14)} strokeWidth={STROKE.lg} /></g>
    {/* bookshelf */}
    <g transform="translate(1680 440)"><rect x={-130} y={-260} width={260} height={460} rx={10} fill={COLORS.woodDark} {...xl} />{[0, 1, 2, 3].map((r) => <g key={r}><rect x={-112} y={-232 + r * 116} width={224} height={100} fill={shade(COLORS.wood, 0.08)} />{Array.from({ length: 7 }).map((_, c) => <rect key={c} x={-104 + c * 31} y={-226 + r * 116} width={24} height={90} rx={3} fill={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.lavender, COLORS.pink, COLORS.greenTeal][(r + c) % 7]} {...sm} />)}</g>)}</g>
    {/* rug */}
    <ellipse cx={900} cy={880} rx={560} ry={90} fill={COLORS.red} opacity={0.3} />
    {/* armchair */}
    <g transform="translate(820 660)">
      <rect x={-150} y={-40} width={300} height={160} rx={30} fill={COLORS.red} {...xl} />
      <rect x={-190} y={-20} width={70} height={150} rx={26} fill={shade(COLORS.red, 0.14)} {...lg} />
      <rect x={120} y={-20} width={70} height={150} rx={26} fill={shade(COLORS.red, 0.14)} {...lg} />
      <rect x={-120} y={-120} width={240} height={100} rx={26} fill={shade(COLORS.red, 0.08)} {...xl} />
      <rect x={-70} y={-70} width={90} height={60} rx={14} fill={COLORS.yellowSoft} {...std} />
    </g>
    {/* floor lamp */}
    <g transform="translate(1180 540)"><rect x={-8} y={0} width={16} height={220} fill={COLORS.ledGrey} {...sm} /><path d="M -56 0 L 56 0 L 36 -70 L -36 -70 Z" fill={COLORS.yellow} {...lg} /><ellipse cx={0} cy={240} rx={50} ry={14} fill={COLORS.woodDark} /></g>
    {/* side table + tea + plant */}
    <g transform="translate(1080 720)"><rect x={-44} y={0} width={88} height={90} rx={8} fill={COLORS.wood} {...lg} /><g transform="translate(0 -14)"><rect x={-24} y={-20} width={48} height={34} rx={6} fill={COLORS.sky} {...sm} /><path d="M 24 -12 q 16 2 12 16" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} /></g></g>
    {/* sleeping cat on the rug */}
    <g transform="translate(560 860)"><ellipse cx={0} cy={0} rx={64} ry={30} fill={shade(COLORS.outline, 0.35)} {...lg} /><circle cx={-50} cy={-8} r={22} fill={shade(COLORS.outline, 0.35)} {...sm} /><path d="M -62 -24 l 6 -14 l 10 10 Z M -40 -24 l 6 -14 l 8 12 Z" fill={shade(COLORS.outline, 0.35)} /><path d="M 58 -6 q 26 -10 18 -30" fill="none" stroke={shade(COLORS.outline, 0.35)} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
  </g>
);

/** Forest path: a peaceful solitary walk among trees — the quiet recharge of
 *  being alone in nature. */
export const ForestPathSolo: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.sky} floor={COLORS.greenDark} floorY={700} stripe={false} />
    <rect x={0} y={0} width={CANVAS.width} height={240} fill={shade(COLORS.sky, 0.12)} />
    <circle cx={1560} cy={200} r={80} fill={COLORS.yellowSoft} {...sm} />
    {/* rolling ground layers */}
    <path d="M 0 700 Q 480 620 960 700 Q 1440 780 1920 680 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.greenDark, 0.1)} />
    {/* the winding path */}
    <path d="M 860 1080 Q 960 820 900 720 Q 860 660 960 600 L 1040 600 Q 960 680 1010 740 Q 1070 840 1060 1080 Z" fill={shade(COLORS.wood, 0.1)} {...lg} />
    {/* trees at varying depth */}
    {([[200, 0.9], [520, 0.7], [1360, 0.8], [1700, 1.0], [700, 0.5], [1180, 0.55]] as [number, number][]).map(([x, s], i) => (
      <g key={i} transform={`translate(${x} ${700 - s * 40}) scale(${s})`}>
        <rect x={-24} y={-120} width={48} height={200} rx={10} fill={COLORS.woodDark} {...lg} />
        <circle cx={0} cy={-170} r={90} fill={shade(COLORS.greenLeaf, -0.04)} {...xl} />
        <circle cx={-56} cy={-130} r={60} fill={shade(COLORS.greenLeaf, 0.08)} {...lg} />
        <circle cx={56} cy={-130} r={60} fill={shade(COLORS.greenLeaf, 0.08)} {...lg} />
      </g>
    ))}
    {/* a lone bench */}
    <g transform="translate(340 780)"><rect x={-70} y={-20} width={140} height={16} rx={4} fill={COLORS.wood} {...lg} /><rect x={-70} y={-70} width={140} height={16} rx={4} fill={COLORS.wood} {...lg} /><rect x={-60} y={-4} width={14} height={50} fill={COLORS.woodDark} /><rect x={46} y={-4} width={14} height={50} fill={COLORS.woodDark} /></g>
    {/* bushes */}
    {[1480, 60, 1180].map((x, i) => <g key={i} transform={`translate(${x} 820)`}><circle cx={-24} cy={0} r={34} fill={shade(COLORS.greenLeaf, -0.08)} {...lg} /><circle cx={24} cy={-6} r={40} fill={shade(COLORS.greenLeaf, -0.04)} {...lg} /></g>)}
  </g>
);

/** Draining party: a loud, crowded gathering — bright, busy, and exhausting for
 *  someone who'd rather be home. The contrast room. */
export const DrainingParty: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.purpleDeep} floor={COLORS.woodDark} floorY={820} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.purpleDeep, -0.05)} opacity={0.5} />)}
    {/* bunting + disco */}
    {Array.from({ length: 13 }).map((_, i) => <path key={i} d={`M ${i * 160} 0 L ${i * 160 + 80} 60 L ${i * 160 + 160} 0 Z`} fill={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.pink][i % 5]} {...sm} />)}
    <g transform="translate(960 180)"><circle r={48} fill={COLORS.lavender} {...lg} />{[0, 45, 90, 135].map((a) => <line key={a} x1={-48} y1={0} x2={48} y2={0} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} transform={`rotate(${a})`} />)}</g>
    {/* confetti */}
    {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={80 + (i * 83) % 1760} y={260 + (i * 97) % 300} width={14} height={14} rx={3} fill={[COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.pink][i % 5]} transform={`rotate(${i * 30} ${88 + (i * 83) % 1760} ${267 + (i * 97) % 300})`} />)}
    {/* crowd of figures with chatter bubbles */}
    {([[260, COLORS.yellowSoft], [520, COLORS.sky], [780, COLORS.pink], [1140, COLORS.greenLeaf], [1400, COLORS.lavender], [1660, COLORS.yellowSoft]] as [number, string][]).map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 840)`}>
        <circle cx={0} cy={-70} r={46} fill={c} {...xl} /><circle cx={-16} cy={-76} r={6} fill={COLORS.outline} /><circle cx={16} cy={-76} r={6} fill={COLORS.outline} />
        <path d={`M -56 90 Q 0 -10 56 90 Z`} fill={shade(c, 0.1)} {...xl} />
        <g transform="translate(40 -120)"><rect x={-26} y={-20} width={52} height={34} rx={8} fill={COLORS.white} {...sm} /><circle cx={-10} cy={-3} r={3} fill={COLORS.outline} /><circle cx={2} cy={-3} r={3} fill={COLORS.outline} /><circle cx={14} cy={-3} r={3} fill={COLORS.outline} /></g>
      </g>
    ))}
  </g>
);

/** Mind gallery: a museum of minds — arched alcoves, plinths and spotlights, each
 *  celebrating a different kind of intelligence. */
export const MindGallery: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={COLORS.whiteShade} floorY={840} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.lavender, 0.06)} />
    {/* arched alcoves with colour swatches */}
    {([[300, COLORS.sky], [700, COLORS.pink], [1220, COLORS.greenLeaf], [1620, COLORS.yellowDark]] as [number, string][]).map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 330)`}>
        <path d="M -130 180 L -130 -40 Q -130 -180 0 -180 Q 130 -180 130 -40 L 130 180 Z" fill={shade(COLORS.lavender, 0.1)} {...lg} />
        <path d="M -96 180 L -96 -40 Q -96 -150 0 -150 Q 96 -150 96 -40 L 96 180 Z" fill={shade(c, 0.1)} {...sm} />
        <circle cx={0} cy={-20} r={44} fill={c} {...lg} />
      </g>
    ))}
    {/* spotlights */}
    {[500, 960, 1420].map((x, i) => <g key={i}><path d={`M ${x} 0 L ${x - 70} 420 L ${x + 70} 420 Z`} fill={COLORS.yellowSoft} opacity={0.14} /></g>)}
    {/* row of plinths */}
    {[500, 960, 1420].map((x, i) => (
      <g key={i} transform={`translate(${x} 720)`}>
        <rect x={-70} y={0} width={140} height={150} rx={6} fill={COLORS.ledGrey} {...xl} />
        <rect x={-86} y={-16} width={172} height={28} rx={6} fill={shade(COLORS.ledGrey, 0.14)} {...lg} />
        <circle cx={0} cy={-56} r={34} fill={[COLORS.red, COLORS.blueDiagram, COLORS.greenTeal][i]} {...lg} />
      </g>
    ))}
    {/* banner */}
    <g transform="translate(960 150)"><rect x={-200} y={-50} width={400} height={100} rx={14} fill={COLORS.purpleDeep} {...xl} /><text x={0} y={14} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={44} fill={COLORS.white}>MANY MINDS</text></g>
  </g>
);

/** Creative studio: a maker's space for the hands-on intelligences — an easel, a
 *  keyboard, instruments and sculpture. */
export const CreativeStudio: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCreamDark} floor={COLORS.wood} floorY={820} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.bgCreamDark, 0.05)} opacity={0.6} />)}
    {/* easel with a painting */}
    <g transform="translate(360 520)">
      <rect x={-90} y={-180} width={180} height={200} rx={8} fill={COLORS.white} {...xl} />
      <circle cx={-30} cy={-120} r={30} fill={COLORS.yellow} {...sm} /><path d="M -80 10 L -20 -70 L 40 10 Z" fill={COLORS.greenLeaf} {...sm} />
      <path d="M -70 20 L -40 300 M 70 20 L 40 300 M 0 10 L 0 300" stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
    {/* keyboard */}
    <g transform="translate(960 700)"><rect x={-150} y={0} width={300} height={70} rx={8} fill={shade(COLORS.outline, 0.3)} {...xl} />{Array.from({ length: 11 }).map((_, i) => <rect key={i} x={-140 + i * 26} y={8} width={22} height={54} rx={3} fill={COLORS.white} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}{Array.from({ length: 10 }).map((_, i) => <rect key={i} x={-128 + i * 26} y={8} width={12} height={32} fill={COLORS.outline} />)}<rect x={-150} y={70} width={30} height={120} fill={COLORS.woodDark} /><rect x={120} y={70} width={30} height={120} fill={COLORS.woodDark} /></g>
    {/* guitar on wall */}
    <g transform="translate(1600 360) rotate(16)"><ellipse cx={0} cy={60} rx={70} ry={86} fill={COLORS.red} {...xl} /><circle cx={0} cy={50} r={22} fill={COLORS.woodDark} /><rect x={-10} y={-170} width={20} height={160} rx={6} fill={COLORS.woodDark} {...lg} /></g>
    {/* a small sculpture bust */}
    <g transform="translate(1300 720)"><rect x={-50} y={40} width={100} height={60} rx={6} fill={COLORS.ledGrey} {...lg} /><circle cx={0} cy={0} r={40} fill={COLORS.whiteShade} {...xl} /><path d="M -40 40 Q 0 -10 40 40 Z" fill={COLORS.whiteShade} {...lg} /></g>
  </g>
);

/** Open nature: a wide outdoor scene at dusk — hills, a tree, a pond, a telescope
 *  and the first stars, for the naturalistic and existential minds. */
export const OpenNature: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.purpleDeep, 0.08)} floor={COLORS.greenDark} floorY={720} stripe={false} />
    <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.purpleDeep, 0.0)} opacity={0.5} />
    {/* dusk gradient + stars */}
    <circle cx={1560} cy={220} r={70} fill={COLORS.yellowSoft} {...sm} />
    {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M ${120 + (i * 113) % 1700} ${80 + (i * 61) % 240} l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 Z`} fill={COLORS.white} opacity={0.8} />)}
    {/* rolling hills */}
    <path d="M 0 720 Q 420 620 900 720 Q 1400 800 1920 680 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.greenDark, 0.08)} />
    {/* a big tree */}
    <g transform="translate(360 660)"><rect x={-30} y={-120} width={60} height={240} rx={12} fill={COLORS.woodDark} {...xl} /><circle cx={0} cy={-180} r={110} fill={shade(COLORS.greenLeaf, -0.06)} {...xl} /><circle cx={-70} cy={-140} r={70} fill={shade(COLORS.greenLeaf, 0.06)} {...lg} /><circle cx={70} cy={-140} r={70} fill={shade(COLORS.greenLeaf, 0.06)} {...lg} /></g>
    {/* pond */}
    <ellipse cx={760} cy={960} rx={280} ry={70} fill={COLORS.sky} opacity={0.6} {...lg} />
    {/* telescope */}
    <g transform="translate(1340 760) rotate(-32)"><rect x={-30} y={-18} width={200} height={56} rx={20} fill={COLORS.navy} {...xl} /><rect x={160} y={-26} width={42} height={72} rx={10} fill={shade(COLORS.navy, 0.2)} {...lg} /></g>
    <path d="M 1300 820 L 1420 820 L 1400 700 L 1320 700 Z" fill={COLORS.woodDark} {...lg} />
    {/* bushes */}
    {[1660, 980].map((x, i) => <g key={i} transform={`translate(${x} 860)`}><circle cx={-24} cy={0} r={34} fill={shade(COLORS.greenLeaf, -0.08)} {...lg} /><circle cx={24} cy={-6} r={40} fill={shade(COLORS.greenLeaf, -0.04)} {...lg} /></g>)}
  </g>
);

/** Thought funhouse: a hall of warped mirrors, each bending a plain thought into
 *  a distorted one — the mind's trick house. */
export const ThoughtFunhouse: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.purpleDeep} floor={COLORS.woodDark} floorY={840} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.purpleDeep, -0.05)} opacity={0.5} />)}
    {/* row of warped mirror frames */}
    {([[300, COLORS.sky], [740, COLORS.pink], [1180, COLORS.greenLeaf], [1620, COLORS.yellowDark]] as [number, string][]).map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 400)`}>
        <path d="M -110 280 Q -150 0 -110 -220 Q 0 -260 110 -220 Q 150 0 110 280 Q 0 240 -110 280 Z" fill={shade(COLORS.outline, 0.3)} {...xl} />
        <path d="M -82 240 Q -118 0 -82 -184 Q 0 -214 82 -184 Q 118 0 82 240 Q 0 206 -82 240 Z" fill={shade(c, 0.12)} {...sm} />
        {/* a wobbly distorted reflection */}
        <g transform={`scale(${i % 2 ? 1.3 : 0.7} ${i % 2 ? 0.7 : 1.3})`}><circle cx={0} cy={-30} r={34} fill={COLORS.white} {...lg} /><circle cx={-12} cy={-36} r={5} fill={COLORS.outline} /><circle cx={12} cy={-36} r={5} fill={COLORS.outline} /><path d="M -34 48 Q 0 -6 34 48 Z" fill={shade(COLORS.white, 0.1)} {...xl} /></g>
      </g>
    ))}
    {/* carnival bunting */}
    {Array.from({ length: 13 }).map((_, i) => <path key={i} d={`M ${i * 160} 0 L ${i * 160 + 80} 54 L ${i * 160 + 160} 0 Z`} fill={[COLORS.red, COLORS.yellow, COLORS.sky][i % 3]} {...sm} />)}
  </g>
);

/** Foggy mind: a dim, grey internal headspace clouded by distorted thoughts —
 *  how the world looks through the lens. */
export const FoggyMind: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.ledGrey, 0.12)} floor={shade(COLORS.ledGrey, -0.1)} floorY={860} stripe={false} />
    {/* darker upper band + lighter mid band to split the flat grey */}
    <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.ledGrey, -0.05)} opacity={0.7} />
    <rect x={0} y={380} width={CANVAS.width} height={200} fill={shade(COLORS.ledGrey, 0.05)} opacity={0.5} />
    {/* many drifting fog banks covering the space */}
    {([[220, 160, 0.6], [640, 120, 0.5], [1080, 180, 0.6], [1500, 140, 0.5], [1760, 300, 0.5], [120, 360, 0.5], [500, 440, 0.5], [900, 400, 0.45], [1300, 460, 0.5], [1680, 520, 0.5]] as [number, number, number][]).map(([x, y, o], i) => (
      <g key={i} transform={`translate(${x} ${y})`} opacity={o}>
        <ellipse cx={0} cy={0} rx={160} ry={64} fill={COLORS.whiteShade} {...lg} />
        <ellipse cx={96} cy={14} rx={104} ry={52} fill={COLORS.whiteShade} {...sm} />
        <ellipse cx={-96} cy={10} rx={94} ry={46} fill={COLORS.whiteShade} {...sm} />
      </g>
    ))}
    {/* dark drifting storm patches */}
    {([[380, 300], [1180, 320], [1620, 240]] as [number, number][]).map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={120} ry={56} fill={shade(COLORS.outline, 0.15)} opacity={0.4} {...lg} />)}
    {/* tangled dark thought scribbles */}
    {[300, 760, 1180, 1620].map((x, i) => <path key={i} d={`M ${x} 640 q 60 -50 10 -100 q -50 -40 20 -90 q 50 -30 -10 -80`} fill="none" stroke={shade(COLORS.outline, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />)}
    {/* a dim lone lamp of clarity */}
    <g transform="translate(960 560)"><rect x={-8} y={0} width={16} height={300} fill={shade(COLORS.outline, 0.25)} {...sm} /><circle cx={0} cy={-10} r={46} fill={COLORS.yellowSoft} opacity={0.6} /><rect x={-24} y={-30} width={48} height={30} rx={8} fill={COLORS.yellow} {...lg} /></g>
  </g>
);

/** Reframe room: a calm therapy space — two chairs, a whiteboard turning a
 *  distorted thought into a balanced one. The place the lens comes off. */
export const ReframeRoom: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={820} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={260} fill={shade(COLORS.greenTeal, 0.08)} />
    {/* whiteboard: distorted -> balanced */}
    <g transform="translate(560 300)">
      <rect x={-300} y={-170} width={600} height={340} rx={14} fill={COLORS.white} {...xl} />
      <rect x={-250} y={-130} width={200} height={70} rx={10} fill={shade(COLORS.red, 0.3)} {...sm} /><text x={-150} y={-88} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={24} fill={COLORS.red}>"I failed"</text>
      <path d="M -40 -96 l 80 0 m -20 -14 l 20 14 l -20 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={50} y={-130} width={230} height={70} rx={10} fill={shade(COLORS.greenLeaf, 0.3)} {...sm} /><text x={165} y={-88} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={20} fill={COLORS.greenDark}>"this one didn't work"</text>
      <text x={0} y={60} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.outline}>catch · check · change</text>
      {[[-180, 110], [0, 110], [180, 110]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={20} fill={[COLORS.sky, COLORS.yellow, COLORS.greenLeaf][i]} {...sm} />)}
    </g>
    {/* two facing chairs */}
    {[[1300, false], [1620, true]].map(([x, flip], i) => (
      <g key={i} transform={`translate(${x} 700) scale(${flip ? -1 : 1} 1)`}>
        <rect x={-60} y={-20} width={120} height={120} rx={20} fill={[COLORS.red, COLORS.blueDiagram][i]} {...xl} />
        <rect x={-60} y={-90} width={120} height={80} rx={20} fill={shade([COLORS.red, COLORS.blueDiagram][i], 0.1)} {...lg} />
      </g>
    ))}
    {/* plant + soft lamp */}
    <g transform="translate(1480 740)"><path d="M -36 10 L 36 10 L 28 70 L -28 70 Z" fill={COLORS.red} {...lg} />{[-22, 0, 22].map((lx) => <path key={lx} d={`M ${lx} 10 q ${lx} -60 ${lx * 0.4} -120`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
  </g>
);

/** Emotion atrium: a bright hall with the colour-wheel of feelings on the floor
 *  and eight arched alcoves — the gallery of human emotion. */
export const EmotionAtrium: React.FC = () => {
  const cols = [COLORS.yellow, COLORS.greenLeaf, COLORS.greenDark, COLORS.blueDiagram, COLORS.purpleDeep, COLORS.sky, COLORS.red, COLORS.yellowDark];
  return (
    <g>
      <WallFloor wall={COLORS.bgCream} floor={COLORS.whiteShade} floorY={840} stripe={false} />
      <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.bgCream, -0.04)} />
      {/* arches tinted by emotion */}
      {cols.slice(0, 5).map((c, i) => (
        <g key={i} transform={`translate(${200 + i * 380} 320)`}>
          <path d="M -120 170 L -120 -40 Q -120 -170 0 -170 Q 120 -170 120 -40 L 120 170 Z" fill={shade(c, 0.16)} {...lg} />
          <circle cx={0} cy={-20} r={40} fill={c} {...lg} />
        </g>
      ))}
      {/* the emotion wheel medallion on the floor */}
      <g transform="translate(960 940)">
        <ellipse rx={260} ry={64} fill={shade(COLORS.whiteShade, -0.05)} {...lg} />
        {cols.map((c, i) => <g key={i} transform={`rotate(${i * 45})`}><ellipse cx={0} cy={-36} rx={20} ry={38} fill={c} opacity={0.8} {...sm} /></g>)}
        <circle cx={0} cy={0} r={22} fill={COLORS.white} {...lg} />
      </g>
      <g transform="translate(960 150)"><rect x={-210} y={-50} width={420} height={100} rx={14} fill={COLORS.purpleDeep} {...xl} /><text x={0} y={14} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={42} fill={COLORS.white}>HOW YOU FEEL</text></g>
    </g>
  );
};

/** Mood weather: a wide sky split into emotional weather — sun, storm, rain and a
 *  rainbow — feelings as the inner climate. */
export const MoodWeather: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.sky} floor={COLORS.greenLeaf} floorY={760} stripe={false} />
    <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.sky, 0.1)} />
    {/* sun (joy) */}
    <g transform="translate(260 220)"><circle r={76} fill={COLORS.yellow} {...sm} />{Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={-90} x2={0} y2={-116} stroke={COLORS.yellow} strokeWidth={STROKE.sm} transform={`rotate(${i * 36})`} strokeLinecap="round" />)}</g>
    {/* storm cloud + lightning (anger) */}
    <g transform="translate(760 200)"><ellipse cx={0} cy={0} rx={120} ry={56} fill={shade(COLORS.outline, 0.3)} {...xl} /><ellipse cx={80} cy={14} rx={80} ry={44} fill={shade(COLORS.outline, 0.3)} {...lg} /><path d="M -10 50 l -28 70 l 24 0 l -20 70 l 60 -100 l -24 0 l 30 -60 Z" fill={COLORS.yellow} {...sm} /></g>
    {/* rain cloud (sadness) */}
    <g transform="translate(1250 180)"><ellipse cx={0} cy={0} rx={110} ry={50} fill={COLORS.blueDiagram} {...xl} />{[-50, -10, 30, 70].map((x, i) => <line key={i} x1={x} y1={50} x2={x - 8} y2={120} stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.7} />)}</g>
    {/* rainbow (hope) */}
    {[COLORS.red, COLORS.yellow, COLORS.greenLeaf, COLORS.sky].map((c, i) => <path key={i} d={`M ${1500 - i * 16} 760 A ${300 - i * 16} ${300 - i * 16} 0 0 1 ${1900 - i * 16} 760`} fill="none" stroke={c} strokeWidth={STROKE.xl} />)}
    {/* rolling ground */}
    <path d="M 0 760 Q 480 690 960 760 Q 1440 820 1920 720 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.greenLeaf, 0.08)} />
    {[200, 700, 1300, 1700].map((x, i) => <g key={i} transform={`translate(${x} 880)`}><circle cx={-20} cy={0} r={30} fill={shade(COLORS.greenLeaf, -0.08)} {...lg} /><circle cx={22} cy={-6} r={36} fill={shade(COLORS.greenLeaf, -0.04)} {...lg} /></g>)}
  </g>
);

/** Heart lab: a laboratory of feelings — a heart specimen under a dome, beakers of
 *  coloured emotion, and charts on the wall. */
export const HeartLab: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.whiteShade} floorY={820} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.greenTeal, 0.06)} opacity={0.5} />)}
    {/* wall chart of the wheel */}
    <g transform="translate(340 280)"><rect x={-140} y={-140} width={280} height={280} rx={12} fill={COLORS.white} {...xl} />{[COLORS.yellow, COLORS.greenLeaf, COLORS.blueDiagram, COLORS.red, COLORS.purpleDeep, COLORS.sky, COLORS.greenDark, COLORS.yellowDark].map((c, i) => <g key={i} transform={`rotate(${i * 45})`}><ellipse cx={0} cy={-70} rx={20} ry={36} fill={c} {...sm} /></g>)}<circle cx={0} cy={0} r={24} fill={COLORS.whiteShade} {...lg} /></g>
    {/* heart specimen under a glass dome */}
    <g transform="translate(960 640)">
      <rect x={-110} y={60} width={220} height={40} rx={10} fill={COLORS.ledGrey} {...xl} />
      <path d="M -100 60 A 100 120 0 0 1 100 60 Z" fill={COLORS.sky} opacity={0.25} {...lg} />
      <path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...xl} />
    </g>
    {/* beakers of coloured emotion */}
    {([[1480, COLORS.yellow], [1600, COLORS.blueDiagram], [1720, COLORS.greenLeaf]] as [number, string][]).map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 720)`}><path d="M -30 -50 L -30 -20 L -46 40 Q -50 70 -16 70 L 16 70 Q 50 70 46 40 L 30 -20 L 30 -50 Z" fill={COLORS.white} {...lg} /><path d="M -40 20 L 40 20 L 30 55 Q 30 60 16 60 L -16 60 Q -30 60 -30 55 Z" fill={c} {...sm} /><rect x={-34} y={-58} width={68} height={12} rx={4} fill={COLORS.ledGrey} /></g>
    ))}
  </g>
);

/** Love gallery: a warm hall of hearts — arched alcoves and a heart medallion,
 *  celebrating the many ways to love. */
export const LoveGallery: React.FC = () => {
  const cols = [COLORS.red, COLORS.yellow, COLORS.greenLeaf, COLORS.pink, COLORS.purpleDeep];
  return (
    <g>
      <WallFloor wall={COLORS.pink} floor={COLORS.whiteShade} floorY={840} stripe={false} />
      <rect x={0} y={560} width={CANVAS.width} height={280} fill={shade(COLORS.pink, 0.06)} />
      {cols.map((c, i) => (
        <g key={i} transform={`translate(${200 + i * 380} 320)`}>
          <path d="M -120 170 L -120 -40 Q -120 -170 0 -170 Q 120 -170 120 -40 L 120 170 Z" fill={shade(COLORS.pink, 0.1)} {...lg} />
          <path d={`M 0 ${30} C -40 -8 -62 -30 -36 -54 C -20 -70 0 -48 0 -34 C 0 -48 20 -70 36 -54 C 62 -30 40 -8 0 30 Z`} fill={c} {...xl} transform="translate(0 -10)" />
        </g>
      ))}
      {/* heart medallion on the floor */}
      <g transform="translate(960 930)"><ellipse rx={220} ry={54} fill={shade(COLORS.whiteShade, -0.05)} {...lg} /><g transform="scale(0.5)"><path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...xl} /></g></g>
      <g transform="translate(960 150)"><rect x={-200} y={-50} width={400} height={100} rx={14} fill={COLORS.red} {...xl} /><text x={0} y={14} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={40} fill={COLORS.white}>WAYS TO LOVE</text></g>
    </g>
  );
};

/** Cozy hearth: a warm family home — fireplace, framed photos and a soft sofa,
 *  the home of storge, philia and pragma. */
export const CozyHearth: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.wood, 0.14)} floor={COLORS.woodDark} floorY={760} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={200} fill={shade(COLORS.wood, 0.08)} />
    {/* fireplace */}
    <g transform="translate(360 480)">
      <rect x={-150} y={-180} width={300} height={360} rx={10} fill={shade(COLORS.outline, 0.35)} {...xl} />
      <rect x={-100} y={-40} width={200} height={220} rx={8} fill={COLORS.outline} />
      <path d="M -40 180 q -20 -90 20 -130 q -10 50 20 60 q 20 -30 10 -70 q 40 50 30 140 Z" fill={COLORS.yellow} {...sm} /><path d="M -14 180 q -10 -60 14 -90 q 20 40 4 90 Z" fill={COLORS.red} {...sm} />
      <rect x={-170} y={-200} width={340} height={40} rx={8} fill={shade(COLORS.wood, 0.1)} {...lg} />
    </g>
    {/* mantel photos */}
    {[260, 460].map((x, i) => <g key={i} transform={`translate(${x} 250)`}><rect x={-44} y={-40} width={88} height={80} rx={6} fill={COLORS.white} {...lg} /><circle cx={0} cy={-6} r={18} fill={[COLORS.sky, COLORS.pink][i]} {...sm} /></g>)}
    {/* sofa */}
    <g transform="translate(1180 640)">
      <rect x={-220} y={-30} width={440} height={150} rx={28} fill={COLORS.red} {...xl} />
      <rect x={-260} y={-10} width={70} height={150} rx={26} fill={shade(COLORS.red, 0.12)} {...lg} /><rect x={190} y={-10} width={70} height={150} rx={26} fill={shade(COLORS.red, 0.12)} {...lg} />
      <rect x={-180} y={-100} width={360} height={80} rx={24} fill={shade(COLORS.red, 0.06)} {...xl} />
      {[-90, 90].map((x, i) => <rect key={i} x={x - 45} y={-60} width={90} height={70} rx={16} fill={[COLORS.yellowSoft, COLORS.sky][i]} {...std} />)}
    </g>
    {/* warm rug + lamp */}
    <ellipse cx={1180} cy={900} rx={420} ry={70} fill={COLORS.yellowSoft} opacity={0.4} />
    <g transform="translate(1760 560)"><rect x={-8} y={0} width={16} height={200} fill={COLORS.ledGrey} {...sm} /><path d="M -50 0 L 50 0 L 34 -66 L -34 -66 Z" fill={COLORS.yellow} {...lg} /></g>
    {/* window with warm evening on the right wall */}
    <g transform="translate(1600 290)"><rect x={-130} y={-150} width={260} height={280} rx={14} fill={shade(COLORS.yellowDark, 0.12)} {...xl} /><circle cx={0} cy={30} r={50} fill={COLORS.yellow} {...sm} /><line x1={-130} y1={-10} x2={130} y2={-10} stroke={shade(COLORS.wood, 0.14)} strokeWidth={STROKE.lg} /><line x1={0} y1={-150} x2={0} y2={130} stroke={shade(COLORS.wood, 0.14)} strokeWidth={STROKE.lg} /></g>
    {/* a heart-framed wall picture + hanging shelf with books */}
    <g transform="translate(900 250)"><rect x={-56} y={-56} width={112} height={112} rx={10} fill={COLORS.bgCream} {...xl} /><path d="M 0 24 C -26 -2 -42 -18 -24 -38 C -12 -50 0 -32 0 -20 C 0 -32 12 -50 24 -38 C 42 -18 26 -2 0 24 Z" fill={COLORS.red} {...sm} /></g>
    <g transform="translate(1180 360)"><rect x={-90} y={0} width={180} height={14} rx={4} fill={shade(COLORS.wood, 0.1)} {...lg} />{[-70, -44, -18, 8].map((x, i) => <rect key={i} x={x} y={-56} width={20} height={56} rx={3} fill={[COLORS.red, COLORS.sky, COLORS.greenLeaf, COLORS.yellow][i]} {...sm} />)}</g>
  </g>
);

/** Blossom garden: a romantic garden in bloom — a flower arch, rose bushes and
 *  drifting petals, the home of eros and agape. */
export const BlossomGarden: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.sky, 0.08)} floor={COLORS.greenLeaf} floorY={760} stripe={false} />
    <rect x={0} y={0} width={CANVAS.width} height={260} fill={shade(COLORS.pink, 0.16)} opacity={0.4} />
    <circle cx={1580} cy={210} r={80} fill={COLORS.yellowSoft} {...sm} />
    {/* flower arch */}
    <g transform="translate(560 420)">
      <path d="M -200 340 L -200 0 Q -200 -200 0 -200 Q 200 -200 200 0 L 200 340" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} />
      {Array.from({ length: 16 }).map((_, i) => { const t = i / 15; const a = Math.PI * (1 - t); const x = Math.cos(a) * 200; const y = -Math.sin(a) * 200; return <g key={i} transform={`translate(${x} ${y})`}>{[0, 72, 144, 216, 288].map((d) => <ellipse key={d} cx={0} cy={-10} rx={9} ry={16} fill={[COLORS.pink, COLORS.red, COLORS.yellow][i % 3]} {...sm} transform={`rotate(${d})`} />)}<circle r={7} fill={COLORS.yellowDark} /></g>; })}
    </g>
    {/* rolling ground + rose bushes */}
    <path d="M 0 760 Q 480 700 960 760 Q 1440 810 1920 730 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.greenLeaf, 0.08)} />
    {[1300, 1600, 1150].map((x, i) => <g key={i} transform={`translate(${x} 840)`}><circle cx={-24} cy={0} r={38} fill={shade(COLORS.greenLeaf, -0.08)} {...lg} /><circle cx={24} cy={-8} r={44} fill={shade(COLORS.greenLeaf, -0.04)} {...lg} />{[[-24, -6], [24, -14], [4, 10]].map(([px, py], j) => <circle key={j} cx={px} cy={py} r={10} fill={[COLORS.red, COLORS.pink, COLORS.yellow][j]} {...sm} />)}</g>)}
    {/* drifting petals */}
    {Array.from({ length: 12 }).map((_, i) => <ellipse key={i} cx={200 + (i * 151) % 1600} cy={120 + (i * 83) % 420} rx={10} ry={6} fill={COLORS.pink} opacity={0.6} transform={`rotate(${i * 40} ${200 + (i * 151) % 1600} ${120 + (i * 83) % 420})`} />)}
  </g>
);

/** Connection lounge: a warm social space — facing sofas, soft lamps, plants and
 *  string lights, where people are drawn together. */
export const ConnectionLounge: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.yellowDark, 0.14)} floor={COLORS.wood} floorY={760} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={200} fill={shade(COLORS.yellowDark, 0.08)} />
    {/* string lights */}
    <path d="M 0 60 Q 480 150 960 70 Q 1440 -10 1920 80" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.sm} />
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={100 + i * 190} cy={92 + 28 * Math.sin(i)} r={11} fill={COLORS.yellow} {...sm} />)}
    {/* big framed warm picture */}
    <g transform="translate(960 270)"><rect x={-120} y={-100} width={240} height={200} rx={10} fill={COLORS.bgCream} {...xl} /><circle cx={0} cy={-20} r={44} fill={COLORS.yellow} {...sm} /><path d="M -120 100 L -40 20 L 20 60 L 90 -10 L 120 20 L 120 100 Z" fill={COLORS.greenLeaf} {...sm} /></g>
    {/* window with warm evening on the right */}
    <g transform="translate(1620 290)"><rect x={-130} y={-150} width={260} height={280} rx={14} fill={shade(COLORS.yellowDark, 0.12)} {...xl} /><circle cx={0} cy={30} r={50} fill={COLORS.yellow} {...sm} /><line x1={-130} y1={-10} x2={130} y2={-10} stroke={shade(COLORS.yellowDark, 0.14)} strokeWidth={STROKE.lg} /><line x1={0} y1={-150} x2={0} y2={130} stroke={shade(COLORS.yellowDark, 0.14)} strokeWidth={STROKE.lg} /></g>
    {/* a shelf of books + a small clock on the left */}
    <g transform="translate(300 300)"><rect x={-90} y={0} width={180} height={14} rx={4} fill={shade(COLORS.wood, 0.1)} {...lg} />{[-72, -46, -20, 6, 32].map((x, i) => <rect key={i} x={x} y={-58} width={20} height={58} rx={3} fill={[COLORS.red, COLORS.sky, COLORS.greenLeaf, COLORS.yellow, COLORS.lavender][i]} {...sm} />)}</g>
    <g transform="translate(300 160)"><circle r={44} fill={COLORS.white} {...xl} /><line x1={0} y1={0} x2={0} y2={-28} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><line x1={0} y1={0} x2={20} y2={8} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
    {/* two facing sofas */}
    {([[420, false, COLORS.red], [1500, true, COLORS.blueDiagram]] as [number, boolean, string][]).map(([x, flip, c], i) => (
      <g key={i} transform={`translate(${x} 650) scale(${flip ? -1 : 1} 1)`}>
        <rect x={-150} y={-20} width={300} height={130} rx={24} fill={c} {...xl} />
        <rect x={-186} y={-4} width={56} height={130} rx={22} fill={shade(c, 0.12)} {...lg} />
        <rect x={130} y={-4} width={56} height={130} rx={22} fill={shade(c, 0.12)} {...lg} />
        <rect x={-120} y={-80} width={240} height={66} rx={20} fill={shade(c, 0.06)} {...xl} />
        <rect x={-70} y={-54} width={70} height={54} rx={14} fill={COLORS.yellowSoft} {...std} />
      </g>
    ))}
    {/* coffee table + plant */}
    <g transform="translate(960 760)"><ellipse cx={0} cy={0} rx={130} ry={34} fill={shade(COLORS.wood, 0.14)} {...xl} /><rect x={-14} y={24} width={28} height={70} fill={COLORS.woodDark} /><g transform="translate(0 -12)"><rect x={-22} y={-18} width={44} height={30} rx={6} fill={COLORS.sky} {...sm} /></g></g>
    <g transform="translate(1760 640)"><path d="M -36 10 L 36 10 L 28 70 L -28 70 Z" fill={COLORS.red} {...lg} />{[-22, 0, 22].map((lx) => <path key={lx} d={`M ${lx} 10 q ${lx} -60 ${lx * 0.4} -120`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
  </g>
);

/** Spotlight stage: a performer's stage with curtains, a mic and a warm spotlight —
 *  presence under the lights. */
export const SpotlightStage: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.purpleDeep} floor={COLORS.woodDark} floorY={820} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.purpleDeep, -0.05)} opacity={0.5} />)}
    {/* side curtains */}
    <path d="M 0 0 L 240 0 Q 180 400 220 760 Q 100 700 0 760 Z" fill={COLORS.redDark} {...xl} />
    <path d="M 1920 0 L 1680 0 Q 1740 400 1700 760 Q 1820 700 1920 760 Z" fill={COLORS.redDark} {...xl} />
    {/* spotlight beam */}
    <g transform="translate(960 0)"><line x1={0} y1={0} x2={0} y2={60} {...sm} /><path d="M -50 60 L 50 60 L 30 100 L -30 100 Z" fill={COLORS.yellowDark} {...lg} /><path d="M 0 100 L -280 820 L 280 820 Z" fill={COLORS.yellowSoft} opacity={0.16} /></g>
    <ellipse cx={960} cy={900} rx={300} ry={70} fill={COLORS.yellowSoft} opacity={0.18} />
    {/* mic stand */}
    <g transform="translate(960 560)"><rect x={-6} y={0} width={12} height={300} fill={COLORS.ledGrey} {...sm} /><circle cx={0} cy={-14} r={26} fill={shade(COLORS.outline, 0.3)} {...lg} />{[-12, 0, 12].map((y) => <line key={y} x1={-18} y1={-14 + y} x2={18} y2={-14 + y} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />)}</g>
    {/* audience silhouettes */}
    {Array.from({ length: 11 }).map((_, i) => <circle key={i} cx={160 + i * 160} cy={1020} r={52} fill={shade(COLORS.woodDark, -0.12)} {...lg} />)}
  </g>
);

/** Fireside circle: an intimate campfire at night — logs to sit on, warm glow and
 *  a sky of stars, where stories and connection happen. */
export const FiresideCircle: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.purpleDeep, 0.06)} floor={COLORS.greenDark} floorY={720} stripe={false} />
    {/* lighter horizon glow band splits the flat night */}
    <rect x={0} y={0} width={CANVAS.width} height={240} fill={shade(COLORS.purpleDeep, -0.06)} opacity={0.6} />
    <rect x={0} y={480} width={CANVAS.width} height={240} fill={shade(COLORS.purpleDeep, 0.14)} opacity={0.6} />
    {/* moon with glow + big and small stars */}
    <circle cx={1560} cy={200} r={120} fill={COLORS.yellowSoft} opacity={0.22} />
    <circle cx={1560} cy={200} r={66} fill={COLORS.yellowSoft} {...sm} />
    {Array.from({ length: 30 }).map((_, i) => { const s = 2 + (i % 3) * 2; const x = 90 + (i * 127) % 1760; const y = 70 + (i * 83) % 420; return <path key={i} d={`M ${x} ${y - s * 2} l ${s} ${s * 2} l ${s * 2} ${s} l ${-s * 2} ${s} l ${-s} ${s * 2} l ${-s} ${-s * 2} l ${-s * 2} ${-s} l ${s * 2} ${-s} Z`} fill={COLORS.white} opacity={0.8} />; })}
    {/* distant tree silhouettes */}
    {[160, 420, 1720, 1860].map((x, i) => <g key={i} transform={`translate(${x} 560)`}><rect x={-14} y={-60} width={28} height={180} fill={shade(COLORS.purpleDeep, -0.1)} /><circle cx={0} cy={-80} r={70} fill={shade(COLORS.purpleDeep, -0.1)} /></g>)}
    {/* hills */}
    <path d="M 0 720 Q 480 640 960 720 Q 1440 790 1920 690 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.greenDark, 0.08)} />
    {/* warm glow */}
    <ellipse cx={960} cy={900} rx={440} ry={180} fill={COLORS.yellowSoft} opacity={0.18} />
    {/* campfire */}
    <g transform="translate(960 900)">
      {[-70, 70].map((x, i) => <rect key={i} x={x - 50} y={10} width={100} height={22} rx={10} fill={COLORS.woodDark} {...lg} transform={`rotate(${i ? 20 : -20} ${x} 20)`} />)}
      <path d="M -40 10 q -20 -90 20 -130 q -10 50 20 60 q 20 -30 10 -70 q 40 50 30 140 Z" fill={COLORS.yellow} {...xl} /><path d="M -14 10 q -10 -60 14 -90 q 20 40 4 90 Z" fill={COLORS.red} {...sm} />
    </g>
    {/* logs to sit on */}
    {[480, 1440].map((x, i) => <g key={i} transform={`translate(${x} 860)`}><rect x={-70} y={-16} width={140} height={32} rx={14} fill={COLORS.wood} {...xl} /><ellipse cx={-70} cy={0} rx={12} ry={16} fill={shade(COLORS.wood, -0.1)} /></g>)}
  </g>
);

/** Habit-brain paths: a cross-section of the mind as worn grooves — deep,
 *  automatic paths and one faint new trail being carved. */
export const HabitBrainPaths: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.lavender} floor={shade(COLORS.lavender, -0.08)} floorY={840} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.lavender, -0.04)} opacity={0.5} />)}
    {/* a big brain outline */}
    <g transform="translate(960 430)">
      <path d="M -320 60 Q -360 -120 -200 -160 Q -140 -230 -20 -190 Q 100 -240 220 -170 Q 380 -150 360 40 Q 380 170 220 200 Q 120 250 -20 210 Q -160 250 -260 190 Q -350 160 -320 60 Z" fill={shade(COLORS.pink, 0.1)} {...xl} />
      {/* deep well-worn grooves */}
      {[[-200, -40, COLORS.red], [40, -70, COLORS.red], [160, 60, COLORS.red]].map(([x, y, c], i) => <path key={i} d={`M ${x} ${y} q 80 -40 150 20 q 60 60 -20 110`} fill="none" stroke={c as string} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.7} />)}
      {/* a faint new trail */}
      <path d="M -260 80 q 120 -20 180 60" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray="6 14" />
      {/* little node sparks */}
      {[[-180, -30], [80, -40], [200, 80], [-80, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={12} fill={COLORS.yellow} {...sm} />)}
    </g>
    <text x={960} y={160} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={34} fill={COLORS.outline} opacity={0.5}>worn into the brain</text>
  </g>
);

/** Routine kitchen: the daily stage where habits live — coffee maker, toaster, a
 *  wall calendar and clock. */
export const RoutineKitchen: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.sky, 0.1)} floor={COLORS.wood} floorY={760} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={200} fill={shade(COLORS.sky, 0.04)} />
    {/* upper cabinets */}
    {[160, 420, 680].map((x, i) => <rect key={i} x={x} y={120} width={220} height={180} rx={8} fill={shade(COLORS.wood, 0.1)} {...lg} />)}
    {/* wall clock + calendar */}
    <g transform="translate(1180 230)"><circle r={70} fill={COLORS.white} {...xl} /><line x1={0} y1={0} x2={0} y2={-46} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={0} y1={0} x2={34} y2={10} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><circle r={7} fill={COLORS.outline} /></g>
    <g transform="translate(1500 250)"><rect x={-90} y={-100} width={180} height={190} rx={10} fill={COLORS.white} {...xl} /><rect x={-90} y={-100} width={180} height={44} rx={10} fill={COLORS.red} {...sm} />{Array.from({ length: 3 }).map((_, r) => Array.from({ length: 4 }).map((_, c) => <rect key={`${r}-${c}`} x={-74 + c * 40} y={-40 + r * 42} width={28} height={28} rx={4} fill={shade(COLORS.white, 0.05)} stroke={shade(COLORS.sky, -0.1)} strokeWidth={STROKE.sm} />))}<path d="M 30 24 l 10 10 l 18 -22" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
    {/* counter */}
    <rect x={0} y={700} width={CANVAS.width} height={40} fill={shade(COLORS.wood, 0.14)} {...xl} />
    <rect x={0} y={740} width={CANVAS.width} height={320} fill={COLORS.wood} />
    {/* coffee maker + mug + toaster */}
    <g transform="translate(360 650)"><rect x={-50} y={-50} width={100} height={100} rx={10} fill={shade(COLORS.outline, 0.3)} {...xl} /><rect x={-34} y={20} width={68} height={30} rx={6} fill={COLORS.white} {...sm} /><rect x={-20} y={-40} width={40} height={16} rx={6} fill={COLORS.red} /></g>
    <g transform="translate(560 690)"><rect x={-30} y={-30} width={60} height={50} rx={8} fill={COLORS.yellow} {...lg} /><path d="M 30 -18 q 18 2 12 18" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} /></g>
    <g transform="translate(1640 660)"><rect x={-60} y={-40} width={120} height={80} rx={14} fill={COLORS.ledGrey} {...xl} /><rect x={-30} y={-54} width={24} height={20} rx={4} fill={shade(COLORS.wood, 0.1)} /><rect x={6} y={-54} width={24} height={20} rx={4} fill={shade(COLORS.wood, 0.1)} /></g>
  </g>
);

/** Habit studio: a calm space to build a new habit — a tracker wall of
 *  checkmarks, a tidy desk, a plant and a water bottle. */
export const HabitStudio: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.bgCream} floor={COLORS.wood} floorY={800} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={240} fill={shade(COLORS.bgCream, -0.04)} />
    {/* big habit tracker board */}
    <g transform="translate(560 300)">
      <rect x={-300} y={-180} width={600} height={360} rx={14} fill={COLORS.white} {...xl} />
      <text x={0} y={-130} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={30} fill={COLORS.outline}>DAILY HABITS</text>
      {Array.from({ length: 3 }).map((_, r) => Array.from({ length: 7 }).map((_, c) => {
        const done = (r * 7 + c) < 16;
        return <g key={`${r}-${c}`} transform={`translate(${-250 + c * 80} ${-60 + r * 70})`}><rect x={-26} y={-26} width={52} height={52} rx={8} fill={done ? COLORS.greenLeaf : shade(COLORS.bgCream, -0.04)} {...sm} />{done && <path d="M -12 0 l 8 8 l 14 -18" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />}</g>;
      }))}
    </g>
    {/* desk + plant + water + journal */}
    <rect x={0} y={760} width={CANVAS.width} height={40} fill={shade(COLORS.wood, 0.12)} {...lg} />
    <g transform="translate(1500 640)"><path d="M -36 10 L 36 10 L 28 70 L -28 70 Z" fill={COLORS.red} {...lg} />{[-22, 0, 22].map((lx) => <path key={lx} d={`M ${lx} 10 q ${lx} -70 ${lx * 0.4} -130`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
    <g transform="translate(1180 690)"><rect x={-24} y={-70} width={48} height={100} rx={12} fill={COLORS.sky} {...lg} /><rect x={-16} y={-86} width={32} height={20} rx={6} fill={shade(COLORS.sky, -0.1)} {...sm} /></g>
    <g transform="translate(1340 710)"><rect x={-44} y={-40} width={88} height={60} rx={6} fill={COLORS.yellowSoft} {...lg} /><path d="M 0 -40 l 0 60" stroke={shade(COLORS.yellowSoft, -0.1)} strokeWidth={STROKE.sm} /></g>
  </g>
);

/** Impostor office: a successful workplace — a wall of awards and a diploma, a
 *  tidy desk — where someone secretly feels like a fraud. */
export const ImpostorOffice: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.blueDiagram} floor={COLORS.woodDark} floorY={760} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.blueDiagram, -0.05)} opacity={0.4} />)}
    {/* framed diploma */}
    <g transform="translate(340 260)"><rect x={-110} y={-80} width={220} height={160} rx={8} fill={COLORS.bgCream} {...xl} /><rect x={-84} y={-52} width={168} height={14} rx={6} fill={COLORS.whiteShade} /><rect x={-84} y={-24} width={120} height={12} rx={6} fill={COLORS.whiteShade} /><circle cx={66} cy={40} r={22} fill={COLORS.red} {...sm} /><path d="M 66 62 l -8 24 l 8 -8 l 8 8 Z" fill={COLORS.red} /></g>
    {/* wall of awards / trophies + star plaques */}
    {([[760, COLORS.yellow], [980, COLORS.sky], [1200, COLORS.greenLeaf]] as [number, string][]).map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 230)`}><rect x={-56} y={-50} width={112} height={100} rx={8} fill={COLORS.white} {...lg} /><path d="M 0 -30 L 10 -8 L 34 -6 L 16 10 L 22 32 L 0 20 L -22 32 L -16 10 L -34 -6 L -10 -8 Z" fill={c} {...sm} /></g>
    ))}
    {/* window */}
    <g transform="translate(1600 280)"><rect x={-120} y={-150} width={240} height={280} rx={12} fill={shade(COLORS.sky, 0.14)} {...xl} /><circle cx={0} cy={30} r={48} fill={COLORS.yellow} {...sm} /><line x1={-120} y1={-10} x2={120} y2={-10} stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} /><line x1={0} y1={-150} x2={0} y2={130} stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} /></g>
    {/* desk + laptop + mug */}
    <rect x={0} y={700} width={CANVAS.width} height={40} fill={shade(COLORS.wood, 0.12)} {...xl} />
    <rect x={0} y={740} width={CANVAS.width} height={320} fill={COLORS.wood} />
    <g transform="translate(560 650)"><rect x={-96} y={-66} width={192} height={120} rx={10} fill={shade(COLORS.outline, 0.3)} {...xl} /><rect x={-82} y={-52} width={164} height={92} rx={6} fill={COLORS.sky} /><rect x={-120} y={54} width={240} height={20} rx={8} fill={shade(COLORS.outline, 0.25)} {...lg} /></g>
    <g transform="translate(820 690)"><rect x={-28} y={-30} width={56} height={54} rx={8} fill={COLORS.red} {...lg} /><path d="M 28 -18 q 18 2 12 18" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} /></g>
  </g>
);

/** Exposure spotlight: a stark stage where the fear of being "found out" lives —
 *  one harsh light, a lectern, a silent audience. */
export const ExposureSpotlight: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.purpleDeep, 0.04)} floor={COLORS.woodDark} floorY={840} stripe={false} />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={i * 90} y={0} width={44} height={560} fill={shade(COLORS.purpleDeep, -0.06)} opacity={0.5} />)}
    {/* harsh spotlight */}
    <g transform="translate(960 0)"><line x1={0} y1={0} x2={0} y2={50} {...sm} /><path d="M -44 50 L 44 50 L 26 86 L -26 86 Z" fill={COLORS.ledGrey} {...lg} /><path d="M 0 86 L -230 840 L 230 840 Z" fill={COLORS.white} opacity={0.14} /></g>
    <ellipse cx={960} cy={900} rx={260} ry={60} fill={COLORS.white} opacity={0.12} />
    {/* lectern */}
    <g transform="translate(960 600)"><path d="M -60 160 L 60 160 L 40 0 L -40 0 Z" fill={COLORS.wood} {...xl} /><rect x={-70} y={-10} width={140} height={30} rx={8} fill={shade(COLORS.wood, 0.14)} {...lg} /></g>
    {/* silent audience of eyes */}
    {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${130 + i * 150} 1010)`}><circle r={54} fill={shade(COLORS.woodDark, -0.12)} {...lg} /><circle cx={-16} cy={-10} r={8} fill={COLORS.white} /><circle cx={16} cy={-10} r={8} fill={COLORS.white} /></g>)}
  </g>
);

/** Reframe desk: a calm space to rebuild self-worth — a board of real wins, a
 *  mirror and a warm lamp. */
export const ReframeDesk: React.FC = () => (
  <g>
    <WallFloor wall={COLORS.greenTeal} floor={COLORS.wood} floorY={800} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={240} fill={shade(COLORS.greenTeal, 0.08)} />
    {/* evidence board of pinned wins */}
    <g transform="translate(560 300)">
      <rect x={-300} y={-180} width={600} height={340} rx={14} fill={shade(COLORS.wood, 0.1)} {...xl} />
      <text x={0} y={-130} textAnchor="middle" fontFamily="Baloo 2" fontWeight={800} fontSize={28} fill={COLORS.white}>THE EVIDENCE</text>
      {Array.from({ length: 6 }).map((_, i) => { const x = -200 + (i % 3) * 200; const y = -60 + Math.floor(i / 3) * 110; return <g key={i} transform={`translate(${x} ${y}) rotate(${(i % 2 ? 1 : -1) * 4})`}><rect x={-80} y={-44} width={160} height={88} rx={6} fill={[COLORS.yellowSoft, COLORS.white, COLORS.sky][i % 3]} {...lg} /><circle cx={0} cy={-44} r={8} fill={COLORS.red} />{[-24, -2, 20].map((ly) => <line key={ly} x1={-56} y1={ly} x2={56} y2={ly} stroke={shade(COLORS.outline, 0.3)} strokeWidth={STROKE.sm} opacity={0.4} />)}</g>; })}
    </g>
    {/* mirror */}
    <g transform="translate(1600 420)"><rect x={-90} y={-180} width={180} height={360} rx={90} fill={COLORS.sky} {...xl} /><rect x={-70} y={-160} width={140} height={320} rx={70} fill={shade(COLORS.sky, 0.14)} /></g>
    {/* desk + plant + lamp */}
    <rect x={0} y={760} width={CANVAS.width} height={40} fill={shade(COLORS.wood, 0.12)} {...lg} />
    <g transform="translate(1180 700)"><path d="M -36 10 L 36 10 L 28 60 L -28 60 Z" fill={COLORS.red} {...lg} />{[-22, 0, 22].map((lx) => <path key={lx} d={`M ${lx} 10 q ${lx} -60 ${lx * 0.4} -110`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
    <g transform="translate(1340 620)"><rect x={-8} y={0} width={16} height={180} fill={COLORS.ledGrey} {...sm} /><path d="M -48 0 L 48 0 L 32 -62 L -32 -62 Z" fill={COLORS.yellow} {...lg} /></g>
  </g>
);

/** Grief shore: a quiet sea under a parting sky — where the tide of grief comes
 *  and goes, with a lone bench looking out. */
export const GriefShore: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.sky, 0.06)} floor={shade(COLORS.wood, 0.1)} floorY={820} stripe={false} />
    <rect x={0} y={0} width={CANVAS.width} height={300} fill={shade(COLORS.sky, 0.14)} />
    {/* parting clouds + light */}
    {[[320, 180], [1500, 160], [900, 120]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><ellipse rx={110} ry={44} fill={COLORS.white} {...lg} /><ellipse cx={72} cy={10} rx={74} ry={38} fill={COLORS.white} {...sm} /></g>)}
    <circle cx={960} cy={260} r={70} fill={COLORS.yellowSoft} opacity={0.6} {...sm} />
    {/* the sea */}
    <rect x={0} y={520} width={CANVAS.width} height={300} fill={COLORS.blueDiagram} />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M 0 ${560 + i * 50} q 240 -26 480 0 q 240 26 480 0 q 240 -26 480 0 q 240 26 480 0`} fill="none" stroke={shade(COLORS.blueDiagram, 0.14)} strokeWidth={STROKE.sm} opacity={0.6} />)}
    <path d="M 0 820 Q 480 780 960 820 Q 1440 850 1920 800 L 1920 1080 L 0 1080 Z" fill={shade(COLORS.wood, 0.14)} />
    {/* a lone bench facing the sea */}
    <g transform="translate(1480 880)"><rect x={-80} y={-18} width={160} height={16} rx={4} fill={COLORS.woodDark} {...lg} /><rect x={-80} y={-72} width={160} height={16} rx={4} fill={COLORS.woodDark} {...lg} /><rect x={-66} y={-2} width={14} height={56} fill={COLORS.woodDark} /><rect x={52} y={-2} width={14} height={56} fill={COLORS.woodDark} /></g>
  </g>
);

/** Memory room: a tender space of someone loved and lost — framed photos, an
 *  empty chair, a candle and soft window light. */
export const MemoryRoom: React.FC = () => (
  <g>
    <WallFloor wall={shade(COLORS.lavender, 0.04)} floor={COLORS.wood} floorY={760} stripe={false} />
    <rect x={0} y={560} width={CANVAS.width} height={200} fill={shade(COLORS.lavender, 0.06)} />
    {/* wall of framed photos */}
    {([[280, 220, COLORS.sky], [470, 180, COLORS.pink], [410, 360, COLORS.greenLeaf], [1540, 230, COLORS.yellowSoft]] as [number, number, string][]).map(([x, y, c], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${i % 2 ? 3 : -3})`}><rect x={-60} y={-54} width={120} height={108} rx={8} fill={COLORS.bgCream} {...xl} /><circle cx={0} cy={-8} r={24} fill={c} {...sm} /><path d="M -46 46 Q 0 6 46 46 Z" fill={c} {...sm} /></g>
    ))}
    {/* soft window */}
    <g transform="translate(960 280)"><rect x={-130} y={-150} width={260} height={280} rx={14} fill={shade(COLORS.yellowSoft, 0.1)} {...xl} /><circle cx={0} cy={20} r={56} fill={COLORS.yellowSoft} opacity={0.7} /><line x1={-130} y1={-10} x2={130} y2={-10} stroke={COLORS.lavenderDark} strokeWidth={STROKE.lg} /><line x1={0} y1={-150} x2={0} y2={130} stroke={COLORS.lavenderDark} strokeWidth={STROKE.lg} /></g>
    {/* empty armchair */}
    <g transform="translate(560 640)"><rect x={-110} y={-30} width={220} height={130} rx={24} fill={COLORS.red} {...xl} /><rect x={-150} y={-10} width={60} height={130} rx={22} fill={shade(COLORS.red, 0.12)} {...lg} /><rect x={90} y={-10} width={60} height={130} rx={22} fill={shade(COLORS.red, 0.12)} {...lg} /><rect x={-90} y={-110} width={180} height={90} rx={22} fill={shade(COLORS.red, 0.06)} {...xl} /></g>
    {/* side table + candle */}
    <g transform="translate(1340 680)"><rect x={-44} y={0} width={88} height={90} rx={8} fill={COLORS.wood} {...lg} /><circle cx={0} cy={-30} r={30} fill={COLORS.yellowSoft} opacity={0.5} /><rect x={-14} y={-24} width={28} height={40} rx={6} fill={COLORS.white} {...sm} /><path d="M 0 -40 Q 8 -30 0 -22 Q -8 -30 0 -40 Z" fill={COLORS.yellow} {...sm} /></g>
  </g>
);

/** Dawn meadow: a gentle field at first light — flowers, a tree and a candle of
 *  remembrance, where meaning and new growth begin. */
export const DawnMeadow: React.FC = () => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={COLORS.yellowSoft} />
    <rect x={0} y={0} width={CANVAS.width} height={400} fill={shade(COLORS.pink, 0.16)} opacity={0.4} />
    {/* rising sun + rays */}
    <circle cx={960} cy={420} r={120} fill={COLORS.yellow} {...sm} />
    {Array.from({ length: 16 }).map((_, i) => <line key={i} x1={960} y1={420} x2={960} y2={180} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={0.25} transform={`rotate(${i * 22.5} 960 420)`} strokeLinecap="round" />)}
    {/* ground */}
    <path d="M 0 720 Q 480 660 960 720 Q 1440 780 1920 700 L 1920 1080 L 0 1080 Z" fill={COLORS.greenLeaf} {...xl} />
    {/* a lone tree */}
    <g transform="translate(360 680)"><rect x={-26} y={-120} width={52} height={200} rx={12} fill={COLORS.woodDark} {...xl} /><circle cx={0} cy={-170} r={100} fill={shade(COLORS.greenLeaf, -0.04)} {...xl} /><circle cx={-60} cy={-130} r={64} fill={shade(COLORS.greenLeaf, 0.08)} {...lg} /><circle cx={60} cy={-130} r={64} fill={shade(COLORS.greenLeaf, 0.08)} {...lg} /></g>
    {/* flowers */}
    {[1180, 1340, 1500, 1640].map((x, i) => <g key={i} transform={`translate(${x} ${820 - (i % 2) * 30})`}><rect x={-3} y={0} width={6} height={50} fill={COLORS.greenDark} />{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-8} rx={7} ry={12} fill={[COLORS.pink, COLORS.red, COLORS.sky, COLORS.lavender][i % 4]} {...sm} transform={`rotate(${a})`} />)}<circle cy={-8} r={6} fill={COLORS.yellowDark} /></g>)}
    {/* candle of remembrance on a small stone */}
    <g transform="translate(1340 760)"><ellipse cx={0} cy={60} rx={60} ry={18} fill={shade(COLORS.ledGrey, 0.1)} {...lg} /><circle cx={0} cy={-6} r={40} fill={COLORS.yellowSoft} opacity={0.5} /><rect x={-16} y={0} width={32} height={50} rx={6} fill={COLORS.white} {...lg} /><path d="M 0 -18 Q 10 -4 0 8 Q -10 -4 0 -18 Z" fill={COLORS.yellow} {...sm} /></g>
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
  'insomnia-bedroom': InsomniaBedroom,
  'mind-control-room': MindControlRoom,
  'thought-void': ThoughtVoid,
  'calm-shore': CalmShore,
  'dream-bedroom': DreamBedroom,
  'sleep-lab': SleepLab,
  dreamscape: Dreamscape,
  'liminal-hallway': LiminalHallway,
  'study-den': StudyDen,
  'tinker-workshop': TinkerWorkshop,
  'late-night-desk': LateNightDesk,
  'mind-cosmos': MindCosmos,
  'inner-theater': InnerTheater,
  'daydream-realm': DaydreamRealm,
  'pacing-room': PacingRoom,
  'bus-window': BusWindow,
  'witching-bedroom': WitchingBedroom,
  'night-street': NightStreet,
  'brain-nightshift': BrainNightshift,
  'dawn-window': DawnWindow,
  'thinker-nook': ThinkerNook,
  'signpost-crossroads': SignpostCrossroads,
  'overthink-stairwell': OverthinkStairwell,
  'misty-clearing': MistyClearing,
  'break-room': BreakRoom,
  celebration: Celebration,
  'coffee-catchup': CoffeeCatchup,
  'masquerade-hall': MasqueradeHall,
  'pedestal-gallery': PedestalGallery,
  'analysis-room': AnalysisRoom,
  'personality-atrium': PersonalityAtrium,
  'analyst-lab': AnalystLab,
  'diplomat-garden': DiplomatGarden,
  'sentinel-hall': SentinelHall,
  'explorer-workshop': ExplorerWorkshop,
  'awareness-shaft': AwarenessShaft,
  'the-deep': TheDeep,
  'flow-river': FlowRiver,
  'clarity-summit': ClaritySummit,
  'procrastination-desk': ProcrastinationDesk,
  'deadline-cliff': DeadlineCliff,
  'fresh-start-desk': FreshStartDesk,
  'debate-stage': DebateStage,
  'courtroom-mind': CourtroomMind,
  'clarity-studio': ClarityStudio,
  'cozy-den': CozyDen,
  'forest-path-solo': ForestPathSolo,
  'draining-party': DrainingParty,
  'mind-gallery': MindGallery,
  'creative-studio': CreativeStudio,
  'open-nature': OpenNature,
  'thought-funhouse': ThoughtFunhouse,
  'foggy-mind': FoggyMind,
  'reframe-room': ReframeRoom,
  'emotion-atrium': EmotionAtrium,
  'mood-weather': MoodWeather,
  'heart-lab': HeartLab,
  'love-gallery': LoveGallery,
  'cozy-hearth': CozyHearth,
  'blossom-garden': BlossomGarden,
  'connection-lounge': ConnectionLounge,
  'spotlight-stage': SpotlightStage,
  'fireside-circle': FiresideCircle,
  'habit-brain-paths': HabitBrainPaths,
  'routine-kitchen': RoutineKitchen,
  'habit-studio': HabitStudio,
  'impostor-office': ImpostorOffice,
  'exposure-spotlight': ExposureSpotlight,
  'reframe-desk': ReframeDesk,
  'grief-shore': GriefShore,
  'memory-room': MemoryRoom,
  'dawn-meadow': DawnMeadow,
};

export const ROOM_NAMES = Object.keys(ROOMS) as RoomName[];
