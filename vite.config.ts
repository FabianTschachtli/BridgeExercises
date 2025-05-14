import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
  }
} as UserConfig)
