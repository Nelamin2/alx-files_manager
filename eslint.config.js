export default [
  {
    ignores: ['node_modules/'],
  },
  {
    files: ['**/*.js'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
    languageOptions: {
      ecmaVersion: 'latest',
    },
  },
];
