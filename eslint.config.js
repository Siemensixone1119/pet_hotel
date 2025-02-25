import { defineConfig } from 'eslint';

export default defineConfig({
  languageOptions: {
    globals: {
      browser: true,
      node: true
    }
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
});
