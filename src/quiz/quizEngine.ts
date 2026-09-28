// 4지선다 퀴즈 출제 엔진 및 정답 유일성 Hard Gate (지시서 P0-C Section 20~27 준수)
import type { WordEntry, QuizQuestion } from '../types/word';
import { evaluateDistractorSafety, normalizeMeaning } from './synonymDictionary';

export interface QuizGenOptions {
  seed?: number;
  matchPartOfSpeech?: boolean;
  matchDifficulty?: boolean;
  maxAttempts?: number;
}

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

/**
 * 재현 가능한 난수 생성을 위한 선형 합동 PRNG (지시서 27항)
 */
export class SimplePrng {
  private state: number;

  constructor(seed: number = 123456789) {
    this.state = seed % 2147483647;
    if (this.state <= 0) this.state += 2147483646;
  }

  next(): number {
    this.state = (this.state * 16807) % 2147483647;
    return (this.state - 1) / 2147483646;
  }

  shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

/**
 * 4지선다 정답 유일성 Hard Gate 검증 함수 (지시서 22항)
 * 반드시 확인:
 * 1. 보기 수 = 4
 * 2. 보기 문자열 중복 = 0
 * 3. 정답 포함 수 = 1
 * 4. 정답 index = 정확히 1개
 * 5. 오답 보기 중 정답의 다의어 또는 BLOCK 동의어가 0개
 */
export function validateQuestionUniqueness(
  question: QuizQuestion,
  targetMeanings: string[] = []
): ValidationResult {
  // 1. 보기 수 = 4
  if (!question.options || question.options.length !== 4) {
    return { isValid: false, reason: `보기 수는 정확히 4개여야 합니다 (현재: ${question.options?.length})` };
  }

  // 2. 보기 문자열 중복 = 0
  const normalizedOptions = question.options.map(normalizeMeaning);
  const uniqueSet = new Set(normalizedOptions);
  if (uniqueSet.size !== 4) {
    return { isValid: false, reason: `보기 간에 중복된 문자열이 존재합니다 (${uniqueSet.size}/4)` };
  }

  // 3. 정답 index 유효성
  if (
    typeof question.correctIndex !== 'number' ||
    question.correctIndex < 0 ||
    question.correctIndex >= 4
  ) {
    return { isValid: false, reason: `정답 인덱스가 올바르지 않습니다: ${question.correctIndex}` };
  }

  // 4. 정답 보기 문자열 일치 검사
  const correctOption = question.options[question.correctIndex];
  if (!correctOption || correctOption.trim().length === 0) {
    return { isValid: false, reason: '정답 보기 문자열이 비어있습니다' };
  }

  // 5. 정답 개념 집합과 오답 보기 간 의미 중복(동의어/다의어) 검사 (지시서 24, 25항)
  const allTargetMeanings = targetMeanings.length > 0 ? targetMeanings : [correctOption];
  for (let i = 0; i < question.options.length; i++) {
    if (i === question.correctIndex) continue; // 정답 본인은 제외

    const distractor = question.options[i];
    const safety = evaluateDistractorSafety(allTargetMeanings, distractor);
    if (safety === 'BLOCK') {
      return {
        isValid: false,
        reason: `오답 보기 "${distractor}"이(가) 정답 의미(${allTargetMeanings.join(', ')})와 동의어 또는 다의어로 BLOCK되었습니다`,
      };
    }
  }

  return { isValid: true };
}

/**
 * 안전한 4지선다 문제 생성기 (지시서 21, 26항)
 */
export function createQuizQuestion(
  wordList: WordEntry[],
  targetWord: WordEntry,
  options: QuizGenOptions = {}
): QuizQuestion | null {
  if (!wordList || wordList.length < 4 || !targetWord) {
    return null;
  }

  const prng = new SimplePrng(options.seed !== undefined ? options.seed : Date.now());

  // 정답 개념 집합: 대표 뜻 + 추가 뜻(다의어)
  const targetMeaningList: string[] = [];
  if (Array.isArray(targetWord.meaning)) {
    targetMeaningList.push(...targetWord.meaning);
  } else if (typeof targetWord.meaning === 'string') {
    targetMeaningList.push(targetWord.meaning);
  }

  // 대표 뜻 선정
  const correctOption = targetMeaningList[0];
  if (!correctOption) return null;

  // 오답 후보 풀 생성: targetWord가 아니고 의미상 SAFE인 단어들만 선별
  const candidatePool: { word: WordEntry; meaning: string }[] = [];
  for (const w of wordList) {
    if (w.word.toLowerCase() === targetWord.word.toLowerCase()) continue;

    const meanings = Array.isArray(w.meaning) ? w.meaning : [w.meaning];
    for (const m of meanings) {
      if (!m || m.trim().length === 0) continue;

      // 정답 의미 집합과 비교하여 SAFE인 경우에만 오답 후보로 채택 (지시서 25항)
      const safety = evaluateDistractorSafety(targetMeaningList, m);
      if (safety === 'SAFE') {
        candidatePool.push({ word: w, meaning: m });
      }
    }
  }

  // 조건별 오답 필터링 시도:
  // 1단계: 품사 일치 & 난이도 일치
  // 2단계: 난이도 완화 (지시서 26항: 상 -> 중)
  // 3단계: 전체 SAFE 풀에서 선별
  let selectedDistractors: string[] = [];

  const filterPool = (matchPos: boolean, matchDiff: boolean) => {
    return candidatePool.filter((c) => {
      if (matchPos && targetWord.partOfSpeech && c.word.partOfSpeech !== targetWord.partOfSpeech) {
        return false;
      }
      if (matchDiff && targetWord.difficulty && c.word.difficulty !== targetWord.difficulty) {
        return false;
      }
      return true;
    });
  };

  const tryPickDistractors = (pool: { meaning: string }[]): string[] => {
    const shuffled = prng.shuffle(pool);
    const chosen: string[] = [];
    const chosenNorm = new Set<string>();
    chosenNorm.add(normalizeMeaning(correctOption));

    for (const item of shuffled) {
      const norm = normalizeMeaning(item.meaning);
      if (chosenNorm.has(norm)) continue;

      // 이미 선택된 다른 오답과의 상호 동의어도 BLOCK
      let conflictWithChosen = false;
      for (const existing of chosen) {
        if (evaluateDistractorSafety([existing], item.meaning) === 'BLOCK') {
          conflictWithChosen = true;
          break;
        }
      }
      if (conflictWithChosen) continue;

      chosen.push(item.meaning);
      chosenNorm.add(norm);

      if (chosen.length === 3) break;
    }

    return chosen;
  };

  // 1단계 시도 (조건 엄격)
  if (options.matchPartOfSpeech || options.matchDifficulty) {
    selectedDistractors = tryPickDistractors(
      filterPool(!!options.matchPartOfSpeech, !!options.matchDifficulty)
    );
  }

  // 2단계 시도 (난이도 완화: 지시서 26항)
  if (selectedDistractors.length < 3 && options.matchPartOfSpeech) {
    selectedDistractors = tryPickDistractors(filterPool(true, false));
  }

  // 3단계 시도 (전체 풀 완화)
  if (selectedDistractors.length < 3) {
    selectedDistractors = tryPickDistractors(candidatePool);
  }

  // 지시서 26항: 그래도 3개 미만이면 복수정답 위험 문제를 내지 않고 null 반환
  if (selectedDistractors.length < 3) {
    return null;
  }

  // 4개 보기 생성 및 셔플
  const rawOptions = [correctOption, ...selectedDistractors];
  const shuffledOptions = prng.shuffle(rawOptions);
  const correctIndex = shuffledOptions.indexOf(correctOption);

  const question: QuizQuestion = {
    wordId: targetWord.id || targetWord.word,
    word: targetWord.word,
    options: shuffledOptions,
    correctIndex,
    difficulty: targetWord.difficulty || 'medium',
  };

  // 최종 Hard Gate 검증
  const validation = validateQuestionUniqueness(question, targetMeaningList);
  if (!validation.isValid) {
    // 검증 실패 시 생성 취소
    return null;
  }

  return question;
}
