/**
 * StoryScene — mascot acts the narration literally inside a room.
 * Every concrete noun should be present as a prop (placed by the beat).
 */
import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { Stage, SceneFrame, ChapterFlash, Place, Camera } from './common';
import { ROOMS, RoomName } from '../assets/rooms';
import { PROPS } from '../assets/props/registry';
import { Mascot } from '../assets/mascot/Mascot';
import { MascotConfig, PropConfig } from './types';

export const StoryScene: React.FC<{
  room: RoomName;
  mascots?: MascotConfig[];
  props?: PropConfig[];
  camera?: Camera;
  chapterStart?: boolean;
}> = ({ room, mascots = [], props = [], camera = 'static', chapterStart }) => {
  const { durationInFrames } = useVideoConfig();
  const Room = ROOMS[room];
  return (
    <AbsoluteFill>
      <SceneFrame camera={camera} durationInFrames={durationInFrames}>
        <Stage>
          <Room />
          {props.map((p, i) => {
            const Comp = PROPS[p.name];
            if (!Comp) return null;
            return (
              <Place key={i} x={p.x} y={p.y} scale={p.scale ?? 1} rotate={p.rotate ?? 0} appearAt={p.appearAt as number} bob={p.bob ?? 0} bobDiv={p.bobDiv ?? 12} bobPhase={p.bobPhase ?? 0}>
                <Comp {...(p.args ?? {})} />
              </Place>
            );
          })}
        </Stage>
        {mascots.map((m, i) => (
          <Mascot key={i} seed={i + 3} {...m} />
        ))}
      </SceneFrame>
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
