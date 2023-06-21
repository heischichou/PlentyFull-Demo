module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  bail: true,
  verbose: true,
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.{ts|tsx}?$": [
      "ts-jest",
      {
        babel: true,
        isolatedModules: true,
        tsConfig: "tsconfig.json",
      },
    ],
  },
  setupFiles: ["jest-canvas-mock"],
  moduleFileExtensions: ["ts", "js", "vue"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/styleMock.ts",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/components/**/*.{ts,vue}',
  //   "./tests/unit/**/*.{js,jsx,ts,tsx,vue}",
  //   "!./tests/unit/**/_*.{js,jsx,ts,tsx,vue}",
  // ],
  coverageReporters: ["text"],
  testMatch: ["<rootDir>/tests/unit/**/*.spec.ts"],
};
