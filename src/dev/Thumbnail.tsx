/**
 * Thumbnail.tsx — 1280x720 clickbait thumbnails (Dear Brain). Big reacting
 * mascot, a 2-3 word curiosity hook, a red attention badge, one accent color,
 * readable at 120px wide.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, STROKE } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { BurstBackground, Stage, Place } from '../scenes/common';
import { Mascot } from '../assets/mascot/Mascot';
import { PROPS } from '../assets/props/registry';
import { EmotionName } from '../lib/emotions';

export interface ThumbVariant {
  lines: string[];
  accent: string;
  bg: string;
  emotion: EmotionName;
  textColor: string;
  badge: string; // red attention badge
  prop?: string;
}

export const THUMBS: Record<string, ThumbVariant> = {
  // A — the void hook (highest curiosity gap)
  A: { lines: ['THE URGE', 'TO JUMP,', 'EXPLAINED'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'terrified', textColor: COLORS.white, badge: '#1', prop: 'red-arrow' },
  // B — relatable "you've felt all of these"
  B: { lines: ['YOU’VE FELT', 'ALL 15', 'OF THESE'], accent: COLORS.pink, bg: COLORS.sky, emotion: 'excited', textColor: COLORS.outline, badge: '15', prop: 'heart' },
  // C — mystery hook
  C: { lines: ['WHAT IS', 'THIS', 'FEELING?!'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '?!', prop: 'thought-bubble' },
};

export const Thumbnail: React.FC<{ variant: keyof typeof THUMBS }> = ({ variant }) => {
  const v = THUMBS[variant] ?? THUMBS.A;
  const W = 1280;
  const H = 720;
  return (
    <AbsoluteFill style={{ width: W, height: H }}>
      <Stage>
        <BurstBackground base={v.bg} accent={v.accent} cx={W * 0.74} cy={H * 0.5} rays={14} />
      </Stage>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {/* dark slab behind text for pop */}
        <path d={`M -40 -40 L ${W * 0.6} -40 L ${W * 0.5} ${H + 40} L -40 ${H + 40} Z`} fill={COLORS.outline} opacity={0.18} />
        {/* floating prop near the mascot */}
        {v.prop && PROPS[v.prop] && (
          <Place x={W * 0.52} y={H * 0.24} scale={1.15}>
            {React.createElement(PROPS[v.prop])}
          </Place>
        )}
        {/* red attention badge, tilted */}
        <g transform={`translate(${W * 0.60} ${H * 0.2}) rotate(-12)`}>
          <circle r={86} fill={COLORS.red} stroke={COLORS.outline} strokeWidth={STROKE.lg} />
          <circle r={70} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
          <text x={0} y={30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={86} fill={COLORS.white}>
            {v.badge}
          </text>
        </g>
      </svg>
      {/* hook text, left */}
      <div style={{ position: 'absolute', left: 48, top: 70, width: 760, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {v.lines.map((ln, i) => (
          <div
            key={i}
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 150,
              lineHeight: 0.98,
              color: i === 1 ? v.accent : v.textColor,
              WebkitTextStroke: `12px ${COLORS.outline}`,
              paintOrder: 'stroke fill',
              transform: `rotate(${i === 1 ? -2.5 : 0}deg)`,
              letterSpacing: -3,
            }}
          >
            {ln}
          </div>
        ))}
        <div style={{ marginTop: 20, fontFamily, fontWeight: 800, fontSize: 44, color: v.accent, WebkitTextStroke: `7px ${COLORS.outline}`, paintOrder: 'stroke fill', letterSpacing: 1 }}>
          DEAR BRAIN
        </div>
      </div>
      {/* big reacting mascot on the right */}
      <Mascot costume="hoodie" pose="startled" emotion={v.emotion} x={W * 0.82} y={H * 0.64} scale={1.7} seed={4} />
    </AbsoluteFill>
  );
};
