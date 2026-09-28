// 의미 충돌 차단 그래프 무결성 테스트 (지시서 DB-03 Section 44, 45, 88 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('DB-03 의미 충돌 차단 그래프 무결성 검증 (semanticConflictGraph.test.ts)', () => {
  const jsonPath = path.resolve(__dirname, '../src/data/semantic_conflicts_v1.json');
  expect(fs.existsSync(jsonPath)).toBe(true);

  const rawJson = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(rawJson);
  const entries: Record<string, { strict_synonym: string[]; quiz_conflict: string[]; confusable: string[] }> = data.entries;

  it('의미 충돌 사전 버전 및 필수 메타데이터가 존재해야 한다', () => {
    expect(data.version).toBe('3.0.0');
    expect(typeof data.total_nodes).toBe('number');
    expect(data.total_nodes).toBeGreaterThan(0);
  });

  it('비대칭 strict_synonym 관계가 0건이어야 한다 (대칭성 검사)', () => {
    let asymmetricCount = 0;
    for (const [source, rels] of Object.entries(entries)) {
      for (const target of rels.strict_synonym) {
        const targetEntry = entries[target];
        expect(targetEntry).toBeDefined();
        if (!targetEntry || !targetEntry.strict_synonym.includes(source)) {
          console.error(`[비대칭 strict_synonym] ${source} -> ${target} (역방향 누락)`);
          asymmetricCount++;
        }
      }
    }
    expect(asymmetricCount).toBe(0);
  });

  it('비대칭 quiz_conflict 관계가 0건이어야 한다 (대칭성 검사)', () => {
    let asymmetricCount = 0;
    for (const [source, rels] of Object.entries(entries)) {
      for (const target of rels.quiz_conflict) {
        const targetEntry = entries[target];
        expect(targetEntry).toBeDefined();
        if (!targetEntry || !targetEntry.quiz_conflict.includes(source)) {
          console.error(`[비대칭 quiz_conflict] ${source} -> ${target} (역방향 누락)`);
          asymmetricCount++;
        }
      }
    }
    expect(asymmetricCount).toBe(0);
  });

  it('노드 내부에 중복된 엣지(edge)가 0건이어야 한다', () => {
    for (const [_source, rels] of Object.entries(entries)) {
      const strictSet = new Set(rels.strict_synonym);
      expect(strictSet.size).toBe(rels.strict_synonym.length);

      const conflictSet = new Set(rels.quiz_conflict);
      expect(conflictSet.size).toBe(rels.quiz_conflict.length);

      // strict_synonym과 quiz_conflict 간 중복이 없어야 함
      for (const s of rels.strict_synonym) {
        expect(conflictSet.has(s)).toBe(false);
      }
    }
  });

  it('자기 자신을 차단하는 자가 루프(self-loop) 엣지가 0건이어야 한다', () => {
    for (const [source, rels] of Object.entries(entries)) {
      expect(rels.strict_synonym).not.toContain(source);
      expect(rels.quiz_conflict).not.toContain(source);
    }
  });
});
