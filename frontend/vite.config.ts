import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-spa-404-fallback',
      closeBundle() {
        const distPath = path.resolve(__dirname, './dist')
        const indexPath = path.join(distPath, 'index.html')
        const fallbackPath = path.join(distPath, '404.html')
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, fallbackPath)
        }
      },
    },
  ],
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
