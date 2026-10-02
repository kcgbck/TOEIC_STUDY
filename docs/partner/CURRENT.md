> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (모바일 UI/UX 개편, PWA 캐시 퍼지, 4대 메뉴 통합 및 Pages 배포 완비)

## 아키텍처
PWA (Progressive Web App, 모바일 맞춤 설치형 오프라인 우선 웹앱, Cloudflare Pages + Pages Functions, Cloudflare D1 Serverless SQLite, Dexie v2 무손실 로컬 DB)

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
- `PAGES_MIGRATION = PASS` (voca-study-akf.pages.dev 이전 완료, Workers 폐쇄)
- `ALGORITHM_BOARD_98_NODES = PASS` (16개 탭, 98개 노드, 21개 P0 동기화 완료)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = MOBILE_UI_INTEGRATION_AND_PAGES_MIGRATION_COMPLETE`

## 최근 완료 작업
1. **Cloudflare Pages 전면 이전 및 개인 계정명 노출 원천 차단**:
   - 개인 계정 서브도메인이 노출되던 구형 Worker(`voca-study.heyruler0011.workers.dev`)를 `wrangler delete`로 완전 폐쇄
   - Cloudflare Pages(`voca-study-akf.pages.dev`)로 정적 에셋 및 풀스택 서비스 이전
   - `functions/api/[[route]].ts`를 구축하여 D1 데이터베이스(`voca-study-db`)와 단일 도메인에서 바인딩 연동 성공
2. **모바일 랭킹 보드 UI 순수 CSS 전면 리팩토링 (화면 깨짐 완벽 해결)**:
   - Tailwind CSS 미설치로 인해 모바일에서 세로로 깨져서 출력되던 `RankingView`를 `src/app/App.css` 기반 순수 CSS로 재구축
   - 1~3위 포디움 메달(🥇🥈🥉), 내 순위 카드, 4분할 지표 그리드, 닉네임 수정 및 기기 코드 연동 모달 반응형 스타일 완비
3. **상단 헤더 정리 및 우측 3개 버튼 나란히 정렬**:
   - `📖 보카 스터디 Voca Study`에서 `Voca Study` 배지 제거
   - 우측 끝에 `[🏆 랭킹]`, `[🔄 새로고침]`, `[⚙️ 설정]` 3개 버튼을 1줄로 나란히 배치
4. **PWA 크롬 앱 캐시 삭제 및 강제 최신 버전 업데이트 기능**:
   - `[🔄 새로고침]` 버튼 클릭 시 브라우저 CacheStorage 순회 전체 삭제(`caches.delete`)
   - Service Worker v5 등록 갱신 및 `SKIP_WAITING` / `CLEAR_CACHE` 메시지 전송 후 강제 화면 리로드
   - 스마트폰 홈 화면에 설치된 크롬 PWA 앱에서도 즉시 최신 버전이 반영되도록 보장
5. **홈 화면 대시보드 4대 핵심 메뉴 통합 및 재배치**:
   - 1번째: `📝 TOEIC(1800단어) 문제풀이`
   - 2번째: `⚓ 해사영어(451단어) 문제풀이`
   - 3번째: `📚 내가 만드는 문제집` (기존 일반 문제집 만들기 - 사진/스캔/PDF 객관식 문제 제작)
   - 4번째: `🔤 내가 만드는 영단어 문제집` (기존 '내 사진 영단어' + '내 PDF 영단어'를 1개 뷰로 통합)
6. **영단어 문제집 통합 컴포넌트 (`CustomVocabularyUnifiedView`) 신설**:
   - 상단 서브 탭을 통해 `[📷 사진 촬영 / 이미지 OCR]`과 `[📄 PDF 파일 어휘 추출]`을 자유롭게 전환하며 맞춤 퀴즈 풀이 지원
7. **전체 알고리즘 보드 갱신 (총 98개 노드)**:
   - 탭 16(모바일 개편 & Pages 인프라) 신설 및 NODE-96, NODE-97, NODE-98 추가 (MD 및 HTML 완벽 동기화)

## 검증
- `npm run typecheck`: 통과 (0 errors)
- `npm test`: 통과 (28개 테스트 파일 / 112개 테스트 100% PASS)
- `npm run build`: 통과 (Vite v6.4.3 프로덕션 번들 생성 완료)
- `npx wrangler pages deploy`: 통과 (`https://voca-study-akf.pages.dev` 실시간 배포 및 D1 엔드포인트 응답 검증 완료)
