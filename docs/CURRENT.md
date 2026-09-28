# 토익_스터디 현재 상태 (PWA-02 기준선 고정)

## 아키텍처
PWA (Progressive Web App, 설치형 웹앱)

## 프론트엔드
React 18 + TypeScript 5 + Vite 6

## 배포
- GitHub main: https://github.com/kcgbck/TOEIC_STUDY
- Cloudflare Workers 실서비스: https://toeic-study.heyruler0011.workers.dev
- 배포 모델: Cloudflare Workers + Static Assets

## 저장소 및 안전성
- IndexedDB (Dexie 계층, 100% 브라우저 로컬 저장)
- StorageHealth (영속성 확인 및 요청, 사용량 견적)
- JSON 백업/복원 (toeic_study_backup_YYYYMMDD.json, 스키마 v1 검증)

## Safari 저장 정책 명시
- 일반 Safari 사이트는 ITP의 저장소 정책 영향을 받을 수 있으나, iPhone 홈 화면에 standalone 웹앱으로 설치된 1차 도메인은 WebKit의 ITP 7일 스크립트 저장소 삭제 정책에서 명시적인 예외로 취급됨.
- 단, 기기 저장공간 압박이나 사용자 데이터 삭제에 대비하여 JSON 백업/복원 수단을 기본 제공함.

## 문서 및 OCR 처리
- PDF: PDF.js 브라우저 메모리 파서 (docs/샘플.pdf 표본 기준 100/100 단어 추출 확인)
- 사진 OCR: 2면 펼침면 감지(detectSpreadLayout) 및 2단 분할 + 2배 확대 전처리 + 온디바이스 Tesseract.js WASM 어댑터 (docs/샘플.png 표본 기준 목표 표제어 검출 확인)
- 개인정보 보호: 사진, PDF, 학습 기록 등 사용자 문서의 서버 전송 0건 (USER_DOCUMENT_UPLOADS = 0)

## 현재 단계
PWA-02 실서비스 기준선 고정 및 안전화 완료

## 완료된 항목
- 공개 정적 자산에서 상용 교재 샘플(sample.pdf, sample.png) 완전 제거
- 프로덕션 UI에서 샘플 자동 불러오기 버튼 제거 (사용자 자체 파일 선택만 허용)
- 자동 테스트를 상용 교재 원본과 분리하고 합성 시험 fixture(tests/fixtures/) 도입
- 과장된 검증 표현 정정 및 Safari ITP 정책 명문화
- StorageHealth 진단 및 JSON 데이터 백업/복원 구현
- 빌드 버전 및 Git SHA 주입 (__APP_VERSION__, __GIT_SHA__)
- 4지선다 퀴즈 출제 문자열 유일성 검증
- 단위 테스트 4개 스위트 통과

## 다음 단계
1. 4지선다 출제 엔진 동의어 필터링(Hard Gate) 사전 연계
2. 자체 검증 기본 어휘 데이터셋 확대 (2,000+ 단어)
