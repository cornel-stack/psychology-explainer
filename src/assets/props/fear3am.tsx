/**
 * fear3am.tsx — ALL-NEW art for "Why Your Brain Fears 3 AM". Bespoke metaphors
 * for the biology of pre-dawn dread: the ominous 3:00 clock, the worry that grows
 * into a monster, the cortisol gauge, the amygdala alarm, the sleeping front-brain,
 * the plunging thermometer, the ring of silence, the lone streetlight, the one lit
 * window, the catastrophe snowball, the howling wolf, the worry notebook, the
 * sunrise of relief. Token strokes, flat two-tone, local origin.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, STROKE, strokeProps, shade } from '../../lib/style';

const xl = strokeProps(STROKE.xl);
const lg = strokeProps(STROKE.lg);
const sm = strokeProps(STROKE.sm);
const font = 'Baloo 2';

/** A plain alarm clock glowing an ominous 3:00. */
export const Clock3am: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.7 + 0.25 * Math.sin(f / 6);
  return (
    <g>
      <ellipse cx={0} cy={10} rx={160} ry={90} fill={COLORS.red} opacity={0.14 * glow} />
      <rect x={-140} y={-60} width={280} height={140} rx={22} fill={COLORS.shirtDarker} {...xl} />
      <rect x={-116} y={-40} width={232} height={100} rx={12} fill={COLORS.outline} {...lg} />
      <text x={0} y={34} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={86} fill={COLORS.red} opacity={glow}>3:00</text>
      {/* bells */}
      <circle cx={-110} cy={-80} r={26} fill={COLORS.ledGrey} {...lg} />
      <circle cx={110} cy={-80} r={26} fill={COLORS.ledGrey} {...lg} />
      <rect x={-16} y={-104} width={32} height={20} rx={8} fill={COLORS.ledGrey} {...sm} />
      <rect x={-50} y={80} width={40} height={30} rx={8} fill={COLORS.shirtDark} />
      <rect x={10} y={80} width={40} height={30} rx={8} fill={COLORS.shirtDark} />
    </g>
  );
};

/** A tiny worry that grows into a looming monster (molehill → night monster). */
export const WorryMonster: React.FC = () => {
  const f = useCurrentFrame();
  const grow = 0.5 + 0.5 * (Math.sin(f / 20) * 0.5 + 0.5);
  return (
    <g>
      {/* shadow it casts */}
      <ellipse cx={0} cy={150} rx={120 * grow} ry={26} fill={COLORS.outline} opacity={0.14} />
      <g transform={`translate(0 ${20 - grow * 20}) scale(${0.5 + grow})`} style={{ transformOrigin: 'center bottom' }}>
        <path d="M -90 120 Q -110 -20 0 -40 Q 110 -20 90 120 Z" fill={COLORS.purpleDeep} {...xl} />
        {/* spikes */}
        <path d="M -60 -36 l -10 -36 l 24 24 M 0 -44 l 0 -44 l 14 36 M 60 -36 l 10 -36 l -24 24" fill={COLORS.purpleDeep} {...sm} />
        {/* wide scared-making eyes + jagged mouth */}
        <circle cx={-30} cy={20} r={20} fill={COLORS.yellow} /><circle cx={-30} cy={22} r={9} fill={COLORS.outline} />
        <circle cx={30} cy={20} r={20} fill={COLORS.yellow} /><circle cx={30} cy={22} r={9} fill={COLORS.outline} />
        <path d="M -40 70 l 16 -14 l 16 14 l 16 -14 l 16 14" fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

/** A hormone gauge spiking into the red (the pre-dawn cortisol surge). */
export const CortisolGauge: React.FC = () => {
  const f = useCurrentFrame();
  const needle = -70 + (Math.sin(f / 10) * 0.5 + 0.5) * 130;
  return (
    <g>
      <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke={COLORS.bgCreamDark} strokeWidth={44} strokeLinecap="round" />
      <path d="M 40 -92 A 150 150 0 0 1 150 20" fill="none" stroke={COLORS.red} strokeWidth={44} strokeLinecap="round" opacity={0.8} />
      <line x1={0} y1={20} x2={Math.cos((needle - 90) * Math.PI / 180) * 120} y2={20 + Math.sin((needle - 90) * Math.PI / 180) * 120} stroke={COLORS.outline} strokeWidth={STROKE.xl} strokeLinecap="round" />
      <circle cx={0} cy={20} r={22} fill={COLORS.outline} />
      <text x={0} y={90} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={COLORS.outline}>CORTISOL</text>
      <text x={150} y={70} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill={COLORS.redDark}>HIGH</text>
    </g>
  );
};

/** A glowing red alarm bell — the amygdala (fear centre) wide awake. */
export const AmygdalaAlarm: React.FC = () => {
  const f = useCurrentFrame();
  const ring = Math.sin(f / 4) * 10;
  const glow = 0.5 + 0.4 * Math.abs(Math.sin(f / 6));
  return (
    <g>
      <circle cx={0} cy={0} r={140} fill={COLORS.red} opacity={0.16 * glow} />
      {/* almond-shaped amygdala */}
      <path d="M -110 0 Q -60 -80 0 -78 Q 90 -70 110 10 Q 70 80 0 78 Q -80 70 -110 0 Z" fill={COLORS.red} {...xl} />
      <path d="M -70 -20 Q 0 -50 70 -10" fill="none" stroke={shade(COLORS.red, 0.22)} strokeWidth={STROKE.lg} strokeLinecap="round" />
      {/* alarm bell on top */}
      <g transform={`translate(0 -70) rotate(${ring})`}>
        <path d="M -40 10 Q -40 -50 0 -50 Q 40 -50 40 10 Z" fill={COLORS.yellow} {...lg} />
        <circle cx={0} cy={20} r={10} fill={COLORS.yellowDark} />
      </g>
      {/* sound waves */}
      {[0, 1].map((i) => <path key={i} d={`M ${130 + i * 24} ${-40} Q ${160 + i * 28} 0 ${130 + i * 24} 40`} fill="none" stroke={COLORS.red} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={glow} />)}
    </g>
  );
};

/** A brain with the front (prefrontal cortex) dimmed and asleep. */
export const PrefrontalAsleep: React.FC = () => (
  <g>
    <path d="M -130 20 Q -160 -70 -80 -96 Q -56 -140 10 -120 Q 70 -150 110 -96 Q 160 -70 120 10 Q 140 80 70 100 Q 10 140 -40 104 Q -130 100 -130 20 Z" fill={COLORS.pink} {...xl} />
    {/* front third shaded "off" */}
    <path d="M -130 20 Q -160 -70 -80 -96 Q -56 -140 10 -120 L 10 110 Q -40 112 -40 104 Q -130 100 -130 20 Z" fill={shade(COLORS.pink, 0.3)} opacity={0.8} />
    <path d="M -70 -60 Q -30 -30 -70 0 Q -30 30 -60 70 M 60 -60 Q 30 -20 70 10" fill="none" stroke={shade(COLORS.pink, 0.2)} strokeWidth={STROKE.lg} strokeLinecap="round" />
    {/* zzz over the sleeping front */}
    <text x={-80} y={-20} fontFamily={font} fontWeight={800} fontSize={38} fill={COLORS.lavenderDark}>z</text>
    <text x={-50} y={-50} fontFamily={font} fontWeight={800} fontSize={54} fill={COLORS.lavenderDark}>Z</text>
    {/* a red flicker in the back (amygdala awake) */}
    <circle cx={70} cy={40} r={20} fill={COLORS.red} />
  </g>
);

/** A thermometer plunging low, with a snowflake (body-temperature nadir). */
export const ColdThermometer: React.FC = () => (
  <g>
    <rect x={-22} y={-170} width={44} height={240} rx={22} fill={COLORS.white} {...xl} />
    <rect x={-10} y={30} width={20} height={30} rx={10} fill={COLORS.sky} />
    <g transform="translate(0 110)"><circle r={46} fill={COLORS.white} {...xl} /><circle r={30} fill={COLORS.sky} /></g>
    {[0, 1, 2, 3].map((i) => <line key={i} x1={22} y1={-130 + i * 44} x2={44} y2={-130 + i * 44} stroke={COLORS.outline} strokeWidth={STROKE.sm} strokeLinecap="round" />)}
    {/* snowflake */}
    <g transform="translate(110 -110)" stroke={COLORS.skyDark} strokeWidth={STROKE.lg} strokeLinecap="round">
      {[0, 60, 120].map((a, i) => <line key={i} x1={-30} y1={0} x2={30} y2={0} transform={`rotate(${a})`} />)}
      {[0, 60, 120].map((a, i) => <g key={i} transform={`rotate(${a})`}><path d="M 18 0 l 10 -8 M 18 0 l 10 8 M -18 0 l -10 -8 M -18 0 l -10 8" fill="none" /></g>)}
    </g>
  </g>
);

/** A ring of oppressive silence — a muted bell with crossed-out sound. */
export const SilenceRing: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={130} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeDasharray="4 18" opacity={0.5} />
    {/* a little ear */}
    <path d="M -30 -50 Q -70 -70 -70 -10 Q -70 50 -20 70 L -20 40 Q -44 30 -44 -6 Q -44 -34 -24 -28 Q -10 -24 -10 -4" fill={COLORS.skin} {...xl} />
    {/* crossed-out sound */}
    <path d="M 20 -30 l 40 0 M 20 30 l 40 0 M 30 -40 q 40 40 0 80" fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.5} />
    <line x1={-90} y1={90} x2={90} y2={-90} stroke={COLORS.red} strokeWidth={STROKE.xl} strokeLinecap="round" />
    <text x={0} y={120} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={30} fill={COLORS.outline}>silence</text>
  </g>
);

/** A single streetlight glowing in the dark (the deserted small hours). */
export const LoneStreetlight: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.8 + 0.1 * Math.sin(f / 9);
  return (
    <g>
      <rect x={-12} y={-80} width={24} height={300} rx={10} fill={COLORS.shirtDark} {...lg} />
      <rect x={-54} y={-120} width={108} height={50} rx={16} fill={COLORS.shirtDark} {...xl} />
      <rect x={-40} y={-108} width={80} height={30} rx={10} fill={COLORS.yellow} opacity={flick} />
      {/* light cone */}
      <path d="M -40 -78 L -150 220 L 150 220 L 40 -78 Z" fill={COLORS.yellowSoft} opacity={0.14 * flick} />
      {/* a moth */}
      <g transform={`translate(${Math.sin(f / 10) * 30} ${-40})`}><ellipse cx={0} cy={0} rx={10} ry={6} fill={COLORS.ledGrey} {...sm} /></g>
    </g>
  );
};

/** A block of dark windows with one lit — feeling like the only one awake. */
export const LonelyWindow: React.FC = () => (
  <g>
    <rect x={-150} y={-150} width={300} height={320} rx={14} fill={shade(COLORS.purpleDeep, 0.15)} {...xl} />
    {Array.from({ length: 3 }).map((_, r) => Array.from({ length: 3 }).map((_, c) => {
      const lit = r === 1 && c === 2;
      return <rect key={`${r}-${c}`} x={-120 + c * 92} y={-120 + r * 100} width={72} height={80} rx={8} fill={lit ? COLORS.yellow : shade(COLORS.purpleDeep, -0.08)} opacity={lit ? 0.95 : 0.8} {...sm} />;
    }))}
    {/* tiny silhouette in the lit window */}
    <g transform="translate(88 -40)"><circle r={14} fill={COLORS.outline} /><path d="M -16 40 Q 0 0 16 40 Z" fill={COLORS.outline} /></g>
  </g>
);

/** A snowball rolling downhill, growing — catastrophizing. */
export const CatastropheSnowball: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f % 90) / 90;
  const x = -160 + t * 300;
  const y = -120 + t * 200;
  const r = 24 + t * 70;
  return (
    <g>
      {/* slope */}
      <path d="M -200 -150 L 220 180 L -200 180 Z" fill={shade(COLORS.sky, 0.1)} opacity={0.5} />
      <line x1={-200} y1={-150} x2={220} y2={180} stroke={COLORS.outline} strokeWidth={STROKE.sm} opacity={0.4} />
      {/* trail */}
      <path d={`M -160 -120 Q ${(x - 160) / 2} ${(y - 120) / 2} ${x} ${y}`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} strokeLinecap="round" opacity={0.5} />
      <circle cx={x} cy={y} r={r} fill={COLORS.white} {...xl} />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.3} fill={shade(COLORS.white, 0.06)} />
      <text x={x} y={y + 8} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={r * 0.5} fill={COLORS.outline} opacity={0.6}>!</text>
    </g>
  );
};

/** A howling wolf silhouette under the moon (the "hour of the wolf"). */
export const WolfHowl: React.FC = () => (
  <g>
    <circle cx={70} cy={-120} r={56} fill={COLORS.yellowSoft} opacity={0.9} />
    {/* wolf sitting, head up */}
    <path d="M -120 150 Q -130 40 -70 20 L -40 10 Q -20 -40 10 -70 Q 20 -96 36 -70 Q 44 -40 30 -20 Q 70 0 80 60 Q 90 120 60 150 Z" fill={COLORS.shirtDark} {...xl} />
    {/* ear + snout */}
    <path d="M 2 -64 l -12 -30 l 24 14 Z" fill={COLORS.shirtDark} {...sm} />
    <path d="M 10 -70 l 40 -14 l -10 20 Z" fill={COLORS.shirtDark} {...lg} />
    {/* howl lines */}
    {[0, 1, 2].map((i) => <path key={i} d={`M ${60 + i * 20} -96 q ${20 + i * 8} 10 0 20`} fill="none" stroke={COLORS.ledGrey} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.6} />)}
  </g>
);

/** A worry notebook with a pen — "write it down and close the lid". */
export const WorryNotebook: React.FC = () => (
  <g>
    <rect x={-120} y={-90} width={240} height={180} rx={12} fill={COLORS.white} {...xl} />
    <rect x={-120} y={-90} width={30} height={180} fill={COLORS.red} {...lg} />
    {/* spiral binding */}
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={-105} cy={-66 + i * 28} r={6} fill="none" stroke={COLORS.outline} strokeWidth={STROKE.sm} />)}
    {/* written worry lines */}
    {[0, 1, 2].map((i) => <rect key={i} x={-70} y={-54 + i * 34} width={i === 2 ? 90 : 150} height={10} rx={5} fill={COLORS.whiteShade} />)}
    {/* pen */}
    <g transform="translate(70 70) rotate(40)"><rect x={-10} y={-70} width={20} height={120} rx={6} fill={COLORS.blueDiagram} {...lg} /><path d="M -10 50 L 10 50 L 0 78 Z" fill={COLORS.yellow} {...sm} /></g>
  </g>
);

/** A sunrise over a hill — the relief of morning. */
export const SunriseRelief: React.FC = () => {
  const f = useCurrentFrame();
  const rise = Math.sin(f / 30) * 10;
  return (
    <g>
      <g transform={`translate(0 ${rise})`}>
        <circle cx={0} cy={-10} r={80} fill={COLORS.yellow} {...xl} />
        {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 96} y1={-10 + Math.sin(a) * 96} x2={Math.cos(a) * 130} y2={-10 + Math.sin(a) * 130} stroke={COLORS.yellow} strokeWidth={STROKE.lg} strokeLinecap="round" />; })}
      </g>
      {/* hill cuts off the sun */}
      <path d="M -170 70 Q 0 20 170 70 L 170 160 L -170 160 Z" fill={COLORS.greenDark} {...lg} />
      <path d="M -170 90 Q 0 50 170 90 L 170 160 L -170 160 Z" fill={COLORS.greenLeaf} />
    </g>
  );
};
