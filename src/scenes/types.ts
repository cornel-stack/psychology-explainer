/** Shared scene/beat types. Mirrors content/<slug>/script.json beat fields. */
import { Costume, Pose } from '../assets/mascot/Mascot';
import { EmotionName } from '../lib/emotions';
import { AccessoryVariant } from '../assets/mascot/parts/Accessory';
import { RoomName } from '../assets/rooms';
import { Camera } from './common';

export type SceneKind =
  | 'story'
  | 'explainer'
  | 'statCard'
  | 'diagramCard'
  | 'closeUp'
  | 'overviewGrid'
  | 'endScreen';

export interface MascotConfig {
  costume?: Costume;
  pose?: Pose;
  emotion?: EmotionName;
  accessory?: AccessoryVariant;
  x?: number; // px (canvas coords)
  y?: number;
  scale?: number;
  flip?: boolean;
  talking?: boolean;
  lookDir?: 'left' | 'center' | 'right';
}

export interface PropConfig {
  name: string;
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  appearAt?: number;
  bob?: number;
  bobDiv?: number;
  bobPhase?: number;
  /** extra props forwarded to the prop component (e.g. dir for red-arrow) */
  args?: Record<string, unknown>;
}

export interface Beat {
  vo: string;
  scene: SceneKind;
  emotion?: EmotionName;
  camera?: Camera;
  chapterStart?: boolean;
  /** section title card (shown briefly at the start of this beat) */
  title?: string;
  subtitle?: string;
  /** args forwarded to the explainer's single prop (e.g. bubble text) */
  propArgs?: Record<string, unknown>;
  // story
  room?: RoomName;
  mascots?: MascotConfig[];
  props?: PropConfig[];
  /** foreground props drawn OVER the mascots (e.g. a blanket tucking them in) */
  fg?: PropConfig[];
  // explainer
  prop?: string;
  diagram?: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now' | 'decision-fork' | 'dk-curve' | 'loss-scale' | 'framing-flip' | 'defense-shield' | 'iceberg' | 'maturity-ladder' | 'redirect-arrow' | 'pressure-valve' | 'attachment-grid' | 'secure-base' | 'push-pull' | 'chase-cycle' | 'bell-curve' | 'flynn-effect' | 'multi-intelligence' | 'fog-triangle' | 'manipulation-cycle' | 'ask-ladder' | 'dopamine-loop' | 'comparison-trap' | 'attention-economy' | 'default-mode-network' | 'rumination-loop' | 'ironic-process' | 'window-of-now' | 'dial-not-switch' | 'attention-spotlight' | 'hypnogram' | 'sleep-threshold' | 'rem-switch' | 'dream-layers' | 'mind-body-sleep' | 'terror-vs-nightmare' | 'knowledge-circle' | 'iq-vs-eq' | 'overexcitability' | 'complexity-comfort' | 'curiosity-tree' | 'daydream-spectrum' | 'immersion-meter' | 'trigger-loop' | 'two-lives' | 'absorption-scale' | 'circadian-low' | 'cortisol-curve' | 'night-brain' | 'molehill-mountain' | 'dawn-vs-dark' | 'overthink-ladder' | 'thought-vs-action' | 'whatif-branches' | 'spiral-funnel' | 'comparison-envy' | 'warm-cold-map' | 'jealousy-roots' | 'how-to-respond' | 'complex-core' | 'overcompensate-arc' | 'hidden-roots' | 'two-sides-coin' | 'four-axes' | 'four-families' | 'cognitive-stack' | 'type-not-a-box' | 'awareness-ladder' | 'mind-floors' | 'flow-channel' | 'spectrum-line' | 'present-vs-future' | 'limbic-vs-cortex' | 'avoidance-loop' | 'do-it-ladder' | 'argument-anatomy' | 'attack-argument' | 'correlation-causation' | 'spot-it-checklist' | 'introvert-battery' | 'quality-quantity' | 'solitude-vs-loneliness' | 'social-budget' | 'intelligence-wheel' | 'not-one-number' | 'spiky-profile' | 'strength-finder' | 'cbt-triangle' | 'distortion-vs-reality' | 'catch-check-change' | 'thought-spiral' | 'emotion-wheel-map' | 'emotions-job' | 'opposite-emotions' | 'emotion-blends' | 'sternberg-triangle' | 'loves-wheel' | 'love-over-time' | 'self-love-first' | 'warmth-competence-grid' | 'charisma-loop' | 'presence-dial' | 'charisma-learnable' | 'habit-loop-diagram' | 'reward-timing' | 'four-laws' | 'compound-growth' | 'impostor-cycle' | 'competence-confidence-gap' | 'five-types' | 'feelings-vs-facts' | 'five-stages' | 'grief-not-linear' | 'grief-waves-time' | 'grief-grows-around' | 'happiness-pie' | 'hedonic-curve' | 'what-makes-happy' | 'happy-vs-meaningful' | 'zeigarnik-open-loop' | 'variable-reward' | 'idealization-gap' | 'letting-go-curve' | 'gaze-detector' | 'hit-miss-bias' | 'watch-feedback-loop' | 'vigilance-dial' | 'overflow-threshold' | 'sensitivity-spectrum' | 'tears-three-jobs' | 'being-moved-curve' | 'friendship-hours' | 'liking-gap' | 'everyone-waiting' | 'closeness-ladder' | 'accuracy-coinflip' | 'myth-vs-fact' | 'load-truth-vs-lie' | 'cluster-baseline' | 'control-in-chaos' | 'orderliness-trait' | 'clutter-attention' | 'tidy-spectrum' | 'nostalgia-benefits' | 'reminiscence-bump' | 'bittersweet-mix' | 'nostalgia-coping-loop' | 'music-reward-loop' | 'two-dopamine-hits' | 'expectation-violation' | 'who-gets-chills' | 'memory-sticky' | 'social-survival' | 'mind-wander-surfacing' | 'spotlight-reality';
  /** labels for parametric diagrams (decision-fork, framing-flip) */
  labels?: string[];
  side?: 'left' | 'right';
  // statCard
  value?: number;
  suffix?: string;
  pictogram?: 'crowd' | 'none';
  fraction?: number; // 0..1 of crowd filled
  // diagramCard
  highlight?: string;
  withMascot?: boolean;
  // closeUp
  subject?: 'face' | 'object';
  bands?: [string, string];
  bed?: boolean;
  accessory?: AccessoryVariant;
  // overviewGrid
  items?: string[];
}
