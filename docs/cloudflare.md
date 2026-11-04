# Cloudflare Pages for Aetheria Events
#
# Optional extra deploy target, run alongside GitHub Pages. GitHub Pages stays
# the mirror at https://aetheria-events.github.io/ae-booking-web/ until the
# Cloudflare copy has been checked on a phone. Cloudflare is not a replacement
# for that mirror yet, and neither copy is the custom domain: that is still
# book.aetheriaevents.com, still not pointed.

## The short version

1. Cloudflare dashboard, Workers & Pages, Create, Pages, connect the GitHub repo
   `Aetheria-events/ae-booking-web`.
2. Framework preset: none. Build command `npm run build`. Output directory `dist`.
3. Environment variable `NODE_VERSION` = `22`.
4. Save and deploy. You get a free `aetheria-events.pages.dev` address.
5. Later, when the domain exists: Custom domains, add `book.aetheriaevents.com`,
   then create the CNAME Cloudflare asks for.

That is the whole dashboard route. Everything in the repo is already prepared.

## What is already in the repo

| File | Why |
| --- | --- |
| `public/_redirects` | `/* /index.html 200`. Cloudflare Pages has no SPA fallback, so without this `/booking` is a 404. |
| `public/_headers` | Security headers: nosniff, frame options, referrer policy, HSTS, and long-lived caching for hashed assets. |
| `wrangler.toml` | Project name and output directory, so `npx wrangler pages deploy dist` works with no dashboard at all. |
| `scripts/make-sitemap.mjs` | Falls back to Cloudflare's own `CF_PAGES_URL` when `SITE_URL` is unset, so a first deploy gets a truthful sitemap on the pages.dev address instead of the not-yet-pointed custom domain. |

## Two things that differ from GitHub Pages

**The path prefix disappears.** GitHub Pages serves a project site under
`/ae-booking-web/`. A Cloudflare Pages project is served from the root of its own
hostname, so the base is `/`. Nothing needs editing: `vite.config.js` only adds a
prefix when it sees `GITHUB_ACTIONS`, and `src/main.jsx` takes the router basename
from `import.meta.env.BASE_URL`. A Cloudflare build therefore emits `/assets/...`
and routes at `/booking`, and the same commit still builds correctly for Pages.

**The custom domain becomes real.** Today the default sitemap origin is
`https://book.aetheriaevents.com`, a domain nobody has pointed. Once Cloudflare is
live on that domain, set `SITE_URL=https://book.aetheriaevents.com` as a production
environment variable so the sitemap stops depending on a fallback.

## Command line route

For when the dashboard is not wanted. Needs a Cloudflare API token with the
`Cloudflare Pages: Edit` permission, exported as `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`. Never commit either, and never paste them into a chat.

```bash
npm ci
npm run build
npx wrangler pages project create aetheria-events --production-branch main
npx wrangler pages deploy dist --project-name aetheria-events
```

On a first deploy Cloudflare prints the new `*.pages.dev` address. That address is
the thing to open on a phone before telling anyone the site moved.

## What Cloudflare actually buys here

Worth being precise, because "get rid of the GitHub domain" is two separate wants.

- **Protection.** The Cloudflare proxy in front of a custom domain gives you the
  WAF, bot fighting, TLS and a CDN. That starts working when the domain is on
  Cloudflare, not when the pages.dev deployment exists. A pages.dev address is
  useful but is not a WAF in front of your brand.
- **A nicer address.** A pages.dev host still is not your domain. It is tidier
  than `owner.github.io/repo`, and it makes the move to `book.aetheriaevents.com`
  a DNS change rather than a rebuild.

Neither of those happens until a domain exists. That is the real blocker, not the
build.

## Before pointing a domain at it

- Remove the `noindex` risk: check that `robots.txt` on the new host is the built
  one and not a placeholder. It is written by `npm run build`, so it will be right.
- Re-test the booking form end to end. It posts to the Apps Script endpoint in
  `brand.bookingEndpoint`, which is an absolute address, so the host does not
  matter, but a submit that fails silently is the one failure worth hunting.
- Re-test `/booking`, `/privacy` and `/site-map` as direct links. If any of them
  404, `_redirects` did not ship. Check `dist/_redirects` exists after the build.
- Keep GitHub Pages running for a week. Two live copies cost nothing and one of
  them is a free rollback.
