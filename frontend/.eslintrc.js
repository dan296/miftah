module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for parsing modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json', // Path to your tsconfig.json file
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  plugins: [
    '@typescript-eslint', // Adds TypeScript rules
    'react',
    'react-native',
    'import',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
  rules: {
    // Enable the rule for detecting unused variables and imports
    'no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: true},
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: true},
    ],
  },
};
