
<p align="center">
<h1 align="center">Github Readme Thirukkural</h1>
<h3 align="center">Add Thirukkural cards to your GitHub README (or any web page) as SVG images.</h3>
</p>


**Quick summary ✍️**: This project generates SVG cards containing a Thirukkural (classical Tamil couplet) and its chapter information. It exposes a small HTTP API (also a Vercel serverless handler) that returns ready-to-embed SVG images. I made this as a hobby project to practice TypeScript, SVG rendering, and serverless functions.

Copy the **Markdown** below and paste it in your **GitHub README**.


## Live demo 🌐

Visit: [https://rt.sasivarnasarma.eu.org/api](https://rt.sasivarnasarma.eu.org/api)

<p align="center">
<a  href="https://rt.sasivarnasarma.eu.org/"><img align="center"  src="https://rt.sasivarnasarma.eu.org/api"  /></a>
</p>

You can embed an image in a README or site with a URL like:

```md
[![Readme Thirukkural](https://rt.sasivarnasarma.eu.org/api)](https://github.com/Sasivarnasarma/Readme-Thirukkural)
```

Available public deployments: 
- `https://rt.sasivarnasarma.eu.org/api`
- `https://readme-thirukkural.vercel.app/api`
- `https://readme-thirukkural.sasivarnasarma.workers.dev`

## Table of contents 🗂️

- Project overview
- Features
- Installation
- Usage examples
- Themes
- Development & build
- Rendering & code structure
- Contributing
- License

## Project overview 🔍

Readme-Thirukkural is a tiny TypeScript service that returns SVG cards showing Thirukkural couplets. It can run as:

- A local Express dev server (`src/app.ts`).
- A Vercel serverless function (`src/vercel.ts`).
- A Cloudflare Worker (`src/worker.ts`).
- A Netlify Function (`src/netlify.ts`).

The project keeps canonical data in `data/Thirukkural.json` and color themes in `data/themes.json`.

## Features ✨
- Dynamic Thirukkural cards you can embed in your GitHub README
- Generate SVG cards in two layouts: `horizontal` (600×auto) and `vertical` (300×300).
- Themeable colors via `data/themes.json` and request-level custom colors.
- Simple HTTP API returning `Content-Type: image/svg+xml`.
- Local dev with hot-reload (`tsx watch`) and a Vercel-compatible handler.

## Installation 🛠️

Requires Node.js and `pnpm` (this repo uses `pnpm` as the package manager).

```bash
pnpm  install
```

## Usage examples 🧑‍💻

Start the dev server:

```bash
pnpm  dev
```
API endpoint (GET /api) query parameters

-  `lang`: `english` | `tamil` (default `tamil`)
-  `kural`: number (1-1330) — omit for a random kural
-  `type`: `horizontal` | `vertical` (default `horizontal`)
-  `theme`: theme key from `data/themes.json` (default `random`) Check [`themes.md`](https://github.com/Sasivarnasarma/Readme-Thirukkural/blob/main/themes.md) for preview available themes.
-  `border`: `true` | `false` (default `true`) — adds a colored border
-  `kuralColor`, `chapterColor`, `backgroundColor`, `symbolColor`: hex color overrides (without `#`)

Example curl (local):

```bash
curl  "http://localhost:3000/api?lang=english&type=horizontal&theme=light&kural=10&border=true"  -H  "Accept: image/svg+xml"
```

Embed in GitHub README (public deployment required):

```markdown
![Thirukkural](https://your-deployment.example.com/api?lang=english&type=horizontal&theme=light&kural=10&border=true)
```

## Themes 🌈
Check [`themes.md`](https://github.com/Sasivarnasarma/Readme-Thirukkural/blob/main/themes.md) for preview available themes.

## Development & build 🚀

- Dev: `pnpm dev` — runs `tsx watch src/app.ts` (hot reload).
- Type-check: `pnpm typecheck` — runs `tsc --noEmit`.
- Format: `pnpm format` — runs Prettier.
- Build: `pnpm build` — `rimraf dist && tsc`.
- Start production build: `pnpm start` — runs `node dist/app.js`.
- Vercel: `pnpm vercel-dev` (local) / `pnpm vercel-deploy` (deploy).
- Cloudflare Workers: `pnpm cf-dev` (local) / `pnpm cf-deploy` (deploy).
- Netlify: `pnpm netlify-dev` (local) / `pnpm netlify-deploy` (deploy).

When making code changes, run `pnpm typecheck` to catch TypeScript issues, then `pnpm format`.

## Rendering & code structure 🖌️

-  `src/fetcher/fetch-kurals.ts` — loads `data/Thirukkural.json` and returns a parsed `{ kural, chapter }` pair.
-  `src/renderer/render-svg.ts` — top-level renderer: chooses theme and card type.
-  `src/renderer/theme/awesome-card.ts` — theme map and helpers (`renderTheme`, `getThemeStyles`).
-  `src/renderer/type/horizontal-card.ts` & `vertical-card.ts` — build final SVG strings and inject styles & fonts.
-  `src/renderer/constants.ts` — embedded font defs used in SVGs.

Notes about code patterns

- The project uses ESM imports and `type: "module"` in `package.json`. When importing local modules from TypeScript in `src/`, use `.js` extensions in import paths (e.g. `import x from './file.js'`).
- JSON imports use the TypeScript `with { type: "json" }` syntax (see `fetch-kurals.ts`).
- Rendering is string-based: SVG output is assembled with template literals. Avoid introducing DOM-based templating libraries unless necessary.

## Contribution guidelines 🤝

- Contributions, issues, and feature requests are welcome!
- Keep changes small and focused. One logical change per PR.
- Run `pnpm typecheck` and `pnpm format` before opening a PR.
- If you add or modify public API query params, update `src/app.ts`, `src/vercel.ts`, `src/worker.ts`, and `src/netlify.ts`, and add usage examples in `README.md`.
- If you add new themes or data, place them in `data/` and follow the existing JSON shape.
 
## Special Thanks ❤
Inspired from [Readme-Quotes](https://github.com/PiyushSuthar/github-readme-quotes)

## License 📝
This project is licensed under the `MIT License`. See the [`LICENSE`](https://github.com/Sasivarnasarma/Readme-Thirukkural/blob/main/LICENSE) file for more details.

<h3 align="center">Made with ❤ By @Sasivarnasarma</h3>