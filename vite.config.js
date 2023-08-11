import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: 'http://192.168.3.49:8910',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
})