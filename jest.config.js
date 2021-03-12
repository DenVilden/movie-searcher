module.exports = {
  modulePaths: ['.'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!pages/api/*.ts',
    '!apollo/__generated__/*.ts',
    '!utils/types.ts',
  ],
}
