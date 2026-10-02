// 일반 객관식 OCR 파서 (GEN-01 지시서 14~21, 23항 준수)
import type { RecognizedTextBlock, ConfidenceLevel } from '../types/ocr';
import type { QuestionItem, QuestionChoice, AnswerEvidence } from '../types/question';

export interface QuestionExtractionResult {
  questions: QuestionItem[];
  totalDetected: number;
  validCount: number;
  needsReviewCount: number;
  missingAnswerCount: number;
}

// 문제 번호 시작 패턴 (예: "1.", "2)", "[3]", "15.", "문 4.")
const Q_START_REGEX = /^(?:문\s*(\d{1,3})|(\d{1,3})[\.\)\]]|\((\d{1,3})\))\s*(.*)$/;

// 선택지 분할 패턴 (①~⑤, (1)~(5), 1)~5), A.~E., 가.~마.)
const CHOICE_SPLIT_REGEX = /([①②③④⑤]|\([1-5]\)|[1-5]\)|\b[A-E]\.|\b[가-마]\.)/g;

// 인라인 정답 표시 패턴 (예: "정답: ③", "[답: 2]", "정답 ④", "답 3")
const INLINE_ANSWER_REGEX = /(?:정답|답)\s*[:：]?\s*([①②③④⑤1-5A-Ea-e])/i;

function normalizeLabelToNumber(label: string): string {
  const map: Record<string, string> = {
    '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5',
    '(1)': '1', '(2)': '2', '(3)': '3', '(4)': '4', '(5)': '5',
    '1)': '1', '2)': '2', '3)': '3', '4)': '4', '5)': '5',
    'A.': '1', 'B.': '2', 'C.': '3', 'D.': '4', 'E.': '5',
    'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5',
    '가.': '1', '나.': '2', '다.': '3', '라.': '4', '마.': '5',
  };
  const trimmed = label.trim();
  return map[trimmed] || trimmed.replace(/[\(\)\.\s]/g, '');
}

interface RawQuestionBlock {
  questionNumber?: string;
  stemLines: string[];
  choiceLines: string[];
  blocks: RecognizedTextBlock[];
}

/**
 * OCR 텍스트 블록 배열로부터 객관식 문제 목록 구조화 추출
 */
export function extractQuestionsFromOcrBlocks(
  blocks: RecognizedTextBlock[],
  bookId: string = 'imported-book'
): QuestionExtractionResult {
  if (!blocks || blocks.length === 0) {
    return {
      questions: [],
      totalDetected: 0,
      validCount: 0,
      needsReviewCount: 0,
      missingAnswerCount: 0,
    };
  }

  // 1. y좌표 기준 정렬 (동일 y 부근은 x좌표 정렬)
  const sortedBlocks = [...blocks].sort((a, b) => {
    if (Math.abs(a.y - b.y) > 12) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });

  // 2. 문제 경계 인식: 문제 번호가 등장할 때마다 새 QuestionBlock으로 분리
  const rawBlocks: RawQuestionBlock[] = [];
  let currentRaw: RawQuestionBlock | null = null;
  let inChoicesMode = false;

function isChoiceLine(text: string, hasStem: boolean): boolean {
  // 1. 선택지 기호가 2개 이상 들어있으면 무조건 선택지 라인 (예: "① A ② B", "1) A 2) B")
  const splitMatches = text.match(CHOICE_SPLIT_REGEX);
  if (splitMatches && splitMatches.length >= 2) {
    return true;
  }
  // 2. 원문자(①~⑤)로 시작하면 무조건 선택지
  if (/^[①②③④⑤]/.test(text)) {
    return true;
  }
  // 3. 본문이 이미 수집된 상태에서 1), (1), A., 가. 등으로 시작하면 선택지
  if (hasStem && /^(?:[1-5]\)|\([1-5]\)|[A-E]\.|[가-마]\.)/.test(text)) {
    return true;
  }
  return false;
}

  for (const block of sortedBlocks) {
    const text = block.text.trim();
    if (!text) continue;

    const hasStem = !!(currentRaw && currentRaw.stemLines.length > 0);
    const isChoice = isChoiceLine(text, hasStem);

    // 문제 번호 시작 검사 (단, 선택지 라인이 아닐 때만)
    const qMatch = !isChoice ? text.match(Q_START_REGEX) : null;
    if (qMatch) {
      // 새 문제 시작
      if (currentRaw) {
        rawBlocks.push(currentRaw);
      }
      const qNum = qMatch[1] || qMatch[2] || qMatch[3];
      const restText = qMatch[4] || '';

      currentRaw = {
        questionNumber: qNum,
        stemLines: restText ? [restText] : [],
        choiceLines: [],
        blocks: [block],
      };
      inChoicesMode = false;
      continue;
    }

    if (!currentRaw) {
      // 문제 번호 없이 시작된 텍스트면 임시 문제 생성
      currentRaw = {
        stemLines: [text],
        choiceLines: [],
        blocks: [block],
      };
      continue;
    }

    currentRaw.blocks.push(block);

    // 선택지 시작 여부 확인
    if (CHOICE_SPLIT_REGEX.test(text)) {
      inChoicesMode = true;
    }

    if (inChoicesMode) {
      currentRaw.choiceLines.push(text);
    } else {
      currentRaw.stemLines.push(text);
    }
  }

  if (currentRaw) {
    rawBlocks.push(currentRaw);
  }

  // 3. 각 RawQuestionBlock에서 문제 본문, 선택지, 정답 추출
  const questions: QuestionItem[] = [];
  let validCount = 0;
  let needsReviewCount = 0;
  let missingAnswerCount = 0;

  for (let idx = 0; idx < rawBlocks.length; idx++) {
    const raw = rawBlocks[idx];
    const qNum = raw.questionNumber || String(idx + 1);

    // 본문 조합
    let stem = raw.stemLines.join(' ').replace(/\s+/g, ' ').trim();

    // 선택지 파싱
    const allChoiceText = raw.choiceLines.join('\n');
    const parsedChoices = parseChoicesFromText(allChoiceText, qNum);

    // 인라인 정답 탐색 (본문 또는 선택지 라인에서 탐색)
    let inlineAnswerMark: string | undefined = undefined;
    const fullText = [...raw.stemLines, ...raw.choiceLines].join(' ');
    const ansMatch = fullText.match(INLINE_ANSWER_REGEX);
    if (ansMatch) {
      inlineAnswerMark = normalizeLabelToNumber(ansMatch[1]);
    }

    // 본문에서 정답 문구 제거 (예: "정답: ③")
    if (ansMatch) {
      stem = stem.replace(ansMatch[0], '').trim();
    }

    // 바운딩 박스 계산
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let avgConfidence = 0;
    for (const b of raw.blocks) {
      minX = Math.min(minX, b.x);
      minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x + b.width);
      maxY = Math.max(maxY, b.y + b.height);
      avgConfidence += (b.confidence || 0.8);
    }
    avgConfidence = raw.blocks.length > 0 ? avgConfidence / raw.blocks.length : 0.8;
    if (avgConfidence > 1.0) avgConfidence /= 100; // 0~100 스케일 보정

    const sourceBounds = isFinite(minX) ? {
      x: Math.round(minX),
      y: Math.round(minY),
      width: Math.round(maxX - minX),
      height: Math.round(maxY - minY),
    } : undefined;

    // 정답 매핑
    let correctChoiceId: string | undefined = undefined;
    let answerStatus: 'verified' | 'needs_review' | 'missing' = 'missing';
    let answerEvidence: AnswerEvidence | undefined = undefined;

    if (inlineAnswerMark) {
      const matchedChoice = parsedChoices.find(
        (c) => normalizeLabelToNumber(c.sourceLabel) === inlineAnswerMark
      );
      if (matchedChoice) {
        correctChoiceId = matchedChoice.id;
        answerStatus = avgConfidence >= 0.75 ? 'verified' : 'needs_review';
        answerEvidence = {
          type: 'INLINE_MARK',
          rawText: ansMatch ? ansMatch[0] : inlineAnswerMark,
          confidence: avgConfidence,
        };
      } else {
        answerStatus = 'needs_review';
      }
    }

    const choiceCount = (parsedChoices.length === 5 ? 5 : 4) as 4 | 5;

    // 신뢰도 산정
    const questionConfidence: ConfidenceLevel =
      stem.length >= 5 && avgConfidence >= 0.75 ? 'high' : avgConfidence >= 0.5 ? 'medium' : 'low';

    const choicesConfidence: ConfidenceLevel =
      parsedChoices.length >= 4 && avgConfidence >= 0.75 ? 'high' : 'medium';

    const answerConfidence: ConfidenceLevel =
      correctChoiceId ? (answerStatus === 'verified' ? 'high' : 'medium') : 'low';

    if (answerStatus === 'missing') missingAnswerCount++;
    else if (answerStatus === 'needs_review') needsReviewCount++;
    else validCount++;

    const item: QuestionItem = {
      id: `q-${bookId}-${qNum}`,
      bookId,
      questionNumber: qNum,
      stem: stem || `문제 ${qNum}`,
      choiceCount,
      choices: parsedChoices,
      correctChoiceId,
      answerStatus,
      answerEvidence,
      sourceBounds,
      questionConfidence,
      choicesConfidence,
      answerConfidence,
      isUserConfirmed: answerStatus === 'verified',
      createdAt: new Date().toISOString(),
    };

    questions.push(item);
  }

  return {
    questions,
    totalDetected: questions.length,
    validCount,
    needsReviewCount,
    missingAnswerCount,
  };
}

/**
 * 선택지 텍스트에서 4개 또는 5개의 QuestionChoice 배열 파싱
 */
function parseChoicesFromText(text: string, qNum: string): QuestionChoice[] {
  if (!text.trim()) return [];

  // 기호 위치 검색
  const matches: { index: number; label: string }[] = [];
  const regex = new RegExp(CHOICE_SPLIT_REGEX.source, 'g');
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    matches.push({ index: m.index, label: m[1] });
  }

  if (matches.length === 0) return [];

  const choices: QuestionChoice[] = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const next = matches[i + 1];
    const startIndex = cur.index + cur.label.length;
    const endIndex = next ? next.index : text.length;

    let choiceText = text.substring(startIndex, endIndex).trim();
    // 인라인 정답 태그가 포함되어 있다면 제거
    choiceText = choiceText.replace(INLINE_ANSWER_REGEX, '').trim();

    choices.push({
      id: `choice-${qNum}-${i + 1}`,
      sourceLabel: cur.label,
      text: choiceText,
    });
  }

  return choices;
}
