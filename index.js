const Config = require('./lib/config');
const {logger} = require('./lib/logging');
const Server = require('./lib/server');
const Environment = require('./lib/environment');
const Token = require('./lib/token');
const exceptions = require('./lib/exceptions');
const middlewares = require('./lib/middlewares');

module.exports.Config = Config;
module.exports.logger = logger;
module.exports.Server = new Server;
module.exports.Environment = new Environment;
module.exports.Token = new Token;
module.exports.exceptions = exceptions;
module.exports.middlewares = middlewares;
