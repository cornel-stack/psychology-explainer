/**
 * cheating.tsx — ALL-NEW art for "The Psychology of People Who Cheat". The myth
 * (wandering-eye, many-reasons), the deeper drivers (lost-self, unmet-need,
 * novelty-thrill, feel-desired), the slide (slippery-slope), the cost (shattered-trust),
 * and the reckoning (the-fork, repair-or-part). Handled with care — understanding ≠
 * excusing. Token strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** wandering-eye — a bound heart, with an eye glancing away to a second heart. */
export const WanderingEye: React.FC = () => {
  const f = useCurrentFrame();
  const glance = 4 * Math.sin(f / 10);
  return (
    <g>
      {/* committed heart with a ring */}
      <path d="M 0 30 q -46 -34 -46 -58 q 0 -20 22 -20 q 14 0 24 16 q 10 -16 24 -16 q 22 0 22 20 q 0 24 -46 58 Z" fill={COLORS.red} {...xl} transform="translate(-20 -6)" />
      <circle cx={-20} cy={-44} r={10} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} />
      {/* an eye glancing off to a faint second heart */}
      <g transform={`translate(44 ${-10 + glance})`}>
        <ellipse cx={0} cy={0} rx={24} ry={16} fill={COLORS.white} {...lg} /><circle cx={8} cy={0} r={7} fill={COLORS.outline} />
      </g>
      <path d="M 86 -40 q -10 -10 -10 -16 q 0 -5 5 -5 q 3 0 5 4 q 2 -4 5 -4 q 5 0 5 5 q 0 6 -10 16 Z" fill={COLORS.pink} opacity={0.5} />
      <Label t="the wandering eye" />
    </g>
  );
};

/** many-reasons — a single question mark unravelling into a tangle of threads. */
export const ManyReasons: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 3 * Math.sin(f / 9);
  const reasons = ['need', 'novelty', 'ego', 'escape', 'hurt'];
  return (
    <g>
      {reasons.map((r, i) => { const a = -Math.PI + (i / (reasons.length - 1)) * Math.PI; const x = Math.cos(a) * 92; const y = Math.sin(a) * 64 - 10; return (
        <g key={i}><path d={`M 0 24 Q ${x / 2 + sway} -10 ${x} ${y}`} fill="none" stroke={[COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.greenTeal, COLORS.lavender][i]} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.7} /><rect x={x - 32} y={y - 16} width={64} height={30} rx={8} fill={shade([COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.greenTeal, COLORS.lavender][i], 0.06)} {...sm} /><text x={x} y={y + 5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{r}</text></g>
      ); })}
      <circle cx={0} cy={34} r={24} fill={COLORS.white} {...xl} />
      <text x={0} y={42} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>?</text>
      <Label t="never just one reason" />
    </g>
  );
};

/** lost-self — a figure reaching through a doorway toward a brighter, lost version of self. */
export const LostSelf: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      {/* current, faded figure */}
      <g transform="translate(-44 0)">
        <circle cx={0} cy={-26} r={24} fill={shade(COLORS.sky, -0.02)} {...xl} />
        <circle cx={-8} cy={-28} r={3} fill={COLORS.outline} /><circle cx={8} cy={-28} r={3} fill={COLORS.outline} />
        <path d="M -8 -16 L 8 -16" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -26 44 Q -30 -2 0 -2 Q 30 -2 26 44 Z" fill={shade(COLORS.sky, -0.04)} {...xl} />
      </g>
      {/* glowing doorway + the vivid 'other self' */}
      <g transform="translate(52 0)">
        <rect x={-34} y={-56} width={68} height={112} rx={8} fill={COLORS.yellow} opacity={0.3 + glow * 0.3} {...xl} />
        <circle cx={0} cy={-26} r={22} fill={COLORS.yellowSoft} opacity={0.9} {...sm} />
        <path d="M -8 -30 Q 0 -36 8 -30" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -10 -16 Q 0 -8 10 -16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      <text x={52} y={-66} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>a lost 'me'</text>
      <Label t="seeking a self, not a person" />
    </g>
  );
};

/** unmet-need — an empty cup in a relationship, the other half turned away. */
export const UnmetNeed: React.FC = () => {
  const f = useCurrentFrame();
  const drip = (f % 50) / 50;
  return (
    <g>
      {/* an empty cup / heart tank */}
      <path d="M -40 -40 L 40 -40 L 32 40 L -32 40 Z" fill={COLORS.white} {...xl} />
      {/* almost empty */}
      <path d="M -34 28 L 34 28 L 32 40 L -32 40 Z" fill={shade(COLORS.sky, 0.06)} opacity={0.5} />
      {/* a tap, barely dripping */}
      <g transform="translate(0 -70)"><rect x={-8} y={-10} width={16} height={20} rx={3} fill={COLORS.ledGrey} {...sm} /><path d={`M 0 10 q -2 ${6 + drip * 10} 0 ${12 + drip * 10}`} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={1 - drip * 0.6} /></g>
      <text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>empty</text>
      <Label t="a need gone unmet" />
    </g>
  );
};

/** novelty-thrill — fireworks of excitement over a 'new' spark. */
export const NoveltyThrill: React.FC = () => {
  const f = useCurrentFrame();
  const burst = 0.5 + 0.5 * Math.sin(f / 4);
  return (
    <g>
      {/* spark core */}
      <circle cx={0} cy={0} r={18 + burst * 6} fill={COLORS.yellow} opacity={0.5 + burst * 0.4} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 24} y1={Math.sin(a) * 24} x2={Math.cos(a) * (50 + burst * 18)} y2={Math.sin(a) * (50 + burst * 18)} stroke={[COLORS.pink, COLORS.yellow, COLORS.sky][i % 3]} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6 + burst * 0.4} />; })}
      {/* dopamine sparkle */}
      <path d="M 0 -8 l 3 7 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 Z" fill={COLORS.white} />
      <Label t="the thrill of the new" />
    </g>
  );
};

/** feel-desired — a face lighting up under an admiring, validating gaze. */
export const FeelDesired: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={-6} r={48 + i * 16} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} opacity={(0.35 - i * 0.1) * (0.6 + glow * 0.5)} />)}
      <circle cx={0} cy={-6} r={44} fill={COLORS.skin} {...xl} />
      {/* blushing, flattered */}
      <ellipse cx={-26} cy={6} rx={9} ry={5} fill={COLORS.pink} opacity={0.6} /><ellipse cx={26} cy={6} rx={9} ry={5} fill={COLORS.pink} opacity={0.6} />
      <path d="M -20 -14 Q -12 -20 -4 -14 M 4 -14 Q 12 -20 20 -14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -16 14 Q 0 28 16 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* floating admiring hearts */}
      {[-40, 40].map((x, i) => <path key={i} d="M 0 6 q -8 -8 -8 -14 q 0 -6 6 -6 q 4 0 2 4 q -2 -4 2 -4 q 6 0 6 6 q 0 6 -8 14 Z" fill={COLORS.red} transform={`translate(${x} ${-60 + Math.sin(f / 6 + i) * 6})`} opacity={0.7} />)}
      <Label t="craving to feel wanted" />
    </g>
  );
};

/** slippery-slope — a figure sliding down a slope past 'just a text', 'just a friend'. */
export const SlipperySlope: React.FC = () => {
  const f = useCurrentFrame();
  const slide = (f % 70) / 70;
  return (
    <g>
      <path d="M -100 -50 Q -20 -40 100 60" fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {[['a text', -70, -42], ['"just friends"', 0, -8], ['a line crossed', 70, 44]].map(([t, x, y], i) => <g key={i} transform={`translate(${x} ${(y as number) - 22})`}><rect x={-52} y={-14} width={104} height={28} rx={8} fill={COLORS.white} {...sm} opacity={0.9} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={12} fill={COLORS.outline}>{t as string}</text></g>)}
      {/* sliding figure */}
      <g transform={`translate(${-90 + slide * 180} ${-44 + Math.pow(slide, 2) * 100})`}><circle cx={0} cy={-12} r={13} fill={COLORS.pink} {...sm} /><path d="M -11 12 Q -13 -2 0 -2 Q 13 -2 11 12 Z" fill={COLORS.pink} {...sm} /></g>
      <Label t="it 'just happened'" />
    </g>
  );
};

/** shattered-trust — a heart cracked into pieces, one falling away. */
export const ShatteredTrust: React.FC = () => {
  const f = useCurrentFrame();
  const fall = (f % 60) / 60;
  return (
    <g>
      {/* cracked heart */}
      <path d="M 0 34 q -50 -36 -50 -62 q 0 -22 24 -22 q 16 0 26 18 q 10 -18 26 -18 q 24 0 24 22 q 0 26 -50 62 Z" fill={COLORS.red} {...xl} transform="translate(0 -6)" />
      <path d="M 0 -48 l -8 24 l 10 10 l -8 22 l 6 24" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M 0 -30 l 18 8 M 0 2 l 20 -4" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />
      {/* a falling broken shard */}
      <path d="M 0 0 l 16 -6 l 6 18 l -14 10 Z" fill={shade(COLORS.red, -0.04)} {...sm} transform={`translate(${30 + fall * 16} ${-6 + fall * 50}) rotate(${fall * 60})`} opacity={1 - fall * 0.6} />
      <Label t="the trust that shatters" />
    </g>
  );
};

/** the-fork — a signpost splitting 'understand' from 'excuse' (two different roads). */
export const TheFork: React.FC = () => (
  <g>
    {/* post */}
    <rect x={-6} y={-10} width={12} height={70} rx={3} fill={COLORS.woodDark} {...lg} />
    {/* understand sign */}
    <g transform="translate(-10 -36)"><path d="M -80 -16 L 10 -16 L 24 0 L 10 16 L -80 16 Z" fill={COLORS.greenTeal} {...lg} /><text x={-34} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>understand</text></g>
    {/* excuse sign (crossed) */}
    <g transform="translate(10 4)"><path d="M 80 -16 L -10 -16 L -24 0 L -10 16 L 80 16 Z" fill={shade(COLORS.ledGrey, 0.1)} {...lg} /><text x={34} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>excuse</text><line x1={-6} y1={-16} x2={70} y2={16} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
    <Label t="understand ≠ excuse" />
  </g>
);

/** repair-or-part — a cracked heart being stitched back vs two hearts parting ways. */
export const RepairOrPart: React.FC = () => {
  const f = useCurrentFrame();
  const stitchN = Math.floor((f / 14) % 5) + 1;
  return (
    <g>
      {/* repair: a heart with stitches */}
      <g transform="translate(-58 0)">
        <path d="M 0 26 q -36 -26 -36 -46 q 0 -16 18 -16 q 12 0 18 14 q 6 -14 18 -14 q 18 0 18 16 q 0 20 -36 46 Z" fill={COLORS.pink} {...xl} transform="translate(0 -4)" />
        <path d="M 0 -38 L -4 26" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="2 8" />
        {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-10} y1={-28 + i * 14} x2={8} y2={-32 + i * 14} stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={i < stitchN ? 1 : 0.2} />)}
        <text x={0} y={52} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.greenDark}>rebuild</text>
      </g>
      {/* part: two half-hearts drifting apart */}
      <g transform="translate(60 0)">
        {[-1, 1].map((s, i) => <g key={i} transform={`translate(${s * (10 + 4 * Math.sin(f / 8))} 0)`}><path d={s < 0 ? "M 0 -32 q -30 2 -30 20 q 0 18 30 36 Z" : "M 0 -32 q 30 2 30 20 q 0 18 -30 36 Z"} fill={shade(COLORS.sky, -0.02)} {...lg} transform="translate(0 -4)" /></g>)}
        <text x={0} y={52} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>part ways</text>
      </g>
      <Label t="rebuild, or let go" />
    </g>
  );
};
