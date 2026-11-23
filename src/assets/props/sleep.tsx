/**
 * sleep.tsx — ALL-NEW art for "Every Sleep Glitch You Might Experience". Surreal,
 * spooky-cute metaphors for the weird borderland between waking and sleep: the
 * falling void, the sleep-paralysis shadow, phantom faces, the exploding-head
 * bang, the dream-within-a-dream, the lucid-dream finger check, sleepwalking
 * slippers, sleep-mumbles, the night-terror scream, Tetris blocks, brain fog,
 * the microsleep flicker, dream boxing, the deja-reve reel, impossible stairs,
 * a dream cloud, a sleepy moon, and an EEG strip. Token strokes, flat two-tone.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A swirling void with a tiny figure falling in (the hypnic-jerk drop). */
export const FallingVoid: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 2;
  const drop = (f % 50) * 2;
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={0} cy={0} rx={150 - i * 30} ry={(150 - i * 30) * 0.6} fill="none" stroke={i % 2 ? COLORS.lavender : COLORS.blueDiagram} strokeWidth={STROKE.lg} opacity={0.5} transform={`rotate(${spin + i * 20})`} />
      ))}
      <ellipse cx={0} cy={0} rx={60} ry={36} fill={COLORS.purpleDeep} />
      {/* tiny falling figure */}
      <g transform={`translate(0 ${-60 + drop})`}>
        <circle r={22} fill={COLORS.white} {...lg} />
        <circle cx={-7} cy={-3} r={4} fill={COLORS.outline} />
        <circle cx={7} cy={-3} r={4} fill={COLORS.outline} />
        <ellipse cx={0} cy={10} rx={6} ry={8} fill={COLORS.outline} />
        <path d="M -22 2 l -20 -14 M 22 2 l 20 -14" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* motion streaks */}
      {[-90, 0, 90].map((x, i) => <path key={i} d={`M ${x} -150 l 0 60`} stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />)}
    </g>
  );
};

/** A tall shadow figure with glowing eyes — the classic sleep-paralysis "intruder". */
export const ShadowFigure: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 14) * 4;
  return (
    <g transform={`translate(${sway} 0)`}>
      <path d="M -90 180 Q -110 -40 -60 -120 Q -40 -200 0 -200 Q 40 -200 60 -120 Q 110 -40 90 180 Z" fill={COLORS.purpleDeep} {...xl} />
      <path d="M -90 180 Q -110 -40 -60 -120 Q -40 -200 0 -200 Q 40 -200 60 -120 Q 110 -40 90 180 Z" fill={shade(COLORS.purpleDeep, -0.2)} opacity={0.4} transform="scale(0.86)" transform-origin="0 0" />
      {/* brim / hat silhouette */}
      <path d="M -96 -150 Q 0 -200 96 -150 Q 0 -168 -96 -150 Z" fill={COLORS.purpleDeep} {...lg} />
      {/* glowing eyes */}
      <ellipse cx={-28} cy={-120} rx={14} ry={18} fill={COLORS.yellow} />
      <ellipse cx={28} cy={-120} rx={14} ry={18} fill={COLORS.yellow} />
      <circle cx={-28} cy={-116} r={5} fill={COLORS.outline} />
      <circle cx={28} cy={-116} r={5} fill={COLORS.outline} />
    </g>
  );
};

/** Overlapping translucent phantom faces/shapes (hypnagogic hallucinations). */
export const PhantomFaces: React.FC = () => {
  const f = useCurrentFrame();
  const cols = [COLORS.sky, COLORS.pink, COLORS.greenTeal];
  return (
    <g>
      {[[-70, 10, 1], [60, -20, 0.9], [10, 50, 0.8]].map(([x, y, s], i) => {
        const o = 0.4 + 0.2 * Math.sin(f / 10 + i * 2);
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <circle r={78} fill={cols[i]} {...lg} />
            <circle cx={-26} cy={-10} r={9} fill={COLORS.outline} />
            <circle cx={26} cy={-10} r={9} fill={COLORS.outline} />
            <path d="M -26 28 q 26 18 52 0" fill="none" {...sm} />
          </g>
        );
      })}
      {/* sparks of light */}
      {[[-110, -60], [110, 40], [0, -90]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y - 12} l 4 9 l 9 4 l -9 4 l -4 9 l -4 -9 l -9 -4 l 9 -4 Z`} fill={COLORS.yellow} opacity={0.8} />
      ))}
    </g>
  );
};

/** A comic-book explosion burst reading BANG! (exploding head syndrome). */
export const BoomBurst: React.FC = () => {
  const pts = Array.from({ length: 16 }).map((_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const r = i % 2 ? 90 : 150;
    return `${Math.cos(a) * r} ${Math.sin(a) * r}`;
  });
  return (
    <g>
      <path d={`M ${pts.join(' L ')} Z`} fill={COLORS.yellow} {...xl} />
      <path d={`M ${pts.join(' L ')} Z`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} transform="scale(0.8)" transform-origin="0 0" />
      <text x={0} y={18} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={60} fill={COLORS.red} stroke={COLORS.outline} strokeWidth={STROKE.sm} transform="rotate(-8)">BANG!</text>
    </g>
  );
};

/** Nested bed-frames shrinking inward — a dream within a dream (false awakening). */
export const NestedDream: React.FC = () => (
  <g>
    {[0, 1, 2, 3].map((i) => {
      const s = 1 - i * 0.24;
      const cols = [COLORS.lavender, COLORS.sky, COLORS.pink, COLORS.yellowSoft];
      return (
        <g key={i} transform={`scale(${s})`}>
          <rect x={-150} y={-100} width={300} height={200} rx={20} fill="none" stroke={cols[i]} strokeWidth={STROKE.xl} />
        </g>
      );
    })}
    {/* tiny sleeper in the centre */}
    <g transform="scale(0.2)">
      <circle cx={0} cy={-40} r={60} fill={COLORS.white} {...xl} />
      <path d="M -40 -30 q 40 40 80 0" fill="none" {...lg} />
    </g>
    <text x={0} y={150} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>…again?</text>
  </g>
);

/** A hand showing six fingers with a glowing "?" — the lucid-dream reality check. */
export const LucidHand: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.3 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={0} cy={-120} r={46} fill={COLORS.yellowSoft} opacity={glow * 0.5} />
      <path d="M -90 170 Q -120 40 -80 10 L 80 10 Q 120 40 90 170 Z" fill={COLORS.skin} {...xl} />
      {/* six fingers (one too many — the tell) */}
      {[-72, -44, -16, 12, 40, 68].map((x, i) => (
        <rect key={i} x={x - 15} y={-130 + (i === 0 || i === 5 ? 36 : 0)} width={30} height={150} rx={15} fill={COLORS.skin} {...lg} />
      ))}
      <text x={0} y={-150} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={60} fill={COLORS.sky} opacity={glow}>?</text>
    </g>
  );
};

/** A pair of slippers mid-stride with motion + zzz (sleepwalking). */
export const WalkingSlippers: React.FC = () => {
  const f = useCurrentFrame();
  const step = Math.sin(f / 8) * 20;
  const Slipper: React.FC<{ x: number; lift: number }> = ({ x, lift }) => (
    <g transform={`translate(${x} ${-lift})`}>
      <path d="M -70 20 Q -60 -20 -20 -22 L 50 -28 Q 80 -26 80 10 L 80 26 Q 0 42 -70 26 Z" fill={COLORS.pink} {...xl} />
      <path d="M -20 -22 Q 20 -28 54 -16 L 10 0 Z" fill={shade(COLORS.pink, 0.18)} />
      <ellipse cx={-70} cy={34} rx={30} ry={10} fill={COLORS.outline} opacity={0.14} />
    </g>
  );
  return (
    <g>
      <Slipper x={-70} lift={Math.max(0, step)} />
      <Slipper x={80} lift={Math.max(0, -step)} />
      {/* motion lines + zzz */}
      <path d="M -170 -10 l -40 0 M -180 20 l -44 0" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={120} y={-80} fontFamily={font} fontWeight={800} fontSize={44} fill={COLORS.lavenderDark}>z</text>
      <text x={160} y={-120} fontFamily={font} fontWeight={800} fontSize={60} fill={COLORS.lavenderDark}>Z</text>
    </g>
  );
};

/** A sleeping head in profile with a gibberish mumble bubble (sleep talking). */
export const SleepMumble: React.FC = () => (
  <g>
    {/* head on a pillow */}
    <ellipse cx={-30} cy={110} rx={140} ry={44} fill={COLORS.sky} {...xl} />
    <circle cx={0} cy={30} r={86} fill={COLORS.white} {...xl} />
    <path d="M -36 24 q 10 -10 22 0 M 14 24 q 10 -10 22 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <path d="M -10 58 q 12 8 24 0" fill="none" {...sm} />
    {/* mumble bubble */}
    <g transform="translate(120 -70)">
      <path d="M -90 -46 Q -110 -46 -110 -10 Q -110 30 -60 30 L 60 30 Q 110 30 110 -10 Q 110 -46 60 -46 Z" fill={COLORS.white} {...lg} />
      <path d="M -70 34 l -26 34 l 44 -18 Z" fill={COLORS.white} {...lg} />
      <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.outline}>…grmbl…purple…</text>
    </g>
  </g>
);

/** A jagged scream burst with a wide terrified mouth (night terror). */
export const ScreamBurst: React.FC = () => {
  const pts = Array.from({ length: 20 }).map((_, i) => {
    const a = (i / 20) * Math.PI * 2;
    const r = i % 2 ? 100 : 160;
    return `${Math.cos(a) * r} ${Math.sin(a) * r}`;
  });
  return (
    <g>
      <path d={`M ${pts.join(' L ')} Z`} fill={COLORS.red} {...xl} />
      <path d={`M ${pts.join(' L ')} Z`} fill={shade(COLORS.red, 0.2)} transform="scale(0.78)" transform-origin="0 0" />
      {/* terrified face */}
      <circle cx={-34} cy={-26} r={16} fill={COLORS.white} />
      <circle cx={34} cy={-26} r={16} fill={COLORS.white} />
      <circle cx={-34} cy={-24} r={7} fill={COLORS.outline} />
      <circle cx={34} cy={-24} r={7} fill={COLORS.outline} />
      <ellipse cx={0} cy={34} rx={28} ry={36} fill={COLORS.outline} />
    </g>
  );
};

/** Falling tetromino blocks (the Tetris effect — dreaming your day's repetition). */
export const TetrisBlocks: React.FC = () => {
  const f = useCurrentFrame();
  const d = (f % 60) * 1.5;
  const blocks: [number, number, string][] = [
    [-80, -120, COLORS.sky], [-40, -120, COLORS.sky], [0, -120, COLORS.sky], [-40, -80, COLORS.sky],
    [70, -40, COLORS.red], [110, -40, COLORS.red], [70, 0, COLORS.red], [110, 0, COLORS.red],
    [-100, 60, COLORS.yellow], [-60, 60, COLORS.yellow], [-20, 60, COLORS.yellow], [20, 60, COLORS.yellow],
  ];
  return (
    <g transform={`translate(0 ${d - 30})`}>
      {blocks.map(([x, y, c], i) => (
        <g key={i}>
          <rect x={x} y={y} width={40} height={40} rx={6} fill={c} {...lg} />
          <rect x={x + 5} y={y + 5} width={30} height={10} rx={4} fill={COLORS.white} opacity={0.4} />
        </g>
      ))}
    </g>
  );
};

/** A grey fog cloud with heavy half-closed eyes (sleep inertia grogginess). */
export const FogCloud: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 16) * 6;
  return (
    <g transform={`translate(${drift} 0)`}>
      <g opacity={0.9}>
        {[[-70, 0, 60], [0, -20, 72], [70, 0, 60], [-30, 30, 50], [40, 30, 54]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={COLORS.ledGrey} opacity={0.7} />
        ))}
      </g>
      {/* heavy-lidded eyes */}
      <path d="M -50 0 q 24 20 48 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 10 0 q 24 20 48 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={-26} cy={8} r={6} fill={COLORS.outline} />
      <circle cx={34} cy={8} r={6} fill={COLORS.outline} />
    </g>
  );
};

/** A single eye flickering nearly shut with a warning (microsleep). */
export const MicroFlicker: React.FC = () => {
  const f = useCurrentFrame();
  const closed = Math.sin(f / 4) > 0;
  return (
    <g>
      <ellipse cx={0} cy={0} rx={130} ry={closed ? 10 : 80} fill={COLORS.white} {...xl} />
      {!closed && <circle cx={0} cy={0} r={40} fill={COLORS.sky} {...lg} />}
      {!closed && <circle cx={0} cy={0} r={18} fill={COLORS.outline} />}
      {closed && <path d="M -120 0 q 120 40 240 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />}
      {/* warning */}
      <g transform="translate(130 -110)">
        <path d="M 0 -40 L 44 40 L -44 40 Z" fill={COLORS.yellow} {...lg} />
        <text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={44} fill={COLORS.outline}>!</text>
      </g>
    </g>
  );
};

/** A boxing glove swinging out of a dream cloud (REM behaviour disorder). */
export const DreamBoxing: React.FC = () => {
  const f = useCurrentFrame();
  const jab = Math.max(0, Math.sin(f / 7)) * 50;
  return (
    <g>
      {/* dream cloud */}
      {[[-70, 0, 54], [-10, -24, 64], [54, -4, 50], [-20, 26, 44]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={COLORS.lavender} {...lg} />
      ))}
      {/* glove punching out */}
      <g transform={`translate(${70 + jab} 10)`}>
        <path d="M -10 -50 Q 70 -60 80 0 Q 86 50 20 54 Q -20 56 -30 30 Q -50 30 -50 6 Q -50 -20 -20 -16 Q -16 -40 -10 -50 Z" fill={COLORS.red} {...xl} />
        <path d="M -30 26 Q -10 40 20 36" fill="none" stroke={shade(COLORS.red, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <rect x={-54} y={6} width={30} height={34} rx={10} fill={COLORS.white} {...lg} />
      </g>
      {/* impact */}
      <path d="M 150 -30 l 22 -10 m -14 28 l 24 2 m -20 20 l 18 14" stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
};

/** A film reel looping back on itself (déjà rêvé — "I've dreamed this before"). */
export const DejaReel: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <circle cx={0} cy={0} r={120} fill={COLORS.shirtDark} {...xl} />
      <circle cx={0} cy={0} r={34} fill={COLORS.ledGrey} {...lg} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + f / 30;
        return <circle key={i} cx={Math.cos(a) * 72} cy={Math.sin(a) * 72} r={22} fill={COLORS.purpleDeep} {...sm} />;
      })}
      {/* loop arrow */}
      <path d="M -150 -40 q 150 -90 300 0 l -10 -28 m 10 28 l -28 8" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={0} y={180} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={32} fill={COLORS.outline}>seen this before?</text>
    </g>
  );
};

/** An impossible Escher staircase that loops (recurring / chase dreams). */
export const DreamStairs: React.FC = () => {
  const steps: [number, number][] = [];
  for (let i = 0; i < 7; i++) steps.push([-140 + i * 44, 110 - i * 34]);
  return (
    <g>
      {steps.map(([x, y], i) => {
        const cols = [COLORS.sky, COLORS.lavender, COLORS.pink];
        return (
          <g key={i}>
            <path d={`M ${x} ${y} l 44 0 l 0 34 l -44 0 Z`} fill={cols[i % 3]} {...lg} />
            <path d={`M ${x} ${y} l 20 -18 l 44 0 l -20 18 Z`} fill={shade(cols[i % 3], 0.16)} {...sm} />
            <path d={`M ${x + 44} ${y} l 20 -18 l 0 34 l -20 18 Z`} fill={shade(cols[i % 3], 0.28)} {...sm} />
          </g>
        );
      })}
      {/* loop arrow back to the bottom */}
      <path d="M 170 -110 q 80 140 -150 230" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray="4 16" opacity={0.5} />
    </g>
  );
};

/** A soft scalloped dream cloud that carries words (bespoke word-carrier). */
export const DreamBubble: React.FC<{ text?: string }> = ({ text = '' }) => {
  const lines = text.split('\n');
  return (
    <g>
      {[[-120, 10, 70], [-40, -30, 86], [60, -24, 72], [130, 20, 60], [-60, 50, 60], [70, 56, 64]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={COLORS.white} {...lg} />
      ))}
      <ellipse cx={0} cy={18} rx={150} ry={64} fill={COLORS.white} />
      {/* trailing puffs */}
      <circle cx={-150} cy={110} r={20} fill={COLORS.white} {...sm} />
      <circle cx={-186} cy={150} r={12} fill={COLORS.white} {...sm} />
      {lines.map((ln, i) => (
        <text key={i} x={0} y={10 + (i - (lines.length - 1) / 2) * 42} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={36} fill={COLORS.outline}>{ln}</text>
      ))}
    </g>
  );
};

/** A sleepy crescent moon with a face + nightcap (the channel's sleep motif). */
export const MoonFace: React.FC = () => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 20) * 5;
  return (
    <g transform={`translate(0 ${bob})`}>
      <path d="M 70 -110 Q -70 -100 -70 30 Q -70 150 70 150 Q -20 80 -20 20 Q -20 -50 70 -110 Z" fill={COLORS.yellow} {...xl} />
      {/* nightcap */}
      <path d="M -60 -70 Q -30 -140 40 -120 Q 30 -80 -30 -60 Z" fill={COLORS.lavender} {...lg} />
      <circle cx={44} cy={-122} r={16} fill={COLORS.white} {...sm} />
      {/* sleepy face */}
      <path d="M -28 20 q 12 10 24 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 4 34 q 12 10 24 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -14 66 q 12 8 24 0" fill="none" {...sm} />
      <text x={90} y={-60} fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.lavenderDark}>z</text>
    </g>
  );
};

/** An EEG brain-wave readout strip (the science of what stage you're in). */
export const EegStrip: React.FC = () => {
  const f = useCurrentFrame();
  const mk = (amp: number, freq: number, y: number, col: string) => {
    const pts = Array.from({ length: 60 }).map((_, i) => `${i ? 'L' : 'M'} ${-180 + i * 6} ${y - Math.sin(i / freq + f / 8) * amp}`).join(' ');
    return <path d={pts} fill="none" stroke={col} strokeWidth={STROKE.lg} strokeLinecap="round" />;
  };
  return (
    <g>
      <rect x={-200} y={-120} width={400} height={240} rx={16} fill={COLORS.shirtDarker} {...xl} />
      <rect x={-180} y={-100} width={360} height={200} rx={8} fill={COLORS.purpleDeep} {...lg} />
      {mk(10, 1.2, -60, COLORS.ledGreen)}
      {mk(24, 3.5, 0, COLORS.sky)}
      {mk(40, 6, 66, COLORS.pink)}
    </g>
  );
};
