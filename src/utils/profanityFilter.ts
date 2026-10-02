// 비속어 및 욕설 필터링 모듈 (클라이언트 & 서버 공통)

// 한국어 및 영문 주요 비속어 / 혐오 표현 목록
const PROFANITY_WORDS: string[] = [
  // 한국어 욕설 및 비하 표현
  '시발', '씨발', '시벌', '씨벌', '쉬발', '슈발', '시바', '씨바', '시팔', '씨팔',
  '개새', '개새끼', '개세끼', '개소리', '개년', '개놈', '개자식', '씹새', '씹새끼', '쌉새',
  '병신', '븅신', '빙신', '호구', '등신', '호로', '지랄', '지럴', '엠창', '니기미',
  '느금마', '느검마', '니엄마', '니애미', '느개비', '니애비', '애자', '장애우',
  '좆', '좇', '존나', '좃나', '졸라', '썅', '썅년', '썅놈', '미친년', '미친놈', '미친새끼',
  '닥쳐', '꺼져', '죽어', '자살', '살인', '새끼',
  // 성적 표현 및 혐오
  '섹스', '섹스어', '자지', '보지', '보짓', '자짓', '잠지', '오르가즘', '자위', '성교',
  '포르노', '야동', '성매매', '원나잇', '조건만남', '창녀', '걸레', '보빨', '자빨',
  // 일베 / 혐오 은어
  '노무현', '운지', '이기야', '앙망', '한남충', '김치녀', '한녀충', '틀딱', '급식충', '틀니',
  // 영문 비속어
  'fuck', 'fucking', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'pussy',
  'nigger', 'nigga', 'retard', 'porn', 'sex', 'sexy'
];

// 초성 및 변형 욕설 패턴 정규식
const PROFANITY_PATTERNS: RegExp[] = [
  /ㅅ[\s\._\-*]*ㅂ/i,
  /ㅆ[\s\._\-*]*ㅂ/i,
  /ㅂ[\s\._\-*]*ㅅ/i,
  /ㅈ[\s\._\-*]*ㄴ/i,
  /ㄲ[\s\._\-*]*ㅈ/i,
  /ㄷ[\s\._\-*]*ㅊ/i,
  /f[\s\._\-*]*u[\s\._\-*]*c[\s\._\-*]*k/i,
  /s[\s\._\-*]*h[\s\._\-*]*i[\s\._\-*]*t/i,
  /b[\s\._\-*]*i[\s\._\-*]*t[\s\._\-*]*c[\s\._\-*]*h/i
];

/**
 * 텍스트 내 비속어 포함 여부 검사
 */
export function containsProfanity(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  
  // 공백 및 특수문자 제거 후 소문자 변환
  const normalized = text.toLowerCase().replace(/[\s\._\-*!@#$%^&()+=]/g, '');
  
  // 1. 단어 리스트 매칭
  for (const word of PROFANITY_WORDS) {
    if (normalized.includes(word)) {
      return true;
    }
  }

  // 2. 변형/자음 정규식 매칭
  for (const pattern of PROFANITY_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }

  return false;
}

/**
 * 닉네임 유효성 검사 (길이, 특수문자, 비속어)
 */
export function validateNickname(nickname: string): { isValid: boolean; error?: string } {
  if (!nickname) {
    return { isValid: false, error: '닉네임을 입력해 주세요.' };
  }

  const trimmed = nickname.trim();

  // 길이 검사 (2~12자)
  if (trimmed.length < 2 || trimmed.length > 12) {
    return { isValid: false, error: '닉네임은 2자 이상 12자 이하로 입력해 주세요.' };
  }

  // 허용 문자: 한글 완성형, 영문, 숫자만 허용 (공백 및 특수문자 금지)
  const allowedPattern = /^[가-힣a-zA-Z0-9]+$/;
  if (!allowedPattern.test(trimmed)) {
    return { isValid: false, error: '닉네임에는 한글, 영문, 숫자만 사용할 수 있습니다. (공백/특수문자 불가)' };
  }

  // 비속어 검사
  if (containsProfanity(trimmed)) {
    return { isValid: false, error: '부적절하거나 비속어가 포함된 닉네임은 사용할 수 없습니다.' };
  }

  return { isValid: true };
}

/**
 * 최초 접속 시 안전한 기본 닉네임 자동 생성
 * 예: "열공러_7A2F", "보카마스터_3C9D"
 */
export function generateCleanNickname(shortCode?: string): string {
  const prefixes = ['열공러', '보카마스터', '단어정복자', '스터디러', '퀴즈러너', '영어고수', '해사마스터'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = shortCode || Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${randomPrefix}_${suffix}`;
}
