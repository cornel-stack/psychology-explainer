/**
 * SceneRouter — dispatches a Beat to its scene template, and overlays a section
 * TitleCard when the beat declares one.
 */
import React from 'react';
import { Beat } from './types';
import { StoryScene } from './StoryScene';
import { ExplainerScene } from './ExplainerScene';
import { StatCard } from './StatCard';
import { DiagramCard } from './DiagramCard';
import { CloseUp } from './CloseUp';
import { OverviewGrid } from './OverviewGrid';
import { EndScreen } from './EndScreen';
import { TitleCard } from './common';
import { chapterAccent } from '../lib/style';

const Scene: React.FC<{ beat: Beat }> = ({ beat }) => {
  const cs = beat.chapterStart;
  switch (beat.scene) {
    case 'story':
      return <StoryScene room={beat.room ?? 'bedroom-night'} mascots={beat.mascots} props={beat.props} fg={beat.fg} camera={beat.camera} chapterStart={cs} />;
    case 'explainer':
      return <ExplainerScene prop={beat.prop} propArgs={beat.propArgs} diagram={beat.diagram} emotion={beat.emotion} chapterStart={cs} />;
    case 'statCard':
      return <StatCard value={beat.value ?? 0} suffix={beat.suffix} pictogram={beat.pictogram} fraction={beat.fraction} chapterStart={cs} />;
    case 'diagramCard':
      return <DiagramCard diagram={beat.diagram ?? 'sleep-stage'} highlight={beat.highlight} withMascot={beat.withMascot ?? true} chapterStart={cs} />;
    case 'closeUp':
      return <CloseUp subject={beat.subject ?? 'face'} emotion={beat.emotion} prop={beat.prop} bands={beat.bands} bed={beat.bed} accessory={beat.accessory} chapterStart={cs} />;
    case 'overviewGrid':
      return <OverviewGrid items={beat.items ?? []} chapterStart={cs} />;
    case 'endScreen':
      return <EndScreen />;
    default:
      return null;
  }
};

export const SceneRouter: React.FC<{ beat: Beat }> = ({ beat }) => (
  <>
    <Scene beat={beat} />
    {beat.title && <TitleCard title={beat.title} subtitle={beat.subtitle} accent={chapterAccent(beat.title.length)} />}
  </>
);
