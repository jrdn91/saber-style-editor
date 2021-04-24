module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "json"],
  moduleDirectories: ["node_modules"],

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^dialogs(.*)$": "<rootDir>/src/dialogs$1",
    "^actions(.*)$": "<rootDir>/src/actions$1",
    "^reducers(.*)$": "<rootDir>/src/reducers$1",
    "^routes(.*)$": "<rootDir>/src/routes$1",
    "^store(.*)$": "<rootDir>/src/store$1",
    "^types(.*)$": "<rootDir>/src/types$1"
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [
    "<rootDir>/config/setupTest.js",
    "<rootDir>/config/registerContext.js"
  ],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "<rootDir>/scripts"],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost:3001",

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  // Indicates whether each individual test should be reported during the run
  verbose: false
}
