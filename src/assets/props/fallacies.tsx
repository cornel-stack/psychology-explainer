/**
 * fallacies.tsx — ALL-NEW art for "Every Logical Fallacy Explained".
 * One literal emblem per fallacy: the strawman, the mud-slinging ad hominem, the
 * slippery slope, the false dilemma's two doors, the authority stamp, the
 * bandwagon, the red herring, circular reasoning, hasty generalisation, appeal to
 * emotion, the tu-quoque mirror, and false cause. Flat two-tone, token strokes.
 * Each centered on the origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string }> = ({ r = 40, c = COLORS.white }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} />
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 130 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Strawman — a stuffed scarecrow dummy, easy to knock down. */
export const StrawDummy: React.FC = () => {
  const f = useCurrentFrame();
  const lean = 4 * Math.sin(f / 8);
  return (
    <g transform={`rotate(${lean})`}>
      <circle cx={0} cy={-60} r={40} fill={COLORS.yellowDark} {...xl} />
      {/* straw sticking out */}
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={-60} x2={0} y2={-108} stroke={COLORS.yellow} strokeWidth={STROKE.sm} transform={`rotate(${i * 30} 0 -60)`} strokeLinecap="round" />)}
      <path d="M -18 -70 l 12 8 M 6 -70 l 12 8" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <rect x={-16} y={-22} width={32} height={70} rx={6} fill={COLORS.wood} {...lg} />
      <line x1={-60} y1={0} x2={60} y2={0} stroke={COLORS.wood} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="strawman" />
    </g>
  );
};

/** Ad hominem — a hand flinging mud at a figure instead of the point. */
export const MudSling: React.FC = () => (
  <g>
    <g transform="translate(40 10)"><Fig r={38} c={COLORS.white} /></g>
    {/* mud splats */}
    {[[20, -40], [4, -4], [34, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14 + i * 2} fill={shade(COLORS.wood, -0.1)} {...sm} />)}
    {/* pointing hand */}
    <g transform="translate(-72 -10)">
      <circle cx={0} cy={0} r={26} fill={COLORS.skin} {...lg} />
      <rect x={16} y={-10} width={50} height={20} rx={10} fill={COLORS.skin} {...sm} />
    </g>
    <Label t="ad hominem" />
  </g>
);

/** Slippery slope — a figure sliding from one small step down to catastrophe. */
export const SlipperySlide: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 60) / 60;
  const x = -90 + t * 180, y = -70 + t * 130;
  return (
    <g>
      <path d="M -110 -90 L 110 80 L 110 110 L -110 110 Z" fill={shade(COLORS.sky, 0.1)} {...xl} />
      <path d="M -110 -90 L 110 80" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.6} />
      <g transform={`translate(${x} ${y}) rotate(30)`}><Fig r={26} c={COLORS.white} /></g>
      <path d="M 70 60 l 10 -18 l 10 18 l 10 -18 l 10 18" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} />
      <Label t="slippery slope" />
    </g>
  );
};

/** False dilemma — only two doors offered; a third sits greyed out, ignored. */
export const TwoDoors: React.FC = () => (
  <g>
    {[[-66, COLORS.red], [66, COLORS.greenLeaf]].map(([x, c], i) => (
      <g key={i} transform={`translate(${x} 0)`}>
        <path d="M -44 70 L -44 -40 Q -44 -90 0 -90 Q 44 -90 44 -40 L 44 70 Z" fill={c as string} {...xl} />
        <circle cx={28} cy={0} r={7} fill={COLORS.yellowSoft} {...sm} />
      </g>
    ))}
    {/* ignored third door, faded */}
    <g transform="translate(0 20) scale(0.7)" opacity={0.35}>
      <path d="M -44 70 L -44 -40 Q -44 -90 0 -90 Q 44 -90 44 -40 L 44 70 Z" fill={COLORS.ledGrey} {...lg} />
    </g>
    <Label t="false dilemma" />
  </g>
);

/** Appeal to authority — a stamp/badge: "true because they said so". */
export const AuthorityStamp: React.FC = () => (
  <g>
    <circle cx={0} cy={-10} r={80} fill={COLORS.blueDiagram} {...xl} />
    <circle cx={0} cy={-10} r={64} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
    {/* crown */}
    <path d="M -44 -24 L -30 -52 L -10 -34 L 0 -62 L 10 -34 L 30 -52 L 44 -24 Z" fill={COLORS.yellow} {...sm} />
    <path d="M -44 -14 L 44 -14" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} />
    <text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.white}>"I said so"</text>
    <Label t="appeal to authority" />
  </g>
);

/** Bandwagon — a wagon piled with cheering figures: everyone's doing it. */
export const BandWagon: React.FC = () => {
  const f = useCurrentFrame();
  const roll = 2 * Math.sin(f / 6);
  return (
    <g transform={`translate(${roll} 0)`}>
      <rect x={-90} y={-20} width={180} height={70} rx={10} fill={COLORS.red} {...xl} />
      {[-50, 0, 50].map((x, i) => <g key={i} transform={`translate(${x} -40) scale(0.5)`}><Fig r={40} c={[COLORS.white, COLORS.yellowSoft, COLORS.sky][i]} /></g>)}
      <circle cx={-56} cy={60} r={24} fill={shade(COLORS.outline, 0.3)} {...lg} /><circle cx={-56} cy={60} r={8} fill={COLORS.ledGrey} />
      <circle cx={56} cy={60} r={24} fill={shade(COLORS.outline, 0.3)} {...lg} /><circle cx={56} cy={60} r={8} fill={COLORS.ledGrey} />
      <Label t="bandwagon" />
    </g>
  );
};

/** Red herring — a bright red fish dragged across to distract. */
export const RedHerring: React.FC = () => {
  const f = useCurrentFrame();
  const sw = 6 * Math.sin(f / 6);
  return (
    <g transform={`translate(${sw} 0)`}>
      <ellipse cx={0} cy={0} rx={80} ry={46} fill={COLORS.red} {...xl} />
      <path d="M 70 0 l 46 -34 l -10 34 l 10 34 Z" fill={COLORS.red} {...lg} />
      <circle cx={-44} cy={-10} r={10} fill={COLORS.white} {...sm} /><circle cx={-44} cy={-10} r={5} fill={COLORS.outline} />
      <path d="M -70 6 q 20 14 40 4" fill="none" stroke={shade(COLORS.red, -0.1)} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -10 -30 l 0 -22 M 20 -30 l 0 -22" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="red herring" />
    </g>
  );
};

/** Circular reasoning — an arrow chasing its own tail. */
export const CircleLoop: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g transform={`rotate(${(f * 2) % 360})`}>
      <circle cx={0} cy={0} r={70} fill="none" stroke={COLORS.lavender} strokeWidth={28} />
      <circle cx={0} cy={0} r={70} fill="none" stroke={COLORS.purpleDeep} strokeWidth={STROKE.sm} opacity={0.4} />
      <path d="M 70 0 l 22 -16 l 0 32 Z" fill={COLORS.purpleDeep} {...sm} transform="rotate(90 70 0)" />
      <g transform={`rotate(${-(f * 2) % 360})`}><Label t="circular reasoning" /></g>
    </g>
  );
};

/** Hasty generalisation — one sample stamped onto a whole crowd. */
export const OneToAll: React.FC = () => (
  <g>
    <g transform="translate(-70 -20) scale(0.9)"><Fig r={34} c={COLORS.yellow} /></g>
    <path d="M -24 -30 l 40 0 m -10 -12 l 12 12 l -12 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
    {/* crowd all stamped the same */}
    {[[44, -30], [84, -30], [44, 20], [84, 20], [124, -8]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(0.4)`}><Fig r={40} c={COLORS.yellow} /></g>)}
    <Label t="hasty generalisation" />
  </g>
);

/** Appeal to emotion — heartstrings tugged instead of a point made. */
export const HeartTug: React.FC = () => {
  const f = useCurrentFrame();
  const beat = 1 + 0.08 * Math.sin(f / 4);
  return (
    <g>
      <g transform={`scale(${beat})`}><path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...xl} /></g>
      {/* strings being pulled */}
      {[-30, 0, 30].map((x, i) => <path key={i} d={`M ${x} 36 q ${x} 50 ${x * 0.6} 96`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
      <path d="M -12 -36 q 6 10 -2 20 M 16 -40 q 8 10 0 20" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />
      <Label t="appeal to emotion" />
    </g>
  );
};

/** Tu quoque — a mirror flung back: "well, you do it too!" */
export const MirrorBack: React.FC = () => (
  <g>
    <g transform="translate(-66 10) scale(0.85)"><Fig r={36} c={COLORS.white} /></g>
    {/* mirror reflecting the accusation back */}
    <g transform="translate(60 -6)">
      <rect x={-50} y={-90} width={100} height={180} rx={50} fill={COLORS.sky} {...xl} />
      <rect x={-38} y={-78} width={76} height={156} rx={38} fill={shade(COLORS.sky, 0.14)} />
      <path d="M -10 -20 l 30 0 m -12 -12 l 12 12 l -12 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" transform="scale(-1 1)" />
    </g>
    <Label t="tu quoque" />
  </g>
);

/** False cause — a rooster's crow "causing" the sunrise: correlation as cause. */
export const FalseLink: React.FC = () => (
  <g>
    {/* rooster */}
    <g transform="translate(-66 10)">
      <circle cx={0} cy={0} r={34} fill={COLORS.wood} {...lg} />
      <path d="M -10 -30 l 4 -16 l 8 10 l 8 -12 l 2 18 Z" fill={COLORS.red} {...sm} />
      <path d="M -28 6 l -20 -4 l 14 14 Z" fill={COLORS.yellowDark} {...sm} />
    </g>
    {/* bogus arrow */}
    <path d="M -24 -4 q 24 -28 50 -4" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray="4 8" />
    <path d="M 30 -10 l -4 16 l 16 -6 Z" fill={COLORS.red} />
    {/* sun */}
    <g transform="translate(66 6)"><circle r={34} fill={COLORS.yellow} {...lg} />{Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={-40} x2={0} y2={-52} stroke={COLORS.yellow} strokeWidth={STROKE.sm} transform={`rotate(${i * 45})`} strokeLinecap="round" />)}</g>
    <Label t="false cause" />
  </g>
);
