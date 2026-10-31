// Central content source. Fees, turnaround and policy copy are taken from the
// Aetheria Events Service Level Agreement (Appendix A) so the website and the
// signed contract never contradict each other.

export const brand = {
  name: 'Aetheria Events',
  shortName: 'Aetheria',
  tagline: 'Your event, in a single luminous link.',
  address: 'Level 21, Park Triangle Corporate Plaza, North Tower, Bonifacio Global City, Taguig City',
  email: 'digitalfulfillment@aetheriaevents.com',
  dpoEmail: 'dataprivacy@aetheriaevents.com',
  team: 'the Aetheria digital fulfillment team',
  hours: 'Monday to Friday, 8:00 AM – 5:00 PM (PHT)',
  serviceArea: 'Metro Manila & nationwide events',
  // the sheet that holds every request, opened only as a fallback
  bookingSheet:
    'https://docs.google.com/spreadsheets/d/1jUrvnfI1MtEY83iVdLOZKxxQUbCtou1F-yf1ABUqYqQ/edit?usp=sharing',
  // Google Apps Script web app that appends a row to the sheet above.
  // Paste the deployed /exec URL here and every form submission is written
  // straight into the sheet. The script lives in docs/booking-sheet.gs.
  bookingEndpoint: '',
};

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Packages', to: '/packages' },
  { label: 'Invitation', to: '/invitation' },
  { label: 'About our Team', to: '/about' },
  { label: 'Booking', to: '/booking', cta: true },
];

// Kept out of the header on purpose, the site plan lives in the footer.
export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'Packages & pricing', to: '/packages' },
  { label: 'Sample invitation', to: '/invitation' },
  { label: 'About our Team', to: '/about' },
  { label: 'Booking', to: '/booking' },
  { label: 'Site plan', to: '/site-plan' },
];

export const currency = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
});

export const formatPeso = (value) => `₱${new Intl.NumberFormat('en-PH').format(value)}`;

export const packages = [
  {
    id: 'basic',
    name: 'Basic',
    price: 1499,
    turnaround: '2–4 working days',
    leadTime: 7,
    summary: 'A beautiful one-page invitation with a working RSVP, everything essential, nothing extra.',
    features: [
      'Responsive landing page on Google Sites',
      'Event details, countdown timer & location map',
      'Embedded RSVP form (Tally) with guest list',
      'Up to two minor revisions',
      'Page kept live for 6 days after the event',
      '“Powered by Aetheria” footer',
    ],
    notIncluded: [
      'Automated email confirmations',
      'Calendar button (Google Calendar)',
      'Private client dashboard',
      'Custom website name',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 2499,
    turnaround: '2–4 working days',
    leadTime: 7,
    summary: 'The favourite. Everything in Basic, plus a private dashboard and automatic guest confirmations.',
    featured: true,
    badge: 'Most booked',
    features: [
      'Everything in the Basic package',
      'Automated email confirmations for guests',
      'Calendar button (Google Calendar)',
      'Private client dashboard',
      'Accept or decline guests, assign seating, track attendance',
      'Up to two minor revisions',
      'Page kept live for 6 days after the event',
    ],
    notIncluded: ['Email invitation with QR code', 'Custom website name', 'Custom complex features'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 3999,
    turnaround: '4–6 working days',
    leadTime: 14,
    summary: 'For gated celebrations and ambitious ideas: custom design, QR invitations and a bespoke domain.',
    features: [
      'Everything in the Standard package',
      'Email invitation with QR code for secured events',
      'Custom complex features and design',
      'Custom website name',
      'Private client dashboard',
      'Up to two minor revisions',
      'Page kept live for 6 days after the event',
    ],
    notIncluded: [],
  },
];

export const addOns = [
  {
    id: 'express',
    name: 'Express Rush',
    price: 350,
    summary: 'Preview link the same working day when the Asset Freeze lands before 12:00 NN (within 1 working day for Premium).',
    note: 'Subject to availability and approval. Limited to fewer than 3 approved rush orders per working day.',
  },
  {
    id: 'ultra',
    name: 'Ultra-Express Same-Day',
    price: 750,
    summary: 'Preview link within 2 working hours of the Asset Freeze, received 8:00 AM–3:00 PM on a working day.',
    note: 'Available for Basic and Standard packages only.',
    restrictedTo: ['basic', 'standard'],
  },
  {
    id: 'relayout',
    name: 'Re-Layout Fee',
    price: 500,
    summary: 'Requested after the Asset Freeze for a new core palette, visual theme or page structure.',
    note: 'Only applies when the change goes beyond the two included revision rounds.',
  },
  {
    id: 'retrieval',
    name: 'Late Data Retrieval',
    price: 500,
    summary: 'An export of your guest records from the restricted archive after the 6-day active window.',
    note: 'Requested within 30 days of the event; ₱500 per retrieval. Records are deleted on day 36.',
  },
];

export const comparisonRows = [
  { label: 'Responsive landing page on Google Sites', values: [true, true, true] },
  { label: 'Event details, countdown timer & location map', values: [true, true, true] },
  { label: 'Embedded RSVP form with guest list', values: [true, true, true] },
  { label: 'Automated email confirmations for guests', values: [false, true, true] },
  { label: 'Calendar button (Google Calendar)', values: [false, true, true] },
  { label: 'Private client dashboard', values: [false, true, true] },
  { label: 'Up to two minor revisions', values: [true, true, true] },
  { label: 'Page & dashboard live 6 days after the event', values: [true, true, true] },
  { label: 'Email invitation with QR code', values: [false, false, true] },
  { label: 'Custom complex features & design', values: [false, false, true] },
  { label: 'Custom website name', values: [false, false, true] },
  { label: 'Turnaround time', values: ['2–4 days', '2–4 days', '4–6 days'] },
  { label: 'Recommended booking lead time', values: ['7 days', '7 days', '14 days'] },
];

export const processSteps = [
  {
    step: '01',
    title: 'Choose & book',
    body: 'Pick a package and send the booking form. We reply within one working day with your invoice, payment channels and intake page.',
  },
  {
    step: '02',
    title: 'Asset Freeze',
    body: 'Upload photos, event text, colours and venue details, then confirm them as final. The delivery clock starts the next working day after payment and the freeze.',
  },
  {
    step: '03',
    title: 'Preview & revisions',
    body: 'You receive your preview link. Each package includes two consolidated rounds of minor revisions, submitted within 48 hours of the preview.',
  },
  {
    step: '04',
    title: 'Live & RSVP',
    body: 'We publish your page, open the RSVP, and (Standard and Premium) hand you a private dashboard to accept guests and assign seating.',
  },
];

export const homeFaqs = [
  {
    q: 'How fast can my page go live?',
    a: 'Basic and Standard are delivered in 2–4 working days, Premium in 4–6. The period starts the next working day after we receive payment and your Asset Freeze. We recommend booking at least 7 calendar days before the event (14 for Premium), later bookings are welcome, but same-day delivery is not guaranteed.',
  },
  {
    q: 'What exactly counts as a revision?',
    a: 'Small changes: typographical corrections, text updates and asset swaps inside the chosen layout. Two rounds are included; a referred client gets a third round on their first order. Revisions must be consolidated and sent within 48 hours of receiving the preview link. A change of core palette, theme or page structure is a Re-Layout at ₱500.',
  },
  {
    q: 'Can I cancel or get a refund?',
    a: 'Yes, before the preview link is sent, the package fee is refunded. After the preview link is sent, fees are non-refundable except where Aetheria Events fails to deliver the service as described. Rush fees are refunded if we miss the approved rush deadline.',
  },
  {
    q: 'Where does guest information go?',
    a: 'Guests’ names, email addresses, RSVP status and party size are collected only for your event. The page and dashboard lock six days after the event, records move to a restricted archive for 30 days, and are permanently deleted on day 36. You can download the guest list during the active window.',
  },
  {
    q: 'Whose logo is on the page?',
    a: 'A discreet “Powered by Aetheria” footer appears on every package. Your own branding, palette and typography lead the design, our mark stays out of the way.',
  },
];

export const event = {
  slug: 'invitation',
  kicker: 'Together with their families',
  bride: 'Ben',
  groom: 'Za',
  monogram: 'B&Z',
  dateLabel: '14 February 2027',
  dateShort: '14 · 02 · 2027',
  isoDate: '2027-02-14T16:00:00+08:00',
  rsvpDeadline: '1 February 2027',
  venue: 'Casa Lumen · Makati',
  venueAddress: 'Paseo de Roxas, Makati City, Metro Manila',
  dressCode: 'Black tie, in shades of midnight blue',
  type: 'The Wedding',
  schedule: [
    { time: '4:00 PM', title: 'Ceremony', body: 'The garden aisle, please be seated by 3:45 PM.' },
    { time: '6:00 PM', title: 'Cocktails', body: 'Champagne and strings on the terrace.' },
    { time: '7:00 PM', title: 'Dinner & toasts', body: 'A five-course table, long and candlelit.' },
    { time: '9:00 PM', title: 'Dancing', body: 'Until the candles burn out.' },
  ],
  privacyNote:
    'We collect only your name, email address, RSVP status and number of guests so the couple can prepare your seat. No health, government ID or financial information is requested. Records are deleted 36 days after the event.',
};

export const budgets = [
  { label: 'Under ₱1,500', value: 'under-1500' },
  { label: '₱1,500 – ₱2,500', value: '1500-2500' },
  { label: '₱2,500 – ₱4,000', value: '2500-4000' },
  { label: 'Flexible', value: 'flexible' },
];

export const eventTypes = [
  'Wedding',
  'Debut',
  'Birthday / Milestone',
  'Corporate gathering',
  'Reunion',
  'Private dinner',
  'Something else',
];
