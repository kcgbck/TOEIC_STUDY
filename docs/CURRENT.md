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

## 현재 상태 판정 (P0-C 검증 완료)
- `PDF_IMPORT_BASELINE = PASS` (docs/샘플.pdf 100/100 무손실 유지)
- `PHOTO_OCR_EXTRACTION = PASS` (기하학적 열 격리, 경계 침범 차단, 3단계 신뢰도, 8종 합성 fixture 통과)
- `QUIZ_SEMANTIC_UNIQUENESS = PASS` (Hard Gate 통과, BLOCK 동의어 및 추가 뜻 오답 0건, 1,000회 시험 PASS)
- `CURRENT_STAGE = P0_PHOTO_AND_QUIZ_QUALITY_PASS`

## 완료된 핵심 P0 작업
1. **P0-A (사진 OCR 품질 및 안전화)**:
   - `docs/샘플.png` 표본 `lack`, `diligent` 실패 원인 정밀 실측 규명 (좌표/원문 로그 기반)
   - 기하학적 열 분리: `LEFT`와 `RIGHT` 열 간 단어-뜻 연결 완전 격리 (열 침범 0건)
   - 표제어 경계 보장: 다음 표제어 Y좌표 이전까지만 뜻 수집 (다음 단어 뜻 침범 0건)
   - 3단계 신뢰도 판정 (`wordConfidence`, `meaningConfidence`, `pairConfidence`: HIGH / MEDIUM / LOW)
   - 자동 철자 교정 금지 및 추천(recommendation) 분리 (지시서 8항 준수)
   - **가장 중요한 관문**: 낮은 신뢰도(`low`) 단어의 자동 문제집 저장 0건 강제 (사용자 명시 검토 필터 제공: 전체/오류의심/확인필요)
   - 8종 합성 fixture (`tests/fixtures/synthetic_ocr_8types.json`) 테스트 100% 통과

2. **P0-B (4지선다 출제 품질 및 정답 유일성 Hard Gate)**:
   - `validateQuestionUniqueness()` Hard Gate 구현 (보기=4, 문자열 중복=0, 정답포함=1, 정답index=1)
   - 동의어/다의어 의미 중복 차단 (`SYNONYM_BLOCK_PAIRS`, SAFE / REVIEW / BLOCK 체계)
   - 정답의 추가 뜻(다의어)을 다른 단어의 오답 보기로 사용하는 오류 원천 차단 (0건)
   - 1,000회 반복 생성 시험 (시드 재현성 보장, 결함 0건) 통과
   - PDF 100단어 전체 출제 시험 (100/100 단어 전수 출제 성공, 실패 0건) 통과
   - 기본 문제풀이 UI 연결: 진행률 표시 및 답변 전 `[다음]` 버튼 비활성화

## 검증 내역
- `npm run typecheck`: 통과 (오류 0건)
- `npm run test`: 7개 테스트 스위트, 25개 테스트 전체 통과
- `npm run build`: 프로덕션 정적 번들 정상 빌드 완료
- `USER_DOCUMENT_UPLOADS`: 0건 (완전 브라우저 로컬 온디바이스 처리)

## 다음 단계
- (P0 완료 후) 자체 검증 기본 어휘 데이터셋 확대 (TOEIC 2,000+ 단어 DB 구축)


