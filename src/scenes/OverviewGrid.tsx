/**
 * OverviewGrid — 5x3 grid of circular badges (retention hook, shown once after
 * item 1). Each badge: colored flat circle + mini mascot + handwritten label.
 * Badges pop in staggered 2 frames apart (spring), then the whole grid holds
 * with a gentle group bob.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { springIn } from '../lib/anim';
import { Mascot, Pose } from '../assets/mascot/Mascot';
import { EmotionName } from '../lib/emotions';
import { ChapterFlash } from './common';

const std = strokeProps(STROKE.std);

const BADGE_COLORS = [COLORS.sky, COLORS.pink, COLORS.yellowSoft, COLORS.lavender, COLORS.greenTeal];
const POSES: Pose[] = ['idle', 'wave', 'point-right', 'shrug', 'startled'];
const EMOS: EmotionName[] = ['happy-talk', 'excited', 'sleepy', 'confused', 'neutral'];

export const OverviewGrid: React.FC<{ items: string[]; chapterStart?: boolean }> = ({ items, chapterStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cols = 5;
  const rows = 3;
  const list = items.slice(0, 15);
  const cellW = CANVAS.width / (cols + 1);
  const cellH = (CANVAS.height - 120) / (rows + 0.4);
  const groupBob = Math.sin(frame / 22) * 5;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <AbsoluteFill style={{ transform: `translateY(${groupBob}px)` }}>
        <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
          {list.map((label, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const cx = cellW * (c + 1);
            const cy = 170 + cellH * (r + 0.5);
            const pop = springIn(frame, fps, i * 2);
            const R = 115;
            return (
              <g key={i} transform={`translate(${cx} ${cy}) scale(${pop})`} style={{ transformOrigin: 'center' }}>
                <circle r={R} fill={BADGE_COLORS[i % BADGE_COLORS.length]} {...std} />
                <text x={0} y={R + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={34} fill={COLORS.outline}>
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
        {list.map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const cx = cellW * (c + 1);
          const cy = 170 + cellH * (r + 0.5);
          const pop = springIn(frame, fps, i * 2);
          if (pop < 0.2) return null;
          return (
            <Mascot key={i} costume="labcoat" pose={POSES[i % POSES.length]} emotion={EMOS[i % EMOS.length]} x={cx} y={cy + 6} scale={0.26 * pop} seed={i + 20} />
          );
        })}
      </AbsoluteFill>
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
