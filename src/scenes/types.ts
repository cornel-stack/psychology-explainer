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
  diagram?: 'sleep-stage' | 'switchboard' | 'signal-race' | 'overflow-meter' | 'two-gates' | 'then-now' | 'decision-fork' | 'dk-curve' | 'loss-scale' | 'framing-flip' | 'defense-shield' | 'iceberg' | 'maturity-ladder' | 'redirect-arrow' | 'pressure-valve';
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
