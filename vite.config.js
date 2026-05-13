import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/-/', // ใส่ชื่อ Repository ของคุณ (ในที่นี้คือ -)
})
