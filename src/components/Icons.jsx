const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const ArrowRight = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="btn__arrow" {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" {...stroke} />
  </svg>
);

export const Check = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" {...stroke} />
  </svg>
);

export const CheckCircle = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" {...stroke} />
    <path d="m8 12.2 2.7 2.8L16 9.5" {...stroke} />
  </svg>
);

export const Close = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M6 6l12 12M18 6 6 18" {...stroke} />
  </svg>
);

export const Plus = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 5v14M5 12h14" {...stroke} />
  </svg>
);

export const Minus = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M5 12h14" {...stroke} />
  </svg>
);

export const Shield = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 3.2 5 6v5.4c0 4.3 2.9 7.6 7 9.4 4.1-1.8 7-5.1 7-9.4V6l-7-2.8Z" {...stroke} />
    <path d="M12 8.6v3.6M12 15.6h.01" {...stroke} />
  </svg>
);

export const Download = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" {...stroke} />
  </svg>
);

export const Calendar = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2.2" {...stroke} />
    <path d="M3.5 10h17M8 3.5v4M16 3.5v4" {...stroke} />
  </svg>
);

export const MapPin = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 21c4.2-4.2 6.5-7.5 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 13.5 7.8 16.8 12 21Z" {...stroke} />
    <circle cx="12" cy="10.5" r="2.4" {...stroke} />
  </svg>
);

export const Clock = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="8.6" {...stroke} />
    <path d="M12 7.4V12l3.2 2" {...stroke} />
  </svg>
);

export const Mail = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" {...stroke} />
    <path d="m4 7 8 6 8-6" {...stroke} />
  </svg>
);

export const Phone = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M7 3.8h2.3l1.3 3.6-1.9 1.3a10 10 0 0 0 5.3 5.3l1.3-1.9 3.6 1.3v2.3a2.3 2.3 0 0 1-2.5 2.3A15.3 15.3 0 0 1 4.7 6.3 2.3 2.3 0 0 1 7 3.8Z" {...stroke} />
  </svg>
);

export const Sparkle = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 3.5c.7 4 2.5 5.8 6.5 6.5-4 .7-5.8 2.5-6.5 6.5-.7-4-2.5-5.8-6.5-6.5 4-.7 5.8-2.5 6.5-6.5Z" {...stroke} />
    <path d="M18 15.5c.35 2 1.25 2.9 3.25 3.25-2 .35-2.9 1.25-3.25 3.25-.35-2-1.25-2.9-3.25-3.25 2-.35 2.9-1.25 3.25-3.25Z" {...stroke} />
  </svg>
);

export const Warning = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 4.2 21 19.5H3L12 4.2Z" {...stroke} />
    <path d="M12 9.5v4.2M12 16.6h.01" {...stroke} />
  </svg>
);

export const Users = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="9.2" cy="9" r="3.2" {...stroke} />
    <path d="M3.5 19.2c.6-3 2.8-4.6 5.7-4.6s5.1 1.6 5.7 4.6" {...stroke} />
    <path d="M16 6.2a3 3 0 0 1 0 5.9M17 14.9c2.2.3 3.7 1.7 4.1 4" {...stroke} />
  </svg>
);

export const FileText = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M6 3.8h7.5L19 9.3v10.9H6V3.8Z" {...stroke} />
    <path d="M13.2 3.9v5.5H19M9 13h6M9 16.2h6" {...stroke} />
  </svg>
);

export const Copy = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="8.6" y="8.6" width="11" height="11" rx="2.2" {...stroke} />
    <path d="M15.4 8.6V6.4a2 2 0 0 0-2-2H6.4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2.2" {...stroke} />
  </svg>
);

export const Lock = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="4.5" y="10" width="15" height="10" rx="2" {...stroke} />
    <path d="M8 10V7.8a4 4 0 0 1 8 0V10M12 14v2.4" {...stroke} />
  </svg>
);

export const Star = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="m12 3.6 2.4 5.1 5.6.7-4.1 3.9 1 5.5-4.9-2.7-4.9 2.7 1-5.5L4 9.4l5.6-.7L12 3.6Z" {...stroke} />
  </svg>
);

export const Instagram = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" {...stroke} />
    <circle cx="12" cy="12" r="3.6" {...stroke} />
    <path d="M16.9 7.2h.01" {...stroke} />
  </svg>
);

export const Facebook = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M14.8 8.4h2.4V5.2h-2.4c-2.3 0-3.7 1.5-3.7 3.8v1.8H8.8v3.2h2.3V21h3.3v-7h2.3l.5-3.2h-2.8V9.4c0-.7.2-1 1-1Z" {...stroke} />
  </svg>
);

export const Menu = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
  </svg>
);

export const ChevronDown = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="m6 9.5 6 6 6-6" {...stroke} />
  </svg>
);

export const Printer = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M7 9V4h10v5M7 17.5H5.2A1.7 1.7 0 0 1 3.5 15.8v-4.1A1.7 1.7 0 0 1 5.2 10h13.6a1.7 1.7 0 0 1 1.7 1.7v4.1a1.7 1.7 0 0 1-1.7 1.7H17" {...stroke} />
    <rect x="7" y="14" width="10" height="6" rx="1" {...stroke} />
    <path d="M17.4 12.6h.01" {...stroke} />
  </svg>
);
