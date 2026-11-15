import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);

const SERVER_ONLY_DEPS = new Set(['express', 'tsx', 'pdf-lib']);
const pkgDeps = Object.keys(pkg.dependencies ?? {})
  .filter((d) => !SERVER_ONLY_DEPS.has(d))
  .filter((dep) => dep !== '@tiptap/pm');

const deps = new Set([
  'react',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'react-dom',
  'react-dom/client',
  'react-dom/server',
  ...pkgDeps,
]);

export default defineConfig(() => ({
  build: { target: 'esnext', sourcemap: false, reportCompressedSize: false },
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    hmr: false,
    allowedHosts: true,
  },
  optimizeDeps: {
    exclude: ['zitejs/db', 'zitejs/api', 'zitejs/auth', 'zitejs/backend', 'zitejs/upload'],
    include: [...deps],
    entries: ['index.html', 'src/**/*.{ts,tsx,js,jsx}'],
  },
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/App.tsx'),
      '@project/components': path.resolve(__dirname, '../../packages/components'),
      'zitejs/db': path.resolve(__dirname, './src/zite-compat/db.ts'),
      'zitejs/api': path.resolve(__dirname, './src/zite-compat/api.ts'),
      'zitejs/backend': path.resolve(__dirname, './src/zite-compat/backend.ts'),
      'zitejs/auth': path.resolve(__dirname, './src/zite-compat/auth.tsx'),
      'zitejs/upload': path.resolve(__dirname, './src/zite-compat/upload.ts'),
    },
  },
}));
