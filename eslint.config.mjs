import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["**/placeholders/**", "**/placeholders"],
          message: "Placeholder content must be reviewed before being moved into public data modules.",
        }],
      }],
    },
  },
  globalIgnores([
    ".next/**", "out/**", "next-env.d.ts", ".tools/**", ".npm-cache/**",
  ]),
]);
