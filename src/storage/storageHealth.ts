// 브라우저 저장소 영속성 및 상태 진단 모듈 (지시서 Section 7 준수)

export interface StorageHealth {
  supported: boolean;
  persisted: boolean;
  usageBytes: number;
  quotaBytes: number;
  usageFormatted: string;
  quotaFormatted: string;
  percentUsed: number;
  persistenceMessage: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * 브라우저의 저장소 영속성 상태 및 용량 진단
 */
export async function checkStorageHealth(): Promise<StorageHealth> {
  const isSupported =
    typeof navigator !== 'undefined' &&
    'storage' in navigator &&
    typeof navigator.storage?.estimate === 'function';

  if (!isSupported) {
    return {
      supported: false,
      persisted: false,
      usageBytes: 0,
      quotaBytes: 0,
      usageFormatted: '미지원',
      quotaFormatted: '미지원',
      percentUsed: 0,
      persistenceMessage: 'Storage Manager API를 지원하지 않는 브라우저입니다.',
    };
  }

  try {
    // 1. 영속성(Persisted) 상태 확인
    let isPersisted = false;
    if (typeof navigator.storage.persisted === 'function') {
      isPersisted = await navigator.storage.persisted();
    }

    // 2. 용량 견적 확인
    const estimate = await navigator.storage.estimate();
    const usageBytes = estimate.usage ?? 0;
    const quotaBytes = estimate.quota ?? 0;
    const percentUsed = quotaBytes > 0 ? (usageBytes / quotaBytes) * 100 : 0;

    let persistenceMessage = isPersisted
      ? '영속적 저장소 활성화 (브라우저 자동 삭제 제외 대상)'
      : '일반 저장소 (저장공간 부족 시 브라우저 정책에 의해 정리될 수 있음)';

    return {
      supported: true,
      persisted: isPersisted,
      usageBytes,
      quotaBytes,
      usageFormatted: formatBytes(usageBytes),
      quotaFormatted: formatBytes(quotaBytes),
      percentUsed: Number(percentUsed.toFixed(1)),
      persistenceMessage,
    };
  } catch (err) {
    return {
      supported: true,
      persisted: false,
      usageBytes: 0,
      quotaBytes: 0,
      usageFormatted: '오류',
      quotaFormatted: '오류',
      percentUsed: 0,
      persistenceMessage: `저장소 상태 진단 중 오류: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

/**
 * 브라우저에 영속적 저장소(Persistence) 요청
 */
export async function requestStoragePersistence(): Promise<boolean> {
  if (
    typeof navigator !== 'undefined' &&
    'storage' in navigator &&
    typeof navigator.storage?.persist === 'function'
  ) {
    try {
      return await navigator.storage.persist();
    } catch {
      return false;
    }
  }
  return false;
}
