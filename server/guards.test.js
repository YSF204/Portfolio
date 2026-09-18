import assert from 'node:assert/strict'
import test from 'node:test'
import { limits, rateLimit, validateContact } from './guards.js'

test('accepts a well-formed message', () => {
  const { payload, error, spam } = validateContact({
    name: '  Yousef  ',
    email: 'someone@example.com',
    message: '  Hello  ',
  })

  assert.equal(error, undefined)
  assert.equal(spam, undefined)
  assert.deepEqual(payload, { name: 'Yousef', email: 'someone@example.com', message: 'Hello' })
})

test('rejects empty and malformed fields', () => {
  assert.match(validateContact({ name: '', email: 'a@b.co', message: 'x' }).error, /required/)
  assert.match(validateContact({ name: 'A', email: 'nope', message: 'x' }).error, /valid email/)
})

test('a filled honeypot is spam, not an error', () => {
  const result = validateContact({
    name: 'Bot',
    email: 'bot@example.com',
    message: 'buy things',
    website: 'http://spam.example',
  })

  assert.equal(result.spam, true)
  assert.equal(result.payload, undefined)
})

test('strips newlines so headers cannot be forged', () => {
  const { payload } = validateContact({
    name: 'Bot\r\nBcc: victim@example.com',
    email: 'bot@example.com',
    message: 'hi',
  })

  assert.ok(!/[\r\n]/.test(payload.name))
})

test('rate limit allows a burst then blocks within the window', () => {
  const now = Date.now()

  for (let attempt = 0; attempt < limits.MAX_PER_WINDOW; attempt += 1) {
    assert.equal(rateLimit('1.2.3.4', now), true)
  }
  assert.equal(rateLimit('1.2.3.4', now), false)

  // A different sender is unaffected, and the window eventually reopens.
  assert.equal(rateLimit('5.6.7.8', now), true)
  assert.equal(rateLimit('1.2.3.4', now + limits.WINDOW_MS + 1), true)
})
