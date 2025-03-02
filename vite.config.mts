import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import license from 'rollup-plugin-license'
import path from 'node:path'


export default defineConfig(() => ({
  root: './',
  base: './',
  publicDir: 'docs',
  envDir: './',
  plugins: [
    license({
      sourcemap: true,

      banner: {
        commentStyle: 'ignored',
        content: {
          file: path.join(__dirname, 'LICENSE'),
        },
      },

      thirdParty: {
        includeSelf: true,
        multipleVersions: true,
        output: [
          {
            file: path.join(__dirname, 'dist/cjs', 'license.txt'),
          },
          {
            file: path.join(__dirname, 'dist/esm', 'license.txt'),
          },
          {
            file: path.join(__dirname, 'dist/umd', 'license.txt'),
          },
        ],
      },
    }),
    dts({
      // include: 'src/**/*.ts',
      exclude: [
        'src/demo.ts',
        'docs/**',
      ],
      outDir: [
        'dist/cjs',
        'dist/esm',
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    copyPublicDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'KanaCapture',
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: [
        { format: 'cjs', dir: 'dist/cjs', preserveModules: true, exports: 'named' },
        { format: 'es', dir: 'dist/esm', preserveModules: true, exports: 'named' },
        { format: 'umd', dir: 'dist/umd', name: 'KanaCapture' },
      ],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
}))
