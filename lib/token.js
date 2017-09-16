class Token {
  constructor(token, expTime = 600000) {
    this.expTime = expTime;
    this.token = token;
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
}

module.exports = Token;