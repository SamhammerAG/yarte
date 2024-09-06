import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "yarte",
      entry: "./src/main.ts",
      formats: ["iife"],
      fileName: "yarte",
    },
  },
  plugins: [svelte()],
});
