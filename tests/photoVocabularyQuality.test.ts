import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { extractVocabularyFromOcrBlocks } from '../src/ocr/vocabularyExtractor';
import type { RecognizedTextBlock } from '../src/types/ocr';

describe('P0-A 사진 OCR 품질 및 어휘 추출 안전화 (지시서 P0-C)', () => {
  const fixturePath = path.resolve(__dirname, 'fixtures/synthetic_ocr_8types.json');
  const fixtures = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

  it('8종 합성 fixture 데이터셋 전체를 정상 추출해야 한다', () => {
    expect(fixtures.length).toBe(8);

    for (const fixture of fixtures) {
      const extracted = extractVocabularyFromOcrBlocks(fixture.blocks);
      expect(extracted.length).toBeGreaterThan(0);

      const expected = fixture.expectedWords[0];
      const match = extracted.find((w) => w.word === expected.word);
      expect(match).toBeDefined();

      if (expected.meaning) {
        expect(match!.meaning).toContain(expected.meaning.split(',')[0].trim());
      }
      if (expected.partOfSpeech) {
        expect(match!.partOfSpeech).toBe(expected.partOfSpeech);
      }
      if (expected.side) {
        expect(match!.side).toBe(expected.side);
      }
      if (expected.pairConfidence) {
        expect(match!.pairConfidence).toBe(expected.pairConfidence);
      }
      if (expected.isExcluded !== undefined) {
        expect(match!.isExcluded).toBe(expected.isExcluded);
      }
      if (expected.recommended) {
        expect(match!.recommendedWord).toBe(expected.recommended);
      }
    }
  });

  it('[Hard Gate 1] 다른 열의 뜻과 절대 연결되지 않아야 한다 (좌/우 열 독립성)', () => {
    // LEFT에 word="delegate", RIGHT에 word="eligible"이 있고, 서로 다른 위치에 뜻이 있을 때
    const spreadBlocks: RecognizedTextBlock[] = [
      { text: "10 delegate **", x: 50, y: 100, width: 120, height: 24, confidence: 0.95, side: "LEFT" },
      { text: "20 eligible **", x: 550, y: 100, width: 120, height: 24, confidence: 0.95, side: "RIGHT" },
      { text: "v. 위임하다", x: 50, y: 140, width: 100, height: 22, confidence: 0.92, side: "LEFT" },
      { text: "adj. 자격이 있는", x: 550, y: 140, width: 130, height: 22, confidence: 0.91, side: "RIGHT" },
    ];

    const results = extractVocabularyFromOcrBlocks(spreadBlocks);
    const delegate = results.find((r) => r.word === 'delegate');
    const eligible = results.find((r) => r.word === 'eligible');

    expect(delegate).toBeDefined();
    expect(eligible).toBeDefined();

    // delegate의 뜻은 절대 RIGHT의 '자격이 있는'을 가져오면 안 됨
    expect(delegate!.meaning).toContain('위임하다');
    expect(delegate!.meaning).not.toContain('자격이 있는');

    // eligible의 뜻은 절대 LEFT의 '위임하다'를 가져오면 안 됨
    expect(eligible!.meaning).toContain('자격이 있는');
    expect(eligible!.meaning).not.toContain('위임하다');
  });

  it('[Hard Gate 2] 다음 단어의 뜻 영역을 절대 침범하지 않아야 한다 (표제어 경계 보장)', () => {
    // 단어 A에 뜻이 누락되어도, 바로 아래 단어 B의 뜻을 단어 A가 가로채지 않아야 함
    const boundaryBlocks: RecognizedTextBlock[] = [
      { text: "11 identify **", x: 60, y: 50, width: 120, height: 24, confidence: 0.95, side: "SINGLE" },
      // identify 바로 아래에 뜻이 없고 바로 다음 표제어가 나옴
      { text: "12 associate **", x: 60, y: 120, width: 130, height: 24, confidence: 0.95, side: "SINGLE" },
      { text: "v. 관련시키다", x: 60, y: 150, width: 140, height: 22, confidence: 0.92, side: "SINGLE" },
    ];

    const results = extractVocabularyFromOcrBlocks(boundaryBlocks);
    const identify = results.find((r) => r.word === 'identify');
    const associate = results.find((r) => r.word === 'associate');

    // identify는 뜻이 없으므로 associate의 뜻을 침범해서 가져가면 안 됨!
    if (identify) {
      expect(identify.meaning).not.toContain('관련시키다');
    }
    // associate가 올바르게 자기 뜻을 가져야 함
    expect(associate).toBeDefined();
    expect(associate!.meaning).toContain('관련시키다');
  });

  it('[Hard Gate 3] 낮은 신뢰도 단어는 자동 저장 대상에서 100% 제외되어야 한다 (isExcluded = true)', () => {
    const noisyBlocks: RecognizedTextBlock[] = [
      { text: "?? 99 gitigent ~", x: 100, y: 200, width: 110, height: 20, confidence: 0.25, side: "SINGLE" },
      { text: "깨진글자 @!#$", x: 100, y: 240, width: 80, height: 18, confidence: 0.2, side: "SINGLE" },
      { text: "01 valid **", x: 100, y: 300, width: 100, height: 24, confidence: 0.95, side: "SINGLE" },
      { text: "adj. 유효한", x: 100, y: 330, width: 120, height: 22, confidence: 0.93, side: "SINGLE" },
    ];

    const results = extractVocabularyFromOcrBlocks(noisyBlocks);
    const lowConfWord = results.find((r) => r.word === 'gitigent');
    const validWord = results.find((r) => r.word === 'valid');

    expect(validWord).toBeDefined();
    expect(validWord!.pairConfidence).toBe('high');
    expect(validWord!.isExcluded).toBe(false);

    if (lowConfWord) {
      // low 신뢰도 단어는 반드시 pairConfidence === 'low'이고 isExcluded === true 여야 함!
      expect(lowConfWord.pairConfidence).toBe('low');
      expect(lowConfWord.isExcluded).toBe(true);
    }

    // 자동 저장 필터 시뮬레이션: pairConfidence !== 'low' && !isExcluded
    const autoSaveList = results.filter((r) => r.pairConfidence !== 'low' && !r.isExcluded);
    expect(autoSaveList.some((w) => w.word === 'gitigent')).toBe(false);
    expect(autoSaveList.length).toBe(1);
    expect(autoSaveList[0].word).toBe('valid');
  });

  it('[Hard Gate 4] 자동 철자 교정을 금지하고 추천 후보(recommendation)만 제공해야 한다 (지시서 8항)', () => {
    const misspelledBlocks: RecognizedTextBlock[] = [
      { text: "26 gitigent **", x: 50, y: 100, width: 120, height: 24, confidence: 0.7, side: "SINGLE" },
      { text: "adj. 성실한, 근면한", x: 50, y: 130, width: 150, height: 22, confidence: 0.88, side: "SINGLE" },
    ];

    const results = extractVocabularyFromOcrBlocks(misspelledBlocks);
    expect(results.length).toBe(1);
    // 원문 철자 gitigent 보존 (diligent로 자동 변경 금지!)
    expect(results[0].word).toBe('gitigent');
    // 추천 필드에는 diligent 제공
    expect(results[0].recommendedWord).toBe('diligent');
  });

  it('[Hard Gate 5] 긴 예문 번역은 단어 뜻과 분리되어야 한다 (지시서 11, 12항)', () => {
    const exampleBlocks: RecognizedTextBlock[] = [
      { text: "05 implement **", x: 60, y: 100, width: 130, height: 24, confidence: 0.95, side: "SINGLE" },
      { text: "v. 실행하다, 이행하다", x: 60, y: 130, width: 150, height: 22, confidence: 0.92, side: "SINGLE" },
      { text: "The board decided to implement the new policy immediately.", x: 60, y: 160, width: 420, height: 20, confidence: 0.89, side: "SINGLE" },
      { text: "이사회는 새로운 정책을 즉시 실행하기로 결정했다.", x: 60, y: 185, width: 380, height: 20, confidence: 0.85, side: "SINGLE" },
    ];

    const results = extractVocabularyFromOcrBlocks(exampleBlocks);
    expect(results.length).toBe(1);
    const item = results[0];

    expect(item.word).toBe('implement');
    expect(item.meaning).toBe('실행하다, 이행하다');
    // 긴 예문 문장이 meaning에 섞여 들어가지 않아야 함
    expect(item.meaning).not.toContain('이사회는 새로운 정책을');
    // exampleSentence가 올바르게 캡처되었는지 확인
    expect(item.exampleSentence).toContain('The board decided to implement');
  });
});
