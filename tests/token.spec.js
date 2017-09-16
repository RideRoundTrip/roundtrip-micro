const test = require('ava');
const sleep = require('then-sleep');
const Token = require('../lib/token');

test.beforeEach(t => {
  t.context = new Token();
});

test('defaut expiry time should be 1000ms', t => {
  t.is(t.context.expTime, 1000);
});

test('setting token should set tokenSet and tokenExpires times', t => {
  t.plan(2);

  t.context.token = 'test-token';

  t.truthy(t.context.tokenSet);
  t.truthy(t.context.tokenExpires);
});

test('setting token should set tokenExpires time to token set time + expiry time', t => {
  t.context.token = 'test-token';
  t.is(t.context.tokenExpires, (t.context.tokenSet + t.context.expTime));
});

test('setting expiry time before token should set tokenExpires correctly', t => {
  const expTime = 5000;

  t.context.expTime = expTime;
  t.context.token = 'test-token';

  t.is(t.context.tokenExpires, (t.context.tokenSet + expTime));
});

test('isExpired method should be false if token not expired', t => {
  t.context.token = 'test-token';
  t.false(t.context.isExpired());
});

test('isExpired method should be true if token expired', async t => {
  t.context.token = 'test-token';
  await sleep(1000);
  t.true(t.context.isExpired());
});

test('isValid method should be false if no token set', t => {
  t.false(t.context.isValid());
});

test('isValid method should be false if token is set and expired', async t => {
  t.context.token = 'test-token';
  await sleep(1000);
  t.false(t.context.isValid());
});

test('isValid method should be true if token is set and not expired', t => {
  t.context.token = 'test-token';
  t.true(t.context.isValid());
});