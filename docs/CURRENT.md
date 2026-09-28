> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (DB-03 1,800 누적 통합 확장 기준선 고정)

## 아키텍처
PWA (Progressive Web App, 설치형 웹앱)

## 프론트엔드
React 18 + TypeScript 5 + Vite 6

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Workers 실서비스: https://voca-study.heyruler0011.workers.dev
- 배포 모델: Cloudflare Workers + Static Assets
- 캐시 버전: `voca-study-cache-v4`

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

## 현재 상태 판정 (DB-03 검증 완료)
- `NAME-01 = PASS` (공개 서비스명 '보카 스터디' / URL 'voca-study.heyruler0011.workers.dev' 전환 완료)
- `PDF_IMPORT_BASELINE = PASS` (docs/샘플.pdf 100/100 무손실 유지)
- `PHOTO_OCR_EXTRACTION = PASS` (기하학적 열 격리, 경계 침범 차단, 3단계 신뢰도, 8종 합성 fixture 통과)
- `QUIZ_SEMANTIC_UNIQUENESS = PASS` (Hard Gate 통과, BLOCK 동의어 및 추가 뜻 오답 0건)
- `BASELINE_500_FREEZE = PASS` (기존 500개 검증 어휘 100% 동결 보존, modified=0, removed=0)
- `DB_03_1800_PASS = PASS` (누적 1,800개 검증 어휘 탑재, C등급 출시 0건, 15개 주제군 및 5대 품사 균형 배분, 54,000회 스트레스 테스트 결함 0건)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (사람 검토용 180문제 세트 및 신규 1,300단어 검토표 생성 완료, 인간 검토자 확인 대기)
- `CURRENT_STAGE = DB_03_1800_PASS`

## 완료된 핵심 DB-03 작업
1. **기존 500개 단어 동결 및 Diff 감사**:
   - `data/worddb/baseline_500.json` 기준선 100% 보존 (removed=0, modified=0)
   - `tests/wordDbDiff.test.ts` 통과
2. **신규 1,300개 어휘 보강 (누적 1,800개)**:
   - 명사 420개 (누적 581개)
   - 동사 430개: 단일 동사 290개 + 구동사 140개 (누적 581개)
   - 형용사 260개 (누적 384개)
   - 부사 90개 (누적 154개)
   - 비즈니스 표현 100개
   - 신규 후보 풀 2,500개 구축 (채택 1,800개, C등급 700개 분리 보관, C등급 릴리스 포함 0건)
3. **의미 충돌 차단 그래프 개편 (`semantic_conflicts_v1.json`)**:
   - `strict_synonym` (완전 동의어) 및 `quiz_conflict` (상호 출제 충돌) 관계 분리
   - 그래프 대칭성 100% 및 중복 엣지 0건 보장 (`tests/semanticConflictGraph.test.ts` 통과)
4. **공식 근거 정직한 분리 (`officialEvidenceStatus`)**:
   - ETS 공식 자료 추적 가능 어휘: `verified` 406개
   - 일반 비즈니스 어휘: `unknown` 1,394개
   - 허위 근거 생성 0건 강제 (`tests/evidenceTraceability.test.ts` 통과)
5. **54,000회 스트레스 테스트 결함 0건 통과**:
   - 1,800단어 × 3개 난이도 × 10개 Seed = 54,000회 시험 (정답 누락 0, 보기 중복 0, BLOCK 충돌 0, 추가 뜻 누출 0, 실패 0)
   - 정답 인덱스 균등 분포 달성
6. **인간 검토 문서 2종 생성**:
   - `docs/WORD_DB_1800_QUIZ_REVIEW.md` (하 60, 중 60, 상 60 = 총 180문제)
   - `docs/WORD_DB_1800_WORD_REVIEW.md` (신규 1,300단어 전수 테이블 + B등급 168단어 집중 검토군)

## 검증 내역
- `npm run typecheck`: 통과 (오류 0건)
- `npm run test`: 14개 테스트 파일, 62개 테스트 전체 통과
- `scripts/worddb/audit.ts`: 1,800단어 54,000회 스트레스 테스트 결함 0건 통과
- `npm run build`: 프로덕션 정적 번들 정상 빌드 완료
- `USER_DOCUMENT_UPLOADS`: 0건 (완전 브라우저 로컬 온디바이스 처리)

## 다음 단계
- 1,800개 기본 어휘 공식 릴리스 기준선 동결 유지
- 2,000+ 확장은 사용자 명시 승인 시에만 별도 계획 수립하여 진행 (임의 확장 금지)
