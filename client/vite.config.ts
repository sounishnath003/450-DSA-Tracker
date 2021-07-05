import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    cors: true,
    proxy: {
      "/api": "https://dsa-450-backend.herokuapp.com/",
    },
  },
  build: {
    outDir: "build",
  },
});