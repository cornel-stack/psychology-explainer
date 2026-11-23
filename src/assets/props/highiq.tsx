/**
 * highiq.tsx — ALL-NEW art for "The Psychology of People With a High IQ". Bespoke
 * metaphors for the high-IQ mind: the question magnet (curiosity), the grey
 * nuance palette, the overthinking pretzel, the rabbit hole, the boredom yawn,
 * the impossibly high bar, the deep well of conversation, the wise night owl, the
 * tiny island of knowledge in a sea of the unknown, a burr puzzle, a constellation
 * of connected ideas, a coffee tower, a leaning book tower, and the smart-but-lost
 * maze. Token strokes, flat two-tone, local origin.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A horseshoe magnet pulling in a swarm of question marks (insatiable curiosity). */
export const QuestionMagnet: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* magnet */}
      <path d="M -70 90 L -70 -30 Q -70 -100 0 -100 Q 70 -100 70 -30 L 70 90" fill="none" stroke={COLORS.red} strokeWidth={46} strokeLinecap="butt" />
      <path d="M -70 90 L -70 -30 Q -70 -100 0 -100 Q 70 -100 70 -30 L 70 90" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} />
      <rect x={-93} y={70} width={46} height={44} fill={COLORS.ledGrey} {...lg} />
      <rect x={47} y={70} width={46} height={44} fill={COLORS.ledGrey} {...lg} />
      {/* flying question marks drawn toward it */}
      {[[-170, -120], [180, -90], [-200, 20], [200, 60], [-120, -170]].map(([x, y], i) => {
        const t = (f / 20 + i) % 3;
        const px = x * (1 - t / 4); const py = y * (1 - t / 4);
        return <text key={i} x={px} y={py} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={48 - i * 3} fill={[COLORS.sky, COLORS.yellow, COLORS.pink, COLORS.greenLeaf, COLORS.lavender][i]}>?</text>;
      })}
    </g>
  );
};

/** A paint palette of greys between a black and a white blob (comfort with nuance). */
export const NuancePalette: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={150} ry={120} fill={COLORS.wood} {...xl} />
    <ellipse cx={70} cy={30} rx={34} ry={26} fill={COLORS.bgCream} {...lg} />
    {/* black → white gradient of greys */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx={-100 + i * 36} cy={-40} r={22} fill={shade(COLORS.white, 0.16 * (5 - i))} {...sm} />
    ))}
    <text x={-30} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>it depends…</text>
  </g>
);

/** A brain tied into a pretzel knot (the overthinking tax). */
export const OverthinkPretzel: React.FC = () => (
  <g>
    <path d="M -110 40 Q -150 -80 -40 -90 Q 40 -140 90 -60 Q 160 -20 110 70 Q 60 140 -20 100 Q -70 130 -110 40 Z" fill={COLORS.pink} {...xl} />
    {/* knotted overthinking loops */}
    <path d="M -70 -10 Q 0 -70 60 -10 Q 110 40 40 70 Q -20 90 -40 30 Q -60 -20 10 -30 Q 70 -36 50 20" fill="none" stroke={shade(COLORS.pink, 0.26)} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -50 40 Q 20 10 0 -40" fill="none" stroke={shade(COLORS.pink, 0.26)} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* little sweat */}
    <path d="M 120 -40 q 18 22 4 38 q -16 -2 -4 -38 Z" fill={COLORS.sky} {...sm} />
  </g>
);

/** A spiral rabbit hole descending into the dark (going down rabbit holes). */
export const RabbitHole: React.FC = () => {
  const f = useCurrentFrame();
  const pts: string[] = [];
  for (let i = 0; i < 120; i++) {
    const t = i / 12;
    const r = 150 - t * 20;
    const a = t * 1.1 + f / 30;
    pts.push(`${i ? 'L' : 'M'} ${Math.cos(a) * r} ${Math.sin(a) * r * 0.5}`);
  }
  return (
    <g>
      <ellipse cx={0} cy={0} rx={160} ry={90} fill={COLORS.greenDark} {...xl} />
      <ellipse cx={0} cy={0} rx={130} ry={72} fill={COLORS.purpleDeep} />
      <path d={pts.join(' ')} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.7} />
      {/* rabbit ears peeking */}
      <g transform="translate(70 -70)">
        <ellipse cx={-10} cy={0} rx={10} ry={28} fill={COLORS.white} {...sm} transform="rotate(-12)" />
        <ellipse cx={14} cy={0} rx={10} ry={28} fill={COLORS.white} {...sm} transform="rotate(12)" />
      </g>
    </g>
  );
};

/** A big open-mouthed yawn cloud (boredom / understimulation). */
export const YawnCloud: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={120} ry={100} fill={COLORS.sky} {...xl} />
    <ellipse cx={0} cy={20} rx={52} ry={64} fill={COLORS.outline} />
    <ellipse cx={0} cy={54} rx={30} ry={20} fill={COLORS.red} />
    <path d="M -74 -40 q 24 -16 44 2 M 30 -38 q 24 -16 44 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    {/* boredom zzz */}
    <text x={110} y={-70} fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.skyDark}>z</text>
    <text x={150} y={-110} fontFamily={font} fontWeight={800} fontSize={54} fill={COLORS.skyDark}>Z</text>
  </g>
);

/** A high-jump bar raised impossibly high (brutal self-standards). */
export const HighBar: React.FC = () => (
  <g>
    <rect x={-150} y={-160} width={22} height={320} rx={8} fill={COLORS.ledGrey} {...lg} />
    <rect x={128} y={-160} width={22} height={320} rx={8} fill={COLORS.ledGrey} {...lg} />
    {/* the bar, way up high */}
    <rect x={-150} y={-150} width={300} height={20} rx={10} fill={COLORS.red} {...xl} />
    {/* rungs showing how far up it is */}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-134} y={-110 + i * 60} width={268} height={6} rx={3} fill={COLORS.ledGrey} opacity={0.4} />)}
    {/* tiny figure reaching up, far below */}
    <g transform="translate(0 150)">
      <circle cx={0} cy={-30} r={22} fill={COLORS.white} {...lg} />
      <path d="M 0 -8 L 0 30 M 0 0 L -22 -24 M 0 0 L 22 -24" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
    <text x={0} y={-100} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.outline}>never enough</text>
  </g>
);

/** A deep well — depth of conversation (vs the shallow puddle of small talk). */
export const DeepWell: React.FC = () => (
  <g>
    {/* well rim */}
    <ellipse cx={0} cy={-40} rx={120} ry={40} fill={COLORS.greenTeal} {...xl} />
    <ellipse cx={0} cy={-40} rx={88} ry={28} fill={COLORS.purpleDeep} />
    {/* shaft going down */}
    <path d="M -88 -40 L -70 180 Q 0 210 70 180 L 88 -40" fill={shade(COLORS.purpleDeep, 0.2)} {...lg} />
    {/* water glints deep down */}
    <ellipse cx={0} cy={170} rx={60} ry={16} fill={COLORS.sky} opacity={0.6} />
    {/* roof */}
    <rect x={-120} y={-150} width={20} height={120} fill={COLORS.woodDark} {...lg} />
    <rect x={100} y={-150} width={20} height={120} fill={COLORS.woodDark} {...lg} />
    <path d="M -150 -150 L 0 -210 L 150 -150 Z" fill={COLORS.red} {...xl} />
    <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.white} opacity={0.8}>deep</text>
  </g>
);

/** A wise night owl with little glasses (the night-owl thinker). */
export const NightOwl: React.FC = () => {
  const f = useCurrentFrame();
  const blink = Math.sin(f / 18) > 0.9;
  return (
    <g>
      {/* body */}
      <path d="M -90 150 Q -120 -40 0 -60 Q 120 -40 90 150 Q 0 190 -90 150 Z" fill={COLORS.wood} {...xl} />
      <path d="M -60 120 Q 0 150 60 120 M -50 80 Q 0 104 50 80 M -40 40 Q 0 60 40 40" fill="none" stroke={shade(COLORS.wood, 0.18)} strokeWidth={STROKE.sm} />
      {/* ear tufts */}
      <path d="M -70 -40 l -20 -46 l 34 20 Z" fill={COLORS.wood} {...lg} />
      <path d="M 70 -40 l 20 -46 l -34 20 Z" fill={COLORS.wood} {...lg} />
      {/* eyes w/ glasses */}
      <circle cx={-36} cy={-6} r={40} fill={COLORS.bgCream} {...lg} />
      <circle cx={36} cy={-6} r={40} fill={COLORS.bgCream} {...lg} />
      {blink ? <path d="M -56 -6 h 40 M 16 -6 h 40" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /> : <><circle cx={-36} cy={-6} r={14} fill={COLORS.outline} /><circle cx={36} cy={-6} r={14} fill={COLORS.outline} /></>}
      <circle cx={-36} cy={-6} r={44} fill="none" stroke={COLORS.shirtDark} strokeWidth={STROKE.sm} />
      <circle cx={36} cy={-6} r={44} fill="none" stroke={COLORS.shirtDark} strokeWidth={STROKE.sm} />
      <line x1={8} y1={-6} x2={-8} y2={-6} stroke={COLORS.shirtDark} strokeWidth={STROKE.sm} />
      {/* beak */}
      <path d="M -14 24 L 14 24 L 0 50 Z" fill={COLORS.yellow} {...sm} />
      {/* crescent moon behind */}
      <path d="M 150 -120 a 46 46 0 1 0 10 70 a 36 36 0 1 1 -10 -70 Z" fill={COLORS.yellowSoft} opacity={0.8} />
    </g>
  );
};

/** A tiny island of knowledge in a vast sea of the unknown (intellectual humility). */
export const KnowledgeIsland: React.FC = () => (
  <g>
    <ellipse cx={0} cy={60} rx={180} ry={120} fill={COLORS.sky} opacity={0.5} />
    {[-120, 0, 130].map((x, i) => <path key={i} d={`M ${x - 24} ${30 + i * 30} q 24 -14 48 0`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.6} />)}
    {/* the island */}
    <ellipse cx={0} cy={20} rx={70} ry={30} fill={COLORS.wood} {...lg} />
    <path d="M -50 20 Q 0 -70 50 20 Z" fill={COLORS.greenLeaf} {...xl} />
    <rect x={-6} y={-54} width={12} height={40} fill={COLORS.woodDark} />
    <path d="M 6 -54 l 30 10 l -30 10 Z" fill={COLORS.red} {...sm} />
    <text x={0} y={-80} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>what I know</text>
    <text x={150} y={120} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={24} fill={COLORS.skyDark}>the unknown</text>
  </g>
);

/** An interlocking 3D burr puzzle (loves a hard problem). */
export const BurrPuzzle: React.FC = () => {
  const f = useCurrentFrame();
  const sp = Math.sin(f / 24) * 8;
  const bar = (x: number, y: number, w: number, h: number, c: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={c} {...lg} />
      <rect x={x} y={y} width={w} height={Math.min(h, 16)} rx={8} fill={shade(c, 0.16)} />
    </g>
  );
  return (
    <g transform={`rotate(${sp})`}>
      {bar(-120, -24, 240, 48, COLORS.sky)}
      {bar(-24, -120, 48, 240, COLORS.yellow)}
      <g transform="rotate(45)">{bar(-120, -22, 240, 44, COLORS.pink)}</g>
      <rect x={-22} y={-22} width={44} height={44} rx={8} fill={COLORS.greenLeaf} {...lg} />
    </g>
  );
};

/** A constellation of connected idea-stars (seeing the links between everything). */
export const IdeaConstellation: React.FC = () => {
  const f = useCurrentFrame();
  const stars: [number, number][] = [[-140, -60], [-40, -110], [60, -40], [140, 40], [20, 90], [-100, 60], [-10, -20]];
  const edges = [[0, 1], [1, 2], [2, 3], [2, 6], [6, 4], [4, 3], [6, 5], [5, 0]];
  return (
    <g>
      {edges.map(([a, b], i) => <line key={i} x1={stars[a][0]} y1={stars[a][1]} x2={stars[b][0]} y2={stars[b][1]} stroke={COLORS.lavender} strokeWidth={STROKE.sm} opacity={0.6} />)}
      {stars.map(([x, y], i) => {
        const glow = 0.6 + 0.4 * Math.sin(f / 8 + i);
        return <g key={i}><circle cx={x} cy={y} r={20} fill={COLORS.yellow} opacity={0.3 * glow} /><path d={`M ${x} ${y - 14} l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 Z`} fill={COLORS.yellow} {...sm} /></g>;
      })}
    </g>
  );
};

/** A precarious tower of coffee cups (the fuel of late nights). */
export const CoffeeTower: React.FC = () => {
  const f = useCurrentFrame();
  const lean = Math.sin(f / 20) * 3;
  const Cup: React.FC<{ y: number; c: string; rot: number }> = ({ y, c, rot }) => (
    <g transform={`translate(0 ${y}) rotate(${rot})`}>
      <path d="M -44 -26 L 44 -26 L 36 34 L -36 34 Z" fill={c} {...lg} />
      <rect x={-44} y={-34} width={88} height={16} rx={6} fill={COLORS.white} {...sm} />
      <path d="M 44 -14 q 30 0 30 26 q 0 20 -26 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
    </g>
  );
  return (
    <g transform={`rotate(${lean})`}>
      <Cup y={120} c={COLORS.red} rot={0} />
      <Cup y={56} c={COLORS.sky} rot={-4} />
      <Cup y={-8} c={COLORS.yellow} rot={5} />
      <Cup y={-72} c={COLORS.greenTeal} rot={-3} />
      {/* steam */}
      {[-16, 0, 16].map((x, i) => <path key={i} d={`M ${x} -110 q ${i % 2 ? 14 : -14} -24 0 -44`} fill="none" stroke={COLORS.whiteShade} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} />)}
    </g>
  );
};

/** A tall, leaning tower of books (the perpetual reader). */
export const BookTower: React.FC = () => {
  const tones = [COLORS.red, COLORS.sky, COLORS.yellow, COLORS.greenLeaf, COLORS.lavender, COLORS.pink, COLORS.greenTeal];
  return (
    <g>
      {tones.map((t, i) => {
        const y = 150 - i * 46;
        const w = 230 - (i % 2) * 30;
        const off = (i % 2 ? 1 : -1) * (6 + i * 3);
        return (
          <g key={i} transform={`translate(${off} ${y}) rotate(${(i % 2 ? 1 : -1) * 2})`}>
            <rect x={-w / 2} y={-40} width={w} height={44} rx={6} fill={t} {...lg} />
            <rect x={-w / 2} y={-40} width={16} height={44} fill={shade(t, 0.2)} />
            <rect x={-w / 2 + 28} y={-24} width={w - 60} height={8} rx={4} fill={COLORS.white} opacity={0.8} />
          </g>
        );
      })}
    </g>
  );
};

/** A maze with a tiny figure lost inside (smart ≠ wise / street-smart). */
export const LostMaze: React.FC = () => (
  <g>
    <rect x={-150} y={-130} width={300} height={260} rx={14} fill={COLORS.bgCream} {...xl} />
    {/* maze walls */}
    <path d="M -110 -90 L 90 -90 M -110 -90 L -110 90 M -70 -50 L -70 50 L 50 50 M -30 -50 L 110 -50 M -30 -10 L 10 -10 L 10 90 M 50 -10 L 50 10 M 90 -50 L 90 50" fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* lost figure */}
    <g transform="translate(-30 20)">
      <circle r={18} fill={COLORS.white} {...lg} />
      <circle cx={-6} cy={-2} r={4} fill={COLORS.outline} />
      <circle cx={6} cy={-2} r={4} fill={COLORS.outline} />
      <path d="M -8 10 q 8 -6 16 0" fill="none" {...sm} />
    </g>
    <text x={100} y={-100} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.red}>?</text>
  </g>
);
