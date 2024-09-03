module.exports = [
  {
    ignores: ['node_modules/'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];

