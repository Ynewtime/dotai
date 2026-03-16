---
name: markitai
description: Convert documents, URLs, and images to clean Markdown using Markitai CLI. Use when the user asks to convert files (DOCX, PDF, PPTX, XLSX, HTML, images, etc.) or URLs to Markdown, extract text from documents, fetch and convert web pages, batch-process a directory of files, or enhance Markdown output with LLM. Triggers on "convert to markdown", "extract text", "fetch this page", "markitai", or any document-to-markdown workflow.
---

# Markitai

Opinionated Markdown converter with LLM enhancement. Converts 30+ formats (DOCX, PDF, PPTX, XLSX, images, URLs, HTML, EPUB, CSV, etc.) to clean Markdown.

## Setup

Requires Python 3.11–3.13.

**One-click (recommended):**
```bash
# Linux/macOS
curl -fsSL https://raw.githubusercontent.com/Ynewtime/markitai/main/scripts/setup.sh | sh

# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://raw.githubusercontent.com/Ynewtime/markitai/main/scripts/setup.ps1 | iex"
```

**Manual:**
```bash
uv tool install markitai                    # core
uv tool install 'markitai[browser]'         # + Playwright (JS-rendered URLs)
uv tool install 'markitai[claude-agent]'    # + Claude Code CLI provider
uv tool install 'markitai[copilot]'         # + GitHub Copilot provider
uv tool install 'markitai[all]'             # everything
```

**First run:**
```bash
markitai doctor --fix    # check deps and auto-fix
markitai -I              # interactive guided setup (recommended for new users)
```

## Core usage

```bash
# Single file → stdout
markitai document.docx

# Single file → output directory
markitai document.pdf -o ./output

# URL → output directory (required for URLs)
markitai https://example.com -o ./output

# Directory (batch) → output directory
markitai ./docs -o ./output

# URL list (.urls file, one URL per line)
markitai urls.urls -o ./output
```

## Output structure

```
output/
├── document.docx.md            # Markdown (skipped in --llm mode unless --keep-base)
├── document.docx.llm.md        # LLM-enhanced version (when --llm)
└── .markitai/
    ├── assets/                  # extracted images
    ├── screenshots/             # page/slide screenshots (with --screenshot)
    ├── reports/                 # batch conversion reports (JSON)
    └── states/                  # batch state files (for --resume)
```

In `--llm` mode, only `.llm.md` is written. Use `--keep-base` to also write the base `.md`.

## Presets

| Preset | LLM | Alt text | Descriptions | Screenshots | OCR |
|--------|-----|----------|-------------|-------------|-----|
| `--preset minimal` | off | off | off | off | off |
| `--preset standard` | on | on | off | off | on |
| `--preset rich` | on | on | on | on | on |

Default behavior without `--preset`: LLM off, OCR off, screenshots off.

## Key options

**LLM enhancement:**
- `--llm / --no-llm` — enable/disable LLM post-processing
- `--alt / --no-alt` — generate image alt text (requires `--llm`)
- `--desc / --no-desc` — generate image descriptions (requires `--llm`)
- `--pure` — skip frontmatter and post-processing

**URL fetch strategy** (auto-detected by default):
- `--defuddle` — Defuddle API (best cleaning, free)
- `--jina` — Jina Reader API
- `--playwright` — headless browser (JS-rendered pages)
- `--cloudflare` — Cloudflare cloud backend

**Screenshots & OCR:**
- `--screenshot / --no-screenshot` — capture pages/slides as images
- `--screenshot-only` — screenshots only, no text extraction
- `--ocr / --no-ocr` — OCR for scanned documents

**Batch & performance:**
- `-j, --batch-concurrency <N>` — concurrent file processing (default: 15)
- `--resume` — resume interrupted batch job
- `--dry-run` — preview without writing
- `-g, --glob <pattern>` — filter files (repeatable, `!` to exclude)
- `--max-depth <N>` — directory scan depth

**Cache:**
- `--no-cache` — disable LLM result caching
- `--no-cache-for <patterns>` — bypass cache for specific files
- `--keep-base` — keep base `.md` alongside `.llm.md`

**Output & logging:**
- `-o, --output <path>` — output directory
- `-v, --verbose` / `-q, --quiet`
- `-I, --interactive` — guided setup wizard

## LLM providers

**Local providers** (use existing subscriptions, no API keys):

| Provider prefix | Example | Setup |
|----------------|---------|-------|
| `claude-agent/` | `claude-agent/sonnet` | `claude` CLI installed |
| `copilot/` | `copilot/gpt-4.1` | `gh copilot` installed |
| `chatgpt/` | `chatgpt/gpt-5.2` | `markitai auth login chatgpt` |
| `gemini-cli/` | `gemini-cli/gemini-2.5-pro` | `markitai auth login gemini-cli` |

**Standard providers** (via LiteLLM, API keys required):
OpenAI, Anthropic, Google, DeepSeek, OpenRouter, etc.

Configure in `~/.markitai/config.json` or `./markitai.json`. Use `markitai config set` to update.

## Subcommands

```bash
markitai config list              # show effective config
markitai config set <key> <val>   # set config value
markitai cache stats              # cache statistics
markitai cache clear              # clear cache
markitai auth status              # check provider auth
markitai auth login <provider>    # authenticate
markitai doctor                   # health check
markitai doctor --fix             # auto-fix issues
markitai init                     # generate config template
```

## Common workflows

**Convert a PDF with LLM cleanup:**
```bash
markitai report.pdf --llm -o ./output
```

**Batch-convert a folder of Office docs:**
```bash
markitai ./documents -o ./markdown -g '*.docx' -g '*.pptx' -j 10
```

**Fetch and convert a JS-heavy page:**
```bash
markitai https://spa-site.com --playwright -o ./output
```

**Rich conversion with screenshots and image descriptions:**
```bash
markitai presentation.pptx --preset rich -o ./output
```

**Resume an interrupted batch job:**
```bash
markitai ./large-folder -o ./output --resume
```
