// OCR 인식 텍스트 블록으로부터 영단어 및 한국어 뜻을 연결/추출하는 어휘 파서
// P0-C 사진 OCR 품질 및 안전화 지시서 준수
import type { RecognizedTextBlock, ExtractedOcrWord, ConfidenceLevel } from '../types/ocr';

export type { ExtractedOcrWord };

const NOISE_WORDS = new Set([
  'http', 'www', 'com', 'co', 'kr', 'the', 'of', 'in', 'and', 'for', 'with',
  'page', 'unit', 'test', 'toeic', 'voca', 'day', 'chapter', 'point'
]);

/**
 * 일반적인 TOEIC 단어 철자 유사도 기반 추천 (자동 교정이 아닌 사용자 추천용, 지시서 8항)
 * 절대 원본 word를 바꾸지 않으며 recommendedWord 필드로만 제공됨.
 */
const COMMON_TOEIC_WORDS: Record<string, string> = {
  gitigent: 'diligent',
  giligent: 'diligent',
  gamiliar: 'familiar',
  famiar: 'familiar',
  manageriat: 'managerial',
  manisharial: 'managerial',
  conditon: 'condition',
  associat: 'associate',
  identfy: 'identify',
};

/**
 * 텍스트에서 불필요한 번호, 따옴표, 별표를 제거하고 순수 영단어 후보 정제
 */
export function cleanHeadword(raw: string): { word: string; recommendation?: string } | null {
  // 예: "20 identify**", "“associate”**", "24 lack**", "26 diligent**"
  const cleaned = raw.replace(/[0-9*“"”’'•●○\[\]§†‡\(\)]/g, ' ').trim();
  const tokens = cleaned.split(/\s+/).filter((t) => /^[a-zA-Z\-]{2,25}$/.test(t));

  if (tokens.length === 0) return null;

  // 첫 번째 적격 영단어 선택
  const candidate = tokens[0].toLowerCase();
  if (NOISE_WORDS.has(candidate)) return null;

  // 자동 철자 교정은 금지되나 추천 후보는 사전에 있을 경우에만 제시 (지시서 8항)
  const recommendation = COMMON_TOEIC_WORDS[candidate];

  return { word: candidate, recommendation };
}

/**
 * 품사 태그와 한국어 뜻 분리 및 예문 분리 (지시서 11, 12항)
 */
export function parseMeaningLine(line: string): {
  partOfSpeech?: string;
  meaning: string;
  additionalMeanings: string[];
  exampleTranslation?: string;
} {
  let cleaned = line.replace(/[●○•\[\]\d]/g, ' ').trim();

  // 품사 태그 탐색
  const posMatch = cleaned.match(/\b(v|n|adj|adv|prep|conj)\.?\b|\b(동|명|형|부|전|접)\b/i);
  let partOfSpeech: string | undefined = undefined;

  if (posMatch) {
    const rawPos = posMatch[0].toLowerCase().replace('.', '');
    if (rawPos === 'v' || rawPos === '동') partOfSpeech = '동사';
    else if (rawPos === 'n' || rawPos === '명') partOfSpeech = '명사';
    else if (rawPos === 'adj' || rawPos === '형') partOfSpeech = '형용사';
    else if (rawPos === 'adv' || rawPos === '부') partOfSpeech = '부사';
    else if (rawPos === 'prep' || rawPos === '전') partOfSpeech = '전치사';
    else if (rawPos === 'conj' || rawPos === '접') partOfSpeech = '접속사';

    cleaned = cleaned.replace(posMatch[0], ' ');
  }

  // 문장부호(. ! ?)가 포함되어 있거나 어절 수가 5개 이상인 경우 예문 번역으로 분리
  let exampleTranslation: string | undefined = undefined;
  if (/[.!?~]/.test(cleaned) || cleaned.split(/\s+/).length >= 5) {
    const sentences = cleaned.split(/[.!?]/).filter((s) => s.trim().length > 0);
    if (sentences.length > 0 && sentences[0].split(/\s+/).length >= 4) {
      exampleTranslation = sentences[0].trim();
    }
  }

  // 한글 뜻 추출 (한글 포함 토큰 수집)
  const koreanTokens = cleaned
    .split(/\s+/)
    .filter((t) => /[가-힣]/.test(t) && !t.includes('최신출제') && !t.includes('포인트') && !t.includes('어휘'));

  const fullMeaning = koreanTokens.join(' ').replace(/^[,\s~-]+|[,\s~-]+$/g, '');

  // 쉼표/슬래시 등으로 분리된 다의어 추출 (지시서 24항)
  const splitMeanings = fullMeaning
    .split(/[,;\/]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 1);

  const additionalMeanings = splitMeanings.length > 1 ? splitMeanings.slice(1) : [];

  return {
    partOfSpeech,
    meaning: fullMeaning,
    additionalMeanings,
    exampleTranslation,
  };
}


/**
 * 표제어, 뜻, 쌍 신뢰도 평가 (지시서 9, 13, 15항)
 */
export function evaluateConfidence(
  word: string,
  rawConf: number,
  meaning: string,
  yDistance: number,
  sameLine: boolean,
  hasRecommendation: boolean = false
): {
  wordConfidence: ConfidenceLevel;
  meaningConfidence: ConfidenceLevel;
  pairConfidence: ConfidenceLevel;
} {
  // 1. 표제어 신뢰도 (지시서 7항: 철자 교정 필요 단어는 신뢰도 하향)
  let wordConfidence: ConfidenceLevel = 'low';
  if (!hasRecommendation && rawConf >= 0.70 && word.length >= 3 && /^[a-z]+$/.test(word)) {
    wordConfidence = 'high';
  } else if (rawConf >= 0.45 && word.length >= 3) {
    wordConfidence = 'medium';
  } else {
    wordConfidence = 'low';
  }

  // 2. 뜻 신뢰도 (특수문자 노이즈 검출)
  let meaningConfidence: ConfidenceLevel = 'low';
  const hangulOnly = meaning.replace(/[^가-힣]/g, '');
  if (hangulOnly.length >= 2 && !/[@!#$%^&*()_+=\[\]{}~`|\\<>]/.test(meaning)) {
    if (hangulOnly.length >= 2 && hangulOnly.length <= 15) {
      meaningConfidence = 'high';
    } else {
      meaningConfidence = 'medium';
    }
  } else {
    meaningConfidence = 'low';
  }

  // 3. 단어-뜻 쌍 종합 신뢰도 (지시서 15항: 어느 하나라도 low이면 pairConfidence = low)
  let pairConfidence: ConfidenceLevel = 'low';
  if (wordConfidence === 'low' || meaningConfidence === 'low') {
    pairConfidence = 'low';
  } else if (wordConfidence === 'high' && meaningConfidence === 'high') {
    if (sameLine || yDistance <= 60) {
      pairConfidence = 'high';
    } else if (yDistance <= 120) {
      pairConfidence = 'medium';
    } else {
      pairConfidence = 'low';
    }
  } else if (yDistance <= 100) {
    pairConfidence = 'medium';
  } else {
    pairConfidence = 'low';
  }

  return { wordConfidence, meaningConfidence, pairConfidence };
}

/**
 * OCR 블록 리스트를 분석하여 구조화된 단어 목록으로 변환
 * (기하학적 열 분리, 경계 침범 차단, 신뢰도 3단계 강제)
 */
export function extractVocabularyFromOcrBlocks(
  blocks: RecognizedTextBlock[]
): ExtractedOcrWord[] {
  // 1. 좌/우 열(또는 단일 페이지)로 블록 그룹 분리 (지시서 10항: 다른 열과 연결 절대 금지)
  const sides = new Map<string, RecognizedTextBlock[]>();
  for (const block of blocks) {
    const sideKey = block.side || (block.x > 450 ? 'RIGHT' : 'LEFT');
    if (!sides.has(sideKey)) sides.set(sideKey, []);
    sides.get(sideKey)!.push(block);
  }

  const results: ExtractedOcrWord[] = [];

  for (const [sideKey, sideBlocks] of sides.entries()) {
    // Y좌표 오름차순 정렬
    const sorted = [...sideBlocks].sort((a, b) => a.y - b.y);

    // 표제어 후보 인덱스 탐색
    interface HeadwordEntry {
      index: number;
      word: string;
      recommendation?: string;
      block: RecognizedTextBlock;
    }

    const headwords: HeadwordEntry[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const block = sorted[i];
      const rawText = block.text.trim();
      if (rawText.length > 50) continue; // 너무 긴 라인은 헤드워드 아님

      const parsed = cleanHeadword(rawText);
      if (!parsed || parsed.word.length < 2) continue;

      headwords.push({
        index: i,
        word: parsed.word,
        recommendation: parsed.recommendation,
        block,
      });
    }

    // 각 표제어에 대해 뜻 및 예문 영역 결합 (다음 표제어 경계 이전까지만 탐색)
    for (let h = 0; h < headwords.length; h++) {
      const hw = headwords[h];
      const nextHw = headwords[h + 1];
      const maxSearchIndex = nextHw ? nextHw.index : sorted.length;
      const maxY = nextHw ? nextHw.block.y : hw.block.y + 220;

      // 이미 추출된 단어 중복 방지
      if (results.some((r) => r.word.toLowerCase() === hw.word.toLowerCase())) {
        continue;
      }

      let bestMeaning = '';
      let additionalMeanings: string[] = [];
      let detectedPos: string | undefined = undefined;
      let exampleSentence: string | undefined = undefined;
      let exampleTranslation: string | undefined = undefined;
      let meaningY = hw.block.y;
      let sameLine = false;

      // 동일 라인에 뜻이 있는 경우 우선 탐색
      if (/[가-힣]/.test(hw.block.text)) {
        const parsed = parseMeaningLine(hw.block.text);
        if (parsed.meaning) {
          bestMeaning = parsed.meaning;
          additionalMeanings = parsed.additionalMeanings;
          detectedPos = parsed.partOfSpeech;
          exampleTranslation = parsed.exampleTranslation;
          sameLine = true;
        }
      }

      // 다음 표제어 이전의 블록들을 순회하며 뜻, 예문, 예문번역 수집 (지시서 10, 11, 12항)
      for (let j = hw.index + 1; j < maxSearchIndex; j++) {
        const nextBlock = sorted[j];
        if (nextBlock.y >= maxY || nextBlock.y - hw.block.y > 180) {
          break;
        }

        const text = nextBlock.text.trim();

        // 1. 아직 대표 뜻을 못 찾은 경우: 짧은 한글 블록을 뜻으로 채택
        if (!bestMeaning && /[가-힣]/.test(text)) {
          const parsed = parseMeaningLine(text);
          if (parsed.meaning && parsed.meaning.length >= 2) {
            bestMeaning = parsed.meaning;
            additionalMeanings = parsed.additionalMeanings;
            detectedPos = parsed.partOfSpeech;
            meaningY = nextBlock.y;
            if (parsed.exampleTranslation) {
              exampleTranslation = parsed.exampleTranslation;
            }
            continue;
          }
        }

        // 2. 이미 뜻이 정해진 이후 긴 영어 라인은 예문(exampleSentence)으로 취급
        if (bestMeaning && !exampleSentence && /^[a-zA-Z\s,.'"-]{15,}$/.test(text)) {
          exampleSentence = text;
          continue;
        }

        // 3. 예문 이후 긴 한글 라인은 예문 번역(exampleTranslation)으로 분리 (지시서 11, 12항)
        if (bestMeaning && exampleSentence && !exampleTranslation && /[가-힣]/.test(text) && text.length >= 10) {
          exampleTranslation = text;
        }
      }

      if (hw.word && bestMeaning) {
        const yDist = Math.abs(meaningY - hw.block.y);
        const confLevels = evaluateConfidence(
          hw.word,
          hw.block.confidence,
          bestMeaning,
          yDist,
          sameLine,
          !!hw.recommendation
        );

        // 지시서 15항: pairConfidence === 'low'인 단어는 자동 제외(isExcluded: true)
        // 사용자가 명시적으로 수정/승인하기 전까지 문제집 저장 대상 = 0건 보장
        const isExcluded = confLevels.pairConfidence === 'low';

        results.push({
          id: `ocr_w_${results.length + 1}_${Date.now()}`,
          word: hw.word,
          recommendedWord: hw.recommendation,
          partOfSpeech: detectedPos,
          meaning: bestMeaning,
          additionalMeanings,
          exampleSentence,
          exampleTranslation,
          side: (sideKey as any) || 'SINGLE',
          wordConfidence: confLevels.wordConfidence,
          meaningConfidence: confLevels.meaningConfidence,
          pairConfidence: confLevels.pairConfidence,
          rawConfidence: hw.block.confidence,
          isExcluded,
          isUserConfirmed: false,
        });
      }
    }
  }

  return results;
}

