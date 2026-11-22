/**
 * EndScreen — light-blue bg, radiating flat sunburst rings, circular subscribe
 * zone (mascot waving + seasonal accessory), two 16:9 placeholder rects per
 * YouTube end-screen safe areas, channel tagline in the handwritten font.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, CANVAS, STROKE, strokeProps } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { Mascot } from '../assets/mascot/Mascot';

const std = strokeProps(STROKE.std);

export const EndScreen: React.FC<{ tagline?: string }> = ({ tagline = 'MIND MINUTE' }) => {
  const frame = useCurrentFrame();
  const spin = frame * 0.2;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.skyEnd }}>
      <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0 }}>
        {/* sunburst rings */}
        <g transform={`translate(${CANVAS.width * 0.26} ${CANVAS.height * 0.5})`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} r={120 + i * 130} fill="none" stroke={COLORS.white} strokeWidth={10} opacity={0.18} />
          ))}
          {/* rotating rays */}
          <g transform={`rotate(${spin})`}>
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return <line key={i} x1={Math.cos(a) * 140} y1={Math.sin(a) * 140} x2={Math.cos(a) * 760} y2={Math.sin(a) * 760} stroke={COLORS.white} strokeWidth={14} opacity={0.1} />;
            })}
          </g>
        </g>

        {/* subscribe zone */}
        <g transform={`translate(${CANVAS.width * 0.52} ${CANVAS.height * 0.34})`}>
          <circle r={110} fill={COLORS.white} stroke={COLORS.yellow} strokeWidth={14} />
          <circle r={110} fill="none" {...std} />
          <text x={0} y={170} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={48} fill={COLORS.outline}>
            SUBSCRIBE
          </text>
        </g>

        {/* two 16:9 watch-next rects (right side, YT safe area) */}
        {[0, 1].map((i) => {
          const w = 540;
          const h = (w * 9) / 16;
          const x = CANVAS.width - w - 90;
          const y = 150 + i * (h + 70);
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx={20} fill={COLORS.sky} {...strokeProps(STROKE.sil)} />
              <path d={`M ${x + w / 2 - 26} ${y + h / 2 - 34} L ${x + w / 2 + 40} ${y + h / 2} L ${x + w / 2 - 26} ${y + h / 2 + 34} Z`} fill={COLORS.white} stroke={COLORS.outline} strokeWidth={6} strokeLinejoin="round" />
            </g>
          );
        })}

        {/* tagline */}
        <text x={CANVAS.width * 0.52} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={66} fill={COLORS.outline}>
          {tagline}
        </text>
      </svg>

      {/* waving mascot in subscribe zone, seasonal nightcap */}
      <Mascot costume="labcoat" pose="wave" emotion="happy-talk" accessory="nightcap" x={CANVAS.width * 0.26} y={CANVAS.height * 0.56} scale={1.15} seed={11} />
    </AbsoluteFill>
  );
};
