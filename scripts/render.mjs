#!/usr/bin/env node
/**
 * render.mjs — assembles a slug into an mp4. Reads content/<slug>/script.json +
 * durations.json, builds the MainVideo props (beats enriched with frames+audio),
 * runs validate, then renders via the Remotion CLI with --props.
 *
 * Usage: npm run render <slug>   (default: hypnic-jerk)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'hypnic-jerk';
const base = join(ROOT, 'content', slug);

const scriptPath = join(base, 'script.json');
const durPath = join(base, 'durations.json');
if (!existsSync(durPath)) {
  console.error(`✗ ${durPath} missing — run: npm run tts ${slug}`);
  process.exit(1);
}

// validate first (asset registry + schema)
execFileSync('npx', ['tsx', 'scripts/validate.ts', slug], { cwd: ROOT, stdio: 'inherit' });

const script = JSON.parse(readFileSync(scriptPath, 'utf8'));
const durations = JSON.parse(readFileSync(durPath, 'utf8'));
const flatBeats = script.chapters.flatMap((ch) => ch.beats);

if (flatBeats.length !== durations.beats.length) {
  console.error(`✗ beat count mismatch: script ${flatBeats.length} vs durations ${durations.beats.length}. Re-run tts.`);
  process.exit(1);
}

const beats = flatBeats.map((beat, i) => ({
  beat,
  frames: durations.beats[i].frames,
  audio: durations.beats[i].audio,
}));

const props = { slug, fps: durations.fps, beats, music: 'sfx/music_bed.mp3' };
const propsPath = join(ROOT, 'renders', `${slug}.props.json`);
mkdirSync(join(ROOT, 'renders'), { recursive: true });
writeFileSync(propsPath, JSON.stringify(props));

const out = join(ROOT, 'renders', `${slug}.mp4`);
console.log(`\nRendering ${slug}: ${beats.length} beats, ${durations.totalFrames} frames (${durations.totalSeconds}s) -> ${out}\n`);

execFileSync('npx', ['remotion', 'render', 'MainVideo', out, `--props=${propsPath}`, '--codec=h264'], { cwd: ROOT, stdio: 'inherit' });
console.log(`\n✓ ${out}`);
