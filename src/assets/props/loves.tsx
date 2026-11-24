/**
 * loves.tsx — ALL-NEW art for "Every Type of Love Explained" (the Greek loves).
 * One emblem per kind of love: eros (romance), philia (friendship), storge
 * (family), agape (selfless), ludus (playful), pragma (enduring), philautia
 * (self-love), mania (obsessive) — plus Sternberg's triangle and a love compass.
 * Flat two-tone, token strokes. Centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Heart: React.FC<{ c?: string; s?: number }> = ({ c = COLORS.red, s = 1 }) => (
  <path d={`M 0 ${40 * s} C ${-56 * s} ${-14 * s} ${-88 * s} ${-44 * s} ${-52 * s} ${-78 * s} C ${-28 * s} ${-100 * s} 0 ${-70 * s} 0 ${-48 * s} C 0 ${-70 * s} ${28 * s} ${-100 * s} ${52 * s} ${-78 * s} C ${88 * s} ${-44 * s} ${56 * s} ${-14 * s} 0 ${40 * s} Z`} fill={c} {...xl} />
);
const Fig: React.FC<{ r?: number; c?: string }> = ({ r = 34, c = COLORS.white }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    <circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.14} fill={COLORS.outline} />
    <path d={`M ${-r * 1.1} ${r * 1.5} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.5} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);
const Label: React.FC<{ t: string; s?: string; y?: number }> = ({ t, s, y = 134 }) => (
  <g><text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>{t}</text>{s && <text x={0} y={y + 26} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>{s}</text>}</g>
);

/** EROS — romantic, passionate love: two figures lean in, a flame-heart between. */
export const LoveEros: React.FC = () => {
  const f = useCurrentFrame();
  const b = 1 + 0.06 * Math.sin(f / 5);
  return (
    <g>
      <g transform="translate(-74 24) rotate(12) scale(0.8)"><Fig c={COLORS.white} /></g>
      <g transform="translate(74 24) rotate(-12) scale(0.8)"><Fig c={COLORS.yellowSoft} /></g>
      <g transform={`translate(0 -30) scale(${0.7 * b})`}><Heart c={COLORS.red} />{[-30, 0, 30].map((x, i) => <path key={i} d={`M ${x} -72 q 8 -16 0 -30`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>
      <Label t="EROS" s="passion" />
    </g>
  );
};

/** PHILIA — deep friendship: two equals side by side, arms linked. */
export const LovePhilia: React.FC = () => (
  <g>
    {[-48, 48].map((x, i) => <g key={i} transform={`translate(${x} 20) scale(0.82)`}><Fig c={[COLORS.white, COLORS.sky][i]} /></g>)}
    <path d="M -20 10 q 20 24 40 0" fill="none" stroke={COLORS.skin} strokeWidth={26} strokeLinecap="round" />
    <g transform="translate(0 -72) scale(0.34)"><Heart c={COLORS.yellow} /></g>
    <Label t="PHILIA" s="friendship" />
  </g>
);

/** STORGE — familial love: a big figure sheltering a small one. */
export const LoveStorge: React.FC = () => (
  <g>
    <g transform="translate(-24 16) scale(1.05)"><Fig c={COLORS.white} /></g>
    <g transform="translate(46 44) scale(0.55)"><Fig c={COLORS.yellowSoft} /></g>
    <path d="M -70 -6 q 50 50 110 10" fill="none" stroke={COLORS.skin} strokeWidth={24} strokeLinecap="round" />
    <g transform="translate(0 -80) scale(0.34)"><Heart c={COLORS.greenLeaf} /></g>
    <Label t="STORGE" s="family" />
  </g>
);

/** AGAPE — selfless love: a radiant heart giving light out to all. */
export const LoveAgape: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={0} y1={-24} x2={0} y2={-120} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 30} 0 -24)`} strokeLinecap="round" />)}
      <circle cx={0} cy={-24} r={64} fill={COLORS.yellowSoft} opacity={0.4} />
      <g transform="translate(0 -20) scale(0.8)"><Heart c={COLORS.pink} /></g>
      <Label t="AGAPE" s="selfless" />
    </g>
  );
};

/** LUDUS — playful, flirty love: a winking face with little bouncing hearts. */
export const LoveLudus: React.FC = () => {
  const f = useCurrentFrame();
  const by = 6 * Math.abs(Math.sin(f / 6));
  return (
    <g>
      <circle cx={0} cy={-6} r={64} fill={COLORS.yellow} {...xl} />
      <path d="M -36 -24 q 12 -8 24 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={26} cy={-18} r={10} fill={COLORS.outline} />
      <path d="M -24 16 q 24 24 48 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[[-70, -40], [72, -48]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y - by}) scale(0.26)`}><Heart c={COLORS.pink} /></g>)}
      <Label t="LUDUS" s="playful" />
    </g>
  );
};

/** PRAGMA — enduring, mature love: two weathered hands clasped over deep roots. */
export const LovePragma: React.FC = () => (
  <g>
    <g transform="translate(0 -24) scale(0.66)"><Heart c={COLORS.red} /></g>
    <path d="M -56 20 q 56 36 112 0" fill="none" stroke={COLORS.skin} strokeWidth={30} strokeLinecap="round" />
    {/* deep roots */}
    {[-30, 0, 30].map((x, i) => <path key={i} d={`M ${x} 40 q ${x} 50 ${x * 0.4} 100`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
    <Label t="PRAGMA" s="enduring" />
  </g>
);

/** PHILAUTIA — self-love: a figure gently hugging itself, a heart within. */
export const LovePhilautia: React.FC = () => (
  <g>
    <circle cx={0} cy={-6} r={62} fill={COLORS.greenTeal} opacity={0.3} />
    <g transform="translate(0 20)"><Fig r={40} c={COLORS.white} /></g>
    <path d="M -54 30 q 54 -6 108 0" fill="none" stroke={COLORS.skin} strokeWidth={26} strokeLinecap="round" />
    <g transform="translate(0 -24) scale(0.3)"><Heart c={COLORS.pink} /></g>
    <Label t="PHILAUTIA" s="self-love" />
  </g>
);

/** MANIA — obsessive love: a heart tangled in chains, the shadow side. */
export const LoveMania: React.FC = () => {
  const f = useCurrentFrame();
  const sh = 3 * Math.sin(f / 3);
  return (
    <g transform={`translate(${sh} 0)`}>
      <g transform="translate(0 -20) scale(0.8)"><Heart c={COLORS.purpleDeep} /></g>
      {/* chains wrapping */}
      {[-40, -10, 20, 50].map((y, i) => <ellipse key={i} cx={-30 + i * 20} cy={y * 0 + (-30 + i * 24)} rx={14} ry={9} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} transform={`rotate(${i % 2 ? 40 : -40} ${-30 + i * 20} ${-30 + i * 24})`} />)}
      <path d="M -60 60 q 60 20 120 -6" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="MANIA" s="obsessive" />
    </g>
  );
};

/** Sternberg's triangle — intimacy, passion, commitment. */
export const LoveTriangle: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      <path d="M 0 -96 L 96 72 L -96 72 Z" fill={COLORS.pink} opacity={0.25} {...xl} />
      <g transform="translate(0 -96)"><circle r={16} fill={COLORS.red} {...sm} /></g>
      <g transform="translate(96 72)"><circle r={16} fill={COLORS.yellow} {...sm} /></g>
      <g transform="translate(-96 72)"><circle r={16} fill={COLORS.sky} {...sm} /></g>
      <g transform="translate(0 0) scale(0.5)" opacity={g}><Heart c={COLORS.red} /></g>
      <Label t="the triangle" y={120} />
    </g>
  );
};

/** Love compass — a dial pointing to the kind of love in play. */
export const LoveCompass: React.FC = () => {
  const f = useCurrentFrame();
  const a = 34 * Math.sin(f / 20);
  return (
    <g>
      <circle cx={0} cy={0} r={96} fill={COLORS.pink} opacity={0.3} {...xl} />
      <circle cx={0} cy={0} r={78} fill="none" stroke={COLORS.pinkDark} strokeWidth={STROKE.sm} />
      <g transform={`rotate(${a})`}><path d="M 0 -52 L 12 0 L 0 52 L -12 0 Z" fill={COLORS.red} {...sm} /></g>
      <g transform="translate(0 0) scale(0.14)"><Heart c={COLORS.white} /></g>
      <Label t="which love?" />
    </g>
  );
};
