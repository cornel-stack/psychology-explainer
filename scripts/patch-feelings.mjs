#!/usr/bin/env node
/** One-off: add section title cards, bubble texts, and Dear Brain VO. */
import { readFileSync, writeFileSync } from 'fs';
const p = 'content/unnamed-feelings/script.json';
const s = JSON.parse(readFileSync(p, 'utf8'));

const TITLES = {
  'Cold Open': ['FEELINGS YOU CAN’T NAME', '15 you’ve felt — but can’t name'],
  "1 — L'appel du vide": ['L’APPEL DU VIDE', 'the call of the void'],
  '2 — Sonder': ['SONDER', 'everyone has a whole life'],
  '3 — Frisson': ['FRISSON', 'why music gives you chills'],
  '4 — Jamais vu': ['JAMAIS VU', 'when a word turns alien'],
  '5 — Presque vu': ['PRESQUE VU', 'the tip of your tongue'],
  '6 — Anemoia': ['ANEMOIA', 'nostalgia for a time you never knew'],
  '7 — Saudade': ['SAUDADE', 'a bittersweet longing'],
  '8 — Gigil': ['GIGIL', 'cute aggression'],
  '9 — Torschlusspanik': ['TORSCHLUSSPANIK', 'gate-shut panic'],
  '10 — Kenopsia': ['KENOPSIA', 'the eerie empty place'],
  '11 — Collective effervescence': ['COLLECTIVE EFFERVESCENCE', 'the magic of a crowd'],
  '12 — Amae': ['AMAE', 'leaning on someone you trust'],
  '13 — Awumbuk': ['AWUMBUK', 'the emptiness after guests leave'],
  '14 — Fernweh': ['FERNWEH', 'homesick for somewhere you’ve never been'],
  '15 — Elevation': ['ELEVATION', 'witnessing goodness'],
};

// bubble text: chapter name -> { beatIdx -> text }
const BUBBLES = {
  'Cold Open': { 3: 'what’s wrong\nwith me?' },
  "1 — L'appel du vide": { 5: 'a story you\nnever agreed to' },
  '2 — Sonder': { 1: 'a whole\nlife', 3: 'sonder' },
  '4 — Jamais vu': { 0: '…my\nname?' },
  '5 — Presque vu': { 0: '…that\nactor…', 1: 'starts\nwith B?', 3: 'so close!' },
};

const BUBBLE_NAMES = new Set(['speech-bubble', 'thought-bubble']);

for (const ch of s.chapters) {
  // title card on the chapter's first (chapterStart) beat
  const t = TITLES[ch.name];
  if (t && ch.beats[0]) {
    ch.beats[0].title = t[0];
    ch.beats[0].subtitle = t[1];
  }
  // bubble texts
  const bt = BUBBLES[ch.name];
  if (bt) {
    for (const [idx, text] of Object.entries(bt)) {
      const beat = ch.beats[Number(idx)];
      if (!beat) continue;
      if (beat.scene === 'explainer' && BUBBLE_NAMES.has(beat.prop)) {
        beat.propArgs = { ...(beat.propArgs || {}), text };
      } else if (Array.isArray(beat.props)) {
        const pr = beat.props.find((x) => BUBBLE_NAMES.has(x.name));
        if (pr) pr.args = { ...(pr.args || {}), text };
      }
    }
  }
}

// Dear Brain VO: welcome + outro
const cold = s.chapters.find((c) => c.name === 'Cold Open');
cold.beats[4].vo = "Welcome to Dear Brain. Today we’re naming fifteen feelings you’ve had your whole life, and by the end, you’ll know which one you feel the most. So get comfortable, and let’s go.";

const outro = s.chapters.find((c) => c.name === 'Outro');
const last = outro.beats[outro.beats.length - 1];
last.vo = "This channel is Dear Brain, where we give names to what your mind is quietly doing. So if even one of these finally fit, do me one favor and subscribe — it really helps the channel, and I’ll see you in the next one.";

writeFileSync(p, JSON.stringify(s, null, 2) + '\n');
console.log('patched: titles, bubble texts, Dear Brain welcome + outro.');
