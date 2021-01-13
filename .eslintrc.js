module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/indent': ['error', 2],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  root: true,
};
