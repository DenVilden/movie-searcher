module.exports = {
  modulePaths: ['.'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!pages/api/*.ts',
    '!apollo/*.ts',
    '!__generated__/*.ts',
  ],
};
