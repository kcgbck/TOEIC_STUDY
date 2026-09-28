> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (QA-02 의미 데이터 정규화 및 최종 압축 검토 패키지)

## 아키텍처
PWA (Progressive Web App, 설치형 웹앱)

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Workers 실서비스: https://voca-study.heyruler0011.workers.dev
- 캐시 버전: `voca-study-cache-v4`

## 현재 상태 판정 (QA-02 정규화 완료)
- `NAME-01 = PASS`
- `PDF_IMPORT_BASELINE = PASS` (100/100 무손실)
- `PHOTO_OCR_EXTRACTION = PASS`
- `QUIZ_SEMANTIC_UNIQUENESS = PASS`
- `BASELINE_500_FREEZE = PASS` (removed=0, modified=0)
- `DB_03_1800_TECH_PASS = PASS` (1,800개 구축, 54,000회 스트레스 테스트 결함 0)
- `QA_02_SEMANTIC_NORMALIZATION = PASS` (subMeanings 유의어 2,188건 분리 및 semantic_conflicts 이전, 중복 29건 삭제, 띄어쓰기 8건 정규화, databaseVersion=4)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = QA_02_SEMANTIC_NORMALIZATION_PASS`

## 완료된 핵심 QA-02 작업
1. **subMeanings 전수 감사 및 유의어 분리 (databaseVersion: 4)**:
   - 감사 전 subMeanings 보유 단어: 1,794개 → 감사 후 실제 다의어 보유 단어: **20개 (25개 고유 다의어)**
   - 단순 유의어 2,188건을 `semantic_conflicts_v1.json`으로 안전 분리 이전 (총 의미 노드 3,428개로 확대)
   - 대표 뜻 완전 중복(`DUPLICATE_OF_MAIN`) 29건 삭제, 품사 오류 0건
2. **한국어 맞춤법 및 띄어쓰기 정규화**: 띄어쓰기 8건 정규화 완료 (`docs/WORD_DB_ERRATA.md` 기록)
3. **공식 근거 본문 대조 (Evidence Content Match)**: 406개 전수 `CONTENT_VERIFIED` 확정
4. **최종 사람 검토 큐 80.3% 획기적 압축 (`docs/WORD_DB_1800_REVIEW_QUEUE.md`)**:
   - QA-01 1,007개 → QA-02 **198개** (사람이 판단할 필요 없는 단순 유의어 보유 단어 자동 정제)
5. **대화형 검토 웹 뷰어 고도화 (`docs/WORD_DB_1800_REVIEW.html`)**
6. **신규 단위 테스트 3종 추가 (전원 PASS)**
