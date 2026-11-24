/**
 * distortions.tsx — ALL-NEW art for "Every Cognitive Distortion Explained" (CBT).
 * One emblem per thinking trap: all-or-nothing, overgeneralising, the mental
 * filter, discounting the positive, mind-reading, catastrophising, emotional
 * reasoning, should-statements, labelling, personalisation — plus the distorting
 * lens and the reframe glasses. Flat two-tone, token strokes. Centered, ~300px.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; sad?: boolean }> = ({ r = 38, c = COLORS.white, sad }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} />
    {sad && <path d={`M ${-r * 0.3} ${-r * 0.7} q ${r * 0.3} ${-r * 0.2} ${r * 0.6} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 132 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={23} fill={COLORS.outline}>{t}</text>
);

/** All-or-nothing — a hard split: pure black, pure white, nothing between. */
export const AllOrNothing: React.FC = () => (
  <g>
    <path d="M -90 -90 L 0 -90 L 0 90 L -90 90 Z" fill={COLORS.outline} {...xl} />
    <path d="M 0 -90 L 90 -90 L 90 90 L 0 90 Z" fill={COLORS.white} {...xl} />
    <text x={-45} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.white}>ALL</text>
    <text x={45} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.outline}>or</text>
    <Label t="all-or-nothing" />
  </g>
);

/** Overgeneralisation — one event stamped into ALWAYS / NEVER, forever. */
export const OverGeneralize: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <circle cx={-56} cy={-30} r={26} fill={COLORS.sky} {...lg} />
      <path d="M -24 -30 l 40 0 m -12 -12 l 12 12 l -12 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`rotate(${-6 + 2 * Math.sin(f / 8)})`}><rect x={6} y={-54} width={120} height={50} rx={10} fill={COLORS.red} {...xl} /><text x={66} y={-20} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.white}>ALWAYS</text></g>
      <text x={0} y={44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>...never, everyone</text>
      <Label t="overgeneralising" />
    </g>
  );
};

/** Mental filter — a funnel that keeps only the dark drops, lets light pass. */
export const MentalFilter: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <path d="M -80 -70 L 80 -70 L 24 10 L 24 70 L -24 70 L -24 10 Z" fill={COLORS.white} {...xl} />
      {/* good light passing away */}
      {[-50, 0, 50].map((x, i) => <circle key={i} cx={x} cy={-50 - ((f / 4) % 20)} r={9} fill={COLORS.yellow} opacity={0.4} {...sm} />)}
      {/* dark drops collected */}
      {[[-8, 40], [8, 56], [0, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill={shade(COLORS.outline, 0.2)} {...sm} />)}
      <Label t="mental filter" />
    </g>
  );
};

/** Discounting the positive — a hand swatting away a golden star. */
export const DiscountPositive: React.FC = () => (
  <g>
    <g opacity={0.5} transform="translate(-50 -10) rotate(-18)"><path d="M 0 -44 L 13 -12 L 46 -8 L 20 14 L 28 46 L 0 28 L -28 46 L -20 14 L -46 -8 L -13 -12 Z" fill={COLORS.yellow} {...lg} /></g>
    <path d="M 30 -40 l 36 60" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <g transform="translate(40 10)"><circle cx={0} cy={0} r={24} fill={COLORS.skin} {...lg} /><rect x={14} y={-10} width={46} height={20} rx={10} fill={COLORS.skin} {...sm} transform="rotate(30)" /></g>
    <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>"doesn't count"</text>
    <Label t="discount the positive" />
  </g>
);

/** Mind-reading — a crystal ball showing someone assuming the worst of them. */
export const MindReading: React.FC = () => (
  <g>
    <circle cx={0} cy={-6} r={76} fill={COLORS.lavender} {...xl} />
    <circle cx={-24} cy={-30} r={18} fill={COLORS.white} opacity={0.6} />
    <g transform="translate(0 -6) scale(0.6)"><Fig r={36} c={COLORS.white} sad /></g>
    <g transform="translate(44 -40)"><rect x={-22} y={-18} width={44} height={30} rx={8} fill={COLORS.white} {...sm} /><text x={0} y={4} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.red}>:(</text></g>
    <path d="M -64 64 L 64 64 L 44 84 L -44 84 Z" fill={shade(COLORS.lavender, -0.08)} {...lg} />
    <Label t="mind-reading" y={118} />
  </g>
);

/** Catastrophising — a tiny snowball becoming a huge avalanche. */
export const Catastrophize: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <circle cx={-78} cy={-56} r={14} fill={COLORS.white} {...sm} />
      <path d="M -70 -46 q 50 30 120 70" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeDasharray="4 8" />
      <g transform={`scale(${1 + 0.03 * Math.sin(f / 5)})`}>
        <circle cx={40} cy={30} r={66} fill={COLORS.white} {...xl} />
        <circle cx={10} cy={10} r={28} fill={COLORS.whiteShade} {...lg} />
        <circle cx={70} cy={54} r={22} fill={COLORS.whiteShade} {...lg} />
      </g>
      <path d="M 100 -30 l 8 16 l 16 4 l -14 10 l 4 18 l -14 -10 l -14 8 l 6 -16 Z" fill={COLORS.red} {...sm} />
      <Label t="catastrophising" />
    </g>
  );
};

/** Emotional reasoning — a heart stamping the word TRUE onto a page. */
export const EmotionReasoning: React.FC = () => {
  const f = useCurrentFrame();
  const press = Math.max(0, Math.sin(f / 6)) * 14;
  return (
    <g>
      <rect x={-70} y={30} width={140} height={60} rx={8} fill={COLORS.white} {...lg} />
      <text x={0} y={72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.red}>TRUE</text>
      <g transform={`translate(0 ${-30 + press})`}>
        <path d="M 0 36 C -40 -4 -64 -28 -36 -54 C -16 -72 0 -48 0 -34 C 0 -48 16 -72 36 -54 C 64 -28 40 -4 0 36 Z" fill={COLORS.red} {...xl} />
        <rect x={-10} y={30} width={20} height={20} fill={shade(COLORS.red, -0.1)} />
      </g>
      <text x={0} y={-66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>"I feel it, so..."</text>
      <Label t="emotional reasoning" />
    </g>
  );
};

/** Should-statements — a heavy rulebook of SHOULDs weighing down. */
export const ShouldStatements: React.FC = () => (
  <g>
    <rect x={-80} y={-70} width={160} height={150} rx={10} fill={COLORS.blueDiagram} {...xl} />
    <rect x={-80} y={-70} width={30} height={150} rx={10} fill={shade(COLORS.blueDiagram, -0.1)} {...sm} />
    {['SHOULD', 'MUST', 'OUGHT'].map((t, i) => <text key={t} x={6} y={-28 + i * 42} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.white}>{t}</text>)}
    <path d="M 70 -80 q 30 10 10 40" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <Label t="should-statements" />
  </g>
);

/** Labelling — a harsh FAILURE sticker slapped across a whole person. */
export const Labeling: React.FC = () => (
  <g>
    <g transform="translate(0 10)"><Fig r={42} c={COLORS.white} sad /></g>
    <g transform="rotate(-8)"><rect x={-96} y={-14} width={192} height={52} rx={8} fill={COLORS.red} {...xl} /><text x={0} y={22} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.white}>FAILURE</text></g>
    <Label t="labelling" />
  </g>
);

/** Personalisation — a lone figure under a blame-spotlight, taking all the fault. */
export const Personalization: React.FC = () => (
  <g>
    <path d="M -110 -96 L 110 -96 L 70 60 L -70 60 Z" fill={COLORS.yellowSoft} opacity={0.3} />
    <g transform="translate(0 20)"><Fig r={40} c={COLORS.white} sad /></g>
    <text x={0} y={-48} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>"it's all my fault"</text>
    {[[-80, 30], [84, 24], [-60, 64]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 16 -8 m -16 8 l 12 10`} stroke={COLORS.red} strokeWidth={STROKE.sm} fill="none" strokeLinecap="round" />)}
    <Label t="personalising" />
  </g>
);

/** The distorting lens — a warped magnifier twisting a plain thought. */
export const DistortionLens: React.FC = () => {
  const f = useCurrentFrame();
  const w = 1 + 0.08 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-96} y={-30} width={70} height={60} rx={10} fill={COLORS.white} {...lg} />
      <circle cx={-61} cy={0} r={8} fill={COLORS.greenLeaf} />
      <g transform={`translate(10 0) scale(${w} ${2 - w})`}>
        <circle cx={0} cy={0} r={60} fill={COLORS.sky} opacity={0.3} {...xl} />
        <circle cx={0} cy={0} r={60} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
      </g>
      <rect x={44} y={44} width={24} height={60} rx={10} fill={COLORS.outline} transform="rotate(-45 56 60)" />
      <g transform="translate(96 0)"><circle cx={0} cy={0} r={10} fill={COLORS.red} /></g>
      <Label t="the distorting lens" />
    </g>
  );
};

/** Reframe glasses — clear specs that see the thought straight again. */
export const ReframeGlasses: React.FC = () => (
  <g>
    <circle cx={-44} cy={0} r={44} fill={COLORS.sky} opacity={0.3} {...xl} />
    <circle cx={44} cy={0} r={44} fill={COLORS.sky} opacity={0.3} {...xl} />
    <line x1={-6} y1={-4} x2={6} y2={-4} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -88 -6 l -22 -14 M 88 -6 l 22 -14" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -58 10 l 14 14 l 26 -34" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    <Label t="reframe it" />
  </g>
);
