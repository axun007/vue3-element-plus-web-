import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue()],
    server: {
      host: "0.0.0.0",
      cors: true,
      open: false,
      proxy: {
        '/api': {
          target: 'http://192.168.3.49:8910',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // i18n 警告
    resolve: {     
      alias: {
         'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    }
  }
})