// check-resolutions.mjs
import { loadImage } from 'canvas';

async function test() {
  const img1 = await loadImage('public/assets/logos/insurance/media__1778981675362.png');
  const img2 = await loadImage('public/assets/logos/insurance/media__1778981056361.png');
  
  console.log(`Image 1 (1778981675362.png): ${img1.width} x ${img1.height}px`);
  console.log(`Image 2 (1778981056361.png): ${img2.width} x ${img2.height}px`);
}

test().catch(console.error);
