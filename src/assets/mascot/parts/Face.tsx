/**
 * Face.tsx — eyes + brows + mouth + extras, driven by EmotionSpec.
 * Drawn in head-centered local coordinates: head center = (0,0), head r = 135.
 * All strokes use STROKE.fine (6) for features.
 */
import React from 'react';
import { COLORS, STROKE, strokeProps } from '../../../lib/style';
import { EmotionSpec } from '../../../lib/emotions';

const EYE_X = 52;
const EYE_Y = -2;
const BROW_Y = -60;
const MOUTH_Y = 60;

const fine = strokeProps(STROKE.fine);

// ---------- Eyes ----------
const Eye: React.FC<{ x: number; spec: EmotionSpec; blinking: boolean }> = ({ x, spec, blinking }) => {
  const s = spec.eyes;
  if (blinking && ['oval', 'open', 'wide', 'shrunk', 'white-wide'].includes(s)) {
    // blink: short downward arc
    return <path d={`M ${x - 20} ${EYE_Y} Q ${x} ${EYE_Y + 12} ${x + 20} ${EYE_Y}`} fill="none" {...fine} />;
  }
  switch (s) {
    case 'oval':
      return <ellipse cx={x} cy={EYE_Y} rx={17} ry={24} fill={COLORS.outline} />;
    case 'open':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={24} fill={COLORS.outline} />
          <circle cx={x - 7} cy={EYE_Y - 8} r={6} fill={COLORS.white} />
        </g>
      );
    case 'wide':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={30} fill={COLORS.outline} />
          <circle cx={x - 9} cy={EYE_Y - 10} r={8} fill={COLORS.white} />
        </g>
      );
    case 'half':
      return (
        <g>
          <path d={`M ${x - 24} ${EYE_Y} Q ${x} ${EYE_Y - 14} ${x + 24} ${EYE_Y}`} fill="none" {...fine} />
          <ellipse cx={x} cy={EYE_Y + 7} rx={14} ry={9} fill={COLORS.outline} />
        </g>
      );
    case 'shrunk':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={26} fill={COLORS.white} {...fine} />
          <circle cx={x} cy={EYE_Y} r={7} fill={COLORS.outline} />
        </g>
      );
    case 'white-wide':
      return (
        <g>
          <circle cx={x} cy={EYE_Y} r={32} fill={COLORS.white} {...fine} />
          <circle cx={x} cy={EYE_Y} r={5} fill={COLORS.outline} />
        </g>
      );
    case 'closed-smile':
    case 'clench':
      // squeezed-shut >< : caret pointing up
      return (
        <path
          d={`M ${x - 22} ${EYE_Y + 8} L ${x} ${EYE_Y - 10} L ${x + 22} ${EYE_Y + 8}`}
          fill="none"
          {...fine}
        />
      );
    default:
      return null;
  }
};

// ---------- Brows ----------
const Brow: React.FC<{ side: -1 | 1; spec: EmotionSpec }> = ({ side, spec }) => {
  const x = side * EYE_X;
  const len = 38;
  const inner = x - side * len * 0.5;
  const outer = x + side * len * 0.5;
  const s = spec.brows;
  let d = '';
  switch (s) {
    case 'flat':
      d = `M ${inner} ${BROW_Y} L ${outer} ${BROW_Y}`;
      break;
    case 'raised':
      d = `M ${inner} ${BROW_Y - 8} Q ${x} ${BROW_Y - 16} ${outer} ${BROW_Y - 8}`;
      break;
    case 'high':
      d = `M ${inner} ${BROW_Y - 18} Q ${x} ${BROW_Y - 28} ${outer} ${BROW_Y - 18}`;
      break;
    case 'droopy':
      d = `M ${inner} ${BROW_Y + 6} L ${outer} ${BROW_Y - 6}`; // outer up, inner down
      break;
    case 'worried':
      d = `M ${inner} ${BROW_Y - 10} Q ${x} ${BROW_Y + 2} ${outer} ${BROW_Y - 4}`;
      break;
    case 'angry': // confident/determined: inner down toward nose
      d = `M ${inner} ${BROW_Y + 8} L ${outer} ${BROW_Y - 8}`;
      break;
    case 'asym':
      d = side < 0 ? `M ${inner} ${BROW_Y + 8} L ${outer} ${BROW_Y - 8}` : `M ${inner} ${BROW_Y - 16} Q ${x} ${BROW_Y - 24} ${outer} ${BROW_Y - 16}`;
      break;
  }
  return <path d={d} fill="none" {...fine} strokeWidth={STROKE.fine + 1} />;
};

// ---------- Mouth ----------
const Mouth: React.FC<{ spec: EmotionSpec; talk: number }> = ({ spec, talk }) => {
  switch (spec.mouth) {
    case 'smile-sm':
      return <path d={`M -22 ${MOUTH_Y} Q 0 ${MOUTH_Y + 18} 22 ${MOUTH_Y}`} fill="none" {...fine} />;
    case 'talk': {
      const open = talk;
      if (open < 0.2) return <path d={`M -22 ${MOUTH_Y} Q 0 ${MOUTH_Y + 16} 22 ${MOUTH_Y}`} fill="none" {...fine} />;
      const ry = 8 + open * 18;
      return (
        <g>
          <ellipse cx={0} cy={MOUTH_Y + 6} rx={20} ry={ry} fill={COLORS.outline} />
          <ellipse cx={0} cy={MOUTH_Y + 6 + ry * 0.4} rx={10} ry={ry * 0.4} fill={COLORS.pink} />
        </g>
      );
    }
    case 'open-big':
      return (
        <g>
          <ellipse cx={0} cy={MOUTH_Y + 8} rx={26} ry={26} fill={COLORS.outline} />
          <ellipse cx={0} cy={MOUTH_Y + 22} rx={14} ry={10} fill={COLORS.pink} />
        </g>
      );
    case 'wavy-sm':
      return <path d={`M -14 ${MOUTH_Y} q 7 8 14 0`} fill="none" {...fine} />;
    case 'dot':
      return <circle cx={0} cy={MOUTH_Y + 4} r={7} fill={COLORS.outline} />;
    case 'wavy':
      return <path d={`M -22 ${MOUTH_Y} q 7 -9 14 0 q 7 9 14 0`} fill="none" {...fine} />;
    case 'scream':
      return (
        <g>
          <ellipse cx={0} cy={MOUTH_Y + 10} rx={22} ry={30} fill={COLORS.outline} />
          <ellipse cx={0} cy={MOUTH_Y + 26} rx={12} ry={10} fill={COLORS.pink} />
        </g>
      );
    case 'flat':
      return <path d={`M -20 ${MOUTH_Y + 4} L 20 ${MOUTH_Y + 4}`} fill="none" {...fine} />;
    case 'grimace':
      return (
        <g>
          <rect x={-28} y={MOUTH_Y - 6} width={56} height={26} rx={10} fill={COLORS.white} {...fine} />
          <path d={`M -10 ${MOUTH_Y - 6} L -10 ${MOUTH_Y + 20} M 10 ${MOUTH_Y - 6} L 10 ${MOUTH_Y + 20} M -28 ${MOUTH_Y + 7} L 28 ${MOUTH_Y + 7}`} {...strokeProps(3)} />
        </g>
      );
    default:
      return null;
  }
};

// ---------- Extras ----------
const Extras: React.FC<{ spec: EmotionSpec; frame: number; fps: number }> = ({ spec, frame, fps }) => {
  const twinkle = (phase: number) => 0.4 + 0.6 * Math.abs(Math.sin(frame / 8 + phase));
  switch (spec.extra) {
    case 'sparkles':
      return (
        <g fill={COLORS.yellow} {...strokeProps(3)}>
          {[[-150, -120, 0], [150, -110, 1.3], [120, -10, 2.6]].map(([x, y, p], i) => (
            <path key={i} opacity={twinkle(p)} d={`M ${x} ${y - 16} L ${x + 5} ${y - 5} L ${x + 16} ${y} L ${x + 5} ${y + 5} L ${x} ${y + 16} L ${x - 5} ${y + 5} L ${x - 16} ${y} L ${x - 5} ${y - 5} Z`} />
          ))}
        </g>
      );
    case 'zzz':
      return (
        <g fill={COLORS.purpleDeep} fontFamily="Baloo 2" fontWeight={700}>
          {[0, 1, 2].map((i) => (
            <text key={i} x={120 + i * 34} y={-120 - i * 34} fontSize={34 + i * 10} opacity={0.5 + 0.5 * Math.abs(Math.sin(frame / 14 - i))}>
              z
            </text>
          ))}
        </g>
      );
    case 'question': {
      const s = Math.min(1, Math.max(0, (frame % 60) / 10));
      return (
        <text x={110} y={-130} fontSize={96} fontFamily="Baloo 2" fontWeight={800} fill={COLORS.yellow} stroke={COLORS.outline} strokeWidth={4} transform={`scale(${s})`} transform-origin="110 -130">
          ?
        </text>
      );
    }
    case 'sweat': {
      const sc = 1 + 0.15 * Math.abs(Math.sin(frame / (fps * 0.5) * Math.PI));
      return (
        <g transform={`translate(110 -40) scale(${sc})`}>
          <path d="M 0 -18 C 14 2 14 14 0 20 C -14 14 -14 2 0 -18 Z" fill={COLORS.sky} {...strokeProps(4)} />
          <ellipse cx={-4} cy={6} rx={3} ry={5} fill={COLORS.white} opacity={0.8} />
        </g>
      );
    }
    case 'tick':
      return (
        <g {...strokeProps(5)} stroke={COLORS.red}>
          <path d="M 96 -118 L 128 -96 M 128 -118 L 96 -96 M 112 -130 L 112 -86" />
        </g>
      );
    default:
      return null;
  }
};

export const Face: React.FC<{ spec: EmotionSpec; talk: number; blinking: boolean; frame: number; fps: number; look?: number }> = ({ spec, talk, blinking, frame, fps, look = 0 }) => (
  <g>
    {/* blush */}
    <ellipse cx={-78} cy={40} rx={24} ry={15} fill={COLORS.pink} />
    <ellipse cx={78} cy={40} rx={24} ry={15} fill={COLORS.pink} />
    {/* eyes + brows shift slightly with gaze (lookDir) */}
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
