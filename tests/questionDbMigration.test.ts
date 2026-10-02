// GATE-1: 범용 문제 저장소 및 Dexie v1 -> v2 마이그레이션 테스트 (지시서 39, 40, 68항)
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import Dexie from 'dexie';
import { ToeicStudyDatabase } from '../src/storage/db';
import type { QuestionBook, QuestionItem } from '../src/types/question';
import type { WordEntry, WordBook } from '../src/types/word';

describe('GATE-1 범용 문제 저장소 및 Dexie v1 -> v2 마이그레이션', () => {
  const DB_NAME = 'TestMigrationDb';

  beforeEach(async () => {
    await Dexie.delete(DB_NAME);
  });

  afterEach(async () => {
    await Dexie.delete(DB_NAME);
  });

  it('v1 데이터베이스에 저장된 기존 WordEntry 및 WordBook이 v2 업그레이드 후 100% 손실 없이 보존되어야 한다', async () => {
    // 1. 구버전 v1 DB 인스턴스 생성 및 초기 데이터 삽입
    const v1Db = new Dexie(DB_NAME);
    v1Db.version(1).stores({
      words: '++id, word, partOfSpeech, difficulty, topic, sourceBookId, confidence',
      wordBooks: '++id, title, sourceType, createdAt',
      studyHistory: '++id, wordId, isCorrect, studiedAt',
      wordStats: 'wordId, learningStatus, totalCount, wrongCount, lastStudiedAt',
      appSettings: 'key',
    });

    await v1Db.open();

    const sampleBook: WordBook = {
      title: '토익 기본 어휘집',
      sourceType: 'BUILTIN',
      wordCount: 2,
      createdAt: '2026-10-01T00:00:00Z',
    };
    const bookId = await v1Db.table<WordBook, string>('wordBooks').add(sampleBook);

    const sampleWords: WordEntry[] = [
      {
        word: 'acquire',
        meaning: ['획득하다', '습득하다'],
        partOfSpeech: 'verb',
        difficulty: 'medium',
        topic: 'business',
        sourceBookId: String(bookId),
      },
      {
        word: 'revenue',
        meaning: ['수익', '매출'],
        partOfSpeech: 'noun',
        difficulty: 'low',
        topic: 'finance',
        sourceBookId: String(bookId),
      },
    ];
    await v1Db.table<WordEntry, string>('words').bulkAdd(sampleWords);

    v1Db.close();

    // 2. ToeicStudyDatabase (v2 포함)로 동일 DB 오픈하여 마이그레이션 발생
    const v2Db = new ToeicStudyDatabase(DB_NAME);
    await v2Db.open();

    // 3. 기존 v1 데이터 온전성 확인
    const savedBooks = await v2Db.wordBooks.toArray();
    expect(savedBooks.length).toBe(1);
    expect(savedBooks[0].title).toBe('토익 기본 어휘집');

    const savedWords = await v2Db.words.toArray();
    expect(savedWords.length).toBe(2);
    expect(savedWords.map((w) => w.word)).toEqual(['acquire', 'revenue']);
    expect(savedWords[0].meaning).toEqual(['획득하다', '습득하다']);

    // 4. 신규 v2 범용 문제 테이블 동작 확인
    const newQuestionBook: QuestionBook = {
      title: '2026 기사 필기 1회차 문제집',
      sourceType: 'IMAGE',
      questionType: 'MULTIPLE_CHOICE',
      questionCount: 1,
      createdAt: '2026-10-02T10:00:00Z',
    };
    const qBookId = await v2Db.questionBooks.add(newQuestionBook);
    expect(qBookId).toBeDefined();

    const sampleQuestion: QuestionItem = {
      bookId: String(qBookId),
      questionNumber: '1',
      stem: '다음 중 운영체제의 목적이 아닌 것은?',
      choiceCount: 4,
      choices: [
        { id: 'c1', sourceLabel: '①', text: '처리 능력 향상' },
        { id: 'c2', sourceLabel: '②', text: '반환 시간 증가' },
        { id: 'c3', sourceLabel: '③', text: '사용 가능도 향상' },
        { id: 'c4', sourceLabel: '④', text: '신뢰도 향상' },
      ],
      correctChoiceId: 'c2', // 2번이 정답
      answerStatus: 'verified',
      questionConfidence: 'high',
      choicesConfidence: 'high',
      answerConfidence: 'high',
      isUserConfirmed: true,
      createdAt: '2026-10-02T10:05:00Z',
    };

    const qId = await v2Db.questions.add(sampleQuestion);
    expect(qId).toBeDefined();

    const loadedQuestion = await v2Db.questions.get(qId);
    expect(loadedQuestion).toBeDefined();
    expect(loadedQuestion?.stem).toBe('다음 중 운영체제의 목적이 아닌 것은?');
    expect(loadedQuestion?.choiceCount).toBe(4);
    expect(loadedQuestion?.correctChoiceId).toBe('c2');
    expect(loadedQuestion?.answerStatus).toBe('verified');
    expect(loadedQuestion?.choices.length).toBe(4);

    v2Db.close();
  });
});
