/**
 * StatCard (B5/A4) — huge handwritten number (>=45% frame height), -3deg tilt,
 * yellow burst behind it + sparkles; count-up. Pictogram crowd of 10 figures
 * (>=22% frame height) directly beneath, filled fraction in accent blue with
 * outline, unfilled outline-only. Figures have round heads attached to bodies.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { springIn } from '../lib/anim';
import { ChapterFlash, BurstBackground, Stage } from './common';
import { Sparkles } from '../assets/props/icons';

/** One continuous little person (head attached to body — A1). */
const Figure: React.FC<{ filled: boolean; pop: number }> = ({ filled, pop }) => {
  const fill = filled ? COLORS.blueDiagram : COLORS.white;
  return (
    <g transform={`scale(${pop})`} style={{ transformOrigin: 'center' }}>
      {/* body silhouette (black) */}
      <path d="M 0 -30 L 0 44 M 0 -14 L -30 18 M 0 -14 L 30 18 M 0 44 L -26 86 M 0 44 L 26 86" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl + 8} strokeLinecap="round" />
      <circle cx={0} cy={-52} r={30} fill={COLORS.outline} />
      {/* fill (inset) */}
      <path d="M 0 -30 L 0 44 M 0 -14 L -30 18 M 0 -14 L 30 18 M 0 44 L -26 86 M 0 44 L 26 86" fill="none" stroke={fill} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={0} cy={-52} r={30 - STROKE.xl / 2} fill={fill} />
    </g>
  );
};

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
  const scale = interpolate(pop, [0, 0.7, 1], [0, 1.12, 1.0]);
  const count = Math.round(interpolate(frame, [4, 24], [0, value], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const filledCount = Math.round(fraction * 10);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <Stage>
        <BurstBackground base={COLORS.bgCream} accent={COLORS.yellow} cx={CANVAS.width / 2} cy={340} rays={12} />
      </Stage>
      {/* sparkles flanking the number in clear space (never over it) */}
      <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(360 300) scale(2.0)`}>
          <Sparkles n={3} />
        </g>
        <g transform={`translate(1560 300) scale(2.0)`}>
          <Sparkles n={3} />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 110,
          width: '100%',
          textAlign: 'center',
          fontFamily,
          fontWeight: 800,
          fontSize: 460,
          lineHeight: 1,
          color: COLORS.yellow,
          WebkitTextStroke: `${STROKE.xl}px ${COLORS.outline}`,
          transform: `scale(${scale}) rotate(-3deg)`,
        }}
      >
        {count}
        {suffix}
      </div>
      {pictogram === 'crowd' && (
        <svg width={CANVAS.width} height={300} viewBox={`0 0 ${CANVAS.width} 300`} style={{ position: 'absolute', top: 700, left: 0 }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const p = springIn(frame, fps, 24 + i * 3);
            const x = CANVAS.width / 2 - 9 * 95 + i * 190;
            return (
              <g key={i} transform={`translate(${x} 150)`}>
                <Figure filled={i < filledCount} pop={p} />
              </g>
            );
          })}
        </svg>
      )}
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
