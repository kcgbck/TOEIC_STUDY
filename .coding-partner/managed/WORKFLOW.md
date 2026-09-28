# Coding Partner Workflow Contract

This contract is self-contained for projects using the independent instruction structure. Do not require legacy `.agents/close-contract.md`, local skill files, or optional Obsidian index notes to execute these commands.

## `작업시작` / `작업 시작`

Resume work in the current repository. Do not ask the user to choose a task when the current conversation or project handoff already identifies one.

1. Use the current conversation when it already contains the project, current stage, recent results, Git baseline, next task, and important blockers.
2. Otherwise, read `project_status.md` and `docs/partner/CURRENT.md` when they exist. If the repository already tracks a case-variant such as `PROJECT_STATUS.md`, use that existing path and do not create a duplicate. Missing files are an empty initial state, not an installation error.
3. Check the current branch, HEAD, and working-tree status. Preserve and classify existing changes; do not reset, restore, clean, stash, stage, commit, or push them.
4. Before changing project files, create `.agent-state/` when needed and save `.agent-state/session-baseline.json`. Use schemaVersion `1`, a UTC ISO-8601 capture time, Git repository/branch/HEAD state, and structured `preexistingEntries` from the current working-tree status. This local, ignored file is created by `작업시작`, never by installation.
5. Report the recovered stage and next safe task briefly, then continue the identified work.

Ask one focused question only when the repository is wrong or ambiguous, no next task can be recovered, equally ranked tasks conflict, or the next action needs destructive, paid, credential, deployment, or external-transfer approval.

## `저장해줘`

Record a concise handoff for the current project, then selectively commit only the status files this command directly updates: `project_status.md` and `docs/partner/CURRENT.md`. This command never authorizes push or any separate Apply operation.

1. Check the current branch, HEAD, and working-tree status.
2. If `.agent-state/session-baseline.json` exists and is valid, use it only to distinguish paths that were already dirty. If it is absent or invalid, state that exact attribution is unavailable; do not guess.
3. Create or update `project_status.md` with the latest work summary, changed-file intent, verification actually run, failures and final resolution, remaining work, cautions, and the next starting point. If a case-variant such as `PROJECT_STATUS.md` already exists, update that existing path instead of creating a second file. Preserve useful earlier handoff history.
4. Create or update `docs/partner/CURRENT.md` as a short current-state page containing the current goal, completed work, verification, remaining work, cautions, and next starting point. Create `docs/partner/` only when this command needs to create `CURRENT.md`.
5. Preserve existing project prose, language, encoding, newline style, and Obsidian links where practical. Do not add links to notes that do not exist.
6. Never copy raw diffs, full logs, secrets, credentials, private user data, or sensitive command output into either status document.
7. Before updating the status documents, record whether `project_status.md` and `docs/partner/CURRENT.md` are already dirty or staged. Only a status file this command actually updates and that was clean before the close flow is an automatic-commit candidate.
8. Stage only those candidates, run `git diff --cached --check` and inspect `git diff --cached --name-status`, then commit with a Korean summary of the status update (50 characters or fewer). Never use `git add .` or `git add -A`.
9. Report the commit result, status files left uncommitted for protection, and that push was not performed. Remove the session baseline only after this result is recorded.

Do not require recording candidates, preview/apply machinery, Knowledge Cards, or other optional documentation to complete this basic save flow.
