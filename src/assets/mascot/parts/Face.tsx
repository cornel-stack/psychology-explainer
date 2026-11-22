/**
 * Face.tsx — eyes + brows + mouth + extras, driven by EmotionSpec (A2).
 * Head-centered local coords: head center (0,0), head r 135.
 * Brows are the main emotion carrier — bold (STROKE.lg) and expressive.
 * Every visible pupil gets a flat white highlight dot.
 */
import React from 'react';
import { COLORS, STROKE, strokeProps } from '../../../lib/style';
import { EmotionSpec } from '../../../lib/emotions';

const EYE_X = 54;
const EYE_Y = -4;
const BROW_Y = -58;
const MOUTH_Y = 58;

const sm = strokeProps(STROKE.sm);
const brow = strokeProps(STROKE.lg); // bold brows

const Highlight: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 6 }) => <circle cx={x} cy={y} r={r} fill={COLORS.white} />;

// ---------- Eyes ----------
const Eye: React.FC<{ x: number; spec: EmotionSpec; blinking: boolean }> = ({ x, spec, blinking }) => {
  const s = spec.eyes;
  const hx = x - 7;
  if (blinking && ['oval', 'open', 'wide', 'shrunk', 'white-wide'].includes(s)) {
    return <path d={`M ${x - 22} ${EYE_Y} Q ${x} ${EYE_Y + 14} ${x + 22} ${EYE_Y}`} fill="none" {...strokeProps(STROKE.sm)} />;
  }
  switch (s) {
    case 'oval':
      return (
        <g>
          <ellipse cx={x} cy={EYE_Y} rx={18} ry={25} fill={COLORS.outline} />
          <Highlight x={hx} y={EYE_Y - 9} />
        </g>
      );
    case 'open':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={25} fill={COLORS.outline} />
          <Highlight x={hx} y={EYE_Y - 9} r={7} />
        </g>
      );
    case 'wide':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={31} fill={COLORS.outline} />
          <Highlight x={x - 10} y={EYE_Y - 11} r={9} />
        </g>
      );
    case 'half':
      return (
        <g>
          <path d={`M ${x - 26} ${EYE_Y - 2} Q ${x} ${EYE_Y - 18} ${x + 26} ${EYE_Y - 2}`} fill="none" {...strokeProps(STROKE.sm)} />
          <path d={`M ${x - 24} ${EYE_Y} A 24 20 0 0 0 ${x + 24} ${EYE_Y} Z`} fill={COLORS.outline} />
        </g>
      );
    case 'shrunk':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={27} fill={COLORS.white} {...sm} />
          <circle cx={x} cy={EYE_Y} r={8} fill={COLORS.outline} />
        </g>
      );
    case 'white-wide':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={33} fill={COLORS.white} {...sm} />
          <circle cx={x} cy={EYE_Y + 2} r={6} fill={COLORS.outline} />
        </g>
      );
    case 'closed-peaceful':
      // gentle downward arc — calm, sleeping
      return <path d={`M ${x - 24} ${EYE_Y - 2} Q ${x} ${EYE_Y + 14} ${x + 24} ${EYE_Y - 2}`} fill="none" {...strokeProps(STROKE.lg)} />;
    case 'closed-smile':
    case 'clench':
      return <path d={`M ${x - 24} ${EYE_Y + 10} L ${x} ${EYE_Y - 12} L ${x + 24} ${EYE_Y + 10}`} fill="none" {...strokeProps(STROKE.sm)} />;
    default:
      return null;
  }
};

// ---------- Brows ----------
const Brow: React.FC<{ side: -1 | 1; spec: EmotionSpec }> = ({ side, spec }) => {
  const x = side * EYE_X;
  const len = 42;
  const inner = x - side * len * 0.5;
  const outer = x + side * len * 0.5;
  const s = spec.brows;
  let d = '';
  switch (s) {
    case 'flat':
      d = `M ${inner} ${BROW_Y} L ${outer} ${BROW_Y}`;
      break;
    case 'raised':
      d = `M ${inner} ${BROW_Y - 10} Q ${x} ${BROW_Y - 20} ${outer} ${BROW_Y - 10}`;
      break;
    case 'high':
      d = `M ${inner} ${BROW_Y - 22} Q ${x} ${BROW_Y - 34} ${outer} ${BROW_Y - 22}`;
      break;
    case 'droopy':
      d = `M ${inner} ${BROW_Y + 10} Q ${x} ${BROW_Y + 2} ${outer} ${BROW_Y - 10}`;
      break;
    case 'worried':
      d = `M ${inner} ${BROW_Y - 14} Q ${x} ${BROW_Y + 6} ${outer} ${BROW_Y - 6}`;
      break;
    case 'angry':
      d = `M ${inner} ${BROW_Y + 12} L ${outer} ${BROW_Y - 12}`;
      break;
    case 'stern': // serious-expert: heavy straight low brows
      d = `M ${inner} ${BROW_Y + 4} L ${outer} ${BROW_Y}`;
      break;
    case 'smug': // one raised, one normal
      d = side > 0 ? `M ${inner} ${BROW_Y - 24} Q ${x} ${BROW_Y - 34} ${outer} ${BROW_Y - 22}` : `M ${inner} ${BROW_Y} L ${outer} ${BROW_Y}`;
      break;
    case 'asym':
      d = side < 0 ? `M ${inner} ${BROW_Y + 10} L ${outer} ${BROW_Y - 10}` : `M ${inner} ${BROW_Y - 20} Q ${x} ${BROW_Y - 30} ${outer} ${BROW_Y - 20}`;
      break;
  }
  return <path d={d} fill="none" {...brow} />;
};

// ---------- Mouth ----------
const Mouth: React.FC<{ spec: EmotionSpec; talk: number }> = ({ spec, talk }) => {
  switch (spec.mouth) {
    case 'smile-sm':
      return <path d={`M -24 ${MOUTH_Y} Q 0 ${MOUTH_Y + 20} 24 ${MOUTH_Y}`} fill="none" {...sm} />;
    case 'smirk':
      return <path d={`M -20 ${MOUTH_Y + 2} Q 6 ${MOUTH_Y + 16} 28 ${MOUTH_Y - 6}`} fill="none" {...sm} />;
    case 'talk': {
      if (talk < 0.2) return <path d={`M -22 ${MOUTH_Y} Q 0 ${MOUTH_Y + 16} 22 ${MOUTH_Y}`} fill="none" {...sm} />;
      const ry = 8 + talk * 18;
      return (
        <g>
          <ellipse cx={0} cy={MOUTH_Y + 6} rx={21} ry={ry} fill={COLORS.outline} />
          <ellipse cx={0} cy={MOUTH_Y + 6 + ry * 0.42} rx={11} ry={ry * 0.4} fill={COLORS.pink} />
        </g>
      );
    }
    case 'open-big':
      return (
        <g>
          <ellipse cx={0} cy={MOUTH_Y + 8} rx={27} ry={27} fill={COLORS.outline} />
          <ellipse cx={0} cy={MOUTH_Y + 23} rx={15} ry={11} fill={COLORS.pink} />
        </g>
      );
    case 'wavy-sm':
      return <path d={`M -15 ${MOUTH_Y} q 8 9 15 0`} fill="none" {...sm} />;
    case 'dot':
      return <circle cx={0} cy={MOUTH_Y + 4} r={8} fill={COLORS.outline} />;
    case 'wavy':
      return <path d={`M -24 ${MOUTH_Y} q 8 -10 15 0 q 8 10 15 0`} fill="none" {...sm} />;
    case 'scream':
      return (
        <g>
          <ellipse cx={0} cy={MOUTH_Y + 10} rx={23} ry={31} fill={COLORS.outline} />
          <ellipse cx={0} cy={MOUTH_Y + 27} rx={13} ry={11} fill={COLORS.pink} />
        </g>
      );
    case 'flat':
      return <path d={`M -22 ${MOUTH_Y + 4} L 22 ${MOUTH_Y + 4}`} fill="none" {...sm} />;
    case 'grimace':
      return (
        <g>
          <rect x={-30} y={MOUTH_Y - 6} width={60} height={28} rx={11} fill={COLORS.white} {...sm} />
          <path d={`M -10 ${MOUTH_Y - 6} L -10 ${MOUTH_Y + 22} M 10 ${MOUTH_Y - 6} L 10 ${MOUTH_Y + 22} M -30 ${MOUTH_Y + 8} L 30 ${MOUTH_Y + 8}`} {...strokeProps(STROKE.sm)} />
        </g>
      );
    default:
      return null;
  }
};

// ---------- Extras ----------
const Extras: React.FC<{ spec: EmotionSpec; frame: number; fps: number }> = ({ spec, frame, fps }) => {
  switch (spec.extra) {
    case 'sparkles':
      return (
        <g fill={COLORS.yellow} {...strokeProps(STROKE.sm)}>
          {[[-152, -120, 0], [150, -110, 1.3], [128, -6, 2.6]].map(([x, y, p], i) => {
            const r = 18 * (1 + 0.15 * Math.sin(frame / 7 + p));
            return <path key={i} d={`M ${x} ${y - r} L ${x + r * 0.33} ${y - r * 0.33} L ${x + r} ${y} L ${x + r * 0.33} ${y + r * 0.33} L ${x} ${y + r} L ${x - r * 0.33} ${y + r * 0.33} L ${x - r} ${y} L ${x - r * 0.33} ${y - r * 0.33} Z`} />;
          })}
        </g>
      );
    case 'zzz':
      return (
        <g fill={COLORS.purpleDeep} fontFamily="Baloo 2" fontWeight={800}>
          {[0, 1, 2].map((i) => (
            <text key={i} x={118 + i * 36} y={-116 - i * 34} fontSize={36 + i * 12} opacity={0.5 + 0.5 * Math.abs(Math.sin(frame / 14 - i))}>
              z
            </text>
          ))}
        </g>
      );
    case 'question': {
      const s = Math.min(1, Math.max(0.2, (frame % 70) / 10));
      return (
        <text x={118} y={-120} fontSize={104} fontFamily="Baloo 2" fontWeight={800} fill={COLORS.yellow} stroke={COLORS.outline} strokeWidth={STROKE.sm} transform={`scale(${s})`} transform-origin="118 -120">
          ?
        </text>
      );
    }
    case 'sweat': {
      const sc = 1 + 0.15 * Math.abs(Math.sin((frame / (fps * 0.5)) * Math.PI));
      return (
        <g transform={`translate(116 -44) scale(${sc})`}>
          <path d="M 0 -22 C 16 4 16 18 0 26 C -16 18 -16 4 0 -22 Z" fill={COLORS.sky} {...strokeProps(STROKE.sm)} />
          <ellipse cx={-5} cy={8} rx={4} ry={7} fill={COLORS.white} opacity={0.85} />
        </g>
      );
    }
    case 'tick':
      return (
        <g {...strokeProps(STROKE.sm)} stroke={COLORS.red}>
          <path d="M 96 -120 L 130 -96 M 130 -120 L 96 -96 M 113 -132 L 113 -84" />
        </g>
      );
    default:
      return null;
  }
};

export const Face: React.FC<{ spec: EmotionSpec; talk: number; blinking: boolean; frame: number; fps: number; look?: number }> = ({ spec, talk, blinking, frame, fps, look = 0 }) => (
  <g>
    {/* blush: identical, symmetric */}
    <ellipse cx={-80} cy={38} rx={25} ry={16} fill={COLORS.pink} />
    <ellipse cx={80} cy={38} rx={25} ry={16} fill={COLORS.pink} />
    <g transform={`translate(${look} 0)`}>
      <Brow side={-1} spec={spec} />
      <Brow side={1} spec={spec} />
      <Eye x={-EYE_X} spec={spec} blinking={blinking} />
      <Eye x={EYE_X} spec={spec} blinking={blinking} />
    </g>
    <Mouth spec={spec} talk={talk} />
    <Extras spec={spec} frame={frame} fps={fps} />
  </g>
);
