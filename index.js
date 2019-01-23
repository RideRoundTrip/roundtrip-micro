const Config = require('./lib/config');

const Server = require('./lib/server');
const Environment = require('./lib/environment');
const Token = require('./lib/token');

module.exports.Config = Config;
module.exports.Server = Server;

module.exports.Environment = new Environment;
module.exports.Token = new Token;