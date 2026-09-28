import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('QA-02 공식 근거 본문 대조 감사 (evidenceContentMatch.test.ts)', () => {
  const dbPath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');
  const db: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  const verifiedWords = db.words.filter((w) => w.officialEvidenceStatus === 'verified');

  it('공식 근거 검증 완료 단어(verified)는 정확히 406개여야 한다 (지시서 20항)', () => {
    expect(verifiedWords.length).toBe(406);
  });

  it('verified 단어는 모두 CONTENT_VERIFIED 매칭 메타데이터를 보유해야 한다 (지시서 21, 22, 50항)', () => {
    verifiedWords.forEach((w) => {
      expect(w.officialEvidence).toBeDefined();
      expect(w.officialEvidence!.length).toBeGreaterThan(0);
      const ev = w.officialEvidence![0] as any;
      expect(ev.matchType).toBe('CONTENT_VERIFIED');
      expect(ev.verifiedHeadword).toBe(w.word);
    });
  });

  it('verified 단어의 locator는 표제어와 정확히 1:1 대조되어야 한다 (지시서 21항)', () => {
    verifiedWords.forEach((w) => {
      const ev = w.officialEvidence![0];
      expect(ev.locator).toBeDefined();
      expect(ev.locator).toContain(w.word);
    });
  });

  it('공식 근거 URL은 공식 ETS 도메인이어야 한다 (지시서 20항)', () => {
    verifiedWords.forEach((w) => {
      const ev = w.officialEvidence![0];
      expect(ev.sourceUrl).toContain('ets.org');
    });
  });
});
