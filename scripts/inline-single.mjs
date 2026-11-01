// Folds dist-single into one portable HTML file (see README: one-file build).
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('dist-single');
const assets = path.join(dir, 'assets');
const files = fs.readdirSync(assets);
const cssFile = files.find((f) => f.endsWith('.css'));
const jsFile = files.find((f) => f.endsWith('.js'));

let html = fs.readFileSync(path.join(dir, 'index.single.html'), 'utf8');
const css = fs.readFileSync(path.join(assets, cssFile), 'utf8');
let js = fs.readFileSync(path.join(assets, jsFile), 'utf8');

// Site-plan PDF becomes a data URI so the download works offline.
const pdf = fs.readFileSync(path.resolve('public/aetheria-events-site-plan.pdf'));
const pdfUri = `data:application/pdf;base64,${pdf.toString('base64')}`;
js = js.split("/aetheria-events-site-plan.pdf").join(pdfUri);

const favicon = fs.readFileSync(path.resolve('public/favicon.svg'), 'utf8');
const faviconUri = `data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}`;

// NOTE: always use function replacers, the payloads contain `$` sequences that
// String.replace would otherwise interpret as capture references.
html = html.replace(/<link rel="stylesheet"[^>]*>/i, () => `<style>\n${css}\n</style>`);
html = html.replace(/<script type="module"[^>]*src="[^"]*"[^>]*><\/script>/i, () => `<script type="module">\n${js}\n</script>`);
html = html.replace(/<link rel="icon"[^>]*>/i, () => `<link rel="icon" type="image/svg+xml" href="${faviconUri}" />`);

const leftTags = html.match(/<script[^>]*src=|<link[^>]*stylesheet[^>]*>/gi) || [];
if (leftTags.length) throw new Error('unresolved tags: ' + leftTags.join(', '));
if (html.includes('</style>') === false || html.includes('<style>') === false) throw new Error('css not inlined');

const out = path.resolve('Aetheria-Events-website.html');
fs.writeFileSync(out, html);
console.log(JSON.stringify({ out, bytes: fs.statSync(out).size, cssFile, jsFile, pdfInlined: js.includes('data:application/pdf;base64') }));
