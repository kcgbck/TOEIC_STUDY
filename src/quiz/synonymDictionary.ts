// 동의어 및 의미 중복 판정 사전 모듈 (지시서 P0-C Section 23~25 준수)

export type DistractorSafety = 'SAFE' | 'REVIEW' | 'BLOCK';

/**
 * 의미 중복(동의어/유의어) BLOCK 사전
 * 실제 TOEIC 빈출 어휘 기준 한국어 뜻 동의어 매핑
 */
export const SYNONYM_BLOCK_PAIRS: Record<string, string[]> = {
  구매하다: ['구입하다', '사다'],
  구입하다: ['구매하다', '사다'],
  사다: ['구매하다', '구입하다'],
  획득하다: ['얻다', '취득하다', '습득하다'],
  취득하다: ['획득하다', '얻다', '습득하다'],
  습득하다: ['획득하다', '취득하다', '얻다', '배우다'],
  얻다: ['획득하다', '취득하다', '습득하다'],
  확인하다: ['알아보다', '점검하다', '확증하다', '식별하다'],
  알아보다: ['확인하다', '식별하다', '조사하다'],
  식별하다: ['알아보다', '확인하다', '구별하다'],
  관련시키다: ['연관시키다', '연결하다', '결부하다'],
  연관시키다: ['관련시키다', '연결하다'],
  조건: ['상태', '규정', '요건'],
  상태: ['조건', '상황'],
  고용: ['채용', '취업'],
  채용: ['고용', '선발'],
  부족: ['결핍', '모자람'],
  결핍: ['부족', '모자람'],
  성실한: ['근면한', '부지런한'],
  근면한: ['성실한', '부지런한'],
  부지런한: ['성실한', '근면한'],
  친숙한: ['익숙한'],
  익숙한: ['친숙한'],
  위임하다: ['맡기다', '넘기다'],
  실행하다: ['이행하다', '실시하다'],
  이행하다: ['실행하다', '실시하다'],
  확장하다: ['확대하다', '넓히다'],
  확대하다: ['확장하다', '넓히다'],
  예약하다: ['잡아두다', '확정하다'],
  청구서: ['송장', '계산서'],
  송장: ['청구서', '계산서'],
  의무적인: ['강제적인', '필수적인'],
  필수적인: ['의무적인', '반드시 필요한'],
  자격이있는: ['적격인', '해당하는'],
  적격인: ['자격이있는', '해당하는'],
  성취하다: ['완수하다', '달성하다', '이루다'],
  달성하다: ['성취하다', '완수하다', '이루다'],
  완수하다: ['성취하다', '달성하다', '이루다'],
  후보자: ['지원자', '입후보자'],
  지원자: ['후보자', '신청자'],
  종결시키다: ['끝내다', '종료하다', '해지하다'],
  끝내다: ['종결시키다', '종료하다'],
};

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
