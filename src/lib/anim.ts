/**
 * anim.ts — motion helpers. All timing is frame-based (30fps).
 * Nothing here hardcodes scene length; callers pass frame + fps.
 */
import { spring, interpolate } from 'remotion';

/** Canonical spring preset per spec: damping 12, mass 0.8 — slight overshoot, settle. */
export const springIn = (
  frame: number,
  fps: number,
  delay = 0,
  config: Partial<{ damping: number; mass: number; stiffness: number }> = {}
) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100, ...config },
    durationInFrames: undefined,
  });

/** Elastic pop for bubbles/badges — overshoots to ~1.12 then settles. */
export const popIn = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, mass: 0.7, stiffness: 140 },
  });

/** Idle bob translateY. amp px, period controlled by divisor. */
export const idleBob = (frame: number, amp = 4, divisor = 10, phase = 0) =>
  amp * Math.sin(frame / divisor + phase);

/**
 * Blink scheduler. Deterministic from a per-scene seed.
 * Returns true (eyes closed) for 4 frames every 2.5–3.5s.
 */
export const isBlinking = (frame: number, fps: number, seed = 1) => {
  const minGap = 2.5 * fps;
  const jitter = fps; // up to +1s
  let t = 0;
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  // walk forward deterministically to find whether we're in a blink window
  while (t < frame + 4) {
    const gap = minGap + rand() * jitter;
    const blinkStart = t + gap;
    if (frame >= blinkStart && frame < blinkStart + 4) return true;
    t = blinkStart + 4;
  }
  return false;
};

/**
 * Talk-cycle mouth openness 0..1 while audio plays.
 * Alternates every `period` frames (6–8); bias raises baseline openness.
 * TODO: amplitude-driven mouths via @remotion/media-utils getAudioData().
 */
export const talkOpen = (
  frame: number,
  active: boolean,
  period = 7,
  bias = 0
) => {
  if (!active) return 0;
  const phase = Math.floor(frame / period) % 2;
  const base = phase === 0 ? 0.9 : 0.25;
  return Math.min(1, base * (1 - bias) + bias);
};

/** Small deterministic PRNG from an integer seed (for per-scene variation). */
export const seededRandom = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

/** Trembling jitter (x) for terrified: 2px at 4fps. */
export const tremble = (frame: number, fps: number, px = 2, hz = 4) => {
  const step = Math.floor((frame / fps) * hz);
  return step % 2 === 0 ? -px : px;
};

/** Pulse scale (e.g. sweat drop 1<->1.15 over 0.5s). */
export const pulse = (frame: number, fps: number, lo = 1, hi = 1.15, period = 0.5) => {
  const t = (frame / fps) % period / period;
  return interpolate(Math.sin(t * Math.PI * 2), [-1, 1], [lo, hi]);
};

export { interpolate };
