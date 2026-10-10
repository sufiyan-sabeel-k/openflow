# OpenFlow

Mobile-first text-to-speech web application focused on Indian languages.
This repository hosts the **static GitHub Pages demo**. Real voice generation
with Sarvam AI runs only when a separately hosted backend is configured —
GitHub Pages cannot execute server code.

- Repository: <https://github.com/sufiyan-sabeel-k/openflow>
- Live demo (verified HTTP 200 on 2026-10-10):
  <https://sufiyan-sabeel-k.github.io/openflow/>
- Creator: Umaiz Sufiyan

> Note: an earlier draft of these instructions contained the URL
> `https://sufiyan-sufiyan-k.github.io/openflow/`. That host is **not** used.
> The verified deployment URL is `https://sufiyan-sabeel-k.github.io/openflow/`.

## Table of contents

- [Features](#features)
- [Supported languages and voices](#supported-languages-and-voices)
- [Screenshots](#screenshots)
- [Live demo](#live-demo)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Sarvam AI integration](#sarvam-ai-integration)
- [Deployment](#deployment)
- [Authentication setup](#authentication-setup)
- [Security and privacy notes](#security-and-privacy-notes)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Creator](#creator)

## Features

### Working in this repository (static demo, verified in code)

| Feature | Evidence |
|---|---|
| Mobile-first responsive UI (375px–1440px patterns) | `index.html`, `login.html` use `max-w-md/md:2xl`, `min-w-0`, `min-h-[44/48px]` touch targets |
| Text input, max 2,500 chars, live counter | `index.html` `#tts-text`, `#char-count` |
| Language and voice selectors | `index.html` `#tts-lang`, `#tts-voice` |
| Form validation messages, password visibility toggle | `login.html` inline script |
| Login / Sign Up tab switching (UI only) | `login.html` `#tab-login`, `#tab-signup` |
| Honest “backend required” states, no fake success | `index.html` / `login.html` demo banners and script messages |
| Unique titles + meta descriptions, Open Graph + Twitter cards | Per-page `<head>` in each HTML file |
| Custom `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll` | Files in repo root, all return HTTP 200 except 404 page itself |
| Privacy template + FAQ (accurate-only, no schema) | `privacy.html`, `#faq` sections |
| GitHub Pages deploy workflow | `.github/workflows/pages.yml` |

### Planned / requires configuration (not working on Pages alone)

| Feature | Requirement |
|---|---|
| Real speech generation + download | PHP or Node backend calling Sarvam AI with server-side key |
| Real Google Sign-In / email + password | Supabase Auth project or PHP/MySQL backend (neither is wired in this repo) |
| OTP / phone auth | Not implemented here; needs a server-side provider |
| Persistent audio history | Backend database + object/file storage |
| Analytics | No Measurement ID configured; nothing is tracked |
| Branded PNG share image | `assets/img/og-cover.svg` placeholder exists; `og-cover.png` (1200×630) not yet exported |

No reviews, ratings, analytics IDs, or customer data are included or claimed.

## Supported languages and voices

Taken directly from `index.html` (no additions).

| Code | Language |
|---|---|
| `hi-IN` | Hindi |
| `bn-IN` | Bengali |
| `ta-IN` | Tamil |
| `te-IN` | Telugu |
| `gu-IN` | Gujarati |
| `kn-IN` | Kannada |
| `ml-IN` | Malayalam |
| `mr-IN` | Marathi |
| `pa-IN` | Punjabi |
| `od-IN` | Odia |
| `en-IN` | English |

Male voices (23): `shubh, aditya, rahul, rohan, amit, dev, ratan, varun, manan,
sumit, kabir, aayush, ashutosh, advait, anand, tarun, sunny, mani, gokal,
vijay, mohit, rehan, soham`

Female voices (14): `ritu, priya, neha, pooja, simran, kavya, ishita, shreya,
roopa, tanya, shruti, suhani, kavitha, rupali`

## Screenshots

No screenshots are available yet. Placeholders — do not treat these as real
captures:

- `docs/screenshots/index-mobile.png` — *TODO: add 390px capture of `index.html`*
- `docs/screenshots/login-mobile.png` — *TODO: add 390px capture of `login.html`*
- `docs/screenshots/desktop.png` — *TODO: add 1440px capture*

To add one: take the capture, save it under `docs/screenshots/`, and replace
the corresponding placeholder line with a relative link, e.g.
`![OpenFlow home](docs/screenshots/index-mobile.png)`.

## Live demo

Verified on 2026-10-10 (all HTTP 200):

- <https://sufiyan-sabeel-k.github.io/openflow/>
- <https://sufiyan-sabeel-k.github.io/openflow/login.html>
- <https://sufiyan-sabeel-k.github.io/openflow/privacy.html>
- <https://sufiyan-sabeel-k.github.io/openflow/robots.txt>
- <https://sufiyan-sabeel-k.github.io/openflow/sitemap.xml>

The demo is UI-only. Generation and login buttons display backend-required
messages and send no credentials anywhere.

## Technology stack

| Layer | Used here |
|---|---|
| Markup / style | HTML5, Tailwind CSS via CDN (`https://cdn.tailwindcss.com`) |
| Client logic | Vanilla JavaScript (inline, no build step, no framework) |
| Hosting | GitHub Pages (static files only) + GitHub Actions deploy workflow |
| Auth / TTS backend | **Not in this repo.** Optional paths: Supabase Auth, or a separately hosted PHP/Node API fronting Sarvam AI |

Supabase and Sarvam are documented below as configuration guides only.
Neither is wired into the static files in this repository.

## Getting started

Prerequisites:

- `git` and any static file server (Termux and Linux commands below).
- No build tools, no Node.js, no Composer required for the demo.

Clone and preview:

```bash
# Termux / Android or Linux
git clone https://github.com/sufiyan-sabeel-k/openflow.git
cd openflow

# Option A: Python (most systems)
python3 -m http.server 8000
# open http://localhost:8000/index.html

# Option B: Node (if installed)
npx serve .
```

Open `index.html` for the TTS demo and `login.html` for the auth UI demo.

## Configuration

All values below are placeholders. Never commit real keys.

### Supabase (optional, not wired in this repo)

If you later add Supabase Auth to a fork or companion app:

1. Create a project at `https://supabase.com` and note:
   - `SUPABASE_URL` (e.g. `https://xyzcompany.supabase.co`)
   - `SUPABASE_ANON_KEY` (publishable key **only** — never the `service_role` key)
2. Keep them out of git. Local pattern:

```bash
cp .env.example .env   # if your app uses one; this repo has no .env yet
```

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_ANON_KEY
```

3. In Supabase Dashboard → Authentication → URL Configuration, allow:
   - Site URL: `https://sufiyan-sabeel-k.github.io/openflow/`
   - Additional redirect: `https://sufiyan-sabeel-k.github.io/openflow/login.html`
4. Google provider: Supabase Auth → Providers → Google → Enabled, paste the
   Google OAuth Client ID / Secret there (secret stays in Supabase, not in git).
5. If you add a `profiles` table, enable Row Level Security so each user reads
   only their own rows. Example pattern (adapt to your schema):

```sql
alter table profiles enable row level security;

create policy "own profile"
on profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);
```

This repository currently contains **no Supabase client code and no
`profiles` table** — the above is a setup guide, not a claim of integration.

### Google OAuth (if you add a real backend)

1. Google Cloud Console → APIs & Services → Credentials → OAuth client ID →
   Web application.
2. Authorized JavaScript origin: `https://sufiyan-sabeel-k.github.io`
3. Authorized redirect URI: whatever your backend or Supabase requires
   (e.g. your Supabase callback URL or `.../login.html` handler you implement).
4. Client secret stays server-side (Supabase dashboard or backend env), never
   in HTML/JS.

### Backend base URL (when you build one)

The static demo hard-codes no backend URL. If you build an API, expose one
explicit config (e.g. `BACKEND_BASE_URL`) and keep the Pages demo pointing at
nothing until the API is reachable. Show a clear “backend not configured”
state rather than faking success.

## Sarvam AI integration

- The Sarvam API key **must remain on the server** (backend env variable or
  secret store). It must never appear in HTML, JS, or git history.
- Expected server-side call shape (backend only, not executed by this repo):

```http
POST https://api.sarvam.ai/text-to-speech
api-subscription-key: SERVER_SIDE_KEY
Content-Type: application/json

{
  "text": "Hello from OpenFlow",
  "target_language_code": "en-IN",
  "speaker": "shubh",
  "model": "bulbul:v3",
  "pace": 1.0
}
```

- GitHub Pages serves **static files only**. It cannot run PHP, Node.js,
  Python, or any credential-holding endpoint. Any `*.php` or key-bearing code
  pushed to Pages would be served as text or inert — so this repo contains
  neither.
- Host the TTS endpoint separately (VPS, Render, Fly.io, Cloud Run, shared
  PHP host, etc.), restrict CORS to your Pages origin, add server-side rate
  limiting and validation, and return short-lived audio URLs to the frontend.

## Deployment

### GitHub Pages (this repo, static demo)

Already configured via `.github/workflows/pages.yml` (Actions → Deploy
Pages). Any push to `main` redeploys.

Manual re-deploy:

```bash
git status
git diff --check
git add -A
git commit -m "docs: update OpenFlow demo"
git push origin main
gh run list --repo sufiyan-sabeel-k/openflow --limit 3
```

Then open the [live demo](#live-demo) links and confirm HTTP 200.
To enable from scratch: repo Settings → Pages → Deploy via GitHub Actions.

### Separate backend (required for real features)

1. Deploy your API (PHP/Node) on a host that supports secrets and outbound
   HTTPS to `api.sarvam.ai`.
2. Store `SARVAM_API_KEY` (and any OTP/Supabase service keys) as host env
   secrets — never in this repo.
3. Point the frontend at the API base URL, allow only
   `https://sufiyan-sabeel-k.github.io` in CORS, and enforce auth (session or
   Supabase JWT) plus per-user storage rules.
4. Keep audio/history behind auth; never list private files in `sitemap.xml`.

## Authentication setup

Honest status of this repo: **no working authentication**. The login page is a
UI demo:

- “Continue with Google” shows a demo notice; it starts no OAuth flow.
- Email/mobile + password forms validate locally and stop with a
  “needs the PHP backend” message; nothing is transmitted.
- No sessions, cookies (beyond Pages hosting), or tokens are created here.

To implement for real (outside this static repo):

1. Choose Supabase Auth **or** a custom backend — not both for the same flow.
2. Google Sign-In: configure per [Configuration](#configuration), use the
   provider’s official SDK/flow, handle callback errors, restore sessions on
   reload, and gate protected UI on verified session state.
3. Email + password: validate format client-side for usability, enforce all
   rules server-side, require email verification if enabled, and implement
   secure password reset through the provider.
4. Logout must destroy the server session / clear the client session and
   redirect to the public login page.

## Security and privacy notes

- No API keys, passwords, `service_role` keys, or OAuth secrets are in this
  repository (verified by inspection; `.gitignore` blocks `.env` files).
- Static-hosting limits: no secret storage, no server validation, no rate
  limiting, no private file enforcement. Treat all frontend checks as
  usability only.
- If you add Supabase: use the anon/publishable key in the browser at most,
  keep `service_role` server-side, and enforce Row Level Security rather than
  hiding UI elements.
- Privacy: the demo sets no app cookies and calls no analytics or TTS
  endpoints. The full-app template in `privacy.html` describes what a PHP /
  Supabase backend *would* collect — review it with the owner before relying
  on it, and do not invent retention periods or contact details.
- Reporting: do not open public issues containing credentials or user data.

## Project structure

Actual files in this repository (2026-10-10):

```text
openflow/
├── index.html                  # TTS demo (UI only)
├── login.html                  # Auth UI demo (UI only)
├── privacy.html                # Privacy template + FAQ
├── 404.html                    # Branded Pages 404
├── robots.txt                  # Allows public crawl, points to sitemap
├── sitemap.xml                 # Public static pages only
├── .nojekyll                   # Serve assets as-is on Pages
├── assets/
│   └── img/
│       └── og-cover.svg        # 1200×630 share-image placeholder
├── .github/
│   └── workflows/
│       └── pages.yml           # Deploy static root to Pages
├── .gitignore                  # Excludes .env / secrets / junk
└── README.md                   # This file
```

Relative links used throughout (`login.html`, `privacy.html`,
`assets/img/og-cover.svg`) so the site works under `/openflow/`.
`docs/screenshots/` does not exist yet — see [Screenshots](#screenshots).

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Pages site 404 right after push | Actions deploy still running or cached 404 | `gh run list --repo sufiyan-sabeel-k/openflow`, wait for green, hard-refresh |
| `404.html` shows but status is 200 | Expected on some static hosts | Verify in DevTools Network tab; do not claim 404 status until seen |
| Share preview shows old title/image | Social cache | Re-scrape (platform debugger) or test with a fresh `?v=` URL; confirm `assets/img/og-cover.png` exists if you switch from SVG |
| Login/Generate “does nothing” | Correct behavior on demo | Real features need a backend; see [Sarvam AI integration](#sarvam-ai-integration) |
| Supabase redirect fails | Redirect URL not allow-listed | Add exact Pages URLs in Supabase URL config + Google authorized origins |
| `auth.uid() = id` errors | RLS policy on wrong column/table | Match policy to your real schema; test as the logged-in user |
| `git push` asks for login | `gh` session expired | `gh auth login`, then `git push origin main` |
| Secret leaked to git | Key pasted into HTML/env committed | Rotate the key immediately, purge history (e.g. BFG), add to `.gitignore` |

## Roadmap

Genuinely planned, none claimed as done:

- [ ] Export `assets/img/og-cover.svg` → `og-cover.png` (1200×630) and update `og:image` URLs
- [ ] Add real `docs/screenshots/` captures (mobile + desktop)
- [ ] Decide backend path: Supabase Auth **or** PHP/MySQL API (not both), then wire login/session/history
- [ ] Server-side Sarvam endpoint with key isolation, rate limits, and short-lived audio URLs
- [ ] Per-user storage rules + documented retention/deletion process
- [ ] Optional: GA4 only if a real Measurement ID is supplied, behind consent where required

## Contributing

1. Fork and branch: `git checkout -b feat/short-name`
2. Keep the demo honest — no fake success states, no invented keys, IDs, or reviews.
3. Match the existing mobile-first Tailwind style; keep touch targets ≥ 44px.
4. Validate: `git diff --check`, open each HTML page locally, confirm no console errors.
5. Commit clearly (`feat: …`, `fix: …`, `docs: …`) and open a PR describing what was verified.

Do not submit PRs containing secrets, screenshots of real users without
permission, or analytics/tracking additions without prior agreement.

## License

No license file exists in this repository (checked: no `LICENSE`, `LICENCE`,
or `COPYING`). No license is granted by this README.

All rights reserved by default. If you want reuse, ask the creator to add an
explicit license (e.g. MIT) in a follow-up commit.

## Creator

Created by **Umaiz Sufiyan**.
