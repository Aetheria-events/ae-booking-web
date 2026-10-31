import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import { ArrowRight, Check, Clock, FileText, Shield, Sparkle, Users } from '../components/Icons';
import PlanCard from '../components/PlanCard';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { addOns, brand, comparisonRows, formatPeso, homeFaqs, packages } from '../data/site';
import { usePageMeta } from '../lib/hooks';

export default function Packages() {
  usePageMeta(
    'Packages & pricing · Aetheria Events',
    'Digital invitation packages from ₱1,499: Basic, Standard and Premium. Online RSVP, private dashboard, automated guest confirmations and a custom website name. Delivered in 2–6 working days.',
  );

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Packages</span>
          </nav>

          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Packages &amp; pricing</p>
              <h1>
                A page as considered
                <span className="italic gold"> as the room.</span>
              </h1>
              <p className="page-hero__lede">
                Three packages, one standard of care. Choose the inclusions you need; we will tell
                you honestly if a different tier suits your event better.
              </p>
            </div>

            <div className="page-hero__aside">
              <div className="hero-panel">
                <p className="hero-panel__label">At a glance</p>
                <ul className="hero-panel__rows">
                  {packages.map((plan) => (
                    <li key={plan.id}>
                      <span>
                        {plan.name}
                        {plan.featured && <em>Most booked</em>}
                      </span>
                      <strong>{formatPeso(plan.price)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="pill-row">
                  <span className="chip chip--gold">
                    <Sparkle style={{ width: 12, height: 12 }} aria-hidden="true" />
                    One-time fees
                  </span>
                  <span className="chip">No hidden charges</span>
                  <span className="chip">2 revision rounds</span>
                </div>
                <p className="small">
                  All prices are in Philippine pesos and inclusive of the package as described in
                  the Service Level Agreement. Optional services are billed only after approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-light leads-light pricing">
        <div className="wrap">
          <div className="plan-grid">
            {packages.map((plan, index) => (
              <Reveal className="plan-grid__cell" key={plan.id} delay={index * 80}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </div>

          <div className="pricing__note">
            <span>
              <Check aria-hidden="true" />
              Turnaround starts after payment and Asset Freeze
            </span>
            <span>
              <Check aria-hidden="true" />
              Two minor revisions included
            </span>
            <span>
              <Check aria-hidden="true" />
              Page and dashboard live for 6 days after the event
            </span>
            <span>
              <Check aria-hidden="true" />
              “Powered by Aetheria” footer on every package
            </span>
          </div>

          <div className="terms-strip">
            <div className="terms-strip__item">
              <strong>2–4 days</strong>
              <span>Delivery for Basic and Standard, counted in working days after payment and Asset Freeze.</span>
            </div>
            <div className="terms-strip__item">
              <strong>4–6 days</strong>
              <span>Delivery for Premium, which includes custom design, QR invitations and a custom site name.</span>
            </div>
            <div className="terms-strip__item">
              <strong>7 / 14 days</strong>
              <span>Recommended booking lead time before the event for Basic/Standard and Premium respectively.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-light section section--flush-top" id="add-ons">
        <div className="wrap">
          <SectionHead
            eyebrow="Optional services"
            title="A little faster, a little more room."
          >
            <p>
              Add these at booking or later. Rush services are subject to availability and approval
              by the digital fulfillment team, and are paid only once approved.
            </p>
          </SectionHead>

          <div className="addon-grid">
            {addOns.map((addOn, index) => (
              <Reveal className="addon" key={addOn.id} delay={index * 70}>
                <div className="addon__head">
                  <h3 className="addon__name">{addOn.name}</h3>
                  <span className="addon__price">{formatPeso(addOn.price)}</span>
                </div>
                <p className="addon__body">{addOn.summary}</p>
                <p className="addon__note">{addOn.note}</p>
              </Reveal>
            ))}
          </div>

          <p className="plan-note">
            Ultra-Express Same-Day is available for Basic and Standard packages only. If a rush
            deadline is missed by Aetheria Events, the rush fee is refunded. A Re-Layout applies when
            a change after the Asset Freeze alters the core palette, theme or page structure.
          </p>
        </div>
      </section>

      <section className="theme-light section section--flush-top" id="compare">
        <div className="wrap">
          <SectionHead eyebrow="Side by side" title="Every inclusion, compared.">
            <p>
              The same table appears in the Service Level Agreement. If it is not listed here, it is
              not part of the package.
            </p>
          </SectionHead>

          <div className="table-wrap">
            <table className="compare">
              <caption className="sr-only">
                Comparison of Aetheria Events Basic, Standard and Premium packages
              </caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Basic</th>
                  <th scope="col">Standard</th>
                  <th scope="col">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${index}`} data-label={['Basic', 'Standard', 'Premium'][index]}>
                        {value === true && (
                          <>
                            <Check className="cell-yes" aria-hidden="true" />
                            <span className="sr-only">Included</span>
                          </>
                        )}
                        {value === false && (
                          <>
                            <span className="cell-no" aria-hidden="true">
                              &ndash;
                            </span>
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                        {typeof value === 'string' && <span className="cell-text">{value}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="assurance-grid" style={{ marginTop: '2rem' }}>
            <div className="assurance">
              <span className="assurance__icon" aria-hidden="true">
                <Users />
              </span>
              <span className="assurance__title">Dashboard, explained</span>
              <p className="assurance__body">
                In Standard and Premium, view each RSVP, accept or decline, assign seating and
                monitor attendance. Each decision sends one email to the guest.
              </p>
            </div>
            <div className="assurance">
              <span className="assurance__icon" aria-hidden="true">
                <Shield />
              </span>
              <span className="assurance__title">Basic, explained</span>
              <p className="assurance__body">
                RSVPs arrive in the guest list; the client confirms with guests directly. The page
                still includes the privacy notice and consent capture.
              </p>
            </div>
            <div className="assurance">
              <span className="assurance__icon" aria-hidden="true">
                <FileText />
              </span>
              <span className="assurance__title">Footer</span>
              <p className="assurance__body">
                A discreet “Powered by Aetheria” footer appears on the landing page in all packages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split__sticky">
            <p className="eyebrow">Good to know</p>
            <h2>Terms in plain language.</h2>
            <p className="lede" style={{ marginTop: '1.2rem' }}>
              The short version of the agreement you sign. The full Service Level Agreement governs
              if anything here is read differently.
            </p>
            <Link to="/terms" className="text-link" style={{ marginTop: '1.6rem' }}>
              Read the service terms
              <ArrowRight />
            </Link>
          </div>

          <div>
            <div className="terms-strip" style={{ marginTop: 0 }}>
              <div className="terms-strip__item">
                <strong>Cancellation</strong>
                <span>
                  Full package refund if you cancel before the preview link is sent. After that, fees
                  are non-refundable except where we fail to deliver.
                </span>
              </div>
              <div className="terms-strip__item">
                <strong>Revisions</strong>
                <span>
                  Two consolidated rounds, submitted within 48 hours of the preview link. Referred
                  clients get a third round on their first order.
                </span>
              </div>
              <div className="terms-strip__item">
                <strong>Liability</strong>
                <span>
                  Our total liability is limited to the fees you paid. We are not responsible for your
                  event arrangements.
                </span>
              </div>
              <div className="terms-strip__item">
                <strong>Data retention</strong>
                <span>
                  Page locks 6 days after the event; records archive for 30 days; permanent deletion
                  on day 36. Late retrieval is ₱500.
                </span>
              </div>
            </div>

            <div className="notice" style={{ marginTop: '1.6rem' }}>
              <span className="notice__icon" aria-hidden="true">
                <Clock />
              </span>
              <span>
                <strong>Booking later than the recommended lead time?</strong> We will still try. The
                team confirms capacity and may recommend a rush service, but delivery before
                the event date is not guaranteed.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap split">
          <div className="split__sticky">
            <p className="eyebrow">Questions</p>
            <h2>Before you choose.</h2>
            <p className="lede" style={{ marginTop: '1.2rem' }}>
              Still deciding between Standard and Premium? Write to us with the date and guest
              count, and we will recommend the honest option.
            </p>
            <a href={`mailto:${brand.email}`} className="text-link" style={{ marginTop: '1.6rem' }}>
              {brand.email}
              <ArrowRight />
            </a>
          </div>
          <Accordion items={homeFaqs} defaultOpen={-1} />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div>
                <p className="eyebrow">Reserve a date</p>
                <h2>Ready when your date is.</h2>
                <p className="lede" style={{ marginTop: '1rem', maxWidth: '46ch' }}>
                  Choose a package in the booking form. No payment is taken online; we confirm
                  capacity first.
                </p>
              </div>
              <div className="cta-band__actions">
                <Link to="/booking" className="btn btn--gold">
                  Start your booking
                  <ArrowRight />
                </Link>
                <Link to="/invitation" className="btn btn--ghost">
                  See a sample page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
