const Auth = require('./auth');

class Server {
  constructor() {
    this.micro = require('micro');
    this.server = null;
    this.port = process.env.PORT && parseInt(process.env.PORT, 10) || 3000;
  }

  serve(cb) {
    this.server = this.micro((req, res) => {
      if (req.headers.microservice_key && new Auth().check(req.headers.microservice_key)) {
        return cb(req, res);
      } else {
        this.micro.send(res, 400, {auth:false});
      }
    })
    this.server.listen(this.port);
  }
}

module.exports = Server;