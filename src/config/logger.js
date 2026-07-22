import winston from "winston";
import "winston-daily-rotate-file";
import config from "./env.config.js";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  fatal: "magenta",
  error: "red",
  warning: "yellow",
  info: "green",
  http: "cyan",
  debug: "blue",
};

winston.addColors(colors);

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/errors-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "20m",
  maxFiles: "14d",
});

const combinedFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "info",
  maxSize: "20m",
  maxFiles: "14d",
});

const isProduction = config.NODE_ENV === "production";

const logger = winston.createLogger({
  levels,
  level: isProduction ? "info" : "debug",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),

  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
      ),
    }),

    errorFileTransport,
    combinedFileTransport,
  ],
});

export default logger;