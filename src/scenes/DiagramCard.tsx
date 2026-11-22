/**
 * DiagramCard (B3/B4/A4) — built-in diagrams on a burst bg, with the labcoat
 * mascot reacting (every explainer-type frame includes the mascot).
 *  (a) sleep-stage: AWAKE/REM/DEEP SLEEP bars + per-bar icon (sun/eye/zzz),
 *      marker dot springs to the active bar with a bounce, labels bold.
 *  (b) switchboard: big chunky MIND/BODY switches (>=45% height) with side-shade
 *      housings, large LEDs; the MIND-on/BODY-off mismatch is the point.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps, shade } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { springIn } from '../lib/anim';
import { ChapterFlash, BurstBackground, Stage } from './common';
import { Mascot } from '../assets/mascot/Mascot';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);

const STAGES = [
  { key: 'awake', label: 'AWAKE', color: COLORS.yellow, icon: 'sun' },
  { key: 'rem', label: 'REM', color: COLORS.lavender, icon: 'eye' },
  { key: 'deep', label: 'DEEP SLEEP', color: COLORS.blueDiagram, icon: 'zzz' },
] as const;

const BarIcon: React.FC<{ kind: string }> = ({ kind }) => {
  if (kind === 'sun')
    return (
      <g stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round">
        <circle r={20} fill={COLORS.yellow} />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <line key={i} x1={Math.cos(a) * 26} y1={Math.sin(a) * 26} x2={Math.cos(a) * 38} y2={Math.sin(a) * 38} />;
        })}
      </g>
    );
  if (kind === 'eye')
    return (
      <g>
        <path d="M -34 0 Q 0 -28 34 0 Q 0 28 -34 0 Z" fill={COLORS.white} {...strokeProps(STROKE.sm)} />
        <circle r={12} fill={COLORS.outline} />
      </g>
    );
  return (
    <g fill={COLORS.outline} fontFamily={fontFamily} fontWeight={800}>
      <text x={-30} y={6} fontSize={26}>
        z
      </text>
      <text x={-6} y={-6} fontSize={34}>
        z
      </text>
    </g>
  );
};

const SleepStage: React.FC<{ highlight: string; x: number }> = ({ highlight, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.max(0, STAGES.findIndex((s) => s.key === highlight));
  const barH = 150;
  const gap = 34;
  const panelW = 880;
  const dotP = springIn(frame, fps, 16, { damping: 9, mass: 0.7 });
  const dotY = interpolate(dotP, [0, 1], [barH / 2, active * (barH + gap) + barH / 2]);
  const writeOn = interpolate(frame, [20, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <g transform={`translate(${x} 240)`}>
      <rect x={-36} y={-44} width={panelW + 72} height={3 * barH + 2 * gap + 88} rx={34} fill={COLORS.white} {...xl} />
      {STAGES.map((s, i) => (
        <g key={s.key} transform={`translate(0 ${i * (barH + gap)})`}>
          <rect x={0} y={0} width={panelW} height={barH} rx={28} fill={s.color} {...lg} opacity={i === active ? 1 : 0.8} />
          <rect x={0} y={barH - 34} width={panelW} height={34} rx={16} fill={shade(s.color, 0.18)} opacity={0.5} />
          <g transform={`translate(70 ${barH / 2})`}>
            <BarIcon kind={s.icon} />
          </g>
          <text x={140} y={barH / 2 + 22} fontFamily={fontFamily} fontWeight={800} fontSize={66} fill={COLORS.outline} opacity={i === active ? writeOn : 0.85}>
            {s.label}
          </text>
        </g>
      ))}
      <g transform={`translate(${panelW - 70} ${dotY})`}>
        <circle r={30} fill={COLORS.white} {...lg} />
        <circle r={15} fill={COLORS.red} />
      </g>
    </g>
  );
};

const Switch: React.FC<{ label: string; on: boolean; x: number }> = ({ label, on, x }) => {
  const frame = useCurrentFrame();
  const flip = interpolate(frame, [10, 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const knobX = on ? interpolate(flip, [0, 1], [-90, 90]) : -90;
  const led = on ? COLORS.ledGreen : COLORS.ledGrey;
  const housingW = 340;
  const housingH = 440;
  return (
    <g transform={`translate(${x} 540)`}>
      {/* housing + side shade */}
      <rect x={-housingW / 2} y={-housingH / 2} width={housingW} height={housingH} rx={40} fill={COLORS.white} {...xl} />
      <rect x={housingW / 2 - 50} y={-housingH / 2} width={50} height={housingH} rx={24} fill={shade(COLORS.white, 0.1)} />
      {/* track */}
      <rect x={-130} y={-60} width={260} height={130} rx={65} fill={on ? COLORS.greenLeaf : COLORS.ledGrey} opacity={0.5} {...lg} />
      <circle cx={knobX} cy={5} r={66} fill={COLORS.white} {...lg} />
      <circle cx={knobX} cy={5} r={40} fill={shade(COLORS.white, 0.08)} />
      {/* LED */}
      <circle cx={0} cy={140} r={26} fill={led} {...lg} />
      {/* label */}
      <text x={0} y={-150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={90} fill={COLORS.outline} transform="rotate(-2)">
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
}> = ({ diagram, highlight = 'deep', chapterStart }) => {
  return (
    <AbsoluteFill>
      <Stage>
        <BurstBackground base={COLORS.bgCream} accent={diagram === 'switchboard' ? COLORS.sky : COLORS.lavender} rays={12} />
      </Stage>
      <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
        {diagram === 'sleep-stage' ? (
          <SleepStage highlight={highlight} x={CANVAS.width * 0.42} />
        ) : (
          <>
            <Switch label="MIND" on x={CANVAS.width * 0.46} />
            <Switch label="BODY" on={false} x={CANVAS.width * 0.74} />
          </>
        )}
      </svg>
      <Mascot
        costume="labcoat"
        pose="point-right"
        emotion={diagram === 'switchboard' ? 'confused' : 'serious-expert'}
        talking
        x={CANVAS.width * 0.16}
        y={CANVAS.height * 0.62}
        scale={1.25}
        seed={6}
      />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
