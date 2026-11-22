# SFX & Music

These are **placeholder silent files**. Drop in your own royalty-free audio with
the **same filenames** and the pipeline will pick them up (no code change needed).

| File            | Trigger (per spec)                                   | Suggested length |
|-----------------|------------------------------------------------------|------------------|
| `whoosh.mp3`    | Hard cuts on **chapter boundaries** only             | 0.3–0.5 s        |
| `pop.mp3`       | Bubbles / badges springing in                        | 0.1–0.2 s        |
| `boing.mp3`     | Startle / `startled` pose                             | 0.2–0.4 s        |
| `thunder.mp3`   | `lightning-cloud` prop (soft, low)                   | 0.6–1.0 s        |
| `tick.mp3`      | Diagram toggles (MIND/BODY switchboard)              | 0.05–0.1 s       |
| `music_bed.mp3` | One calm loopable bed, **-22 dB**, sidechain-ducked **-4 dB** under narration | loopable, 20–60 s |

Mixing (applied at assembly time in Phase 3):
- Narration is the priority track (one file per beat).
- Music sits at **-22 dB** and ducks another **-4 dB** whenever narration plays.
- SFX are one-shots aligned to the frame of the triggering event.

Sources for royalty-free audio: freesound.org (CC0), Pixabay, YouTube Audio Library.
