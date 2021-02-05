module.exports = {
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts", "!src/mocks/*.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};
