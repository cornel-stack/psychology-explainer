# STYLE.md — Ground Truth for the Flat-Vector Chibi Mascot Explainer

Derived from study of the reference video (Apex Psychology, "Sleep Glitches YOU
Might Experience", 17:29, 524 frames sampled every 2s + a 30-tile evenly-spread
montage across the full runtime). This file characterizes the **style category**
we imitate — flat-vector chibi mascot explainer — NOT the reference brand. All
brand-specific marks we must avoid are listed at the bottom.

> Reference source files (`source.webm`, `frames/`, `montage_*.jpg`) are
> **gitignored** — they are derived from a copyrighted video and must never be
> committed to this public repo. Only this STYLE.md (our own analysis) is tracked.

---

## 1. PALETTE (measured from frames, then calibrated for use)

Colors were measured by median-cut quantization of representative frames, then
nudged to clean values (JPEG at 480p mutes saturation and darkens, so adopted
values are slightly brighter/cleaner than raw measurements). **Adopted** = the
value to put in `src/lib/style.ts`.

| Role              | Measured (raw)            | Adopted   | Where seen                        |
|-------------------|---------------------------|-----------|-----------------------------------|
| Cream background  | `#F1EFE3`                 | `#F2ECDF` | Explainer/stat/diagram bg (80% of those frames) |
| Night-purple wall | `#6C56B9` / `#614CB2`     | `#6F5FB0` | Bedroom/kitchen back wall         |
| Deep purple       | `#41318E` / `#3F2E8D`     | `#4A3F7A` | Night sky, baseboards, shadows    |
| Accent yellow     | `#FCE58F` (soft) / lamp   | `#F6C344` | Stat numbers, pajamas, AWAKE bar, lamps |
| Soft/light yellow | `#FCE58F`                 | `#FBE08A` | AWAKE diagram bar, window-sun glow |
| Sky blue (prop)   | `#DEEDF8`                 | `#BFE3F0` | Fridge, phone screen, mattress band |
| Sky blue (endscr) | `#8DCEFB` / `#B9E2FD`     | `#A9DBF7` | End-screen bg + rings             |
| Soft pink (blush) | isolated ~`#F6A8C0`       | `#F6A8C0` | Cheek blush, hearts               |
| Lavender (REM)    | `#C8B2E5` / `#B6A7E2`     | `#C8B2E5` | REM diagram bar, dream-cloud sky  |
| Diagram blue      | `#829FE3`                 | `#7FA0E6` | DEEP SLEEP bar                    |
| Leaf green        | `#7FBF6B` (dragon)        | `#7FBF6B` | Creature props, arrows            |
| Teal green        | `#87BCB0`                 | `#7FBFB0` | Kitchen cabinets                  |
| Warm wood         | `#D3A276` / `#BA8F6F`     | `#C98A4B` | Bed frame, nightstand, desk, floor |
| Wood dark (2nd tone)| `#98655D`               | `#A4713C` | Inner shading on wood             |
| Skin (hands)      | `#E8C49A` (flex arm)      | `#EBC9A0` | Disembodied helper hands/arms     |
| White             | `#F8F8F8`                 | `#FFFFFF` | Head, labcoat, pillows            |
| Off-white shade   | `#E2E5D7`                 | `#EDEBE0` | 2nd tone on white (head underside)|
| Outline / ink     | `#08060A` / `#131314`     | `#1A1A1A` | Every outline, pupils             |

**Second-tone (flat shading) rule confirmed in frames:** shading is never a
gradient — it is one darker flat shape layered inside: pillow crease (darker
cream ellipse), mattress side band (`#BFE3F0` under white top), head underside
(faint off-white ellipse), inner nightstand drawers. Blush = two solid pink
ellipses, hard-edged.

---

## 2. OUTLINE WEIGHT (relative to 1080p / our 1920×1080 canvas)

Measured on 854-px-wide frames, scaled by 1920/854 ≈ 2.25×:

- **Character silhouette** (head/body outer): ~5–6 px in-frame → **~12 px @ 1920**.
- **Standard shapes** (props, furniture, costume parts): ~3.5–4 px → **~8 px**.
- **Fine detail** (facial features, small prop lines, diagram ticks): ~2.5–3 px → **~6 px**.
- Uniform weight within a tier — no tapering, no variable-width strokes.
- `strokeLinejoin="round"`, `strokeLinecap="round"` everywhere (every corner is
  visibly rounded in the reference).
- Outline color is constant `#1A1A1A`; it never changes hue for colored shapes.

These match the locked spec (12 / 8 / 6). **Keep them.**

---

## 3. SCENE COMPOSITION

Flat, frontal, theatrical — like a puppet stage. No perspective except the
top-down floor plan.

- **Rooms are full-bleed flat sets.** Horizontal bands: back wall (upper ~70%) +
  floor/baseboard strip (lower ~30%), with a thin darker baseboard line between.
  Wall often has a subtle vertical two-tone stripe (alternating `#6F5FB0`/slightly
  darker) — very low contrast.
- **Single hero subject**, centered or at the "rule-of-thirds" left. Props arranged
  symmetrically around it; generous negative space.
- **Explainer layout (cream bg):** mascot anchored at ~x=22–30% standing on an
  implied ground (flat shadow ellipse under feet), ONE floating prop/diagram at
  ~x=70%, vertically centered. Prop often sits in a rounded-rect "card" with its
  own outline (frame 15 flex-arm, frame 55 diagram panel) OR floats bare (frame
  200 spider + brain). Both are valid.
- **Story layout:** mascot stands on the floor strip, room furniture behind
  (bed, fridge, counter, window). Every concrete noun in the narration is drawn:
  phone, alarm clock, kettle, picture frame, lamp, slippers all appear exactly
  when named.
- **Depth cue:** objects lower in frame = nearer. Mild overlap only; no occlusion
  tricks. Window is a rounded-rect with a cross-muntin and a tiny scene inside
  (crescent moon + stars at night, sun + clouds by day).
- **Close-up rig:** head fills ~70–75% of frame height; the room collapses to 2
  flat color bands (wall tone + floor tone) + maybe lamp/picture. Behind the head,
  concentric faint rings radiate (frame 300) to add energy — NO blur.
- **Dream-cloud frame:** content sits inside a scalloped/bumpy cloud border
  (white puffs on the edge), purple-lavender interior, 4-point sparkles with
  offset twinkle, simple mountains/landscape (frame 380).
- **Helper hands:** when another "person/force" acts, only a disembodied arm
  (skin + colored sleeve) slides in from the frame edge — never a second full body
  (frame 120 phone hand, green sleeve; frame 15 flex arm, blue sleeve).

**Safe margins:** nothing important within ~6% of any edge; cards and bubbles stay
fully inside frame.

---

## 4. CHARACTER & EMOTE LANGUAGE (style category, not their mascot)

Proportions (to replicate as a category trait, with OUR own character):
- Near-circular head ≈ **58–62%** of total standing height.
- Tiny rounded trapezoidal body; stubby limbs; little rounded feet/shoes.
- Two hard-edged pink blush ellipses on the cheeks, always present.
- Eyes are large solid-black ovals/circles; a tiny white catchlight sometimes.
  Brows are separate thick strokes floating above (not attached to eyes).
- Mouth is small; opens to a rounded cavity (dark fill, sometimes a pink tongue)
  when talking/excited.

Observed emotion poses (maps 1:1 to our emotion system):
- **neutral:** half-lidded or oval eyes, flat brows, tiny closed smile (frame 2, 80).
- **happy-talk / excited:** wide round eyes, raised angled "determined" brows,
  open smiling mouth (frames 35, 55, 160) — note the signature **two short angled
  brows** that read as upbeat-confident, used as the labcoat default.
- **shrug / unsure:** arms out, palms up, soft smile (frame 240).
- **scared / strained:** eyes clenched to `><` creases, grimace showing teeth,
  single sweat drop, body still (frame 300). Trembling implied by context.
- **sleepy:** eyes closed to downward arcs, tiny mouth, zzz trail (montage, car
  scene).
- **confused:** floating "?" and thought bubble with icon contents (montage clock
  bubble).

Motion vocabulary (confirmed by frame-to-frame deltas):
- Constant gentle **idle bob** of the whole character.
- **Blinks** are brief eye-closes.
- Props **sway/pulse** (spider dangles, brain "pulses" with motion lines, heart
  beats, sweat drop pulses, sparkles twinkle).
- Elements **pop/spring in** with slight overshoot; bubbles pop elastically.
- Expression can **switch mid-scene** on a beat (neutral → strained stinger).
- Our additions per spec (head-leads-body follow-through, amplitude TODO) are
  consistent with — and slightly richer than — the reference.

---

## 5. TYPOGRAPHY (as seen)

- One rounded handwritten font used for everything (labels, stat numbers, titles).
  Matches **Baloo 2 / Patrick Hand** family. We'll use this family.
- **Big stat numbers:** thick yellow fill + black outline, slight rotation,
  centered (montage "123", tally "||||").
- **Diagram/label text:** plain black, ALL-CAPS, short (AWAKE, REM, DEEP SLEEP,
  MIND, BODY, SYMPATHETIC NERVOUS SYSTEM, SLOW-WAVE SLEEP).
- **On-screen prose is rare** — the reference occasionally shows a sentence inside
  a speech bubble, but mostly narration carries meaning. Our spec is stricter:
  **NO on-screen sentences at all** (only stat numbers + short ALL-CAPS labels),
  which keeps auto-dub/translation clean. Keep the stricter rule.

---

## 6. PER-CHAPTER SCRIPT STRUCTURE (reverse-engineered)

The video is a listicle. Macro structure:
1. **Cold open / intro (~0:00–1:10):** mascot at a desk (story), states the
   premise, labcoat "expert" explains the plan; a retention hook. An **overview
   grid** of all items appears early (right after item 1) as the retention hook.
2. **15 numbered items**, each ~55–70s, following a tight repeating beat formula:
   - **(a) Name the item first** — the chapter's first spoken words ARE the title;
     scene hard-cuts on that word. No title card. A brief white flash + whoosh
     marks the boundary.
   - **(b) Second-person mini-story (~25s):** "You're lying in bed and…" acted
     literally in a room (story scene) with every noun drawn as a prop.
   - **(c) Mechanism (~25s):** cut to labcoat explainer + ONE diagram/prop per
     idea; numbers become StatCards; brain/switchboard/sleep-stage diagrams
     visualize the science.
   - **(d) Reassuring punchline (~10s):** a close-up reaction or shrug that
     normalizes the experience ("it's completely normal").
3. **End screen:** radiating rings, subscribe circle, two 16:9 "watch next" rects,
   waving mascot, tagline.

Cadence: **hard cuts only**, on the first frame of the next beat's audio.
Within-scene motion is continuous. Chapter boundaries get the 6-frame white flash
+ whoosh. This exactly matches our locked transition spec.

---

## 7. BRAND MARKS WE MUST NOT REPRODUCE (reference-specific)

These belong to the reference channel. **Our design must be clearly different:**
- ❌ Their mascot: pure-white round head + **black headband** + **gold circular
  brain-coin badge** on the forehead.
- ❌ Their **"APEX" gold sunburst chest badge**.
- ❌ Their navy school-uniform "suit" styling and specific costume cuts.
- ❌ Their logo and the tagline **"Decode Your Mind."**
- ❌ Any 1:1 redrawing of their specific scene compositions.

**Our differentiation (decided for later phases, see Phase 1):**
- Our head accessory is ORIGINAL — 3 options to choose from (nightcap / halo-ring
  / antenna), NOT a headband+brain-coin.
- Our chest/channel badge is an original shape + our own channel initials.
- Our own costume cuts (hoodie variant is unique to us), our own font pairing
  within the rounded-handwritten category, our own tagline.
- We keep only the **category traits** (chibi proportions, flat fills, uniform
  black outlines, blush, cream/purple palette family, theatrical flat staging).

---

## 8. CALIBRATED CONSTANTS FOR `src/lib/style.ts` (Phase 1 input)

```
OUTLINE        = '#1A1A1A'
STROKE_SIL     = 12   // silhouette
STROKE_STD     = 8    // standard
STROKE_FINE    = 6    // fine detail
RADIUS_MIN     = 12   // min rounded-rect rx
BG_CREAM       = '#F2ECDF'
WALL_NIGHT     = '#6F5FB0'
PURPLE_DEEP    = '#4A3F7A'
YELLOW         = '#F6C344'
YELLOW_SOFT    = '#FBE08A'
SKY            = '#BFE3F0'
SKY_END        = '#A9DBF7'
PINK           = '#F6A8C0'
LAVENDER       = '#C8B2E5'
BLUE_DIAGRAM   = '#7FA0E6'
GREEN_LEAF     = '#7FBF6B'
GREEN_TEAL     = '#7FBFB0'
WOOD           = '#C98A4B'
WOOD_DARK      = '#A4713C'
SKIN           = '#EBC9A0'
WHITE          = '#FFFFFF'
WHITE_SHADE    = '#EDEBE0'
SHADOW_OPACITY = 0.15
```
