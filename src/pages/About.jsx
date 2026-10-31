import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Sparkle, Star, Users } from '../components/Icons';
import LogoMark from '../components/Logo';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { brand } from '../data/site';
import { usePageMeta } from '../lib/hooks';

const disciplines = [
  {
    icon: Sparkle,
    title: 'Design & art direction',
    body: 'Palette, typography and layout are composed for one celebration. Nothing is lifted from a template gallery, and nothing is reused from the last client.',
    meta: 'Every page, drawn to order',
  },
  {
    icon: Users,
    title: 'Build & RSVP',
    body: 'The page is tested on real phones before it is handed over, every link, every form, every screen. RSVPs land in a guest list you can read at a glance.',
    meta: 'Tested on real devices',
  },
  {
    icon: Shield,
    title: 'Privacy & client care',
    body: 'A plain-language notice for guests, consent on every form, and a hard deletion date on day 36. One inbox answers every message, so nothing waits on an absent person.',
    meta: 'One inbox, one week, no chasing',
  },
];

const facts = [
  { label: 'Base', value: 'Bonifacio Global City, Taguig' },
  { label: 'Hours', value: 'Mon–Fri, 8:00 AM – 5:00 PM (PHT)' },
  { label: 'Replies within', value: 'One working day' },
  { label: 'Delivery', value: '2–6 working days after Asset Freeze' },
];

const principles = [
  {
    num: '01',
    title: 'A short chain, on purpose',
    body: 'The person who reads your booking is the person who art-directs the page. There is no account manager between you and the work.',
  },
  {
    num: '02',
    title: 'One event at a time',
    body: 'We take a limited number of dates each month so every page gets the attention the room deserves. If a date is full, we say so and suggest the nearest one.',
  },
  {
    num: '03',
    title: 'Handover, not dependency',
    body: 'When the page goes live you get the guest list, the files and a plain-English guide. Nothing is locked behind us, and nothing renews by itself.',
  },
];

export default function About() {
  usePageMeta(
    'About our team · Aetheria Events',
    'Aetheria Events is a digital fulfillment team in Bonifacio Global City building bespoke digital invitations, RSVP pages and private guest dashboards for celebrations across the Philippines.',
  );

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>About our Team</span>
          </nav>

          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">About our Team</p>
              <h1>
                Digital fulfillment,{' '}
                <br />
                <span className="italic">done properly.</span>
              </h1>
            </div>
            <p className="lede">
              Aetheria Events designs and builds one thing well: the page that carries your
              celebration from a link to a room full of people. We are a compact team in Bonifacio
              Global City, designers and builders who take few enough dates to give each one a
              proper look.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <div className="about-strip">
            {facts.map((fact) => (
              <div className="about-fact" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Who does what" title="Three disciplines, one team.">
            <p>
              Everyone here touches the work directly. No hand-offs between departments, no
              telephone game between what you asked for and what gets built.
            </p>
          </SectionHead>

          <div className="about-grid">
            {disciplines.map(({ icon: Icon, title, body, meta }, index) => (
              <Reveal as="article" className="about-card" key={title} delay={index * 80}>
                <span className="about-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="about-card__title">{title}</h3>
                <p className="about-card__body">{body}</p>
                <span className="about-card__meta">{meta}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split__sticky">
              <p className="eyebrow">How we work</p>
              <h2>
                Quiet standards,
                <br />
                kept every time.
              </h2>
              <p className="lede" style={{ marginTop: '1.2rem' }}>
                The team runs on three habits that are easy to promise and hard to keep. We keep
                them on every booking, from a ₱1,499 one-pager to a four-hundred-guest evening.
              </p>
              <p className="about-stamp">
                <LogoMark variant="mono" />
                Est. Manila · {brand.serviceArea}
              </p>
            </div>

            <div className="diff-list">
              {principles.map((item, index) => (
                <Reveal as="div" className="diff" key={item.num} delay={index * 80}>
                  <span className="diff__num">{item.num}</span>
                  <div>
                    <h3 className="diff__title">{item.title}</h3>
                    <p className="diff__body">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="about-contact">
            <div>
              <p className="eyebrow">Say hello</p>
              <h2>One inbox, answered by the people doing the work.</h2>
              <p className="lede" style={{ marginTop: '1rem', maxWidth: '48ch' }}>
                Questions about a date, a package or a page that already exists, write to us and a
                member of the digital fulfillment team will reply within one working day.
              </p>
            </div>

            <div className="about-contact__card">
              <div className="about-contact__row">
                <Clock aria-hidden="true" />
                <div>
                  <span>Office hours</span>
                  <strong>{brand.hours}</strong>
                </div>
              </div>
              <div className="about-contact__row">
                <Star aria-hidden="true" />
                <div>
                  <span>Office</span>
                  <strong>{brand.address}</strong>
                </div>
              </div>
              <div className="about-contact__row">
                <Shield aria-hidden="true" />
                <div>
                  <span>Data protection officer</span>
                  <strong>
                    <a href={`mailto:${brand.dpoEmail}`}>{brand.dpoEmail}</a>
                  </strong>
                </div>
              </div>

              <div className="about-contact__actions">
                <a href={`mailto:${brand.email}`} className="btn btn--gold">
                  {brand.email}
                  <ArrowRight />
                </a>
                <a
                  href={brand.bookingSheet}
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve a date
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
