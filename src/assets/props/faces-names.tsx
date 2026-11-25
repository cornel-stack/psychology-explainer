/**
 * faces-names.tsx — ALL-NEW art for "Why You Remember Faces But Not Names". The
 * experience (face-yes-name-blank, tip-of-tongue), the science (face-brain-area,
 * floating-name, meaning-web, baker-paradox, recognise-vs-recall), the causes
 * (missed-intro, ancient-faces), the fix (name-anchor). Token strokes, centered on
 * origin, ~300px tall.
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

/** face-yes-name-blank — a clearly recognised face with a blank "???" name tag. */
export const FaceYesNameBlank: React.FC = () => {
  const f = useCurrentFrame();
  const blink = (f % 70) < 4;
  return (
    <g>
      {/* the recognised face */}
      <circle cx={0} cy={-26} r={54} fill={COLORS.skin} {...xl} />
      <circle cx={-18} cy={-32} r={6} fill={COLORS.outline} /><circle cx={18} cy={-32} r={6} fill={COLORS.outline} />
      <path d="M -22 -8 Q 0 8 22 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* a green 'recognised' tick */}
      <g transform="translate(44 -60)"><circle cx={0} cy={0} r={18} fill={COLORS.greenTeal} {...sm} /><path d="M -8 0 l 5 6 l 9 -11" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" /></g>
      {/* blank name tag */}
      <g transform="translate(0 56)">
        <rect x={-70} y={-22} width={140} height={48} rx={8} fill={COLORS.white} {...lg} />
        <rect x={-70} y={-22} width={140} height={16} rx={8} fill={COLORS.red} />
        <text x={0} y={16} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline} opacity={blink ? 0.3 : 1}>? ? ?</text>
      </g>
      <Label t="I know you — but..." />
    </g>
  );
};

/** tip-of-tongue — a word stuck right at the tip of a tongue, almost out. */
export const TipOfTongue: React.FC = () => {
  const f = useCurrentFrame();
  const wobble = 3 * Math.sin(f / 4);
  return (
    <g>
      {/* mouth */}
      <path d="M -70 0 Q 0 -50 70 0 Q 0 60 -70 0 Z" fill={shade(COLORS.red, -0.02)} {...xl} />
      <path d="M -60 2 Q 0 -36 60 2" fill={COLORS.white} opacity={0.3} />
      {/* tongue */}
      <path d="M -30 18 Q 0 44 30 18 Q 20 8 0 8 Q -20 8 -30 18 Z" fill={COLORS.pink} {...lg} />
      {/* the stuck word bubble on the tip */}
      <g transform={`translate(${wobble} -40)`}>
        <rect x={-44} y={-24} width={88} height={44} rx={12} fill={COLORS.yellowSoft} {...lg} />
        <path d="M -8 18 l 8 14 l 8 -14 Z" fill={COLORS.yellowSoft} {...lg} />
        <text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>...Sa-?</text>
      </g>
      <Label t="right on the tip" />
    </g>
  );
};

/** face-brain-area — a brain with the face-area lit up, a tiny face glowing inside. */
export const FaceBrainArea: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      <path d="M -90 10 q -12 -78 60 -92 q 44 -34 96 -4 q 50 -14 68 42 q 26 36 -6 72 q 6 58 -72 62 q -56 24 -104 -8 q -54 2 -42 -64 Z" fill={shade(COLORS.pink, 0.08)} {...xl} />
      {/* folds */}
      <path d="M -40 -30 q 20 14 0 30 M 30 -40 q 18 16 -2 34 M -10 20 q 24 10 44 -4" fill="none" stroke={shade(COLORS.pink, -0.08)} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />
      {/* lit face-area */}
      <g transform="translate(38 28)">
        <circle cx={0} cy={0} r={30} fill={COLORS.yellow} opacity={0.4 + glow * 0.4} />
        <circle cx={0} cy={0} r={22} fill={COLORS.white} {...sm} />
        <circle cx={-7} cy={-3} r={3} fill={COLORS.outline} /><circle cx={7} cy={-3} r={3} fill={COLORS.outline} />
        <path d="M -8 6 Q 0 12 8 6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      </g>
      <Label t="faces get their own hardware" />
    </g>
  );
};

/** floating-name — a name tag on a string, untethered, drifting away with no anchor. */
export const FloatingName: React.FC = () => {
  const f = useCurrentFrame();
  const drift = 10 * Math.sin(f / 18);
  return (
    <g>
      {/* a face at the base */}
      <circle cx={0} cy={44} r={38} fill={COLORS.skin} {...lg} />
      <circle cx={-12} cy={40} r={4} fill={COLORS.outline} /><circle cx={12} cy={40} r={4} fill={COLORS.outline} />
      <path d="M -12 54 Q 0 62 12 54" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* the name, floating off with a cut string */}
      <g transform={`translate(${drift} -40)`}>
        <rect x={-54} y={-26} width={108} height={52} rx={12} fill={COLORS.sky} {...lg} />
        <text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>"Rob"</text>
        <path d="M 0 26 q -6 20 -14 34" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeDasharray="4 6" />
      </g>
      <Label t="a label tied to nothing" />
    </g>
  );
};

/** meaning-web — a central word with many connecting threads to meaning (vs an island). */
export const MeaningWeb: React.FC = () => {
  const f = useCurrentFrame();
  const nodes = ['bread', 'oven', 'apron', 'flour', 'hat'];
  const pulse = 0.6 + 0.4 * Math.sin(f / 8);
  return (
    <g>
      {nodes.map((n, i) => { const a = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2; const x = Math.cos(a) * 92; const y = Math.sin(a) * 76; return (
        <g key={i}><line x1={0} y1={0} x2={x} y2={y} stroke={COLORS.greenTeal} strokeWidth={STROKE.sm} opacity={0.6} /><circle cx={x} cy={y} r={22} fill={shade(COLORS.greenTeal, 0.08)} {...sm} /><text x={x} y={y + 5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{n}</text></g>
      ); })}
      <circle cx={0} cy={0} r={34} fill={COLORS.yellow} opacity={0.5 + pulse * 0.3} {...lg} />
      <text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>baker</text>
      <Label t="meaning gives you hooks" />
    </g>
  );
};

/** baker-paradox — two identical "Baker" cards: one a name (blank), one a job (rich). */
export const BakerParadox: React.FC = () => (
  <g>
    {/* name card — grey, hard */}
    <g transform="translate(-74 0)">
      <rect x={-56} y={-54} width={112} height={108} rx={12} fill={COLORS.white} {...xl} />
      <text x={0} y={-16} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>Mr</text>
      <text x={0} y={12} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>Baker</text>
      <text x={0} y={42} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.red}>name — hard</text>
    </g>
    {/* job card — rich, easy */}
    <g transform="translate(74 0)">
      <rect x={-56} y={-54} width={112} height={108} rx={12} fill={COLORS.yellowSoft} {...xl} />
      {/* little baker hat + loaf */}
      <path d="M -22 -20 q 0 -18 22 -18 q 22 0 22 18 l 0 8 l -44 0 Z" fill={COLORS.white} {...sm} />
      <ellipse cx={0} cy={6} rx={26} ry={13} fill={shade(COLORS.wood, 0.06)} {...sm} />
      <text x={0} y={42} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.greenDark}>a baker — easy</text>
    </g>
    <text x={0} y={-72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>same word!</text>
    <Label t="the Baker paradox" />
  </g>
);

/** recognise-vs-recall — a light switch metaphor: recognition flips easy, recall gropes. */
export const RecogniseVsRecall: React.FC = () => {
  const f = useCurrentFrame();
  const grope = 4 * Math.sin(f / 5);
  return (
    <g>
      {/* recognition — easy, a lit face */}
      <g transform="translate(-72 0)">
        <circle cx={0} cy={-6} r={44} fill={COLORS.greenTeal} opacity={0.2} />
        <circle cx={0} cy={-6} r={30} fill={COLORS.skin} {...lg} />
        <circle cx={-10} cy={-10} r={4} fill={COLORS.outline} /><circle cx={10} cy={-10} r={4} fill={COLORS.outline} />
        <path d="M -10 2 Q 0 8 10 2" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <text x={0} y={56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.greenDark}>recognise</text>
        <text x={0} y={76} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>easy</text>
      </g>
      {/* recall — hard, groping in a dark box */}
      <g transform="translate(72 0)">
        <rect x={-40} y={-44} width={80} height={76} rx={10} fill={shade(COLORS.navy, 0.1)} {...lg} />
        <path d={`M 0 32 q ${grope} -30 ${grope * 1.4} -60`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <circle cx={grope * 1.4} cy={-28} r={10} fill={COLORS.skin} {...sm} />
        <text x={0} y={56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>recall</text>
        <text x={0} y={76} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>hard</text>
      </g>
      <Label t="seeing beats producing" />
    </g>
  );
};

/** missed-intro — two figures shaking hands while one's mind is elsewhere (name flies past). */
export const MissedIntro: React.FC = () => {
  const f = useCurrentFrame();
  const fly = (f % 50) / 50;
  return (
    <g>
      {/* two figures */}
      {[-60, 60].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><circle cx={0} cy={-30} r={26} fill={i ? COLORS.skin : COLORS.white} {...lg} /><circle cx={-9} cy={-32} r={4} fill={COLORS.outline} /><circle cx={9} cy={-32} r={4} fill={COLORS.outline} /><path d="M -26 36 Q -30 -4 0 -4 Q 30 -4 26 36 Z" fill={i ? COLORS.sky : COLORS.pink} {...lg} /></g>)}
      {/* handshake */}
      <path d="M -34 10 L 34 10" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* their name flying past, unheard */}
      <g transform={`translate(${-40 + fly * 80} ${-80 + fly * 6})`} opacity={1 - fly}>
        <rect x={-36} y={-16} width={72} height={32} rx={8} fill={COLORS.yellowSoft} {...sm} />
        <text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>"...Sara"</text>
      </g>
      {/* one head thinking of something else */}
      <g transform="translate(-60 -74)"><path d="M -16 6 Q -20 -14 0 -14 Q 20 -14 16 6 Q 16 18 0 16 Q -16 18 -16 6 Z" fill={COLORS.white} {...sm} /><text x={0} y={0} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={12} fill={COLORS.outline}>say hi!</text></g>
      <Label t="you weren't really listening" />
    </g>
  );
};

/** ancient-faces — faces around an ancient fire (what we evolved to read). */
export const AncientFaces: React.FC = () => {
  const f = useCurrentFrame();
  const flicker = 0.7 + 0.3 * Math.sin(f / 3);
  return (
    <g>
      {/* fire in the middle */}
      <g transform="translate(0 30)">
        <ellipse cx={0} cy={26} rx={40} ry={12} fill={COLORS.woodDark} {...sm} />
        <path d="M 0 24 q -22 -18 -10 -44 q 6 12 12 6 q -2 -20 10 -30 q -2 24 12 30 q 8 10 -4 38 Z" fill={COLORS.yellow} opacity={flicker} {...sm} />
        <path d="M 0 22 q -10 -14 -3 -30 q 8 14 14 0 q 2 18 -6 30 Z" fill={COLORS.red} opacity={0.7} />
      </g>
      {/* faces gathered around, lit by the fire */}
      {[-90, -50, 50, 90].map((x, i) => { const up = Math.abs(x) > 70; return (
        <g key={i} transform={`translate(${x} ${up ? -30 : -46})`} opacity={0.85}><circle cx={0} cy={0} r={22} fill={shade(COLORS.skin, up ? -0.04 : 0)} {...sm} /><circle cx={-7} cy={-2} r={3} fill={COLORS.outline} /><circle cx={7} cy={-2} r={3} fill={COLORS.outline} /><path d="M -7 7 Q 0 12 7 7" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      ); })}
      <Label t="we evolved to read faces" />
    </g>
  );
};

/** name-anchor — a name hooked firmly onto a face feature, with a mnemonic image. */
export const NameAnchor: React.FC = () => {
  const f = useCurrentFrame();
  const bob = 2 * Math.sin(f / 10);
  return (
    <g>
      {/* face with a distinctive feature (big glasses) */}
      <circle cx={0} cy={-10} r={48} fill={COLORS.skin} {...xl} />
      <circle cx={-16} cy={-14} r={13} fill={COLORS.white} {...sm} /><circle cx={16} cy={-14} r={13} fill={COLORS.white} {...sm} /><line x1={-3} y1={-14} x2={3} y2={-14} stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <circle cx={-16} cy={-14} r={4} fill={COLORS.outline} /><circle cx={16} cy={-14} r={4} fill={COLORS.outline} />
      <path d="M -12 12 Q 0 20 12 12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      {/* a hook anchoring the name to the face */}
      <g transform={`translate(66 ${-50 + bob})`}>
        <path d="M -30 10 q -10 -14 4 -20 q 12 -4 12 8" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <rect x={-6} y={-16} width={76} height={40} rx={10} fill={COLORS.greenTeal} {...lg} />
        <text x={32} y={9} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.white}>Iris</text>
      </g>
      <Label t="hook the name to the face" />
    </g>
  );
};
