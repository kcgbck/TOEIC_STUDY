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
 * 모바일 브라우저 친화적 단일 오디오 인스턴스
 */
let sharedAudio: HTMLAudioElement | null = null;

function getSharedAudio(): HTMLAudioElement | null {
  if (typeof Audio === 'undefined') return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.volume = 1.0;
  }
  return sharedAudio;
}

/**
 * 모바일 브라우저 환경 감지
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = typeof navigator !== 'undefined' ? navigator : window.navigator;
  const ua = nav?.userAgent || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
}

/**
 * 고음질 오디오 프록시 URL 생성 (/api/tts?text=...&lang=...)
 */
export function getAudioProxyUrl(text: string, lang: string): string {
  const shortLang = lang.startsWith('ja') ? 'ja' : 'en';
  const clean = cleanSpeechText(text, lang);
  return `/api/tts?text=${encodeURIComponent(clean)}&lang=${encodeURIComponent(shortLang)}`;
}

/**
 * 브라우저 TTS 실패 또는 모바일 환경을 위한 100% 무과금 고품질 오디오 스트림 재생
 */
export function playFallbackAudio(text: string, lang: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      if (typeof Audio === 'undefined') {
        resolve(false);
        return;
      }

      const clean = cleanSpeechText(text, lang);
      if (!clean) {
        resolve(false);
        return;
      }

      const audio = getSharedAudio();
      if (!audio) {
        resolve(false);
        return;
      }

      // 이전 재생 중지
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (_) {}

      audio.src = getAudioProxyUrl(clean, lang);
      activeAudio = audio;

      audio.onended = () => {
        activeAudio = null;
        resolve(true);
      };

      audio.onerror = (e) => {
        console.warn('[TTS] Audio playback failed:', e);
        activeAudio = null;
        resolve(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => resolve(true))
          .catch((err) => {
            console.warn('[TTS] Audio.play() blocked/failed:', err);
            resolve(false);
          });
      } else {
        resolve(true);
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
   * - 모바일 브라우저: Autoplay 차단 방지 및 깨끗한 원어민 발음을 위해 동기적 오디오 스트림(/api/tts) 즉시 재생
   * - 데스크톱/테스트 환경: 브라우저 내장 Web Speech API 우선 사용 및 문제 발생 시 자동 오디오 전환
   * @param text 읽을 텍스트
   * @param lang 언어 코드 (기본값: 'en-US')
   * @param rate 재생 속도 (기본값: 0.9 - 학습용 최적 속도)
   * @param options 추가 옵션 (forceAudioStream, onEnd 콜백)
   * @returns 재생 시도 성공 여부
   */
  speak(
    text: string,
    lang: SpeechLang | string = 'en-US',
    rate = 0.9,
    options?: { forceAudioStream?: boolean; onEnd?: () => void }
  ): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    if (!text || !text.trim()) {
      return false;
    }

    const cleanText = cleanSpeechText(text, String(lang));
    if (!cleanText) return false;

    // 1. 모바일 기기이거나 오디오 스트림 강제 옵션일 때:
    // 모바일 터치 이벤트 내부에서 즉시 오디오 스트림을 재생해야 브라우저의 Autoplay 차단(NotAllowedError)을 방지하고
    // 기기별 음성팩 미설치 문제 없이 100% 또렷한 원어민 발음이 나옵니다.
    const isMobile = isMobileDevice();
    const preferStream = options?.forceAudioStream || isMobile;

    const hasWebSpeech =
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window;

    if (preferStream || !hasWebSpeech) {
      playFallbackAudio(cleanText, String(lang)).then(() => {
        options?.onEnd?.();
      });
      return true;
    }

    try {
      // 데스크톱 / 테스트 환경: Web Speech API 우선 실행
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const UtteranceClass = window.SpeechSynthesisUtterance;
      const utterance = new UtteranceClass(cleanText);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.volume = 1.0;

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

      activeUtterance = utterance;

      utterance.onend = () => {
        activeUtterance = null;
        options?.onEnd?.();
      };

      utterance.onerror = (e: any) => {
        console.warn('[TTS] Web Speech onerror -> 오디오 스트림 전환:', e);
        activeUtterance = null;
        playFallbackAudio(cleanText, String(lang)).then(() => {
          options?.onEnd?.();
        });
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('[TTS] Web Speech 예외 발생 -> 오디오 스트림 실행:', e);
      playFallbackAudio(cleanText, String(lang)).then(() => {
        options?.onEnd?.();
      });
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

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
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
