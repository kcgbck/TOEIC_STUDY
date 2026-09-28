> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# PROJECT_STATUS.md

## Current Stage
- `CURRENT_STAGE = DB_03_1800_PASS`
- 잔여 기술 P0: **없음**
- 사람 검토 상태: `HUMAN_REVIEW_PENDING` (`docs/WORD_DB_1800_QUIZ_REVIEW.md` 180문제, `docs/WORD_DB_1800_WORD_REVIEW.md` 1,300단어 표 생성 완료, 인간 검토자 확인 대기)
- 이전 완료: `NAME-01 = PASS`, `P0-C = PASS`, `DB-PILOT-200 = PASS`, `DB-02 = PASS`

## 배포 상태 (Live Deployment)
- **GitHub 원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)
- **Cloudflare Workers 실서비스 URL**: [https://voca-study.heyruler0011.workers.dev](https://voca-study.heyruler0011.workers.dev)
- **캐시 버전**: `voca-study-cache-v4`

## DB-03 누적 1,800개 기본 어휘 DB 통합 확장 완료 항목
1. **기존 500개 기준선 동결 보존 (BASELINE_500)**:
   - `data/worddb/baseline_500.json` 기준선 대비 `added=1300, modified=0, removed=0` 100% 무손실 유지
   - `tests/wordDbDiff.test.ts` 통과
2. **신규 1,300개 어휘 증설 및 균형 배분 (누적 1,800개)**:
   - 명사: 420개 추가 (누적 581개)
   - 동사: 430개 추가 (단일 동사 290개 + 구동사 140개, 누적 581개)
   - 형용사: 260개 추가 (누적 384개)
   - 부사: 90개 추가 (누적 154개)
   - 비즈니스 표현: 100개 추가 (누적 100개)
   - C등급 출시 0건 (A등급 1,632개 / B등급 168개, C등급 700개는 후보 풀에만 분리 보관)
   - 15개 필수 비즈니스/수험 주제군 골고루 배정
3. **의미 충돌 차단 그래프 개편 (`semantic_conflicts_v1.json`)**:
   - 단순 동의어를 넘어 `strict_synonym`과 `quiz_conflict`로 세분화
   - 총 398개 키 그래프 구축, 대칭성 100% 보증 (`tests/semanticConflictGraph.test.ts` 통과)
4. **공식 근거 추적성 확립 (`officialEvidenceStatus`)**:
   - ETS 공식 자료 추적 어휘 `verified` 406개 지정 (구체적 URL, 자료명, 확인일자 첨부)
   - 일반 비즈니스 어휘 `unknown` 1,394개 정직한 분리 (허위 근거 생성 0건 강제)
   - `tests/evidenceTraceability.test.ts` 통과
5. **전수 54,000회 문제 생성 스트레스 테스트 결함 0건 통과**:
   - 1,800단어 × 3난이도 × 10seed = 54,000회 반복 시험 결함 0건
   - 정답 누락 0, 보기 중복 0, BLOCK 충돌 0, 추가 뜻 누출 0, 생성 실패 0
   - 정답 인덱스 편향 없이 균등 분포 유지 (15% ~ 35%)
6. **마일스톤 스냅샷 및 후보 풀 체계**:
   - 중간 감사 스냅샷: `db_750.json`, `db_1000.json`, `db_1250.json`, `db_1500.json`
   - 통합 후보 풀: `candidate_pool.json` (총 2,500개 = 릴리스 1,800개 + C등급 후보 700개)
7. **사람 검토용 리뷰 문서 2종 생성**:
   - `docs/WORD_DB_1800_QUIZ_REVIEW.md` (하 60, 중 60, 상 60 = 총 180문제)
   - `docs/WORD_DB_1800_WORD_REVIEW.md` (신규 1,300단어 표 및 B등급 168단어 집중 검토군)
8. **Service Worker 캐시 버전 갱신**:
   - `voca-study-cache-v4`로 캐시 버스팅 및 1,800단어 정적 데이터 프리캐시 보장

## DB-02 누적 500개 기본 어휘 DB 확대 완료 항목
- 기존 200개 어휘 동결 보존 (PILOT_BASELINE_200)
- 신규 300개 어휘 탑재 및 15,000회 스트레스 테스트 통과

## DB-PILOT-200 기본 어휘 데이터베이스 구축 완료 항목
- 기본 어휘 정적 데이터 중립 명칭 전환 (`builtin_words_v1.json`)
- 200개 어휘 6,000회 스트레스 테스트 통과

## PWA-02 실서비스 기준선 고정 완료 항목
- PDF 파서 실측 검증 (docs/샘플.pdf 표본 100/100 단어)
- 사진 OCR 전처리 실측 및 detectSpreadLayout 안전장치 분리
- 개인정보 보호: 사용자 문서 서버 전송 0건 (USER_DOCUMENT_UPLOADS = 0)

## 검증 내역
- `npm run typecheck`: 통과 (오류 0건)
- `npm run test`: 14개 테스트 파일, 62개 테스트 통과
- `scripts/worddb/audit.ts`: 1,800단어 54,000회 스트레스 테스트 결함 0건 통과
- `npm run build`: 프로덕션 정적 번들 정상 빌드 완료
- `USER_DOCUMENT_UPLOADS`: 0건 (완전 로컬 브라우저 처리)

## 잔여 과제 및 향후 계획
- 잔여 기술 P0: **없음**
- 사람 검토 상태: `HUMAN_REVIEW_PENDING`
- 2,000+ 확장은 사용자 명시 승인 시에만 별도 계획 수립하여 진행 (임의 확장 금지)
