#!/usr/bin/env node
/**
 * qa_grid_overlap.mjs (B6) — asserts the OverviewGrid badge + label boxes never
 * overlap. Recomputes the same deterministic layout as cellLayout() and checks
 * every pair of bounding boxes (badge disc + label strip) for intersection.
 */
const W = 1920, H = 1080, COLS = 5, ROWS = 3;
const MX = W * 0.05, MY = H * 0.05;
const CELL_W = (W - 2 * MX) / COLS;
const CELL_H = (H - 2 * MY) / ROWS;
const R = Math.min(CELL_W * 0.38, (CELL_H - 80) / 2);
const LABEL_H = 40, LABEL_W = CELL_W * 0.96;

function boxes(i) {
  const c = i % COLS, r = Math.floor(i / COLS);
  const cx = MX + CELL_W * (c + 0.5);
  const badgeCy = MY + CELL_H * r + R + 14;
  const labelY = badgeCy + R + 16 + 30;
  return [
    { x: cx - R, y: badgeCy - R, w: 2 * R, h: 2 * R },
    { x: cx - LABEL_W / 2, y: labelY - LABEL_H, w: LABEL_W, h: LABEL_H },
  ];
}
const intersect = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

const all = [];
for (let i = 0; i < 15; i++) boxes(i).forEach((b, k) => all.push({ box: b, cell: i, kind: k ? 'label' : 'badge' }));

const clashes = [];
for (let i = 0; i < all.length; i++)
  for (let j = i + 1; j < all.length; j++)
    if (all[i].cell !== all[j].cell && intersect(all[i].box, all[j].box))
      clashes.push(`${all[i].kind}#${all[i].cell} ∩ ${all[j].kind}#${all[j].cell}`);

if (clashes.length) {
  console.error(`✗ grid overlap FAILED (${clashes.length}):`);
  clashes.forEach((c) => console.error('  ' + c));
  process.exit(1);
}
console.log('✓ grid overlap passed — 15 badges + labels, no bounding-box intersections.');
