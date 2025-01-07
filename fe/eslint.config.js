import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist'], // Ignore build folder
  },
  {
    files: ['**/*.{ts,tsx}'], // Apply to TypeScript and JSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser, // Use the correct TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
        sourceType: 'module', // Support ES Modules
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules, // TypeScript recommended rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...tanstackQuery.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect', // Detect React version
      },
    },
  },
];
