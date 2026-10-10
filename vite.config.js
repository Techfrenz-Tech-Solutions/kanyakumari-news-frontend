import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The dev proxy target is only needed when running `vite` (dev server).
// Production builds (`vite build`) never use the proxy, so the variable
// is intentionally optional — Jenkins CI and Netlify builds don't need it.
const devProxyTarget = process.env.VITE_DEV_API_PROXY_TARGET

const devProxy = devProxyTarget
  ? {
      target: devProxyTarget,
      changeOrigin: true,
      configure(proxy) {
        proxy.on('proxyReq', (proxyReq) => {
          proxyReq.setHeader('Origin', devProxyTarget)
        })
      },
    }
  : null

export default defineConfig(({ command }) => {
  // Warn (don't throw) if someone starts the dev server without the proxy target
  if (command === 'serve' && !devProxyTarget) {
    console.warn(
      '\n[vite.config.js] WARNING: VITE_DEV_API_PROXY_TARGET is not set.\n' +
      'API calls in dev will hit /api on localhost and will fail unless the\n' +
      'backend is already running on the same origin.\n' +
      'Set VITE_DEV_API_PROXY_TARGET in your .env file to enable the proxy.\n'
    )
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      open: false,
      host: true,
      proxy: devProxy
        ? { '/api': devProxy, '/uploads': devProxy }
        : {},
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
  }
})
