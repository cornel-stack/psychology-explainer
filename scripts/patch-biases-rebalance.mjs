#!/usr/bin/env node
/** Rebalance: convert each bias item's 2nd beat (a closeUp "moment") into a
 *  contextual story shot in the same room, so there's ~1 closeUp peak per item. */
import { readFileSync, writeFileSync } from 'fs';
const p = 'content/cognitive-biases/script.json';
const s = JSON.parse(readFileSync(p, 'utf8'));

const POSES = ['idle', 'point-right', 'shrug', 'arms-out-presenting'];
let converted = 0;
s.chapters.forEach((ch, ci) => {
  if (!/^\d+\s*—/.test(ch.name)) return; // only the 15 numbered items
  const b0 = ch.beats[0];
  const b1 = ch.beats[1];
  if (!b1 || b1.scene !== 'closeUp') return;
  const m0 = (b0.mascots && b0.mascots[0]) || { costume: 'hoodie', x: 640, y: 600, scale: 1.3 };
  const heroProp = (b0.props || []).find((pr) => pr.name !== 'blanket' && pr.name !== 'thought-bubble');
  b1.scene = 'story';
  b1.room = b0.room;
  b1.camera = { zoomTo: [0.52, 0.46, 1.2] };
  b1.mascots = [{ costume: m0.costume, pose: POSES[ci % POSES.length], emotion: b1.emotion, x: m0.x, y: m0.y, scale: m0.scale, talking: true, ...(m0.accessory ? { accessory: m0.accessory } : {}) }];
  b1.props = heroProp ? [{ name: heroProp.name, x: heroProp.x, y: heroProp.y - 20, scale: (heroProp.scale || 1) * 1.15, appearAt: 4, ...(heroProp.args ? { args: heroProp.args } : {}) }] : [];
  // keep blanket foreground if the room scene needs it (bedroom)
  if ((b0.props || []).some((pr) => pr.name === 'blanket')) {
    b1.props.push({ name: 'blanket', x: 660, y: 812, scale: 1.0 });
  }
  delete b1.subject;
  converted++;
});
writeFileSync(p, JSON.stringify(s, null, 2) + '\n');
console.log(`converted ${converted} beats closeUp -> story.`);
