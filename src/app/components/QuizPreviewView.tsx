import React, { useState, useEffect } from 'react';
import type { WordEntry, QuizQuestion } from '../../types/word';
import { db } from '../../storage/db';
import { createQuizQuestion } from '../../quiz/quizEngine';

interface Props {
  initialWords?: WordEntry[];
  bookTitle?: string;
}

export const QuizPreviewView: React.FC<Props> = ({ initialWords, bookTitle }) => {
  const [words, setWords] = useState<WordEntry[]>(initialWords || []);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(20);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [activeBookTitle, setActiveBookTitle] = useState<string>(bookTitle || '기본 TOEIC 4지선다');

  const generateNextQuestion = (wordList: WordEntry[], targetIdx: number) => {
    if (!wordList || wordList.length < 4) {
      setCurrentQuiz(null);
      return;
    }

    const target = wordList[targetIdx % wordList.length];
    // quizEngine의 createQuizQuestion을 사용하여 정답 유일성 Hard Gate 통과 문제 생성
    const question = createQuizQuestion(wordList, target, {
      seed: Date.now() + targetIdx,
    });

    if (question) {
      setCurrentQuiz(question);
      setSelectedIndex(null);
      setIsAnswered(false);
    } else {
      // 오답 부족 또는 안전성 이슈로 해당 문제 생성 실패 시 다음 단어 시도
      const fallbackIdx = (targetIdx + 1) % wordList.length;
      const fallbackTarget = wordList[fallbackIdx];
      const fallbackQuestion = createQuizQuestion(wordList, fallbackTarget, {
        seed: Date.now() + fallbackIdx,
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
      setWords(initialWords);
      setActiveBookTitle(bookTitle || '추출 단어장');
      setTotalQuestions(Math.min(20, initialWords.length));
      setCurrentIndex(0);
      generateNextQuestion(initialWords, 0);
      return;
    }

    // IndexedDB에 저장된 단어가 있는지 우선 확인
    db.words
      .toArray()
      .then((saved) => {
        if (saved && saved.length >= 4) {
          setWords(saved);
          setActiveBookTitle(`내 문제집 (${saved.length}단어)`);
          setTotalQuestions(Math.min(20, saved.length));
          setCurrentIndex(0);
          generateNextQuestion(saved, 0);
        } else {
          // 기본 JSON 번들 로드
          fetch('/data/toeic_words_v1.json')
            .then((r) => r.json())
            .then((data) => {
              if (data.words && data.words.length > 0) {
                setWords(data.words);
                setActiveBookTitle('기본 빈출 어휘 (15단어)');
                setTotalQuestions(Math.min(20, data.words.length));
                setCurrentIndex(0);
                generateNextQuestion(data.words, 0);
              }
            })
            .catch((err) => console.warn('기본 단어 로드 실패:', err));
        }
      })
      .catch((err) => console.warn('단어 로드 실패:', err));
  }, [initialWords, bookTitle]);

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
    if (!words.length || !isAnswered) return;
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    generateNextQuestion(words, nextIdx);
  };

  if (!currentQuiz) {
    return (
      <div className="card poc-card">
        <h3>기본 TOEIC 4지선다 퀴즈</h3>
        <p>단어 데이터를 불러오는 중이거나 안전한 4지선다 보기를 생성 중입니다...</p>
      </div>
    );
  }

  const progressDisplay = `${(currentIndex % totalQuestions) + 1} / ${totalQuestions}`;

  return (
    <div className="card quiz-card">
      <div className="quiz-header">
        <span className="quiz-tag">📖 {activeBookTitle}</span>
        <span className="quiz-progress-badge" style={{ fontWeight: 'bold', color: '#38bdf8' }}>
          진행 {progressDisplay}
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
    </div>
  );
};
