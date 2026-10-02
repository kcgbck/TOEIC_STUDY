> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# PROJECT_STATUS.md

## Current Stage
- `CURRENT_STAGE = MOBILE_UI_INTEGRATION_AND_PAGES_MIGRATION_COMPLETE`
- 자동 기술 검증: **PASS** (28개 테스트 파일 / 112개 테스트 100% 통과, 4/5지선다 20,000회 스트레스 테스트 무결점)
- 클라우드플레어 인프라: **Pages 전환 완료** (개인 계정 서브도메인 노출 원천 차단, Pages Functions D1 직결 연동)
- 모바일 UI/UX 최적화: **PASS** (Tailwind 의존성 완전 제거, 순수 CSS 100% 모바일 핏, 랭킹 화면 깨짐 원천 해결)
- PWA 캐시 삭제 새로고침: **PASS** (Service Worker v5, CacheStorage 전체 퍼지, 강제 리로드 파이프라인 완비)
- 4대 핵심 메뉴 통합: **PASS** (1: TOEIC, 2: 해사영어, 3: 내가 만드는 문제집, 4: 내가 만드는 영단어 문제집)
- 기기 ID & 실시간 랭킹 시스템: **RANK-01 PASS** (Cloudflare D1 연동, 비속어 필터, 가중 점수 산정, 모바일 1화면 UI)
- 범용 문제 제작 엔진: **GEN-01 PASS** (`QuestionItem`, `QuestionChoice`, `QuestionBook`, Dexie v2 무손실 마이그레이션)
- 해사영어 데이터베이스: **451어** (`databaseVersion: 3`, Phase 1~3 전과정 완비)
- 기본 토익 어휘 데이터베이스: **1,800어** (`databaseVersion: 4`)
- 전체 알고리즘 보드: **98개 노드** (16개 탭, 21개 P0, MD/HTML 100% 동기화)
- 사람 검토 상태: **HUMAN_REVIEW_PENDING** (실제 사람 승인 전까지 PASS 절대 금지)
- 1,800 Release Ready: **NO** (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- 2,000+ 확장: **보류** (현재 1,800개 동결, 사용자 명시 지시 필요)
- 잔여 기술 P0: **없음**

## 배포 상태 (Live Deployment)
- **GitHub 원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)
- **Cloudflare Pages 실서비스 URL**: [https://voca-study-akf.pages.dev](https://voca-study-akf.pages.dev) (개인 계정 ID 비공개 완비)
- **구형 Workers URL**: `voca-study.heyruler0011.workers.dev` (영구 폐쇄 및 삭제 완료)
- **PWA 캐시 버전**: `voca-study-cache-v5`

## 최근 완료 항목 (모바일 UI/UX 개편, PWA 캐시 퍼지, 4대 메뉴 통합 및 Cloudflare Pages 배포)
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

## Verification
- `npm run typecheck`: PASS (0 errors)
- `npm test`: PASS (28개 테스트 파일 / 112개 테스트 100% 통과)
- `npm run build`: PASS (Vite v6.4.3 프로덕션 번들 빌드 성공)
- `npx wrangler pages deploy`: PASS (`https://voca-study-akf.pages.dev` 실시간 배포 및 D1 엔드포인트 응답 검증 완료)
