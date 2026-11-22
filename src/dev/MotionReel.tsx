/**
 * MotionReel — a ~15s silent reel hard-cutting through all 7 templates, to QA
 * motion and transitions. Each segment is a Series.Sequence (hard cut); segments
 * flagged chapterStart get the white-flash.
 */
import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { SceneRouter } from '../scenes/SceneRouter';
import { SAMPLE_BEATS } from './samples';
import { Beat } from '../scenes/types';

const SEG = 64; // frames per segment (~2.13s @30)

const ORDER: { key: keyof typeof SAMPLE_BEATS; chapter?: boolean }[] = [
  { key: 'story', chapter: true },
  { key: 'explainer' },
  { key: 'statCard' },
  { key: 'diagramCard', chapter: true },
  { key: 'switchboard' },
  { key: 'closeUpFace' },
  { key: 'closeUpObject', chapter: true },
  { key: 'overviewGrid' },
  { key: 'endScreen' },
];

export const MotionReel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#000' }}>
    <Series>
      {ORDER.map(({ key, chapter }) => {
        const beat: Beat = { ...SAMPLE_BEATS[key], chapterStart: chapter };
        return (
          <Series.Sequence key={key} durationInFrames={SEG}>
            <SceneRouter beat={beat} />
          </Series.Sequence>
        );
      })}
    </Series>
  </AbsoluteFill>
);

export const MOTION_REEL_FRAMES = ORDER.length * SEG;
