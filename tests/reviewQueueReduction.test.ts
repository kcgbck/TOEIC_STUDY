import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';

describe('QA-02 사람 검토 큐 압축 감사 (reviewQueueReduction.test.ts)', () => {
  const dbPath = path.resolve(__dirname, '../public/data/builtin_words_v1.json');
  const db: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  it('의미 정규화 후 subMeanings 보유 단어 수가 합리적으로 정돈되어야 한다 (지시서 10, 29, 37항)', () => {
    const polyWords = db.words.filter((w) => (w.subMeanings || []).length > 0);
    // 기존 1,794개에서 유의어가 분리되어 실제 다의어만 남았는지 확인
    expect(polyWords.length).toBeLessThan(100);
    expect(polyWords.length).toBeGreaterThan(0);
  });

  it('B등급 168개 전수는 반드시 검토 대상에 보존되어야 한다 (지시서 26항)', () => {
    const bWords = db.words.filter((w) => w.confidenceGrade === 'B');
    expect(bWords.length).toBe(168);
  });

  it('사람 검토 큐는 QA-01의 1,007개 대비 실질적으로 압축되어야 한다 (지시서 25, 30항)', () => {
    // 고위험 핵심 검토 대상: B등급 168개 + 실제 다의어 + 띄어쓰기 확인 대상 등
    const highRiskSet = new Set<string>();
    db.words.forEach((w) => {
      if (w.confidenceGrade === 'B') highRiskSet.add(w.id);
      if ((w.subMeanings || []).length > 0) highRiskSet.add(w.id);
      if (['qualify', 'intact', 'in_transit', 'impeccably', 'courteous', 'distribute', 'illustrate', 'overlook', 'require', 'preferably', 'entail', 'hand out'].includes(w.word)) {
        highRiskSet.add(w.id);
      }
    });

    // 1,007개에서 사람이 판단할 필요 없는 단순 유의어 보유 단어가 제거되어 500개 미만으로 압축됨 확인
    expect(highRiskSet.size).toBeLessThan(500);
    expect(highRiskSet.size).toBeGreaterThanOrEqual(168);
  });
});
