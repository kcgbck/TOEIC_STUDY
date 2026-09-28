> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (QA-01 1,800어 최종 품질검수 및 검토 패키지 완성)

## 아키텍처
PWA (Progressive Web App, 설치형 웹앱)

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Workers 실서비스: https://voca-study.heyruler0011.workers.dev
- 캐시 버전: `voca-study-cache-v4`

## 현재 상태 판정 (QA-01 검토 패키지 완성)
- `NAME-01 = PASS`
- `PDF_IMPORT_BASELINE = PASS` (100/100 무손실)
- `PHOTO_OCR_EXTRACTION = PASS`
- `QUIZ_SEMANTIC_UNIQUENESS = PASS`
- `BASELINE_500_FREEZE = PASS` (removed=0, modified=0)
- `DB_03_1800_TECH_PASS = PASS` (1,800개 구축, 54,000회 스트레스 테스트 결함 0)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = QA_01_REVIEW_PACKAGE_READY`

## 완료된 핵심 QA-01 작업
1. **통합 검토 큐 구축 및 중복 제거 (`docs/WORD_DB_1800_REVIEW_QUEUE.md`)**:
   - 실질 우선순위 검토 대상 고유 어휘 1,007개 (B등급 168, 구동사 128, 표현 100, 복합다의어 391, 의미충돌 131, 층화표본 89)
2. **자동 의미 심층 감사 보고서 (`reports/worddb-1800-semantic-audit.md`)**:
   - 품사-뜻 불일치 의심 81건, 한국어 띄어쓰기/맞춤법 의심 12건
   - 공식 근거 406개 전수 유효 (4대 필수 필드 누락 0, 도메인 100% 적합)
3. **순수 문제 생성 벤치마크 분리 측정**:
   - 1문제 Warm 3.19ms / 100문제 Warm 2.57ms/문제 / 1,000문제 Warm 3.32ms/문제
4. **인터랙티브 검토 뷰어 (`docs/WORD_DB_1800_REVIEW.html`) 및 비교 도구 (`scripts/worddb/compareReview.ts`)**
5. **로드맵 및 2,000+ 확장 동결**: 1,800개 DB 동결 유지, 사람 승인 전 2,000+ 확장 절대 보류
