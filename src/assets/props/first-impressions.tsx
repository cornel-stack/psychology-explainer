/**
 * first-impressions.tsx — ALL-NEW art for "The Psychology of First Impressions".
 * Speed (snap-judgment-clock, thin-slice), the biases (primacy-anchor, halo-effect,
 * warmth-first), the stickiness (sticky-label, self-fulfilling), and the skill
 * (open-posture, pratfall-charm, second-look). Token strokes, centered on origin,
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

/** snap-judgment-clock — a stopwatch frozen near zero: the 0.1-second verdict. */
export const SnapJudgmentClock: React.FC = () => {
  const f = useCurrentFrame();
  const tick = 0.5 + 0.5 * Math.sin(f / 3);
  return (
    <g>
      <circle cx={0} cy={0} r={64} fill={COLORS.white} {...xl} />
      <rect x={-14} y={-86} width={28} height={16} rx={4} fill={COLORS.ledGrey} {...sm} />
      <circle cx={0} cy={0} r={48} fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 44} y1={Math.sin(a) * 44} x2={Math.cos(a) * 54} y2={Math.sin(a) * 54} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />; })}
      {/* hand pinned just past 12 — a tenth of a second */}
      <line x1={0} y1={0} x2={Math.sin(0.3) * 42} y2={-Math.cos(0.3) * 42} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={0} r={7} fill={COLORS.red} />
      <text x={0} y={-18} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline} opacity={0.5 + tick * 0.5}>0.1s</text>
      <Label t="judged in a blink" />
    </g>
  );
};

/** thin-slice — a tiny slice carved from a big circle still tells the whole story. */
export const ThinSlice: React.FC = () => {
  const f = useCurrentFrame();
  const pop = 0.9 + 0.1 * Math.sin(f / 6);
  return (
    <g>
      <circle cx={0} cy={0} r={70} fill={shade(COLORS.lavender, 0.06)} {...xl} />
      {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 70} y2={Math.sin(a) * 70} stroke={shade(COLORS.lavender, -0.08)} strokeWidth={STROKE.sm} opacity={0.5} />; })}
      {/* the thin slice pulled out */}
      <g transform={`translate(${26 * pop} ${-26 * pop}) scale(${pop})`}>
        <path d="M 0 0 L 58 -20 A 62 62 0 0 1 62 2 Z" fill={COLORS.yellow} {...lg} />
      </g>
      <text x={62} y={48} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>2 sec</text>
      <Label t="a thin slice is enough" />
    </g>
  );
};

/** primacy-anchor — a row of dominoes; the first one is colored and tips the rest. */
export const PrimacyAnchor: React.FC = () => {
  const f = useCurrentFrame();
  const lean = Math.min(1, (f % 60) / 20);
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const first = i === 0;
        const tip = first ? lean * 14 : Math.max(0, lean - i * 0.12) * 10;
        return <g key={i} transform={`translate(${-96 + i * 48} 0) rotate(${tip})`}>
          <rect x={-16} y={-54} width={32} height={108} rx={6} fill={first ? COLORS.yellow : COLORS.white} {...lg} />
          <circle cx={0} cy={-26} r={5} fill={first ? COLORS.outline : shade(COLORS.sky, -0.1)} />
          <circle cx={0} cy={26} r={5} fill={first ? COLORS.outline : shade(COLORS.sky, -0.1)} />
        </g>;
      })}
      <text x={-96} y={84} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>first</text>
      <Label t="the first one sets the tone" />
    </g>
  );
};

/** halo-effect — a smiling head wearing a glowing golden halo; one good trait spreads. */
export const HaloEffect: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      {[0, 1, 2].map((r) => <ellipse key={r} cx={0} cy={-70} rx={54 + r * 10} ry={16 + r * 4} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={(0.5 - r * 0.14) * (0.6 + glow * 0.6)} />)}
      <ellipse cx={0} cy={-70} rx={52} ry={15} fill={COLORS.yellow} opacity={0.4 + glow * 0.3} {...lg} />
      <circle cx={0} cy={0} r={54} fill={COLORS.skin} {...xl} />
      <circle cx={-18} cy={-6} r={6} fill={COLORS.outline} /><circle cx={18} cy={-6} r={6} fill={COLORS.outline} />
      <path d="M -20 20 Q 0 36 20 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="one good thing glows" />
    </g>
  );
};

/** warmth-first — two dials, warmth (lit, checked first) and competence. */
export const WarmthFirst: React.FC = () => {
  const f = useCurrentFrame();
  const sweep = (Math.sin(f / 10) * 0.5 + 0.5);
  const dial = (x: number, lit: boolean, label: string, val: number) => (
    <g transform={`translate(${x} 0)`}>
      <circle cx={0} cy={0} r={52} fill={lit ? shade(COLORS.yellow, 0.06) : COLORS.white} {...xl} />
      <path d="M -40 8 A 44 44 0 0 1 40 8" fill="none" stroke={shade(COLORS.sky, -0.08)} strokeWidth={STROKE.sm} />
      <line x1={0} y1={6} x2={Math.cos(Math.PI - val * Math.PI) * 36} y2={6 - Math.sin(Math.PI - val * Math.PI) * 36} stroke={lit ? COLORS.red : COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={6} r={6} fill={COLORS.outline} />
      <text x={0} y={44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>{label}</text>
      {lit && <text x={0} y={-24} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.red}>1st</text>}
    </g>
  );
  return (
    <g>
      {dial(-64, true, 'warmth', 0.55 + sweep * 0.3)}
      {dial(64, false, 'competence', 0.4)}
      <Label t="warmth is read first" />
    </g>
  );
};

/** sticky-label — a name-tag sticker pressed on, hard to peel: impressions stick. */
export const StickyLabel: React.FC = () => {
  const f = useCurrentFrame();
  const peel = 6 + 4 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-86} y={-60} width={172} height={120} rx={14} fill={COLORS.white} {...xl} />
      <rect x={-86} y={-60} width={172} height={34} rx={14} fill={COLORS.red} />
      <rect x={-86} y={-44} width={172} height={18} fill={COLORS.red} />
      <text x={0} y={-36} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>HELLO</text>
      <text x={0} y={18} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>first</text>
      <text x={0} y={44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>read</text>
      {/* a corner peeling, springing back */}
      <path d={`M 86 ${60} q -${peel} -${peel} -${peel + 2} -${peel * 2}`} fill={COLORS.whiteShade} {...sm} />
      <Label t="it sticks" />
    </g>
  );
};

/** self-fulfilling — expectation feeds behaviour feeds the same result, a closed loop. */
export const SelfFulfilling: React.FC = () => {
  const f = useCurrentFrame();
  const dash = -(f % 30);
  const nodes = [{ t: 'expect', a: -Math.PI / 2 }, { t: 'act', a: Math.PI / 6 }, { t: 'confirm', a: Math.PI * 0.83 }];
  return (
    <g>
      <circle cx={0} cy={0} r={66} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} strokeDasharray="6 14" strokeDashoffset={dash} opacity={0.7} />
      {nodes.map((n, i) => { const x = Math.cos(n.a) * 66; const y = Math.sin(n.a) * 66; return <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={0} r={26} fill={COLORS.yellowSoft} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{n.t}</text></g>; })}
      <Label t="it makes itself come true" />
    </g>
  );
};

/** open-posture — an open, warm stance (arms out) beside a closed one (crossed). */
export const OpenPosture: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 2 * Math.sin(f / 10);
  return (
    <g>
      {/* open / warm */}
      <g transform={`translate(-60 ${sway})`}>
        <circle cx={0} cy={-56} r={28} fill={COLORS.skin} {...lg} />
        <circle cx={-9} cy={-58} r={4} fill={COLORS.outline} /><circle cx={9} cy={-58} r={4} fill={COLORS.outline} />
        <path d="M -10 -48 Q 0 -40 10 -48" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M 0 -28 L 0 40" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <path d="M 0 -14 Q -34 -6 -44 18 M 0 -14 Q 34 -6 44 18" fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.greenDark}>open</text>
      </g>
      {/* closed */}
      <g transform="translate(70 0)" opacity={0.55}>
        <circle cx={0} cy={-56} r={28} fill={COLORS.white} {...lg} />
        <path d="M -10 -62 l 8 4 M 10 -62 l -8 4" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -8 -46 Q 0 -50 8 -46" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M 0 -28 L 0 40" stroke={COLORS.ledGrey} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <path d="M -30 2 Q 0 -8 30 2" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <text x={0} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>closed</text>
      </g>
      <Label t="your body speaks first" />
    </g>
  );
};

/** pratfall-charm — a confident figure fumbles a coffee and gets more likeable (hearts). */
export const PratfallCharm: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (f % 50) / 50;
  return (
    <g>
      <circle cx={0} cy={-40} r={34} fill={COLORS.skin} {...xl} />
      <circle cx={-12} cy={-44} r={5} fill={COLORS.outline} /><circle cx={12} cy={-44} r={5} fill={COLORS.outline} />
      <path d="M -12 -28 Q 0 -32 12 -28" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -34 40 Q -38 -6 0 -6 Q 38 -6 34 40 Z" fill={COLORS.sky} {...xl} />
      {/* spilled cup */}
      <g transform="translate(46 20) rotate(40)"><rect x={-14} y={-16} width={28} height={30} rx={5} fill={COLORS.white} {...lg} /><path d="M -10 -16 q 10 -18 22 -6" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* likeability hearts floating up */}
      {[0, 1, 2].map((i) => { const p = (rise + i / 3) % 1; return <path key={i} d="M 0 6 q -10 -10 -10 -18 q 0 -8 10 -8 q 10 0 10 8 q 0 8 -10 18 Z" fill={COLORS.pink} transform={`translate(${-40 + i * 40} ${-70 - p * 40}) scale(${0.5 + 0.4 * (1 - p)})`} opacity={1 - p} />; })}
      <Label t="a small flaw makes us warm" />
    </g>
  );
};

/** second-look — a magnifying glass taking a kinder second look at a face. */
export const SecondLook: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 6 * Math.sin(f / 12);
  return (
    <g>
      <circle cx={-10} cy={-6} r={46} fill={COLORS.skin} {...lg} />
      <circle cx={-24} cy={-10} r={5} fill={COLORS.outline} /><circle cx={2} cy={-10} r={5} fill={COLORS.outline} />
      <path d="M -24 12 Q -10 22 4 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* magnifying glass */}
      <g transform={`translate(${34 + drift} ${16})`}>
        <circle cx={0} cy={0} r={40} fill={COLORS.white} opacity={0.35} {...xl} />
        <circle cx={0} cy={0} r={40} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} />
        <line x1={28} y1={28} x2={64} y2={64} stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <path d="M -16 -8 l 10 10 l 18 -22" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <Label t="give them a second look" />
    </g>
  );
};
