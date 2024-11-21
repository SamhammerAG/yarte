import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      name: "yarte",
      entry: "./src/main.ts",
      fileName: "yarte",
    },
    sourcemap: true,
  },
  plugins: [svelte(), svgLoader()],
});