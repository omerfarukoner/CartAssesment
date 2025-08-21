export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LoggerConfig {
  level: LogLevel;
  isDevelopment: boolean;
}

const createLogger = (
  config: LoggerConfig = { level: LogLevel.DEBUG, isDevelopment: __DEV__ },
) => {
  let currentLevel = config.level;

  const shouldLog = (level: LogLevel): boolean => {
    if (!config.isDevelopment) return false;
    return currentLevel <= level;
  };

  const setLevel = (level: LogLevel): void => {
    currentLevel = level;
  };

  const debug = (message: string, ...args: any[]): void => {
    if (!shouldLog(LogLevel.DEBUG)) return;
    console.log(`[DEBUG] ${message}`, ...args);
  };

  const info = (message: string, ...args: any[]): void => {
    if (!shouldLog(LogLevel.INFO)) return;
    console.info(`[INFO] ${message}`, ...args);
  };

  const warn = (message: string, ...args: any[]): void => {
    if (!shouldLog(LogLevel.WARN)) return;
    console.warn(`[WARN] ${message}`, ...args);
  };

  const error = (message: string, ...args: any[]): void => {
    if (!shouldLog(LogLevel.ERROR)) return;
    console.error(`[ERROR] ${message}`, ...args);
  };

  return { setLevel, debug, info, warn, error };
};

export default createLogger();
