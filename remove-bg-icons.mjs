import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

const ICONS_DIR = 'public/website-images/3d-icons';
const icons = ['shield-3d.png', 'percent-3d.png', 'support-3d.png', 'secure-3d.png', 'clock-3d.png'];

async function processIcon(filename) {
  const filePath = path.join(ICONS_DIR, filename);
  console.log(`Processing background removal for: ${filename}`);

  const img = await loadImage(filePath);
  const width = img.width;
  const height = img.height;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Track visited pixels in a BFS
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper to add pixel to queue
  function enqueue(x, y) {
    const idx = y * width + x;
    if (visited[idx] === 0) {
      visited[idx] = 1;
      queue.push([x, y]);
    }
  }

  // Enqueue all boundary pixels (outer border)
  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  // BFS to find all connected background pixels
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const idx = (cy * width + cx) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];

    // Calculate brightness
    const avg = (r + g + b) / 3;

    // If it's part of the white/near-white background
    if (avg >= 235 && a > 0) {
      // Set to fully transparent
      data[idx + 3] = 0;

      // Add 4-way neighbors
      if (cx > 0) enqueue(cx - 1, cy);
      if (cx < width - 1) enqueue(cx + 1, cy);
      if (cy > 0) enqueue(cx, cy - 1);
      if (cy < height - 1) enqueue(cx, cy + 1);
    } else if (avg >= 200 && avg < 235 && a > 0) {
      // Soft transition edge: make it partially transparent to smooth the anti-aliasing
      // Brighter = more transparent
      const ratio = (235 - avg) / (235 - 200); // 0 at 235, 1 at 200
      data[idx + 3] = Math.round(ratio * 255);
    }
  }

  // Write the cleaned pixels back to the canvas
  ctx.putImageData(imgData, 0, 0);

  // Overwrite the original file with the transparent version
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
  console.log(`Successfully removed background and saved transparent version to ${filePath}`);
}

async function main() {
  for (const icon of icons) {
    try {
      await processIcon(icon);
    } catch (err) {
      console.error(`Failed to process ${icon}:`, err);
    }
  }
  console.log('Background removal complete for all 3D icons!');
}

main().catch(console.error);
