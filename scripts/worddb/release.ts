// 릴리스 스크립트: 200개 검증 완료 단어를 JSON 파일로 출력 (지시서 DB-PILOT-200 Section 22, 23, 34 준수)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RAW_CANDIDATES } from './candidatesData';
import type { BuiltinWordsDatabase } from '../../src/types/word';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export function releaseBuiltinWords() {
  const readyWords = RAW_CANDIDATES.filter((w) => w.quizEligible && w.status === 'quiz_ready');

  if (readyWords.length < 200) {
    throw new Error(`출제 가능 단어 수가 200개 미만입니다 (현재: ${readyWords.length})`);
  }

  // C등급 포함 여부 확인
  const hasCGrade = readyWords.some((w) => w.confidenceGrade === 'C');
  if (hasCGrade) {
    throw new Error('출시 데이터에 C등급 단어가 포함되어 있습니다.');
  }

  const dbData: BuiltinWordsDatabase = {
    schemaVersion: 1,
    databaseVersion: 1,
    wordCount: readyWords.length,
    generatedAt: '2026-09-29',
    words: readyWords,
  };

  const jsonContent = JSON.stringify(dbData, null, 2);

  // 1. src/data/builtin_words_pilot_v1.json
  const srcDataPath = path.join(projectRoot, 'src/data/builtin_words_pilot_v1.json');
  fs.writeFileSync(srcDataPath, jsonContent, 'utf-8');
  console.log(`[Release] 생성 완료: ${srcDataPath} (${readyWords.length}단어)`);

  // 2. public/data/builtin_words_v1.json
  const publicDataDir = path.join(projectRoot, 'public/data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }
  const publicDataPath = path.join(publicDataDir, 'builtin_words_v1.json');
  fs.writeFileSync(publicDataPath, jsonContent, 'utf-8');
  console.log(`[Release] 생성 완료: ${publicDataPath} (${readyWords.length}단어)`);

  // 3. 기존 public/data/toeic_words_v1.json 제거 (지시서 23항)
  const legacyDataPath = path.join(publicDataDir, 'toeic_words_v1.json');
  if (fs.existsSync(legacyDataPath)) {
    fs.unlinkSync(legacyDataPath);
    console.log(`[Release] 기존 레거시 데이터 제거 완료: ${legacyDataPath}`);
  }

  return readyWords.length;
}

releaseBuiltinWords();

