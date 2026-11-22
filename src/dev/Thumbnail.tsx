/**
 * Thumbnail.tsx — 1280x720 thumbnails drawn with the same SVG system.
 * Mascot large on the right with an intense emotion; 3-4 word hook on the left in
 * the display font; one accent color; burst background; readable at 120px wide.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { BurstBackground, Stage, Place } from '../scenes/common';
import { Mascot } from '../assets/mascot/Mascot';
import { PROPS } from '../assets/props/registry';
import { EmotionName } from '../lib/emotions';

export interface ThumbVariant {
  lines: string[]; // 2-3 lines, 1-2 words each
  accent: string;
  bg: string;
  emotion: EmotionName;
  textColor: string;
  prop?: string;
}

export const THUMBS: Record<string, ThumbVariant> = {
  A: { lines: ['FEELINGS', 'YOU CAN’T', 'NAME'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'terrified', textColor: COLORS.white, prop: 'red-arrow' },
  B: { lines: ['YOU’VE FELT', 'ALL 15', 'OF THESE'], accent: COLORS.pink, bg: COLORS.bgCream, emotion: 'excited', textColor: COLORS.outline, prop: 'heart' },
  C: { lines: ['WHAT IS', 'THIS', 'FEELING?'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, prop: 'thought-bubble' },
};

export const Thumbnail: React.FC<{ variant: keyof typeof THUMBS }> = ({ variant }) => {
  const v = THUMBS[variant] ?? THUMBS.A;
  const W = 1280;
  const H = 720;
  return (
    <AbsoluteFill style={{ width: W, height: H }}>
      <Stage>
        <BurstBackground base={v.bg} accent={v.accent} cx={W * 0.72} cy={H * 0.5} rays={14} />
      </Stage>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        {/* accent slab behind the text for contrast */}
        <path d={`M 0 0 L ${W * 0.56} 0 L ${W * 0.46} ${H} L 0 ${H} Z`} fill={v.accent} opacity={0.18} />
        {v.prop && (
          <g />
        )}
      </svg>
      {/* floating prop near the mascot */}
      {v.prop && PROPS[v.prop] && (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <Place x={W * 0.52} y={H * 0.26} scale={1.1}>
            {React.createElement(PROPS[v.prop])}
          </Place>
        </svg>
      )}
      {/* hook text, left */}
      <div style={{ position: 'absolute', left: 54, top: 90, width: 720, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {v.lines.map((ln, i) => (
          <div
            key={i}
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 132,
              lineHeight: 1.0,
              color: v.textColor,
              WebkitTextStroke: `10px ${COLORS.outline}`,
              paintOrder: 'stroke fill',
              transform: `rotate(${i === 1 ? -2 : 0}deg)`,
              letterSpacing: -2,
            }}
          >
            {ln}
          </div>
        ))}
        <div style={{ marginTop: 18, fontFamily, fontWeight: 800, fontSize: 40, color: v.accent, WebkitTextStroke: `6px ${COLORS.outline}`, paintOrder: 'stroke fill' }}>
          MIND MINUTE
        </div>
      </div>
      {/* mascot large on the right */}
      <Mascot costume="hoodie" pose="startled" emotion={v.emotion} x={W * 0.8} y={H * 0.62} scale={1.6} seed={4} />
    </AbsoluteFill>
  );
};
