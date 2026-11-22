/**
 * StatCard — big handwritten number pops in center-top (spring 0->1.1->1.0) with
 * a count-up (0 -> value over 20 frames). Below: crowd of 10 stick figures
 * popping in staggered 3 frames apart, the stated fraction filled blue.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { springIn } from '../lib/anim';
import { ChapterFlash } from './common';

const std = strokeProps(STROKE.std);

const StickFigure: React.FC<{ filled: boolean; pop: number }> = ({ filled, pop }) => (
  <g transform={`scale(${pop})`} style={{ transformOrigin: 'center' }}>
    <circle cx={0} cy={-34} r={16} fill={filled ? COLORS.blueDiagram : COLORS.white} {...std} />
    <path d="M 0 -18 L 0 24 M 0 -8 L -20 12 M 0 -8 L 20 12 M 0 24 L -16 54 M 0 24 L 16 54" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.std} strokeLinecap="round" />
    {filled && <path d="M 0 -18 L 0 24 M 0 -8 L -20 12 M 0 -8 L 20 12 M 0 24 L -16 54 M 0 24 L 16 54" fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.std - 3} strokeLinecap="round" />}
  </g>
);

export const StatCard: React.FC<{
  value: number;
  suffix?: string;
  pictogram?: 'crowd' | 'none';
  fraction?: number;
  chapterStart?: boolean;
}> = ({ value, suffix = '%', pictogram = 'crowd', fraction = 0.7, chapterStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = springIn(frame, fps, 4, { damping: 10, mass: 0.8 });
  const scale = interpolate(pop, [0, 0.7, 1], [0, 1.1, 1.0]);
  const count = Math.round(interpolate(frame, [4, 24], [0, value], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const filledCount = Math.round(fraction * 10);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div
        style={{
          position: 'absolute',
          top: 150,
          width: '100%',
          textAlign: 'center',
          fontFamily,
          fontWeight: 800,
          fontSize: 300,
          color: COLORS.yellow,
          WebkitTextStroke: `${STROKE.sil}px ${COLORS.outline}`,
          transform: `scale(${scale}) rotate(-3deg)`,
        }}
      >
        {count}
        {suffix}
      </div>
      {pictogram === 'crowd' && (
        <svg width={CANVAS.width} height={300} viewBox={`0 0 ${CANVAS.width} 300`} style={{ position: 'absolute', top: 720, left: 0 }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const p = springIn(frame, fps, 24 + i * 3);
            const x = CANVAS.width / 2 - 9 * 90 + i * 180 + 40;
            return (
              <g key={i} transform={`translate(${x} 120)`}>
                <StickFigure filled={i < filledCount} pop={p} />
              </g>
            );
          })}
        </svg>
      )}
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
