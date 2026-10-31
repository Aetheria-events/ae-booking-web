import { useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Download,
  MapPin,
  Shield,
  Sparkle,
  Users,
  Warning,
} from '../components/Icons';
import Logo from '../components/Logo';
import benZaPortrait from '../assets/ben-za-portrait.webp';
import benZaWide from '../assets/ben-za.webp';
import { brand, event } from '../data/site';
import { downloadCalendar, downloadVCard } from '../lib/files';
import { usePageMeta } from '../lib/hooks';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${event.venue}, Philippines`,
)}`;

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default function EventDemo() {
  usePageMeta(
    `${event.bride} & ${event.groom} — a sample invitation by Aetheria Events`,
    'A sample digital wedding invitation by Aetheria Events: countdown, venue details, save-the-date and online RSVP with guest privacy built in.',
  );

  const [rsvp, setRsvp] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    note: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setRsvp((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!rsvp.name.trim()) next.name = 'Please tell us your name.';
    if (!rsvp.email.trim()) next.email = 'We need an email for your confirmation.';
    else if (!emailPattern.test(rsvp.email.trim())) next.email = 'That email looks incomplete.';
    if (!rsvp.attending) next.attending = 'Please choose one reply.';
    if (!rsvp.consent) next.consent = 'Please agree to the guest privacy notice.';
    return next;
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      const el = document.getElementById(`rsvp-${first}`);
      if (el) el.focus();
      return;
    }

    try {
      const existing = JSON.parse(window.localStorage.getItem('aetheria.rsvp.demo.v1') || '[]');
      window.localStorage.setItem(
        'aetheria.rsvp.demo.v1',
        JSON.stringify([
          ...existing,
          {
            ...rsvp,
            event: 'ben-and-za',
            submittedAt: new Date().toISOString(),
          },
        ]),
      );
    } catch {
      /* storage unavailable */
    }

    setSubmitted(true);
  };

  const addToCalendar = () => {
    downloadCalendar({
      filename: 'ben-and-za.ics',
      title: `${event.bride} & ${event.groom} — ${event.type}`,
      description: `${event.kicker}. Ceremony at 4:00 PM, dinner at 7:00 PM. RSVP by ${event.rsvpDeadline}. A sample invitation by Aetheria Events.`,
      location: `${event.venueAddress}`,
      start: event.isoDate,
      durationHours: 7,
    });
  };

  const saveContact = () => {
    downloadVCard({
      firstName: 'Aetheria',
      lastName: 'Events',
      org: 'Aetheria Events',
      title: 'Digital fulfillment',
      email: brand.email,
      address: brand.address,
      note: `Event contact for ${event.bride} & ${event.groom}'s wedding, 14 February 2027, ${event.venue}. Sample invitation by Aetheria Events.`,
    });
  };

  const resetRsvp = () => {
    setSubmitted(false);
    setErrors({});
  };

  const firstName = rsvp.name.trim().split(' ')[0];

  return (
    <div className="event-page">
      <div className="event-bar">
        <div className="event-wrap event-bar__inner">
          <span className="event-bar__note">
            <span className="dot" aria-hidden="true" />
            Sample invitation by&nbsp;
            <Link to="/">Aetheria Events</Link>
          </span>
          <span>Kindly reply by {event.rsvpDeadline}</span>
        </div>
      </div>

      <main id="main">
        {/* ---------------- invitation hero ---------------- */}
        <section className="event-hero">
          <div className="event-wrap--narrow">
            <span className="sample-flag">
              <span className="dot" aria-hidden="true" />
              Sample event site
            </span>

            <p className="event-kicker">{event.kicker}</p>
            <h1 className="event-title">
              {event.bride} <span className="amp">&amp;</span> {event.groom}
            </h1>
            <p className="event-title__sub">
              request the pleasure of your company at the celebration of their marriage
            </p>
            <p className="event-date">
              <span>{event.dateLabel}</span>
              <span className="dot-sep" aria-hidden="true" />
              <span>{event.venue}</span>
            </p>

            <div className="event-stage">
              <span className="event-stage__halo" aria-hidden="true" />
              <div className="event-stage__watermark" aria-hidden="true">
                <Logo as="span" />
              </div>

              <article className="event-card">
                <div className="event-card__window">
                  <img
                    className="event-card__photo"
                    src={benZaPortrait}
                    alt={`${event.bride} and ${event.groom} walking hand in hand through a glass-walled hall`}
                    width="1100"
                    height="1034"
                    loading="eager"
                    decoding="async"
                  />
                  <span className="event-card__chip">{event.type}</span>
                  <div className="event-card__monogram" aria-hidden="true">
                    <span>{event.monogram}</span>
                  </div>
                </div>
                <div className="event-card__plate">
                  <p className="event-card__names">
                    {event.bride} <span className="amp">&amp;</span> {event.groom}
                  </p>
                  <p className="event-card__meta">
                    {event.dateShort} · Casa Lumen, Makati
                  </p>
                </div>
              </article>

              <div className="event-save">
                <span className="event-save__icon" aria-hidden="true">
                  <Users style={{ width: 17, height: 17 }} />
                </span>
                <span className="event-save__text">
                  <strong>Save contact</strong>
                  <span>{brand.team}</span>
                </span>
                <button type="button" className="event-save__btn" onClick={saveContact}>
                  <Download aria-hidden="true" />
                  Save to phone
                </button>
              </div>
            </div>

            <Countdown
              target={event.isoDate}
              label={`Countdown to ${event.bride} and ${event.groom}'s wedding`}
            />
          </div>
        </section>

        {/* ---------------- details ---------------- */}
        <section className="event-section" aria-labelledby="details-title">
          <div className="event-wrap">
            <div className="event-section__head">
              <p className="eyebrow">The essentials</p>
              <h2 id="details-title">When, where, what to wear</h2>
            </div>

            <div className="event-details">
              <div className="event-detail">
                <span className="event-detail__icon" aria-hidden="true">
                  <Calendar />
                </span>
                <span className="event-detail__label">Date &amp; time</span>
                <span className="event-detail__value">14 February 2027</span>
                <span className="event-detail__sub">
                  Ceremony at 4:00 PM
                  <br />
                  Reception at 6:00 PM
                </span>
                <button type="button" className="event-detail__action" onClick={addToCalendar}>
                  Add to calendar
                </button>
              </div>

              <div className="event-detail">
                <span className="event-detail__icon" aria-hidden="true">
                  <MapPin />
                </span>
                <span className="event-detail__label">The venue</span>
                <span className="event-detail__value">{event.venue}</span>
                <span className="event-detail__sub">{event.venueAddress}</span>
                <a className="event-detail__action" href={mapsUrl} target="_blank" rel="noreferrer">
                  Open in maps
                </a>
              </div>

              <div className="event-detail">
                <span className="event-detail__icon" aria-hidden="true">
                  <Sparkle />
                </span>
                <span className="event-detail__label">Dress code</span>
                <span className="event-detail__value">Black tie</span>
                <span className="event-detail__sub">{event.dressCode}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- the evening ---------------- */}
        <section className="event-section" aria-labelledby="evening-title">
          <div className="event-wrap event-two-col">
            <div>
              <p className="eyebrow">The evening</p>
              <h2 id="evening-title">One long, candlelit table.</h2>
              <p>
                We begin in the garden as the light goes soft, then move inside for dinner under
                glass. Bring nothing but your appetite for a very long, very happy evening.
              </p>
              <div className="event-timeline" style={{ marginTop: '1.8rem' }}>
                {event.schedule.map((item) => (
                  <div className="event-timeline__item" key={item.title}>
                    <p className="event-timeline__time">{item.time}</p>
                    <p className="event-timeline__title">{item.title}</p>
                    <p className="event-timeline__body">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <figure className="event-photo" style={{ aspectRatio: '4 / 4.2', marginBottom: '1.5rem' }}>
                <img
                  src={benZaWide}
                  alt={`${event.bride} and ${event.groom} laughing together in a sunlit glass pavilion`}
                  width="1600"
                  height="893"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {event.bride} &amp; {event.groom} · {event.venue}
                </figcaption>
              </figure>
              <p className="eyebrow">The venue</p>
              <h2 style={{ fontSize: '1.85rem' }}>{event.venue}</h2>
              <p>{event.venueAddress}</p>
              <div className="event-note">
                Doors open at 3:30 PM. Valet parking is available at the Paseo de Roxas entrance.
                The ceremony is outdoors; a wrap or light layer is lovely after sunset.
              </div>
              <p style={{ marginTop: '1rem' }}>
                <a
                  className="text-link"
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--e-gold-soft)', borderColor: 'rgba(217,190,132,0.4)' }}
                >
                  Get directions
                  <ArrowRight />
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- rsvp ---------------- */}
        <section className="event-section" id="rsvp" aria-labelledby="rsvp-title">
          <div className="event-wrap--narrow">
            <div className="event-section__head">
              <p className="eyebrow">Kindly reply</p>
              <h2 id="rsvp-title">Will you join us?</h2>
              <p>
                Please respond by {event.rsvpDeadline}. Your reply goes straight to the couple&rsquo;s
                guest list, and a confirmation email follows once it is accepted.
              </p>
            </div>

            {submitted ? (
              <div className="rsvp-success" role="status" aria-live="polite">
                <span className="rsvp-success__icon" aria-hidden="true">
                  <Check />
                </span>
                <h3 style={{ margin: 0 }}>
                  {rsvp.attending === 'yes' ? 'You’re on the list.' : 'We’ll miss you.'}
                </h3>
                <p>
                  Thank you, {firstName || 'friend'}.{' '}
                  {rsvp.attending === 'yes'
                    ? `We have saved ${rsvp.guests} ${Number(rsvp.guests) === 1 ? 'seat' : 'seats'} under your name. A confirmation email follows once the host accepts your RSVP.`
                    : 'Your reply has been recorded, and the couple will be told. Thank you for letting us know.'}
                </p>
                <div className="booking-actions">
                  {rsvp.attending === 'yes' && (
                    <button type="button" className="btn btn--gold btn--sm" onClick={addToCalendar}>
                      <Calendar style={{ width: 14, height: 14 }} aria-hidden="true" />
                      Add to calendar
                    </button>
                  )}
                  <button
                    type="button"
                    className="link-button"
                    style={{ color: 'var(--e-gold-soft)' }}
                    onClick={resetRsvp}
                  >
                    Edit my reply
                  </button>
                </div>
              </div>
            ) : (
              <div className="rsvp-panel">
                <div className="watermark" aria-hidden="true">
                  <Logo as="span" showSub={false} />
                </div>

                <form className="form--dark" onSubmit={handleSubmit} noValidate>
                  <div className="form-grid">
                    <div className="form-row">
                      <div className="field">
                        <label className="field__label" htmlFor="rsvp-name">
                          Your full name <span className="req">*</span>
                        </label>
                        <input
                          id="rsvp-name"
                          className="input"
                          type="text"
                          autoComplete="name"
                          placeholder="Name on the invitation"
                          value={rsvp.name}
                          onChange={(e) => update('name', e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                        />
                        {errors.name && (
                          <span className="field__error" id="rsvp-name-error">
                            <Warning aria-hidden="true" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className="field">
                        <label className="field__label" htmlFor="rsvp-email">
                          Email <span className="req">*</span>
                        </label>
                        <input
                          id="rsvp-email"
                          className="input"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={rsvp.email}
                          onChange={(e) => update('email', e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'rsvp-email-error' : undefined}
                        />
                        {errors.email && (
                          <span className="field__error" id="rsvp-email-error">
                            <Warning aria-hidden="true" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="field">
                      <span className="field__label" id="rsvp-attending-label">
                        Your reply <span className="req">*</span>
                      </span>
                      <div className="choice-grid" role="radiogroup" aria-labelledby="rsvp-attending-label">
                        <label className="choice">
                          <input
                            id="rsvp-attending"
                            type="radio"
                            name="attending"
                            value="yes"
                            checked={rsvp.attending === 'yes'}
                            onChange={() => update('attending', 'yes')}
                          />
                          <span className="choice__box">
                            <span className="choice__name" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                              Joyfully accepts
                            </span>
                            <span className="choice__price">Save me a seat</span>
                          </span>
                        </label>

                        <label className="choice">
                          <input
                            type="radio"
                            name="attending"
                            value="no"
                            checked={rsvp.attending === 'no'}
                            onChange={() => update('attending', 'no')}
                          />
                          <span className="choice__box">
                            <span className="choice__name" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                              Regretfully declines
                            </span>
                            <span className="choice__price">With love from afar</span>
                          </span>
                        </label>
                      </div>
                      {errors.attending && (
                        <span className="field__error" id="rsvp-attending-error">
                          <Warning aria-hidden="true" />
                          {errors.attending}
                        </span>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="field">
                        <label className="field__label" htmlFor="rsvp-guests">
                          Number of guests
                        </label>
                        <select
                          id="rsvp-guests"
                          className="select"
                          value={rsvp.guests}
                          onChange={(e) => update('guests', e.target.value)}
                          disabled={rsvp.attending === 'no'}
                        >
                          {[1, 2, 3, 4, 5].map((count) => (
                            <option key={count} value={String(count)}>
                              {count} {count === 1 ? 'guest' : 'guests'} (including you)
                            </option>
                          ))}
                        </select>
                        <span className="field__hint">Children are counted as guests.</span>
                      </div>

                      <div className="field">
                        <label className="field__label" htmlFor="rsvp-note">
                          A note for the couple <span className="field__opt">Optional</span>
                        </label>
                        <input
                          id="rsvp-note"
                          className="input"
                          type="text"
                          placeholder="A song request, a memory, a hello…"
                          value={rsvp.note}
                          onChange={(e) => update('note', e.target.value)}
                          maxLength={200}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className={`check ${errors.consent ? 'check--error' : ''}`}>
                        <input
                          id="rsvp-consent"
                          type="checkbox"
                          checked={rsvp.consent}
                          onChange={(e) => update('consent', e.target.checked)}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? 'rsvp-consent-error' : undefined}
                        />
                        <span>
                          I agree that my name, email address, reply and guest count will be shared
                          with the couple and Aetheria Events for this event only, as described in
                          the{' '}
                          <Link to="/privacy#guests" target="_blank" rel="noreferrer">
                            guest privacy notice
                          </Link>
                          . <span className="req">*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <span className="field__error" id="rsvp-consent-error">
                          <Warning aria-hidden="true" />
                          {errors.consent}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="submit-row">
                    <button type="submit" className="btn btn--gold">
                      Send my RSVP
                      <ArrowRight />
                    </button>
                    <p className="form-note" style={{ color: 'var(--e-dim)' }}>
                      No account needed. You can edit your reply until {event.rsvpDeadline}.
                    </p>
                  </div>
                </form>
              </div>
            )}

            <div className="event-privacy">
              <Shield aria-hidden="true" />
              <span>
                {event.privacyNote}{' '}
                <Link to="/privacy#guests">Read the guest privacy notice</Link>. This sample page
                stores replies in your browser only.
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- a note from the couple ---------------- */}
        <section className="event-section event-section--flush">
          <div className="event-wrap--narrow" style={{ textAlign: 'center' }}>
            <span className="event-footer__mono" aria-hidden="true" style={{ color: 'var(--e-gold)' }}>
              <Clock style={{ width: 22, height: 22 }} />
            </span>
            <p style={{ maxWidth: '34ch', margin: '0 auto 1rem', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.6vw, 2.2rem)', lineHeight: 1.3, color: 'var(--e-text)' }}>
              “No gifts, please. Your presence — and your reply by the first of February — is the
              whole present.”
            </p>
            <p className="meta" style={{ color: 'var(--e-dim)', marginBottom: 0 }}>
              {event.bride} &amp; {event.groom}
            </p>
          </div>
        </section>
      </main>

      <footer className="event-footer">
        <div className="event-wrap--narrow">
          <div className="event-footer__mono" aria-hidden="true">
            <Logo as="span" showSub={false} />
          </div>
          <p>
            {event.bride} &amp; {event.groom} · {event.dateLabel} · {event.venue}
          </p>
          <p style={{ fontSize: '0.72rem', opacity: 0.8 }}>
            Sample invitation designed by Aetheria Events. No real event, guest list or
            correspondence is associated with it.
          </p>
          <div className="event-footer__powered">
            <span>Powered by</span>
            <Link to="/">Aetheria Events</Link>
            <span aria-hidden="true">·</span>
            <Link to="/packages">Create yours</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
