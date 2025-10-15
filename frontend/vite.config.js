import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  paths: {
    "@/*": "src/*",
  },
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:1419",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
