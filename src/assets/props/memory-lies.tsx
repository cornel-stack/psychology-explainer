/**
 * memory-lies.tsx — ALL-NEW art for "Every Way Your Memory Lies to You". The core
 * (memory-rebuild), the distortions (misinformation-edit, false-memory, source-mixup,
 * mandela-shared, flashbulb-blur, retell-drift, rosy-past, imagine-inflate), and the
 * wisdom (confidence-gauge). Token strokes, centered on origin, ~300px tall.
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

/** memory-rebuild — a memory 'photo' being reassembled from scattered puzzle fragments. */
export const MemoryRebuild: React.FC = () => {
  const f = useCurrentFrame();
  const settle = 0.5 + 0.5 * Math.sin(f / 12);
  return (
    <g>
      <rect x={-70} y={-56} width={140} height={112} rx={10} fill={COLORS.white} {...xl} />
      {/* fragments, some drifting in */}
      {[[-40, -28, COLORS.sky, 0], [10, -30, COLORS.pink, 1], [-30, 14, COLORS.yellow, 1], [26, 10, COLORS.greenTeal, 0]].map(([x, y, c, drift], i) => (
        <rect key={i} x={(x as number) - 18 + (drift ? settle * 10 - 5 : 0)} y={(y as number) - 14} width={36} height={28} rx={4} fill={c as string} opacity={0.8} transform={`rotate(${i * 8 - 12} ${x} ${y})`} />
      ))}
      {/* a missing gap filled with a '?' */}
      <rect x={-4} y={-14} width={34} height={28} rx={4} fill="none" stroke={COLORS.red} strokeWidth={STROKE.sm} strokeDasharray="4 5" transform="translate(-14 16)" />
      <text x={-1} y={38} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>?</text>
      <Label t="rebuilt, not replayed" />
    </g>
  );
};

/** misinformation-edit — a leading question pen editing a memory line. */
export const MisinformationEdit: React.FC = () => {
  const f = useCurrentFrame();
  const write = (f % 50) / 50;
  return (
    <g>
      <rect x={-84} y={-50} width={168} height={100} rx={10} fill={COLORS.white} {...xl} />
      <text x={-66} y={-18} fontFamily={font} fontWeight={700} fontSize={16} fill={COLORS.outline}>it was</text>
      {/* original word struck, replaced */}
      <text x={-6} y={-18} fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.ledGrey}>blue</text>
      <line x1={-8} y1={-23} x2={34} y2={-23} stroke={COLORS.red} strokeWidth={STROKE.sm} />
      <text x={-6} y={10} fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.red}>...green?</text>
      {/* the editing pen */}
      <g transform={`translate(${-10 + write * 40} 24) rotate(40)`}><rect x={-4} y={-30} width={8} height={44} rx={2} fill={COLORS.sky} {...sm} /><path d="M -4 14 L 4 14 L 0 26 Z" fill={COLORS.outline} /></g>
      <Label t="a leading question rewrites it" />
    </g>
  );
};

/** false-memory — a vivid, solid memory with a faint 'never happened' ghost behind it. */
export const FalseMemory: React.FC = () => {
  const f = useCurrentFrame();
  const shimmer = 0.4 + 0.3 * Math.sin(f / 6);
  return (
    <g>
      {/* ghostly 'never happened' halo */}
      <rect x={-64} y={-50} width={128} height={100} rx={10} fill={COLORS.lavender} opacity={shimmer * 0.4} transform="translate(10 -8) rotate(6)" />
      {/* the vivid, confident 'memory' */}
      <rect x={-64} y={-50} width={128} height={100} rx={10} fill={COLORS.yellowSoft} {...xl} />
      <circle cx={0} cy={-10} r={22} fill={COLORS.skin} {...sm} /><path d="M -10 -4 Q 0 4 10 -4" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M 0 24 l 3 7 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 Z" fill={COLORS.yellow} />
      <text x={56} y={-44} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.lavenderDark} opacity={0.7}>✗</text>
      <Label t="a memory that never happened" />
    </g>
  );
};

/** source-mixup — three tangled threads (seen / dreamed / heard) knotted together. */
export const SourceMixup: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 3 * Math.sin(f / 10);
  const tags = [{ t: 'saw it', c: COLORS.sky, x: -80 }, { t: 'dreamed it', c: COLORS.lavender, x: 0 }, { t: 'heard it', c: COLORS.pink, x: 80 }];
  return (
    <g>
      {tags.map((tg, i) => <g key={i}><path d={`M ${tg.x} -60 Q ${tg.x / 2 + sway} -10 0 20`} fill="none" stroke={tg.c} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.8} /><rect x={tg.x - 40} y={-80} width={80} height={30} rx={8} fill={shade(tg.c, 0.06)} {...sm} /><text x={tg.x} y={-60} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>{tg.t}</text></g>)}
      {/* the knot */}
      <circle cx={0} cy={28} r={22} fill={COLORS.white} {...xl} />
      <text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={20} fill={COLORS.outline}>?</text>
      <Label t="which one was real?" />
    </g>
  );
};

/** mandela-shared — several heads all 'remembering' the same wrong detail. */
export const MandelaShared: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <g>
      {[-70, 0, 70].map((x, i) => <g key={i} transform={`translate(${x} 20)`}><circle cx={0} cy={0} r={26} fill={COLORS.skin} {...lg} /><circle cx={-8} cy={-2} r={4} fill={COLORS.outline} /><circle cx={8} cy={-2} r={4} fill={COLORS.outline} /><path d="M -8 10 Q 0 15 8 10" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />{/* same thought bubble */}<path d={`M 0 -30 q 0 -10 0 -14`} stroke={COLORS.outline} strokeWidth={STROKE.sm} /></g>)}
      {/* the shared (wrong) memory above */}
      <g transform="translate(0 -56)"><rect x={-56} y={-26} width={112} height={48} rx={12} fill={COLORS.lavender} opacity={0.6 + glow * 0.3} {...lg} /><text x={0} y={6} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.outline}>"same!"</text></g>
      <Label t="we misremember together" />
    </g>
  );
};

/** flashbulb-blur — a photo that looks sharp but is actually blurry/shifting. */
export const FlashbulbBlur: React.FC = () => {
  const f = useCurrentFrame();
  const shift = 3 * Math.sin(f / 4);
  return (
    <g>
      {/* camera flash burst */}
      {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 60} y1={-6 + Math.sin(a) * 50} x2={Math.cos(a) * 78} y2={-6 + Math.sin(a) * 66} stroke={COLORS.yellow} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.5} />; })}
      {/* ghost double-exposure (the blur) */}
      <rect x={-54 + shift} y={-50} width={108} height={100} rx={10} fill={COLORS.sky} opacity={0.3} />
      <rect x={-54 - shift} y={-50} width={108} height={100} rx={10} fill={COLORS.white} {...xl} />
      <circle cx={-10 - shift} cy={-10} r={16} fill={COLORS.skin} opacity={0.8} />
      <text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>"I remember it</text>
      <text x={0} y={50} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>perfectly"</text>
      <Label t="vivid — but drifting" />
    </g>
  );
};

/** retell-drift — a story morphing as it passes along a telephone line. */
export const RetellDrift: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = (f % 60) / 60;
  return (
    <g>
      {[-80, 0, 80].map((x, i) => {
        const size = 1 + i * 0.25;
        return <g key={i} transform={`translate(${x} -10)`}><circle cx={0} cy={0} r={22} fill={[COLORS.sky, COLORS.yellow, COLORS.pink][i]} {...lg} /><circle cx={-7} cy={-2} r={3} fill={COLORS.outline} /><circle cx={7} cy={-2} r={3} fill={COLORS.outline} /><path d="M -7 8 Q 0 12 7 8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>;
      })}
      {/* arrows + the story growing */}
      {[-44, 36].map((x, i) => <path key={i} d={`M ${x} -10 l 24 0`} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" markerEnd="" opacity={0.6} />)}
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-80 + i * 80} 28 q 0 10 0 14`} stroke="none" />)}
      {/* the growing speech below */}
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${-80 + i * 80} 36)`}><rect x={-14 - i * 6} y={-10} width={28 + i * 12} height={20} rx={6} fill={COLORS.white} {...sm} /></g>)}
      <Label t="each retelling reshapes it" />
    </g>
  );
};

/** rosy-past — looking back at a grey past through rose-tinted glasses. */
export const RosyPast: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <g>
      {/* grey 'actual' past */}
      <rect x={-86} y={-44} width={80} height={88} rx={10} fill={shade(COLORS.ledGrey, 0.1)} {...lg} />
      <text x={-46} y={56} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline}>then: meh</text>
      {/* rose glasses */}
      <g transform="translate(16 -6)"><circle cx={-18} cy={0} r={18} fill={COLORS.pink} opacity={0.5} {...sm} /><circle cx={18} cy={0} r={18} fill={COLORS.pink} opacity={0.5} {...sm} /><line x1={-2} y1={0} x2={2} y2={0} stroke={COLORS.outline} strokeWidth={STROKE.sm} /><line x1={34} y1={0} x2={44} y2={-6} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" /></g>
      {/* rosy 'remembered' version */}
      <rect x={60} y={-30} width={10} height={10} rx={2} fill={COLORS.pink} opacity={0.4 + glow * 0.3} />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${56 + i * 10} 30 q 2 -6 0 -10`} fill="none" stroke={COLORS.pink} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
      <text x={70} y={56} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.pinkDark}>now: lovely</text>
      <Label t="the past gets rosier" />
    </g>
  );
};

/** imagine-inflate — a thought bubble (imagined) hardening into a solid memory frame. */
export const ImagineInflate: React.FC = () => {
  const f = useCurrentFrame();
  const solid = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <g>
      {/* imagined, dashed */}
      <g transform="translate(-50 0)"><path d="M -34 10 Q -40 -30 0 -30 Q 40 -30 34 10 Q 34 30 0 28 Q -34 30 -34 10 Z" fill="none" stroke={COLORS.lavender} strokeWidth={STROKE.lg} strokeDasharray="5 6" />{[0, 1, 2].map((i) => <circle key={i} cx={-20 + i * 10} cy={34 + i * 8} r={3 - i} fill={COLORS.lavender} />)}<text x={0} y={2} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>imagine</text></g>
      {/* arrow */}
      <path d="M -8 0 l 20 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M 8 -6 l 8 6 l -8 6" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" strokeLinejoin="round" />
      {/* solid memory */}
      <g transform="translate(54 0)"><rect x={-36} y={-30} width={72} height={60} rx={8} fill={COLORS.yellowSoft} opacity={0.6 + solid * 0.3} {...xl} /><text x={0} y={5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>"memory"</text></g>
      <Label t="imagining it makes it 'real'" />
    </g>
  );
};

/** confidence-gauge — a confidence dial pinned high, while an accuracy light stays low. */
export const ConfidenceGauge: React.FC = () => {
  const f = useCurrentFrame();
  const wob = 0.05 * Math.sin(f / 6);
  const a = Math.PI - (0.88 + wob) * Math.PI;
  return (
    <g>
      <path d="M -70 20 A 70 70 0 0 1 70 20" fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      <path d="M -70 20 A 70 70 0 0 1 70 20" fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" strokeDasharray="4 220" strokeDashoffset={0} opacity={0.4} />
      <line x1={0} y1={20} x2={Math.cos(a) * 56} y2={20 - Math.sin(a) * 56} stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={20} r={8} fill={COLORS.outline} />
      <text x={0} y={-56} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>CONFIDENCE: high</text>
      {/* dim accuracy light */}
      <g transform="translate(0 54)"><circle cx={0} cy={0} r={12} fill={COLORS.greenTeal} opacity={0.3} {...sm} /><text x={40} y={5} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>accuracy: ?</text></g>
      <Label t="confidence isn't accuracy" />
    </g>
  );
};
