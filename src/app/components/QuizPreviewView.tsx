import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { WordEntry, QuizQuestion } from '../../types/word';
import { db } from '../../storage/db';
import { createQuizQuestion } from '../../quiz/quizEngine';
import { userService } from '../../services/userService';
import { speechService } from '../../services/speechService';

interface Props {
  initialWords?: WordEntry[];
  bookTitle?: string;
  sourceType?: 'builtin' | 'maritime' | 'japanese_exam' | 'japanese_life' | 'photo' | 'pdf';
  instantGrading?: boolean;
  shuffleOrder?: boolean;
  onOpenRanking?: () => void;
  onBack?: () => void;
}

type SelectedDifficulty = 'all' | 'easy' | 'medium' | 'hard';
type QuestionCountOption = 10 | 20 | 30 | 50 | 'all';
export type BookCategory = 'builtin' | 'maritime' | 'japanese_exam' | 'japanese_life';

// Fisher-Yates 배열 셔플 함수
function shuffleArray(words: WordEntry[]): WordEntry[] {
  const arr = [...words];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// BuiltinWord 또는 MaritimeWordEntry를 WordEntry로 안전하게 변환
function toWordEntry(w: any): WordEntry {
  // 해사영어 또는 커스텀 형식 (meaning: string[] 보유)
  if (Array.isArray(w.meaning)) {
    return {
      id: String(w.id || w.word),
      word: w.word,
      meaning: w.meaning,
      partOfSpeech: w.partOfSpeech || '단어',
      difficulty: w.difficulty === 'high' ? 'high' : w.difficulty === 'low' ? 'low' : 'medium',
      topic: w.topic || 'maritime',
    };
  }

  // 기본 TOEIC BuiltinWord 형식 (mainMeaning + subMeanings)
  const sub = Array.isArray(w.subMeanings) ? w.subMeanings : [];
  const meanings = w.mainMeaning ? [w.mainMeaning, ...sub] : sub;
  return {
    id: String(w.id || w.word),
    word: w.word,
    meaning: meanings.length > 0 ? meanings : [w.word],
    partOfSpeech: w.partOfSpeech || '단어',
    difficulty: w.difficulty === 'easy' ? 'low' : w.difficulty === 'hard' ? 'high' : 'medium',
    topic: Array.isArray(w.topics) && w.topics.length > 0 ? w.topics[0] : (w.topic || 'general'),
    confusables: w.confusableWords,
    confidence: w.confidenceGrade === 'A' ? 'HIGH' : w.confidenceGrade === 'B' ? 'MEDIUM' : 'LOW',
  };
}

export const QuizPreviewView: React.FC<Props> = ({
  initialWords,
  bookTitle,
  sourceType = 'builtin',
  instantGrading = false,
  shuffleOrder = true,
  onOpenRanking,
  onBack,
}) => {
  const [currentBook, setCurrentBook] = useState<BookCategory>(() => {
    if (sourceType === 'maritime') return 'maritime';
    if (sourceType === 'japanese_exam') return 'japanese_exam';
    if (sourceType === 'japanese_life') return 'japanese_life';
    return 'builtin';
  });
  const [allLoadedWords, setAllLoadedWords] = useState<WordEntry[]>(initialWords || []);
  const [selectedDifficulty, setSelectedDifficulty] = useState<SelectedDifficulty>('all');
  const [selectedCount, setSelectedCount] = useState<QuestionCountOption>(20);
  const [quizWords, setQuizWords] = useState<WordEntry[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [syncedScore, setSyncedScore] = useState<number | null>(null);
  const hasSyncedRef = useRef(false);
  const [activeBookTitle, setActiveBookTitle] = useState<string>(
    bookTitle || (
      sourceType === 'maritime'
        ? '해사영어(451단어)'
        : sourceType === 'japanese_exam'
        ? '일본어 시험용(JLPT 161단어)'
        : sourceType === 'japanese_life'
        ? '완전 생활일본어(160단어)'
        : 'TOEIC(1800단어)'
    )
  );

  const handleSwitchBook = (book: BookCategory) => {
    if (book === currentBook) return;
    speechService.stop();
    setCurrentBook(book);
    setAllLoadedWords([]);
    setQuizWords([]);
    setCurrentQuiz(null);
  };

  // 외부 sourceType prop 변경 시 단어장 선택 동기화
  useEffect(() => {
    if (sourceType === 'maritime') {
      setCurrentBook('maritime');
    } else if (sourceType === 'japanese_exam') {
      setCurrentBook('japanese_exam');
    } else if (sourceType === 'japanese_life') {
      setCurrentBook('japanese_life');
    } else if (sourceType === 'builtin') {
      setCurrentBook('builtin');
    }
  }, [sourceType]);

  // 현재 퀴즈 단어 발음 언어 감지 (일본어 단어장은 ja-JP, 영단어는 en-US)
  const currentLang = useMemo(() => {
    if (currentBook === 'japanese_exam' || currentBook === 'japanese_life') {
      return 'ja-JP';
    }
    if (currentQuiz?.word && /[\u3040-\u309F\u30A0-\u30FF]/.test(currentQuiz.word)) {
      return 'ja-JP';
    }
    return 'en-US';
  }, [currentBook, currentQuiz]);

  // 발음 듣기 버튼 핸들러
  const handleSpeakCurrentWord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentQuiz?.word) return;
    setIsSpeaking(true);
    speechService.speak(currentQuiz.word, currentLang, 0.9, {
      onEnd: () => setIsSpeaking(false),
    });
    // 최대 2초 후 자동 해제 (안전 타이머)
    setTimeout(() => setIsSpeaking(false), 2000);
  };

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
    setSyncedScore(null);
    hasSyncedRef.current = false;
    generateNextQuestion(finalWords, 0);
  };

  // 단어 로드: initialWords가 없으면 currentBook에 따라 적절한 JSON fetch
  useEffect(() => {
    if (initialWords && initialWords.length > 0) {
      setAllLoadedWords(initialWords);
      setActiveBookTitle(bookTitle || (sourceType === 'photo' ? '내 사진 문제집' : sourceType === 'pdf' ? '내 PDF 문제집' : '추출 단어장'));
      return;
    }

    let targetUrl = '/data/builtin_words_v1.json';
    let defaultTitle = 'TOEIC(1800단어)';

    if (currentBook === 'maritime') {
      targetUrl = '/data/maritime_smcp_v1.json';
      defaultTitle = '해사영어(451단어)';
    } else if (currentBook === 'japanese_exam') {
      targetUrl = '/data/builtin_japanese_exam.json';
      defaultTitle = '일본어 시험용(JLPT 161단어)';
    } else if (currentBook === 'japanese_life') {
      targetUrl = '/data/builtin_japanese_life.json';
      defaultTitle = '완전 생활일본어(160단어)';
    }

    fetch(targetUrl)
      .then((r) => r.json())
      .then((data: any) => {
        if (data.words && data.words.length > 0) {
          const entries = data.words.map(toWordEntry);
          setAllLoadedWords(entries);
          setActiveBookTitle(defaultTitle);
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
  }, [initialWords, bookTitle, currentBook]);

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

  // 퀴즈 완료 시 랭킹 점수 자동 동기화
  useEffect(() => {
    if (isCompleted && totalQuestions > 0 && !hasSyncedRef.current) {
      hasSyncedRef.current = true;
      const earned = Math.max(0, score.correct * 10 - score.wrong * 2);
      setSyncedScore(earned);
      userService.addQuizResult(score.correct, score.wrong).catch(console.error);
    }
  }, [isCompleted, totalQuestions, score.correct, score.wrong]);

  return (
    <div className="card quiz-card">
      {/* 기본 어휘 / 해사영어 단어장 선택 탭 및 뒤로가기 */}
      {!initialWords ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          {onBack && (
            <button
              type="button"
              className="ranking-back-btn"
              onClick={onBack}
              title="홈으로 돌아가기"
              style={{ width: '34px', height: '34px', fontSize: '18px', flexShrink: 0 }}
            >
              ←
            </button>
          )}
          <div className="book-selector-tabs" style={{ flex: 1, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <button
              type="button"
              className={`book-tab-btn ${currentBook === 'builtin' ? 'active' : ''}`}
              onClick={() => handleSwitchBook('builtin')}
            >
              <span>📖</span>
              <span>TOEIC</span>
            </button>
            <button
              type="button"
              className={`book-tab-btn ${currentBook === 'maritime' ? 'active' : ''}`}
              onClick={() => handleSwitchBook('maritime')}
            >
              <span>⚓</span>
              <span>해사영어</span>
            </button>
            <button
              type="button"
              className={`book-tab-btn ${(currentBook === 'japanese_exam' || currentBook === 'japanese_life') ? 'active' : ''}`}
              onClick={() => handleSwitchBook(currentBook === 'japanese_life' ? 'japanese_life' : 'japanese_exam')}
            >
              <span>🇯🇵</span>
              <span>일본어</span>
            </button>
          </div>
        </div>
      ) : (
        onBack && (
          <div style={{ marginBottom: '12px' }}>
            <button
              type="button"
              className="ranking-back-btn"
              onClick={onBack}
              title="홈으로 돌아가기"
              style={{ width: '34px', height: '34px', fontSize: '18px' }}
            >
              ←
            </button>
          </div>
        )
      )}

      {/* 일본어 선택 시 노출되는 2대 서브 탭 (시험용 vs 완전 생활일본어) */}
      {!initialWords && (currentBook === 'japanese_exam' || currentBook === 'japanese_life') && (
        <div className="japanese-sub-tabs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
          <button
            type="button"
            className={`japanese-sub-tab-btn ${currentBook === 'japanese_exam' ? 'active' : ''}`}
            onClick={() => handleSwitchBook('japanese_exam')}
          >
            <span>📝 시험용 (JLPT N5~N3)</span>
          </button>
          <button
            type="button"
            className={`japanese-sub-tab-btn ${currentBook === 'japanese_life' ? 'active' : ''}`}
            onClick={() => handleSwitchBook('japanese_life')}
          >
            <span>🍱 완전 생활일본어</span>
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
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#38bdf8' }}>🎉 퀴즈 완료!</h2>
          
          {/* 점수 획득 배너 */}
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '14px', padding: '14px', maxWidth: '320px', margin: '0 auto 16px' }}>
            <span style={{ fontSize: '12px', color: '#a5b4fc', display: 'block', fontWeight: 'bold' }}>🏆 랭킹 점수 반영</span>
            <span style={{ fontSize: '26px', fontWeight: '900', color: '#fbbf24', display: 'block', margin: '4px 0' }}>
              +{syncedScore !== null ? syncedScore : Math.max(0, score.correct * 10 - score.wrong * 2)}점
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              (맞춤 +10점 / 틀림 -2점 적용)
            </span>
          </div>

          <p style={{ fontSize: '15px', marginBottom: '20px', color: '#e2e8f0' }}>
            총 <strong>{totalQuestions}</strong>문제 중 <strong style={{ color: '#4ade80' }}>{score.correct}</strong>문제 정답 (<strong style={{ color: '#f87171' }}>{score.wrong}</strong>문제 오답)
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 'bold' }}
              onClick={() => initQuizSession()}
            >
              다시 풀기 🔄
            </button>
            {onOpenRanking && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 'bold', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                onClick={onOpenRanking}
              >
                🏆 랭킹 확인
              </button>
            )}
          </div>
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
            <div className="quiz-headword-row">
              <h2 className="quiz-headword">{currentQuiz.word}</h2>
              <button
                type="button"
                className={`quiz-speak-btn ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleSpeakCurrentWord}
                title={`발음 듣기 (${currentLang === 'ja-JP' ? '일본어' : '영어'} TTS)`}
                aria-label="발음 듣기"
              >
                🔊
              </button>
            </div>
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

