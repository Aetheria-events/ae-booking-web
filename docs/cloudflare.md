# Cloudflare Pages for Aetheria Events
#
# Optional extra deploy target, run alongside GitHub Pages. GitHub Pages stays
# the mirror at https://aetheria-events.github.io/ae-booking-web/ until the
# Cloudflare copy has been checked on a phone. Cloudflare is not a replacement
# for that mirror yet, and neither copy is the custom domain: that is still
# book.aetheriaevents.com, still not pointed.

## When the GitHub connection fails

The dashboard route depends on installing the Cloudflare GitHub App, and that
install can half-finish. The symptom is **Error connecting to git account** right
after choosing a repository. The app is listed on GitHub as installed, but
Cloudflare never received the callback, so it refuses to use the install.

Two ways out, in order of preference for a deadline.

**Skip GitHub entirely, for now.** A direct upload needs no Git connection and no
build on Cloudflare's side, because the app is already built.

```bash
npm ci
SITE_URL=https://aetheria-events.pages.dev npm run build
cd dist && zip -qr -X ../aetheria-events-site.zip .
```

Then in the dashboard: Workers & Pages, Create, Pages, **Upload assets**, name the
project, drop the zip in, deploy. Cloudflare unzips the archive and serves it
exactly as built, so `_headers`, `_redirects`, `sitemap.xml` and `robots.txt` all
ship unchanged.

The trade is automation, not correctness. The site works, but Cloudflare will not
rebuild when `main` changes. Connect Git before the next round of changes, so the
upload is a one-time bridge rather than the permanent process. Set `SITE_URL`
explicitly for that build: `CF_PAGES_URL` is only supplied to builds Cloudflare
runs itself.

**Or repair the installation.** In GitHub, Settings, then Applications, then
Installed GitHub Apps, open "Cloudflare Workers and Pages", choose Uninstall, then
confirm. Then in Cloudflare, Workers & Pages, Create, Pages, Connect to Git, and
install the app again. The uninstall has to be the one from the GitHub side; using
the Configure button on an installation that never completed is what loops back to
the same error.

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

Three separate wants, and it is worth keeping them apart because they arrive at
different moments.

**1. A tidier public address.** A pages.dev host is nicer to share than
`aetheria-events.github.io/ae-booking-web`, and it makes the eventual move to
`book.aetheriaevents.com` a DNS change rather than a rebuild. This one you get
today, for free, with no domain and no card.

**2. Protection.** The WAF, bot fighting, TLS and the CDN start working when a
real domain is proxied through Cloudflare. They do not start working because a
pages.dev deployment exists. A pages.dev host is a hostname, not a shield.

**3. Privacy about the plumbing.** A pages.dev address does not hide the source
repository, and it cannot. See the section below before counting on it.

## Hiding the GitHub copy: what is actually possible

The owner's first goal was to stop people browsing the `github.io` address. Three
different things get confused here, and only one of them is fixed by Cloudflare.

| What someone can still find | Fixed by a pages.dev address? |
| --- | --- |
| The pages.dev address itself, if it is shared or indexed | No. It is a public address like any other. |
| The GitHub repository, its commit history and its issues | No. It is a public repository and stays public. |
| The `github.io` address, discoverable in one hop from the repository | Only by closing the Pages site. |

`Aetheria-events` is a **user account**, not an organisation, so both sites are
project pages at `aetheria-events.github.io/<repo>/`. GitHub lists a public
repository's Pages address on the repository page, and anyone who reaches
`aetheria-events.github.io` can walk the list of that account's sites. There is no
setting that serves a project page and hides it from the account root.

So the honest sequence, cheapest first:

1. **Deploy to Cloudflare Pages and share only that address.** Costs nothing. The
   `github.io` copy stays reachable to anyone who thinks to look, and to search
   engines, but it stops being the link you hand out.
2. **Turn GitHub Pages off once the Cloudflare copy has been checked on a phone.**
   Settings, Pages, Source: None. That deletes the `github.io` address, and the
   repository page stops advertising it. The repository itself stays public, which
   matters for the booking history and the backups. This is the step that actually
   answers "I do not want people on the GitHub site".
3. **Add `noindex` to the GitHub copy if it must stay up.** Useful during the
   overlap week, so search engines do not pick up the old address. Turning Pages
   off does the same job more simply.
4. **When the domain exists**, attach `book.aetheriaevents.com` to the Cloudflare
   project. Then, and only then, the WAF and bot protection apply, and the address
   finally carries the brand.

What is not on the list: making the repository private. A private repository needs
a paid plan for Pages, and it would break the free Actions minutes and the public
backup trail. It is not needed to stop people using the `github.io` address; step 2
does that.

## Before turning GitHub Pages off

- Confirm the Cloudflare deployment is the same commit and the booking form
  submits. A form that looks fine and silently fails is the one failure worth
  hunting.
- Update `package.json` `homepage` if it is ever used for a link, and update the
  README live-site line, or the next person will chase a dead address.
- The sitemap default is still `book.aetheriaevents.com`. With no domain yet, set
  `SITE_URL` on the Cloudflare project to the pages.dev address, or leave it unset
  and the `CF_PAGES_URL` fallback supplies the right one.
- `Aetheria-events/Ae-rsvp` is a separate site with its own Pages deployment, so
  the Ivory Suite link on the home page keeps working either way. Turning Pages off
  on this repository does not touch it.

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
