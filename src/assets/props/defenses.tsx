/**
 * defenses.tsx — props for the "defense mechanisms" video. Local origin (0,0),
 * token strokes, flat two-tone. New art made per mechanism/context.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A heraldic shield (the core 'defense' metaphor). */
export const Shield: React.FC<{ tone?: string }> = ({ tone = COLORS.sky }) => (
  <g>
    <path d="M 0 -120 L 110 -80 L 110 20 Q 110 110 0 150 Q -110 110 -110 20 L -110 -80 Z" fill={tone} {...xl} />
    <path d="M 0 -120 L 110 -80 L 110 20 Q 110 110 0 150 Q -110 110 -110 20 L -110 -80 Z" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} transform="scale(0.82)" transform-origin="0 0" />
    <path d="M 0 -90 L 0 120 M -84 -40 L 84 -40" stroke={shade(tone, 0.18)} strokeWidth={STROKE.lg} />
  </g>
);

/** An angry anxiety blob (the threat the ego defends against). */
export const ThreatBlob: React.FC = () => {
  const f = useCurrentFrame();
  const wob = Math.sin(f / 5) * 6;
  return (
    <g>
      <path d={`M -90 ${20 + wob} Q -120 -70 -40 -88 Q 0 -120 50 -86 Q 128 -74 104 10 Q 128 80 40 ${86 - wob} Q 0 112 -44 86 Q -118 80 -90 ${20 + wob} Z`} fill={COLORS.red} {...xl} />
      <path d="M -50 -20 L -14 -4 M -14 -20 L -50 -4 M 14 -20 L 50 -4 M 50 -20 L 14 -4" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M -34 48 Q 0 28 34 48" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {[-1, 1].map((s, i) => (
        <path key={i} d={`M ${s * 96} -40 l ${s * 30} -14 M ${s * 104} 0 l ${s * 34} 0 M ${s * 96} 40 l ${s * 30} 14`} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      ))}
    </g>
  );
};

/** A chained, padlocked box (repression). */
export const LockedBox: React.FC = () => (
  <g>
    <rect x={-110} y={-60} width={220} height={170} rx={16} fill={COLORS.wood} {...xl} />
    <rect x={-110} y={-60} width={220} height={54} rx={16} fill={shade(COLORS.wood, 0.14)} {...lg} />
    <rect x={-120} y={-10} width={240} height={26} rx={8} fill={COLORS.shirtDark} />
    <rect x={-18} y={-90} width={36} height={70} rx={18} fill="none" {...lg} />
    <rect x={-30} y={-40} width={60} height={56} rx={10} fill={COLORS.yellow} {...lg} />
    <circle cx={0} cy={-14} r={9} fill={COLORS.outline} />
  </g>
);

/** A slide projector throwing a beam (projection). */
export const Projector: React.FC = () => (
  <g>
    <rect x={-100} y={-50} width={180} height={110} rx={18} fill={COLORS.shirtDark} {...xl} />
    <circle cx={90} cy={0} r={40} fill={COLORS.sky} {...lg} />
    <circle cx={90} cy={0} r={18} fill={COLORS.white} {...sm} />
    <rect x={-70} y={-86} width={70} height={40} rx={20} fill={COLORS.shirtDarker} {...lg} />
    <path d="M 128 -44 L 300 -90 L 300 90 L 128 44 Z" fill={COLORS.yellowSoft} opacity={0.5} />
  </g>
);

/** A dented trash can (displacement — kicked). */
export const TrashCan: React.FC = () => (
  <g>
    <path d="M -80 -70 L 80 -70 L 66 120 Q 0 134 -66 120 Z" fill={COLORS.greenTeal} {...xl} />
    <rect x={-96} y={-90} width={192} height={28} rx={10} fill={shade(COLORS.greenTeal, 0.16)} {...lg} />
    <rect x={-24} y={-106} width={48} height={20} rx={8} fill={COLORS.greenTeal} {...lg} />
    <path d="M -40 -50 L -46 100 M 0 -50 L 0 110 M 40 -50 L 46 100" stroke={shade(COLORS.greenTeal, 0.2)} strokeWidth={STROKE.sm} />
    <path d="M 40 10 l 24 -14 l -10 26 z" fill={COLORS.greenTeal} {...sm} />
  </g>
);

/** An easel with a bright canvas (sublimation). */
export const Easel: React.FC = () => (
  <g>
    <path d="M -90 180 L -30 -120 M 90 180 L 30 -120 M -60 180 L 60 180" stroke={COLORS.woodDark} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <rect x={-120} y={-120} width={240} height={190} rx={10} fill={COLORS.white} {...xl} />
    <path d="M -110 60 L -50 -20 L 0 30 L 50 -50 L 110 60 Z" fill={COLORS.greenLeaf} />
    <circle cx={60} cy={-70} r={22} fill={COLORS.yellow} {...sm} />
    <path d="M -100 -90 q 40 -20 80 10" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.lg} strokeLinecap="round" />
  </g>
);

/** Grapes on the vine, just out of reach (rationalization — sour grapes). */
export const SourGrapes: React.FC = () => (
  <g>
    <path d="M 0 -120 Q 40 -100 30 -70" fill="none" stroke={COLORS.woodDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
    <path d="M 30 -80 q 40 -6 60 -40" fill="none" stroke={COLORS.greenLeaf} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {[[0, -40], [-36, -20], [36, -20], [-60, 20], [0, 10], [60, 20], [-30, 54], [30, 54], [0, 90]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={30} fill={COLORS.lavender} {...lg} />
    ))}
  </g>
);

/** A tiny angel and devil on the shoulders (splitting / reaction formation). */
export const AngelDevil: React.FC = () => (
  <g>
    <g transform="translate(-90 0)">
      <circle cx={0} cy={0} r={50} fill={COLORS.white} {...lg} />
      <ellipse cx={0} cy={-62} rx={34} ry={12} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} />
      <circle cx={-16} cy={-6} r={6} fill={COLORS.outline} />
      <circle cx={16} cy={-6} r={6} fill={COLORS.outline} />
      <path d="M -16 16 q 16 14 32 0" fill="none" {...sm} />
    </g>
    <g transform="translate(90 0)">
      <circle cx={0} cy={0} r={50} fill={COLORS.red} {...lg} />
      <path d="M -40 -44 l 10 -26 l 16 22 z M 40 -44 l -10 -26 l -16 22 z" fill={COLORS.red} {...sm} />
      <circle cx={-16} cy={-6} r={6} fill={COLORS.white} />
      <circle cx={16} cy={-6} r={6} fill={COLORS.white} />
      <path d="M -16 20 q 16 -14 32 0" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
    </g>
  </g>
);

/** A baby pacifier (regression). */
export const Pacifier: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={70} fill={COLORS.pink} {...xl} />
    <circle cx={0} cy={0} r={40} fill="none" {...lg} />
    <ellipse cx={0} cy={70} rx={30} ry={22} fill={COLORS.yellowSoft} {...lg} />
    <circle cx={0} cy={-64} r={26} fill={COLORS.sky} {...lg} />
    <rect x={-10} y={-50} width={20} height={30} fill={COLORS.sky} />
  </g>
);

/** A thick open textbook (intellectualization). */
export const OpenBook: React.FC = () => (
  <g>
    <path d="M -130 60 L 0 30 L 130 60 L 130 -40 L 0 -70 L -130 -40 Z" fill={COLORS.sky} {...xl} />
    <path d="M 0 30 L 0 -70" {...lg} />
    <path d="M -110 -34 L -20 -52 M -110 -8 L -20 -26 M -110 18 L -20 0" stroke={shade(COLORS.sky, 0.2)} strokeWidth={STROKE.sm} />
    <path d="M 110 -34 L 20 -52 M 110 -8 L 20 -26 M 110 18 L 20 0" stroke={shade(COLORS.sky, 0.2)} strokeWidth={STROKE.sm} />
  </g>
);

/** A jar with a feeling sealed inside (isolation of affect). */
export const SealedJar: React.FC = () => (
  <g>
    <rect x={-80} y={-70} width={160} height={200} rx={28} fill={COLORS.sky} opacity={0.5} {...xl} />
    <rect x={-80} y={-70} width={160} height={200} rx={28} fill="none" {...xl} />
    <rect x={-90} y={-96} width={180} height={40} rx={12} fill={COLORS.woodDark} {...lg} />
    <path d="M 0 40 C -36 10 -30 -14 0 -16 C 30 -14 36 10 0 40 Z" fill={COLORS.red} {...lg} />
  </g>
);

/** Soap bar with bubbles (undoing — washing it away). */
export const SoapBubbles: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-80} y={20} width={160} height={80} rx={26} fill={COLORS.sky} {...xl} />
      <ellipse cx={-28} cy={44} rx={30} ry={14} fill={COLORS.white} opacity={0.7} />
      {[[-70, -40, 30], [-10, -90, 40], [60, -50, 26], [20, -10, 20], [90, -110, 18]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y + Math.sin(f / 12 + i) * 6} r={r} fill={COLORS.white} opacity={0.6} {...sm} />
      ))}
    </g>
  );
};

/** A dumbbell (compensation / gym). */
export const Dumbbell: React.FC = () => (
  <g>
    <rect x={-50} y={-18} width={100} height={36} rx={10} fill={COLORS.shirtDark} {...lg} />
    {[-1, 1].map((s, i) => (
      <g key={i}>
        <rect x={s * 50 - (s > 0 ? 0 : 30)} y={-50} width={30} height={100} rx={10} fill={COLORS.outline} />
        <rect x={s * 80 - (s > 0 ? 0 : 34)} y={-64} width={34} height={128} rx={12} fill={COLORS.red} {...lg} />
      </g>
    ))}
  </g>
);

/** A passive-aggressive sticky note. */
export const StickyNote: React.FC = () => (
  <g transform="rotate(-6)">
    <rect x={-100} y={-100} width={200} height={200} rx={8} fill={COLORS.yellow} {...lg} />
    <rect x={-100} y={-100} width={200} height={40} fill={shade(COLORS.yellow, 0.1)} />
    <text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={86} fill={COLORS.outline}>FINE.</text>
  </g>
);

/** Comedy + tragedy theater masks (humor). */
export const ComedyMask: React.FC = () => (
  <g>
    <g transform="translate(-64 0) rotate(-8)">
      <path d="M -70 -80 Q 0 -100 70 -80 Q 80 40 0 100 Q -80 40 -70 -80 Z" fill={COLORS.yellow} {...xl} />
      <path d="M -40 -20 q 16 -16 32 0 M 8 -20 q 16 -16 32 0" fill="none" {...sm} />
      <path d="M -36 40 q 36 40 72 0" fill="none" {...lg} />
    </g>
    <g transform="translate(64 0) rotate(8)">
      <path d="M -70 -80 Q 0 -100 70 -80 Q 80 40 0 100 Q -80 40 -70 -80 Z" fill={COLORS.sky} {...xl} />
      <path d="M -40 -4 q 16 16 32 0 M 8 -4 q 16 16 32 0" fill="none" {...sm} />
      <path d="M -36 60 q 36 -40 72 0" fill="none" {...lg} />
    </g>
  </g>
);

/** A volcano (repressed pressure). */
export const Volcano: React.FC = () => {
  const f = useCurrentFrame();
  const puff = Math.sin(f / 8) * 8;
  return (
    <g>
      <path d="M -140 110 L -50 -70 L 50 -70 L 140 110 Z" fill={COLORS.woodDark} {...xl} />
      <path d="M -50 -70 L 50 -70 L 30 -40 Q 0 -24 -30 -40 Z" fill={COLORS.red} {...lg} />
      <path d={`M -30 -56 Q -40 ${-130 - puff} -10 -160 Q 20 ${-120 - puff} 10 -56 Z`} fill={COLORS.red} opacity={0.8} />
      {[-70, 0, 70].map((x, i) => (
        <circle key={i} cx={x * 0.6} cy={-150 - (i % 2) * 30} r={20 + puff} fill={shade(COLORS.red, -0.1) || COLORS.red} opacity={0.5} />
      ))}
      <path d="M -40 10 L -20 110 M 20 -10 L 36 110" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.7} />
    </g>
  );
};

/** A pressure gauge in the red (the pressure metaphor). */
export const PressureGauge: React.FC = () => {
  const f = useCurrentFrame();
  const needle = 40 + Math.sin(f / 10) * 12;
  return (
    <g>
      <circle cx={0} cy={0} r={100} fill={COLORS.white} {...xl} />
      <path d="M -70 -70 A 100 100 0 0 1 70 -70" fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} />
      {[-60, -30, 0, 30, 60].map((a, i) => (
        <line key={i} x1={0} y1={-78} x2={0} y2={-64} transform={`rotate(${a})`} {...sm} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-70} transform={`rotate(${needle})`} {...strokeProps(STROKE.lg)} stroke={COLORS.red} />
      <circle cx={0} cy={0} r={12} fill={COLORS.outline} />
    </g>
  );
};

/** A framed diploma (therapist office / compensation). */
export const Diploma: React.FC = () => (
  <g>
    <rect x={-110} y={-80} width={220} height={160} rx={10} fill={COLORS.woodDark} {...xl} />
    <rect x={-90} y={-62} width={180} height={124} rx={6} fill={COLORS.bgCream} {...lg} />
    <path d="M -60 -34 L 60 -34 M -60 -10 L 60 -10 M -60 14 L 20 14" stroke={shade(COLORS.bgCream, 0.2)} strokeWidth={STROKE.sm} />
    <circle cx={58} cy={34} r={20} fill={COLORS.red} {...sm} />
  </g>
);
