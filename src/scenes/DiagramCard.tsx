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

/** A meter that fills to the brim and then keeps spilling droplets over the top. */
const OverflowMeter: React.FC = () => {
  const frame = useCurrentFrame();
  // fill reaches the brim by frame 36, then holds just over it (sustained spill)
  const fill = interpolate(frame, [8, 36], [0, 1.06], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56;
  const top = 300;
  const h = 430;
  const level = top + h - Math.min(1, fill) * h;
  const spilling = fill >= 1;
  const drop = (col: number, phase: number) => {
    // each droplet falls from the brim, loops; visible for the whole spill window
    const t = ((frame - 36) * 4 + phase) % 150;
    const y = top - 10 + Math.max(0, t) * 1.0;
    const x = cx + col;
    return (
      <path key={`${col}-${phase}`} d={`M ${x} ${y - 20} C ${x + 15} ${y + 6} ${x + 15} ${y + 22} ${x} ${y + 30} C ${x - 15} ${y + 22} ${x - 15} ${y + 6} ${x} ${y - 20} Z`} fill={COLORS.pink} {...sm} />
    );
  };
  return (
    <g>
      <rect x={cx - 110} y={top} width={220} height={h} rx={40} fill={COLORS.white} {...xl} />
      <rect x={cx - 92} y={level} width={184} height={top + h - level} rx={28} fill={COLORS.pink} />
      <rect x={cx - 92} y={level} width={184} height={28} fill={shade(COLORS.pink, 0.16)} />
      {/* overflow lip + falling droplets on both sides */}
      {spilling && (
        <g>
          <path d={`M ${cx - 110} ${top + 2} Q ${cx} ${top - 26} ${cx + 110} ${top + 2}`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" />
          {drop(-120, 0)}
          {drop(-120, 90)}
          {drop(120, 45)}
          {drop(120, 120)}
        </g>
      )}
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

/** Two-path decision fork: situation splits into a biased (✗) and a true (✓) path. */
const DecisionFork: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [situation = 'YOUR BRAIN', biased = 'the easy story', real = 'what’s actually true'] = labels;
  const pL = springIn(frame, fps, 14, { damping: 14 });
  const pR = springIn(frame, fps, 22, { damping: 14 });
  const cx = CANVAS.width * 0.56;
  const box = (x: number, y: number, w: number, h: number, fill: string, p: number) => (
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={22} fill={fill} transform={`scale(${p})`} transform-origin={`${x} ${y}`} {...lg} />
  );
  const wrap = (s: string, n = 16) => {
    const words = s.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > n) {
        lines.push(cur.trim());
        cur = w;
      } else cur += ' ' + w;
    }
    if (cur.trim()) lines.push(cur.trim());
    return lines;
  };
  const Label: React.FC<{ x: number; y: number; text: string; size: number; color?: string }> = ({ x, y, text, size, color = COLORS.outline }) => {
    const lines = wrap(text, 18);
    return (
      <g fill={color} fontFamily={fontFamily} fontWeight={700} textAnchor="middle">
        {lines.map((ln, i) => (
          <text key={i} x={x} y={y + (i - (lines.length - 1) / 2) * (size * 1.05) + size * 0.34} fontSize={size}>
            {ln}
          </text>
        ))}
      </g>
    );
  };
  return (
    <g>
      {/* situation node */}
      {box(cx, 200, 460, 120, COLORS.yellow, 1)}
      <Label x={cx} y={200} text={situation} size={46} />
      {/* branches */}
      <path d={`M ${cx - 60} 262 Q ${cx - 260} 330 ${cx - 260} 420`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
      <path d={`M ${cx + 60} 262 Q ${cx + 260} 330 ${cx + 260} 420`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
      {/* left = biased */}
      {box(cx - 260, 560, 420, 230, COLORS.red, Math.min(1, pL))}
      <g transform={`translate(${cx - 260} 490) scale(${Math.min(1, pL)})`}>
        <circle r={34} fill={COLORS.white} {...sm} />
        <path d="M -16 -16 L 16 16 M 16 -16 L -16 16" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <Label x={cx - 260} y={580} text={biased} size={38} color={COLORS.white} />
      {/* right = true */}
      {box(cx + 260, 560, 420, 230, COLORS.greenLeaf, Math.min(1, pR))}
      <g transform={`translate(${cx + 260} 490) scale(${Math.min(1, pR)})`}>
        <circle r={34} fill={COLORS.white} {...sm} />
        <path d="M -18 2 L -4 18 L 20 -14" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Label x={cx + 260} y={580} text={real} size={38} color={COLORS.white} />
    </g>
  );
};

/** Dunning–Kruger curve: confidence peaks early, dips, climbs with real skill. */
const DKCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x0 = CANVAS.width * 0.36;
  const y0 = 760;
  const w = 900;
  const h = 460;
  // confidence curve points
  const pts: [number, number][] = [
    [0, 0.35], [0.12, 0.95], [0.2, 1.0], [0.34, 0.5], [0.46, 0.22], [0.62, 0.3], [0.82, 0.55], [1, 0.78],
  ];
  const P = pts.map(([px, py]) => [x0 + px * w, y0 - py * h]);
  const path = P.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
  const peak = P[2];
  const valley = P[4];
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} {...lg} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h} {...lg} />
      <text x={x0 + w / 2} y={y0 + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={36} fill={COLORS.outline}>EXPERIENCE →</text>
      <text x={x0 - 30} y={y0 - h / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={36} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 30} ${y0 - h / 2})`}>CONFIDENCE</text>
      <path d={path} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={3000} strokeDashoffset={3000 * (1 - draw)} />
      {draw > 0.4 && (
        <g>
          <text x={peak[0]} y={peak[1] - 24} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.red}>“I’M AN EXPERT”</text>
          <circle cx={peak[0]} cy={peak[1]} r={12} fill={COLORS.red} {...sm} />
        </g>
      )}
      {draw > 0.95 && (
        <g>
          <text x={valley[0]} y={valley[1] + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.purpleDeep}>“I know nothing”</text>
          <circle cx={valley[0]} cy={valley[1]} r={12} fill={COLORS.purpleDeep} {...sm} />
        </g>
      )}
    </g>
  );
};

/** Loss scale: a losing bet weighs ~2x a winning one. */
const LossScale: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [10, 40], [0, 11], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56;
  const cy = 440;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <rect x={-10} y={-140} width={20} height={320} rx={10} fill={COLORS.woodDark} {...lg} />
      <ellipse cx={0} cy={180} rx={110} ry={28} fill={COLORS.woodDark} {...lg} />
      <g transform={`rotate(${tilt})`}>
        <rect x={-280} y={-150} width={560} height={20} rx={10} fill={COLORS.wood} {...lg} />
        <line x1={-250} y1={-140} x2={-250} y2={-60} {...sm} />
        <line x1={250} y1={-140} x2={250} y2={-100} {...sm} />
        <path d="M -330 -60 Q -250 70 -170 -60 Z" fill={COLORS.red} {...lg} />
        <path d="M 170 -100 Q 250 10 330 -100 Z" fill={COLORS.greenLeaf} {...lg} />
        <text x={-250} y={-10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.white}>LOSE $100</text>
        <text x={250} y={-50} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.white}>WIN $100</text>
      </g>
      <text x={0} y={250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={64} fill={COLORS.outline}>≈ 2× heavier</text>
    </g>
  );
};

/** Framing flip: the SAME thing, two labels — people choose differently. */
const FramingFlip: React.FC<{ labels: string[] }> = ({ labels }) => {
  const [a = '90% FAT-FREE', b = '10% FAT'] = labels;
  const cx = CANVAS.width * 0.56;
  const Jar: React.FC<{ x: number; label: string; tone: string }> = ({ x, label, tone }) => (
    <g transform={`translate(${x} 420)`}>
      <rect x={-120} y={-150} width={240} height={300} rx={30} fill={COLORS.sky} {...xl} />
      <rect x={-120} y={-150} width={240} height={80} rx={30} fill={shade(COLORS.sky, 0.12)} />
      <rect x={-96} y={-40} width={192} height={150} rx={14} fill={tone} />
      <text x={0} y={60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.white}>{label}</text>
    </g>
  );
  return (
    <g>
      <Jar x={cx - 230} label={a} tone={COLORS.greenLeaf} />
      <Jar x={cx + 230} label={b} tone={COLORS.red} />
      <text x={cx} y={440} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={96} fill={COLORS.outline}>=</text>
      <text x={cx} y={660} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={40} fill={COLORS.purpleDeep}>same jar. different choice.</text>
    </g>
  );
};

/** The ego behind a shield, deflecting a threat (the core defense metaphor). */
const DefenseShield: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [threat = 'ANXIETY', defense = 'the defense'] = labels;
  const cx = CANVAS.width * 0.58;
  const cy = CANVAS.height * 0.42;
  const hit = Math.abs(Math.sin(frame / 7));
  const tone = COLORS.sky;
  return (
    <g>
      {/* threat on the left */}
      <g transform={`translate(${cx - 440} ${cy}) scale(0.9)`}>
        <path d="M -70 20 Q -96 -56 -30 -70 Q 0 -96 42 -68 Q 104 -58 84 8 Q 104 64 32 70 Q 0 92 -36 70 Q -94 64 -70 20 Z" fill={COLORS.red} {...lg} />
        <path d="M -38 -16 L -10 -2 M -10 -16 L -38 -2 M 10 -16 L 38 -2 M 38 -16 L 10 -2" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <text x={cx - 440} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.redDark}>{threat}</text>
      {/* flying arrows deflecting off the shield */}
      {[0, 1].map((i) => {
        const x = cx - 320 + hit * 150 + i * 30;
        return <path key={i} d={`M ${x} ${cy - 40 + i * 70} l 60 0 l -18 -14 m 18 14 l -18 14`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />;
      })}
      {/* ego face behind the shield */}
      <circle cx={cx + 120} cy={cy} r={86} fill={COLORS.white} {...xl} />
      <circle cx={cx + 98} cy={cy - 12} r={10} fill={COLORS.outline} />
      <circle cx={cx + 142} cy={cy - 12} r={10} fill={COLORS.outline} />
      <path d={`M ${cx + 98} ${cy + 26} q 22 -14 44 0`} fill="none" {...sm} />
      <ellipse cx={cx + 90} cy={cy + 12} rx={12} ry={8} fill={COLORS.pink} />
      <ellipse cx={cx + 150} cy={cy + 12} rx={12} ry={8} fill={COLORS.pink} />
      {/* shield */}
      <g transform={`translate(${cx + 10} ${cy})`}>
        <path d="M 0 -130 L 118 -86 L 118 24 Q 118 118 0 160 Q -118 118 -118 24 L -118 -86 Z" fill={tone} {...xl} />
        <path d="M 0 -96 L 0 130 M -92 -42 L 92 -42" stroke={shade(tone, 0.18)} strokeWidth={STROKE.lg} />
      </g>
      <text x={cx + 10} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={46} fill={COLORS.outline}>{defense}</text>
    </g>
  );
};

/** Freud's iceberg: a sliver of conscious mind above water, the vast rest below. */
const Iceberg: React.FC = () => {
  const cx = CANVAS.width * 0.56;
  const sea = 430;
  return (
    <g>
      <rect x={CANVAS.width * 0.28} y={sea} width={CANVAS.width * 0.56} height={560} fill={COLORS.sky} opacity={0.5} />
      <path d={`M ${cx} ${sea - 170} L ${cx + 130} ${sea} L ${cx - 130} ${sea} Z`} fill={COLORS.white} {...xl} />
      <path d={`M ${cx - 130} ${sea} L ${cx + 130} ${sea} L ${cx + 250} ${sea + 420} Q ${cx} ${sea + 540} ${cx - 250} ${sea + 420} Z`} fill={shade(COLORS.sky, 0.08)} {...xl} />
      <rect x={CANVAS.width * 0.28} y={sea - 6} width={CANVAS.width * 0.56} height={10} fill={COLORS.skyDark} />
      <text x={cx + 300} y={sea - 60} fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>CONSCIOUS</text>
      <text x={cx + 20} y={sea + 300} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={52} fill={COLORS.purpleDeep}>UNCONSCIOUS</text>
    </g>
  );
};

/** Vaillant's maturity ladder — 4 rungs, the current level highlighted. */
const MaturityLadder: React.FC<{ highlight: string }> = ({ highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rungs = [
    { key: 'mature', label: 'MATURE', color: COLORS.greenLeaf },
    { key: 'neurotic', label: 'NEUROTIC', color: COLORS.sky },
    { key: 'immature', label: 'IMMATURE', color: COLORS.yellow },
    { key: 'pathological', label: 'PATHOLOGICAL', color: COLORS.red },
  ];
  const active = Math.max(0, rungs.findIndex((r) => r.key === highlight));
  const x = CANVAS.width * 0.42;
  const w = 720;
  const h = 130;
  const gap = 24;
  const pop = springIn(frame, fps, 14, { damping: 12 });
  return (
    <g transform="translate(0 220)">
      {rungs.map((r, i) => {
        const y = i * (h + gap);
        const on = i === active;
        return (
          <g key={r.key} transform={`translate(${x} ${y}) scale(${on ? 1 + 0.04 * Math.min(1, pop) : 1})`} transform-origin={`${x + w / 2} ${y + h / 2}`}>
            <rect x={0} y={0} width={w} height={h} rx={22} fill={r.color} opacity={on ? 1 : 0.6} {...lg} />
            <text x={34} y={h / 2 + 18} fontFamily={fontFamily} fontWeight={800} fontSize={54} fill={COLORS.outline}>{r.label}</text>
            {on && (
              <g transform={`translate(${w - 70} ${h / 2})`}>
                <circle r={34} fill={COLORS.white} {...sm} />
                <path d="M -16 2 L -4 16 L 18 -12" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** A feeling redirected from its real source to a safer target. */
const RedirectArrow: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [source = 'the real target', target = 'a safe target'] = labels;
  const draw = springIn(frame, fps, 10, { damping: 16 });
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  return (
    <g>
      <g transform={`translate(${cx - 240} ${cy})`}>
        <circle r={90} fill={COLORS.red} {...xl} />
        <path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <text x={cx - 240} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.redDark}>{source}</text>
      {/* bent redirect arrow */}
      <path d={`M ${cx - 150} ${cy - 30} Q ${cx} ${cy - 220} ${cx + 150} ${cy - 30}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - Math.min(1, draw))} />
      {draw > 0.9 && <path d={`M ${cx + 150} ${cy - 30} l -6 -34 l 30 22 z`} fill={COLORS.outline} />}
      <g transform={`translate(${cx + 240} ${cy})`}>
        <circle r={90} fill={COLORS.greenLeaf} {...xl} />
        <path d="M -20 2 L -4 20 L 24 -16" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x={cx + 240} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.greenDark}>{target}</text>
    </g>
  );
};

/** A pressure tank venting through a relief valve (the defense as release). */
const PressureValve: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.5;
  const puff = (frame % 40) / 40;
  return (
    <g>
      <rect x={cx - 150} y={cy - 160} width={300} height={320} rx={40} fill={COLORS.sky} {...xl} />
      <rect x={cx - 130} y={cy + 20} width={260} height={120} rx={20} fill={COLORS.red} opacity={0.8} />
      <rect x={cx - 130} y={cy + 20} width={260} height={24} fill={shade(COLORS.red, 0.16)} />
      {/* valve on top */}
      <rect x={cx - 24} y={cy - 220} width={48} height={70} rx={10} fill={COLORS.woodDark} {...lg} />
      <circle cx={cx} cy={cy - 230} r={30} fill={COLORS.red} {...lg} />
      {/* steam */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={cx + (i - 1) * 30} cy={cy - 270 - puff * 120} r={22 + i * 6} fill={COLORS.white} opacity={0.6 * (1 - puff)} {...sm} />
      ))}
      <text x={cx} y={cy + 220} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>pressure finds a way out</text>
    </g>
  );
};

/** The two-dimension attachment map (anxiety × avoidance → four styles).
 *  `highlight` lights the active quadrant: secure | anxious | dismissive | fearful. */
const AttachmentGrid: React.FC<{ highlight: string }> = ({ highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springIn(frame, fps, 14, { damping: 12 });
  const gx = CANVAS.width * 0.4;
  const gy = 170;
  const cs = 340;
  const quads = [
    { key: 'anxious', col: 0, row: 0, label: 'ANXIOUS', sub: 'need, cling', color: COLORS.yellow },
    { key: 'fearful', col: 1, row: 0, label: 'FEARFUL', sub: 'want + fear', color: COLORS.red },
    { key: 'secure', col: 0, row: 1, label: 'SECURE', sub: 'calm, close', color: COLORS.greenLeaf },
    { key: 'dismissive', col: 1, row: 1, label: 'DISMISSIVE', sub: 'distance', color: COLORS.sky },
  ];
  return (
    <g>
      {/* axis labels */}
      <text x={gx - 54} y={gy + cs} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline} transform={`rotate(-90 ${gx - 54} ${gy + cs})`}>
        ANXIETY →
      </text>
      <text x={gx + cs} y={gy + 2 * cs + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>
        AVOIDANCE →
      </text>
      {quads.map((q) => {
        const on = q.key === highlight;
        const x = gx + q.col * cs;
        const y = gy + q.row * cs;
        const s = on ? 1 + 0.03 * Math.min(1, pop) : 1;
        return (
          <g key={q.key} transform={`translate(${x + cs / 2} ${y + cs / 2}) scale(${s})`}>
            <rect x={-cs / 2 + 8} y={-cs / 2 + 8} width={cs - 16} height={cs - 16} rx={24} fill={q.color} opacity={on ? 1 : 0.4} {...lg} />
            <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={58} fill={COLORS.outline} opacity={on ? 1 : 0.7}>
              {q.label}
            </text>
            <text x={0} y={52} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={34} fill={COLORS.outline} opacity={on ? 0.85 : 0.55}>
              {q.sub}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Ainsworth's secure base: a safe home the child ventures out from and returns to. */
const SecureBase: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const [out = 'explore', back = 'come back'] = labels;
  const t = (frame % 120) / 120; // 0..1 loop: out then back
  const ang = Math.PI * (t < 0.5 ? t * 2 : (1 - t) * 2); // 0..π..0
  const baseX = CANVAS.width * 0.44;
  const baseY = CANVAS.height * 0.62;
  const rx = 320;
  const ry = 300;
  const childX = baseX + Math.sin(ang) * rx;
  const childY = baseY - Math.sin(ang) * ry * 0.5 - 20;
  return (
    <g>
      {/* explore arc */}
      <path d={`M ${baseX} ${baseY - 20} Q ${baseX + rx} ${baseY - ry} ${baseX + rx + 40} ${baseY - 20}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="4 22" strokeLinecap="round" opacity={0.5} />
      {/* the safe base — a little house */}
      <g transform={`translate(${baseX} ${baseY})`}>
        <rect x={-110} y={-40} width={220} height={190} rx={16} fill={COLORS.greenLeaf} {...xl} />
        <path d="M -140 -40 L 0 -170 L 140 -40 Z" fill={COLORS.greenDark} {...xl} />
        <rect x={-44} y={40} width={88} height={110} rx={10} fill={COLORS.wood} {...lg} />
        <circle cx={28} cy={96} r={8} fill={COLORS.outline} />
        <path d="M 0 -120 Q -40 -80 0 -56 Q 40 -80 0 -120 Z" fill={COLORS.pink} />
      </g>
      <text x={baseX} y={baseY + 210} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={46} fill={COLORS.outline}>SAFE BASE</text>
      {/* venturing child */}
      <g transform={`translate(${childX} ${childY})`}>
        <circle r={46} fill={COLORS.yellow} {...lg} />
        <circle cx={-16} cy={-6} r={7} fill={COLORS.outline} />
        <circle cx={16} cy={-6} r={7} fill={COLORS.outline} />
        <path d="M -16 16 Q 0 28 16 16" fill="none" {...sm} />
      </g>
      {/* captions */}
      <text x={baseX + rx + 60} y={baseY - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={38} fill={COLORS.greenDark}>{out}</text>
      <text x={baseX + rx + 60} y={baseY + 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={38} fill={COLORS.outline}>{back}</text>
    </g>
  );
};

/** The anxious–avoidant trap: one pulls closer, the other pulls away, forever. */
const PushPull: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const [left = 'pull closer', right = 'pull away'] = labels;
  const osc = Math.sin(frame / 14);
  const cy = CANVAS.height * 0.46;
  const cx = CANVAS.width * 0.56;
  const lx = cx - 210 + osc * 40; // anxious chases right
  const rx = cx + 210 + osc * 40; // avoidant retreats right
  const Face: React.FC<{ color: string }> = ({ color }) => (
    <g>
      <circle r={96} fill={color} {...xl} />
      <circle cx={-30} cy={-10} r={11} fill={COLORS.outline} />
      <circle cx={30} cy={-10} r={11} fill={COLORS.outline} />
    </g>
  );
  return (
    <g>
      {/* stretchy elastic between them */}
      <path d={`M ${lx + 70} ${cy} Q ${cx} ${cy + 30 * osc} ${rx - 70} ${cy}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* anxious on the left, reaching toward */}
      <g transform={`translate(${lx} ${cy})`}>
        <Face color={COLORS.yellow} />
        <path d="M -30 24 Q 0 40 30 24" fill="none" {...sm} />
      </g>
      <path d={`M ${lx + 110} ${cy - 110} l 70 0 l -18 -14 m 18 14 l -18 14`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={lx} y={cy + 180} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={42} fill={COLORS.outline}>{left}</text>
      {/* avoidant on the right, turning away */}
      <g transform={`translate(${rx} ${cy})`}>
        <Face color={COLORS.sky} />
        <path d="M -30 30 Q 0 18 30 30" fill="none" {...sm} />
      </g>
      <path d={`M ${rx + 70} ${cy - 110} l 70 0 l -18 -14 m 18 14 l -18 14`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={rx} y={cy + 180} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={42} fill={COLORS.outline}>{right}</text>
    </g>
  );
};

/** The pursue–withdraw loop: a token circles endlessly between two phases. */
const ChaseCycle: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const [top = 'PURSUE', bottom = 'WITHDRAW'] = labels;
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const r = 230;
  const a = (frame / 50) * Math.PI * 2;
  const tx = cx + Math.cos(a) * r;
  const ty = cy + Math.sin(a) * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeDasharray="4 26" strokeLinecap="round" opacity={0.55} />
      {/* direction arrows on the ring */}
      {[0, 0.5].map((o, i) => {
        const aa = (o + 0.25) * Math.PI * 2;
        const ax = cx + Math.cos(aa) * r;
        const ay = cy + Math.sin(aa) * r;
        return <path key={i} d={`M ${ax} ${ay} l ${-18 * Math.sin(aa)} ${18 * Math.cos(aa)} l 22 8 z`} fill={COLORS.outline} opacity={0.6} />;
      })}
      {/* phase chips */}
      <g transform={`translate(${cx} ${cy - r})`}>
        <rect x={-180} y={-54} width={360} height={108} rx={54} fill={COLORS.yellow} {...lg} />
        <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={52} fill={COLORS.outline}>{top}</text>
      </g>
      <g transform={`translate(${cx} ${cy + r})`}>
        <rect x={-200} y={-54} width={400} height={108} rx={54} fill={COLORS.sky} {...lg} />
        <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={52} fill={COLORS.outline}>{bottom}</text>
      </g>
      {/* travelling token */}
      <circle cx={tx} cy={ty} r={30} fill={COLORS.red} {...xl} />
    </g>
  );
};

/** The IQ bell curve (mean 100, SD 15) with one level highlighted.
 *  `highlight` is the IQ value as a string, e.g. "130". */
const BellCurve: React.FC<{ highlight: string }> = ({ highlight }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const hv = Number(highlight) || 100;
  const cx = CANVAS.width * 0.56;
  const base = 760;
  const peak = 430;
  const sx = 150; // px per 1 SD (15 pts)
  const xOf = (iq: number) => cx + ((iq - 100) / 15) * sx;
  const yOf = (iq: number) => base - Math.exp(-(((iq - 100) / 15) ** 2) / 2) * peak;
  const pts: string[] = [];
  for (let iq = 48; iq <= 152; iq += 2) pts.push(`${pts.length ? 'L' : 'M'} ${xOf(iq)} ${yOf(iq)}`);
  const curve = pts.join(' ');
  // shaded band ±7.5 pts around the highlighted level
  const band: string[] = [`M ${xOf(hv - 7.5)} ${base}`];
  for (let iq = hv - 7.5; iq <= hv + 7.5; iq += 1.5) band.push(`L ${xOf(iq)} ${yOf(iq)}`);
  band.push(`L ${xOf(hv + 7.5)} ${base} Z`);
  const ticks = [55, 70, 85, 100, 115, 130, 145];
  return (
    <g>
      <line x1={xOf(48)} y1={base} x2={xOf(152)} y2={base} {...lg} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={xOf(t)} y1={base} x2={xOf(t)} y2={base + 16} {...sm} />
          <text x={xOf(t)} y={base + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={34} fill={COLORS.outline} opacity={0.7}>{t}</text>
        </g>
      ))}
      {draw > 0.4 && <path d={band.join(' ')} fill={COLORS.yellow} opacity={0.55} />}
      <path d={curve} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={2600} strokeDashoffset={2600 * (1 - draw)} />
      {draw > 0.9 && (
        <g>
          <line x1={xOf(hv)} y1={base} x2={xOf(hv)} y2={yOf(hv)} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeDasharray="4 16" strokeLinecap="round" />
          <circle cx={xOf(hv)} cy={yOf(hv)} r={18} fill={COLORS.red} {...lg} />
          <g transform={`translate(${xOf(hv)} ${yOf(hv) - 70})`}>
            <rect x={-96} y={-52} width={192} height={74} rx={16} fill={COLORS.white} {...lg} />
            <text x={0} y={0} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={54} fill={COLORS.outline}>IQ {hv}</text>
          </g>
        </g>
      )}
    </g>
  );
};

/** The Flynn effect: average scores climbed through the 20th century (re-normed). */
const FlynnEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x0 = CANVAS.width * 0.38;
  const y0 = 820;
  const w = 920;
  const h = 480;
  const line = `M ${x0} ${y0} L ${x0 + w * 0.2} ${y0 - h * 0.28} L ${x0 + w * 0.45} ${y0 - h * 0.42} L ${x0 + w * 0.7} ${y0 - h * 0.72} L ${x0 + w} ${y0 - h * 0.92}`;
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} {...lg} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h} {...lg} />
      <text x={x0 - 30} y={y0 - h / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={34} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 30} ${y0 - h / 2})`}>AVG SCORE</text>
      {['1920', '1970', '2020'].map((yr, i) => (
        <text key={yr} x={x0 + (w / 2) * i} y={y0 + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={34} fill={COLORS.outline} opacity={0.75}>{yr}</text>
      ))}
      <path d={line} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1600} strokeDashoffset={1600 * (1 - draw)} />
      {draw > 0.95 && (
        <g transform={`translate(${x0 + w * 0.5} ${y0 - h * 0.42 - 70})`}>
          <rect x={-170} y={-44} width={340} height={84} rx={18} fill={COLORS.yellow} {...lg} />
          <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>+3 pts / decade</text>
        </g>
      )}
    </g>
  );
};

/** Many intelligences — IQ measures mainly ONE slice of the mind. */
const MultiIntelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const spokes = [
    { label: 'LOGICAL', on: true, color: COLORS.yellow },
    { label: 'CREATIVE', on: false, color: COLORS.pink },
    { label: 'EMOTIONAL', on: false, color: COLORS.red },
    { label: 'PRACTICAL', on: false, color: COLORS.greenLeaf },
    { label: 'SOCIAL', on: false, color: COLORS.sky },
  ];
  const R = 300;
  return (
    <g>
      {spokes.map((s, i) => {
        const a = (-90 + (i / spokes.length) * 360) * (Math.PI / 180);
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const pop = springIn(frame, fps, 10 + i * 4, { damping: 13 });
        return (
          <g key={s.label}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.outline} strokeWidth={STROKE.lg} opacity={0.4} />
            <g transform={`translate(${x} ${y}) scale(${Math.min(1, pop)})`}>
              <circle r={92} fill={s.color} opacity={s.on ? 1 : 0.45} {...lg} />
              <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={s.label.length > 8 ? 26 : 30} fill={COLORS.outline}>{s.label}</text>
              {s.on && <text x={0} y={128} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.redDark}>← IQ measures this</text>}
            </g>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={86} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>MIND</text>
    </g>
  );
};

/** Susan Forward's FOG: Fear, Obligation, Guilt — the three walls of emotional
 *  blackmail, with the target trapped in the middle. */
const FogTriangle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const R = 300;
  const corners = [
    { label: 'FEAR', color: COLORS.lavender },
    { label: 'OBLIGATION', color: COLORS.sky },
    { label: 'GUILT', color: COLORS.red },
  ];
  const pts = corners.map((_, i) => {
    const a = (-90 + i * 120) * (Math.PI / 180);
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
  });
  return (
    <g>
      <path d={`M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]} L ${pts[2][0]} ${pts[2][1]} Z`} fill={COLORS.yellowSoft} opacity={0.3} {...lg} />
      {corners.map((c, i) => {
        const pop = springIn(frame, fps, 10 + i * 5, { damping: 13 });
        return (
          <g key={c.label} transform={`translate(${pts[i][0]} ${pts[i][1]}) scale(${Math.min(1, pop)})`}>
            <circle r={86} fill={c.color} {...lg} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={c.label.length > 6 ? 28 : 38} fill={COLORS.outline}>{c.label}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={64} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>YOU</text>
    </g>
  );
};

/** The narcissistic cycle: idealize → devalue → discard, round and round. */
const ManipulationCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const r = 250;
  const nodes = [
    { label: 'IDEALIZE', color: COLORS.greenLeaf },
    { label: 'DEVALUE', color: COLORS.yellow },
    { label: 'DISCARD', color: COLORS.red },
  ];
  const a = (frame / 55) * Math.PI * 2;
  const tx = cx + Math.cos(a - Math.PI / 2) * r;
  const ty = cy + Math.sin(a - Math.PI / 2) * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeDasharray="4 26" strokeLinecap="round" opacity={0.5} />
      {nodes.map((n, i) => {
        const ang = (-90 + i * 120) * (Math.PI / 180);
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        return (
          <g key={n.label} transform={`translate(${x} ${y})`}>
            <circle r={100} fill={n.color} {...lg} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>{n.label}</text>
          </g>
        );
      })}
      <circle cx={tx} cy={ty} r={26} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline} opacity={0.6}>↻</text>
    </g>
  );
};

/** Foot-in-the-door: a tiny yes at the bottom, climbing to the real ask on top. */
const AskLadder: React.FC<{ labels: string[] }> = ({ labels }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [a = 'a tiny yes', b = 'a bigger yes', c = 'the REAL ask'] = labels;
  const rungs = [
    { label: a, color: COLORS.sky, w: 440 },
    { label: b, color: COLORS.yellow, w: 560 },
    { label: c, color: COLORS.red, w: 680 },
  ];
  const x = CANVAS.width * 0.56;
  const h = 150;
  const gap = 40;
  return (
    <g transform="translate(0 250)">
      {rungs.map((r, i) => {
        const y = (rungs.length - 1 - i) * (h + gap);
        const pop = springIn(frame, fps, 10 + i * 8, { damping: 13 });
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${Math.min(1, pop)})`}>
            <rect x={-r.w / 2} y={0} width={r.w} height={h} rx={22} fill={r.color} {...lg} />
            <text x={0} y={h / 2 + 18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={48} fill={COLORS.outline}>{r.label}</text>
            {i < rungs.length - 1 && <path d={`M ${r.w / 2 - 60} 0 l 30 -40 l 30 40 z`} fill={COLORS.outline} opacity={0.5} />}
          </g>
        );
      })}
    </g>
  );
};

/** The feed's dopamine loop: scroll → a little hit → crave more → scroll. */
const DopamineLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const r = 250;
  const nodes = [
    { label: 'SCROLL', color: COLORS.sky },
    { label: 'DOPAMINE', color: COLORS.yellow },
    { label: 'CRAVE MORE', color: COLORS.red },
  ];
  const a = (frame / 40) * Math.PI * 2;
  const tx = cx + Math.cos(a - Math.PI / 2) * r;
  const ty = cy + Math.sin(a - Math.PI / 2) * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeDasharray="4 24" strokeLinecap="round" opacity={0.5} />
      {nodes.map((n, i) => {
        const ang = (-90 + i * 120) * (Math.PI / 180);
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        return (
          <g key={n.label} transform={`translate(${x} ${y})`}>
            <circle r={100} fill={n.color} {...lg} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={n.label.length > 7 ? 26 : 32} fill={COLORS.outline}>{n.label}</text>
          </g>
        );
      })}
      <circle cx={tx} cy={ty} r={24} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline} opacity={0.6}>↻</text>
      <text x={cx} y={cy + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={28} fill={COLORS.purpleDeep} opacity={0.8}>every 30s</text>
    </g>
  );
};

/** The comparison trap: your whole messy life vs everyone's highlight reel. */
const ComparisonTrap: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [10, 40], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56;
  const cy = 430;
  return (
    <g>
      <rect x={cx - 10} y={cy - 150} width={20} height={330} rx={10} fill={COLORS.woodDark} {...lg} />
      <ellipse cx={cx} cy={cy + 180} rx={120} ry={28} fill={COLORS.woodDark} {...lg} />
      <g transform={`rotate(${tilt} ${cx} ${cy - 140})`}>
        <rect x={cx - 300} y={cy - 150} width={600} height={20} rx={10} fill={COLORS.wood} {...lg} />
        {/* left pan = YOU (up): real mixed life */}
        <line x1={cx - 270} y1={cy - 140} x2={cx - 270} y2={cy - 70} {...sm} />
        <path d={`M ${cx - 350} ${cy - 70} Q ${cx - 270} ${cy + 60} ${cx - 190} ${cy - 70} Z`} fill={COLORS.sky} {...lg} />
        <text x={cx - 270} y={cy - 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>YOUR LIFE</text>
        <text x={cx - 270} y={cy + 18} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={26} fill={COLORS.purpleDeep}>(good + bad)</text>
        {/* right pan = THEM (down): all highlights, looks heavier */}
        <line x1={cx + 270} y1={cy - 140} x2={cx + 270} y2={cy - 30} {...sm} />
        <path d={`M ${cx + 190} ${cy - 30} Q ${cx + 270} ${cy + 110} ${cx + 350} ${cy - 30} Z`} fill={COLORS.yellow} {...lg} />
        <text x={cx + 270} y={cy + 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>THEIR FEED</text>
        <text x={cx + 270} y={cy + 66} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={26} fill={COLORS.redDark}>(highlights)</text>
      </g>
      <text x={cx} y={cy + 250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>a rigged comparison</text>
    </g>
  );
};

/** The attention economy: if the app is free, YOU are the product being sold. */
const AttentionEconomy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springIn(frame, fps, 14, { damping: 13 });
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.44;
  return (
    <g>
      {/* the "product" = a person on a price tag */}
      <g transform={`translate(${cx} ${cy}) scale(${Math.min(1, pop)})`}>
        <path d="M -150 -140 L 70 -140 L 190 -20 L -30 200 L -150 80 Z" fill={COLORS.yellow} {...xl} />
        <circle cx={-110} cy={-100} r={26} fill={COLORS.white} {...lg} />
        {/* little person icon */}
        <g transform="translate(20 10)">
          <circle cx={0} cy={-40} r={34} fill={COLORS.white} {...lg} />
          <path d="M -50 60 Q 0 -10 50 60 Z" fill={COLORS.white} {...lg} />
        </g>
        <text x={10} y={150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline} transform={`rotate(-20 ${10} 150)`}>FREE</text>
      </g>
      {/* barcode under it */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={cx - 130 + i * 18} y={cy + 150} width={i % 3 ? 6 : 12} height={60} fill={COLORS.outline} />
      ))}
      {/* money flowing out to an advertiser bag */}
      <g transform={`translate(${cx + 360} ${cy - 20})`}>
        <path d="M -70 -40 Q -70 -80 0 -80 Q 70 -80 70 -40 L 90 120 L -90 120 Z" fill={COLORS.greenLeaf} {...xl} />
        <text x={0} y={60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={70} fill={COLORS.white}>$</text>
        <text x={0} y={170} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.outline}>advertisers</text>
      </g>
      <path d={`M ${cx + 210} ${cy} l 70 0 l -18 -14 m 18 14 l -18 14`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={cx + 20} y={cy + 300} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>you are the product</text>
    </g>
  );
};

/** The default mode network: the brain's resting network lights up when you do
 *  "nothing" — resting is not the same as off. */
const DefaultModeNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(frame / 10));
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.44;
  const nodes = [[-150, -60], [0, -140], [150, -70], [-90, 80], [90, 90], [0, 0]];
  return (
    <g>
      {/* brain silhouette */}
      <path d={`M ${cx - 220} ${cy} Q ${cx - 260} ${cy - 150} ${cx - 120} ${cy - 180} Q ${cx - 80} ${cy - 250} ${cx + 10} ${cy - 220} Q ${cx + 110} ${cy - 255} ${cx + 160} ${cy - 175} Q ${cx + 285} ${cy - 140} ${cx + 230} ${cy - 10} Q ${cx + 260} ${cy + 130} ${cx + 130} ${cy + 170} Q ${cx + 40} ${cy + 250} ${cx - 60} ${cy + 185} Q ${cx - 215} ${cy + 170} ${cx - 220} ${cy} Z`} fill={COLORS.pink} opacity={0.4} {...xl} />
      {/* connections */}
      {nodes.map((a, i) => nodes.slice(i + 1).map((b, j) => (
        <line key={`${i}-${j}`} x1={cx + a[0]} y1={cy + a[1]} x2={cx + b[0]} y2={cy + b[1]} stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={0.4 * pulse} />
      )))}
      {/* glowing nodes */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${cx + n[0]} ${cy + n[1]})`}>
          <circle r={34} fill={COLORS.yellow} opacity={0.3 * pulse} />
          <circle r={18} fill={COLORS.red} {...lg} />
        </g>
      ))}
      <text x={cx} y={cy + 250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>resting ≠ off</text>
    </g>
  );
};

/** Rumination loop: trigger → thought → feeling → thought, tightening forever. */
const RuminationLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.44;
  const r = 230;
  const nodes = [
    { label: 'TRIGGER', color: COLORS.yellow },
    { label: 'THOUGHT', color: COLORS.sky },
    { label: 'FEELING', color: COLORS.red },
  ];
  const a = (frame / 30) * Math.PI * 2;
  const tx = cx + Math.cos(a - Math.PI / 2) * r;
  const ty = cy + Math.sin(a - Math.PI / 2) * r;
  return (
    <g>
      {[r, r * 0.66, r * 0.34].map((rr, i) => (
        <circle key={i} cx={cx} cy={cy} r={rr} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="4 20" opacity={0.4 - i * 0.1} />
      ))}
      {nodes.map((n, i) => {
        const ang = (-90 + i * 120) * (Math.PI / 180);
        return (
          <g key={n.label} transform={`translate(${cx + Math.cos(ang) * r} ${cy + Math.sin(ang) * r})`}>
            <circle r={92} fill={n.color} {...lg} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>{n.label}</text>
          </g>
        );
      })}
      <circle cx={tx} cy={ty} r={22} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.outline} opacity={0.6}>stuck</text>
    </g>
  );
};

/** Ironic process: push a thought DOWN, and it rebounds bigger (the white bear). */
const IronicProcess: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % 90) / 90;
  const push = t < 0.5;
  const size = push ? 1 : 1 + (t - 0.5) * 2.4;
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.5;
  return (
    <g>
      {/* lid being pushed */}
      <g transform={`translate(${cx} ${cy - 150 + (push ? t * 60 : 0)})`}>
        <rect x={-180} y={-30} width={360} height={40} rx={14} fill={COLORS.shirtDark} {...xl} />
        <rect x={-30} y={-90} width={60} height={60} rx={10} fill={COLORS.woodDark} {...lg} />
        <text x={0} y={-44} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>don't think!</text>
      </g>
      {/* the thought (a bear head) growing as it rebounds */}
      <g transform={`translate(${cx} ${cy + 70}) scale(${Math.min(2.2, size)})`} style={{ transformOrigin: 'center' }}>
        <circle cx={-44} cy={-40} r={20} fill={COLORS.white} {...lg} />
        <circle cx={44} cy={-40} r={20} fill={COLORS.white} {...lg} />
        <circle r={60} fill={COLORS.white} {...xl} />
        <ellipse cx={0} cy={18} rx={28} ry={22} fill={COLORS.whiteShade} {...sm} />
        <circle cx={-22} cy={-10} r={7} fill={COLORS.outline} />
        <circle cx={22} cy={-10} r={7} fill={COLORS.outline} />
        <ellipse cx={0} cy={6} rx={9} ry={7} fill={COLORS.outline} />
      </g>
      <text x={cx} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>the white bear rebounds</text>
    </g>
  );
};

/** Window of now: the mind yanked between PAST regret and FUTURE worry, barely NOW. */
const WindowOfNow: React.FC = () => {
  const frame = useCurrentFrame();
  const pull = Math.sin(frame / 18);
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const headX = cx + pull * 230;
  return (
    <g>
      {/* band */}
      <rect x={cx - 440} y={cy - 40} width={880} height={80} rx={40} fill={COLORS.bgCreamDark} {...lg} />
      <rect x={cx - 110} y={cy - 40} width={220} height={80} rx={40} fill={COLORS.greenLeaf} opacity={0.7} {...lg} />
      <text x={cx - 330} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.purpleDeep}>PAST</text>
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.greenDark}>NOW</text>
      <text x={cx + 330} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.redDark}>FUTURE</text>
      <text x={cx - 330} y={cy - 80} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={28} fill={COLORS.outline} opacity={0.7}>regret</text>
      <text x={cx + 330} y={cy - 80} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={28} fill={COLORS.outline} opacity={0.7}>worry</text>
      {/* the mind, dragged off NOW */}
      <g transform={`translate(${headX} ${cy})`}>
        <circle r={54} fill={COLORS.white} {...xl} />
        <circle cx={-18} cy={-8} r={8} fill={COLORS.outline} />
        <circle cx={18} cy={-8} r={8} fill={COLORS.outline} />
        <path d="M -18 20 q 18 -12 36 0" fill="none" {...sm} />
      </g>
      <path d={`M ${headX - 60} ${cy} H ${cx - 150}`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="3 12" opacity={0.5} />
    </g>
  );
};

/** Dial, not a switch: the mind has a volume dial (loud→quiet), not an on/off button. */
const DialNotSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const turn = interpolate(frame, [20, 70], [40, -120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  return (
    <g>
      <circle cx={cx} cy={cy} r={170} fill={COLORS.white} {...xl} />
      <circle cx={cx} cy={cy} r={170} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} transform={`scale(0.9)`} transform-origin={`${cx} ${cy}`} />
      {/* tick arc */}
      {Array.from({ length: 11 }).map((_, i) => {
        const a = (-130 + i * 26) * (Math.PI / 180);
        return <line key={i} x1={cx + Math.cos(a) * 140} y1={cy + Math.sin(a) * 140} x2={cx + Math.cos(a) * 168} y2={cy + Math.sin(a) * 168} stroke={COLORS.outline} strokeWidth={STROKE.sm} />;
      })}
      {/* knob + pointer */}
      <circle cx={cx} cy={cy} r={96} fill={COLORS.lavender} {...lg} />
      <line x1={cx} y1={cy} x2={cx + Math.cos((turn - 90) * Math.PI / 180) * 80} y2={cy + Math.sin((turn - 90) * Math.PI / 180) * 80} stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={16} fill={COLORS.outline} />
      <text x={cx - 190} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.redDark}>LOUD</text>
      <text x={cx + 190} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.greenDark}>QUIET</text>
      <text x={cx} y={cy + 260} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>a dial, not a switch</text>
    </g>
  );
};

/** Attention spotlight: in the dark swirl of thoughts, you can aim the beam at one anchor. */
const AttentionSpotlight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aim = springIn(frame, fps, 20, { damping: 14 });
  const cx = CANVAS.width * 0.56;
  const topX = cx - 40;
  const topY = CANVAS.height * 0.2;
  const tgtX = cx - 120 + aim * 120;
  const tgtY = CANVAS.height * 0.66;
  return (
    <g>
      {/* scattered dim thoughts */}
      {[[cx - 320, 360, '?'], [cx + 300, 320, '!'], [cx + 220, 560, '…'], [cx - 260, 600, '?!']].map(([x, y, t], i) => (
        <g key={i} opacity={0.35}>
          <circle cx={x as number} cy={y as number} r={40} fill={COLORS.lavender} {...sm} />
          <text x={x as number} y={(y as number) + 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>{t}</text>
        </g>
      ))}
      {/* the lamp */}
      <g transform={`translate(${topX} ${topY})`}>
        <rect x={-50} y={-40} width={100} height={50} rx={14} fill={COLORS.shirtDark} {...xl} />
        <rect x={-24} y={-70} width={48} height={34} rx={10} fill={COLORS.ledGrey} {...lg} />
      </g>
      {/* beam to the anchor */}
      <path d={`M ${topX - 44} ${topY + 10} L ${tgtX - 110} ${tgtY} L ${tgtX + 110} ${tgtY} L ${topX + 44} ${topY + 10} Z`} fill={COLORS.yellowSoft} opacity={0.5} />
      {/* the anchor (breath dot), lit */}
      <g transform={`translate(${tgtX} ${tgtY})`}>
        <circle r={60} fill={COLORS.yellow} opacity={0.35} />
        <circle r={38} fill={COLORS.sky} {...lg} />
        <text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>now</text>
      </g>
      <text x={cx} y={CANVAS.height * 0.86} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>aim the beam</text>
    </g>
  );
};

/** Hypnogram: a night of sleep cycling through the stages, REM periods marked. */
const Hypnogram: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x0 = CANVAS.width * 0.36;
  const y0 = 300;
  const w = 960;
  const rows = ['AWAKE', 'REM', 'LIGHT', 'DEEP'];
  const rh = 110;
  // stage index per segment across the night
  const seq = [0, 2, 3, 2, 1, 2, 3, 2, 1, 2, 1, 0];
  const seg = w / seq.length;
  const path = seq.map((s, i) => `${i ? 'L' : 'M'} ${x0 + i * seg} ${y0 + s * rh + rh / 2} L ${x0 + (i + 1) * seg} ${y0 + s * rh + rh / 2}`).join(' ');
  return (
    <g>
      {rows.map((r, i) => (
        <g key={r}>
          <rect x={x0} y={y0 + i * rh} width={w} height={rh} fill={i === 1 ? COLORS.lavender : COLORS.bgCreamDark} opacity={i === 1 ? 0.3 : 0.4} />
          <text x={x0 - 20} y={y0 + i * rh + rh / 2 + 12} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>{r}</text>
        </g>
      ))}
      <path d={path} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={3000} strokeDashoffset={3000 * (1 - draw)} />
      {/* REM markers */}
      {seq.map((s, i) => (s === 1 && draw > 0.9 ? <circle key={i} cx={x0 + (i + 0.5) * seg} cy={y0 + rh + rh / 2} r={12} fill={COLORS.pink} {...sm} /> : null))}
      <text x={x0 + w / 2} y={y0 + 4 * rh + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={32} fill={COLORS.outline}>one night · ~90-min cycles</text>
    </g>
  );
};

/** The hypnagogic threshold: a borderland band between awake and asleep where
 *  most glitches happen. */
const SleepThreshold: React.FC = () => {
  const frame = useCurrentFrame();
  const y = CANVAS.height * 0.46 + Math.sin(frame / 18) * 20;
  const cx = CANVAS.width * 0.56;
  return (
    <g>
      <rect x={cx - 460} y={200} width={920} height={200} rx={20} fill={COLORS.sky} opacity={0.3} />
      <text x={cx - 420} y={310} fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>AWAKE</text>
      <rect x={cx - 460} y={400} width={920} height={160} rx={20} fill={COLORS.yellow} opacity={0.4} />
      <text x={cx - 440} y={492} fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.redDark}>THE BORDERLAND</text>
      <rect x={cx - 460} y={560} width={920} height={200} rx={20} fill={COLORS.purpleDeep} opacity={0.4} />
      <text x={cx - 420} y={670} fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>ASLEEP</text>
      {/* dashed threshold lines */}
      <line x1={cx - 460} y1={400} x2={cx + 460} y2={400} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="6 14" opacity={0.5} />
      <line x1={cx - 460} y1={560} x2={cx + 460} y2={560} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="6 14" opacity={0.5} />
      {/* a little head hovering at the threshold */}
      <g transform={`translate(${cx + 300} ${y})`}>
        <circle r={48} fill={COLORS.white} {...xl} />
        <path d="M -22 -6 q 10 -8 20 0 M 4 -6 q 10 -8 20 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -14 22 q 14 6 28 0" fill="none" {...sm} />
      </g>
      <text x={cx} y={820} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>glitches live in the gap</text>
    </g>
  );
};

/** The REM switch: in dreaming, the BODY is switched off (atonia) while the DREAM
 *  plays — glitches are this switch misfiring. */
const RemSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = interpolate(frame, [12, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const Switch: React.FC<{ x: number; label: string; on: boolean }> = ({ x, label, on }) => {
    const knob = on ? interpolate(flip, [0, 1], [-70, 70]) : -70;
    return (
      <g transform={`translate(${x} ${CANVAS.height * 0.46})`}>
        <rect x={-150} y={-180} width={300} height={360} rx={30} fill={COLORS.white} {...xl} />
        <rect x={-110} y={-40} width={220} height={110} rx={55} fill={on ? COLORS.greenLeaf : COLORS.ledGrey} opacity={0.6} {...lg} />
        <circle cx={knob} cy={15} r={54} fill={COLORS.white} {...lg} />
        <circle cx={0} cy={130} r={22} fill={on ? COLORS.ledGreen : COLORS.red} {...lg} />
        <text x={0} y={-110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={54} fill={COLORS.outline}>{label}</text>
      </g>
    );
  };
  return (
    <g>
      <Switch x={CANVAS.width * 0.44} label="DREAM" on />
      <Switch x={CANVAS.width * 0.68} label="BODY" on={false} />
      <text x={CANVAS.width * 0.56} y={CANVAS.height * 0.82} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>body off, so you don't act it out</text>
    </g>
  );
};

/** Dream layers: nested levels going down — awake → dream → dream-in-dream. */
const DreamLayers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const labels = ['AWAKE?', 'A DREAM', 'DREAM IN A DREAM'];
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.44;
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const r = 320 - i * 90;
        const pop = springIn(frame, fps, 8 + i * 6, { damping: 13 });
        const cols = [COLORS.sky, COLORS.lavender, COLORS.pink, COLORS.yellowSoft];
        return <circle key={i} cx={cx} cy={cy} r={r * Math.min(1, pop)} fill="none" stroke={cols[i]} strokeWidth={STROKE.xl} />;
      })}
      {labels.map((l, i) => (
        <text key={i} x={cx} y={cy - 320 + i * 90 + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={i === 0 ? 34 : 30} fill={COLORS.outline}>{l}</text>
      ))}
      <text x={cx} y={cy + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>↓</text>
    </g>
  );
};

/** Mind × Body sleep grid: 4 states — highlight one (sleep paralysis, sleepwalking…). */
const MindBodySleep: React.FC<{ highlight: string }> = ({ highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springIn(frame, fps, 14, { damping: 12 });
  const gx = CANVAS.width * 0.42;
  const gy = 220;
  const cs = 300;
  const quads = [
    { key: 'paralysis', col: 1, row: 0, label: 'SLEEP PARALYSIS', sub: 'mind on · body off', color: COLORS.red },
    { key: 'awake', col: 0, row: 0, label: 'AWAKE', sub: 'mind on · body on', color: COLORS.yellow },
    { key: 'asleep', col: 0, row: 1, label: 'ASLEEP', sub: 'mind off · body off', color: COLORS.sky },
    { key: 'sleepwalk', col: 1, row: 1, label: 'SLEEPWALKING', sub: 'mind off · body on', color: COLORS.greenLeaf },
  ];
  return (
    <g>
      <text x={gx - 48} y={gy + cs} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline} transform={`rotate(-90 ${gx - 48} ${gy + cs})`}>BODY on →</text>
      <text x={gx + cs} y={gy + 2 * cs + 64} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>MIND on →</text>
      {quads.map((q) => {
        const on = q.key === highlight;
        const x = gx + q.col * cs; const y = gy + q.row * cs;
        return (
          <g key={q.key} transform={`translate(${x + cs / 2} ${y + cs / 2}) scale(${on ? 1 + 0.03 * Math.min(1, pop) : 1})`}>
            <rect x={-cs / 2 + 8} y={-cs / 2 + 8} width={cs - 16} height={cs - 16} rx={22} fill={q.color} opacity={on ? 1 : 0.4} {...lg} />
            <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={q.label.length > 10 ? 32 : 40} fill={COLORS.outline} opacity={on ? 1 : 0.7}>{q.label}</text>
            <text x={0} y={44} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={26} fill={COLORS.outline} opacity={on ? 0.85 : 0.5}>{q.sub}</text>
          </g>
        );
      })}
    </g>
  );
};

/** Night terror vs nightmare comparison. */
const TerrorVsNightmare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rows = [['stage', 'DEEP (NREM)', 'REM'], ['timing', 'early night', 'late night'], ['memory', 'none', 'vivid'], ['you', 'scream, asleep', 'wake up scared']];
  const cx = CANVAS.width * 0.56;
  const colW = 300;
  const y0 = 240;
  const rh = 110;
  const pop = springIn(frame, fps, 10, { damping: 13 });
  return (
    <g transform={`scale(${0.9 + 0.1 * Math.min(1, pop)})`} style={{ transformOrigin: 'center' }}>
      <rect x={cx - 60} y={y0 - 80} width={colW} height={rh * 4 + 80} rx={18} fill={COLORS.red} opacity={0.25} />
      <rect x={cx - 60 + colW} y={y0 - 80} width={colW} height={rh * 4 + 80} rx={18} fill={COLORS.sky} opacity={0.3} />
      <text x={cx - 60 + colW / 2} y={y0 - 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.redDark}>NIGHT TERROR</text>
      <text x={cx - 60 + colW * 1.5} y={y0 - 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.blueDiagramDark}>NIGHTMARE</text>
      {rows.map((r, i) => (
        <g key={i}>
          <text x={cx - 80} y={y0 + i * rh + 50} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.outline}>{r[0]}</text>
          <text x={cx - 60 + colW / 2} y={y0 + i * rh + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>{r[1]}</text>
          <text x={cx - 60 + colW * 1.5} y={y0 + i * rh + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>{r[2]}</text>
        </g>
      ))}
    </g>
  );
};

/** Knowledge circle: the bigger what you know, the longer its edge with the unknown. */
const KnowledgeCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [10, 60], [0.35, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const r = 90 + grow * 200;
  return (
    <g>
      {/* the unknown (hatched edge) */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2;
        return <line key={i} x1={cx + Math.cos(a) * r} y1={cy + Math.sin(a) * r} x2={cx + Math.cos(a) * (r + 26)} y2={cy + Math.sin(a) * (r + 26)} stroke={COLORS.purpleDeep} strokeWidth={STROKE.sm} opacity={0.5} />;
      })}
      <circle cx={cx} cy={cy} r={r} fill={COLORS.yellow} opacity={0.6} {...xl} />
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>what you know</text>
      <text x={cx} y={cy + r + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.purpleDeep}>…the bigger the edge of the unknown</text>
    </g>
  );
};

/** IQ vs EQ: two independent gauges — a life needs both. */
const IqVsEq: React.FC = () => {
  const frame = useCurrentFrame();
  const iq = interpolate(frame, [10, 40], [0, 0.92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eq = interpolate(frame, [20, 50], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56;
  const Gauge: React.FC<{ x: number; label: string; v: number; color: string }> = ({ x, label, v, color }) => (
    <g transform={`translate(${x} ${CANVAS.height * 0.46})`}>
      <rect x={-60} y={-220} width={120} height={440} rx={30} fill={COLORS.white} {...xl} />
      <rect x={-44} y={-204} width={88} height={408} rx={22} fill={COLORS.bgCreamDark} />
      <rect x={-44} y={204 - v * 408} width={88} height={v * 408} rx={22} fill={color} />
      <text x={0} y={280} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={46} fill={COLORS.outline}>{label}</text>
      <text x={0} y={-250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>{Math.round(v * 100)}</text>
    </g>
  );
  return (
    <g>
      <Gauge x={cx - 150} label="IQ" v={iq} color={COLORS.blueDiagram} />
      <Gauge x={cx + 150} label="EQ" v={eq} color={COLORS.pink} />
      <text x={cx} y={CANVAS.height * 0.82} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>they don't come as a set</text>
    </g>
  );
};

/** Dabrowski's overexcitabilities — the high-IQ mind runs intense on 5 channels. */
const Overexcitability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = CANVAS.width * 0.56;
  const cy = CANVAS.height * 0.46;
  const spokes = [
    { label: 'INTELLECTUAL', color: COLORS.blueDiagram },
    { label: 'EMOTIONAL', color: COLORS.red },
    { label: 'IMAGINATIONAL', color: COLORS.lavender },
    { label: 'SENSUAL', color: COLORS.pink },
    { label: 'PSYCHOMOTOR', color: COLORS.greenLeaf },
  ];
  const R = 300;
  return (
    <g>
      {spokes.map((s, i) => {
        const a = (-90 + (i / spokes.length) * 360) * (Math.PI / 180);
        const x = cx + Math.cos(a) * R; const y = cy + Math.sin(a) * R;
        const pop = springIn(frame, fps, 10 + i * 4, { damping: 13 });
        return (
          <g key={s.label}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.outline} strokeWidth={STROKE.lg} opacity={0.4} />
            <g transform={`translate(${x} ${y}) scale(${Math.min(1, pop)})`}>
              <circle r={86} fill={s.color} {...lg} />
              <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={s.label.length > 10 ? 22 : 26} fill={COLORS.outline}>{s.label}</text>
            </g>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={80} fill={COLORS.yellow} {...xl} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>INTENSE</text>
    </g>
  );
};

/** Complexity comfort: a spectrum from black-and-white thinking to comfort in grey. */
const ComplexityComfort: React.FC = () => {
  const frame = useCurrentFrame();
  const marker = interpolate(frame, [15, 55], [0.18, 0.82], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const x0 = CANVAS.width * 0.34; const w = CANVAS.width * 0.44; const y = CANVAS.height * 0.48;
  return (
    <g>
      {/* gradient of greys */}
      {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={x0 + (i / 22) * w} y={y - 40} width={w / 22 + 1} height={80} fill={shade(COLORS.white, 0.04 * i)} />)}
      <rect x={x0} y={y - 40} width={w} height={80} rx={40} fill="none" {...xl} />
      <text x={x0} y={y + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>BLACK & WHITE</text>
      <text x={x0 + w} y={y + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.white}>ALL THE GREY</text>
      {/* marker */}
      <g transform={`translate(${x0 + marker * w} ${y})`}>
        <path d="M 0 -70 l 24 -40 l -48 0 Z" fill={COLORS.red} {...lg} />
        <circle cx={0} cy={0} r={26} fill={COLORS.red} {...lg} />
      </g>
      <text x={x0 + w / 2} y={y - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>comfortable in nuance</text>
    </g>
  );
};

/** Curiosity tree: one "why?" branching endlessly into more questions. */
const CuriosityTree: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56;
  const baseY = CANVAS.height * 0.78;
  const node = (x: number, y: number, r: number, c: string, show: number) => (draw > show ? <g><circle cx={x} cy={y} r={r} fill={c} {...lg} /><text x={x} y={y + r * 0.34} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={r * 0.9} fill={COLORS.outline}>?</text></g> : null);
  return (
    <g>
      {/* branches */}
      <path d={`M ${cx} ${baseY} L ${cx} ${baseY - 150}`} stroke={COLORS.woodDark} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d={`M ${cx} ${baseY - 150} L ${cx - 180} ${baseY - 280} M ${cx} ${baseY - 150} L ${cx + 180} ${baseY - 280}`} stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={draw > 0.3 ? 1 : 0} />
      <path d={`M ${cx - 180} ${baseY - 280} L ${cx - 280} ${baseY - 400} M ${cx - 180} ${baseY - 280} L ${cx - 90} ${baseY - 410} M ${cx + 180} ${baseY - 280} L ${cx + 90} ${baseY - 410} M ${cx + 180} ${baseY - 280} L ${cx + 290} ${baseY - 400}`} stroke={COLORS.woodDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={draw > 0.6 ? 1 : 0} />
      {node(cx, baseY - 150, 54, COLORS.yellow, 0)}
      {node(cx - 180, baseY - 280, 42, COLORS.sky, 0.3)}
      {node(cx + 180, baseY - 280, 42, COLORS.pink, 0.3)}
      {node(cx - 280, baseY - 400, 30, COLORS.greenLeaf, 0.6)}
      {node(cx - 90, baseY - 410, 30, COLORS.lavender, 0.6)}
      {node(cx + 90, baseY - 410, 30, COLORS.greenTeal, 0.6)}
      {node(cx + 290, baseY - 400, 30, COLORS.red, 0.6)}
      <text x={cx} y={baseY + 56} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>but why?</text>
    </g>
  );
};

/** Daydream spectrum: from healthy imagination to maladaptive daydreaming. */
const DaydreamSpectrum: React.FC = () => {
  const frame = useCurrentFrame();
  const marker = interpolate(frame, [15, 55], [0.2, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const x0 = CANVAS.width * 0.32; const w = CANVAS.width * 0.48; const y = CANVAS.height * 0.48;
  return (
    <g>
      {Array.from({ length: 24 }).map((_, i) => { const t = i / 24; return <rect key={i} x={x0 + t * w} y={y - 40} width={w / 24 + 1} height={80} fill={i < 12 ? shade(COLORS.greenLeaf, 0.02 * i) : shade(COLORS.red, 0.02 * (24 - i))} opacity={0.8} />; })}
      <rect x={x0} y={y - 40} width={w} height={80} rx={40} fill="none" {...xl} />
      <text x={x0} y={y + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.greenDark}>HEALTHY</text>
      <text x={x0 + w / 2} y={y + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={26} fill={COLORS.outline}>immersive</text>
      <text x={x0 + w} y={y + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.redDark}>MALADAPTIVE</text>
      <g transform={`translate(${x0 + marker * w} ${y})`}><path d="M 0 -70 l 24 -40 l -48 0 Z" fill={COLORS.outline} /><circle r={24} fill={COLORS.white} {...xl} /></g>
      <text x={x0 + w / 2} y={y - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>when does it tip over?</text>
    </g>
  );
};

/** Immersion meter: how deep the daydream pulls you under. */
const ImmersionMeter: React.FC = () => {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [8, 46], [0.1, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56; const top = 230; const h = 480;
  const level = top + (1 - fill) * h;
  const labels = ['here', 'drifting', 'immersed', 'gone'];
  return (
    <g>
      <rect x={cx - 110} y={top} width={220} height={h} rx={30} fill={COLORS.white} {...xl} />
      <rect x={cx - 92} y={level} width={184} height={top + h - level} rx={22} fill={COLORS.lavender} />
      <rect x={cx - 92} y={level} width={184} height={24} fill={shade(COLORS.lavender, 0.18)} />
      {labels.map((l, i) => <text key={i} x={cx + 130} y={top + 40 + i * (h / 4) + 10} fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={i === 3 ? COLORS.redDark : COLORS.outline} opacity={0.8}>{l}</text>)}
      {labels.map((_, i) => <line key={i} x1={cx - 110} y1={top + 30 + i * (h / 4)} x2={cx - 150} y2={top + 30 + i * (h / 4)} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}
      <text x={cx} y={top - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>how deep it goes</text>
    </g>
  );
};

/** The daydream trigger loop: a cue (music/boredom) → immerse → relief → crave → repeat. */
const TriggerLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const r = 240;
  const nodes = [{ label: 'TRIGGER', color: COLORS.sky }, { label: 'IMMERSE', color: COLORS.lavender }, { label: 'RELIEF', color: COLORS.greenLeaf }, { label: 'CRAVE', color: COLORS.red }];
  const a = (frame / 45) * Math.PI * 2;
  const tx = cx + Math.cos(a - Math.PI / 2) * r; const ty = cy + Math.sin(a - Math.PI / 2) * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeDasharray="4 24" strokeLinecap="round" opacity={0.5} />
      {nodes.map((n, i) => { const ang = (-90 + i * 90) * (Math.PI / 180); const x = cx + Math.cos(ang) * r; const y = cy + Math.sin(ang) * r; return <g key={n.label} transform={`translate(${x} ${y})`}><circle r={86} fill={n.color} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>{n.label}</text></g>; })}
      <circle cx={tx} cy={ty} r={22} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline} opacity={0.6}>↻</text>
    </g>
  );
};

/** Two lives: the grey real life running next to the vivid inner one. */
const TwoLives: React.FC = () => {
  const cx = CANVAS.width * 0.56; const w = 420; const h = 440; const y0 = 260;
  const Panel: React.FC<{ x: number; label: string; bg: string; vivid: boolean }> = ({ x, label, bg, vivid }) => (
    <g opacity={vivid ? 1 : 0.6}>
      <rect x={x} y={y0} width={w} height={h} rx={24} fill={bg} {...xl} />
      <circle cx={x + w * 0.72} cy={y0 + 100} r={48} fill={vivid ? COLORS.yellow : shade(COLORS.yellow, 0.2)} {...lg} />
      <path d={`M ${x + 20} ${y0 + h - 40} L ${x + 150} ${y0 + h - 150} L ${x + 250} ${y0 + h - 70} L ${x + w - 20} ${y0 + h - 40} Z`} fill={vivid ? COLORS.greenLeaf : shade(COLORS.greenLeaf, 0.2)} />
      {vivid && <g transform={`translate(${x + w / 2} ${y0 + 120})`}>{[[-40, -20], [50, 10], [0, -50]].map(([dx, dy], i) => <path key={i} d={`M ${dx} ${dy - 8} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z`} fill={COLORS.white} />)}</g>}
      <text x={x + w / 2} y={y0 - 24} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>{label}</text>
    </g>
  );
  return (
    <g>
      <Panel x={cx - w - 30} label="REAL LIFE" bg={COLORS.ledGrey} vivid={false} />
      <Panel x={cx + 30} label="INNER LIFE" bg={COLORS.lavender} vivid />
      <text x={cx} y={y0 + h + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>living in two worlds at once</text>
    </g>
  );
};

/** Absorption scale: the fantasy-proneness dial (how easily you get lost). */
const AbsorptionScale: React.FC = () => {
  const frame = useCurrentFrame();
  const turn = interpolate(frame, [15, 60], [-70, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  return (
    <g>
      <path d={`M ${cx - 280} ${cy} A 280 280 0 0 1 ${cx + 280} ${cy}`} fill="none" stroke={COLORS.bgCreamDark} strokeWidth={60} strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, i) => { const a = Math.PI + (i / 8) * Math.PI; return <line key={i} x1={cx + Math.cos(a) * 250} y1={cy + Math.sin(a) * 250} x2={cx + Math.cos(a) * 300} y2={cy + Math.sin(a) * 300} stroke={COLORS.outline} strokeWidth={STROKE.sm} />; })}
      <line x1={cx} y1={cy} x2={cx + Math.cos((turn - 90) * Math.PI / 180) * 230} y2={cy + Math.sin((turn - 90) * Math.PI / 180) * 230} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={28} fill={COLORS.outline} />
      <text x={cx - 300} y={cy + 60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>grounded</text>
      <text x={cx + 300} y={cy + 60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.redDark}>lost in it</text>
      <text x={cx} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>how absorbable is your mind?</text>
    </g>
  );
};

/** Circadian low: body temperature & alertness bottom out at ~3-4 a.m. */
const CircadianLow: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x0 = CANVAS.width * 0.34; const y0 = 760; const w = 960; const h = 420;
  // curve: high evening, dropping to a trough ~3-4am (~0.7 across), rising to morning
  const pts: [number, number][] = [[0, 0.8], [0.15, 0.6], [0.35, 0.3], [0.52, 0.08], [0.62, 0.05], [0.78, 0.35], [1, 0.75]];
  const P = pts.map(([px, py]) => [x0 + px * w, y0 - py * h]);
  const path = P.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
  const trough = P[4];
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} {...lg} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h} {...lg} />
      <text x={x0 - 30} y={y0 - h / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={32} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 30} ${y0 - h / 2})`}>BODY TEMP</text>
      {['9pm', '12', '3am', '6am', '9am'].map((t, i) => <text key={t} x={x0 + (w / 4) * i} y={y0 + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.outline} opacity={0.75}>{t}</text>)}
      <path d={path} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={2600} strokeDashoffset={2600 * (1 - draw)} />
      {draw > 0.95 && <g><circle cx={trough[0]} cy={trough[1]} r={14} fill={COLORS.red} {...lg} /><text x={trough[0]} y={trough[1] + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.redDark}>you are HERE</text></g>}
    </g>
  );
};

/** Cortisol curve: the stress hormone rises in the pre-dawn hours. */
const CortisolCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x0 = CANVAS.width * 0.34; const y0 = 760; const w = 960; const h = 420;
  const pts: [number, number][] = [[0, 0.1], [0.3, 0.12], [0.5, 0.28], [0.68, 0.72], [0.78, 0.95], [0.9, 0.6], [1, 0.3]];
  const P = pts.map(([px, py]) => [x0 + px * w, y0 - py * h]);
  const path = P.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} {...lg} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h} {...lg} />
      <text x={x0 - 30} y={y0 - h / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={32} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 30} ${y0 - h / 2})`}>CORTISOL</text>
      {['12', '2am', '4am', '6am', '8am'].map((t, i) => <text key={t} x={x0 + (w / 4) * i} y={y0 + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.outline} opacity={0.75}>{t}</text>)}
      {/* shaded pre-dawn danger window */}
      <rect x={x0 + 0.55 * w} y={y0 - h} width={0.3 * w} height={h} fill={COLORS.red} opacity={0.12} />
      <path d={path} fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={2600} strokeDashoffset={2600 * (1 - draw)} />
      {draw > 0.9 && <text x={x0 + 0.72 * w} y={y0 - h - 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.redDark}>the pre-dawn surge</text>}
    </g>
  );
};

/** Night brain: the rational front-brain is asleep while the fear centre runs free. */
const NightBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const alarm = 0.5 + 0.4 * Math.abs(Math.sin(frame / 7));
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  return (
    <g>
      {/* prefrontal — OFF */}
      <g transform={`translate(${cx - 220} ${cy})`}>
        <rect x={-180} y={-150} width={360} height={300} rx={28} fill={COLORS.ledGrey} opacity={0.5} {...xl} />
        <text x={0} y={-30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>RATIONAL</text>
        <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.outline}>(front brain)</text>
        <text x={110} y={110} fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.lavenderDark}>z</text>
        <text x={60} y={90} fontFamily={fontFamily} fontWeight={800} fontSize={56} fill={COLORS.lavenderDark}>Z</text>
        <text x={0} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.redDark}>OFFLINE</text>
      </g>
      {/* amygdala — ON */}
      <g transform={`translate(${cx + 220} ${cy})`}>
        <rect x={-180} y={-150} width={360} height={300} rx={28} fill={COLORS.red} opacity={alarm} {...xl} />
        <text x={0} y={-20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.white}>FEAR</text>
        <text x={0} y={24} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.white}>(amygdala)</text>
        <text x={0} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.white}>WIDE AWAKE</text>
      </g>
      <text x={cx} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>no brakes, all alarm</text>
    </g>
  );
};

/** Molehill by day, mountain by night — the same problem, two sizes. */
const MolehillMountain: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.62;
  return (
    <g>
      {/* day side */}
      <g opacity={0.9}>
        <circle cx={cx - 280} cy={240} r={44} fill={COLORS.yellow} {...lg} />
        <path d={`M ${cx - 420} ${cy} Q ${cx - 280} ${cy - 60} ${cx - 140} ${cy} Z`} fill={COLORS.greenLeaf} {...xl} />
        <text x={cx - 280} y={cy + 60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.outline}>9 a.m.</text>
        <text x={cx - 280} y={cy - 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={28} fill={COLORS.greenDark}>a molehill</text>
      </g>
      {/* night side */}
      <g>
        <circle cx={cx + 300} cy={100} r={40} fill={COLORS.yellowSoft} {...lg} />
        <path d={`M ${cx + 100} ${cy} L ${cx + 280} ${cy - 360} L ${cx + 320} ${cy - 360} L ${cx + 500} ${cy} Z`} fill={COLORS.purpleDeep} {...xl} />
        <path d={`M ${cx + 270} ${cy - 290} l 30 -40 l 30 40 Z`} fill={COLORS.white} />
        <text x={cx + 300} y={cy + 60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.outline}>3 a.m.</text>
        <text x={cx + 300} y={cy - 390} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.redDark}>a MOUNTAIN</text>
      </g>
      <line x1={cx} y1={120} x2={cx} y2={cy + 40} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="4 14" opacity={0.4} />
      <text x={cx} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>same problem</text>
    </g>
  );
};

/** Dawn vs dark: the identical worry, catastrophic at 3am, manageable by morning. */
const DawnVsDark: React.FC = () => {
  const cx = CANVAS.width * 0.56; const w = 420; const h = 440; const y0 = 250;
  const Panel: React.FC<{ x: number; label: string; bg: string; size: number; tone: string; cap: string }> = ({ x, label, bg, size, tone, cap }) => (
    <g>
      <rect x={x} y={y0} width={w} height={h} rx={24} fill={bg} {...xl} />
      <text x={x + w / 2} y={y0 - 24} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={46} fill={COLORS.outline}>{label}</text>
      <g transform={`translate(${x + w / 2} ${y0 + h / 2 + 20}) scale(${size})`}>
        <circle r={60} fill={tone} {...xl} /><path d="M -22 -24 L 22 24 M 22 -24 L -22 24" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <text x={x + w / 2} y={y0 + h - 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={tone === COLORS.red ? COLORS.redDark : COLORS.greenDark}>{cap}</text>
    </g>
  );
  return (
    <g>
      <Panel x={cx - w - 30} label="3 A.M." bg={COLORS.purpleDeep} size={1.4} tone={COLORS.red} cap="the end of the world" />
      <Panel x={cx + 30} label="9 A.M." bg={COLORS.yellowSoft} size={0.6} tone={COLORS.greenLeaf} cap="eh, I'll handle it" />
      <text x={cx} y={y0 + h + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>wait for the sun</text>
    </g>
  );
};

/** The overthinking ladder — 7 escalating rungs, the current level lit. */
const OverthinkLadder: React.FC<{ highlight: string }> = ({ highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rungs = [
    { key: 'ponder', label: 'THE PONDER', color: COLORS.greenLeaf },
    { key: 'replay', label: 'THE REPLAY', color: COLORS.greenTeal },
    { key: 'whatif', label: 'THE WHAT-IFS', color: COLORS.sky },
    { key: 'paralysis', label: 'ANALYSIS PARALYSIS', color: COLORS.yellow },
    { key: 'spiral', label: 'THE SPIRAL', color: COLORS.yellowDark },
    { key: 'catastrophe', label: 'CATASTROPHIZING', color: COLORS.hoodie },
    { key: 'rumination', label: 'RUMINATION', color: COLORS.red },
  ];
  const active = Math.max(0, rungs.findIndex((r) => r.key === highlight));
  const x = CANVAS.width * 0.4; const w = 760; const h = 86; const gap = 16; const y0 = 150;
  const pop = springIn(frame, fps, 12, { damping: 12 });
  return (
    <g>
      {rungs.map((r, i) => {
        const y = y0 + (rungs.length - 1 - i) * (h + gap);
        const on = i === active;
        return (
          <g key={r.key} transform={`translate(${x} ${y}) scale(${on ? 1 + 0.04 * Math.min(1, pop) : 1})`} transform-origin={`${x + w / 2} ${y + h / 2}`}>
            <rect x={0} y={0} width={w + i * 20} height={h} rx={18} fill={r.color} opacity={on ? 1 : 0.55} {...lg} />
            <text x={30} y={h / 2 + 16} fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>{r.label}</text>
            {on && <g transform={`translate(${w + i * 20 - 54} ${h / 2})`}><circle r={28} fill={COLORS.white} {...sm} /><text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>{i + 1}</text></g>}
          </g>
        );
      })}
      <text x={x - 30} y={y0 + 4 * (h + gap)} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline} transform={`rotate(-90 ${x - 30} ${y0 + 4 * (h + gap)})`}>↑ worse</text>
    </g>
  );
};

/** Thinking spins in place; one small action breaks the loop. */
const ThoughtVsAction: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  return (
    <g>
      {/* thinking loop */}
      <circle cx={cx - 240} cy={cy} r={160} fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeDasharray="4 22" strokeLinecap="round" opacity={0.6} />
      {(() => { const a = frame / 20; return <circle cx={cx - 240 + Math.cos(a) * 160} cy={cy + Math.sin(a) * 160} r={22} fill={COLORS.red} {...lg} />; })()}
      <text x={cx - 240} y={cy + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>THINK</text>
      <text x={cx - 240} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.redDark}>goes nowhere</text>
      {/* action arrow breaking out */}
      <path d={`M ${cx - 80} ${cy} L ${cx + 300} ${cy}`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray={500} strokeDashoffset={500 * (1 - draw)} />
      {draw > 0.9 && <path d={`M ${cx + 300} ${cy} l -30 -18 l 8 18 l -8 18 z`} fill={COLORS.greenDark} />}
      <g transform={`translate(${cx + 180} ${cy})`}><circle r={60} fill={COLORS.greenLeaf} {...xl} /><text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>DO</text></g>
      <text x={cx + 180} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={30} fill={COLORS.greenDark}>breaks the loop</text>
    </g>
  );
};

/** What-if branches, each splitting into worse and worse outcomes (all ✗). */
const WhatifBranches: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = CANVAS.width * 0.56; const topY = CANVAS.height * 0.2;
  const node = (x: number, y: number, show: number, bad: boolean) => (draw > show ? (
    <g><circle cx={x} cy={y} r={bad ? 34 : 44} fill={bad ? COLORS.red : COLORS.sky} {...lg} />{bad ? <path d={`M ${x - 14} ${y - 14} l 28 28 m 0 -28 l -28 28`} stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /> : <text x={x} y={y + 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>?</text>}</g>
  ) : null);
  return (
    <g>
      <path d={`M ${cx} ${topY + 44} L ${cx - 260} ${topY + 200} M ${cx} ${topY + 44} L ${cx + 260} ${topY + 200}`} stroke={COLORS.outline} strokeWidth={STROKE.lg} opacity={draw > 0.3 ? 0.5 : 0} />
      <path d={`M ${cx - 260} ${topY + 240} L ${cx - 380} ${topY + 400} M ${cx - 260} ${topY + 240} L ${cx - 160} ${topY + 400} M ${cx + 260} ${topY + 240} L ${cx + 160} ${topY + 400} M ${cx + 260} ${topY + 240} L ${cx + 380} ${topY + 400}`} stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={draw > 0.6 ? 0.5 : 0} />
      {node(cx, topY, 0, false)}
      {node(cx - 260, topY + 220, 0.3, false)}
      {node(cx + 260, topY + 220, 0.3, false)}
      {node(cx - 380, topY + 420, 0.6, true)}
      {node(cx - 160, topY + 420, 0.6, true)}
      {node(cx + 160, topY + 420, 0.6, true)}
      {node(cx + 380, topY + 420, 0.6, true)}
      <text x={cx} y={topY + 540} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>every branch ends in disaster</text>
    </g>
  );
};

/** A downward funnel of escalating overthinking — narrower and darker. */
const SpiralFunnel: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const topY = 200;
  const bands = [COLORS.greenLeaf, COLORS.yellow, COLORS.hoodie, COLORS.red, COLORS.redDark];
  const a = frame / 18;
  return (
    <g>
      {bands.map((c, i) => {
        const w = 500 - i * 90; const y = topY + i * 110;
        return <path key={i} d={`M ${cx - w / 2} ${y} L ${cx + w / 2} ${y} L ${cx + (w - 90) / 2} ${y + 110} L ${cx - (w - 90) / 2} ${y + 110} Z`} fill={c} opacity={0.8} {...lg} />;
      })}
      {/* a token spiralling down */}
      {(() => { const i = Math.min(4, Math.floor((frame / 24) % 5)); const w = 420 - i * 90; const y = topY + i * 110 + 55; return <circle cx={cx + Math.sin(a) * (w / 2 - 20)} cy={y} r={18} fill={COLORS.white} {...lg} />; })()}
      <text x={cx} y={topY - 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>the spiral down</text>
      <text x={cx} y={topY + 5 * 110 + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.redDark}>harder to climb out</text>
    </g>
  );
};

/** Comparison → envy: they size themselves against you and come up short. */
const ComparisonEnvy: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const pulse = 0.5 + 0.4 * Math.abs(Math.sin(frame / 8));
  return (
    <g>
      {/* YOU, tall + a trophy glow */}
      <g transform={`translate(${cx - 220} ${cy})`}>
        <circle cx={0} cy={-120} r={56} fill={COLORS.white} {...xl} />
        <path d="M -70 80 Q 0 -70 70 80 Z" fill={COLORS.sky} {...xl} />
        <circle cx={0} cy={-200} r={30} fill={COLORS.yellow} opacity={pulse} />
        <text x={0} y={140} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>YOU</text>
      </g>
      {/* measuring ruler between them */}
      <rect x={cx - 120} y={cy - 10} width={240} height={30} rx={8} fill={COLORS.yellowSoft} {...lg} />
      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={cx - 110 + i * 28} y1={cy - 10} x2={cx - 110 + i * 28} y2={cy + 4} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}
      {/* THEM, shorter + green */}
      <g transform={`translate(${cx + 220} ${cy + 30})`}>
        <circle cx={0} cy={-90} r={50} fill={COLORS.greenLeaf} {...xl} />
        <path d="M -60 60 Q 0 -50 60 60 Z" fill={COLORS.greenLeaf} {...xl} />
        <circle cx={-16} cy={-94} r={6} fill={COLORS.outline} /><circle cx={16} cy={-94} r={6} fill={COLORS.outline} />
        <path d="M -16 -66 l 32 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <text x={0} y={110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>THEM</text>
      </g>
      <text x={cx} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>envy = comparison + insecurity</text>
    </g>
  );
};

/** Warm/cold map: their warmth toward you falls as your success rises. */
const WarmColdMap: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x0 = CANVAS.width * 0.36; const y0 = 760; const w = 900; const h = 420;
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} {...lg} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h} {...lg} />
      <text x={x0 + w / 2} y={y0 + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={32} fill={COLORS.outline}>YOUR SUCCESS →</text>
      <text x={x0 - 30} y={y0 - h / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={32} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 30} ${y0 - h / 2})`}>THEIR WARMTH</text>
      <path d={`M ${x0} ${y0 - h * 0.85} L ${x0 + w} ${y0 - h * 0.1}`} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - draw)} />
      {draw > 0.95 && <g><g transform={`translate(${x0 + 60} ${y0 - h * 0.78})`}><circle r={16} fill={COLORS.red} /><path d="M -8 -8 l 16 16 m 0 -16 l -16 16" stroke={COLORS.white} strokeWidth={STROKE.sm} /></g><text x={x0 + 120} y={y0 - h * 0.82} fontFamily={fontFamily} fontWeight={700} fontSize={28} fill={COLORS.redDark}>warm when you struggle</text><text x={x0 + w - 60} y={y0 - h * 0.1 - 30} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={28} fill={COLORS.blueDiagramDark}>cold when you win</text></g>}
    </g>
  );
};

/** Jealousy's roots: insecurity + comparison feed the green-eyed monster. */
const JealousyRoots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const p = springIn(frame, fps, 12, { damping: 13 });
  return (
    <g>
      <g transform={`translate(${cx - 220} ${cy + 120}) scale(${Math.min(1, p)})`}><rect x={-140} y={-50} width={280} height={100} rx={20} fill={COLORS.sky} {...lg} /><text x={0} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>INSECURITY</text></g>
      <g transform={`translate(${cx + 220} ${cy + 120}) scale(${Math.min(1, p)})`}><rect x={-150} y={-50} width={300} height={100} rx={20} fill={COLORS.yellow} {...lg} /><text x={0} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>COMPARISON</text></g>
      <path d={`M ${cx - 180} ${cy + 70} Q ${cx - 60} ${cy} ${cx} ${cy - 60} M ${cx + 180} ${cy + 70} Q ${cx + 60} ${cy} ${cx} ${cy - 60}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} opacity={0.5} />
      <g transform={`translate(${cx} ${cy - 130}) scale(0.9)`}>
        <circle r={86} fill={COLORS.greenLeaf} {...xl} />
        <circle cx={-26} cy={-6} r={16} fill={COLORS.white} /><circle cx={26} cy={-6} r={16} fill={COLORS.white} />
        <circle cx={-22} cy={-4} r={8} fill={COLORS.greenDark} /><circle cx={30} cy={-4} r={8} fill={COLORS.greenDark} />
        <path d="M -40 -34 l 28 10 M 40 -34 l -28 10" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <text x={cx} y={cy - 240} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>it's about them, not you</text>
    </g>
  );
};

/** How to respond: don't shrink — three calm moves. */
const HowToRespond: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const moves = [
    { t: "don't dim your light", c: COLORS.yellow },
    { t: 'a little compassion', c: COLORS.pink },
    { t: 'keep your boundaries', c: COLORS.sky },
  ];
  const x = CANVAS.width * 0.56; const y0 = 260; const h = 150; const gap = 30;
  return (
    <g>
      {moves.map((m, i) => {
        const pop = springIn(frame, fps, 10 + i * 8, { damping: 13 });
        return (
          <g key={i} transform={`translate(${x} ${y0 + i * (h + gap)}) scale(${Math.min(1, pop)})`}>
            <rect x={-360} y={0} width={720} height={h} rx={24} fill={m.c} {...lg} />
            <g transform={`translate(${-300} ${h / 2})`}><circle r={34} fill={COLORS.white} {...sm} /><path d="M -16 2 l 12 14 l 20 -26" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
            <text x={-220} y={h / 2 + 16} fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>{m.t}</text>
          </g>
        );
      })}
    </g>
  );
};

/** A complex = an emotionally-charged cluster pulling in thoughts, feelings, memories. */
const ComplexCore: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const bits = ['a memory', 'a feeling', 'a belief', 'a fear', 'a wound'];
  return (
    <g>
      {bits.map((b, i) => {
        const a = (i / bits.length) * Math.PI * 2 + frame / 40;
        const r = 230 + Math.sin(frame / 12 + i) * 16;
        const x = cx + Math.cos(a) * r; const y = cy + Math.sin(a) * (r * 0.7);
        return (
          <g key={b}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={0.4} />
            <g transform={`translate(${x} ${y})`}><rect x={-80} y={-28} width={160} height={56} rx={16} fill={[COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.lavender, COLORS.greenTeal][i]} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{b}</text></g>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={94} fill={COLORS.red} opacity={0.3} />
      <circle cx={cx} cy={cy} r={66} fill={COLORS.red} {...xl} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.white}>CORE</text>
      <text x={cx} y={cy + 260} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>a charged knot in the mind</text>
    </g>
  );
};

/** Inferiority → overcompensation → superiority (the same wound, two masks). */
const OvercompensateArc: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cy = CANVAS.height * 0.56; const cx = CANVAS.width * 0.56;
  return (
    <g>
      <g transform={`translate(${cx - 320} ${cy})`}><rect x={-130} y={-50} width={260} height={100} rx={20} fill={COLORS.sky} {...lg} /><text x={0} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>INFERIOR</text></g>
      <g transform={`translate(${cx + 320} ${cy})`}><rect x={-140} y={-50} width={280} height={100} rx={20} fill={COLORS.red} {...lg} /><text x={0} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.white}>SUPERIOR</text></g>
      <path d={`M ${cx - 200} ${cy - 20} Q ${cx} ${cy - 260} ${cx + 200} ${cy - 20}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - draw)} />
      {draw > 0.9 && <path d={`M ${cx + 200} ${cy - 20} l -26 -18 l 6 24 z`} fill={COLORS.outline} />}
      <text x={cx} y={cy - 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>overcompensation</text>
      <text x={cx} y={cy + 140} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>same wound, opposite mask</text>
    </g>
  );
};

/** A flower of behaviour above ground, a tangled complex root below (the hidden driver). */
const HiddenRoots: React.FC = () => {
  const cx = CANVAS.width * 0.56; const ground = CANVAS.height * 0.5;
  return (
    <g>
      <rect x={CANVAS.width * 0.28} y={ground} width={CANVAS.width * 0.56} height={CANVAS.height - ground} fill={COLORS.wood} opacity={0.3} />
      <line x1={CANVAS.width * 0.28} y1={ground} x2={CANVAS.width * 0.84} y2={ground} stroke={COLORS.woodDark} strokeWidth={STROKE.lg} />
      {/* flower above = the behaviour */}
      <line x1={cx} y1={ground} x2={cx} y2={ground - 150} stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <g transform={`translate(${cx} ${ground - 180})`}>{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={Math.cos(k * 1.26) * 38} cy={Math.sin(k * 1.26) * 38} r={28} fill={COLORS.yellow} {...lg} />)}<circle r={22} fill={COLORS.yellowDark} /></g>
      <text x={cx + 170} y={ground - 170} fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>the behaviour</text>
      {/* roots below = the complex */}
      <path d={`M ${cx} ${ground} Q ${cx - 120} ${ground + 120} ${cx - 220} ${ground + 300} M ${cx} ${ground} Q ${cx + 100} ${ground + 140} ${cx + 230} ${ground + 280} M ${cx} ${ground} Q ${cx - 30} ${ground + 180} ${cx + 20} ${ground + 340} M ${cx} ${ground} Q ${cx + 60} ${ground + 100} ${cx - 90} ${ground + 320}`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} />
      <text x={cx + 200} y={ground + 260} fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.redDark}>the complex</text>
    </g>
  );
};

/** Two sides of one coin — the inferiority/superiority flip. */
const TwoSidesCoin: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = Math.cos(frame / 16);
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const front = flip >= 0;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 210} rx={110} ry={24} fill={COLORS.outline} opacity={0.14} />
      <g transform={`translate(${cx} ${cy}) scale(${Math.abs(flip)} 1)`} style={{ transformOrigin: 'center' }}>
        <circle r={170} fill={front ? COLORS.sky : COLORS.red} {...xl} />
        <circle r={140} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
        <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>{front ? '“I’m less”' : '“I’m more”'}</text>
      </g>
      <text x={cx} y={cy + 270} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>one coin, two faces</text>
    </g>
  );
};

/** four-axes: the four preference dials that build a type (I-E, S-N, T-F, J-P). */
const FourAxes: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.58; const cy = CANVAS.height * 0.4;
  const rows: [string, string, string, number, string][] = [
    ['MIND', 'I', 'E', 0.32, COLORS.purpleDeep],
    ['ENERGY', 'S', 'N', 0.68, COLORS.greenLeaf],
    ['NATURE', 'T', 'F', 0.4, COLORS.blueDiagram],
    ['TACTICS', 'J', 'P', 0.6, COLORS.yellowDark],
  ];
  return (
    <g>
      {rows.map(([lab, a, b, pos, col], i) => {
        const y = cy - 160 + i * 106;
        const prog = springIn(frame - i * 6, 10);
        const x1 = cx - 180, x2 = cx + 180;
        const kx = x1 + (x2 - x1) * (0.5 + (pos - 0.5) * prog);
        return (
          <g key={lab}>
            <text x={x1 - 150} y={y + 10} fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{lab}</text>
            <text x={x1 - 34} y={y + 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={shade(col, -0.1)}>{a}</text>
            <text x={x2 + 34} y={y + 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={shade(col, -0.1)}>{b}</text>
            <rect x={x1} y={y - 12} width={360} height={24} rx={12} fill={shade(col, 0.24)} {...lg} />
            <circle cx={kx} cy={y} r={26} fill={col} {...lg} />
          </g>
        );
      })}
      <text x={cx} y={cy + 250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>four dials, sixteen types</text>
    </g>
  );
};

/** four-families: the 2×2 map — Analysts, Diplomats, Sentinels, Explorers. */
const FourFamilies: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const quads: [string, number, number, string][] = [
    ['ANALYSTS', -1, -1, COLORS.purpleDeep],
    ['DIPLOMATS', 1, -1, COLORS.greenLeaf],
    ['SENTINELS', -1, 1, COLORS.blueDiagram],
    ['EXPLORERS', 1, 1, COLORS.yellowDark],
  ];
  const s = 150;
  return (
    <g>
      {quads.map(([lab, qx, qy, col], i) => {
        const p = springIn(frame - i * 7, 10);
        const x = cx + qx * s - s + 8; const y = cy + qy * s - s + 8;
        return (
          <g key={lab} transform={`translate(${cx + qx * (s + 8)} ${cy + qy * (s + 8)}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <rect x={-s + 6} y={-s + 6} width={2 * s - 12} height={2 * s - 12} rx={18} fill={shade(col, 0.2)} {...xl} />
            <text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={shade(col, -0.2)}>{lab}</text>
            <text x={0} y={48} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.white}>×4</text>
          </g>
        );
      })}
    </g>
  );
};

/** cognitive-stack: a little tower of four function blocks, dominant on top. */
const CognitiveStack: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.3;
  const blocks: [string, number, string][] = [
    ['DOMINANT', 1.0, COLORS.yellowDark],
    ['AUXILIARY', 0.8, COLORS.greenLeaf],
    ['TERTIARY', 0.6, COLORS.sky],
    ['INFERIOR', 0.42, COLORS.lavender],
  ];
  return (
    <g>
      {blocks.map(([lab, w, col], i) => {
        const p = springIn(frame - i * 8, 12);
        const bw = 320 * w;
        const y = cy + i * 92;
        return (
          <g key={lab} transform={`translate(${cx} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <rect x={-bw / 2} y={0} width={bw} height={78} rx={12} fill={col} {...xl} />
            <text x={0} y={52} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 92 * 4 + 50} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.outline}>everyone runs all four</text>
    </g>
  );
};

/** type-not-a-box: a spectrum dial (you) vs a rigid cage — a tendency, not a label. */
const TypeNotABox: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const sweep = 0.5 + 0.32 * Math.sin(frame / 20);
  const ang = Math.PI * (1 - sweep);
  const nx = cx - 180 + Math.cos(ang) * 120; const ny = cy + 40 - Math.sin(ang) * 120;
  return (
    <g>
      {/* the spectrum gauge */}
      <path d={`M ${cx - 300} ${cy + 40} A 120 120 0 0 1 ${cx - 60} ${cy + 40}`} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <line x1={cx - 180} y1={cy + 40} x2={nx} y2={ny} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={cx - 180} cy={cy + 40} r={14} fill={COLORS.outline} />
      <text x={cx - 180} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>a dial</text>
      {/* the rigid box, crossed out */}
      <g transform={`translate(${cx + 160} ${cy - 20})`} opacity={0.6}>
        <rect x={-80} y={-80} width={160} height={160} rx={10} fill={shade(COLORS.redDark, 0.3)} {...xl} />
        <line x1={-80} y1={-80} x2={80} y2={80} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <text x={0} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>not a box</text>
      </g>
      <text x={cx - 40} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>a tendency, not a cage</text>
    </g>
  );
};

/** awareness-ladder: the rungs of consciousness, dark base to bright summit. */
const AwarenessLadder: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.58; const cy = CANVAS.height * 0.5;
  const rungs: [string, string][] = [
    ['UNCONSCIOUS', shade(COLORS.purpleDeep, -0.1)],
    ['DREAMING', COLORS.lavender],
    ['AUTOPILOT', COLORS.sky],
    ['PRESENT', COLORS.greenTeal],
    ['SELF-AWARE', COLORS.greenLeaf],
    ['META', COLORS.yellowDark],
    ['PEAK', COLORS.yellow],
  ];
  return (
    <g>
      {rungs.map(([lab, col], i) => {
        const p = springIn(frame - i * 6, 10);
        const y = cy + 210 - i * 64;
        const w = 150 + i * 44;
        return (
          <g key={lab} transform={`translate(${cx} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <rect x={-w / 2} y={-26} width={w} height={48} rx={10} fill={col} {...lg} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <path d={`M ${cx + 280} ${cy + 220} L ${cx + 280} ${cy - 230}`} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" markerEnd="" />
      <path d={`M ${cx + 280} ${cy - 230} l -14 26 l 28 0 Z`} fill={COLORS.outline} />
      <text x={cx + 300} y={cy - 10} fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline} transform={`rotate(90 ${cx + 300} ${cy - 10})`}>more aware</text>
    </g>
  );
};

/** mind-floors: the three storeys of mind — a sliver conscious, a vast unconscious. */
const MindFloors: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.2;
  const floors: [string, number, string][] = [
    ['CONSCIOUS', 90, COLORS.yellow],
    ['SUBCONSCIOUS', 150, COLORS.sky],
    ['UNCONSCIOUS', 330, shade(COLORS.purpleDeep, 0.02)],
  ];
  let yy = cy;
  return (
    <g>
      {floors.map(([lab, h, col], i) => {
        const p = springIn(frame - i * 8, 12);
        const y = yy; yy += h;
        return (
          <g key={lab} transform={`translate(${cx} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <rect x={-230} y={0} width={460} height={h - 10} rx={10} fill={col} {...xl} />
            <text x={0} y={h / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 600} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>most of you is underwater</text>
    </g>
  );
};

/** flow-channel: challenge × skill — flow runs the diagonal between anxiety & boredom. */
const FlowChannel: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const x0 = cx - 230, y0 = cy + 230, S = 440;
  return (
    <g>
      <path d={`M ${x0} ${y0} L ${x0} ${y0 - S}`} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d={`M ${x0} ${y0} L ${x0 + S} ${y0}`} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* zones */}
      <path d={`M ${x0} ${y0} L ${x0} ${y0 - S} L ${x0 + S * 0.62} ${y0 - S} Z`} fill={COLORS.red} opacity={0.3} />
      <path d={`M ${x0} ${y0} L ${x0 + S} ${y0} L ${x0 + S} ${y0 - S * 0.62} Z`} fill={COLORS.sky} opacity={0.3} />
      <path d={`M ${x0} ${y0} L ${x0 + S * 0.62} ${y0 - S} L ${x0 + S} ${y0 - S} L ${x0 + S} ${y0 - S * 0.62} Z`} fill={COLORS.greenLeaf} opacity={0.5} />
      <text x={x0 + 120} y={y0 - S + 60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={shade(COLORS.red, -0.1)}>ANXIETY</text>
      <text x={x0 + S - 110} y={y0 - 36} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={shade(COLORS.skyDark, -0.1)}>BOREDOM</text>
      <text x={x0 + S * 0.66} y={y0 - S * 0.5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline} transform={`rotate(-32 ${x0 + S * 0.66} ${y0 - S * 0.5})`}>FLOW</text>
      <text x={x0 - 20} y={y0 - S - 14} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>challenge</text>
      <text x={x0 + S} y={y0 + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>skill</text>
    </g>
  );
};

/** spectrum-line: the continuum from off to peak, with a gliding marker. */
const SpectrumLine: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const x0 = cx - 360, x1 = cx + 360;
  const ticks = ['COMA', 'DROWSY', 'AWAKE', 'ALERT', 'FLOW', 'PEAK'];
  const t = 0.5 + 0.45 * Math.sin(frame / 26);
  const mx = x0 + (x1 - x0) * t;
  return (
    <g>
      <defs>
        <linearGradient id="specg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(COLORS.purpleDeep, -0.1)} />
          <stop offset="0.5" stopColor={COLORS.sky} />
          <stop offset="1" stopColor={COLORS.yellow} />
        </linearGradient>
      </defs>
      <rect x={x0} y={cy - 16} width={x1 - x0} height={32} rx={16} fill="url(#specg)" {...lg} />
      {ticks.map((t2, i) => {
        const x = x0 + ((x1 - x0) / (ticks.length - 1)) * i;
        return <g key={t2}><line x1={x} y1={cy - 24} x2={x} y2={cy + 24} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><text x={x} y={cy + 56} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{t2}</text></g>;
      })}
      <circle cx={mx} cy={cy} r={22} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy - 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>one sliding scale</text>
    </g>
  );
};

/** present-vs-future: a seesaw where the near, vivid NOW outweighs a faint LATER. */
const PresentVsFuture: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const tilt = -12 + 2 * Math.sin(frame / 20);
  return (
    <g>
      <path d={`M ${cx} ${cy} l -60 120 l 120 0 Z`} fill={COLORS.wood} {...xl} />
      <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
        <rect x={-280} y={-12} width={560} height={24} rx={12} fill={shade(COLORS.wood, 0.12)} {...xl} />
        <circle cx={-210} cy={-70} r={66} fill={COLORS.yellow} {...xl} />
        <text x={-210} y={-62} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>NOW</text>
        <circle cx={210} cy={-40} r={40} fill={COLORS.lavender} opacity={0.7} {...lg} />
        <text x={210} y={-32} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>LATER</text>
      </g>
      <text x={cx} y={cy + 210} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={38} fill={COLORS.outline}>the near always feels bigger</text>
    </g>
  );
};

/** limbic-vs-cortex: a tug-of-war the impulsive limbic brain usually wins. */
const LimbicVsCortex: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const pull = -40 + 10 * Math.sin(frame / 10);
  return (
    <g>
      <line x1={cx - 230} y1={cy} x2={cx + 230} y2={cy} stroke={COLORS.wood} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={cx + pull} cy={cy} r={12} fill={COLORS.red} {...sm} />
      <g transform={`translate(${cx - 250} ${cy})`}>
        <circle r={74} fill={COLORS.red} {...xl} />
        <text x={0} y={-4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.white}>LIMBIC</text>
        <text x={0} y={26} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.white}>"now!"</text>
      </g>
      <g transform={`translate(${cx + 250} ${cy})`}>
        <circle r={74} fill={COLORS.blueDiagram} {...xl} />
        <text x={0} y={-4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.white}>CORTEX</text>
        <text x={0} y={26} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.white}>"later"</text>
      </g>
      <text x={cx} y={cy + 190} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.outline}>an unfair fight</text>
    </g>
  );
};

/** avoidance-loop: task → dread → avoid → relief → (bigger task). */
const AvoidanceLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const R = 150;
  const nodes: [string, string][] = [['TASK', COLORS.sky], ['DREAD', COLORS.red], ['AVOID', COLORS.yellowDark], ['RELIEF', COLORS.greenLeaf]];
  const dot = (frame % 120) / 120;
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="4 16" opacity={0.5} />
      {nodes.map(([lab, col], i) => {
        const a = -Math.PI / 2 + (i / 4) * Math.PI * 2;
        const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
        return <g key={lab} transform={`translate(${x} ${y})`}><circle r={56} fill={col} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{lab}</text></g>;
      })}
      {(() => { const a = -Math.PI / 2 + dot * Math.PI * 2; return <circle cx={cx + Math.cos(a) * R} cy={cy + Math.sin(a) * R} r={12} fill={COLORS.outline} />; })()}
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>relief</text>
      <text x={cx} y={cy + 34} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>trains it</text>
      <text x={cx} y={cy + R + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>the avoidance loop</text>
    </g>
  );
};

/** do-it-ladder: shrink it → two-minute start → momentum. */
const DoItLadder: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.62;
  const steps: [string, string][] = [['SHRINK IT', COLORS.sky], ['START 2 MIN', COLORS.greenTeal], ['MOMENTUM', COLORS.greenLeaf]];
  return (
    <g>
      {steps.map(([lab, col], i) => {
        const p = springIn(frame - i * 8, 12);
        const x = cx - 220 + i * 200; const y = cy - i * 130;
        return (
          <g key={lab} transform={`translate(${x} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <rect x={-96} y={-40} width={192} height={80} rx={12} fill={col} {...xl} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{lab}</text>
            {i < 2 && <path d={`M 100 -20 l 70 -70`} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />}
          </g>
        );
      })}
      <text x={cx} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>small beats the monster</text>
    </g>
  );
};

/** argument-anatomy: a claim held up by evidence and reasoning. */
const ArgumentAnatomy: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.3;
  return (
    <g>
      <g transform={`translate(${cx} ${cy}) scale(${springIn(frame, 10)})`} style={{ transformOrigin: 'center' }}>
        <rect x={-150} y={-44} width={300} height={88} rx={12} fill={COLORS.sky} {...xl} />
        <text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>CLAIM</text>
      </g>
      {([['EVIDENCE', -180, COLORS.greenLeaf], ['REASONING', 180, COLORS.yellow]] as [string, number, string][]).map(([lab, dx, col], i) => (
        <g key={lab}>
          <line x1={cx + dx} y1={cy + 200} x2={cx + dx * 0.3} y2={cy + 60} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
          <path d={`M ${cx + dx * 0.3} ${cy + 60} l -12 24 l 24 0 Z`} fill={COLORS.outline} />
          <g transform={`translate(${cx + dx} ${cy + 240}) scale(${springIn(frame - 10 - i * 6, 10)})`} style={{ transformOrigin: 'center' }}>
            <rect x={-140} y={-44} width={280} height={88} rx={12} fill={col} {...xl} />
            <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{lab}</text>
          </g>
        </g>
      ))}
      <text x={cx} y={cy + 400} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>knock out a leg, the claim falls</text>
    </g>
  );
};

/** attack-argument: play the ball (the argument), not the player (the person). */
const AttackArgument: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  return (
    <g>
      {/* the player (person) — crossed out */}
      <g transform={`translate(${cx - 170} ${cy})`} opacity={0.55}>
        <circle cx={0} cy={-40} r={40} fill={COLORS.white} {...lg} />
        <circle cx={-14} cy={-46} r={6} fill={COLORS.outline} /><circle cx={14} cy={-46} r={6} fill={COLORS.outline} />
        <path d={`M -36 56 Q 0 -4 36 56 Z`} fill={shade(COLORS.white, 0.1)} {...xl} />
        <line x1={-56} y1={-96} x2={56} y2={72} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <text x={0} y={104} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>the person</text>
      </g>
      {/* the ball (argument) — the real target */}
      <g transform={`translate(${cx + 170} ${cy})`}>
        <circle cx={0} cy={0} r={70} fill={COLORS.greenLeaf} {...xl} />
        <path d="M -70 0 h 140 M 0 -70 v 140" stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={0.5} />
        <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>ARGUMENT</text>
      </g>
      <text x={cx} y={cy + 180} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>play the ball, not the player</text>
    </g>
  );
};

/** correlation-causation: two lines rise together, but one didn't cause the other. */
const CorrelationCausation: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.42;
  const pts = (off: number) => Array.from({ length: 40 }).map((_, i) => `${cx - 260 + i * 13} ${cy + 60 - i * 3 + off + Math.sin(i / 3) * 14}`).join(' ');
  return (
    <g>
      <polyline points={pts(0)} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={pts(50)} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <g transform={`translate(${cx} ${cy + 180})`}>
        <circle r={52} fill={COLORS.white} {...xl} />
        <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={54} fill={COLORS.red}>≠</text>
      </g>
      <text x={cx} y={cy + 290} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>moving together isn't causing</text>
    </g>
  );
};

/** spot-it-checklist: quick red-flags that a fallacy is afoot. */
const SpotItChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.24;
  const items = ['Attacking the person?', 'Only two options?', 'Tugging emotions?', 'Dodging the point?'];
  return (
    <g>
      <rect x={cx - 280} y={cy - 40} width={560} height={420} rx={16} fill={COLORS.white} {...xl} />
      {items.map((t, i) => {
        const p = springIn(frame - i * 10, 12);
        const y = cy + 40 + i * 86;
        return (
          <g key={t} opacity={p}>
            <rect x={cx - 240} y={y - 30} width={44} height={44} rx={8} fill={COLORS.greenLeaf} {...lg} />
            <path d={`M ${cx - 232} ${y - 8} l 12 12 l 20 -26`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
            <text x={cx - 170} y={y} fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>{t}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 430} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>if yes — pause and check</text>
    </g>
  );
};

/** introvert-battery: drains in a crowd, fills back up alone. */
const IntrovertBattery: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const Batt = ({ x, fill, col, lab }: { x: number; fill: number; col: string; lab: string }) => (
    <g transform={`translate(${x} ${cy})`}>
      <rect x={-60} y={-110} width={120} height={220} rx={16} fill={COLORS.white} {...xl} />
      <rect x={-22} y={-128} width={44} height={20} rx={6} fill={COLORS.outline} />
      <rect x={-46} y={110 - fill * 200} width={92} height={fill * 200} rx={8} fill={col} />
      <text x={0} y={160} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{lab}</text>
    </g>
  );
  return (
    <g>
      <Batt x={cx - 150} fill={0.2} col={COLORS.red} lab="IN A CROWD" />
      <Batt x={cx + 150} fill={0.95} col={COLORS.greenLeaf} lab="ALONE" />
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>solitude recharges them</text>
    </g>
  );
};

/** quality-quantity: a few deep bonds vs a scatter of shallow ones. */
const QualityQuantity: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  return (
    <g>
      {/* deep few */}
      <g transform={`translate(${cx - 180} ${cy})`}>
        <circle cx={0} cy={0} r={70} fill={COLORS.greenLeaf} {...xl} />
        <circle cx={0} cy={0} r={46} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
        <circle cx={-120} cy={0} r={46} fill={COLORS.greenTeal} {...lg} />
        <line x1={-74} y1={0} x2={-46} y2={0} stroke={COLORS.outline} strokeWidth={STROKE.lg} />
        <text x={-60} y={130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a few, deep</text>
      </g>
      {/* shallow many */}
      <g transform={`translate(${cx + 220} ${cy})`}>
        {Array.from({ length: 11 }).map((_, i) => { const a = (i / 11) * Math.PI * 2; const r = 90 + (i % 2) * 24; return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={16} fill={COLORS.sky} opacity={0.6} {...sm} />; })}
        <text x={0} y={150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>many, shallow</text>
      </g>
      <text x={cx + 20} y={cy + 210} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>they choose the left</text>
    </g>
  );
};

/** solitude-vs-loneliness: same aloneness, two very different feelings. */
const SolitudeVsLoneliness: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.42;
  const Face = ({ x, c, happy, lab, sub }: { x: number; c: string; happy: boolean; lab: string; sub: string }) => (
    <g transform={`translate(${x} ${cy})`}>
      <circle cx={0} cy={0} r={86} fill={c} {...xl} />
      <circle cx={-28} cy={-14} r={9} fill={COLORS.outline} /><circle cx={28} cy={-14} r={9} fill={COLORS.outline} />
      {happy ? <path d="M -28 28 Q 0 54 28 28" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
             : <path d="M -28 40 Q 0 16 28 40" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />}
      <text x={0} y={132} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>{lab}</text>
      <text x={0} y={166} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{sub}</text>
    </g>
  );
  return (
    <g>
      <Face x={cx - 150} c={COLORS.greenLeaf} happy lab="SOLITUDE" sub="chosen" />
      <Face x={cx + 180} c={COLORS.sky} happy={false} lab="LONELINESS" sub="painful" />
      <text x={cx + 15} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>alone, but not the same</text>
    </g>
  );
};

/** social-budget: a meter of social energy that gets spent and needs refilling. */
const SocialBudget: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const lvl = 0.5 + 0.4 * Math.sin(frame / 24);
  return (
    <g>
      <rect x={cx - 240} y={cy - 36} width={480} height={72} rx={36} fill={COLORS.white} {...xl} />
      <rect x={cx - 228} y={cy - 24} width={456 * lvl} height={48} rx={24} fill={lvl > 0.4 ? COLORS.greenLeaf : COLORS.red} />
      <text x={cx} y={cy - 80} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>SOCIAL BATTERY</text>
      <text x={cx - 300} y={cy + 110} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>people spend it</text>
      <text x={cx + 120} y={cy + 110} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>solitude refills it</text>
    </g>
  );
};

/** intelligence-wheel: one mind, many spokes of intelligence. */
const IntelligenceWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.57; const cy = CANVAS.height * 0.46; const R = 190;
  const cols = [COLORS.sky, COLORS.blueDiagram, COLORS.lavender, COLORS.pink, COLORS.red, COLORS.yellowDark, COLORS.greenTeal, COLORS.greenLeaf, COLORS.purpleDeep];
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={0.3} strokeDasharray="4 10" />
      {cols.map((c, i) => {
        const a = -Math.PI / 2 + (i / cols.length) * Math.PI * 2;
        const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
        const p = springIn(frame - i * 4, 10);
        return <g key={i}><line x1={cx} y1={cy} x2={x} y2={y} stroke={shade(c, -0.05)} strokeWidth={STROKE.sm} opacity={0.5} /><g transform={`translate(${x} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}><circle r={42} fill={c} {...lg} /></g></g>;
      })}
      <circle cx={cx} cy={cy} r={58} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>YOU</text>
      <text x={cx} y={cy + R + 96} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>smart is not one thing</text>
    </g>
  );
};

/** not-one-number: a single IQ score crossed out beside a rainbow of abilities. */
const NotOneNumber: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const bars = [COLORS.sky, COLORS.pink, COLORS.red, COLORS.yellowDark, COLORS.greenLeaf, COLORS.purpleDeep];
  return (
    <g>
      <g transform={`translate(${cx - 230} ${cy})`} opacity={0.6}>
        <rect x={-90} y={-50} width={180} height={100} rx={12} fill={COLORS.white} {...xl} />
        <text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={44} fill={COLORS.outline}>IQ</text>
        <line x1={-96} y1={-56} x2={96} y2={56} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>one number</text>
      </g>
      <g transform={`translate(${cx + 170} ${cy})`}>
        {bars.map((c, i) => { const h = 50 + ((i * 37) % 90); const p = springIn(frame - i * 5, 10); return <rect key={i} x={-150 + i * 52} y={40 - h * p} width={40} height={h * p} rx={6} fill={c} {...lg} />; })}
        <text x={-20} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>many kinds</text>
      </g>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>a test can't catch all of it</text>
    </g>
  );
};

/** spiky-profile: two people, two very different shapes of strength. */
const SpikyProfile: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const profile = (vals: number[], col: string, ox: number) => (
    <g transform={`translate(${ox} 0)`}>
      {vals.map((v, i) => { const p = springIn(frame - i * 4, 10); return <rect key={i} x={cx - 150 + i * 44} y={cy - v * p} width={30} height={v * p} rx={5} fill={col} {...sm} />; })}
    </g>
  );
  return (
    <g>
      {profile([40, 120, 60, 150, 70, 100], COLORS.sky, -16)}
      {profile([130, 50, 140, 40, 110, 60], COLORS.red, 16)}
      <text x={cx} y={cy + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>everyone's shape is different</text>
      <text x={cx} y={cy - 190} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>your spiky profile</text>
    </g>
  );
};

/** strength-finder: spotlight your top few and grow them. */
const StrengthFinder: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const vals = [60, 150, 70, 130, 50, 90];
  const cols = [COLORS.sky, COLORS.yellow, COLORS.pink, COLORS.greenLeaf, COLORS.lavender, COLORS.red];
  const top = [1, 3];
  return (
    <g>
      {vals.map((v, i) => {
        const p = springIn(frame - i * 4, 10); const isTop = top.includes(i);
        return <g key={i}>{isTop && <circle cx={cx - 140 + i * 50} cy={cy - v - 24} r={16} fill={COLORS.yellow} opacity={0.5 + 0.4 * Math.sin(frame / 6)} />}<rect x={cx - 160 + i * 50} y={cy - v * p} width={36} height={v * p} rx={6} fill={cols[i]} {...(isTop ? lg : sm)} opacity={isTop ? 1 : 0.55} /></g>;
      })}
      <line x1={cx - 170} y1={cy} x2={cx + 150} y2={cy} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={cx} y={cy + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>find your spikes, then grow them</text>
    </g>
  );
};

/** cbt-triangle: thoughts, feelings and actions all pull on each other. */
const CbtTriangle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const R = 160;
  const nodes: [string, string, number][] = [['THOUGHT', COLORS.sky, -90], ['FEELING', COLORS.pink, 30], ['ACTION', COLORS.greenLeaf, 150]];
  const pts = nodes.map(([, , a]) => [cx + Math.cos((a * Math.PI) / 180) * R, cy + Math.sin((a * Math.PI) / 180) * R]);
  return (
    <g>
      {pts.map((p, i) => { const q = pts[(i + 1) % 3]; return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.4} />; })}
      {nodes.map(([lab, col], i) => { const p = pts[i]; const s = springIn(frame - i * 6, 10); return <g key={lab} transform={`translate(${p[0]} ${p[1]}) scale(${s})`} style={{ transformOrigin: 'center' }}><circle r={64} fill={col} {...xl} /><text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{lab}</text></g>; })}
      <text x={cx} y={cy + R + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>change a thought, change it all</text>
    </g>
  );
};

/** distortion-vs-reality: a plain fact beside its blown-up, warped version. */
const DistortionVsReality: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  return (
    <g>
      <g transform={`translate(${cx - 180} ${cy})`}>
        <circle r={54} fill={COLORS.greenLeaf} {...xl} />
        <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>fact</text>
        <text x={0} y={100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>reality</text>
      </g>
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>→</text>
      <g transform={`translate(${cx + 200} ${cy})`}>
        <path d="M 0 -150 C 130 -120 130 120 0 150 C -130 120 -130 -120 0 -150 Z" fill={shade(COLORS.red, 0.3)} {...xl} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.red}>DISASTER</text>
        <text x={0} y={26} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>the distortion</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>same fact, warped</text>
    </g>
  );
};

/** catch-check-change: the three-step reframe. */
const CatchCheckChange: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const steps: [string, string, string][] = [['1', 'CATCH', 'the thought'], ['2', 'CHECK', 'the evidence'], ['3', 'CHANGE', 'to balanced']];
  return (
    <g>
      {steps.map(([n, lab, sub], i) => {
        const p = springIn(frame - i * 10, 12); const y = cy - 150 + i * 150;
        return (
          <g key={lab} transform={`translate(${cx} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <circle cx={-180} cy={0} r={38} fill={[COLORS.sky, COLORS.yellow, COLORS.greenLeaf][i]} {...lg} /><text x={-180} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>{n}</text>
            <text x={-110} y={-4} fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>{lab}</text>
            <text x={-110} y={30} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{sub}</text>
            {i < 2 && <line x1={-180} y1={40} x2={-180} y2={112} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="4 8" />}
          </g>
        );
      })}
    </g>
  );
};

/** thought-spiral: a distortion spirals down — until a reframe brakes it. */
const ThoughtSpiral: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.57; const cy = CANVAS.height * 0.4;
  const pts = Array.from({ length: 50 }).map((_, i) => { const a = i * 0.5; const r = 150 - i * 2.6; return `${cx + Math.cos(a) * r},${cy + i * 5 + Math.sin(a) * r}`; });
  const brake = springIn(frame - 20, 14);
  return (
    <g>
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.7} />
      <circle cx={cx + 150} cy={cy} r={12} fill={COLORS.red} />
      <g transform={`translate(${cx} ${cy + 250}) scale(${brake})`} style={{ transformOrigin: 'center' }}>
        <rect x={-120} y={-34} width={240} height={68} rx={16} fill={COLORS.greenLeaf} {...xl} />
        <text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>REFRAME</text>
      </g>
      <text x={cx} y={cy - 170} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>catch it before it spirals</text>
    </g>
  );
};

/** emotion-wheel-map: the eight basic emotions around the wheel. */
const EmotionWheelMap: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.57; const cy = CANVAS.height * 0.46; const R = 185;
  const spokes: [string, string][] = [['JOY', COLORS.yellow], ['TRUST', COLORS.greenLeaf], ['FEAR', COLORS.purpleDeep], ['SURPRISE', COLORS.sky], ['SADNESS', COLORS.blueDiagram], ['DISGUST', COLORS.greenDark], ['ANGER', COLORS.red], ['ANTICIPATION', COLORS.yellowDark]];
  return (
    <g>
      {spokes.map(([lab, c], i) => {
        const a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
        const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
        const p = springIn(frame - i * 4, 10);
        return <g key={lab}><g transform={`translate(${cx + Math.cos(a) * R * 0.5} ${cy + Math.sin(a) * R * 0.5}) rotate(${(a * 180) / Math.PI + 90})`}><ellipse rx={26} ry={R * 0.44} fill={c} opacity={0.7 * p} {...sm} /></g><g transform={`translate(${x} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}><circle r={40} fill={c} {...lg} /></g><text x={cx + Math.cos(a) * (R + 56)} y={cy + Math.sin(a) * (R + 56) + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline} opacity={p}>{lab}</text></g>;
      })}
      <circle cx={cx} cy={cy} r={46} fill={COLORS.white} {...xl} />
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>8 basics</text>
    </g>
  );
};

/** emotions-job: every emotion is a signal with a purpose. */
const EmotionsJob: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.55; const cy = CANVAS.height * 0.24;
  const rows: [string, string, string][] = [['FEAR', 'protects you', COLORS.purpleDeep], ['ANGER', 'defends your limits', COLORS.red], ['SADNESS', 'calls for support', COLORS.blueDiagram], ['JOY', 'says do more of this', COLORS.yellow], ['DISGUST', 'keeps you from harm', COLORS.greenDark]];
  return (
    <g>
      {rows.map(([e, job, c], i) => {
        const p = springIn(frame - i * 7, 10); const y = cy + i * 100;
        return (
          <g key={e} opacity={p}>
            <rect x={cx - 240} y={y - 32} width={170} height={64} rx={12} fill={c} {...lg} /><text x={cx - 155} y={y + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.white}>{e}</text>
            <path d="M 0 0 l 40 0 m -12 -10 l 12 10 l -12 10" transform={`translate(${cx - 64} ${y})`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
            <text x={cx + 10} y={y + 8} fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{job}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 540} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>every feeling is a messenger</text>
    </g>
  );
};

/** opposite-emotions: the wheel's four opposite pairs. */
const OppositeEmotions: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.42;
  const pairs: [string, string, string, string][] = [['JOY', 'SADNESS', COLORS.yellow, COLORS.blueDiagram], ['TRUST', 'DISGUST', COLORS.greenLeaf, COLORS.greenDark], ['FEAR', 'ANGER', COLORS.purpleDeep, COLORS.red], ['SURPRISE', 'ANTICIPATION', COLORS.sky, COLORS.yellowDark]];
  return (
    <g>
      {pairs.map(([a, b, ca, cb], i) => {
        const p = springIn(frame - i * 6, 10); const y = cy - 150 + i * 100;
        return (
          <g key={a} opacity={p}>
            <g transform={`translate(${cx - 180} ${y})`}><circle r={34} fill={ca} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{a}</text></g>
            <text x={cx} y={y + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>↔</text>
            <g transform={`translate(${cx + 180} ${y})`}><circle r={34} fill={cb} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{b}</text></g>
          </g>
        );
      })}
      <text x={cx} y={cy + 270} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>every feeling has its opposite</text>
    </g>
  );
};

/** emotion-blends: two basics combine into a richer feeling. */
const EmotionBlends: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.55; const cy = CANVAS.height * 0.26;
  const blends: [string, string, string, string, string, string][] = [
    ['JOY', 'TRUST', 'LOVE', COLORS.yellow, COLORS.greenLeaf, COLORS.pink],
    ['JOY', 'ANTICIPATION', 'OPTIMISM', COLORS.yellow, COLORS.yellowDark, COLORS.greenLeaf],
    ['FEAR', 'SURPRISE', 'ALARM', COLORS.purpleDeep, COLORS.sky, COLORS.red],
    ['SADNESS', 'DISGUST', 'REMORSE', COLORS.blueDiagram, COLORS.greenDark, COLORS.lavender],
  ];
  return (
    <g>
      {blends.map(([a, b, r, ca, cb, cr], i) => {
        const p = springIn(frame - i * 8, 10); const y = cy + i * 120;
        return (
          <g key={r} opacity={p}>
            <g transform={`translate(${cx - 230} ${y})`}><circle r={30} fill={ca} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>{a}</text></g>
            <text x={cx - 160} y={y + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>+</text>
            <g transform={`translate(${cx - 90} ${y})`}><circle r={30} fill={cb} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>{b}</text></g>
            <text x={cx - 10} y={y + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>=</text>
            <g transform={`translate(${cx + 130} ${y})`}><rect x={-100} y={-30} width={200} height={60} rx={14} fill={cr} {...lg} /><text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{r}</text></g>
          </g>
        );
      })}
      <text x={cx} y={cy + 500} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>mix them, and feelings bloom</text>
    </g>
  );
};

export const DiagramCard: React.FC<{
  diagram: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now' | 'decision-fork' | 'dk-curve' | 'loss-scale' | 'framing-flip' | 'defense-shield' | 'iceberg' | 'maturity-ladder' | 'redirect-arrow' | 'pressure-valve' | 'attachment-grid' | 'secure-base' | 'push-pull' | 'chase-cycle' | 'bell-curve' | 'flynn-effect' | 'multi-intelligence' | 'fog-triangle' | 'manipulation-cycle' | 'ask-ladder' | 'dopamine-loop' | 'comparison-trap' | 'attention-economy' | 'default-mode-network' | 'rumination-loop' | 'ironic-process' | 'window-of-now' | 'dial-not-switch' | 'attention-spotlight' | 'hypnogram' | 'sleep-threshold' | 'rem-switch' | 'dream-layers' | 'mind-body-sleep' | 'terror-vs-nightmare' | 'knowledge-circle' | 'iq-vs-eq' | 'overexcitability' | 'complexity-comfort' | 'curiosity-tree' | 'daydream-spectrum' | 'immersion-meter' | 'trigger-loop' | 'two-lives' | 'absorption-scale' | 'circadian-low' | 'cortisol-curve' | 'night-brain' | 'molehill-mountain' | 'dawn-vs-dark' | 'overthink-ladder' | 'thought-vs-action' | 'whatif-branches' | 'spiral-funnel' | 'comparison-envy' | 'warm-cold-map' | 'jealousy-roots' | 'how-to-respond' | 'complex-core' | 'overcompensate-arc' | 'hidden-roots' | 'two-sides-coin' | 'four-axes' | 'four-families' | 'cognitive-stack' | 'type-not-a-box' | 'awareness-ladder' | 'mind-floors' | 'flow-channel' | 'spectrum-line' | 'present-vs-future' | 'limbic-vs-cortex' | 'avoidance-loop' | 'do-it-ladder' | 'argument-anatomy' | 'attack-argument' | 'correlation-causation' | 'spot-it-checklist' | 'introvert-battery' | 'quality-quantity' | 'solitude-vs-loneliness' | 'social-budget' | 'intelligence-wheel' | 'not-one-number' | 'spiky-profile' | 'strength-finder' | 'cbt-triangle' | 'distortion-vs-reality' | 'catch-check-change' | 'thought-spiral' | 'emotion-wheel-map' | 'emotions-job' | 'opposite-emotions' | 'emotion-blends';
  highlight?: string;
  withMascot?: boolean;
  labels?: string[];
  chapterStart?: boolean;
}> = ({ diagram, highlight = 'deep', labels = [], chapterStart }) => {
  const accent: Record<string, string> = {
    'sleep-stage': COLORS.lavender,
    switchboard: COLORS.sky,
    'signal-race': COLORS.yellow,
    'overflow-meter': COLORS.pink,
    'two-gates': COLORS.greenLeaf,
    'then-now': COLORS.sky,
    'decision-fork': COLORS.yellow,
    'dk-curve': COLORS.sky,
    'loss-scale': COLORS.pink,
    'framing-flip': COLORS.greenLeaf,
    'defense-shield': COLORS.sky,
    iceberg: COLORS.sky,
    'maturity-ladder': COLORS.greenLeaf,
    'redirect-arrow': COLORS.yellow,
    'pressure-valve': COLORS.pink,
    'attachment-grid': COLORS.lavender,
    'secure-base': COLORS.greenLeaf,
    'push-pull': COLORS.yellow,
    'chase-cycle': COLORS.pink,
    'bell-curve': COLORS.blueDiagram,
    'flynn-effect': COLORS.greenLeaf,
    'multi-intelligence': COLORS.yellow,
    'fog-triangle': COLORS.lavender,
    'manipulation-cycle': COLORS.red,
    'ask-ladder': COLORS.yellow,
    'dopamine-loop': COLORS.sky,
    'comparison-trap': COLORS.yellow,
    'attention-economy': COLORS.greenLeaf,
    'default-mode-network': COLORS.pink,
    'rumination-loop': COLORS.red,
    'ironic-process': COLORS.lavender,
    'window-of-now': COLORS.greenLeaf,
    'dial-not-switch': COLORS.lavender,
    'attention-spotlight': COLORS.yellow,
    hypnogram: COLORS.blueDiagram,
    'sleep-threshold': COLORS.yellow,
    'rem-switch': COLORS.greenLeaf,
    'dream-layers': COLORS.lavender,
    'mind-body-sleep': COLORS.sky,
    'terror-vs-nightmare': COLORS.red,
    'knowledge-circle': COLORS.yellow,
    'iq-vs-eq': COLORS.blueDiagram,
    overexcitability: COLORS.lavender,
    'complexity-comfort': COLORS.greenTeal,
    'curiosity-tree': COLORS.greenLeaf,
    'daydream-spectrum': COLORS.lavender,
    'immersion-meter': COLORS.lavender,
    'trigger-loop': COLORS.sky,
    'two-lives': COLORS.lavender,
    'absorption-scale': COLORS.pink,
    'circadian-low': COLORS.blueDiagram,
    'cortisol-curve': COLORS.red,
    'night-brain': COLORS.red,
    'molehill-mountain': COLORS.purpleDeep,
    'dawn-vs-dark': COLORS.yellow,
    'overthink-ladder': COLORS.yellow,
    'thought-vs-action': COLORS.greenLeaf,
    'whatif-branches': COLORS.sky,
    'spiral-funnel': COLORS.red,
    'comparison-envy': COLORS.greenLeaf,
    'warm-cold-map': COLORS.sky,
    'jealousy-roots': COLORS.greenLeaf,
    'how-to-respond': COLORS.yellow,
    'complex-core': COLORS.red,
    'overcompensate-arc': COLORS.sky,
    'hidden-roots': COLORS.greenLeaf,
    'two-sides-coin': COLORS.sky,
    'four-axes': COLORS.purpleDeep,
    'four-families': COLORS.greenTeal,
    'cognitive-stack': COLORS.yellow,
    'type-not-a-box': COLORS.greenLeaf,
    'awareness-ladder': COLORS.lavender,
    'mind-floors': COLORS.sky,
    'flow-channel': COLORS.greenLeaf,
    'spectrum-line': COLORS.yellow,
    'present-vs-future': COLORS.yellow,
    'limbic-vs-cortex': COLORS.red,
    'avoidance-loop': COLORS.sky,
    'do-it-ladder': COLORS.greenLeaf,
    'argument-anatomy': COLORS.sky,
    'attack-argument': COLORS.greenLeaf,
    'correlation-causation': COLORS.red,
    'spot-it-checklist': COLORS.yellow,
    'introvert-battery': COLORS.greenLeaf,
    'quality-quantity': COLORS.greenTeal,
    'solitude-vs-loneliness': COLORS.sky,
    'social-budget': COLORS.greenLeaf,
    'intelligence-wheel': COLORS.lavender,
    'not-one-number': COLORS.sky,
    'spiky-profile': COLORS.yellow,
    'strength-finder': COLORS.greenLeaf,
    'cbt-triangle': COLORS.sky,
    'distortion-vs-reality': COLORS.red,
    'catch-check-change': COLORS.greenLeaf,
    'thought-spiral': COLORS.red,
    'emotion-wheel-map': COLORS.pink,
    'emotions-job': COLORS.sky,
    'opposite-emotions': COLORS.lavender,
    'emotion-blends': COLORS.yellow,
  };
  const emo = diagram === 'switchboard' || diagram === 'two-gates' ? 'confused' : diagram === 'overflow-meter' || diagram === 'dk-curve' ? 'excited' : 'serious-expert';
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
        {diagram === 'decision-fork' && <DecisionFork labels={labels} />}
        {diagram === 'dk-curve' && <DKCurve />}
        {diagram === 'loss-scale' && <LossScale />}
        {diagram === 'framing-flip' && <FramingFlip labels={labels} />}
        {diagram === 'defense-shield' && <DefenseShield labels={labels} />}
        {diagram === 'iceberg' && <Iceberg />}
        {diagram === 'maturity-ladder' && <MaturityLadder highlight={highlight} />}
        {diagram === 'redirect-arrow' && <RedirectArrow labels={labels} />}
        {diagram === 'pressure-valve' && <PressureValve />}
        {diagram === 'attachment-grid' && <AttachmentGrid highlight={highlight} />}
        {diagram === 'secure-base' && <SecureBase labels={labels} />}
        {diagram === 'push-pull' && <PushPull labels={labels} />}
        {diagram === 'chase-cycle' && <ChaseCycle labels={labels} />}
        {diagram === 'bell-curve' && <BellCurve highlight={highlight} />}
        {diagram === 'flynn-effect' && <FlynnEffect />}
        {diagram === 'multi-intelligence' && <MultiIntelligence />}
        {diagram === 'fog-triangle' && <FogTriangle />}
        {diagram === 'manipulation-cycle' && <ManipulationCycle />}
        {diagram === 'ask-ladder' && <AskLadder labels={labels} />}
        {diagram === 'dopamine-loop' && <DopamineLoop />}
        {diagram === 'comparison-trap' && <ComparisonTrap />}
        {diagram === 'attention-economy' && <AttentionEconomy />}
        {diagram === 'default-mode-network' && <DefaultModeNetwork />}
        {diagram === 'rumination-loop' && <RuminationLoop />}
        {diagram === 'ironic-process' && <IronicProcess />}
        {diagram === 'window-of-now' && <WindowOfNow />}
        {diagram === 'dial-not-switch' && <DialNotSwitch />}
        {diagram === 'attention-spotlight' && <AttentionSpotlight />}
        {diagram === 'hypnogram' && <Hypnogram />}
        {diagram === 'sleep-threshold' && <SleepThreshold />}
        {diagram === 'rem-switch' && <RemSwitch />}
        {diagram === 'dream-layers' && <DreamLayers />}
        {diagram === 'mind-body-sleep' && <MindBodySleep highlight={highlight} />}
        {diagram === 'terror-vs-nightmare' && <TerrorVsNightmare />}
        {diagram === 'knowledge-circle' && <KnowledgeCircle />}
        {diagram === 'iq-vs-eq' && <IqVsEq />}
        {diagram === 'overexcitability' && <Overexcitability />}
        {diagram === 'complexity-comfort' && <ComplexityComfort />}
        {diagram === 'curiosity-tree' && <CuriosityTree />}
        {diagram === 'daydream-spectrum' && <DaydreamSpectrum />}
        {diagram === 'immersion-meter' && <ImmersionMeter />}
        {diagram === 'trigger-loop' && <TriggerLoop />}
        {diagram === 'two-lives' && <TwoLives />}
        {diagram === 'absorption-scale' && <AbsorptionScale />}
        {diagram === 'circadian-low' && <CircadianLow />}
        {diagram === 'cortisol-curve' && <CortisolCurve />}
        {diagram === 'night-brain' && <NightBrain />}
        {diagram === 'molehill-mountain' && <MolehillMountain />}
        {diagram === 'dawn-vs-dark' && <DawnVsDark />}
        {diagram === 'overthink-ladder' && <OverthinkLadder highlight={highlight} />}
        {diagram === 'thought-vs-action' && <ThoughtVsAction />}
        {diagram === 'whatif-branches' && <WhatifBranches />}
        {diagram === 'spiral-funnel' && <SpiralFunnel />}
        {diagram === 'comparison-envy' && <ComparisonEnvy />}
        {diagram === 'warm-cold-map' && <WarmColdMap />}
        {diagram === 'jealousy-roots' && <JealousyRoots />}
        {diagram === 'how-to-respond' && <HowToRespond />}
        {diagram === 'complex-core' && <ComplexCore />}
        {diagram === 'overcompensate-arc' && <OvercompensateArc />}
        {diagram === 'hidden-roots' && <HiddenRoots />}
        {diagram === 'two-sides-coin' && <TwoSidesCoin />}
        {diagram === 'four-axes' && <FourAxes />}
        {diagram === 'four-families' && <FourFamilies />}
        {diagram === 'cognitive-stack' && <CognitiveStack />}
        {diagram === 'type-not-a-box' && <TypeNotABox />}
        {diagram === 'awareness-ladder' && <AwarenessLadder />}
        {diagram === 'mind-floors' && <MindFloors />}
        {diagram === 'flow-channel' && <FlowChannel />}
        {diagram === 'spectrum-line' && <SpectrumLine />}
        {diagram === 'present-vs-future' && <PresentVsFuture />}
        {diagram === 'limbic-vs-cortex' && <LimbicVsCortex />}
        {diagram === 'avoidance-loop' && <AvoidanceLoop />}
        {diagram === 'do-it-ladder' && <DoItLadder />}
        {diagram === 'argument-anatomy' && <ArgumentAnatomy />}
        {diagram === 'attack-argument' && <AttackArgument />}
        {diagram === 'correlation-causation' && <CorrelationCausation />}
        {diagram === 'spot-it-checklist' && <SpotItChecklist />}
        {diagram === 'introvert-battery' && <IntrovertBattery />}
        {diagram === 'quality-quantity' && <QualityQuantity />}
        {diagram === 'solitude-vs-loneliness' && <SolitudeVsLoneliness />}
        {diagram === 'social-budget' && <SocialBudget />}
        {diagram === 'intelligence-wheel' && <IntelligenceWheel />}
        {diagram === 'not-one-number' && <NotOneNumber />}
        {diagram === 'spiky-profile' && <SpikyProfile />}
        {diagram === 'strength-finder' && <StrengthFinder />}
        {diagram === 'cbt-triangle' && <CbtTriangle />}
        {diagram === 'distortion-vs-reality' && <DistortionVsReality />}
        {diagram === 'catch-check-change' && <CatchCheckChange />}
        {diagram === 'thought-spiral' && <ThoughtSpiral />}
        {diagram === 'emotion-wheel-map' && <EmotionWheelMap />}
        {diagram === 'emotions-job' && <EmotionsJob />}
        {diagram === 'opposite-emotions' && <OppositeEmotions />}
        {diagram === 'emotion-blends' && <EmotionBlends />}
      </svg>
      <Mascot costume="labcoat" pose="point-right" emotion={emo} talking x={CANVAS.width * 0.15} y={CANVAS.height * 0.64} scale={1.2} seed={6} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
