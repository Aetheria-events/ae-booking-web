import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// One-file build: every asset (fonts included) is inlined so the result can be
// opened straight from disk. Not used by `npm run build`.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-single',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    modulePreload: false,
    rollupOptions: { input: resolve(process.cwd(), 'index.single.html') },
  },
});
