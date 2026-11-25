/**
 * feel-tired.tsx — ALL-NEW art for "Why You Feel Tired All the Time". The paradox
 * (charged-but-drained, three-tireds), the drains (decision-drain, tired-but-wired,
 * mask-fatigue, attention-residue, junk-rest, languishing-fog), and the fixes
 * (movement-spark, sunlight-reset). Token strokes, centered on origin, ~300px tall.
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

/** charged-but-drained — a full battery next to a drooping, exhausted face. */
export const ChargedButDrained: React.FC = () => {
  const f = useCurrentFrame();
  const droop = 4 + 2 * Math.sin(f / 10);
  return (
    <g>
      {/* full battery */}
      <g transform="translate(-74 0)">
        <rect x={-34} y={-54} width={68} height={108} rx={10} fill={COLORS.white} {...xl} />
        <rect x={-14} y={-64} width={28} height={12} rx={4} fill={COLORS.outline} />
        {[0, 1, 2].map((i) => <rect key={i} x={-24} y={22 - i * 30} width={48} height={22} rx={4} fill={COLORS.greenTeal} />)}
        <path d="M 2 -28 l -14 24 l 12 0 l -6 20 l 20 -28 l -12 0 Z" fill={COLORS.yellow} {...sm} />
      </g>
      {/* drooping face */}
      <g transform={`translate(64 ${droop})`}>
        <circle cx={0} cy={0} r={56} fill={COLORS.skin} {...xl} />
        <path d="M -30 -14 q 10 8 22 0 M 8 -14 q 10 8 22 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <circle cx={-19} cy={0} r={5} fill={COLORS.outline} /><circle cx={19} cy={0} r={5} fill={COLORS.outline} />
        {/* eye bags */}
        <path d="M -30 12 q 11 8 22 0 M 8 12 q 11 8 22 0" fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
        <path d="M -16 30 Q 0 24 16 30" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <Label t="full charge, still flat" />
    </g>
  );
};

/** three-tireds — three little icons: body, head, heart, each drooping. */
export const ThreeTireds: React.FC = () => {
  const items = [
    { t: 'body', icon: (<g><circle cx={0} cy={-14} r={10} fill={COLORS.skin} {...sm} /><path d="M -14 24 Q -16 -4 0 -4 Q 16 -4 14 24 Z" fill={COLORS.sky} {...sm} /></g>), c: COLORS.sky },
    { t: 'mind', icon: (<path d="M -18 6 Q -22 -20 0 -20 Q 22 -20 18 6 Q 18 22 0 20 Q -18 22 -18 6 Z" fill={COLORS.lavender} {...sm} />), c: COLORS.lavender },
    { t: 'heart', icon: (<path d="M 0 18 q -20 -14 -20 -28 q 0 -10 10 -10 q 7 0 10 8 q 3 -8 10 -8 q 10 0 10 10 q 0 14 -20 28 Z" fill={COLORS.pink} {...sm} />), c: COLORS.pink },
  ];
  return (
    <g>
      {items.map((it, i) => (
        <g key={i} transform={`translate(${-110 + i * 110} 0)`}>
          <circle cx={0} cy={0} r={48} fill={shade(it.c, 0.08)} {...lg} />
          <g transform="scale(1.1)">{it.icon}</g>
          <path d="M 30 -34 q 10 10 0 22" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
          <text x={0} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>{it.t}</text>
        </g>
      ))}
      <Label t="three kinds of tired" />
    </g>
  );
};

/** decision-drain — a head juggling many little choice-orbs, leaking energy. */
export const DecisionDrain: React.FC = () => {
  const f = useCurrentFrame();
  const choices = Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 + f / 30; return { x: Math.cos(a) * (70 + (i % 2) * 14), y: -10 + Math.sin(a) * (54 + (i % 2) * 10) }; });
  return (
    <g>
      <circle cx={0} cy={-6} r={46} fill={COLORS.skin} {...xl} />
      <path d="M -18 -18 l 10 10 M -8 -18 l -10 10 M 8 -18 l 10 10 M 18 -18 l -10 10" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-14} cy={-2} r={5} fill={COLORS.outline} /><circle cx={14} cy={-2} r={5} fill={COLORS.outline} />
      <path d="M -12 18 Q 0 12 12 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {choices.map((c, i) => (
        <g key={i}><circle cx={c.x} cy={c.y} r={13} fill={[COLORS.yellow, COLORS.sky, COLORS.pink, COLORS.greenTeal][i % 4]} {...sm} /><text x={c.x} y={c.y + 5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={12} fill={COLORS.outline}>?</text></g>
      ))}
      <Label t="a thousand tiny choices" />
    </g>
  );
};

/** tired-but-wired — a wide-eyed, jittery face that's exhausted but can't switch off. */
export const TiredButWired: React.FC = () => {
  const f = useCurrentFrame();
  const jitter = 1.5 * Math.sin(f * 1.3);
  return (
    <g transform={`translate(${jitter} 0)`}>
      <circle cx={0} cy={0} r={56} fill={shade(COLORS.sky, 0.04)} {...xl} />
      {/* wide wired eyes */}
      <circle cx={-20} cy={-6} r={16} fill={COLORS.white} {...sm} /><circle cx={-20} cy={-6} r={6} fill={COLORS.outline} />
      <circle cx={20} cy={-6} r={16} fill={COLORS.white} {...sm} /><circle cx={20} cy={-6} r={6} fill={COLORS.outline} />
      {/* eye bags */}
      <path d="M -32 12 q 12 8 24 0 M 8 12 q 12 8 24 0" fill="none" stroke={COLORS.lavenderDark} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      <path d="M -12 32 Q 0 28 12 32" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* electric wired lines */}
      {[0, 1, 2, 3].map((i) => { const a = -Math.PI / 2 + (i - 1.5) * 0.5; return <path key={i} d={`M ${Math.cos(a) * 60} ${Math.sin(a) * 60 - 6} l ${Math.cos(a) * 10} ${Math.sin(a) * 10} l ${Math.cos(a + 0.3) * 8} ${Math.sin(a + 0.3) * 8}`} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />; })}
      <Label t="tired, but wired" />
    </g>
  );
};

/** mask-fatigue — a drained face holding up a bright smiling mask. */
export const MaskFatigue: React.FC = () => {
  const f = useCurrentFrame();
  const lift = 2 * Math.sin(f / 12);
  return (
    <g>
      {/* true weary face */}
      <circle cx={0} cy={0} r={54} fill={COLORS.skin} {...xl} />
      <path d="M -28 -12 q 10 6 20 0 M 8 -12 q 10 6 20 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-18} cy={-2} r={4} fill={COLORS.outline} /><circle cx={18} cy={-2} r={4} fill={COLORS.outline} />
      <path d="M -14 26 Q 0 20 14 26" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* the bright smiling mask held to the side */}
      <g transform={`translate(70 ${lift}) rotate(10)`}>
        <ellipse cx={0} cy={0} rx={44} ry={56} fill={COLORS.yellowSoft} {...xl} />
        <circle cx={-14} cy={-8} r={5} fill={COLORS.outline} /><circle cx={14} cy={-8} r={5} fill={COLORS.outline} />
        <path d="M -18 18 Q 0 36 18 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <rect x={-6} y={40} width={12} height={40} rx={4} fill={COLORS.woodDark} />
      </g>
      <Label t="holding it together is work" />
    </g>
  );
};

/** attention-residue — sticky tabs left clinging to the mind after each switch. */
export const AttentionResidue: React.FC = () => {
  const f = useCurrentFrame();
  const tabs = ['email', 'chat', 'that text', 'to-do', 'news'];
  return (
    <g>
      <path d="M -40 36 Q -46 -26 0 -26 Q 46 -26 40 36 Z" fill={shade(COLORS.lavender, 0.08)} {...xl} />
      {/* sticky tabs clinging around the head */}
      {tabs.map((t, i) => { const a = -Math.PI + (i / (tabs.length - 1)) * Math.PI; const x = Math.cos(a) * 72; const y = Math.sin(a) * 50 - 10; const flutter = 2 * Math.sin(f / 6 + i); return (
        <g key={i} transform={`translate(${x} ${y + flutter}) rotate(${(x > 0 ? 1 : -1) * 10})`}>
          <rect x={-34} y={-15} width={68} height={30} rx={6} fill={[COLORS.yellow, COLORS.pink, COLORS.sky][i % 3]} {...sm} />
          <text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{t}</text>
        </g>
      ); })}
      <Label t="every tab stays half-open" />
    </g>
  );
};

/** junk-rest — a slumped figure scrolling a phone, rest that doesn't refill. */
export const JunkRest: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = (f % 30) / 30;
  return (
    <g>
      {/* slumped figure */}
      <circle cx={-20} cy={-40} r={30} fill={COLORS.skin} {...lg} transform="rotate(-10 -20 -40)" />
      <circle cx={-30} cy={-42} r={4} fill={COLORS.outline} /><circle cx={-12} cy={-42} r={4} fill={COLORS.outline} />
      <path d="M -28 -28 q 8 4 16 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -54 40 Q -58 -14 -20 -14 Q 18 -14 14 40 Z" fill={shade(COLORS.navy, 0.1)} {...xl} />
      {/* the glowing phone */}
      <g transform="translate(40 10)">
        <rect x={-26} y={-40} width={52} height={88} rx={10} fill={COLORS.white} {...lg} />
        {[0, 1, 2].map((i) => <rect key={i} x={-18} y={-28 + ((i * 24 + scroll * 24) % 72) - 2} width={36} height={14} rx={3} fill={shade(COLORS.sky, 0.04)} />)}
        {[0, 1, 2, 3].map((i) => <line key={i} x1={-40 - i * 4} y1={-40 - i * 6} x2={-48 - i * 6} y2={-46 - i * 8} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />)}
      </g>
      <Label t="rest that doesn't refill" />
    </g>
  );
};

/** languishing-fog — a grey, flat, meh figure in a dull fog: not sad, not well. */
export const LanguishingFog: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 4 * Math.sin(f / 14);
  return (
    <g>
      {/* dull fog */}
      {[0, 1, 2].map((i) => <ellipse key={i} cx={-40 + i * 40 + drift} cy={-50 + (i % 2) * 20} rx={60} ry={28} fill={COLORS.ledGrey} opacity={0.2} />)}
      <circle cx={0} cy={0} r={54} fill={shade(COLORS.ledGrey, 0.1)} {...xl} />
      <circle cx={-18} cy={-6} r={5} fill={COLORS.outline} /><circle cx={18} cy={-6} r={5} fill={COLORS.outline} />
      {/* flat, straight meh mouth */}
      <path d="M -18 20 L 18 20" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={0} y={-74} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>meh</text>
      <Label t="languishing — flat and grey" />
    </g>
  );
};

/** movement-spark — a figure mid-stride with energy sparks: motion makes energy. */
export const MovementSpark: React.FC = () => {
  const f = useCurrentFrame();
  const stride = Math.sin(f / 5) * 14;
  return (
    <g>
      <circle cx={0} cy={-56} r={26} fill={COLORS.skin} {...lg} />
      <circle cx={-8} cy={-58} r={4} fill={COLORS.outline} /><circle cx={8} cy={-58} r={4} fill={COLORS.outline} />
      <path d="M -10 -46 Q 0 -38 10 -46" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M 0 -30 L 0 28" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* swinging arms + striding legs */}
      <path d={`M 0 -18 l ${20} ${-8} M 0 -18 l ${-20} ${10}`} stroke={COLORS.greenTeal} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d={`M 0 28 l ${stride} 36 M 0 28 l ${-stride} 36`} stroke={COLORS.navy} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* energy sparks */}
      {[0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + (i - 2) * 0.5; return <path key={i} d={`M ${Math.cos(a) * 60} ${-40 + Math.sin(a) * 50} l ${Math.cos(a) * 12} ${Math.sin(a) * 12}`} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(f / 4 + i)} />; })}
      <Label t="motion makes energy" />
    </g>
  );
};

/** sunlight-reset — a bright sun over a little clock: morning light resets you. */
export const SunlightReset: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={0} cy={-20} r={48} fill={COLORS.yellow} {...xl} opacity={0.85} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 58} y1={-20 + Math.sin(a) * 58} x2={Math.cos(a) * (74 + glow * 8)} y2={-20 + Math.sin(a) * (74 + glow * 8)} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />; })}
      {/* little clock showing morning */}
      <g transform="translate(40 44)">
        <circle cx={0} cy={0} r={30} fill={COLORS.white} {...lg} />
        <line x1={0} y1={0} x2={0} y2={-18} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <line x1={0} y1={0} x2={13} y2={4} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <circle cx={0} cy={0} r={4} fill={COLORS.outline} />
      </g>
      <Label t="catch the morning light" />
    </g>
  );
};
