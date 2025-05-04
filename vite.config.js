// vite.config.js
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

const isLib = process.env.BUILD_LIB === 'true';

export default defineConfig({

plugins: [tailwindcss(), solidPlugin()],
root: isLib ? '.' : 'dev',
build: isLib
  ? {
      target: 'esnext',
      outDir: 'dist',
      lib: {
        entry: 'src/index.jsx',
        name: 'NetworkSimulator',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['solid-js'],
      },
    }
  : {
      outDir: 'dist-dev',
      },
        server: {
        port: 3000,
      },
  });