/**
 * impostor.tsx — ALL-NEW art for "Impostor Syndrome: Why You Feel Like a Fraud".
 * The core fraud mask, discounting your wins, the fear of exposure, the "more you
 * know" wider shore, the evidence folder (the fix) — plus the five types
 * (perfectionist, expert, soloist, natural genius, superhero). Token strokes,
 * centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; sweat?: boolean }> = ({ r = 40, c = COLORS.white, sweat }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} />
    {sweat && <path d={`M ${r * 0.9} ${-r * 1.2} q ${r * 0.14} ${r * 0.24} 0 ${r * 0.36} q ${-r * 0.14} ${-r * 0.12} 0 ${-r * 0.36} Z`} fill={COLORS.sky} {...sm} />}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 132 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** Fraud mask — a confident "expert" mask held over an anxious real face. */
export const FraudMask: React.FC = () => (
  <g>
    <g transform="translate(0 20)"><Fig r={44} c={COLORS.white} sweat /></g>
    {/* the confident mask slipping aside */}
    <g transform="translate(60 -4) rotate(14)">
      <path d="M -46 -38 Q -52 34 0 50 Q 52 34 46 -38 Q 0 -58 -46 -38 Z" fill={COLORS.blueDiagram} {...lg} />
      <path d="M -24 -14 l 16 6 M 24 -14 l -16 6" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -16 16 Q 0 28 16 16" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />
    </g>
    <Label t="the fraud feeling" />
  </g>
);

/** Discount the win — a hand labelling a trophy "just luck". */
export const DiscountWin: React.FC = () => (
  <g>
    <g transform="translate(-24 -10)"><rect x={-34} y={-6} width={68} height={16} rx={6} fill={COLORS.yellowDark} {...sm} /><path d="M -30 -30 a 30 24 0 0 0 60 0 Z" fill={COLORS.yellow} {...lg} /><path d="M -30 -24 q -26 0 -22 24 M 30 -24 q 26 0 22 24" fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} /><rect x={-14} y={10} width={28} height={24} fill={COLORS.yellowDark} /></g>
    <g transform="translate(40 40) rotate(-10)"><rect x={-54} y={-20} width={108} height={40} rx={8} fill={COLORS.white} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.red}>luck</text></g>
    <Label t="it doesn't count" />
  </g>
);

/** Found out — a spotlight exposing a cowering figure, "FRAUD" revealed. */
export const FoundOut: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      <path d="M 0 -120 L -80 70 L 80 70 Z" fill={COLORS.yellowSoft} opacity={g} />
      <g transform="translate(0 40) scale(0.9)"><Fig r={36} c={COLORS.white} sweat /></g>
      <g transform="translate(0 -80)"><rect x={-56} y={-20} width={112} height={40} rx={8} fill={COLORS.red} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.white}>FRAUD?</text></g>
      <Label t="any minute now..." />
    </g>
  );
};

/** The wider shore — the more you know, the more unknown you can see. */
export const WiderShore: React.FC = () => (
  <g>
    <circle cx={0} cy={-6} r={60} fill={COLORS.sky} opacity={0.5} {...lg} />
    <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>what I</text>
    <text x={0} y={24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>know</text>
    <circle cx={0} cy={-6} r={104} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.xl} strokeDasharray="10 10" />
    <text x={0} y={-96} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>what I don't</text>
    <Label t="the more you know" />
  </g>
);

/** Evidence folder — collecting real proof of your wins (the fix). */
export const EvidenceFolder: React.FC = () => (
  <g>
    <rect x={-80} y={-60} width={160} height={130} rx={10} fill={COLORS.greenLeaf} {...xl} />
    <path d="M -80 -60 l 50 0 l 16 20 l 94 0 l 0 -8 l -160 0 Z" fill={shade(COLORS.greenLeaf, 0.14)} {...sm} />
    {[-30, -4, 22].map((y, i) => <g key={i}><rect x={-54} y={y} width={108} height={14} rx={4} fill={COLORS.white} /><path d={`M -48 ${y + 7} l 5 5 l 9 -11`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" /></g>)}
    <Label t="collect the proof" />
  </g>
);

/** Type: Perfectionist — fixated on one tiny flaw amid success. */
export const TypePerfectionist: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={92} fill={COLORS.greenLeaf} {...xl} />
    <path d="M -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} />
    {/* one small red flaw */}
    <path d="M 30 -36 a 14 14 0 1 0 0.1 0" fill={COLORS.red} {...sm} />
    <g transform="translate(66 -58)"><circle r={28} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} /><rect x={20} y={20} width={14} height={34} rx={6} fill={COLORS.outline} transform="rotate(-45 27 37)" /></g>
    <Label t="PERFECTIONIST" />
  </g>
);

/** Type: Expert — never feels they know enough, buried in books. */
export const TypeExpert: React.FC = () => (
  <g>
    <g transform="translate(0 20)"><Fig r={34} c={COLORS.white} sweat /></g>
    {[[-70, 40], [70, 40], [-50, 0], [52, -4]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${i % 2 ? 10 : -10})`}><rect x={-26} y={-34} width={52} height={68} rx={4} fill={[COLORS.red, COLORS.sky, COLORS.yellow, COLORS.lavender][i]} {...sm} /><rect x={-26} y={-34} width={10} height={68} fill={shade([COLORS.red, COLORS.sky, COLORS.yellow, COLORS.lavender][i], -0.1)} /></g>)}
    <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>not enough...</text>
    <Label t="EXPERT" />
  </g>
);

/** Type: Soloist — refusing all offered help. */
export const TypeSoloist: React.FC = () => (
  <g>
    <g transform="translate(-20 20)"><Fig r={40} c={COLORS.white} /></g>
    {/* an offered helping hand, pushed away */}
    <g transform="translate(74 10)"><circle cx={0} cy={0} r={22} fill={COLORS.skin} {...lg} /><rect x={-50} y={-10} width={40} height={20} rx={10} fill={COLORS.skin} {...sm} /></g>
    <path d="M 8 -14 l 40 0 m -10 -10 l 10 10 l -10 10" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" transform="scale(-1 1) translate(-30 0)" />
    <text x={-20} y={-54} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>I'll do it alone</text>
    <Label t="SOLOIST" />
  </g>
);

/** Type: Natural Genius — ashamed that something feels hard. */
export const TypeGenius: React.FC = () => {
  const f = useCurrentFrame();
  const sh = 3 * Math.sin(f / 3);
  return (
    <g transform={`translate(${sh} 0)`}>
      <g transform="translate(0 20)"><Fig r={42} c={COLORS.white} sweat /></g>
      {/* a struggle: pushing a heavy block */}
      <g transform="translate(66 36)"><rect x={-26} y={-26} width={52} height={52} rx={8} fill={COLORS.ledGrey} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.white}>?!</text></g>
      <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>it should be easy</text>
      <Label t="NATURAL GENIUS" />
    </g>
  );
};

/** Type: Superhero — overworking in a cape to prove their worth. */
export const TypeSuperhero: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M -40 -20 Q -90 40 -70 100 L -30 70 Z" fill={COLORS.red} {...lg} />
      <g transform="translate(0 20)"><Fig r={40} c={COLORS.white} sweat /></g>
      <path d="M -24 4 L 24 4 L 14 -14 L -14 -14 Z" fill={COLORS.yellow} {...sm} transform="translate(0 -40)" />
      {[[-66, -50], [70, -44]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 6 -12 l 6 12 Z`} fill={COLORS.yellow} opacity={0.5 + 0.4 * Math.sin(f / 5 + i)} />)}
      <Label t="SUPERHERO" />
    </g>
  );
};
