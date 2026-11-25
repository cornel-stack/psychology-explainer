/**
 * lying.tsx — ALL-NEW art for "The Real Signs Someone Is Lying". Belief by default
 * & poor accuracy (gut-hunch, truth-default-glasses, coinflip-accuracy), the myths
 * (myth-busted, othello-error, micro-flash), and what works (cognitive-load-lie,
 * sparse-story, reverse-order, cross-check). Token strokes, centered on origin,
 * ~300px tall.
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
const Head: React.FC<{ r?: number; c?: string }> = ({ r = 40, c = COLORS.white }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={c} {...xl} />
    <circle cx={-r * 0.32} cy={-r * 0.08} r={r * 0.13} fill={COLORS.outline} /><circle cx={r * 0.32} cy={-r * 0.08} r={r * 0.13} fill={COLORS.outline} />
  </g>
);

/** Gut-hunch — a figure with a glowing question in the stomach: something's off. */
export const GutHunch: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <g transform="translate(0 -30)"><Head r={38} /><path d="M -14 10 Q 0 20 14 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <path d="M -56 110 Q -60 36 0 28 Q 60 36 56 110 Z" fill={COLORS.hoodie} {...xl} />
      {/* glowing hunch in the gut */}
      <circle cx={0} cy={66} r={26} fill={COLORS.yellow} opacity={g} />
      <text x={0} y={76} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.outline}>?</text>
      <Label t="something feels off" />
    </g>
  );
};

/** Truth-default-glasses — rose-tinted glasses that read everything as "true". */
export const TruthDefaultGlasses: React.FC = () => (
  <g>
    <g transform="translate(0 -10)">
      {[-44, 44].map((x, i) => <circle key={i} cx={x} cy={0} r={40} fill={COLORS.sky} opacity={0.4} {...xl} />)}
      <line x1={-4} y1={0} x2={4} y2={0} stroke={COLORS.outline} strokeWidth={STROKE.lg} />
      <line x1={-84} y1={-6} x2={-108} y2={-18} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={84} y1={-6} x2={108} y2={-18} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* little ticks in each lens */}
      {[-44, 44].map((x, i) => <path key={i} d={`M ${x - 14} 0 l 8 10 l 16 -18`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />)}
    </g>
    <text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>we assume: true</text>
    <Label t="the truth-default" />
  </g>
);

/** Coinflip-accuracy — a spinning coin: lie-detection is barely above chance. */
export const CoinflipAccuracy: React.FC = () => {
  const f = useCurrentFrame();
  const w = Math.abs(Math.cos(f / 8));
  return (
    <g>
      <ellipse cx={0} cy={86} rx={50} ry={10} fill={COLORS.outline} opacity={0.2} />
      <g transform={`translate(0 ${-20 - 30 * Math.abs(Math.sin(f / 8))})`}>
        <ellipse cx={0} cy={0} rx={10 + 48 * w} ry={54} fill={COLORS.yellow} {...xl} />
        {w > 0.4 && <text x={0} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.yellowDark}>{f % 16 < 8 ? '✓' : '✗'}</text>}
      </g>
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>~54% — barely better than 50/50</text>
    </g>
  );
};

/** Myth-busted — a classic "tell" (shifty eyes) with a big red cross through it. */
export const MythBusted: React.FC = () => (
  <g>
    <Head r={54} />
    {/* shifty side-glancing eyes */}
    <circle cx={-17} cy={-4} r={7} fill={COLORS.outline} /><circle cx={21} cy={-4} r={7} fill={COLORS.outline} />
    <path d="M -22 24 Q 0 16 22 24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    {/* sweat bead myth */}
    <path d="M 44 -20 q -7 10 0 18 q 7 -8 0 -18 Z" fill={COLORS.sky} {...sm} />
    <circle cx={0} cy={0} r={74} fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} />
    <line x1={-52} y1={52} x2={52} y2={-52} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <Label t="not a reliable tell" />
  </g>
);

/** Othello-error — a nervous but honest figure wrongly flagged as a liar. */
export const OthelloError: React.FC = () => {
  const f = useCurrentFrame();
  const tremble = 2 * Math.sin(f / 2);
  return (
    <g>
      <g transform={`translate(${tremble} 0)`}>
        <Head r={46} c={shade(COLORS.skin, 0.02)} />
        <path d="M -20 22 q 8 -8 20 0 q 8 6 0 10 q -12 6 -20 -2 Z" fill={COLORS.pinkDark} {...sm} />
        {/* nervous sweat */}
        {[-40, 40].map((x, i) => <path key={i} d={`M ${x} -14 q -6 9 0 16 q 6 -7 0 -16 Z`} fill={COLORS.sky} {...sm} />)}
      </g>
      {/* a mislabeled 'LIAR' tag + a small 'but honest' */}
      <g transform="translate(60 -54) rotate(10)"><rect x={-40} y={-18} width={80} height={34} rx={8} fill={COLORS.red} {...sm} /><text x={0} y={7} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>LIAR?</text></g>
      <Label t="nervous isn't lying" />
    </g>
  );
};

/** Micro-flash — a fleeting microexpression flickering across a calm face. */
export const MicroFlash: React.FC = () => {
  const f = useCurrentFrame();
  const flash = (f % 40) < 5;
  return (
    <g>
      <Head r={54} c={flash ? shade(COLORS.skin, 0.02) : COLORS.white} />
      {flash
        ? <><path d="M -30 -10 L -8 -4 M 8 -4 L 30 -10" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /><path d="M -18 26 Q 0 14 18 26" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></>
        : <path d="M -18 20 Q 0 30 18 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
      {flash && [[-70, -40], [70, -40]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>{[0, 1, 2].map((j) => <line key={j} x1={0} y1={0} x2={(i ? 1 : -1) * (10 + j * 8)} y2={-6 + j * 6} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>)}
      <text x={0} y={94} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>real, but a blink long</text>
      <Label t="the microexpression" />
    </g>
  );
};

/** Cognitive-load-lie — a brain straining under the extra weight of a lie. */
export const CognitiveLoadLie: React.FC = () => {
  const f = useCurrentFrame();
  const strain = 2 * Math.sin(f / 2.5);
  return (
    <g transform={`translate(${strain} 0)`}>
      {/* the brain */}
      <path d="M -60 10 Q -74 -40 -34 -52 Q -20 -78 10 -64 Q 44 -74 52 -44 Q 76 -30 60 4 Q 66 36 26 42 Q 0 60 -28 44 Q -62 42 -60 10 Z" fill={COLORS.pink} {...xl} />
      <path d="M -30 -40 Q -10 -20 -24 0 Q -6 14 -20 32 M 14 -48 Q 4 -22 24 -10 Q 8 8 26 28" fill="none" stroke={shade(COLORS.pink, 0.16)} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* a heavy weight labelled LIE pressing down */}
      <g transform="translate(0 -92)"><rect x={-44} y={-26} width={88} height={40} rx={8} fill={COLORS.outline} /><text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.white}>LIE</text><path d="M -30 14 l -8 14 M 30 14 l 8 14" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      {/* strain sweat */}
      <path d="M 60 -6 q -6 9 0 16 q 6 -7 0 -16 Z" fill={COLORS.sky} {...sm} />
      <Label t="lying is hard work" />
    </g>
  );
};

/** Sparse-story vs rich — a thin lie bubble beside a detail-rich true one. */
export const SparseStory: React.FC = () => (
  <g>
    {/* thin, vague lie */}
    <g transform="translate(-66 0)"><rect x={-50} y={-50} width={100} height={110} rx={12} fill={COLORS.white} {...lg} /><line x1={-34} y1={-20} x2={34} y2={-20} stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={-34} y1={6} x2={14} y2={6} stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" /><text x={0} y={92} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.outline}>lie: thin</text></g>
    {/* rich, detailed truth */}
    <g transform="translate(66 0)"><rect x={-50} y={-62} width={100} height={134} rx={12} fill={COLORS.white} {...lg} />{[-44, -30, -16, -2, 12, 26, 40, 54].map((y, i) => <line key={i} x1={-36} y1={y} x2={i % 3 === 0 ? 24 : 36} y2={y} stroke={COLORS.greenLeaf} strokeWidth={STROKE.sm} strokeLinecap="round" />)}<text x={0} y={100} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.outline}>truth: rich</text></g>
    <Label t="listen for the detail" />
  </g>
);

/** Reverse-order — an arrow curling backwards: tell it in reverse to add load. */
export const ReverseOrder: React.FC = () => {
  const f = useCurrentFrame();
  const dash = -(f * 2) % 24;
  return (
    <g>
      <path d="M 70 -40 C 70 40 -70 40 -70 -20" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="10 14" strokeDashoffset={dash} />
      <path d="M -70 -20 l -12 18 l 22 2" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {[3, 2, 1].map((n, i) => <g key={n} transform={`translate(${40 - i * 40} ${-48 + i * 44})`}><circle cx={0} cy={0} r={20} fill={COLORS.white} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>{n}</text></g>)}
      <Label t="ask for it backwards" />
    </g>
  );
};

/** Cross-check — two documents compared, a tick where facts corroborate. */
export const CrossCheck: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      {[-56, 56].map((x, i) => <g key={i} transform={`translate(${x} 0) rotate(${i ? 6 : -6})`}><rect x={-44} y={-60} width={88} height={130} rx={8} fill={COLORS.white} {...lg} />{[-40, -22, -4, 14, 32, 50].map((y, j) => <line key={j} x1={-30} y1={y} x2={30} y2={y} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />)}</g>)}
      {/* connecting magnifier/check in the middle */}
      <circle cx={0} cy={-4} r={30} fill={COLORS.greenLeaf} opacity={g} {...lg} />
      <path d="M -12 -4 l 7 9 l 16 -18" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <Label t="check it against the facts" />
    </g>
  );
};
