# Aetheria Events, website

A bespoke marketing site, booking flow and sample digital invitation for **Aetheria Events**
(Bonifacio Global City, Taguig). Built with React 19 + Vite as a static single-page app.

> **Taking this project over, or handing it to another agent?** Read [`HANDOVER.md`](./HANDOVER.md)
> first. It holds the house rules, the loop used to ship a change, how to verify work without a
> browser, and how the Drive backup is made and refreshed.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build on http://localhost:4173
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, positioning, three atmospheres, packages, process, FAQ, CTA |
| `/packages` | Full pricing, guest capacity, inclusions, optional fees, side-by-side comparison, plain-language terms |
| `/booking` | Simple booking form, package, event, contact details, consent, live estimate |
| `/invitation` | Labelled sample event page: countdown, details, schedule, save-the-date/contact, RSVP |
| `/privacy` | Privacy notice (PIC/PIP roles, retention, rights, guest notice, DPO) |
| `/terms` | Service terms summarised from the SLA (delivery, revisions, refunds, liability) |
| `/site-map` | Site Map: routes, page intent, design system, compliance plan, checklist, open questions |
| `/aetheria-events-site-plan.pdf` | Downloadable PDF of the Site Map for sending to the client |
| any other | 404 page |

The header shows Home, Packages, Invitation, About our Team and a “Book your date” button; legal pages
live in the footer and are linked inline from every form.

## What is interactive

- **Booking form**, client-side validation with inline errors and an error summary, a package
  selector that carries over from the packages page (`/booking?package=premium`), rush-service
  pricing that respects package restrictions, a live estimated total, consent capture, and a
  success state with a reference number, a downloadable `.txt` summary, a mailto hand-off and an
  `.ics` “hold the date”. Every submission is POSTed to the Apps Script receiver in `docs/` and
  appended to the live Google Sheet, timestamps in Manila time. If the endpoint is unset or
  unreachable, the row falls back to the clipboard with a link to the sheet.
- **Sample invitation**, live countdown, add-to-calendar (`.ics`), save-contact (`.vcf`), venue
  maps link, a three-photograph gallery, RSVP with attendance, guest count, optional note and
  consent.
- **On-screen confirmations**, a small toast (bottom centre, `role="status"`) acknowledges saved
  contacts, calendar downloads, copied rows, downloaded summaries and sent replies.
- **Privacy dialog**, appears once on first visit, offers *Accept all*, *Essential only* and
  *Decline non-essential*, records the choice in `localStorage` (`aetheria.consent.v1`), exposes it
  as `document.documentElement.dataset.consent`, traps focus, closes on `Esc`, and can be reopened
  from every footer under “Privacy settings”.
- **Site Map**, printable, and downloadable as a PDF from `/aetheria-events-site-plan.pdf`.

The sample RSVP stays in the visitor’s browser so the invitation demo needs no backend. Booking
requests go to the Google Sheet through the Apps Script receiver in `docs/`.

## Structure

```
src/
  App.jsx                  routes + layout
  main.jsx                 entry, fonts, CSS imports
  data/site.js             all copy, packages, fees, FAQs, sample event data
  lib/consent.jsx          consent context + storage
  lib/files.js             vCard, iCalendar, .txt summary, date formatting
  lib/hooks.js             page meta, body lock, scroll restoration
  components/              Header, Footer, Logo, Icons, Artwork, PrivacyDialog,
                           Accordion, Countdown, Marquee, PlanCard, Reveal, SectionHead
  pages/                   Home, Packages, Booking, EventDemo, Privacy, Terms, SitePlan, NotFound
  styles/                  base (tokens), layout, components, pages, event, print,
                           brand, round-two, aqua (the current theme, loads last)
```

### Design tokens

The palette comes straight from the logo artwork: brand blue for anything that acts, sky blue
for accents, and a soft blue wash behind the glass.

| Token | Value | Use |
| --- | --- | --- |
| Brand blue | `#004AAD` | Logo, CTAs, buttons, links |
| Sky | `#38B6FF` | Logo `events`, accents, ticks, marquee stars |
| Deep blue | `#002F6C` | Footer, featured plan, dark panels |
| Wash | `#EEF9FC` | Page tint behind the glass |
| Ink | `#0B3145` | Headings and body text |
| Ink soft | `#3F6478` | Secondary text |

The design language is **light glass**: a fixed blue wash behind the page, with frosted panels
(1px white edge, 20&nbsp;px blur) holding every section, plus brand-blue bands (featured plan,
booking summary, CTA, footer) for contrast. `src/styles/aqua.css` is the theme layer, it
re-points the older tokens, so changing a value there moves the whole site.

Type: **Inter** everywhere (variable, 200&ndash;700), self-hosted via `@fontsource-variable`, so
there are no external font requests and nothing falls back to a serif.

### Artwork

Photography now leads. `src/assets/` holds the supplied photographs, compressed to WebP:

| File | Used on |
| --- | --- |
| `hero-photo.webp` | Home hero, right half |
| `ben-za.webp` | Sample invitation, “the evening” section |
| `ben-za-portrait.webp` | Sample invitation, hero card window |
| `sample-wedding.webp`, `sample-birthday.webp`, `sample-portrait.webp` | Home sample cards |

`src/components/Artwork.jsx` still draws the original decorative SVGs (draped silk, arches,
orbiting moons) and remains available for anywhere a photograph is not supplied. To swap a photo,
keep the same filename and rebuild, the frames, overlays and rounded corners are all CSS.

Every card carries the Aetheria logo as a translucent watermark at the back of the artwork, and the
site footer carries the “Powered by Aetheria” credit required by the SLA for client pages.

## Privacy & legal

The privacy notice and terms are drafted from the supplied **Service Level Agreement** (fees,
2–4 / 4–6 working day delivery, Asset Freeze, revisions, cancellations, retention of 6 days live /
30 days archive / deletion on day 36, Cloudflare / Google Workspace / Tally as processors) and the
**Data Privacy Act of 2012 (RA 10173)** concepts: controller vs processor, lawful bases, data
subject rights, NPC complaint route.

> These documents are a good-faith draft for review, **not legal advice**. Have counsel review them
> before publishing, and keep the version number and date current.

## Going live

1. **Connect the forms.** Deploy `docs/booking-sheet.gs` inside the booking sheet and paste the
   `/exec` URL into `brand.bookingEndpoint`; that single line turns the form into a live page that
   writes to the sheet. Add acknowledgement emails from the same script when the domain is ready.
   The sample RSVP in `EventDemo.jsx` stays local on purpose.
2. **Automate retention.** Lock pages 6 days after the event, archive for 30 days, delete on day 36,
   and keep a deletion log without guest data.
3. **Wire analytics to consent.** Only load analytics when
   `document.documentElement.dataset.consent === 'all'`.
4. **Add real assets.** Event photography, confirmed business mobile number, social handles and
   final legal copy (see the Site Map page for the full checklist).
5. **Deploy** the `dist/` folder to Cloudflare Pages behind the WAF, with HSTS and a CSP.
   Because this is a single-page app, add an SPA fallback so deep links resolve:
   `public/_redirects` (`/*  /index.html  200`) already covers Netlify and Cloudflare Pages, and
   `netlify.toml` mirrors it. On other hosts, point 404s at `/index.html`.

`/site-map` contains the complete launch checklist, measurement plan and open decisions. The old
`/site-plan` address redirects to it, so links already shared keep working.

## Fonts

Inter is bundled from `@fontsource-variable` (SIL Open Font License) and is the only typeface
in the project, display, UI, forms, labels and numerals all use it.

### One-file build (no server needed)

`npm run build:single` produces a single self-contained HTML document, CSS, fonts,
artwork and the site-plan PDF are all inlined, and routing switches to `#/…` hashes so it
runs from a plain file. Use it when you need to hand the site to someone who will not run
`npm install`.

```bash
npm run build:single
node scripts/inline-single.mjs   # folds assets + PDF into Aetheria-Events-website.html
```

### One-file source document (the readable backup)

`npm run build:md` writes `aetheria-complete-source.md`, every tracked file in one document with a
contents list and syntax-highlighted fences. It reads `git ls-files`, so build output and
`node_modules` can never slip in, and it is the third file in the Drive backup beside the zip and
the single-file HTML.

`source/index.html` is the Vite template, not a page: opening it with a static file server
(including VS Code Live Server) shows a blank screen, because the browser receives raw JSX.
Use `npm run dev`, or the one-file build above.

## Live site

Built and published by GitHub Actions to <https://aetheria-events.github.io/ae-booking-web/>. Pages is set to
serve the workflow artifact, so what is live is always `dist` from `main`, never the source tree.

## Deploying

The site is a static bundle, so any host works; it is deployed to GitHub Pages from `main`.

GitHub Pages serves a project site from `https://<owner>.github.io/<repo>/`, not from the domain
root, so two things follow the base path automatically:

- `vite.config.js` takes the prefix from `GITHUB_REPOSITORY` during Actions builds (`/ae-booking-web/`,
  or none at all when the repository is named `<owner>.github.io`) and stays at `/` for local dev
  and Netlify.
- `BrowserRouter` receives that same prefix as `basename`, so `/ae-booking-web/booking` resolves instead
  of falling through to the 404 page.

Because both come from the repository running the build, the site can be moved to another account
or organisation without editing anything. See [`docs/moving-hosts.md`](./docs/moving-hosts.md).

Pages has no single-page-app fallback, so the workflow copies `dist/index.html` to `dist/404.html`
and adds `.nojekyll`. Deep links then boot the router and render the site's own not-found page.

Booking is unaffected by the host: the form posts to the Apps Script receiver in
`brand.bookingEndpoint`, not to the site's own domain.

### Sitemap and robots

`npm run build` runs `scripts/make-sitemap.mjs` afterwards, which writes `dist/sitemap.xml` for the
eight real routes and a `dist/robots.txt` pointing at it. `/site-plan` is deliberately left out: it
is a redirect, and a sitemap should only list final addresses.

The origin comes from `SITE_URL`, defaulting to `https://book.aetheriaevents.com`, the domain the
site is headed for. The Pages workflow derives `SITE_URL` from the repository that runs the job, so
the mirror's own sitemap stays truthful, path prefix included, wherever the site is hosted.
Override it in any other build:

```bash
SITE_URL=https://example.com npm run build
```

Note that `robots.txt` is only read from a domain root. On the Pages mirror it lands at
`/ae-booking-web/robots.txt` and is ignored, which is expected; on the custom domain it is honoured.
