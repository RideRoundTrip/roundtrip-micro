# RoundTrip MicroService Framework

## Requirements

* Node v8.1.3
* NPM v5.3.0

## Installation

1. Copy `.env.template` in same directory and rename it to `.env`.
1. Update `.env` file.
1. Run `npm i`.

## Features

* Fully tested
* Serve using Micro Framework
* Token management
* Environment config using `.env` file
* Includes Node Fetch package to make HTTP requests
* Logging using Winston.
* Logger integration with Sentry.


## Usage

1. Add dependency to `package.json` file (e.g. `https://github.com/RideRoundTrip/roundtrip-micro#1.0.4`)
2. Add `.env` file (see sample below)
3. Run `npm i`

## Sample ENV File

```bash
# General Server Config
NODE_ENV=development
PORT=1337

# Lyft Config
LYFT_CLIENT_ID=xxxxxx
LYFT_CLIENT_SECRET=xxxxxx-xxxxxx
LYFT_REFRESH_TOKEN=xxxxxx-xxxxxx

# Logging Config
LOG_FILE=/tmp/micro.log
SENTRY_DSN=https:<>@sentry.io/1
```

## Development