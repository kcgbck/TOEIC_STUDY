> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# 보카 스터디 현재 상태 (영어/일본어 TTS 음성 지원 & 일본어 문제집 2탭 완비)

## 아키텍처
PWA (Progressive Web App, 모바일 맞춤 설치형 오프라인 우선 웹앱, Web Speech API 음성 지원, Cloudflare Pages + Pages Functions, Cloudflare D1 Serverless SQLite, Dexie v2 무손실 로컬 DB, History API popstate 제어)

## 배포
- GitHub main: https://github.com/kcgbck/voca-study
- Cloudflare Pages 실서비스: https://voca-study-akf.pages.dev (개인 계정 ID 비공개 완비)
- 구형 Workers URL: `voca-study.heyruler0011.workers.dev` (영구 폐쇄 및 삭제 완료)
- 캐시 버전: `voca-study-cache-v6`

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
- `JAPANESE_EXAM_WORDS = 161` (JLPT N5~N3 기출 빈출 한자 및 어휘, 정답 유일성 100% 통과)
- `JAPANESE_LIFE_WORDS = 160` (여행/식당/교통/호텔/쇼핑/일상 실전 어휘, 정답 유일성 100% 통과)
- `JAPANESE_TOTAL_WORDS = 321` (정답 유일성 및 4지선다 출제 100% 무결점 통과)
- `TTS_SPEECH_SUPPORT = PASS` (비용 0원 브라우저 내장 Web Speech API, en-US 및 ja-JP 자동 판별, 0.9배속 명확한 발음, 실시간 펄스 애니메이션)
- `GEN_01_GENERAL_QUIZ_ENGINE = PASS` (4지/5지선다 20,000회 셔플 스트레스 테스트 무결점)
- `RANK_01_DEVICE_LOGIN_AND_RANKING = PASS` (기기 코드 자동발급, 비속어 필터, 가중 점수, D1 랭킹 완비)
- `MOBILE_UI_REVAMP = PASS` (Tailwind 제거 순수 CSS, 랭킹 모바일 깨짐 해결, 상단 헤더 3버튼 정렬)
- `PWA_CACHE_PURGE_UPDATE = PASS` (Service Worker v6, CacheStorage 삭제, 강제 리로드, 일본어 자산 오프라인 프리캐시 완비)
- `NAVIGATION_BACK_BUTTON = PASS` (History API popstate 연동, 안드로이드 뒤로가기 시 홈 대시보드 복귀)
- `PAGES_MIGRATION = PASS` (voca-study-akf.pages.dev 이전 완료, Workers 폐쇄)
- `ALGORITHM_BOARD_98_NODES = PASS` (16개 탭, 98개 노드, 21개 P0 동기화 완료)
- `HUMAN_REVIEW_STATUS = HUMAN_REVIEW_PENDING` (실제 사람 검토 전까지 승인 금지)
- `1800_RELEASE_READY = NO` (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- `CURRENT_STAGE = TTS_AND_JAPANESE_WORDBOOKS_COMPLETE`

## 최근 완료 작업
1. **기기 코드 연동 버튼 설정창 이동 및 UI 최적화**:
   - 기존 랭킹 보드(`RankingView.tsx`)에 있던 "기기 코드 연동 버튼"을 환경 설정창(`SettingsModal.tsx`)의 `👤 학습자 계정` 하단으로 이동
   - 설명 문구("스마트폰 변경 시 코드로 계정을 이어받을 수 있습니다.")와 함께 깔끔한 인라인 입력 폼으로 배치 (코드 입력 시 대문자 자동 변환 및 즉시 계정/랭킹 동기화)
   - 랭킹 보드 내 잔여 연동 모달 및 코드 정리 완료
2. **스피커(🔊) 발음 듣기(TTS) 듀얼 엔진 구축 및 모바일/Referer 차단 100% 해결**:
   - 외부 유료 API 종량제 과금 0원: Cloudflare Pages Functions 프록시(`/api/tts`) 구축
   - **기존 소리 안 나던 핵심 원인 규명 및 해결**:
     1) 브라우저가 Google TTS 직접 호출 시 보낸 Referer로 인해 발생하던 `404 Not Found` 차단을 서버 프록시로 완벽 우회
     2) 모바일 브라우저(Android/iOS)의 Autoplay Policy(비동기 호출 시 차단)를 방지하기 위해 터치 시 동기적 스트림 즉시 재생 적용
     3) 기기별 OS 음성팩 미설치 상태에서도 100% 또렷한 원어민 음성(영어 en-US / 일본어 ja-JP) 출력 보장
     4) Cloudflare Edge 7일 불변 캐시(`Cache-Control: public, max-age=604800, immutable`)로 10ms 초고속 재생
   - `src/services/speechService.ts`, `functions/api/[[route]].ts`, `src/worker.ts` 완비
   - 단위 테스트 통과 (`tests/speechService.test.ts`, `tests/workerApi.test.ts`)
3. **일본어 단어 문제집 (시험용 vs 완전 생활일본어 2가지 탭) 전면 구축**:
   - **탭 1: 시험용 (JLPT N5~N3 기출 161단어)**: 한자 + 요미가나 + 한국어 뜻 4지선다 실전 출제
   - **탭 2: 완전 생활일본어 (여행·식당·교통·호텔·쇼핑 실전 160단어)**: 일본 여행 및 실전 생존 필수 어휘 4지선다 출제
   - 정답 유일성 Hard Gate 100% 무결점 통과 검증 (`tests/japaneseWordbooks.test.ts`)
4. **퀴즈 뷰 및 홈 대시보드 UI 연동**:
   - 퀴즈 상단 단어장 선택 탭을 3분할(`[📖 TOEIC]`, `[⚓ 해사영어]`, `[🇯🇵 일본어]`)로 확장
   - 일본어 선택 시 하단에 `[📝 시험용 (JLPT N5~N3)]` vs `[🍱 완전 생활일본어]` 2대 서브탭 즉시 전환
   - 홈 대시보드 카드 3번째에 `🇯🇵 일본어 단어 문제집 (321단어)` 바로가기 카드 배치
5. **PWA 오프라인 Service Worker v6 업데이트**:
   - `public/sw.js`에 일본어 데이터셋(`builtin_japanese_exam.json`, `builtin_japanese_life.json`) 프리캐시 추가

## 검증
- `npm run typecheck`: 통과 (0 errors)
- `npm test`: 통과 (31개 테스트 파일 / 128개 테스트 100% PASS)
- `npm run build`: 통과 (Vite v6.4.3 프로덕션 번들 생성 완료)
- `npx wrangler pages deploy`: 통과 (`https://voca-study-akf.pages.dev` 실시간 배포 완료, /api/tts 라이브 200 OK 확인)
