module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "@typescript-eslint/no-inferrable-types": "off",
    "curly": "error",
    "no-empty": "error",
    "@typescript-eslint/no-explicit-any": ["error", { "fixToUnknown": true }],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "semi": ["error", "always"],
    "no-trailing-spaces": ["error", { "ignoreComments": true }],
    "keyword-spacing": ["error", { "before": true }],
    "space-before-blocks": ["error", "always"],
    "space-infix-ops": ["error", { "int32Hint": false }],
    "object-curly-spacing": ["error", "always"],
    "no-multi-spaces": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "@typescript-eslint/no-non-null-assertion": "off"
  },
};
