/**
 * ExplainerScene — cream bg. Labcoat mascot at left, serious-expert, gesturing
 * (alternates point-right / arms-out every ~45 frames). ONE floating prop
 * springs in at x=70% on frame 10, then idles with its own slow bob (phase-offset).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, CANVAS } from '../lib/style';
import { Stage, Place, ChapterFlash } from './common';
import { PROPS } from '../assets/props/registry';
import { Mascot } from '../assets/mascot/Mascot';
import { EmotionName } from '../lib/emotions';

export const ExplainerScene: React.FC<{
  prop?: string;
  diagram?: 'sleep-stage' | 'switchboard';
  emotion?: EmotionName;
  chapterStart?: boolean;
  talking?: boolean;
}> = ({ prop, emotion = 'serious-expert', chapterStart, talking = true }) => {
  const frame = useCurrentFrame();
  const gesture = Math.floor(frame / 45) % 2 === 0 ? 'point-right' : 'arms-out-presenting';
  const Comp = prop ? PROPS[prop] : null;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <Stage>
        {Comp && (
          <Place x={CANVAS.width * 0.7} y={CANVAS.height * 0.5} scale={1.4} appearAt={10} bob={3} bobDiv={12} bobPhase={1.5}>
            <Comp />
          </Place>
        )}
      </Stage>
      <Mascot costume="labcoat" pose={gesture} emotion={emotion} talking={talking} lookDir="right" x={CANVAS.width * 0.28} y={CANVAS.height * 0.62} scale={1.15} seed={5} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
