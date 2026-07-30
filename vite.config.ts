import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/centers': { target: 'http://169.58.72.177', changeOrigin: true },
      '/courses': { target: 'http://169.58.72.177', changeOrigin: true },
      '/auth': { target: 'http://169.58.72.177', changeOrigin: true },
      '/quizzes': { target: 'http://169.58.72.177', changeOrigin: true },
      '/exams': { target: 'http://169.58.72.177', changeOrigin: true },
      '/ai': { target: 'http://169.58.72.177', changeOrigin: true },
      '/certificates': { target: 'http://169.58.72.177', changeOrigin: true },
      '/chat': { target: 'http://169.58.72.177', changeOrigin: true },
      '/payments': { target: 'http://169.58.72.177', changeOrigin: true },
      '/analytics': { target: 'http://169.58.72.177', changeOrigin: true },
      '/reviews': { target: 'http://169.58.72.177', changeOrigin: true },
      '/notifications': { target: 'http://169.58.72.177', changeOrigin: true },
    },
  },
})
// Reload trigger

