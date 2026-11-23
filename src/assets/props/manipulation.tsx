/**
 * manipulation.tsx — literal scene props for the "Every Manipulation Tactic"
 * video. Local origin (0,0), token strokes (7/10/14 or >=15), flat two-tone.
 * Each is a tactic's signature image (puppet strings = control, sheep mask =
 * hidden intent, gas lamp = gaslighting, etc.).
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A marionette control bar with strings dangling down (being controlled).
 *  Place it ABOVE a mascot so the strings appear to pull them. */
export const PuppetStrings: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 22) * 6;
  return (
    <g transform={`rotate(${sway * 0.3})`}>
      {/* control cross */}
      <rect x={-150} y={-20} width={300} height={26} rx={10} fill={COLORS.woodDark} {...xl} />
      <rect x={-13} y={-80} width={26} height={120} rx={10} fill={COLORS.woodDark} {...lg} />
      {/* strings to 4 hook points */}
      {[-150, -50, 50, 150].map((x, i) => (
        <line key={i} x1={x} y1={0} x2={x * 0.8 + sway} y2={300} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      ))}
      {/* little cross grip */}
      <circle cx={0} cy={-80} r={14} fill={COLORS.wood} {...lg} />
    </g>
  );
};

/** A sheep mask on a handle, with a wolf ear + fang peeking behind (wolf in
 *  sheep's clothing — the hidden intent / false face). */
export const SheepMask: React.FC = () => (
  <g>
    {/* wolf hint behind */}
    <path d="M 70 -120 L 120 -170 L 130 -96 Z" fill={COLORS.ledGrey} {...lg} />
    <path d="M 96 40 L 150 70 L 110 92 Z" fill={COLORS.ledGrey} {...lg} />
    {/* sheep face */}
    <path d="M -110 -40 Q -140 -120 -60 -130 Q -20 -180 40 -140 Q 130 -150 120 -50 Q 150 30 70 60 Q 20 110 -40 70 Q -130 50 -110 -40 Z" fill={COLORS.white} {...xl} />
    {/* wooly curls */}
    {[[-90, -70], [-70, -120], [10, -150], [90, -110], [100, -20], [50, 60], [-50, 70]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={26} fill={shade(COLORS.white, 0.06)} {...sm} />
    ))}
    {/* face */}
    <ellipse cx={-10} cy={-10} rx={70} ry={74} fill={COLORS.bgCreamDark} {...lg} />
    <circle cx={-34} cy={-20} r={10} fill={COLORS.outline} />
    <circle cx={14} cy={-20} r={10} fill={COLORS.outline} />
    <ellipse cx={-10} cy={22} rx={20} ry={14} fill={COLORS.pink} {...sm} />
    {/* handle */}
    <rect x={-14} y={70} width={28} height={140} rx={10} fill={COLORS.woodDark} {...lg} />
  </g>
);

/** An old gas street-lamp with a flickering flame (the literal root of
 *  "gaslighting" — making you doubt what you see). */
export const GaslightLamp: React.FC = () => {
  const f = useCurrentFrame();
  const flick = Math.sin(f / 2.5) > 0.4 ? 1 : 0.4;
  return (
    <g>
      {/* post */}
      <rect x={-16} y={40} width={32} height={210} rx={10} fill={COLORS.shirtDark} {...xl} />
      <rect x={-54} y={240} width={108} height={24} rx={8} fill={COLORS.shirtDark} {...lg} />
      {/* lantern housing */}
      <path d="M -70 40 L 70 40 L 50 -70 L -50 -70 Z" fill={COLORS.shirtDarker} {...xl} />
      <rect x={-56} y={-70} width={112} height={110} rx={8} fill={COLORS.sky} opacity={0.3} />
      <path d="M -56 -70 L 56 -70 M 0 -70 L 0 40 M -50 -20 L 50 -20" stroke={COLORS.shirtDark} strokeWidth={STROKE.sm} />
      {/* top cap */}
      <path d="M -70 -70 L 70 -70 L 40 -110 L -40 -110 Z" fill={COLORS.shirtDark} {...lg} />
      {/* flame */}
      <g opacity={flick}>
        <path d="M 0 30 Q -22 -4 0 -40 Q 22 -4 0 30 Z" fill={COLORS.yellow} {...sm} />
        <path d="M 0 20 Q -10 0 0 -20 Q 10 0 0 20 Z" fill={COLORS.red} />
        <ellipse cx={0} cy={-6} rx={44} ry={50} fill={COLORS.yellowSoft} opacity={0.4 * flick} />
      </g>
    </g>
  );
};

/** A ball and chain (obligation / guilt dragging you down). */
export const GuiltChain: React.FC<{ label?: string }> = ({ label = 'GUILT' }) => (
  <g>
    {/* chain */}
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={i} cx={-120 + i * 30} cy={-120 + i * 34} rx={18} ry={26} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} transform={`rotate(${i % 2 ? 40 : -40} ${-120 + i * 30} ${-120 + i * 34})`} />
    ))}
    {/* iron ball */}
    <circle cx={10} cy={70} r={96} fill={COLORS.shirtDark} {...xl} />
    <circle cx={-24} cy={38} r={26} fill={shade(COLORS.shirtDark, -0.4)} opacity={0.5} />
    <text x={10} y={84} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.white}>{label}</text>
  </g>
);

/** A countdown timer glowing red (scarcity / urgency — "now or never"). */
export const CountdownTimer: React.FC<{ label?: string }> = ({ label = '00:59' }) => {
  const f = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(f / 10));
  return (
    <g>
      <circle cx={0} cy={0} r={118} fill={COLORS.red} opacity={0.18 * pulse} />
      <rect x={-130} y={-80} width={260} height={160} rx={28} fill={COLORS.shirtDark} {...xl} />
      <rect x={-106} y={-56} width={212} height={112} rx={14} fill={COLORS.outline} {...lg} />
      <text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={76} fill={COLORS.red}>{label}</text>
      {/* top buttons */}
      <rect x={-40} y={-100} width={80} height={24} rx={10} fill={COLORS.ledGrey} {...sm} />
    </g>
  );
};

/** A sports goalpost on little wheels (moving the goalposts — the target keeps
 *  sliding away so you can never win). */
export const Goalpost: React.FC = () => {
  const f = useCurrentFrame();
  const roll = Math.sin(f / 16) * 14;
  return (
    <g transform={`translate(${roll} 0)`}>
      <rect x={-130} y={-160} width={30} height={300} rx={8} fill={COLORS.white} {...xl} />
      <rect x={100} y={-160} width={30} height={300} rx={8} fill={COLORS.white} {...xl} />
      <rect x={-130} y={-180} width={260} height={30} rx={8} fill={COLORS.white} {...xl} />
      {/* net hint */}
      <path d="M -100 -150 L 100 -150 M -100 -100 L 100 -100 M -100 -50 L 100 -50 M -70 -170 L -70 100 M 0 -170 L 0 100 M 70 -170 L 70 100" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} opacity={0.6} />
      {/* wheels */}
      <circle cx={-110} cy={150} r={24} fill={COLORS.shirtDark} {...lg} />
      <circle cx={114} cy={150} r={24} fill={COLORS.shirtDark} {...lg} />
      {/* motion lines */}
      <path d="M -180 -40 l -40 0 M -190 20 l -46 0" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    </g>
  );
};

/** A carrot dangling from a stick (false promise / future faking — always
 *  just out of reach). */
export const CarrotOnStick: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 12) * 12;
  return (
    <g>
      {/* stick */}
      <rect x={-160} y={-150} width={240} height={18} rx={8} fill={COLORS.wood} {...lg} transform="rotate(-10)" />
      {/* string */}
      <line x1={70} y1={-150} x2={70 + sway} y2={-30} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {/* carrot */}
      <g transform={`translate(${70 + sway} 40)`}>
        <path d="M 0 90 Q -44 -20 -18 -58 Q 0 -70 18 -58 Q 44 -20 0 90 Z" fill={COLORS.hoodie} {...xl} />
        <path d="M -16 -20 L 16 -20 M -12 10 L 12 10 M -8 40 L 8 40" stroke={shade(COLORS.hoodie, 0.2)} strokeWidth={STROKE.sm} />
        {/* leaves */}
        <path d="M 0 -58 Q -24 -110 -6 -120 Q 0 -96 0 -58 Z M 0 -58 Q 24 -110 6 -120 Q 0 -96 0 -58 Z" fill={COLORS.greenLeaf} {...sm} />
      </g>
    </g>
  );
};

/** A baited fish-hook (luring / baiting someone in). */
export const FishHook: React.FC = () => (
  <g>
    <line x1={0} y1={-170} x2={0} y2={-40} stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} />
    <path d="M 0 -40 Q 0 70 -60 70 Q -108 70 -96 10" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.xl} strokeLinecap="round" />
    {/* barb */}
    <path d="M -96 10 l -22 -6 l 14 22 z" fill={COLORS.ledGrey} />
    {/* worm bait */}
    <path d="M -40 60 Q -10 100 -58 110 Q -96 118 -70 150 Q -40 172 -70 196" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.xl} strokeLinecap="round" />
  </g>
);
