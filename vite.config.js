import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server is exposed through a proxied preview host, so it must bind
// to 0.0.0.0 and accept requests for that host.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    allowedHosts: true,
  },
});
