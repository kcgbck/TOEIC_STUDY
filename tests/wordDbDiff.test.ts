// DB-03 데이터베이스 Diff 및 기준선 회귀 감사 테스트 (지시서 Section 16, 85 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('DB-03 데이터베이스 Diff 및 기준선 회귀 감사 (wordDbDiff.test.ts)', () => {
  const baseline500Path = path.resolve(__dirname, '../data/worddb/baseline_500.json');
  const releasePath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');

  expect(fs.existsSync(baseline500Path)).toBe(true);
  expect(fs.existsSync(releasePath)).toBe(true);

  const baseline500Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baseline500Path, 'utf-8'));
  const releaseData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(releasePath, 'utf-8'));

  const b500Words = baseline500Data.words;
  const releaseWords = releaseData.words;

  it('기존 DB-02 기준선 500개 단어(BASELINE_500)가 정확히 500개 존재해야 한다', () => {
    expect(b500Words.length).toBe(500);
  });

  it('릴리스 1,800개 단어에 기존 500개 단어가 누락 없이 100% 포함되어야 한다 (removed = 0)', () => {
    const releaseIdMap = new Map(releaseWords.map((w) => [w.id, w]));

    for (const bWord of b500Words) {
      expect(releaseIdMap.has(bWord.id)).toBe(true);
    }
  });

  it('기존 500개 단어의 핵심 필드(ID, 표제어, 품사, 대표뜻, 추가뜻)가 무단 변경되지 않아야 한다 (modified = 0)', () => {
    const releaseIdMap = new Map(releaseWords.map((w) => [w.id, w]));

    for (const bWord of b500Words) {
      const rWord = releaseIdMap.get(bWord.id);
      expect(rWord).toBeDefined();
      if (rWord) {
        expect(rWord.word).toBe(bWord.word);
        expect(rWord.lemma).toBe(bWord.lemma);
        expect(rWord.partOfSpeech).toBe(bWord.partOfSpeech);
        expect(rWord.mainMeaning).toBe(bWord.mainMeaning);
        expect(rWord.subMeanings).toEqual(bWord.subMeanings);
      }
    }
  });

  it('신규 추가된 단어 수가 정확히 1,300개여야 한다 (added = 1300, total = 1800)', () => {
    const b500IdSet = new Set(b500Words.map((w) => w.id));
    const addedWords = releaseWords.filter((w) => !b500IdSet.has(w.id));

    expect(addedWords.length).toBe(1300);
    expect(releaseWords.length).toBe(1800);
  });

  it('릴리스 1,800개에 C등급 단어가 단 1개도 포함되지 않아야 한다 (C release = 0)', () => {
    const cGradeWords = releaseWords.filter((w) => w.confidenceGrade === 'C');
    expect(cGradeWords.length).toBe(0);
  });
});
