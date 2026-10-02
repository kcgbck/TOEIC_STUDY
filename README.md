# 보카 스터디

> TOEIC® 및 해사영어 대비를 포함하여, 사진/PDF로 어떤 문제집이든 학습 데이터로 만드는 범용 문제 제작·학습용 오프라인 우선 설치형 웹앱 (PWA). 별도의 APK/IPA 설치 파일 없이 URL에 접속하여 앱을 사용하고, Chrome/Safari에서 휴대폰 홈 화면에 설치해 일반 앱처럼 실행합니다.

---

## 1. 아키텍처 개요

- **플랫폼 형태**: Progressive Web App (PWA, 설치형 웹앱)
- **프론트엔드**: React + TypeScript + Vite (순수 CSS 모바일 반응형 완비, Tailwind 의존성 제로)
- **배포 및 백엔드**: Cloudflare Pages + Pages Functions (`/api/*`)
- **서버리스 DB**: Cloudflare D1 (Serverless SQLite, 무과금 Free 티어, APAC ICN 리전)
- **로컬 저장소**: IndexedDB (Dexie v2 계층) — 100% 기기 내부 저장 (오프라인 학습 지원, 서버 저장 제로, 무손실 마이그레이션)
- **PDF 처리 엔진**: PDF.js (브라우저 메모리 내부 파싱 및 텍스트 레이어 검출, Canvas 렌더링)
- **OCR 처리 엔진**: 브라우저 온디바이스 OCR 추론 계층 (`OcrEngine` 표준 인터페이스 기반)

---

## 2. 홈 화면 4대 핵심 메뉴 구조

1. **📝 TOEIC(1800단어) 문제풀이**: 1,800개 검증된 TOEIC 빈출 어휘 4지선다 실전 문제학습
2. **⚓ 해사영어(451단어) 문제풀이**: IMO SMCP(174어), 해기사 3·4급(171어), 국제해사협약(COLREGs/SOLAS/MARPOL 106어) 실전 문제학습
3. **📚 내가 만드는 문제집**: 어떤 문제집이든 사진·스캔·PDF로 4/5지선다 제작 및 풀이
   - 스마트폰 사진 촬영, 스캔 이미지, 전자 PDF, 스캔 PDF 지원
   - 문서 유형 자동 판별 (`VOCABULARY`, `MULTIPLE_CHOICE`, `ANSWER_KEY`, `UNKNOWN`) 및 수동 전환
   - 4지선다 및 5지선다 문항 자동 구조화 (①~⑤, 1)~5) 등 다중 번호 체계 지원)
   - 인라인 정답 마크 감지 및 별도 정답표 자동 매핑 (정답 임의 생성 절대 금지, Hard Gate 검증)
   - 문제 순서 랜덤 셔플 & 보기 순서 랜덤 셔플 독립 제어 (`correctChoiceId` 기반 동적 정답 인덱스 재계산)
4. **🔤 내가 만드는 영단어 문제집**: 단어장 사진 촬영/OCR 및 PDF 어휘 통합 추출·맞춤 문제풀이
   - `CustomVocabularyUnifiedView`: 사진 OCR 탭과 PDF 탭을 1개 화면에서 자유롭게 전환하며 단어장 제작 및 풀이

---

## 3. 상단 헤더 & PWA 캐시 퍼지 시스템

- **상단 헤더 3대 버튼**:
  - `[🏆 랭킹]`: 1~3위 포디움 메달(🥇🥈🥉), 내 순위 카드, 4분할 지표 그리드, 기기 코드 원클릭 복사
  - `[🔄 새로고침]`: 크롬 PWA 앱에서 Service Worker v5 캐시 스토리지 전체 삭제(`caches.delete`), 등록 갱신, 강제 새로고침
  - `[⚙️ 설정]`: PWA 앱 설치, 다크/라이트 테마 변경, 문제 셔플, 2단계 즉시 채점 모드, IndexedDB 저장소 백업/초기화

---

## 4. 기기 ID 자동 접속 & 실시간 랭킹 (RANK-01)

- 복잡한 회원가입 없이 스마트폰 기기별 고유 코드(`VOCA-XXXX-XXXX`)로 최초 접속 즉시 자동 로그인
- 비속어 및 욕설 실시간 필터링(클라이언트/서버 이중 차단) 및 건전 닉네임 자동 생성
- 맞춘 문제(+10점)와 틀린 문제(-2점) 가중 기반 총 점수 산정 및 정답률 집계
- Cloudflare D1 기반 실시간 글로벌 랭킹 보드(TOP 50, 내 순위 고정 카드, 기기 코드 연동)
- 오프라인 풀이 후 온라인 복귀 시 자동 누적 동기화(Offline-First Sync)

---

## 5. 개발 및 실행

### 패키지 설치
```powershell
npm install
```

### 로컬 개발 서버 실행
```powershell
npm run dev
```
기본 브라우저에서 `http://localhost:3000` 접속

### 단위 테스트 및 타입 검사
```powershell
npm run test
npm run typecheck
```

### 프로덕션 빌드 & Cloudflare Pages 배포
```powershell
npm run build
npx wrangler pages deploy dist --project-name=voca-study --branch=main
```

---

## 6. 서비스 URL 및 도메인

- **실서비스 주소**: [https://voca-study-akf.pages.dev](https://voca-study-akf.pages.dev) (Cloudflare Pages, 개인 계정 ID 비공개 완비)
- **원격 저장소**: [https://github.com/kcgbck/voca-study](https://github.com/kcgbck/voca-study)

---

## 7. 설계 문서

- [docs/ADR-001_PWA_구조전환.md](docs/ADR-001_PWA_구조전환.md): 아키텍처 결정 레코드
- [docs/CURRENT.md](docs/CURRENT.md): 프로젝트 실시간 개발 현황
- [docs/토익_스터디_앱_전체_알고리즘_보드.html](docs/토익_스터디_앱_전체_알고리즘_보드.html): 대화형 시각형 알고리즘 보드 (16개 탭, 98개 노드)
- [docs/토익_스터디_앱_전체_알고리즘_보드.md](docs/토익_스터디_앱_전체_알고리즘_보드.md): 알고리즘 보드 명세서 마크다운

---

## 상표권 고지

- TOEIC® is a registered trademark of ETS. This application is not endorsed or approved by ETS.
- 본 애플리케이션은 ETS의 공식 제품이 아니며, ETS와 어떠한 제휴 또는 보증 관계도 없습니다.
