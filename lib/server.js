const Auth = require('./auth');

class Server {
  constructor() {
    this.micro = require('micro');
    this.server = null;
    this.port = process.env.PORT && parseInt(process.env.PORT, 10) || 3000;
  }

  serve(cb) {
    const skipAuth = !!process.env.SKIP_AUTHORIZATION;
    const isAuthenticated = req.headers.authorization ? 
      new Auth().check(req.headers.authorization) :
      false;

    this.server = this.micro((req, res) => {
      if (skipAuth || isAuthenticated) {
        return cb(req, res);
      } else {
        this.micro.send(res, 401, {auth: false, message: 'Authentication Failed'});
      }
    })
    this.server.listen(this.port);
  }
}

module.exports = Server;