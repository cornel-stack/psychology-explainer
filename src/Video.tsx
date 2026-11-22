/**
 * Video.tsx — duration-driven assembly. Each beat is a Series.Sequence whose
 * length = the beat's narration frames (audioDuration*fps + 12 tail, computed by
 * tts.py). One Audio file per beat. A low music bed spans the whole video and a
 * whoosh fires on chapter boundaries (placeholder silent files until supplied).
 *
 * Props are produced by scripts/render.mjs from script.json + durations.json.
 */
import React from 'react';
import { AbsoluteFill, Series, Audio, staticFile, useVideoConfig, CalculateMetadataFunction } from 'remotion';
import { SceneRouter } from './scenes/SceneRouter';
import { Beat } from './scenes/types';
import './lib/fonts';

export interface EnrichedBeat {
  beat: Beat;
  frames: number;
  audio: string; // staticFile-relative, e.g. content/<slug>/audio/beat_000.mp3
}

export interface VideoProps {
  slug: string;
  fps: number;
  beats: EnrichedBeat[];
  music?: string; // staticFile-relative music bed
  // index signature so Remotion's Record<string, unknown> props constraint is met
  [key: string]: unknown;
}

const safeFile = (p: string) => staticFile(p);

export const MainVideo: React.FC<VideoProps> = ({ beats, music }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {music && (
        // calm loopable bed at ~-22 dB (0.08). Real ducking is applied at the
        // audio-mix stage; the bed is intentionally low here.
        <Audio src={safeFile(music)} loop volume={0.08} />
      )}
      <Series>
        {beats.map((b, i) => (
          <Series.Sequence key={i} durationInFrames={b.frames}>
            <SceneRouter beat={b.beat} />
            <Audio src={safeFile(b.audio)} />
            {b.beat.chapterStart && i > 0 && <Audio src={safeFile('sfx/whoosh.mp3')} />}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};

/** Duration = sum of beat frames (nothing hardcoded). */
export const calcVideoMetadata: CalculateMetadataFunction<VideoProps> = ({ props }) => {
  const total = (props.beats ?? []).reduce((s, b) => s + b.frames, 0);
  return {
    durationInFrames: Math.max(1, total),
    fps: props.fps ?? 30,
    width: 1920,
    height: 1080,
  };
};
