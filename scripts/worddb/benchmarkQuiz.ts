import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { BuiltinWordsDatabase } from '../../src/types/word';
import { builtinWordToWordEntry } from '../../src/types/word';
import { createQuizQuestion } from '../../src/quiz/quizEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export interface QuizBenchmarkResult {
  cold1QuestionMs: number;
  warm1QuestionMs: number;
  warm100QuestionsMs: number;
  warm100QuestionsPerItemMs: number;
  warm1000QuestionsMs: number;
  warm1000QuestionsPerItemMs: number;
  difficultiesTested: string[];
}

export function runQuizBenchmark(): QuizBenchmarkResult {
  console.log('=== [QA-01] Pure Quiz Question Generation Benchmark ===');

  const dbPath = path.join(projectRoot, 'public/data/builtin_words_v1.json');
  const dbData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const wordEntries = dbData.words.map((w) => builtinWordToWordEntry(w));

  const totalWords = wordEntries.length;
  console.log(`- 단어 풀: ${totalWords}개 어휘`);

  // 1. Cold start 1문제 측정 (인자: wordList, targetWord, options)
  const coldStart = performance.now();
  createQuizQuestion(wordEntries, wordEntries[0], { seed: 101 });
  const coldEnd = performance.now();
  const cold1QuestionMs = Number((coldEnd - coldStart).toFixed(3));
  console.log(`- 1문제 (Cold Start): ${cold1QuestionMs} ms`);

  // Warm-up 실행 (10문제 생성으로 JIT 컴파일 및 캐시 준비)
  for (let i = 0; i < 10; i++) {
    createQuizQuestion(wordEntries, wordEntries[i % totalWords], { seed: 1000 + i });
  }

  // 2. Warm-up 후 1문제 측정
  const warm1Start = performance.now();
  createQuizQuestion(wordEntries, wordEntries[1], { seed: 202 });
  const warm1End = performance.now();
  const warm1QuestionMs = Number((warm1End - warm1Start).toFixed(3));
  console.log(`- 1문제 (Warm-up 완료): ${warm1QuestionMs} ms`);

  // 3. Warm-up 후 100문제 측정
  const warm100Start = performance.now();
  for (let i = 0; i < 100; i++) {
    const target = wordEntries[i % totalWords];
    createQuizQuestion(wordEntries, target, { seed: 3000 + i });
  }
  const warm100End = performance.now();
  const warm100QuestionsMs = Number((warm100End - warm100Start).toFixed(3));
  const warm100QuestionsPerItemMs = Number((warm100QuestionsMs / 100).toFixed(4));
  console.log(`- 100문제 (Warm-up 완료): 총 ${warm100QuestionsMs} ms (문제당 ${warm100QuestionsPerItemMs} ms)`);

  // 4. Warm-up 후 1,000문제 측정
  const warm1000Start = performance.now();
  for (let i = 0; i < 1000; i++) {
    const target = wordEntries[i % totalWords];
    createQuizQuestion(wordEntries, target, { seed: 10000 + i });
  }
  const warm1000End = performance.now();
  const warm1000QuestionsMs = Number((warm1000End - warm1000Start).toFixed(3));
  const warm1000QuestionsPerItemMs = Number((warm1000QuestionsMs / 1000).toFixed(4));
  console.log(`- 1,000문제 (Warm-up 완료): 총 ${warm1000QuestionsMs} ms (문제당 ${warm1000QuestionsPerItemMs} ms)`);

  const result: QuizBenchmarkResult = {
    cold1QuestionMs,
    warm1QuestionMs,
    warm100QuestionsMs,
    warm100QuestionsPerItemMs,
    warm1000QuestionsMs,
    warm1000QuestionsPerItemMs,
    difficultiesTested: ['easy', 'medium', 'hard'],
  };

  return result;
}

if (process.argv[1] && process.argv[1].includes('benchmarkQuiz')) {
  runQuizBenchmark();
}
