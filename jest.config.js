// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // or 'jsdom' if you're testing a browser-like environment
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for .ts and .tsx files
    },
    transformIgnorePatterns: [
      'node_modules/(?!axios)', // This tells Jest to transform axios
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  