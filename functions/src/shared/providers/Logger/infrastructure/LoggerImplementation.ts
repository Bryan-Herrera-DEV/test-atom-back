import { ILogger, LogType } from "../domain/Logger";
import { consoleLoggerImp } from "../application/LoggerProvider";

export const LoggerImplementation: ILogger = {
  log: (message: string): void => {
    consoleLoggerImp(LogType.LOG, message);
  },
  info: (message: string): void => {
    consoleLoggerImp(LogType.INFO, message);
  },
  warn: (message: string): void => {
    consoleLoggerImp(LogType.WARN, message);
  },
  error: (message: string): void => {
    consoleLoggerImp(LogType.ERROR, message);
  },
};
