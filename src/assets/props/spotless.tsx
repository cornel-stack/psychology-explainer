/**
 * spotless.tsx — ALL-NEW art for "The Psychology of People Who Keep Their House
 * Spotless". Functions (spotless-sparkle, control-island, scrub-calm, label-jars),
 * differences (disgust-dial), effects (clutter-static, clear-desk-focus), the
 * shadow (tidy-cage), and balance (good-enough-home, reset-ritual). Token strokes,
 * centered on origin, ~300px tall.
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
const Sparkle: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = COLORS.yellow }) => (
  <path d={`M ${x} ${y - 14 * s} l ${3 * s} ${10 * s} l ${10 * s} ${3 * s} l ${-10 * s} ${3 * s} l ${-3 * s} ${10 * s} l ${-3 * s} ${-10 * s} l ${-10 * s} ${-3 * s} l ${10 * s} ${-3 * s} Z`} fill={c} />
);

/** Spotless-sparkle — a gleaming countertop catching the light. */
export const SpotlessSparkle: React.FC = () => {
  const f = useCurrentFrame();
  const tw = (i: number) => 0.4 + 0.6 * Math.abs(Math.sin(f / 7 + i));
  return (
    <g>
      <rect x={-96} y={10} width={192} height={40} rx={10} fill={COLORS.sky} {...xl} />
      <rect x={-96} y={10} width={192} height={14} rx={8} fill={COLORS.white} opacity={0.6} />
      {/* shine streak */}
      <path d="M -70 22 l 40 0" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} />
      <g opacity={tw(0)}><Sparkle x={-50} y={-30} s={1.1} /></g>
      <g opacity={tw(1)}><Sparkle x={20} y={-44} s={0.9} /></g>
      <g opacity={tw(2)}><Sparkle x={66} y={-14} s={0.7} /></g>
      <Label t="not a speck in sight" />
    </g>
  );
};

/** Control-island — a calm tidy island amid a stormy, chaotic sea. */
export const ControlIsland: React.FC = () => {
  const f = useCurrentFrame();
  const wave = 6 * Math.sin(f / 8);
  return (
    <g>
      {/* chaotic sea */}
      {[-1, 0, 1].map((r) => <path key={r} d={`M -120 ${50 + r * 24} q 30 ${-14 + wave} 60 0 q 30 ${14} 60 0 q 30 ${-14 - wave} 60 0`} fill="none" stroke={shade(COLORS.purpleDeep, 0.1)} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />)}
      {/* calm island */}
      <ellipse cx={0} cy={28} rx={66} ry={22} fill={COLORS.greenLeaf} {...xl} />
      <rect x={-34} y={-30} width={68} height={48} rx={8} fill={COLORS.white} {...lg} />
      <path d="M -40 -30 L 0 -58 L 40 -30 Z" fill={COLORS.red} {...lg} />
      <Sparkle x={0} y={-66} s={0.7} c={COLORS.yellow} />
      <Label t="one corner I control" />
    </g>
  );
};

/** Scrub-calm — a sponge mid-scrub leaving a wake of calm shine. */
export const ScrubCalm: React.FC = () => {
  const f = useCurrentFrame();
  const dx = 24 * Math.sin(f / 6);
  return (
    <g>
      <rect x={-96} y={30} width={192} height={28} rx={8} fill={shade(COLORS.sky, 0.08)} {...lg} />
      {/* the sponge */}
      <g transform={`translate(${dx} 0)`}><rect x={-30} y={-10} width={60} height={36} rx={8} fill={COLORS.yellow} {...xl} /><rect x={-30} y={14} width={60} height={12} rx={4} fill={shade(COLORS.yellow, 0.14)} /></g>
      {/* bubbles rising calmly */}
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={dx - 30 + i * 20} cy={-30 - (f / 2 + i * 14) % 50} r={5 + (i % 2) * 3} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} opacity={0.7} />)}
      {/* calm wave of shine behind */}
      <path d="M -90 -46 q 30 -14 60 0 q 30 14 60 0 q 30 -14 60 0" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />
      <Label t="cleaning quiets the mind" />
    </g>
  );
};

/** Label-jars — a tidy shelf of neatly labelled, aligned jars. */
export const LabelJars: React.FC = () => (
  <g>
    <rect x={-100} y={54} width={200} height={14} rx={4} fill={COLORS.wood} {...lg} />
    {[-66, -22, 22, 66].map((x, i) => (
      <g key={i} transform={`translate(${x} 0)`}>
        <rect x={-18} y={-40} width={36} height={94} rx={8} fill={[COLORS.sky, COLORS.greenLeaf, COLORS.pink, COLORS.yellow][i]} opacity={0.7} {...lg} />
        <rect x={-14} y={-50} width={28} height={14} rx={4} fill={shade(COLORS.white, 0.1)} {...sm} />
        <rect x={-13} y={2} width={26} height={16} rx={3} fill={COLORS.white} {...sm} />
        <line x1={-7} y1={10} x2={7} y2={10} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      </g>
    ))}
    <Label t="a place for everything" />
  </g>
);

/** Disgust-dial — a gauge for how strongly mess registers as "ick". */
export const DisgustDial: React.FC = () => {
  const f = useCurrentFrame();
  const deg = 120 + 30 * Math.sin(f / 7);
  const rad = (deg - 90) * (Math.PI / 180);
  return (
    <g>
      <path d="M -90 10 A 90 90 0 0 1 90 10" fill="none" stroke={shade(COLORS.outline, 0.4)} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -90 10 A 90 90 0 0 1 90 10" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray={`${(deg / 180) * Math.PI * 90} 999`} />
      <line x1={0} y1={10} x2={Math.cos(rad) * 70} y2={10 + Math.sin(rad) * 70} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={10} r={12} fill={COLORS.outline} />
      <text x={-90} y={40} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>meh</text>
      <text x={90} y={40} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>ICK!</text>
      <Label t="the disgust dial" />
    </g>
  );
};

/** Clutter-static — a messy pile buzzing with distracting noise. */
export const ClutterStatic: React.FC = () => {
  const f = useCurrentFrame();
  const j = () => (Math.sin(f) * 2);
  return (
    <g>
      {/* messy heap of objects */}
      <g transform={`translate(${j()} 0)`}>
        <rect x={-60} y={10} width={50} height={40} rx={6} fill={COLORS.red} {...lg} transform="rotate(-10 -35 30)" />
        <rect x={0} y={0} width={46} height={46} rx={6} fill={COLORS.sky} {...lg} transform="rotate(14 23 23)" />
        <circle cx={-10} cy={-20} r={24} fill={COLORS.yellow} {...lg} />
        <rect x={20} y={-30} width={40} height={30} rx={6} fill={COLORS.pink} {...lg} transform="rotate(-8 40 -15)" />
        <path d="M -50 -34 q 20 -10 40 0" fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* static/noise sparks radiating */}
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={Math.cos((i / 6) * Math.PI * 2) * 70} y1={Math.sin((i / 6) * Math.PI * 2) * 60} x2={Math.cos((i / 6) * Math.PI * 2) * 92} y2={Math.sin((i / 6) * Math.PI * 2) * 78} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(f / 3 + i)} />)}
      <Label t="clutter pulls at your focus" />
    </g>
  );
};

/** Clear-desk-focus — a clean desk with one task in a sharp beam of focus. */
export const ClearDeskFocus: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-96} y={40} width={192} height={26} rx={8} fill={COLORS.wood} {...xl} />
      {/* focus beam */}
      <path d="M 0 -80 L -56 40 L 56 40 Z" fill={COLORS.yellowSoft} opacity={0.3 + g * 0.3} />
      {/* a single neat laptop/notebook */}
      <g transform="translate(0 14)"><rect x={-40} y={-20} width={80} height={48} rx={6} fill={COLORS.white} {...lg} /><line x1={-26} y1={-6} x2={26} y2={-6} stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={-26} y1={10} x2={6} y2={10} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Sparkle x={54} y={-30} s={0.7} />
      <Label t="clear space, clear head" />
    </g>
  );
};

/** Tidy-cage — a figure boxed in by bars of brooms and sprays: tidiness as prison. */
export const TidyCage: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* small worried figure inside */}
      <g transform="translate(0 6)"><circle cx={0} cy={-10} r={36} fill={COLORS.white} {...xl} /><circle cx={-13} cy={-14} r={5} fill={COLORS.outline} /><circle cx={13} cy={-14} r={5} fill={COLORS.outline} /><path d={`M -14 6 Q 0 ${-2 + Math.sin(f / 4) * 2} 14 6`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* bars = brooms / spray bottles */}
      {[-56, -18, 18, 56].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><rect x={-4} y={-74} width={8} height={150} rx={4} fill={COLORS.woodDark} /><rect x={-14} y={54} width={28} height={22} rx={4} fill={COLORS.yellow} {...sm} /></g>)}
      <rect x={-72} y={-78} width={144} height={14} rx={6} fill={COLORS.woodDark} />
      <Label t="when tidy becomes a cage" />
    </g>
  );
};

/** Good-enough-home — a lived-in, happy little home with a content heart. */
export const GoodEnoughHome: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      <rect x={-74} y={-20} width={148} height={96} rx={10} fill={COLORS.bgCreamDark} {...xl} />
      <path d="M -86 -20 L 0 -78 L 86 -20 Z" fill={COLORS.red} {...lg} />
      <rect x={-20} y={16} width={40} height={60} rx={6} fill={COLORS.wood} {...lg} />
      <rect x={28} y={0} width={34} height={30} rx={4} fill={COLORS.sky} {...sm} />
      {/* a slightly-askew picture + a mug left out: lived in, and that's ok */}
      <rect x={-56} y={0} width={26} height={22} rx={3} fill={COLORS.lavender} {...sm} transform="rotate(-8 -43 11)" />
      <g transform="translate(-48 60)"><rect x={-12} y={-14} width={24} height={20} rx={5} fill={COLORS.pink} {...sm} /></g>
      <path d="M 0 -48 q -8 -9 -14 -1 q -4 7 14 16 q 18 -9 14 -16 q -6 -8 -14 1 Z" fill={COLORS.pink} opacity={g} />
      <Label t="lived-in, and loved" />
    </g>
  );
};

/** Reset-ritual — a gentle evening tidy: a few items returning to their spots. */
export const ResetRitual: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 90) / 90;
  return (
    <g>
      <rect x={-96} y={50} width={192} height={18} rx={6} fill={COLORS.wood} {...lg} />
      {/* three items arcing home into a basket */}
      <g transform="translate(60 44)"><path d="M -34 0 L 34 0 L 26 40 L -26 40 Z" fill={COLORS.sky} {...lg} /><path d="M -34 0 L 34 0" stroke={shade(COLORS.sky, -0.1)} strokeWidth={STROKE.lg} /></g>
      {[0, 1, 2].map((i) => { const p = ((t + i / 3) % 1); const x = -70 + p * 120; const y = 30 - Math.sin(p * Math.PI) * 70; return <rect key={i} x={x - 10} y={y - 10} width={20} height={20} rx={5} fill={[COLORS.red, COLORS.yellow, COLORS.greenLeaf][i]} {...sm} transform={`rotate(${p * 180} ${x} ${y})`} />; })}
      {/* moon: evening */}
      <path d="M -76 -44 a 20 20 0 1 0 6 36 a 16 16 0 1 1 -6 -36 Z" fill={COLORS.yellowSoft} {...sm} />
      <Label t="a small daily reset" />
    </g>
  );
};
