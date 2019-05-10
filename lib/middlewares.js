const Auth = require('./auth');
const {AuthenticationException} = require('./exceptions');


function authenticate(handler, options = {}) {
  const {skipAuth} = options;
  const auth = new Auth();

  return (req, res, extra) => {

    const isAuthenticated = req.headers.authorization && auth.check(req.headers.authorization);

    if (skipAuth || isAuthenticated) {
      return handler(req, res, extra);
    }
    throw new AuthenticationException();
  };
}

module.exports = {
  authenticate
};
