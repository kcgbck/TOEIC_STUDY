# ADR-001: Flutter 네이티브 앱에서 React PWA 및 Cloudflare 구조 전환

- 문서 번호: ADR-001
- 작성일자: 2026-09-28
- 상태: 채택됨 (Accepted)
- 대상 프로젝트: 토익_스터디 (TOEIC_STUDY)

---

## 1. 배경 및 맥락 (Context)

기존 `토익_스터디` 프로젝트는 Flutter 단일 코드베이스를 기반으로 Android(APK)와 iOS(IPA) 네이티브 바이너리를 각각 빌드하여 배포하는 구조로 기획되었다.
이 구조에서는 기기 내 로컬 DB로 SQLite/Drift를 사용하고, 광학 문자 인식(OCR)으로 Google ML Kit 네이티브 SDK를, PDF 처리를 위해 Apple PDFKit 및 Android PdfRenderer 네이티브 바인딩을 전제하였다.

그러나 모바일 앱스토어(Google Play / Apple App Store)의 심사 절차, 개발자 계정 유지 비용, 플랫폼별 네이티브 빌드 파이프라인의 복잡도, 그리고 개인 개발자의 유지보수 부담을 고려할 때, 모바일 브라우저의 표준 기술을 활용한 PWA(Progressive Web App, 설치형 웹앱)로의 전환이 더 높은 접근성과 신속한 배포 주기를 제공할 수 있다.

---

## 2. 이전 구조 (Previous Architecture)

- **프레임워크**: Flutter, Dart
- **타겟 플랫폼**: Android 네이티브(APK), iOS 네이티브(IPA)
- **로컬 저장소**: SQLite, Drift (플러터 타입 안전 ORM)
- **문자 인식 (OCR)**: Google ML Kit Text Recognition v2 네이티브 바인딩
- **PDF 처리**: Apple PDFKit (iOS) / Android PdfRenderer 네이티브 채널
- **배포 방식**: 플랫폼별 스토어 배포 또는 수동 바이너리 설치

---

## 3. 변경 구조 (New Architecture)

- **프론트엔드 프레임워크**: React + TypeScript + Vite
- **앱 형태**: Progressive Web App (PWA, 설치형 웹앱)
- **호스팅 및 배포**: GitHub `main` 푸시 → Cloudflare Workers Builds → Cloudflare Workers + Static Assets
- **기본 접속 URL**: `https://<project>.workers.dev` (향후 커스텀 도메인 확장 가능)
- **앱 설치 방식**:
  - Android Chrome: `beforeinstallprompt` 이벤트를 통한 PWA 원클릭 설치
  - iPhone Safari: 공유 시트 → `홈 화면에 추가` 안내
- **로컬 저장소**: 브라우저 표준 IndexedDB (Dexie 계층 래핑)
- **파일 입력**: 브라우저 표준 File API (`<input type="file" accept="image/*,application/pdf">`)
- **PDF 처리 엔진**: PDF.js (브라우저 메모리 내 텍스트 추출 및 Canvas 렌더링)
- **문자 인식 엔진**: 브라우저 내부 온디바이스 OCR (WebAssembly / Web Worker 기반 추론 계층, 특정 엔진 비종속적 `OcrEngine` 인터페이스 수립)
- **오프라인 지원**: Service Worker (Cache Storage 기반 앱 셸 및 필수 정적 리소스 프리캐싱)

---

## 4. 구조 전환 이유 (Rationale)

1. **단일 URL 및 배포 일원화**: Android와 iPhone을 위한 별도의 APK/IPA 빌드, 서명, 배포 절차가 불필요하며, 단 하나의 URL로 모든 모바일 및 데스크톱 환경을 지원한다.
2. **GitHub 기반 무중단 자동 배포**: GitHub `main` 브랜치에 코드를 푸시하면 Cloudflare Workers Builds가 즉시 빌드와 정적 에셋 배포를 완결하여 개발 주기를 극대화한다.
3. **스토어 심사 없는 즉각적 업데이트**: 앱스토어 심사 지연 없이 사용자에게 최신 버전을 즉시 제공한다.
4. **개인정보 완벽 보호 및 오프라인 보장**: 사용자의 사진, PDF, 학습 기록을 서버로 전송하지 않고 브라우저 샌드박스 내부(IndexedDB)에서만 처리하여 서버 유지비 0원 및 데이터 유출 위험 0%를 달성한다.

---

## 5. 장점 (Advantages)

- 설치 유연성: URL 즉시 접근 후 필요 시 홈 화면 아이콘으로 독립(Standalone) 앱처럼 실행 가능
- 크로스플랫폼 완성도: Android Chrome, iPhone Safari, Windows, macOS 전 영역에서 동일한 웹 표준으로 동작
- 배포 간소화: Cloudflare 글로벌 엣지 네트워크를 통한 초고속 정적 파일 서빙
- 오프라인 학습 지원: Service Worker와 IndexedDB를 결합하여 비행기 모드에서도 기본 퀴즈 및 기존 문제집 풀이 가능

---

## 6. 단점 및 네이티브 대비 불리한 점 (Trade-offs & Limitations)

네이티브 앱 대비 웹 환경에서 발생할 수 있는 다음의 기술적 제약을 숨김없이 인정하고 관리한다:

1. **OCR 연산 성능 및 메모리 제약**:
   - Google ML Kit의 C++ 네이티브 가속 대비, 브라우저 WebAssembly/Web Worker 기반 OCR은 CPU 점유율이 높고 처리 시간이 더 소요될 수 있다.
2. **대용량 PDF 메모리 처리**:
   - 100페이지 이상의 대용량 PDF를 브라우저 Canvas로 일괄 렌더링할 경우 모바일 브라우저 탭 크래시(OOM)가 발생할 위험이 있다.
   - **대응책**: 1페이지 단위 순차 렌더링 후 Canvas 즉시 메모리 해제(`canvas.width = 0; canvas.height = 0`) 파이프라인 강제.
3. **iOS Safari 브라우저 저장소 수명 정책**:
   - Safari의 ITP(Intelligent Tracking Prevention) 정책에 따라 7일 이상 사용하지 않는 웹앱의 로컬 스토리지가 정리될 잠재적 위험이 존재한다.
   - **대응책**: PWA 홈 화면 설치 유도 및 '문제집/학습기록 JSON 백업/복원(내보내기)' 기능을 필수 후속 과제로 수립.
4. **백그라운드 처리 제한**:
   - 모바일 브라우저는 화면이 꺼지거나 백그라운드로 전환되면 스레드를 일시 정지시키므로, 장시간의 백그라운드 OCR 작업이 제한된다.
5. **파일 시스템 직접 접근 불가**:
   - 네이티브 파일 패스 대신 File API의 Blob/File 객체 및 FileSystem API로 제한된다.

---

## 7. 주요 위험 및 대응 방안 (Key Risks & Mitigation)

| 위험 요소 | 영향도 | 대응 방안 |
| :--- | :---: | :--- |
| **브라우저 OCR 정확도 부족** | P0 | 특정 라이브러리를 성급히 확정하지 않고, `OcrEngine` 표준 인터페이스를 정의한 후 실제 단어책 표본으로 Tesseract.js / WASM / ONNX Web을 비교 벤치마크하여 최종 선정. |
| **모바일 Canvas 메모리 고갈** | P0 | PDF.js 페이지 단위 순차 렌더링 및 해상도 동적 다운스케일(300 DPI -> 필요 시 150~200 DPI). |
| **Safari 홈 화면 설치 인지 실패** | P1 | iPhone Safari 접속 감지 시 사용자 친화적인 '홈 화면에 추가' 가이드 모달/배너 렌더링. |
| **캐시 만료로 인한 오프라인 실패** | P1 | Service Worker에서 핵심 앱 셸과 JSON 데이터를 CacheFirst 전략으로 엄격히 고정 캐싱. |

---

## 8. 보류 항목 (Deferred Scope)

- Cloudflare D1 / KV / R2 서버 데이터베이스 도입 (초기 로컬 IndexedDB 검증 후 필요 시 재검토)
- 사용자 계정 생성 및 클라우드 다중 기기 동기화
- 실제 브라우저 OCR 엔진 최종 1종 확정 (기술 검증 단계로 위임)

---

## 9. 되돌릴 조건 (Reversal Conditions)

다음 상황이 실제 실기기 검증에서 객관적으로 입증될 경우 네이티브 앱 구조로의 롤백 또는 하이브리드(Capacitor 등) 패키징을 재검토한다:
1. iPhone Safari 및 Android Chrome 실기기에서 브라우저 온디바이스 OCR의 단어 인식률이 80% 미만으로 학습 유효성을 충족하지 못하는 경우
2. 모바일 브라우저의 1페이지 OCR 처리 시간이 평균 10초를 초과하여 심각한 사용자 이탈이 발생하는 경우
3. iOS Safari의 IndexedDB 휘발 문제로 실제 사용자 학습 기록 보존율이 치명적으로 떨어지는 경우
