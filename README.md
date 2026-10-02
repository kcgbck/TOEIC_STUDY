# 보카 스터디

> TOEIC® 및 해사영어 대비를 포함하여, 사진/PDF로 어떤 문제집이든 학습 데이터로 만드는 범용 문제 제작·학습용 오프라인 우선 설치형 웹앱 (PWA). 별도의 APK/IPA 설치 파일 없이 URL에 접속하여 앱을 사용하고, Chrome/Safari에서 휴대폰 홈 화면에 설치해 일반 앱처럼 실행합니다.

---

## 1. 아키텍처 개요

- **플랫폼 형태**: Progressive Web App (PWA, 설치형 웹앱)
- **프론트엔드**: React + TypeScript + Vite
- **백엔드 & 서버리스 DB**: Cloudflare Workers + Cloudflare D1 (Serverless SQLite, 무과금 Free 티어)
- **로컬 저장소**: IndexedDB (Dexie v2 계층) — 100% 기기 내부 저장 (오프라인 학습 지원, 서버 저장 제로, 무손실 마이그레이션)
- **PDF 처리 엔진**: PDF.js (브라우저 메모리 내부 파싱 및 텍스트 레이어 검출, Canvas 렌더링)
- **OCR 처리 엔진**: 브라우저 온디바이스 OCR 추론 계층 (`OcrEngine` 표준 인터페이스 기반)

---

## 2. 주요 기능

1. **기본 문제풀이**: 1,800개 검증된 TOEIC 기본 어휘 및 451개 해사영어(IMO SMCP, 해기사 3·4급, 국제해사협약) 4지선다 퀴즈 및 즉시 채점
2. **기기 ID 자동 접속 & 실시간 랭킹 (RANK-01)**:
   - 복잡한 회원가입 없이 스마트폰 기기별 고유 코드(`VOCA-XXXX-XXXX`)로 최초 접속 즉시 자동 로그인
   - 비속어 및 욕설 실시간 필터링(클라이언트/서버 이중 차단) 및 건전 닉네임 자동 생성
   - 맞춘 문제(+10점)와 틀린 문제(-2점) 가중 기반 총 점수 산정 및 정답률 집계
   - Cloudflare D1 기반 실시간 글로벌 랭킹 보드(TOP 50, 내 순위 고정 카드, 기기 코드 연동)
   - 오프라인 풀이 후 온라인 복귀 시 자동 누적 동기화(Offline-First Sync)
3. **범용 문제집 만들기 (사진/PDF)**:
   - 스마트폰 사진 촬영, 스캔 이미지, 전자 PDF, 스캔 PDF 지원
   - 문서 유형 자동 판별 (`VOCABULARY`, `MULTIPLE_CHOICE`, `ANSWER_KEY`, `UNKNOWN`) 및 수동 전환
   - 4지선다 및 5지선다 문항 자동 구조화 (①~⑤, 1)~5) 등 다중 번호 체계 지원)
   - 인라인 정답 마크 감지 및 별도 정답표 자동 매핑 (정답 임의 생성 절대 금지, Hard Gate 검증)
   - 문제 순서 랜덤 셔플 & 보기 순서 랜덤 셔플 독립 제어 (`correctChoiceId` 기반 동적 정답 인덱스 재계산)
4. **사진으로 단어장 만들기**: 종이책 단어장 촬영/사진에서 영단어·뜻 자동 추출 (File API)
5. **PDF로 단어장 만들기**: PDF.js 기반 전자문서 텍스트 직접 추출 및 스캔본 Canvas 파싱
6. **PWA 홈 화면 설치**:
   - Android Chrome: 원클릭 PWA 설치 지원
   - iPhone Safari: 공유 시트 → '홈 화면에 추가' 가이드 제공
7. **완전한 오프라인 지원**: Service Worker를 통한 앱 셸 및 필수 에셋 프리캐싱

---

## 3. 개발 및 실행

### 필수 환경
- Node.js v20+ 이상
- npm v10+ 이상

### 패키지 설치
```powershell
npm install
```

### 로컬 개발 서버 실행
```powershell
npm run dev
```
기본 브라우저에서 `http://localhost:3000` 접속

### 프로덕션 빌드 (Static Assets 생성)
```powershell
npm run build
```
`dist/` 디렉터리에 PWA 에셋(HTML, JS, CSS, 매니페스트, 서비스 워커, 아이콘)이 생성됩니다.

### 단위 테스트 및 타입 검사
```powershell
npm run test
npm run typecheck
```

---

## 4. 배포

### Cloudflare Workers 배포 파이프라인
```text
GitHub main
   │
   │ push
   ▼
Cloudflare Workers Builds
   ├─ npm install
   ├─ npm run test
   └─ npm run build
   ▼
Cloudflare Workers + Static Assets
   │
   ▼
https://<project>.workers.dev
```

- 별도의 수동 빌드나 복잡한 GitHub Actions 배포 스크립트 없이 Cloudflare의 네이티브 Git 연동을 단일 파이프라인으로 사용합니다.

---

## 5. 설계 문서

- [docs/ADR-001_PWA_구조전환.md](docs/ADR-001_PWA_구조전환.md): 아키텍처 결정 레코드 (이전 구조 vs 변경 구조, 장단점, 한계점)
- [docs/TOEIC_단어학습앱_개발_마스터플랜.md](docs/TOEIC_단어학습앱_개발_마스터플랜.md): 마스터 플랜 v2 (PWA 기준)
- [docs/CURRENT.md](docs/CURRENT.md): 프로젝트 실시간 개발 현황
- [docs/토익_스터디_앱_전체_알고리즘_보드.html](docs/토익_스터디_앱_전체_알고리즘_보드.html): 대화형 시각형 알고리즘 보드 (15개 탭, 95개 노드)
- [docs/토익_스터디_앱_전체_알고리즘_보드.md](docs/토익_스터디_앱_전체_알고리즘_보드.md): 알고리즘 보드 명세서 마크다운

---

## 상표권 고지

- TOEIC® is a registered trademark of ETS. This application is not endorsed or approved by ETS.
- 본 애플리케이션은 ETS의 공식 제품이 아니며, ETS와 어떠한 제휴 또는 보증 관계도 없습니다.
