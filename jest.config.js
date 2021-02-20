module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!pages/_*.tsx',
    '!**/*.d.ts',
    '!pages/api/*.ts',
    '!apollo/index.ts',
    '!components/**/index.ts',
    '!__generated__/*.ts',
  ],
};
