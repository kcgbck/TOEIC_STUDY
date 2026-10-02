// 사용자 계정, 점수 및 랭킹 도메인 모델

export interface UserProfile {
  id: string;
  deviceCode: string;
  nickname: string;
  correctCount: number;
  incorrectCount: number;
  totalScore: number;
  accuracy: number;
  rank?: number;
  lastActiveAt: string;
  createdAt: string;
}

export interface RankingItem {
  rank: number;
  id: string;
  nickname: string;
  shortDeviceCode: string;
  totalScore: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  lastActiveAt: string;
}

export interface RankingResponse {
  topRankers: RankingItem[];
  myRank?: RankingItem;
  totalUsers: number;
}

/**
 * 점수 계산 공식:
 * totalScore = max(0, (correctCount * 10) - (incorrectCount * 2))
 */
export function calculateScore(correctCount: number, incorrectCount: number): number {
  const score = (Math.max(0, correctCount) * 10) - (Math.max(0, incorrectCount) * 2);
  return Math.max(0, score);
}

/**
 * 정답률 계산 공식 (%)
 */
export function calculateAccuracy(correctCount: number, incorrectCount: number): number {
  const total = Math.max(0, correctCount) + Math.max(0, incorrectCount);
  if (total === 0) return 0;
  return Math.round((Math.max(0, correctCount) / total) * 100);
}
