// 공식 근거 추적성 검증 테스트 (지시서 DB-03 Section 5~7, 87 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('DB-03 공식 근거 추적성 감사 (evidenceTraceability.test.ts)', () => {
  const releasePath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');
  expect(fs.existsSync(releasePath)).toBe(true);

  const rawJson = fs.readFileSync(releasePath, 'utf-8');
  const dbData: BuiltinWordsDatabase = JSON.parse(rawJson);
  const words = dbData.words;

  it('officialEvidenceStatus가 유효한 값(verified, none, unknown) 중 하나여야 한다', () => {
    for (const w of words) {
      if (w.officialEvidenceStatus) {
        expect(['verified', 'none', 'unknown']).toContain(w.officialEvidenceStatus);
      }
    }
  });

  it('officialEvidenceStatus가 verified인 단어는 반드시 구체적인 source URL, title, accessedAt이 존재해야 한다 (지시서 5, 87항)', () => {
    let verifiedCount = 0;
    for (const w of words) {
      if (w.officialEvidenceStatus === 'verified') {
        verifiedCount++;
        expect(w.officialEvidence).toBeDefined();
        expect(Array.isArray(w.officialEvidence)).toBe(true);
        expect(w.officialEvidence!.length).toBeGreaterThan(0);

        for (const item of w.officialEvidence!) {
          expect(item.sourceTitle).toBeDefined();
          expect(item.sourceTitle.trim().length).toBeGreaterThan(0);

          expect(item.sourceUrl).toBeDefined();
          expect(item.sourceUrl).toMatch(/^https?:\/\//);

          expect(item.accessedAt).toBeDefined();
          expect(item.accessedAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
        }
      }
    }
    console.log(`[Traceability] 공식 근거 검증 완료(verified) 단어 수: ${verifiedCount}개`);
  });

  it('구체적인 출처 URL 근거 없이 verified로 설정된 허위 근거 단어가 0건이어야 한다 (지시서 4, 6항)', () => {
    let ungroundedVerifiedCount = 0;
    for (const w of words) {
      if (w.officialEvidenceStatus === 'verified') {
        const hasValidUrl = w.officialEvidence && w.officialEvidence.some((ev) => ev.sourceUrl && ev.sourceUrl.startsWith('http'));
        if (!hasValidUrl) {
          ungroundedVerifiedCount++;
          console.error(`[허위 근거 발견] ${w.word} (ID: ${w.id}) - officialEvidenceStatus가 verified이나 URL 부재`);
        }
      }
    }
    expect(ungroundedVerifiedCount).toBe(0);
  });
});
