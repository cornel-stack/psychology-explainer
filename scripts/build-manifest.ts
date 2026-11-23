/**
 * build-manifest.ts — scans content/<slug>/script.json and emits
 * content/<slug>/asset-manifest.json: every asset a beat references, with
 * {name, type, status: exists|NEW|MISSING, beats:[globalBeatIndex...]}.
 *   exists  = already in the registry (sleep library)
 *   NEW     = drawn specifically for this video (listed below)
 *   MISSING = referenced but not resolvable — a typo / unbuilt asset (fails validate)
 * Run: npm run manifest <slug>   (default: unnamed-feelings)
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PROP_NAMES } from '../src/assets/props/registry';
import { ROOM_NAMES } from '../src/assets/rooms';
import { EMOTION_NAMES } from '../src/lib/emotions';
import { POSE_NAMES, COSTUME_NAMES, ACCESSORY_NAMES } from '../src/lib/assets';

const DIAGRAMS = ['sleep-stage', 'switchboard', 'signal-race', 'overflow-meter', 'two-gates', 'then-now'];

// Assets authored specifically for this video.
const NEW_ASSETS = new Set([
  'balcony-night', 'train-interior', 'living-room', 'stadium-crowd', 'empty-hall',
  'group-chat-phone', 'music-notes', 'photo-stack', 'rain-cloud', 'puppy', 'city-gate', 'water-bowl', 'suitcase',
  'signal-race', 'overflow-meter', 'two-gates', 'then-now',
  // cognitive-biases
  'store-aisle', 'casino', 'office',
  'price-tag', 'tv-screen', 'balance-scale', 'crown', 'slot-machine', 'dice', 'plane-bullet',
  'star-rating', 'horoscope-card', 'trophy', 'magnifying-glass', 'calendar', 'coins', 'brain', 'check-badge',
  'decision-fork', 'dk-curve', 'loss-scale', 'framing-flip',
  // defense-mechanisms
  'therapist-office', 'basement', 'gym', 'art-studio', 'theater-stage',
  'shield', 'threat-blob', 'locked-box', 'projector', 'trash-can', 'easel', 'sour-grapes', 'angel-devil',
  'pacifier', 'open-book', 'sealed-jar', 'soap-bubbles', 'dumbbell', 'sticky-note', 'comedy-mask', 'volcano',
  'pressure-gauge', 'diploma',
  'defense-shield', 'iceberg', 'maturity-ladder', 'redirect-arrow', 'pressure-valve',
  // literal story props + 2nd-character costume + action poses (remake)
  'bad-letter', 'magazine-pile', 'cigarette', 'red-flag', 'mirror', 'baby-bottle', 'gift-box',
  'bouquet', 'book-stack', 'whiteboard', 'flatline-screen', 'door', 'punching-bag', 'broken-heart',
  'sink', 'megaphone', 'running-shoe', 'tee',
  'cover-eyes', 'cower', 'cheer', 'facepalm', 'arms-crossed', 'fist-up', 'hands-hips', 'reach-down',
  // attachment-styles
  'nursery', 'date-restaurant', 'park-bench',
  'phone-unread', 'toy-blocks', 'brick-wall', 'turtle-shell', 'anchor', 'wine-glasses', 'love-note', 'relationship-thermometer',
  'attachment-grid', 'secure-base', 'push-pull', 'chase-cycle',
  // iq-levels
  'classroom', 'science-lab',
  'iq-report', 'puzzle-cube', 'lightbulb', 'test-paper', 'gears', 'stopwatch', 'jigsaw-piece', 'chess-knight',
  'bell-curve', 'flynn-effect', 'multi-intelligence',
  // manipulation-tactics
  'puppet-strings', 'sheep-mask', 'gaslight-lamp', 'guilt-chain', 'countdown-timer', 'goalpost', 'carrot-on-stick', 'fish-hook',
  'fog-triangle', 'manipulation-cycle', 'ask-ladder',
  // offline-minds
  'digital-wilderness', 'reading-nook',
  'glowing-phone', 'scroll-feed', 'comparison-mirror', 'fomo-ghost', 'highlight-reel', 'notification-swarm', 'seed-sprout', 'binoculars',
  'dopamine-loop', 'comparison-trap', 'attention-economy',
  // restless-brain (all new)
  'insomnia-bedroom', 'mind-control-room', 'thought-void', 'calm-shore',
  'frazzled-clock', 'thought-swarm', 'stuck-radio', 'overheating-brain', 'hamster-wheel', 'monkey-mind', 'broken-record', 'thought-spiral', 'white-bear', 'mental-tabs', 'tangled-yarn', 'breathing-balloon', 'grounding-hand', 'off-switch',
  'default-mode-network', 'rumination-loop', 'ironic-process', 'window-of-now', 'dial-not-switch', 'attention-spotlight',
  // sleep-glitches (all new)
  'dream-bedroom', 'sleep-lab', 'dreamscape', 'liminal-hallway',
  'falling-void', 'shadow-figure', 'phantom-faces', 'boom-burst', 'nested-dream', 'lucid-hand', 'walking-slippers', 'sleep-mumble', 'scream-burst', 'tetris-blocks', 'fog-cloud', 'micro-flicker', 'dream-boxing', 'deja-reel', 'dream-stairs', 'dream-bubble', 'moon-face', 'eeg-strip',
  'hypnogram', 'sleep-threshold', 'rem-switch', 'dream-layers', 'mind-body-sleep', 'terror-vs-nightmare',
  // high-iq (all new)
  'study-den', 'tinker-workshop', 'late-night-desk', 'mind-cosmos',
  'question-magnet', 'nuance-palette', 'overthink-pretzel', 'rabbit-hole', 'yawn-cloud', 'high-bar', 'deep-well', 'night-owl', 'knowledge-island', 'burr-puzzle', 'idea-constellation', 'coffee-tower', 'book-tower', 'lost-maze',
  'knowledge-circle', 'iq-vs-eq', 'overexcitability', 'complexity-comfort', 'curiosity-tree',
  // daydreamers (all new)
  'inner-theater', 'daydream-realm', 'pacing-room', 'bus-window',
  'inner-cinema', 'story-strip', 'trigger-headphones', 'imaginary-companion', 'pacing-loop', 'time-warp-clock', 'escape-hatch', 'daydream-cloud', 'spinning-top', 'alter-ego', 'window-gaze', 'plot-web', 'popcorn-mind',
  'daydream-spectrum', 'immersion-meter', 'trigger-loop', 'two-lives', 'absorption-scale',
  // fear-3am (all new)
  'witching-bedroom', 'night-street', 'brain-nightshift', 'dawn-window',
  'clock-3am', 'worry-monster', 'cortisol-gauge', 'amygdala-alarm', 'prefrontal-asleep', 'cold-thermometer', 'silence-ring', 'lone-streetlight', 'lonely-window', 'catastrophe-snowball', 'wolf-howl', 'worry-notebook', 'sunrise-relief',
  'circadian-low', 'cortisol-curve', 'night-brain', 'molehill-mountain', 'dawn-vs-dark',
]);

type Type = 'prop' | 'room' | 'costume' | 'pose' | 'emotion' | 'accessory' | 'diagram';
const KNOWN: Record<Type, readonly string[]> = {
  prop: PROP_NAMES,
  room: ROOM_NAMES,
  costume: COSTUME_NAMES,
  pose: POSE_NAMES,
  emotion: EMOTION_NAMES,
  accessory: ACCESSORY_NAMES,
  diagram: DIAGRAMS,
};

const slug = process.argv[2] || 'unnamed-feelings';
const ROOT = join(__dirname, '..');
const script = JSON.parse(readFileSync(join(ROOT, 'content', slug, 'script.json'), 'utf8'));

const map = new Map<string, { name: string; type: Type; beats: number[] }>();
const add = (name: string | undefined, type: Type, beat: number) => {
  if (!name) return;
  const key = `${type}:${name}`;
  if (!map.has(key)) map.set(key, { name, type, beats: [] });
  const e = map.get(key)!;
  if (!e.beats.includes(beat)) e.beats.push(beat);
};

let gi = -1;
for (const ch of script.chapters) {
  for (const b of ch.beats) {
    gi++;
    if (b.emotion) add(b.emotion, 'emotion', gi);
    if (b.room) add(b.room, 'room', gi);
    if (b.diagram) add(b.diagram, 'diagram', gi);
    for (const p of b.props ?? []) add(p.name, 'prop', gi);
    for (const p of b.fg ?? []) add(p.name, 'prop', gi);
    if (b.prop) add(b.prop, 'prop', gi);
    for (const m of b.mascots ?? []) {
      add(m.costume, 'costume', gi);
      add(m.pose, 'pose', gi);
      add(m.emotion, 'emotion', gi);
      add(m.accessory, 'accessory', gi);
    }
  }
}

const entries = [...map.values()]
  .map((e) => {
    const inReg = KNOWN[e.type].includes(e.name);
    const status = NEW_ASSETS.has(e.name) ? 'NEW' : inReg ? 'exists' : 'MISSING';
    return { name: e.name, type: e.type, status, beats: e.beats };
  })
  .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));

const counts = entries.reduce((a, e) => ((a[e.status] = (a[e.status] || 0) + 1), a), {} as Record<string, number>);
const out = { slug, generated: 'by scripts/build-manifest.ts', counts, assets: entries };
writeFileSync(join(ROOT, 'content', slug, 'asset-manifest.json'), JSON.stringify(out, null, 2));
console.log(`✓ asset-manifest.json: ${entries.length} assets  ${JSON.stringify(counts)}`);
const missing = entries.filter((e) => e.status === 'MISSING');
if (missing.length) {
  console.error('  MISSING: ' + missing.map((m) => `${m.type}:${m.name}`).join(', '));
  process.exit(1);
}
