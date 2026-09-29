import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateReviewFile } from './compareReview.js';
import type { BuiltinWordsDatabase, BuiltinWord } from '../../src/types/word';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export function applyHumanReview(customPath?: string): void {
  console.log('=== [QA-03] Human Review Application & DB Alignment Pipeline ===');

  const summary = evaluateReviewFile(customPath);
  if (!summary) {
    console.error('❌ 검토 결과 파일을 찾을 수 없습니다.');
    console.error('   경로 확인: reports/reviews/word_db_1800_human_review.json 또는 word_db_1800_human_review.json');
    process.exit(1);
  }

  console.log(`- 입력 파일: ${path.relative(projectRoot, summary.filePath)}`);
  console.log(`- 총 검토 항목: ${summary.total}개 (기대: 198개)`);
  console.log(`- 정상(approved): ${summary.approved.length}개`);
  console.log(`- 수정 필요(needs_correction): ${summary.needsCorrection.length}개`);
  console.log(`- 제외(exclude): ${summary.exclude.length}개`);
  console.log(`- 보류(hold): ${summary.hold.length}개`);
  console.log(`- 미검토(unreviewed): ${summary.unreviewed.length}개`);

  if (!summary.humanReviewPass) {
    console.error('\n❌ [HUMAN_REVIEW_BLOCKED] 사람 검토가 완료되지 않았습니다 (지시서 12, 43항 위반).');
    if (summary.total !== 198) console.error(`  - 검토 대상 수 불일치: ${summary.total} / 198`);
    if (summary.unreviewed.length > 0) console.error(`  - 미검토 항목 ${summary.unreviewed.length}건 존재`);
    if (summary.hold.length > 0) console.error(`  - 보류 항목 ${summary.hold.length}건 존재`);
    console.error('  docs/WORD_DB_1800_REVIEW.html 에서 198개 전수를 검토 후 JSON을 내보내 주십시오.\n');
    process.exit(1);
  }

  console.log('✅ 사람 검토 조건 충족 (198건 전수 검토 완료, 보류 0, 미검토 0)');

  const dbPath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  const db: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const baselinePath = path.join(projectRoot, 'data/worddb/baseline_500.json');
  const baselineData = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  const conflictPath = path.join(projectRoot, 'src/data/semantic_conflicts_v1.json');
  const conflictsData = JSON.parse(fs.readFileSync(conflictPath, 'utf-8'));
  const poolPath = path.join(projectRoot, 'data/worddb/candidate_pool.json');
  const poolData = JSON.parse(fs.readFileSync(poolPath, 'utf-8'));

  let modifiedCount = 0;
  let excludedCount = 0;
  let replacedCount = 0;
  const errataEntries: string[] = [];

  // 1. 수정 필요 항목 적용
  summary.needsCorrection.forEach((item) => {
    const targetWord = db.words.find((w) => w.id === item.wordId);
    if (!targetWord) {
      console.warn(`경고: 대상 어휘를 DB에서 찾을 수 없습니다: ${item.wordId}`);
      return;
    }

    const prevMeaning = targetWord.mainMeaning;
    const prevSub = [...(targetWord.subMeanings || [])];
    const prevPos = targetWord.partOfSpeech;
    let changed = false;

    if (item.suggestedMainMeaning && item.suggestedMainMeaning !== targetWord.mainMeaning) {
      targetWord.mainMeaning = item.suggestedMainMeaning;
      changed = true;
    }
    if (item.suggestedSubMeanings && item.suggestedSubMeanings.length > 0) {
      targetWord.subMeanings = item.suggestedSubMeanings;
      changed = true;
    }
    if (item.suggestedPartOfSpeech && item.suggestedPartOfSpeech !== targetWord.partOfSpeech) {
      targetWord.partOfSpeech = item.suggestedPartOfSpeech as any;
      changed = true;
    }

    if (changed) {
      modifiedCount++;
      const errataText = [
        `\n### ${item.wordId} (${targetWord.word})`,
        `- **word ID**: \`${item.wordId}\``,
        `- **기존**: 대표 뜻="${prevMeaning}", 추가 뜻=[${prevSub.join(', ')}], 품사=\`${prevPos}\``,
        `- **수정**: 대표 뜻="${targetWord.mainMeaning}", 추가 뜻=[${(targetWord.subMeanings || []).join(', ')}], 품사=\`${targetWord.partOfSpeech}\``,
        `- **사유**: ${item.note || '인간 검토자 수정 요청'}`,
        `- **사람 검토 상태**: APPROVED (NEEDS_CORRECTION 반영 완료)`,
        `- **검증 근거**: human review (${summary.filePath})`,
        `- **영향**: 4지선다 출제 품질 향상 및 어휘 의미 명확화`,
      ].join('\n');
      errataEntries.push(errataText);
    }
  });

  // 2. 제외 항목 처리 및 대체 후보 승격
  if (summary.exclude.length > 0) {
    const availableCandidates = poolData.filter(
      (c: any) =>
        c.confidenceGrade === 'C' &&
        !db.words.some((w) => w.id === c.id || (w.lemma.toLowerCase() === c.lemma.toLowerCase() && w.partOfSpeech === c.partOfSpeech))
    );

    summary.exclude.forEach((item) => {
      const targetIdx = db.words.findIndex((w) => w.id === item.wordId);
      if (targetIdx === -1) return;
      const targetWord = db.words[targetIdx];

      // 대체 후보 선정
      const replacement = availableCandidates.find((c: any) => c.partOfSpeech === targetWord.partOfSpeech) || availableCandidates[0];
      if (!replacement) {
        throw new Error(`대체 가능한 후보 단어가 부족합니다. (제외 단어: ${targetWord.word})`);
      }

      // 후보 승격
      replacement.confidenceGrade = 'B';
      replacement.quizEligible = true;
      replacement.status = 'quiz_ready';
      replacement.databaseVersion = 5;

      // 제외 어휘 교체 (ID 변경 없이 1800 총수 유지)
      db.words[targetIdx] = replacement;
      excludedCount++;
      replacedCount++;

      const errataText = [
        `\n### [제외 및 대체] ${targetWord.id} -> ${replacement.id}`,
        `- **word ID**: \`${targetWord.id}\` (제외) -> \`${replacement.id}\` (대체 투입)`,
        `- **기존**: ${targetWord.word} (${targetWord.partOfSpeech}, "${targetWord.mainMeaning}")`,
        `- **수정**: ${replacement.word} (${replacement.partOfSpeech}, "${replacement.mainMeaning}")`,
        `- **사유**: ${item.note || '인간 검토자 출제 부적합 판단에 따른 제외 및 후보 풀 대체'}`,
        `- **사람 검토 상태**: APPROVED (EXCLUDE 반영 완료)`,
        `- **검증 근거**: candidate_pool 대체 선별 및 승격`,
        `- **영향**: 1,800개 DB 총수 유지 및 결함 단어 제거`,
      ].join('\n');
      errataEntries.push(errataText);
    });
  }

  // 3. DB 버전 갱신 및 저장
  const hasDataChanges = modifiedCount > 0 || excludedCount > 0;
  if (hasDataChanges) {
    db.databaseVersion = 5;
    db.metadata = {
      ...(db.metadata || {}),
      databaseVersion: 5,
      updatedAt: new Date().toISOString(),
    } as any;
    console.log(`- 데이터 변경 감지: databaseVersion = 5 승격 (수정: ${modifiedCount}건, 제외대체: ${excludedCount}건)`);
  } else {
    console.log('- 데이터 변경 없음: databaseVersion = 4 유지 (전수 무수정 승인)');
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  console.log(`- DB 저장 완료: ${dbPath} (wordCount: ${db.words.length})`);

  // 4. baseline_500 동기화
  const baselineWords = baselineData.words || [];
  let baselineModified = false;
  db.words.forEach((w) => {
    const bWord = baselineWords.find((bw: any) => bw.id === w.id);
    if (bWord) {
      if (bWord.mainMeaning !== w.mainMeaning || bWord.partOfSpeech !== w.partOfSpeech) {
        bWord.mainMeaning = w.mainMeaning;
        bWord.partOfSpeech = w.partOfSpeech;
        bWord.subMeanings = w.subMeanings;
        baselineModified = true;
      }
    }
  });
  if (baselineModified) {
    fs.writeFileSync(baselinePath, JSON.stringify(baselineData, null, 2), 'utf-8');
    console.log(`- baseline_500 동기화 완료: ${baselinePath}`);
  }

  // 5. ERRATA 기록
  if (errataEntries.length > 0) {
    const errataPath = path.join(projectRoot, 'docs/WORD_DB_ERRATA.md');
    let errataContent = fs.readFileSync(errataPath, 'utf-8');
    errataContent += `\n\n## QA-03 사람 검토 반영 내역 (${new Date().toISOString()})\n` + errataEntries.join('\n');
    fs.writeFileSync(errataPath, errataContent, 'utf-8');
    console.log(`- 정오표 기록 완료: ${errataPath} (${errataEntries.length}건 추가)`);
  }

  console.log('\n✅ [QA-03] 사람 검토 결과 DB 반영 완료.');
}

if (process.argv[1] && process.argv[1].includes('applyHumanReview')) {
  const customPath = process.argv[2];
  applyHumanReview(customPath);
}
