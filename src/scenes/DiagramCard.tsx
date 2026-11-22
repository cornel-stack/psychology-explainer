/**
 * DiagramCard — built-in diagrams on cream bg, optionally beside the labcoat
 * mascot pointing.
 *  (a) sleep-stage: AWAKE/REM/DEEP SLEEP bars, marker dot springs to the active
 *      bar, handwritten label writes on.
 *  (b) switchboard: MIND / BODY toggles, each flips (6-frame rotate), LED turns
 *      green(on)/grey(off); the mismatch is the point.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { springIn } from '../lib/anim';
import { ChapterFlash } from './common';
import { Mascot } from '../assets/mascot/Mascot';

const sil = strokeProps(STROKE.sil);
const std = strokeProps(STROKE.std);

const STAGES = [
  { key: 'awake', label: 'AWAKE', color: COLORS.yellow },
  { key: 'rem', label: 'REM', color: COLORS.lavender },
  { key: 'deep', label: 'DEEP SLEEP', color: COLORS.blueDiagram },
];

const SleepStage: React.FC<{ highlight: string; x: number }> = ({ highlight, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.max(0, STAGES.findIndex((s) => s.key === highlight));
  const barH = 120;
  const gap = 28;
  const panelW = 760;
  const dotP = springIn(frame, fps, 16, { damping: 14 });
  const dotY = interpolate(dotP, [0, 1], [barH / 2, active * (barH + gap) + barH / 2]);
  const writeOn = interpolate(frame, [20, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <g transform={`translate(${x} 320)`}>
      <rect x={-30} y={-40} width={panelW + 60} height={3 * barH + 2 * gap + 80} rx={28} fill={COLORS.white} {...sil} />
      {STAGES.map((s, i) => (
        <g key={s.key} transform={`translate(0 ${i * (barH + gap)})`}>
          <rect x={0} y={0} width={panelW} height={barH} rx={24} fill={s.color} {...std} opacity={i === active ? 1 : 0.85} />
          <text x={34} y={barH / 2 + 18} fontFamily={fontFamily} fontWeight={800} fontSize={54} fill={COLORS.outline} opacity={i === active ? writeOn : 0.9} clipPath="none">
            {s.label}
          </text>
        </g>
      ))}
      {/* marker dot */}
      <g transform={`translate(${panelW - 60} ${dotY})`}>
        <circle r={26} fill={COLORS.white} {...std} />
        <circle r={13} fill={COLORS.red} />
      </g>
    </g>
  );
};

const Toggle: React.FC<{ label: string; on: boolean; x: number }> = ({ label, on, x }) => {
  const frame = useCurrentFrame();
  const flip = interpolate(frame, [10, 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const knobX = on ? interpolate(flip, [0, 1], [-54, 54]) : interpolate(flip, [0, 1], [54, -54]) * 0 - 54;
  const led = on ? COLORS.ledGreen : COLORS.ledGrey;
  return (
    <g transform={`translate(${x} 440)`}>
      <rect x={-130} y={-70} width={260} height={200} rx={28} fill={COLORS.white} {...sil} />
      {/* switch track */}
      <rect x={-78} y={-34} width={156} height={78} rx={39} fill={on ? COLORS.greenLeaf : COLORS.ledGrey} opacity={0.4} {...std} />
      <circle cx={knobX} cy={5} r={40} fill={COLORS.white} {...std} />
      {/* LED */}
      <circle cx={0} cy={78} r={16} fill={led} {...strokeProps(4)} />
      <text x={0} y={-90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={48} fill={COLORS.outline}>
        {label}
      </text>
    </g>
  );
};

export const DiagramCard: React.FC<{
  diagram: 'sleep-stage' | 'switchboard';
  highlight?: string;
  withMascot?: boolean;
  chapterStart?: boolean;
}> = ({ diagram, highlight = 'deep', withMascot = true, chapterStart }) => {
  const diagramX = withMascot ? CANVAS.width * 0.42 : CANVAS.width * 0.5 - 380;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
        {diagram === 'sleep-stage' ? (
          <SleepStage highlight={highlight} x={diagramX} />
        ) : (
          <g>
            <Toggle label="MIND" on x={CANVAS.width * 0.52} />
            <Toggle label="BODY" on={false} x={CANVAS.width * 0.74} />
          </g>
        )}
      </svg>
      {withMascot && (
        <Mascot costume="labcoat" pose="point-right" emotion="serious-expert" talking x={CANVAS.width * 0.18} y={CANVAS.height * 0.64} scale={1.0} seed={6} />
      )}
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
