/**
 * common.tsx — shared scene primitives: full-canvas SVG stage, prop placement,
 * camera, chapter flash, and A5 background treatments (burst/rings/accents).
 * Backgrounds use NO black outlines (outlines are for foreground only) so the
 * subject pops.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, CANVAS, shade } from '../lib/style';
import { springIn } from '../lib/anim';

/** A full-bleed 1920x1080 SVG stage. Children draw in canvas pixel coords. */
export const Stage: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <svg width={CANVAS.width} height={CANVAS.height} viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} style={{ position: 'absolute', inset: 0, backgroundColor: bg }}>
    {children}
  </svg>
);

/**
 * Radial burst background (A5). Flat rays + rings in a slightly darker tone of
 * the base (or an accent). No outlines. Rotates imperceptibly (C ambient).
 */
export const BurstBackground: React.FC<{ base: string; accent?: string; cx?: number; cy?: number; rays?: number; rings?: boolean }> = ({ base, accent, cx = CANVAS.width / 2, cy = CANVAS.height / 2, rays = 12, rings = true }) => {
  const frame = useCurrentFrame();
  const rayColor = accent ?? shade(base, 0.06);
  const spin = frame * 0.016; // ~0.5deg/s
  return (
    <g>
      <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={base} />
      <g transform={`rotate(${spin} ${cx} ${cy})`} opacity={accent ? 0.16 : 1}>
        {Array.from({ length: rays }).map((_, i) => {
          const a0 = (i / rays) * Math.PI * 2;
          const a1 = ((i + 0.5) / rays) * Math.PI * 2;
          const R = 1500;
          return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} L ${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} Z`} fill={rayColor} />;
        })}
      </g>
      {rings &&
        [0, 1, 2].map((i) => (
          <circle key={i} cx={cx} cy={cy} r={220 + i * 200} fill="none" stroke={shade(base, 0.05)} strokeWidth={60} opacity={0.5} />
        ))}
    </g>
  );
};

/** Tiny accent shapes in the far corners (A5). No outlines. */
export const AccentCorners: React.FC<{ color: string }> = ({ color }) => (
  <g fill={color} opacity={0.5}>
    <g transform="translate(120 120)"><rect x={-6} y={-26} width={12} height={52} rx={6} /><rect x={-26} y={-6} width={52} height={12} rx={6} /></g>
    <g transform="translate(1800 150)"><circle r={14} /></g>
    <g transform="translate(150 930)"><circle r={12} /></g>
    <g transform="translate(1790 950)"><rect x={-6} y={-24} width={12} height={48} rx={6} /><rect x={-24} y={-6} width={48} height={12} rx={6} /></g>
  </g>
);

/** 8-ray white flash burst behind a subject for ~6 frames (emphasis, C). */
export const FlashBurst: React.FC<{ cx: number; cy: number; at: number; rays?: number }> = ({ cx, cy, at, rays = 10 }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0 || t > 6) return null;
  const o = interpolate(t, [0, 2, 6], [0.9, 0.6, 0]);
  const R = interpolate(t, [0, 6], [120, 460]);
  return (
    <g opacity={o}>
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2;
        return <path key={i} d={`M ${cx + Math.cos(a) * 60} ${cy + Math.sin(a) * 60} L ${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R}`} stroke={COLORS.white} strokeWidth={18} strokeLinecap="round" />;
      })}
    </g>
  );
};

/**
 * Place a prop group at (x,y). Spring entrance with squash & stretch (C).
 * bob adds a slow self-bob, phase-offset so props don't sync.
 */
export const Place: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  appearAt?: number;
  bob?: number;
  bobDiv?: number;
  bobPhase?: number;
  children: React.ReactNode;
}> = ({ x, y, scale = 1, rotate = 0, appearAt = null as unknown as number, bob = 0, bobDiv = 12, bobPhase = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let sx = scale;
  let sy = scale;
  if (appearAt != null) {
    const p = springIn(frame, fps, appearAt, { damping: 10 });
    const os = Math.sin(Math.min(1, p) * Math.PI);
    sx = scale * (p < 1 ? p * (1 - 0.1 * os) : 1);
    sy = scale * (p < 1 ? p * (1 + 0.15 * os) : 1);
  }
  const by = bob ? bob * Math.sin(frame / bobDiv + bobPhase) : 0;
  return <g transform={`translate(${x} ${y + by}) rotate(${rotate}) scale(${sx} ${sy})`}>{children}</g>;
};

export type Camera = 'static' | 'slowZoom' | { zoomTo: [number, number, number] };

export const SceneFrame: React.FC<{ camera?: Camera; durationInFrames: number; children: React.ReactNode }> = ({ camera = 'static', durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let transform = 'none';
  let origin = 'center center';
  if (camera === 'slowZoom') {
    const s = interpolate(frame, [0, durationInFrames], [1, 1.08], { extrapolateRight: 'clamp' });
    transform = `scale(${s})`;
  } else if (typeof camera === 'object' && 'zoomTo' in camera) {
    const [tx, ty, ts] = camera.zoomTo;
    const p = springIn(frame, fps, 0, { damping: 16 });
    const s = 1 + (ts - 1) * p;
    origin = `${tx * CANVAS.width}px ${ty * CANVAS.height}px`;
    transform = `scale(${s})`;
  }
  return <AbsoluteFill style={{ transform, transformOrigin: origin }}>{children}</AbsoluteFill>;
};

/** Chapter boundary: 6-frame white flash at the start of the scene. */
export const ChapterFlash: React.FC<{ active?: boolean }> = ({ active = false }) => {
  const frame = useCurrentFrame();
  if (!active) return null;
  const o = interpolate(frame, [0, 3, 6], [0.9, 0.5, 0], { extrapolateRight: 'clamp' });
  if (o <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: COLORS.white, opacity: o, pointerEvents: 'none' }} />;
};

/** Standard wall + floor backdrop (frontal flat set). Texture via fills, no strokes. */
export const WallFloor: React.FC<{ wall: string; floor: string; floorY?: number; stripe?: boolean }> = ({ wall, floor, floorY = 760, stripe = true }) => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={wall} />
    {stripe && Array.from({ length: 20 }).map((_, i) => <rect key={i} x={i * 100} y={0} width={50} height={floorY} fill={shade(wall, 0.06)} />)}
    <rect x={0} y={floorY} width={CANVAS.width} height={CANVAS.height - floorY} fill={floor} />
    <rect x={0} y={floorY - 8} width={CANVAS.width} height={10} fill={shade(floor, 0.2)} />
  </g>
);
