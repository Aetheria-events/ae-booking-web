import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Shield } from '../components/Icons';
import { brand } from '../data/site';
import { useConsent } from '../lib/consent';
import { usePageMeta } from '../lib/hooks';

const toc = [
  ['who', 'Who we are'],
  ['scope', 'What this notice covers'],
  ['collect', 'Information we collect'],
  ['why', 'Why we collect it'],
  ['basis', 'Legal bases'],
  ['cookies', 'Cookies & consent'],
  ['sharing', 'Who can see it'],
  ['retention', 'How long we keep it'],
  ['security', 'How we protect it'],
  ['rights', 'Your rights'],
  ['guests', 'Notice for guests'],
  ['children', 'Children'],
  ['contact', 'Contact the DPO'],
];

export default function Privacy() {
  usePageMeta(
    'Privacy notice · Aetheria Events',
    'How Aetheria Events collects, uses, shares, retains and deletes personal information for clients, guests and website visitors, under the Philippine Data Privacy Act of 2012 (RA 10173).',
  );

  const { choice, openDialog, hasDecided } = useConsent();

  return (
    <>
      <section className="page-hero legal-hero">
        <div className="wrap">
          <div className="legal-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Privacy notice</span>
          </nav>
          <p className="eyebrow">Privacy &amp; data</p>
          <h1>
            Your data, handled
            <span className="italic gold"> with care.</span>
          </h1>
          <p className="page-hero__lede">
            Aetheria Events collects very little, keeps it briefly, and tells you exactly what
            happens to it. This is the plain-language notice behind that promise.
          </p>
          <p className="legal-updated">
            <Shield style={{ width: 14, height: 14 }} aria-hidden="true" />
            Version 1.0 · Last updated 30 October 2026 · Data Privacy Act of 2012 (RA 10173)
          </p>
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
              <h2 id="who">1. Who we are</h2>
              <p>
                Aetheria Events is a general partnership registered in the Philippines, with its
                business address at <strong>{brand.address}</strong>. For the personal data of our
                clients and website visitors, Aetheria Events acts as the{' '}
                <strong>Personal Information Controller (PIC)</strong>, we decide why and how the
                data is processed.
              </p>
              <p>
                For the guest data collected through an event&rsquo;s online RSVP form, the host (our
                client) is the PIC and Aetheria Events is the{' '}
                <strong>Personal Information Processor (PIP)</strong>. We process guest data only on
                the host&rsquo;s documented instructions.
              </p>

              <h2 id="scope">2. What this notice covers</h2>
              <p>
                This notice explains how we handle personal information on this website, through the
                booking form, and through the digital invitation and RSVP service we deliver to
                clients. It does not cover third-party websites we link to, such as Google Maps or a
                client&rsquo;s own social pages.
              </p>

              <h2 id="collect">3. Information we collect</h2>
              <p>We collect only what the service needs:</p>
              <table>
                <caption>Personal information collected through this site</caption>
                <thead>
                  <tr>
                    <th scope="col">Who</th>
                    <th scope="col">What we collect</th>
                    <th scope="col">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clients (booking form)</td>
                    <td>
                      Full name, email address, mobile number, event type, event date, venue or city,
                      estimated guest count and any notes you choose to add.
                    </td>
                    <td>To prepare a quotation, confirm capacity and deliver your event page.</td>
                  </tr>
                  <tr>
                    <td>Guests (RSVP form)</td>
                    <td>
                      Name, email address, RSVP status, number of guests, optional message, and table
                      assignment recorded by the host.
                    </td>
                    <td>To record your reply, confirm your seat and prepare the seating plan.</td>
                  </tr>
                  <tr>
                    <td>Website visitors</td>
                    <td>
                      Your privacy preference, stored in your own browser. If you allow it,
                      anonymous, aggregated analytics events.
                    </td>
                    <td>To remember your choice and improve the site.</td>
                  </tr>
                </tbody>
              </table>
              <div className="callout">
                <strong>What we never ask for.</strong> We do not collect health information
                (including dietary restrictions or allergies), government ID numbers, payment card
                details or financial account information through our RSVP forms.
              </div>

              <h2 id="why">4. Why we collect it</h2>
              <ul>
                <li>To respond to your booking request and issue an invoice.</li>
                <li>To design, build, test and deliver your digital event page and RSVP.</li>
                <li>To send requested guest confirmations and calendar invitations.</li>
                <li>To answer questions during our working hours and provide support.</li>
                <li>To keep records required for tax, accounting and legal purposes.</li>
                <li>To improve this website, using aggregated data only, and only with your consent.</li>
              </ul>
              <p>
                We do not sell personal information, and we do not use guest data for our own
                marketing.
              </p>

              <h2 id="basis">5. Legal bases</h2>
              <p>Under the Data Privacy Act of 2012 and its Implementing Rules and Regulations, we rely on:</p>
              <ul>
                <li>
                  <strong>Contract</strong>, processing your booking details to deliver the service
                  you requested.
                </li>
                <li>
                  <strong>Consent</strong>, for optional analytics and, for guests, the reply you
                  submit through the RSVP form.
                </li>
                <li>
                  <strong>Legitimate interests</strong>, protecting the security of our site and
                  service, and responding to enquiries.
                </li>
                <li>
                  <strong>Legal obligation</strong>, retaining client contact and payment records as
                  required by Philippine law.
                </li>
              </ul>

              <h2 id="cookies">6. Cookies, storage &amp; consent</h2>
              <p>
                This site uses no advertising cookies and no third-party tracking pixels. We use your
                browser&rsquo;s local storage for two things: remembering whether you accepted
                analytics, and, in our sample invitation, keeping your preview RSVP so you can see
                how the form behaves.
              </p>
              <p>
                When you first visit, a notice asks whether you allow anonymous, aggregated analytics.
                You may accept all or keep essential storage only. Your choice is stored in your
                browser for this site and can be changed at any time.
              </p>

              <div className="consent-widget">
                <p>
                  <strong>Your current choice:</strong>{' '}
                  {!hasDecided
                    ? 'not set yet'
                    : choice?.analytics
                      ? 'analytics allowed (plus essential storage)'
                      : 'essential storage only'}
                </p>
                <button type="button" className="btn btn--ink-ghost btn--sm" onClick={openDialog}>
                  <Lock style={{ width: 13, height: 13 }} aria-hidden="true" />
                  Change privacy settings
                </button>
              </div>

              <h2 id="sharing">7. Who can see your data</h2>
              <p>
                Only authorized partners of Aetheria Events can access personal data, and they are
                bound to keep it confidential. For guest data, access is limited to the host and our
                authorized team.
              </p>
              <p>
                To provide the service we engage the following processors, which the client
                authorizes in the Service Level Agreement:
              </p>
              <ul>
                <li>
                  <strong>Google Workspace</strong>, email, file storage and the Google Sites
                  landing page.
                </li>
                <li>
                  <strong>Cloudflare</strong>, web application firewall, traffic security and bot
                  protection.
                </li>
                <li>
                  <strong>Tally</strong>, the embedded RSVP form and its submissions.
                </li>
              </ul>
              <p>
                We do not engage any other processor for guest data without the client&rsquo;s
                consent. Clients have no access to the underlying database; only authorized Aetheria
                Events partners can access guest data.
              </p>

              <h2 id="retention">8. How long we keep it</h2>
              <ul>
                <li>
                  The event page and dashboard are <strong>locked six (6) days after the event</strong>,
                  automatically or, if automation fails, manually by Aetheria Events.
                </li>
                <li>
                  Guest data is then held in a <strong>restricted archive for 30 days</strong> and is
                  <strong> permanently deleted on the 36th day after the event</strong>.
                </li>
                <li>
                  A client who missed the six-day active window may request a{' '}
                  <strong>Late Data Retrieval</strong> (₱500 per retrieval) within the 30-day period.
                  The export is sent only to the client, verified through their access key, and our
                  copy is then deleted.
                </li>
                <li>
                  Client contact and payment records are kept as required for business and tax
                  purposes by law.
                </li>
                <li>
                  Each deletion is recorded in a log that contains no guest data.
                </li>
              </ul>

              <h2 id="security">9. How we protect it</h2>
              <ul>
                <li>All traffic passes through Cloudflare&rsquo;s web application firewall, with bot protection on the dashboard login.</li>
                <li>Dashboard access uses a unique link key and a PIN. Five wrong attempts lock the key for 15 minutes.</li>
                <li>The client may ask us to change the link key and PIN at any time.</li>
                <li>Only authorized partners of Aetheria Events can access guest data.</li>
                <li>
                  If a security incident involving guest data occurs, we notify the client
                  immediately and assist with, or file on their behalf, any notification required
                  to the National Privacy Commission and affected guests.
                </li>
              </ul>

              <h2 id="rights">10. Your rights</h2>
              <p>Under the Data Privacy Act of 2012, you have the right to:</p>
              <ul>
                <li>
                  <strong>Be informed</strong> whether personal information relating to you has been
                  processed.
                </li>
                <li>
                  <strong>Object</strong> to processing, including direct marketing.
                </li>
                <li>
                  <strong>Access</strong> your personal information held by us.
                </li>
                <li>
                  <strong>Correct</strong> inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Erase or block</strong> information, subject to legal and contractual
                  retention requirements.
                </li>
                <li>
                  <strong>Damages</strong> where the law provides, for a violation of your rights.
                </li>
                <li>
                  <strong>Data portability</strong>, where applicable, and to be notified of
                  automated processing.
                </li>
                <li>
                  <strong>Complain</strong> to the National Privacy Commission.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email{' '}
                <a href={`mailto:${brand.dpoEmail}`}>{brand.dpoEmail}</a> with enough detail for us to
                identify you and your request. We may ask for proof of identity. We will respond as
                soon as practicable and within the period required by law, and we will help clients
                respond to their guests&rsquo; requests.
              </p>

              <h2 id="guests">11. Notice for guests</h2>
              <p>
                If you received an invitation and replied through an RSVP form, this section is for
                you. The host of the event is the Personal Information Controller; Aetheria Events is
                their processor.
              </p>
              <ul>
                <li>
                  <strong>What is collected:</strong> your name, email address, RSVP status, number of
                  guests, an optional message, and a table assignment if the host records one.
                </li>
                <li>
                  <strong>Why:</strong> so the host can prepare your seat, confirm your attendance and
                  plan the room. Standard and Premium pages send a confirmation email once the host
                  accepts your reply; each decision sends one email only.
                </li>
                <li>
                  <strong>Who sees it:</strong> the host and authorized Aetheria Events partners only.
                  It is never sold and never used for our own marketing.
                </li>
                <li>
                  <strong>How long:</strong> the page and dashboard lock six days after the event;
                  records archive for 30 days and are permanently deleted on day 36.
                </li>
                <li>
                  <strong>Your choices:</strong> email{' '}
                  <a href={`mailto:${brand.dpoEmail}`}>{brand.dpoEmail}</a> to access, correct or delete
                  your reply, or contact the host directly. We will pass the request to the host and
                  help them respond.
                </li>
              </ul>

              <h2 id="children">12. Children</h2>
              <p>
                Our booking form is intended for adults organizing an event. If an RSVP includes the
                names of children, they are recorded only as part of the guest count and seating
                plan, with the consent of the parent or guardian who submits the form.
              </p>

              <h2 id="changes">13. Changes &amp; incidents</h2>
              <p>
                We may update this notice when the service or the law changes. The version number and
                date at the top of this page always reflect the current notice. Material changes will
                be announced on this page.
              </p>
              <p>
                If we become aware of a personal data breach, we will notify the client immediately
                and cooperate with the National Privacy Commission and affected individuals as
                required by RA 10173.
              </p>

              <h2 id="contact">14. Contact the Data Protection Officer</h2>
              <p>
                Questions, requests and complaints can be sent to our Data Protection Officer:
              </p>
              <div className="callout">
                <strong>Data Protection Officer, Aetheria Events</strong>
                <br />
                <a href={`mailto:${brand.dpoEmail}`}>
                  <Mail style={{ width: 13, height: 13, display: 'inline', verticalAlign: '-1px' }} />{' '}
                  {brand.dpoEmail}
                </a>
                <br />
                {brand.address}
                <br />
                {brand.hours}
              </div>
              <p>
                You may also write to the National Privacy Commission at{' '}
                <a href="https://www.privacy.gov.ph" target="_blank" rel="noreferrer">
                  privacy.gov.ph
                </a>{' '}
                or complaints@privacy.gov.ph if you believe your rights have been violated.
              </p>

              <p className="law-note">
                This website notice is drafted from the Aetheria Events Service Level Agreement and
                the Data Privacy Act of 2012 (RA 10173). It is a good-faith summary, not legal advice.
                Before publishing, have the final text reviewed by the partnership&rsquo;s legal
                counsel and align it with any internal data protection policies.
              </p>

              <p style={{ marginTop: '1.4rem' }}>
                <Link to="/terms" className="text-link">
                  Read the service terms
                  <ArrowRight />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
