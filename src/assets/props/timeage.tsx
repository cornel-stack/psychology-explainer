/**
 * timeage.tsx — ALL-NEW art for "Why Time Speeds Up As You Age". The feeling
 * (endless-summer, flipping-calendar), the theories (life-pie-slices, memory-dots,
 * first-glow), the routine trap (routine-blur, watched-clock-drag), the paradox
 * (holiday-fast-long), and the fix (present-savor, novelty-stretch). Token strokes,
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

/** Endless-summer — a long golden afternoon with a low sun and long shadow. */
export const EndlessSummer: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      {/* big low sun */}
      <circle cx={-20} cy={-20} r={56} fill={COLORS.yellow} opacity={0.7 + g * 0.2} />
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={-20} y1={-20} x2={-20 + Math.cos((i / 6) * Math.PI * 2) * 90} y2={-20 + Math.sin((i / 6) * Math.PI * 2) * 90} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g * 0.5} strokeLinecap="round" />)}
      {/* a tiny child, a very long shadow = time stretched */}
      <g transform="translate(40 40)"><circle cx={0} cy={-20} r={18} fill={COLORS.white} {...lg} /><path d="M -16 40 Q 0 -6 16 40 Z" fill={COLORS.hoodie} {...lg} /><ellipse cx={30} cy={44} rx={70} ry={10} fill={COLORS.outline} opacity={0.2} /></g>
      <Label t="childhood: endless" />
    </g>
  );
};

/** Flipping-calendar — pages tearing off fast, years vanishing. */
export const FlippingCalendar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-66} y={-70} width={132} height={150} rx={10} fill={COLORS.white} {...xl} />
      <rect x={-66} y={-70} width={132} height={34} rx={10} fill={COLORS.red} />
      {[-34, 34].map((x, i) => <rect key={i} x={x - 5} y={-84} width={10} height={24} rx={4} fill={COLORS.outline} />)}
      <text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={54} fill={COLORS.outline}>{(f % 28) + 1}</text>
      {/* pages flying off */}
      {[0, 1, 2].map((i) => { const p = ((f * 2 + i * 14) % 42) / 42; return <rect key={i} x={40 + p * 60} y={-50 - p * 30} width={60} height={70} rx={6} fill={COLORS.white} {...sm} opacity={1 - p} transform={`rotate(${p * 40} ${70 + p * 60} ${-20})`} />; })}
      <Label t="now: years fly off" />
    </g>
  );
};

/** Life-pie-slices — a life circle where each new year is a thinner slice. */
export const LifePieSlices: React.FC = () => {
  const total = 10;
  const slices = Array.from({ length: total });
  let acc = -0.25;
  return (
    <g>
      {slices.map((_, i) => {
        const frac = 1 / total; const a0 = acc * Math.PI * 2; acc += frac; const a1 = acc * Math.PI * 2;
        const R = 80; const x0 = Math.cos(a0) * R, y0 = Math.sin(a0) * R, x1 = Math.cos(a1) * R, y1 = Math.sin(a1) * R;
        const young = i === 0;
        return <path key={i} d={`M 0 0 L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`} fill={young ? COLORS.sky : shade(COLORS.ledGrey, 0.08 + i * 0.01)} opacity={young ? 1 : 0.5} {...sm} />;
      })}
      <text x={Math.cos(-0.25 * Math.PI * 2 + 0.3) * 50} y={Math.sin(-0.25 * Math.PI * 2 + 0.3) * 50 + 6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>age 1</text>
      <Label t="each year, a smaller slice" />
    </g>
  );
};

/** Memory-dots — dense dots (child) vs sparse dots (adult), same span. */
export const MemoryDots: React.FC = () => (
  <g>
    {/* child span, dense */}
    <g transform="translate(-54 -6)">
      <rect x={-44} y={-40} width={88} height={80} rx={8} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={-36 + (i % 5) * 18} cy={-30 + Math.floor(i / 5) * 18} r={5} fill={COLORS.yellow} />)}
      <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>child: full</text>
    </g>
    {/* adult span, sparse */}
    <g transform="translate(54 -6)">
      <rect x={-44} y={-40} width={88} height={80} rx={8} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {[[-20, -10], [16, 20], [0, 0]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={COLORS.ledGrey} />)}
      <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>adult: sparse</text>
    </g>
    <Label t="we judge time by memories" />
  </g>
);

/** First-glow — a 'first' moment glowing brightly, a fresh memory. */
export const FirstGlow: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={i} x1={0} y1={0} x2={Math.cos((i / 8) * Math.PI * 2) * (70 + g * 14)} y2={Math.sin((i / 8) * Math.PI * 2) * (70 + g * 14)} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} strokeLinecap="round" />)}
      <circle cx={0} cy={0} r={46} fill={COLORS.yellow} opacity={0.5 + g * 0.3} />
      <text x={0} y={-2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>1st</text>
      <text x={0} y={18} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>time</text>
      <Label t="firsts burn in bright" />
    </g>
  );
};

/** Routine-blur — identical days smeared into a blur. */
export const RoutineBlur: React.FC = () => {
  const f = useCurrentFrame();
  const sh = 2 * Math.sin(f / 2);
  return (
    <g>
      {/* stacked identical day-cards, blurring into one */}
      {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`translate(${-40 + i * 20 + sh} ${i * 2})`} opacity={1 - i * 0.16}><rect x={-40} y={-50} width={80} height={100} rx={8} fill={COLORS.white} {...lg} /><line x1={-24} y1={-24} x2={24} y2={-24} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} /><circle cx={0} cy={6} r={12} fill={shade(COLORS.ledGrey, 0.1)} /></g>)}
      {/* motion streaks */}
      {[-30, 0, 30].map((y, i) => <line key={i} x1={-70} y1={y} x2={90} y2={y} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} opacity={0.3} />)}
      <Label t="routine blurs together" />
    </g>
  );
};

/** Holiday-fast-long — one span: 'fast' now, 'long' in memory. */
export const HolidayFastLong: React.FC = () => (
  <g>
    {/* in the moment: short arrow */}
    <g transform="translate(0 -36)">
      <text x={-96} y={6} textAnchor="start" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>in the moment</text>
      <path d="M 10 0 L 70 0 l -12 -8 m 12 8 l -12 8" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={90} y={6} textAnchor="start" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.sky}>fast</text>
    </g>
    {/* in memory: long arrow */}
    <g transform="translate(0 30)">
      <text x={-96} y={6} textAnchor="start" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>in memory</text>
      <path d="M -40 0 L 70 0 l -12 -8 m 12 8 l -12 8" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      <text x={90} y={6} textAnchor="start" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.pinkDark}>long</text>
    </g>
    <Label t="the holiday paradox" />
  </g>
);

/** Watched-clock-drag — a clock stared at, time crawling. */
export const WatchedClockDrag: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f / 80) * 0.4;
  return (
    <g>
      <circle cx={0} cy={0} r={70} fill={COLORS.white} {...xl} />
      {[0, 3, 6, 9].map((h, i) => <line key={i} x1={Math.cos((i / 4) * Math.PI * 2) * 56} y1={Math.sin((i / 4) * Math.PI * 2) * 56} x2={Math.cos((i / 4) * Math.PI * 2) * 66} y2={Math.sin((i / 4) * Math.PI * 2) * 66} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}
      <line x1={0} y1={0} x2={Math.cos(a - Math.PI / 2) * 36} y2={Math.sin(a - Math.PI / 2) * 36} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={0} r={7} fill={COLORS.outline} />
      {/* two staring eyes below watching it */}
      <g transform="translate(0 50)"><circle cx={-14} cy={0} r={6} fill={COLORS.outline} /><circle cx={14} cy={0} r={6} fill={COLORS.outline} /></g>
      <Label t="watched, it crawls" />
    </g>
  );
};

/** Present-savor — a figure fully present, savouring a thick, rich moment. */
export const PresentSavor: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      <circle cx={0} cy={-4} r={70} fill={COLORS.yellowSoft} opacity={0.3 + g * 0.2} />
      <circle cx={0} cy={0} r={48} fill={COLORS.white} {...xl} />
      {/* closed, peaceful eyes */}
      <path d="M -24 -8 Q -16 -16 -8 -8 M 8 -8 Q 16 -16 24 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -14 16 Q 0 24 14 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* 'now' radiating */}
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={0} cy={0} r={56 + i * 14} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={(g - i * 0.2) * 0.4} />)}
      <Label t="be here, and time thickens" />
    </g>
  );
};

/** Novelty-stretch — a key of 'new' stretching a short span into a long one. */
export const NoveltyStretch: React.FC = () => {
  const f = useCurrentFrame();
  const stretch = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      {/* a spring/accordion of time being stretched by novelty */}
      <path d={`M -90 0 ${Array.from({ length: 8 }).map((_, i) => `L ${-90 + i * (22 + stretch * 6)} ${i % 2 ? 20 : -20}`).join(' ')}`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {/* a 'NEW' tag pulling it */}
      <g transform="translate(80 -40)"><rect x={-30} y={-18} width={64} height={36} rx={10} fill={COLORS.red} {...sm} /><text x={2} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>new!</text></g>
      <path d="M 50 -4 l 20 -20" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="novelty stretches time" />
    </g>
  );
};
