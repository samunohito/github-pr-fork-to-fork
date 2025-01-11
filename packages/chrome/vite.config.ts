import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    assetsDir: 'assets',
    outDir: '../dist',
    rollupOptions: {
      input: './src/index.ts',
      output: {
        manualChunks: undefined,
      },
    },
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: 'index',
    }
  },
  plugins: [
    copy({
      targets: [
        { src: 'assets/**/*', dest: 'dist' },
      ],
      verbose: true,
    }),
  ],
})