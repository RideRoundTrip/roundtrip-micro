# RoundTrip MicroService Framework

## Requirements

* Node >=8.3.0

## Features

* Fully tested
* Serve using Micro Framework
* Token management
* Environment config using `.env` file
* Includes Node Fetch package to make HTTP requests
* Logging using Winston.
* Logger integration with Sentry.


## Available Environment Variables

```bash
# General Server Config
NODE_ENV=development
PORT=1337

# Token Management Config
SKIP_AUTHORIZATION=
AUTH_TOKEN=

# Logging Config
LOG_FILE=/tmp/micro.log
SENTRY_DSN=https:<>@sentry.io/1
```
