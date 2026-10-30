import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import '@fontsource-variable/cormorant-garamond/index.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/jost/index.css';

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/event.css';
import './styles/print.css';

import App from './App.jsx';
import { ConsentProvider } from './lib/consent.jsx';

// Single-file build: same app, hash routing so it runs from file:// or any static host.
document.addEventListener(
  'click',
  (event) => {
    const anchor = event.target.closest?.('a[href^="#"]');
    if (!anchor) return;
    const hash = anchor.getAttribute('href');
    if (!hash || hash.length < 2 || hash.startsWith('#/')) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  },
  true,
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ConsentProvider>
        <App />
      </ConsentProvider>
    </HashRouter>
  </StrictMode>,
);
