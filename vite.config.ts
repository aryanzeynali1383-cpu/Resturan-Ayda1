import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // این خط برای کارکردن صحیح در ساب‌فولدرهای گیت‌هاب ضروری است
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY) // جلوگیری از خطای process is not defined
    }
  }
})