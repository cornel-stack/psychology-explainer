/**
 * StoryScene — mascot acts the narration literally inside a room. Props render
 * BEHIND the mascots; foreground props (fg) render OVER them (e.g. a blanket
 * tucking the mascot into bed — B10/A7).
 */
import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { Stage, SceneFrame, ChapterFlash, Place, Camera } from './common';
import { ROOMS, RoomName } from '../assets/rooms';
import { PROPS } from '../assets/props/registry';
import { Mascot } from '../assets/mascot/Mascot';
import { MascotConfig, PropConfig } from './types';

const PropLayer: React.FC<{ items: PropConfig[] }> = ({ items }) => (
  <>
    {items.map((p, i) => {
      const Comp = PROPS[p.name];
      if (!Comp) return null;
      return (
        <Place key={i} x={p.x} y={p.y} scale={p.scale ?? 1} rotate={p.rotate ?? 0} appearAt={p.appearAt as number} bob={p.bob ?? 0} bobDiv={p.bobDiv ?? 12} bobPhase={p.bobPhase ?? 0}>
          <Comp {...(p.args ?? {})} />
        </Place>
      );
    })}
  </>
);

export const StoryScene: React.FC<{
  room: RoomName;
  mascots?: MascotConfig[];
  props?: PropConfig[];
  fg?: PropConfig[];
  camera?: Camera;
  chapterStart?: boolean;
}> = ({ room, mascots = [], props = [], fg = [], camera = 'static', chapterStart }) => {
  const { durationInFrames } = useVideoConfig();
  const Room = ROOMS[room];
  return (
    <AbsoluteFill>
      <SceneFrame camera={camera} durationInFrames={durationInFrames}>
        <Stage>
          <Room />
          <PropLayer items={props} />
        </Stage>
        {mascots.map((m, i) => (
          <Mascot key={i} seed={i + 3} {...m} />
        ))}
        {fg.length > 0 && (
          <Stage>
            <PropLayer items={fg} />
          </Stage>
        )}
      </SceneFrame>
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
