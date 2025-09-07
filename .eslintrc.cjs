module.exports = {
  overrides: [
    {
      files: [
        'vite.config.ts',
        'vite.config.*.ts',
        'tailwind.config.{js,ts,cjs,mjs}',
        'postcss.config.{js,ts,cjs,mjs}',
        '**/*.config.{js,ts,cjs,mjs}',
        '**/*.config.*.{js,ts,cjs,mjs}',
      ],
      env: { node: true },
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  settings: {
    'import/resolver': { typescript: {} },
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    // TypeScript 환경에서는 defaultProps 없이 optional props를 허용
    'react/require-default-props': 'off',
    // arrow function 허용
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
  },
  ignorePatterns: ['dist', 'build', 'node_modules'],
};
