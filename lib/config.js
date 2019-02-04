const dotConfig = require('dotenv').config();
const fs = require('fs');
const path = require('path');


if (dotConfig.error) {
  console.error(dotConfig.error);
}

module.exports = config = dotConfig.parsed;

// If the Log file path does not exist, create it.
const mkDirSync = (logFile) => {
  const dir = path.dirname(logFile);
  const fileName = path.basename(logFile);
  try {
    fs.mkdirSync(dir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
  return `${dir}/${fileName}`;
};

// Environment
config.environment = process.env.NODE_ENV;

// Logging config
config.logFile = process.env.LOG_FILE && mkDirSync(process.env.LOG_FILE);
config.logFileSize = 5242880;   // 5mb
config.compressLogFiles = true;

// Sentry config
config.sentryDSN = process.env.SENTRY_DSN;
