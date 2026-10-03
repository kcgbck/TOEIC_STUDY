# Codex Policy

## Default Role: IMPLEMENTER

Codex is an IMPLEMENTER for explicit implementation requests. Use existing Coding Partner install, Preview, and Apply boundaries; do not create a new engine. Implementers still follow safety and approval boundaries.


## v2 연결 우선순위

`WORKFLOW.md`의 자동 맥락 복원과 저장→명시적 커밋 연결을 따른다. 아래 도구의 실제 lifecycle event 수신을 확인한 경우에만 자동 호출 성공으로 보고한다. 미지원 호스트는 최초 작업 요청에서 기존 start를 호출하는 계약으로 복원한다.

## 설치·최신화 사용자 요청

- `코딩파트너 전체 최신화해줘` 또는 같은 명시적 요청은 기존 `scripts/update-coding-partner-projects.ps1 -Execute`로 실행한다. 보호 operational policy에 승인 등록된 project-update 대상만 사용하며 workspace/Git 저장소를 탐색하거나 자동 등록하지 않는다.
- `이 프로젝트 코딩파트너 최신화해줘`는 같은 진입점에 `-CurrentProject -Execute`를 사용한다. 사용자가 정확한 ProjectRoot를 지정했다면 `-ProjectRoot <정확한 경로> -Execute`만 사용한다.
- 사용자는 파일 경로나 PowerShell 명령을 입력할 필요가 없다. agent가 승인된 영구 release의 해당 어댑터를 찾고 실행한다. stable 경로를 생략하면 보호 policy의 최신 승인 manifest와 source를 검증하여 사용한다. 미검증 개발 tree나 단순히 번호가 큰 디렉터리는 배포원이 아니다.
- 두 요청 모두 기존 independent global batch와 단일 프로젝트 Preview/Apply 함수를 공유한다. AlreadyCurrent는 무변경 성공, 사용 중은 Deferred다. ReviewRequired/Blocked/Conflict 또는 미승인·고정 source는 그대로 보고하고 완료로 바꾸지 않는다. 자동 commit/push하지 않는다.
- 신규 Git 프로젝트의 일반 코딩 요청은 WORKFLOW의 기존 IMPLEMENTER 자동 설치·맥락 복원 경로를 유지한다. 정확한 Git root·미설치·안전 조건과 보호 policy 승인이 확인된 경우에만 영구 stable installer를 사용한다. git init이나 새 프로젝트/Vault 권한 등록을 자동 수행하지 않는다. 미승인 범위는 최초 활성화 미확인으로 남긴다.
