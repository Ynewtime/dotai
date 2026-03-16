---
name: chrome-cdp
description: Interact with local Chrome browser session (only on explicit user approval after being asked to inspect, debug, or interact with a page open in Chrome)
---

# Chrome CDP

Lightweight Chrome DevTools Protocol CLI. Connects via WebSocket — no Puppeteer, works with 100+ tabs, instant connection.

## Prerequisites

- Chrome with remote debugging enabled: `chrome://inspect/#remote-debugging` → toggle switch
- Bun (or Node.js 22+)

## Core workflow

```bash
scripts/cdp.mjs list                          # list open pages (shows target prefixes)
scripts/cdp.mjs snap <target>                 # accessibility tree snapshot
scripts/cdp.mjs shot <target> [file]          # screenshot (prints DPR + coordinate mapping)
scripts/cdp.mjs eval <target> <expr>          # evaluate JS expression
```

`<target>` is a unique targetId prefix from `list` (e.g. `6BE827FA`). Ambiguous prefixes are rejected.

## Other commands

```bash
scripts/cdp.mjs html    <target> [selector]      # full page or element HTML
scripts/cdp.mjs nav     <target> <url>            # navigate and wait for load
scripts/cdp.mjs net     <target>                  # resource timing entries
scripts/cdp.mjs click   <target> <selector>       # click by CSS selector
scripts/cdp.mjs clickxy <target> <x> <y>          # click at CSS pixel coords
scripts/cdp.mjs type    <target> <text>            # insert text at current focus
scripts/cdp.mjs loadall <target> <selector> [ms]   # click "load more" until gone
scripts/cdp.mjs evalraw <target> <method> [json]   # raw CDP command passthrough
scripts/cdp.mjs stop    [target]                   # stop daemon(s)
```

## Tips

- `shot` output is native resolution (CSS px × DPR). `clickxy` takes **CSS pixels**: divide screenshot coords by DPR.
- Prefer `snap` over `html` for understanding page structure — much smaller output.
- Use `type` (not eval) for cross-origin iframes — `click`/`clickxy` to focus first, then `type`.
- Avoid index-based DOM selection across multiple `eval` calls when the DOM can change between them. Use stable selectors or collect all data in one `eval`.
- Chrome shows an "Allow debugging" modal once per tab. A daemon keeps the session alive; auto-exits after 20 min idle.

## Credits

Based on [pasky/chrome-cdp-skill](https://github.com/pasky/chrome-cdp-skill) by Petr Baudiš. MIT License.
