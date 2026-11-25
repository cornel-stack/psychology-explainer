/**
 * read-body-language.tsx — ALL-NEW art for "How to Read Body Language". The method
 * (baseline-cue, cue-cluster), the signals (micro-expression, honest-feet,
 * eye-contact-dial, personal-space, self-soothe), and connection (mirror-rapport,
 * ventral-front, duchenne-smile). Token strokes, centered on origin, ~300px tall.
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

/** baseline-cue — a flat normal line that suddenly spikes: the deviation is the tell. */
export const BaselineCue: React.FC = () => {
  const f = useCurrentFrame();
  const sweep = (f % 90) / 90;
  const spikeX = -40 + sweep * 80;
  return (
    <g>
      <line x1={-120} y1={40} x2={120} y2={40} stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} strokeDasharray="4 8" />
      <path d={`M -120 0 L -40 0 Q -20 0 -10 -56 Q 0 -56 10 0 L 120 0`} fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={0} cy={-56} r={9} fill={COLORS.red} {...sm} />
      <text x={0} y={-72} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>the tell</text>
      <text x={-80} y={62} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={14} fill={COLORS.outline}>baseline</text>
      <circle cx={spikeX} cy={0} r={5} fill={COLORS.outline} opacity={0.4} />
      <Label t="watch the deviation" />
    </g>
  );
};

/** cue-cluster — three small cue-chips grouping into one strong read. */
export const CueCluster: React.FC = () => {
  const f = useCurrentFrame();
  const cues = ['feet away', 'arm barrier', 'neck touch'];
  return (
    <g>
      {cues.map((c, i) => {
        const y = -56 + i * 52; const p = 0.6 + 0.4 * Math.sin(f / 6 + i);
        return <g key={i} transform={`translate(-30 ${y})`}>
          <rect x={-90} y={-20} width={180} height={40} rx={12} fill={COLORS.yellowSoft} {...lg} opacity={0.8 + p * 0.2} />
          <circle cx={-70} cy={0} r={7} fill={COLORS.red} />
          <text x={-54} y={6} fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.outline}>{c}</text>
        </g>;
      })}
      {/* brace joining them into one conclusion */}
      <path d="M 70 -76 q 20 0 20 20 L 90 -8 q 0 8 10 8 q -10 0 -10 8 L 90 76 q 0 20 -20 20" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <text x={128} y={6} fontFamily={font} fontWeight={800} fontSize={18} fill={COLORS.greenDark}>= discomfort</text>
      <Label t="read the cluster" />
    </g>
  );
};

/** micro-expression — a calm face with a split-second flash of a hidden feeling. */
export const MicroExpression: React.FC = () => {
  const f = useCurrentFrame();
  const flash = (f % 50) < 6;
  return (
    <g>
      <circle cx={0} cy={0} r={58} fill={COLORS.skin} {...xl} />
      {flash ? (
        <>
          {/* leaked fear/anger */}
          <path d="M -34 -16 L -10 -8 M 34 -16 L 10 -8" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
          <circle cx={-16} cy={0} r={6} fill={COLORS.outline} /><circle cx={16} cy={0} r={6} fill={COLORS.outline} />
          <path d="M -18 32 Q 0 22 18 32" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* neutral mask */}
          <circle cx={-16} cy={-6} r={6} fill={COLORS.outline} /><circle cx={16} cy={-6} r={6} fill={COLORS.outline} />
          <path d="M -34 -18 Q -22 -22 -8 -18 M 8 -18 Q 22 -22 34 -18" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
          <path d="M -16 26 L 16 26" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
        </>
      )}
      {flash && <text x={0} y={-74} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={16} fill={COLORS.red}>1/25 sec</text>}
      <Label t="the feeling leaks out" />
    </g>
  );
};

/** honest-feet — a pair of feet quietly pointing toward the exit, away from the chat. */
export const HonestFeet: React.FC = () => {
  const f = useCurrentFrame();
  const turn = 10 + 6 * Math.sin(f / 10);
  return (
    <g>
      {/* torso facing you */}
      <circle cx={0} cy={-70} r={26} fill={COLORS.skin} {...lg} />
      <path d="M -30 10 Q -34 -34 0 -34 Q 34 -34 30 10 Z" fill={COLORS.sky} {...xl} />
      {/* legs down */}
      <path d="M -14 10 L -16 60 M 14 10 L 16 60" stroke={COLORS.navy} strokeWidth={STROKE.xl} strokeLinecap="round" />
      {/* feet pointing to the side (toward the door) */}
      {[-16, 16].map((x, i) => <g key={i} transform={`translate(${x} 62) rotate(${turn})`}><ellipse cx={14} cy={0} rx={26} ry={12} fill={COLORS.outline} /></g>)}
      <path d="M 70 40 l 22 0 l 0 40 l -22 0" fill="none" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <text x={92} y={30} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.greenDark}>exit</text>
      <Label t="feet point where we want to go" />
    </g>
  );
};

/** eye-contact-dial — a gauge with a comfortable middle between too little and too much. */
export const EyeContactDial: React.FC = () => {
  const f = useCurrentFrame();
  const val = 0.5 + 0.18 * Math.sin(f / 12);
  const a = Math.PI - val * Math.PI;
  return (
    <g>
      <path d="M -90 10 A 90 90 0 0 1 90 10" fill="none" stroke={shade(COLORS.sky, -0.06)} strokeWidth={STROKE.sm} />
      {/* zones */}
      <path d="M -90 10 A 90 90 0 0 1 -30 -74" fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.6} />
      <path d="M -30 -74 A 90 90 0 0 1 30 -74" fill="none" stroke={COLORS.greenTeal} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M 30 -74 A 90 90 0 0 1 90 10" fill="none" stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" opacity={0.6} />
      <line x1={0} y1={10} x2={Math.cos(a) * 72} y2={10 - Math.sin(a) * 72} stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      <circle cx={0} cy={10} r={8} fill={COLORS.outline} />
      <text x={-96} y={34} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>too little</text>
      <text x={96} y={34} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={13} fill={COLORS.outline}>too much</text>
      <text x={0} y={-86} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.greenDark}>connection</text>
      <Label t="eye contact has a sweet spot" />
    </g>
  );
};

/** personal-space — concentric proxemic zones around a figure. */
export const PersonalSpace: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(f / 10);
  const zones = [{ r: 46, c: COLORS.pink, t: 'intimate' }, { r: 78, c: COLORS.yellow, t: 'personal' }, { r: 108, c: COLORS.sky, t: 'social' }];
  return (
    <g>
      {zones.slice().reverse().map((z, i) => <circle key={i} cx={0} cy={0} r={z.r} fill={z.c} opacity={0.14 + (zones.length - i) * 0.04} {...sm} />)}
      {zones.map((z, i) => <text key={i} x={0} y={-z.r + 16} textAnchor="middle" fontFamily={font} fontWeight={700} fontSize={12} fill={COLORS.outline} opacity={0.7}>{z.t}</text>)}
      {/* the person */}
      <circle cx={0} cy={-10} r={18} fill={COLORS.skin} {...lg} />
      <path d="M -20 24 Q -22 -4 0 -4 Q 22 -4 20 24 Z" fill={COLORS.greenTeal} {...lg} />
      {/* an approaching figure at the edge */}
      <g transform={`translate(${108 + pulse * 10} 0)`} opacity={0.6}><circle cx={0} cy={-10} r={14} fill={COLORS.white} {...sm} /><path d="M -16 20 Q -18 -2 0 -2 Q 18 -2 16 20 Z" fill={COLORS.white} {...sm} /></g>
      <Label t="we all carry invisible zones" />
    </g>
  );
};

/** self-soothe — a hand touching the neck: a pacifying stress signal. */
export const SelfSoothe: React.FC = () => {
  const f = useCurrentFrame();
  const rub = 2 * Math.sin(f / 4);
  return (
    <g>
      <circle cx={0} cy={-50} r={40} fill={COLORS.skin} {...xl} />
      <circle cx={-14} cy={-54} r={5} fill={COLORS.outline} /><circle cx={14} cy={-54} r={5} fill={COLORS.outline} />
      <path d="M -10 -32 Q 0 -36 10 -32" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -36 44 Q -40 -8 0 -8 Q 40 -8 36 44 Z" fill={COLORS.sky} {...xl} />
      {/* hand reaching to the neck */}
      <g transform={`translate(${rub} 0)`}>
        <path d="M 30 44 Q 44 4 10 -8" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <circle cx={8} cy={-10} r={12} fill={COLORS.skin} {...lg} />
      </g>
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-40 - i * 8} ${-40 - i * 6} q -8 -8 0 -16`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.4 + 0.3 * Math.sin(f / 5 + i)} />)}
      <Label t="we self-soothe under stress" />
    </g>
  );
};

/** mirror-rapport — two figures in mirrored posture: unconscious echo of rapport. */
export const MirrorRapport: React.FC = () => {
  const f = useCurrentFrame();
  const lean = 6 * Math.sin(f / 14);
  const Fig: React.FC<{ s: number; c: string }> = ({ s, c }) => (
    <g transform={`scale(${s} 1)`}>
      <g transform={`rotate(${lean * s} 0 40)`}>
        <circle cx={40} cy={-44} r={24} fill={COLORS.skin} {...lg} />
        <path d="M 12 30 Q 8 -16 40 -16 Q 72 -16 68 30 Z" fill={c} {...xl} />
        {/* a hand on chin — mirrored */}
        <path d="M 40 30 Q 20 20 34 -24" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.lg} strokeLinecap="round" />
        <circle cx={34} cy={-26} r={8} fill={COLORS.skin} {...sm} />
      </g>
    </g>
  );
  return (
    <g>
      <g transform="translate(-54 0)"><Fig s={1} c={COLORS.greenTeal} /></g>
      <g transform="translate(54 0)"><Fig s={-1} c={COLORS.sky} /></g>
      {/* reflection line */}
      <line x1={0} y1={-70} x2={0} y2={60} stroke={COLORS.lavender} strokeWidth={STROKE.sm} strokeDasharray="4 8" opacity={0.6} />
      <Label t="rapport makes us mirror" />
    </g>
  );
};

/** ventral-front — torso open toward you (comfort) vs angled away with a barrier. */
export const VentralFront: React.FC = () => {
  const f = useCurrentFrame();
  const sway = 2 * Math.sin(f / 10);
  return (
    <g>
      {/* open / fronting */}
      <g transform={`translate(-64 ${sway})`}>
        <circle cx={0} cy={-50} r={24} fill={COLORS.skin} {...lg} />
        <path d="M -26 36 Q -30 -14 0 -14 Q 30 -14 26 36 Z" fill={COLORS.greenTeal} {...xl} />
        <circle cx={0} cy={6} r={10} fill={shade(COLORS.greenTeal, 0.08)} />
        <text x={0} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.greenDark}>open</text>
      </g>
      {/* turned away + barrier */}
      <g transform="translate(64 0)" opacity={0.7}>
        <circle cx={6} cy={-50} r={24} fill={COLORS.white} {...lg} />
        <path d="M -20 36 Q -26 -14 6 -14 Q 30 -14 26 36 Z" fill={COLORS.ledGrey} {...xl} transform="rotate(-16 6 0)" />
        {/* barrier arm across */}
        <path d="M -16 2 Q 6 10 26 0" fill="none" stroke={COLORS.skin} strokeWidth={STROKE.xl} strokeLinecap="round" />
        <text x={6} y={66} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={14} fill={COLORS.outline}>closed</text>
      </g>
      <Label t="the torso tells the truth" />
    </g>
  );
};

/** duchenne-smile — a genuine eye-crinkling smile beside a flat social one. */
export const DuchenneSmile: React.FC = () => (
  <g>
    {/* genuine */}
    <g transform="translate(-62 0)">
      <circle cx={0} cy={0} r={46} fill={COLORS.skin} {...xl} />
      <path d="M -24 -8 Q -16 -16 -8 -8 M 8 -8 Q 16 -16 24 -8" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* crow's feet */}
      <path d="M -34 -4 l -8 -4 M -34 2 l -10 0 M 34 -4 l 8 -4 M 34 2 l 10 0" stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <path d="M -22 16 Q 0 38 22 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <path d="M -60 56 h 44" stroke={COLORS.greenDark} strokeWidth={STROKE.sm} strokeLinecap="round" />
      <text x={-38} y={74} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.greenDark}>real</text>
    </g>
    {/* social */}
    <g transform="translate(62 0)" opacity={0.8}>
      <circle cx={0} cy={0} r={46} fill={COLORS.white} {...xl} />
      <circle cx={-16} cy={-10} r={5} fill={COLORS.outline} /><circle cx={16} cy={-10} r={5} fill={COLORS.outline} />
      <path d="M -22 16 Q 0 30 22 16" fill="none" stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <text x={0} y={74} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={13} fill={COLORS.outline}>polite</text>
    </g>
    <Label t="real smiles reach the eyes" />
  </g>
);
