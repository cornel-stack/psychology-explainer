/**
 * Accessories.tsx — the 3 ORIGINAL head-accessory brand options, shown on the
 * mascot for selection. Rendered via `npm run contact-sheet`.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { Mascot } from '../assets/mascot/Mascot';
import { AccessoryVariant } from '../assets/mascot/parts/Accessory';

const OPTIONS: { v: AccessoryVariant; name: string; blurb: string }[] = [
  { v: 'nightcap', name: 'OPTION A — NIGHTCAP', blurb: 'cozy / sleep-topic native' },
  { v: 'halo', name: 'OPTION B — MINDFUL HALO', blurb: 'calm / zen / floats + bobs' },
  { v: 'antenna', name: 'OPTION C — TWIN ANTENNAE', blurb: 'curious / sci-fi / glows' },
];

export const Accessories: React.FC = () => {
  const colW = 640;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <div style={{ position: 'absolute', left: 50, top: 40, fontFamily, fontWeight: 800, fontSize: 48, color: COLORS.outline }}>
        HEAD-ACCESSORY BRAND OPTIONS (pick one)
      </div>
      {OPTIONS.map((o, i) => {
        const x = 70 + i * colW;
        return (
          <React.Fragment key={o.v}>
            <div style={{ position: 'absolute', left: x, top: 150, width: colW - 40, height: 620, border: `3px solid ${COLORS.purpleDeep}55`, borderRadius: 24, background: '#ffffff55' }} />
            <Mascot costume="pajamas" pose="idle" emotion="happy-talk" accessory={o.v} scale={0.82} x={x + (colW - 40) / 2} y={470} seed={i + 7} />
            <div style={{ position: 'absolute', left: x, top: 800, width: colW - 40, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 34, color: COLORS.outline }}>
              {o.name}
            </div>
            <div style={{ position: 'absolute', left: x, top: 848, width: colW - 40, textAlign: 'center', fontFamily, fontWeight: 600, fontSize: 24, color: COLORS.purpleDeep }}>
              {o.blurb}
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
