// split-logos.mjs
// รันด้วย: node split-logos.mjs
// Spritesheet: 519x689px, 4 cols x 7 rows

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

const SPRITESHEET = 'public/assets/logos/insurance/media__1778981675362.png';
const OUTPUT_DIR = 'public/assets/logos/insurance/individual';

// หลังจากวัดด้วยสายตา:
// ภาพ 519 x 689 px
// มีเส้นขอบประมาณ 1px ระหว่างแต่ละเซลล์
// คอลัมน์: col0=0-129, col1=130-258, col2=259-388, col3=389-519
//   → colW ≈ 129-130px
// แถว: row0=0-91, row1=92-187, row2=188-281, row3=282-374, row4=375-468, row5=469-562, row6=563-689
//   → rowH ≈ 92-96px

// แต่ละโลโก้: ตัดขอบออก 2px ทุกด้านเพื่อไม่ให้เส้นกรอบติดมา
const MARGIN = 7;

function cell(col, row, colW, rowH, imgW, imgH) {
  const x = col * colW + MARGIN;
  const y = row * rowH + MARGIN;
  const w = colW - MARGIN * 2;
  const h = rowH - MARGIN * 2;
  return { x, y, w, h };
}

const COL_W = 129;  // ≈519/4
const ROW_H = 98;   // ≈689/7

const logos = [
  // แถว 0
  { ...cell(0, 0, COL_W, ROW_H), name: 'bangkok-insurance' },
  { ...cell(1, 0, COL_W, ROW_H), name: 'thai-viwat' },
  { ...cell(2, 0, COL_W, ROW_H), name: 'msig' },
  { ...cell(3, 0, COL_W, ROW_H), name: 'tokio-marine' },
  // แถว 1
  { ...cell(0, 1, COL_W, ROW_H), name: 'dhipaya' },
  { ...cell(1, 1, COL_W, ROW_H), name: 'muang-thai' },
  { ...cell(2, 1, COL_W, ROW_H), name: 'viriyah-orange' },
  { ...cell(3, 1, COL_W, ROW_H), name: 'viriyah' },
  // แถว 2
  { ...cell(0, 2, COL_W, ROW_H), name: 'deves' },
  { ...cell(1, 2, COL_W, ROW_H), name: 'axa' },
  { ...cell(2, 2, COL_W, ROW_H), name: 'thai-paiboon' },
  { ...cell(3, 2, COL_W, ROW_H), name: 'chubb' },
  // แถว 3
  { ...cell(0, 3, COL_W, ROW_H), name: 'chubb-2' },
  { ...cell(1, 3, COL_W, ROW_H), name: 'allianz-ayudhya' },
  { ...cell(2, 3, COL_W, ROW_H), name: 'aigi-bangkok' },
  { ...cell(3, 3, COL_W, ROW_H), name: 'sompo' },
  // แถว 4
  { ...cell(0, 4, COL_W, ROW_H), name: 'tsi' },
  { ...cell(1, 4, COL_W, ROW_H), name: 'indara' },
  { ...cell(2, 4, COL_W, ROW_H), name: 'navakij-globe' },
  { ...cell(3, 4, COL_W, ROW_H), name: 'navakij' },
  // แถว 5
  { ...cell(0, 5, COL_W, ROW_H), name: 'falcon' },
  { ...cell(1, 5, COL_W, ROW_H), name: 'kpi' },
  { ...cell(2, 5, COL_W, ROW_H), name: 'ergo' },
  { ...cell(3, 5, COL_W, ROW_H), name: 'icare' },
  // แถว 6 (สูงกว่า ≈126px)
  { x: 0*COL_W+MARGIN, y: 6*ROW_H+MARGIN, w: COL_W-MARGIN*2, h: 689-(6*ROW_H)-MARGIN*2, name: 'bui' },
  { x: 1*COL_W+MARGIN, y: 6*ROW_H+MARGIN, w: COL_W-MARGIN*2, h: 689-(6*ROW_H)-MARGIN*2, name: 'aig' },
  { x: 2*COL_W+MARGIN, y: 6*ROW_H+MARGIN, w: COL_W-MARGIN*2, h: 689-(6*ROW_H)-MARGIN*2, name: 'roojai' },
];

async function splitLogos() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const img = await loadImage(SPRITESHEET);
  console.log(`Spritesheet: ${img.width}x${img.height}`);
  console.log(`COL_W=${COL_W}, ROW_H=${ROW_H}, MARGIN=${MARGIN}`);

  for (const logo of logos) {
    const canvas = createCanvas(logo.w, logo.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, logo.x, logo.y, logo.w, logo.h, 0, 0, logo.w, logo.h);
    const outPath = path.join(OUTPUT_DIR, `${logo.name}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Saved: ${logo.name} (${logo.x},${logo.y} ${logo.w}x${logo.h})`);
  }
  console.log('\nDone!');
}

splitLogos().catch(console.error);
