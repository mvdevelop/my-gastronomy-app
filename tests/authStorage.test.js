import test from 'node:test';
import assert from 'node:assert/strict';

const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};

const { isTokenValid, getSession, setSession, clearSession } = await import('../src/lib/authStorage.js');

function tokenWithExpiry(exp) {
  const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url');
  return `header.${payload}.signature`;
}

test('rejects malformed and expired tokens', () => {
  assert.equal(isTokenValid('not-a-jwt'), false);
  assert.equal(isTokenValid(tokenWithExpiry(Math.floor(Date.now() / 1000) - 60)), false);
});

test('accepts a token with sufficient lifetime', () => {
  assert.equal(isTokenValid(tokenWithExpiry(Math.floor(Date.now() / 1000) + 300)), true);
});

test('stores and clears a valid session', () => {
  clearSession();
  const session = {
    token: tokenWithExpiry(Math.floor(Date.now() / 1000) + 300),
    user: { _id: 'user-1' },
  };

  setSession(session);
  assert.deepEqual(getSession(), session);
  clearSession();
  assert.equal(getSession(), null);
});
