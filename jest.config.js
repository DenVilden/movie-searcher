module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!pages/_*.tsx',
    '!**/*.d.ts',
    '!graphql/schema.ts',
    '!pages/api/*.ts',
    '!apollo/*.ts',
    '!graphql/types.ts',
    '!**/index.ts',
  ],
};
