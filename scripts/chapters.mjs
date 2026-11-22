#!/usr/bin/env node
/**
 * chapters.mjs — compute YouTube chapter timestamps from the render (durations)
 * and insert them into content/<slug>/metadata.md at the <<TIMESTAMPS...>> marker.
 * Usage: node scripts/chapters.mjs <slug>   (default: unnamed-feelings)
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'unnamed-feelings';
const base = join(ROOT, 'content', slug);

const script = JSON.parse(readFileSync(join(base, 'script.json'), 'utf8'));
const durations = JSON.parse(readFileSync(join(base, 'durations.json'), 'utf8'));
const fps = durations.fps;

const ts = (frames) => {
  const s = Math.floor(frames / fps);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
};

// Skip the tiny "Overview" chapter in the public chapter list.
const SKIP = new Set(['Overview']);
const lines = [];
let frame = 0;
let bi = 0;
// YouTube requires the first chapter at 0:00.
for (const ch of script.chapters) {
  const start = frame;
  for (const _ of ch.beats) {
    frame += durations.beats[bi].frames;
    bi++;
  }
  if (SKIP.has(ch.name)) continue;
  const n = ch.name.match(/^(\d+)\s*—\s*(.+)$/);
  const label = ch.name === 'Cold Open' ? 'The balcony' : n ? `${n[1]}. ${n[2]}` : ch.name;
  lines.push(`${ts(start === 0 ? 0 : start)} — ${label}`);
}

const block = lines.join('\n');
const metaPath = join(base, 'metadata.md');
let meta = readFileSync(metaPath, 'utf8');
meta = meta.replace(/<<TIMESTAMPS[^>]*>>/, block);
// also normalize the 0:00 line we hand-wrote in the template
meta = meta.replace(/0:00 — The balcony \(cold open\)\n/, '');
writeFileSync(metaPath, meta);
console.log(`✓ inserted ${lines.length} chapter timestamps into ${metaPath}:\n`);
console.log(block);
