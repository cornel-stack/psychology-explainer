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

/** sternberg-triangle: intimacy + passion + commitment make the kinds of love. */
const SternbergTriangle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const verts: [string, string, number, number][] = [['INTIMACY', COLORS.sky, 0, -170], ['PASSION', COLORS.red, 150, 100], ['COMMITMENT', COLORS.greenLeaf, -150, 100]];
  return (
    <g>
      <path d={`M ${cx} ${cy - 170} L ${cx + 150} ${cy + 100} L ${cx - 150} ${cy + 100} Z`} fill={COLORS.pink} opacity={0.2} {...xl} />
      {verts.map(([lab, c, dx, dy], i) => { const p = springIn(frame - i * 7, 10); return <g key={lab}><g transform={`translate(${cx + dx} ${cy + dy}) scale(${p})`} style={{ transformOrigin: 'center' }}><circle r={48} fill={c} {...lg} /></g><text x={cx + dx} y={cy + dy + (dy < 0 ? -62 : 76)} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{lab}</text></g>; })}
      <text x={cx} y={cy + 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>all three =</text>
      <text x={cx} y={cy + 48} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.red}>lasting love</text>
      <text x={cx} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>Sternberg's triangle</text>
    </g>
  );
};

/** loves-wheel: the eight Greek loves around a heart. */
const LovesWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.57; const cy = CANVAS.height * 0.46; const R = 180;
  const loves: [string, string][] = [['EROS', COLORS.red], ['PHILIA', COLORS.yellow], ['STORGE', COLORS.greenLeaf], ['AGAPE', COLORS.pink], ['LUDUS', COLORS.sky], ['PRAGMA', COLORS.blueDiagram], ['PHILAUTIA', COLORS.greenTeal], ['MANIA', COLORS.purpleDeep]];
  return (
    <g>
      {loves.map(([lab, c], i) => {
        const a = -Math.PI / 2 + (i / 8) * Math.PI * 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; const p = springIn(frame - i * 4, 10);
        return <g key={lab}><g transform={`translate(${x} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}><circle r={40} fill={c} {...lg} /></g><text x={cx + Math.cos(a) * (R + 54)} y={cy + Math.sin(a) * (R + 54) + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline} opacity={p}>{lab}</text></g>;
      })}
      <g transform={`translate(${cx} ${cy}) scale(0.5)`}><path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...xl} /></g>
    </g>
  );
};

/** love-over-time: hot passion fades as warm companionship grows. */
const LoveOverTime: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const W = 440;
  const x0 = cx - W / 2, y0 = cy + 120;
  const passion = Array.from({ length: 40 }).map((_, i) => { const t = i / 39; const y = y0 - 200 * Math.exp(-t * 3) - 10; return `${x0 + t * W},${y}`; });
  const compan = Array.from({ length: 40 }).map((_, i) => { const t = i / 39; const y = y0 - (40 + 150 * (1 - Math.exp(-t * 2))); return `${x0 + t * W},${y}`; });
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + W} y2={y0} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={passion.join(' ')} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={compan.join(' ')} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 + 60} y={y0 - 210} fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.red}>passion</text>
      <text x={x0 + W - 150} y={y0 - 200} fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.greenDark}>companionship</text>
      <text x={cx} y={y0 + 46} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>over time →</text>
      <text x={cx} y={cy - 160} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>spark cools, roots deepen</text>
    </g>
  );
};

/** self-love-first: you can't pour from an empty cup. */
const SelfLoveFirst: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.42;
  const fill = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(frame / 22));
  return (
    <g>
      {/* the cup */}
      <g transform={`translate(${cx - 120} ${cy})`}>
        <path d="M -60 -60 L 60 -60 L 46 90 Q 44 110 0 110 Q -44 110 -46 90 Z" fill={COLORS.white} {...xl} />
        <path d={`M -54 ${90 - fill * 150} L 54 ${90 - fill * 150} L 46 90 Q 44 108 0 108 Q -44 108 -46 90 Z`} fill={COLORS.pink} />
        <path d="M 58 -40 q 44 10 30 60 q -10 30 -40 24" fill="none" stroke={COLORS.white} strokeWidth={STROKE.xl} />
        <text x={0} y={160} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>fill yours first</text>
      </g>
      {/* pouring out to others */}
      <path d={`M ${cx - 30} ${cy + 20} q 120 20 220 -10`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray="6 10" />
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${cx + 130 + i * 70} ${cy - 10 - i * 4}) scale(0.34)`}><path d="M 0 40 C -56 -14 -88 -44 -52 -78 C -28 -100 0 -70 0 -48 C 0 -70 28 -100 52 -78 C 88 -44 56 -14 0 40 Z" fill={COLORS.red} {...lg} /></g>)}
      <text x={cx} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>you can't pour from empty</text>
    </g>
  );
};

/** warmth-competence-grid: the two axes of charisma; magnetic is the top-right. */
const WarmthCompetenceGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const S = 150;
  const quads: [string, number, number, string][] = [['IMPRESSIVE,\nbut cold', -1, -1, COLORS.sky], ['MAGNETIC', 1, -1, COLORS.yellow], ['FORGETTABLE', -1, 1, COLORS.ledGrey], ['LIKED,\nnot respected', 1, 1, COLORS.pink]];
  return (
    <g>
      {quads.map(([lab, qx, qy, c], i) => {
        const p = springIn(frame - i * 6, 10); const x = cx + qx * (S / 2 + 6); const y = cy + qy * (S / 2 + 6);
        return (
          <g key={lab} transform={`translate(${x} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <rect x={-S / 2 + 4} y={-S / 2 + 4} width={S - 8} height={S - 8} rx={12} fill={shade(c, i === 1 ? 0.0 : 0.16)} {...lg} />
            {lab.split('\n').map((ln, j) => <text key={j} x={0} y={-4 + j * 24} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={i === 1 ? 24 : 18} fill={COLORS.outline}>{ln}</text>)}
          </g>
        );
      })}
      <text x={cx} y={cy + S + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>competence →</text>
      <text x={cx - S - 56} y={cy} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline} transform={`rotate(-90 ${cx - S - 56} ${cy})`}>warmth →</text>
    </g>
  );
};

/** charisma-loop: give attention → they feel valued → they're drawn to you. */
const CharismaLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const R = 150;
  const nodes: [string, string][] = [['you give\nattention', COLORS.yellow], ['they feel\nvalued', COLORS.pink], ['they light\nup', COLORS.greenLeaf], ["you're\nmagnetic", COLORS.sky]];
  const dot = (frame % 120) / 120;
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="4 16" opacity={0.5} />
      {nodes.map(([lab, c], i) => { const a = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; return <g key={i} transform={`translate(${x} ${y})`}><circle r={62} fill={c} {...lg} />{lab.split('\n').map((ln, j) => <text key={j} x={0} y={-4 + j * 22} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{ln}</text>)}</g>; })}
      {(() => { const a = -Math.PI / 2 + dot * Math.PI * 2; return <circle cx={cx + Math.cos(a) * R} cy={cy + Math.sin(a) * R} r={12} fill={COLORS.outline} />; })()}
      <text x={cx} y={cy + R + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>charisma is a loop</text>
    </g>
  );
};

/** presence-dial: a distracted half-here vs a fully present you. */
const PresenceDial: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const t = 0.5 + 0.45 * Math.sin(frame / 24);
  const ang = Math.PI * (1 - t);
  const nx = cx + Math.cos(ang) * 150; const ny = cy + 40 - Math.sin(ang) * 150;
  return (
    <g>
      <path d={`M ${cx - 150} ${cy + 40} A 150 150 0 0 1 ${cx + 150} ${cy + 40}`} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <line x1={cx} y1={cy + 40} x2={nx} y2={ny} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={cx} cy={cy + 40} r={14} fill={COLORS.outline} />
      <text x={cx - 170} y={cy + 100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>distracted</text>
      <text x={cx + 170} y={cy + 100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>fully here</text>
      <text x={cx} y={cy - 140} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>presence is the foundation</text>
    </g>
  );
};

/** charisma-learnable: a growth bar from awkward to magnetic. */
const CharismaLearnable: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const p = 0.3 + 0.6 * springIn(frame, 40);
  return (
    <g>
      <rect x={cx - 260} y={cy - 30} width={520} height={60} rx={30} fill={COLORS.white} {...xl} />
      <rect x={cx - 248} y={cy - 18} width={496 * p} height={36} rx={18} fill={COLORS.yellow} />
      <text x={cx - 250} y={cy + 90} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>awkward</text>
      <text x={cx + 150} y={cy + 90} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>magnetic</text>
      <text x={cx} y={cy - 80} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>nobody is born with it</text>
    </g>
  );
};

/** habit-loop-diagram: cue → routine → reward → craving, round and round. */
const HabitLoopDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const R = 155;
  const nodes: [string, string][] = [['CUE', COLORS.sky], ['ROUTINE', COLORS.yellowDark], ['REWARD', COLORS.greenLeaf], ['CRAVING', COLORS.red]];
  const dot = (frame % 120) / 120;
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="4 16" opacity={0.5} />
      {nodes.map(([lab, c], i) => { const a = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; return <g key={lab} transform={`translate(${x} ${y})`}><circle r={58} fill={c} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{lab}</text></g>; })}
      {(() => { const a = -Math.PI / 2 + dot * Math.PI * 2; return <circle cx={cx + Math.cos(a) * R} cy={cy + Math.sin(a) * R} r={12} fill={COLORS.outline} />; })()}
      <text x={cx} y={cy + R + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>every habit runs this loop</text>
    </g>
  );
};

/** reward-timing: good habits pay off later; bad habits pay off now. */
const RewardTiming: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.42;
  const Row = ({ y, lab, nowGood, c }: { y: number; lab: string; nowGood: boolean; c: string }) => (
    <g transform={`translate(${cx} ${y})`}>
      <text x={-320} y={6} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{lab}</text>
      <g transform="translate(-110 0)"><circle r={30} fill={nowGood ? COLORS.red : COLORS.greenLeaf} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>now</text></g>
      <path d="M 0 0 l 90 0 m -14 -10 l 14 10 l -14 10" transform="translate(-72 0)" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(120 0)"><circle r={30} fill={nowGood ? COLORS.greenLeaf : COLORS.red} opacity={0.6} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>later</text></g>
    </g>
  );
  return (
    <g>
      <Row y={cy - 60} lab="GOOD HABIT" nowGood={false} c={COLORS.greenLeaf} />
      <Row y={cy + 70} lab="BAD HABIT" nowGood c={COLORS.red} />
      <text x={cx} y={cy + 200} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>we chase the instant reward</text>
    </g>
  );
};

/** four-laws: make it obvious, attractive, easy, satisfying. */
const FourLaws: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.22;
  const laws: [string, string, string][] = [['1', 'OBVIOUS', COLORS.sky], ['2', 'ATTRACTIVE', COLORS.pink], ['3', 'EASY', COLORS.greenLeaf], ['4', 'SATISFYING', COLORS.yellow]];
  return (
    <g>
      {laws.map(([n, lab, c], i) => {
        const p = springIn(frame - i * 9, 12); const y = cy + i * 110;
        return (
          <g key={lab} transform={`translate(${cx} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <circle cx={-170} cy={0} r={38} fill={c} {...lg} /><text x={-170} y={12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>{n}</text>
            <text x={-110} y={10} fontFamily={fontFamily} fontWeight={800} fontSize={36} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 460} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the four laws of habit</text>
    </g>
  );
};

/** compound-growth: 1% better vs 1% worse, every day. */
const CompoundGrowth: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const W = 440;
  const x0 = cx - W / 2, y0 = cy + 110;
  const up = Array.from({ length: 40 }).map((_, i) => { const t = i / 39; const y = y0 - 230 * (Math.pow(3.7, t) - 1) / 2.7; return `${x0 + t * W},${y}`; });
  const down = Array.from({ length: 40 }).map((_, i) => { const t = i / 39; const y = y0 - 20 + 90 * (1 - Math.pow(0.3, t)); return `${x0 + t * W},${y}`; });
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + W} y2={y0} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - 240} stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={0.4} />
      <polyline points={down.join(' ')} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={up.join(' ')} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 + W - 30} y={y0 - 215} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.greenDark}>1% better</text>
      <text x={x0 + W - 30} y={y0 + 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.red}>1% worse</text>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>tiny habits compound</text>
    </g>
  );
};

/** impostor-cycle: success → "I fooled them" → fear → overwork → success. */
const ImpostorCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const R = 155;
  const nodes: [string, string][] = [['SUCCESS', COLORS.greenLeaf], ['"I fooled\nthem"', COLORS.sky], ['FEAR of\nexposure', COLORS.red], ['OVERWORK', COLORS.yellowDark]];
  const dot = (frame % 120) / 120;
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="4 16" opacity={0.5} />
      {nodes.map(([lab, c], i) => { const a = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; return <g key={i} transform={`translate(${x} ${y})`}><circle r={60} fill={c} {...lg} />{lab.split('\n').map((ln, j) => <text key={j} x={0} y={-4 + j * 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{ln}</text>)}</g>; })}
      {(() => { const a = -Math.PI / 2 + dot * Math.PI * 2; return <circle cx={cx + Math.cos(a) * R} cy={cy + Math.sin(a) * R} r={12} fill={COLORS.outline} />; })()}
      <text x={cx} y={cy + R + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the impostor cycle</text>
    </g>
  );
};

/** competence-confidence-gap: you're more capable than you feel. */
const CompetenceConfidenceGap: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const comp = springIn(frame, 20), conf = springIn(frame - 8, 20);
  return (
    <g>
      <rect x={cx - 180} y={cy + 40 - 200 * comp} width={120} height={200 * comp} rx={10} fill={COLORS.greenLeaf} {...xl} />
      <text x={cx - 120} y={cy + 76} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>your real</text>
      <text x={cx - 120} y={cy + 100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>competence</text>
      <rect x={cx + 60} y={cy + 40 - 90 * conf} width={120} height={90 * conf} rx={10} fill={COLORS.red} {...xl} />
      <text x={cx + 120} y={cy + 76} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>how you</text>
      <text x={cx + 120} y={cy + 100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>feel</text>
      <path d={`M ${cx - 60} ${cy - 170} L ${cx + 60} ${cy - 60}`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="6 8" />
      <text x={cx} y={cy - 120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline} transform={`rotate(-14 ${cx} ${cy - 120})`}>the gap</text>
      <text x={cx} y={cy - 210} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>more capable than you feel</text>
    </g>
  );
};

/** five-types: the five faces of impostor syndrome. */
const FiveTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.54; const cy = CANVAS.height * 0.2;
  const rows: [string, string, string][] = [['PERFECTIONIST', '99% feels like failure', COLORS.greenLeaf], ['EXPERT', 'never knows "enough"', COLORS.sky], ['SOLOIST', "can't ask for help", COLORS.yellowDark], ['GENIUS', 'shame when it’s hard', COLORS.pink], ['SUPERHERO', 'overworks to prove it', COLORS.red]];
  return (
    <g>
      {rows.map(([lab, sub, c], i) => {
        const p = springIn(frame - i * 7, 10); const y = cy + i * 110;
        return (
          <g key={lab} opacity={p}>
            <circle cx={cx - 230} cy={y} r={34} fill={c} {...lg} />
            <text x={cx - 160} y={y - 4} fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>{lab}</text>
            <text x={cx - 160} y={y + 24} fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{sub}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 560} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>five faces of the fraud fear</text>
    </g>
  );
};

/** feelings-vs-facts: weigh the feeling against the evidence. */
const FeelingsVsFacts: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.4;
  const tilt = 10 - 20 * springIn(frame - 10, 30);
  return (
    <g>
      <path d={`M ${cx} ${cy + 60} l -40 120 l 80 0 Z`} fill={COLORS.wood} {...xl} />
      <g transform={`translate(${cx} ${cy + 60}) rotate(${tilt})`}>
        <rect x={-240} y={-10} width={480} height={20} rx={10} fill={shade(COLORS.wood, 0.12)} {...xl} />
        <g transform="translate(-180 -60)"><circle r={54} fill={COLORS.red} {...lg} /><text x={0} y={-2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>FEELING</text><text x={0} y={18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={12} fill={COLORS.white}>"fraud"</text></g>
        <g transform="translate(180 -60)"><circle r={60} fill={COLORS.greenLeaf} {...lg} /><text x={0} y={-2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>FACTS</text><text x={0} y={18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={12} fill={COLORS.outline}>your wins</text></g>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>a feeling is not a fact</text>
    </g>
  );
};

/** five-stages: the classic (Kübler-Ross) five stages. */
const FiveStages: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const stages: [string, string][] = [['DENIAL', COLORS.sky], ['ANGER', COLORS.red], ['BARGAINING', COLORS.yellowDark], ['DEPRESSION', COLORS.blueDiagram], ['ACCEPTANCE', COLORS.greenLeaf]];
  return (
    <g>
      {stages.map(([lab, c], i) => {
        const p = springIn(frame - i * 7, 10); const y = cy - 170 + i * 86;
        return (
          <g key={lab} transform={`translate(${cx} ${y}) scale(${p})`} style={{ transformOrigin: 'center' }}>
            <circle cx={-170} cy={0} r={34} fill={c} {...lg} /><text x={-170} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{i + 1}</text>
            <text x={-116} y={10} fontFamily={fontFamily} fontWeight={800} fontSize={32} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 270} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>a map, not a checklist</text>
    </g>
  );
};

/** grief-not-linear: the tidy myth vs the tangled reality. */
const GriefNotLinear: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.42;
  return (
    <g>
      <text x={cx} y={cy - 120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>THE MYTH</text>
      <line x1={cx - 200} y1={cy - 70} x2={cx + 180} y2={cy - 70} stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d={`M ${cx + 180} ${cy - 70} l -16 -10 l 0 20 Z`} fill={COLORS.greenLeaf} />
      <text x={cx} y={cy + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>THE REALITY</text>
      <path d={`M ${cx - 200} ${cy + 90} q 60 -80 100 0 q 40 80 90 -10 q 30 -60 80 30 q 20 50 60 -30`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d={`M ${cx + 160} ${cy + 60} l 4 -18 l -18 8 Z`} fill={COLORS.red} />
      <text x={cx} y={cy + 190} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>you loop back, and that's normal</text>
    </g>
  );
};

/** grief-waves-time: intensity comes in waves that slowly space out. */
const GriefWavesTime: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const W = 460;
  const x0 = cx - W / 2, y0 = cy + 80;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const x = x0 + t * W; const env = 150 * Math.exp(-t * 1.6) + 20; const y = y0 - Math.abs(Math.sin(i / (3 + t * 10))) * env; return `${x},${y}`; });
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + W} y2={y0} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x0 + 20} y={y0 - 160} fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>intensity</text>
      <text x={x0 + W - 40} y={y0 + 34} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>time →</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the waves come further apart</text>
    </g>
  );
};

/** grief-grows-around: grief stays; your life grows around it. */
const GriefGrowsAround: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  const grow = springIn(frame, 40);
  const Panel = ({ x, outerR, lab }: { x: number; outerR: number; lab: string }) => (
    <g transform={`translate(${x} ${cy})`}>
      <circle r={outerR} fill={shade(COLORS.greenLeaf, 0.2)} {...xl} />
      <circle r={58} fill={COLORS.blueDiagram} {...lg} />
      <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.white}>grief</text>
      <text x={0} y={outerR + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{lab}</text>
    </g>
  );
  return (
    <g>
      <Panel x={cx - 180} outerR={72} lab="at first" />
      <Panel x={cx + 180} outerR={72 + 90 * grow} lab="in time" />
      <text x={cx} y={cy - 190} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>grief stays — you grow around it</text>
    </g>
  );
};

/** happiness-pie: the (rough, debated) set-point / circumstances / activity split. */
const HappinessPie: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44; const R = 160;
  const slices: [string, number, string][] = [['GENETIC\nset point', 0.5, COLORS.blueDiagram], ['LIFE\ncircumstances', 0.1, COLORS.ledGrey], ['WHAT YOU\nDO', 0.4, COLORS.greenLeaf]];
  let acc = -0.25;
  const p = springIn(frame, 30);
  return (
    <g>
      {slices.map(([lab, frac, c], i) => {
        const a0 = acc * Math.PI * 2; acc += frac; const a1 = acc * Math.PI * 2;
        const large = frac > 0.5 ? 1 : 0;
        const x0 = cx + Math.cos(a0) * R, y0 = cy + Math.sin(a0) * R, x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
        const mid = (a0 + a1) / 2; const pop = i === 2 ? 16 * p : 0;
        return <g key={lab} transform={`translate(${Math.cos(mid) * pop} ${Math.sin(mid) * pop})`}><path d={`M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`} fill={c} {...lg} /><g transform={`translate(${cx + Math.cos(mid) * R * 0.6} ${cy + Math.sin(mid) * R * 0.6})`}>{lab.split('\n').map((ln, j) => <text key={j} x={0} y={-2 + j * 18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{ln}</text>)}<text x={0} y={36} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{Math.round(frac * 100)}%</text></g></g>;
      })}
      <text x={cx} y={cy + R + 86} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>a rough model — but 40% is yours</text>
    </g>
  );
};

/** hedonic-curve: joy spikes from a new thing, then fades back to baseline. */
const HedonicCurve: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const W = 460;
  const x0 = cx - W / 2, base = cy + 30;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const x = x0 + t * W; const spikes = [0.1, 0.42, 0.74]; let y = base; spikes.forEach((s) => { if (t > s) y -= 120 * Math.exp(-(t - s) * 14); }); return `${x},${y}`; });
  return (
    <g>
      <line x1={x0 - 10} y1={base} x2={x0 + W} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="6 8" opacity={0.5} />
      <text x={x0 - 14} y={base + 6} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>baseline</text>
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      {[0.1, 0.42, 0.74].map((s, i) => <text key={i} x={x0 + s * W} y={base - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>new thing</text>)}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>we adapt to everything</text>
    </g>
  );
};

/** what-makes-happy: the real sources, ranked. */
const WhatMakesHappy: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const bars: [string, number, string][] = [['RELATIONSHIPS', 1.0, COLORS.red], ['EXPERIENCES', 0.78, COLORS.yellow], ['FLOW', 0.68, COLORS.sky], ['GRATITUDE', 0.6, COLORS.greenLeaf], ['GIVING', 0.56, COLORS.pink], ['MEANING', 0.74, COLORS.lavender]];
  return (
    <g>
      {bars.map(([lab, v, c], i) => {
        const p = springIn(frame - i * 5, 12); const h = 200 * v * p;
        return <g key={lab}><rect x={cx - 230 + i * 78} y={cy + 40 - h} width={56} height={h} rx={8} fill={c} {...lg} /><text x={cx - 202 + i * 78} y={cy + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={12} fill={COLORS.outline} transform={`rotate(40 ${cx - 202 + i * 78} ${cy + 70})`}>{lab}</text></g>;
      })}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>what actually moves the needle</text>
    </g>
  );
};

/** happy-vs-meaningful: two overlapping lives. */
const HappyVsMeaningful: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.44;
  return (
    <g>
      <circle cx={cx - 90} cy={cy} r={160} fill={COLORS.yellow} opacity={0.3} {...xl} />
      <circle cx={cx + 90} cy={cy} r={160} fill={COLORS.greenLeaf} opacity={0.3} {...xl} />
      <text x={cx - 160} y={cy - 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>HAPPY</text>
      <text x={cx - 160} y={cy - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>feel good now</text>
      <text x={cx + 160} y={cy - 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>MEANING</text>
      <text x={cx + 160} y={cy - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>it matters</text>
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>the best</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>life</text>
      <text x={cx} y={cy + 210} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>aim for both</text>
    </g>
  );
};

/** zeigarnik-open-loop: a finished loop sits quiet; an open one keeps pulling. */
const ZeigarnikOpenLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const R = 110;
  const tug = 6 * Math.sin(frame / 9);
  return (
    <g>
      {/* closed loop — calm, ticked */}
      <g transform={`translate(${cx - 180} ${cy})`}>
        <circle cx={0} cy={0} r={R} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.xl} />
        <path d="M -34 2 l 22 24 l 46 -54" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
        <text x={0} y={R + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>closed → quiet</text>
      </g>
      {/* open loop — a gap, the mind keeps circling it */}
      <g transform={`translate(${cx + 180} ${cy})`}>
        <path d={`M ${R * 0.5} ${-R * 0.87} A ${R} ${R} 0 1 0 ${R * 0.5} ${R * 0.87}`} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <circle cx={R * 0.5 + tug} cy={-R * 0.87} r={9} fill={COLORS.red} />
        <circle cx={R * 0.5 + tug} cy={R * 0.87} r={9} fill={COLORS.red} />
        <text x={0} y={R + 54} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>open → it pulls</text>
      </g>
      <text x={cx} y={cy - 170} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the mind can't drop the unfinished</text>
    </g>
  );
};

/** variable-reward: steady rewards fade; unpredictable ones hook hardest. */
const VariableReward: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const W = 420;
  const x0 = cx - W / 2, base = cy + 70;
  const steady = Array.from({ length: 40 }).map((_, i) => `${x0 + (i / 39) * W},${base - 70}`);
  const seed = [0, 0.9, 0.1, 0.2, 1, 0.05, 0.3, 0.15, 1, 0.08, 0.6, 0];
  const bars = seed.map((v, i) => ({ x: x0 + (i / (seed.length - 1)) * W, h: 20 + v * 150 }));
  return (
    <g>
      <g transform="translate(0 -110)">
        <polyline points={steady.join(' ')} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <text x={x0 - 14} y={base - 64} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>steady →</text>
        <text x={cx} y={base - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>predictable reward: we tune it out</text>
      </g>
      {bars.map((b, i) => <rect key={i} x={b.x - 11} y={base - b.h} width={22} height={b.h} rx={5} fill={b.h > 120 ? COLORS.red : COLORS.pink} {...sm} />)}
      <line x1={x0 - 14} y1={base} x2={x0 + W + 14} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <text x={cx} y={base + 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>unpredictable reward: we can't look away</text>
      <text x={cx} y={cy - 180} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>hot &amp; cold is the strongest hook</text>
    </g>
  );
};

/** idealization-gap: who they really are vs the edited image we miss. */
const IdealizationGap: React.FC = () => {
  const frame = useCurrentFrame();
  const p = springIn(frame, 26);
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  return (
    <g>
      {/* the real, mixed person */}
      <g transform={`translate(${cx - 160} ${cy})`}>
        <circle cx={0} cy={-40} r={70} fill={COLORS.white} {...xl} />
        <circle cx={-22} cy={-48} r={8} fill={COLORS.outline} /><circle cx={22} cy={-48} r={8} fill={COLORS.outline} />
        <path d="M -22 -18 Q 0 -24 22 -18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <text x={0} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>who they are</text>
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={15} fill={COLORS.outline}>whole &amp; flawed</text>
      </g>
      <text x={cx} y={cy - 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline} opacity={0.5}>›</text>
      {/* the idealized image, glowing */}
      <g transform={`translate(${cx + 160} ${cy})`} opacity={0.5 + 0.5 * p}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M 0 -40 L ${Math.cos((i / 8) * Math.PI * 2) * 110} ${-40 + Math.sin((i / 8) * Math.PI * 2) * 110}`} stroke={COLORS.yellowSoft} strokeWidth={STROKE.sm} opacity={0.6} strokeLinecap="round" />)}
        <circle cx={0} cy={-40} r={72} fill={COLORS.pink} opacity={0.4} />
        <circle cx={0} cy={-40} r={70} fill={COLORS.pink} {...xl} />
        <path d="M 0 -62 l 7 16 l 17 2 l -13 12 l 4 17 l -15 -9 l -15 9 l 4 -17 l -13 -12 l 17 -2 Z" fill={COLORS.white} />
        <text x={0} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>who you imagine</text>
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={15} fill={COLORS.outline}>best bits only</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>you miss the image, not the person</text>
    </g>
  );
};

/** letting-go-curve: intrusive thoughts fade over time when you stop feeding them. */
const LettingGoCurve: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 480; const H = 200;
  const x0 = cx - W / 2, base = cy + H / 2;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const wobble = Math.exp(-t * 3.2) * (1 + 0.18 * Math.sin(t * 34)); const y = base - H * wobble; return `${x0 + t * W},${y}`; });
  return (
    <g>
      <line x1={x0 - 10} y1={base} x2={x0 + W + 10} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <line x1={x0} y1={base + 10} x2={x0} y2={base - H - 10} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x0 - 14} y={base - H + 10} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>a lot</text>
      <text x={x0 - 14} y={base + 6} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>quiet</text>
      <text x={x0} y={base + 40} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>today</text>
      <text x={x0 + W} y={base + 40} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>weeks on, less contact</text>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>stop feeding it, and it fades</text>
    </g>
  );
};

/** gaze-detector: we lock onto direct gaze far faster than averted gaze. */
const GazeDetector: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const lit = (frame % 120) < 60; // the direct-gaze face flashes "found"
  const faces = [{ dx: -170, look: -14 }, { dx: -40, look: 12 }, { dx: 160, look: 0, direct: true }, { dx: 300, look: -10 }];
  return (
    <g>
      {faces.map((f, i) => (
        <g key={i} transform={`translate(${cx - 120 + f.dx} ${cy})`}>
          <circle cx={0} cy={0} r={44} fill={COLORS.white} {...xl} />
          {[-16, 16].map((ex) => <g key={ex}><circle cx={ex} cy={-4} r={10} fill={COLORS.white} {...sm} /><circle cx={ex + f.look} cy={-4} r={5} fill={COLORS.outline} /></g>)}
          <path d="M -14 20 Q 0 28 14 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
          {f.direct && lit && <><circle cx={0} cy={0} r={60} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} /><text x={0} y={-74} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>found!</text></>}
        </g>
      ))}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a direct stare pops out instantly</text>
      <text x={cx} y={cy + 120} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={17} fill={COLORS.outline}>the brain's stare-in-the-crowd detector</text>
    </g>
  );
};

/** hit-miss-bias: felt watched & right is remembered; felt watched & wrong isn't. */
const HitMissBias: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const cells: [string, boolean][] = [['HIT', true], ['MISS', false], ['MISS', false], ['HIT', true], ['MISS', false], ['MISS', false]];
  return (
    <g>
      {cells.map(([lab, hit], i) => {
        const p = springIn(frame - i * 4, 12);
        const x = cx - 250 + i * 100; const op = hit ? 1 : 0.28;
        return (
          <g key={i} transform={`translate(${x} ${cy}) scale(${0.7 + 0.3 * p})`} opacity={op}>
            <rect x={-40} y={-50} width={80} height={100} rx={12} fill={hit ? COLORS.greenLeaf : COLORS.ledGrey} {...lg} />
            <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.white}>{lab}</text>
            {hit && <text x={0} y={78} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.outline}>★ recalled</text>}
          </g>
        );
      })}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>you remember the hits, not the misses</text>
    </g>
  );
};

/** watch-feedback-loop: feel watched → turn → they notice you → they look → "proof". */
const WatchFeedbackLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const R = 150;
  const nodes = ['you FEEL\nwatched', 'you TURN\nto check', 'your move\nCATCHES eyes', 'PROOF! they\'re\nlooking'];
  const a = (frame / 30) % (Math.PI * 2);
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} strokeDasharray="4 16" />
      <g transform={`translate(${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R})`}><circle cx={0} cy={0} r={9} fill={COLORS.lavenderDark} /></g>
      {nodes.map((n, i) => {
        const ang = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(ang) * R; const y = cy + Math.sin(ang) * R;
        return <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={0} r={54} fill={COLORS.lavender} {...lg} />{n.split('\n').map((ln, j) => <text key={j} x={0} y={-4 + j * 16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={12} fill={COLORS.outline}>{ln}</text>)}</g>;
      })}
      <text x={cx} y={cy + 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>self-</text>
      <text x={cx} y={cy + 24} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>fulfilling</text>
      <text x={cx} y={cy - R - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>the turn makes it come true</text>
    </g>
  );
};

/** vigilance-dial: the watch-detector, well-calibrated vs stuck on high. */
const VigilanceDial: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.52; const R = 140;
  const jitter = 3 * Math.sin(frame / 3);
  const gauge = (gx: number, deg: number, c: string, lab: string, sub: string) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return (
      <g transform={`translate(${gx} ${cy})`}>
        <path d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`} fill="none" stroke={shade(COLORS.outline, 0.4)} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <line x1={0} y1={0} x2={Math.cos(rad) * (R - 20)} y2={Math.sin(rad) * (R - 20)} stroke={c} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <circle cx={0} cy={0} r={14} fill={COLORS.outline} />
        <text x={-R} y={34} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>calm</text>
        <text x={R} y={34} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>on guard</text>
        <text x={0} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{lab}</text>
        <text x={0} y={94} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>{sub}</text>
      </g>
    );
  };
  return (
    <g>
      {gauge(cx - 200, 70, COLORS.greenLeaf, 'calibrated', 'checks, then settles')}
      {gauge(cx + 200, 150 + jitter, COLORS.red, 'stuck high', 'anxiety turns it up')}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the same detector, two settings</text>
    </g>
  );
};

/** overflow-threshold: feeling rises to a cry-line; a lower line spills sooner. */
const OverflowThreshold: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 440;
  const x0 = cx - W / 2; const base = cy + 90;
  const level = base - (60 + 90 * (0.5 + 0.5 * Math.sin(frame / 20)));
  const column = (gx: number, lineY: number, lab: string, c: string) => (
    <g>
      <rect x={gx - 40} y={base - 230} width={80} height={230} rx={10} fill={shade(COLORS.white, 0.1)} {...lg} />
      <rect x={gx - 36} y={level} width={72} height={base - level - 4} rx={6} fill={COLORS.sky} opacity={0.85} />
      <line x1={gx - 54} y1={lineY} x2={gx + 54} y2={lineY} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeDasharray="8 6" />
      <text x={gx} y={base - 250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab}</text>
      {level < lineY && <text x={gx} y={lineY - 10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.red}>tears</text>}
    </g>
  );
  return (
    <g>
      {column(cx - 130, base - 190, 'high threshold', COLORS.sky)}
      {column(cx + 130, base - 110, 'low threshold', COLORS.sky)}
      <text x={cx - 220} y={base + 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={13} fill={COLORS.red}>cry-line</text>
      <text x={cx} y={cy - 170} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>same feeling, different cry-line</text>
    </g>
  );
};

/** sensitivity-spectrum: everyone sits on a line; ~20% are highly sensitive. */
const SensitivitySpectrum: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 520;
  const x0 = cx - W / 2;
  return (
    <g>
      <rect x={x0} y={cy - 16} width={W} height={32} rx={16} fill={COLORS.lavender} {...lg} />
      <rect x={x0 + W * 0.8} y={cy - 16} width={W * 0.2} height={32} rx={16} fill={COLORS.pink} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const x = x0 + 30 + i * ((W - 60) / 7); const high = x > x0 + W * 0.8; return <circle key={i} cx={x} cy={cy} r={high ? 18 : 13} fill={high ? COLORS.pink : COLORS.white} {...sm} />; })}
      <text x={x0} y={cy + 56} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>less sensitive</text>
      <text x={x0 + W} y={cy + 56} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>highly sensitive</text>
      <text x={x0 + W * 0.9} y={cy - 44} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.pinkDark}>~1 in 5</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a normal trait, not a flaw</text>
    </g>
  );
};

/** tears-three-jobs: the three jobs of emotional tears. */
const TearsThreeJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const jobs: [string, string, string][] = [['SIGNAL', 'I need you', COLORS.sky], ['RELEASE', 'settle me', COLORS.greenLeaf], ['BOND', 'draw us close', COLORS.pink]];
  return (
    <g>
      {jobs.map(([lab, sub, c], i) => {
        const p = springIn(frame - i * 6, 14); const x = cx - 220 + i * 220;
        return (
          <g key={i} transform={`translate(${x} ${cy}) scale(${0.7 + 0.3 * p})`}>
            <path d="M 0 -62 q -30 40 0 74 q 30 -34 0 -74 Z" fill={c} {...lg} />
            <ellipse cx={-9} cy={-10} rx={8} ry={14} fill={COLORS.white} opacity={0.6} />
            <text x={0} y={104} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{lab}</text>
            <text x={0} y={128} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>{sub}</text>
          </g>
        );
      })}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>what emotional tears do</text>
    </g>
  );
};

/** being-moved-curve: joy climbs so high it spills over as tears too. */
const BeingMovedCurve: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 460; const H = 180;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; return `${x0 + t * W},${base - H * Math.pow(t, 1.4)}`; });
  return (
    <g>
      <line x1={x0 - 10} y1={base} x2={x0 + W + 10} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <line x1={x0} y1={base + 10} x2={x0} y2={base - H - 30} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x0 - 12} y={base - H - 14} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>overwhelming joy</text>
      {/* tears spilling at the peak */}
      <g transform={`translate(${x0 + W} ${base - H + 10})`}><path d="M 0 0 q -9 12 0 22 q 9 -10 0 -22 Z" fill={COLORS.sky} {...sm} /><path d="M 18 8 q -7 10 0 18 q 7 -8 0 -18 Z" fill={COLORS.sky} {...sm} /></g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>joy can spill over as tears</text>
    </g>
  );
};

/** friendship-hours: the ~50 / 90 / 200 hour steps to closeness. */
const FriendshipHours: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.6;
  const steps: [string, number, string][] = [['acquaintance', 0, COLORS.ledGrey], ['casual friend', 50, COLORS.sky], ['friend', 90, COLORS.greenLeaf], ['close friend', 200, COLORS.pink]];
  return (
    <g>
      {steps.map(([lab, hrs, c], i) => {
        const p = springIn(frame - i * 6, 14); const w = 120; const h = 50 + i * 46;
        const x = cx - 300 + i * 190;
        return (
          <g key={i} transform={`translate(${x} ${cy})`}>
            <rect x={-w / 2} y={-h * p} width={w} height={h * p} rx={8} fill={c} {...lg} />
            <text x={0} y={30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.outline}>{lab}</text>
            {hrs > 0 && <text x={0} y={-h * p - 12} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>~{hrs}h</text>}
          </g>
        );
      })}
      <text x={cx} y={cy - 250} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>closeness is built in hours</text>
    </g>
  );
};

/** liking-gap: how much you think they liked you vs how much they actually did. */
const LikingGapDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.52;
  const bars: [string, number, string][] = [['you assume', 0.5, COLORS.ledGrey], ['reality', 0.85, COLORS.pink]];
  return (
    <g>
      {bars.map(([lab, v, c], i) => {
        const p = springIn(frame - i * 8, 14); const h = 240 * v * p; const x = cx - 110 + i * 220;
        return (
          <g key={i} transform={`translate(${x} ${cy})`}>
            <rect x={-56} y={40 - h} width={112} height={h} rx={10} fill={c} {...lg} />
            <text x={0} y={72} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <path d={`M ${cx - 110} ${cy - 80} Q ${cx} ${cy - 200} ${cx + 110} ${cy - 160}`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeDasharray="5 8" />
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the liking gap</text>
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>they liked you more than you think</text>
    </g>
  );
};

/** everyone-waiting: a room where all hold back, each sure they're the only one. */
const EveryoneWaiting: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const people = [-220, -75, 75, 220];
  return (
    <g>
      {people.map((dx, i) => {
        const bob = 3 * Math.sin(frame / 10 + i);
        return (
          <g key={i} transform={`translate(${cx + dx} ${cy + bob})`}>
            <circle cx={0} cy={0} r={42} fill={[COLORS.sky, COLORS.pink, COLORS.yellow, COLORS.lavender][i]} {...xl} />
            <circle cx={-13} cy={-6} r={5} fill={COLORS.outline} /><circle cx={13} cy={-6} r={5} fill={COLORS.outline} />
            <path d="M -12 16 Q 0 8 12 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
            <g transform="translate(0 -74)"><ellipse cx={0} cy={0} rx={56} ry={26} fill={COLORS.white} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={11} fill={COLORS.outline}>they won't</text></g>
          </g>
        );
      })}
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>…everyone thinks the same thing</text>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the approach standoff</text>
    </g>
  );
};

/** closeness-ladder: swapping a little more vulnerability deepens a bond. */
const ClosenessLadder: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.56;
  const rungs = ['small talk', 'opinions', 'stories', 'fears & dreams'];
  return (
    <g>
      {rungs.map((lab, i) => {
        const p = springIn(frame - i * 7, 14); const y = cy - i * 70; const w = 320;
        return (
          <g key={i} opacity={p}>
            <rect x={cx - w / 2} y={y - 24} width={w} height={44} rx={10} fill={[COLORS.ledGrey, COLORS.sky, COLORS.greenLeaf, COLORS.pink][i]} {...lg} />
            <text x={cx} y={y + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>{lab}</text>
          </g>
        );
      })}
      <path d={`M ${cx + 180} ${cy + 10} L ${cx + 180} ${cy - 210}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d={`M ${cx + 180} ${cy - 210} l -8 14 m 8 -14 l 8 14`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <text x={cx + 210} y={cy - 100} textAnchor="start" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>closer</text>
      <text x={cx} y={cy - 280} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>share a little more, go deeper</text>
    </g>
  );
};

/** accuracy-coinflip: human lie-detection sits barely above a coin flip. */
const AccuracyCoinflip: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const fill = springIn(frame, 30);
  const barW = 260;
  const bar = (y: number, frac: number, c: string, lab: string) => (
    <g transform={`translate(${cx - barW / 2} ${y})`}>
      <rect x={0} y={-24} width={barW} height={48} rx={10} fill={shade(COLORS.white, 0.1)} {...lg} />
      <rect x={0} y={-24} width={barW * frac * fill} height={48} rx={10} fill={c} />
      <text x={barW + 16} y={8} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{Math.round(frac * 100)}%</text>
      <text x={-16} y={8} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab}</text>
    </g>
  );
  return (
    <g>
      {bar(cy - 50, 0.5, COLORS.ledGrey, 'coin flip')}
      {bar(cy + 50, 0.54, COLORS.red, 'humans')}
      <line x1={cx - barW / 2 + barW * 0.5} y1={cy - 90} x2={cx - barW / 2 + barW * 0.5} y2={cy + 90} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="5 7" opacity={0.5} />
      <text x={cx} y={cy - 140} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>we're barely better than chance</text>
    </g>
  );
};

/** myth-vs-fact: the famous "tells" that don't actually work. */
const MythVsFact: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const myths = ['shifty eyes', 'fidgeting', 'touching nose', 'looking up-left', 'crossed arms'];
  return (
    <g>
      {myths.map((m, i) => {
        const p = springIn(frame - i * 5, 12); const y = cy - 130 + i * 62;
        return (
          <g key={i} transform={`translate(${cx} ${y})`} opacity={p}>
            <rect x={-230} y={-24} width={460} height={48} rx={10} fill={shade(COLORS.red, 0.1)} {...lg} />
            <text x={-200} y={8} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{m}</text>
            <g transform="translate(190 0)"><circle cx={0} cy={0} r={16} fill={COLORS.red} /><line x1={-7} y1={-7} x2={7} y2={7} stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={7} y1={-7} x2={-7} y2={7} stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
          </g>
        );
      })}
      <text x={cx} y={cy - 180} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>none of these reliably mean lying</text>
    </g>
  );
};

/** load-truth-vs-lie: telling the truth = recall; lying = build + monitor. */
const LoadTruthVsLie: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const col = (gx: number, title: string, c: string, tasks: string[]) => (
    <g transform={`translate(${gx} ${cy})`}>
      <rect x={-150} y={-120} width={300} height={260} rx={16} fill={shade(c, 0.14)} {...lg} />
      <text x={0} y={-86} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{title}</text>
      {tasks.map((t, i) => { const p = springIn(frame - i * 6, 12); return <g key={i} transform={`translate(0 ${-40 + i * 50}) scale(${0.7 + 0.3 * p})`}><rect x={-120} y={-18} width={240} height={36} rx={8} fill={c} {...sm} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{t}</text></g>; })}
    </g>
  );
  return (
    <g>
      {col(cx - 180, 'TRUTH', COLORS.greenLeaf, ['just recall it'])}
      {col(cx + 180, 'LIE', COLORS.red, ['invent a story', 'keep it straight', 'watch your face', 'read the listener'])}
      <text x={cx} y={cy - 160} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a lie carries a heavier load</text>
    </g>
  );
};

/** cluster-baseline: one cue means nothing; a cluster + change from baseline is the signal. */
const ClusterBaseline: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);
  return (
    <g>
      {/* one cue — crossed out */}
      <g transform={`translate(${cx - 200} ${cy})`}>
        <circle cx={0} cy={0} r={46} fill={COLORS.ledGrey} {...lg} />
        <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>1 cue</text>
        <text x={0} y={86} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>means nothing</text>
      </g>
      <text x={cx - 60} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>›</text>
      {/* a cluster + baseline change */}
      <g transform={`translate(${cx + 150} ${cy})`}>
        {[[-48, -30], [48, -30], [0, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={30} fill={COLORS.greenLeaf} opacity={0.7 + 0.3 * pulse} {...sm} />)}
        <text x={0} y={-2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>cluster</text>
        <text x={0} y={100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>+ change from normal</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>clusters, not single cues</text>
    </g>
  );
};

/** control-in-chaos: a small controllable circle inside a big uncontrollable world. */
const ControlInChaos: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  const wob = 6 * Math.sin(frame / 12);
  return (
    <g>
      {/* big chaotic field */}
      <circle cx={cx} cy={cy} r={200} fill={shade(COLORS.purpleDeep, 0.06)} opacity={0.5} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2 + frame / 40; return <line key={i} x1={cx + Math.cos(a) * 120} y1={cy + Math.sin(a) * 110} x2={cx + Math.cos(a) * 190} y2={cy + Math.sin(a) * 175} stroke={COLORS.lavenderDark} strokeWidth={STROKE.sm} opacity={0.5} strokeLinecap="round" />; })}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>a chaotic, uncertain world</text>
      {/* the calm controllable centre */}
      <circle cx={cx + wob * 0.2} cy={cy} r={70} fill={COLORS.greenLeaf} {...xl} />
      <rect x={cx - 26} y={cy - 10} width={52} height={38} rx={6} fill={COLORS.white} {...lg} />
      <path d="M -30 -10 L 0 -34 L 30 -10 Z" fill={COLORS.red} transform={`translate(${cx} ${cy})`} {...lg} />
      <text x={cx} y={cy + 56} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>my space</text>
      <text x={cx} y={cy + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>order one corner you can control</text>
    </g>
  );
};

/** orderliness-trait: orderliness as a stable spot on a spectrum. */
const OrderlinessTrait: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 520;
  const x0 = cx - W / 2;
  const marker = x0 + W * (0.5 + 0.34 * springIn(frame, 30));
  return (
    <g>
      <rect x={x0} y={cy - 14} width={W} height={28} rx={14} fill={COLORS.greenLeaf} opacity={0.3} {...lg} />
      <rect x={x0} y={cy - 14} width={W} height={28} rx={14} fill="none" {...lg} />
      <circle cx={marker} cy={cy} r={22} fill={COLORS.greenLeaf} {...xl} />
      <text x={x0} y={cy + 56} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>relaxed / messy-ok</text>
      <text x={x0 + W} y={cy + 56} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>highly orderly</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>orderliness is a real trait</text>
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>a facet of conscientiousness</text>
    </g>
  );
};

/** clutter-attention: clutter steals attention; a clear space frees it. */
const ClutterAttention: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const flick = 0.5 + 0.5 * Math.sin(frame / 4);
  return (
    <g>
      {/* cluttered brain — many competing arrows */}
      <g transform={`translate(${cx - 180} ${cy})`}>
        <circle cx={0} cy={0} r={70} fill={COLORS.pink} {...xl} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => { const a = (i / 7) * Math.PI * 2; return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 100} y2={Math.sin(a) * 100} stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={0.5 + 0.4 * Math.sin(frame / 3 + i)} strokeLinecap="round" />; })}
        <text x={0} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>cluttered: scattered</text>
      </g>
      <text x={cx - 20} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.outline}>›</text>
      {/* clear brain — one strong focused beam */}
      <g transform={`translate(${cx + 180} ${cy})`}>
        <circle cx={0} cy={0} r={70} fill={COLORS.greenLeaf} {...xl} />
        <line x1={0} y1={0} x2={0} y2={-120} stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={flick} />
        <path d="M -12 -104 l 12 -20 l 12 20 Z" fill={COLORS.greenDark} />
        <text x={0} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>clear: focused</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>clutter competes for attention</text>
    </g>
  );
};

/** tidy-spectrum: helpful habit to compulsion — where it tips. */
const TidySpectrum: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 540;
  const x0 = cx - W / 2;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <g>
      <defs>
        <linearGradient id="tidygrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.greenLeaf} /><stop offset="60%" stopColor={COLORS.yellow} /><stop offset="100%" stopColor={COLORS.red} />
        </linearGradient>
      </defs>
      <rect x={x0} y={cy - 16} width={W} height={32} rx={16} fill="url(#tidygrad)" {...lg} />
      {/* the tipping point marker */}
      <g transform={`translate(${x0 + W * 0.72} ${cy})`} opacity={0.7 + 0.3 * pulse}><line x1={0} y1={-44} x2={0} y2={44} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeDasharray="5 6" /><text x={0} y={-56} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>tips here</text></g>
      <text x={x0 + 40} y={cy + 56} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>helpful habit</text>
      <text x={x0 + W - 40} y={cy + 56} textAnchor="end" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>it controls you</text>
      <text x={cx} y={cy - 120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>does it serve you, or rule you?</text>
    </g>
  );
};

/** nostalgia-benefits: warm memory at the centre, benefits radiating out. */
const NostalgiaBenefits: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const spokes = ['lifts mood', 'more meaning', 'feel connected', 'optimism', 'self-esteem'];
  const g = 0.5 + 0.4 * Math.sin(frame / 8);
  return (
    <g>
      {spokes.map((s, i) => {
        const a = -Math.PI / 2 + (i / spokes.length) * Math.PI * 2; const R = 170;
        const x = cx + Math.cos(a) * R; const y = cy + Math.sin(a) * R; const p = springIn(frame - i * 5, 12);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.yellow} strokeWidth={STROKE.lg} opacity={0.6 * p} />
            <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}><rect x={-72} y={-24} width={144} height={48} rx={12} fill={COLORS.yellowSoft} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{s}</text></g>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={54} fill={COLORS.yellow} opacity={0.4 + g * 0.3} />
      <circle cx={cx} cy={cy} r={54} fill="none" {...xl} />
      <path d="M 0 30 Q -34 -2 -34 -22 Q -34 -46 -11 -46 Q 0 -46 0 -30 Q 0 -46 11 -46 Q 34 -46 34 -22 Q 34 -2 0 30 Z" fill={COLORS.red} transform={`translate(${cx} ${cy})`} {...lg} />
      <text x={cx} y={cy - 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>nostalgia is good for you</text>
    </g>
  );
};

/** reminiscence-bump: autobiographical memory peaks for roughly ages 10–30. */
const ReminiscenceBump: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 480; const H = 200;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const age = t * 80; const bump = Math.exp(-Math.pow((age - 20) / 10, 2)); const recency = t > 0.85 ? (t - 0.85) * 3 : 0; const y = base - H * (0.12 + 0.8 * bump + recency); return `${x0 + t * W},${Math.max(base - H, y)}`; });
  return (
    <g>
      <line x1={x0 - 10} y1={base} x2={x0 + W + 10} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <line x1={x0} y1={base + 10} x2={x0} y2={base - H - 10} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {/* highlight the 10-30 window */}
      <rect x={x0 + W * 0.125} y={base - H - 6} width={W * 0.25} height={H + 6} fill={COLORS.yellowSoft} opacity={0.3} />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x0 + W * 0.25} y={base - H - 14} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>ages ~10–30</text>
      <text x={x0} y={base + 34} textAnchor="start" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>birth</text>
      <text x={x0 + W} y={base + 34} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>now</text>
      <text x={x0 - 14} y={base - H + 10} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={13} fill={COLORS.outline}>memories</text>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the reminiscence bump</text>
    </g>
  );
};

/** bittersweet-mix: sweet + bitter blend into the nostalgic feeling. */
const BittersweetMix: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const merge = springIn(frame, 30);
  const off = 150 * (1 - merge);
  return (
    <g>
      <g transform={`translate(${cx - 120 - off} ${cy})`}><circle cx={0} cy={0} r={64} fill={COLORS.yellow} opacity={0.6} {...xl} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>warmth</text></g>
      <g transform={`translate(${cx + 120 + off} ${cy})`}><circle cx={0} cy={0} r={64} fill={COLORS.sky} opacity={0.6} {...xl} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>loss</text></g>
      {merge > 0.6 && <g transform={`translate(${cx} ${cy})`} opacity={(merge - 0.6) / 0.4}><circle cx={0} cy={0} r={46} fill={COLORS.pink} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>bittersweet</text></g>}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>warmth and loss, at once</text>
    </g>
  );
};

/** nostalgia-coping-loop: low mood → nostalgia → mood repaired. */
const NostalgiaCopingLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const R = 130;
  const a = (frame / 30) % (Math.PI * 2);
  const nodes = [['feeling low', COLORS.sky], ['reach for a memory', COLORS.yellow], ['warmth + meaning', COLORS.pink], ['mood lifts', COLORS.greenLeaf]];
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeDasharray="4 14" />
      <g transform={`translate(${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R})`}><circle cx={0} cy={0} r={8} fill={COLORS.greenDark} /></g>
      {nodes.map(([lab, c], i) => {
        const ang = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(ang) * R; const y = cy + Math.sin(ang) * R;
        return <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={0} r={56} fill={c as string} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.outline}>{lab as string}</text></g>;
      })}
      <text x={cx} y={cy - R - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>a built-in comfort loop</text>
    </g>
  );
};

/** music-reward-loop: music hits the same reward system as food, sex, drugs. */
const MusicRewardLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const g = 0.5 + 0.5 * Math.sin(frame / 7);
  const peers = ['food', 'sex', 'drugs', 'MUSIC'];
  return (
    <g>
      {/* central reward hub */}
      <circle cx={cx} cy={cy} r={64} fill={COLORS.pink} opacity={0.4 + g * 0.3} />
      <circle cx={cx} cy={cy} r={64} fill="none" {...xl} />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>reward</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>system</text>
      {peers.map((p, i) => {
        const a = -Math.PI / 2 + (i / peers.length) * Math.PI * 2; const R = 170; const x = cx + Math.cos(a) * R; const y = cy + Math.sin(a) * R;
        const hot = p === 'MUSIC';
        return <g key={i}><line x1={cx} y1={cy} x2={x} y2={y} stroke={hot ? COLORS.pink : COLORS.ledGrey} strokeWidth={hot ? STROKE.lg : STROKE.sm} opacity={hot ? 0.8 : 0.5} /><g transform={`translate(${x} ${y})`}><rect x={-58} y={-26} width={116} height={52} rx={12} fill={hot ? COLORS.yellow : COLORS.white} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{p}</text></g></g>;
      })}
      <text x={cx} y={cy - 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>music rewards us like food does</text>
    </g>
  );
};

/** two-dopamine-hits: an anticipatory hit before the peak, then the peak hit. */
const TwoDopamineHits: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 480; const H = 200;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const y = base - H * (0.1 + 0.85 * Math.pow(t, 3)); return `${x0 + t * W},${y}`; });
  const antiX = x0 + W * 0.62; const peakX = x0 + W * 0.95;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 5);
  return (
    <g>
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={x0 - 10} y1={base} x2={x0 + W + 10} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {/* anticipation marker */}
      <g transform={`translate(${antiX} ${base - H * 0.4})`} opacity={0.7 + 0.3 * pulse}><circle cx={0} cy={0} r={16} fill={COLORS.yellow} {...sm} /><text x={0} y={44} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>anticipation</text></g>
      {/* peak marker */}
      <g transform={`translate(${peakX} ${base - H * 0.86})`}>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={i} x1={0} y1={0} x2={Math.cos((i / 8) * Math.PI * 2) * 24} y2={Math.sin((i / 8) * Math.PI * 2) * 24} stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" />)}<circle cx={0} cy={0} r={14} fill={COLORS.pink} {...sm} /><text x={0} y={-36} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>the drop!</text></g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a hit before, and at, the peak</text>
    </g>
  );
};

/** expectation-violation: predicted path vs a pleasurable surprise. */
const ExpectationViolation: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 440;
  const x0 = cx - W / 2; const mid = cy;
  const g = 0.5 + 0.5 * Math.sin(frame / 5);
  return (
    <g>
      {/* shared start */}
      <path d={`M ${x0} ${mid} L ${x0 + W * 0.5} ${mid}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* predicted continuation (flat, grey, dotted) */}
      <path d={`M ${x0 + W * 0.5} ${mid} L ${x0 + W} ${mid}`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeDasharray="6 10" />
      <text x={x0 + W} y={mid + 34} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={15} fill={COLORS.outline}>what you expected</text>
      {/* actual: a surprising, satisfying leap */}
      <path d={`M ${x0 + W * 0.5} ${mid} Q ${x0 + W * 0.7} ${mid - 120} ${x0 + W * 0.95} ${mid - 90}`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <g transform={`translate(${x0 + W * 0.95} ${mid - 90})`} opacity={0.7 + 0.3 * g}>{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={0} y1={0} x2={Math.cos((i / 5) * Math.PI - Math.PI / 2) * 26} y2={Math.sin((i / 5) * Math.PI - Math.PI / 2) * 26} stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" />)}</g>
      <text x={x0 + W * 0.8} y={mid - 120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>the surprise = chills</text>
      <text x={cx} y={cy - 160} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a prediction, pleasurably broken</text>
    </g>
  );
};

/** who-gets-chills: ~2/3 of people do; linked to openness & brain wiring. */
const WhoGetsChills: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46;
  return (
    <g>
      {Array.from({ length: 9 }).map((_, i) => {
        const col = i % 3; const row = Math.floor(i / 3); const x = cx - 150 + col * 150; const y = cy - 80 + row * 100;
        const chill = i < 6; const p = springIn(frame - i * 3, 12);
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p})`}>
            <circle cx={0} cy={0} r={40} fill={chill ? COLORS.pink : COLORS.white} {...lg} />
            <circle cx={-13} cy={-4} r={5} fill={COLORS.outline} /><circle cx={13} cy={-4} r={5} fill={COLORS.outline} />
            {chill ? <path d="M -12 14 Q 0 24 12 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /> : <line x1={-12} y1={16} x2={12} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
            {chill && [[-34, -30], [34, -30]].map(([sx, sy], j) => <path key={j} d={`M ${sx} ${sy} l 1 4 l 4 1 l -4 1 l -1 4 l -1 -4 l -4 -1 l 4 -1 Z`} fill={COLORS.yellow} />)}
          </g>
        );
      })}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>about 2 in 3 feel the chills</text>
      <text x={cx} y={cy + 180} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>it's wiring, not trying harder</text>
    </g>
  );
};

/** memory-sticky: emotional moments get consolidated far stronger than neutral ones. */
const MemorySticky: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const g = 0.6 + 0.4 * Math.sin(frame / 6);
  return (
    <g>
      {/* neutral memory — faint */}
      <g transform={`translate(${cx - 150} ${cy})`} opacity={0.45}>
        <rect x={-70} y={-54} width={140} height={108} rx={10} fill={COLORS.white} {...lg} />
        <line x1={-50} y1={-20} x2={50} y2={-20} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} /><line x1={-50} y1={4} x2={30} y2={4} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />
        <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>neutral: fades</text>
      </g>
      {/* emotional memory — bold, glowing, amygdala-tagged */}
      <g transform={`translate(${cx + 150} ${cy})`}>
        <rect x={-74} y={-58} width={148} height={116} rx={10} fill={COLORS.red} {...xl} />
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M ${Math.cos((i / 6) * Math.PI * 2) * 86} ${Math.sin((i / 6) * Math.PI * 2) * 72} l ${Math.cos((i / 6) * Math.PI * 2) * 14} ${Math.sin((i / 6) * Math.PI * 2) * 12}`} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={g} />)}
        <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.white}>!</text>
        <text x={0} y={94} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>emotional: burned in</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>feeling glues a memory in place</text>
    </g>
  );
};

/** social-survival: a social blunder trips an ancient "exile" alarm. */
const SocialSurvival: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const steps = [['a blunder', COLORS.yellow], ['"they\'ll reject me"', COLORS.red], ['belonging alarm', COLORS.red], ['burned-in warning', COLORS.outline]];
  return (
    <g>
      {steps.map(([lab, c], i) => {
        const p = springIn(frame - i * 6, 12); const x = cx - 300 + i * 200;
        return (
          <g key={i}>
            <g transform={`translate(${x} ${cy}) scale(${0.7 + 0.3 * p})`}><rect x={-80} y={-40} width={160} height={80} rx={14} fill={i < 1 ? COLORS.white : shade(c as string, 0.1)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{lab as string}</text></g>
            {i < 3 && <path d={`M ${x + 82} ${cy} l 34 0 l -10 -8 m 10 8 l -10 8`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" opacity={p} />}
          </g>
        );
      })}
      <text x={cx} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the tribe-brain treats it as danger</text>
    </g>
  );
};

/** mind-wander-surfacing: at rest, the default mode surfaces old cringes. */
const MindWanderSurfacing: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  return (
    <g>
      {/* a resting brain */}
      <path d="M -70 14 Q -86 -44 -40 -58 Q -24 -86 12 -70 Q 50 -82 60 -48 Q 86 -32 68 6 Q 74 42 30 48 Q 0 68 -32 50 Q -72 46 -70 14 Z" fill={COLORS.lavender} {...xl} transform={`translate(${cx} ${cy})`} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>idle brain</text>
      {/* old cringe bubbles floating up around it */}
      {[0, 1, 2, 3, 4].map((i) => { const p = ((frame + i * 24) % 100) / 100; const ang = -Math.PI / 2 + (i - 2) * 0.5; const r = 110 + p * 80; const x = cx + Math.cos(ang) * r; const y = cy + Math.sin(ang) * r - p * 30; return <g key={i} transform={`translate(${x} ${y})`} opacity={0.4 + (1 - p) * 0.5}><circle cx={0} cy={0} r={22 - p * 6} fill={COLORS.red} opacity={0.5} {...sm} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>!</text></g>; })}
      <text x={cx} y={cy - 160} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a wandering mind digs them up</text>
    </g>
  );
};

/** spotlight-reality: you think everyone remembers; they forgot in minutes. */
const SpotlightReality: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  return (
    <g>
      {/* YOUR view: a huge glaring memory */}
      <g transform={`translate(${cx - 150} ${cy})`}>
        <circle cx={0} cy={0} r={64} fill={COLORS.red} {...xl} />
        <text x={0} y={10} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={34} fill={COLORS.white}>!</text>
        <text x={0} y={104} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>to you: enormous</text>
      </g>
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>vs</text>
      {/* THEIR view: a tiny dot, mostly forgotten */}
      <g transform={`translate(${cx + 150} ${cy})`}>
        <circle cx={0} cy={0} r={64} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeDasharray="5 7" />
        <circle cx={0} cy={0} r={7} fill={COLORS.ledGrey} opacity={0.6} />
        <text x={0} y={104} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>to them: forgotten</text>
      </g>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>you're your only audience</text>
    </g>
  );
};

/** inner-speech-origin: out-loud child speech internalises into silent inner speech. */
const InnerSpeechOrigin: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const g = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <g>
      {/* child, talking out loud */}
      <g transform={`translate(${cx - 180} ${cy})`}>
        <circle cx={0} cy={0} r={48} fill={COLORS.white} {...xl} />
        <ellipse cx={0} cy={18} rx={9} ry={6} fill={COLORS.outline} />
        <g transform="translate(60 -42)"><rect x={-34} y={-20} width={70} height={38} rx={10} fill={COLORS.sky} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>out loud</text></g>
        <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>child</text>
      </g>
      <path d={`M ${cx - 90} ${cy} l 60 0 l -12 -10 m 12 10 l -12 10`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      {/* adult, inner speech */}
      <g transform={`translate(${cx + 180} ${cy})`}>
        <circle cx={0} cy={0} r={48} fill={COLORS.white} {...xl} />
        <g opacity={0.6 + g * 0.4}><rect x={-30} y={-22} width={60} height={38} rx={12} fill={COLORS.lavender} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>...</text></g>
        <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>inner voice</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>out-loud speech goes inward</text>
    </g>
  );
};

/** self-talk-performance: self-talk raises performance. */
const SelfTalkPerformance: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const bars: [string, number, string][] = [['silent', 0.5, COLORS.ledGrey], ['self-talk', 0.85, COLORS.greenLeaf]];
  return (
    <g>
      {bars.map(([lab, v, c], i) => {
        const p = springIn(frame - i * 8, 14); const h = 240 * v * p; const x = cx - 110 + i * 220;
        return <g key={i} transform={`translate(${x} ${cy})`}><rect x={-56} y={50 - h} width={112} height={h} rx={10} fill={c} {...lg} /><text x={0} y={84} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab}</text></g>;
      })}
      <path d={`M ${cx - 110} ${cy - 70} Q ${cx} ${cy - 190} ${cx + 110} ${cy - 160}`} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.sm} strokeDasharray="5 8" />
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>self-talk lifts performance</text>
    </g>
  );
};

/** name-distance: "I" sits close & anxious; "you / [name]" steps back & calms. */
const NameDistance: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const g = 0.5 + 0.5 * Math.sin(frame / 5);
  return (
    <g>
      {/* 'I' — right up close to a stressful blob */}
      <g transform={`translate(${cx - 180} ${cy})`}>
        <circle cx={-30} cy={0} r={40} fill={COLORS.red} opacity={0.5 + g * 0.3} />
        <g transform="translate(28 0)"><circle cx={0} cy={0} r={30} fill={COLORS.white} {...lg} /><ellipse cx={0} cy={10} rx={6} ry={8} fill={COLORS.outline} /><path d="M -12 -6 Q -6 -12 0 -6 M 0 -6 Q 6 -12 12 -6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
        <text x={0} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>"I'm panicking"</text>
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>up close</text>
      </g>
      {/* 'you / name' — stepped back, calmer */}
      <g transform={`translate(${cx + 180} ${cy})`}>
        <circle cx={-70} cy={0} r={30} fill={COLORS.red} opacity={0.3} />
        <g transform="translate(20 0)"><circle cx={0} cy={0} r={30} fill={COLORS.white} {...lg} /><circle cx={-10} cy={-2} r={4} fill={COLORS.outline} /><circle cx={10} cy={-2} r={4} fill={COLORS.outline} /><path d="M -10 10 Q 0 16 10 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
        <text x={0} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>"you've got this"</text>
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>a step back</text>
      </g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>use your name to gain distance</text>
    </g>
  );
};

/** critic-vs-coach: the same moment, two inner voices, two outcomes. */
const CriticVsCoach: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const side = (gx: number, title: string, c: string, voice: string, outcome: string) => (
    <g transform={`translate(${gx} ${cy})`}>
      <circle cx={0} cy={-40} r={44} fill={c} {...xl} />
      <text x={0} y={-34} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.white}>{title}</text>
      <g transform="translate(0 30)"><rect x={-96} y={-20} width={192} height={40} rx={10} fill={shade(c, 0.12)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{voice}</text></g>
      <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{outcome}</text>
    </g>
  );
  return (
    <g>
      {side(cx - 180, 'CRITIC', COLORS.red, '"you always fail"', 'anxiety ↑')}
      {side(cx + 180, 'COACH', COLORS.greenLeaf, '"try again, kindly"', 'resilience ↑')}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the tone of the voice matters</text>
    </g>
  );
};

/** boredom-equation: wanting to engage + unable to engage = boredom. */
const BoredomEquation: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const p = springIn(frame, 26);
  const term = (x: number, lab: string, sub: string, c: string) => (
    <g transform={`translate(${x} ${cy})`}><circle cx={0} cy={0} r={58} fill={c} {...xl} /><text x={0} y={-2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{lab}</text><text x={0} y={18} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={12} fill={COLORS.outline}>{sub}</text></g>
  );
  return (
    <g>
      {term(cx - 200, 'WANT to', 'engage', COLORS.sky)}
      <text x={cx - 100} y={cy + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>+</text>
      {term(cx, "CAN'T", 'engage', COLORS.red)}
      <text x={cx + 100} y={cy + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>=</text>
      <g transform={`translate(${cx + 200} ${cy}) scale(${0.7 + 0.3 * p})`}><circle cx={0} cy={0} r={58} fill={COLORS.yellow} {...xl} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>BORED</text></g>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>boredom is a kind of stuck</text>
    </g>
  );
};

/** shock-choice: the share who shocked themselves rather than sit bored. */
const ShockChoice: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => {
        const col = i % 5; const row = Math.floor(i / 5); const x = cx - 220 + col * 110; const y = cy - 30 + row * 100;
        const shocked = i < 6; const p = springIn(frame - i * 3, 12);
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p})`}>
            <circle cx={0} cy={0} r={34} fill={shocked ? COLORS.red : COLORS.white} {...lg} />
            {shocked ? <path d="M -6 -14 l -8 16 l 10 -2 l -6 14 l 16 -22 l -10 2 Z" fill={COLORS.yellow} /> : <path d="M -10 6 l 20 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
          </g>
        );
      })}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>many shocked themselves rather than sit bored</text>
      <text x={cx} y={cy + 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>we'd rather feel something than nothing</text>
    </g>
  );
};

/** boredom-creativity: a bored spell leads to a more creative burst after. */
const BoredomCreativity: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const bars: [string, number, string][] = [['straight to task', 0.5, COLORS.ledGrey], ['bored first', 0.88, COLORS.greenLeaf]];
  return (
    <g>
      {bars.map(([lab, v, c], i) => {
        const p = springIn(frame - i * 8, 14); const h = 240 * v * p; const x = cx - 110 + i * 220;
        return <g key={i} transform={`translate(${x} ${cy})`}><rect x={-56} y={50 - h} width={112} height={h} rx={10} fill={c} {...lg} />{i === 1 && <g transform={`translate(0 ${26 - h})`}><circle cx={0} cy={0} r={16} fill={COLORS.yellow} {...sm} />{[0, 1, 2, 3, 4].map((j) => <line key={j} x1={Math.cos((j / 5) * Math.PI - Math.PI / 2) * 22} y1={Math.sin((j / 5) * Math.PI - Math.PI / 2) * 22} x2={Math.cos((j / 5) * Math.PI - Math.PI / 2) * 30} y2={Math.sin((j / 5) * Math.PI - Math.PI / 2) * 30} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>}<text x={0} y={84} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{lab}</text></g>;
      })}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a dull spell sparks more creativity</text>
    </g>
  );
};

/** tolerance-eroding: our tolerance for boredom shrinking as we fill every gap. */
const ToleranceEroding: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 460; const H = 180;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const y = base - H * (0.9 - 0.8 * t); return `${x0 + t * W},${y}`; });
  return (
    <g>
      <line x1={x0 - 10} y1={base} x2={x0 + W + 10} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <line x1={x0} y1={base + 10} x2={x0} y2={base - H - 10} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 - 12} y={base - H + 12} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={13} fill={COLORS.outline}>high</text>
      <text x={x0 - 12} y={base - 2} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={13} fill={COLORS.outline}>low</text>
      <text x={x0} y={base + 34} textAnchor="start" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>pre-phone</text>
      <text x={x0 + W} y={base + 34} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>infinite scroll</text>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>our tolerance for boredom is shrinking</text>
    </g>
  );
};

/** two-memory-systems: familiarity and recollection, normally firing together. */
const TwoMemorySystems: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const sysBox = (x: number, title: string, sub: string, c: string) => (
    <g transform={`translate(${x} ${cy})`}><rect x={-120} y={-60} width={240} height={120} rx={16} fill={shade(c, 0.12)} {...xl} /><text x={0} y={-16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{title}</text><text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>{sub}</text></g>
  );
  return (
    <g>
      {sysBox(cx - 150, 'FAMILIARITY', '"I know this"', COLORS.yellow)}
      {sysBox(cx + 150, 'RECOLLECTION', 'where & when', COLORS.sky)}
      <text x={cx} y={cy + 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>usually they agree</text>
      <text x={cx} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>memory has two systems</text>
    </g>
  );
};

/** deja-glitch: familiarity ON, recollection OFF = déjà vu. */
const DejaGlitch: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const g = 0.5 + 0.5 * Math.sin(frame / 5);
  return (
    <g>
      {/* familiarity ON */}
      <g transform={`translate(${cx - 160} ${cy})`}><circle cx={0} cy={0} r={58} fill={COLORS.yellow} opacity={0.5 + g * 0.4} {...xl} /><text x={0} y={-4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>familiar</text><text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.greenDark}>ON</text></g>
      {/* recollection OFF */}
      <g transform={`translate(${cx + 160} ${cy})`}><circle cx={0} cy={0} r={58} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.xl} strokeDasharray="6 10" /><text x={0} y={-4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>recall</text><text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.red}>OFF</text></g>
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>≠</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>familiar, but nothing to recall</text>
      <text x={cx} y={cy + 140} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.lavenderDark}>= déjà vu</text>
    </g>
  );
};

/** factcheck-flag: the brain flags a false familiarity (a feature, not a bug). */
const FactcheckFlag: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const steps = [['false "familiar"', COLORS.yellow], ['brain checks', COLORS.sky], ['"that\'s wrong!"', COLORS.red]];
  return (
    <g>
      {steps.map(([lab, c], i) => {
        const p = springIn(frame - i * 7, 12); const x = cx - 240 + i * 240;
        return <g key={i}><g transform={`translate(${x} ${cy}) scale(${0.7 + 0.3 * p})`}><rect x={-96} y={-40} width={192} height={80} rx={14} fill={shade(c as string, 0.1)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab as string}</text></g>{i < 2 && <path d={`M ${x + 100} ${cy} l 38 0 l -10 -8 m 10 8 l -10 8`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" opacity={p} />}</g>;
      })}
      <text x={cx} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>maybe your memory is working well</text>
    </g>
  );
};

/** layout-match: a new scene with an old forgotten layout triggers familiarity. */
const LayoutMatch: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const g = 0.5 + 0.5 * Math.sin(frame / 5);
  const roomShape = (x: number, c: string, solid: boolean, lab: string) => (
    <g transform={`translate(${x} ${cy})`} opacity={solid ? 1 : 0.4}>
      <rect x={-80} y={-60} width={160} height={120} rx={8} fill={solid ? COLORS.sky : 'none'} stroke={solid ? COLORS.outline : COLORS.lavender} strokeWidth={solid ? STROKE.lg : STROKE.lg} />
      <rect x={-56} y={20} width={50} height={38} rx={4} fill={solid ? COLORS.white : COLORS.lavender} />
      <circle cx={40} cy={-20} r={20} fill={solid ? COLORS.yellow : COLORS.lavender} />
      <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{lab}</text>
    </g>
  );
  return (
    <g>
      {roomShape(cx - 170, COLORS.lavender, false, 'old, forgotten')}
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline} opacity={g}>≈</text>
      {roomShape(cx + 170, COLORS.sky, true, 'new, same shape')}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>same layout sparks the feeling</text>
    </g>
  );
};

/** memory-offset: a life-timeline with a forgetting curtain before ~3.5. */
const MemoryOffset: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 520;
  const x0 = cx - W / 2;
  return (
    <g>
      <line x1={x0} y1={cy} x2={x0 + W} y2={cy} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[0, 3.5, 7, 12, 20].map((age, i) => { const x = x0 + (age / 20) * W; return <g key={i}><line x1={x} y1={cy - 8} x2={x} y2={cy + 8} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><text x={x} y={cy + 34} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{age}</text></g>; })}
      {/* the fog curtain over 0–3.5 */}
      <rect x={x0 - 6} y={cy - 80} width={(3.5 / 20) * W + 6} height={100} rx={8} fill={COLORS.lavender} opacity={0.5} />
      <text x={x0 + (1.75 / 20) * W} y={cy - 34} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>blank</text>
      <text x={x0 + (12 / 20) * W} y={cy - 34} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={15} fill={COLORS.outline}>memories begin ~3–4</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a blank before about age three</text>
    </g>
  );
};

/** hippocampus-building: an immature vs mature memory-binder. */
const HippocampusBuilding: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const g = 0.5 + 0.4 * Math.sin(frame / 6);
  return (
    <g>
      {/* immature: dashed, incomplete */}
      <g transform={`translate(${cx - 160} ${cy})`}>
        <path d="M -40 50 Q -66 16 -40 -16 Q -18 -44 20 -38 Q 50 -34 48 -8" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="8 10" />
        <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>infant: unfinished</text>
      </g>
      <path d={`M ${cx - 70} ${cy} l 50 0 l -12 -9 m 12 9 l -12 9`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      {/* mature: solid */}
      <g transform={`translate(${cx + 170} ${cy})`}>
        <path d="M -40 50 Q -66 16 -40 -16 Q -18 -44 20 -38 Q 50 -34 48 -8 Q 46 16 20 14 Q 4 12 8 -2" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.7 + g * 0.3} />
        <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>later: ready</text>
      </g>
      <text x={cx} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the memory-binder is still growing</text>
    </g>
  );
};

/** neurogenesis-overwrite: new neurons overwrite early memory traces. */
const NeurogenesisOverwrite: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 480;
  const x0 = cx - W / 2;
  const fresh = springIn(frame, 30);
  return (
    <g>
      {/* an old memory trace, being covered */}
      <path d={`M ${x0} ${cy} Q ${cx} ${cy - 90} ${x0 + W} ${cy}`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} opacity={0.5} strokeDasharray="4 6" />
      {/* bright new neurons sprouting over it */}
      {Array.from({ length: 7 }).map((_, i) => { const x = x0 + 30 + i * ((W - 60) / 6); const p = springIn(frame - i * 4, 12); return <g key={i} transform={`translate(${x} ${cy - 20}) scale(${0.6 + 0.4 * p})`}><circle cx={0} cy={0} r={14} fill={COLORS.red} {...sm} />{[0, 1, 2, 3, 4].map((j) => <line key={j} x1={0} y1={0} x2={Math.cos((j / 5) * Math.PI * 2) * 22} y2={Math.sin((j / 5) * Math.PI * 2) * 22} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>; })}
      <text x={cx} y={cy + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline} opacity={fresh}>fast new growth wipes the old trace</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>growth itself erases early memories</text>
    </g>
  );
};

/** reconstructed-memory: a true recall vs one built from photos & stories. */
const ReconstructedMemory: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const g = 0.5 + 0.4 * Math.sin(frame / 6);
  return (
    <g>
      {/* sources: photo + story */}
      <g transform={`translate(${cx - 180} ${cy - 20})`}><rect x={-44} y={-54} width={88} height={78} rx={6} fill={COLORS.white} {...lg} /><circle cx={-10} cy={-24} r={12} fill={COLORS.yellow} /><text x={0} y={46} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={13} fill={COLORS.outline}>photos</text></g>
      <g transform={`translate(${cx - 180} ${cy + 80})`}><rect x={-44} y={-24} width={88} height={48} rx={8} fill={COLORS.sky} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.white}>"remember..."</text></g>
      {/* arrows into a 'memory' */}
      <path d={`M ${cx - 120} ${cy - 20} Q ${cx - 40} ${cy} ${cx + 40} ${cy}`} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} strokeDasharray="4 6" />
      <path d={`M ${cx - 120} ${cy + 80} Q ${cx - 40} ${cy + 20} ${cx + 40} ${cy}`} fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} strokeDasharray="4 6" />
      <g transform={`translate(${cx + 120} ${cy})`}><circle cx={0} cy={0} r={60} fill={COLORS.lavender} opacity={0.4 + g * 0.3} {...xl} /><text x={0} y={-4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>"my first</text><text x={0} y={16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>memory"</text></g>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>often built, not truly recalled</text>
    </g>
  );
};

/** counterfactual: reality vs an imagined better alternative (upward). */
const CounterfactualDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const g = 0.4 + 0.4 * Math.sin(frame / 6);
  return (
    <g>
      {/* shared start */}
      <circle cx={cx - 170} cy={cy} r={14} fill={COLORS.outline} />
      {/* reality path (dull, down) */}
      <path d={`M ${cx - 158} ${cy} Q ${cx - 40} ${cy + 20} ${cx + 110} ${cy + 50}`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <g transform={`translate(${cx + 130} ${cy + 50})`}><circle cx={0} cy={0} r={26} fill={COLORS.ledGrey} {...lg} /><text x={0} y={46} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>reality</text></g>
      {/* imagined-better path (glowing, up) */}
      <path d={`M ${cx - 158} ${cy} Q ${cx - 40} ${cy - 40} ${cx + 110} ${cy - 70}`} fill="none" stroke={COLORS.yellowSoft} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="8 8" opacity={0.6 + g} />
      <g transform={`translate(${cx + 130} ${cy - 70})`} opacity={0.6 + g * 0.4}><circle cx={0} cy={0} r={26} fill={COLORS.yellow} {...lg} /><text x={0} y={-36} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>"if only..."</text></g>
      <text x={cx} y={cy - 140} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>regret compares up to a better 'if'</text>
    </g>
  );
};

/** action-inaction-time: over time, inaction regrets overtake action regrets. */
const ActionInactionTime: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 480; const H = 180;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const action = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; return `${x0 + t * W},${base - H * (0.8 - 0.65 * t)}`; });
  const inaction = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; return `${x0 + t * W},${base - H * (0.2 + 0.7 * t)}`; });
  return (
    <g>
      <line x1={x0} y1={base} x2={x0 + W} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <polyline points={action.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={inaction.join(' ')} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 + W + 6} y={base - H * 0.15 + 6} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.sky}>"did"</text>
      <text x={x0 + W + 6} y={base - H * 0.9 + 6} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.red}>"didn't"</text>
      <text x={x0} y={base + 32} textAnchor="start" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>soon after</text>
      <text x={x0 + W} y={base + 32} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>years later</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the things we didn't do win out</text>
    </g>
  );
};

/** near-miss: silver (compares up) is less happy than bronze (compares down). */
const NearMissDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const medal = (x: number, n: string, c: string, happy: boolean, note: string) => (
    <g transform={`translate(${x} ${cy})`}>
      <circle cx={0} cy={0} r={48} fill={c} {...xl} />
      <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.white}>{n}</text>
      <g transform="translate(0 72)"><circle cx={0} cy={0} r={22} fill={COLORS.white} {...lg} /><circle cx={-8} cy={-4} r={3} fill={COLORS.outline} /><circle cx={8} cy={-4} r={3} fill={COLORS.outline} />{happy ? <path d="M -9 6 Q 0 14 9 6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /> : <path d="M -9 10 Q 0 2 9 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}</g>
      <text x={0} y={128} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>{note}</text>
    </g>
  );
  return (
    <g>
      {medal(cx - 110, '2', COLORS.ledGrey, false, '"if only... gold"')}
      {medal(cx + 110, '3', COLORS.wood, true, '"at least a medal!"')}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>so-close hurts the most</text>
    </g>
  );
};

/** regret-function: regret → learn → better; no regret → repeat. */
const RegretFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const row = (y: number, a: string, b: string, c: string, outcome: string, oc: string) => (
    <g transform={`translate(0 ${y})`}>
      <g transform={`translate(${cx - 220} 0)`}><rect x={-80} y={-28} width={160} height={56} rx={12} fill={shade(c, 0.1)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{a}</text></g>
      <path d={`M ${cx - 132} 0 l 46 0 l -10 -8 m 10 8 l -10 8`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(${cx - 10} 0)`}><rect x={-80} y={-28} width={160} height={56} rx={12} fill={shade(c, 0.1)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{b}</text></g>
      <path d={`M ${cx + 78} 0 l 46 0 l -10 -8 m 10 8 l -10 8`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(${cx + 200} 0)`}><rect x={-70} y={-28} width={150} height={56} rx={12} fill={oc} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.white}>{outcome}</text></g>
    </g>
  );
  return (
    <g>
      {row(cy - 50, 'feel regret', 'learn', shade(COLORS.greenLeaf, 0.1), 'better next time', COLORS.greenLeaf)}
      {row(cy + 50, 'shrug it off', 'forget', shade(COLORS.red, 0.1), 'same mistake', COLORS.red)}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the pain is useful feedback</text>
    </g>
  );
};

/** fawn-response: fight / flight / freeze / FAWN — the fourth response. */
const FawnResponse: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const modes: [string, string, boolean][] = [['FIGHT', COLORS.red, false], ['FLIGHT', COLORS.sky, false], ['FREEZE', COLORS.ledGrey, false], ['FAWN', COLORS.pink, true]];
  const g = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <g>
      {modes.map(([lab, c, hot], i) => {
        const x = cx - 240 + i * 160; const p = springIn(frame - i * 5, 12);
        return (
          <g key={i} transform={`translate(${x} ${cy}) scale(${0.7 + 0.3 * p})`}>
            <circle cx={0} cy={0} r={58} fill={c} opacity={hot ? 0.6 + g * 0.3 : 0.4} {...xl} />
            <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab}</text>
            {hot && <text x={0} y={88} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>= please &amp; appease</text>}
          </g>
        );
      })}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the fourth threat response</text>
    </g>
  );
};

/** no-social-threat: "no" → fear of rejection → auto-yes loop. */
const NoSocialThreat: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const R = 130;
  const nodes = [['you want to\nsay NO', COLORS.sky], ['fear of\nrejection', COLORS.red], ['anxiety\nalarm', COLORS.red], ['auto "yes"\n(relief)', COLORS.yellow]];
  const a = (frame / 30) % (Math.PI * 2);
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeDasharray="4 16" />
      <g transform={`translate(${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R})`}><circle cx={0} cy={0} r={8} fill={COLORS.redDark} /></g>
      {nodes.map(([lab, c], i) => {
        const ang = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(ang) * R; const y = cy + Math.sin(ang) * R;
        return <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={0} r={52} fill={c as string} {...lg} />{(lab as string).split('\n').map((ln, j) => <text key={j} x={0} y={-4 + j * 16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={12} fill={COLORS.outline}>{ln}</text>)}</g>;
      })}
      <text x={cx} y={cy - R - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>why 'yes' leaps out on its own</text>
    </g>
  );
};

/** people-pleasing-cost: short-term relief vs long-term resentment & burnout. */
const PleasingCost: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48; const W = 480; const H = 180;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const relief = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const y = base - H * (0.7 * Math.exp(-t * 6)); return `${x0 + t * W},${y}`; });
  const cost = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const y = base - H * (0.1 + 0.8 * t); return `${x0 + t * W},${y}`; });
  return (
    <g>
      <line x1={x0} y1={base} x2={x0 + W} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <polyline points={relief.join(' ')} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <polyline points={cost.join(' ')} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 + W + 6} y={base - H * 0.1 + 6} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.sky}>quick relief</text>
      <text x={x0 + W + 6} y={base - H * 0.9 + 6} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.red}>resentment</text>
      <text x={x0} y={base + 32} textAnchor="start" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>the "yes"</text>
      <text x={x0 + W} y={base + 32} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>over time</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>relief now, resentment later</text>
    </g>
  );
};

/** boundary-reframe: "no" to a request is not "no" to the person. */
const BoundaryReframe: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const g = 0.5 + 0.4 * Math.sin(frame / 6);
  return (
    <g>
      {/* what they hear you fear */}
      <g transform={`translate(${cx - 170} ${cy})`}>
        <rect x={-90} y={-50} width={180} height={100} rx={14} fill={shade(COLORS.red, 0.1)} {...lg} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>"no" =</text>
        <text x={0} y={18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>I reject you</text>
        <g transform="translate(70 -38)"><circle cx={0} cy={0} r={16} fill={COLORS.red} /><line x1={-7} y1={-7} x2={7} y2={7} stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={7} y1={-7} x2={-7} y2={7} stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      </g>
      {/* the truth */}
      <g transform={`translate(${cx + 170} ${cy})`}>
        <rect x={-96} y={-50} width={192} height={100} rx={14} fill={shade(COLORS.greenLeaf, 0.1)} {...lg} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>"no" to this,</text>
        <text x={0} y={18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>not to you</text>
        <g transform="translate(78 -38)" opacity={0.7 + g * 0.3}><circle cx={0} cy={0} r={16} fill={COLORS.greenLeaf} /><path d="M -7 0 l 5 6 l 10 -12" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
      </g>
      <text x={cx} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a boundary isn't a rejection</text>
    </g>
  );
};

/** connection-gap-diagram: loneliness = desired connection minus actual. */
const ConnectionGapDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const p = springIn(frame, 26);
  return (
    <g>
      {/* desired bar (tall) */}
      <g transform={`translate(${cx - 150} ${cy})`}><rect x={-50} y={40 - 200 * p} width={100} height={200 * p} rx={10} fill={COLORS.sky} {...lg} /><text x={0} y={74} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>want</text></g>
      {/* actual bar (short) */}
      <g transform={`translate(${cx + 40} ${cy})`}><rect x={-50} y={40 - 80 * p} width={100} height={80 * p} rx={10} fill={COLORS.ledGrey} {...lg} /><text x={0} y={74} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>have</text></g>
      {/* the gap bracket */}
      <g transform={`translate(${cx + 160} ${cy})`} opacity={p}><line x1={0} y1={-160} x2={0} y2={-40} stroke={COLORS.pink} strokeWidth={STROKE.lg} /><path d="M 0 -160 l -8 12 m 8 -12 l 8 12 M 0 -40 l -8 -12 m 8 12 l 8 -12" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" /><text x={28} y={-96} textAnchor="start" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.pinkDark}>the gap</text></g>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>loneliness is the gap, not the number</text>
    </g>
  );
};

/** loneliness-signal: like hunger/thirst/pain, it's a drive to reconnect. */
const LonelinessSignal: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const signals: [string, string][] = [['hunger', 'eat'], ['thirst', 'drink'], ['pain', 'protect'], ['loneliness', 'reconnect']];
  return (
    <g>
      {signals.map(([s, drive], i) => {
        const y = cy - 90 + i * 60; const hot = i === 3; const p = springIn(frame - i * 5, 12);
        return (
          <g key={i} transform={`translate(${cx} ${y})`} opacity={p}>
            <rect x={-220} y={-24} width={200} height={48} rx={10} fill={hot ? shade(COLORS.sky, 0.1) : shade(COLORS.white, 0.1)} {...lg} /><text x={-120} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>{s}</text>
            <path d="M -14 0 l 34 0 l -10 -8 m 10 8 l -10 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
            <rect x={30} y={-24} width={190} height={48} rx={10} fill={hot ? COLORS.sky : shade(COLORS.white, 0.1)} {...lg} /><text x={125} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>{drive}</text>
          </g>
        );
      })}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>it's a signal, like hunger</text>
    </g>
  );
};

/** loneliness-health: chronic loneliness risk compared to smoking. */
const LonelinessHealth: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const bars: [string, number, string][] = [['obesity', 0.6, COLORS.yellow], ['smoking', 0.95, COLORS.outline], ['loneliness', 0.92, COLORS.red]];
  return (
    <g>
      {bars.map(([lab, v, c], i) => {
        const p = springIn(frame - i * 6, 14); const h = 240 * v * p; const x = cx - 230 + i * 160;
        return <g key={i} transform={`translate(${x} ${cy})`}><rect x={-56} y={60 - h} width={112} height={h} rx={10} fill={c} {...lg} /><text x={0} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>{lab}</text></g>;
      })}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>chronic loneliness harms like smoking</text>
    </g>
  );
};

/** loneliness-cycle: lonely → threat-vigilant → withdraw → more lonely. */
const LonelinessCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.46; const R = 130;
  const a = (frame / 30) % (Math.PI * 2);
  const nodes = [['feel lonely', COLORS.sky], ['scan for\nrejection', COLORS.red], ['pull away', COLORS.ledGrey], ['more\nisolated', COLORS.red]];
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} strokeDasharray="4 16" />
      <g transform={`translate(${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R})`}><circle cx={0} cy={0} r={8} fill={COLORS.yellowDark} /></g>
      {nodes.map(([lab, c], i) => {
        const ang = -Math.PI / 2 + (i / 4) * Math.PI * 2; const x = cx + Math.cos(ang) * R; const y = cy + Math.sin(ang) * R;
        return <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={0} r={54} fill={c as string} {...lg} />{(lab as string).split('\n').map((ln, j) => <text key={j} x={0} y={-4 + j * 16} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.outline}>{ln}</text>)}</g>;
      })}
      <text x={cx} y={cy - R - 40} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>a trap that feeds itself</text>
    </g>
  );
};

/** proportion-ratio: a year as a shrinking fraction of a life. */
const ProportionRatio: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const ages: [number, number][] = [[1, 1], [5, 1 / 5], [10, 1 / 10], [30, 1 / 30], [60, 1 / 60]];
  return (
    <g>
      {ages.map(([age, frac], i) => {
        const p = springIn(frame - i * 5, 12); const x = cx - 300 + i * 150; const w = 100; const h = 220 * frac * p + 6;
        return (
          <g key={i} transform={`translate(${x} ${cy})`}>
            <rect x={-w / 2} y={60 - h} width={w} height={h} rx={8} fill={i === 0 ? COLORS.sky : shade(COLORS.sky, 0.06)} {...lg} />
            <text x={0} y={88} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>age {age}</text>
            <text x={0} y={52 - h} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.outline}>1/{age}</text>
          </g>
        );
      })}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>a year shrinks against your whole life</text>
    </g>
  );
};

/** memory-density-diagram: dense memories = long-feeling; sparse = short. */
const MemoryDensityDiagram: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 200;
  const box = (gx: number, title: string, n: number, c: string, felt: string) => (
    <g transform={`translate(${gx} ${cy})`}>
      <rect x={-W / 2} y={-90} width={W} height={160} rx={10} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
      {Array.from({ length: n }).map((_, i) => { const cols = Math.ceil(Math.sqrt(n)); const r = Math.floor(i / cols); const cc = i % cols; return <circle key={i} cx={-W / 2 + 26 + cc * ((W - 40) / cols) } cy={-70 + r * ((140) / cols)} r={6} fill={c} />; })}
      <text x={0} y={-108} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{title}</text>
      <text x={0} y={94} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{felt}</text>
    </g>
  );
  return (
    <g>
      {box(cx - 150, 'a child year', 28, COLORS.yellow, 'feels long')}
      {box(cx + 150, 'an adult year', 5, COLORS.ledGrey, 'feels short')}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>more memories = a longer-feeling year</text>
    </g>
  );
};

/** routine-vs-novelty: novelty lays memories (long); routine doesn't (short). */
const RoutineVsNovelty: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const bars: [string, number, string][] = [['routine', 0.35, COLORS.ledGrey], ['novelty', 0.9, COLORS.greenLeaf]];
  return (
    <g>
      {bars.map(([lab, v, c], i) => {
        const p = springIn(frame - i * 8, 14); const h = 240 * v * p; const x = cx - 110 + i * 220;
        return <g key={i} transform={`translate(${x} ${cy})`}><rect x={-56} y={50 - h} width={112} height={h} rx={10} fill={c} {...lg} /><text x={0} y={84} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{lab}</text></g>;
      })}
      <text x={cx} y={cy + 84} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>↑ memories laid down ↑</text>
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>novelty fills time; routine empties it</text>
    </g>
  );
};

/** holiday-paradox-diagram: in-the-moment vs in-retrospect, for novel vs routine. */
const HolidayParadoxDiagram: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const cell = (gx: number, gy: number, txt: string, c: string) => (
    <g transform={`translate(${gx} ${gy})`}><rect x={-96} y={-34} width={192} height={68} rx={12} fill={shade(c, 0.1)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>{txt}</text></g>
  );
  return (
    <g>
      <text x={cx - 160} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>in the moment</text>
      <text x={cx + 160} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>in memory</text>
      <text x={cx - 300} y={cy - 36} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.pinkDark}>holiday</text>
      <text x={cx - 300} y={cy + 56} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>routine</text>
      {cell(cx - 160, cy - 40, 'flies by', COLORS.sky)}
      {cell(cx + 160, cy - 40, 'feels LONG', COLORS.pink)}
      {cell(cx - 160, cy + 52, 'drags', COLORS.ledGrey)}
      {cell(cx + 160, cy + 52, 'vanishes', COLORS.ledGrey)}
      <text x={cx} y={cy - 150} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>the holiday paradox</text>
    </g>
  );
};

/** safe-emotion: real sadness (cause, lasts) vs sad music (no cause, savourable). */
const SafeEmotionDiagram: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const col = (gx: number, title: string, c: string, lines: string[]) => (
    <g transform={`translate(${gx} ${cy})`}>
      <rect x={-150} y={-80} width={300} height={190} rx={16} fill={shade(c, 0.12)} {...xl} />
      <text x={0} y={-48} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>{title}</text>
      {lines.map((ln, i) => <text key={i} x={0} y={-12 + i * 32} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={15} fill={COLORS.outline}>{ln}</text>)}
    </g>
  );
  return (
    <g>
      {col(cx - 180, 'real sadness', COLORS.ledGrey, ['has a real cause', 'you can\'t switch off', 'hurts'])}
      {col(cx + 180, 'sad music', COLORS.sky, ['no real loss', 'you can stop anytime', 'you can savour it'])}
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>sadness, safely, with no real loss</text>
    </g>
  );
};

/** console-hormone: sad music → comfort-chemistry → net soothed. */
const ConsoleHormone: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5;
  const steps = [['sad music', COLORS.sky], ['"console mode"', COLORS.pink], ['comfort, no loss', COLORS.greenLeaf]];
  return (
    <g>
      {steps.map(([lab, c], i) => {
        const p = springIn(frame - i * 7, 12); const x = cx - 240 + i * 240;
        return <g key={i}><g transform={`translate(${x} ${cy}) scale(${0.7 + 0.3 * p})`}><rect x={-96} y={-40} width={192} height={80} rx={14} fill={shade(c as string, 0.1)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={15} fill={COLORS.outline}>{lab as string}</text></g>{i < 2 && <path d={`M ${x + 100} ${cy} l 38 0 l -10 -8 m 10 8 l -10 8`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" opacity={p} />}</g>;
      })}
      <text x={cx} y={cy - 110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>it may switch on comfort chemistry</text>
    </g>
  );
};

/** mood-congruence: when sad, matching music validates & lifts (not worsens). */
const MoodCongruence: React.FC = () => {
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.5; const W = 480; const H = 160;
  const x0 = cx - W / 2; const base = cy + H / 2;
  const pts = Array.from({ length: 120 }).map((_, i) => { const t = i / 119; const y = base - H * (0.2 + 0.1 * Math.sin(t * 12) * (1 - t) - 0.05 + 0.55 * t); return `${x0 + t * W},${y}`; });
  return (
    <g>
      <line x1={x0} y1={base} x2={x0 + W} y2={base} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <line x1={x0} y1={base + 10} x2={x0} y2={base - H - 10} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <polyline points={pts.join(' ')} fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x0 - 12} y={base - H + 10} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>mood</text>
      <text x={x0} y={base + 32} textAnchor="start" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>press play (feel seen)</text>
      <text x={x0 + W} y={base + 32} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.outline}>after (lighter)</text>
      <text x={cx} y={cy - 130} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>it validates, then lifts you</text>
    </g>
  );
};

/** sad-music-gives: the gifts of sad music (comfort, catharsis, connection, beauty). */
const SadMusicGives: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.56; const cy = CANVAS.height * 0.48;
  const spokes = ['comfort', 'catharsis', 'feeling seen', 'beauty'];
  const g = 0.5 + 0.4 * Math.sin(frame / 7);
  return (
    <g>
      {spokes.map((s, i) => {
        const a = -Math.PI / 2 + (i / spokes.length) * Math.PI * 2; const R = 160; const x = cx + Math.cos(a) * R; const y = cy + Math.sin(a) * R; const p = springIn(frame - i * 5, 12);
        return <g key={i}><line x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.pink} strokeWidth={STROKE.lg} opacity={0.6 * p} /><g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}><rect x={-76} y={-24} width={152} height={48} rx={12} fill={COLORS.yellowSoft} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{s}</text></g></g>;
      })}
      <circle cx={cx} cy={cy} r={48} fill={COLORS.pink} opacity={0.4 + g * 0.3} {...xl} />
      <path d="M 0 30 Q -34 -2 -34 -22 Q -34 -46 -11 -46 Q 0 -46 0 -30 Q 0 -46 11 -46 Q 34 -46 34 -22 Q 34 -2 0 30 Z" fill={COLORS.pink} transform={`translate(${cx} ${cy})`} {...lg} />
      <text x={cx} y={cy - 220} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>what a sad song gives you</text>
    </g>
  );
};

/** anger-as-signal: anger as a messenger — an alarm light that carries information and
 *  energy; the feeling isn't the problem, what we do with it is. */
const AngerAsSignal: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.46;
  const flash = 0.5 + 0.5 * Math.sin(frame / 6);
  const items = [{ t: 'something matters', y: 60 }, { t: 'a line was crossed', y: 150 }, { t: 'energy to act', y: 240 }];
  return (
    <g>
      <text x={cx} y={cy - 220} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>anger is a messenger</text>
      {/* the alarm bell */}
      <g transform={`translate(${cx - 320} ${cy})`}>
        {[1, 2, 3].map((r) => <circle key={r} cx={0} cy={-10} r={60 + r * 26} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} opacity={(0.4 - r * 0.1) * flash} />)}
        <path d="M -54 30 Q -54 -54 0 -54 Q 54 -54 54 30 Z" fill={COLORS.red} opacity={0.3 + flash * 0.4} {...xl} />
        <rect x={-64} y={30} width={128} height={16} rx={8} fill={COLORS.redDark} {...lg} />
        <circle cx={0} cy={52} r={12} fill={COLORS.redDark} {...lg} />
        <path d="M 0 -54 v -16" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <circle cx={0} cy={-76} r={9} fill={COLORS.yellow} {...sm} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.white}>!</text>
      </g>
      {/* the information it carries */}
      {items.map((it, i) => {
        const p = springIn(frame - 10 - i * 8, 12);
        return <g key={i} transform={`translate(${cx - 120} ${cy - 150 + it.y}) scale(${0.7 + 0.3 * p})`} opacity={p}>
          <path d="M -40 0 l 22 -14 v 28 Z" fill={COLORS.red} opacity={0.7} />
          <rect x={0} y={-26} width={420} height={52} rx={14} fill={COLORS.yellowSoft} {...lg} />
          <text x={24} y={8} fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{it.t}</text>
        </g>;
      })}
    </g>
  );
};

/** anger-iceberg-split: the anger iceberg — anger above the waterline, the softer
 *  feelings (hurt, fear, shame) hidden below. */
const AngerIcebergSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const waterY = CANVAS.height * 0.42;
  const below = ['hurt', 'fear', 'shame', 'powerlessness'];
  const bob = Math.sin(frame / 18) * 6;
  return (
    <g>
      {/* water */}
      <rect x={0} y={waterY} width={CANVAS.width} height={CANVAS.height - waterY} fill={shade(COLORS.blueDiagram, 0.08)} opacity={0.5} />
      <line x1={0} y1={waterY} x2={CANVAS.width} y2={waterY} stroke={COLORS.blueDiagram} strokeWidth={STROKE.lg} opacity={0.7} />
      <g transform={`translate(${cx} ${bob})`}>
        {/* tip above water = anger */}
        <path d={`M ${0} ${waterY - 150} l 90 150 l -180 0 Z`} fill={COLORS.red} {...xl} />
        <text x={0} y={waterY - 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.white}>ANGER</text>
        {/* big mass below = the real feelings */}
        <path d={`M -90 ${waterY} l 180 0 l 70 120 l -40 110 l -240 0 l -40 -110 Z`} fill={shade(COLORS.blueDiagram, -0.04)} opacity={0.85} {...xl} />
        {below.map((b, i) => {
          const p = springIn(frame - 14 - i * 7, 12);
          return <text key={i} x={0} y={waterY + 60 + i * 42} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.white} opacity={p}>{b}</text>;
        })}
      </g>
      <text x={cx} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the anger iceberg</text>
    </g>
  );
};

/** amygdala-flood: the amygdala hijack — the fast threat alarm floods the body before
 *  the slow, rational prefrontal cortex can weigh in. */
const AmygdalaFlood: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.5;
  const surge = frame % 90;
  const fast = Math.min(1, surge / 10);
  const slow = Math.max(0, Math.min(1, (surge - 30) / 40));
  return (
    <g>
      <text x={cx} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the amygdala hijack</text>
      {/* brain outline */}
      <path d={`M ${cx - 220} ${cy} q -10 -120 110 -150 q 60 -50 150 -10 q 90 -20 120 60 q 40 50 -10 110 q 10 90 -110 100 q -80 40 -160 -10 q -90 10 -90 -80 Z`} fill={shade(COLORS.lavender, 0.1)} opacity={0.4} {...xl} />
      {/* amygdala = fast red alarm */}
      <g transform={`translate(${cx - 90} ${cy + 40})`}>
        <circle cx={0} cy={0} r={38 + fast * 10} fill={COLORS.red} opacity={0.5 + fast * 0.4} {...lg} />
        <text x={0} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>amygdala</text>
        <text x={0} y={92} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.red}>fast · 0.1s</text>
      </g>
      {/* prefrontal cortex = slow */}
      <g transform={`translate(${cx + 150} ${cy - 70})`}>
        <circle cx={0} cy={0} r={44} fill={COLORS.greenTeal} opacity={0.3 + slow * 0.5} {...lg} />
        <text x={0} y={-60} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>prefrontal</text>
        <text x={0} y={-40} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={14} fill={COLORS.greenDark}>slow · later</text>
      </g>
      {/* flood arrow from amygdala out to the body, firing first */}
      <path d={`M ${cx - 52} ${cy + 40} q 120 20 220 120`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.3 + fast * 0.6} strokeDasharray="4 14" />
      <text x={cx + 150} y={cy + 190} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.red} opacity={0.4 + fast * 0.5}>adrenaline + cortisol</text>
    </g>
  );
};

/** ninety-second-rule: the chemical surge of anger peaks and subsides in ~90 seconds;
 *  staying angry means re-triggering the thought. */
const NinetySecondRule: React.FC = () => {
  const frame = useCurrentFrame();
  const x0 = CANVAS.width * 0.16; const x1 = CANVAS.width * 0.84; const baseY = CANVAS.height * 0.72; const peakY = CANVAS.height * 0.3;
  const W = x1 - x0;
  const pts = Array.from({ length: 60 }, (_, i) => { const t = i / 59; const bell = Math.exp(-Math.pow((t - 0.3) * 4.2, 2)); return { x: x0 + t * W, y: baseY - (baseY - peakY) * bell }; });
  const reveal = Math.min(pts.length, Math.floor(springIn(frame, 40) * pts.length) + 1);
  const d = pts.slice(0, reveal).map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const dot = pts[Math.min(reveal - 1, pts.length - 1)];
  return (
    <g>
      <text x={CANVAS.width / 2} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the 90-second wave</text>
      {/* axes */}
      <line x1={x0} y1={baseY} x2={x1} y2={baseY} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={x0} y1={baseY} x2={x0} y2={peakY - 20} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 - 14} y={(baseY + peakY) / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 14} ${(baseY + peakY) / 2})`}>arousal</text>
      {/* the bell curve */}
      <path d={d} fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {dot && <circle cx={dot.x} cy={dot.y} r={10} fill={COLORS.red} {...sm} />}
      {/* 90s marker */}
      <line x1={x0 + W * 0.6} y1={baseY} x2={x0 + W * 0.6} y2={baseY + 16} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <text x={x0 + W * 0.6} y={baseY + 44} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>~90 seconds</text>
      <text x={x1} y={baseY + 44} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.greenDark}>then it subsides — if you don't feed it</text>
    </g>
  );
};

/** impression-speed: a confidence curve that keeps climbing while the verdict is already
 *  locked in the first tenth of a second. */
const ImpressionSpeed: React.FC = () => {
  const frame = useCurrentFrame();
  const x0 = CANVAS.width * 0.16; const x1 = CANVAS.width * 0.84; const baseY = CANVAS.height * 0.74; const topY = CANVAS.height * 0.3;
  const W = x1 - x0;
  const pts = Array.from({ length: 60 }, (_, i) => { const t = i / 59; const y = baseY - (baseY - topY) * (1 - Math.exp(-t * 3.4)); return { x: x0 + t * W, y }; });
  const reveal = Math.min(pts.length, Math.floor(springIn(frame, 40) * pts.length) + 1);
  const d = pts.slice(0, reveal).map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const vx = x0 + W * 0.06;
  return (
    <g>
      <text x={CANVAS.width / 2} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the verdict comes first</text>
      <line x1={x0} y1={baseY} x2={x1} y2={baseY} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <line x1={x0} y1={baseY} x2={x0} y2={topY - 20} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={x0 - 16} y={(baseY + topY) / 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline} transform={`rotate(-90 ${x0 - 16} ${(baseY + topY) / 2})`}>confidence</text>
      <text x={(x0 + x1) / 2} y={baseY + 46} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>time looking</text>
      <path d={d} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {/* the moment the judgment is already made */}
      <line x1={vx} y1={baseY} x2={vx} y2={topY} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeDasharray="4 10" />
      <circle cx={vx} cy={pts[3].y} r={11} fill={COLORS.red} {...sm} />
      <text x={vx + 10} y={topY + 20} fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.red}>0.1s — already decided</text>
    </g>
  );
};

/** primacy-list: the same six traits, read top-down, warm early and cold late — order
 *  colours the whole picture. */
const PrimacyList: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5;
  const traits = ['intelligent', 'hard-working', 'impulsive', 'critical', 'stubborn', 'envious'];
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>order changes everything</text>
      {traits.map((t, i) => {
        const p = springIn(frame - i * 8, 12);
        const warm = i < 2; const cold = i > 3;
        const col = warm ? COLORS.greenTeal : cold ? shade(COLORS.sky, -0.04) : COLORS.yellowSoft;
        return <g key={i} transform={`translate(${cx} ${180 + i * 92}) scale(${0.8 + 0.2 * p})`} opacity={p}>
          <rect x={-200} y={-34} width={400} height={68} rx={16} fill={col} {...lg} />
          <circle cx={-168} cy={0} r={18} fill={COLORS.white} {...sm} /><text x={-168} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{i + 1}</text>
          <text x={-130} y={8} fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
        </g>;
      })}
      <text x={cx + 250} y={200} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.greenDark} transform={`rotate(90 ${cx + 250} 200)`}>warm start → warm read</text>
    </g>
  );
};

/** first-two-questions: warmth ("can I trust you?") judged before competence ("can I
 *  respect you?"). */
const FirstTwoQuestions: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.5;
  const p1 = springIn(frame, 14); const p2 = springIn(frame - 24, 14);
  return (
    <g>
      <text x={cx} y={110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>two questions, in order</text>
      {/* warmth — first, larger */}
      <text x={cx - 230} y={cy - 172} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.red} opacity={p1}>1st · can I trust you?</text>
      <g transform={`translate(${cx - 230} ${cy}) scale(${0.6 + 0.4 * p1})`} opacity={p1}>
        <circle cx={0} cy={0} r={130} fill={shade(COLORS.yellow, 0.06)} {...xl} />
        <path d="M 0 40 q -46 -30 -46 -58 q 0 -28 30 -28 q 16 0 16 18 q 0 -18 16 -18 q 30 0 30 28 q 0 28 -46 58 Z" fill={COLORS.red} transform="translate(0 -6)" {...lg} />
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>WARMTH</text>
      </g>
      {/* arrow */}
      <path d={`M ${cx - 70} ${cy} l 90 0`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={p2} />
      <path d={`M ${cx + 14} ${cy - 10} l 14 10 l -14 10`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" opacity={p2} />
      {/* competence — second, smaller: ascending bars */}
      <text x={cx + 210} y={cy - 158} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.skyDark} opacity={p2}>2nd · can I respect you?</text>
      <g transform={`translate(${cx + 210} ${cy}) scale(${0.5 + 0.35 * p2})`} opacity={p2}>
        <circle cx={0} cy={0} r={118} fill={shade(COLORS.sky, 0.06)} {...xl} />
        {[0, 1, 2].map((i) => <rect key={i} x={-52 + i * 38} y={-6 - i * 24} width={30} height={40 + i * 24} rx={6} fill={COLORS.sky} {...lg} />)}
        <text x={0} y={96} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>COMPETENCE</text>
      </g>
    </g>
  );
};

/** halo-spread: one bright trait at the centre bleeds its glow onto unrelated
 *  judgments around it. */
const HaloSpread: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.52;
  const outer = ['kind', 'smart', 'honest', 'capable', 'likeable'];
  const glow = 0.5 + 0.5 * Math.sin(frame / 7);
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>one trait spreads out</text>
      {outer.map((o, i) => {
        const a = -Math.PI / 2 + (i / outer.length) * Math.PI * 2; const R = 200; const x = cx + Math.cos(a) * R; const y = cy + Math.sin(a) * R;
        const p = springIn(frame - 12 - i * 6, 12);
        return <g key={i}>
          <line x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.yellow} strokeWidth={STROKE.lg} opacity={0.5 * p} />
          <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}><ellipse cx={0} cy={0} rx={62} ry={40} fill={shade(COLORS.yellow, 0.08)} opacity={0.4 + glow * 0.3} /><rect x={-58} y={-24} width={116} height={48} rx={12} fill={COLORS.white} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{o}</text></g>
        </g>;
      })}
      {[1, 2, 3].map((r) => <circle key={r} cx={cx} cy={cy} r={54 + r * 22} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={(0.4 - r * 0.1) * (0.6 + glow * 0.5)} />)}
      <circle cx={cx} cy={cy} r={52} fill={COLORS.yellow} opacity={0.5 + glow * 0.3} {...xl} />
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>good-</text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>looking</text>
    </g>
  );
};

/** baseline-deviation: a calm baseline of behaviour, then a sudden spike when a topic
 *  lands — the change is the signal, not the behaviour itself. */
const BaselineDeviation: React.FC = () => {
  const frame = useCurrentFrame();
  const x0 = CANVAS.width * 0.16; const x1 = CANVAS.width * 0.84; const midY = CANVAS.height * 0.52;
  const W = x1 - x0;
  const pts = Array.from({ length: 80 }, (_, i) => { const t = i / 79; const x = x0 + t * W; const wobble = Math.sin(t * 40) * 8; const spike = t > 0.56 && t < 0.72 ? -Math.sin((t - 0.56) / 0.16 * Math.PI) * 150 : 0; return { x, y: midY + wobble + spike }; });
  const reveal = Math.min(pts.length, Math.floor(springIn(frame, 46) * pts.length) + 1);
  const d = pts.slice(0, reveal).map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const sx = x0 + W * 0.64;
  return (
    <g>
      <text x={CANVAS.width / 2} y={110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the change is the signal</text>
      <line x1={x0} y1={midY} x2={x1} y2={midY} stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} strokeDasharray="4 10" />
      <text x={x0 + 70} y={midY - 14} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>baseline</text>
      <path d={d} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      {reveal > 52 && <>
        <line x1={sx} y1={midY + 20} x2={sx} y2={midY - 170} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeDasharray="4 8" />
        <circle cx={sx} cy={midY - 150} r={11} fill={COLORS.red} {...sm} />
        <text x={sx} y={midY - 170} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.red}>a topic lands → the tell</text>
      </>}
    </g>
  );
};

/** cluster-not-single: one cue is ambiguous (three meanings); three cues together point
 *  one way. */
const ClusterNotSingle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const leftX = CANVAS.width * 0.28; const rightX = CANVAS.width * 0.72; const topY = CANVAS.height * 0.36;
  const p1 = springIn(frame, 14); const p2 = springIn(frame - 20, 14);
  return (
    <g>
      <text x={cx} y={110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>one cue lies, a cluster tells</text>
      {/* single cue → ambiguous */}
      <g opacity={p1}>
        <rect x={leftX - 90} y={topY - 36} width={180} height={72} rx={16} fill={COLORS.white} {...xl} />
        <text x={leftX} y={topY + 8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>crossed arms</text>
        {['cold?', 'closed?', 'comfy?'].map((t, i) => <g key={i} transform={`translate(${leftX - 100 + i * 100} ${topY + 150})`}><rect x={-46} y={-24} width={92} height={48} rx={12} fill={shade(COLORS.sky, 0.06)} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{t}</text></g>)}
        <path d={`M ${leftX} ${topY + 40} l 0 60`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="3 7" />
        <text x={leftX} y={topY + 230} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>ambiguous</text>
      </g>
      {/* cluster → clear */}
      <g opacity={p2}>
        {['crossed arms', 'leaning away', 'tight jaw'].map((t, i) => <g key={i} transform={`translate(${rightX} ${topY - 20 + i * 56})`}><rect x={-96} y={-22} width={192} height={44} rx={12} fill={COLORS.yellowSoft} {...lg} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>{t}</text></g>)}
        <path d={`M ${rightX} ${topY + 120} l 0 48`} stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <path d={`M ${rightX - 10} ${topY + 158} l 10 12 l 10 -12`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
        <text x={rightX} y={topY + 210} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.greenDark}>clearly closed off</text>
      </g>
    </g>
  );
};

/** proxemics-zones: concentric personal-space rings — intimate, personal, social,
 *  public. */
const ProxemicsZones: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.56;
  const zones = [{ r: 300, c: COLORS.sky, t: 'public', d: '3.5m +' }, { r: 230, c: COLORS.greenTeal, t: 'social', d: '1.2–3.5m' }, { r: 150, c: COLORS.yellow, t: 'personal', d: '0.5–1.2m' }, { r: 80, c: COLORS.pink, t: 'intimate', d: '0–0.5m' }];
  return (
    <g>
      <text x={cx} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the zones we carry</text>
      {zones.map((z, i) => { const p = springIn(frame - i * 7, 14); return <circle key={i} cx={cx} cy={cy} r={z.r * (0.6 + 0.4 * p)} fill={z.c} opacity={0.12 + i * 0.05} {...sm} />; })}
      {zones.map((z, i) => { const p = springIn(frame - i * 7, 14); return <g key={i} opacity={p}><text x={cx} y={cy - z.r + 30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{z.t}</text><text x={cx} y={cy - z.r + 52} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={13} fill={COLORS.outline} opacity={0.7}>{z.d}</text></g>; })}
      <circle cx={cx} cy={cy} r={30} fill={COLORS.skin} {...lg} />
      <path d={`M ${cx - 22} ${cy + 40} Q ${cx} ${cy + 14} ${cx + 22} ${cy + 40}`} fill={COLORS.greenTeal} {...lg} />
    </g>
  );
};

/** honesty-ladder: which parts of the body leak the truth — feet most honest at the
 *  bottom, face least at the top. */
const HonestyLadder: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5;
  const rungs = [{ t: 'face', s: 'most controlled', c: COLORS.sky }, { t: 'hands', s: '', c: COLORS.lavender }, { t: 'torso', s: '', c: COLORS.yellow }, { t: 'legs', s: '', c: COLORS.greenTeal }, { t: 'feet', s: 'most honest', c: COLORS.pink }];
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the honesty ladder</text>
      {/* arrow of honesty increasing downward */}
      <path d={`M ${cx - 300} 180 L ${cx - 300} 640`} stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d={`M ${cx - 312} 616 l 12 24 l 12 -24`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={cx - 330} y={410} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.greenDark} transform={`rotate(-90 ${cx - 330} 410)`}>more honest ↓</text>
      {rungs.map((r, i) => {
        const p = springIn(frame - i * 8, 12); const y = 180 + i * 108;
        return <g key={i} transform={`translate(${cx + 20} ${y}) scale(${0.8 + 0.2 * p})`} opacity={p}>
          <rect x={-200} y={-40} width={400} height={80} rx={16} fill={r.c} opacity={0.8} {...lg} />
          <text x={-150} y={10} fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>{r.t}</text>
          {r.s && <text x={150} y={8} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>{r.s}</text>}
        </g>;
      })}
    </g>
  );
};

/** gaslight-cycle: the erosion loop — incident, denial, self-doubt, dependence — that
 *  tightens over time. */
const GaslightCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.54; const R = 190;
  const steps = [{ t: 'something happens', a: -Math.PI / 2 }, { t: 'they deny it', a: 0 }, { t: 'you doubt yourself', a: Math.PI / 2 }, { t: 'you depend on them', a: Math.PI }];
  const dash = -(frame % 30);
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the erosion loop</text>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={shade(COLORS.navy, 0.1)} strokeWidth={STROKE.lg} strokeDasharray="6 12" strokeDashoffset={dash} opacity={0.6} />
      {steps.map((s, i) => {
        const x = cx + Math.cos(s.a) * R; const y = cy + Math.sin(s.a) * R; const p = springIn(frame - i * 8, 12);
        return <g key={i} transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p})`} opacity={p}>
          <rect x={-104} y={-32} width={208} height={64} rx={16} fill={i === 3 ? shade(COLORS.red, 0.04) : COLORS.yellowSoft} {...lg} />
          <circle cx={-76} cy={0} r={16} fill={COLORS.white} {...sm} /><text x={-76} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{i + 1}</text>
          <text x={-52} y={6} fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.outline}>{s.t}</text>
        </g>;
      })}
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.navy}>tighter each time</text>
    </g>
  );
};

/** gaslight-tactics: the five recurring moves. */
const GaslightTactics: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5;
  const rows = [
    { t: 'DENY', s: '"that never happened"', c: COLORS.red },
    { t: 'COUNTER', s: '"you remember it wrong"', c: COLORS.yellow },
    { t: 'TRIVIALISE', s: '"you\'re overreacting"', c: COLORS.sky },
    { t: 'BLAME-SHIFT', s: '"this is your fault"', c: COLORS.lavender },
    { t: 'WITHHOLD', s: '"I won\'t discuss this"', c: COLORS.greenTeal },
  ];
  return (
    <g>
      <text x={cx} y={88} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>the five moves</text>
      {rows.map((r, i) => {
        const p = springIn(frame - i * 7, 12); const y = 170 + i * 104;
        return <g key={i} transform={`translate(${cx} ${y}) scale(${0.82 + 0.18 * p})`} opacity={p}>
          <rect x={-380} y={-40} width={760} height={82} rx={16} fill={r.c} opacity={0.82} {...lg} />
          <text x={-356} y={8} fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{r.t}</text>
          <text x={356} y={8} textAnchor="end" fontFamily={fontFamily} fontWeight={700} fontSize={22} fill={COLORS.outline} fontStyle="italic">{r.s}</text>
        </g>;
      })}
    </g>
  );
};

/** disagree-vs-gaslight: a healthy disagreement respects your reality; gaslighting
 *  attacks it. */
const DisagreeVsGaslight: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const leftX = CANVAS.width * 0.28; const rightX = CANVAS.width * 0.72; const topY = CANVAS.height * 0.32;
  const p1 = springIn(frame, 14); const p2 = springIn(frame - 18, 14);
  const side = (x: number, p: number, title: string, lines: string[], good: boolean) => (
    <g transform={`translate(${x} 0)`} opacity={p}>
      <rect x={-250} y={topY - 50} width={500} height={420} rx={20} fill={good ? shade(COLORS.greenTeal, 0.08) : shade(COLORS.red, 0.04)} {...xl} />
      <text x={0} y={topY} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{title}</text>
      <g transform={`translate(0 ${topY + 56})`}>
        <circle cx={0} cy={0} r={34} fill={good ? COLORS.greenTeal : COLORS.red} opacity={0.3} />
        {good
          ? <path d="M -16 0 l 10 12 l 20 -24" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M -14 -14 l 28 28 M 14 -14 l -28 28" stroke={COLORS.redDark} strokeWidth={STROKE.xl} strokeLinecap="round" />}
      </g>
      {lines.map((l, i) => <text key={i} x={0} y={topY + 130 + i * 44} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={19} fill={COLORS.outline}>{l}</text>)}
    </g>
  );
  return (
    <g>
      <text x={cx} y={70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>one respects you, one erodes you</text>
      {side(leftX, p1, 'disagreement', ['“I remember it', 'differently.”', 'your view still counts'], true)}
      {side(rightX, p2, 'gaslighting', ['“you’re imagining', 'it, you’re crazy.”', 'your view is the problem'], false)}
    </g>
  );
};

/** reality-anchors: three ways back — trust yourself, keep a record, reach out. */
const RealityAnchors: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.5;
  const anchors = [
    { t: 'trust your', s: 'perception', a: -Math.PI / 2 - 0.7 },
    { t: 'keep a', s: 'record', a: -Math.PI / 2 + 0.7 },
    { t: 'reach', s: 'out', a: Math.PI / 2 },
  ];
  const glow = 0.5 + 0.5 * Math.sin(frame / 8);
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>ways back to solid ground</text>
      {anchors.map((an, i) => {
        const R = 180; const x = cx + Math.cos(an.a) * R; const y = cy + Math.sin(an.a) * R + 20; const p = springIn(frame - 10 - i * 8, 12);
        return <g key={i}>
          <line x1={cx} y1={cy + 20} x2={x} y2={y} stroke={COLORS.greenTeal} strokeWidth={STROKE.lg} opacity={0.5 * p} />
          <g transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p})`} opacity={p}>
            <circle cx={0} cy={0} r={64} fill={shade(COLORS.greenTeal, 0.08)} {...lg} />
            <text x={0} y={-4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{an.t}</text>
            <text x={0} y={20} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>{an.s}</text>
          </g>
        </g>;
      })}
      {/* steady anchor in the middle */}
      <circle cx={cx} cy={cy + 20} r={44} fill={COLORS.greenTeal} opacity={0.4 + glow * 0.3} {...xl} />
      <path d={`M ${cx} ${cy - 6} v 48 M ${cx - 16} ${cy + 6} h 32 M ${cx - 22} ${cy + 42} q 22 20 44 0`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={cx} cy={cy - 12} r={8} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} />
    </g>
  );
};

/** rest-vs-energy: sleep tank full, energy tank low — the disconnect behind "I slept,
 *  why am I tired?" */
const RestVsEnergy: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.5;
  const sleepFill = springIn(frame, 20); const energyFill = springIn(frame - 10, 20) * 0.28;
  const tank = (x: number, fill: number, label: string, color: string, sub: string) => (
    <g transform={`translate(${x} ${cy})`}>
      <rect x={-70} y={-150} width={140} height={300} rx={22} fill={COLORS.white} {...xl} />
      <rect x={-56} y={136 - 272 * fill} width={112} height={272 * fill} rx={14} fill={color} />
      <text x={0} y={-176} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>{label}</text>
      <text x={0} y={192} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={18} fill={COLORS.outline}>{sub}</text>
    </g>
  );
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>"I slept — so why am I tired?"</text>
      {tank(cx - 150, sleepFill, 'SLEEP', COLORS.sky, 'full')}
      {tank(cx + 150, energyFill, 'ENERGY', COLORS.red, 'still empty')}
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={40} fill={COLORS.outline}>≠</text>
    </g>
  );
};

/** fatigue-types: the three fatigues — physical, mental, emotional — most modern tired
 *  is the latter two. */
const FatigueTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5;
  const types = [
    { t: 'PHYSICAL', s: 'body worked hard', c: COLORS.sky, note: 'rarer now' },
    { t: 'MENTAL', s: 'decisions, focus, screens', c: COLORS.lavender, note: 'the modern drain' },
    { t: 'EMOTIONAL', s: 'masking, worry, people', c: COLORS.pink, note: 'the modern drain' },
  ];
  return (
    <g>
      <text x={cx} y={94} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>three kinds of tired</text>
      {types.map((ty, i) => {
        const p = springIn(frame - i * 9, 12); const y = 200 + i * 150;
        return <g key={i} transform={`translate(${cx} ${y}) scale(${0.84 + 0.16 * p})`} opacity={p}>
          <rect x={-400} y={-56} width={800} height={112} rx={20} fill={ty.c} opacity={0.82} {...lg} />
          <text x={-372} y={-6} fontFamily={fontFamily} fontWeight={800} fontSize={30} fill={COLORS.outline}>{ty.t}</text>
          <text x={-372} y={30} fontFamily={fontFamily} fontWeight={700} fontSize={19} fill={COLORS.outline}>{ty.s}</text>
          {i > 0 && <g transform="translate(300 0)"><rect x={-84} y={-24} width={168} height={48} rx={12} fill={COLORS.white} {...sm} /><text x={0} y={7} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.red}>{ty.note}</text></g>}
        </g>;
      })}
    </g>
  );
};

/** energy-leaks: a battery/tank leaking from several labelled holes — what drains you. */
const EnergyLeaks: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.44; const cy = CANVAS.height * 0.5;
  const leaks = [
    { t: 'decision overload', y: -80 },
    { t: 'chronic stress', y: -20 },
    { t: 'holding it together', y: 40 },
    { t: 'endless scrolling', y: 100 },
  ];
  return (
    <g>
      <text x={CANVAS.width * 0.5} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>where the energy leaks out</text>
      {/* the tank */}
      <rect x={cx - 120} y={cy - 150} width={240} height={300} rx={26} fill={COLORS.white} {...xl} />
      <rect x={cx - 104} y={cy - 40} width={208} height={180} rx={16} fill={COLORS.greenTeal} opacity={0.75} />
      <rect x={cx - 24} y={cy - 172} width={48} height={24} rx={6} fill={COLORS.outline} />
      {/* leaks + drips */}
      {leaks.map((l, i) => {
        const p = springIn(frame - i * 7, 12); const drip = (frame % 40) / 40;
        return <g key={i} opacity={p}>
          <circle cx={cx + 120} cy={cy + l.y} r={8} fill={COLORS.red} />
          <path d={`M ${cx + 128} ${cy + l.y} q 30 ${10 + drip * 20} 40 ${50 + drip * 30}`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />
          <text x={cx + 180} y={cy + l.y + 6} fontFamily={fontFamily} fontWeight={800} fontSize={22} fill={COLORS.outline}>{l.t}</text>
        </g>;
      })}
      <text x={cx} y={cy + 56} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.white}>you</text>
    </g>
  );
};

/** seven-rests: the seven types of rest around a wheel — match the rest to the deficit. */
const SevenRests: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const cy = CANVAS.height * 0.54;
  const rests = ['physical', 'mental', 'sensory', 'creative', 'emotional', 'social', 'spiritual'];
  const colors = [COLORS.sky, COLORS.lavender, COLORS.greenTeal, COLORS.yellow, COLORS.pink, COLORS.red, COLORS.blueDiagram];
  return (
    <g>
      <text x={cx} y={80} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>seven kinds of rest</text>
      {rests.map((r, i) => {
        const a = -Math.PI / 2 + (i / rests.length) * Math.PI * 2; const R = 180; const x = cx + Math.cos(a) * R; const y = cy + Math.sin(a) * R; const p = springIn(frame - i * 6, 12);
        return <g key={i}>
          <line x1={cx} y1={cy} x2={x} y2={y} stroke={colors[i]} strokeWidth={STROKE.lg} opacity={0.5 * p} />
          <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}><circle cx={0} cy={0} r={52} fill={shade(colors[i], 0.08)} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={17} fill={COLORS.outline}>{r}</text></g>
        </g>;
      })}
      <circle cx={cx} cy={cy} r={46} fill={COLORS.greenTeal} {...xl} />
      <text x={cx} y={cy - 2} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>match</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={16} fill={COLORS.white}>the gap</text>
    </g>
  );
};

/** recall-vs-recognition: recognition (a face) is easy; recall (a name) is hard — two
 *  very different memory jobs. */
const RecallVsRecognition: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const leftX = CANVAS.width * 0.3; const rightX = CANVAS.width * 0.7; const cy = CANVAS.height * 0.5;
  const p1 = springIn(frame, 14); const p2 = springIn(frame - 16, 14);
  return (
    <g>
      <text x={cx} y={100} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>two very different jobs</text>
      {/* recognition */}
      <g transform={`translate(${leftX} ${cy})`} opacity={p1}>
        <circle cx={0} cy={-20} r={100} fill={shade(COLORS.greenTeal, 0.08)} {...xl} />
        <circle cx={0} cy={-30} r={52} fill={COLORS.skin} {...lg} />
        <circle cx={-18} cy={-34} r={6} fill={COLORS.outline} /><circle cx={18} cy={-34} r={6} fill={COLORS.outline} />
        <path d="M -20 -14 Q 0 0 20 -14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <text x={0} y={116} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>RECOGNITION</text>
        <text x={0} y={150} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={18} fill={COLORS.greenDark}>the cue is right there — easy</text>
      </g>
      {/* recall */}
      <g transform={`translate(${rightX} ${cy})`} opacity={p2}>
        <circle cx={0} cy={-20} r={100} fill={shade(COLORS.red, 0.04)} {...xl} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={64} fill={COLORS.red}>?</text>
        <text x={0} y={116} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>RECALL</text>
        <text x={0} y={150} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={18} fill={COLORS.red}>build it from nothing — hard</text>
      </g>
    </g>
  );
};

/** baker-baker: the same word, "Baker," is harder as a name than as a job — because the
 *  job has a web of meaning. */
const BakerBaker: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const leftX = CANVAS.width * 0.3; const rightX = CANVAS.width * 0.7; const cy = CANVAS.height * 0.52;
  const p1 = springIn(frame, 14); const p2 = springIn(frame - 16, 14);
  const web = ['bread', 'oven', 'apron', 'flour'];
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>same word — "Baker"</text>
      {/* name = island */}
      <g transform={`translate(${leftX} ${cy})`} opacity={p1}>
        <circle cx={0} cy={0} r={66} fill={COLORS.sky} {...xl} />
        <text x={0} y={8} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={24} fill={COLORS.outline}>Baker</text>
        <text x={0} y={-96} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>his NAME</text>
        <text x={0} y={116} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={18} fill={COLORS.red}>links to nothing → hard</text>
      </g>
      {/* job = web */}
      <g transform={`translate(${rightX} ${cy})`} opacity={p2}>
        {web.map((w, i) => { const a = -Math.PI / 2 + (i / web.length) * Math.PI * 2; const x = Math.cos(a) * 100; const y = Math.sin(a) * 80; return <g key={i}><line x1={0} y1={0} x2={x} y2={y} stroke={COLORS.greenTeal} strokeWidth={STROKE.sm} opacity={0.6} /><circle cx={x} cy={y} r={24} fill={shade(COLORS.greenTeal, 0.08)} {...sm} /><text x={x} y={y + 5} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={13} fill={COLORS.outline}>{w}</text></g>; })}
        <circle cx={0} cy={0} r={48} fill={COLORS.yellow} {...lg} />
        <text x={0} y={6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={18} fill={COLORS.outline}>a baker</text>
        <text x={0} y={-124} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.outline}>his JOB</text>
        <text x={0} y={140} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={18} fill={COLORS.greenDark}>a web of hooks → easy</text>
      </g>
    </g>
  );
};

/** two-pathways: a face lands on a rich, fast lane; a name on a thin, fragile one. */
const TwoPathways: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5; const x0 = CANVAS.width * 0.2; const x1 = CANVAS.width * 0.8;
  const topY = CANVAS.height * 0.38; const botY = CANVAS.height * 0.64;
  const flow = (frame % 40) / 40;
  return (
    <g>
      <text x={cx} y={110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>two roads into memory</text>
      {/* face road — wide, solid */}
      <path d={`M ${x0} ${topY} L ${x1} ${topY}`} stroke={COLORS.greenTeal} strokeWidth={STROKE.xl + 10} strokeLinecap="round" opacity={0.5} />
      <circle cx={x0} cy={topY} r={30} fill={COLORS.skin} {...lg} /><circle cx={x0 - 9} cy={topY - 3} r={4} fill={COLORS.outline} /><circle cx={x0 + 9} cy={topY - 3} r={4} fill={COLORS.outline} /><path d={`M ${x0 - 9} ${topY + 8} Q ${x0} ${topY + 14} ${x0 + 9} ${topY + 8}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={x0 + 40 + flow * (x1 - x0 - 80)} cy={topY} r={9} fill={COLORS.greenDark} />
      <text x={x1 + 10} y={topY - 18} fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.greenDark}>face</text>
      <text x={cx} y={topY - 34} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>wide, fast, well-worn</text>
      {/* name road — thin, dashed, broken */}
      <path d={`M ${x0} ${botY} L ${x1} ${botY}`} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" strokeDasharray="10 16" opacity={0.7} />
      <rect x={x0 - 30} y={botY - 18} width={60} height={36} rx={8} fill={COLORS.sky} {...sm} /><text x={x0} y={botY + 6} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={14} fill={COLORS.outline}>"Rob"</text>
      <circle cx={x0 + 40 + flow * (x1 - x0 - 80)} cy={botY} r={7} fill={COLORS.red} opacity={flow < 0.7 ? 1 : 0.2} />
      <text x={x1 + 10} y={botY + 6} fontFamily={fontFamily} fontWeight={800} fontSize={20} fill={COLORS.red}>name</text>
      <text x={cx} y={botY + 44} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={16} fill={COLORS.outline}>thin, fragile, drops out</text>
    </g>
  );
};

/** name-recall-steps: four steps to actually remember a name. */
const NameRecallSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width * 0.5;
  const steps = [
    { t: 'ATTEND', s: 'actually hear it' },
    { t: 'REPEAT', s: '"nice to meet you, Sara"' },
    { t: 'ASSOCIATE', s: 'picture + feature' },
    { t: 'USE IT', s: 'say it again later' },
  ];
  return (
    <g>
      <text x={cx} y={90} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={28} fill={COLORS.outline}>how to actually remember</text>
      {steps.map((st, i) => {
        const p = springIn(frame - i * 9, 12); const y = 190 + i * 116;
        return <g key={i} transform={`translate(${cx} ${y}) scale(${0.84 + 0.16 * p})`} opacity={p}>
          <rect x={-360} y={-44} width={720} height={88} rx={18} fill={[COLORS.sky, COLORS.yellow, COLORS.pink, COLORS.greenTeal][i]} opacity={0.82} {...lg} />
          <circle cx={-310} cy={0} r={26} fill={COLORS.white} {...sm} /><text x={-310} y={9} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{i + 1}</text>
          <text x={-264} y={-2} fontFamily={fontFamily} fontWeight={800} fontSize={26} fill={COLORS.outline}>{st.t}</text>
          <text x={-264} y={26} fontFamily={fontFamily} fontWeight={700} fontSize={18} fill={COLORS.outline}>{st.s}</text>
        </g>;
      })}
    </g>
  );
};

export const DiagramCard: React.FC<{
  diagram: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now' | 'decision-fork' | 'dk-curve' | 'loss-scale' | 'framing-flip' | 'defense-shield' | 'iceberg' | 'maturity-ladder' | 'redirect-arrow' | 'pressure-valve' | 'attachment-grid' | 'secure-base' | 'push-pull' | 'chase-cycle' | 'bell-curve' | 'flynn-effect' | 'multi-intelligence' | 'fog-triangle' | 'manipulation-cycle' | 'ask-ladder' | 'dopamine-loop' | 'comparison-trap' | 'attention-economy' | 'default-mode-network' | 'rumination-loop' | 'ironic-process' | 'window-of-now' | 'dial-not-switch' | 'attention-spotlight' | 'hypnogram' | 'sleep-threshold' | 'rem-switch' | 'dream-layers' | 'mind-body-sleep' | 'terror-vs-nightmare' | 'knowledge-circle' | 'iq-vs-eq' | 'overexcitability' | 'complexity-comfort' | 'curiosity-tree' | 'daydream-spectrum' | 'immersion-meter' | 'trigger-loop' | 'two-lives' | 'absorption-scale' | 'circadian-low' | 'cortisol-curve' | 'night-brain' | 'molehill-mountain' | 'dawn-vs-dark' | 'overthink-ladder' | 'thought-vs-action' | 'whatif-branches' | 'spiral-funnel' | 'comparison-envy' | 'warm-cold-map' | 'jealousy-roots' | 'how-to-respond' | 'complex-core' | 'overcompensate-arc' | 'hidden-roots' | 'two-sides-coin' | 'four-axes' | 'four-families' | 'cognitive-stack' | 'type-not-a-box' | 'awareness-ladder' | 'mind-floors' | 'flow-channel' | 'spectrum-line' | 'present-vs-future' | 'limbic-vs-cortex' | 'avoidance-loop' | 'do-it-ladder' | 'argument-anatomy' | 'attack-argument' | 'correlation-causation' | 'spot-it-checklist' | 'introvert-battery' | 'quality-quantity' | 'solitude-vs-loneliness' | 'social-budget' | 'intelligence-wheel' | 'not-one-number' | 'spiky-profile' | 'strength-finder' | 'cbt-triangle' | 'distortion-vs-reality' | 'catch-check-change' | 'thought-spiral' | 'emotion-wheel-map' | 'emotions-job' | 'opposite-emotions' | 'emotion-blends' | 'sternberg-triangle' | 'loves-wheel' | 'love-over-time' | 'self-love-first' | 'warmth-competence-grid' | 'charisma-loop' | 'presence-dial' | 'charisma-learnable' | 'habit-loop-diagram' | 'reward-timing' | 'four-laws' | 'compound-growth' | 'impostor-cycle' | 'competence-confidence-gap' | 'five-types' | 'feelings-vs-facts' | 'five-stages' | 'grief-not-linear' | 'grief-waves-time' | 'grief-grows-around' | 'happiness-pie' | 'hedonic-curve' | 'what-makes-happy' | 'happy-vs-meaningful' | 'zeigarnik-open-loop' | 'variable-reward' | 'idealization-gap' | 'letting-go-curve' | 'gaze-detector' | 'hit-miss-bias' | 'watch-feedback-loop' | 'vigilance-dial' | 'overflow-threshold' | 'sensitivity-spectrum' | 'tears-three-jobs' | 'being-moved-curve' | 'friendship-hours' | 'liking-gap' | 'everyone-waiting' | 'closeness-ladder' | 'accuracy-coinflip' | 'myth-vs-fact' | 'load-truth-vs-lie' | 'cluster-baseline' | 'control-in-chaos' | 'orderliness-trait' | 'clutter-attention' | 'tidy-spectrum' | 'nostalgia-benefits' | 'reminiscence-bump' | 'bittersweet-mix' | 'nostalgia-coping-loop' | 'music-reward-loop' | 'two-dopamine-hits' | 'expectation-violation' | 'who-gets-chills' | 'memory-sticky' | 'social-survival' | 'mind-wander-surfacing' | 'spotlight-reality' | 'inner-speech-origin' | 'self-talk-performance' | 'name-distance' | 'critic-vs-coach' | 'boredom-equation' | 'shock-choice' | 'boredom-creativity' | 'tolerance-eroding' | 'two-memory-systems' | 'deja-glitch' | 'factcheck-flag' | 'layout-match' | 'memory-offset' | 'hippocampus-building' | 'neurogenesis-overwrite' | 'reconstructed-memory' | 'counterfactual' | 'action-inaction-time' | 'near-miss' | 'regret-function' | 'fawn-response' | 'no-social-threat' | 'pleasing-cost' | 'boundary-reframe' | 'connection-gap-diagram' | 'loneliness-signal' | 'loneliness-health' | 'loneliness-cycle' | 'proportion-ratio' | 'memory-density-diagram' | 'routine-vs-novelty' | 'holiday-paradox-diagram' | 'safe-emotion' | 'console-hormone' | 'mood-congruence' | 'sad-music-gives' | 'anger-as-signal' | 'anger-iceberg-split' | 'amygdala-flood' | 'ninety-second-rule' | 'impression-speed' | 'primacy-list' | 'first-two-questions' | 'halo-spread' | 'baseline-deviation' | 'cluster-not-single' | 'proxemics-zones' | 'honesty-ladder' | 'gaslight-cycle' | 'gaslight-tactics' | 'disagree-vs-gaslight' | 'reality-anchors' | 'rest-vs-energy' | 'fatigue-types' | 'energy-leaks' | 'seven-rests' | 'recall-vs-recognition' | 'baker-baker' | 'two-pathways' | 'name-recall-steps';
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
    'sternberg-triangle': COLORS.pink,
    'loves-wheel': COLORS.red,
    'love-over-time': COLORS.pink,
    'self-love-first': COLORS.greenTeal,
    'warmth-competence-grid': COLORS.yellow,
    'charisma-loop': COLORS.pink,
    'presence-dial': COLORS.greenTeal,
    'charisma-learnable': COLORS.yellow,
    'habit-loop-diagram': COLORS.sky,
    'reward-timing': COLORS.red,
    'four-laws': COLORS.greenLeaf,
    'compound-growth': COLORS.greenLeaf,
    'impostor-cycle': COLORS.sky,
    'competence-confidence-gap': COLORS.greenLeaf,
    'five-types': COLORS.lavender,
    'feelings-vs-facts': COLORS.greenLeaf,
    'five-stages': COLORS.sky,
    'grief-not-linear': COLORS.lavender,
    'grief-waves-time': COLORS.sky,
    'grief-grows-around': COLORS.greenLeaf,
    'happiness-pie': COLORS.greenLeaf,
    'hedonic-curve': COLORS.greenLeaf,
    'what-makes-happy': COLORS.yellow,
    'happy-vs-meaningful': COLORS.yellow,
    'zeigarnik-open-loop': COLORS.lavender,
    'variable-reward': COLORS.red,
    'idealization-gap': COLORS.pink,
    'letting-go-curve': COLORS.greenLeaf,
    'gaze-detector': COLORS.sky,
    'hit-miss-bias': COLORS.red,
    'watch-feedback-loop': COLORS.lavender,
    'vigilance-dial': COLORS.yellow,
    'overflow-threshold': COLORS.sky,
    'sensitivity-spectrum': COLORS.lavender,
    'tears-three-jobs': COLORS.pink,
    'being-moved-curve': COLORS.yellow,
    'friendship-hours': COLORS.sky,
    'liking-gap': COLORS.pink,
    'everyone-waiting': COLORS.yellow,
    'closeness-ladder': COLORS.greenLeaf,
    'accuracy-coinflip': COLORS.red,
    'myth-vs-fact': COLORS.yellow,
    'load-truth-vs-lie': COLORS.sky,
    'cluster-baseline': COLORS.greenLeaf,
    'control-in-chaos': COLORS.sky,
    'orderliness-trait': COLORS.greenLeaf,
    'clutter-attention': COLORS.yellow,
    'tidy-spectrum': COLORS.red,
    'nostalgia-benefits': COLORS.yellow,
    'reminiscence-bump': COLORS.sky,
    'bittersweet-mix': COLORS.pink,
    'nostalgia-coping-loop': COLORS.greenLeaf,
    'music-reward-loop': COLORS.pink,
    'two-dopamine-hits': COLORS.sky,
    'expectation-violation': COLORS.yellow,
    'who-gets-chills': COLORS.greenLeaf,
    'memory-sticky': COLORS.red,
    'social-survival': COLORS.yellow,
    'mind-wander-surfacing': COLORS.lavender,
    'spotlight-reality': COLORS.sky,
    'inner-speech-origin': COLORS.sky,
    'self-talk-performance': COLORS.greenLeaf,
    'name-distance': COLORS.yellow,
    'critic-vs-coach': COLORS.pink,
    'boredom-equation': COLORS.yellow,
    'shock-choice': COLORS.red,
    'boredom-creativity': COLORS.greenLeaf,
    'tolerance-eroding': COLORS.sky,
    'two-memory-systems': COLORS.sky,
    'deja-glitch': COLORS.lavender,
    'factcheck-flag': COLORS.red,
    'layout-match': COLORS.greenLeaf,
    'memory-offset': COLORS.lavender,
    'hippocampus-building': COLORS.sky,
    'neurogenesis-overwrite': COLORS.red,
    'reconstructed-memory': COLORS.yellow,
    'counterfactual': COLORS.lavender,
    'action-inaction-time': COLORS.sky,
    'near-miss': COLORS.yellow,
    'regret-function': COLORS.greenLeaf,
    'fawn-response': COLORS.sky,
    'no-social-threat': COLORS.red,
    'pleasing-cost': COLORS.yellow,
    'boundary-reframe': COLORS.greenLeaf,
    'connection-gap-diagram': COLORS.lavender,
    'loneliness-signal': COLORS.sky,
    'loneliness-health': COLORS.red,
    'loneliness-cycle': COLORS.yellow,
    'proportion-ratio': COLORS.sky,
    'memory-density-diagram': COLORS.yellow,
    'routine-vs-novelty': COLORS.greenLeaf,
    'holiday-paradox-diagram': COLORS.pink,
    'safe-emotion': COLORS.sky,
    'console-hormone': COLORS.pink,
    'mood-congruence': COLORS.greenLeaf,
    'sad-music-gives': COLORS.yellow,
    'anger-as-signal': COLORS.red,
    'anger-iceberg-split': COLORS.blueDiagram,
    'amygdala-flood': COLORS.red,
    'ninety-second-rule': COLORS.red,
    'impression-speed': COLORS.sky,
    'primacy-list': COLORS.greenTeal,
    'first-two-questions': COLORS.yellow,
    'halo-spread': COLORS.yellow,
    'baseline-deviation': COLORS.greenTeal,
    'cluster-not-single': COLORS.yellow,
    'proxemics-zones': COLORS.sky,
    'honesty-ladder': COLORS.pink,
    'gaslight-cycle': COLORS.navy,
    'gaslight-tactics': COLORS.red,
    'disagree-vs-gaslight': COLORS.lavender,
    'reality-anchors': COLORS.greenTeal,
    'rest-vs-energy': COLORS.sky,
    'fatigue-types': COLORS.lavender,
    'energy-leaks': COLORS.greenTeal,
    'seven-rests': COLORS.pink,
    'recall-vs-recognition': COLORS.greenTeal,
    'baker-baker': COLORS.yellow,
    'two-pathways': COLORS.sky,
    'name-recall-steps': COLORS.pink,
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
        {diagram === 'sternberg-triangle' && <SternbergTriangle />}
        {diagram === 'loves-wheel' && <LovesWheel />}
        {diagram === 'love-over-time' && <LoveOverTime />}
        {diagram === 'self-love-first' && <SelfLoveFirst />}
        {diagram === 'warmth-competence-grid' && <WarmthCompetenceGrid />}
        {diagram === 'charisma-loop' && <CharismaLoop />}
        {diagram === 'presence-dial' && <PresenceDial />}
        {diagram === 'charisma-learnable' && <CharismaLearnable />}
        {diagram === 'habit-loop-diagram' && <HabitLoopDiagram />}
        {diagram === 'reward-timing' && <RewardTiming />}
        {diagram === 'four-laws' && <FourLaws />}
        {diagram === 'compound-growth' && <CompoundGrowth />}
        {diagram === 'impostor-cycle' && <ImpostorCycle />}
        {diagram === 'competence-confidence-gap' && <CompetenceConfidenceGap />}
        {diagram === 'five-types' && <FiveTypes />}
        {diagram === 'feelings-vs-facts' && <FeelingsVsFacts />}
        {diagram === 'five-stages' && <FiveStages />}
        {diagram === 'grief-not-linear' && <GriefNotLinear />}
        {diagram === 'grief-waves-time' && <GriefWavesTime />}
        {diagram === 'grief-grows-around' && <GriefGrowsAround />}
        {diagram === 'happiness-pie' && <HappinessPie />}
        {diagram === 'hedonic-curve' && <HedonicCurve />}
        {diagram === 'what-makes-happy' && <WhatMakesHappy />}
        {diagram === 'happy-vs-meaningful' && <HappyVsMeaningful />}
        {diagram === 'zeigarnik-open-loop' && <ZeigarnikOpenLoop />}
        {diagram === 'variable-reward' && <VariableReward />}
        {diagram === 'idealization-gap' && <IdealizationGap />}
        {diagram === 'letting-go-curve' && <LettingGoCurve />}
        {diagram === 'gaze-detector' && <GazeDetector />}
        {diagram === 'hit-miss-bias' && <HitMissBias />}
        {diagram === 'watch-feedback-loop' && <WatchFeedbackLoop />}
        {diagram === 'vigilance-dial' && <VigilanceDial />}
        {diagram === 'overflow-threshold' && <OverflowThreshold />}
        {diagram === 'sensitivity-spectrum' && <SensitivitySpectrum />}
        {diagram === 'tears-three-jobs' && <TearsThreeJobs />}
        {diagram === 'being-moved-curve' && <BeingMovedCurve />}
        {diagram === 'friendship-hours' && <FriendshipHours />}
        {diagram === 'liking-gap' && <LikingGapDiagram />}
        {diagram === 'everyone-waiting' && <EveryoneWaiting />}
        {diagram === 'closeness-ladder' && <ClosenessLadder />}
        {diagram === 'accuracy-coinflip' && <AccuracyCoinflip />}
        {diagram === 'myth-vs-fact' && <MythVsFact />}
        {diagram === 'load-truth-vs-lie' && <LoadTruthVsLie />}
        {diagram === 'cluster-baseline' && <ClusterBaseline />}
        {diagram === 'control-in-chaos' && <ControlInChaos />}
        {diagram === 'orderliness-trait' && <OrderlinessTrait />}
        {diagram === 'clutter-attention' && <ClutterAttention />}
        {diagram === 'tidy-spectrum' && <TidySpectrum />}
        {diagram === 'nostalgia-benefits' && <NostalgiaBenefits />}
        {diagram === 'reminiscence-bump' && <ReminiscenceBump />}
        {diagram === 'bittersweet-mix' && <BittersweetMix />}
        {diagram === 'nostalgia-coping-loop' && <NostalgiaCopingLoop />}
        {diagram === 'music-reward-loop' && <MusicRewardLoop />}
        {diagram === 'two-dopamine-hits' && <TwoDopamineHits />}
        {diagram === 'expectation-violation' && <ExpectationViolation />}
        {diagram === 'who-gets-chills' && <WhoGetsChills />}
        {diagram === 'memory-sticky' && <MemorySticky />}
        {diagram === 'social-survival' && <SocialSurvival />}
        {diagram === 'mind-wander-surfacing' && <MindWanderSurfacing />}
        {diagram === 'spotlight-reality' && <SpotlightReality />}
        {diagram === 'inner-speech-origin' && <InnerSpeechOrigin />}
        {diagram === 'self-talk-performance' && <SelfTalkPerformance />}
        {diagram === 'name-distance' && <NameDistance />}
        {diagram === 'critic-vs-coach' && <CriticVsCoach />}
        {diagram === 'boredom-equation' && <BoredomEquation />}
        {diagram === 'shock-choice' && <ShockChoice />}
        {diagram === 'boredom-creativity' && <BoredomCreativity />}
        {diagram === 'tolerance-eroding' && <ToleranceEroding />}
        {diagram === 'two-memory-systems' && <TwoMemorySystems />}
        {diagram === 'deja-glitch' && <DejaGlitch />}
        {diagram === 'factcheck-flag' && <FactcheckFlag />}
        {diagram === 'layout-match' && <LayoutMatch />}
        {diagram === 'memory-offset' && <MemoryOffset />}
        {diagram === 'hippocampus-building' && <HippocampusBuilding />}
        {diagram === 'neurogenesis-overwrite' && <NeurogenesisOverwrite />}
        {diagram === 'reconstructed-memory' && <ReconstructedMemory />}
        {diagram === 'counterfactual' && <CounterfactualDiagram />}
        {diagram === 'action-inaction-time' && <ActionInactionTime />}
        {diagram === 'near-miss' && <NearMissDiagram />}
        {diagram === 'regret-function' && <RegretFunction />}
        {diagram === 'fawn-response' && <FawnResponse />}
        {diagram === 'no-social-threat' && <NoSocialThreat />}
        {diagram === 'pleasing-cost' && <PleasingCost />}
        {diagram === 'boundary-reframe' && <BoundaryReframe />}
        {diagram === 'connection-gap-diagram' && <ConnectionGapDiagram />}
        {diagram === 'loneliness-signal' && <LonelinessSignal />}
        {diagram === 'loneliness-health' && <LonelinessHealth />}
        {diagram === 'loneliness-cycle' && <LonelinessCycle />}
        {diagram === 'proportion-ratio' && <ProportionRatio />}
        {diagram === 'memory-density-diagram' && <MemoryDensityDiagram />}
        {diagram === 'routine-vs-novelty' && <RoutineVsNovelty />}
        {diagram === 'holiday-paradox-diagram' && <HolidayParadoxDiagram />}
        {diagram === 'safe-emotion' && <SafeEmotionDiagram />}
        {diagram === 'console-hormone' && <ConsoleHormone />}
        {diagram === 'mood-congruence' && <MoodCongruence />}
        {diagram === 'sad-music-gives' && <SadMusicGives />}
        {diagram === 'anger-as-signal' && <AngerAsSignal />}
        {diagram === 'anger-iceberg-split' && <AngerIcebergSplit />}
        {diagram === 'amygdala-flood' && <AmygdalaFlood />}
        {diagram === 'ninety-second-rule' && <NinetySecondRule />}
        {diagram === 'impression-speed' && <ImpressionSpeed />}
        {diagram === 'primacy-list' && <PrimacyList />}
        {diagram === 'first-two-questions' && <FirstTwoQuestions />}
        {diagram === 'halo-spread' && <HaloSpread />}
        {diagram === 'baseline-deviation' && <BaselineDeviation />}
        {diagram === 'cluster-not-single' && <ClusterNotSingle />}
        {diagram === 'proxemics-zones' && <ProxemicsZones />}
        {diagram === 'honesty-ladder' && <HonestyLadder />}
        {diagram === 'gaslight-cycle' && <GaslightCycle />}
        {diagram === 'gaslight-tactics' && <GaslightTactics />}
        {diagram === 'disagree-vs-gaslight' && <DisagreeVsGaslight />}
        {diagram === 'reality-anchors' && <RealityAnchors />}
        {diagram === 'rest-vs-energy' && <RestVsEnergy />}
        {diagram === 'fatigue-types' && <FatigueTypes />}
        {diagram === 'energy-leaks' && <EnergyLeaks />}
        {diagram === 'seven-rests' && <SevenRests />}
        {diagram === 'recall-vs-recognition' && <RecallVsRecognition />}
        {diagram === 'baker-baker' && <BakerBaker />}
        {diagram === 'two-pathways' && <TwoPathways />}
        {diagram === 'name-recall-steps' && <NameRecallSteps />}
      </svg>
      <Mascot costume="labcoat" pose="point-right" emotion={emo} talking x={CANVAS.width * 0.15} y={CANVAS.height * 0.64} scale={1.2} seed={6} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
