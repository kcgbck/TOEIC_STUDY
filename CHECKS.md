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
- 사람 검토 완료 전 임의로 HUMAN_REVIEW_PASS 또는 RELEASE_READY 표기 금지
- 2,000+ 확장 금지 (사용자 명시 지시 전까지 1,800개 DB 동결 유지)

## Done Means
- [x] npm run typecheck 통과 (타입 에러 0건)
- [x] npm run test 통과 (Vitest 14개 스위트, 62개 테스트 통과)
- [x] npm run build 통과 (정적 번들 빌드 성공)
- [x] Cloudflare Workers 배포 및 실서비스 Live URL 응답 검증 (HTTP 200)
- [x] PDF.js 기반 텍스트 레이어 어휘 추출 파이프라인 (표본 docs/샘플.pdf 기준 100/100 추출 검증)
- [x] 사진 2면 분할 및 2배 확대 전처리 + 온디바이스 Tesseract OCR (표본 docs/샘플.png 기준 목표 표제어 검출 검증)
- [x] 추출된 단어로 사용자 문제집 저장 및 4지선다 퀴즈 연동
- [x] StorageHealth 상태 진단 및 JSON 데이터 백업/복원 기능 구현

## Current Baseline & Gate Status (QA-01 검토 패키지 완성)
- `NAME-01 = PASS` (공개 서비스명: 보카 스터디 / Voca Study)
- `PDF_IMPORT_BASELINE = PASS`
- `PHOTO_OCR_EXTRACTION = PASS`
- `QUIZ_SEMANTIC_UNIQUENESS = PASS`
- `BASELINE_500_FREEZE = PASS`
- `DB_03_1800_TECH_PASS = PASS`
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = QA_01_REVIEW_PACKAGE_READY`

## QA-01 Done Means (1,800어 최종 품질검수 및 검토 패키지 완성)
- [x] 통합 검토 큐 구축 및 중복 제거 (`docs/WORD_DB_1800_REVIEW_QUEUE.md`): 실질 검토 대상 1,007개 도출
- [x] 자동 의미 심층 감사 보고서 (`reports/worddb-1800-semantic-audit.md`): 품사-뜻 불일치 의심 81건, 맞춤법/띄어쓰기 12건, 대표뜻 중복군 120개 군, 공식근거 406개 전수 무결성 확인
- [x] 검토 큐 JSON 데이터 구축 (`reports/worddb-1800-review-queue.json`)
- [x] 인터랙티브 검토 뷰어 생성 (`docs/WORD_DB_1800_REVIEW.html`): 필터링, 검색, 상태 선택, JSON Export 지원
- [x] 검토 결과 비교 및 리포팅 도구 (`scripts/worddb/compareReview.ts`)
- [x] 순수 퀴즈 벤치마크 분리 측정 (`scripts/worddb/benchmarkQuiz.ts`): Warm-up 100문제 기준 2.57ms/문제, 1000문제 기준 3.32ms/문제
- [x] 과장된 표현 정정 및 상태 동결: "완벽히 통과/완전 검증" 배제, "기술 PASS, 사람검토 PENDING, Release Ready NO"로 동기화

## DB-03 Done Means (누적 1,800개 어휘 DB 검증 완료)
- [x] 출제 가능 어휘: 정확히 1,800개 (`quizEligible=true`, `status='quiz_ready'`)
- [x] C등급 단어 출시 포함 0건 (A/B등급 100%: A=1,632개, B=168개, C등급 700개는 후보 풀에만 분리)
- [x] 기존 500개 기준선 동결 보존 (Diff 감사: added=1300, modified=0, removed=0 100% 무손실 유지)
- [x] 공식 근거 추적성: verified 406개, unknown 1,394개 정직한 분리 (`tests/evidenceTraceability.test.ts` 통과)
- [x] 의미 충돌 차단 그래프 개편 (`src/data/semantic_conflicts_v1.json`, 398개 키 대칭성 100% 보장)
- [x] 54,000회 스트레스 테스트 통과: 1,800단어 x 3난이도 x 10seed = 54,000회 문제 생성 결함 0건
- [x] 사람 검토용 180문제 리뷰셋 생성 (`docs/WORD_DB_1800_QUIZ_REVIEW.md`)
- [x] 사람 검토용 신규 1,300단어 의미 검토표 생성 (`docs/WORD_DB_1800_WORD_REVIEW.md`)

## Verify Commands
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run worddb:audit` (54,000회 스트레스 테스트)
- `npm run worddb:benchmark` (순수 문제 생성 벤치마크)
- `npm run worddb:audit:qa01` (QA-01 자동 심층 감사 및 검토 패키지 갱신)
- `npm run worddb:review:compare` (인간 검토 결과 비교)
