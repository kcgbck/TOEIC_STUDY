import fs from 'fs';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function run() {
  const imagePath = 'docs/샘플.png';
  const img = sharp(imagePath);
  const meta = await img.metadata();
  const width = meta.width;
  const height = meta.height;

  const leftWidth = Math.round(width * 0.52);
  const rightStart = Math.round(width * 0.48);
  const rightWidth = width - rightStart;

  // 좌측 2배 확대 버퍼
  const leftBuf = await sharp(imagePath)
    .extract({ left: 0, top: 0, width: leftWidth, height: height })
    .resize(leftWidth * 2, height * 2)
    .png()
    .toBuffer();

  // 우측 2배 확대 버퍼
  const rightBuf = await sharp(imagePath)
    .extract({ left: rightStart, top: 0, width: rightWidth, height: height })
    .resize(rightWidth * 2, height * 2)
    .png()
    .toBuffer();

  console.log('Tesseract 워커 초기화 중...');
  const worker = await createWorker(['eng', 'kor']);

  console.log('\n--- 좌측 Step C (2배 확대) OCR 인식 중 ---');
  const leftRes = await worker.recognize(leftBuf, {}, { blocks: true });

  console.log('\n--- 우측 Step C (2배 확대) OCR 인식 중 ---');
  const rightRes = await worker.recognize(rightBuf, {}, { blocks: true });

  await worker.terminate();

  const parseBlocks = (data, side) => {
    const lines = [];
    if (data.blocks && Array.isArray(data.blocks)) {
      for (const b of data.blocks) {
        if (!b.paragraphs) continue;
        for (const p of b.paragraphs) {
          if (!p.lines) continue;
          for (const line of p.lines) {
            const text = line.text.trim();
            if (!text) continue;
            lines.push({
              side,
              text,
              confidence: line.confidence,
              bbox: line.bbox,
              words: (line.words || []).map((w) => ({
                text: w.text,
                confidence: w.confidence,
                bbox: w.bbox,
              })),
            });
          }
        }
      }
    }
    return lines;
  };

  const leftBlocks = parseBlocks(leftRes.data, 'LEFT');
  const rightBlocks = parseBlocks(rightRes.data, 'RIGHT');

  fs.writeFileSync(
    'docs/ocr_debug_step_c.json',
    JSON.stringify({ leftBlocks, rightBlocks }, null, 2),
    'utf8'
  );

  console.log(`\nStep C 총 라인: 좌측 ${leftBlocks.length}개, 우측 ${rightBlocks.length}개`);

  const allBlocks = [...leftBlocks, ...rightBlocks];

  const targets = [
    'identify',
    'associate',
    'condition',
    'employment',
    'lack',
    'managerial',
    'diligent',
    'familiar',
  ];

  console.log('\n=== Step C 목표 표제어 8개 정밀 탐색 ===');
  for (const t of targets) {
    const exact = allBlocks.filter((b) => b.text.toLowerCase().includes(t));
    if (exact.length > 0) {
      console.log(
        `[PASS] ${t}: ${exact.map((f) => `(${f.side} conf=${f.confidence.toFixed(1)}%) "${f.text}"`).join(' | ')}`
      );
    } else {
      console.log(`[MISS] ${t} -> 부분/유사 매칭 검색:`);
      for (const b of allBlocks) {
        const lower = b.text.toLowerCase();
        if (
          lower.includes(t.slice(0, 3)) ||
          lower.includes(t.slice(1, 4)) ||
          lower.includes(t.slice(-4)) ||
          t.includes(lower)
        ) {
          console.log(`   line: (${b.side} conf=${b.confidence.toFixed(1)}%) "${b.text}" bbox=${JSON.stringify(b.bbox)}`);
        }
      }
    }
  }
}

run().catch(console.error);
