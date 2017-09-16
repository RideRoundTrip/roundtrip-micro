const Server = require('./lib/server');
const Environment = require('./lib/environment');
const Token = require('./lib/token');

module.exports.Server = new Server;
module.exports.Environment = new Environment;
module.exports.Token = Token;