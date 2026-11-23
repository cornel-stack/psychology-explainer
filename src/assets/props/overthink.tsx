/**
 * overthink.tsx — ALL-NEW art for "Every Level of Overthinking Explained".
 * Bespoke metaphors for escalating overthinking: the healthy ponder, the replay
 * tape, the what-if signposts, the stuck compass, the multiplying worry, the
 * disaster dominoes, the rumination tumbler, the overthink gauge, the tightening
 * knot, the emergency brake, the step-back frame, the one small step. Token
 * strokes, flat two-tone, local origin.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A calm thought cloud with a tick — healthy, finite pondering. */
export const PonderCloud: React.FC = () => (
  <g>
    {[[-110, 10, 64], [-30, -30, 80], [60, -24, 66], [120, 20, 56], [-50, 50, 54], [70, 52, 58]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={COLORS.sky} {...lg} />)}
    <ellipse cx={0} cy={16} rx={140} ry={60} fill={COLORS.sky} />
    <path d="M -34 10 L -8 40 L 44 -24" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={-150} cy={100} r={18} fill={COLORS.sky} {...sm} />
  </g>
);

/** A cassette tape rewinding — replaying the same moment over and over. */
export const ReplayTape: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-150} y={-100} width={300} height={200} rx={16} fill={COLORS.purpleDeep} {...xl} />
      <rect x={-110} y={-70} width={220} height={90} rx={8} fill={COLORS.bgCream} {...lg} />
      <g transform={`rotate(${-f * 10})`}><circle cx={-50} cy={-26} r={24} fill={COLORS.shirtDark} {...sm} />{[0, 120, 240].map((a, i) => <line key={i} x1={-50} y1={-26} x2={-50 + Math.cos(a * Math.PI / 180) * 20} y2={-26 + Math.sin(a * Math.PI / 180) * 20} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />)}</g>
      <g transform={`rotate(${-f * 10})`}><circle cx={50} cy={-26} r={24} fill={COLORS.shirtDark} {...sm} />{[0, 120, 240].map((a, i) => <line key={i} x1={50} y1={-26} x2={50 + Math.cos(a * Math.PI / 180) * 20} y2={-26 + Math.sin(a * Math.PI / 180) * 20} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />)}</g>
      <rect x={-60} y={40} width={120} height={34} rx={8} fill={COLORS.ledGrey} {...sm} />
      {/* rewind symbol */}
      <path d="M 10 -26 l -20 0 l 14 -10 m -14 10 l 14 10 M 40 -26 l -20 0 l 14 -10 m -14 10 l 14 10" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** A cluster of signposts all pointing to different "what if…" directions. */
export const WhatIfSigns: React.FC = () => {
  const dirs: [number, number, string][] = [[-1, -40, 'what if…'], [1, 10, 'but what if…'], [-1, 60, 'or if…']];
  return (
    <g>
      <rect x={-14} y={-120} width={28} height={260} rx={10} fill={COLORS.woodDark} {...xl} />
      {dirs.map(([d, y, t], i) => (
        <g key={i} transform={`translate(0 ${y})`}>
          <path d={d > 0 ? `M -10 -24 L 120 -24 L 150 0 L 120 24 L -10 24 Z` : `M 10 -24 L -120 -24 L -150 0 L -120 24 L 10 24 Z`} fill={[COLORS.sky, COLORS.pink, COLORS.yellow][i]} {...lg} />
          <text x={d > 0 ? 50 : -50} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
        </g>
      ))}
    </g>
  );
};

/** A compass whose needle spins endlessly, unable to settle (analysis paralysis). */
export const StuckCompass: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 6) * 160 + f * 4;
  return (
    <g>
      <circle cx={0} cy={0} r={130} fill={COLORS.white} {...xl} />
      <circle cx={0} cy={0} r={130} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} transform="scale(0.88)" transform-origin="0 0" />
      {['N', 'E', 'S', 'W'].map((d, i) => { const ang = (i * 90 - 90) * Math.PI / 180; return <text key={d} x={Math.cos(ang) * 100} y={Math.sin(ang) * 100 + 10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>{d}</text>; })}
      <g transform={`rotate(${a})`}>
        <path d="M 0 -70 L 16 0 L 0 14 L -16 0 Z" fill={COLORS.red} {...sm} />
        <path d="M 0 70 L 16 0 L 0 -14 L -16 0 Z" fill={COLORS.ledGrey} {...sm} />
      </g>
      <circle cx={0} cy={0} r={12} fill={COLORS.outline} />
      {/* dizzy marks */}
      <path d="M 120 -110 q 20 10 0 24 M 150 -80 q 20 10 0 24" fill="none" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
    </g>
  );
};

/** One worry splitting into many (a dividing cell of dread). */
export const MultiplyingWorry: React.FC = () => {
  const f = useCurrentFrame();
  const split = (Math.sin(f / 16) * 0.5 + 0.5) * 40;
  const Blob: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={60} fill={COLORS.red} {...xl} />
      <circle cx={-18} cy={-8} r={9} fill={COLORS.white} /><circle cx={18} cy={-8} r={9} fill={COLORS.white} />
      <circle cx={-18} cy={-6} r={5} fill={COLORS.outline} /><circle cx={18} cy={-6} r={5} fill={COLORS.outline} />
      <path d="M -16 24 q 16 -10 32 0" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <Blob x={-split} y={0} s={1} />
      <Blob x={split} y={10} s={0.9} />
      <Blob x={0} y={-split - 20} s={0.7} />
      <Blob x={split + 30} y={-split} s={0.55} />
      <Blob x={-split - 30} y={split} s={0.5} />
    </g>
  );
};

/** A line of dominoes toppling toward a little explosion (catastrophizing). */
export const DisasterDominoes: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.floor((f / 6) % 8);
  return (
    <g>
      {Array.from({ length: 7 }).map((_, i) => {
        const fallen = i < n;
        return <g key={i} transform={`translate(${-150 + i * 44} 60) rotate(${fallen ? 70 : 0})`} style={{ transformOrigin: 'bottom' }}><rect x={-12} y={-90} width={24} height={90} rx={4} fill={[COLORS.sky, COLORS.yellow, COLORS.greenLeaf, COLORS.pink, COLORS.lavender, COLORS.greenTeal, COLORS.red][i]} {...lg} /><circle cx={0} cy={-60} r={4} fill={COLORS.outline} /></g>;
      })}
      {/* the catastrophe at the end */}
      {n >= 6 && (
        <g transform="translate(170 10)">
          <path d={Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const r = i % 2 ? 26 : 48; return `${i ? 'L' : 'M'} ${Math.cos(a) * r} ${Math.sin(a) * r}`; }).join(' ') + ' Z'} fill={COLORS.red} {...lg} />
          <text x={0} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.white} transform="rotate(-6)">DOOM</text>
        </g>
      )}
    </g>
  );
};

/** A washing-machine tumbling the same thoughts around (rumination). */
export const RuminationDrum: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-130} y={-130} width={260} height={280} rx={20} fill={COLORS.ledGrey} {...xl} />
      <rect x={-130} y={-130} width={260} height={50} rx={16} fill={shade(COLORS.ledGrey, 0.16)} />
      <circle cx={70} cy={-105} r={10} fill={COLORS.red} />
      <circle cx={0} cy={20} r={100} fill={COLORS.shirtDark} {...lg} />
      <circle cx={0} cy={20} r={80} fill={COLORS.sky} opacity={0.3} />
      {/* tumbling thought-blobs */}
      <g transform={`rotate(${f * 6})`}>{[[0, -50], [44, 20], [-44, 20], [0, 50]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><circle r={16} fill={COLORS.white} {...sm} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>?</text></g>)}</g>
      <circle cx={0} cy={20} r={30} fill={COLORS.white} {...lg} opacity={0.5} />
    </g>
  );
};

/** A gauge of overthinking intensity climbing into the red. */
export const OverthinkGauge: React.FC = () => {
  const f = useCurrentFrame();
  const v = Math.sin(f / 12) * 0.5 + 0.5;
  const ang = -120 + v * 240;
  return (
    <g>
      <path d="M -150 40 A 160 160 0 0 1 150 40" fill="none" stroke={COLORS.bgCreamDark} strokeWidth={46} strokeLinecap="round" />
      <path d="M 60 -120 A 160 160 0 0 1 150 40" fill="none" stroke={COLORS.red} strokeWidth={46} strokeLinecap="round" opacity={0.8} />
      <line x1={0} y1={40} x2={Math.cos((ang - 90) * Math.PI / 180) * 130} y2={40 + Math.sin((ang - 90) * Math.PI / 180) * 130} stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={0} cy={40} r={22} fill={COLORS.outline} />
      <text x={0} y={110} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>OVERTHINK</text>
    </g>
  );
};

/** A rope knot pulling tighter (the tightening grip of a thought). */
export const TightKnot: React.FC = () => {
  const f = useCurrentFrame();
  const pull = Math.sin(f / 10) * 8;
  return (
    <g>
      <path d={`M ${-160 - pull} -40 Q -60 -40 -30 0 Q -70 40 10 30 Q 60 20 30 -20 Q 10 -50 50 -30 Q 90 -10 60 30 Q 100 50 ${160 + pull} 40`} fill="none" stroke={COLORS.red} strokeWidth={28} strokeLinecap="round" />
      <path d={`M ${-160 - pull} -40 Q -60 -40 -30 0 Q -70 40 10 30 Q 60 20 30 -20 Q 10 -50 50 -30 Q 90 -10 60 30 Q 100 50 ${160 + pull} 40`} fill="none" stroke={shade(COLORS.red, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.6} />
    </g>
  );
};

/** An emergency brake lever to pull (stopping the runaway train of thought). */
export const BrakeLever: React.FC = () => (
  <g>
    <rect x={-40} y={60} width={80} height={90} rx={12} fill={COLORS.shirtDark} {...xl} />
    <rect x={-10} y={-80} width={20} height={150} rx={8} fill={COLORS.ledGrey} {...lg} />
    <g transform="rotate(-24)"><rect x={-10} y={-150} width={20} height={90} rx={8} fill={COLORS.ledGrey} {...lg} /><circle cx={0} cy={-150} r={34} fill={COLORS.red} {...xl} /><text x={0} y={-142} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.white}>STOP</text></g>
    {/* motion lines */}
    <path d="M -90 0 l -40 0 M -100 40 l -44 0" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
  </g>
);

/** A picture frame that zooms out to show the small real size of a worry. */
export const StepBackFrame: React.FC = () => (
  <g>
    <rect x={-160} y={-120} width={320} height={240} rx={14} fill="none" stroke={COLORS.woodDark} strokeWidth={28} />
    <rect x={-160} y={-120} width={320} height={240} rx={14} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} />
    {/* tiny worry inside the big frame */}
    <g transform="translate(0 10)"><circle r={30} fill={COLORS.red} {...lg} /><path d="M -10 -12 l 20 24 m 0 -24 l -20 24" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
    <text x={0} y={-80} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>…is it, though?</text>
    {/* zoom corners */}
    {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => <path key={i} d={`M ${sx * 190} ${sy * 150} l ${-sx * 40} 0 m ${sx * 40} 0 l 0 ${-sy * 40}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
  </g>
);

/** A single footprint step forward — the antidote of one small action. */
export const OneSmallStep: React.FC = () => (
  <g>
    {/* faded past steps */}
    <ellipse cx={-130} cy={60} rx={34} ry={20} fill={COLORS.ledGrey} opacity={0.3} transform="rotate(-20 -130 60)" />
    <ellipse cx={-50} cy={20} rx={36} ry={22} fill={COLORS.ledGrey} opacity={0.5} transform="rotate(-16 -50 20)" />
    {/* the bright next step */}
    <g transform="translate(60 -30) rotate(-12)">
      <ellipse cx={0} cy={0} rx={48} ry={30} fill={COLORS.greenLeaf} {...xl} />
      <ellipse cx={20} cy={-40} rx={16} ry={12} fill={COLORS.greenLeaf} {...lg} />
      {[0, 1, 2].map((i) => <circle key={i} cx={-6 + i * 16} cy={-36} r={8} fill={COLORS.greenLeaf} {...sm} />)}
    </g>
    {/* sparkle */}
    <path d="M 150 -70 l 5 11 l 11 5 l -11 5 l -5 11 l -5 -11 l -11 -5 l 11 -5 Z" fill={COLORS.yellow} />
    <text x={40} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.outline}>just start</text>
  </g>
);
