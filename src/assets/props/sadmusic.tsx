/**
 * sadmusic.tsx — ALL-NEW art for "Why You Love Sad Music". The paradox
 * (reach-for-sad-song, safe-sadness-jar), the comfort (console-wave, song-companion),
 * the not-worse (mood-mirror), the release (cathartic-release, moved-tear-warm), and
 * who/how (empathy-dial-music, sad-playlist-heart, lighter-after). Token strokes,
 * centered on origin, ~300px tall.
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
const Note: React.FC<{ x: number; y: number; c?: string }> = ({ x, y, c = COLORS.sky }) => (
  <g transform={`translate(${x} ${y})`}><circle cx={0} cy={10} r={9} fill={c} /><rect x={7} y={-18} width={5} height={28} fill={c} /></g>
);

/** Reach-for-sad-song — a hand picking the 'sad' song from a list. */
export const ReachForSadSong: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* a little playlist */}
      <rect x={-70} y={-70} width={140} height={150} rx={12} fill={COLORS.white} {...xl} />
      {[-44, -16, 12].map((y, i) => <g key={i}><rect x={-54} y={y - 8} width={108} height={18} rx={6} fill={i === 1 ? COLORS.sky : shade(COLORS.ledGrey, 0.1)} opacity={i === 1 ? 0.8 + g * 0.2 : 0.5} /></g>)}
      {/* a sad note on the chosen one */}
      <g transform="translate(36 -16)"><Note x={0} y={-6} c={COLORS.sky} /><path d="M 0 14 q -4 6 0 10 q 4 -6 0 -10 Z" fill={COLORS.sky} /></g>
      {/* a finger tapping the sad song */}
      <g transform="translate(-30 40)"><path d="M 0 40 Q -4 2 20 -2 L 20 -12 Q 28 -22 36 -12 L 36 -4 Q 50 -6 54 16 Q 58 42 28 50 Z" fill={COLORS.skin} {...lg} strokeLinejoin="round" /></g>
      <Label t="we choose the sad one" />
    </g>
  );
};

/** Safe-sadness-jar — a little blue sadness cloud held safely in a glass. */
export const SafeSadnessJar: React.FC = () => {
  const f = useCurrentFrame();
  const rain = (f * 2) % 30;
  return (
    <g>
      {/* glass jar */}
      <path d="M -54 -40 L -54 60 Q 0 76 54 60 L 54 -40" fill={COLORS.sky} opacity={0.2} {...xl} />
      <ellipse cx={0} cy={-40} rx={54} ry={14} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} />
      <rect x={-60} y={-52} width={120} height={16} rx={6} fill={shade(COLORS.sky, -0.08)} {...lg} />
      {/* a little rain-cloud of sadness inside, contained */}
      <g transform="translate(0 -6)"><ellipse cx={0} cy={0} rx={34} ry={20} fill={COLORS.sky} {...sm} />{[-14, 0, 14].map((x, i) => <line key={i} x1={x} y1={18} x2={x - 2} y2={18 + ((rain + i * 8) % 24)} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.7} />)}</g>
      <Label t="sadness, safely contained" />
    </g>
  );
};

/** Console-wave — sad notes triggering a warm, comforting wave over a heart. */
export const ConsoleWave: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 90) / 90;
  return (
    <g>
      {/* heart */}
      <path d="M 0 48 Q -56 -8 -56 -40 Q -56 -82 -18 -82 Q 0 -82 0 -54 Q 0 -82 18 -82 Q 56 -82 56 -40 Q 56 -8 0 48 Z" fill={COLORS.pink} {...xl} />
      {/* a sad note entering */}
      <Note x={-84} y={-40} c={COLORS.sky} />
      {/* a warm comforting wave radiating */}
      <circle cx={0} cy={-20} r={40 + t * 50} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} opacity={1 - t} />
      <path d="M -20 -30 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z" fill={COLORS.white} opacity={0.8} />
      <Label t="it switches on comfort" />
    </g>
  );
};

/** Song-companion — a music note sitting beside you like a friend. */
export const SongCompanion: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* you, a bit low */}
      <g transform="translate(-44 6)"><circle cx={0} cy={0} r={38} fill={COLORS.white} {...xl} /><circle cx={-12} cy={-4} r={5} fill={COLORS.outline} /><circle cx={12} cy={-4} r={5} fill={COLORS.outline} /><path d="M -12 18 Q 0 12 12 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* a friendly note beside, an arm-around feel */}
      <g transform="translate(44 6)"><circle cx={0} cy={0} r={34} fill={COLORS.sky} {...xl} /><circle cx={-6} cy={10} r={12} fill={COLORS.outline} /><rect x={3} y={-26} width={6} height={34} fill={COLORS.outline} /><path d="M 9 -26 q 16 -4 16 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      {/* a warm link between them */}
      <path d="M -14 -14 Q 0 -30 14 -14" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.7 + g * 0.3} />
      <Label t="'someone else feels this'" />
    </g>
  );
};

/** Mood-mirror — your sad face matched by a sad note, feeling seen. */
export const MoodMirror: React.FC = () => (
  <g>
    {/* your sad face */}
    <g transform="translate(-54 0)"><circle cx={0} cy={0} r={40} fill={COLORS.white} {...xl} /><circle cx={-13} cy={-4} r={5} fill={COLORS.outline} /><circle cx={13} cy={-4} r={5} fill={COLORS.outline} /><path d="M -14 22 Q 0 12 14 22" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
    {/* an equals sign */}
    <line x1={-14} y1={-6} x2={14} y2={-6} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" /><line x1={-14} y1={10} x2={14} y2={10} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* the matching sad song */}
    <g transform="translate(56 0)"><circle cx={0} cy={0} r={40} fill={COLORS.sky} opacity={0.5} {...xl} /><Note x={-10} y={-14} c={COLORS.outline} /><path d="M -12 20 Q 0 12 12 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
    <Label t="it matches, and validates" />
  </g>
);

/** Cathartic-release — a valve releasing pent-up feeling gently. */
export const CatharticRelease: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 60) / 60;
  return (
    <g>
      {/* a heart under pressure, a valve opening */}
      <path d="M 0 40 Q -50 -6 -50 -36 Q -50 -74 -16 -74 Q 0 -74 0 -48 Q 0 -74 16 -74 Q 50 -74 50 -36 Q 50 -6 0 40 Z" fill={COLORS.pink} {...xl} />
      <g transform="translate(40 -56)"><rect x={-8} y={0} width={16} height={16} rx={4} fill={COLORS.ledGrey} {...sm} /></g>
      {/* released feeling floating up and away as soft notes */}
      {[0, 1, 2].map((i) => { const p = ((t + i / 3) % 1); return <g key={i} transform={`translate(${44 + p * 14} ${-56 - p * 60})`} opacity={1 - p}><Note x={0} y={0} c={COLORS.sky} /></g>; })}
      <Label t="a gentle release" />
    </g>
  );
};

/** Moved-tear-warm — a face with a tear and a warm glow: being moved. */
export const MovedTearWarm: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      <circle cx={0} cy={0} r={62} fill={COLORS.yellowSoft} opacity={0.3 + g * 0.2} />
      <circle cx={0} cy={0} r={48} fill={COLORS.white} {...xl} />
      {/* gentle moved expression */}
      <path d="M -26 -8 Q -18 -16 -10 -8 M 10 -8 Q 18 -16 26 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -12 18 Q 0 12 12 18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* a single tear + a warm chill spark */}
      <path d="M -30 4 q -6 9 0 18 q 6 -8 0 -18 Z" fill={COLORS.sky} {...sm} />
      <path d="M 40 -28 l 3 9 l 9 3 l -9 3 l -3 9 l -3 -9 l -9 -3 l 9 -3 Z" fill={COLORS.yellow} opacity={g} />
      <Label t="the bittersweet, moving kind" />
    </g>
  );
};

/** Empathy-dial-music — a dial of empathy turned up, more moved by music. */
export const EmpathyDialMusic: React.FC = () => {
  const f = useCurrentFrame();
  const deg = 130 + 20 * Math.sin(f / 7);
  const rad = (deg - 90) * (Math.PI / 180);
  return (
    <g>
      <path d="M -90 10 A 90 90 0 0 1 90 10" fill="none" stroke={shade(COLORS.outline, 0.4)} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -90 10 A 90 90 0 0 1 90 10" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" strokeDasharray={`${(deg / 180) * Math.PI * 90} 999`} />
      <line x1={0} y1={10} x2={Math.cos(rad) * 70} y2={10 + Math.sin(rad) * 70} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={10} r={12} fill={COLORS.outline} />
      <Note x={70} y={-50} c={COLORS.pink} />
      <text x={-90} y={40} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>low</text>
      <text x={90} y={40} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>high empathy</text>
      <Label t="empathy turns it up" />
    </g>
  );
};

/** Sad-playlist-heart — a phone playing a curated sad playlist. */
export const SadPlaylistHeart: React.FC = () => {
  const f = useCurrentFrame();
  const bar = (i: number) => 8 + 18 * Math.abs(Math.sin(f / 7 + i));
  return (
    <g>
      <rect x={-54} y={-86} width={108} height={176} rx={18} fill={COLORS.wallNightDark} {...xl} />
      <rect x={-44} y={-70} width={88} height={132} rx={8} fill={COLORS.sky} opacity={0.7} />
      <path d="M 0 -34 q -10 -12 -17 -1 q -5 8 17 20 q 22 -12 17 -20 q -7 -11 -17 1 Z" fill={COLORS.pink} />
      <text x={0} y={16} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>sad songs</text>
      <g transform="translate(0 46)">{[-16, -5, 6, 17].map((x, i) => <rect key={i} x={x - 3} y={-bar(i)} width={6} height={bar(i)} rx={3} fill={COLORS.outline} />)}</g>
      <Label t="your comfort playlist" />
    </g>
  );
};

/** Lighter-after — a face lighter and brighter after a good sad listen. */
export const LighterAfter: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.6 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      <circle cx={0} cy={0} r={52} fill={COLORS.white} {...xl} />
      {/* a gentle, relieved smile */}
      <path d="M -24 -10 Q -16 -18 -8 -10 M 8 -10 Q 16 -18 24 -10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -20 16 Q 0 32 20 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* lightness rising */}
      {[[-60, 20], [62, 10], [-50, -40], [56, -44]].map(([x, y], i) => <circle key={i} cx={x} cy={y + Math.sin(f / 5 + i) * 6} r={6} fill={COLORS.yellowSoft} opacity={g} />)}
      <Label t="lighter afterward" />
    </g>
  );
};
