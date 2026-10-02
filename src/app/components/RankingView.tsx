import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { UserProfile, RankingResponse, RankingItem } from '../../types/user';
import { validateNickname } from '../../utils/profanityFilter';

interface RankingViewProps {
  onBack: () => void;
}

export const RankingView: React.FC<RankingViewProps> = ({ onBack }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [rankingData, setRankingData] = useState<RankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 닉네임 수정 모달 상태
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNickname, setEditNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isSubmittingNickname, setIsSubmittingNickname] = useState(false);

  // 기기 코드 연동 모달 상태
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [inputDeviceCode, setInputDeviceCode] = useState('');
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);

  // 복사 완료 알림
  const [copyFeedback, setCopyFeedback] = useState(false);

  const loadData = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const curProfile = await userService.initSession();
      setProfile({ ...curProfile });
      const ranking = await userService.getRanking();
      setRankingData(ranking);
    } catch (err) {
      console.error('랭킹 데이터 로드 실패:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 닉네임 수정 처리
  const handleSaveNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    setNicknameError(null);

    const validation = validateNickname(editNickname);
    if (!validation.isValid) {
      setNicknameError(validation.error || '유효하지 않은 닉네임입니다.');
      return;
    }

    setIsSubmittingNickname(true);
    const result = await userService.updateNickname(editNickname);
    setIsSubmittingNickname(false);

    if (result.success) {
      setShowEditModal(false);
      await loadData(true);
    } else {
      setNicknameError(result.error || '닉네임 변경에 실패했습니다.');
    }
  };

  // 기기 코드 연동 처리
  const handleLinkDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError(null);

    if (!inputDeviceCode.trim()) {
      setLinkError('기기 코드를 입력해 주세요.');
      return;
    }

    setIsSubmittingLink(true);
    const result = await userService.linkDeviceCode(inputDeviceCode);
    setIsSubmittingLink(false);

    if (result.success && result.profile) {
      setShowLinkModal(false);
      setInputDeviceCode('');
      await loadData(true);
    } else {
      setLinkError(result.error || '기기 코드 연동에 실패했습니다.');
    }
  };

  // 기기 코드 복사
  const handleCopyDeviceCode = () => {
    if (!profile?.deviceCode) return;
    navigator.clipboard.writeText(profile.deviceCode);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-3 py-4 space-y-4 pb-20 animate-fadeIn">
      {/* 상단 네비게이션 헤더 */}
      <div className="flex items-center justify-between border-b pb-3 border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="뒤로 가기"
          >
            <span className="text-xl">←</span>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>🏆</span>
              <span>실시간 랭킹 보드</span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              맞춘 문제 +10점 / 틀린 문제 -2점
            </p>
          </div>
        </div>

        <button
          onClick={() => loadData(true)}
          disabled={isRefreshing}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium flex items-center gap-1 transition-all disabled:opacity-50"
        >
          <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
          <span>새로고침</span>
        </button>
      </div>

      {/* 내 순위 & 프로필 카드 (모바일 최적화 고정 카드) */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg space-y-3 relative overflow-hidden">
        {/* 장식용 원형 배경 */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black">
                {profile?.nickname || '로딩 중...'}
              </span>
              <button
                onClick={() => {
                  setEditNickname(profile?.nickname || '');
                  setNicknameError(null);
                  setShowEditModal(true);
                }}
                className="p-1 rounded bg-white/20 hover:bg-white/30 text-white text-xs transition-colors"
                title="닉네임 변경"
              >
                ✏️ 수정
              </button>
            </div>
            {/* 기기 코드 표시 및 복사 버튼 */}
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-indigo-100">
              <span>기기코드:</span>
              <span className="font-mono font-semibold tracking-wider bg-black/20 px-1.5 py-0.5 rounded text-[11px]">
                {profile?.deviceCode || '생성 중...'}
              </span>
              <button
                onClick={handleCopyDeviceCode}
                className="p-1 hover:text-white transition-colors"
                title="기기 코드 복사"
              >
                {copyFeedback ? '✅' : '📋'}
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-indigo-200 block font-semibold">내 순위</span>
            <span className="text-2xl font-black">
              {rankingData?.myRank ? `${rankingData.myRank.rank}위` : '순위 밖'}
            </span>
          </div>
        </div>

        {/* 4분할 지표 그리드 (모바일 1열 4분할) */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/20 text-center">
          <div className="bg-white/10 rounded-lg py-1.5">
            <span className="text-[10px] text-indigo-100 block">총 점수</span>
            <span className="text-sm font-black text-amber-300">
              {profile?.totalScore || 0}점
            </span>
          </div>
          <div className="bg-white/10 rounded-lg py-1.5">
            <span className="text-[10px] text-indigo-100 block">맞춘 문제</span>
            <span className="text-sm font-bold text-emerald-300">
              +{profile?.correctCount || 0}
            </span>
          </div>
          <div className="bg-white/10 rounded-lg py-1.5">
            <span className="text-[10px] text-indigo-100 block">틀린 문제</span>
            <span className="text-sm font-bold text-rose-300">
              -{profile?.incorrectCount || 0}
            </span>
          </div>
          <div className="bg-white/10 rounded-lg py-1.5">
            <span className="text-[10px] text-indigo-100 block">정답률</span>
            <span className="text-sm font-bold text-sky-300">
              {profile?.accuracy || 0}%
            </span>
          </div>
        </div>

        {/* 다른 기기 연동 버튼 */}
        <div className="pt-1 flex justify-between items-center text-[11px] text-indigo-100">
          <span>스마트폰 변경 시 코드로 계정을 이어받을 수 있습니다.</span>
          <button
            onClick={() => {
              setInputDeviceCode('');
              setLinkError(null);
              setShowLinkModal(true);
            }}
            className="underline underline-offset-2 hover:text-white font-medium"
          >
            기기 코드 연동
          </button>
        </div>
      </div>

      {/* 랭킹 리스트 섹션 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
          <span className="font-semibold">🏆 전체 랭킹 TOP 50</span>
          <span>총 {rankingData?.totalUsers || 0}명 참여</span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            <div className="animate-spin text-2xl mb-2">⏳</div>
            랭킹 데이터를 불러오는 중...
          </div>
        ) : rankingData?.topRankers && rankingData.topRankers.length > 0 ? (
          <div className="space-y-1.5">
            {rankingData.topRankers.map((item: RankingItem) => {
              const isMe = item.id === profile?.id;
              let badgeColor = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
              let medalIcon = null;

              if (item.rank === 1) {
                badgeColor = 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-600';
                medalIcon = '🥇';
              } else if (item.rank === 2) {
                badgeColor = 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600';
                medalIcon = '🥈';
              } else if (item.rank === 3) {
                badgeColor = 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
                medalIcon = '🥉';
              }

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isMe
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-sm ring-1 ring-indigo-400'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                  }`}
                >
                  {/* 순위 및 닉네임 */}
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${badgeColor}`}
                    >
                      {medalIcon ? medalIcon : item.rank}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                          {item.nickname}
                        </span>
                        {isMe && (
                          <span className="bg-indigo-500 text-white text-[10px] px-1 rounded font-bold shrink-0">
                            나
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 flex items-center space-x-2">
                        <span>#{item.shortDeviceCode}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {item.accuracy}% 정답
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 점수 & 상세 내역 */}
                  <div className="text-right shrink-0">
                    <span className="font-black text-sm text-indigo-600 dark:text-indigo-400 block">
                      {item.totalScore.toLocaleString()}점
                    </span>
                    <span className="text-[10px] text-gray-400">
                      맞춤 {item.correctCount} / 틀림 {item.incorrectCount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400 text-sm bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
            아직 등록된 랭커가 없습니다.<br />
            문제를 풀고 첫 번째 랭커가 되어보세요!
          </div>
        )}
      </div>

      {/* 닉네임 변경 팝업 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <span>✏️</span>
                <span>닉네임 변경</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                2~12자의 한글, 영문, 숫자만 사용 가능합니다.<br />
                <span className="text-rose-500 font-medium">* 비속어 및 욕설은 엄격히 제한됩니다.</span>
              </p>
            </div>

            <form onSubmit={handleSaveNickname} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={editNickname}
                  onChange={(e) => {
                    setEditNickname(e.target.value);
                    setNicknameError(null);
                  }}
                  maxLength={12}
                  placeholder="새 닉네임 입력 (2~12자)"
                  className="w-full px-3 py-2 text-sm border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                {nicknameError && (
                  <p className="text-xs text-rose-500 mt-1.5 font-medium">
                    ⚠️ {nicknameError}
                  </p>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNickname}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50"
                >
                  {isSubmittingNickname ? '확인 중...' : '저장하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 기기 코드 연동 모달 */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <span>🔗</span>
                <span>기존 기기 코드로 계정 연동</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                이전 스마트폰이나 PC에서 사용하던 기기 코드를 입력하면 기존 학습 기록과 랭킹 점수를 그대로 이어받습니다.
              </p>
            </div>

            <form onSubmit={handleLinkDevice} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={inputDeviceCode}
                  onChange={(e) => {
                    setInputDeviceCode(e.target.value.toUpperCase());
                    setLinkError(null);
                  }}
                  placeholder="예: VOCA-XXXX-XXXX"
                  className="w-full px-3 py-2 text-sm font-mono tracking-wider border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                  autoFocus
                />
                {linkError && (
                  <p className="text-xs text-rose-500 mt-1.5 font-medium">
                    ⚠️ {linkError}
                  </p>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLink}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50"
                >
                  {isSubmittingLink ? '연동 중...' : '계정 불러오기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
