# dotai

Personal AI agent toolkit — skills, hooks, and scripts for Claude Code and other AI coding agents.

## Skills

Installable via [`npx skills`](https://skills.sh/):

```bash
npx skills add Ynewtime/dotai
```

| Skill | Description |
|-------|-------------|
| [chrome-cdp](skills/chrome-cdp/) | Interact with local Chrome browser via DevTools Protocol — no Puppeteer, works with 100+ tabs |
| [handoff](skills/handoff/) | Generate agent-to-agent handoff summary when context is too long |
| [markitai](skills/markitai/) | Convert 30+ document formats and URLs to clean Markdown with optional LLM enhancement |

## Hooks

| Hook | Description | Install |
|------|-------------|---------|
| [cc-notify](hooks/cc-notify/) | Tab progress animation + desktop toast notifications for Claude Code | [README](hooks/cc-notify/README.md) |

## Scripts

Standalone portable scripts (coming soon).

## License

MIT
