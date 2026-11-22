#!/usr/bin/env python3
"""Pronunciation check — synthesize every locked term in isolation (Brian voice,
lexicon applied) and a single combined all-terms MP3 with short pauses.
Output: renders/terms-test/ (per-term MP3s) + renders/terms-test/ALL-TERMS.mp3
"""
import asyncio, json, os, re
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "renders", "terms-test")

TERMS = [
    "l'appel du vide", "sonder", "frisson", "jamais vu", "presque vu", "déjà vu",
    "anemoia", "saudade", "gigil", "Torschlusspanik", "kenopsia", "amae",
    "awumbuk", "Fernweh", "Heimweh", "Durkheim", "Salimpoor", "Zatorre",
    "Sedikides", "Doi", "Baining", "Tagalog",
]


def lex():
    with open(os.path.join(ROOT, "scripts", "lexicon.json")) as f:
        return json.load(f)


def apply(text, L):
    for w, r in L.items():
        if w.startswith("_"):
            continue
        text = re.sub(rf"\b{re.escape(w)}\b", r, text, flags=re.IGNORECASE)
    return text


async def main():
    os.makedirs(OUT, exist_ok=True)
    voice = json.load(open(os.path.join(ROOT, "scripts", "voice.json")))
    L = lex()
    # One line per term: "<term>." so you hear the word, respelled by the lexicon.
    combined = " ... ".join(apply(t, L) + "." for t in TERMS)
    print("Combined (post-lexicon):\n", combined, "\n")
    c = edge_tts.Communicate(combined, voice["voice"], rate=voice["rate"], pitch=voice["pitch"])
    await c.save(os.path.join(OUT, "ALL-TERMS.mp3"))
    print("wrote ALL-TERMS.mp3")
    for i, t in enumerate(TERMS):
        spoken = apply(t, L)
        ci = edge_tts.Communicate(spoken + ".", voice["voice"], rate=voice["rate"], pitch=voice["pitch"])
        safe = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
        await ci.save(os.path.join(OUT, f"{i:02d}-{safe}.mp3"))
    print(f"wrote {len(TERMS)} isolated term MP3s -> {OUT}")


if __name__ == "__main__":
    asyncio.run(main())
