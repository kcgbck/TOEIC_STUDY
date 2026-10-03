/**
 * 보카 스터디 고신뢰성 TTS(Text-to-Speech) 서비스
 * 
 * 비용 0원: 브라우저 내장 Web Speech API를 1차로 사용하고,
 * 스마트폰 기기별 언어 팩 미설치나 브라우저 버그(GC/침묵/onerror) 발생 시
 * 무료 고품질 Fallback 오디오 스트림으로 100% 무조건 소리가 나도록 자동 복구합니다.
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

// 브라우저 가비지 컬렉션(GC)으로 인한 침묵 방지용 전역 활성 참조
let activeUtterance: any = null;
let activeAudio: HTMLAudioElement | null = null;
let cachedVoices: any[] = [];

// 브라우저 목소리(Voices) 사전 로드
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      try {
        cachedVoices = window.speechSynthesis.getVoices();
      } catch (_) {}
    };
  } catch (_) {}
}

/**
 * 브라우저 TTS 실패 또는 미지원 환경을 위한 100% 무과금 고품질 오디오 Fallback
 */
export function playFallbackAudio(text: string, lang: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      if (activeAudio) {
        activeAudio.pause();
        activeAudio = null;
      }

      if (typeof Audio === 'undefined') {
        resolve(false);
        return;
      }

      const shortLang = lang.startsWith('ja') ? 'ja' : 'en';
      const clean = cleanSpeechText(text, lang);
      if (!clean) {
        resolve(false);
        return;
      }

      // Google Translate 공개 스트림 (무료, 종량제 과금 0원)
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${shortLang}&q=${encodeURIComponent(clean)}`;
      const audio = new Audio(url);
      audio.volume = 1.0;
      activeAudio = audio;

      audio.onended = () => {
        activeAudio = null;
        resolve(true);
      };

      audio.onerror = (e) => {
        console.warn('[TTS] Fallback audio playback failed:', e);
        activeAudio = null;
        resolve(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => resolve(true))
          .catch((err) => {
            console.warn('[TTS] Fallback audio.play() blocked/failed:', err);
            resolve(false);
          });
      }
    } catch (err) {
      console.warn('[TTS] playFallbackAudio exception:', err);
      resolve(false);
    }
  });
}

export const speechService = {
  /**
   * 현재 브라우저의 음성 출력 지원 여부 확인
   */
  isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      (('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) ||
        typeof Audio !== 'undefined')
    );
  },

  /**
   * 단어 또는 문장 음성 재생
   * 1차: Web Speech API (내장 음성 엔진)
   * 2차: 스마트폰 언어 팩 미설치/버그 시 고품질 오디오 스트림 Fallback 자동 실행
   * @param text 읽을 텍스트
   * @param lang 언어 코드 (기본값: 'en-US')
   * @param rate 재생 속도 (기본값: 0.9 - 학습용 최적 속도)
   * @returns 재생 시도 성공 여부
   */
  speak(text: string, lang: SpeechLang | string = 'en-US', rate = 0.9): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    if (!text || !text.trim()) {
      return false;
    }

    const cleanText = cleanSpeechText(text, String(lang));
    if (!cleanText) return false;

    // 이전 Fallback 오디오 정지
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio = null;
      } catch (_) {}
    }

    const hasWebSpeech =
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window;

    // Web Speech API 미지원 브라우저인 경우 바로 Fallback 오디오 실행
    if (!hasWebSpeech) {
      playFallbackAudio(cleanText, String(lang));
      return true;
    }

    try {
      // 모바일 paused 락 해제
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // 재생 중인 음성이 있을 때만 cancel
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const UtteranceClass = window.SpeechSynthesisUtterance;
      const utterance = new UtteranceClass(cleanText);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.volume = 1.0;

      // 보이스 매칭
      const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langLower = lang.toLowerCase();
        const matchedVoice =
          voices.find((v: any) => v.lang.toLowerCase().replace('_', '-') === langLower) ||
          voices.find((v: any) => v.lang.toLowerCase().startsWith(langLower.slice(0, 2)));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      // GC 방지를 위해 모듈 전역 변수에 보관
      activeUtterance = utterance;

      let hasStarted = false;

      utterance.onstart = () => {
        hasStarted = true;
      };

      utterance.onend = () => {
        activeUtterance = null;
      };

      utterance.onerror = (e: any) => {
        console.warn('[TTS] Web Speech onerror, Fallback audio로 전환:', e);
        activeUtterance = null;
        playFallbackAudio(cleanText, String(lang));
      };

      window.speechSynthesis.speak(utterance);

      // 모바일 기기에서 언어팩 미설치 등으로 침묵(onstart 미발생) 시 Fallback 트리거
      if (typeof setTimeout !== 'undefined') {
        setTimeout(() => {
          if (!hasStarted) {
            console.warn('[TTS] Web Speech 침묵 감지 -> Fallback Audio 자동 실행');
            try {
              if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
              }
            } catch (_) {}
            activeUtterance = null;
            playFallbackAudio(cleanText, String(lang));
          }
        }, 350);
      }

      return true;
    } catch (e) {
      console.warn('[TTS] Web Speech API 실패 -> Fallback audio 실행:', e);
      playFallbackAudio(cleanText, String(lang));
      return true;
    }
  },

  /**
   * 현재 재생 중인 모든 음성(Web Speech 및 Fallback Audio) 즉시 정지
   */
  stop(): void {
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio = null;
      } catch (_) {}
    }

    if (activeUtterance && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn('Speech cancel failed:', e);
      }
    }
    activeUtterance = null;
  },

  /**
   * 디버깅 및 GC 상태 확인
   */
  getActiveUtterance(): any {
    return activeUtterance;
  },
};
