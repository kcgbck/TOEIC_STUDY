// GATE-5: 범용 PDF 파서 및 문제 구조화 테스트 (지시서 35, 37, 72항)
import { describe, it, expect } from 'vitest';
import {
  convertPdfTextContentToBlocks,
} from '../src/pdf/generalPdfParser';
import { extractQuestionsFromOcrBlocks } from '../src/ocr/multipleChoiceExtractor';
import { classifyDocument } from '../src/ocr/documentClassifier';

describe('GATE-5 범용 PDF 텍스트 파싱 및 문제 추출 (generalPdfParser.test.ts)', () => {
  it('PDF 텍스트 레이어 아이템들을 웹 좌표계 RecognizedTextBlock으로 정상 변환해야 한다', () => {
    const mockTextContent = {
      items: [
        { str: '1. 다음 중 파이썬의 자료형이 아닌 것은?', transform: [1, 0, 0, 1, 50, 750], width: 250, height: 16 },
        { str: '① list', transform: [1, 0, 0, 1, 60, 720], width: 60, height: 16 },
        { str: '② tuple', transform: [1, 0, 0, 1, 150, 720], width: 60, height: 16 },
        { str: '③ dict', transform: [1, 0, 0, 1, 240, 720], width: 60, height: 16 },
        { str: '④ array_ptr', transform: [1, 0, 0, 1, 330, 720], width: 80, height: 16 },
      ],
    };

    const viewportHeight = 800;
    const blocks = convertPdfTextContentToBlocks(mockTextContent, viewportHeight);

    expect(blocks.length).toBe(5);
    expect(blocks[0].text).toBe('1. 다음 중 파이썬의 자료형이 아닌 것은?');
    expect(blocks[0].x).toBe(50);
    // 800 - 750 = 50 (좌상단 원점 변환)
    expect(blocks[0].y).toBe(50);
    expect(blocks[0].confidence).toBeGreaterThanOrEqual(0.9);

    // 문서 유형 판별
    const classification = classifyDocument(blocks);
    expect(classification.type).toBe('MULTIPLE_CHOICE');

    // 문항 구조화
    const result = extractQuestionsFromOcrBlocks(blocks, 'pdf-book-1');
    expect(result.questions.length).toBe(1);

    const q = result.questions[0];
    expect(q.questionNumber).toBe('1');
    expect(q.choiceCount).toBe(4);
    expect(q.choices.length).toBe(4);
    expect(q.choices[0].text).toBe('list');
    expect(q.choices[3].text).toBe('array_ptr');
  });

  it('다중 문항이 포함된 전자 PDF 텍스트 블록으로부터 연속된 QuestionItem들을 정확히 생성해야 한다', () => {
    const mockTextContent = {
      items: [
        { str: '1. 소프트웨어 생명주기 모델 중 폭포수 모델의 특징은?', transform: [1, 0, 0, 1, 30, 700], width: 300, height: 15 },
        { str: '① 순차적 접근', transform: [1, 0, 0, 1, 40, 670], width: 80, height: 15 },
        { str: '② 반복적 진화', transform: [1, 0, 0, 1, 140, 670], width: 80, height: 15 },
        { str: '③ 위험 분석 중심', transform: [1, 0, 0, 1, 240, 670], width: 90, height: 15 },
        { str: '④ 프로토타이핑', transform: [1, 0, 0, 1, 350, 670], width: 80, height: 15 },

        { str: '2. 다음 중 화이트박스 테스트 검증 기준이 아닌 것은? [정답: ④]', transform: [1, 0, 0, 1, 30, 600], width: 350, height: 15 },
        { str: '① 문장 검증 (Statement Coverage)', transform: [1, 0, 0, 1, 40, 570], width: 180, height: 15 },
        { str: '② 분기 검증 (Branch Coverage)', transform: [1, 0, 0, 1, 240, 570], width: 180, height: 15 },
        { str: '③ 조건 검증 (Condition Coverage)', transform: [1, 0, 0, 1, 40, 540], width: 180, height: 15 },
        { str: '④ 동등 분할 (Equivalence Partitioning)', transform: [1, 0, 0, 1, 240, 540], width: 220, height: 15 },
      ],
    };

    const blocks = convertPdfTextContentToBlocks(mockTextContent, 800);
    const result = extractQuestionsFromOcrBlocks(blocks, 'pdf-multi-test');

    expect(result.questions.length).toBe(2);

    // 1번 문항 (정답 미지정 -> missing)
    expect(result.questions[0].questionNumber).toBe('1');
    expect(result.questions[0].answerStatus).toBe('missing');
    expect(result.questions[0].choiceCount).toBe(4);

    // 2번 문항 (인라인 정답 ④ -> verified)
    expect(result.questions[1].questionNumber).toBe('2');
    expect(result.questions[1].answerStatus).toBe('verified');
    expect(result.questions[1].correctChoiceId).toBe(result.questions[1].choices[3].id);
    expect(result.questions[1].choices[3].text).toContain('동등 분할');
  });
});
