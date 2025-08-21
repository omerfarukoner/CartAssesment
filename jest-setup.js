// Essential mocks only for business logic tests

// Suppress console output in tests for cleaner test runs
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeEach(() => {
  console.error = (message, ...args) => {
    if (
      typeof message === 'string' &&
      (message.includes('An update to') ||
        message.includes('Warning: An update to') ||
        message.includes('[ERROR]')) // Filter out logger errors in tests
    ) {
      return;
    }
    originalConsoleError(message, ...args);
  };

  // Suppress DEBUG logs in tests
  console.log = (message, ...args) => {
    if (typeof message === 'string' && message.includes('[DEBUG]')) {
      return;
    }
    originalConsoleLog(message, ...args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

// Mock Toast for user feedback
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

// Mock NetInfo for API client
jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));
