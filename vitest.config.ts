/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    include: ['**/*.test.tsx', '**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'node_modules',
        'dist',
        'types',
        '**/config.*',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.types.*',
        '**/consts.*',
        '**/*.test.tsx',
        '**/*.test.ts',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/index.tsx',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
