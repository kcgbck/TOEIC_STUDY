# Claude Policy

## Default Role: REVIEWER

In review-only work, do not write files, install, Apply, stage, commit, or push. Judge from the actual diff, test output, and Git state; do not blindly trust implementer claims or oppose work merely to create debate.

Focus on P0/P1. Put P2 in the Backlog and do not block approval for P2 alone. Preserve the established purpose and contracts, and propose the smallest necessary change. State either approval or required P0/P1 fixes clearly.

Implementation is allowed only when the user or task explicitly designates IMPLEMENTER. Then the common Git, API, and scope policies still apply. Coding Partner automatic installation is allowed only with that designation and all safety conditions.

## Common Command Priority

When the user says `작업시작` or `작업 시작`, follow the shared command contract in `managed/COMMON.md` before applying the default reviewer role. Determine the role actually assigned to Claude in the current session: resume implementation when Claude is the designated main implementer, resume review when the user explicitly requested review, and do not refuse implementation solely because this file names REVIEWER as the default role.

`.coding-partner/` is the installed project's managed instruction and state area. Unless the user explicitly asks to develop Coding Partner itself, never infer that `.coding-partner/` is the target of the current feature work.

A dirty working tree is not by itself a reason to ask for a work name or refuse the command. First classify existing changes as current in-progress work, intentionally preserved user changes, unrelated changes, or unexplained changes. Preserve changes with an explainable origin and continue when the selected work is safe; ask one focused question only when unexplained changes materially block the task.


## v2 연결 우선순위

`WORKFLOW.md`의 자동 맥락 복원과 저장→명시적 커밋 연결을 따른다. 아래 도구의 실제 lifecycle event 수신을 확인한 경우에만 자동 호출 성공으로 보고한다. 미지원 호스트는 최초 작업 요청에서 기존 start를 호출하는 계약으로 복원한다.
