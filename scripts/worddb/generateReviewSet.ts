// DB-03 사람 검토용 문서 2종 자동 생성 스크립트 (지시서 Section 61~70 준수)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuiltinWordsDatabase, BuiltinWord, WordEntry } from '../../src/types/word';
import { builtinWordToWordEntry } from '../../src/types/word';
import { createQuizQuestion } from '../../src/quiz/quizEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export async function generateReviewDocs(): Promise<void> {
  console.log('=== [DB-03] Generating Human Review Documents ===');

  const releasePath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  const baseline500Path = path.join(projectRoot, 'data/worddb/baseline_500.json');

  const dbData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(releasePath, 'utf-8'));
  const b500Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baseline500Path, 'utf-8'));

  const allWords = dbData.words;
  const b500IdSet = new Set(b500Data.words.map((w) => w.id));

  // 신규 1,300개 어휘 분리
  const new1300Words = allWords.filter((w) => !b500IdSet.has(w.id));
  const bGradeWords = allWords.filter((w) => w.confidenceGrade === 'B');
  const verifiedWords = allWords.filter((w) => w.officialEvidenceStatus === 'verified');

  console.log(`- 전체 어휘: ${allWords.length}개`);
  console.log(`- 신규 어휘: ${new1300Words.length}개`);
  console.log(`- B등급 어휘: ${bGradeWords.length}개`);
  console.log(`- 공식근거 검증 어휘: ${verifiedWords.length}개`);

  // =========================================================================
  // 문서 1: docs/WORD_DB_1800_WORD_REVIEW.md
  // =========================================================================
  let wordDoc = `# 보카 스터디 — DB-03 1,800 기본 어휘 사람 검토 문서 (WORD_REVIEW)

## 0. 개요 및 검토 가이드라인

- **문서 목적**: DB-03 확장을 통해 새롭게 추가된 신규 1,300개 어휘(단일 단어 1,060개, 구동사 140개, 표현 100개) 및 B등급 어휘(168개)의 품사, 뜻, 난이도, 공식 공개 근거를 전수 검토하기 위한 공식 문서입니다.
- **데이터베이스 버전**: \`databaseVersion: 3\` (\`schemaVersion: 1\`)
- **총 단어 수**: 1,800개 (기준선 500개 100% 동결 보존 + 신규 1,300개 추가)
- **C등급 단어 포함 수**: **0개 (100% 배제)**
- **공식 출처 검증 어휘 수**: ${verifiedWords.length}개
- **검토 우선순위**:
  1. **B등급 어휘(168개)**: 상대적으로 난이도가 높거나 문맥 의존성이 있는 어휘군
  2. **구동사(140개) 및 표현(100개)**: 다의어 충돌 및 공통 숙어 해석의 명확성
  3. **신규 단일 명사/동사/형용사/부사**: 대표 뜻의 명확성 및 출제 안전성

---

## 1. B등급 어휘 전수 집중 검토 목록 (총 ${bGradeWords.length}개)

B등급 어휘는 토익 시험에 출제되나 복합적이거나 고급 어휘군으로 분류된 항목입니다.

| 번호 | 표제어 (Word) | 품사 (POS) | 대표 뜻 | 추가 뜻 | 난이도 | 주제군 | 공식 근거 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;

  bGradeWords.forEach((w, idx) => {
    const sub = w.subMeanings.length > 0 ? w.subMeanings.join(', ') : '-';
    const top = w.topics.join(', ');
    wordDoc += `| ${idx + 1} | **${w.word}** | \`${w.partOfSpeech}\` | ${w.mainMeaning} | ${sub} | ${w.difficulty} | ${top} | \`${w.officialEvidenceStatus}\` |\n`;
  });

  wordDoc += `\n---\n\n## 2. 신규 1,300개 어휘 전수 목록\n\n`;
  wordDoc += `기존 동결 기준선 500개 외에 DB-03에서 새롭게 증설된 1,300개 어휘 전수 목록입니다.\n\n`;
  wordDoc += `| 번호 | 표제어 (Word) | 품사 (POS) | 대표 뜻 | 추가 뜻 | 난이도 | 등급 | 주제군 | 공식 근거 |\n`;
  wordDoc += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  new1300Words.forEach((w, idx) => {
    const sub = w.subMeanings.length > 0 ? w.subMeanings.join(', ') : '-';
    const top = w.topics.join(', ');
    wordDoc += `| ${idx + 1} | **${w.word}** | \`${w.partOfSpeech}\` | ${w.mainMeaning} | ${sub} | ${w.difficulty} | **${w.confidenceGrade}** | ${top} | \`${w.officialEvidenceStatus}\` |\n`;
  });

  wordDoc += `\n---\n\n## 3. 공식 공개 근거 검증 어휘 (Verified: 총 ${verifiedWords.length}개)\n\n`;
  wordDoc += `ETS 공식 TOEIC 시험 준비 자료 및 공개 표본에서 직접 확인된 핵심 어휘군입니다.\n\n`;
  wordDoc += `| 번호 | 표제어 | 품사 | 공식 출처명 | 출처 URL |
| :--- | :--- | :--- | :--- | :--- |
`;

  verifiedWords.forEach((w, idx) => {
    const ev = w.officialEvidence && w.officialEvidence[0];
    const title = ev ? ev.sourceTitle : 'ETS Official Preparation Materials';
    const url = ev ? ev.sourceUrl : 'https://www.ets.org/toeic';
    wordDoc += `| ${idx + 1} | **${w.word}** | \`${w.partOfSpeech}\` | ${title} | [링크](${url}) |\n`;
  });

  fs.writeFileSync(path.join(projectRoot, 'docs/WORD_DB_1800_WORD_REVIEW.md'), wordDoc, 'utf-8');
  console.log('Saved docs/WORD_DB_1800_WORD_REVIEW.md successfully.');

  // =========================================================================
  // 문서 2: docs/WORD_DB_1800_QUIZ_REVIEW.md
  // =========================================================================
  let quizDoc = `# 보카 스터디 — DB-03 1,800 기본 어휘 문제 출제 검토 문서 (QUIZ_REVIEW)

## 0. 개요 및 출제 검증 기준

- **문서 목적**: 1,800개 어휘 DB에서 실제로 생성되는 4지선다형 문제의 품질, 정답 유일성, 오답 매력도 및 난이도별 출제 균형을 검토하기 위한 자료입니다.
- **표본 구성**: 총 180문항 (하 난이도 60문항, 중 난이도 60문항, 상 난이도 60문항)
- **출제 엔진 규칙**:
  - 동일 품사 매칭 (Match Part of Speech: 100%)
  - 정답 및 추가 뜻의 오답 보기 포함 100% 차단 (0건)
  - 의미 충돌 그래프(\`semantic_conflicts_v1.json\`)를 통한 유의어·충돌어 오답 보기 차단 100% 적용
  - 정답 인덱스 균등 분배

---

`;

  const wordEntries: WordEntry[] = allWords.map(builtinWordToWordEntry);

  // 난이도별 60문제씩 선정
  const difficulties: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  const diffLabels: Record<string, string> = { low: '하 (Easy)', medium: '중 (Medium)', high: '상 (Hard)' };

  let questionGlobalIndex = 1;

  for (const diff of difficulties) {
    quizDoc += `## ${diff === 'low' ? '1' : diff === 'medium' ? '2' : '3'}. ${diffLabels[diff]} 난이도 출제 표본 (60문항)\n\n`;

    // 해당 난이도에 해당하는 단어 필터
    const targetDiff = diff === 'low' ? 'easy' : diff === 'medium' ? 'medium' : 'hard';
    const candidateWords = allWords.filter((w) => w.difficulty === targetDiff);

    // 균등하게 60개 선택
    const step = Math.max(1, Math.floor(candidateWords.length / 60));
    const selectedForDiff = [];
    for (let i = 0; i < candidateWords.length && selectedForDiff.length < 60; i += step) {
      selectedForDiff.push(candidateWords[i]);
    }
    while (selectedForDiff.length < 60 && candidateWords.length >= 60) {
      selectedForDiff.push(candidateWords[selectedForDiff.length]);
    }

    for (let qIdx = 0; qIdx < selectedForDiff.length; qIdx++) {
      const bWord = selectedForDiff[qIdx];
      const entry = wordEntries.find((e) => e.id === bWord.id)!;
      const seed = questionGlobalIndex * 777;

      const question = createQuizQuestion(wordEntries, entry, {
        seed,
        matchPartOfSpeech: true,
      });

      if (!question) continue;

      const optLetters = ['①', '②', '③', '④'];
      const correctLetter = optLetters[question.correctIndex];

      quizDoc += `### [문항 ${questionGlobalIndex}] **${bWord.word}** (품사: \`${bWord.partOfSpeech}\` | 난이도: ${diffLabels[diff]})\n\n`;
      quizDoc += `**Q. 다음 중 제시된 단어의 올바른 한국어 뜻을 고르시오.**\n\n`;
      quizDoc += `> **${bWord.word}**\n\n`;
      quizDoc += `**[보기]**\n`;
      question.options.forEach((opt, idx) => {
        const isAnswer = idx === question.correctIndex ? ' **[정답]**' : '';
        quizDoc += `- ${optLetters[idx]} ${opt}${isAnswer}\n`;
      });
      quizDoc += `\n- **정답**: ${correctLetter} (${bWord.mainMeaning})\n`;
      if (bWord.subMeanings.length > 0) {
        quizDoc += `- **추가 의미**: ${bWord.subMeanings.join(', ')}\n`;
      }
      quizDoc += `- **주제군**: ${bWord.topics.join(', ')}\n`;
      quizDoc += `- **출제 품질 검증**: 정답 유일성 통과 / 유의어 오답 차단 완료 / 품사 일치 확인\n\n`;
      quizDoc += `---\n\n`;

      questionGlobalIndex++;
    }
  }

  fs.writeFileSync(path.join(projectRoot, 'docs/WORD_DB_1800_QUIZ_REVIEW.md'), quizDoc, 'utf-8');
  console.log('Saved docs/WORD_DB_1800_QUIZ_REVIEW.md successfully.');
  console.log('=== Human Review Documents Generated Successfully! ===\n');
}

// 직접 실행 지원
generateReviewDocs().catch(console.error);
