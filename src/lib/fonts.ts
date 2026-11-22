/**
 * fonts.ts — loads the display font from a BUNDLED file (public/fonts/Baloo2.ttf)
 * via a local @font-face, so local and CI renders are pixel-identical and need
 * no network. Uses delayRender until the font is ready.
 */
import { continueRender, delayRender, staticFile } from 'remotion';

export const fontFamily = 'Baloo 2';

if (typeof document !== 'undefined' && !document.getElementById('baloo2-face')) {
  const handle = delayRender('Loading Baloo 2');
  const url = staticFile('fonts/Baloo2.ttf');

  const style = document.createElement('style');
  style.id = 'baloo2-face';
  style.textContent = `@font-face{font-family:'Baloo 2';src:url('${url}') format('truetype');font-weight:400 800;font-style:normal;font-display:block;}`;
  document.head.appendChild(style);

  const face = new FontFace('Baloo 2', `url(${url})`, { weight: '400 800', display: 'block' });
  face
    .load()
    .then((loaded) => {
      document.fonts.add(loaded);
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
}
