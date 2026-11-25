/**
 * babymemory.tsx — ALL-NEW art for "Why You Can't Remember Being a Baby". The
 * mystery (baby-no-recall, fading-babymemory, amnesia-curtain), the mechanisms
 * (building-hippocampus, neuron-overwrite, wordless-experience, mirror-me), the
 * reconstruction (photo-built-memory), and what's kept (implicit-imprint,
 * reminisce-bonding). Token strokes, centered on origin, ~300px tall.
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
const Baby: React.FC<{ r?: number }> = ({ r = 40 }) => (
  <g>
    <circle cx={0} cy={0} r={r} fill={COLORS.white} {...xl} />
    <circle cx={-r * 0.3} cy={r * 0.04} r={r * 0.11} fill={COLORS.outline} /><circle cx={r * 0.3} cy={r * 0.04} r={r * 0.11} fill={COLORS.outline} />
    <path d={`M ${-r * 0.2} ${r * 0.4} Q 0 ${r * 0.56} ${r * 0.2} ${r * 0.4}`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
    <ellipse cx={-r * 0.56} cy={r * 0.18} rx={r * 0.12} ry={r * 0.08} fill={COLORS.pink} opacity={0.7} /><ellipse cx={r * 0.56} cy={r * 0.18} rx={r * 0.12} ry={r * 0.08} fill={COLORS.pink} opacity={0.7} />
    {/* a single curl of hair */}
    <path d={`M 0 ${-r} q 8 -12 -4 -18`} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);

/** Baby-no-recall — a baby with a totally empty thought bubble. */
export const BabyNoRecall: React.FC = () => (
  <g>
    <g transform="translate(-20 20)"><Baby r={46} /></g>
    {/* empty thought bubble */}
    <g transform="translate(60 -58)"><circle cx={0} cy={0} r={40} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeDasharray="6 8" /><circle cx={-30} cy={30} r={8} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeDasharray="4 5" /><text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.ledGrey}>?</text></g>
    <Label t="nothing to recall" />
  </g>
);

/** Fading-babymemory — a snapshot dissolving into blank. */
export const FadingBabymemory: React.FC = () => {
  const f = useCurrentFrame();
  const fade = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      <rect x={-70} y={-56} width={140} height={120} rx={10} fill={COLORS.white} {...xl} />
      {/* a scene dissolving left-to-right into nothing */}
      <g opacity={fade}><circle cx={-34} cy={-16} r={18} fill={COLORS.yellow} /><path d="M -60 40 L -30 10 L 0 34 L 30 6 L 60 30 L 60 48 L -60 48 Z" fill={shade(COLORS.greenLeaf, 0.1)} /></g>
      {/* dissolving particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={10 + i * 12} cy={-20 + (i % 3) * 20} r={4 - i * 0.4} fill={COLORS.ledGrey} opacity={(1 - i / 6) * fade} />)}
      <Label t="formed, then lost" />
    </g>
  );
};

/** Building-hippocampus — a seahorse-shaped memory region under construction. */
export const BuildingHippocampus: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 6);
  return (
    <g>
      {/* seahorse-ish hippocampus curl */}
      <path d="M -40 60 Q -70 20 -40 -20 Q -16 -50 24 -44 Q 56 -40 54 -8 Q 52 20 24 18 Q 6 16 10 0" fill="none" stroke={COLORS.pink} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* scaffolding around it */}
      {[-40, 0, 40].map((x, i) => <line key={i} x1={x} y1={-66} x2={x} y2={70} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeDasharray="4 8" opacity={0.6} />)}
      <line x1={-54} y1={-50} x2={60} y2={-50} stroke={COLORS.sky} strokeWidth={STROKE.sm} strokeDasharray="4 8" opacity={0.6} />
      {/* a little hard-hat / construction marker */}
      <g transform="translate(40 -56)" opacity={0.6 + g * 0.4}><rect x={-14} y={-6} width={28} height={10} rx={4} fill={COLORS.yellow} {...sm} /><path d="M -10 -6 Q 0 -18 10 -6 Z" fill={COLORS.yellow} {...sm} /></g>
      <Label t="the memory-binder, still building" />
    </g>
  );
};

/** Neuron-overwrite — new neurons scribbling over an old memory trace. */
export const NeuronOverwrite: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      {/* faint old memory trace */}
      <path d="M -80 10 Q -40 -30 0 10 Q 40 50 80 10" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} opacity={0.4} />
      {/* bright new neurons sprouting over it */}
      {[-60, -20, 20, 60].map((x, i) => (
        <g key={i} transform={`translate(${x} ${-6 + (i % 2) * 12})`}>
          <circle cx={0} cy={0} r={12} fill={COLORS.red} {...sm} />
          {[0, 1, 2, 3, 4].map((j) => <line key={j} x1={0} y1={0} x2={Math.cos((j / 5) * Math.PI * 2 + f / 10 + i) * 24} y2={Math.sin((j / 5) * Math.PI * 2 + f / 10 + i) * 24} stroke={COLORS.red} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
        </g>
      ))}
      <Label t="new neurons overwrite the old" />
    </g>
  );
};

/** Wordless-experience — a vivid scene with no words to pin it down. */
export const WordlessExperience: React.FC = () => (
  <g>
    {/* a bright blobby experience */}
    <path d="M -60 20 Q -80 -40 -20 -50 Q 20 -72 50 -40 Q 80 -20 60 30 Q 40 60 0 54 Q -40 56 -60 20 Z" fill={COLORS.yellowSoft} {...xl} />
    <circle cx={-18} cy={-8} r={14} fill={COLORS.pink} opacity={0.7} /><circle cx={24} cy={2} r={10} fill={COLORS.sky} opacity={0.7} />
    {/* empty word-slots (dashes) where language would be */}
    {[-30, 0, 30].map((x, i) => <line key={i} x1={x - 10} y1={76} x2={x + 10} y2={76} stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" />)}
    <Label t="no words to file it under" />
  </g>
);

/** Mirror-me — a toddler meeting itself in a mirror: the birth of 'me'. */
export const MirrorMe: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* toddler */}
      <g transform="translate(-54 10)"><Baby r={38} /></g>
      {/* mirror with reflection */}
      <g transform="translate(60 0)"><rect x={-44} y={-70} width={88} height={150} rx={12} fill={COLORS.sky} opacity={0.4} {...xl} /><g transform="translate(0 10) scale(-0.9 0.9)"><Baby r={34} /></g></g>
      {/* a spark of recognition between them */}
      <g transform="translate(6 -10)" opacity={0.6 + g * 0.4}><text x={0} y={0} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.yellowDark}>!</text></g>
      <Label t="'that's... me!'" />
    </g>
  );
};

/** Photo-built-memory — a 'memory' assembled from a photograph. */
export const PhotoBuiltMemory: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* a physical photo */}
      <g transform="rotate(-6)"><rect x={-66} y={-54} width={132} height={120} rx={6} fill={COLORS.white} {...xl} /><circle cx={-20} cy={-14} r={20} fill={COLORS.yellow} /><path d="M -52 40 L -20 10 L 10 34 L 40 8 L 52 24 L 52 44 L -52 44 Z" fill={shade(COLORS.greenLeaf, 0.1)} /><text x={0} y={60} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={shade(COLORS.wood, -0.1)}>age 2</text></g>
      {/* arrow up into a 'memory' bubble */}
      <path d="M 50 -40 Q 90 -60 80 -90" fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.sm} strokeDasharray="4 6" />
      <g transform="translate(78 -104)" opacity={0.6 + g * 0.4}><circle cx={0} cy={0} r={26} fill={COLORS.lavender} opacity={0.5} {...sm} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>?</text></g>
      <Label t="a memory built from a photo" />
    </g>
  );
};

/** Implicit-imprint — a hidden hand pressing a shape into clay: shaped without recall. */
export const ImplicitImprint: React.FC = () => (
  <g>
    {/* a block of clay with an imprint */}
    <rect x={-80} y={0} width={160} height={70} rx={14} fill={shade(COLORS.skin, -0.04)} {...xl} />
    <path d="M -40 0 q 20 -40 40 0" fill="none" stroke={shade(COLORS.skin, -0.14)} strokeWidth={STROKE.lg} />
    {/* a faded hand above (the forgotten cause) */}
    <g transform="translate(-10 -56)" opacity={0.4}><path d="M -30 30 Q -34 -10 -10 -14 L -10 -24 Q -2 -34 6 -24 L 6 -16 Q 14 -36 22 -16 L 22 -6 Q 36 -8 40 14 Q 44 40 14 48 Z" fill={COLORS.skin} {...lg} strokeLinejoin="round" /></g>
    <text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline} opacity={0.6}>forgotten, but felt</text>
    <Label t="shaped without remembering" />
  </g>
);

/** Reminisce-bonding — parent and child recalling together, growing a memory. */
export const ReminisceBonding: React.FC = () => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.4 * Math.sin(f / 7);
  return (
    <g>
      {/* parent */}
      <g transform="translate(-52 0)"><circle cx={0} cy={-6} r={40} fill={COLORS.yellowSoft} {...xl} /><circle cx={-12} cy={-10} r={5} fill={COLORS.outline} /><circle cx={12} cy={-10} r={5} fill={COLORS.outline} /><path d="M -12 6 Q 0 16 12 6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* child */}
      <g transform="translate(48 16)"><Baby r={30} /></g>
      {/* shared memory bubble growing between them */}
      <g transform="translate(0 -62)" opacity={0.6 + g * 0.4}><ellipse cx={0} cy={0} rx={48} ry={30} fill={COLORS.pink} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.white}>remember when?</text></g>
      <Label t="stories grow memory" />
    </g>
  );
};

/** Amnesia-curtain — a curtain drawn over the first years of a life-timeline. */
export const AmnesiaCurtain: React.FC = () => (
  <g>
    {/* a timeline */}
    <line x1={-96} y1={30} x2={96} y2={30} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {[-96, -48, 0, 48, 96].map((x, i) => <g key={i}><line x1={x} y1={22} x2={x} y2={38} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><text x={x} y={58} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>{i}</text></g>)}
    {/* the fog curtain over 0-3.5 */}
    <rect x={-104} y={-50} width={128} height={76} rx={8} fill={COLORS.lavender} opacity={0.5} />
    {[-96, -72, -48, -24].map((x, i) => <path key={i} d={`M ${x} -48 q 10 20 0 40 q -10 20 0 34`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.5} />)}
    <text x={-40} y={-30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>fog</text>
    <text x={40} y={-30} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>memories begin</text>
    <Label t="a curtain over the first years" />
  </g>
);
