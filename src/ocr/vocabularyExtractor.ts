// OCR 인식 텍스트 블록으로부터 영단어 및 한국어 뜻을 연결/추출하는 어휘 파서
import type { RecognizedTextBlock } from '../types/ocr';

export interface ExtractedOcrWord {
  id: string;
  word: string;
  partOfSpeech?: string;
  meaning: string;
  confidence: number;
}

const NOISE_WORDS = new Set(['http', 'www', 'com', 'co', 'kr', 'the', 'of', 'in', 'and', 'for', 'with']);

/**
 * 텍스트에서 불필요한 번호, 따옴표, 별표를 제거하고 순수 영단어만 정제
 */
function cleanHeadword(raw: string): string | null {
  // 예: "20 identify**", "“associate”**", "24 lack**"
  const cleaned = raw.replace(/[0-9*“"”’'•●○\[\]]/g, '').trim();
  const tokens = cleaned.split(/\s+/).filter((t) => /^[a-zA-Z]{2,25}$/.test(t));

  if (tokens.length === 0) return null;
  // 첫 번째 적격 영단어 선택
  const candidate = tokens[0].toLowerCase();
  if (NOISE_WORDS.has(candidate)) return null;
  return candidate;
}

/**
 * 품사 태그와 한국어 뜻 분리
 */
function parseMeaningLine(line: string): { partOfSpeech?: string; meaning: string } {
  let cleaned = line.replace(/[●○•\(\)\[\]\d]/g, ' ').trim();
  
  // 품사 태그 탐색
  const posMatch = cleaned.match(/\b(v|n|adj|adv|prep|conj)\b|\b(동|명|형|부|전|접)\b/i);
  let partOfSpeech: string | undefined = undefined;

  if (posMatch) {
    const rawPos = posMatch[0].toLowerCase();
    if (rawPos === 'v' || rawPos === '동') partOfSpeech = '동사';
    else if (rawPos === 'n' || rawPos === '명') partOfSpeech = '명사';
    else if (rawPos === 'adj' || rawPos === '형') partOfSpeech = '형용사';
    else if (rawPos === 'adv' || rawPos === '부') partOfSpeech = '부사';
  }

  // 한글 뜻 추출 (한글 어구 위주 수집)
  const koreanTokens = cleaned
    .split(/\s+/)
    .filter((t) => /[가-힣]/.test(t) && !t.includes('최신출제') && !t.includes('포인트'));

  return {
    partOfSpeech,
    meaning: koreanTokens.join(' ').replace(/^[,\s~-]+|[,\s~-]+$/g, ''),
  };
}

/**
 * OCR 블록 리스트를 분석하여 구조화된 단어 목록으로 변환
 */
export function extractVocabularyFromOcrBlocks(
  blocks: RecognizedTextBlock[]
): ExtractedOcrWord[] {
  // Y좌표 기준 정렬
  const sorted = [...blocks].sort((a, b) => a.y - b.y);
  const results: ExtractedOcrWord[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const block = sorted[i];
    const rawText = block.text.trim();

    // 1. 헤드워드 라인 판별 (짧은 라인 & 영어 포함 & 긴 예문 제외)
    if (rawText.length > 40) continue;
    const word = cleanHeadword(rawText);
    if (!word || word.length < 3) continue;

    // 중복 추가 방지
    if (results.some((r) => r.word.toLowerCase() === word.toLowerCase())) continue;

    // 2. 인접 라인에서 한국어 뜻 탐색 (동일 라인 또는 바로 아래 1~3개 라인)
    let bestMeaning = '';
    let detectedPos: string | undefined = undefined;

    // 동일 라인에 뜻이 있는 경우 확인 (예: "23 employment ** n. 고용")
    if (/[가-힣]/.test(rawText)) {
      const parsed = parseMeaningLine(rawText);
      if (parsed.meaning) {
        bestMeaning = parsed.meaning;
        detectedPos = parsed.partOfSpeech;
      }
    }

    // 아래 라인들에서 뜻 탐색
    if (!bestMeaning) {
      for (let j = i + 1; j < Math.min(i + 5, sorted.length); j++) {
        const nextBlock = sorted[j];
        // 너무 멀리 떨어진 경우 중단
        if (nextBlock.y - block.y > 150) break;

        // 다른 표제어가 나오면 중단
        const nextWord = cleanHeadword(nextBlock.text);
        if (nextWord && nextBlock.text.length < 30 && nextWord !== word) break;

        if (/[가-힣]/.test(nextBlock.text)) {
          const parsed = parseMeaningLine(nextBlock.text);
          if (parsed.meaning && parsed.meaning.length >= 2) {
            bestMeaning = parsed.meaning;
            detectedPos = parsed.partOfSpeech;
            break;
          }
        }
      }
    }

    if (word && bestMeaning) {
      results.push({
        id: `ocr_w_${results.length + 1}_${Date.now()}`,
        word,
        partOfSpeech: detectedPos,
        meaning: bestMeaning,
        confidence: block.confidence,
      });
    }
  }

  return results;
}
