/**
 * selftalk.tsx — ALL-NEW art for "Why You Talk to Yourself". It's normal & where it
 * comes from (talking-aloud, kid-private-speech, inner-voice-bubble), what it does
 * (rubber-duck, lost-keys-found, hype-coach), the tricks (name-megaphone, inner-critic,
 * inner-coach) and the variation (quiet-mind). Token strokes, centered on origin,
 * ~300px tall.
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
const Head: React.FC<{ r?: number; c?: string; happy?: boolean }> = ({ r = 40, c = COLORS.white, happy = true }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={c} {...xl} />
    <circle cx={-r * 0.3} cy={-r * 0.06} r={r * 0.11} fill={COLORS.outline} /><circle cx={r * 0.3} cy={-r * 0.06} r={r * 0.11} fill={COLORS.outline} />
    {happy
      ? <path d={`M ${-r * 0.26} ${r * 0.34} Q 0 ${r * 0.52} ${r * 0.26} ${r * 0.34}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : <ellipse cx={0} cy={r * 0.4} rx={r * 0.14} ry={r * 0.18} fill={COLORS.outline} />}
  </g>
);

/** Talking-aloud — a head mid-sentence, a speech bubble curling back to itself. */
export const TalkingAloud: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <Head r={48} happy={false} />
      {/* an open talking mouth */}
      <ellipse cx={0} cy={22} rx={12} ry={8} fill={COLORS.outline} />
      {/* speech bubble that loops back to the ear */}
      <g transform="translate(74 -40)" opacity={g}><rect x={-40} y={-28} width={80} height={48} rx={14} fill={COLORS.sky} {...lg} /><path d="M -30 20 l -14 18 l 24 -8 Z" fill={COLORS.sky} {...sm} /><text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.white}>...me</text></g>
      <path d="M 44 -24 Q 80 -10 50 14" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeDasharray="4 6" />
      <Label t="chatting with yourself" />
    </g>
  );
};

/** Kid-private-speech — a small child narrating a block task out loud. */
export const KidPrivateSpeech: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* little kid */}
      <g transform="translate(-30 0)"><circle cx={0} cy={-20} r={34} fill={COLORS.white} {...xl} /><circle cx={-10} cy={-22} r={5} fill={COLORS.outline} /><circle cx={10} cy={-22} r={5} fill={COLORS.outline} /><ellipse cx={0} cy={-4} rx={7} ry={5} fill={COLORS.outline} /><path d="M -30 60 Q 0 6 30 60 Z" fill={COLORS.hoodie} {...lg} /></g>
      {/* blocks being stacked */}
      <g transform="translate(40 40)"><rect x={-20} y={-20} width={40} height={30} rx={4} fill={COLORS.red} {...sm} /><rect x={-16} y={-50} width={32} height={30} rx={4} fill={COLORS.sky} {...sm} /><rect x={-12} y={-78} width={24} height={30} rx={4} fill={COLORS.yellow} {...sm} /></g>
      {/* narration bubble */}
      <g transform="translate(30 -66)" opacity={0.7 + 0.3 * Math.sin(f / 5)}><rect x={-44} y={-22} width={92} height={40} rx={12} fill={COLORS.white} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.outline}>red on top!</text></g>
      <Label t="kids narrate out loud" />
    </g>
  );
};

/** Inner-voice-bubble — a head with a speech bubble glowing inside it. */
export const InnerVoiceBubble: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <circle cx={0} cy={0} r={72} fill={COLORS.white} {...xl} />
      {/* the inner speech bubble inside the head */}
      <g opacity={0.6 + g * 0.4}><rect x={-44} y={-30} width={88} height={54} rx={16} fill={COLORS.lavender} {...lg} /><path d="M -22 24 l -8 16 l 20 -8 Z" fill={COLORS.lavender} {...sm} /><text x={0} y={4} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.white}>...</text></g>
      {/* little face below */}
      <circle cx={-24} cy={44} r={4} fill={COLORS.outline} /><circle cx={24} cy={44} r={4} fill={COLORS.outline} />
      <Label t="the silent inner voice" />
    </g>
  );
};

/** Rubber-duck — a debugging duck you explain the problem to. */
export const RubberDuck: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      {/* the duck */}
      <ellipse cx={0} cy={30} rx={56} ry={40} fill={COLORS.yellow} {...xl} />
      <circle cx={-6} cy={-18} r={30} fill={COLORS.yellow} {...xl} />
      <circle cx={-14} cy={-24} r={5} fill={COLORS.outline} />
      <path d="M -36 -18 l -24 6 l 24 8 Z" fill={shade(COLORS.yellowDark, 0.1)} {...sm} />
      <ellipse cx={20} cy={34} rx={20} ry={14} fill={shade(COLORS.yellow, 0.1)} />
      {/* you explaining to it */}
      <g transform="translate(78 -40)" opacity={g}><rect x={-34} y={-24} width={72} height={44} rx={12} fill={COLORS.sky} {...lg} /><text x={0} y={4} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>so...</text></g>
      <Label t="explain it, and solve it" />
    </g>
  );
};

/** Lost-keys-found — saying "keys, keys" and a glowing found set of keys. */
export const LostKeysFound: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      <Head r={40} />
      <ellipse cx={0} cy={20} rx={8} ry={6} fill={COLORS.outline} />
      {/* 'keys keys' bubble */}
      <g transform="translate(66 -46)"><rect x={-40} y={-22} width={82} height={40} rx={12} fill={COLORS.sky} {...lg} /><text x={0} y={4} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={15} fill={COLORS.white}>keys, keys</text></g>
      {/* found keys glowing */}
      <g transform="translate(-70 44)"><circle cx={0} cy={0} r={22} fill={COLORS.yellowSoft} opacity={g} /><circle cx={-6} cy={-6} r={10} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} /><rect x={0} y={0} width={6} height={22} fill={COLORS.yellowDark} /><rect x={6} y={14} width={8} height={4} fill={COLORS.yellowDark} /></g>
      <Label t="it even helps you search" />
    </g>
  );
};

/** Hype-coach — a cheering coach-version of yourself, pom or whistle. */
export const HypeCoach: React.FC = () => {
  const f = useCurrentFrame();
  const bounce = 4 * Math.sin(f / 4);
  return (
    <g transform={`translate(0 ${bounce})`}>
      <Head r={44} />
      {/* raised cheering arms */}
      <path d="M -40 30 L -74 -16 M 40 30 L 74 -16" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={-74} cy={-20} r={12} fill={COLORS.skin} {...sm} /><circle cx={74} cy={-20} r={12} fill={COLORS.skin} {...sm} />
      {/* sweatband */}
      <rect x={-46} y={-38} width={92} height={16} rx={8} fill={COLORS.red} {...sm} />
      {/* 'you got this!' bubble */}
      <g transform="translate(0 -84)"><rect x={-70} y={-24} width={140} height={44} rx={14} fill={COLORS.greenLeaf} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>you got this!</text><path d="M -10 20 l 0 14 l 12 -10 Z" fill={COLORS.greenLeaf} /></g>
      <Label t="your own hype coach" />
    </g>
  );
};

/** Name-megaphone — calling yourself by name through a megaphone. */
export const NameMegaphone: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 4);
  return (
    <g>
      <Head r={40} />
      {/* megaphone */}
      <g transform="translate(40 16) rotate(-20)"><path d="M 0 -16 L 48 -30 L 48 30 L 0 16 Z" fill={COLORS.red} {...lg} /><rect x={-16} y={-14} width={18} height={28} rx={4} fill={shade(COLORS.red, 0.1)} {...sm} /></g>
      {/* sound rings + name */}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${92 + i * 10} ${-24 - i * 6} q 16 ${24 + i * 6} 0 ${48 + i * 12}`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={g * (1 - i * 0.25)} />)}
      <text x={0} y={-66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>"You've got this!"</text>
      <Label t="say your own name" />
    </g>
  );
};

/** Inner-critic — a small harsh gremlin voice scowling at you. */
export const InnerCritic: React.FC = () => {
  const f = useCurrentFrame();
  const jit = 2 * Math.sin(f);
  return (
    <g transform={`translate(${jit} 0)`}>
      {/* spiky dark critic blob */}
      <path d="M 0 -56 l 14 18 l 22 -6 l -6 22 l 18 14 l -18 14 l 6 22 l -22 -6 l -14 18 l -14 -18 l -22 6 l 6 -22 l -18 -14 l 18 -14 l -6 -22 l 22 6 Z" fill={shade(COLORS.outline, 0.3)} {...lg} />
      <path d="M -16 -8 l 12 6 M 16 -8 l -12 6" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -14 18 Q 0 8 14 18" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <g transform="translate(0 -74)"><rect x={-56} y={-20} width={112} height={36} rx={10} fill={COLORS.red} {...sm} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>"idiot!"</text></g>
      <Label t="the inner critic" />
    </g>
  );
};

/** Inner-coach — a warm, kind coaching voice. */
export const InnerCoach: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <circle cx={0} cy={0} r={52} fill={COLORS.greenLeaf} opacity={0.4 + g * 0.2} {...xl} />
      <circle cx={-16} cy={-6} r={6} fill={COLORS.outline} /><circle cx={16} cy={-6} r={6} fill={COLORS.outline} />
      <path d="M -18 16 Q 0 30 18 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <g transform="translate(0 -78)"><rect x={-74} y={-22} width={148} height={40} rx={12} fill={COLORS.greenLeaf} {...lg} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>"you can do this"</text></g>
      <Label t="the inner coach" />
    </g>
  );
};

/** Quiet-mind — a head with an empty, calm bubble: no inner monologue. */
export const QuietMind: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={72} fill={COLORS.white} {...xl} />
    {/* an empty bubble inside */}
    <rect x={-40} y={-26} width={80} height={48} rx={16} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeDasharray="6 8" />
    <circle cx={-24} cy={44} r={4} fill={COLORS.outline} /><circle cx={24} cy={44} r={4} fill={COLORS.outline} />
    {/* a calm zigzag of 'no words' */}
    <path d="M -20 -2 L -6 -2 M 6 -2 L 20 -2" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <Label t="some minds are quiet" />
  </g>
);
