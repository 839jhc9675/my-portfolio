import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 프로젝트 사이트는 /my-portfolio/ 하위 경로로 서비스됨
  base: '/my-portfolio/',
})
