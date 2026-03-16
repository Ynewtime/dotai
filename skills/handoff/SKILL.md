---
name: handoff
description: Generate an agent-to-agent handoff summary when context is too long and work needs to continue in a new session. Use when the user says "handoff", "交接", "context too long", "新会话继续", or when wrapping up a long session to preserve working state for the next agent.
---

# Handoff

Generate a structured handoff document at `./{yymmdd}-handoff.md` (e.g., `260316-handoff.md`) for the next AI agent to cold-start and continue the current work.

## Process

1. Review the full conversation to extract actionable state
2. Determine the output filename using today's date in `yymmdd` format
3. If a file with the same name already exists, append a sequence number (e.g., `260316-handoff-2.md`)
4. Write the handoff document following the template below

## Template

Use this exact structure. Every section is required. Be specific — reference file paths, class names, module names, interface names, commands, and decision points by name.

```markdown
# Handoff Summary — {yymmdd}

## 1. Current Objective
The problem to solve, expected output, and completion criteria.

## 2. Progress So Far
Analysis, confirmations, changes, investigations, discussions, or deliverables completed. Use checklist to mark completion state.

## 3. Key Context
- Important background information
- Explicit user requirements
- Known constraints
- Key decisions made and their rationale
- Important assumptions

## 4. Key Findings
Most important conclusions, patterns, anomalies, root cause judgments, design decisions, or noteworthy information.

## 5. Remaining Work
Items still to be addressed, ordered by priority.

## 6. Recommended Handoff Path
- Which files, modules, data, logs, commands, pages, or leads to check first
- What to verify first
- Recommended next steps

## 7. Risks and Caveats
Points prone to misjudgment, duplicated effort, or going off-track. Directions already explored that are not worth pursuing further.

---

## Suggested First Step for the Next Agent
A specific, immediately actionable first step.
```

## Writing Guidelines

- This is an agent-to-agent document, not a user-facing summary
- Maximize actionable information density — no filler, no pleasantries
- Prefer concrete names (file paths, class names, CLI commands) over abstract descriptions
- Include exact error messages, version numbers, or config values when relevant
- For "Progress So Far", use `- [x]` / `- [ ]` checklist format to show completion state
- For "Remaining Work", number items by priority (P0, P1, P2)
- For "Recommended Handoff Path", write commands the next agent can copy-paste to verify state
