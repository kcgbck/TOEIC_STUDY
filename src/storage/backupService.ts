// TOEIC_STUDY 백업 및 복원 서비스 모듈 (지시서 Section 8, 9 준수)
import { db } from './db';
import type { WordEntry, WordBook, StudyHistory, WordStat } from '../types/word';
import type { AppSetting } from './db';

export const BACKUP_FORMAT_IDENTIFIER = 'toeic-study-backup';
export const CURRENT_BACKUP_VERSION = 1;

export interface BackupDataPayload {
  wordBooks: WordBook[];
  words: WordEntry[];
  wordStats: WordStat[];
  studyHistory: StudyHistory[];
  appSettings: AppSetting[];
}

export interface BackupFileStructure {
  format: typeof BACKUP_FORMAT_IDENTIFIER;
  version: number;
  exportedAt: string;
  appVersion?: string;
  metadata: {
    wordBooksCount: number;
    wordsCount: number;
    studyHistoryCount: number;
  };
  data: BackupDataPayload;
}

export interface BackupSummary {
  valid: boolean;
  version: number;
  exportedAt: string;
  wordBooksCount: number;
  wordsCount: number;
  studyHistoryCount: number;
  errorMessage?: string;
}

/**
 * 전체 IndexedDB 데이터를 JSON 파일 형식으로 추출
 */
export async function exportBackupData(): Promise<BackupFileStructure> {
  const [wordBooks, words, wordStats, studyHistory, appSettings] = await Promise.all([
    db.wordBooks.toArray(),
    db.words.toArray(),
    db.wordStats.toArray(),
    db.studyHistory.toArray(),
    db.appSettings.toArray(),
  ]);

  const backup: BackupFileStructure = {
    format: BACKUP_FORMAT_IDENTIFIER,
    version: CURRENT_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    metadata: {
      wordBooksCount: wordBooks.length,
      wordsCount: words.length,
      studyHistoryCount: studyHistory.length,
    },
    data: {
      wordBooks,
      words,
      wordStats,
      studyHistory,
      appSettings,
    },
  };

  return backup;
}

/**
 * 브라우저에서 JSON 백업 파일 다운로드 트리거
 */
export async function downloadBackupFile(): Promise<string> {
  const backup = await exportBackupData();
  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const fileName = `toeic_study_backup_${dateStr}.json`;

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return fileName;
}

/**
 * 복원 전 백업 파일 스키마 및 무결성 검증
 */
export function validateBackupFile(content: unknown): BackupSummary {
  if (!content || typeof content !== 'object') {
    return {
      valid: false,
      version: 0,
      exportedAt: '',
      wordBooksCount: 0,
      wordsCount: 0,
      studyHistoryCount: 0,
      errorMessage: '유효한 JSON 객체가 아닙니다.',
    };
  }

  const raw = content as Partial<BackupFileStructure>;

  if (raw.format !== BACKUP_FORMAT_IDENTIFIER) {
    return {
      valid: false,
      version: raw.version || 0,
      exportedAt: raw.exportedAt || '',
      wordBooksCount: 0,
      wordsCount: 0,
      studyHistoryCount: 0,
      errorMessage: `지원하지 않는 백업 파일 형식입니다. (식별자: ${raw.format ?? '없음'})`,
    };
  }

  if (raw.version !== CURRENT_BACKUP_VERSION) {
    return {
      valid: false,
      version: raw.version || 0,
      exportedAt: raw.exportedAt || '',
      wordBooksCount: 0,
      wordsCount: 0,
      studyHistoryCount: 0,
      errorMessage: `지원하지 않는 백업 버전입니다. (버전 ${raw.version}, 현재 지원: v${CURRENT_BACKUP_VERSION})`,
    };
  }

  if (!raw.data || typeof raw.data !== 'object') {
    return {
      valid: false,
      version: raw.version,
      exportedAt: raw.exportedAt || '',
      wordBooksCount: 0,
      wordsCount: 0,
      studyHistoryCount: 0,
      errorMessage: '백업 데이터 페이로드가 손상되었습니다.',
    };
  }

  const wordBooksCount = Array.isArray(raw.data.wordBooks) ? raw.data.wordBooks.length : 0;
  const wordsCount = Array.isArray(raw.data.words) ? raw.data.words.length : 0;
  const studyHistoryCount = Array.isArray(raw.data.studyHistory) ? raw.data.studyHistory.length : 0;

  return {
    valid: true,
    version: raw.version,
    exportedAt: raw.exportedAt || '알 수 없음',
    wordBooksCount,
    wordsCount,
    studyHistoryCount,
  };
}

/**
 * 백업 데이터를 IndexedDB에 복원
 */
export async function restoreBackupData(
  backup: BackupFileStructure,
  mode: 'merge' | 'replace' = 'merge'
): Promise<{ success: boolean; restoredWords: number; restoredBooks: number }> {
  const summary = validateBackupFile(backup);
  if (!summary.valid) {
    throw new Error(summary.errorMessage || '백업 파일 검증 실패');
  }

  return await db.transaction('rw', [db.wordBooks, db.words, db.wordStats, db.studyHistory, db.appSettings], async () => {
    if (mode === 'replace') {
      await Promise.all([
        db.wordBooks.clear(),
        db.words.clear(),
        db.wordStats.clear(),
        db.studyHistory.clear(),
        db.appSettings.clear(),
      ]);
    }

    const { wordBooks, words, wordStats, studyHistory, appSettings } = backup.data;

    if (Array.isArray(wordBooks) && wordBooks.length > 0) {
      await db.wordBooks.bulkAdd(wordBooks);
    }
    if (Array.isArray(words) && words.length > 0) {
      await db.words.bulkAdd(words);
    }
    if (Array.isArray(wordStats) && wordStats.length > 0) {
      await db.wordStats.bulkPut(wordStats);
    }
    if (Array.isArray(studyHistory) && studyHistory.length > 0) {
      await db.studyHistory.bulkAdd(studyHistory);
    }
    if (Array.isArray(appSettings) && appSettings.length > 0) {
      await db.appSettings.bulkPut(appSettings);
    }

    return {
      success: true,
      restoredWords: words?.length ?? 0,
      restoredBooks: wordBooks?.length ?? 0,
    };
  });
}
