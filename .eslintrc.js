module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist"],
  sourceType: "module",
  overrides: [
    // typescript
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "prefer-const": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};
