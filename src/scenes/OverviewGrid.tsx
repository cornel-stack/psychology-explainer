/**
 * OverviewGrid (B6/A4) — 5x3 grid inside a 90% safe area. Each cell = badge
 * circle (diameter ~76% of cell width) + label BELOW with a 16px gap and
 * auto-shrinking font, so nothing overlaps (layout is deterministic; the QA
 * overlap assertion recomputes these boxes). Each badge has a UNIQUE mini
 * composition (themed pose/emotion + accent + optional tiny prop) and a darker
 * inner ring. Badges pop in staggered; the whole grid then bobs gently.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps, shade } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { springIn } from '../lib/anim';
import { Mascot, Pose } from '../assets/mascot/Mascot';
import { EmotionName } from '../lib/emotions';
import { PROPS } from '../assets/props/registry';
import { ChapterFlash, BurstBackground, Stage } from './common';

export interface GridItem {
  label: string;
  pose: Pose;
  emotion: EmotionName;
  color: string;
  prop?: string;
}

const COLORS_CYCLE = [COLORS.sky, COLORS.pink, COLORS.yellowSoft, COLORS.lavender, COLORS.greenTeal];

/** Default themed mini-compositions (one per item). */
export const defaultGridItems = (labels: string[]): GridItem[] => {
  const recipes: Omit<GridItem, 'label' | 'color'>[] = [
    { pose: 'startled', emotion: 'scared', prop: 'red-arrow' },
    { pose: 'startled', emotion: 'terrified' },
    { pose: 'idle', emotion: 'scared' },
    { pose: 'point-right', emotion: 'confused' },
    { pose: 'startled', emotion: 'excited', prop: 'lightning-cloud' },
    { pose: 'idle', emotion: 'happy-talk', prop: 'heart' },
    { pose: 'shrug', emotion: 'confused' },
    { pose: 'idle', emotion: 'sleepy', prop: 'zzz-trail' },
    { pose: 'wave', emotion: 'happy-talk', prop: 'teddy-bear' },
    { pose: 'idle', emotion: 'neutral' },
    { pose: 'shrug', emotion: 'neutral' },
    { pose: 'idle', emotion: 'scared', prop: 'sweat-drop' },
    { pose: 'idle', emotion: 'sleepy' },
    { pose: 'wave', emotion: 'happy-talk' },
    { pose: 'arms-out-presenting', emotion: 'excited', prop: 'sparkles' },
  ];
  return labels.slice(0, 15).map((label, i) => ({ label, color: COLORS_CYCLE[i % COLORS_CYCLE.length], ...recipes[i % recipes.length] }));
};

const COLS = 5;
const ROWS = 3;
const MX = CANVAS.width * 0.05;
const MY = CANVAS.height * 0.05;
const CELL_W = (CANVAS.width - 2 * MX) / COLS;
const CELL_H = (CANVAS.height - 2 * MY) / ROWS;
const R = Math.min(CELL_W * 0.38, (CELL_H - 80) / 2);

export const cellLayout = (i: number) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  const cx = MX + CELL_W * (c + 0.5);
  const badgeCy = MY + CELL_H * r + R + 14;
  const labelY = badgeCy + R + 16 + 30;
  return { cx, badgeCy, labelY };
};

export const OverviewGrid: React.FC<{ items: string[] | GridItem[]; chapterStart?: boolean }> = ({ items, chapterStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const list: GridItem[] = typeof items[0] === 'string' ? defaultGridItems(items as string[]) : (items as GridItem[]);
  const groupBob = Math.sin(frame / 22) * 5;

  return (
    <AbsoluteFill>
      <Stage>
        <BurstBackground base={COLORS.bgCream} accent={COLORS.yellow} rays={14} />
      </Stage>
      <AbsoluteFill style={{ transform: `translateY(${groupBob}px)` }}>
        <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
          {list.map((it, i) => {
            const { cx, badgeCy, labelY } = cellLayout(i);
            const pop = springIn(frame, fps, i * 2);
            const fs = Math.min(32, (CELL_W * 0.96) / (it.label.length * 0.52));
            return (
              <g key={i}>
                <g transform={`translate(${cx} ${badgeCy}) scale(${pop})`} style={{ transformOrigin: 'center' }}>
                  <circle r={R} fill={it.color} {...strokeProps(STROKE.lg)} />
                  <circle r={R - 16} fill="none" stroke={shade(it.color, 0.16)} strokeWidth={STROKE.sm} />
                </g>
                {pop > 0.6 && (
                  <text x={cx} y={labelY} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={fs} fill={COLORS.outline} opacity={pop}>
                    {it.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {list.map((it, i) => {
          const { cx, badgeCy } = cellLayout(i);
          const pop = springIn(frame, fps, i * 2);
          if (pop < 0.3) return null;
          const Comp = it.prop ? PROPS[it.prop] : null;
          return (
            <React.Fragment key={i}>
              <Mascot costume="labcoat" pose={it.pose} emotion={it.emotion} x={cx} y={badgeCy + 8} scale={0.3 * pop} seed={i + 20} />
              {Comp && pop > 0.9 && (
                <svg width={120} height={120} viewBox="-60 -60 120 120" style={{ position: 'absolute', left: cx + R - 70, top: badgeCy - R - 6, overflow: 'visible' }}>
                  <g transform="scale(0.42)">
                    <Comp />
                  </g>
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </AbsoluteFill>
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
