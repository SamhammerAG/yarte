import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/index.ts", // The file must have the same name as the entry point file so that the generated type files can be assigned correctly.
      fileName: "index",
      formats: ["es"]
    },
    sourcemap: true,
  },
  plugins: [svelte(), svgLoader()],
});
