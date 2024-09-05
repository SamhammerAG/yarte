import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: 'webcomponent',
      entry: 'src/main.ts',
      formats: ['iife'],
      fileName: "swc"
    }
  },
  plugins: [svelte()],
});
