/**
 * attachment.tsx — literal scene props for the "attachment styles" video.
 * Local origin (0,0), token strokes (7/10/14 or >=15), flat two-tone. Several are
 * parametric (label text) so one component serves many literal beats.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A phone showing sent-but-unanswered texts + a red badge (the anxious wait,
 *  read receipts, "why haven't they replied"). `count` sets the badge number. */
export const PhoneUnread: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <g>
    <rect x={-112} y={-204} width={224} height={408} rx={34} fill={COLORS.shirtDark} {...xl} />
    <rect x={-92} y={-176} width={184} height={352} rx={14} fill={COLORS.white} {...lg} />
    {/* notch */}
    <rect x={-30} y={-176} width={60} height={18} rx={9} fill={COLORS.shirtDark} />
    {/* three sent (blue) bubbles, right-aligned, no reply */}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={-6 - i * 0} y={-140 + i * 56} width={84} height={42} rx={16} fill={COLORS.blueDiagram} {...sm} />
        <rect x={6} y={-128 + i * 56} width={56} height={8} rx={4} fill={COLORS.white} opacity={0.85} />
      </g>
    ))}
    {/* "Delivered" / read, no answer */}
    <text x={78} y={46} textAnchor="end" fontFamily={font} fontWeight={700} fontSize={20} fill={COLORS.ledGrey}>
      Read 9:41
    </text>
    {/* grey empty reply line */}
    <rect x={-78} y={96} width={70} height={36} rx={16} fill={COLORS.whiteShade} {...sm} />
    {/* red unread badge */}
    <g transform="translate(86 -176)">
      <circle r={34} fill={COLORS.red} {...lg} />
      <text x={0} y={12} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={36} fill={COLORS.white}>
        {count}
      </text>
    </g>
  </g>
);

/** A stack of ABC baby blocks (the nursery / Strange Situation origin). */
export const ToyBlocks: React.FC = () => {
  const cubes: [number, number, string, string][] = [
    [-70, 86, COLORS.red, 'A'],
    [70, 86, COLORS.sky, 'B'],
    [0, -30, COLORS.yellow, 'C'],
  ];
  return (
    <g>
      {cubes.map(([x, y, c, ch], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x={-56} y={-56} width={112} height={112} rx={16} fill={c} {...xl} />
          <rect x={-56} y={-56} width={112} height={30} rx={14} fill={shade(c, 0.16)} />
          <text x={0} y={22} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={66} fill={COLORS.white} stroke={COLORS.outline} strokeWidth={STROKE.sm}>
            {ch}
          </text>
        </g>
      ))}
    </g>
  );
};

/** A brick wall segment (avoidant "builds a wall" / shuts down). */
export const BrickWall: React.FC = () => {
  const rows = 5;
  const cols = 4;
  const bw = 100;
  const bh = 48;
  return (
    <g>
      <rect x={-cols * bw / 2 - 8} y={-rows * bh / 2 - 8} width={cols * bw + 16} height={rows * bh + 16} rx={10} fill={shade(COLORS.redDark, 0.2)} {...xl} />
      {Array.from({ length: rows }).map((_, r) => {
        const off = r % 2 ? bw / 2 : 0;
        return (
          <g key={r}>
            {Array.from({ length: cols + 1 }).map((_, c) => {
              const x = -cols * bw / 2 + c * bw - off;
              const y = -rows * bh / 2 + r * bh;
              return <rect key={c} x={x + 4} y={y + 4} width={bw - 8} height={bh - 8} rx={6} fill={COLORS.red} {...sm} />;
            })}
          </g>
        );
      })}
    </g>
  );
};

/** A turtle pulled into its shell, only worried eyes peeking (avoidant retreat). */
export const TurtleShell: React.FC = () => (
  <g>
    {/* tucked legs / nubs */}
    {[[-120, 70], [120, 70], [-96, 96], [96, 96]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={30} ry={22} fill={COLORS.greenDark} {...lg} />
    ))}
    {/* shell dome */}
    <path d="M -150 80 Q -150 -110 0 -110 Q 150 -110 150 80 Z" fill={COLORS.greenLeaf} {...xl} />
    <path d="M -150 80 Q -150 -110 0 -110 Q 150 -110 150 80 Z" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} transform="scale(0.8)" transform-origin="0 0" />
    {/* hexagon scutes */}
    <path d="M 0 -84 L 40 -60 L 40 -12 L 0 12 L -40 -12 L -40 -60 Z" fill={shade(COLORS.greenLeaf, 0.18)} {...sm} />
    <path d="M -40 -12 L 0 12 L 0 60 M 40 -12 L 0 12" fill="none" stroke={shade(COLORS.greenLeaf, 0.2)} strokeWidth={STROKE.sm} />
    {/* small head peeking, worried */}
    <g transform="translate(0 78)">
      <ellipse cx={0} cy={0} rx={48} ry={38} fill={COLORS.greenDark} {...lg} />
      <circle cx={-18} cy={-4} r={7} fill={COLORS.outline} />
      <circle cx={18} cy={-4} r={7} fill={COLORS.outline} />
      <path d="M -14 16 Q 0 8 14 16" fill="none" {...sm} />
    </g>
  </g>
);

/** A steady anchor (secure = a safe, reliable base to come back to). */
export const Anchor: React.FC<{ tone?: string }> = ({ tone = COLORS.skyDark }) => (
  <g>
    {/* ring */}
    <circle cx={0} cy={-150} r={34} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} />
    <circle cx={0} cy={-150} r={34} fill="none" stroke={tone} strokeWidth={STROKE.sm} />
    {/* shank */}
    <rect x={-14} y={-120} width={28} height={230} rx={10} fill={tone} {...lg} />
    {/* stock crossbar */}
    <rect x={-90} y={-92} width={180} height={28} rx={14} fill={tone} {...lg} />
    {/* arms + flukes */}
    <path d="M 0 110 Q -130 110 -130 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <path d="M 0 110 Q 130 110 130 0" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <path d="M -130 0 l -34 6 l 30 40 Z" fill={tone} {...lg} />
    <path d="M 130 0 l 34 6 l -30 40 Z" fill={tone} {...lg} />
  </g>
);

/** Two wine glasses clinking (a date — how each style shows up in dating). */
export const WineGlasses: React.FC = () => {
  const Glass: React.FC<{ flip?: boolean }> = ({ flip }) => (
    <g transform={flip ? 'scale(-1,1)' : undefined}>
      <path d="M -54 -120 Q -54 -30 0 -20 Q 54 -30 54 -120 Z" fill={COLORS.red} {...lg} />
      <path d="M -54 -120 Q -54 -86 0 -80 Q 54 -86 54 -120 Z" fill={shade(COLORS.red, 0.18)} />
      <path d="M -54 -120 Q -60 -40 0 -20 Q 60 -40 54 -120" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.4} />
      <rect x={-6} y={-22} width={12} height={110} rx={5} fill={COLORS.white} {...sm} />
      <ellipse cx={0} cy={94} rx={52} ry={16} fill={COLORS.white} {...lg} />
    </g>
  );
  return (
    <g>
      <g transform="translate(-54 0) rotate(-14)"><Glass /></g>
      <g transform="translate(54 0) rotate(14)"><Glass flip /></g>
      {/* clink spark */}
      <g transform="translate(0 -120)" stroke={COLORS.yellowDark} strokeWidth={STROKE.sm} strokeLinecap="round">
        <line x1={0} y1={-18} x2={0} y2={-40} />
        <line x1={-16} y1={-10} x2={-32} y2={-24} />
        <line x1={16} y1={-10} x2={32} y2={-24} />
      </g>
    </g>
  );
};

/** A folded note with a heart seal (secure = naming the feeling out loud).
 *  `label` sets the short line shown across it. */
export const LoveNote: React.FC<{ label?: string }> = ({ label = 'I feel…' }) => (
  <g>
    <rect x={-120} y={-90} width={240} height={180} rx={12} fill={COLORS.white} {...xl} />
    <rect x={-120} y={-90} width={240} height={40} rx={12} fill={COLORS.bgCreamDark} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={-96} y={-30 + i * 30} width={i === 2 ? 110 : 180} height={10} rx={5} fill={COLORS.whiteShade} />
    ))}
    <text x={-96} y={-58} fontFamily={font} fontWeight={700} fontSize={30} fill={COLORS.outline}>
      {label}
    </text>
    {/* heart wax seal */}
    <g transform="translate(96 72)">
      <circle r={30} fill={COLORS.pink} {...lg} />
      <path d="M 0 8 Q -16 -10 -8 -16 Q 0 -18 0 -8 Q 0 -18 8 -16 Q 16 -10 0 8 Z" fill={COLORS.red} />
    </g>
  </g>
);

/** A heart-bulb thermometer reading high (the anxious mind constantly checking
 *  the "temperature" of the relationship). */
export const RelationshipThermometer: React.FC = () => {
  const f = useCurrentFrame();
  const wob = Math.sin(f / 10) * 4;
  return (
    <g>
      {/* tube */}
      <rect x={-22} y={-170} width={44} height={240} rx={22} fill={COLORS.white} {...xl} />
      {/* mercury rising near the top */}
      <rect x={-10} y={-150 + wob} width={20} height={200 - wob} rx={10} fill={COLORS.red} />
      {/* ticks */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={22} y1={-130 + i * 44} x2={44} y2={-130 + i * 44} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      ))}
      {/* heart bulb at the base */}
      <g transform="translate(0 110)">
        <path d="M 0 44 Q -58 -6 -58 -40 Q -58 -78 -22 -78 Q -2 -78 0 -52 Q 2 -78 22 -78 Q 58 -78 58 -40 Q 58 -6 0 44 Z" fill={COLORS.red} {...xl} />
      </g>
    </g>
  );
};
