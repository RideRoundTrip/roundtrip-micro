const Auth = require('./auth')
const Micro = require('micro')
const SendToSentry = require('micro-sentry')

class Server {
  constructor(cb, options = {}) {
    this.options = Object.assign(this._defaultConfig(), options);

    const server = Micro((req, res) => {  
      if (this._isAuthenticated()) {
        if (this.options.sentry.enabled) {
          SendToSentry(this.options.sentry.url)(cb)
          return
        }

        cb(req, res)
      }

      Micro.send(res, 401, {auth: false, message: 'Authentication Failed'})
    })

    server.listen(this.options.port)
  }

  _isAuthenticated() {
    return process.env.SKIP_AUTHORIZATION ||
      (
        !process.env.SKIP_AUTHORIZATION && 
        req.headers.authorization &&
        new Auth().check(req.headers.authorization)
      )
  }

  _defaultConfig() {
    return {
      port: process.env.PORT && parseInt(process.env.PORT, 10) || 3000,
      sentry: {
        enabled: false,
        url: ''
      }
    }
  }
}

module.exports = Server