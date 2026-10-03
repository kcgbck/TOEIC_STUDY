/**
 * 보카 스터디 Web Speech API (TTS) 서비스
 * 
 * 비용 0원: 브라우저 내장 Web Speech API를 활용하여
 * 외부 유료 API나 네트워크 과금 없이 100% 무료/오프라인 음성 지원.
 */

export type SpeechLang = 'en-US' | 'en-GB' | 'ja-JP' | 'ko-KR';

/**
 * 음성 재생에 적합하도록 단어 텍스트 정제
 * - 영어: "acquire (verb)" -> "acquire"
 * - 일본어: "約束 (やくそく)" -> "約束"
 * - 말머리 대괄호 태그 제거: "[식당] すみません" -> "すみません"
 */
export function cleanSpeechText(raw: string, lang = 'en-US'): string {
  if (!raw) return '';
  let cleaned = raw.trim();

  // 대괄호 태그 제거 (예: [식당], [JLPT N5])
  cleaned = cleaned.replace(/^\[[^\]]+\]\s*/, '');

  if (lang.startsWith('ja')) {
    // 일본어: 괄호 안의 요미가나 또는 한국어 뜻 제거 (예: 約束 (やく소쿠) -> 約束)
    cleaned = cleaned.replace(/\s*[\(（][^\)）]+[\)）]/g, '').trim();
    // 만약 괄호를 제거해서 아무것도 남지 않았다면 원문에서 괄호 기호만 제거
    if (!cleaned) {
      cleaned = raw.replace(/[\(（\)）]/g, '').trim();
    }
  } else {
    // 영어: 괄호 내용 제거 (예: take off (phrase) -> take off)
    cleaned = cleaned.replace(/\s*\([^\)]+\)/g, '').trim();
  }

  return cleaned;
}

export const speechService = {
  /**
   * 현재 브라우저의 Web Speech API 지원 여부 확인
   */
  isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window
    );
  },

  /**
   * 단어 또는 문장 음성 재생
   * @param text 읽을 텍스트
   * @param lang 언어 코드 (기본값: 'en-US')
   * @param rate 재생 속도 (기본값: 0.9 - 학습용 최적 속도)
   * @returns 재생 시작 여부 (boolean)
   */
  speak(text: string, lang: SpeechLang | string = 'en-US', rate = 0.9): boolean {
    if (!this.isSupported() || !text || !text.trim()) {
      return false;
    }

    try {
      // 진행 중인 이전 음성 즉시 취소 (중복 및 버퍼 지연 방지)
      window.speechSynthesis.cancel();

      // 발음 텍스트 정제 (괄호나 불필요한 특수기호 일부 정리)
      const cleanText = cleanSpeechText(text, String(lang));
      if (!cleanText) return false;

      const UtteranceClass = window.SpeechSynthesisUtterance;
      const utterance = new UtteranceClass(cleanText);
      utterance.lang = lang;
      utterance.rate = rate; // 또렷한 발음 청취를 위해 0.9 배속

      // 사용 가능한 음성(Voice) 중 해당 언어에 가장 적합한 음성 우선 매칭
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langLower = lang.toLowerCase();
        const matchedVoice = voices.find((v) => v.lang.toLowerCase().replace('_', '-') === langLower) ||
          voices.find((v) => v.lang.toLowerCase().startsWith(langLower.slice(0, 2)));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
      return false;
    }
  },

  /**
   * 현재 재생 중인 음성 정지
   */
  stop(): void {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn('Speech cancel failed:', e);
      }
    }
  },
};
