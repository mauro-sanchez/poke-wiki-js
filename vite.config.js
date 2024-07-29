import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginRequire from "vite-plugin-require";
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire()],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
});
