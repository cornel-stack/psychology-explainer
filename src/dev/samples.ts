/** Sample beats for Phase-2 template stills and the motion reel. */
import { Beat } from '../scenes/types';

export const SAMPLE_BEATS: Record<string, Beat> = {
  story: {
    vo: 'You jolt awake in the dark, heart pounding, sure you heard something.',
    scene: 'story',
    room: 'bedroom-night',
    camera: 'slowZoom',
    chapterStart: true,
    mascots: [
      // sitting up in bed; blanket sits behind so the arms rest in front of it
      { costume: 'pajamas', pose: 'sitting-up-in-bed', emotion: 'scared', accessory: 'nightcap', x: 660, y: 520, scale: 1.25, talking: true, lookDir: 'right' },
    ],
    props: [
      // blanket on the bed, behind the mascot's body
      { name: 'blanket', x: 660, y: 812, scale: 1.0 },
      // alarm clock on the nightstand, beside the lamp (to the right)
      { name: 'alarm-clock', x: 1626, y: 600, scale: 0.82, appearAt: 8 },
    ],
  },
  explainer: {
    vo: 'Deep in your brainstem, a tiny alarm system misfires a surge of adrenaline.',
    scene: 'explainer',
    emotion: 'serious-expert',
    prop: 'lightning-cloud',
  },
  statCard: {
    vo: 'Around seventy percent of people feel this at least once.',
    scene: 'statCard',
    value: 70,
    suffix: '%',
    pictogram: 'crowd',
    fraction: 0.7,
  },
  diagramCard: {
    vo: 'It happens as you slip from light sleep down into deep sleep.',
    scene: 'diagramCard',
    diagram: 'sleep-stage',
    highlight: 'deep',
    withMascot: true,
  },
  switchboard: {
    vo: 'Your mind switches on while your body is still switched off.',
    scene: 'diagramCard',
    diagram: 'switchboard',
    withMascot: false,
  },
  closeUpFace: {
    vo: "But here's the good news — it's completely harmless.",
    scene: 'closeUp',
    subject: 'face',
    emotion: 'scared',
  },
  closeUpObject: {
    vo: 'And sometimes your sleepy brain conjures the strangest little image.',
    scene: 'closeUp',
    subject: 'object',
    prop: 'pink-heels',
  },
  overviewGrid: {
    vo: "Here's everything your sleeping brain gets up to.",
    scene: 'overviewGrid',
    items: ['FALLING', 'THE JERK', 'PARALYSIS', 'VOICES', 'EXPLODING', 'DÉJÀ RÊVÉ', 'JAMAIS', 'SLEEP TALK', 'LUCID', 'FALSE WAKE', 'NUMBNESS', 'SENSED', 'DRIFTING', 'RESET', 'DREAMS'],
  },
  endScreen: {
    vo: 'Thanks for watching — your mind will thank you.',
    scene: 'endScreen',
  },
};
