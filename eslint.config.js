import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', 'storybook-static/', 'coverage/', 'examples/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    settings: { react: { version: 'detect' } },
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      // Prop shapes live in *.types.ts as TypeScript — runtime prop-types are redundant.
      'react/prop-types': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['**/*.{cjs,mjs,js}', 'scripts/**', 'tests/**', '*.config.*', '.storybook/**'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  prettier,
);
