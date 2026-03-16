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

## 1. 当前任务目标
要解决的问题、预期产出、完成标准。

## 2. 当前进展
已完成的分析、确认、修改、排查、讨论或产出。用 checklist 标记完成状态。

## 3. 关键上下文
- 重要背景信息
- 用户的明确要求
- 已知约束
- 已做出的关键决定及理由
- 重要假设

## 4. 关键发现
最重要的结论、规律、异常点、根因判断、设计判断或值得注意的信息。

## 5. 未完成事项
按优先级排序，列出仍需继续处理的内容。

## 6. 建议接手路径
- 应优先查看哪些文件、模块、数据、日志、命令、页面或线索
- 应先验证什么
- 推荐的下一步动作

## 7. 风险与注意事项
容易误判、重复劳动或跑偏的点。已验证过且不建议继续的方向。

---

## 下一位 Agent 的第一步建议
具体的、可立即执行的第一步动作。
```

## Writing Guidelines

- This is an agent-to-agent document, not a user-facing summary
- Maximize actionable information density — no filler, no pleasantries
- Prefer concrete names (file paths, class names, CLI commands) over abstract descriptions
- Include exact error messages, version numbers, or config values when relevant
- For "当前进展", use `- [x]` / `- [ ]` checklist format to show completion state
- For "未完成事项", number items by priority (P0, P1, P2)
- For "建议接手路径", write commands the next agent can copy-paste to verify state
