module.exports = {
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts", "!src/mocks/*.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2532, 2722],
      },
    },
  },
};
