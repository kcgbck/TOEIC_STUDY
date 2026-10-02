// GATE-3: 문서 유형 판별기 테스트 (지시서 11, 12, 76항)
import { describe, it, expect } from 'vitest';
import { classifyDocument } from '../src/ocr/documentClassifier';
import type { RecognizedTextBlock } from '../src/types/ocr';

describe('GATE-3 문서 유형 자동 판별기 (questionDocumentClassifier.test.ts)', () => {
  it('영어 표제어와 품사 태그, 한글 뜻이 있는 텍스트는 VOCABULARY로 판별해야 한다', () => {
    const vocabBlocks: RecognizedTextBlock[] = [
      { text: '1. reserve', x: 20, y: 10, width: 80, height: 20, confidence: 0.9 },
      { text: '(동) 예약하다, 보류하다', x: 120, y: 10, width: 150, height: 20, confidence: 0.9 },
      { text: '2. invoice', x: 20, y: 40, width: 80, height: 20, confidence: 0.9 },
      { text: '(명) 송장, 청구서', x: 120, y: 40, width: 150, height: 20, confidence: 0.9 },
      { text: '3. delegate', x: 20, y: 70, width: 80, height: 20, confidence: 0.9 },
      { text: 'v. 위임하다; n. 대표자', x: 120, y: 70, width: 160, height: 20, confidence: 0.9 },
    ];

    const result = classifyDocument(vocabBlocks);
    expect(result.type).toBe('VOCABULARY');
    expect(result.confidence).toBeGreaterThanOrEqual(0.7);
    expect(result.reasons.length).toBeGreaterThan(0);
  });

  it('문제 번호와 객관식 선택지 기호(①~④)가 있는 텍스트는 MULTIPLE_CHOICE로 판별해야 한다', () => {
    const mcBlocks: RecognizedTextBlock[] = [
      { text: '1. 다음 중 운영체제의 목적이 아닌 것은?', x: 20, y: 20, width: 300, height: 25, confidence: 0.95 },
      { text: '① 처리능력 향상', x: 30, y: 55, width: 120, height: 20, confidence: 0.9 },
      { text: '② 반환시간 증가', x: 160, y: 55, width: 120, height: 20, confidence: 0.9 },
      { text: '③ 사용가능도 향상', x: 30, y: 85, width: 120, height: 20, confidence: 0.9 },
      { text: '④ 신뢰도 향상', x: 160, y: 85, width: 120, height: 20, confidence: 0.9 },
      { text: '2. 프로세스 상태 전이 중 준비 상태에서 실행 상태로 전이되는 과정은?', x: 20, y: 120, width: 350, height: 25, confidence: 0.95 },
      { text: '① Dispatch', x: 30, y: 155, width: 100, height: 20, confidence: 0.9 },
      { text: '② Wake up', x: 140, y: 155, width: 100, height: 20, confidence: 0.9 },
      { text: '③ Block', x: 250, y: 155, width: 100, height: 20, confidence: 0.9 },
      { text: '④ Timeout', x: 360, y: 155, width: 100, height: 20, confidence: 0.9 },
    ];

    const result = classifyDocument(mcBlocks);
    expect(result.type).toBe('MULTIPLE_CHOICE');
    expect(result.confidence).toBeGreaterThanOrEqual(0.8);
  });

  it('번호와 정답 번호 쌍으로만 이루어진 텍스트는 ANSWER_KEY로 판별해야 한다', () => {
    const answerKeyBlocks: RecognizedTextBlock[] = [
      { text: '1. 3', x: 20, y: 20, width: 40, height: 20, confidence: 0.9 },
      { text: '2. 1', x: 20, y: 45, width: 40, height: 20, confidence: 0.9 },
      { text: '3. 4', x: 20, y: 70, width: 40, height: 20, confidence: 0.9 },
      { text: '4. 2', x: 20, y: 95, width: 40, height: 20, confidence: 0.9 },
      { text: '5. 5', x: 20, y: 120, width: 40, height: 20, confidence: 0.9 },
    ];

    const result = classifyDocument(answerKeyBlocks);
    expect(result.type).toBe('ANSWER_KEY');
    expect(result.confidence).toBeGreaterThanOrEqual(0.7);
  });

  it('기호가 없거나 모호한 일반 텍스트는 UNKNOWN으로 판정해야 한다', () => {
    const genericBlocks: RecognizedTextBlock[] = [
      { text: '안녕하세요. 오늘의 공지사항입니다.', x: 10, y: 10, width: 200, height: 20, confidence: 0.9 },
      { text: '회의는 2시부터 시작됩니다.', x: 10, y: 40, width: 180, height: 20, confidence: 0.9 },
    ];

    const result = classifyDocument(genericBlocks);
    expect(result.type).toBe('UNKNOWN');
  });
});
