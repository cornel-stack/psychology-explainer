/**
 * consciousness.tsx — ALL-NEW art for "Every Level of Consciousness Explained".
 * One signature prop per rung of the awareness ladder, lowest → highest:
 *   dormant-orb (unconscious), dream-spiral (dreaming), autopilot-wind (autopilot),
 *   radar-ping (situational), self-mirror (self-aware), meta-lens (metacognition),
 *   flow-current (flow), open-sky (peak) — plus dimmer-switch & veil-figure concepts.
 * Flat two-tone, token strokes. Each centered on the origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A simple head/figure used across rungs. */
const Fig: React.FC<{ r?: number; c?: string; eyes?: 'open' | 'closed' | 'half' }> = ({ r = 40, c = COLORS.white, eyes = 'open' }) => (
  <g>
    <circle cx={0} cy={-r} r={r} fill={c} {...lg} />
    {eyes === 'open' && <><circle cx={-r * 0.35} cy={-r * 1.05} r={r * 0.15} fill={COLORS.outline} /><circle cx={r * 0.35} cy={-r * 1.05} r={r * 0.15} fill={COLORS.outline} /></>}
    {eyes === 'closed' && <><path d={`M ${-r * 0.55} ${-r * 1.05} q ${r * 0.2} ${r * 0.18} ${r * 0.4} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d={`M ${r * 0.15} ${-r * 1.05} q ${r * 0.2} ${r * 0.18} ${r * 0.4} 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></>}
    {eyes === 'half' && <><rect x={-r * 0.5} y={-r * 1.1} width={r * 0.3} height={r * 0.12} rx={2} fill={COLORS.outline} /><rect x={r * 0.2} y={-r * 1.1} width={r * 0.3} height={r * 0.12} rx={2} fill={COLORS.outline} /></>}
    <path d={`M ${-r * 1.1} ${r * 1.6} Q 0 ${-r * 0.1} ${r * 1.1} ${r * 1.6} Z`} fill={shade(c, 0.1)} {...xl} />
  </g>
);

/** Unconscious — a dark dormant orb with a flat pulse line. */
export const DormantOrb: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={96} fill={shade(COLORS.purpleDeep, -0.18)} {...xl} />
    <circle cx={0} cy={0} r={96} fill="none" stroke={shade(COLORS.purpleDeep, 0.1)} strokeWidth={STROKE.sm} opacity={0.6} />
    <path d="M -64 0 L 64 0" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M -24 -70 q 10 8 20 0 M 8 -70 q 10 8 20 0" fill="none" stroke={shade(COLORS.purpleDeep, 0.14)} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <text x={0} y={132} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>lights out</text>
  </g>
);

/** Dreaming — a swirling spiral studded with tiny dream icons. */
export const DreamSpiral: React.FC = () => {
  const f = useCurrentFrame();
  const pts = Array.from({ length: 46 }).map((_, i) => {
    const a = i * 0.5 + f / 20; const rad = 6 + i * 2.1;
    return `${Math.cos(a) * rad} ${Math.sin(a) * rad}`;
  });
  return (
    <g>
      <circle cx={0} cy={0} r={100} fill={COLORS.lavender} {...xl} />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.purpleDeep} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={Math.cos(f / 20) * 86} cy={Math.sin(f / 20) * 86} r={12} fill={COLORS.yellow} {...sm} />
      <path d="M -70 -50 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 Z" fill={COLORS.white} {...sm} />
      <text x={0} y={132} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>inward</text>
    </g>
  );
};

/** Autopilot — a figure with a wind-up key, eyes half-open. */
export const AutopilotWind: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <g transform="translate(0 20)"><Fig r={44} c={shade(COLORS.sky, 0.08)} eyes="half" /></g>
      {/* wind-up key behind */}
      <g transform={`translate(0 -18) rotate(${(f * 3) % 360})`}>
        <circle cx={0} cy={0} r={22} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} />
        <rect x={-6} y={-40} width={12} height={22} rx={4} fill={COLORS.ledGrey} {...sm} />
        <rect x={-6} y={18} width={12} height={22} rx={4} fill={COLORS.ledGrey} {...sm} />
      </g>
      <g transform="translate(0 20)"><Fig r={44} c={shade(COLORS.sky, 0.08)} eyes="half" /></g>
      <path d="M 70 -30 l 26 0 M 70 -14 l 20 0" stroke={COLORS.skyDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <text x={0} y={128} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>running on auto</text>
    </g>
  );
};

/** Situational — a radar screen sweeping, with blips noticed. */
export const RadarPing: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f * 4) % 360;
  return (
    <g>
      <circle cx={0} cy={0} r={96} fill={shade(COLORS.greenTeal, 0.1)} {...xl} />
      {[32, 64, 92].map((rr) => <circle key={rr} cx={0} cy={0} r={rr} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} opacity={0.5} />)}
      <line x1={0} y1={0} x2={0} y2={-92} stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" transform={`rotate(${a})`} />
      {([[40, -30], [-50, 20], [24, 60]] as [number, number][]).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill={COLORS.yellow} {...sm} />)}
      <text x={0} y={132} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>here &amp; now</text>
    </g>
  );
};

/** Self-aware — a figure meeting its own reflection in a mirror. */
export const SelfMirror: React.FC = () => (
  <g>
    <g transform="translate(-70 20) scale(0.9)"><Fig r={40} c={COLORS.white} eyes="open" /></g>
    {/* mirror */}
    <g transform="translate(70 -4)">
      <rect x={-52} y={-96} width={104} height={190} rx={52} fill={COLORS.sky} {...xl} />
      <rect x={-40} y={-84} width={80} height={166} rx={40} fill={shade(COLORS.sky, 0.14)} />
      <g transform="translate(0 40) scale(0.72 0.72)"><Fig r={40} c={COLORS.whiteShade} eyes="open" /></g>
    </g>
    <path d="M -26 -40 l 60 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeDasharray="4 8" />
    <text x={0} y={132} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>that's me</text>
  </g>
);

/** Metacognition — a magnifier over a thought-within-a-thought. */
export const MetaLens: React.FC = () => (
  <g>
    <rect x={-96} y={-86} width={150} height={104} rx={28} fill={COLORS.white} {...xl} />
    <circle cx={-66} cy={28} r={10} fill={COLORS.white} {...sm} /><circle cx={-92} cy={48} r={6} fill={COLORS.white} {...sm} />
    {/* inner thought bubble */}
    <rect x={-70} y={-66} width={74} height={54} rx={16} fill={COLORS.lavender} {...sm} />
    <circle cx={-44} cy={-2} r={6} fill={COLORS.lavender} />
    {/* magnifier over it */}
    <g transform="translate(48 2)">
      <circle cx={0} cy={0} r={46} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} />
      <circle cx={0} cy={0} r={40} fill={COLORS.yellowSoft} opacity={0.35} />
      <rect x={30} y={30} width={22} height={54} rx={10} fill={COLORS.outline} transform="rotate(-45 40 40)" />
    </g>
    <text x={0} y={122} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>thinking about thinking</text>
  </g>
);

/** Flow — a figure riding a smooth current, merged with the motion. */
export const FlowCurrent: React.FC = () => {
  const f = useCurrentFrame();
  const dx = 6 * Math.sin(f / 10);
  return (
    <g>
      <path d="M -120 40 Q -40 -10 40 40 Q 120 90 180 40" fill="none" stroke={COLORS.sky} strokeWidth={28} strokeLinecap="round" opacity={0.5} />
      <path d="M -120 70 Q -40 20 40 70 Q 120 120 180 70" fill="none" stroke={COLORS.skyDark} strokeWidth={16} strokeLinecap="round" opacity={0.4} />
      <g transform={`translate(${dx} -6)`}><Fig r={42} c={COLORS.greenLeaf} eyes="closed" /></g>
      {[-90, 90].map((x, i) => <path key={i} d={`M ${x} 30 q 14 -10 28 0`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
      <text x={0} y={128} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>in the zone</text>
    </g>
  );
};

/** Peak — a radiant figure, arms open, under an expanding burst. */
export const OpenSky: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.55 + 0.3 * Math.sin(f / 7);
  return (
    <g>
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={0} y1={-20} x2={0} y2={-132} stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} transform={`rotate(${i * 30} 0 -20)`} strokeLinecap="round" />)}
      <circle cx={0} cy={-20} r={70} fill={COLORS.yellowSoft} opacity={0.4} />
      <g transform="translate(0 30)"><Fig r={40} c={COLORS.white} eyes="closed" /></g>
      {/* open arms */}
      <path d="M -36 10 Q -80 -20 -96 -54 M 36 10 Q 80 -20 96 -54" fill="none" stroke={shade(COLORS.white, 0.1)} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={-96} cy={-54} r={12} fill={COLORS.skin} {...sm} /><circle cx={96} cy={-54} r={12} fill={COLORS.skin} {...sm} />
      <text x={0} y={132} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>wide awake</text>
    </g>
  );
};

/** Concept — a dimmer slider (consciousness is a dial, not a switch). */
export const DimmerSwitch: React.FC = () => {
  const f = useCurrentFrame();
  const t = 0.5 + 0.4 * Math.sin(f / 24);
  const y = 70 - t * 140;
  return (
    <g>
      <rect x={-34} y={-80} width={68} height={160} rx={16} fill={COLORS.wood} {...xl} />
      <rect x={-12} y={-70} width={24} height={140} rx={12} fill={shade(COLORS.outline, 0.3)} {...sm} />
      <circle cx={0} cy={-80} r={30} fill={COLORS.yellow} opacity={t} {...sm} />
      <rect x={-26} y={y - 16} width={52} height={32} rx={8} fill={COLORS.ledGrey} {...lg} />
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>a dial, not a switch</text>
    </g>
  );
};

/** Concept — the quiet observer/veil behind all the levels. */
export const VeilFigure: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.2 * Math.sin(f / 10);
  return (
    <g>
      <circle cx={0} cy={-6} r={90} fill={COLORS.lavender} opacity={0.3} />
      <g transform="translate(0 24)"><Fig r={44} c={COLORS.white} eyes="open" /></g>
      <circle cx={0} cy={-30} r={64} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={g} />
      <text x={0} y={128} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>the watcher</text>
    </g>
  );
};
