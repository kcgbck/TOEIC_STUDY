import React, { useState, useEffect, useRef } from 'react';
import { runIndexedDbPoc, getWordCount, clearPocWords } from '../../storage/storagePoc';
import { checkStorageHealth, requestStoragePersistence, type StorageHealth } from '../../storage/storageHealth';
import {
  downloadBackupFile,
  validateBackupFile,
  restoreBackupData,
  type BackupSummary,
  type BackupFileStructure,
} from '../../storage/backupService';
import { db } from '../../storage/db';
import type { WordEntry } from '../../types/word';

export const StoragePocView: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string>('저장소 대기 중');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [bookCount, setBookCount] = useState<number>(0);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storageHealth, setStorageHealth] = useState<StorageHealth | null>(null);

  // 백업/복원 관련 상태
  const [restoreCandidate, setRestoreCandidate] = useState<{
    content: BackupFileStructure;
    summary: BackupSummary;
  } | null>(null);
  const [backupNotice, setBackupNotice] = useState<string>('');

  const restoreInputRef = useRef<HTMLInputElement | null>(null);

  const refreshData = async () => {
    const [wCount, bCount, list, health] = await Promise.all([
      getWordCount(),
      db.wordBooks.count(),
      db.words.limit(10).toArray(),
      checkStorageHealth(),
    ]);
    setTotalCount(wCount);
    setBookCount(bCount);
    setWords(list);
    setStorageHealth(health);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleRunPoc = async () => {
    setIsLoading(true);
    const result = await runIndexedDbPoc();
    setStatusMessage(result.message);
    await refreshData();
    setIsLoading(false);
  };

  const handleClear = async () => {
    if (!window.confirm('저장소의 모든 단어와 문제집을 초기화하시겠습니까?')) return;
    await clearPocWords();
    await db.wordBooks.clear();
    await db.studyHistory.clear();
    setStatusMessage('저장소의 모든 데이터가 초기화되었습니다.');
    await refreshData();
  };

  const handleRequestPersistence = async () => {
    const granted = await requestStoragePersistence();
    setBackupNotice(
      granted
        ? '✓ 영속적 저장소 권한이 승인되었습니다.'
        : '영속적 저장소 요청이 거부되었거나 이미 적용 중입니다.'
    );
    await refreshData();
  };

  const handleBackupExport = async () => {
    try {
      const fileName = await downloadBackupFile();
      setBackupNotice(`✓ 백업 파일 다운로드 완료: ${fileName}`);
    } catch (err) {
      setBackupNotice(`백업 실패: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleRestoreFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const summary = validateBackupFile(parsed);
        if (!summary.valid) {
          setBackupNotice(`✕ 유효하지 않은 백업 파일: ${summary.errorMessage}`);
          setRestoreCandidate(null);
          return;
        }
        setRestoreCandidate({ content: parsed, summary });
        setBackupNotice('');
      } catch {
        setBackupNotice('✕ 올바른 JSON 파일이 아닙니다.');
        setRestoreCandidate(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = async (mode: 'merge' | 'replace') => {
    if (!restoreCandidate) return;
    setIsLoading(true);
    try {
      const res = await restoreBackupData(restoreCandidate.content, mode);
      setBackupNotice(`✓ 복원 성공: ${res.restoredBooks}개 문제집, ${res.restoredWords}개 단어 복원 완료`);
      setRestoreCandidate(null);
      await refreshData();
    } catch (err) {
      setBackupNotice(`복원 실패: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card poc-card">
      <div className="section-header">
        <h3>💾 로컬 저장소 및 데이터 안전 백업/복원</h3>
        <span className="badge badge-success">오프라인 영속성</span>
      </div>

      <p className="poc-desc">
        사용자의 모든 단어장과 학습 기록은 외부 서버로 전송되지 않고 브라우저 IndexedDB에 안전하게 보관됩니다.
        기기 변경 또는 캐시 정리에 대비하여 JSON 백업/복원 기능을 제공합니다.
      </p>

      {/* 저장소 상태 진단 (StorageHealth) */}
      {storageHealth && (
        <div className="pdf-metrics-grid" style={{ marginBottom: '20px' }}>
          <div className="metric-box">
            <span className="metric-label">저장소 영속성 상태:</span>
            <span className={`metric-val ${storageHealth.persisted ? 'text-success' : 'text-warning'}`}>
              {storageHealth.persisted ? '영속 모드 (자동삭제 제외)' : '일반 모드'}
            </span>
          </div>
          <div className="metric-box">
            <span className="metric-label">사용 용량 / 할당 한도:</span>
            <span className="metric-val">{storageHealth.usageFormatted} / {storageHealth.quotaFormatted}</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">저장된 문제집 / 단어:</span>
            <span className="metric-val">{bookCount}개 문제집 / {totalCount}개 단어</span>
          </div>
        </div>
      )}

      {/* 백업 및 복원 컨트롤 */}
      <div className="action-buttons-row">
        <button className="btn btn-primary" onClick={handleBackupExport}>
          📥 데이터 백업 파일 다운로드
        </button>

        <label className="btn btn-secondary file-input-label" style={{ padding: '10px 18px' }}>
          <span>📤 백업 파일 복원 (.json)</span>
          <input
            ref={restoreInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleRestoreFileSelect}
            style={{ display: 'none' }}
          />
        </label>

        {!storageHealth?.persisted && storageHealth?.supported && (
          <button className="btn btn-secondary" onClick={handleRequestPersistence}>
            🔒 브라우저 영속성(Persist) 요청
          </button>
        )}

        <button className="btn btn-secondary" onClick={handleRunPoc} disabled={isLoading}>
          POC 단어 추가
        </button>

        <button className="btn-text-danger" onClick={handleClear} disabled={isLoading}>
          데이터 전체 초기화
        </button>
      </div>

      {backupNotice && <p className="loading-text" style={{ margin: '10px 0' }}>{backupNotice}</p>}

      {/* 복원 확인 모달/패널 */}
      {restoreCandidate && (
        <div className="extracted-section" style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
          <h4>📋 복원 대상 백업 파일 정보</h4>
          <p>내보낸 일시: <strong>{new Date(restoreCandidate.summary.exportedAt).toLocaleString('ko-KR')}</strong></p>
          <p>포함된 문제집: <strong>{restoreCandidate.summary.wordBooksCount}개</strong> | 단어: <strong>{restoreCandidate.summary.wordsCount}개</strong> | 학습 이력: <strong>{restoreCandidate.summary.studyHistoryCount}개</strong></p>

          <div className="action-buttons-row" style={{ marginTop: '12px' }}>
            <button className="btn btn-accent" onClick={() => handleConfirmRestore('merge')} disabled={isLoading}>
              기존 데이터와 병합하여 복원
            </button>
            <button className="btn btn-secondary" onClick={() => handleConfirmRestore('replace')} disabled={isLoading}>
              기존 데이터 덮어쓰고 복원
            </button>
            <button className="btn btn-secondary" onClick={() => setRestoreCandidate(null)}>
              취소
            </button>
          </div>
        </div>
      )}

      <div className="poc-result-box" style={{ marginTop: '20px' }}>
        <p><strong>진단 메모:</strong> {storageHealth?.persistenceMessage}</p>
        <p><strong>상태 로그:</strong> {statusMessage}</p>
      </div>

      {words.length > 0 && (
        <div className="poc-word-list">
          <h4>저장된 단어 샘플 (상위 10개):</h4>
          <ul>
            {words.map((w, i) => (
              <li key={w.id || i}>
                <strong>{w.word}</strong>: {w.meaning.join(', ')} ({w.partOfSpeech})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
