/**
 * registry.tsx — maps prop name (as used in script.json) to its component.
 * validate.ts checks every script prop against these keys.
 */
import React from 'react';
import * as Bed from './bedroom';
import * as Obj from './objects';
import * as Ico from './icons';
import * as Bub from './bubbles';
import * as Feel from './feelings';
import * as Bias from './biases';
import * as Def from './defenses';
import * as Sty from './story';

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
  // unnamed-feelings props
  'group-chat-phone': Feel.GroupChatPhone,
  'music-notes': Feel.MusicNotes,
  'photo-stack': Feel.PhotoStack,
  'rain-cloud': Feel.RainCloud,
  puppy: Feel.Puppy,
  'city-gate': Feel.CityGate,
  'water-bowl': Feel.WaterBowl,
  suitcase: Feel.Suitcase,
  // cognitive-biases props
  'price-tag': Bias.PriceTag,
  'tv-screen': Bias.TvScreen,
  'balance-scale': Bias.BalanceScale,
  crown: Bias.Crown,
  'slot-machine': Bias.SlotMachine,
  dice: Bias.Dice,
  'plane-bullet': Bias.PlaneBullet,
  'star-rating': Bias.StarRating,
  'horoscope-card': Bias.HoroscopeCard,
  trophy: Bias.Trophy,
  'magnifying-glass': Bias.MagnifyingGlass,
  calendar: Bias.Calendar,
  coins: Bias.Coins,
  brain: Bias.Brain,
  'check-badge': Bias.CheckBadge,
  // defense-mechanisms props
  shield: Def.Shield,
  'threat-blob': Def.ThreatBlob,
  'locked-box': Def.LockedBox,
  projector: Def.Projector,
  'trash-can': Def.TrashCan,
  easel: Def.Easel,
  'sour-grapes': Def.SourGrapes,
  'angel-devil': Def.AngelDevil,
  pacifier: Def.Pacifier,
  'open-book': Def.OpenBook,
  'sealed-jar': Def.SealedJar,
  'soap-bubbles': Def.SoapBubbles,
  dumbbell: Def.Dumbbell,
  'sticky-note': Def.StickyNote,
  'comedy-mask': Def.ComedyMask,
  volcano: Def.Volcano,
  'pressure-gauge': Def.PressureGauge,
  diploma: Def.Diploma,
  // literal story props (draw exactly what the narration says)
  'bad-letter': Sty.BadLetter,
  'magazine-pile': Sty.MagazinePile,
  cigarette: Sty.Cigarette,
  'red-flag': Sty.RedFlag,
  mirror: Sty.Mirror,
  'baby-bottle': Sty.BabyBottle,
  'gift-box': Sty.GiftBox,
  bouquet: Sty.Bouquet,
  'book-stack': Sty.BookStack,
  whiteboard: Sty.Whiteboard,
  'flatline-screen': Sty.FlatlineScreen,
  door: Sty.Door,
  'punching-bag': Sty.PunchingBag,
  'broken-heart': Sty.BrokenHeart,
  sink: Sty.Sink,
  megaphone: Sty.Megaphone,
  'running-shoe': Sty.RunningShoe,
};

export const PROP_NAMES = Object.keys(PROPS);
