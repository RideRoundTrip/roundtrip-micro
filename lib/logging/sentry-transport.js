const TransportStream = require('winston-transport');
const Sentry = require('@sentry/node');

const config = require('../config');


module.exports = class SentryTransport extends TransportStream {

  constructor(dsn, options = {}) {
    options.level = options.level || 'error';
    super(options);

    this.name = options.name || 'SentryTransport';
    this.Sentry = Sentry;
    this.Sentry.init({
      dsn: dsn,
      debug: true,
      environment: config.environment,
      release: process.env.npm_package_version
    });
    this.Sentry.configureScope(scope => {
      scope.setTag('nodeVersion', process.version);
    })
  }

  log({message, metadata, ...extra}, callback) {
    setImmediate(() => this.emit('logged', {message, metadata, ...extra}));
    let error = extra['error'] || metadata['error'] || metadata['originalError'];

    if (error && error instanceof Error) {
      delete extra['error'];
      delete metadata['error'];
      delete metadata['originalError'];
    } else {
      error = new Error(message);
      error.stack = metadata['stack'];
    }
    delete metadata['stack'];
    delete metadata['request'];

    this.Sentry.configureScope(scope => {
      Object.keys(extra).forEach((key) => {
        scope.setExtra(key, extra[key]);
      });
      if (metadata.hasOwnProperty('response')) {
        const response = metadata['response'];
        delete response['request'];
        delete response['config'];
        Object.keys(response).forEach((key) => {
          scope.setExtra(key, response[key]);
        });
        delete metadata['response'];
      }
      Object.keys(metadata).forEach((key) => {
        scope.setExtra(key, metadata[key]);
      });
      this.Sentry.captureException(error);
    });
    return callback();
  }
};
