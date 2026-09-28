// IndexedDB 로컬 저장 POC 유틸리티 (지시서 39항 준수)
import { db } from './db';
import type { WordEntry } from '../types/word';

export async function runIndexedDbPoc(): Promise<{ success: boolean; message: string; record?: WordEntry }> {
  try {
    const testWord: WordEntry = {
      word: 'acquire',
      meaning: ['획득하다', '습득하다'],
      partOfSpeech: 'verb',
      difficulty: 'medium',
      topic: 'business',
      confidence: 'HIGH',
      createdAt: new Date().toISOString(),
    };

    // 기존에 존재하는지 확인
    const existing = await db.words.where('word').equals('acquire').first();

    if (!existing) {
      await db.words.add(testWord);
    }

    // 다시 읽어서 검증
    const readBack = await db.words.where('word').equals('acquire').first();
    if (!readBack) {
      return { success: false, message: '저장 후 재조회에 실패했습니다.' };
    }

    return {
      success: true,
      message: `IndexedDB 정상 동작 확인 (단어: ${readBack.word}, 뜻: ${readBack.meaning.join(', ')})`,
      record: readBack,
    };
  } catch (error) {
    return {
      success: false,
      message: `IndexedDB 오류: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export async function getWordCount(): Promise<number> {
  return await db.words.count();
}

export async function clearPocWords(): Promise<void> {
  await db.words.clear();
}
