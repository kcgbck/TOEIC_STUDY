> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (해사영어 Phase 1~3 전과정 완비 및 모바일 UI 고도화)

## 아키텍처
PWA (Progressive Web App, 모바일 맞춤 설치형 오프라인 우선 웹앱)

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
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = MARITIME_PHASE_3_COMPLETE`

## 최근 완료 작업
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
