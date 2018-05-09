const Auth = require('./auth');

class Server {
  constructor() {
    this.micro = require('micro');
    this.server = null;
    this.port = process.env.PORT && parseInt(process.env.PORT, 10) || 3000;
  }

  serve(cb) {
    this.server = this.micro((req, res) => {
      if (req.headers.MICROSERVICE_KEY && new Auth().check(req.headers.MICROSERVICE_KEY)) {
        cb(req, res);
      } else {
        res.status(400).json({ auth: false });
      }
    })
    this.server.listen(this.port);
  }
}

module.exports = Server;