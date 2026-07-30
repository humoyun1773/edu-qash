import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND = 'http://169.58.72.177';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api/** to the Django backend and force JSON Accept header
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        headers: { 'Accept': 'application/json' },
      },
      // Individual DRF endpoints — all with forced JSON Accept header
      '/centers': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/courses': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/auth':    { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/quizzes': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/exams':   { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/ai':      { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/certificates': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/chat':    { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/payments': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/analytics': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/reviews': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/notifications': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/users':   { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/reports': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/teachers': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
      '/students': { target: BACKEND, changeOrigin: true, headers: { 'Accept': 'application/json' } },
    },
  },
})
