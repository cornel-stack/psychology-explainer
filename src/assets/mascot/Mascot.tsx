/**
 * Mascot.tsx — the character (Phase 2.5 rebuild). Near-circular white head
 * (~60% height), connected limbs (Arms/Costume use silhouette+inset-fill), small
 * face shine (no crescent), expressive brows. Applies idle bob (head leads body),
 * blink, talk cycle, tremble, sleepy head-tilt, startled lean + hat-lift, and an
 * optional spring entrance with squash & stretch.
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, STROKE, strokeProps } from '../../lib/style';
import { EmotionName, resolveEmotion } from '../../lib/emotions';
import { idleBob, isBlinking, talkOpen, tremble, springIn } from '../../lib/anim';
import { Face } from './parts/Face';
import { Costume as CostumeBody } from './parts/Costume';
import type { Costume as CostumeT } from './parts/Costume';
import { Arms, Pose as ArmPose, sleeveColor } from './parts/Arms';
import { Accessory, AccessoryVariant } from './parts/Accessory';
import { SteeringWheel } from '../props/objects';

export type Costume = CostumeT;
export type Pose = ArmPose | 'sleeping-lying' | 'sitting-up-in-bed' | 'face-on-pillow';

const SPECIAL: Pose[] = ['sleeping-lying', 'sitting-up-in-bed', 'face-on-pillow'];

export interface MascotProps {
  costume?: Costume;
  pose?: Pose;
  emotion?: EmotionName;
  talking?: boolean;
  lookDir?: 'left' | 'center' | 'right';
  accessory?: AccessoryVariant;
  extras?: string[];
  scale?: number;
  x?: number;
  y?: number;
  flip?: boolean;
  seed?: number;
  /** spring-entrance frame (squash & stretch). omit = already on screen. */
  enterAt?: number;
}

/** Head disc + SMALL low-left shine (A2 — replaces the old ivory crescent). */
const Head: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={135} fill={COLORS.white} {...strokeProps(STROKE.xl)} />
    <ellipse cx={-44} cy={74} rx={40} ry={22} fill={COLORS.whiteShade} opacity={0.5} />
  </g>
);

/** Bespoke reclined pose (NOT a rotated standing rig). */
const LyingRig: React.FC<{ costume: Costume; accessory: AccessoryVariant; frame: number; fps: number }> = ({ costume, accessory, frame, fps }) => {
  const sleeve = sleeveColor(costume);
  const breathe = Math.sin(frame / 16) * 3;
  return (
    <g transform={`translate(0 ${breathe})`}>
      {/* torso lying horizontally */}
      <ellipse cx={70} cy={90} rx={170} ry={92} fill={sleeve} {...strokeProps(STROKE.xl)} />
      <ellipse cx={70} cy={120} rx={120} ry={46} fill={COLORS.outline} opacity={0.12} />
      {/* little legs to the right */}
      <path d="M 220 70 L 290 50" fill="none" stroke={COLORS.outline} strokeWidth={44} strokeLinecap="round" />
      <path d="M 220 70 L 290 50" fill="none" stroke={sleeve} strokeWidth={30} strokeLinecap="round" />
      <path d="M 220 110 L 288 118" fill="none" stroke={COLORS.outline} strokeWidth={44} strokeLinecap="round" />
      <path d="M 220 110 L 288 118" fill="none" stroke={sleeve} strokeWidth={30} strokeLinecap="round" />
      {/* resting arm on torso */}
      <path d="M 40 60 Q 120 30 180 70" fill="none" stroke={COLORS.outline} strokeWidth={42} strokeLinecap="round" />
      <path d="M 40 60 Q 120 30 180 70" fill="none" stroke={sleeve} strokeWidth={28} strokeLinecap="round" />
      <circle cx={182} cy={72} r={22} fill={COLORS.skin} {...strokeProps(STROKE.sm)} />
      {/* head on the left (pillow drawn by scene) */}
      <g transform="translate(-120 18) rotate(-8)">
        <Head />
        <Face spec={resolveEmotion('sleepy')} talk={0} blinking frame={frame} fps={fps} />
        {accessory !== 'none' && <Accessory variant={accessory} frame={frame} />}
      </g>
    </g>
  );
};

export const Mascot: React.FC<MascotProps> = ({
  costume = 'labcoat',
  pose = 'idle',
  emotion = 'neutral',
  talking = false,
  lookDir = 'center',
  accessory = 'none',
  scale = 1,
  x = 0,
  y = 0,
  flip = false,
  seed = 1,
  enterAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spec = resolveEmotion(emotion);

  const blinking = isBlinking(frame, fps, seed);
  const talk = talkOpen(frame, talking, 7, spec.talkBias);
  const look = lookDir === 'left' ? -12 : lookDir === 'right' ? 12 : 0;

  const bodyBob = idleBob(frame, 4, 10);
  const headBob = idleBob(frame + 2, 4, 10); // head leads body by 2 frames
  const jitter = spec.extra === 'tremble' ? tremble(frame, fps, 2, 4) : 0;
  const sleeve = sleeveColor(costume);
  const flipT = flip ? -1 : 1;

  // entrance squash & stretch
  let enterScaleX = 1;
  let enterScaleY = 1;
  if (enterAt != null) {
    const p = springIn(frame, fps, enterAt, { damping: 10 });
    const overshoot = Math.sin(Math.min(1, p) * Math.PI);
    if (p < 1) {
      enterScaleY = p * (1 + 0.15 * overshoot);
      enterScaleX = p * (1 - 0.1 * overshoot);
    }
  }

  let body: React.ReactNode;

  if (pose === 'face-on-pillow') {
    body = (
      <g transform={`rotate(-8)`}>
        <g transform={`translate(0 ${headBob + jitter})`}>
          <Head />
          <Face spec={spec} talk={talk} blinking={blinking} frame={frame} fps={fps} look={look} />
          {accessory !== 'none' && <Accessory variant={accessory} frame={frame} />}
        </g>
      </g>
    );
  } else if (pose === 'sleeping-lying') {
    body = <LyingRig costume={costume} accessory={accessory} frame={frame} fps={fps} />;
  } else {
    const seated = pose === 'sitting-up-in-bed';
    const armPose: ArmPose = SPECIAL.includes(pose) ? 'idle' : (pose as ArmPose);
    const startled = pose === 'startled';
    const lean = startled ? -8 : 0;
    const hatLift = startled ? -10 : 0;
    const headTilt = emotion === 'sleepy' ? 8 : 0;
    body = (
      <g transform={`rotate(${lean})`}>
        {!seated && <ellipse cx={0} cy={352} rx={120} ry={20} fill={COLORS.outline} opacity={0.15} />}
        <g transform={`translate(0 ${bodyBob})`}>
          <Arms pose={armPose} sleeve={sleeve} frame={frame} layer="back" />
          <CostumeBody costume={costume} showLegs={!seated} />
          {pose === 'hands-on-wheel' && (
            <g transform="translate(0 252) scale(0.9)">
              <SteeringWheel />
            </g>
          )}
          <Arms pose={armPose} sleeve={sleeve} frame={frame} layer="front" />
        </g>
        <g transform={`translate(${jitter} ${headBob}) rotate(${headTilt})`}>
          <Head />
          <Face spec={spec} talk={talk} blinking={blinking} frame={frame} fps={fps} look={look} />
          {accessory !== 'none' && (
            <g transform={`translate(0 ${hatLift + idleBob(frame - 3, 2, 10)})`}>
              <Accessory variant={accessory} frame={frame} />
            </g>
          )}
        </g>
      </g>
    );
  }

  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: 'center' }}>
      <svg width={620} height={820} viewBox="-310 -340 620 820" style={{ overflow: 'visible' }}>
        <g transform={`scale(${flipT * enterScaleX} ${enterScaleY})`} style={{ transformOrigin: 'center' }}>
          {body}
        </g>
      </svg>
    </div>
  );
};

export default Mascot;
