// find-logo-boundaries.mjs
import { loadImage } from 'canvas';

async function analyze() {
  const img = await loadImage('public/assets/logos/insurance/media__1778981675362.png');
  console.log(`Image dimensions: ${img.width}x${img.height}`);
  
  const canvas = new (await import('canvas')).default.createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imgData.data;

  // Let's analyze Column 1 (which contains Thai Viwat, Muang Thai, AXA, Allianz, Indara, KPI, AIG)
  // Let's sample a vertical line in the middle of Column 1: x = 195 (middle of [130, 260])
  const x = 195;
  console.log(`Vertical pixel profile at x = ${x}:`);
  
  let currentGroup = null;
  
  for (let y = 0; y < img.height; y++) {
    const idx = (y * img.width + x) * 4;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const a = data[idx+3];
    
    const isBg = (r > 245 && g > 245 && b > 245) || a < 50;
    const colorStr = `RGB(${r},${g},${b})`;
    
    if (!isBg) {
      if (!currentGroup) {
        currentGroup = { startY: y, colors: [colorStr] };
      } else {
        if (!currentGroup.colors.includes(colorStr) && currentGroup.colors.length < 5) {
          currentGroup.colors.push(colorStr);
        }
      }
    } else {
      if (currentGroup) {
        console.log(`Content Y: [${currentGroup.startY} - ${y-1}] colors: ${currentGroup.colors.join(', ')}`);
        currentGroup = null;
      }
    }
  }
  if (currentGroup) {
    console.log(`Content Y: [${currentGroup.startY} - ${img.height-1}] colors: ${currentGroup.colors.join(', ')}`);
  }
}

analyze().catch(console.error);
