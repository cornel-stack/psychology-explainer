/**
 * charisma.tsx — ALL-NEW art for "The Psychology of Charisma". One emblem per
 * element of magnetism: presence, warmth, competence, listening, making others
 * shine, storytelling, open body language, authenticity, enthusiasm — plus the
 * warmth×competence grid and a charisma compass. Token strokes, centered, ~300px.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Fig: React.FC<{ r?: number; c?: string; smile?: boolean }> = ({ r = 40, c = COLORS.white, smile }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} />
    {smile && <path d={`M ${-r * 0.4} ${-r * 0.82} Q 0 ${-r * 0.5} ${r * 0.4} ${-r * 0.82}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** PRESENCE — a figure fully here, phone set aside, a soft glow of attention. */
export const CharPresence: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.25 * Math.sin(f / 7);
  return (
    <g>
      <circle cx={0} cy={-8} r={90} fill={COLORS.yellowSoft} opacity={g} />
      <g transform="translate(0 20)"><Fig r={44} c={COLORS.white} smile /></g>
      {/* a phone face-down, ignored */}
      <g transform="translate(74 70) rotate(20)"><rect x={-20} y={-34} width={40} height={68} rx={8} fill={shade(COLORS.outline, 0.3)} {...sm} /></g>
      <Label t="PRESENCE" />
    </g>
  );
};

/** WARMTH — a glowing heart held in open hands. */
export const CharWarmth: React.FC = () => {
  const f = useCurrentFrame();
  const b = 1 + 0.06 * Math.sin(f / 5);
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={-20} x2={0} y2={-110} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={0.4} transform={`rotate(${i * 36} 0 -20)`} strokeLinecap="round" />)}
      <g transform={`translate(0 -16) scale(${0.9 * b})`}><path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...xl} /></g>
      <path d="M -70 70 q 70 36 140 0" fill="none" stroke={COLORS.skin} strokeWidth={28} strokeLinecap="round" />
      <Label t="WARMTH" />
    </g>
  );
};

/** COMPETENCE — a confident figure on a small rise, a badge of trust. */
export const CharCompetence: React.FC = () => (
  <g>
    <path d="M -90 90 L 90 90 L 70 40 L -70 40 Z" fill={shade(COLORS.sky, 0.1)} {...lg} />
    <g transform="translate(0 20)"><Fig r={42} c={COLORS.white} smile /></g>
    <g transform="translate(44 -36)"><circle r={24} fill={COLORS.yellow} {...sm} /><path d="M -10 0 l 7 8 l 13 -16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" /></g>
    <Label t="COMPETENCE" />
  </g>
);

/** LISTENING — a big attentive ear with little incoming sound waves. */
export const CharListening: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      <circle cx={0} cy={0} r={88} fill={COLORS.greenTeal} {...xl} />
      <path d="M 24 -44 a 44 48 0 1 0 -8 86 q -20 -4 -18 -26 q 2 -16 18 -16 q 16 0 14 -18 q -2 -14 10 -14 q 20 0 22 22" fill="none" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {[40, 64].map((r, i) => <path key={i} d={`M ${-52} ${-10} q ${-r * 0.4} ${r * 0.3} 0 ${r * 0.7}`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={g} strokeLinecap="round" />)}
      <Label t="LISTENING" />
    </g>
  );
};

/** MAKE THEM SHINE — one figure turns a spotlight onto another, who glows. */
export const CharShine: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      <g transform="translate(-70 24) scale(0.78)"><Fig r={38} c={COLORS.white} smile /></g>
      <path d="M -40 -20 L 90 -70 L 90 50 Z" fill={COLORS.yellowSoft} opacity={g} />
      <circle cx={66} cy={-14} r={56} fill={COLORS.yellow} opacity={0.3} />
      <g transform="translate(66 24) scale(0.82)"><Fig r={40} c={COLORS.yellowSoft} smile /></g>
      <Label t="MAKE THEM SHINE" />
    </g>
  );
};

/** STORYTELLING — a vivid tale rising from a speech bubble. */
export const CharStory: React.FC = () => {
  const f = useCurrentFrame();
  const tw = 0.5 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <rect x={-96} y={-70} width={192} height={120} rx={20} fill={COLORS.white} {...xl} />
      <path d="M -40 48 l -6 40 l 44 -34 Z" fill={COLORS.white} {...sm} />
      {/* vivid little scene inside */}
      <circle cx={-46} cy={-20} r={20} fill={COLORS.yellow} {...sm} /><path d="M -12 10 L 24 -36 L 60 10 Z" fill={COLORS.greenLeaf} {...sm} /><rect x={-20} y={10} width={80} height={8} rx={4} fill={shade(COLORS.wood, 0.1)} />
      {[[-70, -54], [66, -58], [70, 12]].map(([x, y], i) => <path key={i} d={`M ${x} ${y - 8} l 3 6 l 6 3 l -6 3 l -3 6 l -3 -6 l -6 -3 l 6 -3 Z`} fill={COLORS.yellow} opacity={tw} />)}
      <Label t="STORYTELLING" />
    </g>
  );
};

/** OPEN BODY — an expansive, relaxed, arms-open figure. */
export const CharOpenBody: React.FC = () => (
  <g>
    <circle cx={0} cy={-56} r={34} fill={COLORS.white} {...lg} />
    <circle cx={-12} cy={-60} r={5} fill={COLORS.outline} /><circle cx={12} cy={-60} r={5} fill={COLORS.outline} />
    <path d="M -14 -46 Q 0 -32 14 -46" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <path d="M 0 -22 L 0 40" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <path d="M 0 -6 Q -50 -20 -86 -56 M 0 -6 Q 50 -20 86 -56" fill="none" stroke={shade(COLORS.white, 0.1)} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <circle cx={-86} cy={-56} r={13} fill={COLORS.skin} {...sm} /><circle cx={86} cy={-56} r={13} fill={COLORS.skin} {...sm} />
    <path d="M 0 40 L -34 80 M 0 40 L 34 80" stroke={COLORS.white} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <Label t="OPEN BODY" />
  </g>
);

/** AUTHENTICITY — a figure lowering a polished mask, real face beneath. */
export const CharAuthentic: React.FC = () => (
  <g>
    <g transform="translate(0 20)"><Fig r={42} c={COLORS.white} smile /></g>
    {/* the mask being lowered */}
    <g transform="translate(58 70) rotate(18)">
      <path d="M -40 -34 Q -46 30 0 44 Q 46 30 40 -34 Q 0 -52 -40 -34 Z" fill={COLORS.yellowSoft} {...lg} />
      <ellipse cx={-16} cy={-6} rx={9} ry={6} fill={COLORS.outline} /><ellipse cx={16} cy={-6} rx={9} ry={6} fill={COLORS.outline} />
    </g>
    <Label t="AUTHENTICITY" />
  </g>
);

/** ENTHUSIASM — an energetic figure beaming, sparks of contagious energy. */
export const CharEnthusiasm: React.FC = () => {
  const f = useCurrentFrame();
  const j = 6 * Math.abs(Math.sin(f / 6));
  return (
    <g transform={`translate(0 ${-j})`}>
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d="M 0 -120 l 4 10 l -8 0 Z" fill={COLORS.yellow} transform={`rotate(${i * 45}) translate(0 0)`} />)}
      <circle cx={0} cy={-6} r={60} fill={COLORS.yellow} {...xl} />
      <path d="M -34 -22 l 16 -8 M 18 -30 l 16 8" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-20} cy={-10} r={9} fill={COLORS.outline} /><circle cx={20} cy={-10} r={9} fill={COLORS.outline} />
      <path d="M -24 12 Q 0 42 24 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="ENTHUSIASM" />
    </g>
  );
};

/** The warmth × competence grid — charisma sits top-right. */
export const CharGrid: React.FC = () => (
  <g>
    <line x1={-90} y1={90} x2={-90} y2={-90} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <line x1={-90} y1={90} x2={90} y2={90} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <rect x={-10} y={-90} width={100} height={100} rx={10} fill={COLORS.yellow} opacity={0.5} />
    <g transform="translate(40 -40) scale(0.4)"><path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...lg} /></g>
    <text x={-10} y={116} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>competence →</text>
    <text x={-120} y={0} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline} transform="rotate(-90 -120 0)">warmth →</text>
    <Label t="the magnetic corner" y={150} />
  </g>
);

/** Charisma compass — a dial you can actually turn, since it's learnable. */
export const CharCompass: React.FC = () => {
  const f = useCurrentFrame();
  const a = 30 * Math.sin(f / 20);
  return (
    <g>
      <circle cx={0} cy={0} r={96} fill={COLORS.yellowSoft} opacity={0.4} {...xl} />
      <circle cx={0} cy={0} r={78} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} />
      <g transform={`rotate(${a})`}><path d="M 0 -52 L 12 0 L 0 52 L -12 0 Z" fill={COLORS.red} {...sm} /></g>
      <circle cx={0} cy={0} r={10} fill={COLORS.outline} />
      <Label t="it's a skill" />
    </g>
  );
};
