/**
 * brain-fog.tsx — ALL-NEW art for "Why Your Brain Feels Foggy". The experience
 * (foggy-head, word-gone), the causes (sleep-debt, cortisol-fog, inflamed-brain,
 * sugar-crash, thirsty-brain, hormone-dial, task-switch), and the clear-up (fog-lifts).
 * Token strokes, centered on origin, ~300px tall.
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

/** foggy-head — a dazed face wreathed in drifting fog clouds. */
export const FoggyHead: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 6 * Math.sin(f / 10);
  return (
    <g>
      <circle cx={0} cy={6} r={54} fill={COLORS.skin} {...xl} />
      {/* droopy, unfocused eyes */}
      <circle cx={-18} cy={0} r={5} fill={COLORS.outline} /><circle cx={18} cy={0} r={5} fill={COLORS.outline} />
      <path d="M -30 -6 q 12 6 24 0 M 6 -6 q 12 6 24 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -12 26 Q 0 22 12 26" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* fog rolling over the top of the head */}
      {[0, 1, 2].map((i) => <ellipse key={i} cx={-36 + i * 38 + drift} cy={-44 + (i % 2) * 12} rx={40} ry={18} fill={COLORS.ledGrey} opacity={0.35} />)}
      {[0, 1].map((i) => <ellipse key={i} cx={-20 + i * 44 - drift} cy={-26} rx={34} ry={15} fill={COLORS.white} opacity={0.3} />)}
      <Label t="the cotton-wool feeling" />
    </g>
  );
};

/** word-gone — a speech bubble with a blanked-out word: tip-of-the-tongue. */
export const WordGone: React.FC = () => {
  const f = useCurrentFrame();
  const flick = (f % 50) < 6;
  return (
    <g>
      <rect x={-100} y={-50} width={200} height={94} rx={22} fill={COLORS.white} {...xl} />
      <path d="M -40 40 L -24 84 L -2 42 Z" fill={COLORS.white} {...xl} />
      <text x={-56} y={6} fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>it's...</text>
      {/* the blanked word */}
      <rect x={6} y={-16} width={76} height={34} rx={6} fill={shade(COLORS.ledGrey, 0.12)} opacity={flick ? 0.5 : 0.9} />
      <text x={44} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.white}>that thing</text>
      <Label t="the word just... vanishes" />
    </g>
  );
};

/** sleep-debt — a battery/ledger showing a sleep deficit in the red. */
export const SleepDebt: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-54} y={-64} width={108} height={128} rx={12} fill={COLORS.white} {...xl} />
      <rect x={-22} y={-76} width={44} height={14} rx={4} fill={COLORS.outline} />
      {/* mostly empty, a thin red bottom */}
      <rect x={-40} y={30} width={80} height={24} rx={6} fill={COLORS.red} opacity={0.5 + pulse * 0.3} />
      <path d="M 0 -30 q -10 -12 0 -24 q 10 12 0 24 Z" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />
      {/* zzz draining out */}
      {[0, 1, 2].map((i) => <text key={i} x={56 + i * 10} y={-30 + i * 16} fontFamily={font} fontWeight={800} fontSize={14 - i * 2} fill={COLORS.sky} opacity={0.6}>z</text>)}
      <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.red}>-3h</text>
      <Label t="sleep debt drains focus" />
    </g>
  );
};

/** cortisol-fog — a stressed brain with a grey cortisol cloud dimming its front. */
export const CortisolFog: React.FC = () => {
  const f = useCurrentFrame();
  const puff = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      <path d="M -70 10 q -10 -62 50 -74 q 36 -26 76 -2 q 40 -10 54 34 q 20 30 -8 58 q 4 48 -58 50 q -46 20 -84 -8 q -42 2 -30 -58 Z" fill={shade(COLORS.pink, 0.08)} {...xl} />
      <path d="M -30 -24 q 16 12 0 26 M 24 -34 q 14 14 -2 30 M -8 18 q 20 8 36 -4" fill="none" stroke={shade(COLORS.pink, -0.08)} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />
      {/* cortisol cloud over the 'front' (prefrontal) */}
      {[0, 1, 2].map((i) => <ellipse key={i} cx={-38 + i * 16} cy={-18 + (i % 2) * 10} rx={26} ry={16} fill={COLORS.ledGrey} opacity={0.3 + puff * 0.2} />)}
      <text x={-30} y={-40} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>cortisol</text>
      <Label t="stress clouds the thinking brain" />
    </g>
  );
};

/** inflamed-brain — a brain ringed by little inflammation flames, dimmed. */
export const InflamedBrain: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.6 + 0.4 * Math.sin(f / 4);
  return (
    <g>
      <path d="M -60 8 q -8 -54 44 -64 q 32 -22 66 -2 q 34 -8 46 30 q 18 26 -6 50 q 4 42 -50 44 q -40 16 -72 -8 q -36 2 -28 -50 Z" fill={shade(COLORS.lavender, 0.08)} opacity={0.7} {...xl} />
      {/* flames around it */}
      {Array.from({ length: 7 }).map((_, i) => { const a = (i / 7) * Math.PI * 2; const x = Math.cos(a) * 76; const y = -4 + Math.sin(a) * 64; return <path key={i} d={`M ${x} ${y + 10} q -8 -8 0 -22 q 8 14 0 22 Z`} fill={COLORS.red} opacity={flick} {...sm} />; })}
      <text x={0} y={4} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>dim</text>
      <Label t="inflammation dulls thinking" />
    </g>
  );
};

/** sugar-crash — a line spiking up (sugar) then crashing below the baseline. */
export const SugarCrash: React.FC = () => {
  const f = useCurrentFrame();
  const sweep = (f % 90) / 90;
  return (
    <g>
      <line x1={-110} y1={10} x2={110} y2={10} stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} strokeDasharray="4 8" />
      <path d="M -110 10 L -50 10 Q -30 10 -20 -50 Q -8 10 10 50 L 110 50" fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {/* a sugar cube at the spike */}
      <rect x={-34} y={-66} width={24} height={24} rx={4} fill={COLORS.white} {...sm} />
      <text x={-22} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>↑</text>
      <circle cx={60} cy={50} r={8} fill={COLORS.red} {...sm} />
      <text x={70} y={74} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.red}>crash</text>
      <Label t="sugar spike, then fog" />
    </g>
  );
};

/** thirsty-brain — a slightly wilting brain and a water drop reviving it. */
export const ThirstyBrain: React.FC = () => {
  const f = useCurrentFrame();
  const drop = (f % 50) / 50;
  return (
    <g>
      {/* wilting brain */}
      <path d="M -54 14 q -8 -48 40 -58 q 28 -20 60 -2 q 30 -8 40 26 q 16 24 -6 46 q 2 38 -46 40 q -36 14 -64 -8 q -32 2 -24 -46 Z" fill={shade(COLORS.pink, 0.04)} opacity={0.6} {...xl} transform="translate(-10 4)" />
      {/* dry cracks */}
      <path d="M -30 -6 l 8 8 l -6 8 M 10 -10 l -6 10 l 8 6" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />
      {/* water drop falling */}
      <path d="M 0 0 q -10 14 0 24 q 10 -10 0 -24 Z" fill={COLORS.sky} {...sm} transform={`translate(54 ${-50 + drop * 50})`} opacity={1 - drop * 0.4} />
      {[0, 1].map((i) => <ellipse key={i} cx={54} cy={30 + i * 8} rx={18 - i * 6} ry={5} fill={COLORS.sky} opacity={0.3} />)}
      <Label t="even mild thirst fogs you" />
    </g>
  );
};

/** hormone-dial — a dial labelled with hormone symbols nudging clarity up or down. */
export const HormoneDial: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.PI - (0.4 + 0.25 * (0.5 + 0.5 * Math.sin(f / 10))) * Math.PI;
  return (
    <g>
      <circle cx={0} cy={0} r={62} fill={COLORS.white} {...xl} />
      <path d="M -46 24 A 52 52 0 0 1 46 24" fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      <text x={-50} y={44} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>foggy</text>
      <text x={50} y={44} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.greenDark}>clear</text>
      <line x1={0} y1={24} x2={Math.cos(a) * 40} y2={24 - Math.sin(a) * 40} stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={24} r={7} fill={COLORS.outline} />
      {/* little hormone glyphs */}
      <text x={0} y={-30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.pink}>thyroid · estrogen</text>
      <Label t="hormones move the needle" />
    </g>
  );
};

/** task-switch — one focus beam fractured into many scattered half-threads. */
export const TaskSwitch: React.FC = () => {
  const f = useCurrentFrame();
  const jit = 2 * Math.sin(f);
  const tabs = ['email', 'chat', 'tab', 'call', 'news'];
  return (
    <g>
      {/* the head */}
      <circle cx={0} cy={6} r={34} fill={COLORS.skin} {...xl} />
      <path d="M -14 0 l 10 10 M -4 0 l -10 10 M 4 0 l 10 10 M 14 0 l -10 10" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -10 20 L 10 20" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* scattered tabs pulling attention */}
      {tabs.map((t, i) => { const a = -Math.PI + (i / (tabs.length - 1)) * Math.PI; const x = Math.cos(a) * 92; const y = -44 + Math.sin(a) * 44; return (
        <g key={i} transform={`translate(${x + jit} ${y})`}><line x1={0} y1={0} x2={-x * 0.3} y2={-y * 0.1 + 30} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} opacity={0.4} /><rect x={-28} y={-14} width={56} height={28} rx={6} fill={[COLORS.yellow, COLORS.pink, COLORS.sky][i % 3]} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={12} fill={COLORS.outline}>{t}</text></g>
      ); })}
      <Label t="switching shatters focus" />
    </g>
  );
};

/** fog-lifts — a clear, sharp brain emerging as the fog burns off in sunlight. */
export const FogLifts: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {/* sun rays */}
      {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 66} y1={-4 + Math.sin(a) * 66} x2={Math.cos(a) * (84 + glow * 8)} y2={-4 + Math.sin(a) * (84 + glow * 8)} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />; })}
      {/* clear sharp brain */}
      <path d="M -54 6 q -8 -50 42 -60 q 30 -20 62 -2 q 32 -8 42 28 q 16 24 -6 48 q 2 40 -48 42 q -38 16 -68 -8 q -34 2 -26 -48 Z" fill={shade(COLORS.greenTeal, 0.08)} {...xl} />
      <path d="M -26 -16 q 16 12 0 26 M 22 -24 q 14 14 -2 30 M -4 16 q 20 8 36 -4" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      {/* a crisp spark */}
      <path d="M 44 -34 l -8 16 l 6 0 l -6 16 l 16 -22 l -6 0 Z" fill={COLORS.yellow} {...sm} />
      <Label t="the fog can lift" />
    </g>
  );
};
