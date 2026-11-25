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
  // overthinking-levels (all new)
  'thinker-nook', 'signpost-crossroads', 'overthink-stairwell', 'misty-clearing',
  'ponder-cloud', 'replay-tape', 'whatif-signs', 'stuck-compass', 'multiplying-worry', 'disaster-dominoes', 'rumination-drum', 'overthink-gauge', 'tight-knot', 'brake-lever', 'step-back-frame', 'one-small-step',
  'overthink-ladder', 'thought-vs-action', 'whatif-branches', 'spiral-funnel',
  // jealousy-signs (all new)
  'break-room', 'celebration', 'coffee-catchup',
  'green-monster', 'backhanded-gift', 'deflate-balloon', 'copycat-twins', 'scoreboard', 'fake-smile-mask', 'gossip-cloud', 'hidden-grin', 'frost-shoulder', 'red-pen', 'envy-thermometer', 'side-eye',
  'comparison-envy', 'warm-cold-map', 'jealousy-roots', 'how-to-respond',
  // mental-complexes (all new)
  'masquerade-hall', 'pedestal-gallery', 'analysis-room',
  'shrinking-figure', 'pedestal-strut', 'god-throne', 'savior-ring', 'hero-spotlight', 'martyr-cross', 'guilt-weight', 'targeted-figure', 'victim-cloud', 'napoleon-hat', 'glass-slipper', 'never-grow-up', 'parent-photo', 'unheard-warning', 'dodged-summit',
  'complex-core', 'overcompensate-arc', 'hidden-roots', 'two-sides-coin',
  // personality-types (all new)
  'personality-atrium', 'analyst-lab', 'diplomat-garden', 'sentinel-hall', 'explorer-workshop',
  'architect-plan', 'logic-gears', 'command-flag', 'debate-sparks', 'advocate-candle', 'mediator-quill', 'protagonist-beacon', 'campaigner-spark',
  'logistician-ledger', 'defender-shield', 'executive-clipboard', 'consul-host', 'virtuoso-wrench', 'adventurer-brush', 'entrepreneur-dice', 'entertainer-mic',
  'four-axes', 'four-families', 'cognitive-stack', 'type-not-a-box',
  // levels-of-consciousness (all new)
  'awareness-shaft', 'the-deep', 'flow-river', 'clarity-summit',
  'dormant-orb', 'dream-spiral', 'autopilot-wind', 'radar-ping', 'self-mirror', 'meta-lens', 'flow-current', 'open-sky', 'dimmer-switch', 'veil-figure',
  'awareness-ladder', 'mind-floors', 'flow-channel', 'spectrum-line',
  // why-your-brain-procrastinates (all new)
  'procrastination-desk', 'deadline-cliff', 'fresh-start-desk',
  'dread-doc', 'now-gremlin', 'future-self-ghost', 'relief-bubble', 'deadline-beast', 'scroll-trap', 'shame-fog', 'two-min-timer', 'kind-note',
  'present-vs-future', 'limbic-vs-cortex', 'avoidance-loop', 'do-it-ladder',
  // logical-fallacies (all new)
  'debate-stage', 'courtroom-mind', 'clarity-studio',
  'straw-dummy', 'mud-sling', 'slippery-slide', 'two-doors', 'authority-stamp', 'band-wagon', 'red-herring', 'circle-loop', 'one-to-all', 'heart-tug', 'mirror-back', 'false-link',
  'argument-anatomy', 'attack-argument', 'correlation-causation', 'spot-it-checklist',
  // prefer-being-alone (all new)
  'cozy-den', 'forest-path-solo', 'draining-party',
  'solo-battery', 'deep-roots-pair', 'self-compass', 'inner-garden', 'energy-gate', 'quiet-bubble', 'owl-watch', 'self-anchor', 'recharge-glow',
  'introvert-battery', 'quality-quantity', 'solitude-vs-loneliness', 'social-budget',
  // types-of-intelligence (all new)
  'mind-gallery', 'creative-studio', 'open-nature',
  'word-quill', 'logic-numbers', 'spatial-cube', 'music-emblem', 'body-motion', 'people-link', 'inner-lantern', 'nature-leaf', 'big-question',
  'intelligence-wheel', 'not-one-number', 'spiky-profile', 'strength-finder',
  // cognitive-distortions (all new)
  'thought-funhouse', 'foggy-mind', 'reframe-room',
  'all-or-nothing', 'over-generalize', 'mental-filter', 'discount-positive', 'mind-reading', 'catastrophize', 'emotion-reasoning', 'should-statements', 'labeling', 'personalization', 'distortion-lens', 'reframe-glasses',
  'cbt-triangle', 'distortion-vs-reality', 'catch-check-change', 'thought-spiral',
  // basic-emotions (all new)
  'emotion-atrium', 'mood-weather', 'heart-lab',
  'emo-joy', 'emo-trust', 'emo-fear', 'emo-surprise', 'emo-sadness', 'emo-disgust', 'emo-anger', 'emo-anticipation', 'emotion-wheel-prop', 'emotion-compass',
  'emotion-wheel-map', 'emotions-job', 'opposite-emotions', 'emotion-blends',
  // types-of-love (all new)
  'love-gallery', 'cozy-hearth', 'blossom-garden',
  'love-eros', 'love-philia', 'love-storge', 'love-agape', 'love-ludus', 'love-pragma', 'love-philautia', 'love-mania', 'love-triangle-prop', 'love-compass',
  'sternberg-triangle', 'loves-wheel', 'love-over-time', 'self-love-first',
  // psychology-of-charisma (all new)
  'connection-lounge', 'spotlight-stage', 'fireside-circle',
  'char-presence', 'char-warmth', 'char-competence', 'char-listening', 'char-shine', 'char-story', 'char-openbody', 'char-authentic', 'char-enthusiasm', 'char-grid-prop', 'char-compass',
  'warmth-competence-grid', 'charisma-loop', 'presence-dial', 'charisma-learnable',
  // psychology-of-habits (all new)
  'habit-brain-paths', 'routine-kitchen', 'habit-studio',
  'autopilot-brain', 'habit-loop-prop', 'craving-magnet', 'swap-routine', 'obvious-cue', 'easy-ramp', 'satisfying-check', 'stack-blocks', 'identity-badge', 'compound-seed',
  'habit-loop-diagram', 'reward-timing', 'four-laws', 'compound-growth',
  // impostor-syndrome (all new)
  'impostor-office', 'exposure-spotlight', 'reframe-desk',
  'fraud-mask', 'discount-win', 'found-out', 'wider-shore', 'evidence-folder', 'type-perfectionist', 'type-expert', 'type-soloist', 'type-genius', 'type-superhero',
  'impostor-cycle', 'competence-confidence-gap', 'five-types', 'feelings-vs-facts',
  // stages-of-grief (all new)
  'grief-shore', 'memory-room', 'dawn-meadow',
  'grief-denial', 'grief-anger', 'grief-bargaining', 'grief-depression', 'grief-acceptance', 'grief-meaning', 'grief-waves', 'messy-path', 'ball-in-box', 'carry-grief',
  'five-stages', 'grief-not-linear', 'grief-waves-time', 'grief-grows-around',
  // psychology-of-happiness (all new)
  'chasing-horizon', 'stuff-store', 'warm-gathering',
  'arrival-mirage', 'hedonic-treadmill', 'money-plateau', 'relationship-warmth', 'experiences-things', 'flow-absorbed', 'gratitude-list', 'giving-ripple', 'present-now', 'joy-vs-meaning',
  'happiness-pie', 'hedonic-curve', 'what-makes-happy', 'happy-vs-meaningful',
  // cant-stop-thinking (all new)
  'night-bedroom-3am', 'mental-cinema', 'open-doorway',
  'thought-loop', 'phone-haunt', 'open-loop-knot', 'slot-hearts', 'pedestal-idol', 'memory-reel', 'rumination-wheel', 'red-string', 'scarcity-locked', 'open-hand-release',
  'zeigarnik-open-loop', 'variable-reward', 'idealization-gap', 'letting-go-curve',
  // feeling-watched (all new)
  'library-stacks', 'night-platform', 'sunny-park',
  'neck-prickle', 'eye-radar', 'sclera-eyes', 'peripheral-catch', 'stare-alarm', 'sixth-sense-myth', 'turn-and-look', 'hit-miss-tally', 'spotlight-self', 'all-clear',
  'gaze-detector', 'hit-miss-bias', 'watch-feedback-loop', 'vigilance-dial',
  // cry-easily (all new)
  'movie-night-couch', 'rainy-window-seat', 'wedding-hall',
  'welling-eye', 'overflow-cup', 'sensitive-antenna', 'empathy-mirror', 'tear-signal', 'vagal-calm', 'happy-tears', 'held-back', 'kind-tissue', 'cry-permission',
  'overflow-threshold', 'sensitivity-spectrum', 'tears-three-jobs', 'being-moved-curve',
  // hard-to-make-friends (all new)
  'moving-boxes-flat', 'evening-class', 'board-game-cafe',
  'lonely-bench', 'friend-factory-closed', 'hours-jar', 'repeat-bump', 'liking-gap-scale', 'approach-standoff', 'rejection-armor', 'open-up-ladder', 'one-good-friend', 'first-move',
  'friendship-hours', 'liking-gap', 'everyone-waiting', 'closeness-ladder',
  // spot-a-lie (all new)
  'poker-room', 'two-chairs-talk', 'detective-board',
  'gut-hunch', 'truth-default-glasses', 'coinflip-accuracy', 'myth-busted', 'othello-error', 'micro-flash', 'cognitive-load-lie', 'sparse-story', 'reverse-order', 'cross-check',
  'accuracy-coinflip', 'myth-vs-fact', 'load-truth-vs-lie', 'cluster-baseline',
  // spotless-house (all new)
  'show-home-lounge', 'cluttered-chaos-room', 'serene-tidy-bedroom',
  'spotless-sparkle', 'control-island', 'scrub-calm', 'label-jars', 'disgust-dial', 'clutter-static', 'clear-desk-focus', 'tidy-cage', 'good-enough-home', 'reset-ritual',
  'control-in-chaos', 'orderliness-trait', 'clutter-attention', 'tidy-spectrum',
  // nostalgia (all new)
  'memory-attic', 'retro-kitchen', 'vinyl-room',
  'bittersweet-heart', 'sepia-photo', 'memory-lane', 'scent-trigger', 'music-box', 'old-cassette', 'childhood-home-mem', 'rose-tint-glasses', 'connection-thread', 'present-anchor',
  'nostalgia-benefits', 'reminiscence-bump', 'bittersweet-mix', 'nostalgia-coping-loop',
  // music-chills (all new)
  'live-concert', 'headphone-nook', 'grand-awe',
  'spine-shiver', 'goosebumps-arm', 'soundwave-heart', 'music-reward-brain', 'anticipation-peak', 'expectation-break', 'brain-wiring', 'awe-chills', 'chill-playlist', 'chills-meter',
  'music-reward-loop', 'two-dopamine-hits', 'expectation-violation', 'who-gets-chills',
  // cringe-attacks (all new)
  'shower-room', 'awkward-party', 'calm-reframe-room',
  'cringe-replay', 'self-audience', 'burned-in-memory', 'social-threat-alarm', 'shower-ambush', 'idle-mind-surfacing', 'spotlight-nobody', 'exaggerate-magnifier', 'cringe-means-care', 'defuse-float',
  'memory-sticky', 'social-survival', 'mind-wander-surfacing', 'spotlight-reality',
  // talking-to-yourself (all new)
  'mirror-pep-talk', 'locker-room', 'thinking-desk',
  'talking-aloud', 'kid-private-speech', 'inner-voice-bubble', 'rubber-duck', 'lost-keys-found', 'hype-coach', 'name-megaphone', 'inner-critic', 'inner-coach', 'quiet-mind',
  'inner-speech-origin', 'self-talk-performance', 'name-distance', 'critic-vs-coach',
  // boredom (all new)
  'waiting-room', 'blank-room', 'maker-workshop',
  'dragging-clock', 'grasping-void', 'bored-fidget', 'shock-vs-boredom', 'numbing-scroll', 'boredom-lightbulb', 'wander-cloud', 'explore-compass', 'rest-vs-boredom', 'engage-choice',
  'boredom-equation', 'shock-choice', 'boredom-creativity', 'tolerance-eroding',
  // deja-vu (all new)
  'deja-street', 'repeating-corridor', 'memory-lab',
  'deja-recognition', 'familiarity-glow', 'recollection-blank', 'memory-mismatch', 'brain-factchecker', 'layout-echo', 'temporal-lobe', 'jamais-vu', 'deja-loop', 'healthy-glitch',
  'two-memory-systems', 'deja-glitch', 'factcheck-flag', 'layout-match',
  // childhood-amnesia (all new)
  'toddler-playroom', 'family-photo-wall', 'growing-brainscape',
  'baby-no-recall', 'fading-babymemory', 'building-hippocampus', 'neuron-overwrite', 'wordless-experience', 'mirror-me', 'photo-built-memory', 'implicit-imprint', 'reminisce-bonding', 'amnesia-curtain',
  'memory-offset', 'hippocampus-building', 'neurogenesis-overwrite', 'reconstructed-memory',
  // regret (all new)
  'crossroads-dusk', 'reflective-porch', 'start-line-dawn',
  'if-only-fork', 'road-not-taken', 'regret-weight', 'did-vs-didnt', 'silver-medal', 'regret-compass', 'lesson-gem', 'regret-spiral', 'self-forgive-hand', 'take-the-leap',
  'counterfactual', 'action-inaction-time', 'near-miss', 'regret-function',
  // cant-say-no (all new)
  'task-pile-desk', 'reaching-hands-room', 'calm-garden-gate',
  'silent-no', 'juggle-everyone', 'fawn-appease', 'earn-love', 'no-threat-alarm', 'resentment-pot', 'pour-empty-cup', 'guilt-after-no', 'boundary-gate', 'kind-firm-no',
  'fawn-response', 'no-social-threat', 'pleasing-cost', 'boundary-reframe',
  // loneliness (all new)
  'busy-crossing', 'apartment-window-night', 'two-cups-table',
  'lonely-in-crowd', 'connection-gap', 'social-hunger', 'alone-not-lonely', 'loneliness-body', 'loneliness-trap-spiral', 'threat-goggles', 'first-hello-hand', 'give-connect', 'open-up-bridge',
  'connection-gap-diagram', 'loneliness-signal', 'loneliness-health', 'loneliness-cycle',
  // time-speeds-up (all new)
  'golden-childhood-yard', 'same-day-treadmill', 'mountain-viewpoint',
  'endless-summer', 'flipping-calendar', 'life-pie-slices', 'memory-dots', 'first-glow', 'routine-blur', 'holiday-fast-long', 'watched-clock-drag', 'present-savor', 'novelty-stretch',
  'proportion-ratio', 'memory-density-diagram', 'routine-vs-novelty', 'holiday-paradox-diagram',
  // sad-music (all new)
  'rainy-car-drive', 'string-quartet-hall', 'sunset-balcony',
  'reach-for-sad-song', 'safe-sadness-jar', 'console-wave', 'song-companion', 'mood-mirror', 'cathartic-release', 'moved-tear-warm', 'empathy-dial-music', 'sad-playlist-heart', 'lighter-after',
  'safe-emotion', 'console-hormone', 'mood-congruence', 'sad-music-gives',
  // anger (all new)
  'heated-argument-lounge', 'red-mist-room', 'cool-calm-room',
  'anger-flash', 'anger-messenger', 'anger-iceberg', 'amygdala-hijack', 'ninety-sec-wave', 'vent-backfire', 'bottled-anger', 'pause-breath', 'assertive-vs-aggressive', 'fuel-to-fix',
  'anger-as-signal', 'anger-iceberg-split', 'amygdala-flood', 'ninety-second-rule',
  // first-impressions (all new)
  'interview-room', 'first-date-cafe', 'party-entrance',
  'snap-judgment-clock', 'thin-slice', 'primacy-anchor', 'halo-effect', 'warmth-first', 'sticky-label', 'self-fulfilling', 'open-posture', 'pratfall-charm', 'second-look',
  'impression-speed', 'primacy-list', 'first-two-questions', 'halo-spread',
  // read-body-language (all new)
  'negotiation-table', 'park-bench', 'reading-studio',
  'baseline-cue', 'cue-cluster', 'micro-expression', 'honest-feet', 'eye-contact-dial', 'personal-space', 'self-soothe', 'mirror-rapport', 'ventral-front', 'duchenne-smile',
  'baseline-deviation', 'cluster-not-single', 'proxemics-zones', 'honesty-ladder',
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
