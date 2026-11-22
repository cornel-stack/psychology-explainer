#!/usr/bin/env python3
"""TTS pipeline — ONE audio file per beat (spec).
Reads content/<slug>/script.json, applies the pronunciation lexicon, synthesizes
with the locked Brian voice, writes content/<slug>/audio/beat_NNN.mp3, and writes
content/<slug>/durations.json (per-beat seconds + frames, where
frames = ceil(seconds*fps) + sceneTailFrames).

Usage: python3 scripts/tts.py <slug>   (default slug: hypnic-jerk)
"""
import asyncio, json, os, re, subprocess, sys, math
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30


def load_json(p):
    with open(p) as f:
        return json.load(f)


def apply_lexicon(text, lex):
    for word, resp in lex.items():
        if word.startswith("_"):
            continue
        text = re.sub(rf"\b{re.escape(word)}\b", resp, text, flags=re.IGNORECASE)
    return text


def ffprobe_seconds(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", path]
    )
    return float(out.strip())


async def main():
    slug = sys.argv[1] if len(sys.argv) > 1 else "hypnic-jerk"
    base = os.path.join(ROOT, "content", slug)
    script = load_json(os.path.join(base, "script.json"))
    lex = load_json(os.path.join(ROOT, "scripts", "lexicon.json"))
    voice = load_json(os.path.join(ROOT, "scripts", "voice.json"))
    tail = int(voice.get("sceneTailFrames", 12))

    audio_dir = os.path.join(base, "audio")
    os.makedirs(audio_dir, exist_ok=True)

    beats = [b for ch in script["chapters"] for b in ch["beats"]]
    print(f"{slug}: {len(beats)} beats, voice={voice['voice']} rate={voice['rate']} pitch={voice['pitch']}")

    durations = []
    for i, beat in enumerate(beats):
        spoken = apply_lexicon(beat["vo"], lex)
        out = os.path.join(audio_dir, f"beat_{i:03d}.mp3")
        tts = edge_tts.Communicate(spoken, voice["voice"], rate=voice["rate"], pitch=voice["pitch"])
        await tts.save(out)
        sec = ffprobe_seconds(out)
        frames = math.ceil(sec * FPS) + tail
        durations.append({"index": i, "seconds": round(sec, 3), "frames": frames,
                          "audio": f"content/{slug}/audio/beat_{i:03d}.mp3"})
        print(f"  beat {i:02d}: {sec:5.2f}s -> {frames} frames  | {beat['vo'][:52]}...")

    total = sum(d["frames"] for d in durations)
    meta = {"slug": slug, "fps": FPS, "sceneTailFrames": tail,
            "totalFrames": total, "totalSeconds": round(total / FPS, 1), "beats": durations}
    with open(os.path.join(base, "durations.json"), "w") as f:
        json.dump(meta, f, indent=2)
    print(f"\n  total: {total} frames = {total/FPS:.1f}s  -> {base}/durations.json")


if __name__ == "__main__":
    asyncio.run(main())
