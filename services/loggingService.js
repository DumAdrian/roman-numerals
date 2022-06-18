const winston = require('winston');

const LOGGING_LEVEL = 'info';

const format = winston.format;

const loggingService = winston.createLogger({
    level: LOGGING_LEVEL,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.simple()
            )
        })
    ]
});

module.exports = loggingService;