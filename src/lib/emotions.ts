/**
 * emotions.ts — the emotion system.
 * An emotion name resolves to a face spec: eyes + brows + mouth + optional extra.
 * The Mascot face rig consumes EmotionSpec; emotions are switchable mid-scene
 * simply by passing a different name on a given frame.
 */

export type EyeStyle =
  | 'oval' // neutral
  | 'open' // happy
  | 'wide' // excited
  | 'half' // sleepy (half-closed lids)
  | 'shrunk' // scared (tiny pupils)
  | 'white-wide' // terrified (white, huge)
  | 'closed-smile' // >< happy closed arcs
  | 'clench'; // >< strained

export type BrowStyle =
  | 'flat'
  | 'raised'
  | 'high'
  | 'droopy'
  | 'worried' // wavy
  | 'angry' // angled down-in
  | 'asym'; // one up one down (confused)

export type MouthStyle =
  | 'smile-sm' // small closed smile
  | 'talk' // talk-cycle open/closed
  | 'open-big' // excited
  | 'wavy-sm' // tiny wavy (sleepy)
  | 'dot' // confused dot
  | 'wavy' // scared
  | 'scream' // terrified open
  | 'flat' // annoyed
  | 'grimace'; // teeth clench

export type ExtraStyle =
  | 'none'
  | 'sparkles'
  | 'zzz'
  | 'question'
  | 'sweat'
  | 'tick' // red annoyance tick
  | 'tremble'; // triggers x-jitter on the whole head

export interface EmotionSpec {
  eyes: EyeStyle;
  brows: BrowStyle;
  mouth: MouthStyle;
  extra: ExtraStyle;
  /** mouth-open bias for the talk cycle (0..1): bigger when excited. */
  talkBias: number;
}

export type EmotionName =
  | 'neutral'
  | 'happy-talk'
  | 'excited'
  | 'sleepy'
  | 'confused'
  | 'scared'
  | 'terrified'
  | 'annoyed'
  | 'smug'
  | 'serious-expert';

export const EMOTIONS: Record<EmotionName, EmotionSpec> = {
  neutral: { eyes: 'oval', brows: 'flat', mouth: 'smile-sm', extra: 'none', talkBias: 0.1 },
  'happy-talk': { eyes: 'open', brows: 'raised', mouth: 'talk', extra: 'none', talkBias: 0.2 },
  excited: { eyes: 'wide', brows: 'high', mouth: 'open-big', extra: 'sparkles', talkBias: 0.45 },
  sleepy: { eyes: 'half', brows: 'droopy', mouth: 'wavy-sm', extra: 'zzz', talkBias: 0.05 },
  confused: { eyes: 'oval', brows: 'asym', mouth: 'dot', extra: 'question', talkBias: 0.1 },
  scared: { eyes: 'shrunk', brows: 'worried', mouth: 'wavy', extra: 'sweat', talkBias: 0.15 },
  terrified: { eyes: 'white-wide', brows: 'worried', mouth: 'scream', extra: 'tremble', talkBias: 0.5 },
  annoyed: { eyes: 'oval', brows: 'angry', mouth: 'flat', extra: 'tick', talkBias: 0.1 },
  // smug & serious-expert share the confident-brow + slight-smile look (labcoat default)
  smug: { eyes: 'oval', brows: 'angry', mouth: 'smile-sm', extra: 'none', talkBias: 0.15 },
  'serious-expert': { eyes: 'open', brows: 'angry', mouth: 'talk', extra: 'none', talkBias: 0.2 },
};

export const resolveEmotion = (name: EmotionName): EmotionSpec =>
  EMOTIONS[name] ?? EMOTIONS.neutral;

export const EMOTION_NAMES = Object.keys(EMOTIONS) as EmotionName[];
