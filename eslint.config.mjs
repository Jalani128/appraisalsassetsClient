import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Gradual cleanup: many TSX files use `any` in catch/API handlers
      "@typescript-eslint/no-explicit-any": "warn",
      // Prefer &apos; in copy later; noisy across marketing pages
      "react/no-unescaped-entities": "warn",
      // CMS/external URLs often need raw img; optimize per-page when stable
      "@next/next/no-img-element": "warn",
      // Async data loads in useEffect often flagged; prefer event-driven where possible
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
