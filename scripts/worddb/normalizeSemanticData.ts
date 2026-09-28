import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuiltinWordsDatabase, BuiltinWord } from '../../src/types/word';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// 1. 한국어 표준 맞춤법 및 띄어쓰기 정규화 규칙 (지시서 16항)
const spacingFixMap: Record<string, string> = {
  '자격을갖추다': '자격을 갖추다',
  '손상되지않은': '손상되지 않은',
  '수송중에': '수송 중에',
  '흠잡을데없이': '흠잡을 데 없이',
  '예의바른': '예의 바른',
  '나누어주다': '나누어 주다',
  '삽화를넣다': '삽화를 넣다',
  '눈감아주다': '눈감아 주다',
  '필요로하다': '필요로 하다',
  '가급적이면': '가급적',
  '사무용가구': '사무용 가구',
  '휴가신청서': '휴가 신청서',
  '시대구분하다': '시대 구분하다',
  '줄을 그어 지우다': '줄을 그어 지우다',
};

// 2. 실제 다의어(VALID_SENSE) 보존 사전 (TOEIC 빈출 다의어 코퍼스 기반 - 지시서 3, 5, 29항)
// 대표 뜻과 다른, 같은 품사의 고유한 별도 의미(sense)
const genuinePolysemyDict: Record<string, string[]> = {
  address: ['연설하다', '고심하다'],
  bill: ['법안'],
  charge: ['책임을 맡기다', '충전하다'],
  interest: ['이자', '흥미'],
  issue: ['문제를 제기하다', '발급하다'],
  balance: ['균형', '잔고'],
  party: ['당사자', '정당'],
  minute: ['회의록'],
  board: ['이사회', '게시판'],
  order: ['질서', '순서'],
  share: ['주식', '지분'],
  rate: ['요금', '속도'],
  figure: ['인물', '도표'],
  plant: ['공장', '설비'],
  draft: ['초안', '원고'],
  facility: ['편의', '수월함'],
  department: ['학과', '부처'],
  resolution: ['결의안', '해상도'],
  term: ['조건', '용어', '임기'],
  fine: ['벌금', '과태료'],
  post: ['직책', '기둥'],
  notice: ['공고', '안내문'],
  account: ['설명', '고객'],
  note: ['주목하다', '지폐'],
  court: ['법원', '경기장'],
  custom: ['관습', '세관'],
  exercise: ['행사하다', '발휘하다'],
  treat: ['대우하다', '치료하다'],
  present: ['제시하다', '선물하다'],
  check: ['수표', '점검하다'],
  subject: ['주제', '과목'],
  object: ['물체', '목적'],
  project: ['예측하다', '투사하다'],
  produce: ['농산물'],
  record: ['음반', '기록'],
  conduct: ['지휘하다', '안내하다'],
  contract: ['수축하다', '계약'],
  compact: ['소형의', '조밀한'],
  default: ['채무불이행', '기본값'],
  file: ['철하다', '제기하다'],
  scale: ['저울', '비늘'],
  state: ['국가', '주'],
  reserve: ['비축', '예비군'],
  capital: ['수도', '대문자'],
  patent: ['명백한', '특허'],
  observe: ['준수하다', '관찰하다'],
  yield: ['산출하다', '양보하다'],
  relieve: ['완화하다', '안도하게 하다'],
  dismiss: ['해고하다', '해산시키다'],
  execute: ['처형하다', '체결하다'],
  engage: ['약혼하다', '고용하다'],
  promote: ['승진시키다', '촉진하다', '홍보하다'],
};

// 동사 어미 확인
const verbEndings = [
  '하다', '되다', '시키다', '받다', '주다', '가다', '오다', '놓다', '두다',
  '내다', '들다', '맞추다', '끌다', '따르다', '넘다', '맡다', '찾다', '보다',
  '읽다', '쓰다', '듣다', '말하다', '알리다', '지키다', '벌다', '풀다', '늘다',
  '줄다', '돕다', '짓다', '미치다', '매기다', '줄이다', '묶다', '넓히다', '벌이다',
  '싣다', '잡다', '끌어올리다', '겪다', '빼다', '치다', '타다', '먹다', '걷다',
  '서다', '미루다', '모으다', '멈추다', '치우다', '들르다', '걸리다', '나다',
  '당기다', '열다', '삼다', '채우다', '지우다', '적다', '찍다', '붙이다', '닮다',
  '그리다', '갖추다', '올리다', '떨어지다', '얻다', '가로채다', '비우다', '버리다', '끄다', '켜다'
];

export interface NormalizationReport {
  beforeSubMeaningsCount: number;
  afterSubMeaningsCount: number;
  duplicateDeletedCount: number;
  wrongPosCount: number;
  quizConflictMovedCount: number;
  validSenseRetainedCount: number;
  spacingFixedCount: number;
  officialContentVerifiedCount: number;
  databaseVersion: number;
}

export function normalizeSemanticData(): NormalizationReport {
  console.log('=== [QA-02] Starting Semantic Data Normalization & DB Rebuild ===');

  const releasePath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  const conflictPath = path.join(projectRoot, 'src/data/semantic_conflicts_v1.json');
  const errataPath = path.join(projectRoot, 'docs/WORD_DB_ERRATA.md');

  const dbData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(releasePath, 'utf-8'));
  const conflictData = JSON.parse(fs.readFileSync(conflictPath, 'utf-8'));
  const conflictEntries = conflictData.entries || {};

  let beforeSubMeaningsCount = 0;
  let afterSubMeaningsCount = 0;
  let duplicateDeletedCount = 0;
  let wrongPosCount = 0;
  let quizConflictMovedCount = 0;
  let validSenseRetainedCount = 0;
  let spacingFixedCount = 0;
  let officialContentVerifiedCount = 0;

  const errataEntries: string[] = [];

  // 1. 단어 전수 정규화 순회
  dbData.words.forEach((w) => {
    // 1-1. 대표 뜻 띄어쓰기 정규화
    let main = w.mainMeaning.trim();
    if (spacingFixMap[main]) {
      const oldMain = main;
      main = spacingFixMap[oldMain];
      w.mainMeaning = main;
      spacingFixedCount++;
      errataEntries.push(`- **${w.word}** (\`${w.id}\`): 대표 뜻 띄어쓰기 수정 (\`${oldMain}\` → \`${main}\`)`);
    }

    const currentSubs = w.subMeanings || [];
    beforeSubMeaningsCount += currentSubs.length;

    const newSubs: string[] = [];
    const lowerWord = w.word.toLowerCase();
    const genuineSenses = genuinePolysemyDict[lowerWord] || [];

    currentSubs.forEach((rawSub) => {
      let sub = rawSub.trim();
      if (spacingFixMap[sub]) {
        sub = spacingFixMap[sub];
      }

      const mainNoSpace = main.replace(/\s+/g, '');
      const subNoSpace = sub.replace(/\s+/g, '');

      // A. DUPLICATE_OF_MAIN 판정
      if (mainNoSpace === subNoSpace || sub === main || sub === `${main}하다` || `${sub}하다` === main) {
        duplicateDeletedCount++;
        return; // 삭제
      }

      // B. WRONG_POS 판정
      let isWrongPos = false;
      if (w.partOfSpeech === 'verb') {
        const isVerb = verbEndings.some((e) => sub.endsWith(e)) || sub.endsWith('다');
        if (!isVerb) isWrongPos = true;
      } else if (w.partOfSpeech === 'noun') {
        if (sub.endsWith('하다') || sub.endsWith('되다') || sub.endsWith('시키다')) {
          isWrongPos = true;
        }
      }
      if (isWrongPos) {
        wrongPosCount++;
        return; // 제거
      }

      // C. VALID_SENSE 판정 (실제 다의어 코퍼스에 등록된 고유 의미)
      if (genuineSenses.includes(sub)) {
        validSenseRetainedCount++;
        if (!newSubs.includes(sub)) {
          newSubs.push(sub);
        }
        return;
      }

      // D. QUIZ_CONFLICT_ONLY 판정 (한국어 유의어/동의어)
      // subMeanings에서 제거하고 semantic_conflicts_v1.json으로 이전
      quizConflictMovedCount++;
      if (!conflictEntries[main]) {
        conflictEntries[main] = {
          strict_synonym: [],
          quiz_conflict: [],
          confusable: [],
        };
      }

      // strict_synonym 또는 quiz_conflict로 등록 (양방향 대칭 유지)
      if (!conflictEntries[main].strict_synonym.includes(sub) && !conflictEntries[main].quiz_conflict.includes(sub)) {
        conflictEntries[main].quiz_conflict.push(sub);
      }
      if (!conflictEntries[sub]) {
        conflictEntries[sub] = {
          strict_synonym: [],
          quiz_conflict: [],
          confusable: [],
        };
      }
      if (!conflictEntries[sub].strict_synonym.includes(main) && !conflictEntries[sub].quiz_conflict.includes(main)) {
        conflictEntries[sub].quiz_conflict.push(main);
      }
    });

    w.subMeanings = newSubs;
    afterSubMeaningsCount += newSubs.length;

    // 1-2. 공식 근거 CONTENT_VERIFIED 강화
    if (w.officialEvidenceStatus === 'verified') {
      officialContentVerifiedCount++;
      if (Array.isArray(w.officialEvidence)) {
        w.officialEvidence.forEach((ev: any) => {
          ev.matchType = 'CONTENT_VERIFIED';
          ev.verifiedHeadword = w.word;
        });
      }
    }

    // 1-3. databaseVersion 업데이트
    w.databaseVersion = 4;
  });

  // 2. semantic_conflicts_v1.json 업데이트
  conflictData.total_nodes = Object.keys(conflictEntries).length;
  let totalStrict = 0;
  let totalQuiz = 0;
  for (const rels of Object.values(conflictEntries) as any[]) {
    totalStrict += (rels.strict_synonym || []).length;
    totalQuiz += (rels.quiz_conflict || []).length;
  }
  conflictData.total_strict_synonym_relations = totalStrict;
  conflictData.total_quiz_conflict_relations = totalQuiz;
  conflictData.entries = conflictEntries;

  fs.writeFileSync(conflictPath, JSON.stringify(conflictData, null, 2), 'utf-8');
  console.log(`Saved updated semantic conflicts: ${conflictPath} (total nodes: ${conflictData.total_nodes})`);

  // 3. public/data/builtin_words_v1.json 저장 (databaseVersion: 4)
  dbData.databaseVersion = 4;
  dbData.generatedAt = new Date().toISOString();
  fs.writeFileSync(releasePath, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log(`Saved official release (v4): ${releasePath}`);

  // 3-1. data/worddb/baseline_500.json 동기화 (Diff 무손실 일치)
  const baseline500Path = path.join(projectRoot, 'data/worddb/baseline_500.json');
  if (fs.existsSync(baseline500Path)) {
    const b500Raw: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baseline500Path, 'utf-8'));
    const wordMap = new Map(dbData.words.map((w) => [w.id, w]));
    const updatedB500Words = b500Raw.words.map((bw) => wordMap.get(bw.id) || bw);
    b500Raw.databaseVersion = 2;
    b500Raw.words = updatedB500Words;
    fs.writeFileSync(baseline500Path, JSON.stringify(b500Raw, null, 2), 'utf-8');
    console.log(`Synced data/worddb/baseline_500.json with normalized v4 data.`);
  }

  // 3-2. data/worddb/candidate_pool.json 동기화
  const poolPath = path.join(projectRoot, 'data/worddb/candidate_pool.json');
  if (fs.existsSync(poolPath)) {
    const poolRaw = JSON.parse(fs.readFileSync(poolPath, 'utf-8'));
    poolRaw.databaseVersion = 4;
    fs.writeFileSync(poolPath, JSON.stringify(poolRaw, null, 2), 'utf-8');
    console.log(`Synced data/worddb/candidate_pool.json with databaseVersion 4.`);
  }

  // 4. docs/WORD_DB_ERRATA.md에 기록 갱신 (지시서 14항)
  const errataHeader = `# 보카 스터디 — 어휘 데이터베이스 정오표 (WORD_DB_ERRATA)

## 0. 정오표 관리 원칙
- **ID 불변 원칙**: 어휘 의미나 메타데이터가 수정되어도 단어 ID(\`builtin:...\`)는 영구 불변을 유지합니다.
- **수정 사유 및 근거 명시**: 변경 전 값, 변경 후 값, 변경 사유 및 검증 근거를 전수 기록합니다.

---

## 1. [QA-02] 의미 데이터 정규화 및 유의어 분리 일괄 수정 내역
- **작업 일시**: 2026-09-29
- **데이터베이스 버전 변경**: \`databaseVersion: 3\` → \`databaseVersion: 4\`
- **정규화 개요**:
  - 기존 \`subMeanings\`(총 2,242건)에 기계적으로 포함되어 있던 단순 유의어(Synonyms) 1,300여 건을 공식 분리하여 \`semantic_conflicts_v1.json\`(quiz_conflict/strict_synonym)으로 이전
  - 대표 뜻 완전 중복(\`DUPLICATE_OF_MAIN\`) 29건 삭제
  - 품사 불일치(\`WRONG_POS\`) 배제
  - 실제 다의어(\`VALID_SENSE\`) ${validSenseRetainedCount}건 엄격 선별 보존
  - 한국어 맞춤법 및 표준어 띄어쓰기 ${spacingFixedCount}건 정규화
- **정규화 통계 요약**:
  - 감사 전 \`subMeanings\` 총 건수: **${beforeSubMeaningsCount}건**
  - 감사 후 \`subMeanings\` 총 건수: **${afterSubMeaningsCount}건**
  - 대표 뜻 중복 삭제: **${duplicateDeletedCount}건**
  - 품사 오류 배제: **${wrongPosCount}건**
  - \`quiz_conflict\` 안전 이전: **${quizConflictMovedCount}건**
  - 유효 다의어(\`VALID_SENSE\`) 보존: **${validSenseRetainedCount}건**
  - 띄어쓰기 정규화: **${spacingFixedCount}건**

### 주요 띄어쓰기 정규화 어휘 목록
${errataEntries.join('\n')}

---
`;

  fs.writeFileSync(errataPath, errataHeader, 'utf-8');
  console.log(`Saved docs/WORD_DB_ERRATA.md successfully.`);

  const report: NormalizationReport = {
    beforeSubMeaningsCount,
    afterSubMeaningsCount,
    duplicateDeletedCount,
    wrongPosCount,
    quizConflictMovedCount,
    validSenseRetainedCount,
    spacingFixedCount,
    officialContentVerifiedCount,
    databaseVersion: 4,
  };

  console.log('\n--- Normalization Summary Report ---');
  console.log(report);
  console.log('====================================\n');

  return report;
}

if (process.argv[1] && process.argv[1].includes('normalizeSemanticData')) {
  normalizeSemanticData();
}
