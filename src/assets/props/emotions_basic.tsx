/**
 * emotions_basic.tsx — ALL-NEW art for "Every Emotion Explained" (Plutchik's 8
 * basic emotions). One expressive emblem per emotion: joy, trust, fear, surprise,
 * sadness, disgust, anger, anticipation — plus the emotion wheel and compass.
 * Each is a colour-coded face-disc with a signature symbol. Token strokes,
 * centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A colour disc with a simple face; `mouth` and `brow` shape the emotion. */
const EmoDisc: React.FC<{ c: string; children?: React.ReactNode; r?: number }> = ({ c, children, r = 110 }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={shade(c, 0.18)} {...lg} />
    <circle cx={0} cy={0} r={r} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />
    {children}
  </g>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 148 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>{t}</text>
);
const Eyes: React.FC<{ r?: number; y?: number }> = ({ r = 12, y = -16 }) => (
  <><circle cx={-32} cy={y} r={r} fill={COLORS.outline} /><circle cx={32} cy={y} r={r} fill={COLORS.outline} /></>
);

/** JOY — a bright radiant face with a big smile and rays. */
export const EmoJoy: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={0} y1={-120} x2={0} y2={-146} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 30})`} strokeLinecap="round" />)}
      <EmoDisc c={COLORS.yellow}>
        <Eyes />
        <path d="M -40 20 Q 0 64 40 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <circle cx={-56} cy={14} r={12} fill={COLORS.pink} opacity={0.5} /><circle cx={56} cy={14} r={12} fill={COLORS.pink} opacity={0.5} />
      </EmoDisc>
      <Label t="JOY" />
    </g>
  );
};

/** TRUST — a calm green face with open, clasped hands below. */
export const EmoTrust: React.FC = () => (
  <g>
    <EmoDisc c={COLORS.greenLeaf}>
      <path d="M -40 -22 q 8 -8 16 0 M 24 -22 q 8 -8 16 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Eyes y={-10} r={10} />
      <path d="M -28 28 Q 0 44 28 28" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </EmoDisc>
    <path d="M -50 96 q 50 40 100 0" fill="none" stroke={COLORS.skin} strokeWidth={28} strokeLinecap="round" />
    <Label t="TRUST" />
  </g>
);

/** FEAR — a pale wide-eyed face, sweat drop, shrinking back. */
export const EmoFear: React.FC = () => {
  const f = useCurrentFrame();
  const sh = 3 * Math.sin(f / 2);
  return (
    <g transform={`translate(${sh} 0)`}>
      <EmoDisc c={COLORS.purpleDeep}>
        <circle cx={-32} cy={-14} r={22} fill={COLORS.white} {...sm} /><circle cx={32} cy={-14} r={22} fill={COLORS.white} {...sm} />
        <circle cx={-32} cy={-10} r={9} fill={COLORS.outline} /><circle cx={32} cy={-10} r={9} fill={COLORS.outline} />
        <ellipse cx={0} cy={38} rx={16} ry={22} fill={COLORS.outline} />
        <path d="M 60 -30 q 12 20 0 36 q -12 -16 0 -36 Z" fill={COLORS.sky} {...sm} />
      </EmoDisc>
      <Label t="FEAR" />
    </g>
  );
};

/** SURPRISE — a jumping face with raised brows and a burst. */
export const EmoSurprise: React.FC = () => {
  const f = useCurrentFrame();
  const j = 6 * Math.abs(Math.sin(f / 6));
  return (
    <g transform={`translate(0 ${-j})`}>
      {[[-80, -70], [80, -74], [0, -108]].map(([x, y], i) => <path key={i} d={`M ${x} ${y - 10} l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 Z`} fill={COLORS.yellow} {...sm} />)}
      <EmoDisc c={COLORS.sky}>
        <path d="M -46 -40 q 14 -10 28 -2 M 18 -42 q 14 -8 28 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <Eyes y={-10} r={14} />
        <circle cx={0} cy={38} r={20} fill={COLORS.outline} />
      </EmoDisc>
      <Label t="SURPRISE" />
    </g>
  );
};

/** SADNESS — a blue downcast face with a falling tear. */
export const EmoSadness: React.FC = () => {
  const f = useCurrentFrame();
  const ty = (f % 40);
  return (
    <g>
      <EmoDisc c={COLORS.blueDiagram}>
        <path d="M -46 -26 q 14 8 28 2 M 18 -24 q 14 -6 28 -2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <Eyes y={-6} r={11} />
        <path d="M -28 40 Q 0 20 28 40" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <path d={`M 32 ${6 + ty} q -8 14 0 22 q 8 -8 0 -22 Z`} fill={COLORS.sky} opacity={0.9} />
      </EmoDisc>
      <Label t="SADNESS" />
    </g>
  );
};

/** DISGUST — a green recoiling face, tongue out, wavy mouth. */
export const EmoDisgust: React.FC = () => (
  <g>
    <EmoDisc c={COLORS.greenDark}>
      <path d="M -46 -30 q 14 -6 28 2 M 18 -28 q 14 -8 28 -2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -40 -12 l 20 10 l -20 10 M 40 -12 l -20 10 l 20 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -30 34 q 15 -16 30 0 q 15 16 30 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" transform="translate(-15 0)" />
      <path d="M 8 44 l 0 20 q 10 6 16 -2 l 0 -14 Z" fill={COLORS.pink} {...sm} />
    </EmoDisc>
    <Label t="DISGUST" />
  </g>
);

/** ANGER — a red boiling face, furrowed brows, steam. */
export const EmoAnger: React.FC = () => {
  const f = useCurrentFrame();
  const sh = 3 * Math.sin(f / 2.5);
  return (
    <g transform={`translate(${sh} 0)`}>
      {[-60, 60].map((x, i) => <path key={i} d={`M ${x} -98 q ${i ? 10 : -10} -20 0 -36`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.6} strokeLinecap="round" />)}
      <EmoDisc c={COLORS.red}>
        <path d="M -48 -32 l 32 14 M 48 -32 l -32 14" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <Eyes y={-6} r={11} />
        <path d="M -30 40 Q 0 24 30 40" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </EmoDisc>
      <Label t="ANGER" />
    </g>
  );
};

/** ANTICIPATION — an orange face leaning forward, eyes ahead, forward arrow. */
export const EmoAnticipation: React.FC = () => {
  const f = useCurrentFrame();
  const lean = 4 * Math.sin(f / 8);
  return (
    <g>
      <g transform={`rotate(${8 + lean})`}>
        <EmoDisc c={COLORS.yellowDark}>
          <path d="M -46 -34 q 16 2 30 8 M 16 -26 q 16 -4 30 -2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
          <circle cx={-24} cy={-10} r={11} fill={COLORS.outline} /><circle cx={40} cy={-8} r={11} fill={COLORS.outline} />
          <path d="M -20 34 Q 10 46 40 30" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        </EmoDisc>
      </g>
      <path d="M 70 70 l 40 0 m -12 -12 l 12 12 l -12 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <Label t="ANTICIPATION" />
    </g>
  );
};

/** The emotion wheel — eight petals of colour around a core. */
export const EmotionWheel: React.FC = () => {
  const f = useCurrentFrame();
  const cols = [COLORS.yellow, COLORS.greenLeaf, COLORS.greenDark, COLORS.blueDiagram, COLORS.purpleDeep, COLORS.sky, COLORS.red, COLORS.yellowDark];
  return (
    <g transform={`rotate(${(f * 0.6) % 360})`}>
      {cols.map((c, i) => (
        <g key={i} transform={`rotate(${i * 45})`}><ellipse cx={0} cy={-78} rx={34} ry={56} fill={c} {...lg} /></g>
      ))}
      <circle cx={0} cy={0} r={40} fill={COLORS.white} {...xl} />
      <g transform={`rotate(${-(f * 0.6) % 360})`}><Label t="the wheel" y={150} /></g>
    </g>
  );
};

/** The emotion compass — a dial pointing toward whatever you feel. */
export const EmotionCompass: React.FC = () => {
  const f = useCurrentFrame();
  const a = 30 * Math.sin(f / 22);
  return (
    <g>
      <circle cx={0} cy={0} r={100} fill={COLORS.lavender} {...xl} />
      <circle cx={0} cy={0} r={82} fill={shade(COLORS.lavender, 0.12)} {...sm} />
      {['+', '−'].map((s, i) => <text key={s} x={i ? 0 : 0} y={i ? 72 : -52} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.outline}>{s}</text>)}
      <g transform={`rotate(${a})`}><path d="M 0 -56 L 14 0 L 0 56 L -14 0 Z" fill={COLORS.red} {...sm} /></g>
      <circle cx={0} cy={0} r={10} fill={COLORS.outline} />
      <Label t="name it" />
    </g>
  );
};
