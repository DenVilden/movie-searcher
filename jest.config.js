module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!pages/_*.tsx',
    '!**/*.d.ts',
    '!pages/api/*.ts',
    '!apollo/*.ts',
    '!graphql/types/*.ts',
    '!components/**/index.ts',
  ],
};
