module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  rules: {
    // not needed with typescript
    "react/prop-types": "off",
    // false positives with memoized arrow functions; see
    // https://github.com/yannickcr/eslint-plugin-react/issues/2105
    "react/display-name": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
