/**
 * chills.tsx — ALL-NEW art for "Why Music Gives You Chills". What it is
 * (spine-shiver, goosebumps-arm, soundwave-heart), the brain (music-reward-brain,
 * anticipation-peak, expectation-break), the differences (brain-wiring), and the
 * wider feeling (awe-chills, chill-playlist, chills-meter). Token strokes, centered
 * on origin, ~300px tall.
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

/** Spine-shiver — a figure from behind with a shiver running up the spine. */
export const SpineShiver: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 40) / 40; // the shiver travels up
  return (
    <g>
      <path d="M -60 100 Q -64 10 0 4 Q 64 10 60 100 Z" fill={COLORS.hoodie} {...xl} />
      <circle cx={0} cy={-34} r={42} fill={shade(COLORS.skin, 0.04)} {...xl} />
      {/* spine line */}
      <line x1={0} y1={90} x2={0} y2={6} stroke={shade(COLORS.hoodie, -0.1)} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* the travelling shiver spark */}
      <g transform={`translate(0 ${90 - t * 110})`}><path d="M -16 0 l 10 -8 l -4 8 l 12 -6 l -10 10 l 4 -8 Z" fill={COLORS.sky} /><circle cx={0} cy={0} r={6} fill={COLORS.white} opacity={0.8} /></g>
      {/* little chill marks radiating near neck */}
      {[-30, -14, 14, 30].map((x, i) => <path key={i} d={`M ${x} ${-10} q 0 -8 0 -16`} fill="none" stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.4 + 0.5 * Math.sin(f / 4 + i)} />)}
      <Label t="a shiver up the spine" />
    </g>
  );
};

/** Goosebumps-arm — a forearm with raised bumps and standing hairs. */
export const GoosebumpsArm: React.FC = () => {
  const f = useCurrentFrame();
  const up = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {/* forearm */}
      <path d="M -96 36 Q 0 10 96 36 Q 96 70 0 60 Q -96 70 -96 36 Z" fill={COLORS.skin} {...xl} />
      {/* bumps + hairs */}
      {[-70, -42, -14, 14, 42, 70].map((x, i) => (
        <g key={i} transform={`translate(${x} ${26 + (i % 2) * 6})`}>
          <circle cx={0} cy={0} r={5} fill={shade(COLORS.skin, -0.06)} />
          <path d={`M 0 0 q ${2 - up * 2} -10 0 -${10 + up * 8}`} fill="none" stroke={shade(COLORS.outline, 0.3)} strokeWidth={STROKE.sm} strokeLinecap="round" />
        </g>
      ))}
      <Label t="goosebumps rise" />
    </g>
  );
};

/** Soundwave-heart — a sound wave travelling into a glowing heart. */
export const SoundwaveHeart: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      {/* sound wave bars rising toward the heart */}
      {[-96, -76, -56, -36, -16].map((x, i) => { const h = 20 + 40 * Math.abs(Math.sin(f / 5 + i)); return <rect key={i} x={x - 6} y={-h / 2} width={12} height={h} rx={5} fill={COLORS.sky} {...sm} />; })}
      {/* the heart, pulsing */}
      <g transform={`translate(60 0) scale(${1 + g * 0.08})`}><path d="M 0 44 Q -50 -2 -50 -30 Q -50 -66 -16 -66 Q 0 -66 0 -42 Q 0 -66 16 -66 Q 50 -66 50 -30 Q 50 -2 0 44 Z" fill={COLORS.pink} {...xl} /><path d="M -20 -40 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z" fill={COLORS.white} opacity={g} /></g>
      <Label t="music moves the heart" />
    </g>
  );
};

/** Music-reward-brain — a brain lighting up like food/reward from a note. */
export const MusicRewardBrain: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      <path d="M -70 14 Q -86 -44 -40 -58 Q -24 -86 12 -70 Q 50 -82 60 -48 Q 86 -32 68 6 Q 74 42 30 48 Q 0 68 -32 50 Q -72 46 -70 14 Z" fill={COLORS.pink} {...xl} />
      {/* reward centre glowing */}
      <circle cx={6} cy={-14} r={22} fill={COLORS.yellow} opacity={0.5 + g * 0.4} />
      <circle cx={6} cy={-14} r={22} fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} />
      {/* an incoming note */}
      <g transform="translate(-96 -40)"><circle cx={0} cy={14} r={9} fill={COLORS.sky} /><rect x={7} y={-14} width={5} height={26} fill={COLORS.sky} /></g>
      {/* dopamine sparkles */}
      {[[40, -40], [48, 6], [-10, -50]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z`} fill={COLORS.yellow} opacity={g} />)}
      <Label t="music = reward + dopamine" />
    </g>
  );
};

/** Anticipation-peak — a build-up arrow rising to a bursting peak (two hits). */
export const AnticipationPeak: React.FC = () => {
  const f = useCurrentFrame();
  const burst = (f % 60) > 44;
  return (
    <g>
      {/* rising build curve */}
      <path d="M -100 60 Q -30 50 20 -10 L 40 -46" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* anticipation marker partway up */}
      <g transform="translate(-24 30)"><circle cx={0} cy={0} r={12} fill={COLORS.sky} {...sm} /><text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>build</text></g>
      {/* the peak burst */}
      <g transform="translate(50 -56)">{burst && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={i} x1={0} y1={0} x2={Math.cos((i / 8) * Math.PI * 2) * 30} y2={Math.sin((i / 8) * Math.PI * 2) * 30} stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" />)}<circle cx={0} cy={0} r={16} fill={COLORS.yellow} {...sm} /><text x={0} y={46} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>peak!</text></g>
      <Label t="two hits: wanting + having" />
    </g>
  );
};

/** Expectation-break — a predicted dotted line, then a surprising spike. */
export const ExpectationBreak: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <g>
      {/* predicted continuation (dotted, flat) */}
      <path d="M -100 20 L 0 20 L 100 20" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeDasharray="6 10" opacity={0.7} />
      <text x={70} y={44} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>expected</text>
      {/* actual: a surprising jump up */}
      <path d="M -100 20 L 0 20 L 20 -50 L 40 -50" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(30 -50)"><path d="M -12 0 l 4 -12 l 4 12 Z" fill={COLORS.yellow} /><g opacity={g}>{[0, 1, 2].map((i) => <line key={i} x1={14} y1={0} x2={28 + i * 2} y2={-6 + i * 6} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g></g>
      <text x={0} y={-66} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>surprise!</text>
      <Label t="a pleasing surprise" />
    </g>
  );
};

/** Brain-wiring — two brains, one richly linked to its reward heart, one not. */
export const BrainWiring: React.FC = () => (
  <g>
    {[-70, 70].map((x, i) => (
      <g key={i} transform={`translate(${x} 0)`}>
        <path d="M -40 8 Q -50 -26 -22 -34 Q -12 -50 8 -40 Q 30 -48 36 -28 Q 50 -18 40 4 Q 44 26 16 28 Q 0 40 -20 28 Q -42 28 -40 8 Z" fill={COLORS.pink} {...lg} />
        <circle cx={0} cy={48} r={16} fill={COLORS.red} {...sm} />
        {i === 0
          ? [0, 1, 2, 3].map((j) => <line key={j} x1={-14 + j * 10} y1={28} x2={-10 + j * 7} y2={40} stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" />)
          : <line x1={0} y1={28} x2={0} y2={40} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" strokeDasharray="3 5" />}
        <text x={0} y={84} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>{i ? 'few links' : 'many links'}</text>
      </g>
    ))}
    <Label t="chills live in the wiring" />
  </g>
);

/** Awe-chills — a tiny figure before a vast starry vista, chills from awe. */
export const AweChills: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-100} y={-70} width={200} height={140} rx={14} fill={COLORS.wallNight} {...xl} />
      {/* stars */}
      {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={-88 + (i * 53) % 176} cy={-60 + ((i * 37) % 110)} r={2.5} fill={COLORS.white} opacity={0.5 + 0.5 * Math.sin(f / 5 + i)} />)}
      {/* big moon */}
      <circle cx={52} cy={-36} r={26} fill={COLORS.yellowSoft} />
      {/* mountains */}
      <path d="M -100 70 L -50 10 L -10 50 L 40 -4 L 100 60 L 100 70 Z" fill={shade(COLORS.purpleDeep, 0.1)} />
      {/* tiny figure, arms up */}
      <g transform="translate(-30 54)"><circle cx={0} cy={-12} r={8} fill={COLORS.white} /><path d="M 0 -4 l 0 12 M 0 0 l -8 -8 M 0 0 l 8 -8" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="awe gives chills too" />
    </g>
  );
};

/** Chill-playlist — a phone playlist of goosebump-giving songs. */
export const ChillPlaylist: React.FC = () => {
  const f = useCurrentFrame();
  const bar = (i: number) => 10 + 20 * Math.abs(Math.sin(f / 6 + i));
  return (
    <g>
      <rect x={-54} y={-86} width={108} height={176} rx={18} fill={COLORS.wallNightDark} {...xl} />
      <rect x={-44} y={-70} width={88} height={132} rx={8} fill={COLORS.sky} />
      <text x={0} y={-50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>CHILLS ♫</text>
      {[-28, -6, 16, 38].map((y, i) => <g key={i}><rect x={-34} y={y - 6} width={44} height={12} rx={6} fill={COLORS.white} opacity={0.8} /><path d={`M 20 ${y} q -5 -8 -8 0`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} /></g>)}
      {/* equaliser bars */}
      <g transform="translate(0 76)">{[-16, -5, 6, 17].map((x, i) => <rect key={i} x={x - 3} y={-bar(i)} width={6} height={bar(i)} rx={3} fill={COLORS.white} />)}</g>
      <Label t="build your chills playlist" />
    </g>
  );
};

/** Chills-meter — an intensity meter spiking into the goosebump zone. */
export const ChillsMeter: React.FC = () => {
  const f = useCurrentFrame();
  const lvl = 0.5 + 0.45 * Math.sin(f / 6);
  return (
    <g>
      <rect x={-34} y={-90} width={68} height={180} rx={14} fill={shade(COLORS.white, 0.1)} {...xl} />
      {/* zones */}
      <rect x={-28} y={-84} width={56} height={60} rx={8} fill={COLORS.pink} opacity={0.3} />
      <rect x={-28} y={-24} width={56} height={50} rx={8} fill={COLORS.yellow} opacity={0.25} />
      <rect x={-28} y={26} width={56} height={58} rx={8} fill={COLORS.sky} opacity={0.25} />
      {/* fill */}
      <rect x={-22} y={84 - lvl * 166} width={44} height={lvl * 166} rx={8} fill={COLORS.pink} />
      <circle cx={0} cy={84 - lvl * 166} r={16} fill={COLORS.red} {...sm} />
      <text x={54} y={-56} textAnchor="start" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>chills!</text>
      <Label t="the frisson meter" />
    </g>
  );
};
