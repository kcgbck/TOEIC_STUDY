// 릴리스 스크립트: 누적 500개 검증 완료 단어를 JSON 파일로 출력 (지시서 DB-02 Section 31~34, 50 준수)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NEW_READY_300 } from './candidatesData300';
import type { BuiltinWordsDatabase, BuiltinWord } from '../../src/types/word';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export interface DiffResult {
  added: number;
  modified: number;
  removed: number;
  total: number;
}

export function releaseBuiltinWords(): DiffResult {
  // 1. 기존 200개 파일럿 기준선 로드 (PILOT_BASELINE_200 불변 보존: 지시서 2항)
  const baselinePath = path.join(projectRoot, 'src/data/builtin_words_pilot_v1.json');
  if (!fs.existsSync(baselinePath)) {
    throw new Error(`[Release] 기준선 파일이 존재하지 않습니다: ${baselinePath}`);
  }
  const baselineData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  const baselineWords: BuiltinWord[] = baselineData.words;

  if (baselineWords.length !== 200) {
    throw new Error(`[Release] 기준선 단어 수가 200개가 아닙니다 (현재: ${baselineWords.length})`);
  }

  // 2. 신규 300개 어휘 로드
  const newWords = NEW_READY_300.filter((w) => w.quizEligible && w.status === 'quiz_ready');
  if (newWords.length < 300) {
    throw new Error(`[Release] 신규 출제 가능 단어 수가 300개 미만입니다 (현재: ${newWords.length})`);
  }

  // 3. 결합 및 누적 500개 구성
  const combinedWords: BuiltinWord[] = [...baselineWords, ...newWords];
  if (combinedWords.length !== 500) {
    throw new Error(`[Release] 누적 단어 수가 정확히 500개가 아닙니다 (현재: ${combinedWords.length})`);
  }

  // 4. 무결성 및 C등급 검사 (지시서 17, 18, 30항)
  const hasCGrade = combinedWords.some((w) => w.confidenceGrade === 'C');
  if (hasCGrade) {
    throw new Error('[Release] 출시 데이터에 C등급 단어가 포함되어 있습니다.');
  }

  const hasIneligible = combinedWords.some((w) => !w.quizEligible || w.status !== 'quiz_ready');
  if (hasIneligible) {
    throw new Error('[Release] 출시 데이터에 출제 불가 단어가 포함되어 있습니다.');
  }

  // 5. Diff 감사 (지시서 31, 32항)
  const baselineIdMap = new Map(baselineWords.map((w) => [w.id, w]));
  let modifiedCount = 0;
  let removedCount = 0;
  let addedCount = 0;

  for (const bWord of baselineWords) {
    const found = combinedWords.find((w) => w.id === bWord.id);
    if (!found) {
      removedCount++;
    } else {
      // 핵심 필드 변경 여부 확인 (ID, 표제어, 품사, 대표뜻, 추가뜻)
      const unchanged =
        found.word === bWord.word &&
        found.partOfSpeech === bWord.partOfSpeech &&
        found.mainMeaning === bWord.mainMeaning &&
        JSON.stringify(found.subMeanings) === JSON.stringify(bWord.subMeanings);
      if (!unchanged) {
        modifiedCount++;
      }
    }
  }

  for (const cWord of combinedWords) {
    if (!baselineIdMap.has(cWord.id)) {
      addedCount++;
    }
  }

  const diff: DiffResult = {
    added: addedCount,
    modified: modifiedCount,
    removed: removedCount,
    total: combinedWords.length,
  };

  console.log('[Diff Audit] 기존 200개 대비 변경 내역:');
  console.log(`  - Added: ${diff.added}`);
  console.log(`  - Modified: ${diff.modified} (ERRATA 외 무단수정 0건이어야 함)`);
  console.log(`  - Removed: ${diff.removed} (손실 0건이어야 함)`);
  console.log(`  - Total: ${diff.total}`);

  if (diff.modified > 0 || diff.removed > 0 || diff.added !== 300) {
    throw new Error(`[Release] Diff 감사 실패: added=${diff.added}, modified=${diff.modified}, removed=${diff.removed}`);
  }

  // 6. DB 메타데이터 생성 (databaseVersion: 2, 지시서 33항)
  const dbData: BuiltinWordsDatabase = {
    schemaVersion: 1,
    databaseVersion: 2,
    wordCount: combinedWords.length,
    generatedAt: '2026-09-29',
    words: combinedWords,
  };

  const jsonContent = JSON.stringify(dbData, null, 2);

  // 7. public/data/builtin_words_v1.json 출력 (지시서 50항)
  const publicDataDir = path.join(projectRoot, 'public/data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }
  const publicDataPath = path.join(publicDataDir, 'builtin_words_v1.json');
  fs.writeFileSync(publicDataPath, jsonContent, 'utf-8');
  console.log(`[Release] 생성 완료: ${publicDataPath} (${combinedWords.length}단어)`);

  // 8. src/data/builtin_words_500_v2.json 저장 (소스코드 내 500개 백업)
  const srcDataPath = path.join(projectRoot, 'src/data/builtin_words_500_v2.json');
  fs.writeFileSync(srcDataPath, jsonContent, 'utf-8');
  console.log(`[Release] 소스 스냅샷 생성 완료: ${srcDataPath} (${combinedWords.length}단어)`);

  return diff;
}

try {
  releaseBuiltinWords();
} catch (err) {
  console.error(err);
  process.exit(1);
}
