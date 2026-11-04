import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource-variable/inter/index.css';

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/event.css';
import './styles/print.css';
import './styles/brand.css';
import './styles/round-two.css';
import './styles/aqua.css';

import App from './App.jsx';

// GitHub Pages project sites mount the app under /ae-booking-web/, so the router has
// to know that prefix. Vite's BASE_URL carries it ('./' for the one-file build,
// '/' for local dev and Netlify).
const routerBase = import.meta.env.BASE_URL.startsWith('/') ? import.meta.env.BASE_URL : '/';
import { ConsentProvider } from './lib/consent.jsx';
import { ToastProvider } from './lib/toast.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={routerBase}>
      <ConsentProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ConsentProvider>
    </BrowserRouter>
  </StrictMode>,
);
