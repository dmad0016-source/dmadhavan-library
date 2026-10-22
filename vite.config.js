/* eslint-env node */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  // '/' locally and on Cloudflare Pages. The GitHub Pages workflow sets
  // VITE_BASE_PATH to '/<repository-name>/' because the site lives in a subfolder.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
