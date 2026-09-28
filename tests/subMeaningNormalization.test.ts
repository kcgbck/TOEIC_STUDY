import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('QA-02 의미 데이터 정규화 감사 (subMeaningNormalization.test.ts)', () => {
  const dbPath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');
  const conflictPath = path.resolve(__dirname, '../src/data/semantic_conflicts_v1.json');

  const db: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const conflicts = JSON.parse(fs.readFileSync(conflictPath, 'utf-8'));

  it('databaseVersion은 4여야 한다 (지시서 39항)', () => {
    expect(db.databaseVersion).toBe(4);
    db.words.forEach((w) => {
      expect(w.databaseVersion).toBe(4);
    });
  });

  it('대표 뜻과 추가 뜻(subMeanings) 간의 완전 중복(DUPLICATE_OF_MAIN)이 0건이어야 한다 (지시서 6, 49항)', () => {
    let duplicates = 0;
    db.words.forEach((w) => {
      const mainClean = w.mainMeaning.replace(/\s+/g, '');
      (w.subMeanings || []).forEach((sub) => {
        const subClean = sub.replace(/\s+/g, '');
        if (mainClean === subClean || sub === w.mainMeaning) {
          duplicates++;
        }
      });
    });
    expect(duplicates).toBe(0);
  });

  it('동일 단어 내 추가 뜻 간 중복이 없어야 한다', () => {
    db.words.forEach((w) => {
      const subs = w.subMeanings || [];
      const set = new Set(subs);
      expect(set.size).toBe(subs.length);
    });
  });

  it('추가 뜻의 품사 충돌(WRONG_POS)이 0건이어야 한다 (지시서 8, 49항)', () => {
    let wrongPosCount = 0;
    db.words.forEach((w) => {
      (w.subMeanings || []).forEach((sub) => {
        if (w.partOfSpeech === 'noun' && (sub.endsWith('하다') || sub.endsWith('되다'))) {
          wrongPosCount++;
        }
      });
    });
    expect(wrongPosCount).toBe(0);
  });

  it('단순 유의어(QUIZ_CONFLICT_ONLY)는 subMeanings에 남지 않고 semantic_conflicts에서 관리되어야 한다 (지시서 3, 7, 49항)', () => {
    // semantic_conflicts의 strict_synonym / quiz_conflict에 등록된 유의어가 subMeanings에 불필요하게 중복 존재하지 않는지 확인
    let unseparatedSynonyms = 0;
    db.words.forEach((w) => {
      const entry = conflicts.entries[w.mainMeaning];
      if (entry) {
        const conflictsList = [...(entry.strict_synonym || []), ...(entry.quiz_conflict || [])];
        (w.subMeanings || []).forEach((sub) => {
          if (conflictsList.includes(sub)) {
            unseparatedSynonyms++;
          }
        });
      }
    });
    expect(unseparatedSynonyms).toBe(0);
  });
});
