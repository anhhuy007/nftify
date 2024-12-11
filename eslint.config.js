import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "tailwindcss"],
  rules: {
    "react/react-in-jsx-scope": "off", // Not needed in Vite/Next.js
    "tailwindcss/no-custom-classname": "off", // Optional: Allow custom class names
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/prop-types": "off", // Disable prop-types as we use TypeScript
    "react/jsx-props-no-spreading": "off", // Allow prop spreading
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
