import chalk, { ChalkInstance } from 'chalk';
import winston from 'winston';

const levels: Record<string, ChalkInstance> = {
  error: chalk.red.bold,
  warn: chalk.yellow.bold,
  info: chalk.green.bold,
  debug: chalk.blue.bold,
};

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  const color = levels[level](level.toUpperCase());

  return `${chalk.gray(`[${timestamp}]`)} ${color}: ${chalk.cyan(`[${message}]`)}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console()
  ],
});

export default logger;
