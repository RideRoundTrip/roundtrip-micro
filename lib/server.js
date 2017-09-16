class Server {
  constructor() {
    this.micro = require('micro');
    this.server = null;
    this.port = process.env.PORT || 3000;
  }

  serve(cb) {
    this.server = this.micro(cb);
    this.server.listen(this.port);
  }
}

module.exports = Server;