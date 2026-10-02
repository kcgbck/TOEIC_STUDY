> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (GEN-01 범용 문제 제작 엔진 및 스캔/OCR 강화 완비)

## 아키텍처
PWA (Progressive Web App, 모바일 맞춤 설치형 오프라인 우선 웹앱, Dexie v2 무손실 로컬 DB)

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Workers 실서비스: https://voca-study.heyruler0011.workers.dev
- 캐시 버전: `voca-study-cache-v4`

## 현재 상태 판정
- `NAME-01 = PASS`
- `PDF_IMPORT_BASELINE = PASS` (100/100 무손실)
- `PHOTO_OCR_EXTRACTION = PASS`
- `QUIZ_SEMANTIC_UNIQUENESS = PASS`
- `BASELINE_500_FREEZE = PASS` (removed=0, modified=0)
- `DB_03_1800_TECH_PASS = PASS` (1,800개 구축, 54,000회 스트레스 테스트 결함 0)
- `QA_02_SEMANTIC_NORMALIZATION = PASS`
- `MARITIME_PHASE_1_SMCP = PASS` (IMO SMCP 공식 표준 174어)
- `MARITIME_PHASE_2_OFFICER_EXAM = PASS` (해기사 3·4급 항해/기관 빈출 171어)
- `MARITIME_PHASE_3_CONVENTIONS = PASS` (COLREGs/SOLAS/MARPOL/STCW/ISM 실무 106어)
- `MARITIME_TOTAL_WORDS = 451` (중복 0건, 정답 유일성 100% 통과)
- `GEN_01_GENERAL_QUIZ_ENGINE = PASS` (4지/5지선다 20,000회 셔플 스트레스 테스트 무결점)
- `ALGORITHM_BOARD_90_NODES = PASS` (14개 탭, 90개 노드, 18개 P0 동기화 완료)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = GEN_01_GENERAL_QUIZ_ENGINE_COMPLETE`

## 최근 완료 작업
1. **범용 문제 도메인 분리 및 Dexie v2 무손실 마이그레이션**:
   - `WordEntry`와 분리된 독립 `QuestionItem`, `QuestionChoice`, `QuestionBook` 스키마 구축
   - Dexie `version(2)` 마이그레이션으로 기존 v1 단어장/학습기록 100% 무손실 보존
2. **4지선다 및 5지선다 출제 및 셔플 무결성 엔진**:
   - 정답 인덱스 고정 저장 탈피 → `correctChoiceId` 고유 식별자 저장
   - 문제 순서 랜덤 셔플 & 보기 순서 랜덤 셔플 독립 제어
   - 보기 shuffle 후 `correctChoiceId` 위치를 검색해 `displayCorrectIndex`를 런타임에 동적 생성 (원본 정답 불변)
   - 4지선다 10,000회 + 5지선다 10,000회 = 총 20,000회 스트레스 테스트 정답 왜곡 0건 입증
3. **문서 유형 자동 판별 및 일반 객관식 OCR 파서**:
   - 문서 유형 자동 판별 (`VOCABULARY`, `MULTIPLE_CHOICE`, `ANSWER_KEY`, `UNKNOWN`) 및 수동 전환 지원
   - ①~⑤, 1)~5), (1)~(5), A~E 다중 번호 체계 자동 파싱 및 문제 경계 탐지
   - 인라인 정답 마크 자동 감지 및 별도 정답표 `questionNumber` 기준 자동 연결
   - 정답 없는 문제는 임의 추측 없이 `missing` 격리 후 사용자 검토 필수 Hard Gate 적용
4. **PDF 범용 처리 및 하드코딩 제거**:
   - 전자 PDF 텍스트 좌표 추출 및 스캔 PDF Canvas OCR 변환
   - `pdfParser.ts` 내 'substitute' 하드코딩 제거 및 기하학적 x좌표 정렬 로직으로 일반화
5. **대화형 검토 및 풀이 UI 연동**:
   - 홈 대시보드 `📚 일반 문제집 만들기 (스캔/PDF)` 카드 및 상단 전용 탭 신설
   - `GeneralQuizImportView`: 파일 업로드, 문서 유형 선택, 정답표 결합, 문항 검토/수정, 저장
   - `GeneralQuizPlayerView`: 4/5지선다 실전 풀이, 즉각 피드백, 셔플 지원, 성적 리포트
6. **전체 알고리즘 보드 갱신 (총 90개 노드)**:
   - `docs/토익_스터디_앱_전체_알고리즘_보드.md` 및 `.html` 동시 갱신
   - 탭 14(범용 문제 제작 및 스캔/OCR 강화) 및 NODE-81~NODE-90 (총 10개 노드) 추가 (18개 P0)
   - 15개 필수 항목 전수 검증 통과 및 한글 우선 표준 100% 준수
1. **해사영어(Maritime English) 3단계 전수 구축 및 통합 (총 451어)**:
   - Phase 1: IMO 총회 결의서 Res. A.918(22) Annex 1 표준 Glossary (174어)
   - Phase 2: 해기사 3급·4급 국가자격시험(항해사/기관사) 최다 빈출 어휘 (171어, 해경 제외)
   - Phase 3: 국제해사협약(COLREGs, SOLAS, MARPOL, STCW, ISM Code) 및 상선 실무 어휘 (106어)
   - 4지선다 출제 엔진 정답 유일성 Hard Gate 100% 통과 (결함 0건)
2. **모바일 1화면 최적화 및 UI/설정창 개편**:
   - 우측 상단 톱니바퀴(⚙️) 설정 모달: 앱 설치 버튼, 다크/라이트 테마, 순서 랜덤 섞기, 실수 방지 채점 모드, IndexedDB 저장소 관리 기능 집약
   - 홈 대시보드 및 퀴즈 뷰: 기본 어휘(1,800어) vs 해사영어(451어) 원터치 전환 탭 제공
   - 스마트폰 화면 2줄 줄바꿈 방지 및 컴팩트 레이아웃 확립
3. **전체 검증 및 Cloudflare 실서버 배포 완료**:
   - 18개 테스트 파일 / 77개 테스트 100% PASS
   - Cloudflare Workers 실서버(`voca-study.heyruler0011.workers.dev`) 배포 완료
4. **해사영어 데이터 로드 및 전환 오류 수정**:
   - `QuizPreviewView.tsx`: `toWordEntry` 안전 변환기 도입으로 maritime 스키마 파싱 에러(subMeanings 미참조) 해결
   - `handleSwitchBook` 및 `key={customSourceType}` 적용으로 홈 및 퀴즈 탭 내 단어장 즉시 전환 지원
5. **UI 명칭 정규화**:
   - 홈 및 문제풀이: `기본 어휘(1,800어)` → `TOEIC(1800단어)`, `해사영어(451어)` → `해사영어(451단어)` 변경
6. **전체 알고리즘 보드 갱신 및 완전 동기화 (총 80개 노드)**:
   - `docs/토익_스터디_앱_전체_알고리즘_보드.md` 및 `.html` 동시 갱신
   - 신규 4대 노드 추가: NODE-77(IMO SMCP), NODE-78(해기사 3·4급), NODE-79(국제해사협약), NODE-80(다중 단어장 스키마 안전 변환 및 원터치 전환 엔진, P0)
   - 한글 우선 표준 100% 준수, 15개 필수 항목 전수 검증 통과
