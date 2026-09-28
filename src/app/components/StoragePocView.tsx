import React, { useState, useEffect } from 'react';
import { runIndexedDbPoc, getWordCount, clearPocWords } from '../../storage/storagePoc';
import { db } from '../../storage/db';
import type { WordEntry } from '../../types/word';

export const StoragePocView: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string>('테스트 대기 중');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = async () => {
    const count = await getWordCount();
    setTotalCount(count);
    const list = await db.words.limit(10).toArray();
    setWords(list);
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
    await clearPocWords();
    setStatusMessage('저장소의 모든 테스트 단어가 초기화되었습니다.');
    await refreshData();
  };

  return (
    <div className="card poc-card">
      <h3>💾 IndexedDB 로컬 저장소 POC (39항)</h3>
      <p className="poc-desc">
        서버 없이 브라우저 로컬 데이터베이스(IndexedDB)에 단어를 저장하고, 새로고침 및 재실행 후에도 데이터가 유지되는지 검증합니다.
      </p>

      <div className="poc-actions">
        <button className="btn btn-primary" onClick={handleRunPoc} disabled={isLoading}>
          {isLoading ? '저장 및 검증 중...' : '테스트 레코드 (acquire) 저장 & 읽기'}
        </button>
        <button className="btn btn-secondary" onClick={handleClear} disabled={isLoading}>
          데이터 초기화
        </button>
      </div>

      <div className="poc-result-box">
        <p><strong>상태:</strong> {statusMessage}</p>
        <p><strong>저장된 총 단어 수:</strong> {totalCount}개</p>
      </div>

      {words.length > 0 && (
        <div className="poc-word-list">
          <h4>IndexedDB 저장 단어 미리보기:</h4>
          <ul>
            {words.map((w, i) => (
              <li key={w.id || i}>
                <strong>{w.word}</strong>: {w.meaning.join(', ')} ({w.partOfSpeech}, {w.difficulty})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
