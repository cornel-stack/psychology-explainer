/** Plain-data asset name lists (no React imports) for validation + tooling. */
export const POSE_NAMES = [
  'idle', 'point-right', 'point-left', 'shrug', 'arms-out-presenting', 'startled',
  'hands-on-wheel', 'wave', 'walking', 'sleeping-lying', 'sitting-up-in-bed', 'face-on-pillow',
  'cover-eyes', 'cower', 'cheer', 'facepalm', 'arms-crossed', 'fist-up', 'hands-hips', 'reach-down',
] as const;

export const COSTUME_NAMES = ['pajamas', 'labcoat', 'suit', 'hoodie', 'tee'] as const;
export const ACCESSORY_NAMES = ['nightcap', 'halo', 'antenna', 'none'] as const;
export const SCENE_KINDS = ['story', 'explainer', 'statCard', 'diagramCard', 'closeUp', 'overviewGrid', 'endScreen'] as const;
export const DIAGRAM_TYPES = ['sleep-stage', 'switchboard', 'signal-race', 'overflow-meter', 'two-gates', 'then-now', 'decision-fork', 'dk-curve', 'loss-scale', 'framing-flip', 'defense-shield', 'iceberg', 'maturity-ladder', 'redirect-arrow', 'pressure-valve', 'attachment-grid', 'secure-base', 'push-pull', 'chase-cycle', 'bell-curve', 'flynn-effect', 'multi-intelligence', 'fog-triangle', 'manipulation-cycle', 'ask-ladder', 'dopamine-loop', 'comparison-trap', 'attention-economy', 'default-mode-network', 'rumination-loop', 'ironic-process', 'window-of-now', 'dial-not-switch', 'attention-spotlight', 'hypnogram', 'sleep-threshold', 'rem-switch', 'dream-layers', 'mind-body-sleep', 'terror-vs-nightmare', 'knowledge-circle', 'iq-vs-eq', 'overexcitability', 'complexity-comfort', 'curiosity-tree', 'daydream-spectrum', 'immersion-meter', 'trigger-loop', 'two-lives', 'absorption-scale', 'circadian-low', 'cortisol-curve', 'night-brain', 'molehill-mountain', 'dawn-vs-dark', 'overthink-ladder', 'thought-vs-action', 'whatif-branches', 'spiral-funnel', 'comparison-envy', 'warm-cold-map', 'jealousy-roots', 'how-to-respond', 'complex-core', 'overcompensate-arc', 'hidden-roots', 'two-sides-coin', 'four-axes', 'four-families', 'cognitive-stack', 'type-not-a-box', 'awareness-ladder', 'mind-floors', 'flow-channel', 'spectrum-line', 'present-vs-future', 'limbic-vs-cortex', 'avoidance-loop', 'do-it-ladder', 'argument-anatomy', 'attack-argument', 'correlation-causation', 'spot-it-checklist', 'introvert-battery', 'quality-quantity', 'solitude-vs-loneliness', 'social-budget', 'intelligence-wheel', 'not-one-number', 'spiky-profile', 'strength-finder'] as const;
export const LOOK_DIRS = ['left', 'center', 'right'] as const;
export const CLOSEUP_SUBJECTS = ['face', 'object'] as const;
