import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Backend URL must be set in .env (gitignored) as VITE_DEV_API_PROXY_TARGET.
// Never hard-code the backend IP here — this file is committed to git.
const devProxyTarget = process.env.VITE_DEV_API_PROXY_TARGET
if (!devProxyTarget) {
  throw new Error(
    '[vite.config.js] VITE_DEV_API_PROXY_TARGET is not set.\n' +
    'Copy .env.example to .env and set the backend URL there.\n' +
    'Example: VITE_DEV_API_PROXY_TARGET=http://127.0.0.1:3001'
  )
}
const devProxy = {
  target: devProxyTarget,
  changeOrigin: true,
  configure(proxy) {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('Origin', devProxyTarget)
    })
  },
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // use port 3000 — less likely to conflict than 5173
    strictPort: true,  // keep the configured URL stable for backend CORS
    open: false,
    host: true,        // expose on local network (useful for testing on phone/tablet)
    proxy: {
      '/api': devProxy,
      '/uploads': devProxy,
    },
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
