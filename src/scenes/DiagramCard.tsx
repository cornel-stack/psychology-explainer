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

export const DiagramCard: React.FC<{
  diagram: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now' | 'decision-fork' | 'dk-curve' | 'loss-scale' | 'framing-flip' | 'defense-shield' | 'iceberg' | 'maturity-ladder' | 'redirect-arrow' | 'pressure-valve' | 'attachment-grid' | 'secure-base' | 'push-pull' | 'chase-cycle' | 'bell-curve' | 'flynn-effect' | 'multi-intelligence' | 'fog-triangle' | 'manipulation-cycle' | 'ask-ladder' | 'dopamine-loop' | 'comparison-trap' | 'attention-economy';
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
      </svg>
      <Mascot costume="labcoat" pose="point-right" emotion={emo} talking x={CANVAS.width * 0.15} y={CANVAS.height * 0.64} scale={1.2} seed={6} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
