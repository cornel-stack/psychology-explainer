/**
 * offline.tsx — props for "The Psychology of People Who Don't Use Social Media",
 * shot like a nature documentary. Local origin (0,0), token strokes, flat
 * two-tone. The visual metaphors: the glowing phone, the infinite-scroll
 * waterfall, the comparison mirror, the FOMO ghost, the highlight reel, the
 * notification swarm, boredom sprouting into creativity, the naturalist's
 * binoculars.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A phone held screen-up, casting a cold blue light cone (the glow-dweller's
 *  tool — the thing the specimen has put down). */
export const GlowingPhone: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.5 + 0.12 * Math.sin(f / 3);
  return (
    <g>
      {/* light cone upward */}
      <path d="M -70 -20 L -150 -220 L 150 -220 L 70 -20 Z" fill={COLORS.sky} opacity={0.35 * flick} />
      {/* phone body */}
      <rect x={-72} y={-20} width={144} height={60} rx={16} fill={COLORS.shirtDark} {...xl} transform="rotate(-10)" />
      <rect x={-58} y={-10} width={116} height={40} rx={8} fill={COLORS.sky} {...lg} transform="rotate(-10)" />
      {/* tiny feed lines on screen */}
      <g transform="rotate(-10)">
        <rect x={-46} y={-2} width={90} height={7} rx={3} fill={COLORS.white} opacity={0.85} />
        <rect x={-46} y={12} width={66} height={7} rx={3} fill={COLORS.white} opacity={0.7} />
      </g>
    </g>
  );
};

/** An endless scroll: a phone spilling a waterfall of identical feed-cards that
 *  never ends (the infinite feed). */
export const ScrollFeed: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = (f * 2) % 70;
  const cols = [COLORS.pink, COLORS.sky, COLORS.yellowSoft, COLORS.lavender, COLORS.greenTeal];
  return (
    <g>
      {/* phone frame (top) */}
      <rect x={-96} y={-180} width={192} height={150} rx={26} fill={COLORS.shirtDark} {...xl} />
      <rect x={-78} y={-162} width={156} height={120} rx={10} fill={COLORS.bgCream} />
      {/* waterfall of cards falling below, looping */}
      <g>
        {Array.from({ length: 7 }).map((_, i) => {
          const y = -150 + i * 70 + scroll;
          return (
            <g key={i} transform={`translate(0 ${y})`} opacity={y > 260 ? 0 : 1}>
              <rect x={-74} y={0} width={148} height={54} rx={10} fill={cols[i % cols.length]} {...sm} />
              <circle cx={-50} cy={27} r={16} fill={COLORS.white} opacity={0.9} />
              <rect x={-24} y={12} width={88} height={9} rx={4} fill={COLORS.white} opacity={0.85} />
              <rect x={-24} y={30} width={60} height={9} rx={4} fill={COLORS.white} opacity={0.7} />
            </g>
          );
        })}
      </g>
      {/* fade/▼ hint that it never ends */}
      <text x={0} y={250} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={44} fill={COLORS.outline} opacity={0.5}>▼</text>
    </g>
  );
};

/** An ornate mirror whose reflection is an idealized, crowned, sparkly "better"
 *  version (the comparison trap — everyone else's highlight reel). */
export const ComparisonMirror: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={120} ry={158} fill={COLORS.yellowDark} {...xl} />
    <ellipse cx={0} cy={0} rx={96} ry={134} fill={COLORS.lavender} {...lg} />
    {/* idealized reflection: crowned figure + sparkle + hearts */}
    <g>
      <circle cx={0} cy={-6} r={56} fill={COLORS.white} {...sm} />
      <circle cx={-20} cy={-14} r={8} fill={COLORS.outline} />
      <circle cx={20} cy={-14} r={8} fill={COLORS.outline} />
      <path d="M -16 14 Q 0 28 16 14" fill="none" {...sm} />
      {/* crown */}
      <path d="M -40 -54 L -28 -30 L 0 -48 L 28 -30 L 40 -54 L 30 -18 L -30 -18 Z" fill={COLORS.yellow} {...sm} />
      {/* sparkle + hearts */}
      <path d="M 60 -70 l 6 16 l 16 6 l -16 6 l -6 16 l -6 -16 l -16 -6 l 16 -6 Z" fill={COLORS.yellow} {...sm} />
      <path d="M -70 40 Q -80 26 -64 22 Q -54 24 -56 36 Q -62 46 -70 40 Z" fill={COLORS.red} />
    </g>
    {/* glass glare */}
    <path d="M -54 -96 L -28 -96 L -62 70 L -88 70 Z" fill={COLORS.white} opacity={0.22} />
    {/* stand */}
    <path d="M -36 158 L 36 158 L 60 214 L -60 214 Z" fill={COLORS.woodDark} {...lg} />
  </g>
);

/** A cute translucent "FOMO" ghost reaching out (the fear of missing out — which
 *  can't find the specimen). */
export const FomoGhost: React.FC = () => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 14) * 8;
  return (
    <g transform={`translate(0 ${bob})`} opacity={0.9}>
      <path d="M -90 60 Q -90 -110 0 -110 Q 90 -110 90 60 L 64 40 L 42 64 L 20 40 L 0 64 L -20 40 L -42 64 L -64 40 Z" fill={COLORS.sky} opacity={0.55} {...xl} />
      <circle cx={-30} cy={-30} r={13} fill={COLORS.outline} />
      <circle cx={30} cy={-30} r={13} fill={COLORS.outline} />
      <ellipse cx={0} cy={6} rx={16} ry={22} fill={COLORS.outline} opacity={0.5} />
      {/* little arms reaching */}
      <path d="M -90 -20 q -40 0 -44 36 M 90 -20 q 40 0 44 36" fill="none" stroke={COLORS.sky} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.55} />
      <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.skyDark}>FOMO</text>
    </g>
  );
};

/** A film strip of three "perfect" moments — beach, trophy, feast (the curated
 *  highlight reel everyone else is posting). */
export const HighlightReel: React.FC = () => {
  const frames: [string, React.ReactNode][] = [
    [COLORS.sky, <g key="s"><circle cx={0} cy={-10} r={16} fill={COLORS.yellow} /><path d="M -34 20 Q 0 2 34 20" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} /></g>],
    [COLORS.yellowSoft, <g key="t"><path d="M -14 -24 L 14 -24 L 10 6 L -10 6 Z" fill={COLORS.yellow} {...sm} /><rect x={-10} y={6} width={20} height={16} fill={COLORS.yellowDark} /></g>],
    [COLORS.pink, <path key="h" d="M 0 16 Q -26 -8 -14 -22 Q 0 -28 0 -14 Q 0 -28 14 -22 Q 26 -8 0 16 Z" fill={COLORS.red} />],
  ];
  return (
    <g>
      <rect x={-210} y={-80} width={420} height={160} rx={14} fill={COLORS.shirtDark} {...xl} />
      {/* sprocket holes */}
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <rect x={-196 + i * 60} y={-72} width={24} height={16} rx={4} fill={COLORS.white} />
          <rect x={-196 + i * 60} y={56} width={24} height={16} rx={4} fill={COLORS.white} />
        </g>
      ))}
      {frames.map(([c, node], i) => (
        <g key={i} transform={`translate(${-130 + i * 130} 0)`}>
          <rect x={-56} y={-42} width={112} height={88} rx={8} fill={c} {...sm} />
          {node}
        </g>
      ))}
    </g>
  );
};

/** A buzzing swarm of red notification badges (the constant pings the specimen
 *  silenced). */
export const NotificationSwarm: React.FC = () => {
  const f = useCurrentFrame();
  const dots: [number, number, string][] = [
    [-90, -40, '9+'], [10, -80, '3'], [90, -20, '5'], [-40, 50, '12'], [70, 60, '1'], [0, -10, '99+'],
  ];
  return (
    <g>
      {dots.map(([x, y, n], i) => {
        const wob = Math.sin(f / 7 + i) * 6;
        return (
          <g key={i} transform={`translate(${x} ${y + wob})`}>
            {/* little wings */}
            <path d={`M -26 -6 q -18 -14 -30 -2 q 14 6 30 6 Z M 26 -6 q 18 -14 30 -2 q -14 6 -30 6 Z`} fill={COLORS.sky} opacity={0.6} {...sm} />
            <circle r={i === 5 ? 34 : 26} fill={COLORS.red} {...lg} />
            <text x={0} y={i === 5 ? 10 : 8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={i === 5 ? 26 : 22} fill={COLORS.white}>{n}</text>
          </g>
        );
      })}
    </g>
  );
};

/** A seedling sprouting from a pot (boredom and quiet → new ideas, growth). */
export const SeedSprout: React.FC = () => {
  const f = useCurrentFrame();
  const grow = Math.min(1, (f % 120) / 90);
  const h = 40 + grow * 120;
  return (
    <g>
      {/* pot */}
      <path d="M -70 40 L 70 40 L 54 150 L -54 150 Z" fill={COLORS.wood} {...xl} />
      <rect x={-80} y={18} width={160} height={30} rx={10} fill={shade(COLORS.wood, 0.12)} {...lg} />
      {/* soil */}
      <ellipse cx={0} cy={34} rx={66} ry={14} fill={COLORS.woodDark} />
      {/* stem */}
      <path d={`M 0 34 Q ${-10 * grow} ${34 - h / 2} 0 ${34 - h}`} fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* leaves */}
      <path d={`M 0 ${34 - h * 0.6} Q -54 ${34 - h * 0.6 - 30} -30 ${34 - h * 0.6 + 14} Q -4 ${34 - h * 0.6} 0 ${34 - h * 0.6}`} fill={COLORS.greenLeaf} {...sm} />
      <path d={`M 0 ${34 - h * 0.85} Q 54 ${34 - h * 0.85 - 30} 30 ${34 - h * 0.85 + 14} Q 4 ${34 - h * 0.85} 0 ${34 - h * 0.85}`} fill={COLORS.greenLeaf} {...sm} />
      {/* little bud */}
      <circle cx={0} cy={34 - h} r={14} fill={COLORS.pink} {...sm} />
    </g>
  );
};

/** Binoculars — the naturalist narrator's observing tool (the nature-doc motif). */
export const Binoculars: React.FC = () => (
  <g>
    {[-62, 62].map((x, i) => (
      <g key={i}>
        <rect x={x - 46} y={-70} width={92} height={150} rx={26} fill={COLORS.greenTeal} {...xl} />
        <rect x={x - 46} y={-70} width={92} height={40} rx={20} fill={shade(COLORS.greenTeal, 0.16)} />
        <circle cx={x} cy={70} r={38} fill={COLORS.shirtDark} {...lg} />
        <circle cx={x} cy={70} r={22} fill={COLORS.sky} opacity={0.6} />
      </g>
    ))}
    {/* bridge */}
    <rect x={-20} y={-30} width={40} height={40} rx={10} fill={COLORS.woodDark} {...lg} />
    <rect x={-70} y={-60} width={140} height={22} rx={10} fill={COLORS.woodDark} {...sm} />
  </g>
);
