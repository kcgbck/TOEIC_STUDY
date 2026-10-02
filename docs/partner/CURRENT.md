> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (모바일 UI 정밀 최적화 & 뒤로가기 popstate 완비)

## 아키텍처
PWA (Progressive Web App, 모바일 맞춤 설치형 오프라인 우선 웹앱, Cloudflare Pages + Pages Functions, Cloudflare D1 Serverless SQLite, Dexie v2 무손실 로컬 DB, History API popstate 제어)

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Pages 실서비스: https://voca-study-akf.pages.dev (개인 계정 ID 비공개 완비)
- 구형 Workers URL: `voca-study.heyruler0011.workers.dev` (영구 폐쇄 및 삭제 완료)
- 캐시 버전: `voca-study-cache-v5`

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
- `RANK_01_DEVICE_LOGIN_AND_RANKING = PASS` (기기 코드 자동발급, 비속어 필터, 가중 점수, D1 랭킹 완비)
- `MOBILE_UI_REVAMP = PASS` (Tailwind 제거 순수 CSS, 랭킹 모바일 깨짐 해결, 상단 헤더 3버튼 정렬)
- `PWA_CACHE_PURGE_UPDATE = PASS` (Service Worker v5, CacheStorage 삭제, 강제 리로드)
- `NAVIGATION_BACK_BUTTON = PASS` (History API popstate 연동, 안드로이드 뒤로가기 시 홈 대시보드 복귀)
- `PAGES_MIGRATION = PASS` (voca-study-akf.pages.dev 이전 완료, Workers 폐쇄)
- `ALGORITHM_BOARD_98_NODES = PASS` (16개 탭, 98개 노드, 21개 P0 동기화 완료)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = MOBILE_UI_AND_NAVIGATION_REFINEMENT_COMPLETE`

## 최근 완료 작업
1. **스마트폰/브라우저 뒤로가기(Back Button) 완벽 연동 및 앱 종료 방지**:
   - `window.history.pushState` 및 `popstate` 리스너를 연계하여 퀴즈/문제집/영단어/랭킹 화면에서 물리/제스처 뒤로가기 키 입력 시 앱이 꺼지지 않고 홈 대시보드로 안전하게 복귀하도록 전면 수정
   - 퀴즈 뷰, 영단어 뷰, 일반 문제집 뷰 내부에도 일관된 `←` 인앱 뒤로가기 버튼 연동
2. **상단 네비게이션 탭 통합 (5개 → 4개)**:
   - 퀴즈 화면 내부에서 이미 토익과 해사영어를 상시 전환할 수 있으므로 상단 헤더 탭을 `[홈]`, `[기본 문제]`, `[문제집]`, `[영단어]` 4개로 통합
3. **토익 / 해사영어 탭 모바일 50:50 중앙 정렬 및 우측 쏠림 해결**:
   - CSS Grid 50:50 대칭 및 `display: flex; justify-content: center; align-items: center;`를 적용하여 해사영어 탭이 우측으로 밀리거나 쏠리는 현상 원천 차단
4. **홈 대시보드 카드 UI 최적화 (이모지-제목 동일 크기 인라인 정렬)**:
   - 상단에 분리되어 크던 이모지를 제목과 동일한 크기로 맞추어 `[이모지] [메뉴제목]` 한 줄 인라인으로 재배치
   - "내가 만드는 문제집": `사진·스캔·PDF로 4/5지선다 제작 및 풀이` ("어떤 문제집이든" 삭제 완료, 1줄 고정)
   - "내가 만드는 영단어 문제집": `사진·스캔·PDF로 영단어 제작 및 풀이` (동일 서식 1줄 고정)
5. **내가 만드는 문제집 내부 헤더 개선**:
   - "홈으로" 텍스트를 제거하고 간결한 `←` 화살표 버튼으로 변경
   - 제목("📚 일반 객관식 문제집 만들기")에 `clamp` 및 `nowrap`을 적용하여 초소형 모바일에서도 1줄 줄바꿈 없이 출력 보장

## 검증
- `npm run typecheck`: 통과 (0 errors)
- `npm test`: 통과 (28개 테스트 파일 / 112개 테스트 100% PASS)
- `npm run build`: 통과 (Vite v6.4.3 프로덕션 번들 생성 완료)
- `npx wrangler pages deploy`: 통과 (`https://voca-study-akf.pages.dev` 실시간 배포 및 D1 엔드포인트 응답 검증 완료)
