import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // use port 3000 — less likely to conflict than 5173
    strictPort: false, // if 3000 is taken, move to 3001 automatically
    open: true,        // automatically open the browser when you run npm run dev
    host: true,        // expose on local network (useful for testing on phone/tablet)
  },
  preview: {
    port: 4173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
})
