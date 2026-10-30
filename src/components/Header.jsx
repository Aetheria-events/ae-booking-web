import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand, nav } from '../data/site';
import { useLockBody } from '../lib/hooks';
import { ArrowRight, Lock } from './Icons';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useLockBody(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const primary = nav.filter((item) => !item.cta);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap header-inner">
          <Logo />

          <nav className="nav" aria-label="Primary">
            {primary.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/booking" className="btn btn--gold btn--header">
              Book your date
              <ArrowRight />
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="menu-btn__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ul className="mobile-nav__list">
            {nav.map((item, index) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `mobile-nav__link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                  <span>{item.cta ? 'Reserve' : String(index + 1).padStart(2, '0')}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-nav__foot">
          <p style={{ margin: 0, color: 'var(--text-mute)', fontSize: '0.8rem' }}>
            Digital invitations & RSVP pages
            <br />
            {brand.serviceArea}
          </p>
          <a href={`mailto:${brand.email}`} className="text-link">
            {brand.email}
            <ArrowRight />
          </a>
          <Link to="/privacy" className="mobile-nav__privacy">
            <Lock style={{ width: 13, height: 13 }} />
            Privacy notice
          </Link>
        </div>
      </div>
    </>
  );
}
