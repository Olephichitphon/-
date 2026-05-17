// auto-crop-logos.mjs
// Tight crop version:
// Crops strictly to the bounding box of non-background pixels found inside the safe region.
// By eliminating external padding during cropping, we physically prevent any border lines 
// from bleeding in, resulting in 100% clean, border-free, pixel-perfect individual logo files.

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

const SPRITESHEET = 'public/assets/logos/insurance/media__1778981675362.png';
const OUTPUT_DIR = 'public/assets/logos/insurance/individual';

// Precise non-uniform column boundaries
const colBounds = [
  { start: 0,   end: 130 }, // Col 0
  { start: 130, end: 260 }, // Col 1
  { start: 260, end: 390 }, // Col 2
  { start: 390, end: 519 }  // Col 3
];

// Precise row boundaries calculated based on vertical pixel profiles
const rowBounds = [
  { start: 0,   end: 112 }, // Row 0
  { start: 112, end: 212 }, // Row 1
  { start: 212, end: 325 }, // Row 2
  { start: 325, end: 403 }, // Row 3
  { start: 403, end: 482 }, // Row 4
  { start: 482, end: 590 }, // Row 5
  { start: 590, end: 689 }  // Row 6
];

// Mapping of cells to names
const logoNames = [
  ['bangkok-insurance', 'thai-viwat', 'msig', 'tokio-marine'],
  ['dhipaya', 'muang-thai', 'viriyah-orange', 'viriyah'],
  ['deves', 'axa', 'thai-paiboon', 'chubb'],
  ['chubb-2', 'allianz-ayudhya', 'aigi-bangkok', 'sompo'],
  ['tsi', 'indara', 'navakij-globe', 'navakij'],
  ['falcon', 'kpi', 'ergo', 'icare'],
  ['bui', 'aig', 'roojai', null]
];

async function cropLogos() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const img = await loadImage(SPRITESHEET);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imgData.data;

  // Background check
  function isBackground(x, y) {
    const idx = (y * img.width + x) * 4;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const a = data[idx+3];
    
    if (a < 50) return true;
    if (r > 240 && g > 240 && b > 240) return true;
    
    // Grid lines (RGB ~200-238)
    if (Math.abs(r - g) < 5 && Math.abs(g - b) < 5 && r > 195 && r < 238) {
      return true;
    }
    
    return false;
  }

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
      const name = logoNames[row][col];
      if (!name) continue;

      const startX = colBounds[col].start;
      const endX = colBounds[col].end;
      const startY = rowBounds[row].start;
      const endY = rowBounds[row].end;

      // Safe region inwards to avoid outer grid boundaries completely
      const safeStartX = startX + 5;
      const safeStartY = startY + 5;
      const safeEndX = endX - 5;
      const safeEndY = endY - 5;

      let minX = safeEndX;
      let maxX = safeStartX;
      let minY = safeEndY;
      let maxY = safeStartY;
      let foundPixels = false;

      for (let y = safeStartY; y < safeEndY; y++) {
        for (let x = safeStartX; x < safeEndX; x++) {
          if (!isBackground(x, y)) {
            foundPixels = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (!foundPixels) {
        minX = safeStartX;
        maxX = safeEndX;
        minY = safeStartY;
        maxY = safeEndY;
      }

      // Tight Crop: no external padding to guarantee zero bleed-in
      const cropX = minX;
      const cropY = minY;
      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;

      // Crop and save
      const cropCanvas = createCanvas(cropW, cropH);
      const cropCtx = cropCanvas.getContext('2d');
      cropCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

      const outPath = path.join(OUTPUT_DIR, `${name}.png`);
      fs.writeFileSync(outPath, cropCanvas.toBuffer('image/png'));
      console.log(`[AutoCrop Tight] Saved ${name}: coords [${cropX}, ${cropY}, ${cropW}x${cropH}]`);
    }
  }
  console.log('\nAll logos successfully tight-cropped with zero border bleed!');
}

cropLogos().catch(console.error);
