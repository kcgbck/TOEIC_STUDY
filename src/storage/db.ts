// Dexie 기반 IndexedDB 저장소 정의
import Dexie, { type Table } from 'dexie';
import type { WordEntry, WordBook, StudyHistory, WordStat } from '../types/word';

export interface AppSetting {
  key: string;
  value: string | number | boolean;
}

export class ToeicStudyDatabase extends Dexie {
  words!: Table<WordEntry, string>;
  wordBooks!: Table<WordBook, string>;
  studyHistory!: Table<StudyHistory, string>;
  wordStats!: Table<WordStat, string>;
  appSettings!: Table<AppSetting, string>;

  constructor() {
    super('ToeicStudyPwaDB');
    this.version(1).stores({
      words: '++id, word, partOfSpeech, difficulty, topic, sourceBookId, confidence',
      wordBooks: '++id, title, sourceType, createdAt',
      studyHistory: '++id, wordId, isCorrect, studiedAt',
      wordStats: 'wordId, learningStatus, totalCount, wrongCount, lastStudiedAt',
      appSettings: 'key',
    });
  }
}

export const db = new ToeicStudyDatabase();
