const Auth = require('./auth');
const uuid = require('uuid');
const {logger} = require('./logging');

class Server {
  constructor() {
    this.micro = require('micro');
    this.server = null;
    this.port = process.env.PORT && parseInt(process.env.PORT, 10) || 3000;
  }

  serve(cb) {
    this.server = this.micro(async (req, res) => {
      const skipAuth = !!process.env.SKIP_AUTHORIZATION;
      const isAuthenticated = req.headers.authorization ?
        new Auth().check(req.headers.authorization) :
        false;

      if (skipAuth || isAuthenticated) {
        // Use heroku requestId if available.
        const requestId = req.headers['x-request-id'] || uuid.v4();
        let requestLogger = logger.child({requestId});
        const opts = {requestLogger};
        try {
          return await cb(req, res, opts);
        } catch (error) {
          requestLogger.error(error);
          throw error;
        }
      } else {
        this.micro.send(res, 401, {auth: false, message: 'Authentication Failed'});
      }
    });
    this.server.listen(this.port);
  }
}

module.exports = Server;
