#!/usr/bin/env node
/**
 * extract_beat_stills.mjs — pull ONE frame per beat (the beat midpoint) from the
 * finished mp4 into renders/<slug>-stills/. Fast local alternative to re-rendering
 * 84 stills with Remotion; produces the per-beat stills deliverable for QA.
 * Usage: node scripts/extract_beat_stills.mjs <slug>
 */
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'unnamed-feelings';
const base = join(ROOT, 'content', slug);
const mp4 = join(ROOT, 'renders', `${slug}.mp4`);
if (!existsSync(mp4)) {
  console.error(`✗ ${mp4} missing — render first`);
  process.exit(1);
}
const script = JSON.parse(readFileSync(join(base, 'script.json'), 'utf8'));
const durations = JSON.parse(readFileSync(join(base, 'durations.json'), 'utf8'));
const fps = durations.fps;
const beats = script.chapters.flatMap((ch) => ch.beats);
const outDir = join(ROOT, 'renders', `${slug}-stills`);
mkdirSync(outDir, { recursive: true });

let acc = 0;
beats.forEach((b, i) => {
  const mid = acc + Math.floor(durations.beats[i].frames / 2);
  acc += durations.beats[i].frames;
  const t = (mid / fps).toFixed(3);
  const out = join(outDir, `beat_${String(i).padStart(2, '0')}_${b.scene}.png`);
  execFileSync('ffmpeg', ['-nostdin', '-y', '-ss', t, '-i', mp4, '-frames:v', '1', out], { stdio: 'ignore' });
});
console.log(`✓ ${beats.length} beat stills -> ${outDir}`);
