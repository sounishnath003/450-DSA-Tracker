import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    cors: true,
    proxy: {
      "/proxy/api": {
        target: "http://localhost:3001/", // "https://dsa-450-backend.herokuapp.com/",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "build",
  },
});
