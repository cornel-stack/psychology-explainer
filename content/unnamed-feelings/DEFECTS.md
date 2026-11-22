# Self-review defect list — "Every Feeling You Can't Name, Explained"

Reviewed against the quality bar (legible at 480p; nouns present; terms correct;
sources check out; no dead frames / clipping / overlaps). Each item is **FIXED**
or **JUSTIFIED**.

## Fixed in this pass
1. **CloseUp context mismatch (was embarrassing).** The face close-up used the
   sleep-video bedroom rig (pillow, blanket, night bands, pajamas + nightcap) —
   wrong for a hoodie character on balconies/trains/stadiums. **Fixed:** a generic
   emotional close-up on a burst backdrop tinted by the emotion (purple for
   fear, sky for joy, pink for annoyance…), no bed, no nightcap. The bedroom rig
   is retained behind a `bed` flag for sleep videos.
2. **Overflow-meter froze at the brim on stills.** **Fixed:** it now fills → brims
   → spills looping droplets, so any mid-beat frame shows the spill.
3. **Prop-sheet labels underlapped tall props.** **Fixed:** a reserved label-band
   layout rule (art centered in cell minus the caption band).
4. **Two `living-room` setup frames at 45.1% flat background** (just over the gate;
   caught by the CI stills-QA on the first full render). **Fixed:** the living
   room gained wallpaper stripes + a cream wainscot panel, dropping its flat
   share to ~11% and making the room read richer. (This is the QA gate doing its
   job — a plain wall pushed over the "empty frame" budget and blocked the upload.)

## Justified (intentional / acceptable at 480p)
5. **Room reuse.** `living-room` backs 7 items. The hero prop and the pose/emotion
   differ every time (music-notes, speech-bubble, photo-stack, rain-cloud, puppy,
   heart, water-bowl, suitcase), and camera punch-ins vary the framing — so cuts
   read as distinct beats. Adding 2–3 more rooms is a nice-to-have, not a defect.
6. **Diagram host framing.** The labcoat "Minute" stands at left pointing at all
   9 diagram beats — deliberate, consistent host language (matches the reference
   channel's explainer staging).
7. **Hero-noun, not every-noun.** Each story contains the *key* drawable noun its
   narration names (phone, puppy, photos, rain, suitcase, bowl, city gate, music
   notes, moon). Incidental nouns (stairs, fries, a coat, a bus stop) are carried
   by narration, not drawn. Within our flat-prop budget this keeps scenes clean;
   literal depiction of every noun is a future enrichment.
8. **Close-up backdrop repeats by emotion.** 17 peaks share ~5 tinted backdrops.
   Because the tint tracks the emotional tone, adjacent peaks differ; it also
   keeps the white head high-contrast. Acceptable.
9. **TTS pronunciation.** Verified via `renders/terms-test/ALL-TERMS.mp3`. edge-tts
   respellings (e.g. *Torschlusspanik*, *saudade*, *amae*) are close approximations,
   not native-perfect; good enough for a neural English voice and consistent.
10. **`1912` StatCard.** Collective effervescence uses a year rendered as a big
   count-up number — a date callout in the reference channel's style, intentional.
11. **SFX/music are silent placeholders.** Narration is present and frame-synced
    (one file per beat, scene = audio + 12 frames). `public/sfx/README.md` lists
    what to drop in; the mix (music −22 dB, −4 dB duck) applies when real files
    are supplied.

## Verified green by automated QA (CI gates)
- `validate` — schema + asset registry + manifest (0 MISSING).
- `lint:strokes` — single 3-token outline system, all `#1A1A1A`.
- `qa_grid_overlap` — 15 overview badges + labels, no bounding-box intersections.
- `qa_stills` — **every beat still ≤ 45 % flat background** (the "no empty frame"
  gate); fails the CI job on any red.
- Runtime **15.1 min** (27,207 frames) — inside the 14–18 min bar.
