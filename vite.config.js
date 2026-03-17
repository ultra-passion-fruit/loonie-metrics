import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      // When you fetch('/api/...'), Vite redirects it to StatsCan
      '/api': {
        target: 'https://www150.statcan.gc.ca',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})