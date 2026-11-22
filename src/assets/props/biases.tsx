/**
 * biases.tsx — props for the "cognitive biases" video. Local origin (0,0),
 * token strokes, flat two-tone. Built to be reused with context across biases.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A sale price tag: big new price, struck-through old price (anchoring). */
export const PriceTag: React.FC = () => (
  <g transform="rotate(-10)">
    <path d="M -150 -70 L 70 -70 Q 150 0 70 70 L -150 70 Z" fill={COLORS.yellow} {...xl} />
    <circle cx={52} cy={0} r={18} fill={COLORS.bgCream} {...lg} />
    <text x={-120} y={-18} fontFamily={font} fontWeight={700} fontSize={34} fill={COLORS.redDark} textDecoration="line-through">$200</text>
    <line x1={-124} y1={-28} x2={-36} y2={-28} stroke={COLORS.redDark} strokeWidth={STROKE.sm} />
    <text x={-120} y={44} fontFamily={font} fontWeight={800} fontSize={54} fill={COLORS.outline}>$89</text>
  </g>
);

/** A TV / monitor showing a little scene (sunk-cost movie, availability news). */
export const TvScreen: React.FC<{ mode?: 'movie' | 'news' }> = ({ mode = 'movie' }) => (
  <g>
    <rect x={-170} y={-120} width={340} height={230} rx={22} fill={COLORS.shirtDark} {...xl} />
    <rect x={-146} y={-98} width={292} height={176} rx={10} fill={mode === 'news' ? COLORS.sky : COLORS.wallNight} />
    {mode === 'news' ? (
      <g>
        <rect x={-146} y={40} width={292} height={38} fill={COLORS.red} />
        <text x={0} y={68} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.white}>BREAKING</text>
        <circle cx={-90} cy={-30} r={26} fill={COLORS.yellow} {...sm} />
      </g>
    ) : (
      <g>
        <path d="M -30 -30 L 30 0 L -30 30 Z" fill={COLORS.white} {...sm} />
      </g>
    )}
    <rect x={-40} y={110} width={80} height={16} rx={6} fill={COLORS.shirtDarker} />
    <rect x={-90} y={124} width={180} height={14} rx={6} fill={COLORS.shirtDark} />
  </g>
);

/** A balance scale, left pan heavier (loss aversion: loss > gain). */
export const BalanceScale: React.FC = () => (
  <g>
    <rect x={-8} y={-120} width={16} height={240} rx={8} fill={COLORS.woodDark} {...lg} />
    <ellipse cx={0} cy={120} rx={70} ry={20} fill={COLORS.woodDark} {...lg} />
    {/* beam tilted: left down */}
    <g transform="rotate(10)">
      <rect x={-180} y={-110} width={360} height={16} rx={8} fill={COLORS.wood} {...lg} />
      <line x1={-170} y1={-102} x2={-170} y2={-40} {...sm} />
      <line x1={170} y1={-102} x2={170} y2={-70} {...sm} />
      <path d="M -220 -40 Q -170 40 -120 -40 Z" fill={COLORS.red} {...lg} />
      <path d="M 120 -70 Q 170 -4 220 -70 Z" fill={COLORS.greenLeaf} {...lg} />
    </g>
    <text x={-170} y={60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.redDark}>LOSE</text>
    <text x={170} y={10} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.greenDark}>WIN</text>
  </g>
);

/** A gold crown (halo effect). */
export const Crown: React.FC = () => {
  const f = useCurrentFrame();
  const sh = Math.sin(f / 10) * 0.08;
  return (
    <g transform={`scale(${1 + sh} ${1 - sh})`}>
      <path d="M -120 60 L -140 -70 L -60 0 L 0 -90 L 60 0 L 140 -70 L 120 60 Z" fill={COLORS.yellow} {...xl} />
      <rect x={-120} y={56} width={240} height={34} rx={10} fill={COLORS.yellowDark} {...lg} />
      {[-70, 0, 70].map((x, i) => (
        <circle key={i} cx={x} cy={-40} r={13} fill={COLORS.red} {...sm} />
      ))}
    </g>
  );
};

/** A slot machine (loss aversion / gambling). */
export const SlotMachine: React.FC = () => {
  const f = useCurrentFrame();
  const sym = ['7', '$', '★'];
  return (
    <g>
      <rect x={-110} y={-150} width={220} height={320} rx={26} fill={COLORS.red} {...xl} />
      <rect x={-90} y={-130} width={180} height={70} rx={12} fill={COLORS.yellow} {...lg} />
      <text x={0} y={-80} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={40} fill={COLORS.outline}>LUCK</text>
      <rect x={-86} y={-44} width={172} height={110} rx={12} fill={COLORS.white} {...lg} />
      {[-54, 0, 54].map((x, i) => (
        <g key={i}>
          <rect x={x - 24} y={-36} width={48} height={94} rx={8} fill={COLORS.bgCream} {...sm} />
          <text x={x} y={28} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={44} fill={COLORS.outline}>
            {sym[(Math.floor(f / 6) + i) % 3]}
          </text>
        </g>
      ))}
      <rect x={-70} y={90} width={140} height={54} rx={14} fill={COLORS.shirtDark} {...lg} />
      {/* lever */}
      <line x1={110} y1={-60} x2={150} y2={-110} {...lg} />
      <circle cx={152} cy={-116} r={18} fill={COLORS.red} {...lg} />
    </g>
  );
};

/** Two dice. */
export const Dice: React.FC = () => {
  const pips = (n: number, cx: number, cy: number) => {
    const map: Record<number, [number, number][]> = {
      3: [[-1, -1], [0, 0], [1, 1]],
      5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    };
    return (map[n] || []).map(([dx, dy], i) => <circle key={i} cx={cx + dx * 26} cy={cy + dy * 26} r={8} fill={COLORS.outline} />);
  };
  return (
    <g>
      <g transform="translate(-60 20) rotate(-8)"><rect x={-54} y={-54} width={108} height={108} rx={18} fill={COLORS.white} {...xl} />{pips(5, 0, 0)}</g>
      <g transform="translate(70 -20) rotate(10)"><rect x={-54} y={-54} width={108} height={108} rx={18} fill={COLORS.red} {...xl} />{pips(3, 0, 0)}</g>
    </g>
  );
};

/** A bomber seen from above, dotted with bullet holes (survivorship). */
export const PlaneBullet: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={48} ry={150} fill={COLORS.greenTeal} {...xl} />
    <path d="M -210 20 L 210 20 L 150 70 L -150 70 Z" fill={COLORS.greenTeal} {...xl} />
    <path d="M -70 -150 L 70 -150 L 50 -120 L -50 -120 Z" fill={COLORS.greenTeal} {...lg} />
    <ellipse cx={0} cy={-110} rx={26} ry={34} fill={COLORS.sky} {...sm} />
    {/* bullet holes (on wings/tail — where survivors got hit) */}
    {[[-120, 40], [-80, 48], [100, 44], [140, 50], [0, 120], [-20, 90], [30, 90]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={9} fill={COLORS.outline} />
    ))}
  </g>
);

/** Five stars, mostly filled + one red (negativity bias / reviews). */
export const StarRating: React.FC<{ bad?: number }> = ({ bad = 1 }) => {
  const star = (x: number, fill: string) => (
    <path d={`M ${x} -26 l 8 18 20 2 -15 13 5 20 -18 -11 -18 11 5 -20 -15 -13 20 -2 z`} fill={fill} {...sm} transform="scale(1.6)" />
  );
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const x = (i - 2) * 64;
        const isBad = i >= 5 - bad;
        return <g key={i}>{star(x / 1.6, isBad ? COLORS.red : COLORS.yellow)}</g>;
      })}
    </g>
  );
};

/** A mystical horoscope / fortune card (Barnum effect). */
export const HoroscopeCard: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-110} y={-150} width={220} height={300} rx={24} fill={COLORS.lavender} {...xl} />
      <rect x={-86} y={-126} width={172} height={252} rx={14} fill={COLORS.purpleDeep} />
      {/* crescent + stars */}
      <path d="M 10 -60 a 44 44 0 1 0 26 70 a 34 34 0 1 1 -26 -70 z" fill={COLORS.yellowSoft} />
      {[[-50, -80, 0], [-60, 40, 1.4], [50, 80, 2.8]].map(([x, y, p], i) => (
        <path key={i} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 10 + p))} d={`M ${x} ${y - 12} l 3 9 9 1 -7 6 2 9 -7 -5 -7 5 2 -9 -7 -6 9 -1 z`} fill={COLORS.white} />
      ))}
      <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={26} fill={COLORS.yellowSoft}>★ YOU ★</text>
    </g>
  );
};

/** A trophy (winners / survivorship / success). */
export const Trophy: React.FC = () => (
  <g>
    <path d="M -80 -110 L 80 -110 L 70 -30 Q 0 40 -70 -30 Z" fill={COLORS.yellow} {...xl} />
    <path d="M -80 -90 Q -140 -80 -120 -10 Q -108 20 -70 10" fill="none" {...lg} />
    <path d="M 80 -90 Q 140 -80 120 -10 Q 108 20 70 10" fill="none" {...lg} />
    <rect x={-20} y={30} width={40} height={50} fill={COLORS.yellowDark} {...lg} />
    <rect x={-70} y={80} width={140} height={34} rx={8} fill={COLORS.woodDark} {...lg} />
    <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={48} fill={COLORS.yellowDark}>1</text>
  </g>
);

/** Magnifying glass (confirmation bias: searching for proof). */
export const MagnifyingGlass: React.FC = () => (
  <g transform="rotate(20)">
    <circle cx={0} cy={-30} r={86} fill={COLORS.sky} opacity={0.5} {...xl} />
    <circle cx={0} cy={-30} r={86} fill="none" {...xl} />
    <rect x={-18} y={50} width={36} height={130} rx={18} fill={COLORS.woodDark} {...lg} transform="rotate(-20 0 90)" />
    <path d="M -34 -46 L -10 -22 M 10 -42 L 34 -18" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);

/** A wall calendar with a circled date (optimism bias / deadlines). */
export const Calendar: React.FC = () => (
  <g>
    <rect x={-120} y={-130} width={240} height={250} rx={18} fill={COLORS.white} {...xl} />
    <rect x={-120} y={-130} width={240} height={56} rx={18} fill={COLORS.red} {...lg} />
    <circle cx={-70} cy={-130} r={14} fill={COLORS.shirtDark} {...sm} />
    <circle cx={70} cy={-130} r={14} fill={COLORS.shirtDark} {...sm} />
    {Array.from({ length: 12 }).map((_, i) => {
      const x = -86 + (i % 4) * 58;
      const y = -36 + Math.floor(i / 4) * 54;
      return <rect key={i} x={x - 18} y={y - 18} width={36} height={36} rx={6} fill={COLORS.bgCream} {...strokeProps(STROKE.sm)} />;
    })}
    <circle cx={30} cy={72} r={30} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} />
  </g>
);

/** A stack of coins (money / sunk cost / value). */
export const Coins: React.FC = () => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${(i % 2) * 6 - 3} ${60 - i * 34})`}>
        <ellipse cx={0} cy={0} rx={70} ry={26} fill={COLORS.yellow} {...lg} />
        <ellipse cx={0} cy={-6} rx={70} ry={26} fill={COLORS.yellowSoft} {...lg} />
        <text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.yellowDark}>$</text>
      </g>
    ))}
  </g>
);

/** A simple cartoon brain (generic mechanism prop). */
export const Brain: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 1 + 0.04 * Math.sin(f / 8);
  return (
    <g transform={`scale(${pulse})`}>
      <path d="M -10 -90 Q -90 -100 -96 -30 Q -140 -10 -110 40 Q -120 96 -40 96 Q -10 120 -10 90 Z" fill={COLORS.pink} {...xl} />
      <path d="M 10 -90 Q 90 -100 96 -30 Q 140 -10 110 40 Q 120 96 40 96 Q 10 120 10 90 Z" fill={COLORS.pink} {...xl} />
      <path d="M -10 -70 Q -40 -40 -20 -10 Q -50 20 -24 50 M 10 -70 Q 40 -40 20 -10 Q 50 20 24 50" fill="none" stroke={shade(COLORS.pink, 0.22)} strokeWidth={STROKE.sm} />
      <rect x={-6} y={-90} width={12} height={180} fill={shade(COLORS.pink, 0.16)} />
    </g>
  );
};

/** A green check / red cross badge (for fork outcomes). */
export const CheckBadge: React.FC<{ ok?: boolean }> = ({ ok = true }) => (
  <g>
    <circle r={48} fill={ok ? COLORS.greenLeaf : COLORS.red} {...xl} />
    {ok ? (
      <path d="M -22 2 L -6 20 L 24 -18" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M -18 -18 L 18 18 M 18 -18 L -18 18" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" />
    )}
  </g>
);
