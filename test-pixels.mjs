// test-pixels.mjs
import { loadImage } from 'canvas';

async function test() {
  const img = await loadImage('public/assets/logos/insurance/individual/allianz-ayudhya.png');
  console.log(`Dimensions: ${img.width}x${img.height}`);
  
  // Let's create a canvas to inspect pixels
  const canvas = new (await import('canvas')).default.createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imgData.data;
  
  console.log('First 5 rows non-white pixels:');
  for (let y = 0; y < Math.min(10, img.height); y++) {
    let rowPixels = [];
    for (let x = 0; x < img.width; x++) {
      const idx = (y * img.width + x) * 4;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const a = data[idx+3];
      if (r < 240 || g < 240 || b < 240) {
        rowPixels.push({x, r, g, b, a});
      }
    }
    if (rowPixels.length > 0) {
      console.log(`Row ${y}: found ${rowPixels.length} non-white pixels. Sample:`, rowPixels.slice(0, 3));
    }
  }
}

test().catch(console.error);
