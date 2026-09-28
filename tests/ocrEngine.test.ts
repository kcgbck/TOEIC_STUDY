import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { extractVocabularyFromOcrBlocks } from '../src/ocr/vocabularyExtractor';
import type { RecognizedTextBlock } from '../src/types/ocr';

describe('OCR 어휘 추출 파이프라인 (합성 Fixture 기반 검증)', () => {
  const fixturePath = path.resolve(__dirname, 'fixtures/ocr_blocks.json');
  const fixtures = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

  it('합성 2면 레이아웃 블록으로부터 표제어와 뜻을 올바르게 결합해야 한다', () => {
    const fixture1 = fixtures[0];
    const blocks: RecognizedTextBlock[] = fixture1.blocks;
    const words = extractVocabularyFromOcrBlocks(blocks);

    expect(words.length).toBe(fixture1.expectedWords.length);

    for (let i = 0; i < words.length; i++) {
      expect(words[i].word).toBe(fixture1.expectedWords[i].word);
      expect(words[i].meaning).toContain(fixture1.expectedWords[i].meaning);
      if (fixture1.expectedWords[i].partOfSpeech) {
        expect(words[i].partOfSpeech).toBe(fixture1.expectedWords[i].partOfSpeech);
      }
    }
  });

  it('긴 예문이나 노이즈 URL/헤더는 표제어로 오인하지 않아야 한다', () => {
    const fixture2 = fixtures[1];
    const blocks: RecognizedTextBlock[] = fixture2.blocks;
    const words = extractVocabularyFromOcrBlocks(blocks);

    expect(words.length).toBe(fixture2.expectedWords.length);
    expect(words[0].word).toBe('expand');
    expect(words[0].meaning).toContain('확장하다');
    expect(words[0].partOfSpeech).toBe('동사');
  });
});
