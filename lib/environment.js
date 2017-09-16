class Environment {
  constructor() {}

  isEnv(env) {
    return process.env.NODE_ENV === env;
  }

  isProduction() {
    return this.isEnv('production');
  }

  isDevelopment() {
    return this.isEnv('development');
  }
}

module.exports = Environment;