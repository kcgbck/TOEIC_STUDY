// 문서 유형 자동 판별기 (GEN-01 지시서 11, 12항 준수)
import type { RecognizedTextBlock } from '../types/ocr';
import type { DocumentClassification } from '../types/question';

const CHOICE_PATTERNS = [
  /[①②③④⑤]/,
  /\b[1-5]\)/,
  /\([1-5]\)/,
  /\b[A-E]\./i,
  /\b(가|나|다|라|마)\./,
];

const QUESTION_NUMBER_PATTERN = /(?:^|\s)(?:문\s*\d+|\d{1,3}[\.\)\]]|\(\d{1,3}\))\s+/;

const POS_PATTERNS = [
  /\b(v|n|adj|adv|prep|conj)\.?\b/i,
  /\((동|명|형|부|전|접)\)/,
  /\b(동사|명사|형용사|부사)\b/,
];

const ANSWER_KEY_LINE_PATTERN = /^\s*\d{1,3}\s*[\.\-\:\)]?\s*([1-5①②③④⑤A-Ea-e])\s*$/;

/**
 * OCR 인식 텍스트 블록들을 분석하여 문서 유형 자동 판별
 */
export function classifyDocument(blocks: RecognizedTextBlock[]): DocumentClassification {
  if (!blocks || blocks.length === 0) {
    return {
      type: 'UNKNOWN',
      confidence: 0,
      reasons: ['텍스트 블록이 비어있습니다'],
    };
  }

  let choiceMarkCount = 0;
  let questionNumberCount = 0;
  let posCount = 0;
  let answerKeyLineCount = 0;
  let englishWordCount = 0;
  let koreanMeaningCount = 0;

  for (const block of blocks) {
    const text = block.text.trim();
    if (!text) continue;

    // 객관식 선택지 기호 탐색
    for (const pat of CHOICE_PATTERNS) {
      if (pat.test(text)) {
        choiceMarkCount++;
        break;
      }
    }

    // 문제 번호 탐색
    if (QUESTION_NUMBER_PATTERN.test(text)) {
      questionNumberCount++;
    }

    // 품사 태그 탐색
    for (const posPat of POS_PATTERNS) {
      if (posPat.test(text)) {
        posCount++;
        break;
      }
    }

    // 정답표 라인 탐색
    if (ANSWER_KEY_LINE_PATTERN.test(text)) {
      answerKeyLineCount++;
    }

    // 영단어 vs 한글 뜻 비율
    if (/^[a-zA-Z\s\-']{2,30}$/.test(text)) {
      englishWordCount++;
    } else if (/[가-힣]/.test(text)) {
      koreanMeaningCount++;
    }
  }

  const reasons: string[] = [];

  // 1. 정답표 (ANSWER_KEY) 검사: 짧은 번호-답 쌍이 다수이고 일반 지문이 적음
  if (answerKeyLineCount >= 3 && choiceMarkCount < 2) {
    reasons.push(`정답표 형식 행 감지 (${answerKeyLineCount}개)`);
    return {
      type: 'ANSWER_KEY',
      confidence: Math.min(0.95, 0.6 + answerKeyLineCount * 0.05),
      reasons,
    };
  }

  // 2. 객관식 문제집 (MULTIPLE_CHOICE) 검사: 선택지 기호 다수 + 문제 번호
  const vocabScore = posCount * 3 + (englishWordCount > 0 && koreanMeaningCount > 0 ? 4 : 0);

  if (choiceMarkCount >= 3 || (choiceMarkCount >= 1 && questionNumberCount >= 1)) {
    reasons.push(
      `객관식 선택지 기호 ${choiceMarkCount}건, 문제 번호 패턴 ${questionNumberCount}건 감지`
    );
    const confidence = Math.min(0.95, 0.5 + choiceMarkCount * 0.08 + questionNumberCount * 0.05);
    return {
      type: 'MULTIPLE_CHOICE',
      confidence,
      reasons,
    };
  }

  // 3. 영어 단어장 (VOCABULARY) 검사: 품사 태그 또는 영한 쌍 구조
  if (vocabScore >= 4 || (posCount >= 2 && englishWordCount >= 2)) {
    reasons.push(
      `어휘 품사 태그 ${posCount}건, 영단어/한글 뜻 구조 감지`
    );
    const confidence = Math.min(0.95, 0.5 + posCount * 0.1 + (englishWordCount > 0 ? 0.2 : 0));
    return {
      type: 'VOCABULARY',
      confidence,
      reasons,
    };
  }

  // 4. 모호하거나 판단 불가
  reasons.push('객관식 기호 및 단어장 특징 신호 부족');
  return {
    type: 'UNKNOWN',
    confidence: 0.3,
    reasons,
  };
}
