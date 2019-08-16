module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    "parser": "babel-eslint"
  },
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': [2, 'never'],
    'quotes': [2, 'single', { 'allowTemplateLiterals': true }],
    'no-func-assign': 2,
    'no-extra-semi': 2,
    'no-unreachable': 2,
    'no-redeclare': 2,
    'no-unused-vars': 1,
    'constructor-super': 2,
    'no-const-assign': 2,
    'space-before-function-paren': 0,
    'indent': [0, 4],
    'eol-last': 0,
    'no-trailing-spaces': 0,
    'eqeqeq': 2
  }
}