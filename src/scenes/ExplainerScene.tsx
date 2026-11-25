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
  propArgs?: Record<string, unknown>;
  diagram?: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now' | 'decision-fork' | 'dk-curve' | 'loss-scale' | 'framing-flip' | 'defense-shield' | 'iceberg' | 'maturity-ladder' | 'redirect-arrow' | 'pressure-valve' | 'attachment-grid' | 'secure-base' | 'push-pull' | 'chase-cycle' | 'bell-curve' | 'flynn-effect' | 'multi-intelligence' | 'fog-triangle' | 'manipulation-cycle' | 'ask-ladder' | 'dopamine-loop' | 'comparison-trap' | 'attention-economy' | 'default-mode-network' | 'rumination-loop' | 'ironic-process' | 'window-of-now' | 'dial-not-switch' | 'attention-spotlight' | 'hypnogram' | 'sleep-threshold' | 'rem-switch' | 'dream-layers' | 'mind-body-sleep' | 'terror-vs-nightmare' | 'knowledge-circle' | 'iq-vs-eq' | 'overexcitability' | 'complexity-comfort' | 'curiosity-tree' | 'daydream-spectrum' | 'immersion-meter' | 'trigger-loop' | 'two-lives' | 'absorption-scale' | 'circadian-low' | 'cortisol-curve' | 'night-brain' | 'molehill-mountain' | 'dawn-vs-dark' | 'overthink-ladder' | 'thought-vs-action' | 'whatif-branches' | 'spiral-funnel' | 'comparison-envy' | 'warm-cold-map' | 'jealousy-roots' | 'how-to-respond' | 'complex-core' | 'overcompensate-arc' | 'hidden-roots' | 'two-sides-coin' | 'four-axes' | 'four-families' | 'cognitive-stack' | 'type-not-a-box' | 'awareness-ladder' | 'mind-floors' | 'flow-channel' | 'spectrum-line' | 'present-vs-future' | 'limbic-vs-cortex' | 'avoidance-loop' | 'do-it-ladder' | 'argument-anatomy' | 'attack-argument' | 'correlation-causation' | 'spot-it-checklist' | 'introvert-battery' | 'quality-quantity' | 'solitude-vs-loneliness' | 'social-budget' | 'intelligence-wheel' | 'not-one-number' | 'spiky-profile' | 'strength-finder' | 'cbt-triangle' | 'distortion-vs-reality' | 'catch-check-change' | 'thought-spiral' | 'emotion-wheel-map' | 'emotions-job' | 'opposite-emotions' | 'emotion-blends' | 'sternberg-triangle' | 'loves-wheel' | 'love-over-time' | 'self-love-first' | 'warmth-competence-grid' | 'charisma-loop' | 'presence-dial' | 'charisma-learnable' | 'habit-loop-diagram' | 'reward-timing' | 'four-laws' | 'compound-growth' | 'impostor-cycle' | 'competence-confidence-gap' | 'five-types' | 'feelings-vs-facts' | 'five-stages' | 'grief-not-linear' | 'grief-waves-time' | 'grief-grows-around' | 'happiness-pie' | 'hedonic-curve' | 'what-makes-happy' | 'happy-vs-meaningful' | 'zeigarnik-open-loop' | 'variable-reward' | 'idealization-gap' | 'letting-go-curve' | 'gaze-detector' | 'hit-miss-bias' | 'watch-feedback-loop' | 'vigilance-dial' | 'overflow-threshold' | 'sensitivity-spectrum' | 'tears-three-jobs' | 'being-moved-curve';
  emotion?: EmotionName;
  chapterStart?: boolean;
  talking?: boolean;
  chapterIndex?: number;
}> = ({ prop, propArgs, emotion = 'happy-talk', chapterStart, talking = true, chapterIndex = 0 }) => {
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
            <Comp {...(propArgs ?? {})} />
          </Place>
        )}
      </Stage>
      <Mascot costume="labcoat" pose={gesture} emotion={emotion} talking={talking} lookDir="right" x={CANVAS.width * 0.26} y={CANVAS.height * 0.6} scale={1.5} seed={5} />
      <ChapterFlash active={chapterStart} />
    </AbsoluteFill>
  );
};
