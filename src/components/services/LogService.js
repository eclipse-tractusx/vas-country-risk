const LogLevel = {
  SEVERE: "SEVERE",
  ERROR: " ERROR",
  WARN: "  WARN",
  INFO: "  INFO",
  DEBUG: " DEBUG",
};

export const logtime = () => new Date().toISOString().substring(11, 19);

export const log = (level, message) =>
  console.log(`${logtime()} ${level} ${message}`);

export const info = (message) => log(LogLevel.INFO, message);
export const warn = (message) => log(LogLevel.WARN, message);
export const error = (message) => log(LogLevel.ERROR, message);

const LogService = {
  LogLevel,
  logtime,
  log,
  info,
  warn,
  error,
};

export default LogService;
