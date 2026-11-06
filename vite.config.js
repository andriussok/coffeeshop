
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const base = process.env.NODE_ENV === 'production' ? '/coffeeshop/' : '/'

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src/'),
      '@app-admin': path.resolve(import.meta.dirname, './src/admin'),
      '@app-assets': path.resolve(import.meta.dirname, './src/assets'),
      '@app-components': path.resolve(import.meta.dirname, './src/components'),
      '@app-utils': path.resolve(import.meta.dirname, './src/utils'),
      '@app-views': path.resolve(import.meta.dirname, './src/views'),
      '@app-services': path.resolve(import.meta.dirname, './src/services'),
      '@app-store': path.resolve(import.meta.dirname, './src/store'),
    },
  },
})
