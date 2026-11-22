/**
 * registry.tsx — maps prop name (as used in script.json) to its component.
 * validate.ts checks every script prop against these keys.
 */
import React from 'react';
import * as Bed from './bedroom';
import * as Obj from './objects';
import * as Ico from './icons';
import * as Bub from './bubbles';

export const PROPS: Record<string, React.FC<any>> = {
  // bedroom
  pillow: Bed.Pillow,
  bed: Bed.Bed,
  blanket: Bed.Blanket,
  nightstand: Bed.Nightstand,
  lamp: Bed.Lamp,
  slippers: Bed.Slippers,
  'framed-picture': Bed.FramedPicture,
  'wall-clock': Bed.WallClock,
  'alarm-clock': Bed.AlarmClock,
  'window-night': Bed.WindowNight,
  'window-day': Bed.WindowDay,
  // objects
  fridge: Obj.Fridge,
  kettle: Obj.Kettle,
  toothbrush: Obj.Toothbrush,
  bagel: Obj.Bagel,
  envelope: Obj.Envelope,
  'teddy-bear': Obj.TeddyBear,
  'pink-heels': Obj.PinkHeels,
  'steering-wheel': Obj.SteeringWheel,
  'spider-on-thread': Obj.SpiderOnThread,
  // icons
  'red-arrow': Ico.RedArrow,
  'stop-hand': Ico.StopHand,
  heart: Ico.Heart,
  'moon-stars': Ico.MoonStars,
  'lightning-cloud': Ico.LightningCloud,
  footprints: Ico.Footprints,
  sparkles: Ico.Sparkles,
  // bubbles / fx
  'speech-bubble': Bub.SpeechBubble,
  'thought-bubble': Bub.ThoughtBubble,
  'gibberish-glyphs': Bub.GibberishGlyphs,
  'sweat-drop': Bub.SweatDrop,
  'zzz-trail': Bub.ZzzTrail,
};

export const PROP_NAMES = Object.keys(PROPS);
