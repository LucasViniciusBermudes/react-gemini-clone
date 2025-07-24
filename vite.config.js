import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression({ algorithm: "brotliCompress" })],

  build: {
    outDir: "build",
    assetsInlineLimit: 4096,
    minify: "terser",
  },

  server: {
    port: 5173,
    proxy: {
      "/v1beta": {
        target: "https://generativelanguage.googleapis.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  envPrefix: "VITE_",
});
