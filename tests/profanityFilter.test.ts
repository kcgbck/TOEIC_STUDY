import { describe, it, expect } from 'vitest';
import { containsProfanity, validateNickname, generateCleanNickname } from '../src/utils/profanityFilter';

describe('비속어 필터 및 닉네임 유효성 검사 (profanityFilter.test.ts)', () => {
  it('일반적이고 건전한 닉네임은 정상 통과해야 한다', () => {
    expect(validateNickname('토익열공').isValid).toBe(true);
    expect(validateNickname('영단어마스터').isValid).toBe(true);
    expect(validateNickname('Student123').isValid).toBe(true);
    expect(validateNickname('해기사3급').isValid).toBe(true);
  });

  it('비속어 및 욕설이 포함된 닉네임은 차단되어야 한다', () => {
    expect(validateNickname('개새끼').isValid).toBe(false);
    expect(validateNickname('시발마스터').isValid).toBe(false);
    expect(validateNickname('존나잘함').isValid).toBe(false);
    expect(validateNickname('fuckyou').isValid).toBe(false);
    expect(validateNickname('병신123').isValid).toBe(false);
    expect(validateNickname('씨발라먹어').isValid).toBe(false);
  });

  it('초성 및 변형된 욕설 패턴도 차단되어야 한다', () => {
    expect(containsProfanity('ㅅㅂ')).toBe(true);
    expect(containsProfanity('ㅂㅅ')).toBe(true);
    expect(containsProfanity('ㅆㅂ')).toBe(true);
    expect(containsProfanity('f u c k')).toBe(true);
  });

  it('글자 수 제한(2~12자)을 위반하면 차단되어야 한다', () => {
    expect(validateNickname('a').isValid).toBe(false);
    expect(validateNickname('이것은열두글자가넘어가는닉네임입니다').isValid).toBe(false);
  });

  it('특수문자 및 공백이 포함되면 차단되어야 한다', () => {
    expect(validateNickname('토익 마스터').isValid).toBe(false);
    expect(validateNickname('토익!마스터').isValid).toBe(false);
    expect(validateNickname('study@toeic').isValid).toBe(false);
  });

  it('자동 생성 닉네임은 항상 유효성 검사를 통과해야 한다', () => {
    for (let i = 0; i < 20; i++) {
      const generated = generateCleanNickname();
      // generateCleanNickname는 _가 포함되므로 prefix_suffix 형태
      expect(generated.length).toBeGreaterThanOrEqual(2);
      expect(containsProfanity(generated)).toBe(false);
    }
  });
});
