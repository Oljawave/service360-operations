import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/dtj/service/auth': {
        target: 'http://192.168.1.20:9180',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/dtj/service/', ''),
      },
      
      '/dtj/service/userapi': {
        target: 'http://192.168.1.20:9180/api',
        changeOrigin: true,
        rewrite: (path) => path.replace('/dtj/service/userapi', ''),
        secure: false,
      },
      
      '/dtj/service/userinfo': {
        target: 'http://192.168.1.20:9179/api',
        changeOrigin: true,
        rewrite: (path) => path.replace('/dtj/service/userinfo', ''),
        secure: false,
      },
    },
  },
});