# Rendering

All renders run in **GitHub Actions** (`.github/workflows/render.yml`). Local
rendering still works as a fallback.

## Run it in CI
- **Manual:** Actions tab → *Render video* → **Run workflow** → pick a `slug`
  (default `unnamed-feelings`).
- **Automatic:** any push that changes a `content/<slug>/script.json` triggers a
  render of that content.

### What the job does
checkout → install Node 20 / Python 3.12 / ffmpeg / edge-tts → restore caches
(npm, Remotion headless browser, per-beat TTS audio) → `tts` (only changed beats
re-synthesize) → build manifest → `validate` (schema + asset registry + manifest)
→ stroke lint + grid overlap → **stills QA** (renders one PNG per beat, fails the
job if any still exceeds the 45% empty-background budget) → 3 thumbnails → full
1080p render → upload artifact.

### Fonts
The display font is **bundled** at `public/fonts/Baloo2.ttf` (OFL, see
`public/fonts/OFL.txt`) and loaded via a local `@font-face` (`src/lib/fonts.ts`).
CI does **not** install system fonts, so CI and local renders are pixel-identical.

### Expected job time
~16-minute video (~29k frames @ 1080p30) on the 4-core `ubuntu-latest` runner:
- install + caches (warm): ~2–3 min
- TTS (warm cache): < 1 min; cold: ~2–3 min
- stills QA (84 stills): ~6–10 min
- full render: ~35–45 min
- **Total: ~45–60 min** (first run is slower while caches populate).

If a single-job render ever bumps the 90-minute timeout, switch to the chunked
matrix: render disjoint frame ranges in parallel jobs
(`remotion render MainVideo out-NNN.mp4 --frames=START-END`) and `ffmpeg -f concat`
them in a final job. Single-job is the default and fits comfortably today.

### Download the result
Open the workflow run → **Artifacts** → `fILES <slug>-package`. It contains:
`<slug>.mp4`, `<slug>-stills/` (one per beat), `thumbnails/`, `terms-test/`,
`metadata.md`, `DEFECTS.md`, `SOURCES.md`, `asset-manifest.json`.

## Local fallback
```bash
npm run tts <slug>        # one audio file per beat (+ durations.json)
npm run validate <slug>   # schema + asset registry + manifest
npm run render <slug>     # -> renders/<slug>.mp4
npm run stills <slug>     # one PNG per beat (QA)
npm run thumbnails        # 3 thumbnail variants
```
`REMOTION_CONCURRENCY=<n> npm run render <slug>` tunes encoder/render parallelism.
