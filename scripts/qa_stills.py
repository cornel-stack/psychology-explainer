#!/usr/bin/env python3
"""QA for rendered stills (A4).
- Background share: share of the single most-common color. Flags > 45%.
- Also emits a 480p thumbnail per still for legibility review.
Usage: python3 scripts/qa_stills.py renders/templates
"""
import sys, os, glob
from collections import Counter
from PIL import Image

MAX_BG = 0.45
src = sys.argv[1] if len(sys.argv) > 1 else "renders/templates"
thumb_dir = os.path.join(src, "480p")
os.makedirs(thumb_dir, exist_ok=True)

fails = []
print(f"{'still':28} {'bg-share':>9}  status")
print("-" * 52)
for p in sorted(glob.glob(os.path.join(src, "*.png"))):
    im = Image.open(p).convert("RGB")
    small = im.resize((192, 108))  # measure on a downscale
    c = Counter(small.getdata())
    top, cnt = c.most_common(1)[0]
    share = cnt / (192 * 108)
    status = "OK"
    if share > MAX_BG:
        status = "FAIL >45% bg"
        fails.append((os.path.basename(p), share))
    print(f"{os.path.basename(p):28} {share*100:7.1f}%  {status}")
    # 480p thumbnail (854x480-ish, keep aspect)
    im.resize((854, 480)).save(os.path.join(thumb_dir, os.path.basename(p)))

print("-" * 52)
if fails:
    print(f"✗ {len(fails)} still(s) exceed {int(MAX_BG*100)}% flat background:")
    for n, s in fails:
        print(f"    {n}: {s*100:.1f}%")
    sys.exit(1)
print(f"✓ all stills within {int(MAX_BG*100)}% background budget; 480p set in {thumb_dir}")
