import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = GitHub repo adı. Repo adın "portfolio" ise '/portfolio/' kalsın.
// Eğer repo adı KULLANICI_ADIN.github.io ise base: '/' yap.
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
