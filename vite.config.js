import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

const base = process.env.NODE_ENV === 'production' ? '/coffeeshop/' : '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@app-admin': path.resolve(__dirname, './src/admin'),
      '@app-assets': path.resolve(__dirname, './src/assets'),
      '@app-components': path.resolve(__dirname, './src/components'),
      '@app-utils': path.resolve(__dirname, './src/utils'),
      '@app-views': path.resolve(__dirname, './src/views'),
      '@app-services': path.resolve(__dirname, './src/services'),
      '@app-store': path.resolve(__dirname, './src/store'),
    },
  },
})
