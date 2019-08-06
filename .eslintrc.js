module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    window: true,
    define: true,
    require: true,
    module: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      es6: true,
    },
    sourceType: 'module',
  },
  plugins: ['babel', 'import', 'react'],
  rules: {
    'react/prop-types': ['warn'],
    'no-console': ['warn'],
    'no-fallthrough': ['warn'],
    'no-unused-vars': ['warn'],
    'global-require': ['warn'],
    'import/no-commonjs': ['warn'],
    'no-debugger': ['warn'],
  },
};
