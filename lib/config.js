const config = require('dotenv').config();

if (config.error) {
  console.error(config.error);
}

module.exports = config.parsed;