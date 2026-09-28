import fs from 'fs';
import { createWorker } from 'tesseract.js';

async function run() {
  console.log('Tesseract 워커 초기화 중...');
  const worker = await createWorker(['eng', 'kor']);

  const imagePath = 'docs/샘플.png';
  const buf = fs.readFileSync(imagePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);

  const leftWidth = Math.round(width * 0.52);
  const rightStart = Math.round(width * 0.48);
  const rightWidth = width - rightStart;

  console.log(`이미지 크기: ${width}x${height}`);
  console.log(`좌측 영역: 0, 0, ${leftWidth}, ${height}`);
  console.log(`우측 영역: ${rightStart}, 0, ${rightWidth}, ${height}`);

  console.log('\n--- 좌측 영역 OCR 인식 중 ---');
  const leftRes = await worker.recognize(
    imagePath,
    { rectangle: { left: 0, top: 0, width: leftWidth, height: height } },
    { blocks: true }
  );

  console.log('\n--- 우측 영역 OCR 인식 중 ---');
  const rightRes = await worker.recognize(
    imagePath,
    { rectangle: { left: rightStart, top: 0, width: rightWidth, height: height } },
    { blocks: true }
  );

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

  const allBlocks = [...leftBlocks, ...rightBlocks];

  fs.writeFileSync('docs/ocr_debug_raw.json', JSON.stringify({
    image: { width, height },
    leftBlocks,
    rightBlocks
  }, null, 2), 'utf8');

  console.log(`\n총 라인 수: 좌측 ${leftBlocks.length}개, 우측 ${rightBlocks.length}개`);
  console.log('결과가 docs/ocr_debug_raw.json 에 저장되었습니다.');

  // 목표 표제어 8개 매칭 추적
  const targets = ['identify', 'associate', 'condition', 'employment', 'lack', 'managerial', 'diligent', 'familiar'];
  console.log('\n=== 목표 표제어 8개 raw OCR 매칭 현황 ===');
  for (const t of targets) {
    const found = allBlocks.filter(b => b.text.toLowerCase().includes(t));
    if (found.length > 0) {
      console.log(`[PASS] ${t}: ${found.map(f => `(${f.side} L${f.lineIndex}, conf=${f.confidence.toFixed(1)}%) "${f.text}"`).join(' | ')}`);
    } else {
      console.log(`[MISS] ${t} -> 유사 검색 중...`);
      // 단어별로 부분 일치 검색
      for (const b of allBlocks) {
        for (const w of b.words) {
          if (w.text.length >= 3 && (w.text.toLowerCase().includes(t.slice(1, 4)) || t.includes(w.text.toLowerCase()))) {
            console.log(`   후보 발견: (${b.side} L${b.lineIndex}) word="${w.text}" (conf=${w.confidence.toFixed(1)}%) line="${b.text}" bbox=${JSON.stringify(w.bbox)}`);
          }
        }
      }
    }
  }
}

run().catch(console.error);
