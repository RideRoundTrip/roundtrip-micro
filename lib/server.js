const uuid = require('uuid');

const {logger} = require('./logging');
const {authenticate} = require('./middlewares');


class Server {
  constructor() {
    this.micro = require('micro');
    this.server = null;
    this.port = process.env.PORT && parseInt(process.env.PORT, 10) || 3000;
  }

  serve(cb) {
    const skipAuth = !!process.env.SKIP_AUTHORIZATION;
    const handler = authenticate(cb, {skipAuth});

    this.server = this.micro(async (req, res) => {
      // Use heroku requestId if available.
      const requestId = req.headers['x-request-id'] || uuid.v4();
      let requestLogger = logger.child({requestId});
      const opts = {requestLogger};

      try {
        return await handler(req, res, opts);
      } catch (error) {
        requestLogger.error(error);
        const statusCode = error.statusCode || 500;
        this.micro.send(res, statusCode, {message: error.message, ...error.extra});
      }

    });
    this.server.listen(this.port);
  }
}

module.exports = Server;
