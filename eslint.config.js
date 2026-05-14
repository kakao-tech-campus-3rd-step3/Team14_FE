import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['scripts/**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/extensions': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      '@typescript-eslint/no-wrapper-object-types': 'error',
    },
    settings: {
      'import/resolver': { typescript: {} },
      react: { version: 'detect' },
    },
  },
  // 테스트 환경 설정
  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/setupTests.ts',
      '**/__snapshots__/**/*.snap',
    ],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: vitest.environments.env.globals,
      ecmaVersion: 2015,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      // 스냅샷 크기 제한
      // 처음에는 warn으로 설정하고 적응하면 나중에 error로 변경하겠습니다.
      'vitest/no-large-snapshots': ['warn', { maxSize: 80, inlineMaxSize: 20 }],
      // exports 미정의 오류 무시
      'no-undef': 'off',
    },
  },
  // 무시 파일 설정
  {
    ignores: ['dist', 'build', 'node_modules', 'public', 'coverage', 'eslint.config.js'],
  },
];
