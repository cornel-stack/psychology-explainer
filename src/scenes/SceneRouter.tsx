/**
 * SceneRouter — dispatches a Beat to its scene template. Used by the video
 * assembly (Phase 3) and the motion reel.
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

export const SceneRouter: React.FC<{ beat: Beat }> = ({ beat }) => {
  const cs = beat.chapterStart;
  switch (beat.scene) {
    case 'story':
      return <StoryScene room={beat.room ?? 'bedroom-night'} mascots={beat.mascots} props={beat.props} camera={beat.camera} chapterStart={cs} />;
    case 'explainer':
      return <ExplainerScene prop={beat.prop} diagram={beat.diagram} emotion={beat.emotion} chapterStart={cs} />;
    case 'statCard':
      return <StatCard value={beat.value ?? 0} suffix={beat.suffix} pictogram={beat.pictogram} fraction={beat.fraction} chapterStart={cs} />;
    case 'diagramCard':
      return <DiagramCard diagram={beat.diagram ?? 'sleep-stage'} highlight={beat.highlight} withMascot={beat.withMascot ?? true} chapterStart={cs} />;
    case 'closeUp':
      return <CloseUp subject={beat.subject ?? 'face'} emotion={beat.emotion} prop={beat.prop} bands={beat.bands} chapterStart={cs} />;
    case 'overviewGrid':
      return <OverviewGrid items={beat.items ?? []} chapterStart={cs} />;
    case 'endScreen':
      return <EndScreen />;
    default:
      return null;
  }
};
