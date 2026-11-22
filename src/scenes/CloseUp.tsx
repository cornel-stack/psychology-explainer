/**
 * CloseUp (B7/B8/A4) —
 *  (a) face: head fills >=80% of frame height, hat bleeds off the top edge
 *      (crop = closeness); NO body slab — pillow + blanket edge fill the bottom;
 *      2 flat color bands; faint radiating rings; trembling motion lines.
 *  (b) object: object large (2x) on a dream-cloud floor shelf inside a scalloped
 *      frame with a soft inner radial ring and gold sparkles.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps, shade } from '../lib/style';
import { Stage, Place, ChapterFlash, BurstBackground, AccentCorners } from './common';
import { Mascot } from '../assets/mascot/Mascot';
import { PROPS } from '../assets/props/registry';
import { Pillow } from '../assets/props/bedroom';
import { Sparkles } from '../assets/props/icons';
import { EmotionName } from '../lib/emotions';
import { AccessoryVariant } from '../assets/mascot/parts/Accessory';

const xl = strokeProps(STROKE.xl);

/** Scalloped dream-cloud border around a rounded rect. */
const DreamCloud: React.FC = () => {
  const r = 74;
  const w = 1360;
  const h = 800;
  const x0 = (CANVAS.width - w) / 2;
  const y0 = (CANVAS.height - h) / 2;
  const bx = Math.round(w / (r * 1.6));
  const by = Math.round(h / (r * 1.6));
  let d = `M ${x0} ${y0}`;
  for (let i = 0; i < bx; i++) d += ` a ${r} ${r} 0 0 1 ${w / bx} 0`;
  for (let i = 0; i < by; i++) d += ` a ${r} ${r} 0 0 1 0 ${h / by}`;
  for (let i = 0; i < bx; i++) d += ` a ${r} ${r} 0 0 1 ${-w / bx} 0`;
  for (let i = 0; i < by; i++) d += ` a ${r} ${r} 0 0 1 0 ${-h / by}`;
  d += ' Z';
  return (
    <g>
      <path d={d} fill={COLORS.lavender} {...xl} />
      {/* soft inner radial rings */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={CANVAS.width / 2} cy={CANVAS.height / 2} r={160 + i * 110} fill="none" stroke={shade(COLORS.lavender, 0.08)} strokeWidth={40} opacity={0.5} />
      ))}
      {/* dream-cloud floor shelf */}
      <ellipse cx={CANVAS.width / 2} cy={CANVAS.height / 2 + 190} rx={360} ry={70} fill={shade(COLORS.lavender, 0.14)} />
    </g>
  );
};

/** Backdrop tone for a generic (non-bed) emotional close-up, by emotion. */
const BACKDROP: Partial<Record<EmotionName, string>> = {
  terrified: COLORS.wallNight,
  scared: COLORS.wallNight,
  sleepy: COLORS.lavender,
  neutral: COLORS.lavender,
  confused: COLORS.lavender,
  annoyed: COLORS.pink,
  smug: COLORS.sky,
  'happy-talk': COLORS.sky,
  'serious-expert': COLORS.sky,
  excited: COLORS.yellowSoft,
};

export const CloseUp: React.FC<{
  subject: 'face' | 'object';
  emotion?: EmotionName;
  prop?: string;
  accessory?: AccessoryVariant;
  bands?: [string, string];
  /** bedroom rig (pillow + blanket + nightcap) — for sleep-type videos. */
  bed?: boolean;
  chapterStart?: boolean;
}> = ({ subject, emotion = 'neutral', prop, accessory, bands = [COLORS.wallNight, COLORS.purpleDeep], bed = false, chapterStart }) => {
  const frame = useCurrentFrame();

  if (subject === 'object') {
    const Comp = prop ? PROPS[prop] : null;
    return (
      <AbsoluteFill style={{ backgroundColor: COLORS.wallNight }}>
        <Stage>
          <BurstBackground base={COLORS.wallNight} cx={CANVAS.width / 2} cy={CANVAS.height / 2} rays={12} />
          <AccentCorners color={COLORS.yellowSoft} />
          <DreamCloud />
          <Place x={CANVAS.width / 2} y={CANVAS.height / 2 + 120} scale={3.4} bob={6} bobDiv={20}>
            {Comp ? <Comp /> : null}
          </Place>
          {/* sparkles in the upper cloud space, clear of the object on its shelf */}
          <g transform={`translate(${CANVAS.width / 2 - 360} ${CANVAS.height / 2 - 230}) scale(2.2)`}>
            <Sparkles n={3} />
          </g>
          <g transform={`translate(${CANVAS.width / 2 + 360} ${CANVAS.height / 2 - 210}) scale(2.2)`}>
            <Sparkles n={3} />
          </g>
        </Stage>
        <ChapterFlash active={chapterStart} />
      </AbsoluteFill>
    );
  }

  const headX = CANVAS.width / 2;
  const trembleOn = emotion === 'terrified';

  // Bedroom close-up (sleep-type videos): pillow + blanket + night bands + nightcap.
  if (bed) {
    const headY = 560;
    return (
      <AbsoluteFill>
        <Stage>
          <rect x={0} y={0} width={CANVAS.width} height={640} fill={bands[0]} />
          <rect x={0} y={640} width={CANVAS.width} height={440} fill={bands[1]} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={headX} cy={headY + 60} r={300 + i * 130 + (frame % 60)} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} opacity={0.08} />
          ))}
          <g transform={`translate(${headX} 1010) scale(5.2)`}>
            <Pillow />
          </g>
          <path d={`M 0 900 Q ${CANVAS.width / 2} 840 ${CANVAS.width} 900 L ${CANVAS.width} 1080 L 0 1080 Z`} fill={COLORS.sky} {...xl} />
          <path d={`M 0 940 Q ${CANVAS.width / 2} 890 ${CANVAS.width} 940`} fill="none" stroke={shade(COLORS.sky, 0.18)} strokeWidth={STROKE.lg} />
        </Stage>
        <Mascot costume="pajamas" pose="face-on-pillow" emotion={emotion} accessory={accessory ?? 'nightcap'} x={headX} y={headY} scale={3.0} seed={9} />
        <ChapterFlash active={chapterStart} />
      </AbsoluteFill>
    );
  }

  // Generic emotional close-up: a burst backdrop tinted by the emotion, big
  // expressive head (no bed, no nightcap), trembling lines when terrified.
  const headY = 600;
  const backdrop = BACKDROP[emotion] ?? COLORS.lavender;
  return (
    <AbsoluteFill>
      <Stage>
        <BurstBackground base={backdrop} accent={COLORS.white} cx={headX} cy={headY + 40} rays={14} />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={headX} cy={headY + 40} r={300 + i * 130 + (frame % 60)} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} opacity={0.1} />
        ))}
        {trembleOn &&
          [-1, 1].map((s) =>
            [0, 1, 2].map((i) => (
              <path key={`${s}-${i}`} d={`M ${headX + s * (420 + i * 26)} ${headY - 120 + i * 90} q ${s * 26} 16 0 40`} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} strokeLinecap="round" opacity={0.55} />
            ))
          )}
      </Stage>
      <Mascot costume="hoodie" pose="face-on-pillow" emotion={emotion} accessory={accessory ?? 'none'} x={headX} y={headY} scale={3.3} seed={9} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
