import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { usePageMeta } from '../lib/hooks';

export default function NotFound() {
  usePageMeta('Page not found — Aetheria Events', 'The page you were looking for is not here.');

  return (
    <section className="section" style={{ minHeight: '58vh', display: 'grid', placeItems: 'center' }}>
      <div className="wrap" style={{ textAlign: 'center', maxWidth: '640px' }}>
        <p className="eyebrow eyebrow--center">404 · Lost in the aether</p>
        <h1 style={{ fontSize: 'clamp(2.6rem, 7vw, 4.4rem)' }}>
          This page has
          <span className="italic gold"> drifted off.</span>
        </h1>
        <p className="lede" style={{ margin: '1.2rem auto 0', maxWidth: '42ch' }}>
          The link may be old, or the page may have moved. The celebration, however, is still on.
        </p>
        <div
          className="hero__actions"
          style={{ justifyContent: 'center', marginTop: '1.8rem' }}
        >
          <Link to="/" className="btn btn--gold">
            Back to home
            <ArrowRight />
          </Link>
          <Link to="/packages" className="btn btn--ghost">
            View packages
          </Link>
        </div>
      </div>
    </section>
  );
}
