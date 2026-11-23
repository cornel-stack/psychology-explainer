/**
 * iq.tsx — literal scene props for the "Every Level of IQ" video. Local origin
 * (0,0), token strokes (7/10/14 or >=15), flat two-tone. `iq-report` is
 * parametric (the number/label on the card) so one component serves every level.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A score report card showing an IQ number — the literal "your score" prop.
 *  `value` is the big number, `tone` the header colour, `label` the caption. */
export const IqReport: React.FC<{ value?: string | number; tone?: string; label?: string }> = ({ value = 100, tone = COLORS.blueDiagram, label = 'SCORE' }) => (
  <g>
    <rect x={-120} y={-150} width={240} height={300} rx={16} fill={COLORS.white} {...xl} />
    <rect x={-120} y={-150} width={240} height={64} rx={16} fill={tone} {...lg} />
    <rect x={-120} y={-98} width={240} height={10} fill={shade(tone, 0.2)} />
    <text x={0} y={-104} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.white}>
      IQ {label}
    </text>
    <text x={0} y={30} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={120} fill={COLORS.outline}>
      {value}
    </text>
    {[0, 1].map((i) => (
      <rect key={i} x={-84} y={78 + i * 28} width={i ? 110 : 168} height={10} rx={5} fill={COLORS.whiteShade} />
    ))}
  </g>
);

/** A Rubik-style puzzle cube (novel problem-solving). */
export const PuzzleCube: React.FC = () => {
  const faceA = COLORS.red;
  const faceB = COLORS.greenLeaf;
  const cell = (cx: number, cy: number, c: string) => <rect x={cx} y={cy} width={46} height={46} rx={8} fill={c} {...sm} />;
  const cols = [COLORS.red, COLORS.yellow, COLORS.sky, COLORS.greenLeaf, COLORS.pink, COLORS.lavender];
  return (
    <g>
      {/* top face (parallelogram) */}
      <path d="M 0 -120 L 130 -54 L 0 12 L -130 -54 Z" fill={shade(faceB, 0.1)} {...xl} />
      {/* left face */}
      <path d="M -130 -54 L 0 12 L 0 150 L -130 84 Z" fill={faceA} {...xl} />
      {/* right face */}
      <path d="M 130 -54 L 0 12 L 0 150 L 130 84 Z" fill={shade(faceA, 0.18)} {...xl} />
      {/* grid lines on the three faces */}
      <path d="M -43 -76 L 43 -32 M 43 -76 L -43 -32 M 0 -120 L 0 12 M -65 -87 L 65 -21" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <path d="M -130 -8 L 0 58 M -130 38 L 0 104 M -43 -32 L -43 106 M -87 -54 L -87 84" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      <path d="M 130 -8 L 0 58 M 130 38 L 0 104 M 43 -32 L 43 106 M 87 -54 L 87 84" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />
      {/* a couple of accent stickers */}
      {cell(-40, -4, cols[2])}
      {cell(44, -4, cols[3])}
    </g>
  );
};

/** A glowing lightbulb (insight / the "aha"). */
export const Lightbulb: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.4 + 0.25 * Math.sin(f / 8);
  return (
    <g>
      <circle cx={0} cy={-30} r={110} fill={COLORS.yellowSoft} opacity={glow * 0.5} />
      <path d="M -74 -20 Q -94 -120 0 -140 Q 94 -120 74 -20 Q 60 20 30 44 L -30 44 Q -60 20 -74 -20 Z" fill={COLORS.yellow} {...xl} />
      {/* filament */}
      <path d="M -24 20 L -12 -40 L 12 -40 L 24 20" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      {/* base */}
      <rect x={-34} y={44} width={68} height={26} rx={6} fill={COLORS.ledGrey} {...lg} />
      <rect x={-30} y={66} width={60} height={18} rx={6} fill={shade(COLORS.ledGrey, 0.2)} {...sm} />
      <rect x={-22} y={82} width={44} height={16} rx={6} fill={COLORS.ledGrey} {...sm} />
      {/* shine rays */}
      {[-1, 1].map((s, i) => (
        <path key={i} d={`M ${s * 120} -120 l ${s * 30} -20 M ${s * 140} -60 l ${s * 34} -6`} stroke={COLORS.yellowDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      ))}
    </g>
  );
};

/** A multiple-choice test paper with bubbles (the standardized test). */
export const TestPaper: React.FC = () => (
  <g>
    <rect x={-110} y={-150} width={220} height={300} rx={12} fill={COLORS.white} {...xl} />
    <rect x={-110} y={-150} width={220} height={44} rx={12} fill={COLORS.sky} {...lg} />
    <text x={0} y={-118} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={28} fill={COLORS.outline}>
      TEST
    </text>
    {[0, 1, 2, 3, 4].map((r) => (
      <g key={r} transform={`translate(0 ${-72 + r * 46})`}>
        <text x={-92} y={8} fontFamily={font} fontWeight={700} fontSize={24} fill={COLORS.outline}>{r + 1}</text>
        {[0, 1, 2, 3].map((c) => (
          <circle key={c} cx={-48 + c * 40} cy={0} r={13} fill={r === 1 && c === 2 ? COLORS.outline : COLORS.white} {...sm} />
        ))}
      </g>
    ))}
  </g>
);

/** Two interlocking gears (reasoning / how the mind works). */
export const Gears: React.FC = () => {
  const f = useCurrentFrame();
  const Gear: React.FC<{ r: number; teeth: number; spin: number; tone: string }> = ({ r, teeth, spin, tone }) => (
    <g transform={`rotate(${spin})`}>
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * 360;
        return <rect key={i} x={-12} y={-r - 20} width={24} height={30} rx={6} fill={tone} transform={`rotate(${a})`} {...sm} />;
      })}
      <circle r={r} fill={tone} {...xl} />
      <circle r={r * 0.4} fill={COLORS.white} {...lg} />
    </g>
  );
  return (
    <g>
      <g transform="translate(-70 0)"><Gear r={80} teeth={9} spin={f * 1.2} tone={COLORS.blueDiagram} /></g>
      <g transform="translate(78 60)"><Gear r={58} teeth={7} spin={-f * 1.6} tone={COLORS.yellow} /></g>
    </g>
  );
};

/** A stopwatch (the timed test / processing speed). */
export const Stopwatch: React.FC = () => {
  const f = useCurrentFrame();
  const a = (f * 6) % 360;
  return (
    <g>
      <circle cx={0} cy={10} r={118} fill={COLORS.white} {...xl} />
      <circle cx={0} cy={10} r={118} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} transform="scale(0.88)" transform-origin="0 10" />
      {/* top button + stem */}
      <rect x={-18} y={-128} width={36} height={34} rx={8} fill={COLORS.ledGrey} {...lg} />
      <rect x={-36} y={-100} width={72} height={20} rx={8} fill={shade(COLORS.ledGrey, 0.2)} {...sm} />
      {/* ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const t = (i / 12) * Math.PI * 2;
        return <line key={i} x1={Math.sin(t) * 96} y1={10 - Math.cos(t) * 96} x2={Math.sin(t) * 108} y2={10 - Math.cos(t) * 108} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />;
      })}
      {/* hand */}
      <line x1={0} y1={10} x2={Math.sin((a * Math.PI) / 180) * 80} y2={10 - Math.cos((a * Math.PI) / 180) * 80} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={10} r={12} fill={COLORS.outline} />
    </g>
  );
};

/** A single jigsaw piece (pattern / "fitting it together"). */
export const JigsawPiece: React.FC<{ tone?: string }> = ({ tone = COLORS.greenLeaf }) => (
  <g>
    <path
      d="M -90 -90 L -20 -90 Q -20 -130 20 -130 Q 60 -130 60 -90 L 90 -90 L 90 -20 Q 130 -20 130 20 Q 130 60 90 60 L 90 90 L -90 90 L -90 20 Q -130 20 -130 -20 Q -130 -60 -90 -60 Z"
      fill={tone}
      {...xl}
    />
    <path d="M -90 -90 L -20 -90 Q -20 -130 20 -130 Q 60 -130 60 -90 L 90 -90 L 90 -20 Q 130 -20 130 20" fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} opacity={0.4} transform="scale(0.78)" transform-origin="0 0" />
  </g>
);

/** A chess knight (strategy / reasoning). */
export const ChessKnight: React.FC<{ tone?: string }> = ({ tone = COLORS.lavender }) => (
  <g>
    {/* base */}
    <ellipse cx={0} cy={150} rx={90} ry={24} fill={shade(tone, 0.2)} {...lg} />
    <rect x={-74} y={110} width={148} height={44} rx={14} fill={tone} {...xl} />
    <rect x={-56} y={86} width={112} height={34} rx={10} fill={shade(tone, 0.12)} {...lg} />
    {/* horse head */}
    <path d="M -30 92 Q -56 10 -40 -40 Q -70 -60 -50 -100 Q -30 -80 -14 -96 Q 10 -140 60 -110 Q 92 -86 84 -30 Q 80 20 54 92 Z" fill={tone} {...xl} />
    {/* mane */}
    <path d="M 60 -110 Q 92 -70 76 10 Q 64 50 54 92" fill="none" stroke={shade(tone, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* eye + muzzle */}
    <circle cx={-18} cy={-62} r={9} fill={COLORS.outline} />
    <path d="M -50 -96 l -18 -6" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
  </g>
);
