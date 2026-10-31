import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileText, Printer, Shield, Warning } from '../components/Icons';
import { brand } from '../data/site';
import { usePageMeta } from '../lib/hooks';

const sitemap = [
  {
    label: 'Marketing',
    pages: [
      { name: 'Home', path: '/', status: 'live' },
      { name: 'Packages & pricing', path: '/packages', status: 'live' },
      { name: 'Booking request', path: '/booking', status: 'live' },
    ],
  },
  {
    label: 'Proof',
    pages: [
      { name: 'Sample invitation', path: '/invitation', status: 'live' },
      { name: 'Site plan', path: '/site-plan', status: 'live' },
    ],
  },
  {
    label: 'Trust & legal',
    pages: [
      { name: 'Privacy notice', path: '/privacy', status: 'wip' },
      { name: 'Service terms', path: '/terms', status: 'wip' },
      { name: 'Privacy dialog', path: 'site-wide', status: 'live' },
    ],
  },
  {
    label: 'System',
    pages: [
      { name: '404 / not found', path: '/404', status: 'live' },
      { name: 'Booking success state', path: '/booking', status: 'live' },
      { name: 'RSVP success state', path: '/invitation#rsvp', status: 'live' },
    ],
  },
];

const pages = [
  {
    title: 'Home',
    purpose:
      'Make the offer legible in ten seconds: what Aetheria Events makes, what it costs, and how quickly it arrives.',
    action: 'Primary CTA: Reserve your date → booking.',
  },
  {
    title: 'Packages & pricing',
    purpose:
      'Turn the SLA into a decision. Three tiers, optional fees, a side-by-side comparison and honest policy notes.',
    action: 'Primary CTA: Book this plan (carries the plan into the form).',
  },
  {
    title: 'Booking',
    purpose:
      'A short, low-friction request form — package, event, contact details, consent — with a live estimated total.',
    action: 'Primary CTA: Send booking request.',
  },
  {
    title: 'Sample invitation',
    purpose:
      'Show, don’t tell. A full event page with countdown, venue, schedule, save-the-date/contact and RSVP.',
    action: 'Guest CTA: Send my RSVP.',
  },
  {
    title: 'Privacy notice',
    purpose:
      'Your defence and your promise: what is collected, why, who sees it, how long it is kept, and how to complain.',
    action: 'Contact the DPO / change privacy settings.',
  },
  {
    title: 'Service terms',
    purpose:
      'A readable summary of the SLA: packages, delivery, revisions, refunds, data roles and liability.',
    action: 'Read the full agreement / book.',
  },
];

const swatches = [
  { name: 'Ink', hex: '#0B0810', use: 'Primary background' },
  { name: 'Plum', hex: '#3B2043', use: 'Depth, gradients' },
  { name: 'Rose', hex: '#C98D9E', use: 'Warmth, glow' },
  { name: 'Gold', hex: '#C3A05F', use: 'Accents, CTAs' },
  { name: 'Ivory', hex: '#F8F2E8', use: 'Light sections' },
  { name: 'Dusk', hex: '#9D91A3', use: 'Muted text' },
];

const assetChecklist = [
  'Vector logo files (SVG/AI/EPS) and any partner marks',
  'Twelve to twenty real event photographs for the portfolio and page mock-ups',
  'Confirmed brand palette and type preferences, if different from this direction',
  'A studio mobile number and social handles for the footer',
  'Final domain name and Cloudflare/DNS access',
  'Signed-off privacy notice and service terms, reviewed by counsel',
  'Booking inbox address, plus the person who owns replies',
  'Real packages, fees and lead times — currently taken from the SLA',
];

const buildSteps = [
  {
    title: 'Front-end',
    body: 'React + Vite single-page app. Static build, no server required to browse. Routes: home, packages, booking, invitation, privacy, terms, site plan, 404.',
  },
  {
    title: 'Booking endpoint',
    body: 'The form currently saves to the browser in preview. Before launch, POST submissions to a secure endpoint (Google Apps Script → Sheets, Formspree, or a Cloudflare Worker) and send an acknowledgement email.',
  },
  {
    title: 'Email & RSVP automation',
    body: 'Standard/Premium require guest confirmation emails and a dashboard. Tally + Google Sheets can run the pilot; a small Worker can handle accept/decline and seating.',
  },
  {
    title: 'Analytics with consent',
    body: 'Load analytics only when localStorage consent allows it (document.documentElement.dataset.consent === "all"). Prefer a privacy-friendly, cookieless tool.',
  },
  {
    title: 'Hosting & security',
    body: 'Deploy the static build to Cloudflare Pages behind the WAF, with bot protection on admin routes. Enable HSTS and a strict content security policy.',
  },
  {
    title: 'Data lifecycle',
    body: 'Automate the six-day lock, 30-day archive and day-36 deletion. Keep a deletion log with no guest data, and a named DPO for requests.',
  },
];

const launchChecklist = [
  'Booking form connected and tested end to end (including error and success states)',
  'Privacy dialog appears once, records a choice, and can be reopened from every footer',
  'Privacy notice and terms reviewed by counsel; version and date updated',
  'DPO inbox tested and monitored; request process documented',
  'Analytics fire only after consent; no advertising or tracking pixels',
  'Meta titles, descriptions and social preview image set per page',
  'Keyboard-only pass and screen-reader spot check on forms, menus and dialog',
  'Lighthouse performance, accessibility and best-practice scores reviewed',
  'Every telephone number, email and address verified',
  'Sample invitation clearly labelled, or replaced with a real client event',
];

const warnings = [
  'Legal copy is a good-faith draft based on the SLA — not legal advice.',
  'The booking form has no server yet; submissions stay in the visitor’s browser.',
  'Event photography is represented by original code-drawn artwork until real photos are supplied.',
];

export default function SitePlan() {
  usePageMeta(
    'Site plan — Aetheria Events',
    'The plan behind the Aetheria Events website: sitemap, page intent, design system, privacy and compliance plan, integrations, content checklist and launch checklist.',
  );

  return (
    <>
      <section className="page-hero plan-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Site plan</span>
          </nav>
          <p className="eyebrow">Project plan</p>
          <h1>
            The plan behind
            <span className="italic gold"> the page.</span>
          </h1>
          <p className="page-hero__lede">
            A working sitemap, design system, content checklist and compliance plan for the Aetheria
            Events website — including what is finished, what needs a decision, and what must happen
            before launch.
          </p>

          <div className="plan-meta">
            <div className="plan-meta__item">
              <span>Client</span>
              <strong>Aetheria Events</strong>
            </div>
            <div className="plan-meta__item">
              <span>Scope</span>
              <strong>Marketing site + booking + sample invitation</strong>
            </div>
            <div className="plan-meta__item">
              <span>Build</span>
              <strong>React 19 + Vite</strong>
            </div>
            <div className="plan-meta__item">
              <span>Version</span>
              <strong>1.0 · 30 October 2026</strong>
            </div>
            <div className="plan-meta__item">
              <span>Status</span>
              <strong>Ready for review</strong>
            </div>
          </div>

          <div className="no-print" style={{ marginTop: '1.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => window.print()}>
              <Printer style={{ width: 14, height: 14 }} aria-hidden="true" />
              Print this plan
            </button>
            <a
              className="btn btn--ghost btn--sm"
              href="/aetheria-events-site-plan.pdf"
              download="Aetheria-Events-Site-Plan.pdf"
            >
              <FileText style={{ width: 14, height: 14 }} aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <div className="theme-light leads-light">
        <div className="wrap">
          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">01 · Objectives</p>
                <h2>What the site has to do.</h2>
              </div>
              <p>
                The website is a sales tool and a trust document. It should make the service feel
                expensive and calm, answer the questions that stall a booking, and capture the request
                without asking too much.
              </p>
            </div>

            <div className="plan-grid-2">
              <div className="plan-block">
                <h3>Convert</h3>
                <p>
                  One obvious path from curiosity to a booking request. Package prices visible
                  immediately, a form that takes minutes, and a live estimate so nothing is a surprise.
                </p>
              </div>
              <div className="plan-block">
                <h3>Reassure</h3>
                <p>
                  Privacy, refunds, delivery dates and liability in plain language. A consent dialog,
                  a real DPO contact and terms grounded in the SLA keep the studio credible — and
                  reduce disputes before they start.
                </p>
              </div>
              <div className="plan-block">
                <h3>Demonstrate</h3>
                <p>
                  A full sample invitation shows the product better than any description: countdown,
                  schedule, save-the-date, contact download and an RSVP with consent built in.
                </p>
              </div>
              <div className="plan-block">
                <h3>Stay honest</h3>
                <p>
                  No fake testimonials, no invented client names, no stock photos passing as portfolio
                  work. Sample content is labelled as sample until real events replace it.
                </p>
              </div>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">02 · Sitemap</p>
                <h2>Eleven destinations, one journey.</h2>
              </div>
              <p>
                Navigation stays short: Home, Packages, Invitation, Site plan and Booking in the
                header. Legal pages live in the footer, where they belong, but every form links to
                them inline.
              </p>
            </div>

            <div className="sp-map">
              {sitemap.map((branch) => (
                <div className="sp-branch" key={branch.label}>
                  <span className="sp-branch__label">{branch.label}</span>
                  <div className="sp-pages">
                    {branch.pages.map((page) => (
                      <span className="sp-page" key={page.name}>
                        <span
                          className={`status status--${page.status}`}
                          aria-hidden="true"
                        />
                        {page.name}
                        <span style={{ color: 'var(--on-light-mute)', fontSize: '0.66rem' }}>
                          {page.path}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="status-legend">
              <span>
                <span className="status status--live" aria-hidden="true" /> Built in this version
              </span>
              <span>
                <span className="status status--wip" aria-hidden="true" /> Built, awaiting legal review
              </span>
              <span>
                <span className="status status--next" aria-hidden="true" /> Next phase / service side
              </span>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">03 · Page intent</p>
                <h2>What each page is for.</h2>
              </div>
              <p>
                Each page has a single job and a single primary action. Anything that does not help
                that action is decoration — and decoration has to earn its place.
              </p>
            </div>

            <div className="plan-grid-2">
              {pages.map((page) => (
                <div className="plan-block" key={page.title}>
                  <h3>{page.title}</h3>
                  <p>{page.purpose}</p>
                  <p style={{ marginBottom: 0, color: 'var(--gold-600)', fontSize: '0.78rem' }}>
                    {page.action}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">04 · Journeys</p>
                <h2>Two people, two paths.</h2>
              </div>
              <p>
                The site serves the organizer and the guest, and the two journeys must never confuse
                each other. The invitation lives on its own route with its own visual world.
              </p>
            </div>

            <div className="plan-grid-2">
              <div className="plan-block">
                <h3>Organizer → booking</h3>
                <ul className="check-list">
                  <li><Check aria-hidden="true" /> Arrives from social or referral; reads the home page.</li>
                  <li><Check aria-hidden="true" /> Checks prices and inclusions; opens the sample invitation.</li>
                  <li><Check aria-hidden="true" /> Clicks a plan; the package is pre-selected in the form.</li>
                  <li><Check aria-hidden="true" /> Completes the form, sees an estimate, consents to the privacy notice.</li>
                  <li><Check aria-hidden="true" /> Receives a reference and next steps; invoice follows by email.</li>
                </ul>
              </div>
              <div className="plan-block">
                <h3>Guest → RSVP</h3>
                <ul className="check-list">
                  <li><Check aria-hidden="true" /> Opens the event link from an invitation or QR.</li>
                  <li><Check aria-hidden="true" /> Reads the date, venue, dress code and schedule.</li>
                  <li><Check aria-hidden="true" /> Saves the date and the studio’s contact.</li>
                  <li><Check aria-hidden="true" /> Replies with attendance, guest count and consent.</li>
                  <li><Check aria-hidden="true" /> Receives confirmation once the host accepts the RSVP.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">05 · Design system</p>
                <h2>Celestial, restrained, legible.</h2>
              </div>
              <p>
                Cormorant Garamond carries the romance; Jost keeps labels, forms and prices crisp.
                Dark sections set the mood, ivory sections make reading and transacting easy.
              </p>
            </div>

            <div className="token-grid">
              {swatches.map((swatch) => (
                <div className="swatch" key={swatch.name}>
                  <div className="swatch__color" style={{ background: swatch.hex }} />
                  <div className="swatch__meta">
                    <strong>{swatch.name}</strong>
                    <span>{swatch.hex}</span>
                    <span>{swatch.use}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="type-specimen">
              <p className="type-specimen__display">Moments that feel like destiny.</p>
              <p className="type-specimen__sans">Cormorant Garamond · Jost · letterspaced labels</p>
              <p className="type-specimen__body">
                Body copy sits at 16–18px with 1.7 line height for comfortable reading. Forms keep
                labels above fields, visible focus rings and inline error messages that explain how to
                fix the problem.
              </p>
              <div className="type-specimen__labels">
                <span>Display · 300–400</span>
                <span>Body · 350–400</span>
                <span>Labels · 450–500</span>
                <span>Radius · 12–42px</span>
                <span>Motion · 400–900ms</span>
              </div>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">06 · Privacy &amp; compliance</p>
                <h2>Designed to be defensible.</h2>
              </div>
              <p>
                The pop-up is not decoration. It records a choice, controls what loads, and links to a
                notice that names the DPO, the processors and the deletion date.
              </p>
            </div>

            <div className="plan-grid-2">
              <div className="plan-block">
                <h3>What is in place</h3>
                <ul className="check-list">
                  <li>
                    <Check aria-hidden="true" /> Consent dialog on first visit with Accept all /
                    Essential only, stored in localStorage and reopenable from every footer.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Privacy notice covering clients, guests and visitors,
                    with DPO contact and NPC complaint route.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Required consent checkboxes on booking and RSVP, plus
                    an optional, unticked marketing box.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Explicit “do not send” guidance for health, ID and
                    financial data in forms.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Retention language mirrored from the SLA: 6-day live
                    window, 30-day archive, deletion on day 36.
                  </li>
                </ul>
              </div>
              <div className="plan-block">
                <h3>Still required</h3>
                <ul className="check-list check-list--warning">
                  <li>
                    <Warning aria-hidden="true" /> Legal review of the privacy notice and terms by
                    Philippine counsel.
                  </li>
                  <li>
                    <Warning aria-hidden="true" /> A named DPO, a monitored inbox and a documented
                    request/breach procedure.
                  </li>
                  <li>
                    <Warning aria-hidden="true" /> Consent log retention evidence (dates, versions,
                    choices) if analytics is enabled.
                  </li>
                  <li>
                    <Warning aria-hidden="true" /> Signed processor agreements with Google, Cloudflare
                    and Tally.
                  </li>
                  <li>
                    <Warning aria-hidden="true" /> Automated deletion job with a guest-data-free
                    deletion log.
                  </li>
                </ul>
              </div>
            </div>

            <div className="notice notice--light" style={{ marginTop: '1.2rem' }}>
              <span className="notice__icon" aria-hidden="true">
                <Shield />
              </span>
              <span>
                <strong>What a pop-up can and cannot do.</strong> A clear notice and consent flow
                reduce risk and show good faith; they do not by themselves prevent a complaint or a
                suit. Pair them with actual minimisation, access control, a retention schedule and
                counsel-reviewed documents.
              </span>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">07 · Content &amp; assets</p>
                <h2>What we still need from the client.</h2>
              </div>
              <p>
                The site is complete with placeholders. Real photographs, contact details and
                reviewed legal copy are the difference between a demo and a launch.
              </p>
            </div>

            <div className="plan-grid-2">
              <div className="plan-block">
                <h3>Assets to supply</h3>
                <ul className="check-list check-list--warning">
                  {assetChecklist.map((item) => (
                    <li key={item}>
                      <Warning aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="plan-block">
                <h3>Content decisions</h3>
                <ul className="check-list">
                  <li>
                    <Check aria-hidden="true" /> Keep the celestial palette, or switch to the
                    client&rsquo;s existing brand colours.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Keep the sample invitation as a permanent
                    demonstration, or replace it with a real event.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Publish the full SLA as a PDF, or keep the summary
                    on this site only.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Add a portfolio and testimonials only with written
                    permission from clients.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Confirm whether bookings require a deposit, and
                    update the form copy accordingly.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">08 · Build &amp; integrations</p>
                <h2>How it runs.</h2>
              </div>
              <p>
                The prototype is intentionally static: it can be reviewed anywhere, then wired to
                real endpoints without redesigning a thing.
              </p>
            </div>

            <div className="plan-grid-2">
              {buildSteps.map((step) => (
                <div className="plan-block" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">09 · Launch</p>
                <h2>Before the doors open.</h2>
              </div>
              <p>
                A short, non-negotiable checklist. Every item either protects a guest, protects the
                business, or protects the design.
              </p>
            </div>

            <div className="plan-grid-2">
              <div className="plan-block">
                <h3>Checklist</h3>
                <ul className="check-list">
                  {launchChecklist.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="plan-block">
                <h3>Measure</h3>
                <ul className="check-list">
                  <li>
                    <Check aria-hidden="true" /> Booking form completion rate (starts vs. submits).
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Package page → booking click-through.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Invitation RSVP completion and guest count accuracy.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Enquiries per week, and time to first reply.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Mobile share of traffic and mobile form errors.
                  </li>
                  <li>
                    <Check aria-hidden="true" /> Consent choice split, to decide whether analytics is
                    worth keeping.
                  </li>
                </ul>
                <p style={{ marginTop: '0.9rem', marginBottom: 0 }}>
                  Analytics is loaded only when the visitor allows it; numbers stay aggregate and
                  anonymous.
                </p>
              </div>
            </div>
          </section>

          <section className="plan-section">
            <div className="plan-section__head">
              <div>
                <p className="eyebrow">10 · Open questions</p>
                <h2>What we need to decide next.</h2>
              </div>
              <p>
                These are the conversations that turn the prototype into the studio&rsquo;s real
                website.
              </p>
            </div>

            <div className="plan-grid-2">
              <div className="plan-block">
                <h3>Decisions</h3>
                <ul className="check-list check-list--warning">
                  {warnings.map((item) => (
                    <li key={item}>
                      <Warning aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="plan-block">
                <h3>Suggested sequence</h3>
                <p>
                  1. Approve the direction and palette. 2. Send real photography and final contact
                  details. 3. Connect the booking endpoint and test it. 4. Send legal copy for review.
                  5. Deploy to Cloudflare Pages, connect the domain, run the launch checklist.
                </p>
                <p style={{ marginBottom: 0, color: 'var(--gold-600)' }}>
                  Estimated handover: five working days after assets and legal sign-off.
                </p>
              </div>
            </div>
          </section>

          <section className="plan-section" style={{ borderTop: 0 }}>
            <div className="plan-grid-2">
              <div>
                <p className="eyebrow">Ready to review?</p>
                <h2 style={{ color: 'var(--on-light)', maxWidth: '16ch' }}>
                  Walk the journey yourself.
                </h2>
                <p style={{ marginTop: '0.8rem', color: 'var(--on-light-dim)', maxWidth: '46ch' }}>
                  Open the sample invitation as a guest, then send a booking request the way a client
                  would. Both flows are fully interactive.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignSelf: 'center', justifyContent: 'flex-end' }}>
                <Link to="/booking" className="btn btn--gold">
                  Test the booking form
                  <ArrowRight />
                </Link>
                <Link to="/invitation" className="btn btn--ink-ghost">
                  Open the invitation
                </Link>
              </div>
            </div>

            <p className="plan-note">
              Prepared for {brand.name} · {brand.address} · {brand.email}. This plan is a working
              document shared with the client; it is not a contract. Legal text on this site is a
              good-faith draft based on the Service Level Agreement and the Data Privacy Act of 2012
              (RA 10173) and should be reviewed by counsel before publication. The full SLA remains
              the governing document for all bookings.
            </p>

            <p style={{ marginTop: '1rem' }}>
              <Link to="/privacy" className="text-link">
                <FileText style={{ width: 12, height: 12 }} aria-hidden="true" />
                Privacy notice
                <ArrowRight />
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
