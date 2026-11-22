/** Font loading — Baloo 2 (rounded handwritten family per STYLE.md §5). */
import { loadFont } from '@remotion/google-fonts/Baloo2';

export const { fontFamily } = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
});
