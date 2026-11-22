/**
 * common.tsx — shared scene primitives: full-canvas SVG stage, prop placement,
 * camera (SceneFrame), and the chapter white-flash transition.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, CANVAS } from '../lib/style';
import { springIn } from '../lib/anim';

/** A full-bleed 1920x1080 SVG stage. Children draw in canvas pixel coords. */
export const Stage: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <svg
    width={CANVAS.width}
    height={CANVAS.height}
    viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
    style={{ position: 'absolute', inset: 0, backgroundColor: bg }}
  >
    {children}
  </svg>
);

/**
 * Place a prop group at (x,y) with scale/rotation. Props draw around their own
 * local origin (0,0). `spring` makes it pop in (spec: props scale/slide in,
 * never fade). `bob` adds a slow self-bob phase-offset so props don't sync.
 */
export const Place: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  appearAt?: number; // frame to spring in
  bob?: number; // bob amplitude (0 = none)
  bobDiv?: number;
  bobPhase?: number;
  children: React.ReactNode;
}> = ({ x, y, scale = 1, rotate = 0, appearAt = null as unknown as number, bob = 0, bobDiv = 12, bobPhase = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = appearAt != null ? springIn(frame, fps, appearAt) : 1;
  const by = bob ? bob * Math.sin(frame / bobDiv + bobPhase) : 0;
  return (
    <g transform={`translate(${x} ${y + by}) scale(${scale * pop}) rotate(${rotate})`}>{children}</g>
  );
};

/**
 * Camera. Wraps a scene; applies static | slowZoom | zoomTo over the scene.
 * durationInFrames lets slowZoom span the whole beat with no hardcoding.
 */
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
  return (
    <AbsoluteFill style={{ transform, transformOrigin: origin }}>{children}</AbsoluteFill>
  );
};

/**
 * Chapter boundary: 6-frame white flash at the start of the scene.
 * (SFX whoosh is added on the audio layer; see public/sfx.)
 */
export const ChapterFlash: React.FC<{ active?: boolean }> = ({ active = false }) => {
  const frame = useCurrentFrame();
  if (!active) return null;
  const o = interpolate(frame, [0, 3, 6], [0.9, 0.5, 0], { extrapolateRight: 'clamp' });
  if (o <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: COLORS.white, opacity: o, pointerEvents: 'none' }} />;
};

/** Standard wall + floor backdrop (frontal flat set). */
export const WallFloor: React.FC<{ wall: string; floor: string; floorY?: number; stripe?: boolean }> = ({ wall, floor, floorY = 760, stripe = true }) => (
  <g>
    <rect x={0} y={0} width={CANVAS.width} height={CANVAS.height} fill={wall} />
    {stripe &&
      Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 100} y={0} width={50} height={floorY} fill={COLORS.outline} opacity={0.04} />
      ))}
    <rect x={0} y={floorY} width={CANVAS.width} height={CANVAS.height - floorY} fill={floor} />
    <rect x={0} y={floorY - 8} width={CANVAS.width} height={10} fill={COLORS.outline} opacity={0.18} />
  </g>
);
