/**
 * CloseUp —
 *  (a) face: head fills ~75% of frame height; room collapses to 2 flat color
 *      bands (NO blur, per style); faint radiating rings; sweat/tremble via the
 *      mascot's emotion extras.
 *  (b) object: object inside a scalloped dream-cloud frame with twinkling
 *      4-point sparkles.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps } from '../lib/style';
import { Stage, Place, ChapterFlash } from './common';
import { Mascot } from '../assets/mascot/Mascot';
import { PROPS } from '../assets/props/registry';
import { Pillow } from '../assets/props/bedroom';
import { Sparkles } from '../assets/props/icons';
import { EmotionName } from '../lib/emotions';
import { AccessoryVariant } from '../assets/mascot/parts/Accessory';

const sil = strokeProps(STROKE.sil);

/** Scalloped dream-cloud border as a path of bumps around a rounded rect. */
const DreamCloud: React.FC = () => {
  const r = 70;
  const w = 1180;
  const h = 680;
  const x0 = (CANVAS.width - w) / 2;
  const y0 = (CANVAS.height - h) / 2;
  const bumpsX = Math.round(w / (r * 1.6));
  const bumpsY = Math.round(h / (r * 1.6));
  let d = `M ${x0} ${y0}`;
  for (let i = 0; i < bumpsX; i++) d += ` a ${r} ${r} 0 0 1 ${w / bumpsX} 0`;
  for (let i = 0; i < bumpsY; i++) d += ` a ${r} ${r} 0 0 1 0 ${h / bumpsY}`;
  for (let i = 0; i < bumpsX; i++) d += ` a ${r} ${r} 0 0 1 ${-w / bumpsX} 0`;
  for (let i = 0; i < bumpsY; i++) d += ` a ${r} ${r} 0 0 1 0 ${-h / bumpsY}`;
  d += ' Z';
  return (
    <g>
      <rect x={x0} y={y0} width={w} height={h} rx={40} fill={COLORS.lavender} />
      <path d={d} fill={COLORS.lavender} {...sil} />
      <rect x={x0 + 10} y={y0 + 10} width={w - 20} height={h - 20} rx={30} fill="none" stroke={COLORS.white} strokeWidth={6} opacity={0.5} />
    </g>
  );
};

export const CloseUp: React.FC<{
  subject: 'face' | 'object';
  emotion?: EmotionName;
  prop?: string;
  accessory?: AccessoryVariant;
  bands?: [string, string];
  chapterStart?: boolean;
}> = ({ subject, emotion = 'scared', prop, accessory = 'nightcap', bands = [COLORS.wallNight, COLORS.purpleDeep], chapterStart }) => {
  const frame = useCurrentFrame();
  if (subject === 'object') {
    const Comp = prop ? PROPS[prop] : null;
    return (
      <AbsoluteFill style={{ backgroundColor: COLORS.wallNight }}>
        <Stage>
          <DreamCloud />
          <Place x={CANVAS.width / 2} y={CANVAS.height / 2} scale={2.1} bob={6} bobDiv={20}>
            {Comp ? <Comp /> : null}
          </Place>
          <Place x={CANVAS.width / 2} y={CANVAS.height / 2} scale={3.2}>
            <Sparkles n={4} />
          </Place>
        </Stage>
        <ChapterFlash active={chapterStart} />
      </AbsoluteFill>
    );
  }
  // face close-up: two flat bands + radiating rings + big head
  return (
    <AbsoluteFill>
      <Stage>
        <rect x={0} y={0} width={CANVAS.width} height={700} fill={bands[0]} />
        <rect x={0} y={700} width={CANVAS.width} height={380} fill={bands[1]} />
        {/* faint radiating rings (energy, not blur) */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={CANVAS.width / 2} cy={520} r={260 + i * 120 + (frame % 60)} fill="none" stroke={COLORS.white} strokeWidth={4} opacity={0.08} />
        ))}
        {/* pillow under the head */}
        <g transform={`translate(${CANVAS.width / 2} 980) scale(3.4)`}>
          <Pillow />
        </g>
      </Stage>
      <Mascot costume="pajamas" pose="face-on-pillow" emotion={emotion} accessory={accessory} x={CANVAS.width / 2} y={CANVAS.height * 0.5} scale={2.4} seed={9} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
