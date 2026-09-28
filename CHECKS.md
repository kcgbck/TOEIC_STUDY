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
- [x] npm run test 통과 (Vitest 17개 스위트, 74개 테스트 통과)
- [x] npm run build 통과 (정적 번들 빌드 성공)
- [x] Cloudflare Workers 배포 및 실서비스 Live URL 응답 검증 (HTTP 200)
- [x] PDF.js 기반 텍스트 레이어 어휘 추출 파이프라인 (표본 docs/샘플.pdf 기준 100/100 추출 검증)
- [x] 사진 2면 분할 및 2배 확대 전처리 + 온디바이스 Tesseract OCR (표본 docs/샘플.png 기준 목표 표제어 검출 검증)
- [x] 추출된 단어로 사용자 문제집 저장 및 4지선다 퀴즈 연동
- [x] StorageHealth 상태 진단 및 JSON 데이터 백업/복원 기능 구현

## Current Baseline & Gate Status (QA-02 정규화 완료)
- `NAME-01 = PASS` (공개 서비스명: 보카 스터디 / Voca Study)
- `PDF_IMPORT_BASELINE = PASS`
- `PHOTO_OCR_EXTRACTION = PASS`
- `QUIZ_SEMANTIC_UNIQUENESS = PASS`
- `BASELINE_500_FREEZE = PASS`
- `DB_03_1800_TECH_PASS = PASS`
- `QA_02_SEMANTIC_NORMALIZATION = PASS`
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = QA_02_SEMANTIC_NORMALIZATION_PASS`

## QA-02 Done Means (의미 데이터 정규화 및 최종 압축 검토 패키지)
- [x] subMeanings 전수 감사 및 유의어 분리 (databaseVersion: 4)
- [x] 대표 뜻 중복(DUPLICATE_OF_MAIN) 29건 삭제
- [x] 품사 오류(WRONG_POS) 0건 배제 확인
- [x] 단순 유의어 2,188건 semantic_conflicts로 안전 이전
- [x] 실제 다의어(VALID_SENSE) 20개 단어 (25개 고유 의미) 선별 보존
- [x] 한국어 표준 맞춤법 및 띄어쓰기 8건 정규화 (`docs/WORD_DB_ERRATA.md` 기록)
- [x] 공식 근거 406개 본문 대조 (`CONTENT_VERIFIED` 100% 확정)
- [x] 최종 사람 검토 큐 80.3% 압축 (1,007개 → 198개, `docs/WORD_DB_1800_REVIEW_QUEUE.md`)
- [x] 대화형 검토 웹 뷰어 고도화 (`docs/WORD_DB_1800_REVIEW.html`)
- [x] 신규 테스트 3종 통과 (`subMeaningNormalization`, `evidenceContentMatch`, `reviewQueueReduction`)

## Verify Commands
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run worddb:audit` (54,000회 스트레스 테스트)
- `npm run worddb:benchmark` (순수 문제 생성 벤치마크)
- `npm run worddb:normalize` (의미 데이터 정규화 및 소스 동기화)
- `npm run worddb:audit:qa02` (QA-02 최종 감사 및 압축 검토 큐 갱신)
- `npm run worddb:review:compare` (인간 검토 결과 비교)
