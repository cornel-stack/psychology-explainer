/**
 * Mascot.tsx — the character. Original chibi: near-circular white head (~60% of
 * height), tiny body, stubby limbs, pink blush. Assembles parts, applies idle
 * bob (head leads body by 2 frames), blink scheduler, talk cycle, and tremble.
 *
 * API:
 *   <Mascot costume pose emotion talking lookDir accessory scale x y flip seed />
 * Positioned via absolute SVG so it drops into any scene.
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, STROKE, strokeProps } from '../../lib/style';
import { EmotionName, resolveEmotion } from '../../lib/emotions';
import { idleBob, isBlinking, talkOpen, tremble } from '../../lib/anim';
import { Face } from './parts/Face';
import { Costume as CostumeBody } from './parts/Costume';
import type { Costume as CostumeT } from './parts/Costume';
import { Arms, Pose as ArmPose, sleeveColor } from './parts/Arms';
import { Accessory, AccessoryVariant } from './parts/Accessory';

export type Costume = CostumeT;
export type Pose =
  | ArmPose
  | 'sleeping-lying'
  | 'sitting-up-in-bed'
  | 'face-on-pillow';

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
  /** per-scene seed for blink randomization */
  seed?: number;
}

/** The head disc + second-tone underside shade. Drawn head-centered. */
const Head: React.FC = () => (
  <g>
    <circle cx={0} cy={0} r={135} fill={COLORS.white} {...strokeProps(STROKE.sil)} />
    {/* flat second-tone underside */}
    <path d="M -110 60 A 135 135 0 0 0 110 60 A 150 90 0 0 1 -110 60 Z" fill={COLORS.whiteShade} />
  </g>
);

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
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spec = resolveEmotion(emotion);

  const blinking = isBlinking(frame, fps, seed);
  const talk = talkOpen(frame, talking, 7, spec.talkBias);
  const look = lookDir === 'left' ? -12 : lookDir === 'right' ? 12 : 0;

  // idle bob: head leads body by 2 frames (follow-through)
  const bodyBob = idleBob(frame, 4, 10);
  const headBob = idleBob(frame + 2, 4, 10);
  // terrified trembling
  const jitter = spec.extra === 'tremble' ? tremble(frame, fps, 2, 4) : 0;

  const sleeve = sleeveColor(costume);
  const flipT = flip ? -1 : 1;

  let body: React.ReactNode;

  if (pose === 'face-on-pillow') {
    // close-up rig: just the head, tilted to rest on a pillow (scene draws pillow)
    body = (
      <g transform={`rotate(-14)`}>
        <g transform={`translate(0 ${headBob + jitter})`}>
          <Head />
          <Face spec={spec} talk={talk} blinking={blinking} frame={frame} fps={fps} look={look} />
          {accessory !== 'none' && <Accessory variant={accessory} frame={frame} />}
        </g>
      </g>
    );
  } else if (pose === 'sleeping-lying') {
    // reclined chibi: body laid horizontal, head on the left, zzz drift
    body = (
      <g transform="rotate(-78) translate(0 -20)">
        <g transform={`translate(0 ${bodyBob})`}>
          <CostumeBody costume={costume} />
          <Arms pose="idle" sleeve={sleeve} frame={frame} />
        </g>
        <g transform={`translate(0 ${headBob})`}>
          <Head />
          <Face spec={resolveEmotion('sleepy')} talk={0} blinking frame={frame} fps={fps} />
          {accessory !== 'none' && <Accessory variant={accessory} frame={frame} />}
        </g>
      </g>
    );
  } else {
    const seated = pose === 'sitting-up-in-bed';
    const armPose: ArmPose = SPECIAL.includes(pose) ? 'idle' : (pose as ArmPose);
    body = (
      <g>
        {/* ground shadow for standing poses */}
        {!seated && <ellipse cx={0} cy={352} rx={118} ry={20} fill={COLORS.outline} opacity={0.15} />}
        <g transform={`translate(0 ${bodyBob})`}>
          <CostumeBody costume={costume} showLegs={!seated} />
          <Arms pose={armPose} sleeve={sleeve} frame={frame} />
        </g>
        <g transform={`translate(${jitter} ${headBob})`}>
          <Head />
          <Face spec={spec} talk={talk} blinking={blinking} frame={frame} fps={fps} look={look} />
          {accessory !== 'none' && <Accessory variant={accessory} frame={frame} />}
        </g>
      </g>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      <svg width={600} height={760} viewBox="-300 -300 600 760" style={{ overflow: 'visible' }}>
        <g transform={`scale(${flipT} 1)`}>{body}</g>
      </svg>
    </div>
  );
};

export default Mascot;
