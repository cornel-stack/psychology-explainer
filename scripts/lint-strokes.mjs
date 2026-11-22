#!/usr/bin/env node
/**
 * lint-strokes.mjs (A3) — enforces the ONE stroke system.
 * Rules across all src .tsx/.ts files:
 *   - strokeProps(X): X must be a token (STROKE.xl|lg|sm or 7|10|14).
 *   - strokeWidth={N} numeric literal: N must be a token (7/10/14) OR >= 15
 *     (thick strokes are silhouette-fills / decorative rings, allowed).
 *     Thin non-token widths (2..6, 8,9,11..14-ish) are the banned "thin outline".
 *   - stroke="#rawhex": only #1A1A1A allowed as a raw hex (everything else must
 *     come from the COLORS palette).
 * Exits non-zero on any violation.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('../src', import.meta.url).pathname;
const TOKENS = new Set([7, 10, 14]);
const violations = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) check(p);
  }
}

function check(file) {
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    const loc = `${file.replace(ROOT, 'src')}:${i + 1}`;

    // strokeProps(X)
    for (const m of line.matchAll(/strokeProps\(([^)]*)\)/g)) {
      const arg = m[1].trim();
      const ok = arg === '' || /STROKE\.(xl|lg|sm)/.test(arg) || TOKENS.has(Number(arg));
      if (!ok) violations.push(`${loc}  strokeProps(${arg}) is not a token`);
    }

    // strokeWidth={N} numeric literal
    for (const m of line.matchAll(/strokeWidth=\{([0-9.]+)\}/g)) {
      const n = Number(m[1]);
      if (!TOKENS.has(n) && n < 15) violations.push(`${loc}  strokeWidth={${n}} is a banned thin non-token width`);
    }

    // raw hex stroke color
    for (const m of line.matchAll(/stroke=["']#([0-9A-Fa-f]{6})["']/g)) {
      if (m[1].toUpperCase() !== '1A1A1A') violations.push(`${loc}  raw stroke #${m[1]} (use COLORS palette)`);
    }
  });
}

walk(ROOT);

if (violations.length) {
  console.error(`\n✗ stroke lint FAILED (${violations.length} violation${violations.length > 1 ? 's' : ''}):\n`);
  violations.forEach((v) => console.error('  ' + v));
  console.error('');
  process.exit(1);
}
console.log('✓ stroke lint passed — all outlines use the 3-token system (#1A1A1A).');
