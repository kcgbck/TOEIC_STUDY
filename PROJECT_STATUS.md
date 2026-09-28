> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# PROJECT_STATUS.md

## Current Stage
- `CURRENT_STAGE = QA_01_REVIEW_PACKAGE_READY`
- 자동 기술 검증: **PASS**
- 사람 검토 상태: **HUMAN_REVIEW_PENDING** (실제 사람 승인 전까지 PASS 절대 금지)
- 1,800 Release Ready: **NO** (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- 2,000+ 확장: **보류** (현재 1,800개 동결, 사용자 명시 지시 필요)
- 잔여 기술 P0: **없음**
- 이전 완료: `NAME-01 = PASS`, `P0-C = PASS`, `DB-PILOT-200 = PASS`, `DB-02 = PASS`, `DB-03 = TECH_PASS`

## 배포 상태 (Live Deployment)
- **GitHub 원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)
- **Cloudflare Workers 실서비스 URL**: [https://voca-study.heyruler0011.workers.dev](https://voca-study.heyruler0011.workers.dev)
- **캐시 버전**: `voca-study-cache-v4`

## QA-01 1,800어 최종 품질검수 및 검토 패키지 완성 항목
1. **통합 검토 큐 구축 및 중복 제거 (`docs/WORD_DB_1800_REVIEW_QUEUE.md`)**:
   - B등급 168개, 구동사 140개, 표현 100개, 복합 다의어 448개, 의미충돌 관계 350개, A등급 고정 시드(`QA1800-202609`) 층화 표본 180개 통합
   - 중복 제거 후 **실질 우선순위 검토 대상 고유 어휘 1,007개** 산출 (일반 A등급 보존 어휘 793개와 분리)
2. **자동 의미 심층 감사 보고서 (`reports/worddb-1800-semantic-audit.md`)**:
   - 품사-뜻 불일치 의심 81건, 한국어 띄어쓰기/맞춤법 의심 12건 목록화
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

## DB-03 누적 1,800개 기본 어휘 DB 통합 확장 완료 항목
- 기존 500개 기준선 100% 동결 보존 (modified=0, removed=0)
- 신규 1,300개 어휘 증설 (누적 1,800개: 명사 581, 동사 581, 형용사 384, 부사 154, 표현 100)
- C등급 출시 0건 (A등급 1,632개 / B등급 168개)
- 의미 충돌 차단 그래프 개편 (`semantic_conflicts_v1.json`, 398개 노드, 대칭성 100%)
- 공식 근거 정직한 분리 (verified 406개, unknown 1,394개)
- 54,000회 문제 생성 스트레스 테스트 결함 0건 통과
