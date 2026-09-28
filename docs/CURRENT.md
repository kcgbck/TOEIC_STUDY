> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (QA-02 의미 데이터 정규화 및 최종 압축 검토 패키지)

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

## 현재 상태 판정 (QA-02 정규화 완료)
- `NAME-01 = PASS` (공개 서비스명 '보카 스터디' / URL 'voca-study.heyruler0011.workers.dev' 전환 완료)
- `PDF_IMPORT_BASELINE = PASS` (docs/샘플.pdf 100/100 무손실 유지)
- `PHOTO_OCR_EXTRACTION = PASS` (기하학적 열 격리, 경계 침범 차단, 3단계 신뢰도, 8종 합성 fixture 통과)
- `QUIZ_SEMANTIC_UNIQUENESS = PASS` (Hard Gate 통과, BLOCK 동의어 및 추가 뜻 오답 0건)
- `BASELINE_500_FREEZE = PASS` (기존 500개 검증 어휘 100% 동결 보존, modified=0, removed=0)
- `DB_03_1800_TECH_PASS = PASS` (누적 1,800개 검증 어휘 탑재, C등급 출시 0건, 54,000회 스트레스 테스트 결함 0건)
- `QA_02_SEMANTIC_NORMALIZATION = PASS` (subMeanings 유의어 2,188건 분리 및 semantic_conflicts 이전, 중복 29건 삭제, 띄어쓰기 8건 정규화, databaseVersion=4)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = QA_02_SEMANTIC_NORMALIZATION_PASS`

## 완료된 핵심 QA-02 작업
1. **subMeanings 전수 감사 및 유의어 분리 (databaseVersion: 4)**:
   - 감사 전 subMeanings 보유 단어: 1,794개 → 감사 후 실제 다의어 보유 단어: **20개 (25개 고유 다의어)**
   - 단순 유의어 2,188건을 `semantic_conflicts_v1.json`으로 안전 분리 이전 (총 의미 노드 3,428개로 확대)
   - 대표 뜻 완전 중복(`DUPLICATE_OF_MAIN`) 29건 삭제, 품사 오류 0건
2. **한국어 맞춤법 및 띄어쓰기 정규화**:
   - `자격을 갖추다`, `손상되지 않은`, `수송 중에`, `흠잡을 데 없이`, `예의 바른`, `나누어 주다`, `삽화를 넣다`, `눈감아 주다`, `필요로 하다` 등 정규화 완료
   - 정오표(`docs/WORD_DB_ERRATA.md`)에 전수 기록
3. **공식 근거 본문 대조 (Evidence Content Match)**:
   - verified 406개 전수 `CONTENT_VERIFIED` 확정 (locator 및 공식 도메인 1:1 일치 검증)
4. **최종 사람 검토 큐 80.3% 획기적 압축 (`docs/WORD_DB_1800_REVIEW_QUEUE.md`)**:
   - QA-01 1,007개 → QA-02 **198개** (사람이 판단할 필요 없는 단순 유의어 보유 단어 자동 정제)
   - B등급 168개, 실제 다의어 20개, 띄어쓰기 확인 12개, 직역 위험 구동사/표현 14개로 구성
5. **대화형 검토 웹 뷰어 고도화 (`docs/WORD_DB_1800_REVIEW.html`)**:
   - 전체/B등급/다의어/띄어쓰기/구동사 필터 지원
   - 정상/수정필요/제외/보류 선택 및 메모 입력, LocalStorage 저장 및 JSON 파일 내보내기/불러오기 지원
6. **신규 단위 테스트 3종 추가**:
   - `subMeaningNormalization.test.ts`, `evidenceContentMatch.test.ts`, `reviewQueueReduction.test.ts` (전원 PASS)
