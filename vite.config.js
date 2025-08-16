import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  base: './',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  preview: {
    port: 4173,
    open: true
  }
})
