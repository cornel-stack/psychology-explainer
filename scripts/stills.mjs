#!/usr/bin/env node
/**
 * stills.mjs — one PNG per beat for QA (spec `npm run stills <slug>`).
 * Renders MainVideo at the midpoint frame of each beat.
 *
 * Usage: npm run stills <slug>   (default: hypnic-jerk)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'hypnic-jerk';
const base = join(ROOT, 'content', slug);
const durPath = join(base, 'durations.json');
if (!existsSync(durPath)) {
  console.error(`✗ ${durPath} missing — run: npm run tts ${slug}`);
  process.exit(1);
}

const script = JSON.parse(readFileSync(join(base, 'script.json'), 'utf8'));
const durations = JSON.parse(readFileSync(durPath, 'utf8'));
const flatBeats = script.chapters.flatMap((ch) => ch.beats);
const beats = flatBeats.map((beat, i) => ({ beat, frames: durations.beats[i].frames, audio: durations.beats[i].audio }));

const props = { slug, fps: durations.fps, beats, music: 'sfx/music_bed.mp3' };
const propsPath = join(ROOT, 'renders', `${slug}.props.json`);
const outDir = join(ROOT, 'renders', `${slug}-stills`);
mkdirSync(outDir, { recursive: true });
writeFileSync(propsPath, JSON.stringify(props));

let acc = 0;
beats.forEach((b, i) => {
  const mid = acc + Math.floor(b.frames / 2);
  acc += b.frames;
  const out = join(outDir, `beat_${String(i).padStart(2, '0')}_${b.beat.scene}.png`);
  console.log(`beat ${i} (${b.beat.scene}) @frame ${mid} -> ${out}`);
  execFileSync('npx', ['remotion', 'still', 'MainVideo', out, `--frame=${mid}`, `--props=${propsPath}`], { cwd: ROOT, stdio: 'inherit' });
});
console.log(`\n✓ ${beats.length} stills in ${outDir}`);
