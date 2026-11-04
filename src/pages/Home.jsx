import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import { ArrowRight, Calendar, Clock, Shield, Sparkle, Star, Users } from '../components/Icons';
import heroPhoto from '../assets/hero-photo.webp';
import sampleWedding from '../assets/sample-wedding.webp';
import sampleBirthday from '../assets/sample-birthday.webp';
import samplePortrait from '../assets/sample-portrait.webp';
import Logo, { LogoMark } from '../components/Logo';
import Marquee from '../components/Marquee';
import PlanCard from '../components/PlanCard';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { brand, event, homeFaqs, packages, processSteps } from '../data/site';
import { downloadCalendar } from '../lib/files';
import { usePageMeta } from '../lib/hooks';
import { useToast } from '../lib/toast';

const styles = [
  {
    meta: 'Weddings · Standard',
    title: 'The Ivory Suite',
    desc: 'Candlelight, garden aisles and a page that reads like letterpress.',
    image: sampleWedding,
    alt: 'A bride and groom beside a floral arch, mountains at sunset behind them',
    objectPosition: 'center 42%',
    href: 'https://sites.google.com/view/aetheriaevents/home?authuser=1',
  },
  {
    meta: 'Milestones · Premium',
    title: 'The Blush Hour',
    desc: 'Debuts, birthdays and anniversaries, as personal as the toast.',
    image: sampleBirthday,
    alt: 'A birthday celebrant in a pink tulle dress holding a sparkler',
    objectPosition: 'center 30%',
    href: 'https://aetheria-events.github.io/Ae-rsvp/',
  },
  {
    meta: 'Family · Basic',
    title: 'The Garden Year',
    desc: 'Christenings, reunions and the small days worth framing.',
    image: samplePortrait,
    alt: 'A smiling child standing against a tree in a sunlit garden',
    objectPosition: 'center 34%',
    href: 'https://sites.google.com/view/baptismofhana/home',
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
    body: '2–4 working days for Basic and Standard, 4–6 for Premium, counted from payment and Asset Freeze.',
  },
  {
    icon: Users,
    title: 'An RSVP that actually works',
    body: 'Standard and Premium include a private dashboard to accept guests, assign seating and track replies.',
  },
  {
    icon: Star,
    title: 'Art-directed, not templated',
    body: 'Palette, typography and layout composed around your celebration, never a stock theme.',
  },
];

export default function Home() {
  usePageMeta(
    'Aetheria Events · Digital invitations for unforgettable celebrations',
    'Aetheria Events designs bespoke digital event pages with online RSVP for weddings, debuts, corporate gatherings and milestones. Live in 2–6 working days. Based in Bonifacio Global City, Taguig.',
  );

  const { notify } = useToast();

  const saveSampleDate = () => {
    downloadCalendar({
      filename: 'ben-and-za.ics',
      title: `${event.bride} & ${event.groom} · ${event.type}`,
      description: 'A sample invitation by Aetheria Events. RSVP online.',
      location: `${event.venueAddress}`,
      start: event.isoDate,
    });
    notify('Sample date saved', { detail: 'ben-and-za.ics is in your downloads. Open it to add 14 February 2027.' });
  };

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="aq-hero">
        <div className="aq-hero__backdrop" aria-hidden="true">
          <img
            src={heroPhoto}
            alt=""
            width="1500"
            height="837"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="aq-hero__wash" aria-hidden="true" />

        <div className="wrap aq-hero__inner">
          <div className="aq-hero__copy">
            <p className="aq-eyebrow">Aetheria Events · Philippines</p>
            <h1 className="aq-hero__title">
              Make your
              <br />
              first impression
              <br />
              <span className="aq-hero__soft">unforgettable.</span>
            </h1>
            <p className="aq-hero__lede">
              Replace static paper invites with interactive event pages, live RSVP management, and
              instant digital confirmations.
            </p>

            <div className="aq-hero__actions">
              <Link to="/booking" className="aq-btn aq-btn--primary">
                Reserve your date
                <span className="aq-btn__arrow" aria-hidden="true">
                  <ArrowRight />
                </span>
              </Link>
              <Link to="/packages" className="aq-btn aq-btn--ghost">
                View packages
              </Link>
            </div>
          </div>

          <div className="aq-hero__stack">
            <Link to="/invitation" className="aq-card">
              <span className="aq-card__top">
                <span className="aq-card__icon" aria-hidden="true">
                  <Sparkle />
                </span>
                <span className="aq-card__go" aria-hidden="true">
                  <ArrowRight />
                </span>
              </span>
              <span className="aq-card__body">
                <span className="aq-card__tag">Live RSVP</span>
                <span className="aq-card__stat">
                  142<em>replies</em>
                </span>
                <span className="aq-card__meta">Guest list updates the moment someone replies.</span>
              </span>
            </Link>

            <Link to="/invitation" className="aq-card aq-card--feature">
              <span className="aq-card__top">
                <span className="aq-card__icon" aria-hidden="true">
                  <Star />
                </span>
                <span className="aq-card__go" aria-hidden="true">
                  <ArrowRight />
                </span>
              </span>
              <span className="aq-card__body">
                <span className="aq-card__tag">Sample invitation</span>
                <span className="aq-card__names">
                  Ben <em>&amp;</em> Za
                </span>
                <span className="aq-card__meta">14 · 02 · 2027 · Casa Lumen, Makati</span>
              </span>
            </Link>

            <button type="button" className="aq-card aq-card--solid" onClick={saveSampleDate}>
              <span className="aq-card__top">
                <span className="aq-card__icon" aria-hidden="true">
                  <Calendar />
                </span>
                <span className="aq-card__go" aria-hidden="true">
                  <ArrowRight />
                </span>
              </span>
              <span className="aq-card__body">
                <span className="aq-card__tag">Save the date</span>
                <span className="aq-card__stat">
                  6<em>days live</em>
                </span>
                <span className="aq-card__meta">Drop the sample date into your calendar.</span>
              </span>
            </button>
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
            <Link to="/site-map" className="text-link" style={{ marginTop: '1.6rem' }}>
              Read the full Site Map
              <ArrowRight />
            </Link>
          </div>

          <div className="diff-list">
            <Reveal as="div" className="diff">
              <span className="diff__num">01</span>
              <div>
                <h3 className="diff__title">Designed around your event</h3>
                <p className="diff__body">
                  Your palette, your venue, your story. We art-direct the page to match the room it
                  is inviting people into, then test every link, form and screen before you ever
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
              A glimpse of what can be composed: letterpress calm, a sparkler-lit milestone, or a
              slow afternoon in the garden. Each is a direction, not a locked template.
            </p>
            <a
              href="https://sites.google.com/view/aetheriaevents/home?authuser=1"
              className="text-link"
              style={{ marginTop: '1.2rem' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open a full sample page
              <ArrowRight />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </SectionHead>

          <div className="style-grid">
            {styles.map((style, index) => (
              <Reveal as="article" className="style-card" key={style.title} delay={index * 90}>
                <div className="style-card__media">
                  <img
                    className="style-card__photo"
                    src={style.image}
                    alt={style.alt}
                    width="1100"
                    height="614"
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: style.objectPosition }}
                  />
                  <div className="style-card__watermark" aria-hidden="true">
                    <Logo as="span" />
                  </div>
                  <div className="style-card__body">
                    <span className="style-card__meta">{style.meta}</span>
                    <h3 className="style-card__title">{style.title}</h3>
                    <p className="style-card__desc">{style.desc}</p>
                    <a
                      href={style.href}
                      className="style-card__cta"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View the sample
                      <ArrowRight style={{ width: 12, height: 12 }} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
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
                One-time fees. No retainers, no surprise charges. Basic covers up to 100 guests,
                Standard up to 300, Premium has no ceiling. Every package includes two rounds of
                minor revisions and a page that stays live for six days after the event.
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
              both your payment and your Asset Freeze, the moment every photo, colour and venue
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
            We design for the hush <em>before</em> the link opens, and the joy after.
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
                  Email the team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
