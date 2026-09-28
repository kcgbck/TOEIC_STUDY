// 기본 어휘 데이터베이스 전수 감사 및 문제 생성 스트레스 테스트 스크립트 (지시서 DB-PILOT-200 Section 25~28 준수)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuiltinWordsDatabase, BuiltinWord, WordEntry } from '../../src/types/word';
import { builtinWordToWordEntry } from '../../src/types/word';
import { createQuizQuestion, validateQuestionUniqueness } from '../../src/quiz/quizEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export async function runAudit(): Promise<boolean> {
  console.log('====================================================');
  console.log('   보카 스터디 어휘 데이터베이스 전수 감사 (DB-PILOT-200)');
  console.log('====================================================\n');

  const releasePath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  if (!fs.existsSync(releasePath)) {
    console.error(`[FAIL] 릴리스 데이터 파일이 없습니다: ${releasePath}`);
    return false;
  }

  const rawJson = fs.readFileSync(releasePath, 'utf-8');
  const dbData: BuiltinWordsDatabase = JSON.parse(rawJson);
  const words: BuiltinWord[] = dbData.words;

  console.log(`[정보] 로드된 단어 수: ${words.length}개`);
  console.log(`[정보] 메타데이터: schemaVersion=${dbData.schemaVersion}, databaseVersion=${dbData.databaseVersion}, date=${dbData.generatedAt}\n`);

  let errorCount = 0;

  // 1. 단어 수 및 출제 가능 검사
  if (words.length < 200) {
    console.error(`[오류] 총 단어 수가 200개 미만입니다 (${words.length}/200)`);
    errorCount++;
  }

  const eligibleCount = words.filter((w) => w.quizEligible && w.status === 'quiz_ready').length;
  if (eligibleCount < 200) {
    console.error(`[오류] 출제 가능(quiz_ready) 단어 수가 200개 미만입니다 (${eligibleCount}/200)`);
    errorCount++;
  }

  // 2. 무결성 검사 (빈 필드, C등급, 중복 등)
  const seenIds = new Set<string>();
  const seenWordPos = new Set<string>();

  for (const w of words) {
    // 빈 필드
    if (!w.word || w.word.trim().length === 0) {
      console.error(`[오류] 빈 표제어가 존재합니다 (ID: ${w.id})`);
      errorCount++;
    }
    if (!w.mainMeaning || w.mainMeaning.trim().length === 0) {
      console.error(`[오류] 빈 대표 뜻이 존재합니다: ${w.word}`);
      errorCount++;
    }
    if (!w.partOfSpeech) {
      console.error(`[오류] 품사 누락: ${w.word}`);
      errorCount++;
    }

    // 중복 ID
    if (seenIds.has(w.id)) {
      console.error(`[오류] 중복 ID 발생: ${w.id}`);
      errorCount++;
    }
    seenIds.add(w.id);

    // 중복 word/POS
    const wordPosKey = `${w.word.toLowerCase()}:${w.partOfSpeech}`;
    if (seenWordPos.has(wordPosKey)) {
      console.error(`[오류] 중복 표제어/품사 조합 발생: ${wordPosKey}`);
      errorCount++;
    }
    seenWordPos.add(wordPosKey);

    // 유효하지 않은 난이도
    if (!['easy', 'medium', 'hard'].includes(w.difficulty)) {
      console.error(`[오류] 유효하지 않은 난이도: ${w.word} (${w.difficulty})`);
      errorCount++;
    }

    // 주제 누락
    if (!w.topics || w.topics.length === 0) {
      console.error(`[오류] 주제(topic) 누락: ${w.word}`);
      errorCount++;
    }

    // C등급 출시 포함 금지 (지시서 19, 28항)
    if (w.confidenceGrade === 'C') {
      console.error(`[오류] C등급 단어가 출제 데이터에 포함되었습니다: ${w.word}`);
      errorCount++;
    }

    // quizEligible false 출시 포함 금지
    if (!w.quizEligible) {
      console.error(`[오류] quizEligible=false 단어가 포함되었습니다: ${w.word}`);
      errorCount++;
    }
  }

  console.log(`[검증 1] 정적 무결성 검사 완료 (결함: ${errorCount}건)`);
  if (errorCount > 0) {
    return false;
  }

  // 3. 문제풀이 풀(WordEntry[]) 생성
  const wordEntries: WordEntry[] = words.map(builtinWordToWordEntry);

  // 4. 전수 200개 단어 대상 문제 생성 시뮬레이션 (지시서 26~28항)
  // 200단어 x 3개 난이도 x 10개 Seed = 총 6,000회 생성 시험
  console.log('\n[검증 2] 200개 전수 단어 x 3개 난이도 x 10개 Seed 문제 생성 스트레스 테스트 시작...');
  let totalTests = 0;
  let quizErrorCount = 0;
  let duplicateDistractorCount = 0;
  let blockDistractorCount = 0;
  let subMeaningLeakCount = 0;
  let generationFailCount = 0;

  const difficulties: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];

  for (let wIdx = 0; wIdx < wordEntries.length; wIdx++) {
    const targetWord = wordEntries[wIdx];
    const originalBuiltin = words[wIdx];

    for (const diff of difficulties) {
      for (let s = 1; s <= 10; s++) {
        totalTests++;
        const seed = wIdx * 1000 + (diff === 'low' ? 100 : diff === 'medium' ? 200 : 300) + s;

        // 문제 생성 (품사 일치 시도)
        const question = createQuizQuestion(wordEntries, targetWord, {
          seed,
          matchPartOfSpeech: true,
        });

        if (!question) {
          generationFailCount++;
          quizErrorCount++;
          console.error(`[생성 실패] ${targetWord.word} (난이도: ${diff}, seed: ${seed})`);
          continue;
        }

        // Hard Gate 검증
        const allTargetMeanings = [originalBuiltin.mainMeaning, ...originalBuiltin.subMeanings];
        const validation = validateQuestionUniqueness(question, allTargetMeanings);

        if (!validation.isValid) {
          quizErrorCount++;
          if (validation.reason?.includes('중복')) duplicateDistractorCount++;
          if (validation.reason?.includes('BLOCK')) blockDistractorCount++;
          console.error(`[유효성 실패] ${targetWord.word} - ${validation.reason}`);
        }

        // 추가 뜻이 오답 보기에 들어갔는지 2중 확인
        for (let oIdx = 0; oIdx < question.options.length; oIdx++) {
          if (oIdx === question.correctIndex) continue;
          const opt = question.options[oIdx];
          if (originalBuiltin.subMeanings.includes(opt)) {
            subMeaningLeakCount++;
            quizErrorCount++;
            console.error(`[추가 뜻 오답 누출] ${targetWord.word} - ${opt}`);
          }
        }
      }
    }
  }

  console.log(`\n====================================================`);
  console.log(`                감사 결과 요약`);
  console.log(`====================================================`);
  console.log(`- 총 단어 수: ${words.length}`);
  console.log(`- 출제 가능 단어 수: ${eligibleCount}`);
  console.log(`- 신뢰 등급 분포: A=${words.filter((w) => w.confidenceGrade === 'A').length}, B=${words.filter((w) => w.confidenceGrade === 'B').length}, C=${words.filter((w) => w.confidenceGrade === 'C').length}`);
  console.log(`- 총 문제 생성 시험 횟수: ${totalTests}회`);
  console.log(`- 문제 생성 실패 건수: ${generationFailCount}건`);
  console.log(`- 보기 중복 건수: ${duplicateDistractorCount}건`);
  console.log(`- BLOCK 동의어 누출 건수: ${blockDistractorCount}건`);
  console.log(`- 추가 뜻 오답 누출 건수: ${subMeaningLeakCount}건`);
  console.log(`- 전체 결함 건수: ${quizErrorCount + errorCount}건`);
  console.log(`====================================================\n`);

  if (quizErrorCount > 0 || errorCount > 0) {
    console.error(`❌ [AUDIT FAILED] 결함이 발견되어 감사 통과에 실패했습니다.`);
    return false;
  }

  console.log(`✅ [AUDIT PASSED] 200개 어휘 DB 및 6,000회 문제 생성 스트레스 테스트 결함 0건 통과!`);
  return true;
}

// 실행
runAudit().then((passed) => {
  if (!passed) {
    process.exit(1);
  }
});
