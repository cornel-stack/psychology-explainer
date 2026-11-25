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
import { NewPropsSheet, BiasPropsSheet, DefensePropsSheet, StoryPropsSheet, PoseBoard, RoomStill } from './dev/NewAssets';
import { DiagramCard } from './scenes/DiagramCard';
import { Thumbnail, THUMBS_BY_SLUG } from './dev/Thumbnail';

const NEW_ROOMS = ['balcony-night', 'train-interior', 'living-room', 'stadium-crowd', 'empty-hall', 'store-aisle', 'casino', 'office', 'therapist-office', 'basement', 'gym', 'art-studio', 'theater-stage', 'nursery', 'date-restaurant', 'park-bench', 'classroom', 'science-lab', 'digital-wilderness', 'reading-nook', 'insomnia-bedroom', 'mind-control-room', 'thought-void', 'calm-shore', 'dream-bedroom', 'sleep-lab', 'dreamscape', 'liminal-hallway', 'study-den', 'tinker-workshop', 'late-night-desk', 'mind-cosmos', 'inner-theater', 'daydream-realm', 'pacing-room', 'bus-window', 'witching-bedroom', 'night-street', 'brain-nightshift', 'dawn-window', 'thinker-nook', 'signpost-crossroads', 'overthink-stairwell', 'misty-clearing', 'break-room', 'celebration', 'coffee-catchup', 'masquerade-hall', 'pedestal-gallery', 'analysis-room', 'personality-atrium', 'analyst-lab', 'diplomat-garden', 'sentinel-hall', 'explorer-workshop', 'awareness-shaft', 'the-deep', 'flow-river', 'clarity-summit', 'procrastination-desk', 'deadline-cliff', 'fresh-start-desk', 'debate-stage', 'courtroom-mind', 'clarity-studio', 'cozy-den', 'forest-path-solo', 'draining-party', 'mind-gallery', 'creative-studio', 'open-nature', 'thought-funhouse', 'foggy-mind', 'reframe-room', 'emotion-atrium', 'mood-weather', 'heart-lab', 'love-gallery', 'cozy-hearth', 'blossom-garden', 'connection-lounge', 'spotlight-stage', 'fireside-circle', 'habit-brain-paths', 'routine-kitchen', 'habit-studio', 'impostor-office', 'exposure-spotlight', 'reframe-desk', 'grief-shore', 'memory-room', 'dawn-meadow', 'chasing-horizon', 'stuff-store', 'warm-gathering'] as const;
const NEW_DIAGRAMS = ['signal-race', 'overflow-meter', 'two-gates', 'then-now', 'decision-fork', 'dk-curve', 'loss-scale', 'framing-flip', 'defense-shield', 'iceberg', 'maturity-ladder', 'redirect-arrow', 'pressure-valve', 'attachment-grid', 'secure-base', 'push-pull', 'chase-cycle', 'bell-curve', 'flynn-effect', 'multi-intelligence', 'fog-triangle', 'manipulation-cycle', 'ask-ladder', 'dopamine-loop', 'comparison-trap', 'attention-economy', 'default-mode-network', 'rumination-loop', 'ironic-process', 'window-of-now', 'dial-not-switch', 'attention-spotlight', 'hypnogram', 'sleep-threshold', 'rem-switch', 'dream-layers', 'mind-body-sleep', 'terror-vs-nightmare', 'knowledge-circle', 'iq-vs-eq', 'overexcitability', 'complexity-comfort', 'curiosity-tree', 'daydream-spectrum', 'immersion-meter', 'trigger-loop', 'two-lives', 'absorption-scale', 'circadian-low', 'cortisol-curve', 'night-brain', 'molehill-mountain', 'dawn-vs-dark', 'overthink-ladder', 'thought-vs-action', 'whatif-branches', 'spiral-funnel', 'comparison-envy', 'warm-cold-map', 'jealousy-roots', 'how-to-respond', 'complex-core', 'overcompensate-arc', 'hidden-roots', 'two-sides-coin', 'four-axes', 'four-families', 'cognitive-stack', 'type-not-a-box', 'awareness-ladder', 'mind-floors', 'flow-channel', 'spectrum-line', 'present-vs-future', 'limbic-vs-cortex', 'avoidance-loop', 'do-it-ladder', 'argument-anatomy', 'attack-argument', 'correlation-causation', 'spot-it-checklist', 'introvert-battery', 'quality-quantity', 'solitude-vs-loneliness', 'social-budget', 'intelligence-wheel', 'not-one-number', 'spiky-profile', 'strength-finder', 'cbt-triangle', 'distortion-vs-reality', 'catch-check-change', 'thought-spiral', 'emotion-wheel-map', 'emotions-job', 'opposite-emotions', 'emotion-blends', 'sternberg-triangle', 'loves-wheel', 'love-over-time', 'self-love-first', 'warmth-competence-grid', 'charisma-loop', 'presence-dial', 'charisma-learnable', 'habit-loop-diagram', 'reward-timing', 'four-laws', 'compound-growth', 'impostor-cycle', 'competence-confidence-gap', 'five-types', 'feelings-vs-facts', 'five-stages', 'grief-not-linear', 'grief-waves-time', 'grief-grows-around', 'happiness-pie', 'hedonic-curve', 'what-makes-happy', 'happy-vs-meaningful', 'zeigarnik-open-loop', 'variable-reward', 'idealization-gap', 'letting-go-curve', 'gaze-detector', 'hit-miss-bias', 'watch-feedback-loop', 'vigilance-dial', 'overflow-threshold', 'sensitivity-spectrum', 'tears-three-jobs', 'being-moved-curve', 'friendship-hours', 'liking-gap', 'everyone-waiting', 'closeness-ladder', 'accuracy-coinflip', 'myth-vs-fact', 'load-truth-vs-lie', 'cluster-baseline', 'control-in-chaos', 'orderliness-trait', 'clutter-attention', 'tidy-spectrum', 'nostalgia-benefits', 'reminiscence-bump', 'bittersweet-mix', 'nostalgia-coping-loop', 'music-reward-loop', 'two-dopamine-hits', 'expectation-violation', 'who-gets-chills', 'memory-sticky', 'social-survival', 'mind-wander-surfacing', 'spotlight-reality', 'inner-speech-origin', 'self-talk-performance', 'name-distance', 'critic-vs-coach', 'boredom-equation', 'shock-choice', 'boredom-creativity', 'tolerance-eroding', 'two-memory-systems', 'deja-glitch', 'factcheck-flag', 'layout-match', 'memory-offset', 'hippocampus-building', 'neurogenesis-overwrite', 'reconstructed-memory', 'counterfactual', 'action-inaction-time', 'near-miss', 'regret-function', 'fawn-response', 'no-social-threat', 'pleasing-cost', 'boundary-reframe', 'connection-gap-diagram', 'loneliness-signal', 'loneliness-health', 'loneliness-cycle', 'proportion-ratio', 'memory-density-diagram', 'routine-vs-novelty', 'holiday-paradox-diagram', 'safe-emotion', 'console-hormone', 'mood-congruence', 'sad-music-gives', 'anger-as-signal', 'anger-iceberg-split', 'amygdala-flood', 'ninety-second-rule', 'impression-speed', 'primacy-list', 'first-two-questions', 'halo-spread', 'baseline-deviation', 'cluster-not-single', 'proxemics-zones', 'honesty-ladder', 'gaslight-cycle', 'gaslight-tactics', 'disagree-vs-gaslight', 'reality-anchors', 'rest-vs-energy', 'fatigue-types', 'energy-leaks', 'seven-rests', 'recall-vs-recognition', 'baker-baker', 'two-pathways', 'name-recall-steps', 'small-talk-jobs', 'conversation-depth', 'underestimate-liking', 'small-talk-bridge', 'negativity-bias', 'gratitude-benefits', 'lens-shift', 'gratitude-practices', 'forgiveness-myths', 'grudge-cost', 'grievance-loop', 'reach-model', 'comparison-directions', 'highlight-vs-real', 'unfair-match', 'comparison-toolkit', 'action-first-loop', 'motivation-types', 'three-fuels', 'motivation-toolkit', 'record-vs-rebuild', 'recall-rewrite-loop', 'confidence-accuracy', 'gist-not-pixels', 'obedience-curve', 'conformity-rate', 'bystander-curve', 'experiment-lessons', 'fog-sources', 'sleep-clarity-curve', 'switching-cost', 'fog-lifters', 'lie-frequency', 'lie-motives', 'lie-spectrum', 'cover-up-cascade', 'friendship-circles', 'hours-to-close', 'friend-roles', 'few-deep'] as const;

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

      {/* Phase 4 Checkpoint 2 — new assets QA */}
      <Composition id="CardNewProps" component={NewPropsSheet} durationInFrames={60} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} />
      <Composition id="CardBiasProps" component={BiasPropsSheet} durationInFrames={60} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} />
      <Composition id="CardDefenseProps" component={DefensePropsSheet} durationInFrames={60} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} />
      <Composition id="CardStoryProps" component={StoryPropsSheet} durationInFrames={60} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} />
      <Composition id="CardPoseBoard" component={PoseBoard} durationInFrames={60} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} />
      <Composition id="BeatStill" component={SceneRouter as React.FC} durationInFrames={90} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} defaultProps={{ beat: { vo: '', scene: 'story', room: 'living-room', mascots: [] } } as never} />
      {NEW_ROOMS.map((room) => (
        <Composition key={room} id={`Room-${room}`} component={RoomStill as React.FC} durationInFrames={60} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} defaultProps={{ room } as never} />
      ))}
      {NEW_DIAGRAMS.map((d) => (
        <Composition key={d} id={`Diag-${d}`} component={DiagramCard as React.FC} durationInFrames={90} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} defaultProps={{ diagram: d, withMascot: true } as never} />
      ))}

      {/* Phase 4 — per-slug thumbnail variants (1280x720): Thumb-<slug>-<A|B|C> */}
      {Object.entries(THUMBS_BY_SLUG).flatMap(([slug, set]) =>
        Object.keys(set).map((v) => (
          <Composition key={`${slug}-${v}`} id={`Thumb-${slug}-${v}`} component={Thumbnail as React.FC} durationInFrames={60} fps={CANVAS.fps} width={1280} height={720} defaultProps={{ slug, variant: v } as never} />
        ))
      )}

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
