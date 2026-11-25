/**
 * experiments.tsx — ALL-NEW art for "Every Psychological Experiment Explained". One
 * emblem per landmark study: pavlov-bell, little-albert, milgram-shock, asch-lines,
 * prison-roles, bystander, bobo-doll, harlow-monkey, marshmallow-test,
 * invisible-gorilla. Token strokes, centered on origin, ~300px tall.
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

/** pavlov-bell — a dog's head, a ringing bell, and a drool drop: classical conditioning. */
export const PavlovBell: React.FC = () => {
  const f = useCurrentFrame();
  const ring = 2 * Math.sin(f * 0.8);
  const drool = (f % 50) / 50;
  return (
    <g>
      {/* dog head */}
      <g transform="translate(-34 10)">
        <ellipse cx={0} cy={0} rx={44} ry={38} fill={shade(COLORS.wood, 0.04)} {...xl} />
        <ellipse cx={-40} cy={-6} rx={14} ry={22} fill={shade(COLORS.woodDark, 0.02)} {...lg} transform="rotate(-20 -40 -6)" />
        <circle cx={-6} cy={-8} r={4} fill={COLORS.outline} /><circle cx={16} cy={-8} r={4} fill={COLORS.outline} />
        <ellipse cx={14} cy={18} rx={16} ry={11} fill={shade(COLORS.skin, -0.04)} {...sm} /><circle cx={22} cy={14} r={4} fill={COLORS.outline} />
        {/* drool */}
        <path d={`M 22 26 q -2 ${10 + drool * 16} 0 ${20 + drool * 20}`} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={1 - drool * 0.5} />
      </g>
      {/* bell */}
      <g transform={`translate(44 -14) rotate(${ring})`}>
        <path d="M -26 20 Q -26 -28 0 -28 Q 26 -28 26 20 Z" fill={COLORS.yellow} {...xl} />
        <rect x={-32} y={20} width={64} height={12} rx={4} fill={COLORS.yellowDark} {...lg} />
        <circle cx={0} cy={36} r={8} fill={COLORS.yellowDark} {...sm} />
        <path d="M 0 -28 v -10" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
        {[0, 1].map((i) => <path key={i} d={`M ${30 + i * 8} ${-14 - i * 6} q 8 -4 10 -12`} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      </g>
      <Label t="Pavlov's dogs" />
    </g>
  );
};

/** little-albert — a baby and a small white rat, a flinch mark: conditioned fear. */
export const LittleAlbert: React.FC = () => {
  const f = useCurrentFrame();
  const flinch = (f % 40) < 6;
  return (
    <g>
      {/* baby */}
      <g transform={`translate(-34 ${flinch ? -4 : 0})`}>
        <circle cx={0} cy={-6} r={40} fill={COLORS.skin} {...xl} />
        <path d="M -22 -14 Q -14 -8 -6 -14 M 6 -14 Q 14 -8 22 -14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        {flinch ? <path d="M -14 14 Q 0 2 14 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /> : <path d="M -12 10 L 12 10" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />}
        <path d="M -8 -40 q 8 -8 16 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      {/* white rat */}
      <g transform="translate(46 30)">
        <ellipse cx={0} cy={0} rx={28} ry={16} fill={COLORS.white} {...lg} />
        <circle cx={22} cy={-4} r={10} fill={COLORS.white} {...sm} /><circle cx={28} cy={-6} r={3} fill={COLORS.outline} />
        <path d="M -26 2 q -16 2 -22 12" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      {flinch && <text x={10} y={-54} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.red}>!</text>}
      <Label t="Little Albert" />
    </g>
  );
};

/** milgram-shock — a shock dial with a lever cranked high and a warning bolt. */
export const MilgramShock: React.FC = () => {
  const f = useCurrentFrame();
  const buzz = 1.5 * Math.sin(f * 1.4);
  return (
    <g transform={`translate(${buzz} 0)`}>
      <rect x={-80} y={-54} width={160} height={108} rx={12} fill={shade(COLORS.ledGrey, 0.08)} {...xl} />
      {/* dial of voltages */}
      <path d="M -58 24 A 58 58 0 0 1 58 24" fill="none" stroke={shade(COLORS.navy, 0.1)} strokeWidth={STROKE.sm} />
      {Array.from({ length: 7 }).map((_, i) => { const a = Math.PI - (i / 6) * Math.PI; return <line key={i} x1={Math.cos(a) * 46} y1={24 - Math.sin(a) * 46} x2={Math.cos(a) * 56} y2={24 - Math.sin(a) * 56} stroke={i > 4 ? COLORS.red : COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />; })}
      {/* needle pinned at max */}
      <line x1={0} y1={24} x2={Math.cos(0.18) * 50} y2={24 - Math.sin(0.18) * 50} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={24} r={6} fill={COLORS.outline} />
      <text x={0} y={-30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>450V</text>
      {/* bolt */}
      <path d="M 54 -46 l -10 18 l 8 0 l -8 18 l 20 -24 l -8 0 Z" fill={COLORS.yellow} {...sm} />
      <Label t="Milgram's obedience" />
    </g>
  );
};

/** asch-lines — a reference line and three options, with the 'wrong' one circled by a crowd. */
export const AschLines: React.FC = () => {
  const f = useCurrentFrame();
  const point = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <g>
      {/* reference */}
      <g transform="translate(-70 0)"><line x1={0} y1={-40} x2={0} y2={40} stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" /><text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>this one</text></g>
      {/* options A B C (A is correct/short, but crowd picks C) */}
      {[[20, 40, 'A'], [60, 56, 'B'], [100, 40, 'C']].map(([x, h, lbl], i) => (
        <g key={i} transform={`translate(${x} 0)`}><line x1={0} y1={-(h as number) / 2} x2={0} y2={(h as number) / 2} stroke={lbl === 'A' ? COLORS.greenTeal : COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />{lbl === 'B' && <circle cx={0} cy={0} r={28} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} opacity={0.4 + point * 0.5} />}<text x={0} y={46} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{lbl}</text></g>
      ))}
      <text x={60} y={-54} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.red}>"it's B!" (it isn't)</text>
      <Label t="Asch conformity" />
    </g>
  );
};

/** prison-roles — two figures split by a role line: a guard cap vs a prisoner number. */
export const PrisonRoles: React.FC = () => {
  const f = useCurrentFrame();
  const loom = 1 + 0.03 * Math.sin(f / 6);
  return (
    <g>
      {/* guard */}
      <g transform={`translate(-54 0) scale(${loom})`}>
        <circle cx={0} cy={-30} r={28} fill={COLORS.skin} {...xl} />
        <rect x={-30} y={-54} width={60} height={16} rx={4} fill={COLORS.navy} {...lg} /><rect x={-14} y={-66} width={28} height={14} rx={3} fill={COLORS.navy} {...sm} />
        <path d="M -20 -26 L -8 -26 M 8 -26 L 20 -26" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -12 -14 L 12 -14" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -30 44 Q -34 -6 0 -6 Q 34 -6 30 44 Z" fill={COLORS.navy} {...xl} />
      </g>
      {/* bars between */}
      {[-6, 6].map((x, i) => <line key={i} x1={x} y1={-60} x2={x} y2={60} stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} />)}
      {/* prisoner */}
      <g transform="translate(54 6)">
        <circle cx={0} cy={-26} r={24} fill={COLORS.skin} {...lg} />
        <circle cx={-8} cy={-28} r={4} fill={COLORS.outline} /><circle cx={8} cy={-28} r={4} fill={COLORS.outline} />
        <path d="M -8 -12 Q 0 -18 8 -12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -28 44 Q -32 -2 0 -2 Q 32 -2 28 44 Z" fill={COLORS.white} {...xl} />
        {[0, 1, 2].map((i) => <line key={i} x1={-28} y1={6 + i * 14} x2={28} y2={6 + i * 14} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />)}
        <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>819</text>
      </g>
      <Label t="Stanford Prison" />
    </g>
  );
};

/** bystander — a fallen figure, a ring of onlookers all looking away. */
export const Bystander: React.FC = () => {
  const f = useCurrentFrame();
  const look = 3 * Math.sin(f / 10);
  return (
    <g>
      {/* person on the ground */}
      <g transform="translate(0 30)"><ellipse cx={0} cy={0} rx={48} ry={16} fill={shade(COLORS.navy, 0.1)} opacity={0.2} /><circle cx={-30} cy={-6} r={16} fill={COLORS.skin} {...lg} /><path d="M -14 -6 L 36 2" stroke={COLORS.pink} strokeWidth={STROKE.xl} strokeLinecap="round" /></g>
      {/* ring of bystanders looking away */}
      {[-80, -40, 40, 80].map((x, i) => <g key={i} transform={`translate(${x} ${-44 + (i % 2) * 10})`}><circle cx={0} cy={0} r={18} fill={i % 2 ? COLORS.sky : COLORS.yellowSoft} {...lg} /><circle cx={(i < 2 ? -1 : 1) * 7 + look} cy={-2} r={3} fill={COLORS.outline} /><circle cx={(i < 2 ? -1 : 1) * 7 + look + (i < 2 ? -8 : 8)} cy={-2} r={3} fill={COLORS.outline} /></g>)}
      <text x={0} y={-72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>"someone else will"</text>
      <Label t="the bystander effect" />
    </g>
  );
};

/** bobo-doll — a child mimicking a blow to an inflatable clown doll. */
export const BoboDoll: React.FC = () => {
  const f = useCurrentFrame();
  const hit = Math.abs(Math.sin(f / 6));
  return (
    <g>
      {/* bobo doll */}
      <g transform={`translate(44 10) rotate(${hit * 10})`}>
        <ellipse cx={0} cy={30} rx={40} ry={30} fill={COLORS.red} {...xl} />
        <circle cx={0} cy={-18} r={28} fill={COLORS.white} {...xl} />
        <circle cx={-10} cy={-20} r={4} fill={COLORS.outline} /><circle cx={10} cy={-20} r={4} fill={COLORS.outline} />
        <circle cx={0} cy={-10} r={6} fill={COLORS.red} />
        <path d="M -12 -2 Q 0 6 12 -2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      {/* child swinging */}
      <g transform="translate(-52 6)">
        <circle cx={0} cy={-30} r={22} fill={COLORS.skin} {...lg} />
        <path d="M -16 -34 l 6 -4 M 16 -34 l -6 -4" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <circle cx={-8} cy={-30} r={3} fill={COLORS.outline} /><circle cx={8} cy={-30} r={3} fill={COLORS.outline} />
        <path d="M -24 40 Q -28 -8 0 -8 Q 28 -8 24 40 Z" fill={COLORS.yellowSoft} {...xl} />
        <path d={`M 10 2 L ${30 + hit * 16} ${-18 - hit * 8}`} stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      </g>
      <Label t="the Bobo doll" />
    </g>
  );
};

/** harlow-monkey — a baby monkey clinging to a soft cloth 'mother' over a wire one. */
export const HarlowMonkey: React.FC = () => {
  const f = useCurrentFrame();
  const cling = 1 * Math.sin(f / 12);
  return (
    <g>
      {/* wire mother (ignored) */}
      <g transform="translate(54 0)" opacity={0.6}>
        <rect x={-24} y={-50} width={48} height={100} rx={8} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} />
        {[-30, -10, 10, 30].map((y, i) => <line key={i} x1={-24} y1={y} x2={24} y2={y} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />)}
        <circle cx={0} cy={-64} r={6} fill={COLORS.ledGrey} />
      </g>
      {/* cloth mother (chosen) */}
      <g transform="translate(-46 0)">
        <rect x={-30} y={-54} width={60} height={110} rx={16} fill={COLORS.pink} {...xl} />
        <circle cx={0} cy={-66} r={16} fill={shade(COLORS.pink, 0.06)} {...lg} />
        {/* clinging baby monkey */}
        <g transform={`translate(10 ${10 + cling})`}><circle cx={0} cy={0} r={18} fill={COLORS.wood} {...lg} /><circle cx={0} cy={2} r={11} fill={shade(COLORS.skin, -0.02)} /><circle cx={-5} cy={0} r={2.5} fill={COLORS.outline} /><circle cx={5} cy={0} r={2.5} fill={COLORS.outline} /><path d="M -16 14 q -14 6 -6 18 M 16 14 q 14 6 6 18" fill="none" stroke={COLORS.wood} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      </g>
      <Label t="Harlow's monkeys" />
    </g>
  );
};

/** marshmallow-test — one marshmallow now vs two later, a child resisting. */
export const MarshmallowTest: React.FC = () => {
  const f = useCurrentFrame();
  const temp = 2 * Math.sin(f / 4);
  return (
    <g>
      {/* now: 1 marshmallow */}
      <g transform={`translate(-60 ${temp})`}>
        <ellipse cx={0} cy={30} rx={34} ry={12} fill={shade(COLORS.sky, -0.04)} {...sm} />
        <rect x={-20} y={-6} width={40} height={30} rx={14} fill={COLORS.white} {...lg} />
        <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>now: 1</text>
      </g>
      {/* vs */}
      <text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>or</text>
      {/* later: 2 marshmallows */}
      <g transform="translate(62 0)">
        <ellipse cx={0} cy={30} rx={40} ry={12} fill={shade(COLORS.greenTeal, -0.02)} {...sm} />
        {[-12, 12].map((x, i) => <rect key={i} x={x - 18} y={-6} width={36} height={30} rx={14} fill={COLORS.white} {...lg} />)}
        <text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.greenDark}>wait: 2</text>
      </g>
      {/* little watching eyes */}
      <g transform="translate(-60 -40)"><circle cx={-8} cy={0} r={6} fill={COLORS.white} {...sm} /><circle cx={-6} cy={1} r={2.5} fill={COLORS.outline} /><circle cx={8} cy={0} r={6} fill={COLORS.white} {...sm} /><circle cx={10} cy={1} r={2.5} fill={COLORS.outline} /></g>
      <Label t="the marshmallow test" />
    </g>
  );
};

/** invisible-gorilla — a gorilla standing unnoticed among bouncing basketballs. */
export const InvisibleGorilla: React.FC = () => {
  const f = useCurrentFrame();
  const fade = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* bouncing balls (what attention is on) */}
      {[[-70, -20], [0, -40], [70, -16]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y + Math.sin(f / 5 + i) * 10})`}><circle cx={0} cy={0} r={18} fill={COLORS.yellowDark} {...lg} /><path d="M -18 0 L 18 0 M 0 -18 L 0 18" stroke={COLORS.outline} strokeWidth={STROKE.sm} /></g>)}
      {/* the unnoticed gorilla (faint) */}
      <g transform="translate(0 20)" opacity={0.35 + fade * 0.3}>
        <ellipse cx={0} cy={10} rx={40} ry={46} fill={shade(COLORS.navy, 0.08)} {...lg} />
        <circle cx={0} cy={-36} r={26} fill={shade(COLORS.navy, 0.06)} {...lg} />
        <circle cx={-9} cy={-38} r={4} fill={COLORS.white} /><circle cx={9} cy={-38} r={4} fill={COLORS.white} />
        <ellipse cx={0} cy={-28} rx={12} ry={8} fill={shade(COLORS.navy, 0.12)} />
      </g>
      <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.red}>...did you see it?</text>
      <Label t="the invisible gorilla" />
    </g>
  );
};
