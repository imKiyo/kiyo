import { defineConfig } from 'astro/config';


export default defineConfig({
  site: 'https://imkiyo.github.io',
  integrations: [
    icon({
      include: {
        mdi: ["*"] 
      }
    })
  ],
  output: 'static',
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto' 
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['@fontsource/inter'],
    },
  }
});
