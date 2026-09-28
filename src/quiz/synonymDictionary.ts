// 의미 충돌 차단 관계 사전 모듈 (지시서 DB-03 Section 41~45 준수)
import semanticData from '../data/semantic_conflicts_v1.json';

export type MeaningRelation = 'strict_synonym' | 'quiz_conflict' | 'confusable';
export type DistractorSafety = 'SAFE' | 'REVIEW' | 'BLOCK';

interface SemanticEntry {
  strict_synonym: string[];
  quiz_conflict: string[];
  confusable?: string[];
}

const SEMANTIC_ENTRIES: Record<string, SemanticEntry> = semanticData.entries as Record<string, SemanticEntry>;

/**
 * 한국어 뜻 문자열을 정규화 (공백, 쉼표, 조사 등 정제)
 */
export function normalizeMeaning(meaning: string): string {
  return meaning
    .replace(/[~,.?!]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

const strictCache = new Map<string, Set<string>>();
const conflictCache = new Map<string, Set<string>>();
const allBlockedCache = new Map<string, Set<string>>();

/**
 * 사전적 완전 동의어 집합을 양방향 추출
 */
export function getStrictSynonyms(meaning: string): Set<string> {
  const norm = normalizeMeaning(meaning);
  if (strictCache.has(norm)) {
    return strictCache.get(norm)!;
  }
  const result = new Set<string>();

  for (const [key, entry] of Object.entries(SEMANTIC_ENTRIES)) {
    const normKey = normalizeMeaning(key);
    if (norm === normKey || norm.includes(normKey) || normKey.includes(norm)) {
      result.add(normKey);
      entry.strict_synonym.forEach((s) => result.add(normalizeMeaning(s)));
    }
  }

  strictCache.set(norm, result);
  return result;
}

/**
 * 시험 퀴즈 의미 충돌 관계 집합을 양방향 추출
 */
export function getQuizConflicts(meaning: string): Set<string> {
  const norm = normalizeMeaning(meaning);
  if (conflictCache.has(norm)) {
    return conflictCache.get(norm)!;
  }
  const result = new Set<string>();

  for (const [key, entry] of Object.entries(SEMANTIC_ENTRIES)) {
    const normKey = normalizeMeaning(key);
    if (norm === normKey || norm.includes(normKey) || normKey.includes(norm)) {
      result.add(normKey);
      entry.quiz_conflict.forEach((s) => result.add(normalizeMeaning(s)));
    }
  }

  conflictCache.set(norm, result);
  return result;
}

/**
 * 모든 차단 의미 집합 (strict_synonym + quiz_conflict) 추출
 */
export function getAllBlockedMeanings(meaning: string): Set<string> {
  const norm = normalizeMeaning(meaning);
  if (allBlockedCache.has(norm)) {
    return allBlockedCache.get(norm)!;
  }

  const result = new Set<string>();
  const strict = getStrictSynonyms(meaning);
  const conflict = getQuizConflicts(meaning);

  for (const s of strict) result.add(s);
  for (const c of conflict) result.add(c);

  allBlockedCache.set(norm, result);
  return result;
}

/**
 * 하위 호환성을 위한 기존 동의어 추출 함수 (strict_synonym + quiz_conflict 전체 반환)
 */
export function getSynonyms(meaning: string): Set<string> {
  return getAllBlockedMeanings(meaning);
}

/**
 * 정답 의미 집합(대표 뜻 + 추가 뜻)과 오답 후보 의미의 안전 점수 평가
 * 지시서 DB-03 Section 44, 54 준수:
 * - BLOCK:
 *   1. 정답 대표 뜻과 동일/포함
 *   2. 정답의 추가 뜻(다의어)과 동일/포함
 *   3. 사전 정의된 strict_synonym 또는 quiz_conflict 관계
 * - SAFE: 명확히 다른 의미
 */
export function evaluateDistractorSafety(
  targetMeanings: string[],
  candidateMeaning: string
): DistractorSafety {
  const normCandidate = normalizeMeaning(candidateMeaning);
  if (!normCandidate) return 'BLOCK';

  // 정답의 모든 뜻과 비교
  for (const target of targetMeanings) {
    const normTarget = normalizeMeaning(target);
    if (!normTarget) continue;

    // 1. 완전 일치 또는 상호 포함관계 -> BLOCK
    if (normCandidate === normTarget) return 'BLOCK';
    if (normCandidate.length >= 2 && normTarget.includes(normCandidate)) return 'BLOCK';
    if (normTarget.length >= 2 && normCandidate.includes(normTarget)) return 'BLOCK';

    // 2. 의미 충돌 사전 매칭 (strict_synonym + quiz_conflict) -> BLOCK
    const targetBlocked = getAllBlockedMeanings(target);
    if (targetBlocked.has(normCandidate)) {
      return 'BLOCK';
    }

    const candidateBlocked = getAllBlockedMeanings(candidateMeaning);
    if (candidateBlocked.has(normTarget)) {
      return 'BLOCK';
    }

    // 상호 차단 교집합 검사
    for (const syn of candidateBlocked) {
      if (targetBlocked.has(syn)) {
        return 'BLOCK';
      }
    }
  }

  return 'SAFE';
}
