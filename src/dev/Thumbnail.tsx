/**
 * Thumbnail.tsx — 1280x720 clickbait thumbnails (Dear Brain), per video slug.
 * Big reacting mascot, 2-3 word curiosity hook, red attention badge, one accent,
 * readable at 120px.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, STROKE } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { BurstBackground, Stage, Place } from '../scenes/common';
import { Mascot } from '../assets/mascot/Mascot';
import { PROPS } from '../assets/props/registry';
import { EmotionName } from '../lib/emotions';

export interface ThumbVariant {
  lines: string[];
  accent: string;
  bg: string;
  emotion: EmotionName;
  textColor: string;
  badge: string;
  prop?: string;
}

/** Thumbnail sets keyed by content slug. */
export const THUMBS_BY_SLUG: Record<string, Record<string, ThumbVariant>> = {
  'unnamed-feelings': {
    A: { lines: ['THE URGE', 'TO JUMP,', 'EXPLAINED'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'terrified', textColor: COLORS.white, badge: '#1', prop: 'red-arrow' },
    B: { lines: ['YOU’VE FELT', 'ALL 15', 'OF THESE'], accent: COLORS.pink, bg: COLORS.sky, emotion: 'excited', textColor: COLORS.outline, badge: '15', prop: 'heart' },
    C: { lines: ['WHAT IS', 'THIS', 'FEELING?!'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '?!', prop: 'thought-bubble' },
  },
  'cognitive-biases': {
    A: { lines: ['YOU’RE NOT', 'AS SMART', 'AS YOU THINK'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'smug', textColor: COLORS.white, badge: '15', prop: 'brain' },
    B: { lines: ['15 BIASES', 'RUINING', 'YOUR LIFE'], accent: COLORS.red, bg: COLORS.sky, emotion: 'scared', textColor: COLORS.outline, badge: '!', prop: 'price-tag' },
    C: { lines: ['WHY SMART', 'PEOPLE MAKE', 'DUMB CHOICES'], accent: COLORS.pink, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '?!', prop: 'magnifying-glass' },
  },
  'defense-mechanisms': {
    A: { lines: ['WHICH ONE', 'ARE YOU', 'HIDING WITH?'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'scared', textColor: COLORS.white, badge: '15', prop: 'shield' },
    B: { lines: ['YOUR BRAIN', 'IS LYING', 'TO PROTECT YOU'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '!', prop: 'locked-box' },
    C: { lines: ['15 WAYS', 'YOU AVOID', 'THE TRUTH'], accent: COLORS.pink, bg: COLORS.sky, emotion: 'smug', textColor: COLORS.outline, badge: '?!', prop: 'comedy-mask' },
  },
  'attachment-styles': {
    A: { lines: ['WHICH ONE', 'ARE YOU', 'IN LOVE?'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'scared', textColor: COLORS.white, badge: '4', prop: 'relationship-thermometer' },
    B: { lines: ['WHY YOU', 'DATE THE', 'WRONG PEOPLE'], accent: COLORS.red, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '!', prop: 'phone-unread' },
    C: { lines: ['THE ANXIOUS', 'AVOIDANT', 'TRAP'], accent: COLORS.sky, bg: COLORS.pink, emotion: 'smug', textColor: COLORS.outline, badge: '?!', prop: 'turtle-shell' },
  },
  'iq-levels': {
    A: { lines: ['WHAT YOUR', 'IQ LEVEL', 'REALLY MEANS'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'serious-expert', textColor: COLORS.white, badge: '7', prop: 'brain' },
    B: { lines: ['LIFE AT', 'EVERY', 'IQ LEVEL'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'excited', textColor: COLORS.white, badge: '100', prop: 'iq-report' },
    C: { lines: ['IS 160', 'ACTUALLY', 'GENIUS?'], accent: COLORS.pink, bg: COLORS.sky, emotion: 'smug', textColor: COLORS.outline, badge: '?!', prop: 'lightbulb' },
  },
  'manipulation-tactics': {
    A: { lines: ['15 TRICKS', 'THEY USE', 'ON YOU'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'scared', textColor: COLORS.white, badge: '15', prop: 'puppet-strings' },
    B: { lines: ['SPOT A', 'MANIPULATOR', 'IN SECONDS'], accent: COLORS.red, bg: COLORS.purpleDeep, emotion: 'serious-expert', textColor: COLORS.white, badge: '!', prop: 'sheep-mask' },
    C: { lines: ['ARE YOU', 'BEING', 'PLAYED?'], accent: COLORS.sky, bg: COLORS.pink, emotion: 'confused', textColor: COLORS.outline, badge: '?!', prop: 'gaslight-lamp' },
  },
  'offline-minds': {
    A: { lines: ['9 TRAITS', 'OF PEOPLE', 'WHO LOG OFF'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'happy-talk', textColor: COLORS.white, badge: '9', prop: 'fomo-ghost' },
    B: { lines: ['THE LAST', 'PERSON', 'OFFLINE'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'smug', textColor: COLORS.white, badge: '!', prop: 'binoculars' },
    C: { lines: ['WHY THEY', 'QUIT', 'SOCIAL MEDIA'], accent: COLORS.pink, bg: COLORS.sky, emotion: 'serious-expert', textColor: COLORS.outline, badge: '?!', prop: 'seed-sprout' },
  },
  'restless-brain': {
    A: { lines: ['WHY YOUR', 'BRAIN WON’T', 'SHUT UP'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'annoyed', textColor: COLORS.white, badge: '!', prop: 'stuck-radio' },
    B: { lines: ['FIND YOUR', 'BRAIN’S', 'OFF SWITCH'], accent: COLORS.red, bg: COLORS.purpleDeep, emotion: 'scared', textColor: COLORS.white, badge: '?', prop: 'off-switch' },
    C: { lines: ['STOP', 'OVER', 'THINKING'], accent: COLORS.sky, bg: COLORS.pink, emotion: 'terrified', textColor: COLORS.outline, badge: '3AM', prop: 'overheating-brain' },
  },
  'sleep-glitches': {
    A: { lines: ['15 WEIRD', 'THINGS YOUR', 'BRAIN DOES ASLEEP'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'terrified', textColor: COLORS.white, badge: '15', prop: 'shadow-figure' },
    B: { lines: ['WHY YOU', 'JOLT', 'AWAKE'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'scared', textColor: COLORS.white, badge: '!', prop: 'falling-void' },
    C: { lines: ['SLEEP', 'PARALYSIS', 'EXPLAINED'], accent: COLORS.pink, bg: COLORS.purpleDeep, emotion: 'terrified', textColor: COLORS.white, badge: '?!', prop: 'moon-face' },
  },
  'high-iq': {
    A: { lines: ['9 SIGNS', 'YOU HAVE A', 'HIGH IQ'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'smug', textColor: COLORS.white, badge: '9', prop: 'question-magnet' },
    B: { lines: ['THE HIDDEN', 'COST OF A', 'SMART BRAIN'], accent: COLORS.pink, bg: COLORS.purpleDeep, emotion: 'scared', textColor: COLORS.white, badge: '!', prop: 'overthink-pretzel' },
    C: { lines: ['SMART', 'PEOPLE', 'PROBLEMS'], accent: COLORS.sky, bg: COLORS.greenTeal, emotion: 'annoyed', textColor: COLORS.outline, badge: '?!', prop: 'night-owl' },
  },
  'daydreamers': {
    A: { lines: ['YOU LIVE', 'IN YOUR', 'HEAD'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'happy-talk', textColor: COLORS.white, badge: '9', prop: 'inner-cinema' },
    B: { lines: ['WHY YOU', 'PACE &', 'DAYDREAM'], accent: COLORS.pink, bg: COLORS.purpleDeep, emotion: 'excited', textColor: COLORS.white, badge: '?', prop: 'alter-ego' },
    C: { lines: ['MALADAPTIVE', 'DAY', 'DREAMING'], accent: COLORS.sky, bg: COLORS.lavender, emotion: 'confused', textColor: COLORS.outline, badge: '!', prop: 'escape-hatch' },
  },
  'fear-3am': {
    A: { lines: ['WHY YOU', 'WAKE UP', 'AT 3 AM'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'terrified', textColor: COLORS.white, badge: '3AM', prop: 'clock-3am' },
    B: { lines: ['THE 3 AM', 'BRAIN IS', 'LYING'], accent: COLORS.red, bg: COLORS.purpleDeep, emotion: 'scared', textColor: COLORS.white, badge: '!', prop: 'worry-monster' },
    C: { lines: ['WHY DREAD', 'FEELS', 'WORSE AT NIGHT'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'scared', textColor: COLORS.white, badge: '?!', prop: 'wolf-howl' },
  },
  'overthinking-levels': {
    A: { lines: ['THE 7', 'LEVELS OF', 'OVERTHINKING'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'scared', textColor: COLORS.white, badge: '7', prop: 'stuck-compass' },
    B: { lines: ['WHICH', 'LEVEL ARE', 'YOU STUCK ON?'], accent: COLORS.red, bg: COLORS.purpleDeep, emotion: 'annoyed', textColor: COLORS.white, badge: '?', prop: 'rumination-drum' },
    C: { lines: ['HOW TO', 'STOP THE', 'SPIRAL'], accent: COLORS.sky, bg: COLORS.greenTeal, emotion: 'happy-talk', textColor: COLORS.outline, badge: '!', prop: 'brake-lever' },
  },
  'jealousy-signs': {
    A: { lines: ['10 SIGNS', "THEY'RE", 'JEALOUS OF YOU'], accent: COLORS.yellow, bg: COLORS.wallNight, emotion: 'smug', textColor: COLORS.white, badge: '10', prop: 'green-monster' },
    B: { lines: ['THE FAKE', 'SMILE', 'DECODED'], accent: COLORS.pink, bg: COLORS.purpleDeep, emotion: 'annoyed', textColor: COLORS.white, badge: '!', prop: 'fake-smile-mask' },
    C: { lines: ['WHY THEY', "CAN'T BE", 'HAPPY FOR YOU'], accent: COLORS.sky, bg: COLORS.greenTeal, emotion: 'confused', textColor: COLORS.outline, badge: '?!', prop: 'side-eye' },
  },
  'cognitive-distortions': {
    A: { lines: ['EVERY', 'COGNITIVE', 'DISTORTION'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '10', prop: 'distortion-lens' },
    B: { lines: ['10 LIES', 'YOUR BRAIN', 'TELLS YOU'], accent: COLORS.red, bg: COLORS.wallNight, emotion: 'scared', textColor: COLORS.white, badge: '!', prop: 'catastrophize' },
    C: { lines: ['STOP', 'BELIEVING', 'EVERY THOUGHT'], accent: COLORS.greenLeaf, bg: COLORS.greenTeal, emotion: 'serious-expert', textColor: COLORS.outline, badge: '?', prop: 'reframe-glasses' },
  },
  'types-of-intelligence': {
    A: { lines: ['EVERY TYPE', 'OF', 'INTELLIGENCE'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'happy-talk', textColor: COLORS.white, badge: '9', prop: 'logic-numbers' },
    B: { lines: ['9 KINDS', 'OF SMART', '(WHICH ARE YOU?)'], accent: COLORS.pink, bg: COLORS.blueDiagram, emotion: 'confused', textColor: COLORS.white, badge: '?', prop: 'music-emblem' },
    C: { lines: ['SMART IS', 'NOT ONE', 'THING'], accent: COLORS.greenLeaf, bg: COLORS.greenTeal, emotion: 'serious-expert', textColor: COLORS.outline, badge: '!', prop: 'spatial-cube' },
  },
  'prefer-alone': {
    A: { lines: ['PEOPLE WHO', 'PREFER BEING', 'ALONE'], accent: COLORS.yellow, bg: COLORS.greenTeal, emotion: 'happy-talk', textColor: COLORS.outline, badge: '9', prop: 'solo-battery' },
    B: { lines: ['IT’S NOT', 'LONELINESS —', 'IT’S SOLITUDE'], accent: COLORS.sky, bg: COLORS.purpleDeep, emotion: 'serious-expert', textColor: COLORS.white, badge: '!', prop: 'quiet-bubble' },
    C: { lines: ['9 SIGNS', 'YOU LOVE', 'YOUR OWN COMPANY'], accent: COLORS.greenLeaf, bg: COLORS.wallNight, emotion: 'happy-talk', textColor: COLORS.white, badge: '9', prop: 'owl-watch' },
  },
  'logical-fallacies': {
    A: { lines: ['EVERY', 'LOGICAL', 'FALLACY'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '12', prop: 'straw-dummy' },
    B: { lines: ['12 TRICKS', 'THAT FOOL', 'YOUR LOGIC'], accent: COLORS.red, bg: COLORS.wallNight, emotion: 'annoyed', textColor: COLORS.white, badge: '!', prop: 'red-herring' },
    C: { lines: ['SPOT THE', 'FLAW IN ANY', 'ARGUMENT'], accent: COLORS.greenLeaf, bg: COLORS.greenTeal, emotion: 'serious-expert', textColor: COLORS.outline, badge: '?', prop: 'two-doors' },
  },
  'procrastination-brain': {
    A: { lines: ['WHY YOU', 'PROCRASTINATE', '(IT’S NOT LAZINESS)'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'annoyed', textColor: COLORS.white, badge: '!', prop: 'now-gremlin' },
    B: { lines: ['THE REAL', 'REASON YOU', 'PUT IT OFF'], accent: COLORS.red, bg: COLORS.wallNight, emotion: 'scared', textColor: COLORS.white, badge: '?', prop: 'deadline-beast' },
    C: { lines: ['HOW TO', 'FINALLY', 'JUST START'], accent: COLORS.greenLeaf, bg: COLORS.greenTeal, emotion: 'happy-talk', textColor: COLORS.outline, badge: '!', prop: 'two-min-timer' },
  },
  'levels-of-consciousness': {
    A: { lines: ['EVERY LEVEL', 'OF', 'CONSCIOUSNESS'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'serious-expert', textColor: COLORS.white, badge: '8', prop: 'open-sky' },
    B: { lines: ['HOW', 'AWAKE ARE', 'YOU REALLY?'], accent: COLORS.sky, bg: COLORS.wallNight, emotion: 'confused', textColor: COLORS.white, badge: '?', prop: 'dream-spiral' },
    C: { lines: ['THE 8', 'LEVELS OF', 'AWARENESS'], accent: COLORS.greenLeaf, bg: COLORS.greenTeal, emotion: 'happy-talk', textColor: COLORS.outline, badge: '8', prop: 'self-mirror' },
  },
  'personality-types': {
    A: { lines: ['EVERY', 'PERSONALITY', 'TYPE'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'happy-talk', textColor: COLORS.white, badge: '16', prop: 'protagonist-beacon' },
    B: { lines: ['WHICH', 'TYPE ARE', 'YOU?'], accent: COLORS.sky, bg: COLORS.blueDiagram, emotion: 'confused', textColor: COLORS.white, badge: '?', prop: 'command-flag' },
    C: { lines: ['ALL 16', 'TYPES IN', '12 MINUTES'], accent: COLORS.greenLeaf, bg: COLORS.greenTeal, emotion: 'excited', textColor: COLORS.outline, badge: '16', prop: 'logic-gears' },
  },
  'mental-complexes': {
    A: { lines: ['EVERY', 'MENTAL', 'COMPLEX'], accent: COLORS.yellow, bg: COLORS.purpleDeep, emotion: 'confused', textColor: COLORS.white, badge: '15', prop: 'god-throne' },
    B: { lines: ['WHICH', 'MASK ARE', 'YOU WEARING?'], accent: COLORS.pink, bg: COLORS.wallNight, emotion: 'smug', textColor: COLORS.white, badge: '?', prop: 'pedestal-strut' },
    C: { lines: ['SAME', 'WOUND,', 'OPPOSITE MASK'], accent: COLORS.sky, bg: COLORS.greenTeal, emotion: 'serious-expert', textColor: COLORS.outline, badge: '!', prop: 'shrinking-figure' },
  },
};

export const Thumbnail: React.FC<{ slug?: string; variant: string }> = ({ slug = 'unnamed-feelings', variant }) => {
  const set = THUMBS_BY_SLUG[slug] ?? THUMBS_BY_SLUG['unnamed-feelings'];
  const v = set[variant] ?? set.A;
  const W = 1280;
  const H = 720;
  return (
    <AbsoluteFill style={{ width: W, height: H }}>
      <Stage>
        <BurstBackground base={v.bg} accent={v.accent} cx={W * 0.74} cy={H * 0.5} rays={14} />
      </Stage>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <path d={`M -40 -40 L ${W * 0.6} -40 L ${W * 0.5} ${H + 40} L -40 ${H + 40} Z`} fill={COLORS.outline} opacity={0.18} />
        {v.prop && PROPS[v.prop] && (
          <Place x={W * 0.52} y={H * 0.24} scale={1.15}>
            {React.createElement(PROPS[v.prop])}
          </Place>
        )}
        <g transform={`translate(${W * 0.6} ${H * 0.2}) rotate(-12)`}>
          <circle r={86} fill={COLORS.red} stroke={COLORS.outline} strokeWidth={STROKE.lg} />
          <circle r={70} fill="none" stroke={COLORS.white} strokeWidth={STROKE.sm} />
          <text x={0} y={30} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={86} fill={COLORS.white}>
            {v.badge}
          </text>
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 48, top: 70, width: 760, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {v.lines.map((ln, i) => (
          <div
            key={i}
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 140,
              lineHeight: 0.98,
              color: i === 1 ? v.accent : v.textColor,
              WebkitTextStroke: `12px ${COLORS.outline}`,
              paintOrder: 'stroke fill',
              transform: `rotate(${i === 1 ? -2.5 : 0}deg)`,
              letterSpacing: -3,
            }}
          >
            {ln}
          </div>
        ))}
        <div style={{ marginTop: 20, fontFamily, fontWeight: 800, fontSize: 44, color: v.accent, WebkitTextStroke: `7px ${COLORS.outline}`, paintOrder: 'stroke fill', letterSpacing: 1 }}>
          DEAR BRAIN
        </div>
      </div>
      <Mascot costume="hoodie" pose="startled" emotion={v.emotion} x={W * 0.82} y={H * 0.64} scale={1.7} seed={4} />
    </AbsoluteFill>
  );
};
