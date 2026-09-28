import React, { useState, useEffect } from 'react';
import type { WordEntry, QuizQuestion } from '../../types/word';
import { db } from '../../storage/db';

export const QuizPreviewView: React.FC = () => {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });

  // 기본 단어 로드
  useEffect(() => {
    fetch('/data/toeic_words_v1.json')
      .then((r) => r.json())
      .then((data) => {
        if (data.words && data.words.length > 0) {
          setWords(data.words);
          generateQuestion(data.words, 0);
        }
      })
      .catch((err) => console.warn('단어 로드 실패:', err));
  }, []);

  const generateQuestion = (wordList: WordEntry[], targetIdx: number) => {
    if (wordList.length < 4) return;
    const target = wordList[targetIdx % wordList.length];
    const correctMeaning = target.meaning[0];

    // 다른 단어들에서 오답 3개 무작위 선별
    const otherWords = wordList.filter((w) => w.word !== target.word);
    const shuffledOthers = [...otherWords].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map((w) => w.meaning[0]);

    // 4지선다 셔플
    const options = [correctMeaning, ...distractors].sort(() => 0.5 - Math.random());
    const correctIndex = options.indexOf(correctMeaning);

    setCurrentQuiz({
      wordId: target.id || target.word,
      word: target.word,
      options,
      correctIndex,
      difficulty: target.difficulty,
    });
    setSelectedIndex(null);
    setIsAnswered(false);
  };

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
    if (!words.length) return;
    const nextIdx = Math.floor(Math.random() * words.length);
    generateQuestion(words, nextIdx);
  };

  if (!currentQuiz) {
    return (
      <div className="card poc-card">
        <h3>기본 TOEIC 4지선다 퀴즈</h3>
        <p>단어 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="card quiz-card">
      <div className="quiz-header">
        <span className="quiz-tag">TOEIC 기본 4지선다</span>
        <span className="score-tag">
          정답: <strong style={{ color: '#4ade80' }}>{score.correct}</strong> | 오답: <strong style={{ color: '#f87171' }}>{score.wrong}</strong>
        </span>
      </div>

      <div className="quiz-word-box">
        <h2 className="quiz-headword">{currentQuiz.word}</h2>
        <span className="difficulty-badge">{currentQuiz.difficulty.toUpperCase()}</span>
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
        <div className="quiz-footer">
          <p className="quiz-result-msg">
            {selectedIndex === currentQuiz.correctIndex ? '✓ 정답입니다!' : '✕ 아쉽네요. 오답노트에 등록되었습니다.'}
          </p>
          <button className="btn btn-primary" onClick={handleNext}>
            다음 문제 ▸
          </button>
        </div>
      )}
    </div>
  );
};
