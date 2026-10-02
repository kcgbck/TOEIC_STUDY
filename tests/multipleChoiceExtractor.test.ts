// GATE-3: 객관식 문제 추출기 테스트 (지시서 14~21, 70, 76항)
import { describe, it, expect } from 'vitest';
import { extractQuestionsFromOcrBlocks } from '../src/ocr/multipleChoiceExtractor';
import type { RecognizedTextBlock } from '../src/types/ocr';

describe('GATE-3 객관식 문제 추출기 (multipleChoiceExtractor.test.ts)', () => {
  it('인라인 정답이 있는 4지선다 문항을 문제 번호, 본문, 선택지, 정답으로 완벽히 구조화해야 한다', () => {
    const blocks: RecognizedTextBlock[] = [
      { text: '15. 다음 중 해시 함수의 충돌 회피 알고리즘이 아닌 것은? [정답: ③]', x: 20, y: 10, width: 450, height: 25, confidence: 0.95 },
      { text: '① 개방 주소 지정법 (Open Addressing)', x: 30, y: 40, width: 250, height: 20, confidence: 0.9 },
      { text: '② 체이닝 (Chaining)', x: 30, y: 65, width: 200, height: 20, confidence: 0.9 },
      { text: '③ 다익스트라 알고리즘 (Dijkstra Algorithm)', x: 30, y: 90, width: 280, height: 20, confidence: 0.9 },
      { text: '④ 선형 탐사법 (Linear Probing)', x: 30, y: 115, width: 220, height: 20, confidence: 0.9 },
    ];

    const result = extractQuestionsFromOcrBlocks(blocks, 'book-test');
    expect(result.totalDetected).toBe(1);
    expect(result.validCount).toBe(1);
    expect(result.missingAnswerCount).toBe(0);

    const q = result.questions[0];
    expect(q.questionNumber).toBe('15');
    expect(q.stem).toContain('다음 중 해시 함수의 충돌 회피 알고리즘이 아닌 것은?');
    // 본문에서 [정답: ③] 태그가 정리되었는지 확인
    expect(q.stem).not.toContain('[정답: ③]');

    expect(q.choiceCount).toBe(4);
    expect(q.choices.length).toBe(4);
    expect(q.choices[0].text).toContain('개방 주소 지정법');
    expect(q.choices[2].text).toContain('다익스트라 알고리즘');

    // 3번 선택지가 정답으로 연결되었는지 확인
    expect(q.correctChoiceId).toBe(q.choices[2].id);
    expect(q.answerStatus).toBe('verified');
    expect(q.answerEvidence?.type).toBe('INLINE_MARK');

    // 바운딩 박스 검증
    expect(q.sourceBounds).toBeDefined();
    expect(q.sourceBounds?.x).toBe(20);
    expect(q.sourceBounds?.y).toBe(10);
  });

  it('한 행에 여러 선택지가 나열된 5지선다 문항도 정확히 5개로 분할 파싱해야 한다', () => {
    const blocks: RecognizedTextBlock[] = [
      { text: '1. 다음 중 OSI 7계층에서 종단 간 신뢰성 있는 전송을 담당하는 계층은?', x: 20, y: 10, width: 500, height: 25, confidence: 0.92 },
      { text: '① 물리 계층  ② 데이터링크 계층  ③ 네트워크 계층', x: 30, y: 45, width: 450, height: 20, confidence: 0.9 },
      { text: '④ 전송 계층  ⑤ 세션 계층', x: 30, y: 70, width: 300, height: 20, confidence: 0.9 },
    ];

    const result = extractQuestionsFromOcrBlocks(blocks, 'book-test');
    expect(result.totalDetected).toBe(1);

    const q = result.questions[0];
    expect(q.choiceCount).toBe(5);
    expect(q.choices.length).toBe(5);
    expect(q.choices[0].sourceLabel).toBe('①');
    expect(q.choices[0].text).toBe('물리 계층');
    expect(q.choices[3].sourceLabel).toBe('④');
    expect(q.choices[3].text).toBe('전송 계층');
    expect(q.choices[4].sourceLabel).toBe('⑤');
    expect(q.choices[4].text).toBe('세션 계층');

    // 정답 표기가 없으므로 missing 이어야 하며, 절대 임의로 정답을 지어내지 않아야 함 (지시서 21항)
    expect(q.correctChoiceId).toBeUndefined();
    expect(q.answerStatus).toBe('missing');
  });

  it('정답이 없는 연속 2개 문제 추출 시 정답을 임의 생성하지 않고 missing으로 분류해야 한다', () => {
    const blocks: RecognizedTextBlock[] = [
      { text: '1. 첫 번째 문제입니다.', x: 10, y: 10, width: 200, height: 20, confidence: 0.9 },
      { text: '① 보기A ② 보기B ③ 보기C ④ 보기D', x: 10, y: 35, width: 300, height: 20, confidence: 0.9 },
      { text: '2. 두 번째 문제입니다.', x: 10, y: 70, width: 200, height: 20, confidence: 0.9 },
      { text: '1) 선택1 2) 선택2 3) 선택3 4) 선택4', x: 10, y: 95, width: 300, height: 20, confidence: 0.9 },
    ];

    const result = extractQuestionsFromOcrBlocks(blocks, 'book-test');
    expect(result.totalDetected).toBe(2);
    expect(result.missingAnswerCount).toBe(2);

    expect(result.questions[0].correctChoiceId).toBeUndefined();
    expect(result.questions[0].answerStatus).toBe('missing');
    expect(result.questions[1].correctChoiceId).toBeUndefined();
    expect(result.questions[1].answerStatus).toBe('missing');
  });
});
