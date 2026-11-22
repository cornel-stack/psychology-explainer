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
const sm = strokeProps(STROKE.sm);

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

const Lane: React.FC<{ y: number; label: string; color: string; p: number }> = ({ y, label, color, p }) => {
  const w = 760;
  const x0 = CANVAS.width * 0.42;
  const tokenX = x0 + 60 + p * (w - 170);
  return (
    <g transform={`translate(0 ${y})`}>
      <rect x={x0} y={-54} width={w} height={108} rx={54} fill={color} opacity={0.35} {...lg} />
      <text x={x0 + 36} y={14} fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>
        {label}
      </text>
      {/* finish line */}
      <rect x={x0 + w - 70} y={-54} width={16} height={108} fill={COLORS.outline} opacity={0.3} />
      <circle cx={tokenX} cy={0} r={38} fill={color} {...xl} />
    </g>
  );
};

/** FAST vs SLOW signal race. */
const SignalRace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fast = springIn(frame, fps, 6, { damping: 18 });
  const slow = interpolate(frame, [20, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  return (
    <g>
      <Lane y={CANVAS.height * 0.4} label="FAST" color={COLORS.yellow} p={Math.min(1, fast)} />
      <Lane y={CANVAS.height * 0.64} label="SLOW" color={COLORS.blueDiagram} p={slow} />
    </g>
  );
};

/** A meter that fills and overflows. */
const OverflowMeter: React.FC = () => {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [10, 55], [0, 1.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56;
  const top = 300;
  const h = 430;
  const level = top + h - Math.min(1, fill) * h;
  const over = fill > 1;
  return (
    <g>
      <rect x={cx - 110} y={top} width={220} height={h} rx={40} fill={COLORS.white} {...xl} />
      <rect x={cx - 92} y={level} width={184} height={top + h - level} rx={28} fill={COLORS.pink} />
      <rect x={cx - 92} y={level} width={184} height={30} fill={shade(COLORS.pink, 0.16)} />
      {over && [-1, 0, 1].map((d, i) => (
        <path key={i} d={`M ${cx + d * 70} ${top - 6} C ${cx + d * 70 + 14} ${top + 20} ${cx + d * 70 + 14} ${top + 36} ${cx + d * 70} ${top + 44} C ${cx + d * 70 - 14} ${top + 36} ${cx + d * 70 - 14} ${top + 20} ${cx + d * 70} ${top - 6} Z`} fill={COLORS.pink} {...sm} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={cx + 92} y={top + 40 + i * 90} width={30} height={8} rx={4} fill={COLORS.outline} opacity={0.35} />
      ))}
    </g>
  );
};

/** Two gates: one OPEN, one CLOSING. */
const Gate: React.FC<{ x: number; label: string; open: boolean }> = ({ x, label, open }) => {
  const frame = useCurrentFrame();
  const close = interpolate(frame, [12, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gap = open ? 70 : interpolate(close, [0, 1], [70, 6]);
  const tone = open ? COLORS.greenLeaf : COLORS.red;
  return (
    <g transform={`translate(${x} 480)`}>
      <path d="M -150 230 L -150 -40 Q -150 -190 0 -190 Q 150 -190 150 -40 L 150 230 Z" fill={COLORS.woodDark} {...xl} />
      <path d="M -110 230 L -110 -30 Q -110 -150 0 -150 Q 110 -150 110 -30 L 110 230 Z" fill={COLORS.shirtDark} />
      <path d={`M -110 230 L -110 -30 Q -110 -140 ${-gap} -148 L ${-gap} 230 Z`} fill={COLORS.wood} {...lg} />
      <path d={`M 110 230 L 110 -30 Q 110 -140 ${gap} -148 L ${gap} 230 Z`} fill={COLORS.wood} {...lg} />
      <circle cx={0} cy={-230} r={24} fill={tone} {...lg} />
      <text x={0} y={310} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={56} fill={COLORS.outline}>
        {label}
      </text>
    </g>
  );
};

const TwoGates: React.FC = () => (
  <g>
    <Gate x={CANVAS.width * 0.48} label="OPEN" open />
    <Gate x={CANVAS.width * 0.76} label="CLOSING" open={false} />
  </g>
);

/** PAST (faded) vs NOW (bright) split panel. */
const ThenNow: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = springIn(frame, 30, 10, { damping: 16 });
  const x0 = CANVAS.width * 0.34;
  const w = 460;
  const h = 460;
  const y0 = 300;
  const Panel: React.FC<{ x: number; label: string; bg: string; faded?: boolean }> = ({ x, label, bg, faded }) => (
    <g opacity={faded ? 0.55 : 1}>
      <rect x={x} y={y0} width={w} height={h} rx={28} fill={bg} {...xl} />
      <circle cx={x + w * 0.72} cy={y0 + 110} r={54} fill={faded ? shade(COLORS.yellow, 0.1) : COLORS.yellow} {...lg} />
      <path d={`M ${x + 20} ${y0 + h - 40} L ${x + 160} ${y0 + h - 180} L ${x + 260} ${y0 + h - 90} L ${x + 360} ${y0 + h - 210} L ${x + w - 20} ${y0 + h - 40} Z`} fill={faded ? shade(COLORS.greenLeaf, 0.2) : COLORS.greenLeaf} />
      <text x={x + w / 2} y={y0 - 24} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={60} fill={COLORS.outline}>
        {label}
      </text>
    </g>
  );
  return (
    <g transform={`scale(${0.9 + 0.1 * Math.min(1, slide)})`} style={{ transformOrigin: 'center' }}>
      <Panel x={x0} label="PAST" bg={COLORS.wood} faded />
      <Panel x={x0 + w + 40} label="NOW" bg={COLORS.sky} />
      <text x={x0 + w + 20} y={y0 + h / 2 + 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={90} fill={COLORS.outline}>
        ›
      </text>
    </g>
  );
};

export const DiagramCard: React.FC<{
  diagram: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now';
  highlight?: string;
  withMascot?: boolean;
  chapterStart?: boolean;
}> = ({ diagram, highlight = 'deep', chapterStart }) => {
  const accent: Record<string, string> = {
    'sleep-stage': COLORS.lavender,
    switchboard: COLORS.sky,
    'signal-race': COLORS.yellow,
    'overflow-meter': COLORS.pink,
    'two-gates': COLORS.greenLeaf,
    'then-now': COLORS.sky,
  };
  const emo = diagram === 'switchboard' || diagram === 'two-gates' ? 'confused' : diagram === 'overflow-meter' ? 'excited' : 'serious-expert';
  return (
    <AbsoluteFill>
      <Stage>
        <BurstBackground base={COLORS.bgCream} accent={accent[diagram] ?? COLORS.lavender} rays={12} />
      </Stage>
      <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
        {diagram === 'sleep-stage' && <SleepStage highlight={highlight} x={CANVAS.width * 0.42} />}
        {diagram === 'switchboard' && (
          <>
            <Switch label="MIND" on x={CANVAS.width * 0.46} />
            <Switch label="BODY" on={false} x={CANVAS.width * 0.74} />
          </>
        )}
        {diagram === 'signal-race' && <SignalRace />}
        {diagram === 'overflow-meter' && <OverflowMeter />}
        {diagram === 'two-gates' && <TwoGates />}
        {diagram === 'then-now' && <ThenNow />}
      </svg>
      <Mascot costume="labcoat" pose="point-right" emotion={emo} talking x={CANVAS.width * 0.15} y={CANVAS.height * 0.64} scale={1.2} seed={6} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
