module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  'parserOptions': {
    'ecmaVersion': 12,
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'spaced-comment': ['error', 'always'],
    'block-spacing': 'error',
    'brace-style': 'warn',
    'space-before-blocks': 'error',
    'arrow-spacing': 'error',
    'keyword-spacing': [
      'error',
      {
        'before': true,
        'after': true 
      }
    ],
    'switch-colon-spacing': [
      'error',
      {
        before: true,
        after: true 
      }
    ],
    'no-multi-spaces': 'error',
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-unary-ops': 'error',
    'computed-property-spacing': ['error', 'never'],
    'semi-spacing': [
      'error',
      {
        before: false, 
        after: true 
      }
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true 
      }
    ],
    'comma-spacing': [
      'warn',
      {
        before: false,
        after: true
      }
    ],
    'no-whitespace-before-property': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'no-dupe-keys': 'error',
    'eqeqeq': 'warn',
    'object-curly-newline': [
      'warn',
      {
        'ObjectExpression': { 'multiline': true },
        'ObjectPattern': { 'multiline': true },
        'ImportDeclaration': 'never',
        'ExportDeclaration': {
          'multiline': true,
          'minProperties': 3 
        }
      }
    ],
    'object-property-newline': 'error',
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 3 
      }
    ],
    'array-bracket-newline': [
      'warn',
      {
        multiline: true,
        minItems: 3 
      }
    ],
    'arrow-body-style': ['warn', 'as-needed'],
    'implicit-arrow-linebreak': ['warn', 'beside'],
    'no-sparse-arrays': 'error',
    'indent': ['error', 2],
    'func-call-spacing': ['error', 'never'],
    'comma-dangle': ['warn', 'never'],
    'no-prototype-builtins': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
