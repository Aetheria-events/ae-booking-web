/** Small file generators: vCard, calendar files and plain-text summaries. */

export function downloadBlob(filename, content, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadVCard({
  firstName = '',
  lastName = '',
  fullName,
  org = 'Aetheria Events',
  title = '',
  email = '',
  phone = '',
  address = '',
  url = '',
  note = '',
} = {}) {
  const name = fullName || [firstName, lastName].filter(Boolean).join(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${name}`,
    org && `ORG:${org}`,
    title && `TITLE:${title}`,
    phone && `TEL;TYPE=CELL:${phone}`,
    email && `EMAIL;TYPE=INTERNET:${email}`,
    address && `ADR;TYPE=WORK:;;${address.replace(/\n/g, ' ')}`,
    url && `URL:${url}`,
    note && `NOTE:${note}`,
    'END:VCARD',
  ].filter(Boolean);

  downloadBlob(`${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.vcf`, lines.join('\r\n'), 'text/vcard;charset=utf-8');
}

const pad = (n) => String(n).padStart(2, '0');

function toIcsStamp(date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

export function downloadCalendar({
  filename = 'aetheria-event.ics',
  title,
  description = '',
  location = '',
  start,
  durationHours = 6,
}) {
  const startDate = new Date(start);
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aetheria Events//Digital Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${toIcsStamp(startDate)}-aetheria@aetheriaevents.com`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(startDate)}`,
    `DTEND:${toIcsStamp(endDate)}`,
    `SUMMARY:${title}`,
    location && `LOCATION:${location.replace(/\n/g, ', ')}`,
    description && `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);

  downloadBlob(filename, lines.join('\r\n'), 'text/calendar;charset=utf-8');
}

/** Format a yyyy-mm-dd value for display, with a safe fallback. */
export function formatLongDate(value, fallback = 'Date to be confirmed') {
  if (!value) return fallback;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString('en-PH', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function bookingReference(date = new Date()) {
  const year = String(date.getFullYear()).slice(2);
  const month = pad(date.getMonth() + 1);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AE-${year}${month}-${random}`;
}

export function bookingSummaryText(booking) {
  const lines = [
    'AETHERIA EVENTS · BOOKING REQUEST',
    `Reference: ${booking.reference}`,
    `Submitted: ${new Date(booking.createdAt).toLocaleString('en-PH')}`,
    '',
    `Package: ${booking.packageName} (₱${booking.packagePrice.toLocaleString('en-PH')})`,
    `Rush service: ${booking.rushName}`,
    `Estimated total: ₱${booking.total.toLocaleString('en-PH')}`,
    '',
    `Event type: ${booking.eventType}`,
    `Event name: ${booking.eventName}`,
    `Event date: ${formatLongDate(booking.eventDate)}`,
    `Venue / city: ${booking.venue}`,
    `Estimated guests: ${booking.guests || 'Not provided'}`,
    '',
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Mobile: ${booking.phone}`,
    `Notes: ${booking.notes || 'None'}`,
    '',
    'No payment has been taken. Aetheria Events confirms capacity and sends an invoice',
    'within one working day. The delivery period starts after payment and the Asset Freeze.',
    '',
    `Privacy: ${window.location.origin}/privacy`,
  ];
  return lines.join('\n');
}
