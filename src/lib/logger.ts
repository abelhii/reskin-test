type LogLevel = "info" | "debug" | "warn" | "error";

/**
 * log wrapper so that it can be extended with a proper logging solution in the future
 */
const log = (level: LogLevel, ...args: unknown[]) => {
  switch (level) {
    case "info":
      console.info(...args);
      break;
    case "debug":
      console.debug(...args);
      break;
    case "warn":
      console.warn(...args);
      break;
    case "error":
      console.error(...args);
      break;
  }
};

export const logger: Record<LogLevel, (...args: unknown[]) => void> = {
  info: (...args: unknown[]) => log("info", args),
  debug: (...args: unknown[]) => log("debug", args),
  warn: (...args: unknown[]) => log("warn", args),
  error: (...args: unknown[]) => log("error", args),
};
