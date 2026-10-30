import { Link } from 'react-router-dom';

export function LogoMark({ className = '' }) {
  return (
    <svg className={`logo__mark ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="29.4" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
      <path
        d="M32 22.4 45.4 50.2M32 22.4 18.6 50.2M23.9 40.6h16.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M32 8.4l1.6 4.2 4.2 1.6-4.2 1.6-1.6 4.2-1.6-4.2-4.2-1.6 4.2-1.6z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Logo({
  as = 'link',
  to = '/',
  variant = '',
  showSub = true,
  className = '',
  ariaLabel = 'Aetheria Events — home',
}) {
  const inner = (
    <>
      <LogoMark />
      <span className="logo__type">
        <span className="logo__name">Aetheria</span>
        {showSub && <span className="logo__sub">Events</span>}
      </span>
    </>
  );

  const classes = ['logo', variant ? `logo--${variant}` : '', className].filter(Boolean).join(' ');

  if (as === 'link') {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return <span className={classes}>{inner}</span>;
}
