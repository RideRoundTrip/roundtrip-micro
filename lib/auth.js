class Auth {
  constructor() {
    this.authToken = process.env.AUTH_TOKEN;
  }

  check(token) {
    return this.authToken === token;
  }
}

module.exports = Auth;