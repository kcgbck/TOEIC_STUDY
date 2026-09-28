// DB-02 데이터 Diff 감사 테스트 (지시서 Section 31, 32, 55 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('DB-02 데이터베이스 Diff 및 회귀 감사 (wordDbDiff.test.ts)', () => {
  const baselinePath = path.resolve(__dirname, '../src/data/builtin_words_pilot_v1.json');
  const releasePath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');

  expect(fs.existsSync(baselinePath)).toBe(true);
  expect(fs.existsSync(releasePath)).toBe(true);

  const baselineData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  const releaseData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(releasePath, 'utf-8'));

  const baselineWords = baselineData.words;
  const releaseWords = releaseData.words;

  it('기존 파일럿 200개 단어가 기준선(PILOT_BASELINE_200)에 정확히 200개 보존되어야 한다', () => {
    expect(baselineWords.length).toBe(200);
  });

  it('릴리스 500개 단어에 기존 200개 단어가 누락 없이 100% 포함되어야 한다 (removed = 0)', () => {
    const releaseIdMap = new Map(releaseWords.map((w) => [w.id, w]));

    for (const bWord of baselineWords) {
      expect(releaseIdMap.has(bWord.id)).toBe(true);
    }
  });

  it('기존 200개 단어의 핵심 필드(ID, 표제어, 품사, 대표뜻, 추가뜻)가 무기록 변경되지 않아야 한다 (modified = 0)', () => {
    const releaseIdMap = new Map(releaseWords.map((w) => [w.id, w]));

    for (const bWord of baselineWords) {
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

  it('신규 추가된 단어 수가 정확히 300개여야 한다 (added = 300)', () => {
    const baselineIdSet = new Set(baselineWords.map((w) => w.id));
    const addedWords = releaseWords.filter((w) => !baselineIdSet.has(w.id));

    expect(addedWords.length).toBe(300);
    expect(releaseWords.length).toBe(500);
  });
});
