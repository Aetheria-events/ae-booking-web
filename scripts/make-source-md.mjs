// Writes aetheria-complete-source.md at the repo root: every tracked source
// file in one readable document.
//
//   npm run build:md
//
// Why this lives in the repo: the Drive backup is three files, and this is the
// readable one. Keeping the generator here means anybody can reproduce it,
// including whoever takes the project over, and the file set can never drift
// from what git actually tracks.
//
// The list comes from `git ls-files`, so build output, node_modules and
// anything gitignored cannot leak in. package-lock.json is skipped on purpose:
// it is machine-written, enormous, and nobody reads it. It still ships in the
// zip, where it matters for reproducible installs.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const OUT = 'aetheria-complete-source.md';
const SKIP = new Set(['package-lock.json']);

// Fence language per extension. Anything unmapped stays a plain fence.
const LANGUAGE = {
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.md': 'md',
  '.js': 'js',
  '.mjs': 'js',
  '.jsx': 'jsx',
  '.css': 'css',
  '.html': 'html',
  '.json': 'json',
  '.gs': 'javascript',
  '.toml': 'toml',
  '.svg': 'xml',
  '.xml': 'xml',
};

const BINARY = new Set([
  '.webp', '.png', '.jpg', '.jpeg', '.gif', '.ico',
  '.pdf', '.woff', '.woff2', '.ttf', '.otf',
]);

function trackedFiles() {
  const out = execFileSync('git', ['ls-files'], { encoding: 'utf8' });
  return out.split('\n').filter(Boolean).filter((file) => !SKIP.has(file)).sort();
}

// A file is binary if its extension says so, or if a NUL byte turns up early.
function isBinary(buffer, ext) {
  if (BINARY.has(ext)) return true;
  return buffer.subarray(0, 8000).includes(0);
}

// Fences grow when the content itself contains backticks, so a README full of
// code blocks cannot break the document it is quoted in.
function fenceFor(text) {
  const longest = (text.match(/`+/g) || []).reduce((most, run) => Math.max(most, run.length), 0);
  return '`'.repeat(Math.max(3, longest + 1));
}

function bytes(n) {
  return n.toLocaleString('en-US');
}

function section(file) {
  const buffer = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();

  if (isBinary(buffer, ext)) {
    return `## \`${file}\`\n\nBinary file, ${bytes(buffer.length)} bytes. It ships in \`aetheria-events.zip\`; there is nothing to read here.`;
  }

  const text = buffer.toString('utf8').replace(/\s+$/, '');
  const fence = fenceFor(text);
  const language = LANGUAGE[ext] ?? '';
  return `## \`${file}\`\n\n${fence}${language}\n${text}\n${fence}`;
}

const files = trackedFiles();
const today = new Date().toISOString().slice(0, 10);

const header = `# Aetheria Events complete website source

Generated ${today} from the working project. Every file below lives in the zip beside this document.

Stack: Vite + React + React Router, plain CSS, Inter only. Build with \`npm ci && npm run build\`;
\`npm run build:single\` plus \`node scripts/inline-single.mjs\` produces the one-file version.

Live today: https://tapasul.github.io/Aetheria/
Headed for: https://book.aetheriaevents.com

Regenerate this document with \`npm run build:md\`. Start with \`HANDOVER.md\` if you are picking the project up.

Contents:

${files.map((file) => `- \`${file}\``).join('\n')}`;

const document = `${header}\n\n---\n\n${files.map(section).join('\n\n---\n\n')}\n`;

fs.writeFileSync(path.resolve(OUT), document, 'utf8');
console.log(`make-source-md: ${files.length} files, ${bytes(Buffer.byteLength(document))} bytes → ${OUT}`);
