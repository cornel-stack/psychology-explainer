/**
 * small-talk.tsx — ALL-NEW art for "The Psychology of Small Talk". What it is
 * (weather-opener, social-grooming, trust-signal), why it matters (bridge-to-deep,
 * liking-gap-faces, weak-ties-web), and doing it well (open-question-key, depth-dial,
 * shared-spark, awkward-pause). Token strokes, centered on origin, ~300px tall.
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

/** weather-opener — a "nice weather!" speech bubble with a little sun-and-cloud. */
export const WeatherOpener: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.97 + 0.03 * Math.sin(f / 5);
  return (
    <g transform={`scale(${pulse})`}>
      <rect x={-120} y={-64} width={240} height={110} rx={24} fill={COLORS.white} {...xl} />
      <path d="M -48 42 L -28 88 L -4 44 Z" fill={COLORS.white} {...xl} />
      {/* little sun + cloud */}
      <circle cx={-66} cy={-14} r={18} fill={COLORS.yellow} {...sm} />
      {[0, 1, 2, 3].map((i) => { const a = (i / 4) * Math.PI * 2; return <line key={i} x1={-66 + Math.cos(a) * 24} y1={-14 + Math.sin(a) * 24} x2={-66 + Math.cos(a) * 32} y2={-14 + Math.sin(a) * 32} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />; })}
      <ellipse cx={-24} cy={-4} rx={34} ry={18} fill={shade(COLORS.sky, 0.08)} {...sm} />
      <text x={44} y={-6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>"nice</text>
      <text x={44} y={20} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>day!"</text>
      <Label t="it's not about the weather" />
    </g>
  );
};

/** social-grooming — two little figures tending the thread between them (word grooming). */
export const SocialGrooming: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 3 * Math.sin(f / 10);
  return (
    <g>
      {[-66, 66].map((x, i) => <g key={i} transform={`translate(${x} ${i ? -bob : bob})`}><circle cx={0} cy={-30} r={28} fill={i ? COLORS.sky : COLORS.pink} {...lg} /><circle cx={-9} cy={-32} r={4} fill={COLORS.outline} /><circle cx={9} cy={-32} r={4} fill={COLORS.outline} /><path d="M -10 -20 Q 0 -12 10 -20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -26 36 Q -30 -4 0 -4 Q 30 -4 26 36 Z" fill={i ? shade(COLORS.sky, 0.08) : shade(COLORS.pink, 0.06)} {...lg} /></g>)}
      {/* the warm thread of chat between them */}
      {[0, 1, 2].map((i) => <circle key={i} cx={-30 + i * 30} cy={-20 + Math.sin(f / 6 + i) * 4} r={8} fill={COLORS.yellowSoft} {...sm} />)}
      {/* little heart rising */}
      <path d="M 0 -64 q -8 -8 -8 -14 q 0 -6 6 -6 q 4 0 2 4 q -2 -4 2 -4 q 6 0 6 6 q 0 6 -8 14 Z" fill={COLORS.red} opacity={0.7} transform={`translate(0 ${-6 + Math.sin(f / 8) * 4})`} />
      <Label t="grooming — with words" />
    </g>
  );
};

/** trust-signal — a low-stakes handshake with a green 'safe' check. */
export const TrustSignal: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      {/* two hands meeting */}
      <path d="M -70 20 Q -30 10 0 14 Q 30 10 70 20" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={0} cy={14} r={20} fill={COLORS.skin} {...lg} />
      {/* the 'safe / friendly' ring */}
      {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={14} r={40 + i * 20} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.sm} opacity={(0.4 - i * 0.1) * (0.6 + glow * 0.5)} />)}
      <g transform="translate(0 -56)"><circle cx={0} cy={0} r={22} fill={COLORS.greenTeal} {...sm} /><path d="M -10 0 l 6 7 l 12 -14" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
      <Label t="'I'm friendly, I'm safe'" />
    </g>
  );
};

/** bridge-to-deep — a little bridge from a shallow bank to a deep one. */
export const BridgeToDeep: React.FC = () => {
  const f = useCurrentFrame();
  const walk = (f % 50) / 50;
  return (
    <g>
      {/* water */}
      <rect x={-120} y={30} width={240} height={50} rx={8} fill={shade(COLORS.sky, 0.08)} opacity={0.5} />
      {/* shallow bank */}
      <rect x={-120} y={20} width={50} height={60} rx={6} fill={shade(COLORS.yellowSoft, 0.04)} {...lg} />
      <text x={-95} y={54} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>small</text>
      {/* deep bank */}
      <rect x={70} y={6} width={50} height={74} rx={6} fill={shade(COLORS.greenTeal, 0.06)} {...lg} />
      <text x={95} y={48} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>deep</text>
      {/* the arched bridge */}
      <path d="M -70 20 Q 0 -40 70 6" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {[-50, -20, 10, 40].map((x, i) => { const y = 20 + (x + 70) * 0 - (1 - Math.pow((x) / 70, 2)) * 44 - 6; return <line key={i} x1={x} y1={y} x2={x} y2={y + 20} stroke={COLORS.woodDark} strokeWidth={STROKE.sm} />; })}
      {/* a little walker crossing */}
      <g transform={`translate(${-60 + walk * 120} ${-6 - (1 - Math.pow((walk * 2 - 1), 2)) * 36})`}><circle cx={0} cy={-14} r={11} fill={COLORS.pink} {...sm} /><path d="M -10 10 Q -12 -4 0 -4 Q 12 -4 10 10 Z" fill={COLORS.pink} {...sm} /></g>
      <Label t="a bridge, not the destination" />
    </g>
  );
};

/** liking-gap-faces — your worried guess vs their actual warm reaction. */
export const LikingGapFaces: React.FC = () => {
  const f = useCurrentFrame();
  const beat = 0.6 + 0.4 * Math.sin(f / 10);
  return (
    <g>
      {/* what you think */}
      <g transform="translate(-66 0)">
        <circle cx={0} cy={0} r={48} fill={shade(COLORS.sky, 0.04)} {...xl} />
        <circle cx={-16} cy={-6} r={5} fill={COLORS.outline} /><circle cx={16} cy={-6} r={5} fill={COLORS.outline} />
        <path d="M -16 22 Q 0 12 16 22" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>you: "they hated it"</text>
      </g>
      {/* what's real */}
      <g transform="translate(66 0)">
        <circle cx={0} cy={0} r={48} fill={shade(COLORS.pink, 0.06)} {...xl} />
        <path d="M -22 -8 Q -14 -16 -6 -8 M 6 -8 Q 14 -16 22 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -18 10 Q 0 30 18 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${-24 + i * 24} -40 q 4 -8 0 -16`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={beat} />)}
        <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.pinkDark}>them: "I liked them!"</text>
      </g>
      <Label t="the liking gap" />
    </g>
  );
};

/** weak-ties-web — a central you with light threads to barista, neighbour, stranger. */
export const WeakTiesWeb: React.FC = () => {
  const f = useCurrentFrame();
  const ties = ['barista', 'neighbour', 'coworker', 'dog-walker'];
  const pulse = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      {ties.map((t, i) => { const a = -Math.PI / 2 + (i / ties.length) * Math.PI * 2; const x = Math.cos(a) * 94; const y = Math.sin(a) * 76; return (
        <g key={i}><line x1={0} y1={0} x2={x} y2={y} stroke={COLORS.greenTeal} strokeWidth={STROKE.sm} strokeDasharray="4 6" opacity={0.5 + pulse * 0.3} /><circle cx={x} cy={y} r={22} fill={shade(COLORS.greenTeal, 0.08)} {...sm} /><circle cx={x - 7} cy={y - 2} r={3} fill={COLORS.outline} /><circle cx={x + 7} cy={y - 2} r={3} fill={COLORS.outline} /><path d={`M ${x - 7} ${y + 6} Q ${x} ${y + 11} ${x + 7} ${y + 6}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><text x={x} y={y + 40} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>{t}</text></g>
      ); })}
      <circle cx={0} cy={0} r={30} fill={COLORS.pink} {...lg} />
      <text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>you</text>
      <Label t="weak ties lift you up" />
    </g>
  );
};

/** open-question-key — a question-mark key unlocking a little padlock. */
export const OpenQuestionKey: React.FC = () => {
  const f = useCurrentFrame();
  const turn = Math.sin(f / 10) * 12;
  return (
    <g>
      {/* padlock opening */}
      <g transform="translate(40 0)">
        <rect x={-34} y={-6} width={68} height={60} rx={10} fill={COLORS.yellow} {...xl} />
        <path d={`M -20 -6 L -20 -26 Q -20 -50 ${4 + turn / 3} -50 Q 20 -50 20 -26`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <circle cx={0} cy={22} r={7} fill={COLORS.outline} />
      </g>
      {/* the question-mark key */}
      <g transform={`translate(-44 20) rotate(${turn})`}>
        <circle cx={0} cy={0} r={22} fill={COLORS.greenTeal} {...lg} />
        <text x={0} y={7} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.white}>?</text>
        <rect x={18} y={-6} width={40} height={12} rx={3} fill={COLORS.greenTeal} {...sm} />
        <rect x={48} y={-6} width={8} height={18} rx={2} fill={COLORS.greenTeal} />
      </g>
      <Label t="an open question unlocks" />
    </g>
  );
};

/** depth-dial — a dial climbing from cliché up to feelings. */
export const DepthDial: React.FC = () => {
  const f = useCurrentFrame();
  const levels = ['cliché', 'facts', 'opinions', 'feelings'];
  const lit = Math.floor((f / 22) % (levels.length + 1));
  return (
    <g>
      {levels.map((l, i) => {
        const y = 60 - i * 40; const on = i < lit;
        return <g key={i} transform={`translate(0 ${y})`}>
          <rect x={-90} y={-16} width={180} height={32} rx={10} fill={on ? [COLORS.sky, COLORS.yellow, COLORS.pink, COLORS.red][i] : COLORS.white} {...lg} opacity={on ? 0.9 : 1} />
          <text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>{l}</text>
        </g>;
      })}
      <path d="M 104 70 L 104 -70" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M 96 -60 l 8 -14 l 8 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <text x={128} y={-66} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline} transform="rotate(90 128 -66)">deeper</text>
      <Label t="go one layer down" />
    </g>
  );
};

/** shared-spark — two overlapping circles with a bright spark where they meet. */
export const SharedSpark: React.FC = () => {
  const f = useCurrentFrame();
  const spark = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      <circle cx={-34} cy={0} r={58} fill={COLORS.sky} opacity={0.35} {...lg} />
      <circle cx={34} cy={0} r={58} fill={COLORS.pink} opacity={0.35} {...lg} />
      {/* the spark in the overlap */}
      <g transform="translate(0 0)">
        {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 14} y1={Math.sin(a) * 14} x2={Math.cos(a) * (26 + spark * 10)} y2={Math.sin(a) * (26 + spark * 10)} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6 + spark * 0.4} />; })}
        <circle cx={0} cy={0} r={16} fill={COLORS.yellow} {...sm} />
      </g>
      <text x={-50} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>you</text>
      <text x={50} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>them</text>
      <Label t="find the shared spark" />
    </g>
  );
};

/** awkward-pause — two figures with a heavy "..." silence hanging between them. */
export const AwkwardPause: React.FC = () => {
  const f = useCurrentFrame();
  const sweat = 2 * Math.sin(f / 6);
  return (
    <g>
      {[-72, 72].map((x, i) => <g key={i} transform={`translate(${x} 10)`}><circle cx={0} cy={-26} r={26} fill={i ? COLORS.skin : COLORS.white} {...lg} /><circle cx={-9} cy={-28} r={4} fill={COLORS.outline} /><circle cx={9} cy={-28} r={4} fill={COLORS.outline} /><path d="M -10 -14 L 10 -14" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -26 36 Q -30 -2 0 -2 Q 30 -2 26 36 Z" fill={i ? COLORS.sky : COLORS.pink} {...lg} /><path d={`M 20 ${-44 + sweat} q -5 7 0 11 q 5 -4 0 -11 Z`} fill={COLORS.sky} opacity={0.7} /></g>)}
      {/* the heavy dot-dot-dot */}
      <g transform="translate(0 -30)">{[-18, 0, 18].map((x, i) => <circle key={i} cx={x} cy={0} r={7} fill={COLORS.ledGrey} opacity={0.5 + 0.4 * Math.sin(f / 5 + i)} />)}</g>
      <Label t="the dreaded silence" />
    </g>
  );
};
