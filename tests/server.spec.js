const test = require('ava');
const fetch = require('node-fetch');
const Server = require('../lib/server');

test('default port is 3000', t => {
  const server = new Server();
  t.is(server.port, 3000);
});

test('port can be set by environment', t => {
  const testPort = 1337;
  process.env.PORT = testPort;

  const server = new Server();

  t.is(server.port, testPort);

  process.env.PORT = null;
});

test('server is created on port using serve method', async t => {
  const server = new Server();

  server.serve((req, res) => 'success');

  const request = await fetch('http://localhost:3000');
  const response =  await request.text();

  server.server.close();

  t.is(response, 'success');
});