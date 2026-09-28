# TOEIC 단어학습 앱 개발 마스터 플랜 (PWA v2)

- 문서 버전: v2.0 (PWA 구조 전환)
- 작성 기준일: 2026-09-28
- 대상 플랫폼: Progressive Web App (Android Chrome / iPhone Safari / 데스크톱 웹)
- 권장 개발 방식: React + TypeScript + Vite 단일 웹 코드베이스
- 호스팅 및 배포: GitHub main → Cloudflare Workers Builds → Cloudflare Workers + Static Assets
- 핵심 목표: **별도 APK/IPA 설치 없이 URL 접속 및 홈 화면 추가로 실행하며, 기본 TOEIC 단어 퀴즈 + 브라우저 내부에서 사진/PDF를 분석하여 영단어·뜻을 자동 추출해 4지선다 문제로 학습**

---

## 아키텍처 결정 — 2026-09

기존:
Flutter 기반 Android/iOS 네이티브 앱

변경:
React + TypeScript + Vite 기반 설치형 웹앱(PWA)

배포:
GitHub → Cloudflare Workers Builds → Cloudflare Workers Static Assets

설치:
Chrome PWA 설치
Safari 홈 화면 웹 앱 설치

로컬 저장:
SQLite → IndexedDB

PDF:
PDFKit/PdfRenderer → PDF.js

OCR:
Google ML Kit 고정 → 브라우저 OCR 기술검증 후 선정

변경 이유:
- Android/iPhone 별도 앱 빌드·배포 제거
- 하나의 URL과 코드베이스 유지
- GitHub push 기반 자동 배포
- 앱스토어 없이 즉시 배포
- Chrome/Safari 홈 화면 설치

---

## 1. 프로젝트 목표

이 앱의 목적은 휴대폰 및 태블릿, PC에서 복잡한 앱스토어 설치 절차 없이 웹 브라우저를 통해 영어단어 4지선다 문제를 빠르게 풀 수 있게 하는 것이다.
사용자는 브라우저에서 '홈 화면에 추가'를 통해 네이티브 앱과 동일한 독립 창(Standalone) 모드로 학습을 진행할 수 있다.

앱은 두 개의 핵심 학습 경로만 우선 완성한다.

### 기능 A — 기본 TOEIC 문제풀이

앱 자체에 검증된 TOEIC 관련 어휘 데이터베이스(JSON)를 번들로 탑재한다.
사용자는 별도 파일 입력 없이 바로 다음 흐름으로 학습한다:

`웹앱 실행(또는 PWA 아이콘 터치) → 기본 문제풀기 → 난이도 선택 → 문제 수 선택 → 4지선다 풀이 → 즉시 채점 → 오답 복습`

### 기능 B — 사진/PDF 문제 제작 + 문제풀이

휴대폰 브라우저에서 영어단어책 사진을 선택(또는 카메라 촬영)하거나 PDF를 선택하면, 앱이 **서버 업로드 없이 브라우저 메모리 내부에서** 문서 안의 영어단어와 한국어 뜻을 추출하고 문제 세트를 만든다:

`사진/PDF 선택 → 브라우저 문자 인식(PDF.js/온디바이스 OCR) → 영단어/뜻 연결 → 오류·중복 검사 → 사용자 검토 화면 → 문제집 생성 → 문제풀이`

---

## 2. 핵심 제품 원칙

1. **기능을 많이 넣기보다 문제 제작 및 연결 정확도를 우선한다.**
2. OCR 및 파싱 결과를 바로 문제로 사용하지 않고 반드시 정규화·검증 및 사용자 검토 단계를 거친다.
3. 사용자가 수정해야 하는 양을 최소화한다.
4. **개인정보 및 오프라인 우선(Local-first)**: 사용자의 사진, PDF, 학습 기록은 서버로 전송하지 않으며, 인터넷 연결이 없어도 Service Worker와 IndexedDB를 통해 기본 문제풀이와 저장된 문제집 학습이 가능해야 한다.
5. Cloudflare 서버는 정적 에셋 서빙 및 배포 자동화(Workers Builds) 역할만 담당하며 사용자 문서를 수집하지 않는다.
6. TOEIC 관련 상용 교재 내용을 무단 복제하여 앱 기본 데이터로 배포하지 않는다.
7. 문제 화면은 모바일 브라우저 환경에서 한 손으로 빠르게 사용할 수 있도록 군더더기 없이 최적화한다.

---

## 3. 웹 프레임워크 및 배포 환경

### 3.1 기술 스택

- **프론트엔드**: React, TypeScript, Vite
- **PWA 계층**: Web App Manifest, Service Worker (Cache Storage)
- **로컬 저장소**: IndexedDB (Dexie 계층)
- **PDF 엔진**: PDF.js (브라우저 메모리 파싱 및 Canvas 렌더링)
- **OCR 엔진**: 브라우저 온디바이스 OCR 계층 (`OcrEngine` 표준 인터페이스 기반 후보군 벤치마크)
- **배포 인프라**: GitHub `main` → Cloudflare Workers Builds (Cloudflare Workers + Static Assets)
- **도구체인**: `@cloudflare/vite-plugin` 및 `wrangler`

### 3.2 선정 이유

- 단일 웹 표준 코드베이스로 Android, iOS, Windows, macOS 전 기기 동시 대응
- 앱스토어 심사 불필요 및 GitHub 푸시 즉시 글로벌 배포 완료
- 서버리스 정적 에셋 배포로 인프라 비용 0원 유지
- 기기 내 IndexedDB 활용으로 무계정 100% 오프라인 학습 지원

---

## 4. 전체 기능 구조

```text
                     [PWA 앱 시작]
                          │
           ┌──────────────┴──────────────┐
           │                             │
  [기본 TOEIC 문제풀기]          [사진/PDF 문제 만들기]
           │                             │
     기본 단어 번들            브라우저 File API (사진/PDF)
           │                             │
      난이도 선택              문서 분석 (PDF.js / Web OCR)
           │                             │
      문제 수 선택                 영단어·뜻 자동 추출
           │                             │
           │                       추출 결과 사용자 검토
           │                             │
           │                       IndexedDB 문제집 저장
           └──────────────┬──────────────┘
                          │
                     4지선다 문제
                          │
                     즉시 채점 / 피드백
                          │
                     오답 반복학습
                          │
                  IndexedDB 학습 통계
```

---

## 5. 메인 화면 및 PWA 설치 인터페이스

```text
┌──────────────────────────┐
│       토익_스터디         │
│  [ ⬇ 홈 화면에 앱 설치 ] │  ← Chrome 자동감지 / Safari 가이드
│                          │
│   [ 기본 문제풀기 ]       │
│                          │
│ [ 사진으로 문제 만들기 ]  │
│                          │
│ [ PDF로 문제 만들기 ]     │
│                          │
│      [ 내 문제집 ]        │
│      [ 학습 기록 ]        │
└──────────────────────────┘
```

- **Android Chrome**: `beforeinstallprompt` 이벤트 감지 시 상단에 원클릭 설치 버튼 노출.
- **iPhone Safari**: 공유 버튼(⎋) → `홈 화면에 추가`(⊞) 가이드 팝업/배너 제공.
- 이미 `display: standalone` 모드로 실행 중인 경우 설치 버튼을 숨기고 독립 앱 배지 표시.

---

## 6. 기본 TOEIC 문제풀이 기능

### 6.1 기본 단어 데이터 목표

- 최소 2,000개 이상 (권장 2,500~3,000개)
- 앱 번들 정적 JSON (`public/data/toeic_words_v1.json`)으로 배포
- 표제어, 대표 한국어 뜻, 품사, 난이도, 주제, 혼동 단어 그룹, 검증 상태
- 공식 빈출 자료(ETS/IIBC 공개 자료) 교차 대조를 통한 A/B 신뢰도 등급 단어만 수록
- 상용 교재 원문 무단 복제 엄격 금지

---

## 7. 기본 문제 출제 방식

- 상단 중앙 영단어 1개
- 하단 한국어 뜻 4지선다 보기 (정답 1개 + 오답 3개)
- 보기 순서 난수 셔플 (Fisher-Yates)
- 모바일 원터치 즉시 판정 (정답 초록색 / 오답 빨간색 및 실제 정답 동시 표시)
- 하단 [다음] 버튼 활성화로 학습 리듬 유지

---

## 8. 난이도 시스템

- **하 (기초 암기)**: 의미 범주와 품사가 명확히 다른 오답 배치
- **중 (일반 학습)**: 동일 품사 및 동일 비즈니스 주제 어휘에서 오답 선별
- **상 (고득점 대비)**: 동일 품사 + 형태 유사 혼동 단어(confirm/conform 등) 배치
- **자동 (성취도 기반)**: 최근 30문제 정답률(85% 이상 상승, 65% 미만 하향)에 따라 실시간 자동 조절

---

## 9. 사진을 이용한 문제 제작 (브라우저 방식)

### 9.1 입력 방식

- 브라우저 표준 파일 선택: `<input type="file" accept="image/*" multiple>`
- 모바일 환경에서는 갤러리 선택 또는 카메라 직접 촬영 트리거
- 선택된 파일은 서버로 전송되지 않고 브라우저 `URL.createObjectURL()` 또는 `FileReader` 메모리로 로드

### 9.2 처리 흐름

```text
사진 선택 (File API)
   ↓
Image 비트맵 로드 및 회전/대비 보정 (Canvas API)
   ↓
브라우저 온디바이스 OCR 추론 (Web Worker)
   ↓
바운딩 박스(Bounding Box) 좌표계 분석
   ↓
영단어 표제어 후보 식별
   ↓
한국어 뜻 후보 영역 식별
   ↓
5대 기하학적 연결 알고리즘 적용 (동일 행 / 근접 거리 / 경계 묶음)
   ↓
품사 분리 및 예문·헤더 노이즈 제거
   ↓
신뢰도 판정 (높음 / 보통 / 낮음)
   ↓
사용자 검토 화면 (인라인 수정/삭제)
   ↓
IndexedDB 문제집으로 저장
```

---

## 10. PDF를 이용한 문제 제작 (브라우저 방식)

### 10.1 입력 방식

- 브라우저 표준 파일 선택: `<input type="file" accept="application/pdf">`
- PDF 파일 바이트를 `ArrayBuffer` 형태로 브라우저 메모리에 로드

### 10.2 PDF.js 기반 이원화 처리

```text
PDF 파일 수신 (ArrayBuffer)
  ↓
PDF.js 문서 파싱 (pdfjsLib.getDocument)
  ↓
텍스트 레이어 검사 (page.getTextContent())
  ↓
  ┌─────────────────────────┬─────────────────────────┐
  │ 텍스트 레이어 존재      │ 텍스트 없음 (스캔본)    │
  │                         │                         │
  │ PDF.js 직접 텍스트 추출 │ Canvas 페이지 렌더링    │
  │ - 문자열 및 폰트 좌표   │           ↓             │
  │ - 고속 0ms 오인식 없음  │ 브라우저 온디바이스 OCR │
  └────────────┬────────────┴────────────┬────────────┘
               │                         │
               └────────────┬────────────┘
                            ↓
                     단어-뜻 연결 엔진
```

### 10.3 모바일 브라우저 메모리 보호 규칙

- 100페이지 이상 대용량 PDF 처리 시 모바일 브라우저 탭 크래시 방지 필수.
- **페이지 단위 순차 렌더링**: 1페이지 렌더링 및 텍스트 추출 완료 후 즉시 Canvas 메모리를 해제하고 다음 페이지를 처리한다.

---

## 11. 브라우저 온디바이스 OCR 구조

- 특정 라이브러리에 종속되지 않도록 `OcrEngine` 표준 인터페이스를 정의:
  ```typescript
  export interface OcrEngine {
    name: string;
    init(): Promise<void>;
    recognize(image: ImageData | Blob): Promise<RecognizedTextBlock[]>;
    terminate(): Promise<void>;
  }
  ```
- 후보 기술군:
  1. `Tesseract.js` (WebAssembly 기반 표준)
  2. 경량화 WASM OCR / ONNX Runtime Web
- 실제 단어책 표본을 사용한 실기기 벤치마크 후 최종 확정.
- OCR 언어 모델 파일은 브라우저 Cache API를 통해 1회 다운로드 후 오프라인 재사용 보장.

---

## 12. 단어 ↔ 뜻 자동 연결 알고리즘 [P0 핵심]

1. **동일 행(Row) 가로축 우선 결합**: Y축 중심선 오차 15% 이내인 우측 한국어 블록 1차 매핑
2. **2차원 근접 거리 판정**: 수직 배치 및 들여쓰기 양식에서 유클리드 가중 거리 기반 최근접 매핑
3. **다음 표제어 경계 기반 묶음**: 다음 영단어가 출현하기 전까지의 모든 한국어 라인을 하나의 다의어 배열로 병합
4. **품사 분리**: `v.`, `n.`, `adj.` 등 품사 표기를 파싱하여 뜻과 분리
5. **3단계 신뢰도 판정**: 높음(자동 승인), 보통(확인 권장), 낮음(오류 의심 경고)
6. **사용자 확인 화면**: 오류 의심 단어 인라인 수정, 불필요 행 제외, 확정 후 문제집 생성

---

## 13. 문제 생성 품질 규칙 [P0 핵심]

- **복수 정답 원천 차단 (Hard Gate)**: 정답 뜻과 오답 후보 간 동의어/유의어 매핑 검사를 거쳐 겹치는 보기를 강제 폐기 및 재선별.
- **정답 1개 보장**: 4개 보기 중 정답 인덱스가 반드시 1개 존재함을 단정문(Assert)으로 증명.
- **오답 보충 순서**: 현재 문제집 내 다른 단어 → 기본 TOEIC 번들 DB 동일 품사 어휘.

---

## 14. 로컬 데이터 저장 구조 (IndexedDB)

서버 DB 없이 브라우저 로컬 IndexedDB에 영구 저장한다 (Dexie ORM 계층 활용).

### 주요 Object Stores

1. **`words`**: 단어 마스터 (id, word, meaning, partOfSpeech, difficulty, topic, sourceBookId, confidence)
2. **`wordBooks`**: 문제집 엔티티 (id, title, sourceType, wordCount, createdAt, lastStudiedAt)
3. **`studyHistory`**: 문항 풀이 시계열 로그 (id, wordId, isCorrect, selectedAnswer, studiedAt)
4. **`wordStats`**: 단어별 누적 통계 캐시 (wordId, totalCount, correctCount, wrongCount, streak, learningStatus, lastStudiedAt)
5. **`appSettings`**: 사용자 환경설정 (difficulty, quizCount, theme)

---

## 15. Service Worker 및 오프라인 아키텍처

- **목적**: 앱 셸(HTML, CSS, JS, 아이콘) 프리캐싱 및 완전 오프라인 재실행 보장
- **캐시 전략**:
  - 앱 정적 에셋: CacheFirst (네트워크 미연결 시 캐시 서빙)
  - 기본 단어 번들 JSON: StaleWhileRevalidate
- **오프라인 보장 범위**: 설치 완료 기기에서 비행기 모드로 기본 퀴즈 및 저장된 문제집 100% 풀이 가능

---

## 16. Cloudflare Workers Builds 배포 파이프라인

```text
개발자 로컬
   │
   │ git push origin main
   ▼
GitHub 원격 저장소 (main)
   │
   │ Webhook 감지
   ▼
Cloudflare Workers Builds
   ├─ npm install
   ├─ npm run test (단위 테스트 통과 확인)
   └─ npm run build (Vite 번들링 -> dist/)
   ▼
Cloudflare Workers + Static Assets 글로벌 엣지 배포
   │
   ▼
사용자 접속 (https://<project>.workers.dev)
```

- 별도의 복잡한 GitHub Actions 배포 스크립트 없이 Cloudflare의 네이티브 Git 연동을 단일 파이프라인으로 채택.
- 비밀번호, API 토큰을 코드 저장소에 저장하지 않으며 표준 인증 방식 준수.

---

## 17. 개발 단계 로드맵 (PWA 기준)

- **0단계**: PWA 골격 및 정합화 (완료)
  - React + TypeScript + Vite + PWA Manifest + Service Worker + IndexedDB POC + PDF.js POC + File API POC
- **1단계**: 기본 어휘 4지선다 퀴즈 MVP (완료)
  - 번들 단어 로드, 4지선다 렌더링, 채점, 오답 저장, 오답 복습 세션
- **2단계**: 브라우저 OCR 엔진 비교 벤치마크 및 사진/퀴즈 품질 안정화 (P0-C 완료)
  - Tesseract.js 이중화, 2면 분할 및 대비 향상 전처리, 단어-뜻 좌표 연결
- **3단계**: 기본 어휘 DB 누적 구축 파이프라인
  - **DB-PILOT-200**: 기본 어휘 200개 파이프라인 및 중립 명칭 정합화 (완료)
  - **DB-02**: 누적 500개 확대, 정답 유일성 15,000회 스트레스 테스트 (완료)
  - **DB-03 (현재 기준선)**: 누적 1,800개 통합 확장 (기준선 500개 100% 동결 + 신규 1,300개 증설, 의미 충돌 그래프 개편, 54,000회 스트레스 테스트 결함 0건, 완료)
  - **향후 계획 (2,000+)**: 사용자 명시 승인 시에만 후보 풀(700개) 기반 추가 선별 작업 진행 (임의 확장 금지)
- **4단계**: PDF.js 고도화
  - 대용량 PDF 순차 렌더링 및 모바일 메모리 안정화
- **5단계**: 실기기 PWA 안정화 및 실서비스 운영
  - Android Chrome PWA 설치, iPhone Safari 홈 화면 실행, 오프라인 동작 검증 (Service Worker v4)
