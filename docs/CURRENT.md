> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (DB-02 기준선 고정)

## 아키텍처
PWA (Progressive Web App, 설치형 웹앱)

## 프론트엔드
React 18 + TypeScript 5 + Vite 6

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Workers 실서비스: https://voca-study.heyruler0011.workers.dev
- 배포 모델: Cloudflare Workers + Static Assets

## 저장소 및 안전성
- IndexedDB (Dexie 계층, 100% 브라우저 로컬 저장)
- StorageHealth (영속성 확인 및 요청, 사용량 견적)
- JSON 백업/복원 (voca_study_backup_YYYYMMDD.json, 스키마 v1 검증)

## Safari 저장 정책 명시
- 일반 Safari 사이트는 ITP의 저장소 정책 영향을 받을 수 있으나, iPhone 홈 화면에 standalone 웹앱으로 설치된 1차 도메인은 WebKit의 ITP 7일 스크립트 저장소 삭제 정책에서 명시적인 예외로 취급됨.
- 단, 기기 저장공간 압박이나 사용자 데이터 삭제에 대비하여 JSON 백업/복원 수단을 기본 제공함.

## 문서 및 OCR 처리
- PDF: PDF.js 브라우저 메모리 파서 (docs/샘플.pdf 표본 기준 100/100 단어 추출 확인)
- 사진 OCR: 2면 펼침면 감지(detectSpreadLayout) 및 2단 분할 + 2배 확대 전처리 + 온디바이스 Tesseract.js WASM 어댑터 (docs/샘플.png 표본 기준 목표 표제어 검출 확인)
- 개인정보 보호: 사진, PDF, 학습 기록 등 사용자 문서의 서버 전송 0건 (USER_DOCUMENT_UPLOADS = 0)

## 현재 상태 판정 (DB-02 검증 완료)
- `NAME-01 = PASS` (공개 서비스명 '보카 스터디' / URL 'voca-study.heyruler0011.workers.dev' 전환 완료)
- `PDF_IMPORT_BASELINE = PASS` (docs/샘플.pdf 100/100 무손실 유지)
- `PHOTO_OCR_EXTRACTION = PASS` (기하학적 열 격리, 경계 침범 차단, 3단계 신뢰도, 8종 합성 fixture 통과)
- `QUIZ_SEMANTIC_UNIQUENESS = PASS` (Hard Gate 통과, BLOCK 동의어 및 추가 뜻 오답 0건)
- `BUILTIN_VOCABULARY_PILOT = PASS` (기존 200개 검증 어휘 100% 동결 보존)
- `DB_02_500_PASS = PASS` (누적 500개 검증 어휘 탑재, C등급 출시 0건, 15개 주제군 및 4대 품사 균형 배분, 15,000회 스트레스 테스트 결함 0건)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (사람 검토용 120문제 세트 및 신규 300단어 검토표 생성 완료, 인간 검토자 확인 대기)
- `CURRENT_STAGE = DB_02_500_PASS`

## 완료된 핵심 DB-02 작업
1. **기존 200개 단어 동결 및 Diff 감사**:
   - `src/data/builtin_words_pilot_v1.json` 기준선 100% 보존 (removed=0, modified=0)
   - `docs/WORD_DB_ERRATA.md` 정오표 체계 가동 (무단 수정 0건)
2. **신규 300개 어휘 보강 및 품사/주제 균형**:
   - 품사 보강: 동사 95, 형용사 85, 부사 40, 명사 80 (누적: 명사 161, 동사 151, 형용사 124, 부사 64)
   - 15개 필수 주제군 골고루 배정
   - 신규 후보 풀 415개 구축 (채택 300개, C등급/보류 115개 분리)
3. **동의어 차단 사전 확장 (`synonym_blocks_v1.json`)**:
   - 신규 어휘 동의어 및 다의어 양방향 차단 쌍 256개 키로 확장
   - `getSynonyms` 메모이제이션 적용으로 15,000회 문제 생성 속도 30배 이상 최적화 (총 20초)
4. **15,000회 스트레스 테스트 결함 0건 통과**:
   - 500단어 × 3개 난이도 × 10개 Seed = 15,000회 시험 (정답 누락 0, 보기 중복 0, BLOCK 동의어 0, 추가 뜻 누출 0, 실패 0)
5. **인간 검토 문서 2종 생성**:
   - `docs/WORD_DB_500_REVIEW.md` (하 40, 중 40, 상 40 = 총 120문제)
   - `docs/WORD_DB_500_WORD_REVIEW.md` (신규 300단어 전수 테이블 + B등급 35단어 집중 검토군)

## 검증 내역
- `npm run typecheck`: 통과 (오류 0건)
- `npm run test`: 11개 테스트 스위트, 46개 테스트 전체 통과
- `npm run worddb:audit`: 500단어 15,000회 스트레스 테스트 결함 0건 통과
- `npm run build`: 프로덕션 정적 번들 정상 빌드 완료
- `USER_DOCUMENT_UPLOADS`: 0건 (완전 브라우저 로컬 온디바이스 처리)

## 다음 단계
- `DB-03` — 누적 1,000개 기본 어휘 DB 확대
