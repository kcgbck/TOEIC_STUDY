import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { extractVocabularyFromPdf, inspectPdfDocument, parseLineItems } from '../src/pdf/pdfParser';

describe('PDF 단어 추출 파이프라인 (합성 Fixture 및 로컬 회귀)', () => {
  const fixturePath = path.resolve(__dirname, 'fixtures/vocabulary_rows.json');
  const syntheticRows = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

  it('합성 텍스트 라인 아이템으로부터 단어번호, 표제어, 품사, 뜻을 파싱해야 한다', () => {
    for (const row of syntheticRows) {
      const parsed = parseLineItems(row.items);
      expect(parsed).not.toBeNull();
      expect(parsed?.num).toBe(row.expected.num);
      expect(parsed?.word).toBe(row.expected.word);
      expect(parsed?.partOfSpeech).toBe(row.expected.partOfSpeech);
      expect(parsed?.meaning).toContain(row.expected.meaning);
    }
  });

  const samplePdfPath = path.resolve(__dirname, '../docs/샘플.pdf');
  const hasLocalSample = fs.existsSync(samplePdfPath);

  // 로컬에 샘플 PDF가 있을 경우에만 실행하는 회귀 검증
  if (hasLocalSample) {
    it('[로컬 회귀] inspectPdfDocument가 총 4페이지와 텍스트 레이어를 감지해야 한다', async () => {
      const fileBuffer = fs.readFileSync(samplePdfPath);
      const result = await inspectPdfDocument(fileBuffer.buffer);

      expect(result.totalPages).toBe(4);
      expect(result.hasTextLayer).toBe(true);
      expect(result.firstPageTextSample).toContain('substitute');
    });

    it('[로컬 회귀] extractVocabularyFromPdf가 100개 토익 단어를 90개 이상 추출해야 한다', async () => {
      const fileBuffer = fs.readFileSync(samplePdfPath);
      const result = await extractVocabularyFromPdf(fileBuffer.buffer);

      expect(result.totalPages).toBe(4);
      expect(result.hasTextLayer).toBe(true);
      expect(result.successCount).toBeGreaterThanOrEqual(95);

      const firstWord = result.extractedWords.find((w) => w.word.toLowerCase() === 'substitute' || w.word.toLowerCase() === 'alternative') || result.extractedWords[0];
      expect(firstWord).toBeDefined();
      expect(firstWord?.meaning.length).toBeGreaterThan(0);
    });
  }
});
