module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!pages/_*.tsx',
    '!**/index.{ts,tsx}',
    '!**/*.d.ts',
    '!graphql/schema.ts',
    '!pages/api/*.ts',
    '!apollo/*.ts',
  ],
};
