module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-toast-message|react-native-mmkv|@react-navigation)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Test file patterns - focus on business logic
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],

  // Coverage configuration - only tested files
  collectCoverageFrom: [
    'src/hooks/useApi.ts',
    'src/services/productService.ts',
    'src/context/CartContext.tsx',
    'src/utils/priceHelpers.ts',
  ],

  coverageReporters: ['text', 'lcov'],
  coverageDirectory: 'coverage',

  // Realistic coverage thresholds for case study
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Test environment
  testEnvironment: 'node',

  // Clear mocks between tests
  clearMocks: true,

  // Suppress console warnings in tests
  silent: false,
};
