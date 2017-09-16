class Token {
  constructor(expTime = 600000) {
    this.expTime = expTime;

    this._token = null;
    this.tokenSet = null;
    this.tokenExpires = null;
  }

  set token(token) {
    this._token = token;

    this.tokenSet = this.currentTime;
    this.tokenExpires = this.tokenSet + this.expTime;
  }

  get token() {
    return this._token;
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
}

module.exports = Token;