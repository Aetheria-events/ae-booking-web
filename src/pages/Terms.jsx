import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Shield } from '../components/Icons';
import { brand, formatPeso, packages } from '../data/site';
import { usePageMeta } from '../lib/hooks';

const toc = [
  ['agreement', 'The agreement'],
  ['packages', 'Packages & inclusions'],
  ['booking', 'Booking, payment & Asset Freeze'],
  ['delivery', 'Delivery period & capacity'],
  ['rush', 'Optional rush services'],
  ['revisions', 'Revisions & additional fees'],
  ['refunds', 'Cancellation & refunds'],
  ['client', 'Client responsibilities'],
  ['aetheria', 'Aetheria Events responsibilities'],
  ['privacy', 'Data privacy roles'],
  ['security', 'Security & access'],
  ['retention', 'Retention & deletion'],
  ['platforms', 'Third-party platforms'],
  ['liability', 'Limitation of liability'],
  ['general', 'Governing law'],
  ['contact', 'Contact'],
];

export default function Terms() {
  usePageMeta(
    'Service terms & booking policy, Aetheria Events',
    'The Aetheria Events service terms: packages, booking and payment, Asset Freeze, delivery periods, rush services, revisions, cancellations and refunds, privacy roles and limitation of liability.',
  );

  return (
    <>
      <section className="page-hero legal-hero">
        <div className="wrap">
          <div className="legal-hero__grid">
          <div className="legal-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Service terms</span>
          </nav>
          <p className="eyebrow">Service terms</p>
          <h1>
            Clear terms,
            <span className="italic gold"> no surprises.</span>
          </h1>
          <p className="page-hero__lede">
            The summary of how a booking works: the dates we keep, the revisions included, and what
            happens if plans change. The signed Service Level Agreement governs in every case.
          </p>
          </div>

          <aside className="hero-panel hero-panel--doc">
            <p className="hero-panel__label">Document</p>
            <ul className="hero-panel__rows">
              <li>
                <span>Version</span>
                <strong>1.0</strong>
              </li>
              <li>
                <span>Last updated</span>
                <strong>30 October 2026</strong>
              </li>
              <li>
                <span>Governing law</span>
                <strong>Philippine law</strong>
              </li>
            </ul>
            <div className="hero-panel__links">
              <Link to="/privacy">
                Privacy notice
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/privacy#guests">
                Notice for guests
                <ArrowRight aria-hidden="true" />
              </Link>
              <a href={`mailto:${brand.email}`}>
                Ask a question
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </aside>
          </div>
        </div>
      </section>

      <div className="theme-light leads-light">
        <div className="wrap legal-grid">
          <nav className="legal-toc" aria-label="On this page">
            <span className="legal-toc__title">On this page</span>
            {toc.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="legal-body">
            <div className="prose">
              <h2 id="agreement">1. The agreement</h2>
              <p>
                These terms summarize the Aetheria Events Service Level Agreement (SLA) for a
                Customized Digital Event Landing Page. A booking is made when a client chooses a
                package, pays the package fee through the channels stated at booking, and gains access
                to the intake page. The signed SLA, not this summary, is the full agreement between
                the parties.
              </p>
              <div className="callout">
                <strong>Short version:</strong> one-time package fee, delivery in 2–6 working days
                after payment and Asset Freeze, two included revision rounds, refunds only before the
                preview link is sent. Optional services are paid only after approval.
              </div>

              <h2 id="packages">2. Packages &amp; inclusions</h2>
              <p>
                The current packages and their inclusions are listed on the{' '}
                <Link to="/packages">packages page</Link>. In summary:
              </p>
              <ul>
                {packages.map((plan) => (
                  <li key={plan.id}>
                    <strong>{plan.name}</strong>, {formatPeso(plan.price)}. {plan.summary} Delivered
                    in {plan.turnaround}; recommended booking lead time of {plan.leadTime} calendar
                    days.
                  </li>
                ))}
              </ul>
              <p>
                A discreet “Powered by Aetheria” footer appears on the landing page in all packages.
                The client views RSVPs in a private dashboard in Standard and Premium; in Basic, the
                client views RSVPs in the guest list and confirms with guests directly.
              </p>

              <h2 id="booking">3. Booking, payment &amp; Asset Freeze</h2>
              <ol>
                <li>
                  The client chooses a package, pays the full package fee through the payment channels
                  stated at booking, and gains access to the intake page to upload event details and
                  assets.
                </li>
                <li>
                  Bookings can be made through Aetheria Events&rsquo; online channels or at its
                  promotional events.
                </li>
                <li>
                  <strong>Asset Freeze.</strong> The delivery period begins only after the client
                  submits an Asset Freeze, a written confirmation that all photographs, event text,
                  colors and venue details are final. After the Asset Freeze, any change counts as a
                  revision.
                </li>
                <li>
                  Promotional discounts and referral benefits follow the terms stated when they were
                  offered.
                </li>
              </ol>
              <div className="callout">
                <strong>Payments happen off-site.</strong> This website sends a booking request only.
                No payment is collected online; we confirm capacity first and then email the invoice
                and payment instructions.
              </div>

              <h2 id="delivery">4. Delivery period &amp; capacity</h2>
              <ol>
                <li>
                  The delivery period is <strong>2 to 4 working days</strong> for Basic and Standard
                  and <strong>4 to 6 working days</strong> for Premium. Working days are Monday to
                  Friday.
                </li>
                <li>
                  The period starts the next working day after Aetheria Events receives the payment
                  and the Asset Freeze.
                </li>
                <li>
                  The period is paused while Aetheria Events waits for the client&rsquo;s replies or
                  approval, and resumes when the client responds.
                </li>
                <li>
                  Aetheria Events processes up to <strong>20 new orders per working day</strong>.
                  Orders beyond that are moved to the next working day, and their delivery period
                  starts then.
                </li>
                <li>
                  Book at least <strong>7 calendar days</strong> before the event for Basic and
                  Standard, and at least <strong>14 calendar days</strong> for Premium. Delivery before
                  the event date is not guaranteed for later bookings.
                </li>
                <li>
                  Delivery means the preview link, and later the live link and dashboard access where
                  included, is sent to the client by email.
                </li>
              </ol>

              <h2 id="rush">5. Optional rush services</h2>
              <p>
                Rush services are subject to availability and to approval by Aetheria Events. A rush
                request is approved only if (a) the Asset Freeze is received within the time window
                below, (b) fewer than three rush orders have already been approved for that working
                day, and (c) the day&rsquo;s new orders are within the daily limit. If any condition
                is not met, the request is declined and the order follows the standard delivery period
                at no extra charge.
              </p>
              <ul>
                <li>
                  <strong>Express Rush ({formatPeso(350)}).</strong> The preview link is sent the same
                  working day if the Asset Freeze is received before 12:00 NN, otherwise by 12:00 NN
                  of the next working day. For Premium, the preview link is sent within one working
                  day.
                </li>
                <li>
                  <strong>Ultra-Express Same-Day ({formatPeso(750)}).</strong> The preview link is sent
                  within two working hours of the Asset Freeze, which must be received between 8:00 AM
                  and 3:00 PM on a working day. Available for Basic and Standard packages only.
                </li>
                <li>
                  Rush services shorten only the time to the preview link. The client&rsquo;s review
                  and revision rounds follow the usual rules, and the delivery date also depends on
                  the client&rsquo;s replies.
                </li>
                <li>
                  If Aetheria Events misses the deadline of an approved rush service, the rush fee is
                  refunded.
                </li>
              </ul>

              <h2 id="revisions">6. Revisions &amp; additional fees</h2>
              <ol>
                <li>
                  Each package includes <strong>up to two rounds of minor revisions</strong>, small
                  changes such as typographical corrections, text updates and asset swaps within the
                  chosen layout. A referred client receives a third round on the first order.
                </li>
                <li>
                  Revisions must be consolidated and submitted within <strong>48 hours</strong> after
                  the preview link is sent. Aetheria Events applies each round within one working day.
                </li>
                <li>
                  A request to rework the core color palette, the visual theme or the page structure,
                  or any change beyond the included revisions, is charged a{' '}
                  <strong>{formatPeso(500)} Re-Layout Fee</strong>.
                </li>
              </ol>

              <h2 id="refunds">7. Cancellation &amp; refunds</h2>
              <ul>
                <li>
                  The client may cancel <strong>before the preview link is sent</strong>, and Aetheria
                  Events will refund the package fee.
                </li>
                <li>
                  Rush fees are refunded only if an approved rush deadline is missed.
                </li>
                <li>
                  After the preview link is sent, fees are <strong>non-refundable</strong>, except
                  where Aetheria Events fails to deliver the service as described in the Agreement.
                </li>
              </ul>

              <h2 id="client">8. Client responsibilities</h2>
              <ul>
                <li>Provide accurate and complete event details, and review the preview link promptly.</li>
                <li>Provide only content, photos, text, logos, that the client has the right to use.</li>
                <li>
                  Keep the dashboard link key and PIN confidential and report any suspected
                  unauthorized access immediately.
                </li>
                <li>
                  Not request or collect through the forms any health information (including dietary
                  restrictions or allergies), government ID numbers or financial information.
                </li>
                <li>
                  Inform guests, as required by law, that their information is collected through the
                  RSVP form, and give lawful instructions to Aetheria Events for handling it.
                </li>
                <li>
                  Download the guest list and other exports during the active window, and delete the
                  copies after the retention period.
                </li>
              </ul>

              <h2 id="aetheria">9. Aetheria Events responsibilities</h2>
              <ul>
                <li>Design, build, test and deliver the landing page according to the selected package.</li>
                <li>
                  Test every page for links, forms, RSVP functions and mobile responsiveness before
                  sending the preview link.
                </li>
                <li>Respond to inquiries during working hours (Monday to Friday, 8:00 AM to 5:00 PM).</li>
                <li>Handle personal data as described in the privacy sections of the SLA and our privacy notice.</li>
                <li>Post the client&rsquo;s page or feedback on social media only with the client&rsquo;s permission.</li>
              </ul>

              <h2 id="privacy">10. Data privacy roles</h2>
              <p>
                For guest data, the client is the Personal Information Controller and Aetheria Events is
                the Personal Information Processor. For the client&rsquo;s own contact and payment
                details, Aetheria Events is the Controller. Both parties comply with the Data Privacy
                Act of 2012 (RA 10173).
              </p>
              <p>
                RSVP forms collect only the guest&rsquo;s name, email address, RSVP status and number
                of guests; table assignments may be recorded in the dashboard. The full detail is in
                our <Link to="/privacy">privacy notice</Link>.
              </p>

              <h2 id="security">11. Security &amp; access</h2>
              <ul>
                <li>All traffic passes through Cloudflare&rsquo;s web application firewall, with bot protection on the login.</li>
                <li>Dashboard access uses the client&rsquo;s unique link key and a PIN. Five wrong attempts lock the key for 15 minutes.</li>
                <li>The client may ask Aetheria Events to change the link key and PIN at any time.</li>
                <li>Clients have no access to the underlying database; only authorized partners of Aetheria Events can access guest data.</li>
              </ul>

              <h2 id="retention">12. Retention &amp; deletion</h2>
              <ul>
                <li>The landing page and dashboard are locked six days after the event.</li>
                <li>Guest data is held in a restricted archive for 30 days and permanently deleted on the 36th day after the event.</li>
                <li>Late Data Retrieval is available at {formatPeso(500)} per retrieval within the 30-day period.</li>
                <li>Copies in trash folders are removed according to the platform&rsquo;s trash period; Aetheria Events also deletes its own exports and related emails.</li>
                <li>Each deletion is recorded in a log that contains no guest data.</li>
                <li>Client contact and payment records are kept for business and tax purposes as required by law.</li>
              </ul>

              <h2 id="platforms">13. Service availability &amp; third-party platforms</h2>
              <p>
                The service runs on third-party platforms (Google Workspace, Cloudflare, Tally).
                Aetheria Events uses reasonable efforts to keep the page available until the end of the
                retention period but is not responsible for interruptions caused by these providers.
                Email sending is subject to the email provider&rsquo;s daily sending limits.
              </p>
              <table>
                <caption>Summary of optional fees</caption>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Express Rush</td>
                    <td>{formatPeso(350)}</td>
                  </tr>
                  <tr>
                    <td>Ultra-Express Same-Day</td>
                    <td>{formatPeso(750)}</td>
                  </tr>
                  <tr>
                    <td>Re-Layout Fee</td>
                    <td>{formatPeso(500)}</td>
                  </tr>
                  <tr>
                    <td>Late Data Retrieval</td>
                    <td>{formatPeso(500)} per retrieval</td>
                  </tr>
                </tbody>
              </table>

              <h2 id="liability">14. Limitation of liability</h2>
              <p>
                Aetheria Events&rsquo; total liability under the Agreement is limited to the fees paid
                by the client. Aetheria Events is not liable for the client&rsquo;s event arrangements,
                or for losses caused by incorrect information the client provided.
              </p>

              <h2 id="general">15. Governing law &amp; disputes</h2>
              <p>
                The parties will first try to settle any dispute amicably. The laws of the Philippines
                apply. The Agreement may be signed electronically, as recognized by the Electronic
                Commerce Act of 2000 (RA 8792), and constitutes the full agreement between the parties
                for this service.
              </p>

              <h2 id="contact">16. Contact</h2>
              <div className="callout">
                <strong>Aetheria Events</strong>
                <br />
                {brand.address}
                <br />
                <a href={`mailto:${brand.email}`}>
                  <Mail style={{ width: 13, height: 13, display: 'inline', verticalAlign: '-1px' }} />{' '}
                  {brand.email}
                </a>
                <br />
                Data Protection Officer:{' '}
                <a href={`mailto:${brand.dpoEmail}`}>{brand.dpoEmail}</a>
                <br />
                {brand.hours}
              </div>

              <p className="law-note">
                This page is a website summary of the Aetheria Events Service Level Agreement (Appendix
                A) prepared for clarity, not legal advice. If the summary and the signed SLA differ,
                the signed SLA governs. Have counsel review the published version together with the
                privacy notice before launch.
              </p>

              <div className="booking-actions" style={{ marginTop: '1.4rem' }}>
                <Link to="/privacy" className="text-link">
                  <Shield style={{ width: 12, height: 12 }} aria-hidden="true" />
                  Privacy notice
                </Link>
                <a
                  href={brand.bookingSheet}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start a booking
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
