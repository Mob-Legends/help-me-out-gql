import { createLogger, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

export default logger;
