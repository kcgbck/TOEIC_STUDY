import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

interface ReviewImportItem {
  id: string;
  word: string;
  mainMeaning: string;
  reviewStatus: 'UNREVIEWED' | 'PASS' | 'NEEDS_CORRECTION' | 'EXCLUDE_RECOMMENDED';
  reviewNote?: string;
  suggestedMeaning?: string;
}

export function compareReviewResults(reviewFilePath?: string): void {
  console.log('=== [QA-01] Human Review Result Comparison & Diff Inspector ===');

  const defaultPath = path.join(projectRoot, 'reports/worddb-1800-review-queue.json');
  const targetPath = reviewFilePath ? path.resolve(projectRoot, reviewFilePath) : defaultPath;

  if (!fs.existsSync(targetPath)) {
    console.error(`- 검토 결과 파일을 찾을 수 없습니다: ${targetPath}`);
    return;
  }

  const raw = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
  const items: ReviewImportItem[] = Array.isArray(raw)
    ? raw
    : raw.priorityQueue || raw.fullItems || [];

  if (items.length === 0) {
    console.log('- 검토 항목이 비어있습니다.');
    return;
  }

  const unreviewed: ReviewImportItem[] = [];
  const passed: ReviewImportItem[] = [];
  const needsCorrection: ReviewImportItem[] = [];
  const excludeRecommended: ReviewImportItem[] = [];

  items.forEach((item) => {
    switch (item.reviewStatus) {
      case 'PASS':
        passed.push(item);
        break;
      case 'NEEDS_CORRECTION':
        needsCorrection.push(item);
        break;
      case 'EXCLUDE_RECOMMENDED':
        excludeRecommended.push(item);
        break;
      default:
        unreviewed.push(item);
        break;
    }
  });

  console.log(`\n[검토 현황 요약] (총 ${items.length}건)`);
  console.log(`- [ ] 미검토 (UNREVIEWED): ${unreviewed.length}건`);
  console.log(`- [V] 정상 (PASS): ${passed.length}건`);
  console.log(`- [!] 수정 필요 (NEEDS_CORRECTION): ${needsCorrection.length}건`);
  console.log(`- [X] 제외 권고 (EXCLUDE_RECOMMENDED): ${excludeRecommended.length}건`);

  if (needsCorrection.length > 0) {
    console.log('\n[수정 필요 어휘 목록]');
    needsCorrection.forEach((item, idx) => {
      console.log(`  ${idx + 1}. ${item.word} (${item.mainMeaning}) -> 제안: ${item.suggestedMeaning || '없음'} | 메모: ${item.reviewNote || '없음'}`);
    });
  }

  if (excludeRecommended.length > 0) {
    console.log('\n[제외 권고 어휘 목록 (출제 부적합 -> 대체 후보 필요)]');
    excludeRecommended.forEach((item, idx) => {
      console.log(`  ${idx + 1}. ${item.word} (${item.mainMeaning}) | 사유: ${item.reviewNote || '없음'}`);
    });
  }

  console.log('\n- 주의: 본 도구는 비교 및 리포팅 전용이며, DB를 자동 수정하지 않습니다.');
  console.log('- 수정 사항 확정 시 docs/WORD_DB_ERRATA.md에 기록 후 정식 빌드 파이프라인으로 처리하십시오.\n');
}

if (process.argv[1] && process.argv[1].includes('compareReview')) {
  const customPath = process.argv[2];
  compareReviewResults(customPath);
}
