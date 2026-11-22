/**
 * NewAssets.tsx — Checkpoint-2 QA boards for the unnamed-feelings video:
 *  - NewPropsSheet: all 8 new props on one sheet.
 *  - RoomStill: one new room with the mascot composed in it.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, CANVAS } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { Stage, Place } from '../scenes/common';
import { PROPS } from '../assets/props/registry';
import { StoryScene } from '../scenes/StoryScene';
import { RoomName } from '../assets/rooms';

const NEW_PROPS = ['group-chat-phone', 'music-notes', 'photo-stack', 'rain-cloud', 'puppy', 'city-gate', 'water-bowl', 'suitcase'];

export const NewPropsSheet: React.FC = () => {
  const cols = 4;
  const cw = CANVAS.width / cols;
  const rows = 2;
  const ch = CANVAS.height / rows;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div style={{ position: 'absolute', left: 40, top: 24, fontFamily, fontWeight: 800, fontSize: 40, color: COLORS.outline }}>NEW PROPS — unnamed feelings</div>
      <Stage>
        {NEW_PROPS.map((name, i) => {
          const Comp = PROPS[name];
          const cx = cw * (i % cols) + cw / 2;
          const cy = ch * Math.floor(i / cols) + ch / 2 + 20;
          return (
            <Place key={name} x={cx} y={cy} scale={1.25}>
              <Comp />
            </Place>
          );
        })}
      </Stage>
      {NEW_PROPS.map((name, i) => {
        const cx = cw * (i % cols);
        const cy = ch * Math.floor(i / cols) + ch - 70;
        return (
          <div key={name} style={{ position: 'absolute', left: cx, top: cy, width: cw, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 30, color: COLORS.outline }}>
            {name}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const ROOM_DEMO: Record<string, { pose: any; emotion: any; props?: any[] }> = {
  'balcony-night': { pose: 'idle', emotion: 'neutral', props: [{ name: 'moon-stars', x: 1500, y: 240, scale: 1.1 }] },
  'train-interior': { pose: 'sitting-up-in-bed', emotion: 'sleepy', props: [{ name: 'group-chat-phone', x: 1300, y: 560, scale: 1.0 }] },
  'living-room': { pose: 'idle', emotion: 'happy-talk', props: [{ name: 'music-notes', x: 1320, y: 420, scale: 1.1 }] },
  'stadium-crowd': { pose: 'wave', emotion: 'excited', props: [{ name: 'sparkles', x: 1320, y: 320, scale: 1.6 }] },
  'empty-hall': { pose: 'idle', emotion: 'scared', props: [] },
};

export const RoomStill: React.FC<{ room: RoomName }> = ({ room }) => {
  const d = ROOM_DEMO[room] ?? { pose: 'idle', emotion: 'neutral' };
  return (
    <StoryScene
      room={room}
      mascots={[{ costume: 'hoodie', pose: d.pose, emotion: d.emotion, x: 660, y: 600, scale: 1.3, talking: true }]}
      props={d.props}
    />
  );
};
