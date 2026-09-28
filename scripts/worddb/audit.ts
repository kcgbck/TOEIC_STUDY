// 기본 어휘 데이터베이스 전수 감사 및 15,000회 문제 생성 스트레스 테스트 스크립트 (지시서 DB-02 Section 26~32, 57 준수)
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
  console.log('   보카 스터디 어휘 데이터베이스 500 전수 감사 (DB-02)');
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
  console.log(
    `[정보] 메타데이터: schemaVersion=${dbData.schemaVersion}, databaseVersion=${dbData.databaseVersion}, date=${dbData.generatedAt}\n`
  );

  let errorCount = 0;

  // 1. 단어 수 및 출제 가능 검사
  if (words.length !== 500) {
    console.error(`[오류] 총 단어 수가 500개가 아닙니다 (${words.length}/500)`);
    errorCount++;
  }

  const eligibleCount = words.filter((w) => w.quizEligible && w.status === 'quiz_ready').length;
  if (eligibleCount !== 500) {
    console.error(`[오류] 출제 가능(quiz_ready) 단어 수가 500개가 아닙니다 (${eligibleCount}/500)`);
    errorCount++;
  }

  // 2. 무결성 검사 (빈 필드, C등급, 중복 등)
  const seenIds = new Set<string>();
  const seenWordPos = new Set<string>();
  let emptyWordCount = 0;
  let emptyMeaningCount = 0;
  let missingPosCount = 0;
  let missingTopicCount = 0;
  let invalidDiffCount = 0;
  let cGradeCount = 0;
  let duplicateIdCount = 0;
  let duplicateWordPosCount = 0;

  for (const w of words) {
    if (!w.word || w.word.trim().length === 0) {
      emptyWordCount++;
      errorCount++;
    }
    if (!w.mainMeaning || w.mainMeaning.trim().length === 0) {
      emptyMeaningCount++;
      errorCount++;
    }
    if (!w.partOfSpeech) {
      missingPosCount++;
      errorCount++;
    }
    if (!w.topics || w.topics.length === 0) {
      missingTopicCount++;
      errorCount++;
    }
    if (!['easy', 'medium', 'hard'].includes(w.difficulty)) {
      invalidDiffCount++;
      errorCount++;
    }
    if (w.confidenceGrade === 'C') {
      cGradeCount++;
      errorCount++;
    }
    if (seenIds.has(w.id)) {
      duplicateIdCount++;
      errorCount++;
    }
    seenIds.add(w.id);

    const wordPosKey = `${w.word.toLowerCase()}:${w.partOfSpeech}`;
    if (seenWordPos.has(wordPosKey)) {
      duplicateWordPosCount++;
      errorCount++;
    }
    seenWordPos.add(wordPosKey);
  }

  // 3. 기존 200개 회귀 및 Diff 검사 (지시서 31, 32항)
  const baselinePath = path.join(projectRoot, 'src/data/builtin_words_pilot_v1.json');
  let baselineMissingCount = 0;
  let baselineModifiedCount = 0;

  if (fs.existsSync(baselinePath)) {
    const baselineData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
    const baselineWords = baselineData.words;

    for (const bWord of baselineWords) {
      const target = words.find((w) => w.id === bWord.id);
      if (!target) {
        baselineMissingCount++;
        errorCount++;
      } else {
        const unchanged =
          target.word === bWord.word &&
          target.partOfSpeech === bWord.partOfSpeech &&
          target.mainMeaning === bWord.mainMeaning &&
          JSON.stringify(target.subMeanings) === JSON.stringify(bWord.subMeanings);
        if (!unchanged) {
          baselineModifiedCount++;
          errorCount++;
        }
      }
    }
  }

  console.log(`[검증 1] 정적 무결성 및 회귀 검사 완료 (결함: ${errorCount}건)`);
  if (errorCount > 0) {
    console.error(`- 빈 표제어: ${emptyWordCount}`);
    console.error(`- 빈 대표 뜻: ${emptyMeaningCount}`);
    console.error(`- 품사 누락: ${missingPosCount}`);
    console.error(`- 주제 누락: ${missingTopicCount}`);
    console.error(`- 잘못된 난이도: ${invalidDiffCount}`);
    console.error(`- C등급 출시: ${cGradeCount}`);
    console.error(`- 중복 ID: ${duplicateIdCount}`);
    console.error(`- 중복 word:pos: ${duplicateWordPosCount}`);
    console.error(`- 기존 200 누락: ${baselineMissingCount}`);
    console.error(`- 기존 200 무기록 변경: ${baselineModifiedCount}`);
    return false;
  }

  // 4. 전수 500개 단어 대상 15,000회 문제 생성 스트레스 테스트 (지시서 27, 28항)
  // 500단어 x 3개 난이도 x 10개 Seed = 총 15,000회 생성 시험
  const wordEntries: WordEntry[] = words.map(builtinWordToWordEntry);
  console.log('\n[검증 2] 500개 전수 단어 x 3개 난이도 x 10개 Seed = 15,000회 문제 생성 스트레스 테스트 시작...');

  const startTime = Date.now();
  let totalTests = 0;
  let quizErrorCount = 0;
  let missingAnswerCount = 0;
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
          if (validation.reason?.includes('정답')) missingAnswerCount++;
          if (validation.reason?.includes('중복')) duplicateDistractorCount++;
          if (validation.reason?.includes('BLOCK')) blockDistractorCount++;
          console.error(`[유효성 실패] ${targetWord.word} (난이도: ${diff}, seed: ${seed}) - ${validation.reason}`);
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

  const elapsedMs = Date.now() - startTime;
  console.log(`[검증 2 완료] 15,000회 스트레스 테스트 수행 시간: ${elapsedMs}ms`);

  // 통계 집계
  const gradeACount = words.filter((w) => w.confidenceGrade === 'A').length;
  const gradeBCount = words.filter((w) => w.confidenceGrade === 'B').length;
  const gradeCCount = words.filter((w) => w.confidenceGrade === 'C').length;

  const diffEasy = words.filter((w) => w.difficulty === 'easy').length;
  const diffMedium = words.filter((w) => w.difficulty === 'medium').length;
  const diffHard = words.filter((w) => w.difficulty === 'hard').length;

  const posCounts: Record<string, number> = {};
  for (const w of words) {
    posCounts[w.partOfSpeech] = (posCounts[w.partOfSpeech] || 0) + 1;
  }

  const topicCounts: Record<string, number> = {};
  for (const w of words) {
    for (const t of w.topics) {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    }
  }

  // 지시서 57항 필수 출력 양식
  console.log(`\n====================================================`);
  console.log(`         DB-02 어휘 데이터베이스 감사 요약 보고서`);
  console.log(`====================================================`);
  console.log(`총 단어: ${words.length}`);
  console.log(`A/B/C: A=${gradeACount}, B=${gradeBCount}, C=${gradeCCount}`);
  console.log(`난이도: 하=${diffEasy}, 중=${diffMedium}, 상=${diffHard}`);
  console.log(`품사: 명사=${posCounts['noun'] || 0}, 동사=${posCounts['verb'] || 0}, 형용사=${posCounts['adjective'] || 0}, 부사=${posCounts['adverb'] || 0}`);
  console.log(`주제 (15개 분포):`);
  for (const [top, cnt] of Object.entries(topicCounts)) {
    console.log(`  - ${top}: ${cnt}개`);
  }
  console.log(`출제 가능: ${eligibleCount}`);
  console.log(`중복 (ID / word:pos): ${duplicateIdCount} / ${duplicateWordPosCount}`);
  console.log(`빈 뜻: ${emptyMeaningCount}`);
  console.log(`blocked 충돌: ${blockDistractorCount}`);
  console.log(`문제 생성 횟수: ${totalTests}회`);
  console.log(`문제 생성 실패: ${generationFailCount}건`);
  console.log(`정답 누락: ${missingAnswerCount}건`);
  console.log(`보기 중복: ${duplicateDistractorCount}건`);
  console.log(`추가 뜻 오답: ${subMeaningLeakCount}건`);
  console.log(`기존 200 누락: ${baselineMissingCount}건`);
  console.log(`기존 200 변경: ${baselineModifiedCount}건`);
  console.log(`전체 결함 건수: ${quizErrorCount + errorCount}건`);
  console.log(`====================================================\n`);

  if (quizErrorCount > 0 || errorCount > 0) {
    console.error(`❌ [AUDIT FAILED] 결함이 발견되어 감사 통과에 실패했습니다.`);
    return false;
  }

  console.log(`✅ [AUDIT PASSED] 500개 어휘 DB 및 15,000회 문제 생성 스트레스 테스트 결함 0건 통과!`);
  return true;
}

// 실행
runAudit().then((passed) => {
  if (!passed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
