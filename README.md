# daily-zerotrust

[daily.zerotrust.admin.news](https://daily.zerotrust.admin.news): a readable
daily record of what changed across Microsoft's security guidance on Learn:
Zero Trust, the security adoption framework and CISO workshop, security
operations, privileged access, ransomware, AI security, the Secure Future
Initiative, security engineering and the Trusted Root Program.

This repository holds the product: its configuration, its assets, and its
generated site. The generator, the workflows' steps and the test suite live in
[merill/dailynews-engine](https://github.com/merill/dailynews-engine).

## What it tracks

[`merill/security-docs-mirror`](https://github.com/merill/security-docs-mirror):
every page under `learn.microsoft.com/security/`, rebuilt as Markdown by
[learn-mirror](https://github.com/merill/learn-mirror) four times a day. The
guidance publishes from `MicrosoftDocs/security-pr`, which is not public, so the
mirror's history is the only change history there is. It begins on 4 November
2026; the first commit is the initial import, and the archive starts the day
after.

Pages publish at `security/<path>`, with one exception: thirteen pages in
`zero-trust/` publish in Learn's adoption and operations sections (for example
`zero-trust/microsoft-reference-architecture.md` is `security/adoption/mcra`,
and the incident response playbooks are under `security/operations/`). Each of
those has its own route in `dailynews.config.js`, so links go to the canonical
URL. The test suite checks every route against every URL the crawl fetched.

Areas come from folders: `zero-trust/sfi`, `zero-trust/develop`,
`privileged-access-workstations`, `ransomware`, `security-for-ai` and
`ai-red-team`, `engineering`, `trusted-root`. Within `zero-trust/` itself, file
names separate the adoption framework, security operations and privileged access
pages from the core Zero Trust guidance, which is the default.

## v1 has no email

`email: { enabled: false }`. The site is the whole product for now.

## Working on it

```bash
npm run engine:link     # links ../dailynews-engine into node_modules
npm run docs:clone      # clones the mirror into security-docs/
npm test
TZ=UTC npm run build:site
npm run dev
```

`TZ=UTC` matters: without it every date bucket shifts.

## Deploying

Cloudflare Pages, connected to this repository: production branch `main`, no
build command, output directory `website`. Repository secrets: `OPENAI_API_KEY`
(summaries); optionally `DISCORD_WEBHOOK_URL` and `HEALTHCHECKS_PING_URL`.
