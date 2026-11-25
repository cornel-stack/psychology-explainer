/**
 * motivation.tsx — ALL-NEW art for "The Psychology of Motivation". The myth
 * (waiting-feeling, action-flywheel), the drivers (inner-vs-carrot, three-needs,
 * dopamine-chase), the blocks (giant-goal), the method (tiny-first-step, small-wins,
 * find-your-why, reduce-friction). Token strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 134 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** waiting-feeling — a slumped figure waiting for a spark that never comes. */
export const WaitingFeeling: React.FC = () => {
  const f = useCurrentFrame();
  const flicker = (f % 70) < 8;
  return (
    <g>
      {/* slumped figure */}
      <circle cx={0} cy={-30} r={34} fill={COLORS.skin} {...xl} transform="rotate(8 0 -30)" />
      <path d="M -14 -36 Q -6 -30 2 -36 M 6 -36 Q 14 -30 22 -36" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -8 -16 L 12 -16" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -40 48 Q -44 -4 0 -4 Q 44 -4 40 48 Z" fill={shade(COLORS.navy, 0.1)} {...xl} />
      {/* an empty 'motivation' spark above, refusing to light */}
      <g transform="translate(40 -76)" opacity={flicker ? 1 : 0.25}>
        <path d="M 0 -16 l 4 10 l 10 1 l -7 7 l 2 10 l -9 -5 l -9 5 l 2 -10 l -7 -7 l 10 -1 Z" fill={COLORS.yellow} {...sm} />
      </g>
      {[0, 1].map((i) => <text key={i} x={40 - i * 14} y={-100 - i * 12} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.ledGrey}>?</text>)}
      <Label t="waiting to feel ready" />
    </g>
  );
};

/** action-flywheel — a push kickstarts a spinning flywheel of momentum. */
export const ActionFlywheel: React.FC = () => {
  const f = useCurrentFrame();
  const spin = f * 4;
  return (
    <g>
      {/* flywheel */}
      <circle cx={0} cy={0} r={56} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} />
      <g transform={`rotate(${spin})`}>{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={0} y1={0} x2={Math.cos((i / 6) * Math.PI * 2) * 48} y2={Math.sin((i / 6) * Math.PI * 2) * 48} stroke={shade(COLORS.greenTeal, 0.06)} strokeWidth={STROKE.lg} />)}</g>
      <circle cx={0} cy={0} r={16} fill={COLORS.greenTeal} {...lg} />
      {/* motion lines */}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${62 + i * 6} ${-16 + i * 16} a 70 70 0 0 1 10 20`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />)}
      {/* the push hand */}
      <path d="M -84 10 l 30 -6" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={-52} cy={2} r={12} fill={COLORS.skin} {...sm} />
      <text x={0} y={-72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.greenDark}>action → momentum</text>
      <Label t="motivation follows action" />
    </g>
  );
};

/** inner-vs-carrot — an inner flame vs a dangled carrot, two kinds of drive. */
export const InnerVsCarrot: React.FC = () => {
  const f = useCurrentFrame();
  const flame = 0.8 + 0.2 * Math.sin(f / 4);
  const dangle = 6 * Math.sin(f / 12);
  return (
    <g>
      {/* intrinsic flame */}
      <g transform="translate(-60 0)">
        <circle cx={0} cy={0} r={46} fill={COLORS.skin} {...xl} />
        <path d="M 0 16 q -16 -14 0 -40 q 16 26 0 40 Z" fill={COLORS.yellow} {...sm} transform={`scale(${flame})`} />
        <text x={0} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.greenDark}>intrinsic</text>
      </g>
      {/* extrinsic carrot on a stick */}
      <g transform="translate(60 0)">
        <circle cx={0} cy={0} r={46} fill={COLORS.white} {...xl} />
        <circle cx={-14} cy={-6} r={4} fill={COLORS.outline} /><circle cx={14} cy={-6} r={4} fill={COLORS.outline} />
        <path d="M -12 12 Q 0 18 12 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <g transform={`translate(${30 + dangle} -40)`}><line x1={-40} y1={-20} x2={0} y2={10} stroke={COLORS.woodDark} strokeWidth={STROKE.sm} /><path d="M 0 10 l 6 20 l -10 -4 Z" fill={COLORS.red} {...sm} /><path d="M 2 8 l 2 -8 l 4 6" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
        <text x={0} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>extrinsic</text>
      </g>
      <Label t="inner fire vs the carrot" />
    </g>
  );
};

/** three-needs — three fuel gauges: autonomy, competence, relatedness. */
export const ThreeNeeds: React.FC = () => {
  const f = useCurrentFrame();
  const needs = [{ t: 'autonomy', c: COLORS.sky, v: 0.8 }, { t: 'competence', c: COLORS.yellow, v: 0.9 }, { t: 'relatedness', c: COLORS.pink, v: 0.75 }];
  return (
    <g>
      {needs.map((n, i) => {
        const x = -100 + i * 100; const fill = n.v * (0.9 + 0.1 * Math.sin(f / 6 + i));
        return <g key={i} transform={`translate(${x} 0)`}>
          <rect x={-28} y={-54} width={56} height={108} rx={12} fill={COLORS.white} {...lg} />
          <rect x={-20} y={46 - 92 * fill} width={40} height={92 * fill} rx={8} fill={n.c} />
          <text x={0} y={72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{n.t}</text>
        </g>;
      })}
      <Label t="three fuels of drive" />
    </g>
  );
};

/** dopamine-chase — a figure reaching toward a glowing reward just ahead. */
export const DopamineChase: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 6 * Math.sin(f / 8);
  const glow = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {/* reaching figure */}
      <circle cx={-30} cy={-20} r={28} fill={COLORS.skin} {...xl} />
      <path d="M -16 -24 Q -6 -16 4 -24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-10} cy={-22} r={4} fill={COLORS.outline} /><circle cx={-28} cy={-22} r={4} fill={COLORS.outline} />
      <path d="M -52 40 Q -56 -2 -30 -2 Q -4 -2 -8 40 Z" fill={COLORS.sky} {...xl} />
      <path d="M -14 0 Q 20 -14 44 -26" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* the glowing reward, just out of reach */}
      <g transform={`translate(${58 + bob} -34)`}>
        <circle cx={0} cy={0} r={22 + glow * 6} fill={COLORS.yellow} opacity={0.3 + glow * 0.4} />
        <path d="M 0 -14 l 4 9 l 10 1 l -7 7 l 2 10 l -9 -5 l -9 5 l 2 -10 l -7 -7 l 10 -1 Z" fill={COLORS.yellow} {...sm} />
      </g>
      <Label t="dopamine is the chase" />
    </g>
  );
};

/** giant-goal — a tiny figure frozen at the foot of an enormous mountain. */
export const GiantGoal: React.FC = () => {
  const f = useCurrentFrame();
  const sweat = 2 * Math.sin(f / 5);
  return (
    <g>
      {/* huge mountain */}
      <path d="M -90 70 L -10 -80 L 20 -30 L 40 -60 L 96 70 Z" fill={shade(COLORS.navy, 0.1)} {...xl} />
      <path d="M -10 -80 L -28 -40 L 6 -40 Z" fill={COLORS.white} opacity={0.5} />
      {/* flag at top */}
      <g transform="translate(-10 -80)"><line x1={0} y1={0} x2={0} y2={-26} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><path d="M 0 -26 l 20 6 l -20 8 Z" fill={COLORS.red} {...sm} /></g>
      {/* tiny frozen figure */}
      <g transform={`translate(-54 ${54 + sweat})`}><circle cx={0} cy={-16} r={12} fill={COLORS.pink} {...sm} /><path d="M -10 14 Q -12 -4 0 -4 Q 12 -4 10 14 Z" fill={COLORS.pink} {...sm} /><path d="M 12 -26 q -4 7 0 10 q 4 -4 0 -10 Z" fill={COLORS.sky} opacity={0.7} /></g>
      <Label t="too big to even start" />
    </g>
  );
};

/** tiny-first-step — one small glowing step at the foot of a staircase. */
export const TinyFirstStep: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      {/* faded big staircase */}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-80 + i * 44} y={40 - i * 36} width={44} height={36 + i * 36} fill={shade(COLORS.sky, 0.06)} opacity={0.3} {...sm} />)}
      {/* the one lit first step */}
      <rect x={-80} y={40} width={44} height={36} rx={4} fill={COLORS.greenTeal} opacity={0.6 + glow * 0.3} {...lg} />
      {/* a little foot stepping on */}
      <g transform="translate(-58 18)"><ellipse cx={0} cy={0} rx={22} ry={11} fill={COLORS.skin} {...sm} /></g>
      <text x={-58} y={-6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.greenDark}>2 min</text>
      <Label t="just start — absurdly small" />
    </g>
  );
};

/** small-wins — a stack of little checkmarks building momentum upward. */
export const SmallWins: React.FC = () => {
  const f = useCurrentFrame();
  const lit = Math.floor((f / 16) % 5) + 1;
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const on = i < lit; const x = -70 + i * 36; const y = 50 - i * 22;
        return <g key={i} transform={`translate(${x} ${y})`} opacity={on ? 1 : 0.3}>
          <circle cx={0} cy={0} r={18} fill={on ? COLORS.greenTeal : COLORS.white} {...sm} />
          <path d="M -8 0 l 5 6 l 9 -11" fill="none" stroke={on ? COLORS.white : COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
        </g>;
      })}
      {/* rising arrow */}
      <path d="M -84 60 L 4 -38" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeDasharray="5 7" opacity={0.6} />
      <Label t="small wins stack up" />
    </g>
  );
};

/** find-your-why — a task box wired to a glowing 'why' heart that powers it. */
export const FindYourWhy: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      {/* the task */}
      <g transform="translate(-54 0)"><rect x={-40} y={-34} width={80} height={68} rx={10} fill={COLORS.white} {...xl} />{[0, 1, 2].map((i) => <line key={i} x1={-26} y1={-16 + i * 16} x2={26} y2={-16 + i * 16} stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />)}<text x={0} y={-44} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>the task</text></g>
      {/* wire */}
      <path d="M -14 0 q 20 0 30 0" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.4 + pulse * 0.5} />
      {/* the why heart, glowing power source */}
      <g transform="translate(58 0)">
        <circle cx={0} cy={0} r={40} fill={COLORS.pink} opacity={0.3 + pulse * 0.3} />
        <path d="M 0 20 q -22 -16 -22 -32 q 0 -10 11 -10 q 7 0 11 7 q 4 -7 11 -7 q 11 0 11 10 q 0 16 -22 32 Z" fill={COLORS.red} {...lg} transform="translate(0 -2)" />
        <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>your why</text>
      </g>
      <Label t="connect it to your why" />
    </g>
  );
};

/** reduce-friction — a smooth ramp replacing a rough barrier to the goal. */
export const ReduceFriction: React.FC = () => {
  const f = useCurrentFrame();
  const roll = (f % 50) / 50;
  return (
    <g>
      {/* smooth downhill ramp */}
      <path d="M -90 -40 Q -20 -40 70 60" fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* a ball rolling easily down it */}
      <g transform={`translate(${-80 + roll * 140} ${-42 + Math.pow(roll, 2) * 100})`}><circle cx={0} cy={0} r={16} fill={COLORS.yellow} {...lg} /></g>
      {/* the removed barrier, faded aside */}
      <g transform="translate(20 20)" opacity={0.3}><rect x={-6} y={-30} width={12} height={60} fill={COLORS.ledGrey} />{[0, 1].map((i) => <path key={i} d={`M ${-14 + i * 10} -20 l 8 8`} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />)}</g>
      {/* goal flag */}
      <g transform="translate(74 60)"><line x1={0} y1={0} x2={0} y2={-30} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><path d="M 0 -30 l 18 6 l -18 8 Z" fill={COLORS.red} {...sm} /></g>
      <Label t="make the good thing easy" />
    </g>
  );
};
