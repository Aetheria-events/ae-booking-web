# Aetheria Events — website

A bespoke marketing site, booking flow and sample digital invitation for **Aetheria Events**
(Bonifacio Global City, Taguig). Built with React 19 + Vite as a static single-page app.

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
| `/packages` | Full pricing, inclusions, optional fees, side-by-side comparison, plain-language terms |
| `/booking` | Simple booking form — package, event, contact details, consent, live estimate |
| `/invitation` | Labelled sample event page: countdown, details, schedule, save-the-date/contact, RSVP |
| `/privacy` | Privacy notice (PIC/PIP roles, retention, rights, guest notice, DPO) |
| `/terms` | Service terms summarised from the SLA (delivery, revisions, refunds, liability) |
| `/site-plan` | Sitemap, page intent, design system, compliance plan, checklist, open questions |
| `/aetheria-events-site-plan.pdf` | Downloadable PDF of the site plan for sending to the client |
| any other | 404 page |

The header shows Home, Packages, Invitation, Site plan and a “Book your date” button; legal pages
live in the footer and are linked inline from every form.

## What is interactive

- **Booking form** — client-side validation with inline errors and an error summary, a package
  selector that carries over from the packages page (`/booking?package=premium`), rush-service
  pricing that respects package restrictions, a live estimated total, consent capture, and a
  success state with a reference number, a downloadable `.txt` summary, a mailto hand-off and an
  `.ics` “hold the date”.
- **Sample invitation** — live countdown, add-to-calendar (`.ics`), save-contact (`.vcf`), venue
  maps link, RSVP with attendance, guest count, optional note and consent.
- **Privacy dialog** — appears once on first visit, offers *Accept all*, *Essential only* and
  *Decline non-essential*, records the choice in `localStorage` (`aetheria.consent.v1`), exposes it
  as `document.documentElement.dataset.consent`, traps focus, closes on `Esc`, and can be reopened
  from every footer under “Privacy settings”.
- **Site plan** — printable, and downloadable as a PDF from `/aetheria-events-site-plan.pdf`.

Both forms currently store submissions in the visitor’s browser only. Nothing is transmitted —
see “Going live” below.

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
booking summary, CTA, footer) for contrast. `src/styles/aqua.css` is the theme layer — it
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
keep the same filename and rebuild — the frames, overlays and rounded corners are all CSS.

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

1. **Connect the forms.** Point `handleSubmit` in `src/pages/Booking.jsx` (and `EventDemo.jsx` for
   the sample RSVP) at a real endpoint — Google Apps Script → Sheets, Formspree, or a Cloudflare
   Worker — and send acknowledgement emails. Keep the existing validation and success states.
2. **Automate retention.** Lock pages 6 days after the event, archive for 30 days, delete on day 36,
   and keep a deletion log without guest data.
3. **Wire analytics to consent.** Only load analytics when
   `document.documentElement.dataset.consent === 'all'`.
4. **Add real assets.** Event photography, confirmed business mobile number, social handles and
   final legal copy (see the Site plan page for the full checklist).
5. **Deploy** the `dist/` folder to Cloudflare Pages behind the WAF, with HSTS and a CSP.
   Because this is a single-page app, add an SPA fallback so deep links resolve:
   `public/_redirects` (`/*  /index.html  200`) already covers Netlify and Cloudflare Pages, and
   `netlify.toml` mirrors it. On other hosts, point 404s at `/index.html`.

`/site-plan` contains the complete launch checklist, measurement plan and open decisions.

## Fonts

Inter is bundled from `@fontsource-variable` (SIL Open Font License) and is the only typeface
in the project — display, UI, forms, labels and numerals all use it.

### One-file build (no server needed)

`npm run build:single` produces a single self-contained HTML document — CSS, fonts,
artwork and the site-plan PDF are all inlined, and routing switches to `#/…` hashes so it
runs from a plain file. Use it when you need to hand the site to someone who will not run
`npm install`.

```bash
npm run build:single
node scripts/inline-single.mjs   # folds assets + PDF into Aetheria-Events-website.html
```

`source/index.html` is the Vite template, not a page: opening it with a static file server
(including VS Code Live Server) shows a blank screen, because the browser receives raw JSX.
Use `npm run dev`, or the one-file build above.
