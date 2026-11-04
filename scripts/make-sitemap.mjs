// Writes dist/sitemap.xml and dist/robots.txt after `npm run build`.
//
// The public origin is read from SITE_URL so the same source can serve two
// hosts without edits:
//
//   book.aetheriaevents.com      the domain this site is headed for (default)
//   https://aetheria-events.github.io/ae-booking-web   the Pages mirror, set in deploy.yml
//
// SITE_URL is the origin *plus* any path prefix, with no trailing slash, so the
// GitHub Pages copy can point at /ae-booking-web/ without the script guessing.
import fs from 'node:fs';
import path from 'node:path';

const origin = (process.env.SITE_URL || 'https://book.aetheriaevents.com').replace(/\/+$/, '');

if (!/^https?:\/\/[^/\s]+(\/[^/\s]+)*$/.test(origin)) {
  console.error(`make-sitemap: SITE_URL is not a plain origin plus path: ${origin}`);
  process.exit(1);
}

// Every route the router actually serves. /site-plan is left out on purpose:
// it is a redirect to /site-map, and a sitemap should only list final URLs.
const routes = [
  { path: '/', priority: '1.0' },
  { path: '/packages', priority: '0.9' },
  { path: '/booking', priority: '0.9' },
  { path: '/invitation', priority: '0.7' },
  { path: '/about', priority: '0.7' },
  { path: '/privacy', priority: '0.4' },
  { path: '/terms', priority: '0.4' },
  { path: '/site-map', priority: '0.5' },
];

// dist/ by default; the argument lets a test build write somewhere else.
const out = path.resolve(process.argv[2] || 'dist');
if (!fs.existsSync(out)) {
  console.error('make-sitemap: dist/ is missing, run the build first');
  process.exit(1);
}

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    ({ path: route, priority }) =>
      `  <url>\n` +
      `    <loc>${origin}${route}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

// robots.txt is only honoured at a domain root. On GitHub Pages it lands under
// /ae-booking-web/ and is ignored, which is why the Pages build sets SITE_URL to the
// full project path: the Sitemap line stays truthful wherever it is read.
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(out, 'robots.txt'), robots, 'utf8');

console.log(`make-sitemap: ${routes.length} routes for ${origin}`);
