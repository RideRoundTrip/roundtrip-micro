const {createLogger, format, transports} = require('winston');

const config = require('../config');
const SentryTransport = require('./sentry-transport');


const logFormat = ({level, message, stack, metadata}) => {
  const metaString = JSON.stringify(metadata, (key, value) => {
    if (['stack', 'request', 'error', 'originalError'].indexOf(key) < 0) {
      return value;
    }
  });

  let log = `[${level}] ${message} ${metaString}`;
  if (metadata['stack']) {
    log = `${log}\n${metadata['stack']}`;
  }
  return log;
};


const getFormat = () => {
  return format.combine(
    format.timestamp(),
    format.errors({stack: true}),
    format.metadata(),
    format.json()
  )
};

const getTransports = () => {
  const transportList = [
    new transports.Console({
      level: (config.environment === 'development') ? 'debug' : 'info',
      stderrLevels: ['error'],
      consoleWarnLevels: ['warn'],
      format: format.printf(logFormat)
    })
  ];

  if (config.logFile) {
    transportList.push(new transports.File({
      level: 'debug',
      filename: config.logFile,
      maxsize: config.logFileSize,
      zippedArchive: config.compressLogFiles
    }));
  }
  if (config.sentryDSN) {
    transportList.push(
      new SentryTransport(config.sentryDSN, {level: 'error'})
    )
  }
  return transportList;
};

module.exports.logger = createLogger({
  format: getFormat(),
  transports: getTransports(),
  exceptionHandlers: getTransports()
});
