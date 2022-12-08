const RULES = {
  OFF: 'off',
  ON: 'on',
  ERROR: 'error',
  WARN: 'warn',
}

module.exports = {
  env: {
    'jest/globals': true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jest'],
  rules: {
    'react/prop-types': RULES.OFF,
    'react/react-in-jsx-scope': RULES.OFF,
    'react-hooks/rules-of-hooks': RULES.ERROR, // Checks rules of Hooks
    'react-hooks/exhaustive-deps': RULES.WARN, // Checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect', // Fix of Warning: React version not specified in eslint-plugin-react settings
    },
  },
}
