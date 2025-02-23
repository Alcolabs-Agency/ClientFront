import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1) Redirige /archive-invoice => http://127.0.0.1:5000/archive-invoice
      '/archive-invoice': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      
      '/process-document': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },

      '/save-document-changes': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },

      '/get-orders': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },
    },
  },
  define: {
    'process.env': {},
  },
});
