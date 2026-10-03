import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { speechService } from '../src/services/speechService';

describe('speechService (Web Speech API TTS)', () => {
  let mockSpeak: any;
  let mockCancel: any;
  let mockGetVoices: any;
  const originalWindow = (globalThis as any).window;

  beforeEach(() => {
    mockSpeak = vi.fn();
    mockCancel = vi.fn();
    mockGetVoices = vi.fn().mockReturnValue([
      { name: 'Google US English', lang: 'en-US' },
      { name: 'Google 日本語', lang: 'ja-JP' },
    ]);

    const fakeWindow: any = {
      speechSynthesis: {
        speak: mockSpeak,
        cancel: mockCancel,
        getVoices: mockGetVoices,
      },
      SpeechSynthesisUtterance: function (this: any, text: string) {
        this.text = text;
        this.lang = 'en-US';
        this.rate = 1;
        this.voice = null;
      },
    };

    (globalThis as any).window = fakeWindow;
  });

  afterEach(() => {
    (globalThis as any).window = originalWindow;
  });

  it('isSupported returns true when speechSynthesis is available', () => {
    expect(speechService.isSupported()).toBe(true);
  });

  it('speaks English text with en-US and 0.9 rate', () => {
    const res = speechService.speak('acquire', 'en-US');
    expect(res).toBe(true);
    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).toHaveBeenCalled();
    const utterance = mockSpeak.mock.calls[0][0];
    expect(utterance.text).toBe('acquire');
    expect(utterance.lang).toBe('en-US');
    expect(utterance.rate).toBe(0.9);
  });

  it('speaks Japanese text with ja-JP and cleans brackets', () => {
    const res = speechService.speak('約束 (やくそく)', 'ja-JP');
    expect(res).toBe(true);
    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).toHaveBeenCalled();
    const utterance = mockSpeak.mock.calls[0][0];
    expect(utterance.text).toBe('約束');
    expect(utterance.lang).toBe('ja-JP');
  });

  it('cleans tags and brackets properly in English', () => {
    const res = speechService.speak('take off (phrase)', 'en-US');
    expect(res).toBe(true);
    const utterance = mockSpeak.mock.calls[0][0];
    expect(utterance.text).toBe('take off');
  });

  it('handles empty text gracefully without throwing', () => {
    const res = speechService.speak('');
    expect(res).toBe(false);
    expect(mockSpeak).not.toHaveBeenCalled();
  });

  it('calls stop correctly', () => {
    speechService.stop();
    expect(mockCancel).toHaveBeenCalled();
  });

  it('returns false when window is undefined', () => {
    (globalThis as any).window = undefined;
    expect(speechService.isSupported()).toBe(false);
    expect(speechService.speak('test')).toBe(false);
  });
});
