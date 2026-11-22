#!/usr/bin/env node
/** Render the 3 clickbait thumbnails for a slug -> renders/thumbnails/thumb-<A|B|C>.png
 *  Usage: node scripts/thumbnails.mjs <slug>   (default: unnamed-feelings) */
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'unnamed-feelings';
mkdirSync(join(ROOT, 'renders', 'thumbnails'), { recursive: true });
for (const v of ['A', 'B', 'C']) {
  const out = join(ROOT, 'renders', 'thumbnails', `thumb-${v}.png`);
  execFileSync('npx', ['remotion', 'still', `Thumb-${slug}-${v}`, out, '--frame=20'], { cwd: ROOT, stdio: 'inherit' });
}
console.log(`✓ 3 thumbnails for ${slug} -> renders/thumbnails/`);
