module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error', // do not accept console.log
    'require-await': 'error', // require await in async functions
    '@typescript-eslint/no-explicit-any': 'error', // do not accept any type
    '@typescript-eslint/no-unused-vars': 'error', // do not accept unused variables
    '@typescript-eslint/explicit-function-return-type': 'error', // explicit return type for functions
  },
  ignorePatterns: ['dist'],
};
