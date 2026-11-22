/**
 * EndScreen (B9) — light-blue bg with clean concentric rings + slow rays (no
 * web). Circular subscribe zone showing the mascot's FACE; a waving mascot; two
 * 16:9 watch-next rects with a 12px accent border + corner fold; floating stars
 * around the tagline.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps, shade } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { Mascot } from '../assets/mascot/Mascot';

const xl = strokeProps(STROKE.xl);

export const EndScreen: React.FC<{ tagline?: string }> = ({ tagline = 'MIND MINUTE' }) => {
  const frame = useCurrentFrame();
  const spin = frame * 0.016 * 60; // ~0.5 deg/s * ... slow
  const subX = CANVAS.width * 0.5;
  const subY = CANVAS.height * 0.42;
  const R = 150;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.skyEnd }}>
      <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
        {/* clean rays + concentric rings behind the subscribe zone */}
        <g transform={`translate(${subX} ${subY})`}>
          <g transform={`rotate(${spin})`} opacity={0.14}>
            {Array.from({ length: 16 }).map((_, i) => {
              const a0 = (i / 16) * Math.PI * 2;
              const a1 = ((i + 0.5) / 16) * Math.PI * 2;
              const RR = 1400;
              return <path key={i} d={`M 0 0 L ${Math.cos(a0) * RR} ${Math.sin(a0) * RR} L ${Math.cos(a1) * RR} ${Math.sin(a1) * RR} Z`} fill={COLORS.white} />;
            })}
          </g>
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} r={210 + i * 150} fill="none" stroke={COLORS.white} strokeWidth={STROKE.lg} opacity={0.18} />
          ))}
        </g>

        {/* floating stars around the tagline — full opacity, scale twinkle */}
        {[[subX - 360, 150], [subX + 360, 140], [subX - 250, 70], [subX + 250, 80]].map(([x, y], i) => {
          const s = 1 + 0.15 * Math.sin(frame / 8 + i * 1.6);
          return <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d={`M 0 -18 l 5 13 13 2 -10 9 3 14 -11 -7 -11 7 3 -14 -10 -9 13 -2 z`} fill={COLORS.yellowSoft} {...strokeProps(STROKE.sm)} />;
        })}

        {/* subscribe circle with the mascot face (clipped) */}
        <defs>
          <clipPath id="subclip">
            <circle cx={subX} cy={subY} r={R - 10} />
          </clipPath>
        </defs>
        <circle cx={subX} cy={subY} r={R} fill={COLORS.white} stroke={COLORS.yellow} strokeWidth={STROKE.xl} />
        <text x={subX} y={subY + R + 70} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={54} fill={COLORS.outline}>
          SUBSCRIBE
        </text>

        {/* two 16:9 watch-next rects with accent border + corner fold */}
        {[0, 1].map((i) => {
          const w = 560;
          const h = (w * 9) / 16;
          const x = CANVAS.width - w - 110;
          const y = 160 + i * (h + 80);
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx={22} fill={COLORS.sky} {...xl} />
              <rect x={x + 10} y={y + 10} width={w - 20} height={h - 20} rx={16} fill="none" stroke={COLORS.yellow} strokeWidth={STROKE.lg} />
              {/* corner fold */}
              <path d={`M ${x + w - 60} ${y} L ${x + w} ${y} L ${x + w} ${y + 60} Z`} fill={shade(COLORS.sky, 0.2)} />
              {/* play triangle */}
              <path d={`M ${x + w / 2 - 30} ${y + h / 2 - 38} L ${x + w / 2 + 46} ${y + h / 2} L ${x + w / 2 - 30} ${y + h / 2 + 38} Z`} fill={COLORS.white} {...strokeProps(STROKE.sm)} />
            </g>
          );
        })}

        <text x={subX} y={110} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={72} fill={COLORS.outline}>
          {tagline}
        </text>
      </svg>

      {/* mascot face inside the subscribe circle */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `circle(${R - 10}px at ${subX}px ${subY}px)` }}>
        <Mascot costume="labcoat" pose="idle" emotion="happy-talk" accessory="nightcap" x={subX} y={subY + 150} scale={1.25} seed={11} />
      </div>

      {/* waving mascot bottom-left */}
      <Mascot costume="labcoat" pose="wave" emotion="excited" x={CANVAS.width * 0.17} y={CANVAS.height * 0.72} scale={1.2} seed={12} />
    </AbsoluteFill>
  );
};
