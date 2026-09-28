> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# PROJECT_STATUS.md

## Current Stage
- `CURRENT_STAGE = QA_02_SEMANTIC_NORMALIZATION_PASS`
- 자동 기술 검증: **PASS**
- 사람 검토 상태: **HUMAN_REVIEW_PENDING** (실제 사람 승인 전까지 PASS 절대 금지)
- 1,800 Release Ready: **NO** (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- 2,000+ 확장: **보류** (현재 1,800개 동결, 사용자 명시 지시 필요)
- databaseVersion: **4** (`schemaVersion: 1`)
- 잔여 기술 P0: **없음**
- 이전 완료: `NAME-01 = PASS`, `P0-C = PASS`, `DB-PILOT-200 = PASS`, `DB-02 = PASS`, `DB-03 = TECH_PASS`, `QA-01 = PASS`

## 배포 상태 (Live Deployment)
- **GitHub 원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)
- **Cloudflare Workers 실서비스 URL**: [https://voca-study.heyruler0011.workers.dev](https://voca-study.heyruler0011.workers.dev)
- **캐시 버전**: `voca-study-cache-v4`

## QA-02 의미 데이터 정규화 및 최종 압축 검토 패키지 완성 항목
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
6. **신규 단위 테스트 3종 추가 (전원 통과)**:
   - `subMeaningNormalization.test.ts`, `evidenceContentMatch.test.ts`, `reviewQueueReduction.test.ts`
