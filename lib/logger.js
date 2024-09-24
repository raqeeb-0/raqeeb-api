import { createLogger, format, transports } from 'winston';


const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: 'combined.log' })
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: 'error.log' })
  ],
});


export { logger, errorLogger }
