import React, { useState, useEffect, useMemo } from 'react';
import type { WordEntry, QuizQuestion, BuiltinWordsDatabase } from '../../types/word';
import { builtinWordToWordEntry } from '../../types/word';
import { db } from '../../storage/db';
import { createQuizQuestion } from '../../quiz/quizEngine';

interface Props {
  initialWords?: WordEntry[];
  bookTitle?: string;
  sourceType?: 'builtin' | 'photo' | 'pdf';
}

type SelectedDifficulty = 'all' | 'easy' | 'medium' | 'hard';
type QuestionCountOption = 10 | 20 | 30 | 50 | 'all';

export const QuizPreviewView: React.FC<Props> = ({ initialWords, bookTitle, sourceType = 'builtin' }) => {
  const [allLoadedWords, setAllLoadedWords] = useState<WordEntry[]>(initialWords || []);
  const [selectedDifficulty, setSelectedDifficulty] = useState<SelectedDifficulty>('all');
  const [selectedCount, setSelectedCount] = useState<QuestionCountOption>(20);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [activeBookTitle, setActiveBookTitle] = useState<string>(bookTitle || '보카 스터디 기본 어휘');

  // 난이도 필터링된 단어 목록
  const filteredWords = useMemo(() => {
    if (selectedDifficulty === 'all') return allLoadedWords;
    const diffMap = { easy: 'low', medium: 'medium', hard: 'high' };
    const targetDiff = diffMap[selectedDifficulty];
    return allLoadedWords.filter((w) => w.difficulty === targetDiff);
  }, [allLoadedWords, selectedDifficulty]);

  // 총 문제 수 결정
  const totalQuestions = useMemo(() => {
    if (!filteredWords.length) return 0;
    if (selectedCount === 'all') return filteredWords.length;
    return Math.min(selectedCount, filteredWords.length);
  }, [filteredWords, selectedCount]);

  const generateNextQuestion = (wordList: WordEntry[], targetIdx: number) => {
    if (!wordList || wordList.length < 4) {
      setCurrentQuiz(null);
      return;
    }

    const target = wordList[targetIdx % wordList.length];
    // quizEngine의 createQuizQuestion을 사용하여 정답 유일성 Hard Gate 통과 문제 생성
    const question = createQuizQuestion(allLoadedWords, target, {
      seed: Date.now() + targetIdx,
      matchPartOfSpeech: true,
    });

    if (question) {
      setCurrentQuiz(question);
      setSelectedIndex(null);
      setIsAnswered(false);
    } else {
      // 오답 부족 또는 안전성 이슈로 해당 문제 생성 실패 시 다음 단어 시도
      const fallbackIdx = (targetIdx + 1) % wordList.length;
      const fallbackTarget = wordList[fallbackIdx];
      const fallbackQuestion = createQuizQuestion(allLoadedWords, fallbackTarget, {
        seed: Date.now() + fallbackIdx,
        matchPartOfSpeech: true,
      });
      if (fallbackQuestion) {
        setCurrentQuiz(fallbackQuestion);
        setSelectedIndex(null);
        setIsAnswered(false);
      }
    }
  };

  // 단어 로드
  useEffect(() => {
    if (initialWords && initialWords.length > 0) {
      setAllLoadedWords(initialWords);
      setActiveBookTitle(bookTitle || (sourceType === 'photo' ? '내 사진 문제집' : sourceType === 'pdf' ? '내 PDF 문제집' : '추출 단어장'));
      setCurrentIndex(0);
      setScore({ correct: 0, wrong: 0 });
      return;
    }

    // 기본 단어는 IndexedDB와 독립적으로 builtin_words_v1.json에서 직접 로드 (지시서 31, 33항)
    fetch('/data/builtin_words_v1.json')
      .then((r) => r.json())
      .then((data: BuiltinWordsDatabase) => {
        if (data.words && data.words.length > 0) {
          const entries = data.words.map(builtinWordToWordEntry);
          setAllLoadedWords(entries);
          setActiveBookTitle(`보카 스터디 기본 어휘 (${entries.length}단어)`);
          setCurrentIndex(0);
          setScore({ correct: 0, wrong: 0 });
        }
      })
      .catch((err) => {
        console.warn('기본 단어 로드 실패, IndexedDB 확인:', err);
        db.words.toArray().then((saved) => {
          if (saved && saved.length >= 4) {
            setAllLoadedWords(saved);
            setActiveBookTitle(`내 문제집 (${saved.length}단어)`);
            setCurrentIndex(0);
            setScore({ correct: 0, wrong: 0 });
          }
        });
      });
  }, [initialWords, bookTitle, sourceType]);

  // 필터 변경 시 첫 문제 생성
  useEffect(() => {
    if (filteredWords.length >= 4) {
      setCurrentIndex(0);
      setScore({ correct: 0, wrong: 0 });
      generateNextQuestion(filteredWords, 0);
    } else {
      setCurrentQuiz(null);
    }
  }, [filteredWords, selectedCount]);


  const handleSelectOption = async (idx: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedIndex(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuiz.correctIndex;
    if (isCorrect) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }

    // IndexedDB에 학습 이력 기록
    try {
      await db.studyHistory.add({
        wordId: currentQuiz.wordId,
        isCorrect,
        selectedAnswer: currentQuiz.options[idx],
        studiedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('이력 저장 실패:', e);
    }
  };

  const handleNext = () => {
    if (!filteredWords.length || !isAnswered) return;
    const nextIdx = currentIndex + 1;
    if (nextIdx >= totalQuestions) {
      // 퀴즈 완료 시
      setCurrentIndex(nextIdx);
      return;
    }
    setCurrentIndex(nextIdx);
    generateNextQuestion(filteredWords, nextIdx);
  };

  const isCompleted = totalQuestions > 0 && currentIndex >= totalQuestions;

  return (
    <div className="card quiz-card">
      {/* 난이도 및 문제 수 설정 툴바 (지시서 31, 32항) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#94a3b8' }}>난이도:</span>
          {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              className={`btn btn-sm ${selectedDifficulty === d ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '6px' }}
              onClick={() => setSelectedDifficulty(d)}
            >
              {d === 'all' ? '전체' : d === 'easy' ? '하 (EASY)' : d === 'medium' ? '중 (MID)' : '상 (HARD)'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#94a3b8' }}>문항 수:</span>
          {([10, 20, 30, 50, 'all'] as const).map((cnt) => (
            <button
              key={cnt}
              className={`btn btn-sm ${selectedCount === cnt ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 8px', fontSize: '12px', borderRadius: '6px' }}
              onClick={() => setSelectedCount(cnt)}
            >
              {cnt === 'all' ? '전체' : `${cnt}개`}
            </button>
          ))}
        </div>
      </div>

      {isCompleted ? (
        <div style={{ textAlign: 'center', padding: '30px 16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', color: '#38bdf8' }}>🎉 퀴즈 완료!</h2>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            총 <strong>{totalQuestions}</strong>문제 중 <strong style={{ color: '#4ade80' }}>{score.correct}</strong>문제 정답 (<strong style={{ color: '#f87171' }}>{score.wrong}</strong>문제 오답)
          </p>
          <button
            className="btn btn-primary"
            style={{ padding: '10px 24px', fontSize: '15px', fontWeight: 'bold' }}
            onClick={() => {
              setCurrentIndex(0);
              setScore({ correct: 0, wrong: 0 });
              generateNextQuestion(filteredWords, 0);
            }}
          >
            다시 풀기 🔄
          </button>
        </div>
      ) : !currentQuiz ? (
        <div style={{ textAlign: 'center', padding: '30px 16px' }}>
          <h3>단어 데이터를 준비 중입니다...</h3>
          <p style={{ color: '#94a3b8' }}>선택한 난이도({selectedDifficulty})의 출제 가능한 어휘를 불러오고 있습니다.</p>
        </div>
      ) : (
        <>
          <div className="quiz-header">
            <span className="quiz-tag">📖 {activeBookTitle}</span>
            <span className="quiz-progress-badge" style={{ fontWeight: 'bold', color: '#38bdf8' }}>
              진행 {(currentIndex % totalQuestions) + 1} / {totalQuestions}
            </span>
            <span className="score-tag">
              정답: <strong style={{ color: '#4ade80' }}>{score.correct}</strong> | 오답: <strong style={{ color: '#f87171' }}>{score.wrong}</strong>
            </span>
          </div>

      <div className="quiz-word-box">
        <h2 className="quiz-headword">{currentQuiz.word}</h2>
        <span className="difficulty-badge">{(currentQuiz.difficulty || 'MEDIUM').toUpperCase()}</span>
      </div>

      <div className="quiz-options-list">
        {currentQuiz.options.map((option, idx) => {
          let btnClass = 'quiz-option-btn';
          if (isAnswered) {
            if (idx === currentQuiz.correctIndex) {
              btnClass += ' correct';
            } else if (idx === selectedIndex) {
              btnClass += ' wrong';
            }
          }
          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
            >
              <span className="option-num">{idx + 1}.</span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="quiz-feedback-box">
          {selectedIndex === currentQuiz.correctIndex ? (
            <p className="feedback-text correct">⭕ 정답입니다!</p>
          ) : (
            <p className="feedback-text wrong">
              ❌ 오답입니다. 정답은 <strong>{currentQuiz.options[currentQuiz.correctIndex]}</strong> 입니다.
            </p>
          )}
        </div>
      )}

      {/* 지시서 30항: 사용자가 답을 누르기 전 다음 비활성, 답 선택 후 다음 활성 */}
      <div className="quiz-footer">
        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 'bold' }}
          onClick={handleNext}
          disabled={!isAnswered}
        >
          다음 문제 →
        </button>
      </div>
        </>
      )}
    </div>
  );
};

