// import { defineConfig } from "eslint/config";
// import typescriptEslint from "@typescript-eslint/eslint-plugin";
// import react from "eslint-plugin-react";
// import unusedImports from "eslint-plugin-unused-imports";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// });

// export default defineConfig([
//   {
//     extends: compat.extends(
//       "next",
//       "next/core-web-vitals",
//       "eslint:recommended",
//       "plugin:@typescript-eslint/recommended"
//     ),

//     plugins: {
//       "@typescript-eslint": typescriptEslint,
//       react,
//       "unused-imports": unusedImports,
//     },

//     rules: {
//       "unused-imports/no-unused-imports": "error",
//       "no-unused-vars": "off",
//       "@typescript-eslint/no-unused-vars": "error",
//       "@typescript-eslint/no-explicit-any": "off",
//       "react/react-in-jsx-scope": "off",
//       "react/no-unescaped-entities": "off",
//       "@next/next/no-page-custom-font": "off",
//     },
//   },
// ]);
import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react: react,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": "error", // Added missing rule
      "react-hooks/exhaustive-deps": "warn", // Added missing rule
      "@next/next/no-img-element": "off", // Disabling since the rule definition wasn't found
      "@next/next/no-page-custom-font": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
