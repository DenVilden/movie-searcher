module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/pages/_*.tsx",
    "!src/**/index.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/setupTests.tsx",
    "!src/lib/**/*.{ts,tsx}",
    "!src/**/*.styles.{ts,tsx}",
  ],
};
