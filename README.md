# Vandens Nesejas

Astro rebuild of the multilingual Vandens Nesejas site.

## Commands

Run commands from this folder:

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the local dev server at `localhost:4321` |
| `pnpm build` | Build the production site to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Routes

- `/` is Lithuanian.
- `/<lang>/` renders translated site pages for `en`, `yi`, `de`, `fr`, `pl`, and `ru`.
- `/poem/` is the Lithuanian full poem.
- `/<lang>/poem/` renders translated full poem pages.

## Content

Canonical JSON content is checked into `src/data/content/` and imported through `src/data/languages.ts`.

When updating copy, edit the source JSONs in `../content/`, then copy them into `src/data/content/` before building:

```sh
cp ../content/*.json src/data/content/
```

The renderer expects each JSON file to include the page sections, language labels, poem fragment, full poem, speech, credits, and funding fields.

## Cloudflare Pages Deployment

The site is prepared for Cloudflare Pages:

- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: repository root
- `wrangler.toml` declares the Pages project name and output directory.
- `astro.config.mjs` sets `site` to `https://vandensnesejas.org`.

Custom domains are configured in Cloudflare Pages settings, not through a committed `CNAME` file.

Because the custom domain is used, no Astro `base` is configured.
