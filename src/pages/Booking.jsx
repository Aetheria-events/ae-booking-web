import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Download,
  Lock,
  Mail,
  Plus,
  Shield,
  Sparkle,
  Users,
  Warning,
} from '../components/Icons';
import { addOns, brand, eventTypes, formatPeso, packages } from '../data/site';
import {
  bookingReference,
  bookingSummaryText,
  downloadBlob,
  downloadCalendar,
  downloadVCard,
  formatLongDate,
} from '../lib/files';
import { usePageMeta } from '../lib/hooks';

const STORAGE_KEY = 'aetheria.bookings.v1';

const rushOptions = [
  { id: 'none', name: 'Standard delivery', price: 0, note: 'Included in your package' },
  {
    id: 'express',
    name: addOns.find((item) => item.id === 'express').name,
    price: 350,
    note: 'Preview same working day before 12:00 NN',
  },
  {
    id: 'ultra',
    name: addOns.find((item) => item.id === 'ultra').name,
    price: 750,
    note: 'Preview within 2 working hours · Basic & Standard',
    restrictedTo: ['basic', 'standard'],
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function isoDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysUntil(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${value}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export default function Booking() {
  usePageMeta(
    'Booking — Aetheria Events',
    'Reserve your event date with Aetheria Events. Choose a digital invitation package, add a rush service if you need it, and send your details. No payment is taken online.',
  );

  const [searchParams] = useSearchParams();
  const initialPackage = packages.some((plan) => plan.id === searchParams.get('package'))
    ? searchParams.get('package')
    : 'standard';

  const [form, setForm] = useState({
    package: initialPackage,
    rush: 'none',
    eventType: 'Wedding',
    eventName: '',
    eventDate: '',
    venue: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
    marketing: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');
  const [savedBooking, setSavedBooking] = useState(null);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const formRef = useRef(null);

  const selectedPackage = packages.find((plan) => plan.id === form.package) || packages[1];
  const selectedRush = rushOptions.find((option) => option.id === form.rush) || rushOptions[0];
  const total = selectedPackage.price + selectedRush.price;

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return isoDate(d);
  }, []);

  const leadDays = form.eventDate ? daysUntil(form.eventDate) : null;
  const insideLeadTime = leadDays !== null && leadDays >= 0 && leadDays < selectedPackage.leadTime;

  const update = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const changePackage = (packageId) => {
    setForm((previous) => ({
      ...previous,
      package: packageId,
      rush: packageId === 'premium' && previous.rush === 'ultra' ? 'none' : previous.rush,
    }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next.package;
      delete next.rush;
      return next;
    });
  };

  const validate = (values = form) => {
    const next = {};
    if (!values.eventType) next.eventType = 'Choose the kind of celebration.';
    if (!values.eventName.trim()) next.eventName = 'Give the page a working title.';
    if (!values.eventDate) next.eventDate = 'Choose your event date.';
    else if (daysUntil(values.eventDate) !== null && daysUntil(values.eventDate) < 0)
      next.eventDate = 'The date has already passed — choose a future date.';
    if (!values.venue.trim()) next.venue = 'Tell us the venue or city.';
    if (values.guests) {
      const guests = Number(values.guests);
      if (!Number.isFinite(guests) || guests < 1 || guests > 5000)
        next.guests = 'Enter a number between 1 and 5,000.';
    }
    if (!values.name.trim()) next.name = 'Add the name we should reply to.';
    if (!values.email.trim()) next.email = 'We need an email address for the invoice.';
    else if (!emailPattern.test(values.email.trim())) next.email = 'That email address looks incomplete.';
    const digits = values.phone.replace(/[^\d]/g, '');
    if (!values.phone.trim()) next.phone = 'Add a mobile number for quick questions.';
    else if (digits.length < 7 || digits.length > 15) next.phone = 'Enter a valid contact number.';
    if (!values.consent) next.consent = 'Please agree to the privacy notice to continue.';
    if (values.notes.length > 900) next.notes = 'Please keep notes under 900 characters.';
    return next;
  };

  const handleBlur = (key) => {
    const fieldErrors = validate(form);
    setErrors((previous) => {
      const next = { ...previous };
      if (fieldErrors[key]) next[key] = fieldErrors[key];
      else delete next[key];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setShowErrorSummary(Object.keys(nextErrors).length > 0);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(`booking-${firstKey}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStatus('sending');
    const ref = bookingReference();

    window.setTimeout(() => {
      const booking = {
        reference: ref,
        createdAt: new Date().toISOString(),
        package: selectedPackage.id,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
        rush: selectedRush.id,
        rushName: selectedRush.id === 'none' ? 'None' : selectedRush.name,
        rushPrice: selectedRush.price,
        total,
        eventType: form.eventType,
        eventName: form.eventName.trim(),
        eventDate: form.eventDate,
        venue: form.venue.trim(),
        guests: form.guests,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        notes: form.notes.trim(),
        marketing: form.marketing,
      };

      try {
        const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([...existing, booking].slice(-25)),
        );
      } catch {
        /* storage unavailable */
      }

      setSavedBooking(booking);
      setReference(ref);
      setStatus('done');
      window.scrollTo({ top: 160, behavior: 'smooth' });
    }, 700);
  };

  const emailBody = savedBooking
    ? encodeURIComponent(bookingSummaryText(savedBooking))
    : '';
  const emailHref = savedBooking
    ? `mailto:${brand.email}?subject=${encodeURIComponent(
        `Booking request ${savedBooking.reference} — ${savedBooking.eventName}`,
      )}&body=${emailBody}`
    : `mailto:${brand.email}`;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/packages">Packages</Link>
            <span aria-hidden="true">/</span>
            <span>Booking</span>
          </nav>

          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Reserve a date</p>
              <h1>
                Three minutes,
                <span className="italic gold"> one beautiful date.</span>
              </h1>
              <p className="page-hero__lede">
                Tell us about the celebration and choose a package. We reply within one working day
                with an invoice, the intake link and a delivery timeline.
              </p>
            </div>
            <div className="page-hero__aside">
              <div className="pill-row">
                <span className="chip chip--gold">
                  <Sparkle style={{ width: 12, height: 12 }} aria-hidden="true" />
                  Reply within 1 working day
                </span>
                <span className="chip">No payment online</span>
                <span className="chip">Consent built in</span>
              </div>
              <p className="small" style={{ margin: 0 }}>
                Prefer to talk first? Email{' '}
                <a href={`mailto:${brand.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                  {brand.email}
                </a>{' '}
                or call during {brand.hours}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="theme-light leads-light booking-page">
        <div className="wrap booking-band">
          <div className="booking-grid">
            <div className="booking-card">
              {status === 'done' && savedBooking ? (
                <div className="booking-success">
                  <div className="success" style={{ padding: 0, border: 0, background: 'none' }}>
                    <span className="success__icon" aria-hidden="true">
                      <CheckCircle />
                    </span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)' }}>Your date is pencilled in.</h2>
                    <p>
                      Thank you, {(savedBooking.name.split(' ')[0] || 'friend').trim()}. We have your
                      request for <strong>{savedBooking.eventName}</strong> on{' '}
                      {formatLongDate(savedBooking.eventDate)}. Aetheria Events will confirm capacity
                      by email within one working day.
                    </p>
                    <span className="success__ref">
                      Reference <strong>{savedBooking.reference}</strong>
                    </span>
                  </div>

                  <ul className="booking-success__next">
                    <li>
                      <b>1</b>
                      <span>
                        We check the calendar for your date and reply to{' '}
                        <strong>{savedBooking.email}</strong> with an invoice and payment channels.
                      </span>
                    </li>
                    <li>
                      <b>2</b>
                      <span>
                        After payment, you receive the intake page to upload photos, event text,
                        colours and venue details.
                      </span>
                    </li>
                    <li>
                      <b>3</b>
                      <span>
                        Submit the Asset Freeze and the delivery clock starts — 2–4 working days for
                        Basic and Standard, 4–6 for Premium.
                      </span>
                    </li>
                  </ul>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="btn btn--gold"
                      onClick={() => {
                        downloadBlob(
                          `aetheria-booking-${savedBooking.reference}.txt`,
                          bookingSummaryText(savedBooking),
                        );
                      }}
                    >
                      <Download style={{ width: 14, height: 14 }} aria-hidden="true" />
                      Download summary
                    </button>
                    <a className="btn btn--ink-ghost" href={emailHref}>
                      <Mail style={{ width: 14, height: 14 }} aria-hidden="true" />
                      Email it to Aetheria
                    </a>
                    <button
                      type="button"
                      className="btn btn--ink-ghost"
                      onClick={() => {
                        downloadCalendar({
                          filename: 'aetheria-event-hold.ics',
                          title: `${savedBooking.eventName} — ${savedBooking.packageName} package`,
                          description: `Aetheria Events booking request ${savedBooking.reference}. Not yet confirmed.`,
                          location: savedBooking.venue,
                          start: `${savedBooking.eventDate}T10:00:00+08:00`,
                          durationHours: 2,
                        });
                      }}
                    >
                      <Clock style={{ width: 14, height: 14 }} aria-hidden="true" />
                      Hold the date
                    </button>
                  </div>

                  <div className="notice notice--light">
                    <span className="notice__icon" aria-hidden="true">
                      <Shield />
                    </span>
                    <span>
                      <strong>Preview build note.</strong> This request is saved in your browser
                      only. Before launch, connect the form to Aetheria&rsquo;s intake endpoint (see
                      the site plan) so submissions reach the studio automatically.
                    </span>
                  </div>

                  <div className="booking-actions">
                    <Link to="/" className="text-link">
                      Back to home
                      <ArrowRight />
                    </Link>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        setStatus('idle');
                        setSavedBooking(null);
                        setErrors({});
                        setShowErrorSummary(false);
                        setForm((previous) => ({
                          ...previous,
                          eventName: '',
                          eventDate: '',
                          venue: '',
                          guests: '',
                          notes: '',
                          consent: false,
                        }));
                      }}
                    >
                      Make another request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="booking-head">
                    <h2 className="booking-head__title">Booking request</h2>
                    <div className="booking-steps" aria-hidden="true">
                      <span className="booking-step">
                        <b>1</b> The celebration
                      </span>
                      <span className="booking-step">
                        <b>2</b> Your details
                      </span>
                      <span className="booking-step">
                        <b>3</b> Consent
                      </span>
                    </div>
                  </div>

                  {showErrorSummary && Object.keys(errors).length > 0 && (
                    <div className="notice notice--light" role="alert" style={{ marginBottom: '1.2rem' }}>
                      <span className="notice__icon" aria-hidden="true">
                        <Warning />
                      </span>
                      <span>
                        <strong>Almost there.</strong> Please check the highlighted fields below — we
                        need a few details before we can hold the date.
                      </span>
                    </div>
                  )}

                  <form ref={formRef} noValidate onSubmit={handleSubmit}>
                    <fieldset className="fieldset">
                      <legend className="fieldset__legend">
                        <span aria-hidden="true">1</span>
                        The celebration
                      </legend>

                      <div className="field field--full">
                        <span className="field__label" id="package-label">
                          Package <span className="req">*</span>
                        </span>
                        <div
                          className="choice-grid choice-grid--package"
                          role="radiogroup"
                          aria-labelledby="package-label"
                        >
                          {packages.map((plan) => (
                            <label className="choice" key={plan.id}>
                              <input
                                type="radio"
                                name="package"
                                value={plan.id}
                                checked={form.package === plan.id}
                                onChange={() => changePackage(plan.id)}
                              />
                              <span className="choice__box">
                                <span className="choice__name">{plan.name}</span>
                                <span className="choice__price">{formatPeso(plan.price)}</span>
                              </span>
                              {plan.featured && <span className="choice__flag">Most booked</span>}
                            </label>
                          ))}
                        </div>
                        <p className="field__hint">
                          {selectedPackage.summary} Includes {selectedPackage.features.length}{' '}
                          inclusions and a {selectedPackage.turnaround} turnaround.
                        </p>
                      </div>

                      <div className="form-row">
                        <div className="field">
                          <label className="field__label" htmlFor="booking-eventType">
                            Type of celebration <span className="req">*</span>
                          </label>
                          <select
                            id="booking-eventType"
                            className="select"
                            value={form.eventType}
                            onChange={(event) => update('eventType', event.target.value)}
                            onBlur={() => handleBlur('eventType')}
                            aria-invalid={Boolean(errors.eventType)}
                            aria-describedby={errors.eventType ? 'booking-eventType-error' : undefined}
                          >
                            {eventTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          {errors.eventType && (
                            <span className="field__error" id="booking-eventType-error">
                              <Warning aria-hidden="true" />
                              {errors.eventType}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <label className="field__label" htmlFor="booking-eventName">
                            Event name or title <span className="req">*</span>
                          </label>
                          <input
                            id="booking-eventName"
                            className="input"
                            type="text"
                            placeholder="Isabel & Mateo"
                            value={form.eventName}
                            onChange={(event) => update('eventName', event.target.value)}
                            onBlur={() => handleBlur('eventName')}
                            aria-invalid={Boolean(errors.eventName)}
                            aria-describedby={errors.eventName ? 'booking-eventName-error' : undefined}
                            autoComplete="off"
                          />
                          {errors.eventName && (
                            <span className="field__error" id="booking-eventName-error">
                              <Warning aria-hidden="true" />
                              {errors.eventName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="field">
                          <label className="field__label" htmlFor="booking-eventDate">
                            Event date <span className="req">*</span>
                          </label>
                          <input
                            id="booking-eventDate"
                            className="input"
                            type="date"
                            min={minDate}
                            value={form.eventDate}
                            onChange={(event) => update('eventDate', event.target.value)}
                            onBlur={() => handleBlur('eventDate')}
                            aria-invalid={Boolean(errors.eventDate)}
                            aria-describedby={
                              errors.eventDate ? 'booking-eventDate-error' : 'booking-eventDate-hint'
                            }
                          />
                          {errors.eventDate ? (
                            <span className="field__error" id="booking-eventDate-error">
                              <Warning aria-hidden="true" />
                              {errors.eventDate}
                            </span>
                          ) : (
                            <span className="field__hint" id="booking-eventDate-hint">
                              {form.eventDate
                                ? insideLeadTime
                                  ? `Inside the recommended ${selectedPackage.leadTime}-day lead time — we will confirm capacity.`
                                  : `${leadDays} days to prepare · recommended lead time met.`
                                : `Recommended: at least ${selectedPackage.leadTime} days before the event.`}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <label className="field__label" htmlFor="booking-venue">
                            Venue or city <span className="req">*</span>
                          </label>
                          <input
                            id="booking-venue"
                            className="input"
                            type="text"
                            placeholder="Casa Lumen, Makati"
                            value={form.venue}
                            onChange={(event) => update('venue', event.target.value)}
                            onBlur={() => handleBlur('venue')}
                            aria-invalid={Boolean(errors.venue)}
                            aria-describedby={errors.venue ? 'booking-venue-error' : undefined}
                          />
                          {errors.venue && (
                            <span className="field__error" id="booking-venue-error">
                              <Warning aria-hidden="true" />
                              {errors.venue}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="field">
                          <label className="field__label" htmlFor="booking-guests">
                            Estimated guests <span className="field__opt">Optional</span>
                          </label>
                          <input
                            id="booking-guests"
                            className="input"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="5000"
                            placeholder="120"
                            value={form.guests}
                            onChange={(event) => update('guests', event.target.value)}
                            onBlur={() => handleBlur('guests')}
                            aria-invalid={Boolean(errors.guests)}
                            aria-describedby={errors.guests ? 'booking-guests-error' : undefined}
                          />
                          {errors.guests && (
                            <span className="field__error" id="booking-guests-error">
                              <Warning aria-hidden="true" />
                              {errors.guests}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <span className="field__label" id="rush-label">
                            Delivery speed
                          </span>
                          <div className="choice-grid choice-grid--tight" role="radiogroup" aria-labelledby="rush-label">
                            {rushOptions.map((option) => {
                              const disabled =
                                option.restrictedTo && !option.restrictedTo.includes(form.package);
                              return (
                                <label className="choice" key={option.id}>
                                  <input
                                    type="radio"
                                    name="rush"
                                    value={option.id}
                                    checked={form.rush === option.id}
                                    disabled={disabled}
                                    onChange={() => update('rush', option.id)}
                                  />
                                  <span className="choice__box">
                                    <span className="choice__name">
                                      {option.id === 'none' ? 'Standard' : option.id === 'express' ? 'Express' : 'Ultra'}
                                    </span>
                                    <span className="choice__price">
                                      {option.price === 0 ? 'Included' : `+${formatPeso(option.price)}`}
                                    </span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                          <p className="field__hint">
                            {selectedRush.note}
                            {form.package === 'premium' && form.rush !== 'ultra'
                              ? ' Ultra-Express is available for Basic and Standard only.'
                              : ''}
                          </p>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset__legend">
                        <span aria-hidden="true">2</span>
                        Your details
                      </legend>

                      <div className="form-row">
                        <div className="field">
                          <label className="field__label" htmlFor="booking-name">
                            Full name <span className="req">*</span>
                          </label>
                          <input
                            id="booking-name"
                            className="input"
                            type="text"
                            autoComplete="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(event) => update('name', event.target.value)}
                            onBlur={() => handleBlur('name')}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'booking-name-error' : undefined}
                          />
                          {errors.name && (
                            <span className="field__error" id="booking-name-error">
                              <Warning aria-hidden="true" />
                              {errors.name}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <label className="field__label" htmlFor="booking-email">
                            Email <span className="req">*</span>
                          </label>
                          <input
                            id="booking-email"
                            className="input"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(event) => update('email', event.target.value)}
                            onBlur={() => handleBlur('email')}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'booking-email-error' : undefined}
                          />
                          {errors.email && (
                            <span className="field__error" id="booking-email-error">
                              <Warning aria-hidden="true" />
                              {errors.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="field">
                        <label className="field__label" htmlFor="booking-phone">
                          Mobile number <span className="req">*</span>
                        </label>
                        <input
                          id="booking-phone"
                          className="input"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+63 9XX XXX XXXX"
                          value={form.phone}
                          onChange={(event) => update('phone', event.target.value)}
                          onBlur={() => handleBlur('phone')}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'booking-phone-error' : 'booking-phone-hint'}
                        />
                        {errors.phone ? (
                          <span className="field__error" id="booking-phone-error">
                            <Warning aria-hidden="true" />
                            {errors.phone}
                          </span>
                        ) : (
                          <span className="field__hint" id="booking-phone-hint">
                            Used only for questions about this booking. No marketing messages.
                          </span>
                        )}
                      </div>

                      <div className="field field--full">
                        <label className="field__label" htmlFor="booking-notes">
                          Anything we should know? <span className="field__opt">Optional</span>
                        </label>
                        <textarea
                          id="booking-notes"
                          className="textarea"
                          placeholder="Guest count, mood, palette, a link to your pegs…"
                          value={form.notes}
                          onChange={(event) => update('notes', event.target.value)}
                          onBlur={() => handleBlur('notes')}
                          aria-invalid={Boolean(errors.notes)}
                          aria-describedby={errors.notes ? 'booking-notes-error' : 'booking-notes-hint'}
                          maxLength={1000}
                        />
                        {errors.notes ? (
                          <span className="field__error" id="booking-notes-error">
                            <Warning aria-hidden="true" />
                            {errors.notes}
                          </span>
                        ) : (
                          <span className="field__hint" id="booking-notes-hint">
                            Please do not include health information, government IDs or payment card
                            details. {form.notes.length}/900
                          </span>
                        )}
                      </div>
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset__legend">
                        <span aria-hidden="true">3</span>
                        Privacy &amp; consent
                      </legend>

                      <div className="consent-block">
                        <label className={`check ${errors.consent ? 'check--error' : ''}`}>
                          <input
                            type="checkbox"
                            id="booking-consent"
                            checked={form.consent}
                            onChange={(event) => update('consent', event.target.checked)}
                            aria-invalid={Boolean(errors.consent)}
                            aria-describedby={errors.consent ? 'booking-consent-error' : undefined}
                          />
                          <span>
                            I have read the{' '}
                            <Link to="/privacy" target="_blank" rel="noreferrer">
                              Privacy Notice
                            </Link>{' '}
                            and the{' '}
                            <Link to="/terms" target="_blank" rel="noreferrer">
                              Service Terms
                            </Link>
                            , and I agree that Aetheria Events may process these details to respond
                            to this booking. <span className="req">*</span>
                          </span>
                        </label>
                        {errors.consent && (
                          <span className="field__error" id="booking-consent-error">
                            <Warning aria-hidden="true" />
                            {errors.consent}
                          </span>
                        )}

                        <label className="check">
                          <input
                            type="checkbox"
                            checked={form.marketing}
                            onChange={(event) => update('marketing', event.target.checked)}
                          />
                          <span>
                            Send me occasional design notes from Aetheria Events.{' '}
                            <span className="field__opt">Optional — you can unsubscribe anytime.</span>
                          </span>
                        </label>
                      </div>

                      <div className="notice notice--light">
                        <span className="notice__icon" aria-hidden="true">
                          <Lock />
                        </span>
                        <span>
                          Your details go to our booking inbox, not to a third-party ad network.
                          Guest data from the RSVP is deleted 36 days after the event. Questions?{' '}
                          <a href={`mailto:${brand.dpoEmail}`}>{brand.dpoEmail}</a>.
                        </span>
                      </div>

                      <div className="submit-row">
                        <button type="submit" className="btn btn--gold btn--lg" disabled={status === 'sending'}>
                          {status === 'sending' ? 'Sending…' : 'Send booking request'}
                          {status !== 'sending' && <ArrowRight />}
                        </button>
                        <p className="form-note">
                          No payment is taken now. We confirm capacity first, then send the invoice
                          and intake page.
                        </p>
                      </div>
                    </fieldset>
                  </form>
                </>
              )}
            </div>

            <aside className="booking-aside" aria-label="Booking summary">
              <div className="summary">
                <div className="summary__title">
                  <span>Your booking</span>
                  <span className="chip" style={{ padding: '0.2rem 0.55rem', fontSize: '0.52rem' }}>
                    No payment yet
                  </span>
                </div>

                <div className="summary__event">
                  <strong>{form.eventName || 'Your celebration'}</strong>
                  <span>
                    {formatLongDate(form.eventDate)}
                    {form.venue ? ` · ${form.venue}` : ''}
                  </span>
                </div>

                <div className="summary__row">
                  <span>{selectedPackage.name} package</span>
                  <span>{formatPeso(selectedPackage.price)}</span>
                </div>
                <div className="summary__row">
                  <span>
                    {selectedRush.id === 'none' ? 'Standard delivery' : selectedRush.name}
                  </span>
                  <span>{selectedRush.price === 0 ? 'Included' : formatPeso(selectedRush.price)}</span>
                </div>
                <div className="summary__row summary__row--muted">
                  <span>Delivery</span>
                  <span>{selectedPackage.turnaround}</span>
                </div>

                <div className="summary__total">
                  <span>{formatPeso(total)}</span>
                  <small>Estimated</small>
                </div>

                <p className="summary__note">
                  One-time fee. Optional services are billed only after approval. No online payment
                  is collected on this site.
                </p>

                <ul className="summary__list">
                  <li>
                    <Check aria-hidden="true" />
                    <span>Two rounds of minor revisions</span>
                  </li>
                  <li>
                    <Check aria-hidden="true" />
                    <span>Privacy notice &amp; guest consent included</span>
                  </li>
                  <li>
                    <Check aria-hidden="true" />
                    <span>Page live 6 days after the event</span>
                  </li>
                  <li>
                    <Check aria-hidden="true" />
                    <span>Reply within one working day</span>
                  </li>
                </ul>
              </div>

              <div className="booking-help">
                <h3>Your Aetheria team</h3>
                <p>
                  Every request is read by the studio team and answered from one inbox, so nothing
                  sits waiting while someone is out of office.
                </p>
                <div className="booking-help__person">
                  <span className="booking-help__monogram" aria-hidden="true">
                    AE
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ display: 'block', color: 'var(--on-light)', fontSize: '0.9rem' }}>
                      The Aetheria studio
                    </strong>
                    <span style={{ fontSize: '0.76rem', color: 'var(--on-light-mute)' }}>
                      {brand.hours}
                    </span>
                  </div>
                </div>

                <div className="save-contact">
                  <span className="save-contact__icon" aria-hidden="true">
                    <Plus style={{ width: 16, height: 16 }} />
                  </span>
                  <span className="save-contact__text">
                    <strong>Aetheria Events</strong>
                    <span>{brand.email} · studio contact</span>
                  </span>
                  <button
                    type="button"
                    className="btn btn--ink-ghost btn--xs"
                    onClick={() =>
                      downloadVCard({
                        firstName: 'Aetheria',
                        lastName: 'Events',
                        org: brand.name,
                        title: 'Studio team',
                        email: brand.email,
                        address: brand.address,
                        note: 'Aetheria Events — digital invitations, RSVP pages and private guest dashboards.',
                      })
                    }
                  >
                    <Download style={{ width: 13, height: 13 }} aria-hidden="true" />
                    Save contact
                  </button>
                </div>
              </div>

              <div className="booking-help">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield style={{ width: 16, height: 16, color: 'var(--gold-600)' }} aria-hidden="true" />
                  What we collect
                </h3>
                <p>
                  Your name, email, mobile number and event details — used to quote and deliver your
                  page. We never ask for health information, government IDs or card numbers.
                </p>
                <p style={{ marginBottom: 0 }}>
                  <Link to="/privacy" className="text-link" style={{ fontSize: '0.6rem' }}>
                    Read the privacy notice
                    <ArrowRight />
                  </Link>
                </p>
              </div>

              <div className="booking-help">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users style={{ width: 16, height: 16, color: 'var(--gold-600)' }} aria-hidden="true" />
                  Need a custom scope?
                </h3>
                <p style={{ marginBottom: 0 }}>
                  Multi-day events, gated venues and bespoke features fit the Premium package. Write
                  to{' '}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a> and we will draft the scope.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
