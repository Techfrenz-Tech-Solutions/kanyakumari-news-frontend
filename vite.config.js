import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // use port 3000 — less likely to conflict than 5173
    strictPort: true,  // keep the configured URL stable for backend CORS
    open: false,
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
