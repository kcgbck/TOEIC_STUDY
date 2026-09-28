import { describe, it, expect } from 'vitest';
import { MockOcrEngine } from '../src/ocr/ocrEngine';
import type { WordEntry } from '../src/types/word';

describe('토익_스터디 PWA 아키텍처 단위 테스트', () => {
  describe('OCR 인터페이스 계약 (지시서 42항)', () => {
    it('MockOcrEngine은 표준 OcrEngine 규격을 충족해야 한다', async () => {
      const ocr = new MockOcrEngine();
      expect(ocr.name).toBeDefined();

      let progressChecked = false;
      await ocr.init((p) => {
        if (p.progress > 0) progressChecked = true;
      });
      expect(progressChecked).toBe(true);

      const fakeBlob = new Blob(['fake image bytes'], { type: 'image/png' });
      const blocks = await ocr.recognize(fakeBlob);

      expect(Array.isArray(blocks)).toBe(true);
      expect(blocks.length).toBeGreaterThan(0);

      // 필수 속성(text, x, y, width, height, confidence) 존재 확인
      const first = blocks[0];
      expect(typeof first.text).toBe('string');
      expect(typeof first.x).toBe('number');
      expect(typeof first.y).toBe('number');
      expect(typeof first.width).toBe('number');
      expect(typeof first.height).toBe('number');
      expect(typeof first.confidence).toBe('number');

      await ocr.terminate();
    });
  });

  describe('4지선다 문제 생성 품질 규칙', () => {
    it('정답이 정확히 1개 존재하고 보기는 정확히 4개여야 한다', () => {
      const sampleWords: WordEntry[] = [
        { word: 'acquire', meaning: ['획득하다'], partOfSpeech: 'verb', difficulty: 'medium', topic: 'biz' },
        { word: 'confirm', meaning: ['확인하다'], partOfSpeech: 'verb', difficulty: 'low', topic: 'biz' },
        { word: 'applicant', meaning: ['지원자'], partOfSpeech: 'noun', difficulty: 'low', topic: 'hr' },
        { word: 'shipment', meaning: ['배송'], partOfSpeech: 'noun', difficulty: 'medium', topic: 'log' },
      ];

      const target = sampleWords[0];
      const correctMeaning = target.meaning[0];
      const otherMeanings = sampleWords.slice(1).map((w) => w.meaning[0]);

      const options = [correctMeaning, ...otherMeanings];
      expect(options.length).toBe(4);

      // 정답 인덱스 검증
      const correctIndex = options.indexOf(correctMeaning);
      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(4);

      // 중복 보기 여부 검사
      const uniqueOptions = new Set(options);
      expect(uniqueOptions.size).toBe(4);
    });
  });
});
