import { Link } from 'react-router-dom';
import { brand } from '../data/site';
import { useConsent } from '../lib/consent';
import Logo, { LogoMark } from './Logo';

export default function Footer() {
  const { openDialog } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <Logo markVariant="mono" />
            <p>
              Digital invitations, RSVP pages and private guest dashboards for celebrations worth
              remembering. Designed in Bonifacio Global City.
            </p>
            <p className="footer-stamp">
              <LogoMark variant="mono" />
              Est. Manila
            </p>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Explore</h2>
            <ul className="footer-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/packages">Packages &amp; pricing</Link>
              </li>
              <li>
                <Link to="/invitation">Sample invitation</Link>
              </li>
              <li>
                <Link to="/site-plan">Site plan</Link>
              </li>
              <li>
                <Link to="/booking">Book a date</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Trust &amp; terms</h2>
            <ul className="footer-list">
              <li>
                <Link to="/privacy">Privacy notice</Link>
              </li>
              <li>
                <Link to="/privacy#guests">Notice for guests</Link>
              </li>
              <li>
                <Link to="/terms">Service terms</Link>
              </li>
              <li>
                <Link to="/terms#refunds">Cancellation &amp; refunds</Link>
              </li>
              <li>
                <button type="button" className="link-button" onClick={openDialog}>
                  Privacy settings
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Contact</h2>
            <div className="footer-contact">
              <div>
                <strong>Office</strong>
                Level 21, Park Triangle Corporate Plaza
                <br />
                North Tower, BGC, Taguig City
              </div>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </div>
              <div>
                <strong>Data Protection Officer</strong>
                <a href={`mailto:${brand.dpoEmail}`}>{brand.dpoEmail}</a>
              </div>
              <div>
                <strong>Hours</strong>
                {brand.hours}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ margin: 0, maxWidth: 'none' }}>
            © {year} Aetheria Events. All rights reserved. A general partnership registered in the
            Philippines.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <button type="button" className="link-button" onClick={openDialog}>
              Privacy settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
