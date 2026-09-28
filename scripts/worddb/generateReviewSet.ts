// 사람 검토용 리뷰셋 2종 생성 스크립트 (지시서 DB-02 Section 38~41 준수)
// 1. docs/WORD_DB_500_REVIEW.md: 하 40, 중 40, 상 40 = 120문제
// 2. docs/WORD_DB_500_WORD_REVIEW.md: 신규 300단어 마크다운 테이블 + B등급 집중 검토 목록
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuiltinWordsDatabase, BuiltinWord, WordEntry } from '../../src/types/word';
import { builtinWordToWordEntry } from '../../src/types/word';
import { createQuizQuestion } from '../../src/quiz/quizEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export function generateReviewDocuments() {
  const jsonPath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  const dbData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const words: BuiltinWord[] = dbData.words;
  const wordEntries: WordEntry[] = words.map(builtinWordToWordEntry);

  const baselinePath = path.join(projectRoot, 'src/data/builtin_words_pilot_v1.json');
  const baselineData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  const baselineIds = new Set(baselineData.words.map((w) => w.id));

  const newWords = words.filter((w) => !baselineIds.has(w.id));

  console.log(`[정보] 전체 어휘: ${words.length}개, 신규 어휘: ${newWords.length}개`);

  // =========================================================================
  // 문서 1: docs/WORD_DB_500_REVIEW.md (120문제 퀴즈 리뷰셋)
  // =========================================================================
  let qMd = `# 보카 스터디 500 기본 어휘 문제 검토셋 (WORD_DB_500_REVIEW.md)

> **공개 서비스명**: 보카 스터디 (Voca Study)  
> **기준선**: DB-02 (500단어 데이터베이스 확장)  
> **상태**: \`REVIEW_SET_GENERATED\` / **사람 검토 상태**: \`HUMAN_REVIEW_PENDING\`  
> **생성일**: 2026-09-29  
> **문제 구성**: 하(EASY) 40문제, 중(MEDIUM) 40문제, 상(HARD) 40문제 = 총 120문제  

---

## 1. 인간 검토 가이드라인 (지시서 Section 30, 39 준수)

본 문서는 알고리즘 무결성 검증과 별개로 사람이 직접 눈으로 확인하기 위한 검토셋입니다.
1. **하(EASY)**: 일상 및 초급 비즈니스에서 직관적으로 파악 가능한 난이도인가?
2. **중(MEDIUM)**: 전형적인 TOEIC 실무 시험 수준의 어휘 및 보기 변별력을 갖추었는가?
3. **상(HARD)**: 억지로 애매하거나 모호하지 않으며, 고급 실무 어휘로서 정답이 명확한가?
4. **보기 자연성**: 4지선다 한국어 뜻이 어색하지 않고 자연스러운가?
5. **정답 유일성**: 복수정답 또는 동의어로 인한 이의제기 소지가 완전히 배제되었는가?

---

`;

  const easyWords = words.filter((w) => w.difficulty === 'easy');
  const mediumWords = words.filter((w) => w.difficulty === 'medium');
  const hardWords = words.filter((w) => w.difficulty === 'hard');

  const generateQuizSection = (
    title: string,
    diffKey: 'easy' | 'medium' | 'hard',
    targetList: typeof words,
    count: number
  ) => {
    qMd += `## 2.${diffKey === 'easy' ? '1' : diffKey === 'medium' ? '2' : '3'}. ${title} (${count}문제)\n\n`;

    const selectedTargets = targetList.slice(0, count);
    for (let i = 0; i < selectedTargets.length; i++) {
      const bWord = selectedTargets[i];
      const entry = builtinWordToWordEntry(bWord);

      const q = createQuizQuestion(wordEntries, entry, {
        seed: 8888 + i * 17 + (diffKey === 'easy' ? 100 : diffKey === 'medium' ? 200 : 300),
        matchPartOfSpeech: true,
      });

      if (!q) {
        qMd += `### Q${i + 1}. [ERROR] 문제 생성 실패: ${bWord.word}\n\n`;
        continue;
      }

      qMd += `### Q${i + 1}. 다음 영어 단어의 올바른 한국어 뜻을 고르시오.\n\n`;
      qMd += `**[ ${q.word} ]**  \n`;
      qMd += `- 품사: \`${bWord.partOfSpeech}\` | 난이도: \`${bWord.difficulty.toUpperCase()}\` | 등급: \`${bWord.confidenceGrade}\` | 주제: \`${bWord.topics.join(', ')}\`\n\n`;

      qMd += `| 번호 | 보기 선택지 | 정답 여부 |\n`;
      qMd += `| :---: | :--- | :---: |\n`;
      q.options.forEach((opt, idx) => {
        const isAnswer = idx === q.correctIndex;
        qMd += `| (${idx + 1}) | ${opt} | ${isAnswer ? '👈 **[정답]**' : ''} |\n`;
      });

      qMd += `\n> **해설**: 대표 뜻은 **'${bWord.mainMeaning}'**이며, 추가 인정 뜻은 [${bWord.subMeanings.join(', ') || '없음'}]입니다.\n\n`;
      qMd += `---\n\n`;
    }
  };

  generateQuizSection('하 난이도 (EASY) 검토셋', 'easy', easyWords, 40);
  generateQuizSection('중 난이도 (MEDIUM) 검토셋', 'medium', mediumWords, 40);
  generateQuizSection('상 난이도 (HARD) 검토셋', 'hard', hardWords, 40);

  const reviewQuestionsPath = path.join(projectRoot, 'docs/WORD_DB_500_REVIEW.md');
  fs.writeFileSync(reviewQuestionsPath, qMd, 'utf-8');
  console.log(`[ReviewDoc] 생성 완료: ${reviewQuestionsPath} (120문제)`);

  // =========================================================================
  // 문서 2: docs/WORD_DB_500_WORD_REVIEW.md (신규 300개 테이블 + B등급 집중 검토)
  // =========================================================================
  let wMd = `# 보카 스터디 신규 어휘 300 의미 검토 목록 (WORD_DB_500_WORD_REVIEW.md)

> **공개 서비스명**: 보카 스터디 (Voca Study)  
> **기준선**: DB-02 (누적 500개 어휘 DB 확대)  
> **상태**: \`REVIEW_SET_GENERATED\` / **사람 검토 상태**: \`HUMAN_REVIEW_PENDING\`  
> **생성일**: 2026-09-29  
> **대상**: 신규 추가 어휘 300개 전수 목록 및 B등급 집중 검토군  

---

## 1. 신규 B등급 집중 검토군 (지시서 Section 41 준수)

아래 어휘는 일상 빈도 및 시험 적합성은 우수하나, 다의어 분기나 문맥에 따른 뉘앙스 주의가 필요하여 \`B등급\`으로 분류된 어휘입니다.  
검토 시 대표 뜻과 추가 뜻의 자연성을 집중 확인해 주십시오.

| 번호 | 단어 (Word) | 품사 | 대표 뜻 | 추가 뜻 | 난이도 | 주요 주제 |
| :---: | :--- | :---: | :--- | :--- | :---: | :--- |
`;

  const newBWords = newWords.filter((w) => w.confidenceGrade === 'B');
  newBWords.forEach((w, idx) => {
    wMd += `| ${idx + 1} | **${w.word}** | \`${w.partOfSpeech}\` | ${w.mainMeaning} | ${w.subMeanings.join(', ') || '-'} | \`${w.difficulty}\` | ${w.topics.join(', ')} |\n`;
  });

  wMd += `\n> **B등급 요약**: 신규 300단어 중 총 **${newBWords.length}개** 어휘 (누적 500 기준 총 ${words.filter((w) => w.confidenceGrade === 'B').length}개)\n\n`;
  wMd += `---\n\n`;

  wMd += `## 2. 신규 어휘 300 전수 목록 (지시서 Section 40 준수)\n\n`;
  wMd += `| 번호 | 단어 | 품사 | 대표 뜻 | 추가 뜻 | 난이도 | 주제 | 등급 |\n`;
  wMd += `| :---: | :--- | :---: | :--- | :--- | :---: | :--- | :---: |\n`;

  newWords.forEach((w, idx) => {
    wMd += `| ${idx + 1} | **${w.word}** | \`${w.partOfSpeech}\` | ${w.mainMeaning} | ${w.subMeanings.join(', ') || '-'} | \`${w.difficulty}\` | ${w.topics.join(', ')} | \`${w.confidenceGrade}\` |\n`;
  });

  wMd += `\n---\n\n`;
  wMd += `## 3. 검토 피드백 기록란\n\n`;
  wMd += `- 검토자:\n`;
  wMd += `- 검토일자:\n`;
  wMd += `- 특이사항 및 정오 의견: (수정 필요 어휘 발생 시 \`docs/WORD_DB_ERRATA.md\`에 기록)\n`;

  const reviewWordsPath = path.join(projectRoot, 'docs/WORD_DB_500_WORD_REVIEW.md');
  fs.writeFileSync(reviewWordsPath, wMd, 'utf-8');
  console.log(`[ReviewDoc] 생성 완료: ${reviewWordsPath} (신규 300단어 표 + B등급 ${newBWords.length}단어 집중목록)`);
}

generateReviewDocuments();
