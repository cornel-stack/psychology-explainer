/**
 * personalities.tsx — ALL-NEW art for "Every Personality Type Explained" (16 types).
 * One bespoke emblem per type, grouped by the four families:
 *   Analysts (violet): architect-plan, logic-gears, command-flag, debate-sparks
 *   Diplomats (green):  advocate-candle, mediator-quill, protagonist-beacon, campaigner-spark
 *   Sentinels (blue):   logistician-ledger, defender-shield, executive-clipboard, consul-host
 *   Explorers (amber):  virtuoso-wrench, adventurer-brush, entrepreneur-dice, entertainer-mic
 * Flat two-tone, token strokes. Each emblem is centered on the origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** Shared disc behind an emblem, tinted to the family colour. */
const Disc: React.FC<{ c: string; r?: number }> = ({ c, r = 120 }) => (
  <>
    <circle cx={0} cy={0} r={r} fill={shade(c, 0.22)} {...lg} />
    <circle cx={0} cy={0} r={r} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />
  </>
);
const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 150 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.outline}>{t}</text>
);

/* ── ANALYSTS (violet) ─────────────────────────────────────────── */

/** INTJ Architect — a blueprint with a drawn master-plan path. */
export const ArchitectPlan: React.FC = () => (
  <g>
    <Disc c={COLORS.purpleDeep} />
    <rect x={-78} y={-70} width={156} height={140} rx={8} fill={COLORS.blueDiagram} {...lg} />
    {[-40, 0, 40].map((gx) => <line key={gx} x1={gx} y1={-70} x2={gx} y2={70} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />)}
    {[-35, 0, 35].map((gy) => <line key={gy} x1={-78} y1={gy} x2={78} y2={gy} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />)}
    <path d="M -60 50 L -20 10 L 10 30 L 55 -45" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={-60} cy={50} r={8} fill={COLORS.yellow} {...sm} />
    <circle cx={55} cy={-45} r={8} fill={COLORS.yellow} {...sm} />
    <Label t="ARCHITECT" />
  </g>
);

/** INTP Logician — a lightbulb whose filament is interlocking gears. */
export const LogicGears: React.FC = () => {
  const f = useCurrentFrame();
  const Gear = ({ x, y, r, rot }: { x: number; y: number; r: number; rot: number }) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-4} y={-r - 6} width={8} height={12} fill={COLORS.purpleDeep} transform={`rotate(${i * 45})`} />)}
      <circle r={r} fill={COLORS.lavender} {...sm} /><circle r={r * 0.4} fill={COLORS.purpleDeep} />
    </g>
  );
  return (
    <g>
      <Disc c={COLORS.purpleDeep} />
      <path d="M 0 -78 A 60 60 0 0 1 36 30 L -36 30 A 60 60 0 0 1 0 -78 Z" fill={COLORS.yellowSoft} {...lg} />
      <rect x={-22} y={30} width={44} height={26} rx={4} fill={shade(COLORS.wood, 0.1)} {...sm} />
      <Gear x={-16} y={-26} r={20} rot={f * 2} />
      <Gear x={20} y={-4} r={16} rot={-f * 2.5} />
      <Label t="LOGICIAN" />
    </g>
  );
};

/** ENTJ Commander — a command flag planted on a conquered peak. */
export const CommandFlag: React.FC = () => (
  <g>
    <Disc c={COLORS.purpleDeep} />
    <path d="M -90 80 L -10 -30 L 20 10 L 60 -40 L 90 80 Z" fill={shade(COLORS.purpleDeep, -0.12)} {...lg} />
    <line x1={-10} y1={-30} x2={-10} y2={-110} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -10 -108 L 70 -92 L 40 -70 L 70 -48 L -10 -64 Z" fill={COLORS.red} {...sm} />
    <path d="M -56 86 l 20 -16 M 30 86 l 18 -14" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <Label t="COMMANDER" />
  </g>
);

/** ENTP Debater — two speech bubbles clashing with a bright spark. */
export const DebateSparks: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + 0.12 * Math.sin(f / 5);
  return (
    <g>
      <Disc c={COLORS.purpleDeep} />
      <g transform="translate(-44 -10)"><rect x={-54} y={-40} width={100} height={64} rx={16} fill={COLORS.lavender} {...lg} /><path d="M -14 22 l 0 26 l 26 -22 Z" fill={COLORS.lavender} {...sm} /></g>
      <g transform="translate(46 20)"><rect x={-46} y={-32} width={96} height={60} rx={16} fill={COLORS.sky} {...lg} /><path d="M 10 26 l 2 26 l -28 -20 Z" fill={COLORS.sky} {...sm} /></g>
      <g transform={`translate(2 -4) scale(${s})`}><path d="M 0 -34 L 10 -8 L 34 -6 L 14 10 L 22 34 L 0 18 L -22 34 L -14 10 L -34 -6 L -10 -8 Z" fill={COLORS.yellow} {...sm} /></g>
      <Label t="DEBATER" />
    </g>
  );
};

/* ── DIPLOMATS (green) ─────────────────────────────────────────── */

/** INFJ Advocate — a single candle cupped by two hands. */
export const AdvocateCandle: React.FC = () => {
  const f = useCurrentFrame();
  const fl = 1 + 0.18 * Math.sin(f / 4);
  return (
    <g>
      <Disc c={COLORS.greenTeal} />
      <circle cx={0} cy={-30} r={46} fill={COLORS.yellowSoft} opacity={0.5} />
      <rect x={-16} y={-24} width={32} height={74} rx={6} fill={COLORS.white} {...lg} />
      <line x1={0} y1={-24} x2={0} y2={-40} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <g transform={`translate(0 -58) scale(${fl})`}><path d="M 0 -26 Q 14 -6 0 14 Q -14 -6 0 -26 Z" fill={COLORS.yellow} {...sm} /></g>
      <path d="M -70 54 Q -40 36 -16 48 M 70 54 Q 40 36 16 48" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -70 54 q -10 26 18 40 M 70 54 q 10 26 -18 40" fill={COLORS.skin} {...sm} />
      <Label t="ADVOCATE" />
    </g>
  );
};

/** INFP Mediator — a quill resting on an open book with a heart. */
export const MediatorQuill: React.FC = () => (
  <g>
    <Disc c={COLORS.greenTeal} />
    <path d="M -84 40 Q 0 18 0 34 Q 0 18 84 40 L 84 70 Q 0 52 -84 70 Z" fill={COLORS.white} {...lg} />
    <line x1={0} y1={30} x2={0} y2={62} stroke={COLORS.greenDark} strokeWidth={STROKE.sm} />
    <path d="M 0 -4 C -16 -24 -44 -10 -22 14 L 0 34 L 22 14 C 44 -10 16 -24 0 -4 Z" fill={COLORS.pink} {...sm} />
    <path d="M 50 -70 Q 10 -30 -6 24" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <path d="M 50 -70 Q 66 -58 58 -40 Q 40 -50 50 -70 Z" fill={COLORS.greenLeaf} {...sm} />
    <Label t="MEDIATOR" />
  </g>
);

/** ENFJ Protagonist — a warm beacon/heart broadcasting guiding rays. */
export const ProtagonistBeacon: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      <Disc c={COLORS.greenTeal} />
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={0} x2={0} y2={-112} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 45})`} strokeLinecap="round" />)}
      <path d="M 0 36 C -40 -8 -72 -34 -40 -64 C -18 -84 0 -56 0 -40 C 0 -56 18 -84 40 -64 C 72 -34 40 -8 0 36 Z" fill={COLORS.red} {...lg} />
      <circle cx={0} cy={-34} r={10} fill={COLORS.white} opacity={0.7} />
      <Label t="PROTAGONIST" />
    </g>
  );
};

/** ENFP Campaigner — a firework spark bursting into colourful ideas. */
export const CampaignerSpark: React.FC = () => {
  const f = useCurrentFrame();
  const burst = (f % 60) / 60;
  const cols = [COLORS.yellow, COLORS.pink, COLORS.sky, COLORS.red, COLORS.greenLeaf];
  return (
    <g>
      <Disc c={COLORS.greenTeal} />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const d = 40 + burst * 56;
        return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={9} fill={cols[i % 5]} {...sm} />;
      })}
      <circle cx={0} cy={0} r={22} fill={COLORS.yellowSoft} {...lg} />
      <path d="M 0 -12 L 4 -4 L 12 -2 L 5 3 L 8 12 L 0 6 L -8 12 L -5 3 L -12 -2 L -4 -4 Z" fill={COLORS.yellow} />
      <Label t="CAMPAIGNER" />
    </g>
  );
};

/* ── SENTINELS (blue) ──────────────────────────────────────────── */

/** ISTJ Logistician — a ledger stamped with a firm approval mark. */
export const LogisticianLedger: React.FC = () => (
  <g>
    <Disc c={COLORS.blueDiagram} />
    <rect x={-70} y={-78} width={140} height={150} rx={8} fill={COLORS.white} {...lg} />
    {[-46, -22, 2, 26].map((y) => <line key={y} x1={-50} y1={y} x2={50} y2={y} stroke={COLORS.blueDiagramDark} strokeWidth={STROKE.sm} opacity={0.5} />)}
    <g transform="translate(14 36) rotate(-12)">
      <circle r={34} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} />
      <path d="M -16 2 l 10 12 l 20 -24" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <Label t="LOGISTICIAN" />
  </g>
);

/** ISFJ Defender — a sturdy shield holding a heart. */
export const DefenderShield: React.FC = () => (
  <g>
    <Disc c={COLORS.blueDiagram} />
    <path d="M 0 -82 L 72 -56 C 72 10 44 58 0 82 C -44 58 -72 10 -72 -56 Z" fill={COLORS.sky} {...lg} />
    <path d="M 0 -62 L 54 -42 C 54 8 32 44 0 62 C -32 44 -54 8 -54 -42 Z" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.6} />
    <path d="M 0 22 C -26 -2 -46 -18 -26 -40 C -12 -54 0 -36 0 -24 C 0 -36 12 -54 26 -40 C 46 -18 26 -2 0 22 Z" fill={COLORS.pink} {...sm} />
    <Label t="DEFENDER" />
  </g>
);

/** ESTJ Executive — a clipboard crossed with a gavel. */
export const ExecutiveClipboard: React.FC = () => (
  <g>
    <Disc c={COLORS.blueDiagram} />
    <g transform="rotate(-10)">
      <rect x={-58} y={-74} width={116} height={150} rx={10} fill={COLORS.white} {...lg} />
      <rect x={-22} y={-86} width={44} height={22} rx={6} fill={shade(COLORS.blueDiagram, 0.1)} {...sm} />
      {[-40, -16, 8].map((y) => <line key={y} x1={-38} y1={y} x2={38} y2={y} stroke={COLORS.blueDiagramDark} strokeWidth={STROKE.sm} opacity={0.5} />)}
    </g>
    <g transform="translate(26 44) rotate(32)">
      <rect x={-10} y={-10} width={20} height={76} rx={6} fill={COLORS.wood} {...sm} />
      <rect x={-30} y={-34} width={60} height={34} rx={8} fill={shade(COLORS.wood, 0.14)} {...lg} />
    </g>
    <Label t="EXECUTIVE" />
  </g>
);

/** ESFJ Consul — a welcoming tea tray with two cups and a heart. */
export const ConsulHost: React.FC = () => (
  <g>
    <Disc c={COLORS.blueDiagram} />
    <ellipse cx={0} cy={44} rx={86} ry={22} fill={shade(COLORS.wood, 0.14)} {...lg} />
    <ellipse cx={0} cy={38} rx={86} ry={20} fill={COLORS.wood} {...sm} />
    {[-40, 40].map((x) => (
      <g key={x} transform={`translate(${x} 8)`}>
        <path d="M -22 -2 L 22 -2 L 16 30 L -16 30 Z" fill={COLORS.white} {...lg} />
        <path d="M 22 2 q 18 2 12 18 q -6 10 -16 6" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
      </g>
    ))}
    <path d="M 0 -42 C -14 -60 -38 -48 -20 -28 L 0 -10 L 20 -28 C 38 -48 14 -60 0 -42 Z" fill={COLORS.pink} {...sm} />
    <path d="M -40 2 q 0 -14 6 -22 M 40 2 q 0 -14 -6 -22" stroke={COLORS.white} strokeWidth={STROKE.sm} fill="none" opacity={0.6} />
    <Label t="CONSUL" />
  </g>
);

/* ── EXPLORERS (amber) ─────────────────────────────────────────── */

/** ISTP Virtuoso — a wrench crossed with a screwdriver and a spark. */
export const VirtuosoWrench: React.FC = () => (
  <g>
    <Disc c={COLORS.yellowDark} />
    <g transform="rotate(-42)">
      <rect x={-12} y={-20} width={24} height={110} rx={10} fill={shade(COLORS.whiteShade, -0.05)} {...lg} />
      <path d="M -26 -36 a 28 28 0 1 0 52 0 l -14 0 a 14 14 0 1 1 -24 0 Z" fill={COLORS.whiteShade} {...sm} />
    </g>
    <g transform="rotate(40)">
      <rect x={-9} y={-14} width={18} height={96} rx={8} fill={COLORS.red} {...lg} />
      <rect x={-7} y={78} width={14} height={22} fill={shade(COLORS.whiteShade, -0.05)} {...sm} />
    </g>
    <path d="M 44 -44 l 8 16 l 16 4 l -14 10 l 4 18 l -14 -10 l -14 8 l 6 -16 l -12 -12 l 18 -2 Z" fill={COLORS.yellow} {...sm} />
    <Label t="VIRTUOSO" />
  </g>
);

/** ISFP Adventurer — a paintbrush dabbing a blooming flower. */
export const AdventurerBrush: React.FC = () => (
  <g>
    <Disc c={COLORS.yellowDark} />
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-34} rx={20} ry={30} fill={COLORS.pink} {...sm} transform={`rotate(${a}) translate(0 -2)`} />)}
    <circle cx={0} cy={0} r={18} fill={COLORS.yellow} {...sm} />
    <g transform="translate(44 60) rotate(32)">
      <rect x={-7} y={-40} width={14} height={70} rx={6} fill={COLORS.wood} {...lg} />
      <rect x={-10} y={-56} width={20} height={20} rx={4} fill={shade(COLORS.whiteShade, -0.05)} {...sm} />
      <path d="M -10 -56 L 10 -56 L 4 -76 L -4 -76 Z" fill={COLORS.sky} {...sm} />
    </g>
    <Label t="ADVENTURER" />
  </g>
);

/** ESTP Entrepreneur — a pair of dice launching like a rocket. */
export const EntrepreneurDice: React.FC = () => {
  const f = useCurrentFrame();
  const dy = -6 * Math.sin(f / 5);
  const Die = ({ x, pips }: { x: number; pips: [number, number][] }) => (
    <g transform={`translate(${x} ${dy})`}>
      <rect x={-30} y={-30} width={60} height={60} rx={12} fill={COLORS.white} {...lg} />
      {pips.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={6} fill={COLORS.red} />)}
    </g>
  );
  return (
    <g>
      <Disc c={COLORS.yellowDark} />
      <path d="M -70 90 Q 0 40 70 90 L 40 50 Q 0 30 -40 50 Z" fill={COLORS.red} opacity={0.5} />
      <Die x={-34} pips={[[-14, -14], [14, 14], [0, 0], [-14, 14], [14, -14]]} />
      <Die x={36} pips={[[-14, -14], [14, -14], [-14, 14], [14, 14]]} />
      <Label t="ENTREPRENEUR" />
    </g>
  );
};

/** ESFP Entertainer — a microphone bursting with sparkle. */
export const EntertainerMic: React.FC = () => {
  const f = useCurrentFrame();
  const tw = 0.6 + 0.4 * Math.sin(f / 4);
  return (
    <g>
      <Disc c={COLORS.yellowDark} />
      <circle cx={0} cy={-34} r={40} fill={shade(COLORS.outline, 0.3)} {...lg} />
      {[-18, 0, 18].map((y) => <line key={y} x1={-30} y1={-34 + y} x2={30} y2={-34 + y} stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />)}
      <rect x={-10} y={-2} width={20} height={70} rx={8} fill={COLORS.wood} {...lg} />
      {[[-62, -50], [60, -44], [-56, 20], [58, 24]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y - 12} l 4 9 l 9 3 l -9 3 l -4 9 l -4 -9 l -9 -3 l 9 -3 Z`} fill={COLORS.yellow} opacity={tw} />
      ))}
      <Label t="ENTERTAINER" />
    </g>
  );
};
