import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource-variable/cormorant-garamond/index.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/jost/index.css';

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/event.css';
import './styles/print.css';
import './styles/brand.css';
import './styles/round-two.css';

import App from './App.jsx';
import { ConsentProvider } from './lib/consent.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConsentProvider>
        <App />
      </ConsentProvider>
    </BrowserRouter>
  </StrictMode>,
);
