// 별도 정답표 파서 및 문항 자동 매핑 엔진 (GEN-01 지시서 20, 51, 52, 71항 준수)
import type { RecognizedTextBlock } from '../types/ocr';
import type { QuestionItem, AnswerEvidence } from '../types/question';

export interface ParsedAnswerKey {
  questionNumber: string;
  answerLabel: string; // 원본 표기 (예: ③, 3, C)
  answerNumber: number; // 1, 2, 3, 4, 5
  rawLine: string;
  confidence: number;
}

export interface AnswerMappingResult {
  mappedQuestions: QuestionItem[];
  matchedCount: number;
  unmatchedQuestionCount: number;
  unusedAnswerKeyCount: number;
  hasConflicts: boolean;
  warnings: string[];
}

// 정답표 행 패턴 (예: "1 ③", "2. 1", "3 - 4", "15: ②", "4) 3", "[5] ④")
// 한 줄에 여러 개 있는 경우도 지원: "1 ③  2 ②  3 ①  4 ④"
const ANSWER_KEY_TOKEN_REGEX =
  /(?:^|\s)(?:\[(\d{1,3})\]|(\d{1,3}))\s*(?:[\.\-\:\)]\s*)?([1-5①②③④⑤A-Ea-e])(?=\s|$)/g;

function labelToAnswerNumber(label: string): number {
  const map: Record<string, number> = {
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '①': 1, '②': 2, '③': 3, '④': 4, '⑤': 5,
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5,
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5,
  };
  return map[label] || 0;
}

/**
 * OCR 텍스트 블록들로부터 정답표 항목 추출
 */
export function extractAnswerKeys(blocks: RecognizedTextBlock[]): ParsedAnswerKey[] {
  if (!blocks || blocks.length === 0) return [];

  // y좌표 순 정렬
  const sortedBlocks = [...blocks].sort((a, b) => a.y - b.y || a.x - b.x);
  const results: ParsedAnswerKey[] = [];
  const seenNumbers = new Set<string>();

  for (const block of sortedBlocks) {
    const text = block.text.trim();
    if (!text) continue;

    const regex = new RegExp(ANSWER_KEY_TOKEN_REGEX.source, 'g');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const qNum = match[1] || match[2];
      const ansLabel = match[3];
      const ansNum = labelToAnswerNumber(ansLabel);

      if (qNum && ansNum >= 1 && ansNum <= 5) {
        if (!seenNumbers.has(qNum)) {
          seenNumbers.add(qNum);
          results.push({
            questionNumber: qNum,
            answerLabel: ansLabel,
            answerNumber: ansNum,
            rawLine: match[0].trim(),
            confidence: block.confidence || 0.9,
          });
        }
      }
    }
  }

  // 문제 번호 순 정렬
  return results.sort((a, b) => parseInt(a.questionNumber, 10) - parseInt(b.questionNumber, 10));
}

/**
 * 추출된 정답표를 문제 목록과 매핑 (지시서 51, 52항)
 */
export function mapAnswerKeysToQuestions(
  questions: QuestionItem[],
  answerKeys: ParsedAnswerKey[]
): AnswerMappingResult {
  const keyMap = new Map<string, ParsedAnswerKey>();
  for (const k of answerKeys) {
    keyMap.set(k.questionNumber, k);
  }

  const mappedQuestions: QuestionItem[] = [];
  const matchedKeyNumbers = new Set<string>();
  const warnings: string[] = [];
  let matchedCount = 0;
  let unmatchedQuestionCount = 0;
  let hasConflicts = false;

  for (const q of questions) {
    // 번호가 없는 임시 문항은 자동 정답 매핑 금지 (지시서 52항)
    if (!q.questionNumber || q.questionNumber.startsWith('temp')) {
      mappedQuestions.push(q);
      unmatchedQuestionCount++;
      warnings.push(`번호가 불명확한 문항(${q.id})은 정답표 자동 매핑에서 제외되었습니다`);
      continue;
    }

    const key = keyMap.get(q.questionNumber);
    if (!key) {
      // 정답표에 없는 문항
      mappedQuestions.push(q);
      unmatchedQuestionCount++;
      continue;
    }

    matchedKeyNumbers.add(q.questionNumber);

    // 선택지 범위 초과 검사 (예: 4지선다인데 정답이 5번)
    if (key.answerNumber > q.choiceCount || key.answerNumber > q.choices.length) {
      hasConflicts = true;
      warnings.push(
        `문제 ${q.questionNumber}번: 정답표 번호(${key.answerNumber})가 선택지 수(${q.choices.length})를 초과하여 needs_review로 보류되었습니다`
      );
      mappedQuestions.push({
        ...q,
        answerStatus: 'needs_review',
      });
      continue;
    }

    // 0-based 인덱스 매칭
    const targetChoice = q.choices[key.answerNumber - 1];
    if (!targetChoice) {
      hasConflicts = true;
      mappedQuestions.push({
        ...q,
        answerStatus: 'needs_review',
      });
      continue;
    }

    const answerEvidence: AnswerEvidence = {
      type: 'ANSWER_KEY',
      rawText: key.rawLine,
      confidence: key.confidence,
    };

    mappedQuestions.push({
      ...q,
      correctChoiceId: targetChoice.id,
      answerStatus: 'verified',
      answerEvidence,
      answerConfidence: key.confidence >= 0.8 ? 'high' : 'medium',
      isUserConfirmed: true,
    });
    matchedCount++;
  }

  const unusedAnswerKeyCount = answerKeys.length - matchedKeyNumbers.size;
  if (unusedAnswerKeyCount > 0) {
    warnings.push(`정답표의 ${unusedAnswerKeyCount}개 항목이 문제 목록과 일치하지 않았습니다`);
  }

  return {
    mappedQuestions,
    matchedCount,
    unmatchedQuestionCount,
    unusedAnswerKeyCount,
    hasConflicts,
    warnings,
  };
}
