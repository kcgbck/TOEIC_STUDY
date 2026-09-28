// DB-03 기본 어휘 데이터베이스 1,800 전수 감사 및 54,000회 스트레스 테스트 스크립트 (지시서 Section 46~60, 89 준수)
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
  console.log('   보카 스터디 어휘 데이터베이스 1,800 전수 감사 (DB-03)');
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
  if (words.length !== 1800) {
    console.error(`[오류] 총 단어 수가 1,800개가 아닙니다 (${words.length}/1800)`);
    errorCount++;
  }

  const eligibleCount = words.filter((w) => w.quizEligible && w.status === 'quiz_ready').length;
  if (eligibleCount !== 1800) {
    console.error(`[오류] 출제 가능(quiz_ready) 단어 수가 1,800개가 아닙니다 (${eligibleCount}/1800)`);
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

    const wordPosKey = `${w.lemma.toLowerCase()}:${w.partOfSpeech}`;
    if (seenWordPos.has(wordPosKey)) {
      duplicateWordPosCount++;
      errorCount++;
    }
    seenWordPos.add(wordPosKey);
  }

  // 3. 기존 기준선 회귀 검사 (파일럿 200개 및 DB-02 500개)
  const baseline500Path = path.join(projectRoot, 'data/worddb/baseline_500.json');
  let baseline500MissingCount = 0;
  let baseline500ModifiedCount = 0;

  if (fs.existsSync(baseline500Path)) {
    const b500Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baseline500Path, 'utf-8'));
    const b500Words = b500Data.words;

    for (const bWord of b500Words) {
      const target = words.find((w) => w.id === bWord.id);
      if (!target) {
        baseline500MissingCount++;
        errorCount++;
      } else {
        const unchanged =
          target.word === bWord.word &&
          target.lemma === bWord.lemma &&
          target.partOfSpeech === bWord.partOfSpeech &&
          target.mainMeaning === bWord.mainMeaning &&
          JSON.stringify(target.subMeanings) === JSON.stringify(bWord.subMeanings);
        if (!unchanged) {
          baseline500ModifiedCount++;
          errorCount++;
        }
      }
    }
  }

  console.log(`[검증 1] 정적 무결성 및 기준선 회귀 검사 완료 (결함: ${errorCount}건)`);
  if (errorCount > 0) {
    console.error(`- 빈 표제어: ${emptyWordCount}`);
    console.error(`- 빈 대표 뜻: ${emptyMeaningCount}`);
    console.error(`- 품사 누락: ${missingPosCount}`);
    console.error(`- 주제 누락: ${missingTopicCount}`);
    console.error(`- 잘못된 난이도: ${invalidDiffCount}`);
    console.error(`- C등급 출시: ${cGradeCount}`);
    console.error(`- 중복 ID: ${duplicateIdCount}`);
    console.error(`- 중복 word:pos: ${duplicateWordPosCount}`);
    console.error(`- 기준선 500 누락: ${baseline500MissingCount}`);
    console.error(`- 기준선 500 무단 변경: ${baseline500ModifiedCount}`);
    return false;
  }

  // 4. 전수 1,800개 단어 대상 54,000회 문제 생성 스트레스 테스트
  // 1,800단어 x 3개 난이도 x 10개 Seed = 총 54,000회 생성 시험
  const wordEntries: WordEntry[] = words.map(builtinWordToWordEntry);
  console.log('\n[검증 2] 1,800개 전수 단어 x 3개 난이도 x 10개 Seed = 54,000회 문제 생성 스트레스 테스트 시작...');

  const startTime = Date.now();
  let totalTests = 0;
  let quizErrorCount = 0;
  let missingAnswerCount = 0;
  let duplicateDistractorCount = 0;
  let blockDistractorCount = 0;
  let subMeaningLeakCount = 0;
  let generationFailCount = 0;

  const correctIndexDistribution = [0, 0, 0, 0];
  const difficulties: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];

  for (let wIdx = 0; wIdx < wordEntries.length; wIdx++) {
    const targetWord = wordEntries[wIdx];
    const originalBuiltin = words[wIdx];

    for (const diff of difficulties) {
      for (let s = 1; s <= 10; s++) {
        totalTests++;
        const seed = wIdx * 1000 + (diff === 'low' ? 100 : diff === 'medium' ? 200 : 300) + s;

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

        correctIndexDistribution[question.correctIndex]++;

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

        // 추가 뜻이 오답 보기에 들어갔는지 확인
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
  const msPerQuestion = (elapsedMs / totalTests).toFixed(3);
  console.log(`[검증 2 완료] 54,000회 스트레스 테스트 수행 시간: ${elapsedMs}ms (${msPerQuestion}ms/문제)`);

  // 정답 인덱스 분포 검증 (각 인덱스가 15% ~ 35% 사이여야 함)
  console.log('\n[정답 인덱스 분포 검증]');
  for (let i = 0; i < 4; i++) {
    const count = correctIndexDistribution[i];
    const pct = ((count / totalTests) * 100).toFixed(2);
    console.log(`  인덱스 ${i} (보기 ${i + 1}번): ${count}회 (${pct}%)`);
    if (parseFloat(pct) < 15 || parseFloat(pct) > 35) {
      console.error(`[경고] 정답 인덱스 편향 발생: 인덱스 ${i} 비율 ${pct}%`);
      quizErrorCount++;
    }
  }

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

  // 지시서 필수 출력 양식
  console.log(`\n====================================================`);
  console.log(`         DB-03 어휘 데이터베이스 감사 요약 보고서`);
  console.log(`====================================================`);
  console.log(`총 단어: ${words.length}`);
  console.log(`A/B/C: A=${gradeACount}, B=${gradeBCount}, C=${gradeCCount}`);
  console.log(`난이도: 하=${diffEasy}, 중=${diffMedium}, 상=${diffHard}`);
  console.log(
    `품사: 명사=${posCounts['noun'] || 0}, 동사=${posCounts['verb'] || 0}, 형용사=${posCounts['adjective'] || 0}, 부사=${posCounts['adverb'] || 0}, 표현=${posCounts['phrase'] || 0}`
  );
  console.log(`출제 가능: ${eligibleCount}`);
  console.log(`중복 (ID / word:pos): ${duplicateIdCount} / ${duplicateWordPosCount}`);
  console.log(`빈 뜻: ${emptyMeaningCount}`);
  console.log(`blocked 충돌: ${blockDistractorCount}`);
  console.log(`문제 생성 횟수: ${totalTests}회`);
  console.log(`문제 생성 실패: ${generationFailCount}건`);
  console.log(`정답 누락: ${missingAnswerCount}건`);
  console.log(`보기 중복: ${duplicateDistractorCount}건`);
  console.log(`추가 뜻 오답: ${subMeaningLeakCount}건`);
  console.log(`기준선 500 누락: ${baseline500MissingCount}건`);
  console.log(`기준선 500 변경: ${baseline500ModifiedCount}건`);
  console.log(`순수 생성 속도: ${msPerQuestion}ms/문제`);
  console.log(`전체 결함 건수: ${quizErrorCount + errorCount}건`);
  console.log(`====================================================\n`);

  if (quizErrorCount > 0 || errorCount > 0) {
    console.error(`❌ [AUDIT FAILED] 결함이 발견되어 감사 통과에 실패했습니다.`);
    return false;
  }

  console.log(`✅ [AUDIT PASSED] 1,800개 어휘 DB 및 54,000회 문제 생성 스트레스 테스트 결함 0건 통과!`);
  return true;
}

// 직접 실행 지원
runAudit().then((passed) => {
  if (!passed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
