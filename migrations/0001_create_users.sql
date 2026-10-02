-- D1 Database Migration: 0001_create_users.sql
-- 사용자 계정, 기기 코드, 학습 통계 및 랭킹 점수 테이블

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  device_code TEXT UNIQUE NOT NULL,
  nickname TEXT NOT NULL,
  correct_count INTEGER NOT NULL DEFAULT 0,
  incorrect_count INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  last_active_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_total_score ON users(total_score DESC, correct_count DESC);
CREATE INDEX IF NOT EXISTS idx_users_device_code ON users(device_code);
