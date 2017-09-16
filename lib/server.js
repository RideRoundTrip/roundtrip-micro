class Server {
  constructor() {
    this.micro = require('micro');

    this.server = null;
  }

  serve(cb) {
    this.server = this.micro(cb);
    this.server.listen(3000);
  }
}

module.exports = Server;