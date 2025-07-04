import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base:'/Vuerdle/',
  plugins: [vue(), vueDevTools()],
  css: {
    postcss: {
      plugins: [
        require("postcss-nesting"),
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },

  },
});
