const winston = require("winston");
const ecsFormat = require("@elastic/ecs-winston-format");

const logLevel = process.env.LOG_LEVEL || "info";

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "red",
  },
};

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(winston.format.splat(), ecsFormat()),
  transports: [
    new winston.transports.File({
      filename: ".logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: ".logs/debug.log",
      level: "debug",
    }),
    new winston.transports.File({
      filename: ".logs/combined.log",
      level: "",
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.splat(),
      winston.format.printf(
        (info) => `[${info.timestamp}] [${logLevel.toUpperCase()}] ${info.level}: ${info.message}`,
      ),
    ),
    level: logLevel,
  }),
);

module.exports = logger;
