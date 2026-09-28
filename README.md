# 보카 스터디

> TOEIC® 시험 대비를 포함한 개인 영어단어 학습 PWA. 별도의 APK/IPA 설치 파일 없이 URL에 접속하여 앱을 사용하고, Chrome/Safari에서 휴대폰 홈 화면에 설치해 일반 앱처럼 실행하는 설치형 웹앱 (PWA).

---

## 1. 아키텍처 개요

- **플랫폼 형태**: Progressive Web App (PWA, 설치형 웹앱)
- **프론트엔드**: React + TypeScript + Vite
- **배포 파이프라인**: GitHub `main` → Cloudflare Workers Builds → Cloudflare Workers + Static Assets
- **로컬 저장소**: IndexedDB (Dexie 계층) — 100% 기기 내부 저장 (오프라인 학습 지원, 서버 저장 제로)
- **PDF 처리 엔진**: PDF.js (브라우저 메모리 내부 파싱 및 텍스트 레이어 검출, Canvas 렌더링)
- **OCR 처리 엔진**: 브라우저 온디바이스 OCR 추론 계층 (`OcrEngine` 표준 인터페이스 기반)

---

## 2. 주요 기능

1. **기본 TOEIC 문제풀이**: 검증된 TOEIC 빈출 어휘 4지선다 퀴즈 및 즉시 채점
2. **사진으로 문제 만들기**: 종이책 단어장 촬영/사진에서 영단어·뜻 자동 추출 (File API)
3. **PDF로 문제 만들기**: PDF.js 기반 전자문서 텍스트 직접 추출 및 스캔본 Canvas 파싱
4. **PWA 홈 화면 설치**:
   - Android Chrome: 원클릭 PWA 설치 지원
   - iPhone Safari: 공유 시트 → '홈 화면에 추가' 가이드 제공
5. **완전한 오프라인 지원**: Service Worker를 통한 앱 셸 및 필수 에셋 프리캐싱

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
- [docs/토익_스터디_앱_전체_알고리즘_보드.html](docs/토익_스터디_앱_전체_알고리즘_보드.html): 대화형 시각형 알고리즘 보드 (13개 탭, 76개 노드)
- [docs/토익_스터디_앱_전체_알고리즘_보드.md](docs/토익_스터디_앱_전체_알고리즘_보드.md): 알고리즘 보드 명세서 마크다운

---

## 상표권 고지

- TOEIC® is a registered trademark of ETS. This application is not endorsed or approved by ETS.
- 본 애플리케이션은 ETS의 공식 제품이 아니며, ETS와 어떠한 제휴 또는 보증 관계도 없습니다.
