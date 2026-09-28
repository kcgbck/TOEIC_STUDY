> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# CHECKS.md

## Project Goal
- PWA(Progressive Web App) 기반 TOEIC 단어 학습 및 4지선다 자동 출제 웹앱
- 100% 브라우저 메모리 및 IndexedDB 로컬 처리 (개인정보 보호, 로컬 우선)
- Cloudflare Workers + Static Assets 배포

## Never Do
- 유료 종량제 API(OpenAI/Anthropic/Google 등) 호출 금지
- 사용자 사진, PDF, 학습 기록의 외부 서버 전송 또는 서버 DB(D1/Firebase 등) 저장 금지
- 상용 교재 원본의 공개 자산 배포 및 2,000단어 단순 무단 복제 금지
- 사용자 명시 승인 없는 git commit / push 금지

## Done Means
- [x] npm run typecheck 통과 (타입 에러 0건)
- [x] npm run test 통과 (Vitest 14개 스위트, 62개 테스트 통과)
- [x] npm run build 통과 (정적 번들 빌드 성공)
- [x] Cloudflare Workers 배포 및 실서비스 Live URL 응답 검증 (HTTP 200)
- [x] PDF.js 기반 텍스트 레이어 어휘 추출 파이프라인 (표본 docs/샘플.pdf 기준 100/100 추출 검증)
- [x] 사진 2면 분할 및 2배 확대 전처리 + 온디바이스 Tesseract OCR (표본 docs/샘플.png 기준 목표 표제어 검출 검증)
- [x] 추출된 단어로 사용자 문제집 저장 및 4지선다 퀴즈 연동
- [x] StorageHealth 상태 진단 및 JSON 데이터 백업/복원 기능 구현

## Current Baseline & Gate Status (DB-03 검증 완료)
- `NAME-01 = PASS` (공개 서비스명: 보카 스터디 / Voca Study)
- `PDF_IMPORT_BASELINE = PASS`
- `PHOTO_OCR_EXTRACTION = PASS`
- `QUIZ_SEMANTIC_UNIQUENESS = PASS`
- `BASELINE_500_FREEZE = PASS`
- `DB_03_1800_PASS = PASS`
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (사람 검토용 180문제 세트 및 신규 1,300단어 검토표 생성 완료, 인간 검토자 확인 대기)
- `CURRENT_STAGE = DB_03_1800_PASS`

## DB-03 Done Means (누적 1,800개 어휘 DB 검증 완료)
- [x] 출제 가능 어휘: 정확히 1,800개 (`quizEligible=true`, `status='quiz_ready'`)
- [x] C등급 단어 출시 포함 0건 (A/B등급 100%: A=1,632개, B=168개, C등급 700개는 후보 풀에만 분리)
- [x] 기존 500개 기준선 동결 보존 (Diff 감사: added=1300, modified=0, removed=0 100% 무손실 유지)
- [x] 빈 표제어, 빈 뜻, 품사 누락, 주제 누락 0건
- [x] 중복 ID 0건, 중복 (lemma:POS) 0건
- [x] 15개 필수 주제군 및 5대 품사(명사 581, 동사 581, 형용사 384, 부사 154, 표현 100) 균형 배분
- [x] 공식 근거 추적성: verified 406개, unknown 1,394개 정직한 분리 (`tests/evidenceTraceability.test.ts` 통과)
- [x] 의미 충돌 차단 그래프 개편 (`src/data/semantic_conflicts_v1.json`, 398개 키 대칭성 100% 보장)
- [x] 54,000회 스트레스 테스트 통과: 1,800단어 x 3난이도 x 10seed = 54,000회 문제 생성 결함 0건
- [x] 정답 누락 0, 보기 중복 0, BLOCK 충돌 0, 추가 뜻 오답 0, 생성 실패 0
- [x] 사람 검토용 180문제 리뷰셋 생성 (`docs/WORD_DB_1800_QUIZ_REVIEW.md`)
- [x] 사람 검토용 신규 1,300단어 의미 검토표 생성 (`docs/WORD_DB_1800_WORD_REVIEW.md`, B등급 168단어 집중 검토군 포함)
- [x] Service Worker 캐시 버전 `voca-study-cache-v4` 갱신
- [x] 신규 테스트 스위트 추가 (`builtinWords1800.test.ts`, `semanticConflictGraph.test.ts`, `evidenceTraceability.test.ts`)
- [x] 기존 PDF 100/100 및 사진 무손실 회귀 0건 유지 (Vitest 14개 스위트, 62개 테스트 전체 PASS)

## DB-02 Done Means (누적 500개 어휘 DB 검증 완료)
- [x] 출제 가능 어휘: 정확히 500개 (`quizEligible=true`, `status='quiz_ready'`)
- [x] 기존 200개 단어 동결 보존 (Diff 감사: added=300, modified=0, removed=0)
- [x] 500단어 x 3난이도 x 10seed = 15,000회 문제 생성 결함 0건

## DB-PILOT-200 Done Means (검증 완료)
- [x] 출제 가능 어휘: 200개 이상 (`quizEligible=true`, `status='quiz_ready'`)
- [x] 기본 정적 데이터 경로 전환: `/data/builtin_words_v1.json`
- [x] 200단어 x 3난이도 x 10seed = 6,000회 생성 결함 0건

## P0 Done Means (P0-C 관문 완료)
- [x] 사진 OCR: 다른 열 뜻 연결 금지 (좌우 독립)
- [x] 사진 OCR: 다음 단어 뜻 침범 금지 (경계 보장)
- [x] 퀴즈 출제: validateQuestionUniqueness() Hard Gate 통과
- [x] PDF 회귀: docs/샘플.pdf 100/100 무손실 유지

## Verify Commands
```powershell
npm run typecheck
npm run test
npx tsx scripts/worddb/audit.ts
npm run build
```

## Known Risks & Policies
- **사진 인식률 편차**: 저해상도 모바일 사진 촬영본의 경우 온디바이스 Tesseract 인식률 편차가 발생할 수 있으므로, 2단 분할 및 2배 확대 전처리를 적용함.
- **Safari 저장소 정책**: 일반 Safari 사이트는 ITP의 저장소 정책 영향을 받을 수 있으나, iPhone 홈 화면에 standalone 웹앱으로 설치된 1차 도메인은 WebKit의 ITP 7일 스크립트 저장소 삭제 정책에서 명시적인 예외로 취급됨. 다만 저장공간 압박 또는 사용자 데이터 삭제에 대비하여 별도의 JSON 백업/복원 기능을 제공함.
- **기본 어휘 DB 확장 정책**: 누적 1,800개 공식 릴리스 기준선을 동결 유지하며, 2,000+ 확장은 사용자 명시 승인 시에만 진행함.
