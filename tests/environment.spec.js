const test = require('ava');
const Environment = require('../lib/environment');

test('default environment is development', t => {
  const env = new Environment();
  t.is(process.env.NODE_ENV, 'development');
});

test('isProduction should return true if environment is production', t => {
  process.env.NODE_ENV = 'production';
  const env = new Environment();
  t.true(env.isProduction());
});

test('isProduction should return false if environment is not production', t => {
  process.env.NODE_ENV = 'development';
  const env = new Environment();
  t.false(env.isProduction());
});

test('isDevelopment should return true if environment is development', t => {
  process.env.NODE_ENV = 'development';
  const env = new Environment();
  t.true(env.isDevelopment());
});

test('isDevelopment should return false if environment is not development', t => {
  process.env.NODE_ENV = 'production';
  const env = new Environment();
  t.false(env.isDevelopment());
});