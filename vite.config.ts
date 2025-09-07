import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kb to suppress warning
  },
})
