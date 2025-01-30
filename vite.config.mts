import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  base: './',
  publicDir: 'docs',
  envDir: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    lib: {
      entry: ['src/observer.ts'],
      formats: ['es', 'cjs', 'umd'],
      fileName: '[format]/[name]',
      name: 'KanaCapture',
    },
    rollupOptions: {
      output: [
        { format: 'cjs', preserveModules: true, exports: 'named' },
        { format: 'es', preserveModules: true, exports: 'named' },
        { format: 'umd', name: 'KanaCapture' },
      ],
    },
  },
})
