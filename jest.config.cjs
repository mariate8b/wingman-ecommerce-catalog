module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Transforms both TypeScript and JavaScript
  },
  transformIgnorePatterns: [
    'node_modules/(?!your-esm-package)'  // If you use any ES Module-only packages
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Handle TypeScript files as ESM
  moduleNameMapper: {
    // If you need to mock non-JS files like images or styles, you can add them here
    '\\.css$': 'identity-obj-proxy', 
    '\\.svg$': 'jest-svg-transformer',
  },
};
