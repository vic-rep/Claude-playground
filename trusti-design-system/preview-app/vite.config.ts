import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@trusti/design-system': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
