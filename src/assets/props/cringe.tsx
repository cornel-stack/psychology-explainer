/**
 * cringe.tsx — ALL-NEW art for "Why You Cringe at Old Memories". What's happening
 * (cringe-replay, self-audience, burned-in-memory), why it sticks (social-threat-alarm),
 * why it ambushes (shower-ambush, idle-mind-surfacing), the cruelty (spotlight-nobody,
 * exaggerate-magnifier), and the reframe (cringe-means-care, defuse-float). Token
 * strokes, centered on origin, ~300px tall.
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

/** Cringe-replay — a face wincing, hands half-covering, an old memory replaying. */
export const CringeReplay: React.FC = () => {
  const f = useCurrentFrame();
  const wince = 2 * Math.sin(f / 3);
  return (
    <g>
      <g transform={`translate(${wince} 0)`}>
        <circle cx={0} cy={0} r={58} fill={shade(COLORS.skin, 0.02)} {...xl} />
        {/* scrunched eyes */}
        <path d="M -34 -10 Q -22 -2 -10 -10 M 10 -10 Q 22 -2 34 -10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        {/* gritted grimace */}
        <path d="M -24 24 L 24 24 M -24 18 L 24 18 M -18 18 L -18 30 M -6 18 L -6 30 M 6 18 L 6 30 M 18 18 L 18 30" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        {/* blush of embarrassment */}
        <ellipse cx={-34} cy={8} rx={12} ry={8} fill={COLORS.pink} opacity={0.7} /><ellipse cx={34} cy={8} rx={12} ry={8} fill={COLORS.pink} opacity={0.7} />
      </g>
      {/* a replay bubble popping in */}
      <g transform="translate(66 -58)"><circle cx={0} cy={0} r={24} fill={COLORS.white} {...lg} /><path d="M -8 -6 l 14 6 l -14 6 Z" fill={COLORS.red} /></g>
      <Label t="that memory, again" />
    </g>
  );
};

/** Self-audience — a lone figure surrounded by imagined judging eyes. */
export const SelfAudience: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* the self, small and exposed */}
      <circle cx={0} cy={6} r={40} fill={COLORS.white} {...xl} />
      <path d="M -14 14 Q 0 6 14 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <circle cx={-13} cy={-2} r={5} fill={COLORS.outline} /><circle cx={13} cy={-2} r={5} fill={COLORS.outline} />
      {/* imagined judging eyes floating around */}
      {[[-100, -40], [100, -44], [-108, 40], [108, 36], [0, -78]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity={0.5 + 0.4 * Math.sin(f / 5 + i)}>
          <path d="M -22 0 Q 0 -14 22 0 Q 0 14 -22 0 Z" fill={COLORS.white} {...sm} />
          <circle cx={0} cy={0} r={8} fill={COLORS.lavenderDark} /><circle cx={0} cy={0} r={4} fill={COLORS.outline} />
        </g>
      ))}
      <Label t="an imagined audience" />
    </g>
  );
};

/** Burned-in-memory — one memory card scorched/branded far brighter than the rest. */
export const BurnedInMemory: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* faded neutral memories */}
      {[[-70, -30], [66, -36], [-60, 44]].map(([x, y], i) => <rect key={i} x={(x as number) - 26} y={(y as number) - 20} width={52} height={40} rx={5} fill={COLORS.white} {...sm} opacity={0.4} transform={`rotate(${i * 12 - 12} ${x} ${y})`} />)}
      {/* the one bold, burned-in cringe memory */}
      <g transform="translate(8 2)">
        <rect x={-44} y={-34} width={88} height={68} rx={8} fill={COLORS.red} {...xl} />
        <path d="M -26 -14 Q 0 -6 26 -14 M -20 6 Q 0 14 20 6" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" fill="none" />
        {/* glowing edges */}
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M ${Math.cos((i / 6) * Math.PI * 2) * 54} ${Math.sin((i / 6) * Math.PI * 2) * 44} l ${Math.cos((i / 6) * Math.PI * 2) * 12} ${Math.sin((i / 6) * Math.PI * 2) * 10}`} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={g} />)}
      </g>
      <Label t="burned in extra deep" />
    </g>
  );
};

/** Social-threat-alarm — a figure at the edge of a group, an alarm over belonging. */
export const SocialThreatAlarm: React.FC = () => {
  const f = useCurrentFrame();
  const ring = Math.abs(Math.sin(f / 4));
  return (
    <g>
      {/* the group circle */}
      {[-60, -20, 20].map((x, i) => <circle key={i} cx={x} cy={10} r={24} fill={[COLORS.sky, COLORS.greenLeaf, COLORS.yellow][i]} {...lg} />)}
      {/* the excluded one, pushed to the edge */}
      <g transform="translate(78 10)"><circle cx={0} cy={0} r={24} fill={COLORS.white} {...lg} /><path d="M -10 8 Q 0 2 10 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* a dotted gap showing exclusion */}
      <line x1={44} y1={10} x2={54} y2={10} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeDasharray="3 5" />
      {/* alarm over the lone one */}
      <g transform="translate(78 -44)" opacity={0.5 + 0.5 * ring}><path d="M -16 14 Q -16 -14 0 -16 Q 16 -14 16 14 Z" fill={COLORS.red} {...sm} /><circle cx={0} cy={22} r={5} fill={COLORS.redDark} /></g>
      <Label t="a threat to belonging" />
    </g>
  );
};

/** Shower-ambush — a shower head, and an intrusive cringe bubble barging in. */
export const ShowerAmbush: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* shower head + water */}
      <rect x={-50} y={-80} width={60} height={18} rx={8} fill={COLORS.ledGrey} {...lg} transform="rotate(20 -20 -70)" />
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-44 + i * 14} y1={-54} x2={-50 + i * 14} y2={-10 + (f * 2 + i * 10) % 20} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />)}
      {/* calm person */}
      <g transform="translate(10 30)"><circle cx={0} cy={0} r={34} fill={COLORS.white} {...xl} /><path d="M -22 -6 Q -16 -14 -8 -8 M 8 -8 Q 16 -14 22 -6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* the cringe bubble crashing in */}
      <g transform={`translate(66 -20) scale(${0.9 + 0.1 * Math.sin(f / 3)})`}><path d="M 0 48 Q -46 2 -46 -22 Q -46 -56 -14 -56 Q 0 -56 0 -38 Q 0 -56 14 -56 Q 46 -56 46 -22 Q 46 2 0 48 Z" fill={COLORS.red} opacity={0.85} /><text x={0} y={-10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.white}>!</text></g>
      <Label t="ambushed in the shower" />
    </g>
  );
};

/** Idle-mind-surfacing — a calm brain at rest, old memories bubbling up. */
export const IdleMindSurfacing: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* a resting head */}
      <circle cx={0} cy={20} r={50} fill={COLORS.white} {...xl} />
      <path d="M -22 8 Q -16 0 -8 6 M 8 6 Q 16 0 22 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -12 34 Q 0 40 12 34" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* old memory bubbles floating up from a 'pond' */}
      {[0, 1, 2, 3].map((i) => { const p = ((f + i * 22) % 90) / 90; const x = -56 + i * 36; const y = 70 - p * 120; return <g key={i} transform={`translate(${x} ${y})`} opacity={0.4 + (1 - p) * 0.5}><circle cx={0} cy={0} r={14 - p * 4} fill="none" stroke={i % 2 ? COLORS.red : COLORS.lavenderDark} strokeWidth={STROKE.sm} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={i % 2 ? COLORS.red : COLORS.lavenderDark}>{i % 2 ? '!' : '?'}</text></g>; })}
      <Label t="idle minds dig up the past" />
    </g>
  );
};

/** Spotlight-nobody — a spotlight on you, the crowd all looking elsewhere. */
export const SpotlightNobody: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.3 + 0.2 * Math.sin(f / 8);
  return (
    <g>
      {/* spotlight */}
      <path d="M 0 -94 L -70 60 L 70 60 Z" fill={COLORS.yellowSoft} opacity={0.3 + g} />
      {/* you, self-conscious */}
      <g transform="translate(0 20)"><circle cx={0} cy={0} r={32} fill={COLORS.white} {...xl} /><ellipse cx={-14} cy={6} rx={8} ry={5} fill={COLORS.pink} opacity={0.7} /><ellipse cx={14} cy={6} rx={8} ry={5} fill={COLORS.pink} opacity={0.7} /><path d="M -10 14 Q 0 8 10 14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* crowd, all facing AWAY / busy */}
      {[-130, -92, 92, 130].map((x, i) => <g key={i} transform={`translate(${x} 36)`}><circle cx={0} cy={0} r={22} fill={shade(COLORS.ledGrey, 0.1)} {...lg} /><circle cx={0} cy={-26} r={10} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} /></g>)}
      <Label t="nobody else is watching" />
    </g>
  );
};

/** Exaggerate-magnifier — a tiny blunder blown up huge under a magnifier. */
export const ExaggerateMagnifier: React.FC = () => (
  <g>
    {/* tiny real blunder */}
    <circle cx={-60} cy={30} r={6} fill={COLORS.red} />
    <text x={-60} y={58} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>real</text>
    {/* magnifier blowing it up */}
    <g transform="translate(30 -6)">
      <circle cx={0} cy={0} r={56} fill={COLORS.sky} opacity={0.2} {...xl} />
      <circle cx={0} cy={0} r={34} fill={COLORS.red} />
      <text x={0} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.white}>!</text>
      <line x1={40} y1={40} x2={78} y2={78} stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
    </g>
    <text x={30} y={70} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>how you remember it</text>
    <Label t="memory makes it bigger" />
  </g>
);

/** Cringe-means-care — a wincing face wrapped in a warm heart: it means you care. */
export const CringeMeansCare: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <path d="M 0 70 Q -80 -4 -80 -42 Q -80 -92 -28 -92 Q 0 -92 0 -60 Q 0 -92 28 -92 Q 80 -92 80 -42 Q 80 -4 0 70 Z" fill={COLORS.pink} opacity={0.4 + g * 0.2} {...xl} />
      {/* a small caring face inside */}
      <circle cx={0} cy={-26} r={34} fill={COLORS.white} {...lg} />
      <path d="M -20 -36 Q -12 -42 -6 -36 M 6 -36 Q 12 -42 20 -36" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -12 -14 Q 0 -8 12 -14" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <Label t="cringing means you care" />
    </g>
  );
};

/** Defuse-float — a cringe thought-bubble released to float gently away. */
export const DefuseFloat: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (f % 80) / 80;
  return (
    <g>
      {/* an open, relaxed hand letting go */}
      <path d="M -70 70 Q -74 20 -44 16 L -44 6 Q -36 -4 -28 6 L -28 14 Q -20 -8 -12 6 L -12 16 Q 2 10 6 30 Q 10 56 -16 68 Z" fill={COLORS.skin} {...lg} strokeLinejoin="round" />
      {/* the cringe balloon drifting up and away */}
      <g transform={`translate(${20 + rise * 20} ${30 - rise * 110})`} opacity={1 - rise * 0.7}>
        <circle cx={0} cy={0} r={34} fill={COLORS.red} opacity={0.5} {...lg} />
        <text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.white}>!</text>
        <path d="M 0 34 l -6 12 l 10 -2 l -4 12" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />
      </g>
      <Label t="just a thought, let it float" />
    </g>
  );
};
