import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Artwork from '../components/Artwork';
import { ArrowRight, Calendar, Clock, Shield, Sparkle, Star, Users } from '../components/Icons';
import Logo, { LogoMark } from '../components/Logo';
import Marquee from '../components/Marquee';
import PlanCard from '../components/PlanCard';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { brand, event, homeFaqs, packages, processSteps } from '../data/site';
import { downloadCalendar } from '../lib/files';
import { usePageMeta } from '../lib/hooks';

const styles = [
  {
    meta: 'Weddings · Standard',
    title: 'The Ivory Suite',
    desc: 'Candlelight, garden aisles and a page that reads like letterpress.',
    variant: 'veil',
    palette: 'plum',
  },
  {
    meta: 'Corporate · Premium',
    title: 'Amber Assembly',
    desc: 'Precise details and zero friction — for four hundred guests.',
    variant: 'orb',
    palette: 'champagne',
  },
  {
    meta: 'Milestones · Standard',
    title: 'The Blush Hour',
    desc: 'Debuts, birthdays and anniversaries — as personal as the toast.',
    variant: 'bloom',
    palette: 'rose',
  },
];

const stats = [
  { value: '2–4', label: 'Working days to deliver' },
  { value: '3', label: 'Packages, no hidden fees' },
  { value: '6', label: 'Days live after the event' },
  { value: '36', label: 'Days until data deletion' },
];

const assurances = [
  {
    icon: Shield,
    title: 'Privacy by design',
    body: 'A privacy notice, consent capture and automatic deletion on day 36 after your event.',
  },
  {
    icon: Clock,
    title: 'A delivery date you can hold',
    body: '2–4 working days for Basic and Standard, 4–6 for Premium — counted from payment and Asset Freeze.',
  },
  {
    icon: Users,
    title: 'An RSVP that actually works',
    body: 'Standard and Premium include a private dashboard to accept guests, assign seating and track replies.',
  },
  {
    icon: Star,
    title: 'Art-directed, not templated',
    body: 'Palette, typography and layout composed around your celebration — never a stock theme.',
  },
];

export default function Home() {
  usePageMeta(
    'Aetheria Events — Digital invitations for unforgettable celebrations',
    'Aetheria Events designs bespoke digital event pages with online RSVP for weddings, debuts, corporate gatherings and milestones. Live in 2–6 working days. Based in Bonifacio Global City, Taguig.',
  );

  const saveSampleDate = () => {
    downloadCalendar({
      filename: 'isabel-and-mateo.ics',
      title: `${event.bride} & ${event.groom} — ${event.type}`,
      description: 'A sample invitation by Aetheria Events. RSVP online.',
      location: `${event.venueAddress}`,
      start: event.isoDate,
    });
  };

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Aetheria Events · Philippines</p>
            <h1>
              Moments that feel
              <span className="italic">like destiny.</span>
            </h1>
            <p className="hero__lede">
              Bespoke digital invitations for weddings, debuts and corporate evenings — with online
              RSVP, a guest list, and a private dashboard. Delivered in days, remembered for years.
            </p>
            <div className="hero__actions">
              <Link to="/booking" className="btn btn--gold btn--lg">
                Reserve your date
                <ArrowRight />
              </Link>
              <Link to="/packages" className="btn btn--ghost btn--lg">
                View packages
              </Link>
            </div>

            <dl className="hero__meta">
              <div className="hero__meta-item">
                <dt className="hero__meta-label">Packages from</dt>
                <dd className="hero__meta-value">₱1,499</dd>
              </div>
              <div className="hero__meta-item">
                <dt className="hero__meta-label">Delivered in</dt>
                <dd className="hero__meta-value">2–4 days</dd>
              </div>
              <div className="hero__meta-item">
                <dt className="hero__meta-label">Live after the event</dt>
                <dd className="hero__meta-value">6 days</dd>
              </div>
            </dl>
          </div>

          <div className="stage">
            <div className="stage__halo" aria-hidden="true" />

            <svg className="stage__rings" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
              <g fill="none" stroke="rgba(233,211,166,0.32)" strokeWidth="0.8">
                <circle cx="300" cy="300" r="286" opacity="0.45" />
                <circle cx="300" cy="300" r="232" opacity="0.3" strokeDasharray="1 7" />
                <ellipse cx="300" cy="300" rx="286" ry="118" transform="rotate(-22 300 300)" opacity="0.35" />
                <ellipse cx="300" cy="300" rx="150" ry="288" transform="rotate(30 300 300)" opacity="0.16" />
              </g>
            </svg>

            <div className="watermark" aria-hidden="true">
              <Logo as="span" />
            </div>

            <div className="stage__chip stage__chip--a">
              <span className="dot-live" aria-hidden="true" />
              RSVP live
            </div>
            <div className="stage__chip stage__chip--b">
              <Sparkle style={{ width: 12, height: 12 }} aria-hidden="true" />
              142 replies
            </div>

            <article className="invite">
              <div className="invite__window">
                <Artwork variant="ribbon" palette="plum" />
                <div className="style-card__watermark" aria-hidden="true">
                  <Logo as="span" showSub={false} />
                </div>
                <span className="invite__chip">The Wedding</span>
              </div>
              <div className="invite__plate">
                <p className="invite__names">
                  Isabel <span className="amp">&amp;</span> Mateo
                </p>
                <p className="invite__date">14 · 02 · 2027 — Makati City</p>
                <Link to="/invitation" className="invite__link">
                  Open the invitation
                  <ArrowRight style={{ width: 12, height: 12 }} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <div className="save-bar">
              <span className="save-bar__icon" aria-hidden="true">
                <Calendar style={{ width: 18, height: 18 }} />
              </span>
              <span className="save-bar__text">
                <strong>Save the date</strong>
                <span>14 February 2027 · {event.venue}</span>
              </span>
              <button type="button" className="btn btn--dark" onClick={saveSampleDate}>
                Add to calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ---------------- difference ---------------- */}
      <section className="section">
        <div className="wrap split">
          <div className="split__sticky">
            <p className="eyebrow">The Aetheria difference</p>
            <h2>A quiet kind of luxury, built to be shared.</h2>
            <p className="lede" style={{ marginTop: '1.2rem' }}>
              We are not a template shop. Every page is composed for one event, tested on every
              screen, and handed over with the guest data already accounted for.
            </p>
            <Link to="/site-plan" className="text-link" style={{ marginTop: '1.6rem' }}>
              Read the full site plan
              <ArrowRight />
            </Link>
          </div>

          <div>
            <div className="diff-list">
              <Reveal as="div" className="diff">
                <span className="diff__num">01</span>
                <div>
                  <h3 className="diff__title">Designed around your event</h3>
                  <p className="diff__body">
                    Your palette, your venue, your story. We art-direct the page to match the room it
                    is inviting people into — then test every link, form and screen before you ever
                    see it.
                  </p>
                </div>
              </Reveal>
              <Reveal as="div" className="diff" delay={80}>
                <span className="diff__num">02</span>
                <div>
                  <h3 className="diff__title">An RSVP you can actually manage</h3>
                  <p className="diff__body">
                    Guests reply online; you accept, decline or seat them from a private dashboard.
                    Confirmations send automatically in Standard and Premium, and the guest list is
                    always exportable while the page is live.
                  </p>
                </div>
              </Reveal>
              <Reveal as="div" className="diff" delay={160}>
                <span className="diff__num">03</span>
                <div>
                  <h3 className="diff__title">Privacy that is already handled</h3>
                  <p className="diff__body">
                    A plain-language notice for guests, consent on every form, restricted access and a
                    hard deletion date. You host the celebration; we look after the data behind it.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="stats" delay={200}>
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <div className="stat__value">{stat.value}</div>
                  <div className="stat__label">{stat.label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- selected expressions ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Selected expressions"
            title={
              <>
                Three atmospheres,
                <br />
                one signature.
              </>
            }
          >
            <p>
              A glimpse of what can be composed: fine-art restraint, candlelit warmth, or a little
              celestial drama. Each is a direction, not a locked template.
            </p>
            <Link to="/invitation" className="text-link" style={{ marginTop: '1.2rem' }}>
              Open a full sample page
              <ArrowRight />
            </Link>
          </SectionHead>

          <div className="style-grid">
            {styles.map((style, index) => (
              <Reveal as="article" className="style-card" key={style.title} delay={index * 90}>
                <div className="style-card__media">
                  <Artwork variant={style.variant} palette={style.palette} />
                  <div className="style-card__watermark" aria-hidden="true">
                    <Logo as="span" />
                  </div>
                  <div className="style-card__body">
                    <span className="style-card__meta">{style.meta}</span>
                    <h3 className="style-card__title">{style.title}</h3>
                    <p className="style-card__desc">{style.desc}</p>
                    <Link to="/invitation" className="style-card__cta">
                      View the sample
                      <ArrowRight style={{ width: 12, height: 12 }} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- packages ---------------- */}
      <section className="section theme-light leads-light" id="packages">
        <div className="wrap">
          <div className="pricing__head">
            <div>
              <p className="eyebrow">Packages</p>
              <h2>
                A clear price,
                <br />
                a beautiful deadline.
              </h2>
            </div>
            <div>
              <p className="lede" style={{ maxWidth: '46ch' }}>
                One-time fees. No retainers, no surprise charges. Every package includes two rounds
                of minor revisions and a page that stays live for six days after the event.
              </p>
              <Link to="/packages" className="text-link" style={{ marginTop: '1.2rem' }}>
                Compare every inclusion
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="plan-grid">
            {packages.map((plan, index) => (
              <Reveal className="plan-grid__cell" key={plan.id} delay={index * 80}>
                <PlanCard plan={plan} compact ctaLabel="Book this plan" />
              </Reveal>
            ))}
          </div>

          <p className="plan-note">
            Optional rush services: Express Rush ₱350 · Ultra-Express Same-Day ₱750 (Basic and
            Standard only) · Re-Layout ₱500. All optional services are subject to availability and
            approval by Aetheria Events.
          </p>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="How it works"
            title="From the booking form to the first RSVP."
          >
            <p>
              A short, well-lit path. The delivery clock starts the next working day after we receive
              both your payment and your Asset Freeze — the moment every photo, colour and venue
              detail is final.
            </p>
          </SectionHead>

          <div className="process">
            {processSteps.map((step, index) => (
              <Reveal as="div" className="step" key={step.step} delay={index * 90}>
                <span className="step__num">{step.step}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- manifesto ---------------- */}
      <section className="manifesto">
        <div className="wrap">
          <LogoMark className="manifesto__mark" />
          <p>
            We design for the hush <em>before</em> the link opens — and the joy after.
          </p>
          <cite>Aetheria Events · Bonifacio Global City</cite>
        </div>
      </section>

      {/* ---------------- assurance + faq ---------------- */}
      <section className="section section--flush-top">
        <div className="wrap">
          <div className="assurance-grid">
            {assurances.map(({ icon: Icon, title, body }) => (
              <div className="assurance" key={title}>
                <span className="assurance__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="assurance__title">{title}</span>
                <p className="assurance__body">{body}</p>
              </div>
            ))}
          </div>

          <div className="split" style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
            <div className="split__sticky">
              <p className="eyebrow">Before you book</p>
              <h2>Everything you might ask.</h2>
              <p className="lede" style={{ marginTop: '1.2rem' }}>
                Straight answers, taken from the same Service Level Agreement your booking is held
                to.
              </p>
              <Link to="/terms" className="text-link" style={{ marginTop: '1.6rem' }}>
                Read the service terms
                <ArrowRight />
              </Link>
            </div>
            <Accordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section className="section section--flush-top">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div>
                <p className="eyebrow">Reserve a date</p>
                <h2>Let&rsquo;s put your event in the sky.</h2>
                <p className="lede" style={{ marginTop: '1rem', maxWidth: '46ch' }}>
                  Tell us the date and the feeling. We&rsquo;ll reply within one working day with an
                  invoice, the intake link and a timeline.
                </p>
              </div>
              <div className="cta-band__actions">
                <Link to="/booking" className="btn btn--gold">
                  Start your booking
                  <ArrowRight />
                </Link>
                <a href={`mailto:${brand.email}`} className="btn btn--ghost">
                  Email the studio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
