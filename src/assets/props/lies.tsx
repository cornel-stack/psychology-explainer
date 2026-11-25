/**
 * lies.tsx — ALL-NEW art for "Every Type of Lie Explained". One emblem per kind of
 * lie: white-lie, omission-gap, exaggeration-fish, bald-faced, lie-snowball,
 * poker-bluff, noble-lie, compulsive-nose, broken-promise, self-deception. Token
 * strokes, centered on origin, ~300px tall.
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

/** white-lie — a sweet little "I love it!" bubble over a so-so gift. */
export const WhiteLie: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.97 + 0.03 * Math.sin(f / 5);
  return (
    <g transform={`scale(${pulse})`}>
      {/* a meh gift */}
      <g transform="translate(0 40)"><rect x={-34} y={-24} width={68} height={48} rx={6} fill={shade(COLORS.ledGrey, 0.1)} {...lg} /><line x1={0} y1={-24} x2={0} y2={24} stroke={COLORS.woodDark} strokeWidth={STROKE.sm} /><path d="M -10 -24 q 10 -14 10 0 q 0 -14 10 0" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.sm} /></g>
      {/* the white lie */}
      <rect x={-86} y={-66} width={172} height={64} rx={20} fill={COLORS.white} {...xl} />
      <path d="M -20 -4 L -8 22 L 8 -4 Z" fill={COLORS.white} {...xl} />
      <text x={0} y={-24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.pinkDark}>"I love it!"</text>
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-30 + i * 30} -78 q 4 -8 0 -16`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      <Label t="the little white lie" />
    </g>
  );
};

/** omission-gap — a sentence with a chunk redacted/hidden: lie by leaving out. */
export const OmissionGap: React.FC = () => {
  const f = useCurrentFrame();
  const slide = 2 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-100} y={-44} width={200} height={88} rx={10} fill={COLORS.white} {...xl} />
      <text x={-84} y={-10} fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>"yes, I was</text>
      <text x={-84} y={16} fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>out...</text>
      {/* the hidden part under a sliding bar */}
      <g transform={`translate(${34 + slide} 6)`}><rect x={-30} y={-16} width={64} height={30} rx={4} fill={shade(COLORS.navy, 0.1)} /><text x={2} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.white}>█ █ █</text></g>
      <Label t="the lie of omission" />
    </g>
  );
};

/** exaggeration-fish — a tiny caught fish described as an enormous one. */
export const ExaggerationFish: React.FC = () => {
  const f = useCurrentFrame();
  const grow = 0.9 + 0.1 * Math.sin(f / 6);
  return (
    <g>
      {/* tiny real fish */}
      <g transform="translate(-54 30)"><ellipse cx={0} cy={0} rx={16} ry={9} fill={COLORS.sky} {...sm} /><path d="M 16 0 l 12 -8 l 0 16 Z" fill={COLORS.sky} {...sm} /><circle cx={-8} cy={-2} r={2} fill={COLORS.outline} /><text x={0} y={28} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>real</text></g>
      {/* huge 'remembered' fish */}
      <g transform={`translate(44 -4) scale(${grow})`}><ellipse cx={0} cy={0} rx={50} ry={30} fill={shade(COLORS.sky, 0.06)} {...xl} /><path d="M 50 0 l 36 -24 l 0 48 Z" fill={shade(COLORS.sky, 0.06)} {...lg} /><circle cx={-26} cy={-6} r={5} fill={COLORS.outline} /><path d="M -40 2 q 16 10 30 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} /></g>
      <text x={44} y={44} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>"it was THIS big!"</text>
      <Label t="the exaggeration" />
    </g>
  );
};

/** bald-faced — a grinning face lying boldly straight at you. */
export const BaldFaced: React.FC = () => {
  const f = useCurrentFrame();
  const wink = (f % 60) < 8;
  return (
    <g>
      <circle cx={0} cy={0} r={56} fill={COLORS.skin} {...xl} />
      {/* bold grin */}
      <path d="M -26 16 Q 0 44 26 16 Q 0 28 -26 16 Z" fill={COLORS.white} {...lg} />
      <line x1={-26} y1={16} x2={26} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {wink ? <path d="M -26 -10 L -8 -10" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /> : <circle cx={-17} cy={-10} r={6} fill={COLORS.outline} />}
      <circle cx={17} cy={-10} r={6} fill={COLORS.outline} />
      {/* a bold speech bubble */}
      <g transform="translate(60 -40)"><rect x={-24} y={-20} width={60} height={40} rx={10} fill={COLORS.white} {...lg} /><text x={6} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>nope!</text></g>
      <Label t="the bald-faced lie" />
    </g>
  );
};

/** lie-snowball — a small lie rolling downhill into a huge snowball of lies. */
export const LieSnowball: React.FC = () => {
  const f = useCurrentFrame();
  const roll = (f % 80) / 80;
  return (
    <g>
      {/* slope */}
      <path d="M -110 -50 L 110 60" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* growing snowball */}
      {[0, 1, 2].map((i) => { const t = i / 2; const x = -90 + t * 180; const y = -44 + t * 100; const r = 14 + t * 30; return (
        <g key={i} transform={`translate(${x} ${y}) rotate(${roll * 360})`}><circle cx={0} cy={0} r={r} fill={COLORS.white} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={10 + i * 4} fill={COLORS.outline}>lie</text></g>
      ); })}
      <Label t="one lie needs ten more" />
    </g>
  );
};

/** poker-bluff — a calm poker face above a bad hand of cards. */
export const PokerBluff: React.FC = () => {
  const f = useCurrentFrame();
  const bead = 2 * Math.sin(f / 5);
  return (
    <g>
      {/* calm face */}
      <circle cx={0} cy={-34} r={34} fill={COLORS.skin} {...xl} />
      <circle cx={-12} cy={-38} r={4} fill={COLORS.outline} /><circle cx={12} cy={-38} r={4} fill={COLORS.outline} />
      <path d="M -12 -20 L 12 -20" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* a tiny sweat bead betraying it */}
      <path d={`M 26 ${-54 + bead} q -5 7 0 11 q 5 -4 0 -11 Z`} fill={COLORS.sky} opacity={0.7} />
      {/* fanned bad cards */}
      {[-24, 0, 24].map((x, i) => <g key={i} transform={`translate(${x} 36) rotate(${(i - 1) * 16})`}><rect x={-20} y={-30} width={40} height={60} rx={6} fill={COLORS.white} {...lg} /><text x={0} y={-8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={[COLORS.red, COLORS.outline, COLORS.red][i]}>{['2', '7', '3'][i]}</text></g>)}
      <Label t="the bluff" />
    </g>
  );
};

/** noble-lie — a protective shield holding a kind, well-meant fib ('a surprise!'). */
export const NobleLie: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      <path d="M 0 -60 L 56 -40 Q 56 36 0 66 Q -56 36 -56 -40 Z" fill={shade(COLORS.greenTeal, 0.06)} {...xl} />
      {[0, 1, 2].map((i) => <path key={i} d="M 0 -60 L 56 -40 Q 56 36 0 66 Q -56 36 -56 -40 Z" fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.sm} opacity={(0.3 - i * 0.08) * (0.6 + glow * 0.5)} transform={`scale(${1 + i * 0.08})`} />)}
      <path d="M 0 16 q -22 -16 -22 -32 q 0 -10 11 -10 q 7 0 11 7 q 4 -7 11 -7 q 11 0 11 10 q 0 16 -22 32 Z" fill={COLORS.red} transform="translate(0 -6)" {...sm} />
      <text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.white}>"surprise!"</text>
      <Label t="the kind, noble lie" />
    </g>
  );
};

/** compulsive-nose — a tangle of pointless lies with a growing Pinocchio-style nose. */
export const CompulsiveNose: React.FC = () => {
  const f = useCurrentFrame();
  const grow = 20 + 10 * Math.sin(f / 10);
  return (
    <g>
      <circle cx={-10} cy={0} r={42} fill={COLORS.skin} {...xl} />
      <circle cx={-22} cy={-6} r={5} fill={COLORS.outline} /><circle cx={2} cy={-6} r={5} fill={COLORS.outline} />
      <path d="M -22 18 Q -10 24 2 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* long growing nose */}
      <path d={`M 28 2 l ${grow + 30} 0`} stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={28 + grow + 30} cy={2} r={8} fill={COLORS.skin} {...sm} />
      {/* little pointless lie tags on it */}
      {[0, 1].map((i) => <rect key={i} x={36 + i * 26} y={-16} width={20} height={14} rx={3} fill={COLORS.yellowSoft} {...sm} transform={`rotate(${i ? 10 : -10} ${46 + i * 26} -9)`} />)}
      <Label t="compulsive lying" />
    </g>
  );
};

/** broken-promise — a pinky-promise with the link snapped apart. */
export const BrokenPromise: React.FC = () => {
  const f = useCurrentFrame();
  const gap = 4 + 3 * Math.sin(f / 6);
  return (
    <g>
      {/* two pinky fingers reaching, the link broken */}
      <g transform={`translate(${-gap} 0)`}>
        <path d="M -70 20 Q -40 -10 -10 6" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <path d="M -10 6 q 8 -14 0 -26" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <g transform={`translate(${gap} 0)`}>
        <path d="M 70 20 Q 40 -10 10 6" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <path d="M 10 6 q -8 -14 0 -26" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* break spark */}
      <path d="M 0 -30 l -6 12 l 6 2 l -6 12" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <text x={0} y={-44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.red}>"I promise..."</text>
      <Label t="the broken promise" />
    </g>
  );
};

/** self-deception — a face in a mirror showing a flattering, false reflection. */
export const SelfDeception: React.FC = () => {
  const f = useCurrentFrame();
  const shimmer = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {/* real face, a bit downcast */}
      <g transform="translate(-58 0)">
        <circle cx={0} cy={0} r={40} fill={COLORS.skin} {...xl} />
        <circle cx={-12} cy={-4} r={4} fill={COLORS.outline} /><circle cx={12} cy={-4} r={4} fill={COLORS.outline} />
        <path d="M -12 20 Q 0 14 12 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* mirror with a falsely cheerful reflection */}
      <g transform="translate(58 0)">
        <rect x={-46} y={-56} width={92} height={112} rx={44} fill={shade(COLORS.sky, 0.1)} opacity={0.4 + shimmer * 0.2} {...xl} />
        <circle cx={0} cy={0} r={32} fill={COLORS.skin} opacity={0.9} {...sm} />
        <path d="M -16 -8 Q -8 -14 0 -8 M 0 -8 Q 8 -14 16 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -14 8 Q 0 24 14 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <text x={58} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>"I'm fine!"</text>
      <Label t="lying to yourself" />
    </g>
  );
};
