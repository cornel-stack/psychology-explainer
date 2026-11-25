/**
 * gratitude.tsx — ALL-NEW art for "The Psychology of Gratitude". The obstacles
 * (negativity-tilt, adaptation-fade), the shift (notice-good, half-full-cup), the
 * practice (gratitude-journal, thank-you-letter, savor-moment, imagine-gone), the bond
 * (gratitude-bond), the honesty (both-true). Token strokes, centered on origin,
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

/** notice-good — a magnifier finding a small glowing good thing among plain ones. */
export const NoticeGood: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <g>
      {/* plain dots */}
      {[-70, -30, 54, 90].map((x, i) => <circle key={i} cx={x} cy={-10 + (i % 2) * 24} r={14} fill={COLORS.white} {...sm} />)}
      {/* the glowing good one */}
      <g transform="translate(14 6)">
        <circle cx={0} cy={0} r={20 + glow * 4} fill={COLORS.yellow} opacity={0.4 + glow * 0.4} />
        <path d="M 0 -14 l 4 9 l 10 1 l -7 7 l 2 10 l -9 -5 l -9 5 l 2 -10 l -7 -7 l 10 -1 Z" fill={COLORS.yellow} {...sm} />
      </g>
      {/* magnifier */}
      <g transform="translate(-6 -6)">
        <circle cx={0} cy={0} r={44} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} />
        <circle cx={0} cy={0} r={40} fill={COLORS.white} opacity={0.2} />
        <line x1={32} y1={32} x2={70} y2={70} stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      </g>
      <Label t="notice the good" />
    </g>
  );
};

/** negativity-tilt — a balance scale where one small dark weight outweighs many bright. */
export const NegativityTilt: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = 10 + 2 * Math.sin(f / 12);
  return (
    <g>
      <line x1={0} y1={-70} x2={0} y2={-20} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={-74} r={8} fill={COLORS.outline} />
      <g transform={`rotate(${tilt})`}>
        <line x1={-90} y1={-20} x2={90} y2={-20} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        {/* heavy dark bad on the low side */}
        <g transform={`translate(-90 ${-20}) rotate(${-tilt})`}><line x1={0} y1={0} x2={0} y2={30} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><circle cx={0} cy={48} r={26} fill={shade(COLORS.navy, 0.1)} {...lg} /><text x={0} y={53} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.white}>1 bad</text></g>
        {/* many light good on the high side */}
        <g transform={`translate(90 ${-20}) rotate(${-tilt})`}><line x1={0} y1={0} x2={0} y2={30} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><ellipse cx={0} cy={44} rx={30} ry={18} fill={COLORS.yellowSoft} {...lg} /><text x={0} y={49} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>5 good</text></g>
      </g>
      <Label t="bad weighs more than good" />
    </g>
  );
};

/** adaptation-fade — a bright star that fades to grey as we get used to it. */
export const AdaptationFade: React.FC = () => {
  const f = useCurrentFrame();
  const cycle = (f % 90) / 90;
  const bright = 1 - cycle;
  return (
    <g>
      {[0, 1, 2].map((i) => { const t = i / 2; const fade = 1 - t; return (
        <g key={i} transform={`translate(${-80 + i * 80} 0)`} opacity={0.4 + fade * 0.6}>
          <path d="M 0 -34 l 9 20 l 22 2 l -16 15 l 5 22 l -20 -11 l -20 11 l 5 -22 l -16 -15 l 22 -2 Z" fill={i === 0 ? COLORS.yellow : shade(COLORS.ledGrey, 0.12 - i * 0.02)} {...sm} />
          {i < 2 && <path d="M 36 0 l 24 0 M 54 -8 l 8 8 l -8 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ); })}
      <text x={-80} y={46} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>new!</text>
      <text x={80} y={46} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>...meh</text>
      <Label t="we get used to everything" />
    </g>
  );
};

/** gratitude-journal — an open journal listing three good things with little hearts. */
export const GratitudeJournal: React.FC = () => {
  const f = useCurrentFrame();
  const tick = Math.floor((f / 25) % 4);
  return (
    <g>
      <rect x={-94} y={-70} width={188} height={150} rx={12} fill={COLORS.white} {...xl} />
      <line x1={-94} y1={-70} x2={-94} y2={80} stroke={COLORS.pink} strokeWidth={STROKE.lg} />
      <text x={-10} y={-44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>3 good things</text>
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(0 ${-14 + i * 30})`} opacity={i < tick ? 1 : 0.3}><path d="M -66 0 q -4 -8 -10 -4 q -6 4 10 12 q 16 -8 10 -12 q -6 -4 -10 4 Z" fill={COLORS.red} {...sm} transform="scale(0.8)" /><line x1={-54} y1={2} x2={66} y2={2} stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} /></g>)}
      <Label t="three good things" />
    </g>
  );
};

/** half-full-cup — a cup that reframes from half-empty (scarcity) to half-full (abundance). */
export const HalfFullCup: React.FC = () => {
  const f = useCurrentFrame();
  const fill = 0.5 + 0.08 * Math.sin(f / 10);
  return (
    <g>
      <path d="M -52 -50 L 52 -50 L 44 70 L -44 70 Z" fill={COLORS.white} {...xl} />
      {/* liquid */}
      <path d={`M ${-52 + 12 * (1 - fill)} ${70 - 120 * fill} L ${52 - 12 * (1 - fill)} ${70 - 120 * fill} L 44 70 L -44 70 Z`} fill={COLORS.sky} opacity={0.7} />
      <path d={`M ${-52 + 12 * (1 - fill)} ${70 - 120 * fill} Q 0 ${70 - 120 * fill - 10} ${52 - 12 * (1 - fill)} ${70 - 120 * fill}`} fill="none" stroke={shade(COLORS.sky, -0.1)} strokeWidth={STROKE.sm} />
      {/* a plus mark of abundance */}
      <g transform="translate(66 -30)"><circle cx={0} cy={0} r={18} fill={COLORS.greenTeal} {...sm} /><path d="M 0 -8 L 0 8 M -8 0 L 8 0" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" /></g>
      <Label t="half-full, not half-empty" />
    </g>
  );
};

/** thank-you-letter — a warm letter with 'thank you' and a heart seal. */
export const ThankYouLetter: React.FC = () => {
  const f = useCurrentFrame();
  const lift = 2 * Math.sin(f / 10);
  return (
    <g transform={`translate(0 ${lift})`}>
      <rect x={-90} y={-60} width={180} height={128} rx={10} fill={COLORS.yellowSoft} {...xl} />
      <path d="M -90 -60 L 0 10 L 90 -60" fill="none" stroke={shade(COLORS.yellowSoft, -0.08)} strokeWidth={STROKE.sm} />
      <text x={0} y={36} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={22} fill={COLORS.outline}>thank you</text>
      {/* wax heart seal */}
      <g transform="translate(0 -6)"><circle cx={0} cy={0} r={18} fill={COLORS.red} {...sm} /><path d="M 0 6 q -8 -6 -8 -11 q 0 -4 4 -4 q 3 0 4 3 q 1 -3 4 -3 q 4 0 4 4 q 0 5 -8 11 Z" fill={COLORS.white} /></g>
      <Label t="write the thank-you" />
    </g>
  );
};

/** savor-moment — a slowed moment: a figure holding a warm cup, eyes closed, a glow. */
export const SavorMoment: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <g>
      {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={-6} r={50 + i * 18} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} opacity={(0.35 - i * 0.1) * (0.6 + glow * 0.5)} />)}
      <circle cx={0} cy={-20} r={40} fill={COLORS.skin} {...xl} />
      {/* content closed eyes + soft smile */}
      <path d="M -22 -24 Q -14 -18 -6 -24 M 6 -24 Q 14 -18 22 -24" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -14 -4 Q 0 8 14 -4" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* warm cup with steam */}
      <g transform="translate(0 40)"><rect x={-28} y={0} width={56} height={40} rx={8} fill={COLORS.red} {...lg} /><path d="M 28 8 q 14 2 0 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />{[0, 1].map((i) => <path key={i} d={`M ${-10 + i * 18} -6 q -5 -10 2 -20`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5 + 0.3 * Math.sin(f / 5 + i)} />)}</g>
      <Label t="savour it, slowly" />
    </g>
  );
};

/** imagine-gone — a good thing shown as present, then its dotted outline as if removed. */
export const ImagineGone: React.FC = () => {
  const f = useCurrentFrame();
  const gone = (f % 80) > 40;
  return (
    <g>
      {/* present version — a little house / home */}
      <g opacity={gone ? 0.25 : 1}>
        <path d="M -44 10 L -44 -14 L 0 -46 L 44 -14 L 44 10 Z" fill={COLORS.greenTeal} {...xl} />
        <rect x={-44} y={10} width={88} height={40} fill={shade(COLORS.greenTeal, 0.06)} {...lg} />
        <rect x={-14} y={16} width={28} height={34} rx={3} fill={COLORS.woodDark} {...sm} />
      </g>
      {/* the 'imagine it gone' dotted outline */}
      {gone && <g><path d="M -44 10 L -44 -14 L 0 -46 L 44 -14 L 44 10 L 44 50 L -44 50 Z" fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeDasharray="6 8" /><text x={0} y={-62} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>imagine it gone</text></g>}
      <Label t="picture life without it" />
    </g>
  );
};

/** gratitude-bond — two figures, a warm thank-you passing between, a bond glowing. */
export const GratitudeBond: React.FC = () => {
  const f = useCurrentFrame();
  const pass = (f % 50) / 50;
  return (
    <g>
      {[-68, 68].map((x, i) => <g key={i} transform={`translate(${x} 0)`}><circle cx={0} cy={-26} r={28} fill={i ? COLORS.pink : COLORS.sky} {...lg} /><path d="M -22 -12 Q 0 -4 22 -12" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /><circle cx={-9} cy={-30} r={4} fill={COLORS.outline} /><circle cx={9} cy={-30} r={4} fill={COLORS.outline} /><path d="M -28 38 Q -32 -2 0 -2 Q 32 -2 28 38 Z" fill={i ? shade(COLORS.pink, 0.06) : shade(COLORS.sky, 0.06)} {...lg} /></g>)}
      {/* a heart passing between them */}
      <path d="M 0 10 q -12 -10 -12 -18 q 0 -6 6 -6 q 4 0 6 4 q 2 -4 6 -4 q 6 0 6 6 q 0 8 -12 18 Z" fill={COLORS.red} transform={`translate(${-40 + pass * 80} ${-20 - Math.sin(pass * Math.PI) * 14})`} {...sm} />
      <Label t="gratitude binds us closer" />
    </g>
  );
};

/** both-true — two side-by-side bubbles: a tear and a thank-you, both allowed. */
export const BothTrue: React.FC = () => (
  <g>
    {/* grief side */}
    <g transform="translate(-60 0)">
      <circle cx={0} cy={0} r={46} fill={shade(COLORS.sky, 0.06)} {...xl} />
      <circle cx={-14} cy={-6} r={5} fill={COLORS.outline} /><circle cx={14} cy={-6} r={5} fill={COLORS.outline} />
      <path d="M -14 22 Q 0 14 14 22" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 16 2 q 5 10 0 16 q -5 -6 0 -16 Z" fill={COLORS.sky} />
      <text x={0} y={-60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>hard</text>
    </g>
    {/* the plus / 'and' */}
    <text x={0} y={8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>&amp;</text>
    {/* gratitude side */}
    <g transform="translate(60 0)">
      <circle cx={0} cy={0} r={46} fill={shade(COLORS.yellowSoft, 0.06)} {...xl} />
      <path d="M -22 -10 Q -14 -18 -6 -10 M 6 -10 Q 14 -18 22 -10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -16 8 Q 0 26 16 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={0} y={-60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>grateful</text>
    </g>
    <Label t="both can be true" />
  </g>
);
