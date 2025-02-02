import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: './',
  base: './',
  publicDir: 'docs',
  envDir: './',
  plugins: [
    dts({
      insertTypesEntry: true,
      // include: 'src/**/*.ts',
      exclude: [
        'src/demo.ts',
      ],
      outDir: 'types',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    lib: {
      entry: ['src/observer.ts'],
      name: 'KanaCapture',
    },
    rollupOptions: {
      output: [
        { format: 'cjs', dir: 'dist/cjs', preserveModules: true, exports: 'named' },
        { format: 'es', dir: 'dist/esm', preserveModules: true, exports: 'named' },
        { format: 'umd', dir: 'dist/umd', name: 'KanaCapture' },
      ],
    },
  },
})
