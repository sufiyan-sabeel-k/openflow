# Screenshots — manual capture checklist

No screenshots are fabricated in this repository. The files listed below do
not exist yet. Capture them manually from the verified live demo and save
them under `docs/screenshots/`. PNG files are git-ignored by design (see
root `.gitignore`); to publish them, either force-add the ones you want or
adjust the ignore rule — do not commit real user data.

Base URL: <https://sufiyan-sabeel-k.github.io/openflow/>

## Required captures

| # | File | Page | Viewport | Steps |
|---|---|---|---|---|
| 1 | `index-mobile.png` | `index.html` | 390 × 844, mobile | Load page → type sample text → screenshot hero + generator card |
| 2 | `login-mobile.png` | `login.html` | 390 × 844, mobile | Screenshot Welcome card + Google button + Login tab |
| 3 | `desktop.png` | `index.html` | 1440 × 900, desktop | Screenshot full generator + history + FAQ |

## Rules

- Use production URL above (tests the real `/openflow/` base path).
- Close DevTools before capturing; hide bookmarks bar if possible.
- Never include real credentials, tokens, personal data, or other users.
- Keep each file under ~500 KB (compress if needed).
- After adding files, update `README.md` Screenshots section to link them,
  e.g. `![OpenFlow home](docs/screenshots/index-mobile.png)`.
