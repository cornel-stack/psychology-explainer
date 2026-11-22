/**
 * ExplainerScene (B2/A4) — cream burst bg. Labcoat mascot large at left
 * (>=65% frame height), happy-talk, gesturing (alternates point/open-palm every
 * ~40 frames with a short transition). ONE floating prop springs in large at
 * right (>=40% frame height) with a white flash burst behind it.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, CANVAS, chapterAccent } from '../lib/style';
import { Stage, Place, ChapterFlash, BurstBackground, AccentCorners, FlashBurst } from './common';
import { PROPS } from '../assets/props/registry';
import { Mascot } from '../assets/mascot/Mascot';
import { EmotionName } from '../lib/emotions';

export const ExplainerScene: React.FC<{
  prop?: string;
  diagram?: 'sleep-stage' | 'switchboard';
  emotion?: EmotionName;
  chapterStart?: boolean;
  talking?: boolean;
  chapterIndex?: number;
}> = ({ prop, emotion = 'happy-talk', chapterStart, talking = true, chapterIndex = 0 }) => {
  const frame = useCurrentFrame();
  const accent = chapterAccent(chapterIndex);
  const gesture = Math.floor(frame / 40) % 2 === 0 ? 'point-right' : 'arms-out-presenting';
  const Comp = prop ? PROPS[prop] : null;
  const propX = CANVAS.width * 0.72;
  const propY = CANVAS.height * 0.46;
  return (
    <AbsoluteFill>
      <Stage>
        <BurstBackground base={COLORS.bgCream} accent={accent} cx={propX} cy={propY} rays={10} />
        <AccentCorners color={accent} />
        <FlashBurst cx={propX} cy={propY} at={8} />
        {Comp && (
          <Place x={propX} y={propY} scale={2.0} appearAt={10} bob={3} bobDiv={12} bobPhase={1.5}>
            <Comp />
          </Place>
        )}
      </Stage>
      <Mascot costume="labcoat" pose={gesture} emotion={emotion} talking={talking} lookDir="right" x={CANVAS.width * 0.26} y={CANVAS.height * 0.6} scale={1.5} seed={5} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
