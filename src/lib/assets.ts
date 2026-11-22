/** Plain-data asset name lists (no React imports) for validation + tooling. */
export const POSE_NAMES = [
  'idle', 'point-right', 'point-left', 'shrug', 'arms-out-presenting', 'startled',
  'hands-on-wheel', 'wave', 'walking', 'sleeping-lying', 'sitting-up-in-bed', 'face-on-pillow',
] as const;

export const COSTUME_NAMES = ['pajamas', 'labcoat', 'suit', 'hoodie'] as const;
export const ACCESSORY_NAMES = ['nightcap', 'halo', 'antenna', 'none'] as const;
export const SCENE_KINDS = ['story', 'explainer', 'statCard', 'diagramCard', 'closeUp', 'overviewGrid', 'endScreen'] as const;
export const DIAGRAM_TYPES = ['sleep-stage', 'switchboard'] as const;
export const LOOK_DIRS = ['left', 'center', 'right'] as const;
export const CLOSEUP_SUBJECTS = ['face', 'object'] as const;
