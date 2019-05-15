class HttpException extends Error {
  constructor(statusCode, message, extra) {
    super(`${statusCode} - ${message}`);
    this.statusCode = statusCode;
    this.extra = extra;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    // @see https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthenticationException extends HttpException {
  constructor() {
    super(401, 'Authentication Failed', {auth: false});
  }
}

module.exports = {
  HttpException,
  AuthenticationException
};
