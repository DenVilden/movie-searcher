module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!pages/_*.tsx',
    '!**/*.d.ts',
    '!pages/api/*.ts',
    '!apollo/index.ts',
    '!graphql/schema.ts',
    '!components/**/index.ts',
    '!__generated__/index.ts',
  ],
};
