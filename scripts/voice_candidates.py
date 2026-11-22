#!/usr/bin/env python3
"""Generate 3 TTS voice candidates from a fixed test paragraph.
Deep, calm, male English voices. Run: npm run voices
Outputs to renders/voice_candidates/.
"""
import asyncio, os, json, re
import edge_tts

OUT = os.path.join(os.path.dirname(__file__), "..", "renders", "voice_candidates")
LEX = os.path.join(os.path.dirname(__file__), "lexicon.json")

# Deep, calm, male English candidates available in edge-tts.
CANDIDATES = [
    # (label, voice, rate, pitch)
    ("A_Guy_US_deep",     "en-US-GuyNeural",      "-8%",  "-6Hz"),
    ("B_Christopher_US",  "en-US-ChristopherNeural", "-6%", "-4Hz"),
    ("C_Ryan_UK_calm",    "en-GB-RyanNeural",     "-7%",  "-3Hz"),
]

TEST_PARAGRAPH = (
    "You're lying in bed, right on the edge of sleep, when your whole body "
    "suddenly jerks. It feels like you were falling. That little jolt is called "
    "a hypnic jerk, a harmless burst of myoclonus as your muscles lose their "
    "waking tension. Your brain, flooded with adenosine, is simply handing the "
    "controls over to the night. It's completely normal, and almost everyone "
    "has felt it."
)

def apply_lexicon(text: str) -> str:
    with open(LEX) as f:
        lex = json.load(f)
    for word, resp in lex.items():
        if word.startswith("_"):
            continue
        text = re.sub(rf"\b{re.escape(word)}\b", resp, text, flags=re.IGNORECASE)
    return text

async def main():
    os.makedirs(OUT, exist_ok=True)
    spoken = apply_lexicon(TEST_PARAGRAPH)
    print("Spoken text (post-lexicon):\n", spoken, "\n")
    for label, voice, rate, pitch in CANDIDATES:
        path = os.path.join(OUT, f"{label}.mp3")
        tts = edge_tts.Communicate(spoken, voice, rate=rate, pitch=pitch)
        await tts.save(path)
        print(f"  wrote {label}: {voice} rate={rate} pitch={pitch} -> {path}")

if __name__ == "__main__":
    asyncio.run(main())
