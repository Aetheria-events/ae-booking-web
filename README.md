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
  styles/                  base (tokens), layout, components, pages, event, print
```

### Design tokens

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0B0810` | Primary background |
| Plum | `#3B2043` | Depth, gradients |
| Rose | `#C98D9E` | Warmth, glow |
| Gold | `#C3A05F` | Accents, CTAs |
| Ivory | `#F8F2E8` | Light sections |
| Dusk | `#9D91A3` | Muted text |

Type: **Cormorant Garamond** (display) and **Jost** (UI, forms, labels), self-hosted via
`@fontsource-variable` so there are no external font requests.

### Artwork

All imagery is **original SVG generated in code** (`src/components/Artwork.jsx`): draped silk,
arches, orbiting moons, blooms and a subtle film grain. Nothing is stock photography, so there are
no image licences and no layout shift. To use real event photography, replace an `<Artwork />`
with an `<img className="art" src="…" />` inside the same `.art-frame` — the frames, overlays and
watermarks already handle framing.

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
4. **Add real assets.** Event photography, confirmed coordinator mobile number, social handles and
   final legal copy (see the Site plan page for the full checklist).
5. **Deploy** the `dist/` folder to Cloudflare Pages behind the WAF, with HSTS and a CSP.
   Because this is a single-page app, add an SPA fallback so deep links resolve:
   `public/_redirects` (`/*  /index.html  200`) already covers Netlify and Cloudflare Pages, and
   `netlify.toml` mirrors it. On other hosts, point 404s at `/index.html`.

`/site-plan` contains the complete launch checklist, measurement plan and open decisions.

## Fonts

Cormorant Garamond and Jost are bundled from `@fontsource-variable` (SIL Open Font License).
