/**
 * ContactSheet.tsx — QA board: every costume × key poses, plus one row per
 * emotion. Rendered as a still via `npm run contact-sheet`.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../lib/style';
import { fontFamily } from '../lib/fonts';
import { Mascot, Costume, Pose } from '../assets/mascot/Mascot';
import { EmotionName, EMOTION_NAMES } from '../lib/emotions';

const COSTUMES: Costume[] = ['pajamas', 'labcoat', 'suit', 'hoodie'];
const POSES: Pose[] = [
  'idle',
  'point-right',
  'shrug',
  'arms-out-presenting',
  'startled',
  'wave',
  'walking',
  'hands-on-wheel',
  'sitting-up-in-bed',
  'sleeping-lying',
  'face-on-pillow',
];

const CELL_W = 250;
const CELL_H = 330;
const PAD = 40;
const LABEL_COL = 170;
const HEAD_H = 90;

const Label: React.FC<{ x: number; y: number; w: number; text: string; size?: number; bold?: boolean }> = ({ x, y, w, text, size = 22, bold }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, textAlign: 'center', fontFamily, fontWeight: bold ? 800 : 600, fontSize: size, color: COLORS.outline }}>
    {text}
  </div>
);

const Cell: React.FC<{ x: number; y: number; children: React.ReactNode }> = ({ x, y, children }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: CELL_W, height: CELL_H, border: `2px dashed ${COLORS.purpleDeep}33`, borderRadius: 16 }}>
    {children}
  </div>
);

export const ContactSheet: React.FC = () => {
  const gridX0 = PAD + LABEL_COL;
  const gridY0 = PAD + HEAD_H;

  const emoY0 = gridY0 + COSTUMES.length * CELL_H + 120;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgCream }}>
      <Label x={PAD} y={PAD} w={800} text="MASCOT CONTACT SHEET — costumes × poses" size={40} bold />

      {/* column headers */}
      {POSES.map((p, c) => (
        <Label key={p} x={gridX0 + c * CELL_W} y={gridY0 - 44} w={CELL_W} text={p} size={20} bold />
      ))}

      {/* rows: costume × pose */}
      {COSTUMES.map((cos, r) => (
        <React.Fragment key={cos}>
          <Label x={PAD} y={gridY0 + r * CELL_H + CELL_H / 2 - 16} w={LABEL_COL - 10} text={cos} size={26} bold />
          {POSES.map((pose, c) => {
            const cx = gridX0 + c * CELL_W;
            const cy = gridY0 + r * CELL_H;
            const scale = pose === 'face-on-pillow' ? 0.42 : 0.33;
            return (
              <Cell key={pose} x={cx} y={cy}>
                <Mascot
                  costume={cos}
                  pose={pose}
                  emotion={cos === 'labcoat' ? 'serious-expert' : 'happy-talk'}
                  accessory={cos === 'pajamas' ? 'nightcap' : 'none'}
                  scale={scale}
                  x={CELL_W / 2}
                  y={CELL_H / 2 + 24}
                  seed={r * 11 + c + 1}
                />
              </Cell>
            );
          })}
        </React.Fragment>
      ))}

      {/* emotion rows */}
      <Label x={PAD} y={emoY0 - 60} w={900} text="EMOTION SYSTEM — one per cell (labcoat)" size={36} bold />
      {EMOTION_NAMES.map((emo: EmotionName, i) => {
        const cols = 5;
        const r = Math.floor(i / cols);
        const c = i % cols;
        const cx = PAD + c * (CELL_W + 20);
        const cy = emoY0 + r * CELL_H;
        return (
          <React.Fragment key={emo}>
            <Cell x={cx} y={cy}>
              <Mascot costume="labcoat" pose="idle" emotion={emo} talking={emo.includes('talk')} scale={0.33} x={CELL_W / 2} y={CELL_H / 2 + 24} seed={i + 100} />
            </Cell>
            <Label x={cx} y={cy + CELL_H - 30} w={CELL_W} text={emo} size={22} bold />
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
