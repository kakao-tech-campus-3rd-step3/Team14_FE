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
    'airbnb',
    'airbnb-typescript',
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
  },
  ignorePatterns: ['dist', 'build', 'node_modules'],
};
