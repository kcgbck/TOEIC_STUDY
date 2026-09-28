// 동의어 및 의미 중복 판정 사전 모듈 (지시서 P0-C Section 23~25 및 DB-PILOT Section 20 준수)
import synonymData from '../data/synonym_blocks_v1.json';

export type DistractorSafety = 'SAFE' | 'REVIEW' | 'BLOCK';

/**
 * 의미 중복(동의어/유의어) BLOCK 사전
 * src/data/synonym_blocks_v1.json 데이터와 동기화
 */
export const SYNONYM_BLOCK_PAIRS: Record<string, string[]> = synonymData.synonym_blocks;


/**
 * 한국어 뜻 문자열을 정규화 (공백, 쉼표, 조사 등 정제)
 */
export function normalizeMeaning(meaning: string): string {
  return meaning
    .replace(/[~,.?!]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

/**
 * 모든 동의어 집합을 양방향으로 추출
 */
export function getSynonyms(meaning: string): Set<string> {
  const norm = normalizeMeaning(meaning);
  const result = new Set<string>();

  for (const [key, synonyms] of Object.entries(SYNONYM_BLOCK_PAIRS)) {
    const normKey = normalizeMeaning(key);
    if (norm === normKey || norm.includes(normKey) || normKey.includes(norm)) {
      result.add(normKey);
      synonyms.forEach((s) => result.add(normalizeMeaning(s)));
    }
  }

  return result;
}

/**
 * 정답 의미 집합(대표 뜻 + 추가 뜻)과 오답 후보 의미의 안전 점수 평가
 * 지시서 24항 & 25항 준수:
 * - BLOCK:
 *   1. 정답 대표 뜻과 동일/포함
 *   2. 정답의 추가 뜻(다의어)과 동일/포함
 *   3. 사전 정의된 명확한 동의어/유의어 관계
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

    // 2. 동의어 사전 매칭 -> BLOCK
    const targetSynonyms = getSynonyms(target);
    if (targetSynonyms.has(normCandidate)) {
      return 'BLOCK';
    }

    const candidateSynonyms = getSynonyms(candidateMeaning);
    if (candidateSynonyms.has(normTarget)) {
      return 'BLOCK';
    }

    // 상호 동의어 교집합 검사
    for (const syn of candidateSynonyms) {
      if (targetSynonyms.has(syn)) {
        return 'BLOCK';
      }
    }
  }

  return 'SAFE';
}
