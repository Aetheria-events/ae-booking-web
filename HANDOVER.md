# Aetheria Events, handover

Read this before you change anything. It is the working manual for this website: what is live, the rules the owner holds you to, the loop that turns a request into a deployed change, how to prove a change is correct without a browser, and how the backups are made.

`README.md` describes the project in long form: pages, design tokens, artwork, legal drafts. This file is the procedure. If you are an AI agent picking this up cold, read this one first, then skim `README.md` for background.

---

## 1. Where everything is

| Thing | Value |
| --- | --- |
| Live site | https://tapasul.github.io/Aetheria/ |
| Repository | https://github.com/TapAsul/Aetheria |
| Branch that deploys | `main` |
| Host | GitHub Pages, serving the Actions artifact built by `.github/workflows/deploy.yml` |
| Custom domain, not yet pointed | https://book.aetheriaevents.com |
| Booking sheet | `1jUrvnfI1MtEY83iVdLOZKxxQUbCtou1F-yf1ABUqYqQ` |
| Booking receiver | Apps Script `/exec` URL stored in `brand.bookingEndpoint`, `src/data/site.js` |
| Backup folder in Drive | `1jbaxhXwco_V9lNSQX74izf8qlFOWBJWk` |
| Stack | React 19, Vite 8, React Router 7, plain CSS, Inter only |
| Node | 22 in CI |

**Routes.** `/` `/packages` `/booking` `/privacy` `/terms` `/site-map` `/about` render inside the shared header and footer, `/invitation` renders on its own, `/site-plan` is a permanent redirect to `/site-map`, anything else falls to the 404 page. The redirect is not decoration: links to the old address were shared with clients, so it must keep working forever.

**Who owns what.** `src/data/site.js` holds essentially all copy, prices and contact details. Pages are in `src/pages/`, shared pieces in `src/components/`. CSS loads in a fixed order from `src/main.jsx`, and `src/styles/aqua.css` is last, so it wins every tie. Round-by-round fixes are appended there as numbered sections (`23. Mobile breathing room`, `24. Site Map panels`, `25. The closing call to action`). When you fix something, add the next number at the end of that file rather than editing a rule fifteen hundred lines up. It keeps the history readable and means your change cannot be silently overridden.

---

## 2. The rules the owner holds you to

These are not style preferences. Each one was stated directly by the owner, several of them more than once. Breaking one has meant redoing the work.

1. **Never remove the booking form.** `/booking` is the entry point for every booking button on the site.
2. **Every booking must land in the Google Sheet automatically.** No clipboard fallback as the primary path, no second tab.
3. **Every mobile screen must fit** at 360, 390 and 430 CSS pixels wide.
4. **Nothing may touch the screen edge or a card border.** Content needs breathing room on every page, and fixes are made site wide, not just on the page that was photographed.
5. **No em dashes, anywhere.** `grep -rn "$(printf '\342\200\224')" src/ README.md HANDOVER.md` must return nothing. En dashes in ranges (`10–12 hours`) are fine. The octal form keeps this file itself clean, which is the point.
6. **Palette is the logo's**: brand blue `#004AAD`, sky `#38B6FF`, deep blue `#002F6C`, wash `#EEF9FC`, ink `#0B3145`. The footer colour must match the logo.
7. **Inter for everything.** It is bundled from `@fontsource-variable`; no second typeface, no system serif fallback.
8. **The page is called "Site Map"**, two words, capital M, everywhere a person reads it. The route is `/site-map`. The XML file stays lowercase `sitemap.xml`.
9. **`sitemap.xml` URLs point at `https://book.aetheriaevents.com`** by default; the Pages build overrides the origin through `SITE_URL` so the mirror's own sitemap stays truthful.
10. **The PDF keeps the filename `aetheria-events-site-plan.pdf`.** Only its labels changed when the page was renamed.
11. **Five team portraits, job titles only, no personal names.** Digital Fulfillment, Marketing, Digital Fulfillment, Strategic Partner, Strategic Partner.
12. **Ben & Za's sample invitation uses the three supplied photographs.** Never restore the old `FairyScene` or the night hero.
13. **Say "digital fulfillment", two words, never "studio".** The contact address is `digitalfulfillment@aetheriaevents.com`.
14. **Every button click shows a toast.** Confirmation is part of the product.
15. **Merge through pull requests only.** Never commit to `main`, never force push, never rewrite history. The owner said plainly: "I don't want you to ruin my portfolio repository."
16. **Cloudflare is "later".** Do not start that deployment until asked.
17. **Keep the Drive backup current.** Three files, refreshed after every shipped round. Section 6.

Two habits go with these. When the owner reports something, they report what they can see, often with a screenshot and often describing alignment rather than naming CSS. Restate the problem as a measurement before you fix it (section 4). And when the scope is "fix this one thing", fix that thing. Round ten exists because a previous round reworked more of the booking form than was asked.

---

## 3. The loop

Every shipped change followed these nine steps. Nothing in the list is optional, including the last two.

```bash
# 0. Start clean
npm ci                      # node_modules is never committed

# 1. Read the request, then turn it into numbers before touching code.
#    "the date box touches the edge" becomes "the box runs 42.3 to 357.7 in a
#    390px screenshot while its siblings stop at 347.7". Section 4 has the tools.

# 2. Find the rule that produces the behaviour. Work in DevTools order:
#    the component's inline style, then components.css, then aqua.css.

# 3. Edit. One concern per round. New CSS goes at the end of aqua.css as a
#    numbered section; new copy goes in src/data/site.js.

# 4. Build and prove it locally
npm run build
git diff --stat

# 5. Sanity check the whole app, not just the page you touched (section 4.3)

# 6. Commit and open a pull request
git add -A
git commit -m "Centre the closing buttons and normalise the date control"
git push origin <your-branch>
gh pr create --fill --base main

# 7. Merge. Expect "no checks reported": the workflow only runs on main.
gh pr merge <number> --merge

# 8. Watch the deploy, never assume it
gh run list --limit 1
gh run watch <run-id> --exit-status

# 9. Confirm what is actually being served, then refresh the Drive backup
curl -s https://tapasul.github.io/Aetheria/ | grep -o 'assets/index-[^"]*\.css'
```

Step 9 matters more than it looks. A green deploy means the upload finished, not that the rule you wrote survived minification and cascade order. Fetch the deployed stylesheet and read the rule back.

---

## 4. Proving a change without a browser

Agents often have no Chrome, no screenshots and no way to look at the page. That is not a reason to guess. Four techniques, in the order they were used.

### 4.1 Measure the owner's screenshot

Phone screenshots are usually 3x. An iPhone capture 1170 px wide is a 390 CSS pixel viewport. Divide every pixel measurement by 3 and you have the layout truth, straight from the device where it looked wrong.

```python
from PIL import Image
im = Image.open("IMG_2774.jpeg").convert("RGB")
w, h = im.size
px = im.load()

def ink_span(y, x0=0, x1=None, threshold=250):
    """First and last non-background pixel on one row, in image pixels."""
    x1 = w if x1 is None else x1
    xs = [x for x in range(x0, min(x1, w)) if sum(px[x, y]) < 3 * threshold]
    return (min(xs), max(xs)) if xs else None
```

Two traps. Backgrounds here are frosted glass, not white, so tune `threshold` until the panel itself reads as background. And clamp the scan range to `w`, because indexing one pixel past the edge raises `IndexError` and wastes a debugging round.

The useful output is a pair of edges per element. Two elements that should match but differ by 9 px tell you the cause immediately: a value that is suspiciously close to 315 is a native date input's intrinsic width, 360 is a common container floor, and a difference of exactly the panel padding means someone applied padding twice.

### 4.2 Read the deployed CSS

```bash
GITHUB_ACTIONS=true GITHUB_REPOSITORY=TapAsul/Aetheria npx vite build --outDir /tmp/livecss
grep -o "plan-cta{[^}]*}" /tmp/livecss/assets/*.css
```

Setting those two variables reproduces the exact asset names CI produces, so `/tmp/livecss/assets/index-DVV9S9xh.css` matching the live filename is proof the source you are reading is the source that is serving. Then check order, because order is the whole game in this codebase: your rule must appear after the rule it is meant to beat.

Minification is not neutral. Lightning CSS drops `-webkit-appearance` whenever the unprefixed `appearance` is present, and rewrites `@media (max-width: 760px)` into `@media (width<=760px)`. Both are correct, and both will fool a grep for the literal source string.

### 4.3 Render every route headlessly

A jsdom pass catches the failure that matters most here: a change that works on the page you were editing and breaks a route you never opened.

```bash
npm i -D vite@8 @vitejs/plugin-react@6   # already present, listed for clarity
cat > vite.test-iife.config.js <<'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/tmp/iife',
    cssCodeSplit: false,
    lib: { entry: 'src/main.jsx', formats: ['iife'], name: 'Site', fileName: 'app' },
  },
});
EOF
npx vite build --config vite.test-iife.config.js
rm vite.test-iife.config.js
```

Load `/tmp/iife/app.js` into a jsdom window that already contains `<div id="root">`, with `matchMedia`, `IntersectionObserver` and `scrollTo` stubbed, then walk the routes with `history.pushState`. A clean run visits all nine addresses with no console errors. Assert on structure, not on pixels: the closing action group has one `.plan-cta` holding two links, the date input carries `class="input"` and no inline width, and so on.

### 4.4 Do the arithmetic out loud

Before and after any mobile fix, compute the box chain and check it against a measurement:

```
viewport 390
- gutter        clamp(1.5rem, 4vw, 2.5rem) = max(24, 15.6) = 24 each side
= panel         342 wide
- panel padding 17.6 each side
= copy column   306.8
```

The text fields measured 306. The date box measured 315.4, which is wider than the column it sits in, so no amount of `min-width: 0` was going to save it: the control was refusing to shrink. That single subtraction is what turned a vague complaint into a one-line fix.

---

## 5. Publishing

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`, and nothing else. Pull requests produce no checks, which is expected and not a sign of a broken repository.

It does four things worth knowing about:

- Builds with `SITE_URL=https://tapasul.github.io/Aetheria`, so the mirror's sitemap lists mirror URLs rather than the domain that is not pointed yet.
- Sets `GITHUB_ACTIONS` and `GITHUB_REPOSITORY`, which `vite.config.js` reads to emit the `/Aetheria/` asset prefix. Locally the base stays `/`, so previews are not broken by a prefix that only exists on Pages.
- Copies `dist/index.html` to `dist/404.html`, because Pages has no single-page-app fallback and deep links such as `/Aetheria/booking` would otherwise hit GitHub's own 404.
- Writes `dist/.nojekyll` so Jekyll does not strip the underscore-prefixed folders.

`npm run build` runs `postbuild` automatically, which writes `sitemap.xml` and `robots.txt` with today's date in `lastmod`. `/site-plan` is deliberately absent from the sitemap: it redirects, and a sitemap should only list final addresses.

**Rolling back** is a normal revert of the offending commit through a pull request, then let the deploy run again. Do not rewrite `main`, and do not delete workflow runs.

---

## 6. The Drive backup

The owner's safety net. Three files, in one Drive folder, refreshed after every shipped round.

| File | How it is made | What it is for |
| --- | --- | --- |
| `aetheria-events.zip` | `git archive` of the shipped tree | Rebuild the site anywhere: unzip, `npm ci`, `npm run build` |
| `Aetheria-Events-website.html` | `npm run build:single` + `node scripts/inline-single.mjs` | Open by double-click, no install, works offline |
| `aetheria-complete-source.md` | `npm run build:md` | Read every source file in one document |

```bash
# zip
mkdir -p /tmp/pkg/aetheria-events
git archive HEAD | tar -x -C /tmp/pkg/aetheria-events
cd /tmp/pkg && zip -qr -X aetheria-events.zip aetheria-events

# single file
cd /home/user/Aetheria
npm run build:single && node scripts/inline-single.mjs

# readable source
npm run build:md
```

Then upload all three to folder `1jbaxhXwco_V9lNSQX74izf8qlFOWBJWk`, move the previous versions to the trash, and list the folder again. It must come back with exactly three files. Leaving the old ones alongside is how somebody eventually downloads the wrong one.

Verify the upload rather than trusting it. The single-file HTML is deterministic for a given commit, so a rebuild should reproduce the same checksum Drive reports:

```bash
md5sum Aetheria-Events-website.html     # must equal the md5 in Drive's file metadata
unzip -l aetheria-events.zip | tail -2  # file count and size must match Drive
```

Round eleven's reference numbers: zip 1,607,985 bytes over 87 entries, HTML 3,928,113 bytes, markdown about 506,000 bytes. A zip that comes back a different size means the tree changed, not that the zip is broken.

**Restoring** from the backup needs nothing but the zip: `unzip`, `npm ci`, `npm run build`. The HTML file restores nothing but proves what the site looked like. Neither carries git history, which is what GitHub is for.

---

## 7. Traps

Each of these cost real time. None is hypothetical.

- **Native date inputs ignore `min-width: 0`.** iOS gives `input[type=date]` an intrinsic width near 315 px and a height a few pixels taller than a text field. The fix is `appearance: none` plus `width: 100%`, then neutralising `::-webkit-date-and-time-value` and `::-webkit-datetime-edit` so the value sits at the same inset as a placeholder. The wheel picker still opens on tap.
- **Cascade order beats specificity here.** `aqua.css` is imported last and carries numbered sections. A new rule halfway up the file will lose to an older one below it, no matter how specific it is.
- **`/tmp` is not durable** in most agent sandboxes. Recreate the virtualenv, test bundles and staging folders every session; never store the only copy of anything there.
- **`pip install` fails with PEP 668.** Use `python3 -m venv` and install into it.
- **`node_modules` is never committed** and is usually absent from a fresh checkout. `npm ci`, not `npm install`, when a lockfile exists.
- **A chained `rm -rf <fresh> && mkdir -p <dir>` can abort silently** in some sandboxes and create nothing. Make the directory in its own call, confirm with `ls -d`, then chain the rest.
- **`set -e` plus `grep -c` returning 0** kills a script. The em dash check legitimately returns zero matches, so check it without `-e` or with `|| true`.
- **The Drive API sometimes answers 404 on a parent folder id** that is perfectly valid. Re-list the folder, copy the id from the response, retry. Never retype an id from memory.
- **`no-cors` fetches cannot be read.** When checking whether the booking endpoint is alive, use the endpoint's own browser test: opening the `/exec` URL should return `{"ok":true,"service":"Aetheria Events booking receiver"}`.
- **The sample RSVP stores locally on purpose.** Do not wire it to the sheet; only the booking form writes rows.

---

## 8. State at handover

- `main` at `6c72aa5`, deployed by run `41474917206`, serving `assets/index-DVV9S9xh.css`.
- Eleven rounds shipped. The last one centred the closing call-to-action pair under 760 px and normalised the event date control so it matches the other fields exactly: 262 px wide and 53 px tall at 390 px, 232 at 360, 302 at 430.
- Mobile breathing room was applied site wide in round ten and eleven: panel inset plus inner padding, no content touching an edge at any of the three widths.
- The Drive folder holds the three round-eleven files and nothing else.
- `npm run build:md` is new with this handover and regenerates the readable source document from `git ls-files`, so the file set can never drift from the repository again.

---

## 9. Open threads

- **iOS date field fallback.** If the normalised date control ever renders blank on an iPhone rather than showing the chosen date, replace it with a text input carrying a numeric keypad and keep the calendar affordance. The owner has been told this in advance.
- **Cloudflare.** Planned, not started. Pages project on `TapAsul/Aetheria`, build `npm run build`, output `dist`, `NODE_VERSION=22`, domain `book.aetheriaevents.com`. `public/_redirects` already carries the SPA fallback.
- **Analytics.** Must load only when `document.documentElement.dataset.consent === 'all'`. Not wired yet, and wiring it without the consent gate would break a promise the privacy page makes.
- **Legal copy.** The privacy notice and terms are good-faith drafts. They say so. Have counsel read them before the site starts taking real bookings at the custom domain.
- **Git history in the backup.** Optional `git bundle` file, offered and not yet wanted. The Drive backup restores a snapshot, not the commit history.

---

## 10. Talking to the owner

The owner is not a developer and does not need to become one. What has worked:

- Say what changed in the language of what they see, with the numbers: "the date box is now the same width as the fields above it, 262 pixels at phone width". Avoid naming CSS properties unless they ask.
- Be explicit about what you could not check. If there was no browser, say so, describe what you verified instead, and name the one thing worth a look on their phone.
- Offer the fallback before it is needed. Saying "if it is blank on your phone, here is the swap I will make" removes a whole round of surprise.
- Keep replies plain. No em dashes, not even in chat. Short paragraphs, a small table when there are numbers, no walls of bullet points.
- Never present unverified work as done. The owner checks on a real phone and has caught things that looked fine in arithmetic.
