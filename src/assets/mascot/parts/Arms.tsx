/**
 * Arms.tsx — A1 connected anatomy. Each arm is ONE continuous limb drawn with
 * the silhouette+inset-fill technique: a thick black polyline (sleeve width +
 * 2*peek) plus a black end-blob forms the unbroken silhouette, then the same
 * polyline/blob in sleeve+skin colors inset by `peek` fills it. No inner outline
 * is ever drawn, so a limb can never show a gap or a double outline. Arms root
 * INSIDE the torso (overlap >= 12px) so the shoulder join is seamless.
 */
import React from 'react';
import { COLORS, STROKE } from '../../../lib/style';

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

type Pt = [number, number];
const PEEK = STROKE.xl / 2; // 7 — matches head/torso outer-black band
const ARM_W = 34;
const HAND_R = 27;

const poly = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');

/** A single continuous limb (arm or leg). */
export const Limb: React.FC<{ pts: Pt[]; width?: number; endR?: number; fill: string; hand?: string; finger?: boolean }> = ({ pts, width = ARM_W, endR = HAND_R, fill, hand, finger }) => {
  const d = poly(pts);
  const [ex, ey] = pts[pts.length - 1];
  const [px, py] = pts[pts.length - 2];
  const ang = Math.atan2(ey - py, ex - px);
  const fx = ex + Math.cos(ang) * (endR + 2);
  const fy = ey + Math.sin(ang) * (endR + 2);
  const handFill = hand ?? fill;
  return (
    <g>
      {/* silhouette (black, union) */}
      <path d={d} fill="none" stroke={COLORS.outline} strokeWidth={width + 2 * PEEK} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={ex} cy={ey} r={endR + PEEK} fill={COLORS.outline} />
      {finger && <circle cx={fx} cy={fy} r={13 + PEEK} fill={COLORS.outline} />}
      {/* fill (inset) */}
      <path d={d} fill="none" stroke={fill} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={ex} cy={ey} r={endR} fill={handFill} />
      {finger && <circle cx={fx} cy={fy} r={13} fill={handFill} />}
    </g>
  );
};

interface ArmSet {
  L: Pt[];
  R: Pt[];
  lFinger?: boolean;
  rFinger?: boolean;
}

const SHOULDER_L: Pt = [-64, 158];
const SHOULDER_R: Pt = [64, 158];

const POSES: Record<Pose, ArmSet> = {
  idle: { L: [SHOULDER_L, [-106, 238], [-112, 300]], R: [SHOULDER_R, [106, 238], [112, 300]] },
  'point-right': { L: [SHOULDER_L, [-104, 240], [-110, 298]], R: [SHOULDER_R, [150, 150], [210, 150]], rFinger: true },
  'point-left': { L: [SHOULDER_L, [-150, 150], [-210, 150]], R: [SHOULDER_R, [104, 240], [110, 298]], lFinger: true },
  shrug: { L: [SHOULDER_L, [-150, 150], [-156, 78]], R: [SHOULDER_R, [150, 150], [156, 78]] },
  'arms-out-presenting': { L: [SHOULDER_L, [-150, 200], [-196, 212]], R: [SHOULDER_R, [150, 200], [196, 212]] },
  startled: { L: [SHOULDER_L, [-128, 70], [-132, -14]], R: [SHOULDER_R, [128, 70], [132, -14]] },
  'hands-on-wheel': { L: [SHOULDER_L, [-70, 236], [-78, 300]], R: [SHOULDER_R, [70, 236], [78, 300]] },
  wave: { L: [SHOULDER_L, [-106, 238], [-112, 300]], R: [SHOULDER_R, [128, 86], [150, 8]] },
  walking: { L: [SHOULDER_L, [-100, 236], [-108, 296]], R: [SHOULDER_R, [100, 236], [108, 296]] },
};

export const Arms: React.FC<{ pose: Pose; sleeve: string; frame?: number }> = ({ pose, sleeve, frame = 0 }) => {
  const def = POSES[pose] ?? POSES.idle;
  let { L, R } = def;
  if (pose === 'walking') {
    const s = Math.sin(frame / 6) * 26;
    L = [SHOULDER_L, [-100, 236 + s], [-108, 296 + s]];
    R = [SHOULDER_R, [100, 236 - s], [108, 296 - s]];
  }
  // Both arms are drawn in the SAME (front) layer, each rooted at its shoulder
  // inside the torso, so they read as symmetrically attached — never hanging.
  return (
    <g>
      <Limb pts={L} fill={sleeve} hand={COLORS.skin} finger={def.lFinger} />
      <Limb pts={R} fill={sleeve} hand={COLORS.skin} finger={def.rFinger} />
    </g>
  );
};

/** sleeve color helper used by Mascot. */
export const sleeveColor = (costume: string): string =>
  costume === 'labcoat' ? COLORS.white : costume === 'pajamas' ? COLORS.yellow : costume === 'suit' ? COLORS.navy : COLORS.hoodie;
