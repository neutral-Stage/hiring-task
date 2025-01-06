module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/client/"],
};
