# 토익_스터디 현재 상태

## 아키텍처
PWA (Progressive Web App, 설치형 웹앱)

## 프론트엔드
React + TypeScript + Vite

## 배포
GitHub main → Cloudflare Workers Builds (Cloudflare Workers + Static Assets)

## 저장
IndexedDB (Dexie 계층)

## PDF
PDF.js (브라우저 메모리 직접 텍스트 추출 및 Canvas 렌더링)

## OCR
기술검증 전 (인터페이스 OcrEngine 정의 후 Tesseract.js / WASM / ONNX Web 비교 예정)

## 현재 단계
PWA 구조전환 및 개발 착수

## 완료
- 아키텍처 결정 레코드 작성 (docs/ADR-001_PWA_구조전환.md)
- 마스터 플랜 v2 PWA 기준 갱신 (docs/TOEIC_단어학습앱_개발_마스터플랜.md)
- 전체 시각형 알고리즘 보드 PWA/Web 표준 정합화 (docs/토익_스터디_앱_전체_알고리즘_보드.md, .html)
- React + TypeScript + Vite 기반 PWA 프로젝트 골격 구축
- Web App Manifest (manifest.webmanifest) 및 반응형 앱 아이콘(192x192, 512x512, apple-touch-icon) 연동
- Service Worker 등록 및 오프라인 앱 셸 프리캐싱 파이프라인
- Chrome PWA 설치 감지 및 Safari 홈 화면 추가 안내 UI
- IndexedDB 연결 및 데이터 쓰기/읽기/영속성 POC
- 브라우저 File API 기반 사진/문서 선택 POC
- PDF.js 기반 전자문서 페이지 수 확인, 텍스트 추출 및 Canvas 렌더링 POC
- 특정 엔진 비종속적 브라우저 OcrEngine 인터페이스 정의
- 단위 테스트 작성 및 npm build 통과

## 미완료
- 실제 TOEIC 단어책 표본 기반 브라우저 OCR 엔진 비교 벤치마크 및 1종 확정
- 기본 TOEIC 2,000+ 자체 어휘 데이터베이스 전체 패키징
- 4지선다 출제 엔진 고도화 (동의어 배타성 검사 세부 사전 바인딩)
- 문제집 및 학습 기록 JSON 백업 / 복원(내보내기) 기능

## 다음 단계
P0-B 브라우저 OCR 엔진 실제 비교 검증 (실제 단어책 사진 표본 기반 영단어/한글뜻 인식률 계측)
