/**
 * boredom.tsx — ALL-NEW art for "The Psychology of Boredom". What it is (dragging-clock,
 * grasping-void, bored-fidget), how we flee it (shock-vs-boredom, numbing-scroll), its
 * gift (boredom-lightbulb, wander-cloud, explore-compass), and the contrast
 * (rest-vs-boredom, engage-choice). Token strokes, centered on origin, ~300px tall.
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
const Head: React.FC<{ r?: number; c?: string; bored?: boolean }> = ({ r = 40, c = COLORS.white, bored = true }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={c} {...xl} />
    <path d={`M ${-r * 0.44} ${-r * 0.1} l ${r * 0.24} 0 M ${r * 0.2} ${-r * 0.1} l ${r * 0.24} 0`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    {bored
      ? <path d={`M ${-r * 0.24} ${r * 0.36} l ${r * 0.48} 0`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : <path d={`M ${-r * 0.24} ${r * 0.3} Q 0 ${r * 0.48} ${r * 0.24} ${r * 0.3}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);

/** Dragging-clock — a clock whose hands crawl, time dragging. */
export const DraggingClock: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f / 60) * 0.3; // barely moving
  return (
    <g>
      <circle cx={0} cy={0} r={76} fill={COLORS.white} {...xl} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <line key={i} x1={Math.cos((i / 12) * Math.PI * 2) * 62} y1={Math.sin((i / 12) * Math.PI * 2) * 62} x2={Math.cos((i / 12) * Math.PI * 2) * 70} y2={Math.sin((i / 12) * Math.PI * 2) * 70} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}
      <line x1={0} y1={0} x2={Math.cos(a - Math.PI / 2) * 36} y2={Math.sin(a - Math.PI / 2) * 36} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={0} y1={0} x2={Math.cos(a * 1.1 - Math.PI / 2) * 54} y2={Math.sin(a * 1.1 - Math.PI / 2) * 54} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={0} cy={0} r={7} fill={COLORS.outline} />
      {/* 'sigh' zzz-ish marks */}
      <text x={66} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.ledGrey} opacity={0.6}>…</text>
      <Label t="time drags" />
    </g>
  );
};

/** Grasping-void — a hand reaching for engagement, closing on nothing. */
export const GraspingVoid: React.FC = () => {
  const f = useCurrentFrame();
  const reach = 10 * Math.sin(f / 8);
  return (
    <g>
      {/* the empty void */}
      <circle cx={40} cy={-6} r={48} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeDasharray="5 10" />
      <text x={40} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.ledGrey}>nothing</text>
      {/* reaching arm + open grasping hand */}
      <path d={`M -90 50 Q -40 10 ${-6 + reach} -6`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <g transform={`translate(${-6 + reach} -6)`}><circle cx={0} cy={0} r={16} fill={COLORS.skin} {...lg} />{[0, 1, 2].map((i) => <path key={i} d={`M ${6 + i * 5} -10 q 8 6 4 16`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
      <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>want to engage</text>
      <Label t="wanting, but unable" />
    </g>
  );
};

/** Bored-fidget — a slumped figure drumming fingers, restless. */
export const BoredFidget: React.FC = () => {
  const f = useCurrentFrame();
  const tap = Math.abs(Math.sin(f / 3));
  return (
    <g>
      <g transform="translate(0 -10)"><Head r={44} bored /></g>
      {/* slumped body + an arm drumming on a surface */}
      <path d="M -52 90 Q -56 30 0 26 Q 56 30 52 90 Z" fill={COLORS.hoodie} {...xl} />
      <rect x={-96} y={76} width={192} height={14} rx={6} fill={COLORS.wood} {...lg} />
      {[-30, -14, 2, 18].map((x, i) => <line key={i} x1={x} y1={74} x2={x} y2={74 - (i === Math.floor(f / 4) % 4 ? tap * 14 : 2)} stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
      <Label t="restless and flat" />
    </g>
  );
};

/** Shock-vs-boredom — a hand hovering over a shock button to escape boredom. */
export const ShockVsBoredom: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 4);
  return (
    <g>
      {/* the button */}
      <ellipse cx={0} cy={50} rx={70} ry={22} fill={shade(COLORS.outline, 0.3)} {...lg} />
      <ellipse cx={0} cy={36} rx={56} ry={30} fill={COLORS.red} {...xl} />
      <path d="M -8 24 l -8 16 l 10 -2 l -6 14 l 18 -22 l -10 2 Z" fill={COLORS.yellow} />
      {/* finger pressing */}
      <g transform={`translate(0 ${-20 + g * 10})`}><path d="M -14 -60 Q -6 -20 0 6 Q 6 -20 14 -60 Z" fill={COLORS.skin} {...lg} /></g>
      {/* 'rather than be bored' */}
      <text x={0} y={-70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.outline}>anything but nothing</text>
      <Label t="we'd rather feel pain" />
    </g>
  );
};

/** Numbing-scroll — a phone scrolling an endless grey feed, eyes glazed. */
export const NumbingScroll: React.FC = () => {
  const f = useCurrentFrame();
  const sy = (f * 2) % 40;
  return (
    <g>
      <rect x={-54} y={-86} width={108} height={176} rx={18} fill={COLORS.wallNightDark} {...xl} />
      <rect x={-44} y={-70} width={88} height={140} rx={6} fill={shade(COLORS.ledGrey, 0.1)} />
      <g>{[-80, -40, 0, 40, 80, 120].map((y, i) => <rect key={i} x={-36} y={y + sy - 10} width={72} height={28} rx={6} fill={COLORS.ledGrey} opacity={0.6} />)}</g>
      {/* glazed eyes above */}
      <g transform="translate(0 -120)"><path d="M -26 0 l 14 0 M 12 0 l 14 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="scrolling to fill the void" />
    </g>
  );
};

/** Boredom-lightbulb — an idea sparking out of an empty, bored head. */
export const BoredomLightbulb: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.4 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      <Head r={52} bored />
      {/* the lightbulb rising from the empty mind */}
      <g transform="translate(0 -92)"><circle cx={0} cy={0} r={28} fill={COLORS.yellow} opacity={0.4 + g * 0.4} /><path d="M 0 -26 a 26 26 0 0 1 14 46 l -28 0 a 26 26 0 0 1 14 -46 Z" fill={COLORS.yellow} {...lg} /><rect x={-10} y={18} width={20} height={12} rx={3} fill={COLORS.ledGrey} {...sm} />{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={Math.cos((i / 5) * Math.PI - Math.PI / 2) * 40} y1={-4 + Math.sin((i / 5) * Math.PI - Math.PI / 2) * 40} x2={Math.cos((i / 5) * Math.PI - Math.PI / 2) * 52} y2={-4 + Math.sin((i / 5) * Math.PI - Math.PI / 2) * 52} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={g} />)}</g>
      <Label t="boredom sparks ideas" />
    </g>
  );
};

/** Wander-cloud — a daydream cloud drifting from an idle mind. */
export const WanderCloud: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 10 * Math.sin(f / 10);
  return (
    <g>
      <Head r={44} bored={false} />
      {/* bubbles leading up to a daydream cloud */}
      {[0, 1, 2].map((i) => <circle key={i} cx={30 + i * 14} cy={-30 - i * 16} r={6 + i * 2} fill={COLORS.lavender} {...sm} />)}
      <g transform={`translate(${70 + drift} -76)`}><ellipse cx={0} cy={0} rx={56} ry={34} fill={COLORS.lavender} {...lg} /><ellipse cx={-30} cy={6} rx={26} ry={18} fill={COLORS.lavender} {...sm} /><ellipse cx={30} cy={4} rx={28} ry={20} fill={COLORS.lavender} {...sm} /><path d="M -20 -4 l 4 -10 l 4 10 M 8 2 q 10 -10 18 0" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="the mind wanders free" />
    </g>
  );
};

/** Explore-compass — boredom's needle pointing toward novelty. */
export const ExploreCompass: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 8) * 0.4 - 0.6;
  return (
    <g>
      <circle cx={0} cy={0} r={72} fill={COLORS.sky} opacity={0.3} {...xl} />
      <circle cx={0} cy={0} r={72} fill="none" {...xl} />
      {['N', 'E', 'S', 'W'].map((d, i) => <text key={d} x={Math.cos((i / 4) * Math.PI * 2 - Math.PI / 2) * 56} y={Math.sin((i / 4) * Math.PI * 2 - Math.PI / 2) * 56 + 6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>{d}</text>)}
      {/* needle pointing to 'new' */}
      <g transform={`rotate(${(a * 180) / Math.PI})`}><path d="M 0 -44 l 10 44 l -10 -10 l -10 10 Z" fill={COLORS.red} {...sm} /></g>
      <circle cx={0} cy={0} r={8} fill={COLORS.outline} />
      <text x={0} y={-82} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>toward the new</text>
      <Label t="boredom pushes you to explore" />
    </g>
  );
};

/** Rest-vs-boredom — calm rest beside restless boredom. */
export const RestVsBoredom: React.FC = () => {
  const f = useCurrentFrame();
  const jit = 2 * Math.sin(f);
  return (
    <g>
      {/* calm rest */}
      <g transform="translate(-66 0)"><circle cx={0} cy={0} r={42} fill={COLORS.greenLeaf} {...xl} /><path d="M -18 -4 Q -12 -10 -6 -4 M 6 -4 Q 12 -10 18 -4" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -12 14 Q 0 22 12 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><text x={0} y={72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>rest: calm</text></g>
      {/* restless boredom */}
      <g transform={`translate(${66 + jit} 0)`}><circle cx={0} cy={0} r={42} fill={shade(COLORS.ledGrey, 0.1)} {...xl} /><path d="M -18 -4 l 12 0 M 6 -4 l 12 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -14 16 l 28 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />{[-54, 54].map((x, i) => <path key={i} d={`M ${x} -20 l 0 -12 M ${x} 20 l 0 12`} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}<text x={0} y={72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>boredom: restless</text></g>
      <Label t="they're not the same" />
    </g>
  );
};

/** Engage-choice — a fork: shallow distraction vs real engagement. */
export const EngageChoice: React.FC = () => (
  <g>
    {/* the fork */}
    <path d="M 0 60 L 0 10 L -60 -50 M 0 10 L 60 -50" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
    {/* distraction (grey phone) */}
    <g transform="translate(-74 -68)"><rect x={-20} y={-28} width={40} height={56} rx={8} fill={COLORS.ledGrey} {...lg} /><text x={0} y={46} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>distract</text></g>
    {/* engagement (bright spark) */}
    <g transform="translate(74 -68)"><circle cx={0} cy={0} r={24} fill={COLORS.greenLeaf} {...lg} /><path d="M -10 0 l 7 8 l 14 -16" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /><text x={0} y={46} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>engage</text></g>
    <Label t="distraction, or engagement?" />
  </g>
);
