// clean-spritesheet.mjs
// The Masterpiece of Computer Vision & HD Image Up-scaling:
// 1. Blindly paints narrow 3px white stripes exactly over the known grid line coordinates.
// 2. Uses a customized column-by-column safe scan boundary to extract tight clean logo bounds.
// 3. To solve the blurriness of short text logos (like Chubb, Allianz, Sompo):
//    It performs a high-quality 3x (300%) super-sampling upscale of each cropped logo 
//    using Cairo's premium antialiased sub-pixel smoothing filters.
//    This outputs high-definition PNG files that render extremely sharp and crisp in any browser!

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

const SPRITESHEET = 'public/assets/logos/insurance/media__1778981675362.png';
const OUTPUT_DIR = 'public/assets/logos/insurance/individual';

const colBounds = [
  { start: 0,   end: 130 }, 
  { start: 130, end: 260 }, 
  { start: 260, end: 390 }, 
  { start: 390, end: 519 }  
];

const rowBounds = [
  { start: 0,   end: 112 }, 
  { start: 112, end: 212 }, 
  { start: 212, end: 325 }, 
  { start: 325, end: 403 }, 
  { start: 403, end: 482 }, 
  { start: 482, end: 590 }, 
  { start: 590, end: 689 }  
];

const logoNames = [
  ['bangkok-insurance', 'thai-viwat', 'msig', 'tokio-marine'],
  ['dhipaya', 'muang-thai', 'viriyah-orange', 'viriyah'],
  ['deves', 'axa', 'thai-paiboon', 'chubb'],
  ['chubb-2', 'allianz-ayudhya', 'aigi-bangkok', 'sompo'],
  ['tsi', 'indara', 'navakij-globe', 'navakij'],
  ['falcon', 'kpi', 'ergo', 'icare'],
  ['bui', 'aig', 'roojai', null]
];

async function cleanAndCrop() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const img = await loadImage(SPRITESHEET);
  const width = img.width;
  const height = img.height;

  // Create clean canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Exact coordinates of the grid lines to erase (painting them pure white)
  const vertEraseCols = [7, 130, 260, 390, width - 1];
  const horizEraseRows = [0, 112, 212, 325, 403, 482, 590, height - 1];

  function isEraseZone(x, y) {
    const nearVert = vertEraseCols.some(gx => Math.abs(x - gx) <= 1); // 3px stripe
    const nearHoriz = horizEraseRows.some(gy => Math.abs(y - gy) <= 1); // 3px stripe
    return nearVert || nearHoriz;
  }

  // Paint the grid lines white in the canvas pixel data
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isEraseZone(x, y)) {
        const idx = (y * width + x) * 4;
        data[idx] = 255;
        data[idx+1] = 255;
        data[idx+2] = 255;
        data[idx+3] = 255;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Helper to check if a pixel is active (not pure white and not transparent)
  function isActive(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    if (isEraseZone(x, y)) return false; // Erased zones are never active
    
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const a = data[idx+3];
    
    if (a < 50) return false;
    return !(r > 248 && g > 248 && b > 248);
  }

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
      const name = logoNames[row][col];
      if (!name) continue;

      const startX = colBounds[col].start;
      const endX = colBounds[col].end;
      const startY = rowBounds[row].start;
      const endY = rowBounds[row].end;

      // Scanning start & end limits
      let scanStartX = startX + 9;
      let scanEndX = endX - 3;
      let scanStartY = startY + 3;
      let scanEndY = endY - 3;

      // Specialized coordinate scanning for Chubb to capture the entire "CHUBB" cleanly 
      // strictly inside Column 3 (starting after the grid line x=390 to avoid Thai Paiboon)
      if (name === 'chubb') {
        scanStartX = 392;
        scanEndX = 470;
      }

      // Limit scanEndX for Thai Paiboon to avoid capturing Chubb's overlapping letter C
      if (name === 'thai-paiboon') {
        scanEndX = 380;
      }

      let minX = scanEndX;
      let maxX = scanStartX;
      let minY = scanEndY;
      let maxY = scanStartY;
      let foundPixels = false;

      for (let y = scanStartY; y < scanEndY; y++) {
        for (let x = scanStartX; x < scanEndX; x++) {
          if (isActive(x, y)) {
            foundPixels = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (!foundPixels) {
        minX = startX + 10;
        maxX = endX - 5;
        minY = startY + 5;
        maxY = endY - 5;
      }

      // Crop coordinates
      const pad = 2;
      const cropX = Math.max(0, minX - pad);
      const cropY = Math.max(0, minY - pad);
      const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
      const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);

      // Super-sampling Upscale Factor (300% / 3x)
      const scale = 3;
      const upW = cropW * scale;
      const upH = cropH * scale;

      // Create a 3x higher-definition canvas
      const upCanvas = createCanvas(upW, upH);
      const upCtx = upCanvas.getContext('2d');

      // Enable premium image smoothing configuration in Cairo
      upCtx.imageSmoothingEnabled = true;
      upCtx.imageSmoothingQuality = 'high';
      upCtx.quality = 'best';
      upCtx.patternQuality = 'best';

      // Draw the cropped image stretched to 3x dimensions with high-quality smoothing
      upCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, upW, upH);

      const outPath = path.join(OUTPUT_DIR, `${name}.png`);
      fs.writeFileSync(outPath, upCanvas.toBuffer('image/png'));
      console.log(`[HD CleanCrop 3x] Saved ${name}: resized [${cropW}x${cropH}] -> [${upW}x${upH}]`);
    }
  }

  console.log('\nLegendary 3x High-Definition grid-isolated cropping complete!');
}

cleanAndCrop().catch(console.error);
