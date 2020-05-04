module.exports = {
  root: true,
  extends: [
    "standard-with-typescript",
    'prettier/@typescript-eslint',
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint']
};
