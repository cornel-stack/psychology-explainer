/**
 * types-of-couple.tsx — ALL-NEW art for "Every Type of Couple Explained".
 * The pairings: validating-couple, volatile-couple, avoidant-couple, four-horsemen,
 * pursue-withdraw, secure-base-couple, best-friends-couple, power-couple,
 * enmeshed-knot, repair-bridge. Token strokes, centered on origin, ~300px tall.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

const Label: React.FC<{ t: string; y?: number }> = ({ t, y = 140 }) => (
  <text x={0} y={y} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={24} fill={COLORS.outline}>{t}</text>
);

/** A small seated/standing figure: head + rounded body. Centered at its own origin. */
const Fig: React.FC<{ fill: string; happy?: boolean; cross?: boolean }> = ({ fill, happy = true, cross = false }) => (
  <g>
    <path d={`M -26 46 Q -26 2 0 2 Q 26 2 26 46 Z`} fill={fill} {...lg} />
    <circle cx={0} cy={-26} r={24} fill={COLORS.skin} {...lg} />
    <circle cx={-9} cy={-28} r={3.5} fill={COLORS.outline} /><circle cx={9} cy={-28} r={3.5} fill={COLORS.outline} />
    {happy
      ? <path d="M -10 -18 Q 0 -11 10 -18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      : cross
        ? <path d="M -9 -15 Q 0 -20 9 -15" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        : <path d="M -9 -16 L 9 -16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />}
  </g>
);

/** validating-couple — two figures across a small table, bubbles meeting on a checkmark. */
export const ValidatingCouple: React.FC = () => {
  const f = useCurrentFrame();
  const nodL = 2 * Math.sin(f / 11);
  const nodR = 2 * Math.sin(f / 11 + 0.8);
  return (
    <g>
      <g transform={`translate(-66 24) scale(0.92) translate(0 ${nodL})`}><Fig fill={COLORS.greenLeaf} /></g>
      <g transform={`translate(66 24) scale(0.92) translate(0 ${nodR})`}><Fig fill={COLORS.sky} /></g>
      {/* small round table between */}
      <ellipse cx={0} cy={72} rx={40} ry={12} fill={COLORS.wood} {...lg} />
      {/* two speech bubbles meeting over a balance check */}
      <g transform="translate(-44 -58)"><rect x={-28} y={-18} width={56} height={34} rx={12} fill={COLORS.white} {...sm} /><path d="M 10 14 l 8 12 l -16 -4 Z" fill={COLORS.white} {...sm} /></g>
      <g transform="translate(44 -58)"><rect x={-28} y={-18} width={56} height={34} rx={12} fill={COLORS.white} {...sm} /><path d="M -10 14 l -8 12 l 16 -4 Z" fill={COLORS.white} {...sm} /></g>
      <circle cx={0} cy={-56} r={18} fill={COLORS.yellowSoft} {...sm} />
      <path d="M -8 -56 l 5 6 l 10 -12" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      <Label t="calm, heard, fair" />
    </g>
  );
};

/** volatile-couple — two close figures, spark zigzag + fireworks + heart. */
export const VolatileCouple: React.FC = () => {
  const f = useCurrentFrame();
  const spark = 0.85 + 0.2 * Math.abs(Math.sin(f / 6));
  return (
    <g>
      <g transform="translate(-54 28) scale(0.94)"><Fig fill={COLORS.red} /></g>
      <g transform="translate(54 28) scale(0.94)"><Fig fill={COLORS.pink} /></g>
      {/* spark zigzag between them */}
      <path d="M -14 -6 L 6 -14 L -6 0 L 14 -8" fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      {/* fireworks burst above */}
      <g transform={`translate(0 -64) scale(${spark})`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 26} y2={Math.sin((a * Math.PI) / 180) * 26} stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
        ))}
        <circle cx={0} cy={0} r={7} fill={COLORS.red} {...sm} />
      </g>
      {/* little heart lower between */}
      <path d="M 0 66 C -10 52 -26 60 -16 74 L 0 88 L 16 74 C 26 60 10 52 0 66 Z" fill={COLORS.pinkDark} {...sm} />
      <Label t="fiery & affectionate" />
    </g>
  );
};

/** avoidant-couple — two figures back-to-back, each reading, a polite gap. */
export const AvoidantCouple: React.FC = () => {
  const f = useCurrentFrame();
  const breathe = 1 * Math.sin(f / 14);
  return (
    <g>
      <g transform={`translate(-52 26) scale(0.94) translate(0 ${breathe})`}>
        <Fig fill={COLORS.lavender} happy={false} />
        {/* little book */}
        <path d="M -40 24 L -14 18 L -14 42 L -40 48 Z" fill={COLORS.sky} {...sm} />
      </g>
      <g transform={`translate(52 26) scale(-0.94 0.94) translate(0 ${-breathe})`}>
        <Fig fill={COLORS.greenTeal} happy={false} />
        <path d="M -40 24 L -14 18 L -14 42 L -40 48 Z" fill={COLORS.yellowSoft} {...sm} />
      </g>
      {/* polite dotted gap down the middle */}
      <line x1={0} y1={-44} x2={0} y2={70} stroke={shade(COLORS.lavender, -0.1)} strokeWidth={STROKE.sm} strokeDasharray="4 8" strokeLinecap="round" />
      <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>"let's not"</text>
      <Label t="peaceful & separate" />
    </g>
  );
};

/** four-horsemen — four warning icon badges (criticism/defensiveness/stonewall/contempt). */
export const FourHorsemen: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.94 + 0.06 * Math.sin(f / 7);
  const Badge: React.FC<{ x: number; y: number; t: string; children: React.ReactNode }> = ({ x, y, t, children }) => (
    <g transform={`translate(${x} ${y}) scale(${pulse})`}>
      <circle cx={0} cy={0} r={34} fill={shade(COLORS.red, 0.06)} {...lg} />
      {children}
      <text x={0} y={52} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>{t}</text>
    </g>
  );
  return (
    <g>
      <Badge x={-78} y={-24} t="criticism"><path d="M -12 12 L 10 -12 M 6 -14 l 6 2 l -2 6" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" /></Badge>
      <Badge x={78} y={-24} t="defensiveness"><path d="M 0 -16 L 16 -8 L 16 6 Q 16 16 0 20 Q -16 16 -16 6 L -16 -8 Z" fill={COLORS.white} {...sm} /></Badge>
      <Badge x={-78} y={62} t="stonewalling">{[0, 1, 2].map((r) => <g key={r}>{[0, 1].map((c) => <rect key={c} x={-18 + c * 18 + (r % 2) * 9} y={-16 + r * 12} width={16} height={10} rx={2} fill={COLORS.white} stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}</g>)}</Badge>
      <Badge x={78} y={62} t="contempt"><path d="M -12 -6 Q -8 -2 -4 -6 M 4 -6 Q 8 -2 12 -6" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -10 10 Q 0 4 10 10" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" /></Badge>
      <Label t="predicts breakup" y={126} />
    </g>
  );
};

/** pursue-withdraw — one figure reaching, the other leaning away; a chase arrow loops. */
export const PursueWithdraw: React.FC = () => {
  const f = useCurrentFrame();
  const reach = 4 * Math.sin(f / 9);
  const lean = 3 * Math.sin(f / 9 + Math.PI);
  return (
    <g>
      {/* pursuer (anxious, pink) reaching right */}
      <g transform={`translate(-56 28) scale(0.94)`}>
        <Fig fill={COLORS.pink} happy={false} />
        <path d={`M 20 20 Q ${48 + reach} 10 ${64 + reach} 18`} fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* withdrawer (avoidant, navy) leaning away right */}
      <g transform={`translate(${64 + lean} 28) scale(0.94) rotate(10)`}>
        <Fig fill={COLORS.navy} happy={false} cross />
      </g>
      {/* looping chase arrow */}
      <path d="M -70 -42 Q 0 -78 70 -42" fill="none" stroke={shade(COLORS.lavender, -0.08)} strokeWidth={STROKE.sm} strokeLinecap="round" strokeDasharray="6 7" />
      <path d="M 70 -42 l -2 -14 l 14 6 Z" fill={shade(COLORS.lavender, -0.08)} />
      <text x={0} y={-66} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>the chase</text>
      <Label t="pursue → withdraw" />
    </g>
  );
};

/** secure-base-couple — two figures either side of a steady anchor; calm harbour arc. */
export const SecureBaseCouple: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 1.5 * Math.sin(f / 13);
  return (
    <g>
      {/* calm harbour arc */}
      <path d="M -96 40 Q 0 -4 96 40" fill="none" stroke={shade(COLORS.greenTeal, -0.05)} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <g transform={`translate(-58 30) scale(0.9) translate(${sway} 0)`}><Fig fill={COLORS.greenTeal} /></g>
      <g transform={`translate(58 30) scale(0.9) translate(${-sway} 0)`}><Fig fill={COLORS.sky} /></g>
      {/* anchor in the middle */}
      <g transform="translate(0 2)">
        <circle cx={0} cy={-34} r={11} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
        <line x1={0} y1={-23} x2={0} y2={40} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <line x1={-18} y1={-8} x2={18} y2={-8} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
        <path d="M -30 28 Q 0 56 30 28" fill="none" stroke={COLORS.navy} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <Label t="a safe harbour" />
    </g>
  );
};

/** best-friends-couple — two figures high-fiving under a shared "ha!" bubble + star. */
export const BestFriendsCouple: React.FC = () => {
  const f = useCurrentFrame();
  const bounce = 3 * Math.abs(Math.sin(f / 8));
  return (
    <g>
      <g transform={`translate(-54 ${30 - bounce}) scale(0.94)`}>
        <Fig fill={COLORS.yellow} />
        <path d="M 18 6 L 44 -16" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      <g transform={`translate(54 ${30 - bounce}) scale(-0.94 0.94)`}>
        <Fig fill={COLORS.greenLeaf} />
        <path d="M 18 6 L 44 -16" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
      </g>
      {/* high-five spark */}
      <g transform="translate(0 2)">{[0, 72, 144, 216, 288].map((a) => <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 16} y2={Math.sin((a * Math.PI) / 180) * 16} stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" />)}</g>
      {/* shared bubble */}
      <g transform="translate(0 -62)"><rect x={-34} y={-20} width={68} height={38} rx={14} fill={COLORS.white} {...sm} /><path d="M -6 16 l -4 12 l 14 -6 Z" fill={COLORS.white} {...sm} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>ha!</text></g>
      <Label t="companions first" />
    </g>
  );
};

/** power-couple — two figures with briefcases + trophies climbing parallel arrows. */
export const PowerCouple: React.FC = () => {
  const f = useCurrentFrame();
  const climb = 2 * Math.sin(f / 10);
  const Case: React.FC = () => <g transform="translate(26 30)"><rect x={-14} y={-10} width={28} height={20} rx={3} fill={COLORS.navyDark} {...sm} /><rect x={-6} y={-16} width={12} height={8} rx={2} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} /></g>;
  return (
    <g>
      {/* parallel upward arrows */}
      <g opacity={0.9}>
        <path d="M -40 70 L -40 -46" fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M -40 -46 l -7 12 l 14 0 Z" fill={COLORS.yellowDark} />
        <path d="M 40 70 L 40 -46" fill="none" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round" /><path d="M 40 -46 l -7 12 l 14 0 Z" fill={COLORS.yellowDark} />
      </g>
      <g transform={`translate(-40 ${30 + climb}) scale(0.82)`}><Fig fill={COLORS.navy} /><Case /></g>
      <g transform={`translate(40 ${30 - climb}) scale(0.82)`}><Fig fill={COLORS.red} /><Case /></g>
      {/* two small trophies up top */}
      <g transform="translate(-40 -66)"><path d="M -10 -8 Q -10 8 0 8 Q 10 8 10 -8 Z" fill={COLORS.yellow} {...sm} /><line x1={0} y1={8} x2={0} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><line x1={-8} y1={16} x2={8} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <g transform="translate(40 -66)"><path d="M -10 -8 Q -10 8 0 8 Q 10 8 10 -8 Z" fill={COLORS.yellow} {...sm} /><line x1={0} y1={8} x2={0} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><line x1={-8} y1={16} x2={8} y2={16} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      <Label t="two ambitions" />
    </g>
  );
};

/** enmeshed-knot — two figures merged into one tangled blob of yarn. */
export const EnmeshedKnot: React.FC = () => {
  const f = useCurrentFrame();
  const squeeze = 1 + 0.02 * Math.sin(f / 9);
  return (
    <g transform={`scale(${squeeze})`}>
      {/* merged blob body */}
      <path d="M -44 40 Q -56 -6 -14 -4 Q 0 -30 14 -4 Q 56 -6 44 40 Z" fill={COLORS.lavender} {...lg} />
      {/* two heads fused close */}
      <circle cx={-18} cy={-18} r={22} fill={COLORS.skin} {...lg} />
      <circle cx={18} cy={-18} r={22} fill={COLORS.skin} {...lg} />
      <circle cx={-25} cy={-20} r={3.2} fill={COLORS.outline} /><circle cx={-11} cy={-20} r={3.2} fill={COLORS.outline} />
      <circle cx={11} cy={-20} r={3.2} fill={COLORS.outline} /><circle cx={25} cy={-20} r={3.2} fill={COLORS.outline} />
      {/* tangled knot of yarn over the seam */}
      <g transform="translate(0 20)" stroke={COLORS.pinkDark} strokeWidth={STROKE.sm} fill="none" strokeLinecap="round">
        <path d="M -24 0 Q 0 -18 24 0 Q 0 18 -24 0 Z" />
        <path d="M -16 -12 Q 10 2 -8 16" />
        <path d="M 16 -12 Q -10 2 8 16" />
      </g>
      <Label t="two become one" />
    </g>
  );
};

/** repair-bridge — a cracked heart rejoined by a little bridge/band; two hands meet. */
export const RepairBridge: React.FC = () => {
  const f = useCurrentFrame();
  const mend = Math.min(1, (f % 90) / 50);
  const gap = 10 * (1 - mend);
  return (
    <g>
      {/* two heart-halves closing the gap */}
      <g transform={`translate(${-gap} 0)`}>
        <path d="M 0 -26 C -14 -44 -44 -34 -44 -10 C -44 10 -22 24 0 44 Z" fill={COLORS.red} {...lg} />
      </g>
      <g transform={`translate(${gap} 0)`}>
        <path d="M 0 -26 C 14 -44 44 -34 44 -10 C 44 10 22 24 0 44 Z" fill={COLORS.pink} {...lg} />
      </g>
      {/* repair band across the seam */}
      <g transform="translate(0 2) rotate(-18)">
        <rect x={-24} y={-9} width={48} height={18} rx={8} fill={COLORS.yellowSoft} {...sm} />
        <line x1={-10} y1={0} x2={10} y2={0} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeDasharray="3 4" strokeLinecap="round" />
      </g>
      {/* two small hands meeting below */}
      <path d="M -40 66 Q -16 58 -2 64" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <path d="M 40 66 Q 16 58 2 64" fill="none" stroke={COLORS.skinShade} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <Label t="rupture & repair" />
    </g>
  );
};
