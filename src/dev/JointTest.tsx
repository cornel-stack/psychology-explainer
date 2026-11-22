/**
 * JointTest (A1) — every pose at 2x zoom on a plain field, to verify limbs are
 * continuous (no gaps / double outlines) at close inspection.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { Mascot, Pose } from '../assets/mascot/Mascot';

const POSES: Pose[] = ['idle', 'point-right', 'point-left', 'shrug', 'arms-out-presenting', 'startled', 'hands-on-wheel', 'wave', 'walking', 'sitting-up-in-bed', 'sleeping-lying', 'face-on-pillow'];

export const JointTest: React.FC = () => {
  const cols = 4;
  const cw = 1920 / cols;
  const rows = Math.ceil(POSES.length / cols);
  const ch = 1300 / rows;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      {POSES.map((pose, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const cx = cw * (c + 0.5);
        const cy = 120 + ch * (r + 0.5);
        return (
          <React.Fragment key={pose}>
            <Mascot costume="hoodie" pose={pose} emotion="happy-talk" accessory="nightcap" x={cx} y={cy} scale={0.62} seed={i + 1} />
            <div style={{ position: 'absolute', left: cx - cw / 2, top: cy + ch / 2 - 40, width: cw, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 30, color: COLORS.outline }}>{pose}</div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
