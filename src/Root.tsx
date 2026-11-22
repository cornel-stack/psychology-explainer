import React from 'react';
import { Composition } from 'remotion';
import './lib/fonts';
import { ContactSheet } from './dev/ContactSheet';
import { Accessories } from './dev/Accessories';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Phase 1 QA boards (stills) */}
      <Composition
        id="CardContactSheet"
        component={ContactSheet}
        durationInFrames={60}
        fps={30}
        width={3010}
        height={2320}
      />
      <Composition
        id="CardAccessories"
        component={Accessories}
        durationInFrames={60}
        fps={30}
        width={2010}
        height={920}
      />
    </>
  );
};
