module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
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
