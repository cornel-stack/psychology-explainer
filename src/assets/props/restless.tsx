/**
 * restless.tsx — ALL-NEW art for "Why Your Brain Never Stops Thinking". Every
 * prop is a literal metaphor for the overthinking mind: the frazzled clock, the
 * swarm of thoughts, the radio with no off knob, the overheating brain, the
 * hamster wheel, the monkey mind, the broken record, the thought spiral, the
 * white bear you can't un-think, too many mental tabs, tangled thought-threads,
 * the breathing balloon, the grounding hand, and the off-switch you can't find.
 * Local origin (0,0), token strokes (7/10/14 or >=15), flat two-tone.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A clock stuck near 2 o'clock with a frazzled, sweating face (the wide-awake
 *  racing mind). `time` sets the hour the hour-hand points to. */
export const FrazzledClock: React.FC<{ time?: number }> = ({ time = 2 }) => {
  const f = useCurrentFrame();
  const shake = Math.sin(f / 2) * 2;
  const hour = ((time % 12) / 12) * Math.PI * 2;
  return (
    <g transform={`translate(${shake} 0)`}>
      <circle cx={0} cy={0} r={130} fill={COLORS.red} opacity={0.14} />
      <circle cx={0} cy={0} r={110} fill={COLORS.white} {...xl} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={Math.sin(a) * 92} cy={-Math.cos(a) * 92} r={5} fill={COLORS.outline} />;
      })}
      {/* worried face */}
      <path d="M -54 -34 q 20 -16 40 2 M 14 -32 q 20 -18 40 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-34} cy={-6} r={9} fill={COLORS.outline} />
      <circle cx={34} cy={-6} r={9} fill={COLORS.outline} />
      <path d="M -24 34 q 24 -20 48 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M 64 -18 q 22 10 6 34 q -16 -4 -6 -34 Z" fill={COLORS.sky} {...sm} />
      {/* hands: 2:00-ish */}
      <line x1={0} y1={0} x2={Math.sin(hour) * 54} y2={-Math.cos(hour) * 54} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={0} y1={0} x2={0} y2={-80} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={0} cy={0} r={10} fill={COLORS.red} />
      {/* alarm bells + shake lines */}
      <circle cx={-78} cy={-96} r={22} fill={COLORS.yellow} {...lg} />
      <circle cx={78} cy={-96} r={22} fill={COLORS.yellow} {...lg} />
      <path d="M -150 -20 l -26 0 M -150 20 l -26 0 M 150 -20 l 26 0 M 150 20 l 26 0" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
};

/** A buzzing swarm of little thought-puffs (?, !, scribbles) — the noise. */
export const ThoughtSwarm: React.FC = () => {
  const f = useCurrentFrame();
  const puffs: [number, number, number, string][] = [
    [-120, -40, 44, '?'], [20, -90, 40, '!'], [110, -30, 46, '…'], [-50, 50, 38, '?!'], [90, 60, 36, '?'], [-10, -10, 52, '!'],
  ];
  return (
    <g>
      {puffs.map(([x, y, r, t], i) => {
        const wob = Math.sin(f / 8 + i) * 6;
        const cols = [COLORS.sky, COLORS.pink, COLORS.yellowSoft, COLORS.lavender, COLORS.greenTeal, COLORS.white];
        return (
          <g key={i} transform={`translate(${x} ${y + wob})`}>
            <path d={`M ${-r} 0 Q ${-r} ${-r} 0 ${-r} Q ${r} ${-r} ${r} 0 Q ${r} ${r} 0 ${r} Q ${-r} ${r} ${-r} 0 Z`} fill={cols[i]} {...sm} />
            <text x={0} y={r * 0.34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={r * 0.8} fill={COLORS.outline}>{t}</text>
          </g>
        );
      })}
    </g>
  );
};

/** A retro radio blaring, with a knob that has no "off" position + sound waves. */
export const StuckRadio: React.FC = () => (
  <g>
    <rect x={-140} y={-80} width={280} height={160} rx={20} fill={COLORS.wood} {...xl} />
    <rect x={-140} y={-80} width={280} height={44} rx={16} fill={shade(COLORS.wood, 0.14)} />
    {/* speaker grille */}
    <circle cx={-66} cy={16} r={46} fill={COLORS.shirtDark} {...lg} />
    {[0, 1, 2].map((i) => <circle key={i} cx={-66} cy={16} r={14 + i * 14} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />)}
    {/* tuning + the "no OFF" knob stuck at max */}
    <rect x={10} y={-56} width={110} height={22} rx={10} fill={COLORS.ledGrey} {...sm} />
    <rect x={54} y={-56} width={14} height={22} rx={6} fill={COLORS.red} />
    <circle cx={66} cy={40} r={28} fill={COLORS.white} {...lg} />
    <line x1={66} y1={40} x2={86} y2={22} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <text x={66} y={92} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.red}>NO OFF</text>
    {/* antenna + sound waves */}
    <line x1={110} y1={-80} x2={150} y2={-150} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${160 + i * 24} ${-60 - i * 10} Q ${190 + i * 28} 0 ${160 + i * 24} ${60 + i * 10}`} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    ))}
  </g>
);

/** A pink brain overheating — sweat drops + steam puffs + flushed (it never idles). */
export const OverheatingBrain: React.FC = () => {
  const f = useCurrentFrame();
  const puff = (f % 36) / 36;
  return (
    <g>
      {/* steam */}
      {[-40, 0, 40].map((x, i) => (
        <circle key={i} cx={x} cy={-130 - puff * 70 - i * 6} r={18 + i * 4} fill={COLORS.whiteShade} opacity={0.7 * (1 - puff)} />
      ))}
      {/* brain body */}
      <path d="M -120 20 Q -150 -70 -70 -96 Q -50 -140 10 -120 Q 70 -150 110 -96 Q 160 -70 120 10 Q 140 80 70 100 Q 10 140 -40 104 Q -120 100 -120 20 Z" fill={COLORS.pink} {...xl} />
      {/* folds */}
      <path d="M -70 -60 Q -30 -30 -70 0 Q -30 30 -60 70 M 10 -90 Q 40 -40 0 -10 Q 50 20 10 70 M 70 -60 Q 40 -20 80 10" fill="none" stroke={shade(COLORS.pink, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* flushed cheeks + strained eyes */}
      <circle cx={-46} cy={30} r={9} fill={COLORS.outline} />
      <circle cx={30} cy={30} r={9} fill={COLORS.outline} />
      <ellipse cx={-62} cy={48} rx={16} ry={10} fill={COLORS.red} opacity={0.5} />
      <ellipse cx={46} cy={48} rx={16} ry={10} fill={COLORS.red} opacity={0.5} />
      {/* sweat */}
      <path d="M 120 -20 q 20 24 4 42 q -18 -2 -4 -42 Z" fill={COLORS.sky} {...sm} />
    </g>
  );
};

/** A hamster wheel spinning fast (running hard, going nowhere). */
export const HamsterWheel: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 12;
  return (
    <g>
      <circle cx={0} cy={0} r={130} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} />
      <circle cx={0} cy={0} r={130} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} />
      <g transform={`rotate(${spin})`}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={Math.sin(a) * 40} y1={-Math.cos(a) * 40} x2={Math.sin(a) * 124} y2={-Math.cos(a) * 124} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />;
        })}
      </g>
      <circle cx={0} cy={0} r={34} fill={COLORS.white} {...lg} />
      {/* stand */}
      <rect x={-150} y={120} width={300} height={24} rx={10} fill={COLORS.woodDark} {...xl} />
      {/* motion blur + dust */}
      <path d="M 150 -40 l 40 0 M 160 10 l 44 0 M 150 60 l 36 0" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[-170, -200].map((x, i) => <circle key={i} cx={x} cy={120 - i * 10} r={10 - i * 2} fill={COLORS.ledGrey} opacity={0.5} />)}
    </g>
  );
};

/** A monkey swinging from a vine (the restless "monkey mind" leaping thought to thought). */
export const MonkeyMind: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 16) * 10;
  return (
    <g transform={`rotate(${sway})`} style={{ transformOrigin: '0px -150px' }}>
      {/* vine */}
      <path d="M 0 -220 Q 20 -150 0 -90" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* body */}
      <ellipse cx={0} cy={0} rx={70} ry={84} fill={COLORS.wood} {...xl} />
      <ellipse cx={0} cy={14} rx={40} ry={50} fill={shade(COLORS.wood, 0.1)} />
      {/* head */}
      <circle cx={0} cy={-90} r={62} fill={COLORS.wood} {...xl} />
      <circle cx={-56} cy={-96} r={24} fill={COLORS.wood} {...lg} />
      <circle cx={56} cy={-96} r={24} fill={COLORS.wood} {...lg} />
      <ellipse cx={0} cy={-74} rx={44} ry={38} fill={COLORS.bgCreamDark} />
      <circle cx={-18} cy={-96} r={8} fill={COLORS.outline} />
      <circle cx={18} cy={-96} r={8} fill={COLORS.outline} />
      <path d="M -14 -60 q 14 10 28 0" fill="none" {...sm} />
      {/* arms reaching up + tail */}
      <path d="M -60 -30 Q -120 -120 -8 -150" fill="none" stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M 60 -30 Q 120 -120 8 -150" fill="none" stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M 50 60 Q 140 80 120 -20" fill="none" stroke={COLORS.wood} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
};

/** A vinyl record skipping on a turntable (rumination — the same thought on repeat). */
export const BrokenRecord: React.FC = () => (
  <g>
    <rect x={-140} y={-110} width={280} height={240} rx={18} fill={COLORS.woodDark} {...xl} />
    <circle cx={-10} cy={10} r={104} fill={COLORS.shirtDark} {...lg} />
    {[40, 66, 90].map((r, i) => <circle key={i} cx={-10} cy={10} r={r} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} opacity={0.5} />)}
    <circle cx={-10} cy={10} r={22} fill={COLORS.red} {...sm} />
    <circle cx={-10} cy={10} r={6} fill={COLORS.white} />
    {/* tonearm stuck */}
    <rect x={70} y={-96} width={20} height={20} rx={6} fill={COLORS.ledGrey} />
    <line x1={80} y1={-86} x2={14} y2={-14} stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* skip + repeat arrows */}
    <path d="M -10 -70 l 10 -18 l 10 18" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -120 -150 q 60 -36 120 0 l -8 -22 m 8 22 l -22 6" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** A downward thought-spiral / whirlpool pulling a little figure down. */
export const ThoughtSpiral: React.FC = () => {
  const f = useCurrentFrame();
  const rot = f * 3;
  const pts: string[] = [];
  for (let i = 0; i < 140; i++) {
    const t = i / 14;
    const r = 150 - t * 20;
    const a = t * 1.1 + (rot * Math.PI) / 180;
    pts.push(`${i ? 'L' : 'M'} ${Math.cos(a) * r} ${Math.sin(a) * r * 0.62 - 10}`);
  }
  return (
    <g>
      <path d={pts.join(' ')} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} />
      <path d={pts.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} />
      {/* little head being pulled in */}
      <g transform={`translate(0 ${-10})`}>
        <circle r={30} fill={COLORS.white} {...lg} />
        <circle cx={-10} cy={-4} r={6} fill={COLORS.outline} />
        <circle cx={10} cy={-4} r={6} fill={COLORS.outline} />
        <path d="M -12 12 q 12 -8 24 0" fill="none" {...sm} />
      </g>
    </g>
  );
};

/** A cute polar bear (the "white bear" you're told not to think about — and now can't un-think). */
export const WhiteBear: React.FC = () => (
  <g>
    {/* body */}
    <ellipse cx={0} cy={70} rx={100} ry={90} fill={COLORS.white} {...xl} />
    {/* ears */}
    <circle cx={-66} cy={-96} r={34} fill={COLORS.white} {...xl} />
    <circle cx={66} cy={-96} r={34} fill={COLORS.white} {...xl} />
    <circle cx={-66} cy={-96} r={16} fill={COLORS.bgCreamDark} />
    <circle cx={66} cy={-96} r={16} fill={COLORS.bgCreamDark} />
    {/* head */}
    <circle cx={0} cy={-36} r={86} fill={COLORS.white} {...xl} />
    {/* muzzle */}
    <ellipse cx={0} cy={-6} rx={46} ry={38} fill={COLORS.whiteShade} {...sm} />
    <ellipse cx={0} cy={-22} rx={16} ry={12} fill={COLORS.outline} />
    <path d="M 0 -10 L 0 6 M 0 6 q -14 10 -26 2 M 0 6 q 14 10 26 2" fill="none" {...sm} />
    <circle cx={-34} cy={-50} r={10} fill={COLORS.outline} />
    <circle cx={34} cy={-50} r={10} fill={COLORS.outline} />
    {/* paws */}
    <ellipse cx={-54} cy={150} rx={34} ry={24} fill={COLORS.white} {...lg} />
    <ellipse cx={54} cy={150} rx={34} ry={24} fill={COLORS.white} {...lg} />
  </g>
);

/** A stack of too many overlapping browser tabs / windows (mental overload). */
export const MentalTabs: React.FC = () => {
  const cols = [COLORS.sky, COLORS.pink, COLORS.yellowSoft, COLORS.greenTeal, COLORS.lavender];
  return (
    <g>
      {cols.map((c, i) => (
        <g key={i} transform={`translate(${i * 22 - 44} ${-i * 26 + 50})`}>
          <rect x={-120} y={-80} width={240} height={170} rx={14} fill={c} {...lg} />
          <rect x={-120} y={-80} width={240} height={36} rx={14} fill={shade(c, 0.14)} />
          <circle cx={-98} cy={-62} r={7} fill={COLORS.red} />
          <circle cx={-76} cy={-62} r={7} fill={COLORS.yellow} />
          <circle cx={-54} cy={-62} r={7} fill={COLORS.greenLeaf} />
          <path d="M 92 -70 l 20 20 m 0 -20 l -20 20" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
          <rect x={-96} y={-22} width={150} height={12} rx={6} fill={COLORS.white} opacity={0.85} />
          <rect x={-96} y={6} width={110} height={12} rx={6} fill={COLORS.white} opacity={0.7} />
        </g>
      ))}
    </g>
  );
};

/** A tangled knot of coloured thought-threads (thoughts all snarled together). */
export const TangledYarn: React.FC = () => {
  const strands = [COLORS.red, COLORS.sky, COLORS.yellow, COLORS.greenLeaf, COLORS.pink];
  return (
    <g>
      <circle cx={0} cy={0} r={118} fill={COLORS.lavender} {...xl} />
      {strands.map((c, i) => (
        <path
          key={i}
          d={`M ${-110 + i * 6} ${-30 + i * 18} C ${-40} ${-120 + i * 20} ${60} ${120 - i * 20} ${110 - i * 6} ${20 - i * 16} S ${-80} ${40 + i * 10} ${-30 + i * 10} ${-80 + i * 6}`}
          fill="none"
          stroke={c}
          strokeWidth={STROKE.lg}
          strokeLinecap="round"
          opacity={0.9}
        />
      ))}
      {/* loose end */}
      <path d="M 110 20 q 60 20 40 70" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
};

/** A balloon that breathes in and out (the breath — an anchor for attention). */
export const BreathingBalloon: React.FC = () => {
  const f = useCurrentFrame();
  const breath = 0.78 + 0.22 * Math.sin(f / 22);
  return (
    <g>
      <g transform={`scale(${breath})`} style={{ transformOrigin: 'center' }}>
        <path d="M 0 90 Q -110 70 -110 -20 Q -110 -120 0 -120 Q 110 -120 110 -20 Q 110 70 0 90 Z" fill={COLORS.sky} {...xl} />
        <path d="M -44 -80 Q -72 -50 -64 -10" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />
        <path d="M 0 90 l -16 26 l 32 0 Z" fill={COLORS.skyDark} {...sm} />
      </g>
      {/* calm in/out rings */}
      {[0, 1].map((i) => (
        <circle key={i} cx={0} cy={0} r={130 + i * 26} fill="none" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} opacity={0.3 * (1 - (f % 60) / 60)} />
      ))}
    </g>
  );
};

/** An open hand with the five senses on the fingertips (5-4-3-2-1 grounding). */
export const GroundingHand: React.FC = () => (
  <g>
    {/* palm */}
    <path d="M -80 160 Q -110 40 -70 0 L 70 0 Q 110 40 80 160 Z" fill={COLORS.skin} {...xl} />
    {/* fingers with sense-dots */}
    {([[-66, COLORS.sky], [-33, COLORS.pink], [0, COLORS.yellow], [33, COLORS.greenLeaf]] as [number, string][]).map(([x, c], i) => (
      <g key={i}>
        <rect x={x - 18} y={-120 + (i === 0 || i === 3 ? 30 : 0)} width={36} height={140} rx={18} fill={COLORS.skin} {...lg} />
        <circle cx={x} cy={-130 + (i === 0 || i === 3 ? 30 : 0)} r={20} fill={c} {...sm} />
      </g>
    ))}
    {/* thumb */}
    <rect x={64} y={30} width={36} height={110} rx={18} fill={COLORS.skin} {...lg} transform="rotate(40 64 30)" />
    <circle cx={128} cy={70} r={20} fill={COLORS.lavender} {...sm} />
  </g>
);

/** A big red OFF button / switch — the thing everyone wishes they could find. */
export const OffSwitch: React.FC<{ on?: boolean }> = ({ on = false }) => (
  <g>
    <rect x={-120} y={-80} width={240} height={200} rx={28} fill={COLORS.shirtDark} {...xl} />
    <rect x={-120} y={-80} width={240} height={50} rx={24} fill={shade(COLORS.shirtDark, -0.3)} />
    {/* the button */}
    <circle cx={0} cy={28} r={72} fill={on ? COLORS.greenLeaf : COLORS.red} {...xl} />
    <circle cx={0} cy={28} r={72} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} transform="scale(0.8)" transform-origin="0 28" />
    {/* power glyph */}
    <path d="M 0 2 L 0 30" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -22 14 A 30 30 0 1 0 22 14" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <text x={0} y={-44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={36} fill={COLORS.white}>{on ? 'QUIET' : 'OFF?'}</text>
  </g>
);
