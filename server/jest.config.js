module.exports = {
  collectCoverageFrom: ['src/**/*.ts', '!src/graphql/schema.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
