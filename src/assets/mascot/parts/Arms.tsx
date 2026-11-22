/**
 * Arms.tsx — stubby arms, pose-dependent. Drawn as capsule strokes in the
 * sleeve color with a round mitten hand (skin) at the end.
 * Shoulders pivot at L(-86,150) R(86,150). Head-centered coords.
 * Front arms are drawn over the torso; some poses draw one arm behind (handled
 * by the `layer` filter so Mascot can split behind/front if needed — here all
 * front for simplicity).
 */
import React from 'react';
import { COLORS, STROKE, strokeProps } from '../../../lib/style';

export type Pose =
  | 'idle'
  | 'point-right'
  | 'point-left'
  | 'shrug'
  | 'arms-out-presenting'
  | 'startled'
  | 'hands-on-wheel'
  | 'wave'
  | 'walking';

const SH = { L: { x: -86, y: 150 }, R: { x: 86, y: 150 } };
const SLEEVE_W = 30;
const HAND_R = 20;

interface ArmDef {
  x: number;
  y: number;
  ex?: number; // elbow
  ey?: number;
  hand?: 'mitten' | 'point' | 'open';
}

const POSES: Record<Pose, { L: ArmDef; R: ArmDef }> = {
  idle: { L: { x: -108, y: 250 }, R: { x: 108, y: 250 } },
  'point-right': { L: { x: -104, y: 250 }, R: { x: 168, y: 150, hand: 'point' } },
  'point-left': { L: { x: -168, y: 150, hand: 'point' }, R: { x: 104, y: 250 } },
  shrug: { L: { x: -156, y: 150, ex: -120, ey: 210, hand: 'open' }, R: { x: 156, y: 150, ex: 120, ey: 210, hand: 'open' } },
  'arms-out-presenting': { L: { x: -164, y: 190, hand: 'open' }, R: { x: 164, y: 190, hand: 'open' } },
  startled: { L: { x: -120, y: 56, hand: 'open' }, R: { x: 120, y: 56, hand: 'open' } },
  'hands-on-wheel': { L: { x: -56, y: 214 }, R: { x: 56, y: 214 } },
  wave: { L: { x: -108, y: 250 }, R: { x: 128, y: 40, ex: 120, ey: 120, hand: 'open' } },
  walking: { L: { x: -112, y: 236 }, R: { x: 112, y: 262 } },
};

const Hand: React.FC<{ x: number; y: number; kind: ArmDef['hand']; dir: 1 | -1 }> = ({ x, y, kind, dir }) => {
  if (kind === 'point') {
    return (
      <g>
        <circle cx={x} cy={y} r={HAND_R} fill={COLORS.skin} {...strokeProps(STROKE.fine)} />
        {/* pointing finger nub */}
        <rect x={dir > 0 ? x + 8 : x - 8 - 22} y={y - 7} width={22} height={14} rx={7} fill={COLORS.skin} {...strokeProps(STROKE.fine)} />
      </g>
    );
  }
  return <circle cx={x} cy={y} r={HAND_R} fill={COLORS.skin} {...strokeProps(STROKE.fine)} />;
};

const Arm: React.FC<{ sh: { x: number; y: number }; arm: ArmDef; sleeve: string; dir: 1 | -1 }> = ({ sh, arm, sleeve, dir }) => {
  const d = arm.ex != null ? `M ${sh.x} ${sh.y} Q ${arm.ex} ${arm.ey} ${arm.x} ${arm.y}` : `M ${sh.x} ${sh.y} L ${arm.x} ${arm.y}`;
  return (
    <g>
      <path d={d} fill="none" stroke={COLORS.outline} strokeWidth={SLEEVE_W + 8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={sleeve} strokeWidth={SLEEVE_W} strokeLinecap="round" strokeLinejoin="round" />
      <Hand x={arm.x} y={arm.y} kind={arm.hand ?? 'mitten'} dir={dir} />
    </g>
  );
};

export const Arms: React.FC<{ pose: Pose; sleeve: string; frame?: number }> = ({ pose, sleeve, frame = 0 }) => {
  const def = POSES[pose] ?? POSES.idle;
  // tiny walking swing
  let L = def.L;
  let R = def.R;
  if (pose === 'walking') {
    const s = Math.sin(frame / 6) * 18;
    L = { ...def.L, y: def.L.y + s };
    R = { ...def.R, y: def.R.y - s };
  }
  return (
    <g>
      <Arm sh={SH.L} arm={L} sleeve={sleeve} dir={-1} />
      <Arm sh={SH.R} arm={R} sleeve={sleeve} dir={1} />
    </g>
  );
};

/** sleeve color helper used by Mascot. */
export const sleeveColor = (costume: string): string =>
  costume === 'labcoat' ? COLORS.white : costume === 'pajamas' ? COLORS.yellow : costume === 'suit' ? COLORS.navy : COLORS.hoodie;
