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
import { Mascot } from '../assets/mascot/Mascot';
import { PROPS } from '../assets/props/registry';
import { StoryScene } from '../scenes/StoryScene';
import { RoomName } from '../assets/rooms';

const NEW_PROPS = ['group-chat-phone', 'music-notes', 'photo-stack', 'rain-cloud', 'puppy', 'city-gate', 'water-bowl', 'suitcase'];

/**
 * Label-band layout rule (reused anywhere a labelled grid of art is drawn):
 * each cell reserves LABEL_BAND px at the bottom for the caption; the artwork is
 * centered in the remaining area above it, so a tall prop can never underlap its
 * label.
 */
const HEADER = 80;
const LABEL_BAND = 84;

const BIAS_PROPS = ['price-tag', 'tv-screen', 'balance-scale', 'crown', 'slot-machine', 'dice', 'plane-bullet', 'star-rating', 'horoscope-card', 'trophy', 'magnifying-glass', 'calendar', 'coins', 'brain', 'check-badge'];

const DEF_PROPS = ['shield', 'threat-blob', 'locked-box', 'projector', 'trash-can', 'easel', 'sour-grapes', 'angel-devil', 'pacifier', 'open-book', 'sealed-jar', 'soap-bubbles', 'dumbbell', 'sticky-note', 'comedy-mask', 'volcano', 'pressure-gauge', 'diploma'];

const PropSheet: React.FC<{ title: string; names: string[]; cols: number }> = ({ title, names, cols }) => {
  const rows = Math.ceil(names.length / cols);
  const cw = CANVAS.width / cols;
  const ch = (CANVAS.height - HEADER) / rows;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div style={{ position: 'absolute', left: 40, top: 22, fontFamily, fontWeight: 800, fontSize: 40, color: COLORS.outline }}>{title}</div>
      <Stage>
        {names.map((name, i) => {
          const Comp = PROPS[name];
          if (!Comp) return null;
          const cx = cw * (i % cols) + cw / 2;
          const cy = HEADER + ch * Math.floor(i / cols) + (ch - LABEL_BAND) / 2;
          return (
            <Place key={name} x={cx} y={cy} scale={0.78}>
              <Comp />
            </Place>
          );
        })}
      </Stage>
      {names.map((name, i) => {
        const cx = cw * (i % cols);
        const cy = HEADER + ch * Math.floor(i / cols) + ch - LABEL_BAND + 24;
        return (
          <div key={name} style={{ position: 'absolute', left: cx, top: cy, width: cw, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 24, color: COLORS.outline }}>
            {name}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const DefensePropsSheet: React.FC = () => <PropSheet title="NEW PROPS — defense mechanisms" names={DEF_PROPS} cols={6} />;

const STORY_PROPS = ['bad-letter', 'magazine-pile', 'cigarette', 'red-flag', 'mirror', 'baby-bottle', 'gift-box', 'bouquet', 'book-stack', 'whiteboard', 'flatline-screen', 'door', 'punching-bag', 'broken-heart', 'sink', 'megaphone', 'running-shoe'];
export const StoryPropsSheet: React.FC = () => <PropSheet title="NEW PROPS — literal story (remake)" names={STORY_PROPS} cols={6} />;

const NEW_POSES = ['cover-eyes', 'cower', 'cheer', 'facepalm', 'arms-crossed', 'fist-up', 'hands-hips', 'reach-down'];
/** Pose board — the new action poses on the hoodie mascot + the 'tee' 2nd character. */
export const PoseBoard: React.FC = () => {
  const cols = 4;
  const rows = Math.ceil((NEW_POSES.length + 2) / cols);
  const cw = CANVAS.width / cols;
  const ch = (CANVAS.height - HEADER) / rows;
  const cells: { label: string; costume: any; pose: any; emotion: any }[] = [
    ...NEW_POSES.map((p) => ({ label: p, costume: 'hoodie' as const, pose: p, emotion: p === 'cheer' ? 'excited' : p === 'cover-eyes' || p === 'cower' ? 'scared' : p === 'fist-up' ? 'annoyed' : 'neutral' })),
    { label: "tee (2nd char)", costume: 'tee', pose: 'idle', emotion: 'happy-talk' },
    { label: "suit (authority)", costume: 'suit', pose: 'point-right', emotion: 'annoyed' },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div style={{ position: 'absolute', left: 40, top: 22, fontFamily, fontWeight: 800, fontSize: 40, color: COLORS.outline }}>NEW POSES + 2ND CHARACTER</div>
      {cells.map((c, i) => {
        const cx = cw * (i % cols) + cw / 2;
        const cy = HEADER + ch * Math.floor(i / cols) + (ch - LABEL_BAND) / 2 + 60;
        return <Mascot key={i} costume={c.costume} pose={c.pose} emotion={c.emotion} x={cx} y={cy} scale={0.62} seed={i + 2} />;
      })}
      {cells.map((c, i) => {
        const cx = cw * (i % cols);
        const cy = HEADER + ch * Math.floor(i / cols) + ch - LABEL_BAND + 24;
        return (
          <div key={i} style={{ position: 'absolute', left: cx, top: cy, width: cw, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 26, color: COLORS.outline }}>
            {c.label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const BiasPropsSheet: React.FC = () => {
  const names = BIAS_PROPS;
  const cols = 5;
  const rows = Math.ceil(names.length / cols);
  const cw = CANVAS.width / cols;
  const ch = (CANVAS.height - HEADER) / rows;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div style={{ position: 'absolute', left: 40, top: 22, fontFamily, fontWeight: 800, fontSize: 40, color: COLORS.outline }}>NEW PROPS — cognitive biases</div>
      <Stage>
        {names.map((name, i) => {
          const Comp = PROPS[name];
          if (!Comp) return null;
          const cx = cw * (i % cols) + cw / 2;
          const cy = HEADER + ch * Math.floor(i / cols) + (ch - LABEL_BAND) / 2;
          return (
            <Place key={name} x={cx} y={cy} scale={0.86}>
              <Comp />
            </Place>
          );
        })}
      </Stage>
      {names.map((name, i) => {
        const cx = cw * (i % cols);
        const cy = HEADER + ch * Math.floor(i / cols) + ch - LABEL_BAND + 24;
        return (
          <div key={name} style={{ position: 'absolute', left: cx, top: cy, width: cw, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 26, color: COLORS.outline }}>
            {name}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const NewPropsSheet: React.FC = () => {
  const cols = 4;
  const rows = 2;
  const cw = CANVAS.width / cols;
  const ch = (CANVAS.height - HEADER) / rows;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div style={{ position: 'absolute', left: 40, top: 22, fontFamily, fontWeight: 800, fontSize: 40, color: COLORS.outline }}>NEW PROPS — unnamed feelings</div>
      <Stage>
        {NEW_PROPS.map((name, i) => {
          const Comp = PROPS[name];
          const col = i % cols;
          const row = Math.floor(i / cols);
          const cx = cw * col + cw / 2;
          // center art in the cell MINUS the label band at the bottom
          const cy = HEADER + ch * row + (ch - LABEL_BAND) / 2;
          return (
            <Place key={name} x={cx} y={cy} scale={1.1}>
              <Comp />
            </Place>
          );
        })}
      </Stage>
      {NEW_PROPS.map((name, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = cw * col;
        const cy = HEADER + ch * row + ch - LABEL_BAND + 20;
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
  'store-aisle': { pose: 'point-right', emotion: 'excited', props: [{ name: 'price-tag', x: 1300, y: 560, scale: 1.0 }] },
  casino: { pose: 'startled', emotion: 'scared', props: [{ name: 'slot-machine', x: 1340, y: 560, scale: 0.9 }] },
  office: { pose: 'idle', emotion: 'serious-expert', props: [{ name: 'brain', x: 1330, y: 440, scale: 1.0 }] },
  'therapist-office': { pose: 'sitting-up-in-bed', emotion: 'sleepy', props: [] },
  basement: { pose: 'idle', emotion: 'scared', props: [{ name: 'locked-box', x: 1180, y: 700, scale: 1.0 }] },
  gym: { pose: 'arms-out-presenting', emotion: 'excited', props: [{ name: 'dumbbell', x: 1180, y: 760, scale: 1.1 }] },
  'art-studio': { pose: 'idle', emotion: 'happy-talk', props: [{ name: 'easel', x: 1200, y: 560, scale: 0.9 }] },
  'theater-stage': { pose: 'wave', emotion: 'excited', props: [{ name: 'comedy-mask', x: 1300, y: 460, scale: 1.0 }] },
  nursery: { pose: 'sitting-up-in-bed', emotion: 'happy-talk', props: [{ name: 'toy-blocks', x: 1050, y: 760, scale: 0.9 }] },
  'date-restaurant': { pose: 'idle', emotion: 'happy-talk', props: [{ name: 'wine-glasses', x: 1180, y: 600, scale: 0.9 }] },
  'park-bench': { pose: 'wave', emotion: 'neutral', props: [{ name: 'anchor', x: 1240, y: 600, scale: 0.9 }] },
  classroom: { pose: 'point-right', emotion: 'serious-expert', props: [{ name: 'test-paper', x: 1180, y: 640, scale: 0.9 }] },
  'science-lab': { pose: 'arms-out-presenting', emotion: 'excited', props: [{ name: 'lightbulb', x: 1180, y: 520, scale: 0.9 }] },
  'digital-wilderness': { pose: 'idle', emotion: 'happy-talk', props: [] },
  'reading-nook': { pose: 'idle', emotion: 'happy-talk', props: [{ name: 'seed-sprout', x: 1000, y: 620, scale: 0.7 }] },
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
