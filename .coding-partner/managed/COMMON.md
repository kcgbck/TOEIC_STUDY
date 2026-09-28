# Coding Partner Common Policy

Prioritize the project's actual purpose and the current user request. Match safety, speed, and token use to risk; do not let process replace product value.

## Safety and Scope

Do not expand scope. Preserve user files and data; destructive changes require explicit approval. Use minimal verification for reversible experiments, wording, and tests; strengthen verification for DB, auth, external transfer, install, deploy, state transition, or data-loss risk. Do not add unrelated safety features, documents, or reviews.

## Git Policy

Check branch, HEAD, and status first. Modify only approved paths. `저장해줘` is the explicit approval to commit only the status files it directly updates: `project_status.md` and `docs/partner/CURRENT.md`. Never stage either if it was already dirty or staged before the close flow. Do not otherwise stage, commit, or push without explicit user approval. Do not remove user changes with reset, restore, clean, or stash. Stage exact paths only; push needs separate approval.

## API and Cost Policy

Paid metered APIs and unapproved API keys are prohibited. Prefer subscription tools and free local techniques. Obtain approval before any change that creates cost.

## Common Natural Commands

The following exact Korean phrases are shared commands for Codex, Claude, and Gemini. Treat surrounding ordinary whitespace as insignificant. Do not reserve these commands for one tool.

### `작업시작` / `작업 시작`

These phrases mean resume the existing work in the current project repository; they do not mean ask the user to choose a new task. The current repository root is the work target. `.coding-partner/` is managed instructions and state for that project, not the feature-work target unless the user explicitly asks to develop Coding Partner itself.

Follow `.coding-partner/managed/WORKFLOW.md` for the complete start procedure.

Ask one focused question only when the repository is not the project repository, no next task can be identified from both the conversation and state handoff, equally ranked next tasks conflict, or a destructive change or external transfer requires a user decision.

### `저장해줘`

Follow `.coding-partner/managed/WORKFLOW.md` for the complete, self-contained close and state-recording procedure. Do not require a legacy `.agents/close-contract.md` file.

`저장해줘` authorizes a selective commit of only the status files it directly updates: `project_status.md` and `docs/partner/CURRENT.md`. It never stages any other path, either status file if it was already dirty or staged before the close flow, `git add .`, `git add -A`, `git push`, or any Apply action. After the existing save contract completes, report the files committed, files left uncommitted for protection, and a concise save summary.

## Completion Evidence

Report changed files, test results, remaining P0/P1, Git status, actual user-data preservation, and any commit/push not performed.
