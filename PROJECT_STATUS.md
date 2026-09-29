> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디

# PROJECT_STATUS.md

## Current Stage
- `CURRENT_STAGE = MARITIME_PHASE_3_COMPLETE`
- 자동 기술 검증: **PASS**
- 해사영어 데이터베이스: **451어** (`databaseVersion: 3`, Phase 1~3 전과정 완비)
- 기본 토익 어휘 데이터베이스: **1,800어** (`databaseVersion: 4`)
- 사람 검토 상태: **HUMAN_REVIEW_PENDING** (실제 사람 승인 전까지 PASS 절대 금지)
- 1,800 Release Ready: **NO** (인간 검토자의 최종 서명 전까지 출시 동결 유지)
- 2,000+ 확장: **보류** (현재 1,800개 동결, 사용자 명시 지시 필요)
- 잔여 기술 P0: **없음**
- 이전 완료: `NAME-01 = PASS`, `P0-C = PASS`, `DB-PILOT-200 = PASS`, `DB-02 = PASS`, `DB-03 = TECH_PASS`, `QA-01 = PASS`, `QA-02 = PASS`, `MARITIME_P1_P2_P3 = PASS`

## 배포 상태 (Live Deployment)
- **GitHub 원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)
- **Cloudflare Workers 실서비스 URL**: [https://voca-study.heyruler0011.workers.dev](https://voca-study.heyruler0011.workers.dev)
- **캐시 버전**: `voca-study-cache-v4`

## 최근 완료 항목 (해사영어 전수 구축 및 모바일 UI 최적화)
1. **해사영어 Phase 1~3 전과정 구축 및 무결성 검증 (총 451어)**:
   - **Phase 1 (IMO SMCP 174어)**: IMO 총회 결의서 Res. A.918(22) Annex 1 표준 어휘집(Glossary) 전수 정규화
   - **Phase 2 (해기사 3·4급 빈출 171어)**: 한국해양수산연수원(KIMFT) 해기사 3급·4급(항해사/기관사) 국가자격시험 빈출 어휘 (해경 제외)
   - **Phase 3 (국제협약 및 실무 106어)**: COLREGs(국제해상충돌예방규칙), SOLAS(해상인명안전협약), MARPOL(해양오염방지협약), STCW/ISM Code 및 선적·선박 실무 어휘
   - **출제 무결성**: 4지선다 출제 엔진 정답 유일성 Hard Gate 100% 통과 (결함 0건, 중복 0건)
2. **모바일 1화면 UX/UI 최적화 및 설정창 집약**:
   - 우측 상단 톱니바퀴(⚙️) 설정 모달: PWA 앱 설치, 다크/라이트 테마 변경, 퀴즈 출제 순서 매번 랜덤 섞기, 실수 방지 2단계 채점 모드(선택 후 [정답 확인] 클릭 시 채점), IndexedDB 로컬 저장소 관리(용량 확인, 백업, 초기화) 집약
   - 홈 화면 4대 핵심 메뉴 카드 및 퀴즈 상단 단어장 전환 탭(`기본 어휘 1,800어` vs `해사영어 451어`) 제공
   - 스마트폰 화면 2줄 줄바꿈 방지 및 반응형 레이아웃 완성
3. **전체 단위/통합 테스트 및 클라우드플레어 배포**:
   - `npm test`: 18개 테스트 파일 / 77개 테스트 100% PASS
   - `npx wrangler deploy`: Cloudflare Workers 실서비스 배포 및 라이브 fetch 응답 검증 완료
4. **해사영어 단어 로드 및 전환 오류 긴급 수정**:
   - `QuizPreviewView.tsx`: `toWordEntry` 안전 변환기 도입으로 maritime 스키마(subMeanings 부재) 파싱 런타임 오류 원천 해결
   - `handleSwitchBook` 및 `key={customSourceType}` 적용으로 홈 카드 및 퀴즈 탭 내 단어장 즉시 전환 및 퀴즈 출제 정상화
5. **UI 명칭 정규화**:
   - 홈 대시보드 및 퀴즈 뷰: `기본 어휘(1,800어)` → `TOEIC(1800단어)`, `해사영어(451어)` → `해사영어(451단어)`로 표기 통일


## QA-02 이전 핵심 이력 (보존)
1. subMeanings 전수 감사 및 유의어 분리 (databaseVersion: 4, 실제 다의어 20개 단어 25개 뜻)
2. 한국어 맞춤법 및 띄어쓰기 정규화 (`docs/WORD_DB_ERRATA.md` 기록)
3. 공식 근거 본문 대조 (406개 전수 CONTENT_VERIFIED 확정)
4. 최종 사람 검토 큐 80.3% 압축 (1,007개 → 198개, `docs/WORD_DB_1800_REVIEW_QUEUE.md`)
5. 대화형 검토 웹 뷰어 고도화 (`docs/WORD_DB_1800_REVIEW.html`)
