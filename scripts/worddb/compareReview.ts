import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export interface HumanReviewItem {
  wordId: string;
  word?: string;
  status: 'approved' | 'needs_correction' | 'exclude' | 'hold' | 'unreviewed';
  suggestedMainMeaning?: string | null;
  suggestedSubMeanings?: string[];
  suggestedPartOfSpeech?: string | null;
  note?: string;
}

export interface HumanReviewFile {
  databaseVersion?: number;
  reviewedAt?: string;
  reviewer?: string;
  items: HumanReviewItem[];
}

export interface ReviewSummary {
  total: number;
  approved: HumanReviewItem[];
  needsCorrection: HumanReviewItem[];
  exclude: HumanReviewItem[];
  hold: HumanReviewItem[];
  unreviewed: HumanReviewItem[];
  humanReviewPass: boolean;
  filePath: string;
}

export function evaluateReviewFile(reviewFilePath?: string): ReviewSummary | null {
  const candidatePaths = [
    reviewFilePath,
    path.join(projectRoot, 'reports/reviews/word_db_1800_human_review.json'),
    path.join(projectRoot, 'word_db_1800_human_review.json'),
    path.join(projectRoot, 'reports/worddb-1800-review-queue.json'),
  ].filter(Boolean) as string[];

  let targetPath = '';
  for (const p of candidatePaths) {
    const resolved = path.isAbsolute(p) ? p : path.resolve(projectRoot, p);
    if (fs.existsSync(resolved)) {
      targetPath = resolved;
      break;
    }
  }

  if (!targetPath) {
    return null;
  }

  const raw = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
  const rawItems: any[] = Array.isArray(raw)
    ? raw
    : raw.items || raw.priorityQueue || raw.fullItems || [];

  const approved: HumanReviewItem[] = [];
  const needsCorrection: HumanReviewItem[] = [];
  const exclude: HumanReviewItem[] = [];
  const hold: HumanReviewItem[] = [];
  const unreviewed: HumanReviewItem[] = [];

  rawItems.forEach((rawItem) => {
    const wordId = rawItem.wordId || rawItem.id;
    const word = rawItem.word;
    const rawStatus = (rawItem.status || rawItem.reviewStatus || 'unreviewed').toLowerCase();
    const note = rawItem.note || rawItem.reviewNote || '';
    const suggestedMainMeaning = rawItem.suggestedMainMeaning || rawItem.suggestedMeaning || null;
    const suggestedSubMeanings = rawItem.suggestedSubMeanings || [];
    const suggestedPartOfSpeech = rawItem.suggestedPartOfSpeech || null;

    const item: HumanReviewItem = {
      wordId,
      word,
      status: 'unreviewed',
      suggestedMainMeaning,
      suggestedSubMeanings,
      suggestedPartOfSpeech,
      note,
    };

    if (rawStatus === 'approved' || rawStatus === 'pass') {
      item.status = 'approved';
      approved.push(item);
    } else if (rawStatus === 'needs_correction') {
      item.status = 'needs_correction';
      needsCorrection.push(item);
    } else if (rawStatus === 'exclude' || rawStatus === 'exclude_recommended') {
      item.status = 'exclude';
      exclude.push(item);
    } else if (rawStatus === 'hold') {
      item.status = 'hold';
      hold.push(item);
    } else {
      item.status = 'unreviewed';
      unreviewed.push(item);
    }
  });

  const total = rawItems.length;
  // 지시서 12항, 43항: 198개 모두 정상/수정필요/제외 중 하나, 보류=0, 미검토=0
  const humanReviewPass = total === 198 && hold.length === 0 && unreviewed.length === 0;

  return {
    total,
    approved,
    needsCorrection,
    exclude,
    hold,
    unreviewed,
    humanReviewPass,
    filePath: targetPath,
  };
}

export function compareReviewResults(reviewFilePath?: string): void {
  console.log('=== [QA-03] Human Review Result Comparison & Inspector ===');

  const summary = evaluateReviewFile(reviewFilePath);
  if (!summary) {
    console.error('- 검토 결과 파일을 찾을 수 없습니다.');
    console.error('  경로 확인: reports/reviews/word_db_1800_human_review.json 또는 word_db_1800_human_review.json');
    return;
  }

  console.log(`- 파일 경로: ${path.relative(projectRoot, summary.filePath)}`);
  console.log(`\n[사람 검토 현황 요약] (총 ${summary.total}건 / 기대 대상: 198건)`);
  console.log(`- [V] 정상 (approved): ${summary.approved.length}건`);
  console.log(`- [!] 수정 필요 (needs_correction): ${summary.needsCorrection.length}건`);
  console.log(`- [X] 제외 (exclude): ${summary.exclude.length}건`);
  console.log(`- [?] 보류 (hold): ${summary.hold.length}건 (완료 기준: 0건)`);
  console.log(`- [ ] 미검토 (unreviewed): ${summary.unreviewed.length}건 (완료 기준: 0건)`);
  console.log(`- HUMAN_REVIEW_PASS: ${summary.humanReviewPass ? 'YES' : 'NO'}`);

  if (summary.needsCorrection.length > 0) {
    console.log('\n[수정 필요 어휘 목록]');
    summary.needsCorrection.forEach((item, idx) => {
      console.log(`  ${idx + 1}. [${item.wordId}] ${item.word || ''}`);
      if (item.suggestedMainMeaning) console.log(`     - 수정 대표 뜻: ${item.suggestedMainMeaning}`);
      if (item.suggestedSubMeanings && item.suggestedSubMeanings.length > 0) console.log(`     - 수정 추가 뜻: ${item.suggestedSubMeanings.join(', ')}`);
      if (item.suggestedPartOfSpeech) console.log(`     - 수정 품사: ${item.suggestedPartOfSpeech}`);
      if (item.note) console.log(`     - 메모: ${item.note}`);
    });
  }

  if (summary.exclude.length > 0) {
    console.log('\n[제외 어휘 목록 (출제 부적합 -> 대체 후보 필요)]');
    summary.exclude.forEach((item, idx) => {
      console.log(`  ${idx + 1}. [${item.wordId}] ${item.word || ''} | 사유: ${item.note || '없음'}`);
    });
  }

  if (summary.hold.length > 0) {
    console.log('\n[보류 어휘 목록 (해소 필요)]');
    summary.hold.forEach((item, idx) => {
      console.log(`  ${idx + 1}. [${item.wordId}] ${item.word || ''} | 메모: ${item.note || '없음'}`);
    });
  }

  console.log('\n- 주의: 본 도구는 비교 및 리포팅 전용이며, DB를 자동 수정하지 않습니다.');
  console.log('- 수정 사항 확정 시 docs/WORD_DB_ERRATA.md에 기록 후 정식 빌드 파이프라인으로 처리하십시오.\n');
}

if (process.argv[1] && process.argv[1].includes('compareReview')) {
  const customPath = process.argv[2];
  compareReviewResults(customPath);
}

