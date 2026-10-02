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
    <div className="ranking-view">
      {/* 상단 네비게이션 헤더 */}
      <div className="ranking-nav-bar">
        <div className="ranking-nav-left">
          <button
            onClick={onBack}
            className="ranking-back-btn"
            title="뒤로 가기"
          >
            ←
          </button>
          <div className="ranking-title-group">
            <h1 className="ranking-main-title">
              <span>🏆</span>
              <span>실시간 랭킹 보드</span>
            </h1>
            <p className="ranking-sub-desc">
              맞춘 문제 +10점 / 틀린 문제 -2점
            </p>
          </div>
        </div>

        <button
          onClick={() => loadData(true)}
          disabled={isRefreshing}
          className="ranking-refresh-btn"
        >
          <span className={isRefreshing ? 'spin-animation' : ''}>🔄</span>
          <span>새로고침</span>
        </button>
      </div>

      {/* 내 순위 & 프로필 카드 (모바일 최적화 고정 카드) */}
      <div className="ranking-my-card">
        <div className="my-card-header">
          <div className="my-profile-group">
            <div className="my-nick-row">
              <span className="my-nickname-text">
                {profile?.nickname || '로딩 중...'}
              </span>
              <button
                onClick={() => {
                  setEditNickname(profile?.nickname || '');
                  setNicknameError(null);
                  setShowEditModal(true);
                }}
                className="btn-edit-nick"
                title="닉네임 변경"
              >
                ✏️ 수정
              </button>
            </div>
            {/* 기기 코드 표시 및 복사 버튼 */}
            <div className="my-code-row">
              <span>기기코드:</span>
              <span className="code-pill">
                {profile?.deviceCode || '생성 중...'}
              </span>
              <button
                onClick={handleCopyDeviceCode}
                className="btn-copy-code"
                title="기기 코드 복사"
              >
                {copyFeedback ? '✅' : '📋'}
              </button>
            </div>
          </div>

          <div className="my-rank-display">
            <span className="my-rank-label">내 순위</span>
            <span className="my-rank-num">
              {rankingData?.myRank ? `${rankingData.myRank.rank}위` : '순위 밖'}
            </span>
          </div>
        </div>

        {/* 4분할 지표 그리드 (모바일 1열 4분할) */}
        <div className="my-stats-grid">
          <div className="my-stat-box">
            <span className="my-stat-label">총 점수</span>
            <span className="my-stat-value score">
              {profile?.totalScore || 0}점
            </span>
          </div>
          <div className="my-stat-box">
            <span className="my-stat-label">맞춘 문제</span>
            <span className="my-stat-value correct">
              +{profile?.correctCount || 0}
            </span>
          </div>
          <div className="my-stat-box">
            <span className="my-stat-label">틀린 문제</span>
            <span className="my-stat-value incorrect">
              -{profile?.incorrectCount || 0}
            </span>
          </div>
          <div className="my-stat-box">
            <span className="my-stat-label">정답률</span>
            <span className="my-stat-value accuracy">
              {profile?.accuracy || 0}%
            </span>
          </div>
        </div>

        {/* 다른 기기 연동 버튼 */}
        <div className="my-card-footer">
          <span>스마트폰 변경 시 코드로 계정을 이어받을 수 있습니다.</span>
          <button
            onClick={() => {
              setInputDeviceCode('');
              setLinkError(null);
              setShowLinkModal(true);
            }}
            className="btn-link-account"
          >
            기기 코드 연동
          </button>
        </div>
      </div>

      {/* 랭킹 리스트 섹션 */}
      <div className="ranking-list-section">
        <div className="ranking-list-header">
          <span>🏆 전체 랭킹 TOP 50</span>
          <span>총 {rankingData?.totalUsers || 0}명 참여</span>
        </div>

        {isLoading ? (
          <div className="ranking-empty-box">
            <div className="spin-animation" style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
            <div>랭킹 데이터를 불러오는 중...</div>
          </div>
        ) : rankingData?.topRankers && rankingData.topRankers.length > 0 ? (
          <div className="ranking-list-items">
            {rankingData.topRankers.map((item: RankingItem) => {
              const isMe = item.id === profile?.id;
              let medalClass = '';
              let medalIcon: string | null = null;

              if (item.rank === 1) {
                medalClass = 'medal-1';
                medalIcon = '🥇';
              } else if (item.rank === 2) {
                medalClass = 'medal-2';
                medalIcon = '🥈';
              } else if (item.rank === 3) {
                medalClass = 'medal-3';
                medalIcon = '🥉';
              }

              return (
                <div
                  key={item.id}
                  className={`ranking-item-row ${isMe ? 'me' : ''}`}
                >
                  {/* 순위 및 닉네임 */}
                  <div className="rank-item-left">
                    <div className={`rank-item-badge ${medalClass}`}>
                      {medalIcon ? medalIcon : item.rank}
                    </div>

                    <div className="rank-item-info">
                      <div className="rank-nick-line">
                        <span className="rank-nickname">
                          {item.nickname}
                        </span>
                        {isMe && (
                          <span className="rank-me-tag">
                            나
                          </span>
                        )}
                      </div>
                      <div className="rank-meta-line">
                        <span>#{item.shortDeviceCode}</span>
                        <span>•</span>
                        <span className="rank-meta-accuracy">
                          {item.accuracy}% 정답
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 점수 & 상세 내역 */}
                  <div className="rank-item-right">
                    <span className="rank-item-score">
                      {item.totalScore.toLocaleString()}점
                    </span>
                    <span className="rank-item-sub">
                      맞춤 {item.correctCount} / 틀림 {item.incorrectCount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="ranking-empty-box">
            아직 등록된 랭커가 없습니다.<br />
            문제를 풀고 첫 번째 랭커가 되어보세요!
          </div>
        )}
      </div>

      {/* 닉네임 변경 팝업 모달 */}
      {showEditModal && (
        <div className="ranking-modal-backdrop">
          <div className="ranking-modal-box">
            <div>
              <h2 className="ranking-modal-title">
                <span>✏️</span>
                <span>닉네임 변경</span>
              </h2>
              <p className="ranking-modal-desc" style={{ marginTop: '6px' }}>
                2~12자의 한글, 영문, 숫자만 사용 가능합니다.<br />
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>* 비속어 및 욕설은 엄격히 제한됩니다.</span>
              </p>
            </div>

            <form onSubmit={handleSaveNickname} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                  className="ranking-modal-input"
                  autoFocus
                />
                {nicknameError && (
                  <p className="ranking-modal-error" style={{ marginTop: '6px' }}>
                    ⚠️ {nicknameError}
                  </p>
                )}
              </div>

              <div className="ranking-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="ranking-modal-btn cancel"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNickname}
                  className="ranking-modal-btn confirm"
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
        <div className="ranking-modal-backdrop">
          <div className="ranking-modal-box">
            <div>
              <h2 className="ranking-modal-title">
                <span>🔗</span>
                <span>기존 기기 코드로 계정 연동</span>
              </h2>
              <p className="ranking-modal-desc" style={{ marginTop: '6px' }}>
                이전 스마트폰이나 PC에서 사용하던 기기 코드를 입력하면 기존 학습 기록과 랭킹 점수를 그대로 이어받습니다.
              </p>
            </div>

            <form onSubmit={handleLinkDevice} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <input
                  type="text"
                  value={inputDeviceCode}
                  onChange={(e) => {
                    setInputDeviceCode(e.target.value.toUpperCase());
                    setLinkError(null);
                  }}
                  placeholder="예: VOCA-XXXX-XXXX"
                  className="ranking-modal-input"
                  style={{ fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase' }}
                  autoFocus
                />
                {linkError && (
                  <p className="ranking-modal-error" style={{ marginTop: '6px' }}>
                    ⚠️ {linkError}
                  </p>
                )}
              </div>

              <div className="ranking-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="ranking-modal-btn cancel"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLink}
                  className="ranking-modal-btn confirm"
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
