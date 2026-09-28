// 사람 검토용 리뷰셋 생성 스크립트 (지시서 DB-PILOT-200 Section 29, 30 준수)
// 하 난이도 30문제, 중 난이도 30문제, 상 난이도 30문제 (총 90문제 + 정답 표시)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuiltinWordsDatabase, WordEntry } from '../../src/types/word';
import { builtinWordToWordEntry } from '../../src/types/word';
import { createQuizQuestion } from '../../src/quiz/quizEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export function generateReviewSet() {
  const jsonPath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  const dbData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const words = dbData.words;
  const wordEntries: WordEntry[] = words.map(builtinWordToWordEntry);

  const easyWords = words.filter((w) => w.difficulty === 'easy');
  const mediumWords = words.filter((w) => w.difficulty === 'medium');
  const hardWords = words.filter((w) => w.difficulty === 'hard');

  console.log(`[정보] 난이도별 어휘 수: easy=${easyWords.length}, medium=${mediumWords.length}, hard=${hardWords.length}`);

  let md = `# 보카 스터디 어휘 DB 파일럿 리뷰셋 (WORD_DB_PILOT_REVIEW.md)

> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디  
> 지시서 DB-PILOT-200 Section 29~30 준수: 체감 난이도 및 보기 적합성 인간 검토용 90선  
> 생성일: 2026-09-29 / 대상: 하 30문제, 중 30문제, 상 30문제 (총 90문제)

---

## 1. 검토 가이드라인 (지시서 30항)

본 문서는 자동 테스트와 별개로 사람이 직접 눈으로 다음 기준을 확인하기 위한 검토셋입니다.
1. **하(EASY)**: 일상 및 초급 비즈니스에서 직관적으로 파악 가능한 난이도인가?
2. **중(MEDIUM)**: 전형적인 TOEIC 실무 시험 수준의 어휘 및 보기 변별력을 갖추었는가?
3. **상(HARD)**: 억지로 애매하거나 모호하지 않으며, 고급 실무 어휘로서 정답이 명확한가?
4. **보기 자연성**: 4지선다 한국어 뜻이 어색하지 않고 자연스러운가?
5. **정답 유일성**: 복수정답 또는 동의어로 인한 이의제기 소지가 완전히 배제되었는가?

---

`;

  const generateSection = (
    title: string,
    diffKey: 'easy' | 'medium' | 'hard',
    targetList: typeof words,
    count: number
  ) => {
    md += `## 2.${diffKey === 'easy' ? '1' : diffKey === 'medium' ? '2' : '3'}. ${title} (${count}문제)\n\n`;

    const selectedTargets = targetList.slice(0, count);
    for (let i = 0; i < selectedTargets.length; i++) {
      const bWord = selectedTargets[i];
      const entry = builtinWordToWordEntry(bWord);

      const q = createQuizQuestion(wordEntries, entry, {
        seed: 777 + i * 13,
        matchPartOfSpeech: true,
      });

      if (!q) {
        md += `### Q${i + 1}. [ERROR] 문제 생성 실패: ${bWord.word}\n\n`;
        continue;
      }

      md += `### Q${i + 1}. 다음 영어 단어의 올바른 한국어 뜻을 고르시오.\n\n`;
      md += `**[ ${q.word} ]**  \n`;
      md += `- 품사: \`${bWord.partOfSpeech}\` | 난이도: \`${bWord.difficulty.toUpperCase()}\` | 주제: \`${bWord.topics.join(', ')}\`\n\n`;

      q.options.forEach((opt, idx) => {
        const isAnswer = idx === q.correctIndex;
        md += `- (${idx + 1}) ${opt} ${isAnswer ? '👈 **[정답]**' : ''}\n`;
      });

      md += `\n> **해설**: 대표 뜻은 **'${bWord.mainMeaning}'**이며, 추가 인정 뜻은 [${bWord.subMeanings.join(', ') || '없음'}]입니다.\n\n`;
      md += `---\n\n`;
    }
  };

  generateSection('하 난이도 (EASY) 검토셋', 'easy', easyWords, 30);
  generateSection('중 난이도 (MEDIUM) 검토셋', 'medium', mediumWords, 30);
  generateSection('상 난이도 (HARD) 검토셋', 'hard', hardWords, 30);

  const reviewPath = path.join(projectRoot, 'docs/WORD_DB_PILOT_REVIEW.md');
  fs.writeFileSync(reviewPath, md, 'utf-8');
  console.log(`[ReviewSet] 생성 완료: ${reviewPath} (90문제)`);
}

generateReviewSet();
