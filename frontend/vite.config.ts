import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/robots.txt': { target: process.env.DEV_API_TARGET || 'http://127.0.0.1:5010', changeOrigin: true },
      '/sitemap.xml': { target: process.env.DEV_API_TARGET || 'http://127.0.0.1:5010', changeOrigin: true },
      '/api': {
        target: process.env.DEV_API_TARGET || 'http://127.0.0.1:5010',
        changeOrigin: true,
      },
    },
  }
})
