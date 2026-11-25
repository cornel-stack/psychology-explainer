/**
 * gaslighting.tsx — ALL-NEW art for "The Psychology of Gaslighting". The thing itself
 * (gaslight-lamp, denial-bubble, distorted-mirror), the tactics (trivialize-shrink,
 * blame-flip), the effects (walking-eggshells, isolation-web, intermittent-warmth),
 * and the way back (reality-journal, inner-compass). Token strokes, centered on
 * origin, ~300px tall. Handled with care — this is emotional abuse.
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

/** gaslight-lamp — an old gas lamp whose flame quietly dims, while a hand insists it hasn't. */
export const GaslightLamp: React.FC = () => {
  const f = useCurrentFrame();
  const dim = 0.4 + 0.3 * (0.5 + 0.5 * Math.sin(f / 10));
  return (
    <g>
      {/* lamp post */}
      <rect x={-8} y={20} width={16} height={100} rx={4} fill={COLORS.woodDark} {...lg} />
      <rect x={-34} y={110} width={68} height={16} rx={6} fill={COLORS.woodDark} {...lg} />
      {/* glass housing */}
      <path d="M -40 20 L 40 20 L 30 -60 L -30 -60 Z" fill={shade(COLORS.navy, 0.1)} opacity={0.5} {...xl} />
      <rect x={-34} y={-72} width={68} height={16} rx={4} fill={COLORS.woodDark} {...lg} />
      {/* flame — dimming */}
      <g opacity={dim}>
        {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={-18} r={30 - i * 8} fill={COLORS.yellow} opacity={0.3 - i * 0.05} />)}
        <path d="M 0 0 q -16 -14 0 -44 q 16 30 0 44 Z" fill={COLORS.yellow} {...sm} transform="translate(0 -6)" />
      </g>
      <Label t="it's dimming — 'no it isn't'" />
    </g>
  );
};

/** denial-bubble — a flat speech bubble: "that never happened". */
export const DenialBubble: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.96 + 0.04 * Math.sin(f / 5);
  return (
    <g transform={`scale(${pulse})`}>
      <rect x={-130} y={-60} width={260} height={110} rx={22} fill={COLORS.white} {...xl} />
      <path d="M -40 44 L -20 92 L 6 46 Z" fill={COLORS.white} {...xl} />
      <text x={0} y={-16} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>"that never</text>
      <text x={0} y={18} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>happened."</text>
      <Label t="flat denial" />
    </g>
  );
};

/** distorted-mirror — a cracked mirror giving a warped reflection: doubting yourself. */
export const DistortedMirror: React.FC = () => {
  const f = useCurrentFrame();
  const warp = 4 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-70} y={-86} width={140} height={172} rx={70} fill={shade(COLORS.sky, 0.1)} {...xl} />
      <rect x={-58} y={-74} width={116} height={148} rx={58} fill={shade(COLORS.lavender, 0.12)} opacity={0.5} />
      {/* warped reflection of a face */}
      <g transform={`translate(${warp} 0)`}>
        <circle cx={0} cy={-10} r={30} fill={COLORS.skin} opacity={0.8} {...sm} />
        <circle cx={-10} cy={-14} r={4} fill={COLORS.outline} /><circle cx={10} cy={-14} r={4} fill={COLORS.outline} />
        <path d="M -12 2 Q 0 -4 12 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      {/* crack */}
      <path d="M -10 -80 l 14 50 l -20 20 l 18 70" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <text x={30} y={-40} fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>?</text>
      <Label t="is it me?" />
    </g>
  );
};

/** trivialize-shrink — a big feeling being squeezed small: "you're overreacting". */
export const TrivializeShrink: React.FC = () => {
  const f = useCurrentFrame();
  const squeeze = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(f / 14));
  return (
    <g>
      {/* ghost of the real, big feeling */}
      <circle cx={0} cy={0} r={74} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeDasharray="5 9" opacity={0.5} />
      {/* squeezing arrows */}
      <path d="M -120 0 l 36 0 M -84 -12 l 0 24" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 120 0 l -36 0 M 84 -12 l 0 24" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* shrunken feeling */}
      <circle cx={0} cy={0} r={34 * squeeze + 20} fill={COLORS.pink} {...lg} />
      <path d="M 0 14 q -14 -14 -14 -24 q 0 -10 10 -10 q 4 0 4 6 q 0 -6 4 -6 q 10 0 10 10 q 0 10 -14 24 Z" fill={COLORS.white} transform={`scale(${squeeze})`} opacity={0.8} />
      <Label t="'you're overreacting'" />
    </g>
  );
};

/** blame-flip — an accusing arrow curving back onto the victim: blame-shifting. */
export const BlameFlip: React.FC = () => {
  const f = useCurrentFrame();
  const dash = -(f % 24);
  return (
    <g>
      {/* them */}
      <g transform="translate(-80 0)"><circle cx={0} cy={-20} r={28} fill={COLORS.ledGrey} {...lg} /><path d="M -26 40 Q -30 -2 0 -2 Q 30 -2 26 40 Z" fill={COLORS.ledGrey} {...lg} /></g>
      {/* you */}
      <g transform="translate(80 0)"><circle cx={0} cy={-20} r={28} fill={COLORS.skin} {...lg} /><path d="M -26 40 Q -30 -2 0 -2 Q 30 -2 26 40 Z" fill={COLORS.sky} {...lg} /></g>
      {/* the blame boomeranging from them back onto you */}
      <path d="M -50 -40 q 70 -70 130 -8" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray="6 10" strokeDashoffset={dash} />
      <path d="M 70 -58 l 14 10 l -16 8" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <text x={0} y={-86} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.red}>"your fault"</text>
      <Label t="somehow you apologise" />
    </g>
  );
};

/** walking-eggshells — careful feet stepping over cracked eggshells. */
export const WalkingEggshells: React.FC = () => {
  const f = useCurrentFrame();
  const step = 3 * Math.sin(f / 6);
  return (
    <g>
      {/* cautious legs/feet */}
      <g transform={`translate(-20 ${-step})`}><rect x={-10} y={-70} width={20} height={70} rx={8} fill={COLORS.navy} {...lg} /><ellipse cx={6} cy={4} rx={24} ry={11} fill={COLORS.outline} /></g>
      <g transform={`translate(30 ${step})`}><rect x={-10} y={-70} width={20} height={70} rx={8} fill={COLORS.navy} {...lg} /><ellipse cx={6} cy={4} rx={24} ry={11} fill={COLORS.outline} /></g>
      {/* eggshells */}
      {[-96, -48, 2, 54, 102].map((x, i) => <g key={i} transform={`translate(${x} ${34 + (i % 2) * 8})`}><path d="M -20 0 Q -20 -18 0 -18 Q 20 -18 20 0 Z" fill={COLORS.white} {...sm} /><path d="M -12 -6 l 6 6 l -4 4 M 4 -10 l 6 8" stroke={COLORS.outline} strokeWidth={STROKE.sm} fill="none" strokeLinecap="round" /></g>)}
      {/* nervous sweat */}
      <path d="M 40 -84 q -6 8 0 14 q 6 -6 0 -14 Z" fill={COLORS.sky} opacity={0.7} />
      <Label t="walking on eggshells" />
    </g>
  );
};

/** isolation-web — a lone figure as threads to others are cut, one by one. */
export const IsolationWeb: React.FC = () => {
  const f = useCurrentFrame();
  const cut = Math.floor((f / 20) % 5);
  const others = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; return { x: Math.cos(a) * 96, y: Math.sin(a) * 96, gone: i <= cut }; });
  return (
    <g>
      {others.map((o, i) => (
        <g key={i}>
          <line x1={0} y1={0} x2={o.x} y2={o.y} stroke={o.gone ? COLORS.ledGrey : COLORS.greenTeal} strokeWidth={STROKE.sm} strokeDasharray={o.gone ? '4 10' : '0'} opacity={o.gone ? 0.3 : 0.8} />
          <circle cx={o.x} cy={o.y} r={18} fill={o.gone ? COLORS.white : COLORS.greenTeal} opacity={o.gone ? 0.4 : 1} {...sm} />
        </g>
      ))}
      <circle cx={0} cy={0} r={26} fill={COLORS.skin} {...lg} />
      <circle cx={-8} cy={-4} r={4} fill={COLORS.outline} /><circle cx={8} cy={-4} r={4} fill={COLORS.outline} />
      <path d="M -10 10 Q 0 4 10 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="cut off, one by one" />
    </g>
  );
};

/** intermittent-warmth — a cold-warm-cold pulse: the occasional kindness that hooks. */
export const IntermittentWarmth: React.FC = () => {
  const f = useCurrentFrame();
  const warm = (f % 60) < 18;
  return (
    <g>
      {/* the heart that flickers warm then cold */}
      <path d="M 0 40 q -56 -42 -56 -78 q 0 -30 30 -30 q 18 0 26 20 q 8 -20 26 -20 q 30 0 30 30 q 0 36 -56 78 Z" fill={warm ? COLORS.pink : shade(COLORS.sky, -0.04)} transform="translate(0 -4) scale(0.9)" {...xl} />
      {warm
        ? [0, 1, 2].map((i) => <path key={i} d={`M ${-30 + i * 30} -70 q 6 -10 0 -20`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />)
        : [-40, 40].map((x, i) => <path key={i} d={`M ${x} -40 l 8 10 M ${x + 8} -40 l -8 10`} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
      <text x={0} y={-96} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={warm ? COLORS.pinkDark : COLORS.outline}>{warm ? 'sudden warmth' : 'cold again'}</text>
      <Label t="the hook that keeps you" />
    </g>
  );
};

/** reality-journal — an open notebook: writing down what really happened, an anchor. */
export const RealityJournal: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <g>
      <rect x={-90} y={-70} width={180} height={150} rx={10} fill={COLORS.white} {...xl} />
      <line x1={0} y1={-70} x2={0} y2={80} stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      {[0, 1, 2, 3].map((i) => <g key={i}><line x1={-74} y1={-44 + i * 30} x2={-12} y2={-44 + i * 30} stroke={shade(COLORS.sky, -0.08)} strokeWidth={STROKE.sm} /><line x1={12} y1={-44 + i * 30} x2={74} y2={-44 + i * 30} stroke={shade(COLORS.sky, -0.08)} strokeWidth={STROKE.sm} /></g>)}
      {/* a checkmark anchor */}
      <circle cx={0} cy={0} r={30} fill={COLORS.greenTeal} opacity={0.3 + glow * 0.3} />
      <path d="M -14 0 l 8 10 l 18 -22" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      <Label t="write down what happened" />
    </g>
  );
};

/** inner-compass — a compass with the needle pointing firmly back to 'you': trust yourself. */
export const InnerCompass: React.FC = () => {
  const f = useCurrentFrame();
  const wobble = 6 * Math.sin(f / 6) * Math.exp(-(f % 60) / 30);
  return (
    <g>
      <circle cx={0} cy={0} r={74} fill={COLORS.white} {...xl} />
      <circle cx={0} cy={0} r={60} fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      {['N', 'E', 'S', 'W'].map((d, i) => { const a = (i / 4) * Math.PI * 2 - Math.PI / 2; return <text key={i} x={Math.cos(a) * 48} y={Math.sin(a) * 48 + 6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>{d}</text>; })}
      {/* needle pointing to self */}
      <g transform={`rotate(${wobble})`}>
        <path d="M 0 -46 L 10 0 L 0 8 L -10 0 Z" fill={COLORS.red} {...sm} />
        <path d="M 0 46 L 10 0 L 0 -8 L -10 0 Z" fill={shade(COLORS.sky, -0.1)} {...sm} />
      </g>
      <circle cx={0} cy={0} r={7} fill={COLORS.outline} />
      <text x={0} y={-90} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>your reality</text>
      <Label t="trust your own compass" />
    </g>
  );
};
