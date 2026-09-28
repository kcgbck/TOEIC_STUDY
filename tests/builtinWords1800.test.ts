// DB-03 공식 릴리스 1,800개 전수 무결성 테스트 (지시서 Section 86 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('DB-03 공식 릴리스 1,800개 전수 무결성 (builtinWords1800.test.ts)', () => {
  const releasePath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');
  expect(fs.existsSync(releasePath)).toBe(true);

  const releaseData: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(releasePath, 'utf-8'));
  const words = releaseData.words;

  it('데이터베이스 메타데이터가 databaseVersion=4, wordCount=1800이어야 한다', () => {
    expect(releaseData.schemaVersion).toBe(1);
    expect(releaseData.databaseVersion).toBe(4);
    expect(releaseData.wordCount).toBe(1800);
    expect(words.length).toBe(1800);
  });

  it('단어 ID 중복이 0건이어야 한다', () => {
    const idSet = new Set<string>();
    for (const w of words) {
      expect(idSet.has(w.id)).toBe(false);
      idSet.add(w.id);
    }
    expect(idSet.size).toBe(1800);
  });

  it('(lemma, partOfSpeech) 복합 고유성이 100% 보장되어야 한다', () => {
    const lemmaPosSet = new Set<string>();
    for (const w of words) {
      const key = `${w.lemma.toLowerCase()}:${w.partOfSpeech}`;
      expect(lemmaPosSet.has(key)).toBe(false);
      lemmaPosSet.add(key);
    }
    expect(lemmaPosSet.size).toBe(1800);
  });

  it('출제 대상 어휘 1,800개 중 C등급 단어가 단 1개도 없어야 한다 (전원 A 또는 B)', () => {
    for (const w of words) {
      expect(['A', 'B']).toContain(w.confidenceGrade);
      expect(w.confidenceGrade).not.toBe('C');
    }
  });

  it('1,800개 전원이 quizEligible=true 및 status="quiz_ready"여야 한다', () => {
    for (const w of words) {
      expect(w.quizEligible).toBe(true);
      expect(w.status).toBe('quiz_ready');
    }
  });

  it('핵심 필수 필드(word, lemma, partOfSpeech, mainMeaning)에 빈 문자열이 없어야 한다', () => {
    for (const w of words) {
      expect(w.word.trim().length).toBeGreaterThan(0);
      expect(w.lemma.trim().length).toBeGreaterThan(0);
      expect(w.partOfSpeech.trim().length).toBeGreaterThan(0);
      expect(w.mainMeaning.trim().length).toBeGreaterThan(0);
      expect(w.subMeanings).toBeDefined();
      expect(Array.isArray(w.subMeanings)).toBe(true);
      expect(w.topics).toBeDefined();
      expect(w.topics.length).toBeGreaterThan(0);
    }
  });

  it('공식 증거 상태가 verified인 경우 출처 URL 및 자료명이 추적 가능해야 한다', () => {
    const verifiedWords = words.filter((w) => w.officialEvidenceStatus === 'verified');
    expect(verifiedWords.length).toBeGreaterThan(200);

    for (const vw of verifiedWords) {
      expect(vw.officialEvidence).toBeDefined();
      expect(vw.officialEvidence!.length).toBeGreaterThan(0);
      const ev = vw.officialEvidence![0];
      expect(ev.sourceUrl).toContain('http');
      expect(ev.sourceTitle.length).toBeGreaterThan(5);
      expect(ev.accessedAt.length).toBeGreaterThan(5);
    }
  });
});
