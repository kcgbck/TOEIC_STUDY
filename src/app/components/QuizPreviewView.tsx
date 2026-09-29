import React, { useState, useEffect, useMemo } from 'react';
import type { WordEntry, QuizQuestion, BuiltinWordsDatabase } from '../../types/word';
import { builtinWordToWordEntry } from '../../types/word';
import { db } from '../../storage/db';
import { createQuizQuestion } from '../../quiz/quizEngine';

interface Props {
  initialWords?: WordEntry[];
  bookTitle?: string;
  sourceType?: 'builtin' | 'maritime' | 'photo' | 'pdf';
  instantGrading?: boolean;
  shuffleOrder?: boolean;
}

type SelectedDifficulty = 'all' | 'easy' | 'medium' | 'hard';
type QuestionCountOption = 10 | 20 | 30 | 50 | 'all';
type BookCategory = 'builtin' | 'maritime';

// Fisher-Yates 배열 셔플 함수
function shuffleArray(words: WordEntry[]): WordEntry[] {
  const arr = [...words];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuizPreviewView: React.FC<Props> = ({
  initialWords,
  bookTitle,
  sourceType = 'builtin',
  instantGrading = false,
  shuffleOrder = true,
}) => {
  const [currentBook, setCurrentBook] = useState<BookCategory>(() => {
    return sourceType === 'maritime' ? 'maritime' : 'builtin';
  });
  const [allLoadedWords, setAllLoadedWords] = useState<WordEntry[]>(initialWords || []);
  const [selectedDifficulty, setSelectedDifficulty] = useState<SelectedDifficulty>('all');
  const [selectedCount, setSelectedCount] = useState<QuestionCountOption>(20);
  const [quizWords, setQuizWords] = useState<WordEntry[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [activeBookTitle, setActiveBookTitle] = useState<string>(
    bookTitle || (sourceType === 'maritime' ? 'IMO SMCP · 해기사 · 국제협약 해사영어' : '보카 스터디 기본 어휘')
  );

  // 외부 sourceType prop 변경 시 단어장 선택 동기화
  useEffect(() => {
    if (sourceType === 'maritime') {
      setCurrentBook('maritime');
    } else if (sourceType === 'builtin') {
      setCurrentBook('builtin');
    }
  }, [sourceType]);

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

  // 퀴즈 세션 초기화 (셔플 여부에 따라 단어 순서 재배치)
  const initQuizSession = (baseWords?: WordEntry[]) => {
    const source = baseWords || filteredWords;
    if (source.length < 4) {
      setQuizWords([]);
      setCurrentQuiz(null);
      return;
    }
    const finalWords = shuffleOrder ? shuffleArray(source) : [...source];
    setQuizWords(finalWords);
    setCurrentIndex(0);
    setScore({ correct: 0, wrong: 0 });
    generateNextQuestion(finalWords, 0);
  };

  // 단어 로드: initialWords가 없으면 currentBook에 따라 적절한 JSON fetch
  useEffect(() => {
    if (initialWords && initialWords.length > 0) {
      setAllLoadedWords(initialWords);
      setActiveBookTitle(bookTitle || (sourceType === 'photo' ? '내 사진 문제집' : sourceType === 'pdf' ? '내 PDF 문제집' : '추출 단어장'));
      return;
    }

    const targetUrl = currentBook === 'maritime' ? '/data/maritime_smcp_v1.json' : '/data/builtin_words_v1.json';
    const defaultTitle = currentBook === 'maritime' ? 'IMO SMCP · 해기사 · 국제협약 해사영어' : '보카 스터디 기본 어휘';

    fetch(targetUrl)
      .then((r) => r.json())
      .then((data: BuiltinWordsDatabase) => {
        if (data.words && data.words.length > 0) {
          const entries = data.words.map(builtinWordToWordEntry);
          setAllLoadedWords(entries);
          setActiveBookTitle(`${defaultTitle} (${entries.length}단어)`);
        }
      })
      .catch((err) => {
        console.warn('단어 로드 실패, IndexedDB 확인:', err);
        db.words.toArray().then((saved) => {
          if (saved && saved.length >= 4) {
            setAllLoadedWords(saved);
            setActiveBookTitle(`내 문제집 (${saved.length}단어)`);
          }
        });
      });
  }, [initialWords, bookTitle, sourceType, currentBook]);

  // 필터, 문항수, 셔플 설정 변경 시 새 퀴즈 세션 생성
  useEffect(() => {
    if (filteredWords.length >= 4) {
      initQuizSession();
    } else {
      setQuizWords([]);
      setCurrentQuiz(null);
    }
  }, [filteredWords, selectedCount, shuffleOrder]);

  // 실제 채점 처리
  const processGrading = async (idx: number) => {
    if (!currentQuiz || isAnswered) return;
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

  // 보기 터치 시
  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedIndex(idx);

    // 즉시 채점 옵션이 켜져 있는 경우에만 즉시 판정
    if (instantGrading) {
      processGrading(idx);
    }
  };

  // 정답 확인 버튼 클릭 (실수 방지 모드일 때)
  const handleConfirmAnswer = () => {
    if (selectedIndex === null || isAnswered || !currentQuiz) return;
    processGrading(selectedIndex);
  };

  const handleNext = () => {
    const wordListToUse = quizWords.length >= 4 ? quizWords : filteredWords;
    if (!wordListToUse.length || !isAnswered) return;
    const nextIdx = currentIndex + 1;
    if (nextIdx >= totalQuestions) {
      // 퀴즈 완료 시
      setCurrentIndex(nextIdx);
      return;
    }
    setCurrentIndex(nextIdx);
    generateNextQuestion(wordListToUse, nextIdx);
  };

  const isCompleted = totalQuestions > 0 && currentIndex >= totalQuestions;

  return (
    <div className="card quiz-card">
      {/* 기본 어휘 / 해사영어 단어장 선택 탭 (커스텀 추출 단어장이 아닐 때 표시) */}
      {!initialWords && (
        <div className="book-selector-tabs">
          <button
            type="button"
            className={`book-tab-btn ${currentBook === 'builtin' ? 'active' : ''}`}
            onClick={() => setCurrentBook('builtin')}
          >
            📖 기본 어휘 (1,800어)
          </button>
          <button
            type="button"
            className={`book-tab-btn ${currentBook === 'maritime' ? 'active' : ''}`}
            onClick={() => setCurrentBook('maritime')}
          >
            ⚓ 해사영어 (451어)
          </button>
        </div>
      )}

      {/* 난이도 및 문제 수 설정 툴바 (스마트폰 2줄 깨짐 완벽 방지 반응형) */}
      <div className="quiz-controls-toolbar">
        <div className="control-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="control-label">난이도</span>
            <button
              type="button"
              className="btn-text-shuffle"
              onClick={() => initQuizSession()}
              title="출제 순서를 무작위로 새로 섞습니다"
            >
              🔀 순서 섞기
            </button>
          </div>
          <div className="control-btn-grid difficulty-grid">
            {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                type="button"
                className={`control-btn ${selectedDifficulty === d ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(d)}
              >
                {d === 'all' ? '전체' : d === 'easy' ? '하 (EASY)' : d === 'medium' ? '중 (MID)' : '상 (HARD)'}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="control-label">문항 수</span>
          <div className="control-btn-grid count-grid">
            {([10, 20, 30, 50, 'all'] as const).map((cnt) => (
              <button
                key={cnt}
                type="button"
                className={`control-btn ${selectedCount === cnt ? 'active' : ''}`}
                onClick={() => setSelectedCount(cnt)}
              >
                {cnt === 'all' ? '전체' : `${cnt}개`}
              </button>
            ))}
          </div>
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
            onClick={() => initQuizSession()}
          >
            다시 풀기 (새 순서로 섞기) 🔄
          </button>
        </div>
      ) : !currentQuiz ? (
        <div style={{ textAlign: 'center', padding: '30px 16px' }}>
          <h3>단어 데이터를 준비 중입니다...</h3>
          <p style={{ color: '#94a3b8' }}>선택한 난이도({selectedDifficulty})의 출제 가능한 어휘를 불러오고 있습니다.</p>
        </div>
      ) : (
        <>
          {/* 어휘집 타이틀 1줄 + 진행 현황 1줄 분리 표기 */}
          <div className="quiz-header-card">
            <div className="quiz-header-title">
              📖 {activeBookTitle}
            </div>
            <div className="quiz-header-status">
              진행 {(currentIndex % totalQuestions) + 1}/{totalQuestions} | 정답: {score.correct}, 오답: {score.wrong}
            </div>
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
              } else if (selectedIndex === idx) {
                btnClass += ' selected';
              }

              return (
                <button
                  key={idx}
                  type="button"
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

          {/* 하단 버튼: 즉시 채점 모드가 아닐 때 답 선택 후 [정답 확인] -> 채점 후 [다음 문제] */}
          <div className="quiz-footer">
            {!isAnswered && !instantGrading ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '15px', fontWeight: 'bold' }}
                onClick={handleConfirmAnswer}
                disabled={selectedIndex === null}
              >
                {selectedIndex === null ? '보기를 선택해주세요' : '정답 확인 →'}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '15px', fontWeight: 'bold' }}
                onClick={handleNext}
                disabled={!isAnswered}
              >
                다음 문제 →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

