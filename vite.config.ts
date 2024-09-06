import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "yarte",
      entry: "./src/main.ts",
      fileName: "yarte",
    },
  },
  plugins: [svelte()],
});
