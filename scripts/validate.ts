/**
 * validate.ts — checks a script.json against the schema AND the asset registry.
 * Unknown prop / room / pose / emotion / costume / scene = failure with a clear
 * message. Run: npm run validate <slug>   (default: hypnic-jerk)
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { EMOTION_NAMES } from '../src/lib/emotions';
import { PROP_NAMES } from '../src/assets/props/registry';
import { ROOM_NAMES } from '../src/assets/rooms';
import { POSE_NAMES, COSTUME_NAMES, ACCESSORY_NAMES, SCENE_KINDS, DIAGRAM_TYPES, LOOK_DIRS, CLOSEUP_SUBJECTS } from '../src/lib/assets';

const slug = process.argv[2] || 'hypnic-jerk';
const ROOT = join(__dirname, '..');
const errors: string[] = [];

const inSet = (v: unknown, set: readonly string[]) => typeof v === 'string' && set.includes(v);

const VO_MAX = 340; // ~15s of speech

function checkMascot(where: string, m: Record<string, unknown>) {
  if (m.pose !== undefined && !inSet(m.pose, POSE_NAMES)) errors.push(`${where}: unknown pose "${m.pose}"`);
  if (m.costume !== undefined && !inSet(m.costume, COSTUME_NAMES)) errors.push(`${where}: unknown costume "${m.costume}"`);
  if (m.emotion !== undefined && !inSet(m.emotion, EMOTION_NAMES)) errors.push(`${where}: unknown emotion "${m.emotion}"`);
  if (m.accessory !== undefined && !inSet(m.accessory, ACCESSORY_NAMES)) errors.push(`${where}: unknown accessory "${m.accessory}"`);
  if (m.lookDir !== undefined && !inSet(m.lookDir, LOOK_DIRS)) errors.push(`${where}: unknown lookDir "${m.lookDir}"`);
}

function checkProps(where: string, props: unknown) {
  if (props === undefined) return;
  if (!Array.isArray(props)) return errors.push(`${where}: props must be an array`);
  props.forEach((p: Record<string, unknown>, i) => {
    if (!inSet(p.name, PROP_NAMES)) errors.push(`${where}.props[${i}]: unknown prop "${p.name}"`);
    if (typeof p.x !== 'number' || typeof p.y !== 'number') errors.push(`${where}.props[${i}]: x/y must be numbers`);
  });
}

function checkCamera(where: string, cam: unknown) {
  if (cam === undefined) return;
  if (typeof cam === 'string') {
    if (!['static', 'slowZoom'].includes(cam)) errors.push(`${where}: unknown camera "${cam}"`);
  } else if (typeof cam === 'object' && cam && 'zoomTo' in cam) {
    const z = (cam as { zoomTo: unknown }).zoomTo;
    if (!Array.isArray(z) || z.length !== 3 || z.some((n) => typeof n !== 'number')) errors.push(`${where}: camera.zoomTo must be [x,y,scale] numbers`);
  } else errors.push(`${where}: invalid camera`);
}

function checkBeat(where: string, beat: Record<string, unknown>) {
  if (typeof beat.vo !== 'string' || !beat.vo.trim()) errors.push(`${where}: vo is required`);
  else if (beat.vo.length > VO_MAX) errors.push(`${where}: vo too long (${beat.vo.length} > ${VO_MAX} chars ~15s)`);
  if (!inSet(beat.scene, SCENE_KINDS)) return errors.push(`${where}: unknown scene "${beat.scene}"`);
  if (beat.emotion !== undefined && !inSet(beat.emotion, EMOTION_NAMES)) errors.push(`${where}: unknown emotion "${beat.emotion}"`);
  checkCamera(where, beat.camera);

  switch (beat.scene) {
    case 'story':
      if (!inSet(beat.room, ROOM_NAMES)) errors.push(`${where}: unknown room "${beat.room}"`);
      if (Array.isArray(beat.mascots)) beat.mascots.forEach((m, i) => checkMascot(`${where}.mascots[${i}]`, m));
      checkProps(where, beat.props);
      checkProps(where + '(fg)', beat.fg);
      break;
    case 'explainer':
      if (beat.prop !== undefined && !inSet(beat.prop, PROP_NAMES)) errors.push(`${where}: unknown prop "${beat.prop}"`);
      if (beat.diagram !== undefined && !inSet(beat.diagram, DIAGRAM_TYPES)) errors.push(`${where}: unknown diagram "${beat.diagram}"`);
      if (beat.prop === undefined && beat.diagram === undefined) errors.push(`${where}: explainer needs a prop or diagram`);
      break;
    case 'statCard':
      if (typeof beat.value !== 'number') errors.push(`${where}: statCard needs numeric value`);
      break;
    case 'diagramCard':
      if (!inSet(beat.diagram, DIAGRAM_TYPES)) errors.push(`${where}: unknown diagram "${beat.diagram}"`);
      break;
    case 'closeUp':
      if (!inSet(beat.subject, CLOSEUP_SUBJECTS)) errors.push(`${where}: unknown closeUp subject "${beat.subject}"`);
      if (beat.subject === 'object' && !inSet(beat.prop, PROP_NAMES)) errors.push(`${where}: object closeUp needs a valid prop`);
      break;
    case 'overviewGrid':
      if (!Array.isArray(beat.items) || beat.items.length === 0) errors.push(`${where}: overviewGrid needs items[]`);
      else if (beat.items.length > 16) errors.push(`${where}: overviewGrid has ${beat.items.length} items (max 16)`);
      break;
    case 'endScreen':
      break;
  }
}

/** Manifest gate: a referenced asset must be in the registry OR the manifest;
 *  and the manifest must contain no MISSING entries. */
function checkManifest() {
  const mp = join(ROOT, 'content', slug, 'asset-manifest.json');
  if (!existsSync(mp)) {
    console.warn(`  (no asset-manifest.json for "${slug}" — run: npm run manifest ${slug})`);
    return;
  }
  const m = JSON.parse(readFileSync(mp, 'utf8')) as { assets: { name: string; type: string; status: string }[] };
  const missing = m.assets.filter((a) => a.status === 'MISSING');
  for (const a of missing) errors.push(`manifest: ${a.type} "${a.name}" is MISSING (referenced but not drawn/registered)`);
}

function main() {
  const path = join(ROOT, 'content', slug, 'script.json');
  let script: { title?: string; chapters?: { name: string; beats: Record<string, unknown>[] }[] };
  try {
    script = JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    console.error(`✗ cannot read ${path}: ${(e as Error).message}`);
    process.exit(1);
  }
  if (!Array.isArray(script.chapters) || script.chapters.length === 0) {
    console.error('✗ script has no chapters');
    process.exit(1);
  }
  checkManifest();
  let n = 0;
  script.chapters.forEach((ch, ci) => {
    if (!Array.isArray(ch.beats)) return errors.push(`chapter[${ci}] "${ch.name}": beats must be an array`);
    ch.beats.forEach((b, bi) => {
      n++;
      checkBeat(`ch${ci}"${ch.name}".beat[${bi}]`, b);
    });
  });

  if (errors.length) {
    console.error(`\n✗ validate FAILED for "${slug}" (${errors.length} error${errors.length > 1 ? 's' : ''}):\n`);
    errors.forEach((e) => console.error('  ' + e));
    console.error('');
    process.exit(1);
  }
  console.log(`✓ validate passed — "${slug}": ${script.chapters.length} chapter(s), ${n} beats, all assets known.`);
}

main();
