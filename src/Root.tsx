import React from 'react';
import { Composition } from 'remotion';
import './lib/fonts';
import { ContactSheet } from './dev/ContactSheet';
import { Accessories } from './dev/Accessories';
import { CANVAS } from './lib/style';
import { SceneRouter } from './scenes/SceneRouter';
import { SAMPLE_BEATS } from './dev/samples';
import { MotionReel, MOTION_REEL_FRAMES } from './dev/MotionReel';
import { JointTest } from './dev/JointTest';
import { MainVideo, calcVideoMetadata } from './Video';

// Each template still is a SceneRouter wrapped at canvas size.
const TEMPLATE_STILLS: { id: string; beat: keyof typeof SAMPLE_BEATS; dur: number }[] = [
  { id: 'Tmpl-Story', beat: 'story', dur: 120 },
  { id: 'Tmpl-Explainer', beat: 'explainer', dur: 120 },
  { id: 'Tmpl-StatCard', beat: 'statCard', dur: 90 },
  { id: 'Tmpl-DiagramSleep', beat: 'diagramCard', dur: 90 },
  { id: 'Tmpl-DiagramSwitch', beat: 'switchboard', dur: 90 },
  { id: 'Tmpl-CloseUpFace', beat: 'closeUpFace', dur: 90 },
  { id: 'Tmpl-CloseUpObject', beat: 'closeUpObject', dur: 90 },
  { id: 'Tmpl-OverviewGrid', beat: 'overviewGrid', dur: 120 },
  { id: 'Tmpl-EndScreen', beat: 'endScreen', dur: 120 },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Phase 1 QA boards (stills) */}
      <Composition id="CardContactSheet" component={ContactSheet} durationInFrames={60} fps={30} width={3010} height={2320} />
      <Composition id="CardAccessories" component={Accessories} durationInFrames={60} fps={30} width={2010} height={920} />
      <Composition id="CardJointTest" component={JointTest} durationInFrames={60} fps={30} width={1920} height={1420} />

      {/* Phase 2 — one composition per template (for stills) */}
      {TEMPLATE_STILLS.map(({ id, beat, dur }) => (
        <Composition
          key={id}
          id={id}
          component={SceneRouter as React.FC}
          durationInFrames={dur}
          fps={CANVAS.fps}
          width={CANVAS.width}
          height={CANVAS.height}
          defaultProps={{ beat: SAMPLE_BEATS[beat] } as never}
        />
      ))}

      {/* Phase 2 — 15s silent motion reel through all templates */}
      <Composition id="MotionReel" component={MotionReel} durationInFrames={MOTION_REEL_FRAMES} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} />

      {/* Phase 3 — duration-driven assembled video (props from render.mjs) */}
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={300}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
        defaultProps={{ slug: '', fps: CANVAS.fps, beats: [], music: 'sfx/music_bed.mp3' }}
        calculateMetadata={calcVideoMetadata}
      />
    </>
  );
};
