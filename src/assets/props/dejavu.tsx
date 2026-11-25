/**
 * dejavu.tsx — ALL-NEW art for "The Psychology of Déjà Vu". What it is
 * (deja-recognition, familiarity-glow, recollection-blank, memory-mismatch), the
 * theories (brain-factchecker, layout-echo, temporal-lobe), the mirror (jamais-vu),
 * and the close (deja-loop, healthy-glitch). Token strokes, centered on origin,
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
const Brain: React.FC<{ c?: string }> = ({ c = COLORS.pink }) => (
  <path d="M -62 12 Q -78 -40 -36 -52 Q -22 -78 12 -62 Q 48 -74 56 -42 Q 80 -28 62 6 Q 68 38 28 44 Q 0 62 -28 44 Q -66 42 -62 12 Z" fill={c} {...xl} />
);

/** Deja-recognition — a face with an uncanny jolt + a ghostly echo of itself. */
export const DejaRecognition: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.3 + 0.3 * Math.sin(f / 5);
  return (
    <g>
      {/* ghostly echo offset behind */}
      <g transform="translate(16 8)" opacity={0.3 + g}><circle cx={0} cy={0} r={52} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} /></g>
      <circle cx={0} cy={0} r={52} fill={COLORS.white} {...xl} />
      {/* wide, uncanny eyes */}
      <circle cx={-18} cy={-6} r={10} fill={COLORS.white} {...sm} /><circle cx={-18} cy={-6} r={5} fill={COLORS.outline} />
      <circle cx={18} cy={-6} r={10} fill={COLORS.white} {...sm} /><circle cx={18} cy={-6} r={5} fill={COLORS.outline} />
      <ellipse cx={0} cy={22} rx={7} ry={9} fill={COLORS.outline} />
      {/* a little shiver / '?' */}
      <text x={56} y={-44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.lavenderDark} opacity={0.6 + g}>?</text>
      <Label t="wait... I know this" />
    </g>
  );
};

/** Familiarity-glow — a warm "I know this" glow around a scene card. */
export const FamiliarityGlow: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <circle cx={0} cy={0} r={78} fill={COLORS.yellowSoft} opacity={0.3 + g * 0.3} />
      <rect x={-56} y={-44} width={112} height={88} rx={10} fill={COLORS.white} {...xl} />
      {/* a generic scene */}
      <path d="M -56 20 L -20 -10 L 10 14 L 36 -6 L 56 18 L 56 44 L -56 44 Z" fill={shade(COLORS.greenLeaf, 0.1)} />
      <circle cx={30} cy={-22} r={14} fill={COLORS.yellow} />
      <text x={0} y={76} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>FAMILIAR ✓</text>
      <Label t="a sense of 'I know this'" />
    </g>
  );
};

/** Recollection-blank — an empty memory file, nothing to retrieve. */
export const RecollectionBlank: React.FC = () => (
  <g>
    <rect x={-60} y={-70} width={120} height={150} rx={10} fill={COLORS.white} {...xl} />
    <rect x={-40} y={-90} width={80} height={28} rx={8} fill={shade(COLORS.sky, 0.08)} {...lg} />
    {/* blank lines + a big question mark */}
    {[-36, -16].map((y, i) => <line key={i} x1={-40} y1={y} x2={40} y2={y} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} opacity={0.4} />)}
    <text x={0} y={44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={60} fill={COLORS.ledGrey} opacity={0.5}>?</text>
    <text x={0} y={104} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>no memory found</text>
    <Label t="but nothing to recall" />
  </g>
);

/** Memory-mismatch — two signals clashing: familiar vs new. */
export const MemoryMismatch: React.FC = () => {
  const f = useCurrentFrame();
  const clash = 4 * Math.sin(f / 3);
  return (
    <g>
      <g transform={`translate(${-54 - clash} 0)`}><circle cx={0} cy={0} r={42} fill={COLORS.yellow} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>familiar</text></g>
      <g transform={`translate(${54 + clash} 0)`}><circle cx={0} cy={0} r={42} fill={COLORS.sky} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>new</text></g>
      {/* clash sparks in the middle */}
      {[0, 1, 2, 3].map((i) => <line key={i} x1={0} y1={0} x2={Math.cos((i / 4) * Math.PI * 2 + f / 10) * 24} y2={Math.sin((i / 4) * Math.PI * 2 + f / 10) * 24} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
      <text x={0} y={-4} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.red}>!</text>
      <Label t="two signals clash" />
    </g>
  );
};

/** Brain-factchecker — a brain holding up a red flag on a false memory. */
export const BrainFactchecker: React.FC = () => {
  const f = useCurrentFrame();
  const wave = 6 * Math.sin(f / 4);
  return (
    <g>
      <Brain c={COLORS.pink} />
      {/* a little red flag raised */}
      <g transform="translate(40 -56)"><rect x={-3} y={0} width={6} height={60} fill={COLORS.outline} /><path d={`M 3 2 L ${40 + wave} 12 L 3 24 Z`} fill={COLORS.red} {...sm} /></g>
      <text x={-6} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>check!</text>
      <Label t="the brain flags the error" />
    </g>
  );
};

/** Layout-echo — two rooms with the same layout, one a faint echo. */
export const LayoutEcho: React.FC = () => (
  <g>
    {/* the faint remembered layout */}
    <g transform="translate(-58 0)" opacity={0.35}>
      <rect x={-46} y={-40} width={92} height={80} rx={6} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} />
      <rect x={-30} y={10} width={30} height={24} rx={3} fill={COLORS.lavender} /><circle cx={24} cy={-14} r={12} fill={COLORS.lavender} />
      <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>old (forgotten)</text>
    </g>
    {/* the new room, same layout, solid */}
    <g transform="translate(58 0)">
      <rect x={-46} y={-40} width={92} height={80} rx={6} fill={COLORS.sky} {...lg} />
      <rect x={-30} y={10} width={30} height={24} rx={3} fill={COLORS.white} /><circle cx={24} cy={-14} r={12} fill={COLORS.yellow} />
      <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>new (same shape)</text>
    </g>
    <Label t="same layout feels familiar" />
  </g>
);

/** Temporal-lobe — a brain with the temporal lobe region highlighted. */
export const TemporalLobe: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 4);
  return (
    <g>
      <Brain c={COLORS.white} />
      {/* highlighted temporal lobe patch */}
      <path d="M -20 20 Q 6 24 26 36 Q 10 52 -16 44 Q -30 36 -20 20 Z" fill={COLORS.red} opacity={0.5 + g * 0.4} {...sm} />
      {[0, 1, 2].map((i) => <circle key={i} cx={2} cy={34} r={30 + i * 12} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={(g - i * 0.2) * 0.6} />)}
      <text x={2} y={38} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.white}>here</text>
      <Label t="born in the temporal lobe" />
    </g>
  );
};

/** Jamais-vu — a familiar word suddenly looking strange/alien. */
export const JamaisVu: React.FC = () => {
  const f = useCurrentFrame();
  const warp = 4 * Math.sin(f / 4);
  return (
    <g>
      <rect x={-96} y={-40} width={192} height={80} rx={12} fill={COLORS.white} {...xl} />
      {/* the word 'THE' looking wrong */}
      {['T', 'H', 'E'].map((ch, i) => <text key={i} x={-44 + i * 44} y={16} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={54} fill={COLORS.outline} transform={`rotate(${(i - 1) * (8 + warp)} ${-44 + i * 44} 0)`}>{ch}</text>)}
      <text x={70} y={-30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.lavenderDark}>?</text>
      <Label t="jamais vu: the opposite" />
    </g>
  );
};

/** Deja-loop — a looping arrow around a single moment. */
export const DejaLoop: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f / 24) % (Math.PI * 2);
  return (
    <g>
      <circle cx={0} cy={0} r={70} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="4 20" />
      <path d="M 62 -30 l 16 8 l -14 12" fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={Math.cos(a) * 70} cy={Math.sin(a) * 70} r={9} fill={COLORS.lavenderDark} />
      {/* a tiny moment in the centre */}
      <circle cx={0} cy={0} r={30} fill={COLORS.sky} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>now?</text>
      <Label t="haven't I lived this?" />
    </g>
  );
};

/** Healthy-glitch — a calm green tick: a benign, healthy quirk. */
export const HealthyGlitch: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      <Brain c={COLORS.greenLeaf} />
      <g transform="translate(40 -40)"><circle cx={0} cy={0} r={26} fill={COLORS.white} {...lg} opacity={0.9} /><path d="M -12 0 l 7 9 l 16 -18" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
      {[0, 1, 2].map((i) => <circle key={i} cx={40} cy={-40} r={30 + i * 10} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.sm} opacity={(g - i * 0.2) * 0.5} />)}
      <Label t="a healthy little glitch" />
    </g>
  );
};
