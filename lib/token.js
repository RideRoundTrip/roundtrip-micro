class Token {
  constructor() {
    this.expTime = 1000;

    this._token = null;
    this.tokenSet = null;
    this.tokenExpires = null;
  }

  get token() {
    return this._token;
  }

  set token(token) {
    this._token = token;

    this.tokenSet = this.currentTime;
    this.tokenExpires = this.tokenSet + this.expTime;
  }

  get currentTime() {
    return new Date().getTime();
  }

  setExpTime(time) {
    this.expTime = time;
  }

  isExpired() {
    return this.currentTime >= this.tokenExpires;
  }

  isValid() {
    return Token.token && !Token.isExpired();
  }
}

module.exports = Token;