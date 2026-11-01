import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages serves this repo as a project site at /Aetheria/, not at the
 * domain root, so every asset URL needs that prefix. The prefix is derived
 * from the repository name GitHub hands to Actions, which keeps the config
 * correct without hard-coding the owner. Local dev and Netlify stay at '/'.
 */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserSite = repo.toLowerCase().endsWith('.github.io');
const base = process.env.GITHUB_ACTIONS && repo && !isUserSite ? `/${repo}/` : '/';

export default defineConfig({
  plugins: [react()],
  base,
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
