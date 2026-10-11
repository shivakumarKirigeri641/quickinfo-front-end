import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/* In development the page calls its own origin under /api and Vite forwards the
   call to quickinfo-back-end, so CORS never gets in the way on localhost, a
   phone on the same Wi-Fi or a tunnel. A built site calls VITE_API_BASE directly. */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5180,
      strictPort: true,
      host: true,
      proxy: {
        '/api': { target: env.VITE_PROXY_TARGET || 'http://localhost:7788', changeOrigin: false, xfwd: true },
      },
    },
    preview: { port: 4180, strictPort: true },
    build: { outDir: 'dist', sourcemap: false },
  };
});
