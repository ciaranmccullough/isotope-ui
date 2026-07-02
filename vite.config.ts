import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
      // Bundle declarations into a single dist/index.d.ts. The multi-file output copies the
      // source's extensionless relative imports, which node16/nodenext consumers can't resolve.
      rollupTypes: true,
    }),
  ],
  build: {
    target: 'es2022',
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'isotope-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'],
      output: {
        // Interactive, ref-forwarding components are client components by nature. The banner
        // lets React Server Components (Next.js App Router) import them directly.
        banner: "'use client';",
      },
    },
  },
});
