# 토익_스터디 - Coding Partner 현재 상태 (PWA-02 기준선 고정)

## 현재 목표
- PWA-02 실서비스 기준선 고정 및 안전화
- 상용 샘플 파일 공개 배포 제거 및 저작권 분리
- StorageHealth 및 JSON 백업/복원 기능 구축
- Git / GitHub / Cloudflare Workers 배포 소스 정렬

## 배포 현황
- GitHub 저장소: https://github.com/kcgbck/TOEIC_STUDY
- Cloudflare 실서비스 URL: https://toeic-study.heyruler0011.workers.dev
- 배포 모델: Cloudflare Workers + Static Assets

## 완료된 작업
- public 공개 자산에서 샘플 파일(sample.pdf, sample.png) 제거 및 .gitignore 추가
- 프로덕션 UI에서 샘플 자동 로드 버튼 제거
- 자동 테스트용 합성 fixture(tests/fixtures/) 분리 및 테스트 통과
- Safari 7일 ITP 예외 명문화 및 과장된 표현 정정
- StorageHealth 진단 및 JSON 데이터 백업/복원(v1) 구현
- 버전 및 Git SHA 주입
- 전처리 단계별 실측(Step A~D) 및 detectSpreadLayout 안전장치 적용

## 검증 내역
- `npm run typecheck`: 통과
- `npm run test`: 4개 테스트 스위트 통과
- `npm run build`: 통과
- `USER_DOCUMENT_UPLOADS = 0` (서버 전송 없음)
