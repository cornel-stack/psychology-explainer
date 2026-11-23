# Dear Brain — Video Production Playbook

The end-to-end process for making one video. Read this first; it assumes a clean
context. Render *mechanics* live in [`../RENDERING.md`](../RENDERING.md); this doc
is about **research → script → art → thumbnails → deliver** and the creative
standards that make a video not look generic.

**Channel:** Dear Brain — faceless psychology explainers, cute flat-vector chibi
mascot. **Host/narrator:** Brian voice. **Topic backlog & status:**
[`TOPIC-TRACKER.md`](./TOPIC-TRACKER.md).

---

## 0. North star
A video is a `content/<slug>/` folder. The whole pipeline (TTS → validate → lint →
stills-QA → thumbnails → 1080p render → upload) runs in GitHub Actions on that
folder. To make a new video you (1) write `script.json`, (2) build the **new
context-specific art** it needs, (3) add thumbnails + metadata, (4) push and
dispatch the render. Everything else is automated.

## 1. Locked stack & conventions (do not drift)
- **Remotion + TypeScript**, 1920×1080 @ 30fps. All art is **inline SVG** — no
  PNGs, no AI images, no stock.
- **Narration:** edge-tts, voice `en-US-BrianNeural`, rate `-6%`, pitch `-2Hz`
  (`scripts/voice.json`). One audio file per beat, cached by SHA1 of
  voice+text — **unchanged VO text = cached audio = fast re-render.**
- **Scene duration is derived, never hardcoded:** each beat runs
  `audioFrames + 12` tail frames (`src/Video.tsx` `calcVideoMetadata`).
- **Length target:** "Every X" listicles 13–16 min (~1,900–2,400 words), 15 items.
- **Fonts bundled** (`public/fonts/Baloo2.ttf`) so CI == local, pixel-identical.

## 2. The creative standard — the hard-won rules
These are the lessons that cost the most rework. Honour them or the video reads
generic.

1. **Draw what we say.** Every concrete noun/action in the VO must appear in the
   art. If the line is "kick the door, bark at the dog," the scene has a door and a
   dog and the mascot is angry — not a mascot standing beside one floating icon.
   This is the #1 rule. Stage each story beat as a **specific tableau**.
2. **Don't reuse art to fill scenes.** Reusing the same room+prop across items is
   what makes a video feel generic. Each item gets **its own** room, props, poses,
   and (where there's an interaction) a second character. Budget **~20–28 brand-new
   assets per video.** If two items would look alike, draw something new.
3. **Use a second character for interactions.** Many lines involve other people
   (a boss, a partner, a friend). Place two mascots: protagonist = `hoodie`,
   "other person" = `tee` (teal) or `suit` (authority). Stage the interaction
   literally (boss points & yells while protagonist cowers).
4. **Put the words on screen.** Use `speech-bubble` / `thought-bubble` props with
   the actual short phrase (`args.text`, `\n` for line breaks). Section **title
   cards** (`title` + `subtitle` on the chapterStart beat) label each item,
   including an opening card.
5. **Give it a story spine.** Open with a concrete scene (a person, an object) and
   call it back in the outro, so the video feels like one arc, not N definitions.
6. **Scene mix / balance.** Per 15-item video aim ~33 story / ~17 close-up / ~15
   diagram, plus 4–6 statCards for numeric anchors. **~1 close-up "peak" per item**,
   not more. Numbers are always `statCard`, never spoken-only.
7. **Sourcing discipline.** Every claim traces to a study/textbook in `SOURCES.md`.
   Paraphrase coined terms (don't quote). Soften shaky attributions. Add a
   "curiosity & education, not diagnosis" disclaimer. No faces/stock, no
   self-harm/drugs/diagnosis topics (see the sheet's Rules row).

## 3. Art system reference
**Style tokens** (`src/lib/style.ts`): palette in `COLORS`; **exactly three stroke
widths** `STROKE = {xl:14, lg:10, sm:7}`, all `#1A1A1A`; flat two-tone via
`shade(hex,f)`. The **stroke lint** (`npm run lint:strokes`) fails any other thin
width or any raw non-`#1A1A1A` stroke hex. Thick (≥15) strokes are allowed
(silhouette fills).

**Mascot** (`src/assets/mascot/Mascot.tsx`), props:
`{costume, pose, emotion, talking, lookDir, accessory, scale, x, y, flip, seed, enterAt}`.
- **Costumes:** `hoodie` (protagonist), `tee` (teal 2nd person), `suit` (authority),
  `labcoat` (the host), `pajamas`.
- **Poses** (`src/assets/mascot/parts/Arms.tsx` → `POSE_NAMES` in
  `src/lib/assets.ts`): `idle, point-right, point-left, shrug,
  arms-out-presenting, startled, wave, walking, hands-on-wheel`, action set
  `cover-eyes, cower, cheer, facepalm, arms-crossed, fist-up, hands-hips,
  reach-down`, bed set `sleeping-lying, sitting-up-in-bed, face-on-pillow`.
  **Gotcha:** the head disc renders OVER the arms, so hands raised to the face are
  occluded — `cover-eyes` has a dedicated front hand-overlay; for new face-touching
  gestures do the same, or keep hands at the face *edges*.
- **Emotions** (`src/lib/emotions.ts` → `EMOTION_NAMES`): `neutral, happy-talk,
  excited, sleepy, confused, scared, terrified, annoyed, smug, serious-expert`.
  (No "sad" — use `confused`/`scared`.)

**Props** (`src/assets/props/`, registered in `registry.tsx` → `PROP_NAMES`):
- Each file groups a theme: `bedroom, objects, icons, bubbles, feelings, biases,
  defenses, story`. `story.tsx` holds the **literal scene props** (bad-letter,
  magazine-pile, cigarette, red-flag, mirror, baby-bottle, gift-box, bouquet,
  book-stack, whiteboard, flatline-screen, door, punching-bag, broken-heart, sink,
  megaphone, running-shoe) — reuse these and add more.
- **To add a prop:** write a local-origin `React.FC` (token strokes, two-tone),
  export it, add one line to `PROPS` in `registry.tsx`, and add its name to
  `NEW_ASSETS` in `scripts/build-manifest.ts`. Parametric props take `args`
  (e.g. `bad-letter` takes `{label, tone}`).

**Rooms** (`src/assets/rooms/index.tsx` → `ROOM_NAMES`): backgrounds
(living-room, kitchen, office, basement, gym, art-studio, theater-stage,
therapist-office, …). **Gotcha:** the stills-QA fails a room with >45% empty
background — break flat walls with wainscot/stripes/detail.

**Diagrams** (`src/scenes/DiagramCard.tsx` → `DIAGRAM_TYPES`): parametric concept
cards (`defense-shield` with `labels`, `iceberg`, `maturity-ladder`,
`redirect-arrow`, `decision-fork`, …). Add new diagram types here + to
`DIAGRAM_TYPES` + the manifest's `DIAGRAMS` list.

**Scene kinds** (`src/scenes/`, routed by `SceneRouter.tsx`): `story` (mascots in a
room with props/`fg`), `explainer` (host + one prop), `statCard`, `diagramCard`,
`closeUp` (reaction face), `overviewGrid`, `endScreen`.

## 4. Step-by-step: make a new video
1. **Pick the topic** from `TOPIC-TRACKER.md` (follow the build order). Write
   `content/<slug>/SOURCES.md`: one row per item (name, level/category, example
   anchor, source) + on-screen numbers + precision caveats + disclaimer.
2. **Write `content/<slug>/script.json`.** Structure: a **Cold Open** chapter
   (hook scene + closeUp + a statCard + an explainer), an **Overview** chapter
   (`overviewGrid` listing all items), then **one chapter per item**, then an
   **Outro** (explainer + story callback + subscribe closeUp + `endScreen`).
   - Per-item pattern (~5 beats): `story` (chapterStart, `title`+`subtitle`, literal
     tableau) → `story` (second literal beat, *different* staging) → `explainer`
     (host + prop) → `diagramCard` (concept) → `closeUp` (reaction + segue line).
   - Beat fields: `vo, scene, room, emotion, camera` (`slowZoom` |
     `{zoomTo:[x,y,scale]}`), `mascots:[{costume,pose,emotion,x,y,scale,flip,
     lookDir,talking}]`, `props:[{name,x,y,scale,rotate,appearAt,args}]` (behind),
     `fg:[…]` (in front of mascots), `title/subtitle`, and scene-specific
     (`diagram,labels,highlight,value,suffix,items,subject`).
   - Canvas is 1920×1080: protagonist ≈ `x:620,y:600,scale:1.3`; 2nd character
     ≈ `x:1340,y:610,flip:true`; bubbles ≈ `y:300` above a head; floor props low.
     **Title cards occupy the lower third** — keep key props above ~y:720 or rely on
     the card sliding out at frame ~72.
   - **Keep VO text stable** when iterating on art — it preserves the TTS cache.
3. **Build the NEW art** the script references (props/poses/rooms/diagrams),
   register each, and add names to `NEW_ASSETS` in `scripts/build-manifest.ts`.
4. **Verify art as stills before rendering** (cheap, catches 90% of problems):
   - `npx remotion still CardStoryProps out.png` / `CardPoseBoard` — prop & pose sheets.
   - Per-beat tableau: register beats to the `BeatStill` composition via
     `--props='{"beat":{…}}'` (see `src/Root.tsx`), render `BeatStill` at
     `--frame=45`, and eyeball that the scene draws the VO. Fix positions/props.
5. **Thumbnails:** add a `<slug>` entry to `THUMBS_BY_SLUG` in
   `src/dev/Thumbnail.tsx` — 3 variants, clickbait curiosity hooks, big reacting
   mascot, red badge, Dear Brain wordmark.
6. **Metadata:** `content/<slug>/metadata.md` — title + alternates, description
   with `<<TIMESTAMPS>>` placeholder (CI fills it), sources, disclaimer, tags.
7. **Local gates** before pushing:
   `npm run manifest <slug>` → `npm run validate <slug>` → `npm run lint:strokes`.
   Fix any MISSING asset / banned stroke / unknown emotion.
8. **Render in CI & deliver:**
   ```bash
   git add -A && git commit -m "…" && git push
   gh workflow run "Render video" -f slug=<slug>
   ```
   Monitor the run; on success, the **`<slug>-youtube`** artifact (mp4 + 3
   thumbnails + description with timestamps) is the deliverable. Give the user the
   run URL + `gh run download … -n <slug>-youtube`.

## 5. QA gates & common gotchas
- **bg-share > 45%** (stills-QA red) → the room is too empty; add wall detail.
- **stroke lint** → only widths 7/10/14 (or ≥15) and only `#1A1A1A` raw hex.
- **MISSING asset** (validate) → prop/pose/emotion/costume name typo or not
  registered, or not in `NEW_ASSETS`.
- **Unknown emotion** → there's no "sad"; use the 10 in §3.
- **Hands at the face vanish** → head renders over arms; use an overlay or edge-hands.
- **Key prop hidden** → title card covers the lower third on chapterStart beats.
- **Flipped 2nd characters** (`flip:true`) now position correctly — `Mascot.tsx`
  mirrors about the art's true centre via an explicit `translate/scale/translate`.
  (A prior CSS `transform-origin:'center'` shoved every flipped mascot ~620px off
  its `x`, off the right edge — fixed Nov 2026. Verify flipped chars with a
  **MainVideo** still, not `BeatStill`, if you ever touch that transform.)
- **QA stills:** prefer `MainVideo` (fabricate a `renders/<slug>.props.json` with
  uniform `frames` + any existing `sfx/*.mp3` as `audio`) over `BeatStill` — they
  should match, but MainVideo is the source of truth for the final render.
- **Renders must run in CI** (public repo `cornel-stack/psychology-explainer`).
  Local render is a fallback only.

## 6. File map
```
content/<slug>/            script.json, SOURCES.md, metadata.md, asset-manifest.json
src/lib/                   style.ts (colors/strokes/canvas), emotions.ts, assets.ts (name lists), anim.ts, fonts.ts
src/assets/mascot/         Mascot.tsx + parts/{Arms,Costume,Face,Accessory}.tsx
src/assets/props/          <theme>.tsx + registry.tsx (PROPS map)   ← story.tsx = literal scene props
src/assets/rooms/          index.tsx (ROOMS map, ROOM_NAMES)
src/scenes/                StoryScene, ExplainerScene, StatCard, DiagramCard, CloseUp, OverviewGrid, EndScreen, SceneRouter, common.tsx, types.ts
src/dev/                   Thumbnail.tsx (THUMBS_BY_SLUG), NewAssets.tsx (QA sheets)
src/Video.tsx              assembly + calcVideoMetadata (scene = audio+12)
src/Root.tsx               composition registry (MainVideo, Thumb-*, Card* QA, BeatStill)
scripts/                   tts.py, build-manifest.ts, validate.ts, lint-strokes.mjs, render.mjs, stills.mjs, thumbnails.mjs, chapters.mjs
.github/workflows/render.yml   the CI pipeline
```

## 7. New-video checklist (copy-paste)
```
[ ] Topic chosen from TOPIC-TRACKER (build order) + SOURCES.md written
[ ] script.json: cold open + overviewGrid + 15 item chapters + outro
[ ] Every VO noun/action is staged in the art (literal tableaux)
[ ] 2nd character used for interactions; bubbles carry the actual words
[ ] ~20+ NEW context-specific assets built, registered, in NEW_ASSETS
[ ] Art verified as stills (prop sheet, pose board, key BeatStills)
[ ] THUMBS_BY_SLUG: 3 clickbait variants
[ ] metadata.md with <<TIMESTAMPS>>
[ ] npm run manifest/validate/lint:strokes all green locally
[ ] push → gh workflow run "Render video" -f slug=<slug> → monitor
[ ] deliver <slug>-youtube artifact + mark topic done in TOPIC-TRACKER
```
