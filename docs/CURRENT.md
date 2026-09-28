> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (QA-01 1,800어 최종 품질검수 및 검토 패키지 완성)

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

## 현재 상태 판정 (QA-01 검토 패키지 완성)
- `NAME-01 = PASS` (공개 서비스명 '보카 스터디' / URL 'voca-study.heyruler0011.workers.dev' 전환 완료)
- `PDF_IMPORT_BASELINE = PASS` (docs/샘플.pdf 100/100 무손실 유지)
- `PHOTO_OCR_EXTRACTION = PASS` (기하학적 열 격리, 경계 침범 차단, 3단계 신뢰도, 8종 합성 fixture 통과)
- `QUIZ_SEMANTIC_UNIQUENESS = PASS` (Hard Gate 통과, BLOCK 동의어 및 추가 뜻 오답 0건)
- `BASELINE_500_FREEZE = PASS` (기존 500개 검증 어휘 100% 동결 보존, modified=0, removed=0)
- `DB_03_1800_TECH_PASS = PASS` (누적 1,800개 검증 어휘 탑재, C등급 출시 0건, 54,000회 스트레스 테스트 결함 0건)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = QA_01_REVIEW_PACKAGE_READY`

## 완료된 핵심 QA-01 작업
1. **통합 검토 큐 구축 및 중복 제거 (`docs/WORD_DB_1800_REVIEW_QUEUE.md`)**:
   - B등급 168개, 구동사 140개, 표현 100개, 복합 다의어 448개, 의미충돌 관계 350개, A등급 고정 시드(`QA1800-202609`) 층화 표본 180개 통합
   - 중복 제거 후 **실질 우선순위 검토 대상 고유 어휘 1,007개** 산출 (일반 A등급 보존 어휘 793개와 엄격 분리)
2. **자동 의미 심층 감사 보고서 (`reports/worddb-1800-semantic-audit.md`)**:
   - 품사-뜻 불일치 의심 81건, 한국어 띄어쓰기/맞춤법 의심 12건 목록화 및 인간 검토 가이드 마련
   - 대표 뜻 중복군 120개 군 퀴즈 충돌 안전성 재확인 (54,000회 결함 0건)
   - 공식 근거 406개 4대 필수 필드(URL, 제목, 일시, locator) 및 ETS 공식 도메인 무결성 100% 확인
3. **순수 문제 생성 벤치마크 분리 측정**:
   - 1문제 Cold 296ms, Warm 3.19ms / 100문제 Warm 2.57ms/문제 / 1,000문제 Warm 3.32ms/문제
   - 감사 전체 시간과 엔진 순수 문제 생성 시간 엄격 분리 기록
4. **인터랙티브 검토 뷰어 (`docs/WORD_DB_1800_REVIEW.html`) 및 비교 도구 (`scripts/worddb/compareReview.ts`)**:
   - 브라우저 단일 HTML로 단어/품사/난이도/그룹/검토상태 필터링 및 JSON Export 지원
   - 향후 인간 검토 결과(정상/수정필요/제외) 비교 CLI 도구 구축
5. **로드맵 및 2,000+ 확장 동결**:
   - 1,800개 DB 동결 유지, 사람 승인 전 2,000+ 확장 절대 보류 (사용자 명시 지시 필요)
