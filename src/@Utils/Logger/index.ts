import winston from "winston";
import path from "path";

const logFilePath = path.join(__dirname, "logs");

const { combine, timestamp, json, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger instance
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logFilePath }),
  ],
});

export { logger };
