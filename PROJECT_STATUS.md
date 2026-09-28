> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# PROJECT_STATUS.md

## Current Stage
- `CURRENT_STAGE = DB_PILOT_200_PASS`
- 이전 완료: `NAME-01 = PASS`, `P0-C = PASS`

## 배포 상태 (Live Deployment)
- **GitHub 원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)
- **Cloudflare Workers 실서비스 URL**: [https://voca-study.heyruler0011.workers.dev](https://voca-study.heyruler0011.workers.dev)

## DB-PILOT-200 기본 어휘 데이터베이스 구축 완료 항목
1. **기본 어휘 정적 데이터 중립 명칭 전환**:
   - `public/data/toeic_words_v1.json` 제거 → `public/data/builtin_words_v1.json` (200단어)
   - `src/data/builtin_words_pilot_v1.json` (200단어) 동기화
   - Service Worker 캐시 버전 `voca-study-cache-v2` 갱신 및 프리캐시 목록 교체
2. **동의어 차단 사전 데이터화**:
   - `src/data/synonym_blocks_v1.json` 분리 및 `synonymDictionary.ts` 연동
3. **200개 어휘 DB 품질 및 6,000회 스트레스 테스트 통과**:
   - 후보 293개 중 엄격 검증된 출제 적격 200개 선정 (C등급 0건, A/B등급 100%)
   - 15개 필수 주제군 및 4대 품사(명사/동사/형용사/부사) 균형 배분
   - `npm run worddb:audit` 통과: 200단어 x 3난이도 x 10seed = 6,000회 문제 생성 결함 0건
   - 사람이 확인할 리뷰셋 생성: `docs/WORD_DB_PILOT_REVIEW.md` (하 30, 중 30, 상 30, 총 90선)
4. **기본 문제풀이 UI 확장**:
   - 난이도(하/중/상/전체) 및 문항 수(10/20/30/50/전체) 선택 컨트롤 탑재
   - builtin, photo, pdf 출처 명확 분리 유지

## PWA-02 실서비스 기준선 고정 완료 항목
1. **공개 에셋 안전화 및 저작권 분리**:
   - `public/data/sample.pdf`, `public/data/sample.png` 완전 제거
   - `docs/샘플.*` 로컬 원본 보존 및 `.gitignore` 등록
   - 프로덕션 UI에서 샘플 자동 로드 버튼 제거 (사용자 자체 파일 업로드만 허용)
   - 자동 테스트용 합성 데이터(`tests/fixtures/vocabulary_rows.json`, `tests/fixtures/ocr_blocks.json`) 분리

2. **PDF 파서 실측 검증 (docs/샘플.pdf 표본)**:
   - 총 4페이지, 정답 라벨 100개 기준
   - 추출 단어: 100개, TP: 100, FP: 0, FN: 0
   - 표본 정확도(Precision): 100.0%, 재현율(Recall): 100.0% (모든 PDF가 100%임을 의미하지는 않음)
   - 빈 뜻: 0건, 중복: 0건
   - 4지선다 출제 500문제 검사: 문자열 수준 유일성 검증 완료 (의미 수준 유일성은 별도 유의어 사전 검증 필요)

3. **사진 OCR 전처리 단계별 실측 (docs/샘플.png 표본, 목표 표제어 8개)**:
   - Step A (원본 통인식): 3.86s, 표제어 3/8, 뜻 0/8, 신뢰도 43%
   - Step B (2면 분리): 4.79s, 표제어 5/8, 뜻 1/8, 평균신뢰도 40%
   - Step C (2면 분리 + 2배 확대): 6.99s, 표제어 6/8, 뜻 3/8, 평균신뢰도 54% [최적 채택]
   - Step D (2면 분리 + 2배 확대 + 그레이 + 대비 보정): 7.27s, 표제어 6/8, 뜻 1/8, 평균신뢰도 49%
   - `detectSpreadLayout()` 안전장치 분리 (`single`, `spread`, `uncertain`)

4. **저장소 안전성 및 백업/복원 구현**:
   - `StorageHealth` 진단 모듈 (`navigator.storage.estimate`, `persisted`, `persist`)
   - JSON 백업 내보내기/복원 (`toeic_study_backup_YYYYMMDD.json`, 스키마 v1 검증)
   - Safari 저장소 정책 문서화 (홈 화면 standalone PWA 1차 도메인의 ITP 7일 예외 명시)

5. **배포 버전 추적**:
   - `__APP_VERSION__` (v0.2.0) 및 `__GIT_SHA__` 주입 및 앱 푸터 표시

## 검증 내역
- `npm run typecheck`: 통과 (오류 0건)
- `npm run test`: 7개 테스트 스위트, 25개 테스트 통과
- `npm run build`: 프로덕션 정적 번들 정상 빌드 완료
- `USER_DOCUMENT_UPLOADS`: 0건 (완전 로컬 브라우저 처리)

## 현재 상태 판정 (P0-C 검증 완료)
- `PDF_IMPORT_BASELINE = PASS` (100/100 단어 무손실 회귀 유지)
- `PHOTO_OCR_EXTRACTION = PASS` (기하학적 열 격리, 경계 침범 차단, 3단계 신뢰도, 8종 합성 fixture 통과)
- `QUIZ_SEMANTIC_UNIQUENESS = PASS` (Hard Gate 통과, BLOCK 동의어 0건, 1,000회 시험 PASS)
- `CURRENT_STAGE = P0_PHOTO_AND_QUIZ_QUALITY_PASS`

## 잔여 P0 과제
- 없음 (P0-A 및 P0-B 해결 완료)

## Next Candidate Task (다음 작업 후보)
- 자체 검증 기본 어휘 데이터셋 확대 (TOEIC 2,000+ 단어 DB 구축)


